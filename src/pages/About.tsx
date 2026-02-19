import React, { useState, useEffect } from 'react';
import { Target, ShieldCheck, Users } from 'lucide-react';
import type { AboutContent } from '../types';

const DEFAULT_ABOUT: AboutContent = {
    heroTitle: "About Tushinde Charity",
    heroSubtitle: "Driven by compassion, fueled by integrity, and sustained by the community.",
    missionTitle: "Our Mission & Vision",
    contentParagraph1: "Tushinde (Swahili for \"Let Us Overcome\") was founded on a simple principle: that every Kenyan deserves a chance at a dignified life, regardless of their background.",
    contentParagraph2: "Our mission is to bridge the gap between resources and need. We envision a Kenya where no child drops out of school due to fees, no patient is turned away from a hospital due to lack of funds, and every entrepreneur has the capital to start.",
    imageUrl: "https://picsum.photos/id/1025/600/400"
};

export const About: React.FC = () => {
  const [content, setContent] = useState<AboutContent>(DEFAULT_ABOUT);

  useEffect(() => {
    const stored = localStorage.getItem('aboutContent');
    if (stored) {
        try {
            setContent(JSON.parse(stored));
        } catch (e) {
            console.error("Failed to parse about content");
        }
    }
  }, []);

  return (
    <div className="bg-white min-h-screen animate-fade-in">
      {/* Hero */}
      <div className="bg-gray-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 whitespace-pre-line">{content.heroTitle}</h1>
          <p className="text-xl text-gray-300 whitespace-pre-line">{content.heroSubtitle}</p>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20 items-center">
            <div>
                 <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">{content.missionTitle}</h2>
                 <p className="text-gray-600 mb-4 leading-relaxed whitespace-pre-line">
                    {content.contentParagraph1}
                 </p>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 border border-gray-100 rounded-xl shadow-sm bg-gray-50 hover:shadow-md transition-shadow">
                    <ShieldCheck className="w-12 h-12 text-kenya-red mx-auto mb-4"/>
                    <h3 className="text-xl font-bold mb-3">Integrity & Transparency</h3>
                    <p className="text-gray-600 text-sm">We believe in radical transparency. Every shilling donated is accounted for, and our books are open.</p>
                </div>
                <div className="p-8 border border-gray-100 rounded-xl shadow-sm bg-gray-50 hover:shadow-md transition-shadow">
                    <Users className="w-12 h-12 text-kenya-green mx-auto mb-4"/>
                    <h3 className="text-xl font-bold mb-3">Community First</h3>
                    <p className="text-gray-600 text-sm">We don't just give aid; we build partnerships. We listen to the community to understand their true needs.</p>
                </div>
                <div className="p-8 border border-gray-100 rounded-xl shadow-sm bg-gray-50 hover:shadow-md transition-shadow">
                    <Target className="w-12 h-12 text-black mx-auto mb-4"/>
                    <h3 className="text-xl font-bold mb-3">Empowerment</h3>
                    <p className="text-gray-600 text-sm">Our goal is not dependency, but independence. We provide the tools for beneficiaries to stand on their own.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};