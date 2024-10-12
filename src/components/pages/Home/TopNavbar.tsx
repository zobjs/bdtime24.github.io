'use client';

import React, { useState, useEffect } from 'react';
import { MenuOutlined, BellOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';
import RightDrawerNavigation from './RightDrawerNavigation';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import navData from '@/contexts/navData';

const bdtimeIcon = '/bdtime24.net-logo.png';

const TopNavbar: React.FC = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 shadow-md transition-all duration-300',
        isScrolled ? 'bg-white/70 backdrop-blur-md' : 'bg-transparent'
      )}
    >
      {/* Logo */}
      <div className="flex items-center space-x-4">
        <div className="text-xl font-bold">
          <Link href="/">
          <Image src={bdtimeIcon} alt="BDTime24 Logo" width={200} height={80} />
          </Link>
        </div>
        {/* Menu Links */}
        <div className="hidden md:flex space-x-6">
          {navData.map((item) => (
            <Link key={item.id} href={item.path}>
              <p className="text-gray-700 hover:text-blue-500 capitalize">{item.bn}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-4">
        <SearchOutlined
          className="text-xl cursor-pointer"
          onClick={() => setSearchOpen(!searchOpen)}
        />
        <BellOutlined className="text-xl cursor-pointer" />
        <SettingOutlined className="text-xl cursor-pointer" />
        {/* Menu button for mobile */}
        <MenuOutlined
          className="text-xl cursor-pointer md:hidden"
          onClick={() => setDrawerOpen(true)}
        />
      </div>

      {/* Search Box (conditionally rendered) */}
      {searchOpen && (
        <div className="absolute top-16 right-4 w-72 bg-white shadow-md p-4 rounded-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      )}

      {/* Right Drawer Navigation */}
      <RightDrawerNavigation
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </nav>
  );
};

export default TopNavbar;
