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