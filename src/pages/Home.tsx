import React from 'react';
import { Page } from '../types/types';
import { ArrowRight, Heart } from 'lucide-react';
import { Stories } from './Stories';
import { DEFAULT_PROGRAMS, ICON_MAP, TEXT_COLOR_MAP } from '../hook/usePrograms';

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
                title={
                    <>
                        <span className="block text-xl sm:text-4xl font-bold text-gray-900 mb-0.5 sm:mb-2 tracking-tight">Twende Tusaidie Tushinde</span>
                        {/*<span className="block text-sm sm:text-xl font-semibold text-kenya-green mb-1.5 sm:mb-2">Direct Support For Kenyan Families</span>*/}
                        <span className="block text-[13px] sm:text-base text-gray-600 font-normal max-w-2xl mx-auto leading-snug sm:leading-relaxed">We transform real Kenyan struggles into immediate community action and verifiable support.</span>
                    </>
                }
                showDonateButton={true}
                onStoryStateChange={onStoryStateChange}
            />

            {/* Stats Section */}
            {/*<div className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-white">*/}
            {/*    <div className="bg-white shadow-xl rounded-xl p-8 max-w-7xl mx-auto border border-gray-100">*/}
            {/*        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">*/}
            {/*            <div className="p-4">*/}
            {/*                <div className="text-kenya-red font-bold text-4xl mb-2">5,200+</div>*/}
            {/*                <div className="text-gray-600 font-medium">Lives Impacted</div>*/}
            {/*            </div>*/}
            {/*            <div className="p-4">*/}
            {/*                <div className="text-kenya-green font-bold text-4xl mb-2">KSh 45M</div>*/}
            {/*                <div className="text-gray-600 font-medium">Funds Raised</div>*/}
            {/*            </div>*/}
            {/*            <div className="p-4">*/}
            {/*                <div className="text-kenya-black font-bold text-4xl mb-2">120+</div>*/}
            {/*                <div className="text-gray-600 font-medium">Schools Supported</div>*/}
            {/*            </div>*/}
            {/*            <div className="p-4">*/}
            {/*                <div className="text-kenya-red font-bold text-4xl mb-2">98%</div>*/}
            {/*                <div className="text-gray-600 font-medium">Direct Aid</div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="mt-8 text-center text-gray-500 italic border-t pt-4">*/}
            {/*            "Together, we are transforming communities and restoring dignity to thousands of families across Kenya."*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/* Featured Areas */}
            <section className="pt-12 pb-3 md:py-20 bg-gray-50">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 md:mb-16">
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-4">Our Core Programs</h2>
                        <div className="w-24 h-1 bg-kenya-green mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
                        {DEFAULT_PROGRAMS.map((program) => {
                            const IconComponent = ICON_MAP[program.icon] || Heart;
                            const bgClass = program.badgeColor === 'green' ? 'bg-green-100' : program.badgeColor === 'red' ? 'bg-red-100' : 'bg-gray-100';
                            const textClass = TEXT_COLOR_MAP[program.badgeColor] || 'text-gray-800';
                            const groupHoverBgClass = program.badgeColor === 'green' ? 'group-hover:bg-kenya-green' : program.badgeColor === 'red' ? 'group-hover:bg-kenya-red' : 'group-hover:bg-gray-900';

                            return (
                                <div
                                    key={program.id}
                                    onClick={() => setPage(Page.PROGRAMS)}
                                    className="bg-white p-4 md:p-8 rounded-xl md:rounded-2xl shadow-sm hover:shadow-xl transition-shadow cursor-pointer group flex flex-col"
                                >
                                    <div className={`${bgClass} w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-4 md:mb-6 ${groupHoverBgClass} transition-colors`}>
                                        <IconComponent className={`w-5 h-5 md:w-7 md:h-7 ${textClass} group-hover:text-white transition-colors`} />
                                    </div>
                                    <h3 className="text-sm md:text-xl font-bold mb-2 md:mb-3 leading-tight">{program.title}</h3>
                                    <p className="text-xs md:text-base text-gray-600 mb-3 md:mb-4 line-clamp-3 md:line-clamp-none flex-grow">{program.description}</p>
                                    <span className={`${textClass} font-semibold flex items-center text-xs md:text-sm mt-auto`}>Learn more <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1" /></span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};