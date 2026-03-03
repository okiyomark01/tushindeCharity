import React, { useState } from 'react';
import { Page, type Program } from '../types/types';
import { Heart } from 'lucide-react';
import {BG_COLOR_MAP, DEFAULT_PROGRAMS, ICON_MAP, TEXT_COLOR_MAP} from "../hook/usePrograms";

interface ProgramsProps {
    setPage: (page: Page) => void;
}

export const Programs: React.FC<ProgramsProps> = ({ setPage }) => {
    const [programs] = useState<Program[]>(() => {
        const stored = localStorage.getItem('programs_v2');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch {
                console.error("Failed to parse programs");
            }
        }
        return DEFAULT_PROGRAMS;
    });

    return (
        <div className="py-12 bg-gray-50 min-h-screen">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Our Programs</h1>
                    <p className="text-xl text-gray-600">
                        We have designed targeted initiatives to address the most pressing needs in Kenyan communities.
                        Each program is managed by local experts to ensure sustainable impact.
                    </p>
                </div>

                <div className="space-y-12">
                    {programs.map((program, index) => {
                        const IconComponent = ICON_MAP[program.icon] || Heart;
                        const isEven = index % 2 === 0;

                        return (
                            <div key={program.id} className={`bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                <div className="md:w-2/5 h-64 md:h-auto relative">
                                    <img src={program.imageUrl} alt={program.title} className="w-full h-full object-cover"/>
                                    <div className={`absolute top-0 ${isEven ? 'left-0 rounded-br-2xl' : 'right-0 rounded-bl-2xl'} ${BG_COLOR_MAP[program.badgeColor]} text-white px-4 py-2 font-bold`}>
                                        {program.badgeText}
                                    </div>
                                </div>
                                <div className={`md:w-3/5 p-8 md:p-12 flex flex-col justify-center ${!isEven ? 'md:items-end md:text-right' : ''}`}>
                                    <div className={`flex items-center gap-3 mb-4 ${!isEven ? 'md:flex-row-reverse' : ''}`}>
                                        <IconComponent className={`${TEXT_COLOR_MAP[program.badgeColor]} w-8 h-8`}/>
                                        <h2 className="text-2xl font-bold text-gray-900">{program.title}</h2>
                                    </div>
                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        {program.description}
                                    </p>
                                    <div className="flex flex-row gap-2 sm:gap-4 mt-4">
                                        {program.badgeColor === 'green' || program.badgeColor === 'black' ? (
                                            <>
                                                <button
                                                    onClick={() => setPage(Page.APPLY)}
                                                    className={`${BG_COLOR_MAP[program.badgeColor]} text-white px-3 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-xs sm:text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex-1 text-center`}
                                                >
                                                    Apply Now
                                                </button>
                                                <button
                                                    onClick={() => setPage(Page.DONATE)}
                                                    className={`px-3 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-xs sm:text-base border-2 border-current bg-transparent hover:bg-gray-50 transition-all duration-300 ${TEXT_COLOR_MAP[program.badgeColor]} flex-1 text-center`}
                                                >
                                                    Donate
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => setPage(Page.DONATE)}
                                                    className={`px-3 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-xs sm:text-base border-2 border-current bg-transparent hover:bg-gray-50 transition-all duration-300 ${TEXT_COLOR_MAP[program.badgeColor]} flex-1 text-center`}
                                                >
                                                    Support
                                                </button>
                                                <button
                                                    onClick={() => setPage(Page.APPLY)}
                                                    className={`${BG_COLOR_MAP[program.badgeColor]} text-white px-3 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-xs sm:text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex-1 text-center`}
                                                >
                                                    Apply
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};