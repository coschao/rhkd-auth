'use client';

import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Link from 'next/link';

export default function MainNavbar() {
    return (
        <Disclosure as="nav" className="hidden md:flex items-center gap-8">
            <Link 
                href="/about" 
                className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
            >
                About
            </Link>

            {/* Database Dropdown */}
            <Menu as="div" className="relative">
                <MenuButton className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
                    Database
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </MenuButton>

                <MenuItems className="absolute left-0 mt-2 w-48 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
                    <MenuItem>
                        {({ active }) => (
                            <Link
                                href="/database/sqlite"
                                className={`${
                                    active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'
                                } block px-4 py-2 text-sm transition-colors`}
                            >
                                <div className="flex items-center gap-2">
                                    <svg className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                                    </svg>
                                    SQLite
                                </div>
                            </Link>
                        )}
                    </MenuItem>
                    <div className="border-t border-gray-100 my-1" />
                    <MenuItem>
                        {() => (
                            <span className="block px-4 py-2 text-sm text-gray-400 cursor-not-allowed italic">
                                Redis (Coming soon)
                            </span>
                        )}
                    </MenuItem>
                </MenuItems>
            </Menu>
        </Disclosure>
    );
}
