'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon } from 'lucide-react';

export default function Header({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <header className="w-full py-4 px-6 bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-purple-600 dark:text-purple-400"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" />
          </svg>
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            CrazyAuth
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          <Button variant="outline" className="hidden md:inline-flex">
            Sign In
          </Button>
          <Button className="bg-purple-600 text-white hover:bg-purple-700">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}
