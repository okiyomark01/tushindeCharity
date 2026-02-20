import { type FC, useState } from 'react';
import '../assets/updates.css';

interface Donation {
    id: number;
    initials: string;
    name: string;
    phone: string;
    amount: string;
}

export const DonationsList: FC = () => {
    const [showAllDonations, setShowAllDonations] = useState(false);
    const [donations] = useState<Donation[]>([
        { id: 1, initials: 'J', name: 'James Mwangi', phone: '0761ˣˣˣˣ78', amount: '4,000' },
        { id: 2, initials: 'M', name: 'Mark Kimani', phone: '0700ˣˣˣˣ65', amount: '10,000' },
        { id: 3, initials: 'S', name: 'Sarah Wanjiku', phone: '0722ˣˣˣˣ34', amount: '2,500' },
        { id: 4, initials: 'D', name: 'David Omondi', phone: '0733ˣˣˣˣ89', amount: '7,500' },
        { id: 5, initials: 'P', name: 'Phyllis Akinyi', phone: '0711ˣˣˣˣ23', amount: '15,000' },
        { id: 6, initials: 'B', name: 'Brian Odhiambo', phone: '0744ˣˣˣˣ56', amount: '3,200' },
        { id: 7, initials: 'L', name: 'Linda Achieng', phone: '0798ˣˣˣˣ12', amount: '20,000' },
        { id: 8, initials: 'K', name: 'Kevin Kipchoge', phone: '0755ˣˣˣˣ67', amount: '5,500' },
        { id: 9, initials: 'G', name: 'Grace Mutua', phone: '0777ˣˣˣˣ90', amount: '12,000' },
        { id: 10, initials: 'R', name: 'Robert Kariuki', phone: '0788ˣˣˣˣ45', amount: '8,800' },
        { id: 11, initials: 'E', name: 'Esther Njeri', phone: '0766ˣˣˣˣ32', amount: '25,000' },
        { id: 12, initials: 'F', name: 'Francis Mburu', phone: '0723ˣˣˣˣ78', amount: '6,000' },
        { id: 13, initials: 'C', name: 'Catherine Wambui', phone: '0734ˣˣˣˣ21', amount: '9,000' },
        { id: 14, initials: 'N', name: 'Nicholas Maina', phone: '0745ˣˣˣˣ87', amount: '30,000' },
        { id: 15, initials: 'H', name: 'Hannah Jepchirchir', phone: '0756ˣˣˣˣ43', amount: '11,500' },
        { id: 16, initials: 'T', name: 'Timothy Kiprop', phone: '0767ˣˣˣˣ54', amount: '7,200' }
    ]);

    // Get first name only
    const getFirstName = (fullName: string): string => {
        return fullName.split(' ')[0];
    };

    return (
        <>
            {/* Main Container */}
            <div className="user-live-updates-container">
                <div className="user-details-header">
                    <div className="live-updates-title">Live Donations</div>
                    <div className="live-updates-total">50.6K</div>
                </div>

                <div className="user-live-updates-list" style={{ maxHeight: '320px' }}>
                    {donations.slice(0, 8).map(({ id, initials, name, phone, amount }) => (
                        <div key={id} className="user-live-updates">
                            <div className="user-initials">
                                <div className="user-initials-details">{initials}</div>
                            </div>
                            <div className="user-details">
                                <div className="user-details-name">{getFirstName(name)}</div>
                                <div className="user-details-phone">{phone}</div>
                            </div>
                            <div className="user-details-amount">{amount}</div>
                        </div>
                    ))}
                </div>

                {/* See All Button */}
                <button
                    className="see-all-button"
                    onClick={() => setShowAllDonations(true)}
                >
                    See All Donations
                    <span className="see-all-count">{donations.length}</span>
                </button>
            </div>

            {/* Full Screen Overlay */}
            {showAllDonations && (
                <div className="donations-overlay">
                    <div className="overlay-header">
                        <h2>All Donations</h2>
                        <button
                            className="close-button"
                            onClick={() => setShowAllDonations(false)}
                        >
                            ✕
                        </button>

                    </div>

                    <div className="overlay-donations-list">
                        {donations.map(({ id, initials, name, phone, amount }) => (
                            <div key={id} className="user-live-updates">
                                <div className="user-initials">
                                    <div className="user-initials-details">{initials}</div>
                                </div>
                                <div className="user-details">
                                    <div className="user-details-name">{getFirstName(name)}</div>
                                    <div className="user-details-phone">{phone}</div>
                                </div>
                                <div className="user-details-amount">{amount}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};