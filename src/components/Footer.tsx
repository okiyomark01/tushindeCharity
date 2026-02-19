import React from 'react';
import { Page } from '../types';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  setPage: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ setPage }) => {
  return (
      <footer className="bg-gray-900 text-white pt-8 pb-24 md:pb-4">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">

            <div className="col-span-1 md:col-span-1">
              <h3 className="font-serif text-xl font-bold mb-2">
                Tushinde<span className="text-kenya-red">Charity</span>
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed mb-3">
                Empowering communities, restoring dignity, and building a brighter future for every child, woman, and man in Kenya.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-400 hover:text-kenya-green"><Facebook className="w-4 h-4" /></a>
                <a href="#" className="text-gray-400 hover:text-kenya-green"><Twitter className="w-4 h-4" /></a>
                <a href="#" className="text-gray-400 hover:text-kenya-green"><Instagram className="w-4 h-4" /></a>
              </div>
            </div>

            <div>
              <h4 className="text-base font-semibold mb-3 border-b border-gray-700 pb-1 inline-block">Quick Links</h4>
              <ul className="space-y-1 text-xs text-gray-400">
                <li><button onClick={() => setPage(Page.ABOUT)} className="hover:text-white transition-colors">About Us</button></li>
                <li><button onClick={() => setPage(Page.PROGRAMS)} className="hover:text-white transition-colors">Our Programs</button></li>
                <li><button onClick={() => setPage(Page.STORIES)} className="hover:text-white transition-colors">Success Stories</button></li>
                <li><button onClick={() => setPage(Page.APPLY)} className="hover:text-white transition-colors">Apply for Help</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-base font-semibold mb-3 border-b border-gray-700 pb-1 inline-block">Programs</h4>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>Medical Treatment</li>
                <li>Education Support</li>
                <li>Small Business Funding</li>
                <li>Emergency Relief</li>
              </ul>
            </div>

            <div>
              <h4 className="text-base font-semibold mb-3 border-b border-gray-700 pb-1 inline-block">Contact Us</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-kenya-red shrink-0" />
                  <span>Nairobi, Kenya<br/>Westlands, P.O. Box 12345</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-kenya-green shrink-0" />
                  <span>+254 700 123 456</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-kenya-green shrink-0" />
                  <span>info@tushindecharity.org</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="border-t border-gray-800 mt-6 pt-4 text-center text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} Tushinde Charity. All rights reserved.</p>
          </div>
        </div>
      </footer>
  );
};