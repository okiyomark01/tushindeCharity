import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Apply } from './pages/Apply';
import { Donate } from './pages/Donate';
import { Programs } from './pages/Programs';
import { Stories } from './pages/Stories';
import { Contact } from './pages/Contact';
import { About } from './pages/About';
import { Admin } from './pages/Admin';
import { Page } from './types';

// Helper to determine page from URL
const getPageFromUrl = (): Page => {
  if (typeof window === 'undefined') return Page.HOME;
  const params = new URLSearchParams(window.location.search);
  const pageParam = params.get('page');

  // Validate if the param is a valid Page enum value
  if (pageParam && Object.values(Page).includes(pageParam as Page)) {
    return pageParam as Page;
  }
  return Page.HOME;
};

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(getPageFromUrl);
  const [isStoryOpen, setIsStoryOpen] = useState(false);

  // Initialize state directly from sessionStorage
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('adminAuth') === 'true';
  });

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const newPage = getPageFromUrl();
      setCurrentPage(newPage);
      // We don't force setIsStoryOpen(false) here because Stories.tsx
      // has its own popstate listener to handle story closing.
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update URL and State
  const handlePageChange = (page: Page) => {
    const url = new URL(window.location.href);

    // Clear sub-navigation params when switching main pages to avoid confusion
    url.searchParams.delete('story');
    url.searchParams.delete('tab');

    url.searchParams.set('page', page);

    try {
      // Use relative URL query string to avoid SecurityError in some environments
      window.history.pushState({}, '', '?' + url.searchParams.toString());
    } catch (e) {
      console.warn("Navigation state update failed (likely due to sandbox):", e);
    }

    // Dispatch a manual popstate event so components (like Stories) listening for URL changes
    // update their local state (e.g., closing a modal).
    window.dispatchEvent(new PopStateEvent('popstate', { state: {} }));

    setCurrentPage(page);
    setIsStoryOpen(false);
    // Scroll to top on new navigation only (let browser handle scroll on Back)
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
    handlePageChange(Page.HOME);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME:
        return <Home setPage={handlePageChange} onStoryStateChange={setIsStoryOpen} />;
      case Page.APPLY:
        return <Apply />;
      case Page.DONATE:
        return <Donate />;
      case Page.PROGRAMS:
        return <Programs setPage={handlePageChange} />;
      case Page.STORIES:
        return <Stories setPage={handlePageChange} />;
      case Page.CONTACT:
        return <Contact />;
      case Page.ABOUT:
        return <About />;
      case Page.ADMIN:
        return <Admin isAuthenticated={isAdminAuthenticated} setIsAuthenticated={setIsAdminAuthenticated} />;
      default:
        return <Home setPage={handlePageChange} onStoryStateChange={setIsStoryOpen} />;
    }
  };

  return (
      <div className="min-h-screen bg-gfm-bg font-sans text-gray-900 flex flex-col relative">
        <Navbar
            currentPage={currentPage}
            setPage={handlePageChange}
            isAdminAuthenticated={isAdminAuthenticated}
            onLogout={handleLogout}
        />
        <main className="flex-grow flex flex-col">
          {renderPage()}
        </main>
        <Footer setPage={handlePageChange} />

        {/* Mobile Sticky Donate Button */}
        {currentPage !== Page.DONATE && currentPage !== Page.ADMIN && currentPage !== Page.STORIES && !isStoryOpen && (
            <div className="fixed bottom-0 left-0 right-0 p-4 md:hidden z-40 pointer-events-none">
              <button
                  onClick={() => handlePageChange(Page.DONATE)}
                  className="w-full bg-kenya-green hover:bg-green-800 text-white font-bold py-3.5 rounded-full shadow-2xl transition-transform active:scale-95 text-lg pointer-events-auto"
              >
                Start a Donation
              </button>
            </div>
        )}
      </div>
  );
}

export default App;