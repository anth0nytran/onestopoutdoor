'use client';

import { useState } from 'react';
import NextImage from 'next/image';
import { ArrowLeftRight } from 'lucide-react';

interface ProjectCardProps {
    title: string;
    location: string;
    beforeImage?: string;
    afterImage?: string;
    alt: string;
    accentColor: string;
    actionColor: string;
}

export function ProjectCard({
    title,
    location,
    beforeImage,
    afterImage,
    alt,
    accentColor,
    actionColor,
}: ProjectCardProps) {
    const [showAfter, setShowAfter] = useState(!!afterImage);

    return (
        <div className="snap-center shrink-0 w-[85vw] md:w-auto flex flex-col group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 bg-white">
            {/* Image Container */}
            <div className="aspect-[4/3] relative bg-slate-100 overflow-hidden">
                {/* Before Image - Always present, essentially the "background" */}
                <div className="absolute inset-0">
                    {beforeImage ? (
                        <NextImage
                            src={beforeImage}
                            alt={`Before - ${alt}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    ) : (
                        <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                            <span className="text-slate-300 text-6xl font-black opacity-50 select-none">?</span>
                        </div>
                    )}
                </div>

                {/* After Image - Layered on top, toggles opacity */}
                {afterImage && (
                    <div
                        className="absolute inset-0 transition-opacity duration-500 ease-in-out"
                        style={{ opacity: showAfter ? 1 : 0 }}
                    >
                        <NextImage
                            src={afterImage}
                            alt={`After - ${alt}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    </div>
                )}
                
                {/* Before Image base scale effect too if no after image or when showing before */}
                {!afterImage && beforeImage && (
                    <div className="absolute inset-0 pointer-events-none">
                         <NextImage
                            src={beforeImage}
                            alt={`Before - ${alt}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    </div>
                )}

                {/* Overlay Gradient (darker for text readability) */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent pointer-events-none z-10" />

                {/* Toggle Button */}
                {afterImage && (
                    <div className="absolute top-4 right-4 z-20">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setShowAfter(!showAfter);
                            }}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg transition-transform hover:scale-105 active:scale-95"
                            style={{
                                backgroundColor: showAfter ? 'white' : actionColor,
                                color: showAfter ? 'black' : 'white',
                            }}
                        >
                            <ArrowLeftRight className="w-3 h-3" />
                            {showAfter ? 'View Before' : 'View After'}
                        </button>
                    </div>
                )}

                {/* State Badge */}
                {afterImage && (
                    <div className="absolute top-4 left-4 z-20">
                        <span
                            className="px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest text-white shadow-sm transition-colors duration-300"
                            style={{ backgroundColor: showAfter ? accentColor : '#64748b' }}
                        >
                            {showAfter ? 'After Results' : 'Before Work'}
                        </span>
                    </div>
                )}
            </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-20 flex flex-col justify-end transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl md:text-2xl font-black text-white mb-1.5 leading-tight drop-shadow-md">
                        {title}
                    </h3>
                    <div className="flex items-center gap-2 opacity-90">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-white/90 drop-shadow-sm">
                            {location}
                        </span>
                    </div>
                    {/* Minimal indicator */}
                    <div className="mt-4 h-1 w-10 rounded-full transition-all duration-300 opacity-60 group-hover:opacity-100 group-hover:w-16" style={{ backgroundColor: actionColor }} />
                </div>
            </div>
    );
}
