import React, {useState, useEffect, useRef} from 'react';
import {
    Heart,
    MessageCircle,
    Send,
    PlayCircle,
    ArrowLeft,
    MapPin,
    Calendar,
    User,
    Share2,
    X,
    ChevronLeft,
    ChevronRight,
    HeartHandshake,
    ArrowRight,
    Facebook,
    Instagram,
    Link as LinkIcon,
    Check,
    Copy
} from 'lucide-react';
import {type Story, type Comment, Page} from '../types';
import "../assets/updates.css"
import {DonationsList} from "./Donations.tsx";
import StoriesSlider from "./StoriesSlider.tsx";
import {DEFAULT_STORIES} from "../hook/useStories.ts";
// Custom Icons for brands
const XLogo = ({className}: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
);

const TikTokLogo = ({className}: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path
            d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
);

const REACTION_EMOJIS = ['❤️‍🩹', '🙏', '💐', '💚', '✨', '👏'];



// Helper to get story ID from URL
const getStoryIdFromUrl = () => {
    if (typeof window === 'undefined') return null;
    const params = new URLSearchParams(window.location.search);
    return params.get('story');
};



// Helper Component for cycling donors
const DonorTicker = ({donors}: { donors?: { name: string; amount: number }[] }) => {
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        if (!donors || donors.length <= 1) return;
        const interval = setInterval(() => {
            setFade(false); // Start fade out
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % donors.length);
                setFade(true); // Start fade in
            }, 300); // Wait for fade out
        }, 3000); // Change every 3 seconds
        return () => clearInterval(interval);
    }, [donors]);

    if (!donors || donors.length === 0) return <span>Be the first to donate</span>;

    const current = donors[index];

    // Safely handle potential missing data in current
    if (!current) return <span>Be the first to donate</span>;

    return (
        <span className={`transition-opacity duration-300 inline-block ${fade ? 'opacity-100' : 'opacity-0'}`}>
            <span
                className="font-bold text-gray-900">{current.name || 'Anonymous'}</span> donated KES {(current.amount || 0).toLocaleString()}
        </span>
    );
};

interface StoriesProps {
    setPage?: (page: Page) => void;
    limit?: number;
    title?: string;
    showDonateButton?: boolean;
    onStoryStateChange?: (isOpen: boolean) => void;
}

