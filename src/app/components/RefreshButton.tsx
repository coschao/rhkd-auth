'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

interface RefreshButtonProps {
    className?: string;
    color?: 'indigo' | 'orange';
}

export default function RefreshButton({ 
    className, 
    color = 'indigo' 
}: RefreshButtonProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    
    const colorClasses = {
        indigo: 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600',
        orange: 'bg-orange-600 hover:bg-orange-500 focus-visible:outline-orange-600'
    };

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    return (
        <button
            type="button"
            onClick={handleRefresh}
            disabled={isPending}
            className={`${className} ${colorClasses[color]} flex items-center justify-center gap-2 rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-sm disabled:opacity-50 transition-all`}
        >
            <svg 
                className={`h-4 w-4 ${isPending ? 'animate-spin' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {isPending ? 'Refreshing...' : 'Refresh'}
        </button>
    );
}
