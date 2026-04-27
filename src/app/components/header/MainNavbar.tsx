'use client';

import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Link from 'next/link';

const navigations = [
    { name: 'About', href: '/about' },
    {
        name: 'Database',
        href: '#',
        submenu: [
            {
                name: 'SQLite',
                href: '/database/sqlite',
                icon: (
                    <svg className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                ),
            },
            {
                name: 'Redis',
                href: '#',
                disabled: true,
                icon: (
                    <svg className="h-4 w-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                ),
            },
        ]
    },
    {
        name: 'Remote',
        href: '#',
        submenu: [
            {
                name: 'Oracle',
                href: '/remote/oracle',
                icon: (
                    <svg className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                ),
            },
            {
                name: 'MongoDB',
                href: '#',
                disabled: true,
                icon: (
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                    </svg>
                ),
            },
        ]
    },
    {
        name: 'System',
        href: '#',
        submenu: [
            {
                name: 'Code Group',
                href: '/system/code/cgroups',
                icon: (
                    <svg className="h-4 w-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                ),
            },
            {
                name: 'Common Code',
                href: '/system/code/ccodes',
                icon: (
                    <svg className="h-4 w-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                ),
            },
        ]
    }
];

export default function MainNavbar() {
    return (
        <Disclosure as="nav" className="hidden md:flex items-center gap-8">
            {navigations.map((item) => (
                !item.submenu ? (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                        {item.name}
                    </Link>
                ) : (
                    <Menu as="div" key={item.name} className="relative">
                        <MenuButton className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
                            {item.name}
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </MenuButton>

                        <MenuItems className="absolute left-0 mt-2 w-48 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
                            {item.submenu.map((subItem, idx) => (
                                <div key={subItem.name}>
                                    {idx > 0 && <div className="border-t border-gray-100 my-1" />}
                                    <MenuItem>
                                        {({ active }) => (
                                            subItem.disabled ? (
                                                <span className="block px-4 py-2 text-sm text-gray-400 cursor-not-allowed italic">
                                                    <div className="flex items-center gap-2">
                                                        {subItem.icon}
                                                        {subItem.name} (Soon)
                                                    </div>
                                                </span>
                                            ) : (
                                                <Link
                                                    href={subItem.href}
                                                    className={`${
                                                        active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'
                                                    } block px-4 py-2 text-sm transition-colors`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        {subItem.icon}
                                                        {subItem.name}
                                                    </div>
                                                </Link>
                                            )
                                        )}
                                    </MenuItem>
                                </div>
                            ))}
                        </MenuItems>
                    </Menu>
                )
            ))}
        </Disclosure>
    );
}
