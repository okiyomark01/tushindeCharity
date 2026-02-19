import React, { useState, useEffect } from 'react';
import { Page, type Program } from '../types';
import { Heart, GraduationCap, Briefcase, AlertCircle } from 'lucide-react';

interface ProgramsProps {
    setPage: (page: Page) => void;
}

const DEFAULT_PROGRAMS: Program[] = [
    {
        id: '1',
        title: "Medical Assistance & Healthcare",
        description: "Access to quality healthcare is a right, not a privilege. We partner with local hospitals to fund emergency surgeries, maternal healthcare, and chronic disease management for families living below the poverty line. We also conduct free medical camps in remote rural areas.",
        imageUrl: "https://picsum.photos/id/1005/800/800",
        badgeText: "Health",
        badgeColor: "green",
        icon: "Heart"
    },
    {
        id: '2',
        title: "Education Scholarship Fund",
        description: "We believe education is the key to breaking the cycle of poverty. Our scholarship program covers school fees, uniforms, and books for bright, needy students in secondary schools and universities. We also mentor students to help them achieve their career goals.",
        imageUrl: "https://picsum.photos/id/1011/800/800",
        badgeText: "Education",
        badgeColor: "red",
        icon: "GraduationCap"
    },
    {
        id: '3',
        title: "Economic Empowerment",
        description: "We provide micro-grants and zero-interest loans to women and youth to start small businesses. From poultry farming to tailoring shops, these enterprises provide sustainable income for families, reducing dependency on aid.",
        imageUrl: "https://picsum.photos/id/1059/800/800",
        badgeText: "Empowerment",
        badgeColor: "black",
        icon: "Briefcase"
    }
];

const ICON_MAP: Record<string, React.ElementType> = {
    Heart: Heart,
    GraduationCap: GraduationCap,
    Briefcase: Briefcase,
    AlertCircle: AlertCircle
};

const BG_COLOR_MAP: Record<string, string> = {
    green: 'bg-kenya-green',
    red: 'bg-kenya-red',
    black: 'bg-gray-900'
};

const TEXT_COLOR_MAP: Record<string, string> = {
    green: 'text-kenya-green',
    red: 'text-kenya-red',
    black: 'text-gray-900'
};

export const Programs: React.FC<ProgramsProps> = ({ setPage }) => {
    const [programs, setPrograms] = useState<Program[]>(DEFAULT_PROGRAMS);

    useEffect(() => {
        const stored = localStorage.getItem('programs');
        if (stored) {
            try {
                setPrograms(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse programs");
            }
        }
    }, []);

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
                                    <div className="flex gap-4">
                                        {program.badgeColor === 'green' || program.badgeColor === 'black' ? (
                                            <>
                                                <button onClick={() => setPage(Page.APPLY)} className={`${BG_COLOR_MAP[program.badgeColor]} hover:opacity-90 text-white px-6 py-2 rounded-full font-bold transition-colors`}>Apply Now</button>
                                                <button onClick={() => setPage(Page.DONATE)} className={`${TEXT_COLOR_MAP[program.badgeColor]} font-bold hover:underline`}>Donate to this Cause</button>
                                            </>
                                        ) : (
                                            <>
                                                 <button onClick={() => setPage(Page.DONATE)} className={`${TEXT_COLOR_MAP[program.badgeColor]} font-bold hover:underline`}>Support this Program</button>
                                                 <button onClick={() => setPage(Page.APPLY)} className={`${BG_COLOR_MAP[program.badgeColor]} hover:opacity-90 text-white px-6 py-2 rounded-full font-bold transition-colors`}>Apply for Help</button>
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