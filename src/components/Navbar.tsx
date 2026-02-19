import React, { useState } from 'react';
import { Page } from '../types';
import { Menu, X, HeartHandshake, ChevronDown, Lock, LogOut, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
    currentPage: Page;
    setPage: (page: Page) => void;
    isAdminAuthenticated: boolean;
    onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, setPage, isAdminAuthenticated, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Programs, Stories are top level. About & Contact are merged. Home is accessed via Logo.
    const mainNavItems = [
        { label: 'Programs', value: Page.PROGRAMS },
        { label: 'Stories', value: Page.STORIES },
    ];

    const handleNav = (page: Page) => {
        window.scrollTo(0, 0);
        setPage(page);
        setIsOpen(false);
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center cursor-pointer" onClick={() => handleNav(Page.HOME)}>
                        <div className="flex-shrink-0 flex items-center gap-2">
                            <div className="bg-kenya-green p-2 rounded-full">
                                <HeartHandshake className="h-6 w-6 text-white" />
                            </div>
                            <span className="font-serif font-bold text-2xl tracking-tight text-gray-900">
                Tushinde<span className="text-kenya-green">Charity</span>
              </span>
                        </div>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-6">
                        {mainNavItems.map((item) => (
                            <button
                                key={item.value}
                                onClick={() => handleNav(item.value)}
                                className={`${
                                    currentPage === item.value
                                        ? 'text-kenya-red font-semibold border-b-2 border-kenya-red'
                                        : 'text-gray-600 hover:text-kenya-green transition-colors'
                                } px-1 py-2 text-sm font-medium`}
                            >
                                {item.label}
                            </button>
                        ))}

                        {/* About & Contact Dropdown */}
                        <div className="relative group">
                            <button
                                className={`flex items-center gap-1 px-1 py-2 text-sm font-medium ${
                                    ([Page.ABOUT, Page.CONTACT] as Page[]).includes(currentPage) ? 'text-kenya-red font-semibold' : 'text-gray-600 hover:text-kenya-green'
                                }`}
                            >
                                About & Contact <ChevronDown className="w-4 h-4" />
                            </button>
                            <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                                <button
                                    onClick={() => handleNav(Page.ABOUT)}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-kenya-green transition-colors"
                                >
                                    Who We Are
                                </button>
                                <button
                                    onClick={() => handleNav(Page.CONTACT)}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-kenya-green transition-colors"
                                >
                                    Get in Touch
                                </button>
                            </div>
                        </div>

                        <div className="h-6 w-px bg-gray-200 mx-2"></div>

                        <button
                            onClick={() => handleNav(Page.APPLY)}
                            className="text-kenya-black hover:text-kenya-red font-medium text-sm transition-colors"
                        >
                            Get Help
                        </button>

                        <button
                            onClick={() => handleNav(Page.DONATE)}
                            className="bg-kenya-red hover:bg-red-700 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg transform hover:scale-105 transition-all flex items-center gap-2"
                        >
                            Donate <HeartHandshake className="w-4 h-4 text-white" />
                        </button>

                        {/* Admin Dropdown */}
                        <div className="relative group">
                            <button
                                className={`p-2 rounded-full transition-colors flex items-center gap-1 ${currentPage === Page.ADMIN ? 'bg-gray-100 text-kenya-green' : 'text-gray-400 hover:text-kenya-green hover:bg-gray-50'}`}
                                title="Admin Portal"
                            >
                                <Lock className="w-5 h-5" />
                                <ChevronDown className="w-3 h-3" />
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                                {isAdminAuthenticated ? (
                                    <>
                                        <button
                                            onClick={() => handleNav(Page.ADMIN)}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-kenya-green transition-colors flex items-center gap-2"
                                        >
                                            <LayoutDashboard className="w-4 h-4" /> Dashboard
                                        </button>
                                        <button
                                            onClick={() => {
                                                onLogout();
                                                setIsOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 border-t border-gray-100 mt-1 pt-2"
                                        >
                                            <LogOut className="w-4 h-4" /> Logout
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => handleNav(Page.ADMIN)}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-kenya-green transition-colors flex items-center gap-2"
                                    >
                                        <Lock className="w-4 h-4" /> Admin Login
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-kenya-green focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar Menu */}
            {isOpen && (
                <div className="md:hidden relative z-[60]">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Sidebar */}
                    <div className="fixed inset-y-0 right-0 w-1/2 h-screen bg-white shadow-2xl overflow-y-auto transform transition-transform duration-300 ease-in-out border-l border-gray-100">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <span className="font-bold text-gray-900">Menu</span>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 -mr-2 text-gray-500 hover:text-kenya-red rounded-full hover:bg-gray-100"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="px-3 pt-4 pb-6 space-y-2">
                            {mainNavItems.map((item) => (
                                <button
                                    key={item.value}
                                    onClick={() => handleNav(item.value)}
                                    className="block w-full text-left px-3 py-3 rounded-lg text-sm font-medium text-gray-700 hover:text-kenya-green hover:bg-gray-50 transition-colors"
                                >
                                    {item.label}
                                </button>
                            ))}
                            <button
                                onClick={() => handleNav(Page.ABOUT)}
                                className="block w-full text-left px-3 py-3 rounded-lg text-sm font-medium text-gray-700 hover:text-kenya-green hover:bg-gray-50 transition-colors"
                            >
                                About Us
                            </button>
                            <button
                                onClick={() => handleNav(Page.CONTACT)}
                                className="block w-full text-left px-3 py-3 rounded-lg text-sm font-medium text-gray-700 hover:text-kenya-green hover:bg-gray-50 transition-colors"
                            >
                                Contact
                            </button>
                            <button
                                onClick={() => handleNav(Page.APPLY)}
                                className="block w-full text-left px-3 py-3 rounded-lg text-sm font-medium text-gray-700 hover:text-kenya-green hover:bg-gray-50 transition-colors"
                            >
                                Apply for Help
                            </button>
                            <button
                                onClick={() => handleNav(Page.DONATE)}
                                className="block w-full text-left px-3 py-3 rounded-lg text-sm font-bold text-kenya-red hover:bg-red-50 transition-colors"
                            >
                                Donate Now
                            </button>

                            {/* Mobile Admin Controls */}
                            <div className="border-t border-gray-100 mt-4 pt-4">
                                {isAdminAuthenticated ? (
                                    <>
                                        <button
                                            onClick={() => handleNav(Page.ADMIN)}
                                            className="block w-full text-left px-3 py-3 rounded-lg text-sm font-medium text-gray-700 hover:text-kenya-green hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-center gap-2">
                                                <LayoutDashboard className="w-4 h-4" /> Dashboard
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => {
                                                onLogout();
                                                setIsOpen(false);
                                            }}
                                            className="block w-full text-left px-3 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            <div className="flex items-center gap-2">
                                                <LogOut className="w-4 h-4" /> Logout
                                            </div>
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => handleNav(Page.ADMIN)}
                                        className="block w-full text-left px-3 py-3 rounded-lg text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Lock className="w-4 h-4" /> Admin Login
                                        </div>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};