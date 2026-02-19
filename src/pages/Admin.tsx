import React, { useState, useEffect } from 'react';
import {
    Plus, Trash2,
    LayoutGrid, FileText, DollarSign, Users,
    Shield, Lock,
    Pencil, Settings,
    Menu, X, Heart
} from 'lucide-react';
import type { Story, MediaType, ApplicationForm, Donation, HeroContent, AboutContent, ContactContent, Program } from '../types';

// Mock Donations Data
const MOCK_DONATIONS: Donation[] = [
    { id: 'TX1001', donorName: 'John Kamau', amount: 5000, method: 'M-Pesa', date: '2023-10-25', status: 'Completed', reference: 'QHJ892KL' },
    { id: 'TX1002', donorName: 'Sarah Smith', amount: 12000, method: 'Card', date: '2023-10-24', status: 'Completed', reference: 'VISA-4242' },
    { id: 'TX1003', donorName: 'Anonymous', amount: 1000, method: 'M-Pesa', date: '2023-10-24', status: 'Completed', reference: 'QHJ771MN' },
    { id: 'TX1004', donorName: 'Enterprise Ltd', amount: 50000, method: 'Bank Transfer', date: '2023-10-22', status: 'Completed', reference: 'BK-9921' },
];

// Mock Applications Data
const MOCK_APPLICATIONS: ApplicationForm[] = [
    {
        id: 101,
        fullName: "Grace Wanjiku",
        nationalId: "24567890",
        location: "Nyeri",
        assistanceType: 'Medical',
        description: "Requesting financial support for my daughter's emergency appendicitis surgery at Nyeri Provincial Hospital. The total cost is KES 45,000 which I cannot afford as a single mother.",
        status: 'Pending',
        date: '2023-10-26'
    },
    {
        id: 102,
        fullName: "David Omondi",
        nationalId: "12345678",
        location: "Kisumu",
        assistanceType: 'Education',
        description: "I am seeking assistance with Form 1 school fees for my son who scored 380 marks in KCPE. I am a casual laborer and cannot raise the full admission fee of KES 25,000.",
        status: 'Pending',
        date: '2023-10-25'
    },
    {
        id: 103,
        fullName: "Fatuma Hassan",
        nationalId: "98765432",
        location: "Mombasa",
        assistanceType: 'Business',
        description: "Seeking a small grant to restock my fish selling business in Kongowea market. I need a new freezer to prevent stock loss during hot days.",
        status: 'Approved',
        date: '2023-10-24'
    },
    {
        id: 104,
        fullName: "Samuel Kiptoo",
        nationalId: "33445566",
        location: "Eldoret",
        assistanceType: 'Emergency',
        description: "My home was destroyed by heavy rains and landslides. We are currently staying in a church hall and need food, bedding, and materials to rebuild a temporary shelter.",
        status: 'Pending',
        date: '2023-10-23'
    },
    {
        id: 105,
        fullName: "Esther Mwendwa",
        nationalId: "11223344",
        location: "Kitui",
        assistanceType: 'Education',
        description: "University fees balance clearance for my final year at Kenyatta University. I risk being deferred if I don't clear the balance of KES 20,000 before exams start.",
        status: 'Rejected',
        date: '2023-10-22'
    },
    {
        id: 106,
        fullName: "Kevin Juma",
        nationalId: "55667788",
        location: "Nairobi",
        assistanceType: 'Business',
        description: "I want to start a boda boda business to support my young family in Kawangware. I have a valid driving license but lack the capital for a motorcycle deposit.",
        status: 'Approved',
        date: '2023-10-20'
    },
    {
        id: 107,
        fullName: "Alice Chebet",
        nationalId: "77889900",
        location: "Kericho",
        assistanceType: 'Medical',
        description: "My husband was involved in a road accident and needs orthopedic surgery. We have exhausted our NHIF limits and need help with the extra KES 80,000 required.",
        status: 'Pending',
        date: '2023-10-19'
    }
];

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
    }
];

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

type Tab = 'dashboard' | 'applications' | 'stories' | 'programs' | 'donations' | 'settings';

interface AdminProps {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
}

