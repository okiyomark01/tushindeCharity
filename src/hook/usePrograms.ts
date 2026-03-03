import type {Program} from "../types/types.ts";
import React from "react";
import {AlertCircle, Briefcase, GraduationCap, Heart} from "lucide-react";

export const ICON_MAP: Record<string, React.ElementType> = {
    Heart: Heart,
    GraduationCap: GraduationCap,
    Briefcase: Briefcase,
    AlertCircle: AlertCircle
};

export const BG_COLOR_MAP: Record<string, string> = {
    green: 'bg-kenya-green',
    red: 'bg-kenya-red',
    black: 'bg-gray-900'
};

export const TEXT_COLOR_MAP: Record<string, string> = {
    green: 'text-kenya-green',
    red: 'text-kenya-red',
    black: 'text-gray-900'
};

export const DEFAULT_PROGRAMS: Program[] = [
    {
        id: '1',
        title: "Business and Economic Empowerment",
        description: "We supply complete startup inventory and clear rent arrears for small scale vendors so they can achieve permanent financial stability. We provide substantial grants such as the 150000 KES provided to Charles Kago Mwaura in Ruiru and 150000 KES for Peter Murie in Dagoretti to launch new enterprises.",
        imageUrl: "https://picsum.photos/seed/empowerment/800/800",
        badgeText: "Empowerment",
        badgeColor: "black",
        icon: "Briefcase"
    },
    {
        id: '2',
        title: "Charity and Community Development",
        description: "We purchase beds mattresses and essential mobility equipment for vulnerable households ensuring everyone has a safe place to rest. This includes rapid interventions like providing 36500 KES for Elizabeth Muthoni in Nakuru to purchase a wheelchair and startup capital.",
        imageUrl: "https://picsum.photos/seed/community/800/800",
        badgeText: "Community",
        badgeColor: "green",
        icon: "Heart"
    },
    {
        id: '3',
        title: "Education Support",
        description: "We settle school fee balances and provide student upkeep to keep the next generation in classrooms where they belong. We deploy large scale support like the 60000 KES provided to the Githunguri CBO to cover school fees for students living with disabilities.",
        imageUrl: "https://picsum.photos/seed/education/800/800",
        badgeText: "Education",
        badgeColor: "red",
        icon: "GraduationCap"
    },
    {
        id: '4',
        title: "Critical Medical Relief",
        description: "We cover urgent pharmacy bills hospital procedures and vital health insurance payments to protect the wellbeing of our community. This includes covering emergency medications such as the 30450 KES disbursed for Mercy Karwira in Nyeri.",
        imageUrl: "https://picsum.photos/seed/health/800/800",
        badgeText: "Health",
        badgeColor: "green",
        icon: "AlertCircle"
    }
];