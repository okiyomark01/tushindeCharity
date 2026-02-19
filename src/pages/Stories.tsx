import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Send, PlayCircle, ArrowLeft, MapPin, Calendar, User, Share2, X, ChevronLeft, ChevronRight, HeartHandshake, ArrowRight, Facebook, Instagram, Link as LinkIcon, Check, Copy } from 'lucide-react';
import { type Story, type Comment, Page } from '../types';

// Custom Icons for brands
const XLogo = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const TikTokLogo = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
);

const DEFAULT_STORIES: Story[] = [
    {
        id: '1',
        name: "Mama Wanjiku",
        location: "Nyeri",
        mediaUrl: "https://picsum.photos/id/1062/800/600",
        mediaType: 'image',
        title: "A Business Reborn",
        content: "After losing her vegetable stall to floods, Mama Wanjiku received a KES 15,000 grant. She now runs a thriving grocery shop and employs two youth. The grant allowed her to rebuild the structure with stronger materials and restock her inventory. 'I never thought I would recover,' she says, 'but now I am dreaming bigger than before.' Her success has inspired other women in the market to form a savings group.",
        likes: 124,
        comments: [
            { id: 'c1', author: 'Jane Doe', text: 'So inspiring!', date: new Date().toISOString() }
        ],
        date: new Date().toISOString(),
        gallery: [
            "https://picsum.photos/id/1062/800/600",
            "https://picsum.photos/id/225/800/600",
            "https://picsum.photos/id/292/800/600"
        ],
        raised: 15000,
        goal: 50000,
        category: 'Business',
        donorCount: 42
    },
    {
        id: '2',
        name: "Community Water Project",
        location: "Turkana",
        mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        mediaType: 'video',
        title: "Clean Water for All",
        content: "Watch the moment clean water flowed in the village for the first time. Thanks to the new solar-powered borehole, women no longer walk 10km a day for water. This project serves over 500 households and has significantly reduced waterborne diseases in the area. The joy on the children's faces as they splashed in the clean water was a sight to behold.",
        likes: 342,
        comments: [
            { id: 'c2', author: 'John Smith', text: 'This is incredible progress.', date: new Date().toISOString() }
        ],
        date: new Date().toISOString(),
        raised: 450000,
        goal: 600000,
        category: 'Community',
        donorCount: 315
    },
    {
        id: '3',
        name: "Kevin Omondi",
        location: "Kisumu",
        mediaUrl: "https://picsum.photos/id/1005/800/600",
        mediaType: 'image',
        title: "Walking Again",
        content: "Kevin needed a prosthetic leg after an accident. Thanks to our donors, he received a custom fitting and is back to playing football. The rehabilitation process was tough, but Kevin's determination never wavered. He now coaches a local youth team and advocates for disability rights in his community.",
        likes: 89,
        comments: [],
        date: new Date().toISOString(),
        raised: 35000,
        goal: 80000,
        category: 'Medical',
        donorCount: 56
    },
    {
        id: '4',
        name: "Halima Juma",
        location: "Mombasa",
        mediaUrl: "https://picsum.photos/id/338/800/600",
        mediaType: 'image',
        title: "First in the Family",
        content: "Halima is the first in her family to attend university. Our scholarship fund covers her Engineering degree tuition at JKUAT. She plans to specialize in civil engineering to help build better infrastructure in her hometown. 'Education is the key to unlocking potential,' Halima believes.",
        likes: 256,
        comments: [],
        date: new Date().toISOString(),
        raised: 28000,
        goal: 80000,
        category: 'Education',
        donorCount: 89
    },
    {
        id: '5',
        name: "James Kamau",
        location: "Kiambu",
        mediaUrl: "https://picsum.photos/id/1025/800/600",
        mediaType: 'image',
        title: "Emergency Relief",
        content: "When fire destroyed his home, our emergency response team provided shelter, food, and clothes for James and his 3 children within 24 hours. The swift action helped stabilize the family during a traumatic time. They are now in temporary housing and working towards a permanent solution.",
        likes: 45,
        comments: [],
        date: new Date().toISOString(),
        raised: 15000,
        goal: 100000,
        category: 'Emergency',
        donorCount: 25
    },
    {
        id: '6',
        name: "Sarah Akoth",
        location: "Siaya",
        mediaUrl: "https://picsum.photos/id/1012/800/600",
        mediaType: 'image',
        title: "Drought Resilience",
        content: "With the new irrigation kit provided by Tushinde, Sarah's farm is now yielding crops even during the dry season. She grows kale and spinach, supplying the local school and ensuring her children have nutritious meals.",
        likes: 67,
        comments: [],
        date: new Date().toISOString(),
        raised: 12000,
        goal: 40000,
        category: 'Business',
        donorCount: 18
    },
    {
        id: '7',
        name: "John & Mary",
        location: "Nakuru",
        mediaUrl: "https://picsum.photos/id/1020/800/600",
        mediaType: 'image',
        title: "A Home Rebuilt",
        content: "After a landslide destroyed their home, John and Mary received emergency shelter assistance. They are now rebuilding on safer ground with materials provided by our donors.",
        likes: 45,
        comments: [],
        date: new Date().toISOString(),
        raised: 85000,
        goal: 150000,
        category: 'Emergency',
        donorCount: 112
    }
];

