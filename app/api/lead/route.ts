import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const MAX_MESSAGE_LENGTH = 5000;

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&#39;';
      default:
        return char;
    }
  });

const normalize = (value: unknown) =>
  typeof value === 'string' ? value.replace(/\r\n/g, '\n').trim() : '';

const pickField = (data: Record<string, unknown>, keys: string[]) => {
  for (const key of keys) {
    const value = normalize(data[key]);
    if (value) return value;
  }
  return '';
};

const parseBody = async (req: Request): Promise<Record<string, unknown>> => {
  const contentType = req.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    const json = await req.json();
    if (json && typeof json === 'object') {
      return json as Record<string, unknown>;
    }
    return {};
  }

  const form = await req.formData();
  const data: Record<string, unknown> = {};
  for (const [key, value] of form.entries()) {
    if (typeof value === 'string') {
      data[key] = value;
    }
  }
  return data;
};

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await parseBody(req);
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  // --------------------------------------------------------------------------
  // SPAM PROTECTION - Tier 1: Honeypots, Time Validation, Content Filtering
  // --------------------------------------------------------------------------

  // 1. Honeypot checks - multiple trap fields bots commonly fill
  const honeypotFields = ['website', 'company_url', 'fax', 'address2'];
  for (const field of honeypotFields) {
    if (pickField(data, [field])) {
      // Silently succeed to not alert bot operators
      return NextResponse.json({ ok: true }, { status: 200 });
    }
  }

  // 2. Time-based validation - reject submissions under 3 seconds
  const formTimestamp = pickField(data, ['_ts']);
  if (formTimestamp) {
    const submissionTime = parseInt(formTimestamp, 10);
    const timeDiff = Date.now() - submissionTime;
    const MIN_SUBMISSION_TIME_MS = 3000; // 3 seconds
    if (!isNaN(submissionTime) && timeDiff < MIN_SUBMISSION_TIME_MS) {
      // Too fast - likely a bot
      return NextResponse.json({ ok: true }, { status: 200 });
    }
  }

  const name = pickField(data, ['name', 'fullName', 'fullname']);
  const phone = pickField(data, ['phone', 'phoneNumber', 'phone_number', 'tel']);
  const address = pickField(data, ['address', 'streetAddress']);
  const zipCode = pickField(data, ['zipCode', 'zip_code', 'zip']);
  const message = pickField(data, ['message', 'details', 'notes']);
  const company = pickField(data, ['company', 'companyName', 'company_name']);
  const service = pickField(data, ['service', 'serviceNeeded', 'service_needed']);
  const timeline = pickField(data, ['timeline', 'projectTimeline', 'project_timeline']);
  const page = pickField(data, ['page', 'pageUrl', 'page_url']);
  const site = pickField(data, ['site', 'siteUrl', 'site_url']);
  const source = pickField(data, ['source', 'leadSource', 'hearAboutUs']);
  const referrer = pickField(data, ['referrer', 'referer']);
  const utmSource = pickField(data, ['utm_source', 'utmSource']);
  const utmMedium = pickField(data, ['utm_medium', 'utmMedium']);
  const utmCampaign = pickField(data, ['utm_campaign', 'utmCampaign']);
  const utmTerm = pickField(data, ['utm_term', 'utmTerm']);
  const utmContent = pickField(data, ['utm_content', 'utmContent']);
  const gclid = pickField(data, ['gclid']);
  const fbclid = pickField(data, ['fbclid']);
  const landingPage = pickField(data, ['landing_page', 'landingPage']);

  const firstTouchUtmSource = pickField(data, ['first_touch_utm_source']);
  const firstTouchUtmMedium = pickField(data, ['first_touch_utm_medium']);
  const firstTouchUtmCampaign = pickField(data, ['first_touch_utm_campaign']);
  const firstTouchGclid = pickField(data, ['first_touch_gclid']);
  const firstTouchFbclid = pickField(data, ['first_touch_fbclid']);
  const firstTouchReferrer = pickField(data, ['first_touch_referrer']);
  const firstTouchLandingPage = pickField(data, ['first_touch_landing_page']);
  const firstTouchAt = pickField(data, ['first_touch_at']);

  // Server-side geolocation (Vercel Edge / Next.js geo headers — no PII, just region)
  const headers = req.headers;
  const ipCity = decodeURIComponent(headers.get('x-vercel-ip-city') || '');
  const ipRegion = headers.get('x-vercel-ip-country-region') || '';
  const ipCountry = headers.get('x-vercel-ip-country') || '';
  const userAgent = headers.get('user-agent') || '';

  const deviceHint = (() => {
    if (!userAgent) return '';
    const ua = userAgent.toLowerCase();
    if (/iphone|ipod/.test(ua)) return 'iPhone';
    if (/ipad/.test(ua)) return 'iPad';
    if (/android/.test(ua) && /mobile/.test(ua)) return 'Android phone';
    if (/android/.test(ua)) return 'Android tablet';
    if (/macintosh/.test(ua)) return 'Mac';
    if (/windows/.test(ua)) return 'Windows';
    if (/linux/.test(ua)) return 'Linux';
    return 'Other';
  })();

  const geoLine = [ipCity, ipRegion, ipCountry].filter(Boolean).join(', ');

  const firstTouchAtFormatted = (() => {
    if (!firstTouchAt) return '';
    const ts = parseInt(firstTouchAt, 10);
    if (isNaN(ts)) return '';
    return new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Chicago',
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(new Date(ts));
  })();

  const formatTouch = (
    src: string,
    med: string,
    camp: string,
    g: string,
    f: string,
    ref: string
  ): string => {
    if (g) return `Google Ads (gclid)`;
    if (f) return `Facebook / Meta Ads (fbclid)`;
    if (src || med || camp) {
      return `UTM: ${[src, med, camp].filter(Boolean).join(' / ')}`;
    }
    if (ref) {
      try {
        const host = new URL(ref).hostname.replace(/^www\./, '');
        if (/google\./.test(host)) return 'Google (organic)';
        if (/bing\./.test(host)) return 'Bing (organic)';
        if (/duckduckgo\./.test(host)) return 'DuckDuckGo (organic)';
        if (/yelp\./.test(host)) return 'Yelp';
        if (/facebook\.|fb\./.test(host)) return 'Facebook';
        if (/instagram\./.test(host)) return 'Instagram';
        if (/tiktok\./.test(host)) return 'TikTok';
        if (/nextdoor\./.test(host)) return 'Nextdoor';
        if (/youtube\./.test(host)) return 'YouTube';
        return host;
      } catch {
        return ref;
      }
    }
    return '';
  };

  const firstTouchChannel = formatTouch(
    firstTouchUtmSource,
    firstTouchUtmMedium,
    firstTouchUtmCampaign,
    firstTouchGclid,
    firstTouchFbclid,
    firstTouchReferrer
  );

  const lastTouchChannel = formatTouch(utmSource, utmMedium, utmCampaign, gclid, fbclid, referrer);
  const inferredChannel = lastTouchChannel || firstTouchChannel || 'Direct / Unknown';

  if (!name || !phone || !address || !service) {
    return NextResponse.json(
      { ok: false, error: 'Please provide your name, phone, address, and service needed.' },
      { status: 400 }
    );
  }

  // Input format validation (mirrors frontend patterns)
  const namePattern = /^[A-Za-z\s\-']{2,50}$/;
  if (!namePattern.test(name)) {
    return NextResponse.json(
      { ok: false, error: 'Name should contain only letters, spaces, and hyphens (2-50 characters).' },
      { status: 400 }
    );
  }

  const phoneDigits = phone.replace(/\D/g, '');
  if (phoneDigits.length < 10 || phoneDigits.length > 11) {
    return NextResponse.json(
      { ok: false, error: 'Please enter a valid 10-digit phone number.' },
      { status: 400 }
    );
  }

  const zipPattern = /^\d{5}$/;
  if (zipCode && !zipPattern.test(zipCode)) {
    return NextResponse.json(
      { ok: false, error: 'Please enter a valid 5-digit zip code.' },
      { status: 400 }
    );
  }

  if (message && message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { ok: false, error: 'Message is too long. Please keep it under 5000 characters.' },
      { status: 400 }
    );
  }

  // 3. Content filtering - detect spam patterns
  const combinedText = `${name} ${address} ${zipCode} ${message}`.toLowerCase();

  // 3a. Check for URLs in the message body (real customers don't include links)
  const messageUrlPattern = /https?:\/\/|www\./gi;
  const messageUrlCount = ((message || '').match(messageUrlPattern) || []).length;
  if (messageUrlCount > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // 3b. Check for spam keywords
  const spamKeywords = [
    'crypto', 'bitcoin', 'ethereum', 'nft',
    'casino', 'poker', 'gambling', 'bet ',
    'viagra', 'cialis', 'pharmacy',
    'seo services', 'backlinks', 'web traffic',
    'nigerian prince', 'lottery winner', 'congratulations you won',
    'click here now', 'act now', 'limited time',
    'work from home', 'make money fast', 'earn $$',
    // SEO / marketing pitch spam
    'seo strategies', 'seo –', 'seo -', 'improve rankings',
    'boost your', 'boost their', 'online visibility',
    'digital marketing', 'performance marketing', 'social media marketing',
    'google marketing', 'first page of google',
    'send you a proposal', 'send you a package', 'package/proposal',
    'ppc/sem', '/sem', '/smo',
    'marketing consultant', 'marketing work',
    'attract more visitors', 'website traffic',
    'free of charge', 'completely free',
    'looking forward to hearing',
  ];
  if (spamKeywords.some(keyword => combinedText.includes(keyword))) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // 3b2. Reject if message contains the site's own domain (common in bot pitches)
  const ownDomainPatterns = ['onestopoutdoor', 'onestopoutdoorconstruct'];
  const lowerMessage = (message || '').toLowerCase();
  if (ownDomainPatterns.some(d => lowerMessage.includes(d))) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // 3c. Check for all-caps messages (spam indicator)
  if (message && message.length > 20) {
    const upperCount = (message.match(/[A-Z]/g) || []).length;
    const letterCount = (message.match(/[a-zA-Z]/g) || []).length;
    if (letterCount > 0 && upperCount / letterCount > 0.7) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }
  }

  // 3d. Suspiciously long messages — real estimate requests are brief
  if (message && message.length > 500) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // 3e. Check for non-ASCII character overload (foreign spam)
  const nonAsciiPattern = /[^\x00-\x7F]/g;
  const nonAsciiCount = (combinedText.match(nonAsciiPattern) || []).length;
  if (combinedText.length > 0 && nonAsciiCount / combinedText.length > 0.3) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // --------------------------------------------------------------------------
  // END SPAM PROTECTION
  // --------------------------------------------------------------------------


  const timestamp = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  }).format(new Date());
  const safeName = name || 'Website Form';
  const safeService = service || 'Website Form';
  const brandName = 'One Stop Outdoor Construction';
  const brandAddress = 'Richmond, TX';
  const brandPrimary = '#1a3a6b';
  const brandAccent = '#c0392b';
  const fromEmail = process.env.LEAD_FROM_EMAIL || 'One Stop Outdoor Construction <leads@onestopoutdoorconstruction.com>';
  const sourceTag = source ? ` [${source}]` : '';
  const subject = `New Lead: ${safeService} | ${safeName}${sourceTag}`;

  const pageUrlIsDev =
    !!page &&
    (/localhost/i.test(page) || /127\.0\.0\.1/.test(page) || /0\.0\.0\.0/.test(page));
  const pageUrlDisplay = page ? (pageUrlIsDev ? `${page} (dev link)` : page) : '';
  const phoneLink = (() => {
    if (!phone) return '';
    if (phone.trim().startsWith('+')) {
      return phone.replace(/[^\d+]/g, '');
    }
    const digits = phone.replace(/\D/g, '');
    if (!digits) return '';
    if (digits.length === 10) return `+1${digits}`;
    if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
    return digits;
  })();

  const textLines = [
    `Timestamp: ${timestamp}`,
    name ? `Name: ${name}` : '',
    phone ? `Phone: ${phone}` : '',
    address ? `Address: ${address}` : '',
    zipCode ? `Zip Code: ${zipCode}` : '',
    company ? `Company: ${company}` : '',
    service ? `Service: ${service}` : '',
    timeline ? `Timeline: ${timeline}` : '',
    source ? `How They Heard: ${source}` : '',
    `Detected Channel: ${inferredChannel}`,
    firstTouchChannel && firstTouchChannel !== lastTouchChannel ? `First Touch: ${firstTouchChannel}` : '',
    firstTouchAtFormatted ? `First Touch At: ${firstTouchAtFormatted}` : '',
    geoLine ? `IP Location: ${geoLine}` : '',
    deviceHint ? `Device: ${deviceHint}` : '',
    referrer ? `Referrer: ${referrer}` : '',
    landingPage ? `Landing Page: ${landingPage}` : '',
    utmSource ? `UTM Source: ${utmSource}` : '',
    utmMedium ? `UTM Medium: ${utmMedium}` : '',
    utmCampaign ? `UTM Campaign: ${utmCampaign}` : '',
    utmTerm ? `UTM Term: ${utmTerm}` : '',
    utmContent ? `UTM Content: ${utmContent}` : '',
    gclid ? `Google Click ID: ${gclid}` : '',
    fbclid ? `Facebook Click ID: ${fbclid}` : '',
    firstTouchLandingPage && firstTouchLandingPage !== landingPage ? `First Touch Landing: ${firstTouchLandingPage}` : '',
    pageUrlDisplay ? `Page: ${pageUrlDisplay}` : '',
    site ? `Site: ${site}` : '',
    `Message:\n${message || '(none)'}`,
  ].filter(Boolean);

  const text = textLines.join('\n');
  const escapedMessage = message ? escapeHtml(message).replace(/\n/g, '<br />') : '';
  const html = `
  <div style="background-color:#e2e8f0;margin:0;padding:24px 12px;font-family:'Barlow','Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
    <span style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">
      New quote request from ${escapeHtml(safeName)}. Respond quickly.
    </span>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #cbd5e1;border-radius:16px;box-shadow:0 14px 36px rgba(2,6,23,0.18);overflow:hidden;">
      <tr>
        <td style="background:${brandPrimary};color:#ffffff;padding:18px 20px;border-bottom:4px solid ${brandAccent};">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="font-size:18px;font-weight:800;letter-spacing:0.4px;text-transform:uppercase;">${brandName}</td>
              <td align="right">
                <span style="display:inline-block;background:${brandAccent};color:#ffffff;font-weight:800;font-size:11px;padding:7px 10px;border-radius:999px;letter-spacing:1.2px;">NEW LEAD</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 20px 14px;">
          <div style="font-size:25px;font-weight:800;line-height:1.2;margin:0 0 6px;color:#0f172a;">${escapeHtml(safeName)}</div>
          <div style="font-size:15px;color:${brandPrimary};font-weight:700;margin:0 0 5px;">${escapeHtml(safeService)}</div>
          <div style="font-size:12px;color:#64748b;">${escapeHtml(timestamp)}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:0 20px 20px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="padding:0 0 10px;">
                <a href="tel:${escapeHtml(phoneLink || phone)}" style="display:block;background:${brandAccent};color:#ffffff;text-decoration:none;font-weight:800;font-size:14px;text-align:center;padding:14px 18px;border-radius:10px;">
                  Hold to Call Lead
                </a>
              </td>
            </tr>

            ${pageUrlDisplay ? `
            <tr>
              <td style="padding:0;">
                <a href="${escapeHtml(page)}" style="font-size:12px;color:${brandAccent};text-decoration:none;">View Page</a>
              </td>
            </tr>
            ` : ''}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:0 20px 20px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #dbe5f3;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="background:#eff6ff;padding:14px 16px;font-weight:800;border-bottom:1px solid #dbe5f3;color:${brandPrimary};">Lead Details</td>
            </tr>
            <tr>
              <td style="padding:0 16px;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-size:14px;">
                  <tr><td style="padding:10px 0;color:#64748b;width:120px;">Name</td><td style="padding:10px 0;color:#0f172a;font-weight:700;">${escapeHtml(safeName)}</td></tr>
                  <tr><td style="padding:10px 0;color:#64748b;">Phone</td><td style="padding:10px 0;"><a href="tel:${escapeHtml(phoneLink || phone)}" style="color:#0f172a;text-decoration:none;font-weight:700;">${escapeHtml(phone)}</a></td></tr>
                  <tr><td style="padding:10px 0;color:#64748b;">Address</td><td style="padding:10px 0;color:#0f172a;font-weight:700;">${escapeHtml(address)}</td></tr>
                  ${zipCode ? `<tr><td style="padding:10px 0;color:#64748b;">Zip Code</td><td style="padding:10px 0;color:#0f172a;font-weight:700;">${escapeHtml(zipCode)}</td></tr>` : ''}
                  <tr><td style="padding:10px 0;color:#64748b;">Service</td><td style="padding:10px 0;color:#0f172a;font-weight:700;">${escapeHtml(safeService)}</td></tr>
                  ${timeline ? `<tr><td style="padding:10px 0;color:#64748b;">Timeline</td><td style="padding:10px 0;color:#0f172a;font-weight:700;">${escapeHtml(timeline)}</td></tr>` : ''}
                  ${source ? `<tr><td style="padding:10px 0;color:#64748b;">Heard Via</td><td style="padding:10px 0;color:#0f172a;font-weight:700;"><span style="display:inline-block;background:${brandPrimary};color:#ffffff;font-size:11px;font-weight:800;padding:4px 10px;border-radius:999px;letter-spacing:0.5px;text-transform:uppercase;">${escapeHtml(source)}</span></td></tr>` : ''}
                  ${pageUrlDisplay ? `<tr><td style="padding:10px 0;color:#64748b;">Page URL</td><td style="padding:10px 0;"><a href="${escapeHtml(page)}" style="color:${brandAccent};text-decoration:none;">${escapeHtml(pageUrlDisplay)}</a></td></tr>` : ''}
                  ${site ? `<tr><td style="padding:10px 0;color:#64748b;">Site</td><td style="padding:10px 0;"><a href="${escapeHtml(site)}" style="color:${brandAccent};text-decoration:none;">${escapeHtml(site)}</a></td></tr>` : ''}
                  ${company ? `<tr><td style="padding:10px 0;color:#64748b;">Company</td><td style="padding:10px 0;color:#0f172a;font-weight:700;">${escapeHtml(company)}</td></tr>` : ''}
                  <tr>
                    <td style="padding:10px 0;color:#64748b;vertical-align:top;">Message</td>
                    <td style="padding:10px 0;color:#0f172a;">
                      ${escapedMessage ? `<div style="font-weight:500;">${escapedMessage}</div>` : `<div style="font-style:italic;color:#64748b;">No message provided.</div>`}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:0 20px 20px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #dbe5f3;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="background:#eff6ff;padding:14px 16px;font-weight:800;border-bottom:1px solid #dbe5f3;color:${brandPrimary};">Attribution &amp; Tracking</td>
            </tr>
            <tr>
              <td style="padding:0 16px;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-size:13px;">
                  <tr><td style="padding:10px 0;color:#64748b;width:140px;">Detected Channel</td><td style="padding:10px 0;color:#0f172a;font-weight:700;">${escapeHtml(inferredChannel)}</td></tr>
                  ${firstTouchChannel && firstTouchChannel !== lastTouchChannel ? `<tr><td style="padding:10px 0;color:#64748b;">First Touch</td><td style="padding:10px 0;color:#0f172a;font-weight:700;">${escapeHtml(firstTouchChannel)}${firstTouchAtFormatted ? ` <span style="color:#64748b;font-weight:400;">(${escapeHtml(firstTouchAtFormatted)})</span>` : ''}</td></tr>` : ''}
                  ${geoLine ? `<tr><td style="padding:10px 0;color:#64748b;">IP Location</td><td style="padding:10px 0;color:#0f172a;font-weight:700;">${escapeHtml(geoLine)}</td></tr>` : ''}
                  ${deviceHint ? `<tr><td style="padding:10px 0;color:#64748b;">Device</td><td style="padding:10px 0;color:#0f172a;font-weight:700;">${escapeHtml(deviceHint)}</td></tr>` : ''}
                  ${referrer ? `<tr><td style="padding:10px 0;color:#64748b;vertical-align:top;">Referrer</td><td style="padding:10px 0;word-break:break-all;"><a href="${escapeHtml(referrer)}" style="color:${brandAccent};text-decoration:none;">${escapeHtml(referrer)}</a></td></tr>` : ''}
                  ${landingPage ? `<tr><td style="padding:10px 0;color:#64748b;vertical-align:top;">Landing Page</td><td style="padding:10px 0;word-break:break-all;"><a href="${escapeHtml(landingPage)}" style="color:${brandAccent};text-decoration:none;">${escapeHtml(landingPage)}</a></td></tr>` : ''}
                  ${firstTouchLandingPage && firstTouchLandingPage !== landingPage ? `<tr><td style="padding:10px 0;color:#64748b;vertical-align:top;">First Touch Landing</td><td style="padding:10px 0;word-break:break-all;"><a href="${escapeHtml(firstTouchLandingPage)}" style="color:${brandAccent};text-decoration:none;">${escapeHtml(firstTouchLandingPage)}</a></td></tr>` : ''}
                  ${utmSource ? `<tr><td style="padding:10px 0;color:#64748b;">UTM Source</td><td style="padding:10px 0;color:#0f172a;font-weight:700;">${escapeHtml(utmSource)}</td></tr>` : ''}
                  ${utmMedium ? `<tr><td style="padding:10px 0;color:#64748b;">UTM Medium</td><td style="padding:10px 0;color:#0f172a;font-weight:700;">${escapeHtml(utmMedium)}</td></tr>` : ''}
                  ${utmCampaign ? `<tr><td style="padding:10px 0;color:#64748b;">UTM Campaign</td><td style="padding:10px 0;color:#0f172a;font-weight:700;">${escapeHtml(utmCampaign)}</td></tr>` : ''}
                  ${utmTerm ? `<tr><td style="padding:10px 0;color:#64748b;">UTM Term</td><td style="padding:10px 0;color:#0f172a;font-weight:700;">${escapeHtml(utmTerm)}</td></tr>` : ''}
                  ${utmContent ? `<tr><td style="padding:10px 0;color:#64748b;">UTM Content</td><td style="padding:10px 0;color:#0f172a;font-weight:700;">${escapeHtml(utmContent)}</td></tr>` : ''}
                  ${gclid ? `<tr><td style="padding:10px 0;color:#64748b;">Google Click ID</td><td style="padding:10px 0;color:#0f172a;font-family:'Courier New',monospace;font-size:11px;word-break:break-all;">${escapeHtml(gclid)}</td></tr>` : ''}
                  ${fbclid ? `<tr><td style="padding:10px 0;color:#64748b;">Facebook Click ID</td><td style="padding:10px 0;color:#0f172a;font-family:'Courier New',monospace;font-size:11px;word-break:break-all;">${escapeHtml(fbclid)}</td></tr>` : ''}
                  ${!referrer && !utmSource && !utmMedium && !utmCampaign && !gclid && !fbclid && !firstTouchChannel ? `<tr><td colspan="2" style="padding:10px 0;color:#64748b;font-style:italic;">No tracking parameters captured — likely direct visit, bookmark, typed-in URL, or an in-app browser (Instagram/Facebook/iOS) that strips referrers. Self-reported source above is the best signal here.</td></tr>` : ''}
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:0 20px 22px;">
          <div style="border-left:4px solid ${brandAccent};padding:12px;background:#f8fafc;border-radius:8px;font-size:12px;color:#475569;line-height:1.5;">
            This lead came from the One Stop Outdoor Construction website form.
            <span style="display:block;margin-top:6px;font-weight:700;color:${brandPrimary};">${brandAddress}</span>
          </div>
        </td>
      </tr>
    </table>
  </div>
  `;

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LEAD_TO_EMAIL;
  const isProduction = process.env.NODE_ENV === 'production';
  const isDryRun = process.env.LEAD_DRY_RUN === 'true';

  if (isDryRun || !resendApiKey || !toEmail) {
    const missingVars = [
      !resendApiKey ? 'RESEND_API_KEY' : '',
      !toEmail ? 'LEAD_TO_EMAIL' : '',
    ].filter(Boolean);

    if (isProduction && !isDryRun && missingVars.length > 0) {
      return NextResponse.json(
        { ok: false, error: `Server misconfigured. Missing ${missingVars.join(' and ')}.` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        mode: 'dry-run',
        message:
          missingVars.length > 0
            ? `Dry run only. Missing ${missingVars.join(' and ')}.`
            : 'Dry run enabled. Email not sent.',
      },
      { status: 200 }
    );
  }

  const resend = new Resend(resendApiKey);
  const bcc = process.env.LEADS_BCC_EMAIL
    ? process.env.LEADS_BCC_EMAIL.split(',').map((entry) => entry.trim()).filter(Boolean)
    : undefined;

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    bcc,
    replyTo: undefined,
    subject,
    text,
    html,
  });

  if (error) {
    const errorMessage =
      process.env.NODE_ENV === 'development'
        ? `Failed to send email: ${error.message || 'Unknown Resend error'}`
        : 'Failed to send email.';

    return NextResponse.json({ ok: false, error: errorMessage }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
