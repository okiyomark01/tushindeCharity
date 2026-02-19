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

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);

  // Initialize state directly from sessionStorage to avoid useEffect state update warning
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('adminAuth') === 'true';
  });

  // Scroll to top whenever the page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
    setCurrentPage(Page.HOME);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME:
        return <Home setPage={setCurrentPage} />;
      case Page.APPLY:
        return <Apply />;
      case Page.DONATE:
        return <Donate />;
      case Page.PROGRAMS:
        return <Programs setPage={setCurrentPage} />;
      case Page.STORIES:
        return <Stories setPage={setCurrentPage} />;
      case Page.CONTACT:
        return <Contact />;
      case Page.ABOUT:
        return <About />;
      case Page.ADMIN:
        return <Admin isAuthenticated={isAdminAuthenticated} setIsAuthenticated={setIsAdminAuthenticated} />;
      default:
        return <Home setPage={setCurrentPage} />;
    }
  };

  return (
      <div className="min-h-screen bg-gfm-bg font-sans text-gray-900 flex flex-col relative">
        <Navbar
            currentPage={currentPage}
            setPage={setCurrentPage}
            isAdminAuthenticated={isAdminAuthenticated}
            onLogout={handleLogout}
        />
        <main className="flex-grow pb-24 md:pb-0">
          {renderPage()}
        </main>
        <Footer setPage={setCurrentPage} />

        {/* Mobile Sticky Donate Button */}
        {currentPage !== Page.DONATE && currentPage !== Page.ADMIN && (
            <div className="fixed bottom-0 left-0 right-0 p-4 md:hidden z-40 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
              <button
                  onClick={() => setCurrentPage(Page.DONATE)}
                  className="w-full bg-kenya-green hover:bg-green-800 text-white font-bold py-3.5 rounded-full shadow-lg transition-transform active:scale-95 text-lg"
              >
                Start a Donation
              </button>
            </div>
        )}
      </div>
  );
}

export default App;