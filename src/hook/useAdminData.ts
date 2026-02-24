import type {ApplicationForm, Donation} from "../types/types.ts";

export const MOCK_DONATIONS: Donation[] = [
    { id: 'TX1001', donorName: 'John Kamau', amount: 5000, method: 'M-Pesa', date: '2023-10-25', status: 'Completed', reference: 'QHJ892KL' },
    { id: 'TX1002', donorName: 'Sarah Smith', amount: 12000, method: 'Card', date: '2023-10-24', status: 'Completed', reference: 'VISA-4242' },
    { id: 'TX1003', donorName: 'Anonymous', amount: 1000, method: 'M-Pesa', date: '2023-10-24', status: 'Completed', reference: 'QHJ771MN' },
    { id: 'TX1004', donorName: 'Enterprise Ltd', amount: 50000, method: 'Bank Transfer', date: '2023-10-22', status: 'Completed', reference: 'BK-9921' },
];

// Mock Applications Data
export const MOCK_APPLICATIONS: ApplicationForm[] = [
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