import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NavbarProps {
  currentPath: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentPath }) => {
  const navItems = [
    { path: '/', label: '首页' },
    { path: '/components', label: '组件' },
    { path: '/docs', label: '文档' },
    { path: '/storybook', label: 'Storybook' },
    { path: 'https://github.com/acring/VizForge', label: 'GitHub' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center">
                <Image
                  src="/logo.svg"
                  alt="VizForge Logo"
                  width={40}
                  height={40}
                  className="mr-2"
                />
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  VizForge
                </span>
              </div>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {navItems.map(item => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPath === item.path
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