const StatCard = ({ title, value, icon: Icon, color }: { title: string; value: string | number; icon: React.ElementType; color: string }) => (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
        <div className={`p-2 rounded-full ${color} flex-shrink-0`}>
            <Icon className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wide leading-tight">{title}</p>
            <h3 className="text-lg font-bold text-gray-900 leading-tight break-words">{value}</h3>
        </div>
    </div>
);

export const Admin: React.FC<AdminProps> = ({ isAuthenticated, setIsAuthenticated }) => {
    // Auth State - Login Credentials only
    const [loginCreds, setLoginCreds] = useState({ username: '', password: '' });
    const [loginError, setLoginError] = useState('');

    // Helper to get tab from URL
    const getTabFromUrl = (): Tab => {
        if (typeof window === 'undefined') return 'dashboard';
        const params = new URLSearchParams(window.location.search);
        const tabParam = params.get('tab');
        const validTabs: Tab[] = ['dashboard', 'applications', 'stories', 'programs', 'donations', 'settings'];
        return validTabs.includes(tabParam as Tab) ? (tabParam as Tab) : 'dashboard';
    };

    // Dashboard State
    const [activeTab, setActiveTab] = useState<Tab>(getTabFromUrl);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Sync with browser back/forward for Tabs
    useEffect(() => {
        const handlePopState = () => {
            setActiveTab(getTabFromUrl());
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // Initialize Data with Lazy State to avoid setState in useEffect
    const [applications, setApplications] = useState<ApplicationForm[]>(() => {
        const stored = localStorage.getItem('applications');
        if (stored) return JSON.parse(stored);
        localStorage.setItem('applications', JSON.stringify(MOCK_APPLICATIONS));
        return MOCK_APPLICATIONS;
    });

    const [stories, setStories] = useState<Story[]>(() => {
        const stored = localStorage.getItem('stories');
        if (stored) return JSON.parse(stored);
        localStorage.setItem('stories', JSON.stringify(DEFAULT_STORIES));
        return DEFAULT_STORIES;
    });

    const [programs, setPrograms] = useState<Program[]>(() => {
        const stored = localStorage.getItem('programs');
        if (stored) return JSON.parse(stored);
        localStorage.setItem('programs', JSON.stringify(DEFAULT_PROGRAMS));
        return DEFAULT_PROGRAMS;
    });

    const [donations] = useState<Donation[]>(MOCK_DONATIONS);

    // UI State
    const [selectedApp, setSelectedApp] = useState<ApplicationForm | null>(null); // For modal

    // Story Form State
    const [editingId, setEditingId] = useState<string | null>(null);
    const [newStory, setNewStory] = useState<Partial<Story>>({
        mediaType: 'image',
        likes: 0,
        comments: [],
        gallery: []
    });
    const [mediaPreview, setMediaPreview] = useState<string>('');

    // Program Form State
    const [editingProgramId, setEditingProgramId] = useState<string | null>(null);
    const [programForm, setProgramForm] = useState<Partial<Program>>({});

    // Settings States
    const [heroForm, setHeroForm] = useState<HeroContent>(() => {
        const stored = localStorage.getItem('heroContent');
        return stored ? JSON.parse(stored) : {
            title: "Restoring Hope, Changing Lives in Kenya.",
            subtitle: "We provide urgent medical care, education scholarships, and business funding to the most vulnerable members of our community.",
            backgroundImageUrl: "https://picsum.photos/id/1015/1920/1080"
        };
    });

    const [aboutForm, setAboutForm] = useState<AboutContent>(() => {
        const stored = localStorage.getItem('aboutContent');
        return stored ? JSON.parse(stored) : {
            heroTitle: "About Tushinde Charity",
            heroSubtitle: "Driven by compassion, fueled by integrity, and sustained by the community.",
            missionTitle: "Our Mission & Vision",
            contentParagraph1: "Tushinde (Swahili for \"Let Us Overcome\") was founded on a simple principle: that every Kenyan deserves a chance at a dignified life, regardless of their background.",
            contentParagraph2: "Our mission is to bridge the gap between resources and need. We envision a Kenya where no child drops out of school due to fees, no patient is turned away from a hospital due to lack of funds, and every entrepreneur has the capital to start.",
            imageUrl: "https://picsum.photos/id/1025/600/400"
        };
    });

    const [contactForm, setContactForm] = useState<ContactContent>(() => {
        const stored = localStorage.getItem('contactContent');
        return stored ? JSON.parse(stored) : {
            heroTitle: "Get in Touch",
            heroSubtitle: "Have questions about our programs or want to partner with us?",
            address: "Tushinde House, 4th Floor\nWestlands Road, Nairobi, Kenya",
            phone1: "+254 700 123 456",
            phone2: "+254 722 987 654",
            email1: "info@tushindecharity.org",
            email2: "donations@tushindecharity.org"
        };
    });

    // --- Actions ---

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (loginCreds.username === 'admin' && loginCreds.password === 'admin') {
            setIsAuthenticated(true);
            sessionStorage.setItem('adminAuth', 'true');
            setLoginError('');
        } else {
            setLoginError('Invalid credentials. Try admin / admin');
        }
    };

    const handleNavClick = (tab: Tab) => {
        const url = new URL(window.location.href);
        url.searchParams.set('tab', tab);
        window.history.pushState({}, '', url.toString());
        setActiveTab(tab);
        setIsMobileMenuOpen(false);
    };

    const updateApplicationStatus = (id: number | undefined, status: 'Approved' | 'Rejected') => {
        if (!id) return;
        const updatedApps = applications.map(app =>
            app.id === id ? { ...app, status } : app
        );
        setApplications(updatedApps);
        localStorage.setItem('applications', JSON.stringify(updatedApps));
        setSelectedApp(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setNewStory({ ...newStory, mediaUrl: result });
                setMediaPreview(result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleStoryGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const fileReaders: Promise<string>[] = Array.from(files).map(file => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            });

            try {
                const newImages = await Promise.all(fileReaders);
                setNewStory(prev => ({
                    ...prev,
                    gallery: [...(prev.gallery || []), ...newImages]
                }));
            } catch (error) {
                console.error("Error reading files", error);
                alert("Failed to upload some images.");
            }
        }
    };

    // Settings Actions
    const handleHeroImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setHeroForm(prev => ({ ...prev, backgroundImageUrl: result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAboutImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setAboutForm(prev => ({ ...prev, imageUrl: result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveHero = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem('heroContent', JSON.stringify(heroForm));
        alert('Home Page Settings updated successfully!');
    };

    const handleSaveAbout = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem('aboutContent', JSON.stringify(aboutForm));
        alert('About Us Page updated successfully!');
    };

    const handleSaveContact = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem('contactContent', JSON.stringify(contactForm));
        alert('Contact Us Page updated successfully!');
    };

    // Stories Actions
    const handleSaveStory = (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (!newStory.title || !newStory.content || !newStory.mediaUrl) {
            alert('Please fill in all fields and upload media.');
            return;
        }

        if (editingId) {
            // Update existing story
            const updatedStories = stories.map(s => {
                if (s.id === editingId) {
                    return {
                        ...s,
                        ...newStory,
                        name: newStory.name || s.name,
                        title: newStory.title || s.title,
                        content: newStory.content || s.content,
                        mediaUrl: newStory.mediaUrl || s.mediaUrl,
                        mediaType: newStory.mediaType as MediaType || s.mediaType,
                        location: newStory.location || s.location,
                        gallery: newStory.gallery || s.gallery || [],
                    } as Story;
                }
                return s;
            });
            setStories(updatedStories);
            localStorage.setItem('stories', JSON.stringify(updatedStories));
            alert('Story updated successfully!');
        } else {
            // Create new story
            const story: Story = {
                id: Date.now().toString(),
                name: newStory.name || 'Anonymous',
                title: newStory.title!,
                content: newStory.content!,
                mediaUrl: newStory.mediaUrl!,
                mediaType: newStory.mediaType as MediaType || 'image',
                location: newStory.location || 'Kenya',
                likes: 0,
                comments: [],
                date: new Date().toISOString(),
                gallery: newStory.gallery || [],
                raised: 0,
                goal: 100000,
                category: 'Community',
                donorCount: 0
            };
            const updatedStories = [story, ...stories];
            setStories(updatedStories);
            localStorage.setItem('stories', JSON.stringify(updatedStories));
            alert('Story published successfully!');
        }

        // Reset form
        setNewStory({ mediaType: 'image', likes: 0, comments: [], gallery: [] });
        setMediaPreview('');
        setEditingId(null);
    };

    const handleEditClick = (story: Story) => {
        setNewStory(story);
        setMediaPreview(story.mediaUrl);
        setEditingId(story.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setNewStory({ mediaType: 'image', likes: 0, comments: [], gallery: [] });
        setMediaPreview('');
        setEditingId(null);
    };

    const handleDeleteStory = (id: string) => {
        if (window.confirm('Are you sure you want to delete this story?')) {
            const updated = stories.filter(s => s.id !== id);
            setStories(updated);
            localStorage.setItem('stories', JSON.stringify(updated));
            if (editingId === id) {
                handleCancelEdit();
            }
        }
    };

    // Program Actions
    const handleEditProgram = (program: Program) => {
        setEditingProgramId(program.id);
        setProgramForm(program);
    };

    const handleDeleteProgram = (id: string) => {
        if (window.confirm('Are you sure you want to delete this program?')) {
            const updatedPrograms = programs.filter(p => p.id !== id);
            setPrograms(updatedPrograms);
            localStorage.setItem('programs', JSON.stringify(updatedPrograms));
        }
    };

    const handleSaveProgram = (e: React.FormEvent) => {
        e.preventDefault();
        if (!programForm.title || !programForm.description) return;

        let updatedPrograms;

        if (editingProgramId === 'new') {
            const newProgram: Program = {
                id: Date.now().toString(),
                title: programForm.title || '',
                description: programForm.description || '',
                imageUrl: programForm.imageUrl || 'https://picsum.photos/id/1015/800/800',
                badgeText: programForm.badgeText || 'New',
                badgeColor: programForm.badgeColor || 'green',
                icon: programForm.icon || 'Heart'
            };
            updatedPrograms = [...programs, newProgram];
            alert('Program created successfully!');
        } else {
            updatedPrograms = programs.map(p => {
                if (p.id === editingProgramId) {
                    return { ...p, ...programForm } as Program;
                }
                return p;
            });
            alert('Program updated successfully!');
        }

        setPrograms(updatedPrograms);
        localStorage.setItem('programs', JSON.stringify(updatedPrograms));
        setEditingProgramId(null);
        setProgramForm({});
    };

    const handleProgramImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setProgramForm(prev => ({ ...prev, imageUrl: result }));
            };
            reader.readAsDataURL(file);
        }
    };

    // --- Views ---

    if (!isAuthenticated) {
        return (
            <div className="flex-grow bg-gray-900 flex items-center justify-center p-4 w-full">
                <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-8 max-w-md w-full">
                    <div className="text-center mb-8">
                        <div className="bg-kenya-green w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-serif font-bold text-white">Admin Portal</h1>
                        <p className="text-gray-400 text-sm">Restricted access for authorized personnel only.</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                            <input
                                type="text"
                                value={loginCreds.username}
                                onChange={e => setLoginCreds({...loginCreds, username: e.target.value})}
                                className="w-full bg-gray-700 text-white border-gray-600 placeholder-gray-400 rounded-lg p-3 border focus:ring-kenya-green focus:border-kenya-green focus:outline-none"
                                placeholder="Enter username"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                            <input
                                type="password"
                                value={loginCreds.password}
                                onChange={e => setLoginCreds({...loginCreds, password: e.target.value})}
                                className="w-full bg-gray-700 text-white border-gray-600 placeholder-gray-400 rounded-lg p-3 border focus:ring-kenya-green focus:border-kenya-green focus:outline-none"
                                placeholder="Enter password"
                            />
                        </div>
                        {loginError && <p className="text-red-400 text-sm text-center">{loginError}</p>}
                        <button type="submit" className="w-full bg-kenya-green text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-lg">
                            Secure Login
                        </button>
                    </form>
                    <div className="mt-6 text-center text-xs text-gray-500">
                        <p>Powered by Tushinde Charity Systems</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 flex flex-col md:flex-row items-start min-h-screen">
            {/* Mobile Header */}
            <div className="md:hidden bg-gray-900 text-white p-4 flex justify-between items-center shadow-md z-50 sticky top-20 w-full">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors focus:outline-none"
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
                <div className="flex items-center gap-2 font-serif font-bold text-xl">
                    <div className="w-8 h-8 bg-kenya-red rounded-lg flex items-center justify-center">T</div>
                    <span>Tushinde<span className="text-kenya-green">Admin</span></span>
                </div>
                <div className="w-10"></div> {/* Spacer for alignment */}
            </div>

            {/* Mobile Backdrop */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                bg-gray-900 text-white flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out
                fixed md:sticky top-0 md:top-20 h-full md:h-[calc(100vh-5rem)] z-40 md:z-auto
                w-1/2 md:w-64 pt-40 md:pt-0
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
                md:flex md:overflow-y-auto shadow-2xl md:shadow-none
            `}>
                <div className="hidden md:block p-6 border-b border-gray-800">
                    <div className="flex items-center gap-2 font-serif font-bold text-xl">
                        <div className="w-8 h-8 bg-kenya-red rounded-lg flex items-center justify-center">T</div>
                        Tushinde<span className="text-kenya-green">Admin</span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => handleNavClick('dashboard')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
                    >
                        <LayoutGrid className="w-5 h-5 flex-shrink-0" /> Dashboard
                    </button>
                    <button
                        onClick={() => handleNavClick('applications')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'applications' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
                    >
                        <FileText className="w-5 h-5 flex-shrink-0" /> Applications
                        {applications.filter(a => a.status === 'Pending').length > 0 && (
                            <span className="ml-auto bg-kenya-red text-white text-xs px-2 py-0.5 rounded-full">
                                {applications.filter(a => a.status === 'Pending').length}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => handleNavClick('stories')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'stories' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
                    >
                        <Users className="w-5 h-5 flex-shrink-0" /> Stories & Media
                    </button>
                    <button
                        onClick={() => handleNavClick('programs')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'programs' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
                    >
                        <Heart className="w-5 h-5 flex-shrink-0" /> Programs
                    </button>
                    <button
                        onClick={() => handleNavClick('donations')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'donations' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
                    >
                        <DollarSign className="w-5 h-5 flex-shrink-0" /> Donations
                    </button>
                    <button
                        onClick={() => handleNavClick('settings')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'settings' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
                    >
                        <Settings className="w-5 h-5 flex-shrink-0" /> Settings
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 sm:p-8 w-full min-w-0">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 capitalize mr-4">{activeTab}</h2>
                    <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-gray-900">Admin User</p>
                            <p className="text-xs text-gray-500">Super Administrator</p>
                        </div>
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-gray-500" />
                        </div>
                    </div>
                </header>

                {/* Dashboard View */}
                {activeTab === 'dashboard' && (
                    <div className="space-y-8 animate-fade-in">
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                            <StatCard
                                title="Total Applications"
                                value={applications.length}
                                icon={FileText}
                                color="bg-blue-600"
                            />
                            <StatCard
                                title="Pending Reviews"
                                value={applications.filter(a => a.status === 'Pending').length}
                                icon={Lock}
                                color="bg-yellow-500"
                            />
                            <StatCard
                                title="Total Donations"
                                value={`KES ${donations.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}`}
                                icon={DollarSign}
                                color="bg-kenya-green"
                            />
                            <StatCard
                                title="Programs Active"
                                value={programs.length}
                                icon={Heart}
                                color="bg-red-600"
                            />
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-gray-900 text-sm md:text-base">Recent Applications</h3>
                                    <button onClick={() => handleNavClick('applications')} className="text-xs text-blue-600 hover:underline flex-shrink-0">View All</button>
                                </div>
                                <div className="space-y-3 flex-1">
                                    {applications.slice(0, 5).map(app => (
                                        <div key={app.id} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg gap-3">
                                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold flex-shrink-0 text-xs">
                                                    {app.fullName.charAt(0)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-xs sm:text-sm text-gray-900 leading-tight break-words">{app.fullName}</p>
                                                    <p className="text-[10px] sm:text-xs text-gray-500 leading-tight">{app.assistanceType}</p>
                                                </div>
                                            </div>
                                            <span className={`flex-shrink-0 px-2 py-0.5 text-[10px] rounded-full font-medium ${
                                                app.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                                    app.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                        'bg-yellow-100 text-yellow-700'
                                            }`}>
                                                {app.status || 'Pending'}
                                            </span>
                                        </div>
                                    ))}
                                    {applications.length === 0 && <p className="text-gray-500 text-sm italic">No applications yet.</p>}
                                </div>
                            </div>

                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-gray-900 text-sm md:text-base">Recent Donations</h3>
                                    <button onClick={() => handleNavClick('donations')} className="text-xs text-blue-600 hover:underline flex-shrink-0">View All</button>
                                </div>
                                <div className="space-y-3 flex-1">
                                    {donations.slice(0, 5).map(d => (
                                        <div key={d.id} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg gap-3">
                                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold flex-shrink-0 text-xs">
                                                    <DollarSign className="w-4 h-4" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-xs sm:text-sm text-gray-900 leading-tight break-words">{d.donorName}</p>
                                                    <p className="text-[10px] sm:text-xs text-gray-500 leading-tight">{d.method}</p>
                                                </div>
                                            </div>
                                            <p className="font-bold text-gray-900 text-xs sm:text-sm flex-shrink-0">+{d.amount.toLocaleString()}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Applications View */}
                {activeTab === 'applications' && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900">Assistance Requests</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3">Applicant</th>
                                        <th className="px-6 py-3">Type</th>
                                        <th className="px-6 py-3">Location</th>
                                        <th className="px-6 py-3">Date</th>
                                        <th className="px-6 py-3">Status</th>
                                        <th className="px-6 py-3">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                    {applications.map(app => (
                                        <tr key={app.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium text-gray-900">{app.fullName}</td>
                                            <td className="px-6 py-4">{app.assistanceType}</td>
                                            <td className="px-6 py-4">{app.location}</td>
                                            <td className="px-6 py-4">{app.date}</td>
                                            <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                        app.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                                            app.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                                'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                        {app.status || 'Pending'}
                                                    </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button onClick={() => setSelectedApp(app)} className="text-blue-600 hover:text-blue-800 font-medium">Review</button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {selectedApp && (
                            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                                <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                                    <div className="flex justify-between items-start mb-6">
                                        <h3 className="text-2xl font-bold text-gray-900">Application Details</h3>
                                        <button onClick={() => setSelectedApp(null)} className="p-1 hover:bg-gray-100 rounded-full"><X className="w-6 h-6"/></button>
                                    </div>
                                    <div className="space-y-4 mb-8">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Full Name</p>
                                                <p className="font-medium">{selectedApp.fullName}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">ID Number</p>
                                                <p className="font-medium">{selectedApp.nationalId}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Location</p>
                                                <p className="font-medium">{selectedApp.location}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Type</p>
                                                <p className="font-medium">{selectedApp.assistanceType}</p>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-sm text-gray-500 mb-2">Description</p>
                                            <p className="text-gray-900">{selectedApp.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => updateApplicationStatus(selectedApp.id, 'Approved')}
                                            className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700"
                                        >
                                            Approve Request
                                        </button>
                                        <button
                                            onClick={() => updateApplicationStatus(selectedApp.id, 'Rejected')}
                                            className="flex-1 bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700"
                                        >
                                            Reject Request
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Stories View */}
                {activeTab === 'stories' && (
                    <div className="space-y-8">
                        {/* Story Editor */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">{editingId ? 'Edit Story' : 'Create New Story'}</h3>
                            <form onSubmit={handleSaveStory} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input type="text" placeholder="Beneficiary Name" className="border p-2 rounded" value={newStory.name || ''} onChange={e => setNewStory({...newStory, name: e.target.value})} />
                                    <input type="text" placeholder="Story Title" className="border p-2 rounded" value={newStory.title || ''} onChange={e => setNewStory({...newStory, title: e.target.value})} />
                                    <input type="text" placeholder="Location" className="border p-2 rounded" value={newStory.location || ''} onChange={e => setNewStory({...newStory, location: e.target.value})} />
                                    <select className="border p-2 rounded" value={newStory.mediaType} onChange={e => setNewStory({...newStory, mediaType: e.target.value as MediaType})}>
                                        <option value="image">Image Story</option>
                                        <option value="video">Video Story</option>
                                    </select>
                                </div>
                                <textarea placeholder="Story Content..." rows={4} className="w-full border p-2 rounded" value={newStory.content || ''} onChange={e => setNewStory({...newStory, content: e.target.value})} />

                                {/* Media Upload */}
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                    <input type="file" id="mediaUpload" className="hidden" accept="image/*,video/*" onChange={handleFileChange} />
                                    <label htmlFor="mediaUpload" className="cursor-pointer text-blue-600 font-medium hover:underline">
                                        Click to upload main media
                                    </label>
                                    {mediaPreview && (
                                        <div className="mt-4">
                                            {newStory.mediaType === 'video' ?
                                                <video src={mediaPreview} className="max-h-48 mx-auto" controls /> :
                                                <img src={mediaPreview} className="max-h-48 mx-auto rounded" alt="Preview" />
                                            }
                                        </div>
                                    )}
                                </div>

                                {/* Gallery Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Images</label>
                                    <input type="file" multiple accept="image/*" onChange={handleStoryGalleryUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                                    <div className="flex gap-2 mt-2 overflow-x-auto">
                                        {newStory.gallery?.map((img, idx) => (
                                            <img key={idx} src={img} className="h-16 w-16 object-cover rounded" alt="Gallery" />
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button type="submit" className="bg-kenya-green text-white px-6 py-2 rounded-lg font-bold">{editingId ? 'Update Story' : 'Publish Story'}</button>
                                    {editingId && <button type="button" onClick={handleCancelEdit} className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-bold">Cancel</button>}
                                </div>
                            </form>
                        </div>

                        {/* Stories List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {stories.map(story => (
                                <div key={story.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative group">
                                    <img src={story.mediaUrl} className="w-full h-48 object-cover" alt={story.title} />
                                    <div className="p-4">
                                        <h4 className="font-bold text-lg mb-1">{story.title}</h4>
                                        <p className="text-sm text-gray-500 mb-4">{story.name} • {story.location}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-400">{new Date(story.date).toLocaleDateString()}</span>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleEditClick(story)} className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100"><Pencil className="w-4 h-4" /></button>
                                                <button onClick={() => handleDeleteStory(story.id)} className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Programs View */}
                {activeTab === 'programs' && (
                    <div className="space-y-8">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">{editingProgramId ? 'Edit Program' : 'Create New Program'}</h3>
                            <form onSubmit={handleSaveProgram} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input type="text" placeholder="Program Title" className="border p-2 rounded" value={programForm.title || ''} onChange={e => setProgramForm({...programForm, title: e.target.value})} />
                                    <select className="border p-2 rounded" value={programForm.icon} onChange={e => setProgramForm({...programForm, icon: e.target.value as Program['icon']})}>
                                        <option value="Heart">Heart Icon</option>
                                        <option value="GraduationCap">Education Icon</option>
                                        <option value="Briefcase">Business Icon</option>
                                    </select>
                                    <select className="border p-2 rounded" value={programForm.badgeColor} onChange={e => setProgramForm({...programForm, badgeColor: e.target.value as Program['badgeColor']})}>
                                        <option value="green">Green Theme</option>
                                        <option value="red">Red Theme</option>
                                        <option value="black">Black Theme</option>
                                    </select>
                                    <input type="text" placeholder="Badge Text (e.g., Health)" className="border p-2 rounded" value={programForm.badgeText || ''} onChange={e => setProgramForm({...programForm, badgeText: e.target.value})} />
                                </div>
                                <textarea placeholder="Description" rows={3} className="w-full border p-2 rounded" value={programForm.description || ''} onChange={e => setProgramForm({...programForm, description: e.target.value})} />
                                <input type="file" onChange={handleProgramImageChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>

                                <div className="flex gap-4 pt-2">
                                    <button type="submit" className="bg-kenya-green text-white px-6 py-2 rounded-lg font-bold">Save Program</button>
                                    {editingProgramId && <button type="button" onClick={() => { setEditingProgramId(null); setProgramForm({}); }} className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-bold">Cancel</button>}
                                </div>
                            </form>
                        </div>

                        <div className="space-y-4">
                            <button onClick={() => { setEditingProgramId('new'); setProgramForm({}); }} className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-bold hover:border-kenya-green hover:text-kenya-green transition-colors flex items-center justify-center gap-2">
                                <Plus className="w-5 h-5" /> Add New Program
                            </button>
                            {programs.map(program => (
                                <div key={program.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <img src={program.imageUrl} className="w-16 h-16 rounded-lg object-cover" alt={program.title} />
                                        <div>
                                            <h4 className="font-bold text-gray-900">{program.title}</h4>
                                            <p className="text-sm text-gray-500 line-clamp-1">{program.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEditProgram(program)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">Edit</button>
                                        <button onClick={() => handleDeleteProgram(program.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Donations View */}
                {activeTab === 'donations' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
                        </div>
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">Donor</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Method</th>
                                <th className="px-6 py-3">Reference</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                            {donations.map(d => (
                                <tr key={d.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium">{d.donorName}</td>
                                    <td className="px-6 py-4 text-green-600 font-bold">KES {d.amount.toLocaleString()}</td>
                                    <td className="px-6 py-4">{d.method}</td>
                                    <td className="px-6 py-4 font-mono text-xs">{d.reference}</td>
                                    <td className="px-6 py-4">{d.date}</td>
                                    <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">Completed</span></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Settings View */}
                {activeTab === 'settings' && (
                    <div className="space-y-8">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-2">Home Page Hero</h3>
                            <form onSubmit={handleSaveHero} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Main Title</label>
                                    <input type="text" className="w-full border p-2 rounded" value={heroForm.title} onChange={e => setHeroForm({...heroForm, title: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                                    <textarea className="w-full border p-2 rounded" value={heroForm.subtitle} onChange={e => setHeroForm({...heroForm, subtitle: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Background Image</label>
                                    <input type="file" onChange={handleHeroImageChange} className="block w-full text-sm text-gray-500 mt-1"/>
                                    {heroForm.backgroundImageUrl && <img src={heroForm.backgroundImageUrl} alt="Hero" className="mt-2 h-32 object-cover rounded"/>}
                                </div>
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">Save Changes</button>
                            </form>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-2">About Page Content</h3>
                            <form onSubmit={handleSaveAbout} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="Hero Title" className="border p-2 rounded" value={aboutForm.heroTitle} onChange={e => setAboutForm({...aboutForm, heroTitle: e.target.value})} />
                                    <input type="text" placeholder="Mission Title" className="border p-2 rounded" value={aboutForm.missionTitle} onChange={e => setAboutForm({...aboutForm, missionTitle: e.target.value})} />
                                </div>
                                <textarea placeholder="Content Paragraph 1" rows={3} className="w-full border p-2 rounded" value={aboutForm.contentParagraph1} onChange={e => setAboutForm({...aboutForm, contentParagraph1: e.target.value})} />
                                <textarea placeholder="Content Paragraph 2" rows={3} className="w-full border p-2 rounded" value={aboutForm.contentParagraph2} onChange={e => setAboutForm({...aboutForm, contentParagraph2: e.target.value})} />

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">About Image</label>
                                    <input type="file" onChange={handleAboutImageChange} className="block w-full text-sm text-gray-500 mt-1"/>
                                    {aboutForm.imageUrl && <img src={aboutForm.imageUrl} alt="About" className="mt-2 h-32 object-cover rounded"/>}
                                </div>

                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">Save Changes</button>
                            </form>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-2">Contact Details</h3>
                            <form onSubmit={handleSaveContact} className="space-y-4">
                                <textarea placeholder="Address" className="w-full border p-2 rounded" value={contactForm.address} onChange={e => setContactForm({...contactForm, address: e.target.value})} />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="Phone 1" className="border p-2 rounded" value={contactForm.phone1} onChange={e => setContactForm({...contactForm, phone1: e.target.value})} />
                                    <input type="text" placeholder="Phone 2" className="border p-2 rounded" value={contactForm.phone2} onChange={e => setContactForm({...contactForm, phone2: e.target.value})} />
                                    <input type="text" placeholder="Email 1" className="border p-2 rounded" value={contactForm.email1} onChange={e => setContactForm({...contactForm, email1: e.target.value})} />
                                    <input type="text" placeholder="Email 2" className="border p-2 rounded" value={contactForm.email2} onChange={e => setContactForm({...contactForm, email2: e.target.value})} />
                                </div>
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">Save Changes</button>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};