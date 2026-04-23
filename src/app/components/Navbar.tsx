'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import SignInButton from './SignInButton';

export default function Navbar() {
    const [isDbOpen, setIsDbOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // 마우스가 들어왔을 때 (지연 시간 제거 및 열기)
    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsDbOpen(true);
    };

    // 마우스가 나갔을 때 (약간의 지연 시간 후 닫기)
    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsDbOpen(false);
        }, 150); // 150ms 정도의 유예 시간을 줌
    };

    // 마우스 클릭 시 드롭다운 닫기 처리를 위한 로직
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDbOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
                            <span className="text-white font-bold text-xl">R</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-gray-900">rhkd-auth</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link 
                        href="/about" 
                        className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                        About
                    </Link>

                    {/* Database Dropdown */}
                    <div 
                        className="relative py-4" // 부모에 세로 패딩을 주어 마우스 이동 경로를 확보
                        ref={dropdownRef}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <button
                            onClick={() => setIsDbOpen(!isDbOpen)}
                            className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                                isDbOpen ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'
                            }`}
                        >
                            Database
                            <svg 
                                className={`h-4 w-4 transition-transform duration-200 ${isDbOpen ? 'rotate-180' : ''}`} 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        <div 
                            className={`absolute left-0 mt-1 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 origin-top-left ${
                                isDbOpen 
                                    ? 'opacity-100 scale-100 translate-y-0' 
                                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                            }`}
                        >
                            {/* 투명한 상단 가교 (버튼과 메뉴 사이의 간격에서 마우스가 나가지 않게 함) */}
                            <div className="absolute -top-2 left-0 right-0 h-2 bg-transparent"></div>
                            
                            <Link
                                href="/database/sqlite"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                onClick={() => setIsDbOpen(false)}
                            >
                                <div className="flex items-center gap-2">
                                    <svg className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                                    </svg>
                                    SQLite
                                </div>
                            </Link>
                            <div className="border-t border-gray-100 my-1"></div>
                            <Link
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-400 cursor-not-allowed italic"
                                onClick={(e) => e.preventDefault()}
                            >
                                Redis (Coming soon)
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Right side: Auth */}
                <div className="flex items-center gap-4">
                    <SignInButton />
                </div>
            </div>
        </header>
    );
}
