import { type FC, useState } from 'react';
import '../assets/updates.css';
import {donations} from "../hook/useDonations.ts";


export const DonationsList: FC = () => {
    const [showAllDonations, setShowAllDonations] = useState(false);

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