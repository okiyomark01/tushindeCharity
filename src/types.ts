import type { ElementType } from 'react';

export interface Program {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  badgeText: string;
  badgeColor: 'green' | 'red' | 'black';
  icon: 'Heart' | 'GraduationCap' | 'Briefcase' | 'AlertCircle';
}

export type MediaType = 'image' | 'video';

export interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}

export interface Story {
  id: string;
  name: string;
  title: string;
  content: string;
  mediaUrl: string;
  mediaType: MediaType;
  location: string;
  likes: number;
  comments: Comment[];
  date: string;
  gallery?: string[];
  // Fundraising Fields
  raised: number;
  goal: number;
  category: 'Medical' | 'Education' | 'Emergency' | 'Business' | 'Community';
  donorCount?: number;
  recentDonors?: { name: string; amount: number }[];
  paybillNumber?: string;
  accountNumber?: string;
  isLive?: boolean;
}

export interface ApplicationForm {
  fullName: string;
  nationalId: string;
  location: string;
  assistanceType: 'Medical' | 'Education' | 'Business' | 'Emergency' | '';
  description: string;
  id?: number;
  status?: 'Pending' | 'Approved' | 'Rejected';
  date?: string;
  notes?: string; // Admin notes
}

export interface Donation {
  id: string;
  donorName: string;
  amount: number;
  method: 'M-Pesa' | 'Card' | 'Bank Transfer';
  date: string;
  status: 'Completed' | 'Pending';
  reference: string;
}

export interface ImpactStat {
  label: string;
  value: string;
  icon: ElementType;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  backgroundImageUrl: string;
}

export interface AboutContent {
  heroTitle: string;
  heroSubtitle: string;
  missionTitle: string;
  contentParagraph1: string;
  contentParagraph2: string;
  imageUrl: string;
}

export interface ContactContent {
  heroTitle: string;
  heroSubtitle: string;
  address: string;
  phone1: string;
  phone2: string;
  email1: string;
  email2: string;
}

export const Page = {
  HOME: 'home',
  ABOUT: 'about',
  PROGRAMS: 'programs',
  APPLY: 'apply',
  DONATE: 'donate',
  STORIES: 'stories',
  CONTACT: 'contact',
  ADMIN: 'admin'
} as const;

export type Page = typeof Page[keyof typeof Page];