export const Stories: React.FC<StoriesProps> = ({setPage, limit, title, showDonateButton, onStoryStateChange}) => {
    // Initialize state lazily to avoid setState in useEffect
    const [stories, setStories] = useState<Story[]>(() => {
        const stored = localStorage.getItem('stories');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (!Array.isArray(parsed)) throw new Error("Not an array");
                // Validate and migrate data
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return parsed.map((s: any, i: number) => ({
                    ...s,
                    // Ensure required fields exist, falling back to defaults if data is corrupted/old
                    // If raised is 0 or missing, give it a random meaningful start value so live updates look good
                    raised: (typeof s.raised === 'number' && s.raised > 0) ? s.raised : Math.floor(Math.random() * 20000) + 5000,
                    goal: typeof s.goal === 'number' ? s.goal : 100000,
                    recentDonors: s.recentDonors || DEFAULT_STORIES[i % DEFAULT_STORIES.length]?.recentDonors || []
                }));
            } catch (e) {
                console.error("Failed to parse stories from local storage", e);
                return DEFAULT_STORIES;
            }
        }
        return DEFAULT_STORIES;
    });

    const [commentInput, setCommentInput] = useState<{ [key: string]: string }>({});
    const [selectedStoryId, setSelectedStoryId] = useState<string | null>(getStoryIdFromUrl());
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [showReactions, setShowReactions] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [showStickyFooter, setShowStickyFooter] = useState(false);

    // Carousel State
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const reactionsRef = useRef<HTMLDivElement>(null); // Ref for reaction tray
    const topButtonsRef = useRef<HTMLDivElement>(null); // Ref for the top mobile buttons to track visibility
    const [currentSlide, setCurrentSlide] = useState(0);

    // Share Modal State
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [storyToShare, setStoryToShare] = useState<Story | null>(null);
    const [copied, setCopied] = useState(false);

    // Ensure default data is persisted if not present
    useEffect(() => {
        if (!localStorage.getItem('stories')) {
            localStorage.setItem('stories', JSON.stringify(DEFAULT_STORIES));
        }
    }, []);

    // Listen for browser navigation (Back/Forward) specifically for story ID
    useEffect(() => {
        const handlePopState = () => {
            const storyId = getStoryIdFromUrl();
            if (storyId !== selectedStoryId) {
                if (storyId) {
                    // Opening new story (or forward)
                    setSelectedStoryId(storyId);
                } else {
                    // Closing story (back button)
                    setSelectedStoryId(null);
                    setCurrentSlide(0);
                    setShowReactions(false);
                    setIsExpanded(false);
                    setShowStickyFooter(false);
                }
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [selectedStoryId]);

    // Notify parent about story open/close state
    useEffect(() => {
        onStoryStateChange?.(!!selectedStoryId);
    }, [selectedStoryId, onStoryStateChange]);

    // Consolidate story selection logic to update state AND push history
    const handleStorySelection = (id: string | null) => {
        const url = new URL(window.location.href);
        if (id) {
            url.searchParams.set('story', id);
        } else {
            url.searchParams.delete('story');
        }

        try {
            // Use relative URL query string to avoid SecurityError
            window.history.pushState({}, '', '?' + url.searchParams.toString());
        } catch (e) {
            console.warn("History update failed:", e);
        }
        // Dispatch popstate event to notify other listeners
        window.dispatchEvent(new PopStateEvent('popstate', {state: {}}));

        setSelectedStoryId(id);
        setCurrentSlide(0);
        setShowReactions(false);
        setIsExpanded(false);
        setShowStickyFooter(false);
    };

    // Reset Scroll on story change (Side effect only)
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = 0;
        }
        // State resets moved to handleStorySelection to prevent cascading render warning
    }, [selectedStoryId]);

    // Close reactions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (showReactions && reactionsRef.current && !reactionsRef.current.contains(event.target as Node)) {
                setShowReactions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showReactions]);

    // Track intersection of top mobile buttons to show/hide sticky footer
    useEffect(() => {
        if (!selectedStoryId) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Show sticky footer if the original buttons are NOT visible
                // AND they have scrolled up above the viewport (top < 0).
                if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
                    setShowStickyFooter(true);
                } else {
                    setShowStickyFooter(false);
                }
            },
            {threshold: 0}
        );

        if (topButtonsRef.current) {
            observer.observe(topButtonsRef.current);
        }

        return () => observer.disconnect();
    }, [selectedStoryId]);

    const activeStory = selectedStoryId ? stories.find(s => s.id === selectedStoryId) : null;
    const displayedStories = limit ? stories.slice(0, limit) : stories;

    // Carousel Media Preparation
    const allMedia = activeStory ? [
        {type: activeStory.mediaType, url: activeStory.mediaUrl},
        ...(activeStory.gallery?.map(url => ({type: 'image' as const, url})) || [])
    ] : [];

    // Fundraising Circle Calculations (Detail View)
    // Add safe checks for undefined properties
    const raised = activeStory?.raised || 0;
    const goal = activeStory?.goal || 1; // Avoid division by zero
    const progress = activeStory ? Math.min((raised / goal) * 100, 100) : 0;
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    // Small radius for sticky footer
    const smallRadius = 16;
    const smallCircumference = 2 * Math.PI * smallRadius;
    const smallOffset = smallCircumference - (progress / 100) * smallCircumference;


    // Carousel Scroll Handler
    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const index = Math.round(scrollContainerRef.current.scrollLeft / scrollContainerRef.current.clientWidth);
            setCurrentSlide(index);
        }
    };

    // Scroll buttons for desktop
    const scrollPrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        scrollContainerRef.current?.scrollBy({left: -scrollContainerRef.current.clientWidth, behavior: 'smooth'});
    };

    const scrollNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        scrollContainerRef.current?.scrollBy({left: scrollContainerRef.current.clientWidth, behavior: 'smooth'});
    };

    // Lightbox Controls
    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);

    const nextLightboxImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (lightboxIndex !== null && allMedia.length > 0) {
            setLightboxIndex((prev) => (prev! + 1) % allMedia.length);
        }
    };

    const prevLightboxImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (lightboxIndex !== null && allMedia.length > 0) {
            setLightboxIndex((prev) => (prev! - 1 + allMedia.length) % allMedia.length);
        }
    };

    // Keyboard Navigation for Lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextLightboxImage();
            if (e.key === 'ArrowLeft') prevLightboxImage();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxIndex, allMedia]);


    const updateStories = (newStories: Story[]) => {
        setStories(newStories);
        localStorage.setItem('stories', JSON.stringify(newStories));
    };

    const handleLike = (e: React.MouseEvent, id: string) => {
        e.stopPropagation(); // Prevent opening story if clicking like button
        const updated = stories.map(story => {
            if (story.id === id) {
                return {...story, likes: story.likes + 1};
            }
            return story;
        });
        updateStories(updated);
    };

    const handleCommentSubmit = (e: React.FormEvent, storyId: string) => {
        e.preventDefault();
        e.stopPropagation();
        const text = commentInput[storyId];
        if (!text || !text.trim()) return;

        const newComment: Comment = {
            id: Date.now().toString(),
            author: "Visitor", // In a real app, this would be the logged-in user
            text: text.trim(),
            date: new Date().toISOString()
        };

        const updated = stories.map(story => {
            if (story.id === storyId) {
                return {...story, comments: [...story.comments, newComment]};
            }
            return story;
        });

        updateStories(updated);
        setCommentInput({...commentInput, [storyId]: ''});
    };

    const handleInputChange = (storyId: string, value: string) => {
        setCommentInput({...commentInput, [storyId]: value});
    };

    const handleDonate = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPage?.(Page.DONATE);
    };

    const handleShareClick = (e: React.MouseEvent, story: Story) => {
        e.stopPropagation();
        setStoryToShare(story);
        setShareModalOpen(true);
        setCopied(false);
    };

    const closeShareModal = () => {
        setShareModalOpen(false);
        setStoryToShare(null);
    };

    const handleSocialShare = (platform: 'facebook' | 'x' | 'instagram' | 'tiktok' | 'copy') => {
        if (!storyToShare) return;

        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(`Read this inspiring story from Tushinde Charity: ${storyToShare.title}`);

        if (platform === 'facebook') {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
        } else if (platform === 'x') {
            window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
        } else {
            // Instagram, TikTok, and Copy Link all rely on clipboard for web
            navigator.clipboard.writeText(window.location.href).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        }
    };

    // Render helper for the Share Modal
    const renderShareModal = () => {
        if (!shareModalOpen) return null;

        return (
            <div
                className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
                onClick={closeShareModal}>
                <div
                    className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 transform transition-all animate-slide-up sm:animate-fade-in"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Share this story</h3>
                        <button onClick={closeShareModal}
                                className="text-gray-500 hover:text-gray-900 p-1 bg-gray-100 rounded-full">
                            <X className="w-5 h-5"/>
                        </button>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-6">
                        <button onClick={() => handleSocialShare('facebook')}
                                className="flex flex-col items-center gap-2 group">
                            <div
                                className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <Facebook className="w-7 h-7"/>
                            </div>
                            <span className="text-xs font-medium text-gray-600">Facebook</span>
                        </button>

                        <button onClick={() => handleSocialShare('x')}
                                className="flex flex-col items-center gap-2 group">
                            <div
                                className="w-14 h-14 bg-gray-100 text-gray-900 rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                                <XLogo className="w-6 h-6"/>
                            </div>
                            <span className="text-xs font-medium text-gray-600">X</span>
                        </button>

                        <button onClick={() => handleSocialShare('instagram')}
                                className="flex flex-col items-center gap-2 group">
                            <div
                                className="w-14 h-14 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center group-hover:bg-gradient-to-tr group-hover:from-yellow-400 group-hover:via-red-500 group-hover:to-purple-600 group-hover:text-white transition-all">
                                <Instagram className="w-7 h-7"/>
                            </div>
                            <span className="text-xs font-medium text-gray-600">Instagram</span>
                        </button>

                        <button onClick={() => handleSocialShare('tiktok')}
                                className="flex flex-col items-center gap-2 group">
                            <div
                                className="w-14 h-14 bg-gray-100 text-gray-900 rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                                <TikTokLogo className="w-6 h-6"/>
                            </div>
                            <span className="text-xs font-medium text-gray-600">TikTok</span>
                        </button>
                    </div>

                    <div className="relative">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                            <div className="p-2 bg-white rounded-lg shadow-sm">
                                <LinkIcon className="w-5 h-5 text-gray-400"/>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-500 mb-0.5">Page Link</p>
                                <p className="text-sm font-medium text-gray-900 truncate">tushindecharity.org/stories</p>
                            </div>
                            <button
                                onClick={() => handleSocialShare('copy')}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${copied ? 'bg-green-100 text-green-700' : 'bg-gray-900 text-white hover:bg-gray-800'}`}
                            >
                                {copied ? <Check className="w-4 h-4"/> : <Copy className="w-4 h-4"/>}
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                        {copied && (
                            <div
                                className="absolute top-full left-0 right-0 text-center mt-2 text-xs text-green-600 font-medium animate-fade-in">
                                Link copied! You can now paste it in your app.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    if (activeStory) {
        // Truncation Logic
        const TRUNCATE_LIMIT = 300; // Character limit for truncation
        const shouldTruncate = activeStory.content.length > TRUNCATE_LIMIT;
        const displayedContent = isExpanded || !shouldTruncate
            ? activeStory.content
            : activeStory.content.slice(0, TRUNCATE_LIMIT).trim() + "...";

        return (
            <div className="bg-gray-50 py-0 sm:py-8 px-0 sm:px-6 lg:px-8 animate-fade-in relative">
                <div className="max-w-4xl mx-auto">
                    <div className="p-4 sm:p-0">
                        <button
                            onClick={() => handleStorySelection(null)}
                            className="flex items-center gap-2 text-gray-600 hover:text-kenya-green font-medium mb-4 sm:mb-6 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5"/> Back to Stories
                        </button>
                    </div>

                    <div
                        className="bg-white rounded-none sm:rounded-2xl shadow-none sm:shadow-xl overflow-hidden border-y sm:border border-gray-100">

                        {/* Media Carousel */}
                        <div className="w-full relative group bg-black sm:rounded-t-2xl overflow-hidden shadow-sm">
                            <div
                                ref={scrollContainerRef}
                                onScroll={handleScroll}
                                className="flex w-full overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
                                style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}
                            >
                                {allMedia.map((media, idx) => (
                                    <div
                                        key={idx}
                                        className="w-full flex-shrink-0 snap-center relative aspect-square sm:aspect-video flex items-center justify-center bg-black cursor-pointer"
                                        onClick={() => openLightbox(idx)}
                                    >
                                        {media.type === 'video' ? (
                                            <video
                                                src={media.url}
                                                controls
                                                className="w-full h-full object-contain"
                                            />
                                        ) : (
                                            <img
                                                src={media.url}
                                                alt={`${activeStory.title} image ${idx + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                        {/* Mobile gradient overlay for dots visibility */}
                                        <div
                                            className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"/>
                                    </div>
                                ))}
                            </div>

                            {/* Dots Indicator */}
                            {allMedia.length > 1 && (
                                <div
                                    className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10 pointer-events-none">
                                    {allMedia.map((_, idx) => (
                                        <div
                                            key={idx}
                                            className={`w-2 h-2 rounded-full transition-all shadow-sm ${currentSlide === idx ? 'bg-white scale-125' : 'bg-white/40'}`}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Desktop Navigation Buttons */}
                            {allMedia.length > 1 && (
                                <>
                                    <button
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all hidden md:block opacity-0 group-hover:opacity-100"
                                        onClick={scrollPrev}
                                    >
                                        <ChevronLeft className="w-6 h-6"/>
                                    </button>
                                    <button
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all hidden md:block opacity-0 group-hover:opacity-100"
                                        onClick={scrollNext}
                                    >
                                        <ChevronRight className="w-6 h-6"/>
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Fundraising Progress Widget */}
                        <div className="flex items-center gap-4 px-4 py-6 border-b border-gray-100 bg-white">
                            <div className="relative w-14 h-14 flex-shrink-0">
                                {/* Background Circle */}
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle
                                        cx="28"
                                        cy="28"
                                        r={radius}
                                        stroke="#d1d5db"
                                        strokeWidth="5"
                                        fill="transparent"
                                    />
                                    {/* Progress Circle */}
                                    <circle
                                        cx="28"
                                        cy="28"
                                        r={radius}
                                        stroke="#006600"
                                        strokeWidth="5"
                                        fill="transparent"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={offset}
                                        strokeLinecap="round"
                                        className="transition-all duration-1000 ease-out"
                                    />
                                </svg>
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-baseline flex-wrap gap-x-1.5">
                                     <span className="text-xl font-bold text-gray-900">
                                        KES {activeStory.raised.toLocaleString()}
                                    </span>
                                    <span className="text-sm text-gray-500 font-medium">
                                        raised of KES {activeStory.goal.toLocaleString()}
                                    </span>
                                </div>
                                <div
                                    className="flex items-center text-sm text-gray-600 mt-1 cursor-pointer hover:underline group">
                                    <span className="truncate max-w-[200px] sm:max-w-xs font-medium flex-1">
                                        <DonorTicker donors={activeStory.recentDonors}/>
                                    </span>
                                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 ml-0.5"/>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Action Buttons (Below Progress) - REF ATTACHED HERE */}
                        <div ref={topButtonsRef}
                             className="flex sm:hidden items-center gap-3 px-4 py-4 border-b border-gray-100 bg-white">
                            <button
                                onClick={() => setPage?.(Page.DONATE)}
                                className="flex-1 bg-[#d9f99d] text-[#14532d] py-3.5 rounded-full font-bold text-base shadow-sm hover:bg-[#bef264] transition-colors flex items-center justify-center gap-2"
                            >
                                Donate
                            </button>
                            <button
                                onClick={(e) => handleShareClick(e, activeStory)}
                                className="flex-1 bg-[#14532d] text-white py-3.5 rounded-full font-bold text-base shadow-sm hover:bg-[#052e16] transition-colors flex items-center justify-center gap-2"
                            >
                                Share
                            </button>
                        </div>


                        <div className="p-4 sm:p-12">
                            {/* Detail Header */}
                            <div
                                className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-gray-100 pb-8">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">{activeStory.title}</h1>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <User className="w-4 h-4"/>
                                            <span>{activeStory.name}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4"/>
                                            <span>{activeStory.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4"/>
                                            <span>{new Date(activeStory.date).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={(e) => handleLike(e, activeStory.id)}
                                        className="hidden sm:flex flex-col items-center gap-1 text-gray-500 hover:text-kenya-red transition-colors group"
                                    >
                                        <div
                                            className="bg-gray-100 p-3 rounded-full group-hover:bg-red-50 transition-colors">
                                            <Heart className="w-6 h-6 group-hover:fill-current"/>
                                        </div>
                                        <span className="text-xs font-bold">{activeStory.likes}</span>
                                    </button>
                                    {/* Desktop Share Button - hidden on mobile to avoid duplication */}
                                    <button
                                        onClick={(e) => handleShareClick(e, activeStory)}
                                        className="hidden sm:flex flex-col items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors group"
                                    >
                                        <div
                                            className="bg-gray-100 p-3 rounded-full group-hover:bg-blue-50 transition-colors">
                                            <Share2 className="w-6 h-6"/>
                                        </div>
                                        <span className="text-xs font-bold">Share</span>
                                    </button>
                                </div>
                            </div>

                            {/* Detail Content */}
                            <div className="prose prose-lg max-w-none text-gray-700 mb-6 sm:mb-12 leading-relaxed">
                                <p className="whitespace-pre-wrap">{displayedContent}</p>
                                {shouldTruncate && !isExpanded && (
                                    <button
                                        onClick={() => setIsExpanded(true)}
                                        className="mt-2 text-kenya-green font-bold text-base underline hover:text-green-700 focus:outline-none"
                                    >
                                        Read more
                                    </button>
                                )}
                            </div>

                            {/* Mobile Reactions Bar (New Addition) */}
                            <div
                                className="flex sm:hidden items-center justify-between py-4 border-t border-gray-100 mb-4 px-2">

                                {/* React Button & Popover Container */}
                                <div className="relative" ref={reactionsRef}>
                                    {/* Popover/Floating Menu */}
                                    {showReactions && (
                                        <div
                                            className="absolute bottom-full left-0 mb-3 bg-white shadow-xl rounded-full p-2 border border-gray-100 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 z-20 whitespace-nowrap overflow-x-auto max-w-[80vw]">
                                            {REACTION_EMOJIS.map((emoji) => (
                                                <button
                                                    key={emoji}
                                                    onClick={(e) => {
                                                        handleLike(e, activeStory.id);
                                                        setShowReactions(false); // Close after reacting
                                                    }}
                                                    className="text-2xl hover:scale-125 transition-transform p-1"
                                                >
                                                    {emoji}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Main Trigger Button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowReactions(!showReactions);
                                        }}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-full transition-colors ${showReactions ? 'bg-green-50 text-kenya-green' : 'text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        <div className="relative">
                                            <Heart className={`w-6 h-6 ${showReactions ? 'fill-current' : ''}`}/>
                                            <div
                                                className="absolute -bottom-1 -right-1 bg-white rounded-full w-3.5 h-3.5 flex items-center justify-center shadow-sm border border-gray-100">
                                                <span
                                                    className="text-[10px] text-gray-500 font-bold leading-none">+</span>
                                            </div>
                                        </div>
                                        <span className="text-sm font-semibold">React</span>
                                    </button>
                                </div>

                                {/* Right Side: Count & Summary */}
                                <div className="flex items-center gap-2">
                                    {/* Static Emoji Summary - visual only */}
                                    <div className="flex items-center -space-x-1">
                                        {['❤️', '🙏', '✨'].map((emoji, i) => (
                                            <span key={i}
                                                  className="text-xs bg-white rounded-full border border-white relative z-10 flex items-center justify-center w-5 h-5">{emoji}</span>
                                        ))}
                                    </div>
                                    <span
                                        className="text-gray-900 font-bold text-sm underline decoration-gray-300 underline-offset-4">
                                        {activeStory.likes}
                                    </span>
                                </div>
                            </div>

                            {/* Mobile Donate & Share Buttons (Requested Update) */}
                            <div className="flex sm:hidden gap-4 mb-10 px-2">
                                <button
                                    onClick={() => setPage?.(Page.DONATE)}
                                    className="flex-1 bg-white border border-gray-300 text-gray-900 py-3 rounded-full font-bold text-base hover:bg-gray-50 transition-colors"
                                >
                                    Donate
                                </button>
                                <button
                                    onClick={(e) => handleShareClick(e, activeStory)}
                                    className="flex-1 bg-white border border-gray-300 text-gray-900 py-3 rounded-full font-bold text-base hover:bg-gray-50 transition-colors"
                                >
                                    Share
                                </button>
                            </div>
                            {/*updates*/}
                           <DonationsList/>

                            {/*similar stories*/}
                            <StoriesSlider
                                onStorySelect={handleStorySelection}
                                onViewAllClick={() => {
                                    // Navigate to view all stories
                                    if (setPage) {
                                        setPage(Page.STORIES);
                                    } else {
                                        // Fallback URL update
                                        const url = new URL(window.location.href);
                                        url.searchParams.delete('story');
                                        url.searchParams.set('page', 'stories');
                                        window.history.pushState({}, '', '?' + url.searchParams.toString());
                                        window.dispatchEvent(new PopStateEvent('popstate', { state: {} }));
                                    }
                                }}
                            />                            {/* Donate Call to Action */}
                            {/*<div className="bg-green-50 rounded-xl p-8 mb-12 text-center border border-green-100">*/}
                            {/*    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">Inspired by this*/}
                            {/*        story?</h3>*/}
                            {/*    <p className="text-gray-600 mb-6">Your donation can help more people*/}
                            {/*        like {activeStory.name} achieve their dreams.</p>*/}
                            {/*    <button*/}
                            {/*        onClick={() => setPage?.(Page.DONATE)}*/}
                            {/*        className="bg-kenya-red text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-red-700 transition-transform hover:scale-105 flex items-center gap-2 mx-auto"*/}
                            {/*    >*/}
                            {/*        <HeartHandshake className="w-5 h-5"/> Donate Now*/}
                            {/*    </button>*/}
                            {/*</div>*/}

                            {/* Comments Section */}
                            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <MessageCircle className="w-5 h-5"/>
                                    Comments ({activeStory.comments.length})
                                </h3>

                                <div className="space-y-6 mb-8">
                                    {activeStory.comments.length === 0 ? (
                                        <p className="text-gray-500 italic text-center py-4">No comments yet. Be the
                                            first to share your thoughts!</p>
                                    ) : (
                                        activeStory.comments.map(comment => (
                                            <div key={comment.id}
                                                 className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                                <div className="flex justify-between items-start mb-2">
                                                        <span
                                                            className="font-bold text-gray-900">{comment.author}</span>
                                                    <span
                                                        className="text-xs text-gray-400">{new Date(comment.date).toLocaleDateString()}</span>
                                                </div>
                                                <p className="text-gray-700">{comment.text}</p>
                                            </div>
                                        ))
                                    )}
                                </div>

                                <form onSubmit={(e) => handleCommentSubmit(e, activeStory.id)}
                                      className="flex gap-2 sm:gap-4">
                                    <input
                                        type="text"
                                        placeholder="Add a public comment..."
                                        className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-2 focus:ring-kenya-green focus:border-transparent min-w-0"
                                        value={commentInput[activeStory.id] || ''}
                                        onChange={(e) => handleInputChange(activeStory.id, e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                    <button
                                        type="submit"
                                        onClick={(e) => e.stopPropagation()}
                                        disabled={!commentInput[activeStory.id]}
                                        className="bg-kenya-green text-white px-4 py-2 sm:px-6 rounded-lg font-bold hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center gap-2 whitespace-nowrap"
                                    >
                                        <Send className="w-4 h-4"/> Post
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sticky Footer for Mobile (New) */}
                {showStickyFooter && activeStory && (
                    <div
                        className="fixed bottom-0 left-0 right-0 bg-white z-[100] border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] rounded-t-2xl p-4 animate-slide-up sm:hidden">
                        {/* Progress Info Row */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="relative w-10 h-10 flex-shrink-0">
                                {/* SVG Circle */}
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle
                                        cx="20"
                                        cy="20"
                                        r={smallRadius}
                                        stroke="#d1d5db"
                                        strokeWidth="4"
                                        fill="transparent"
                                    />
                                    {/* Progress Circle */}
                                    <circle
                                        cx="20"
                                        cy="20"
                                        r={smallRadius}
                                        stroke="#bef264"
                                        strokeWidth="4"
                                        fill="transparent"
                                        strokeDasharray={smallCircumference}
                                        strokeDashoffset={smallOffset}
                                        strokeLinecap="round"
                                        className="transition-all duration-1000 ease-out"
                                    />
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-baseline gap-1.5 flex-wrap">
                                    <span
                                        className="font-bold text-gray-900 text-sm">KES {activeStory.raised.toLocaleString()}</span>
                                    <span
                                        className="text-xs text-gray-500">raised of KES {activeStory.goal.toLocaleString()}</span>
                                </div>
                                <div
                                    className="text-xs text-gray-500 truncate flex items-center gap-1 mt-0.5 cursor-pointer">
                                    <DonorTicker donors={activeStory.recentDonors}/>
                                    <ChevronRight className="w-3 h-3 text-gray-400"/>
                                </div>
                            </div>
                        </div>

                        {/* Buttons Row */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setPage?.(Page.DONATE)}
                                className="flex-1 bg-[#bef264] text-[#1a2e05] font-bold py-3 rounded-full text-base hover:bg-[#a3e635] transition-colors"
                            >
                                Donate
                            </button>
                            <button
                                onClick={(e) => handleShareClick(e, activeStory)}
                                className="flex-1 bg-[#14532d] text-white font-bold py-3 rounded-full text-base hover:bg-[#052e16] transition-colors"
                            >
                                Share
                            </button>
                        </div>
                    </div>
                )}

                {/* Lightbox Modal */}
                {lightboxIndex !== null && allMedia.length > 0 && (
                    <div
                        className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center animate-fade-in select-none"
                        onClick={closeLightbox}>
                        {/* Close Button */}
                        <button
                            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-50"
                            onClick={closeLightbox}
                        >
                            <X className="w-8 h-8"/>
                        </button>

                        {/* Previous Button */}
                        <button
                            className="absolute left-4 text-white/70 hover:text-white p-4 hover:bg-white/10 rounded-full transition-colors hidden sm:block z-50"
                            onClick={prevLightboxImage}
                        >
                            <ChevronLeft className="w-10 h-10"/>
                        </button>

                        {/* Image */}
                        <div className="relative w-full h-full flex items-center justify-center p-4">
                            {allMedia[lightboxIndex].type === 'video' ? (
                                <video
                                    src={allMedia[lightboxIndex].url}
                                    controls
                                    autoPlay
                                    className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl rounded-lg"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            ) : (
                                <img
                                    src={allMedia[lightboxIndex].url}
                                    alt={`Gallery ${lightboxIndex + 1}`}
                                    className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl rounded-lg"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            )}
                        </div>

                        {/* Next Button */}
                        <button
                            className="absolute right-4 text-white/70 hover:text-white p-4 hover:bg-white/10 rounded-full transition-colors hidden sm:block z-50"
                            onClick={nextLightboxImage}
                        >
                            <ChevronRight className="w-10 h-10"/>
                        </button>

                        {/* Counter */}
                        <div
                            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/90 text-sm font-medium bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                            {lightboxIndex + 1} / {allMedia.length}
                        </div>
                    </div>
                )}

                {renderShareModal()}
            </div>
        );
    }

    // Default View (List of Stories)
    return (
        <div className="bg-gray-50 py-0 sm:py-12 relative">
            <div className="w-full px-0 sm:px-6 lg:px-8">
                <div className="text-center mb-2 sm:mb-12 py-3 sm:py-0 px-4 sm:px-0">
                    <h1 className="text-2xl sm:text-4xl font-serif font-bold text-gray-900 mb-2 sm:mb-4 leading-tight">{title || "Community Stories"}</h1>
                    {showDonateButton ? (
                        <div className="mt-3 sm:mt-6 flex justify-center">
                            <button
                                onClick={() => setPage?.(Page.DONATE)}
                                className="bg-kenya-green hover:bg-green-800 text-white px-6 py-2 sm:px-10 sm:py-3.5 rounded-full font-bold text-sm sm:text-lg shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl"
                            >
                                Start Donating
                            </button>
                        </div>
                    ) : (
                        <p className="text-gray-600">Real people, real impact. Join the conversation.</p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-4 sm:gap-8">
                    {displayedStories.map(story => {
                        // Safe defaults
                        const raised = story.raised || 0;
                        const goal = story.goal || 1;
                        const storyProgress = Math.min((raised / goal) * 100, 100);
                        const storyRadius = 18;
                        const storyCircumference = 2 * Math.PI * storyRadius;
                        const storyOffset = storyCircumference - (storyProgress / 100) * storyCircumference;

                        return (
                            <div
                                key={story.id}
                                onClick={() => handleStorySelection(story.id)}
                                className="bg-white rounded-none sm:rounded-xl shadow-sm sm:shadow-lg overflow-hidden border-y sm:border border-gray-200 sm:border-gray-100 flex flex-col cursor-pointer sm:hover:shadow-2xl transition-all transform sm:hover:-translate-y-1 group"
                            >
                                {/* Header */}
                                <div className="p-4 flex items-center justify-between border-b border-gray-50">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold">
                                            {story.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 leading-tight group-hover:text-kenya-green transition-colors">{story.title}</h3>
                                            <p className="text-xs text-gray-500">{story.name} • {story.location}</p>
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        {new Date(story.date).toLocaleDateString()}
                                    </div>
                                </div>

                                {/* Media */}
                                <div className="w-full relative">
                                    <div className="overflow-hidden relative">
                                        {story.mediaType === 'video' ? (
                                            <div
                                                className="relative w-full aspect-video bg-gray-900 flex items-center justify-center">
                                                <video
                                                    src={story.mediaUrl}
                                                    // Controls removed in preview to encourage clicking the card
                                                    className="w-full h-full object-contain pointer-events-none"
                                                />
                                                <div
                                                    className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                                                    <PlayCircle className="w-12 h-12 text-white opacity-80"/>
                                                </div>
                                            </div>
                                        ) : (
                                            <img
                                                src={story.mediaUrl}
                                                alt={story.title}
                                                className="w-full h-72 sm:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Fundraising Progress Widget (List View) */}
                                <div
                                    className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                                    <div className="relative w-12 h-12 flex-shrink-0">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle
                                                cx="24"
                                                cy="24"
                                                r={storyRadius}
                                                stroke="#e5e7eb"
                                                strokeWidth="4"
                                                fill="transparent"
                                            />
                                            <circle
                                                cx="24"
                                                cy="24"
                                                r={storyRadius}
                                                stroke="#006600"
                                                strokeWidth="4"
                                                fill="transparent"
                                                strokeDasharray={storyCircumference}
                                                strokeDashoffset={storyOffset}
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-baseline flex-wrap gap-x-1">
                                            <span className="text-sm font-bold text-gray-900">
                                                KES {raised.toLocaleString()}
                                            </span>
                                            <span className="text-xs text-gray-500 font-medium">
                                                raised of KES {goal.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-xs text-gray-600 mt-0.5">
                                             <span className="truncate font-medium text-gray-500 flex-1">
                                                <DonorTicker donors={story.recentDonors}/>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Mobile Action Buttons (List View) */}
                                <div
                                    className="flex sm:hidden items-center gap-3 px-4 py-3 border-b border-gray-100 bg-white"
                                    onClick={(e) => e.stopPropagation()}>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setPage?.(Page.DONATE);
                                        }}
                                        className="flex-1 bg-[#d9f99d] text-[#14532d] py-2.5 rounded-full font-bold text-sm shadow-sm hover:bg-[#bef264] transition-colors flex items-center justify-center gap-2"
                                    >
                                        Donate
                                    </button>
                                    <button
                                        onClick={(e) => handleShareClick(e, story)}
                                        className="flex-1 bg-[#14532d] text-white py-2.5 rounded-full font-bold text-sm shadow-sm hover:bg-[#052e16] transition-colors flex items-center justify-center gap-2"
                                    >
                                        Share
                                    </button>
                                </div>

                                {/* Actions & Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-6 mb-4">
                                        <button
                                            onClick={(e) => handleLike(e, story.id)}
                                            className="flex items-center gap-2 text-gray-600 hover:text-kenya-red transition-colors group/like"
                                        >
                                            <Heart className="w-6 h-6 group-hover/like:fill-current transition-colors"/>
                                            <span className="font-medium">{story.likes} Likes</span>
                                        </button>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <MessageCircle className="w-6 h-6"/>
                                            <span className="font-medium">{story.comments.length} Comments</span>
                                        </div>
                                    </div>

                                    <p className="text-gray-800 mb-6 leading-relaxed flex-grow line-clamp-3">
                                        <span className="font-bold mr-2">{story.name}</span>
                                        {story.content}
                                    </p>
                                    <span className="text-kenya-green text-sm font-bold mb-4 hover:underline">Read full story &rarr;</span>

                                    {/* Desktop Donate & Share Buttons */}
                                    <div
                                        className="hidden sm:grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-gray-100">
                                        <button
                                            onClick={handleDonate}
                                            className="bg-kenya-red text-white py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-700 transition-colors shadow-sm"
                                        >
                                            <HeartHandshake className="w-4 h-4"/> Donate
                                        </button>
                                        <button
                                            onClick={(e) => handleShareClick(e, story)}
                                            className="bg-gray-50 text-gray-700 border border-gray-200 py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                                        >
                                            <Share2 className="w-4 h-4"/> Share
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {limit && stories.length > limit && (
                    <div className="mt-8 sm:mt-12 text-center px-4 sm:px-0 mb-12 sm:mb-0">
                        <button
                            onClick={() => setPage?.(Page.STORIES)}
                            className="bg-white border-2 border-kenya-green text-kenya-green hover:bg-kenya-green hover:text-white px-8 py-3 rounded-full font-bold transition-all shadow-sm flex items-center gap-2 mx-auto"
                        >
                            View More Stories <ArrowRight className="w-5 h-5"/>
                        </button>
                    </div>
                )}

                {renderShareModal()}
            </div>
        </div>
    );
};