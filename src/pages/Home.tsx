import React from 'react';
import { Page } from '../types';
import { ArrowRight, Heart, GraduationCap, Briefcase } from 'lucide-react';
import { Stories } from './Stories';

interface HomeProps {
    setPage: (page: Page) => void;
    onStoryStateChange?: (isOpen: boolean) => void;
}

export const Home: React.FC<HomeProps> = ({ setPage, onStoryStateChange }) => {
    return (
        <div className="animate-fade-in">
            {/* Stories Section (Now at the top) - Limited to 6 items */}
            <Stories
                setPage={setPage}
                limit={6}
                title="From hope to action. From struggle to strength. Tushinde."
                showDonateButton={true}
                onStoryStateChange={onStoryStateChange}
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
            <section className="pt-12 pb-3 md:py-20 bg-gray-50">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 md:mb-16">
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-4">Our Core Programs</h2>
                        <div className="w-24 h-1 bg-kenya-green mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
                        {/* Card 1 */}
                        <div
                            onClick={() => setPage(Page.PROGRAMS)}
                            className="bg-white p-4 md:p-8 rounded-xl md:rounded-2xl shadow-sm hover:shadow-xl transition-shadow cursor-pointer group"
                        >
                            <div className="bg-green-100 w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:bg-kenya-green transition-colors">
                                <Heart className="w-5 h-5 md:w-7 md:h-7 text-kenya-green group-hover:text-white" />
                            </div>
                            <h3 className="text-sm md:text-xl font-bold mb-2 md:mb-3 leading-tight">Medical Assistance</h3>
                            <p className="text-xs md:text-base text-gray-600 mb-3 md:mb-4 line-clamp-3 md:line-clamp-none">Providing emergency surgeries, treatments, and ongoing care for those who cannot afford it.</p>
                            <span className="text-kenya-green font-semibold flex items-center text-xs md:text-sm">Learn more <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1" /></span>
                        </div>

                        {/* Card 2 */}
                        <div
                            onClick={() => setPage(Page.PROGRAMS)}
                            className="bg-white p-4 md:p-8 rounded-xl md:rounded-2xl shadow-sm hover:shadow-xl transition-shadow cursor-pointer group"
                        >
                            <div className="bg-red-100 w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:bg-kenya-red transition-colors">
                                <GraduationCap className="w-5 h-5 md:w-7 md:h-7 text-kenya-red group-hover:text-white" />
                            </div>
                            <h3 className="text-sm md:text-xl font-bold mb-2 md:mb-3 leading-tight">Education Support</h3>
                            <p className="text-xs md:text-base text-gray-600 mb-3 md:mb-4 line-clamp-3 md:line-clamp-none">School fees, uniforms, and supplies to ensure every child stays in school and builds a future.</p>
                            <span className="text-kenya-red font-semibold flex items-center text-xs md:text-sm">Learn more <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1" /></span>
                        </div>

                        {/* Card 3 - Spanning 2 cols on mobile for balance */}
                        <div
                            onClick={() => setPage(Page.PROGRAMS)}
                            className="bg-white p-4 md:p-8 rounded-xl md:rounded-2xl shadow-sm hover:shadow-xl transition-shadow cursor-pointer group col-span-2 md:col-span-1"
                        >
                            <div className="bg-gray-100 w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:bg-gray-800 transition-colors">
                                <Briefcase className="w-5 h-5 md:w-7 md:h-7 text-gray-800 group-hover:text-white" />
                            </div>
                            <h3 className="text-sm md:text-xl font-bold mb-2 md:mb-3 leading-tight">Business Funding</h3>
                            <p className="text-xs md:text-base text-gray-600 mb-3 md:mb-4 md:line-clamp-none">Micro-grants and mentorship for aspiring entrepreneurs to start sustainable small businesses.</p>
                            <span className="text-gray-800 font-semibold flex items-center text-xs md:text-sm">Learn more <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1" /></span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};