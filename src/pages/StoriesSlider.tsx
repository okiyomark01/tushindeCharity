import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
    faCircle,
    faPlayCircle,
    faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import '../assets/storiesslider.css';
import {DEFAULT_STORIES} from "../hook/useStories.ts";

interface StoriesSliderProps {
    onStorySelect?: (storyId: string) => void;
    onViewAllClick?: () => void;
}

const StoriesSlider: React.FC<StoriesSliderProps> = ({ onStorySelect, onViewAllClick }) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const scroll = (direction: 'left' | 'right') => {
        if (sliderRef.current) {
            const scrollAmount = 300;
            const newScrollLeft = direction === 'left'
                ? sliderRef.current.scrollLeft - scrollAmount
                : sliderRef.current.scrollLeft + scrollAmount;

            sliderRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });

            // Update arrow visibility after scroll
            setTimeout(() => {
                if (sliderRef.current) {
                    setShowLeftArrow(sliderRef.current.scrollLeft > 0);
                    setShowRightArrow(
                        sliderRef.current.scrollLeft <
                        sliderRef.current.scrollWidth - sliderRef.current.clientWidth - 10
                    );
                }
            }, 200);
        }
    };

    const handleScroll = () => {
        if (sliderRef.current) {
            setShowLeftArrow(sliderRef.current.scrollLeft > 0);
            setShowRightArrow(
                sliderRef.current.scrollLeft <
                sliderRef.current.scrollWidth - sliderRef.current.clientWidth - 10
            );
        }
    };

    const handleStoryClick = (storyId: string) => {
        if (onStorySelect) {
            onStorySelect(storyId);
        } else {
            // Fallback: update URL directly
            const url = new URL(window.location.href);
            url.searchParams.set('story', storyId);
            window.history.pushState({}, '', '?' + url.searchParams.toString());
            window.dispatchEvent(new PopStateEvent('popstate', { state: {} }));
        }
    };

    const handleViewAllClick = () => {
        if (onViewAllClick) {
            onViewAllClick();
        } else {
            // Fallback: navigate to stories page
            const url = new URL(window.location.href);
            url.searchParams.delete('story');
            url.searchParams.set('page', 'stories');
            window.history.pushState({}, '', '?' + url.searchParams.toString());
            window.dispatchEvent(new PopStateEvent('popstate', { state: {} }));
        }
    };

    return (
        <div className="stories-container">
            <div className="stories-header">
                <div className="stories-title-wrapper">
                    <h3 className="stories-title">
                        <FontAwesomeIcon icon={faPlayCircle} className="stories-title-icon" />
                        Similar Stories
                    </h3>

                </div>
                <span className="stories-count">{DEFAULT_STORIES.length} stories</span>
            </div>

            <div className="stories-slider-wrapper">
                {showLeftArrow && (
                    <button
                        className="stories-nav-button left"
                        onClick={() => scroll('left')}
                        aria-label="Previous stories"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                )}

                <div
                    className="stories-slider"
                    ref={sliderRef}
                    onScroll={handleScroll}
                >
                    {/* Story Items */}
                    {DEFAULT_STORIES.map(story => (
                        <div
                            key={story.id}
                            className="story-item"
                            onClick={() => handleStoryClick(story.id)}
                        >
                            <div className={`story-avatar-wrapper ${story.name ? 'has-story' : ''} ${story.isLive ? 'live' : ''}`}>
                                <div className="story-avatar">
                                    {story.mediaUrl && story.mediaType === 'image' && (
                                        <img
                                            className="story-image"
                                            src={story.mediaUrl}
                                            alt={story.title}
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.style.display = 'none';
                                            }}
                                        />
                                    )}
                                    {story.mediaType === 'video' && (
                                        <div className="story-video-placeholder">
                                            <FontAwesomeIcon icon={faPlayCircle} className="story-video-icon" />
                                            <span className="story-initials">{story.name.charAt(0)}</span>
                                        </div>
                                    )}
                                </div>
                                {story.isLive && (
                                    <span className="live-badge">
                                        <FontAwesomeIcon icon={faCircle} className="live-dot" />
                                        Hot
                                    </span>
                                )}
                            </div>
                            <div className="story-details">
                                <span className="story-name">{story.title}</span>
                                <span className="story-amount">KES {story.goal.toLocaleString()}</span>
                                <span className="story-location">{story.location}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {showRightArrow && (
                    <button
                        className="stories-nav-button right"
                        onClick={() => scroll('right')}
                        aria-label="Next stories"
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                )}
            </div>
            <button
                className="view-all-link"
                onClick={handleViewAllClick}
            >
                View All <FontAwesomeIcon icon={faArrowRight} className="view-all-icon" />
            </button>
        </div>

    );
};

export default StoriesSlider;