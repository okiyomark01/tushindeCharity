import React from 'react';
import { Page } from '../types';
import { ArrowRight, Heart, GraduationCap, Briefcase } from 'lucide-react';
import { Stories } from './Stories';

interface HomeProps {
    setPage: (page: Page) => void;
}

export const Home: React.FC<HomeProps> = ({ setPage }) => {
    return (
        <div className="animate-fade-in">
            {/* Stories Section (Now at the top) - Limited to 6 items */}
            <Stories
                setPage={setPage}
                limit={6}
                title="Together, we can turn compassion into action and hope into reality."
                showDonateButton={true}
            />

            {/* Stats Section */}
            <div className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-white">
                <div className="bg-white shadow-xl rounded-xl p-8 max-w-7xl mx-auto border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
                        <div className="p-4">
                            <div className="text-kenya-red font-bold text-4xl mb-2">5,200+</div>
                            <div className="text-gray-600 font-medium">Lives Impacted</div>
                        </div>
                        <div className="p-4">
                            <div className="text-kenya-green font-bold text-4xl mb-2">KSh 45M</div>
                            <div className="text-gray-600 font-medium">Funds Raised</div>
                        </div>
                        <div className="p-4">
                            <div className="text-kenya-black font-bold text-4xl mb-2">120+</div>
                            <div className="text-gray-600 font-medium">Schools Supported</div>
                        </div>
                        <div className="p-4">
                            <div className="text-kenya-red font-bold text-4xl mb-2">98%</div>
                            <div className="text-gray-600 font-medium">Direct Aid</div>
                        </div>
                    </div>
                    <div className="mt-8 text-center text-gray-500 italic border-t pt-4">
                        "Together, we are transforming communities and restoring dignity to thousands of families across Kenya."
                    </div>
                </div>
            </div>

            {/* Featured Areas */}
            <section className="py-20 bg-gray-50">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Our Core Programs</h2>
                        <div className="w-24 h-1 bg-kenya-green mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div
                            onClick={() => setPage(Page.PROGRAMS)}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow cursor-pointer group"
                        >
                            <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-6 group-hover:bg-kenya-green transition-colors">
                                <Heart className="w-7 h-7 text-kenya-green group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Medical Assistance</h3>
                            <p className="text-gray-600 mb-4">Providing emergency surgeries, treatments, and ongoing care for those who cannot afford it.</p>
                            <span className="text-kenya-green font-semibold flex items-center text-sm">Learn more <ArrowRight className="w-4 h-4 ml-1" /></span>
                        </div>

                        <div
                            onClick={() => setPage(Page.PROGRAMS)}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow cursor-pointer group"
                        >
                            <div className="bg-red-100 w-14 h-14 rounded-full flex items-center justify-center mb-6 group-hover:bg-kenya-red transition-colors">
                                <GraduationCap className="w-7 h-7 text-kenya-red group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Education Support</h3>
                            <p className="text-gray-600 mb-4">School fees, uniforms, and supplies to ensure every child stays in school and builds a future.</p>
                            <span className="text-kenya-red font-semibold flex items-center text-sm">Learn more <ArrowRight className="w-4 h-4 ml-1" /></span>
                        </div>

                        <div
                            onClick={() => setPage(Page.PROGRAMS)}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow cursor-pointer group"
                        >
                            <div className="bg-gray-100 w-14 h-14 rounded-full flex items-center justify-center mb-6 group-hover:bg-gray-800 transition-colors">
                                <Briefcase className="w-7 h-7 text-gray-800 group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Business Funding</h3>
                            <p className="text-gray-600 mb-4">Micro-grants and mentorship for aspiring entrepreneurs to start sustainable small businesses.</p>
                            <span className="text-gray-800 font-semibold flex items-center text-sm">Learn more <ArrowRight className="w-4 h-4 ml-1" /></span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};