interface StoriesProps {
    setPage?: (page: Page) => void;
    limit?: number;
    title?: string;
    showDonateButton?: boolean;
}

export const Stories: React.FC<StoriesProps> = ({ setPage, limit, title, showDonateButton }) => {
    // Initialize state lazily to avoid setState in useEffect
    const [stories, setStories] = useState<Story[]>(() => {
        const stored = localStorage.getItem('stories');
        return stored ? JSON.parse(stored) : DEFAULT_STORIES;
    });

    const [commentInput, setCommentInput] = useState<{ [key: string]: string }>({});
    const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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

    const activeStory = selectedStoryId ? stories.find(s => s.id === selectedStoryId) : null;
    const displayedStories = limit ? stories.slice(0, limit) : stories;

    // Lightbox Controls
    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);

    const nextLightboxImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (lightboxIndex !== null && activeStory?.gallery) {
            setLightboxIndex((prev) => (prev! + 1) % activeStory.gallery!.length);
        }
    };

    const prevLightboxImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (lightboxIndex !== null && activeStory?.gallery) {
            setLightboxIndex((prev) => (prev! - 1 + activeStory.gallery!.length) % activeStory.gallery!.length);
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
    }, [lightboxIndex, activeStory]);


    const updateStories = (newStories: Story[]) => {
        setStories(newStories);
        localStorage.setItem('stories', JSON.stringify(newStories));
    };

    const handleLike = (e: React.MouseEvent, id: string) => {
        e.stopPropagation(); // Prevent opening story if clicking like button
        const updated = stories.map(story => {
            if (story.id === id) {
                return { ...story, likes: story.likes + 1 };
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
                return { ...story, comments: [...story.comments, newComment] };
            }
            return story;
        });

        updateStories(updated);
        setCommentInput({ ...commentInput, [storyId]: '' });
    };

    const handleInputChange = (storyId: string, value: string) => {
        setCommentInput({ ...commentInput, [storyId]: value });
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
            <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4" onClick={closeShareModal}>
                <div
                    className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 transform transition-all animate-slide-up sm:animate-fade-in"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Share this story</h3>
                        <button onClick={closeShareModal} className="text-gray-500 hover:text-gray-900 p-1 bg-gray-100 rounded-full">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-6">
                        <button onClick={() => handleSocialShare('facebook')} className="flex flex-col items-center gap-2 group">
                            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <Facebook className="w-7 h-7" />
                            </div>
                            <span className="text-xs font-medium text-gray-600">Facebook</span>
                        </button>

                        <button onClick={() => handleSocialShare('x')} className="flex flex-col items-center gap-2 group">
                            <div className="w-14 h-14 bg-gray-100 text-gray-900 rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                                <XLogo className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-medium text-gray-600">X</span>
                        </button>

                        <button onClick={() => handleSocialShare('instagram')} className="flex flex-col items-center gap-2 group">
                            <div className="w-14 h-14 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center group-hover:bg-gradient-to-tr group-hover:from-yellow-400 group-hover:via-red-500 group-hover:to-purple-600 group-hover:text-white transition-all">
                                <Instagram className="w-7 h-7" />
                            </div>
                            <span className="text-xs font-medium text-gray-600">Instagram</span>
                        </button>

                        <button onClick={() => handleSocialShare('tiktok')} className="flex flex-col items-center gap-2 group">
                            <div className="w-14 h-14 bg-gray-100 text-gray-900 rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                                <TikTokLogo className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-medium text-gray-600">TikTok</span>
                        </button>
                    </div>

                    <div className="relative">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                            <div className="p-2 bg-white rounded-lg shadow-sm">
                                <LinkIcon className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-500 mb-0.5">Page Link</p>
                                <p className="text-sm font-medium text-gray-900 truncate">tushindecharity.org/stories</p>
                            </div>
                            <button
                                onClick={() => handleSocialShare('copy')}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${copied ? 'bg-green-100 text-green-700' : 'bg-gray-900 text-white hover:bg-gray-800'}`}
                            >
                                {copied ? <Check className="w-4 h-4"/> : <Copy className="w-4 h-4" />}
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                        {copied && (
                            <div className="absolute top-full left-0 right-0 text-center mt-2 text-xs text-green-600 font-medium animate-fade-in">
                                Link copied! You can now paste it in your app.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    if (activeStory) {
        return (
            <div className="bg-gray-50 py-0 sm:py-8 px-0 sm:px-6 lg:px-8 animate-fade-in relative">
                <div className="max-w-4xl mx-auto">
                    <div className="p-4 sm:p-0">
                        <button
                            onClick={() => setSelectedStoryId(null)}
                            className="flex items-center gap-2 text-gray-600 hover:text-kenya-green font-medium mb-4 sm:mb-6 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" /> Back to Stories
                        </button>
                    </div>

                    <div className="bg-white rounded-none sm:rounded-2xl shadow-none sm:shadow-xl overflow-hidden border-y sm:border border-gray-100">
                        {/* Detail Media */}
                        <div className="w-full relative">
                            {activeStory.mediaType === 'video' ? (
                                <div className="relative w-full aspect-video bg-gray-900 sm:rounded-xl overflow-hidden shadow-sm flex items-center justify-center">
                                    <video
                                        src={activeStory.mediaUrl}
                                        controls
                                        autoPlay
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            ) : (
                                <img
                                    src={activeStory.mediaUrl}
                                    alt={activeStory.title}
                                    className="w-full max-h-[600px] object-cover sm:rounded-xl shadow-sm"
                                />
                            )}
                        </div>

                        <div className="p-4 sm:p-12">
                            {/* Detail Header */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-gray-100 pb-8">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">{activeStory.title}</h1>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <User className="w-4 h-4" />
                                            <span>{activeStory.name}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            <span>{activeStory.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>{new Date(activeStory.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={(e) => handleLike(e, activeStory.id)}
                                        className="flex flex-col items-center gap-1 text-gray-500 hover:text-kenya-red transition-colors group"
                                    >
                                        <div className="bg-gray-100 p-3 rounded-full group-hover:bg-red-50 transition-colors">
                                            <Heart className="w-6 h-6 group-hover:fill-current" />
                                        </div>
                                        <span className="text-xs font-bold">{activeStory.likes}</span>
                                    </button>
                                    <button
                                        onClick={(e) => handleShareClick(e, activeStory)}
                                        className="flex flex-col items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors group"
                                    >
                                        <div className="bg-gray-100 p-3 rounded-full group-hover:bg-blue-50 transition-colors">
                                            <Share2 className="w-6 h-6" />
                                        </div>
                                        <span className="text-xs font-bold">Share</span>
                                    </button>
                                </div>
                            </div>

                            {/* Detail Content */}
                            <div className="prose prose-lg max-w-none text-gray-700 mb-12 leading-relaxed">
                                <p className="whitespace-pre-wrap">{activeStory.content}</p>

                                {/* Story Gallery */}
                                {activeStory.gallery && activeStory.gallery.length > 0 && (
                                    <div className="mt-8 not-prose">
                                        <h4 className="text-lg font-bold text-gray-900 mb-4">Gallery</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {activeStory.gallery.map((img, idx) => (
                                                <div key={idx} className="relative group overflow-hidden rounded-xl cursor-pointer" onClick={() => openLightbox(idx)}>
                                                    <img
                                                        src={img}
                                                        alt={`Story image ${idx + 1}`}
                                                        className="w-full h-48 object-cover shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:opacity-90"
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                                        <span className="text-white opacity-0 group-hover:opacity-100 font-bold bg-black/50 px-3 py-1 rounded-full text-sm backdrop-blur-sm">View</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Donate Call to Action */}
                            <div className="bg-green-50 rounded-xl p-8 mb-12 text-center border border-green-100">
                                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">Inspired by this story?</h3>
                                <p className="text-gray-600 mb-6">Your donation can help more people like {activeStory.name} achieve their dreams.</p>
                                <button
                                    onClick={() => setPage?.(Page.DONATE)}
                                    className="bg-kenya-red text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-red-700 transition-transform hover:scale-105 flex items-center gap-2 mx-auto"
                                >
                                    <HeartHandshake className="w-5 h-5" /> Donate Now
                                </button>
                            </div>

                            {/* Comments Section */}
                            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <MessageCircle className="w-5 h-5" />
                                    Comments ({activeStory.comments.length})
                                </h3>

                                <div className="space-y-6 mb-8">
                                    {activeStory.comments.length === 0 ? (
                                        <p className="text-gray-500 italic text-center py-4">No comments yet. Be the first to share your thoughts!</p>
                                    ) : (
                                        activeStory.comments.map(comment => (
                                            <div key={comment.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="font-bold text-gray-900">{comment.author}</span>
                                                    <span className="text-xs text-gray-400">{new Date(comment.date).toLocaleDateString()}</span>
                                                </div>
                                                <p className="text-gray-700">{comment.text}</p>
                                            </div>
                                        ))
                                    )}
                                </div>

                                <form onSubmit={(e) => handleCommentSubmit(e, activeStory.id)} className="flex gap-2 sm:gap-4">
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
                                        <Send className="w-4 h-4" /> Post
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lightbox Modal */}
                {lightboxIndex !== null && activeStory.gallery && (
                    <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center animate-fade-in select-none" onClick={closeLightbox}>
                        {/* Close Button */}
                        <button
                            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-50"
                            onClick={closeLightbox}
                        >
                            <X className="w-8 h-8" />
                        </button>

                        {/* Previous Button */}
                        <button
                            className="absolute left-4 text-white/70 hover:text-white p-4 hover:bg-white/10 rounded-full transition-colors hidden sm:block z-50"
                            onClick={prevLightboxImage}
                        >
                            <ChevronLeft className="w-10 h-10" />
                        </button>

                        {/* Image */}
                        <div className="relative w-full h-full flex items-center justify-center p-4">
                            <img
                                src={activeStory.gallery[lightboxIndex]}
                                alt={`Gallery ${lightboxIndex + 1}`}
                                className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl rounded-lg"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>

                        {/* Next Button */}
                        <button
                            className="absolute right-4 text-white/70 hover:text-white p-4 hover:bg-white/10 rounded-full transition-colors hidden sm:block z-50"
                            onClick={nextLightboxImage}
                        >
                            <ChevronRight className="w-10 h-10" />
                        </button>

                        {/* Counter */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/90 text-sm font-medium bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                            {lightboxIndex + 1} / {activeStory.gallery.length}
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
                    <h1 className="text-xl sm:text-4xl font-serif font-bold text-gray-900 mb-2 sm:mb-4 leading-tight">{title || "Community Stories"}</h1>
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
                    {displayedStories.map(story => (
                        <div
                            key={story.id}
                            onClick={() => setSelectedStoryId(story.id)}
                            className="bg-white rounded-none sm:rounded-xl shadow-sm sm:shadow-lg overflow-hidden border-y sm:border border-gray-200 sm:border-gray-100 flex flex-col cursor-pointer sm:hover:shadow-2xl transition-all transform sm:hover:-translate-y-1 group"
                        >
                            {/* Header */}
                            <div className="p-4 flex items-center justify-between border-b border-gray-50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold">
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
                                        <div className="relative w-full aspect-video bg-gray-900 flex items-center justify-center">
                                            <video
                                                src={story.mediaUrl}
                                                // Controls removed in preview to encourage clicking the card
                                                className="w-full h-full object-contain pointer-events-none"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                                                <PlayCircle className="w-12 h-12 text-white opacity-80" />
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

                            {/* Actions & Content */}
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-6 mb-4">
                                    <button
                                        onClick={(e) => handleLike(e, story.id)}
                                        className="flex items-center gap-2 text-gray-600 hover:text-kenya-red transition-colors group/like"
                                    >
                                        <Heart className="w-6 h-6 group-hover/like:fill-current transition-colors" />
                                        <span className="font-medium">{story.likes} Likes</span>
                                    </button>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <MessageCircle className="w-6 h-6" />
                                        <span className="font-medium">{story.comments.length} Comments</span>
                                    </div>
                                </div>

                                <p className="text-gray-800 mb-6 leading-relaxed flex-grow line-clamp-3">
                                    <span className="font-bold mr-2">{story.name}</span>
                                    {story.content}
                                </p>
                                <span className="text-kenya-green text-sm font-bold mb-4 hover:underline">Read full story &rarr;</span>

                                {/* New Donate & Share Buttons */}
                                <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-gray-100">
                                    <button
                                        onClick={handleDonate}
                                        className="bg-kenya-red text-white py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-700 transition-colors shadow-sm"
                                    >
                                        <HeartHandshake className="w-4 h-4" /> Donate
                                    </button>
                                    <button
                                        onClick={(e) => handleShareClick(e, story)}
                                        className="bg-gray-50 text-gray-700 border border-gray-200 py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                                    >
                                        <Share2 className="w-4 h-4" /> Share
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {limit && stories.length > limit && (
                    <div className="mt-8 sm:mt-12 text-center px-4 sm:px-0 mb-12 sm:mb-0">
                        <button
                            onClick={() => setPage?.(Page.STORIES)}
                            className="bg-white border-2 border-kenya-green text-kenya-green hover:bg-kenya-green hover:text-white px-8 py-3 rounded-full font-bold transition-all shadow-sm flex items-center gap-2 mx-auto"
                        >
                            View More Stories <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {renderShareModal()}
            </div>
        </div>
    );
};