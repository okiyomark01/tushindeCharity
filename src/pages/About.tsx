import React, { useState } from 'react';
import { Search, Heart, Zap, Users, Mic } from 'lucide-react';
import type { AboutContent } from '../types/types';
import {DEFAULT_ABOUT} from "../hook/useAbout";



export const About: React.FC = () => {
    const [content] = useState<AboutContent>(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('aboutContent');
            if (stored) {
                try {
                    return JSON.parse(stored);
                } catch (e) {
                    console.error("Failed to parse about content", e);
                }
            }
        }
        return DEFAULT_ABOUT;
    });

    return (
        <div className="bg-white min-h-screen animate-fade-in">
            {/* Hero */}
            <div className="bg-gray-900 text-white py-10 md:py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 md:mb-6 whitespace-pre-line">{content.heroTitle}</h1>
                    <p className="text-lg md:text-xl text-gray-300 whitespace-pre-line">{content.heroSubtitle}</p>
                </div>
            </div>

            <div className="w-full px-4 sm:px-6 lg:px-8 py-16">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20 items-center">
                    <div>
                        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">{content.missionTitle}</h2>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed whitespace-pre-line">
                            {content.contentParagraph1}
                        </p>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Our Vision</h3>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                            {content.contentParagraph2}
                        </p>
                    </div>
                    <div>
                        <img src={content.imageUrl} alt="About Us" className="rounded-2xl shadow-lg w-full object-cover max-h-[400px]"/>
                    </div>
                </div>

                <div className="text-center mb-16">
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-12">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="p-8 border border-gray-100 rounded-xl shadow-sm bg-gray-50 hover:shadow-md transition-shadow">
                            <Search className="w-12 h-12 text-kenya-red mx-auto mb-4"/>
                            <h3 className="text-xl font-bold mb-3">Transparency</h3>
                            <p className="text-gray-600 text-sm">Every single shilling is tracked accounted for and reported publicly.</p>
                        </div>
                        <div className="p-8 border border-gray-100 rounded-xl shadow-sm bg-gray-50 hover:shadow-md transition-shadow">
                            <Heart className="w-12 h-12 text-kenya-green mx-auto mb-4"/>
                            <h3 className="text-xl font-bold mb-3">Dignity</h3>
                            <p className="text-gray-600 text-sm">We provide resources that build independence rather than reliance.</p>
                        </div>
                        <div className="p-8 border border-gray-100 rounded-xl shadow-sm bg-gray-50 hover:shadow-md transition-shadow">
                            <Zap className="w-12 h-12 text-black mx-auto mb-4"/>
                            <h3 className="text-xl font-bold mb-3">Agility</h3>
                            <p className="text-gray-600 text-sm">We eliminate bureaucracy to deliver help exactly when it is needed most.</p>
                        </div>
                        <div className="p-8 border border-gray-100 rounded-xl shadow-sm bg-gray-50 hover:shadow-md transition-shadow">
                            <Users className="w-12 h-12 text-kenya-red mx-auto mb-4"/>
                            <h3 className="text-xl font-bold mb-3">Cohesion</h3>
                            <p className="text-gray-600 text-sm">We unite communities both online and on the ground to solve real problems.</p>
                        </div>
                        <div className="p-8 border border-gray-100 rounded-xl shadow-sm bg-gray-50 hover:shadow-md transition-shadow">
                            <Mic className="w-12 h-12 text-kenya-green mx-auto mb-4"/>
                            <h3 className="text-xl font-bold mb-3">Authenticity</h3>
                            <p className="text-gray-600 text-sm">We amplify real voices to inspire genuine change across all forty seven counties.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};