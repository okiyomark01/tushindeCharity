import type {Story} from "../types/types.ts";

export const REACTION_EMOJIS = ['❤️‍🩹', '🙏', '💐', '💚', '✨', '👏'];
export const DEFAULT_STORIES: Story[] = [
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
            {id: 'c1', author: 'Jane Doe', text: 'So inspiring!', date: new Date().toISOString()}
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
        donorCount: 42,
        isLive: false,
        businessNumber: '234234',
        accountNumber: 'Mama Wanjiku',
        recentDonors: [
            { name: 'John K.', amount: 1000 },
            { name: 'Sarah M.', amount: 2500 },
            { name: 'David O.', amount: 500 }
        ]
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
            {id: 'c2', author: 'John Smith', text: 'This is incredible progress.', date: new Date().toISOString()}
        ],
        date: new Date().toISOString(),
        raised: 450000,
        goal: 600000,
        category: 'Community',
        donorCount: 315,
        isLive: false,
        businessNumber: '224224',
        accountNumber: 'Turkana Water',
        recentDonors: [
            { name: 'Alice W.', amount: 5000 },
            { name: 'Peter N.', amount: 1200 },
            { name: 'Mary K.', amount: 3000 }
        ]
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
        donorCount: 56,
        isLive: false,
        businessNumber: '214214',
        accountNumber: 'Kevin Omondi',
        recentDonors: [
            { name: 'Brian O.', amount: 2000 },
            { name: 'Grace M.', amount: 1500 },
            { name: 'Paul K.', amount: 1000 }
        ]
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
        donorCount: 89,
        isLive: false,
        businessNumber: '244244',
        accountNumber: 'Halima Juma',
        recentDonors: [
            { name: 'Faith N.', amount: 10000 },
            { name: 'George W.', amount: 5000 },
            { name: 'Lucy A.', amount: 2500 }
        ]
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
        donorCount: 25,
        isLive: false,
        businessNumber: '254254',
        accountNumber: 'James Kamau',
        recentDonors: [
            { name: 'Samuel K.', amount: 1500 },
            { name: 'Jane W.', amount: 2000 },
            { name: 'Anonymous', amount: 500 }
        ]
    },
    {
        id: '6',
        name: "Amina",
        location: "Nairobi",
        mediaUrl: "https://picsum.photos/seed/amina/800/600",
        mediaType: 'image',
        title: "Amina's Medical Journey",
        content: "Thanks to your generous donations, Amina was able to undergo her life-saving surgery and is now recovering well at home.",
        likes: 540,
        comments: [],
        date: new Date().toISOString(),
        raised: 150000,
        goal: 150000,
        category: 'Medical',
        donorCount: 120,
        isLive: false,
        businessNumber: '264264',
        accountNumber: 'Amina Medical',
        status: 'Completed',
        spent: 150000,
        recentDonors: [
            { name: 'John D.', amount: 5000 },
            { name: 'Mary S.', amount: 2000 }
        ]
    },
    {
        id: '7',
        name: "St. John's Primary School",
        location: "Machakos",
        mediaUrl: "https://picsum.photos/seed/school/800/600",
        mediaType: 'image',
        title: "New Classrooms Built",
        content: "With the funds raised, we successfully constructed three new classrooms, providing a safe and conducive learning environment for over 150 students who previously studied under trees.",
        likes: 890,
        comments: [],
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        raised: 850000,
        goal: 850000,
        category: 'Education',
        donorCount: 340,
        isLive: false,
        businessNumber: '274274',
        accountNumber: 'St Johns School',
        status: 'Completed',
        spent: 850000,
        recentDonors: [
            { name: 'Corporate Sponsor', amount: 500000 },
            { name: 'Local Community', amount: 100000 }
        ]
    },
    {
        id: '8',
        name: "Kibera Women's Collective",
        location: "Kibera, Nairobi",
        mediaUrl: "https://picsum.photos/seed/women/800/600",
        mediaType: 'image',
        title: "Tailoring Business Launched",
        content: "The collective received sewing machines and materials. They are now producing school uniforms for local children and generating a sustainable income for 20 families.",
        likes: 420,
        comments: [],
        date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        raised: 320000,
        goal: 300000,
        category: 'Business',
        donorCount: 185,
        isLive: false,
        businessNumber: '284284',
        accountNumber: 'Kibera Women',
        status: 'Completed',
        spent: 300000,
        recentDonors: [
            { name: 'Sarah W.', amount: 15000 },
            { name: 'Peter K.', amount: 5000 }
        ]
    },
    {
        id: '9',
        name: "Makueni Drought Relief",
        location: "Makueni",
        mediaUrl: "https://picsum.photos/seed/water/800/600",
        mediaType: 'image',
        title: "Emergency Food Distribution",
        content: "During the severe drought, your donations helped us distribute emergency food rations and clean water to 500 vulnerable households, saving countless lives.",
        likes: 1200,
        comments: [],
        date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
        raised: 1200000,
        goal: 1000000,
        category: 'Emergency',
        donorCount: 850,
        isLive: false,
        businessNumber: '294294',
        accountNumber: 'Makueni Relief',
        status: 'Completed',
        spent: 1200000,
        recentDonors: [
            { name: 'Anonymous', amount: 100000 },
            { name: 'Diaspora Group', amount: 250000 }
        ]
    }
];