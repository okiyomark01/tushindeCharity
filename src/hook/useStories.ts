import type {Story} from "../types.ts";

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
        recentDonors: [
            {name: "Sarah M.", amount: 500},
            {name: "John K.", amount: 1000},
            {name: "Anonymous", amount: 200},
            {name: "Peter W.", amount: 1500},
        ],
        isLive: true
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
        recentDonors: [
            {name: "Global Partners", amount: 50000},
            {name: "Anonymous", amount: 5000},
            {name: "Mary J.", amount: 2500},
            {name: "David L.", amount: 1000},
        ],
        isLive: false

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
        recentDonors: [
            {name: "Team Cheza", amount: 10000},
            {name: "Anonymous", amount: 500},
            {name: "Grace O.", amount: 1000},
        ],
        isLive: false

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
        recentDonors: [
            {name: "Education First", amount: 5000},
            {name: "Ali B.", amount: 2000},
            {name: "Anonymous", amount: 500},
            {name: "Zara Y.", amount: 1500},
        ],
        isLive: true

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
        recentDonors: [
            {name: "Neighborhood Watch", amount: 5000},
            {name: "Anonymous", amount: 200},
            {name: "Pastor John", amount: 1000},
        ],
        isLive: true
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
        donorCount: 18,
        recentDonors: [
            {name: "AgriSupport", amount: 2500},
            {name: "Anonymous", amount: 100},
            {name: "Tom M.", amount: 500},
        ],
        isLive: false

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
        donorCount: 112,
        recentDonors: [
            {name: "Relief Corp", amount: 10000},
            {name: "Anonymous", amount: 500},
            {name: "Esther K.", amount: 2000},
            {name: "Mike T.", amount: 1000},
        ],
        isLive: false

    }
];