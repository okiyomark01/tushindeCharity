import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import type { ContactContent } from '../types';

const DEFAULT_CONTACT: ContactContent = {
    heroTitle: "Get in Touch",
    heroSubtitle: "Have questions about our programs or want to partner with us?",
    address: "Tushinde House, 4th Floor\nWestlands Road, Nairobi, Kenya",
    phone1: "+254 700 123 456",
    phone2: "+254 722 987 654",
    email1: "info@tushindecharity.org",
    email2: "donations@tushindecharity.org"
};

export const Contact: React.FC = () => {
    const [content, setContent] = useState<ContactContent>(DEFAULT_CONTACT);

    useEffect(() => {
        const stored = localStorage.getItem('contactContent');
        if (stored) {
            try {
                setContent(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse contact content");
            }
        }
    }, []);

    return (
        <div className="bg-white py-16 animate-fade-in">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4 whitespace-pre-line">{content.heroTitle}</h1>
                    <p className="text-gray-600 whitespace-pre-line">{content.heroSubtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-green-100 p-3 rounded-full">
                                    <MapPin className="text-kenya-green w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Headquarters</h3>
                                    <p className="text-gray-600 whitespace-pre-line">{content.address}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-red-100 p-3 rounded-full">
                                    <Phone className="text-kenya-red w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Phone</h3>
                                    <p className="text-gray-600">{content.phone1}</p>
                                    <p className="text-gray-600">{content.phone2}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-gray-100 p-3 rounded-full">
                                    <Mail className="text-gray-800 w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Email</h3>
                                    <p className="text-gray-600">{content.email1}</p>
                                    <p className="text-gray-600">{content.email2}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input type="text" className="w-full border-gray-300 rounded-lg p-3 border focus:ring-kenya-green focus:border-kenya-green bg-white" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" className="w-full border-gray-300 rounded-lg p-3 border focus:ring-kenya-green focus:border-kenya-green bg-white" />
                            </div>
                        </div>
                         <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                            <input type="text" className="w-full border-gray-300 rounded-lg p-3 border focus:ring-kenya-green focus:border-kenya-green bg-white" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea rows={4} className="w-full border-gray-300 rounded-lg p-3 border focus:ring-kenya-green focus:border-kenya-green bg-white"></textarea>
                        </div>
                        <button className="w-full bg-kenya-black hover:bg-gray-800 text-white font-bold py-3 rounded-lg transition-colors">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};