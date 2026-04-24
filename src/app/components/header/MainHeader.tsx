'use client';

import Link from 'next/link';
import MainNavbar from './MainNavbar';
import SignInButton from '../SignInButton';

export default function MainHeader() {
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
                            <span className="text-white font-bold text-xl">A</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-gray-900">RHKD Auth</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <MainNavbar />

                {/* Right side: Auth */}
                <div className="flex items-center gap-4">
                    <SignInButton />
                </div>
            </div>
        </header>
    );
}
