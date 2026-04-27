import { getOracleUserTables } from '@/lib/dal/oracledao';
import OracleTableListClient from './OracleTableListClient';
import RefreshButton from '@/app/components/RefreshButton';
import Link from 'next/link';

export default async function OracleUserTablesPage({
    params,
}: {
    params: Promise<{ owner: string }>
}) {
    //const tables = await getOracleUserTables((await params).owner);
    const { owner } = await params;
    const tables = await getOracleUserTables(owner);

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8 flex items-center justify-between">
                <Link 
                    href="/remote/oracle" 
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center gap-1 group"
                >
                    <svg className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Schema List
                </Link>
                <div className="text-xs text-gray-400 font-mono bg-gray-100 px-2 py-1 rounded">
                    Oracle Explorer Mode
                </div>
            </div>

            <div className="sm:flex sm:items-center mb-8">
                <div className="sm:flex-auto">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">{ owner.toUpperCase() } Tables</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of tables for the specified user fetched from Oracle via 
                        <code className="ml-1 font-mono text-orange-600 bg-orange-50 px-1 rounded">REST API</code>.
                        (Enhanced with AG Grid features)
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <RefreshButton color="orange" className="block w-full sm:w-auto" />
                </div>
            </div>
            
            <div className="mt-8">
                {tables.length > 0 ? (
                    <OracleTableListClient tables={tables} />
                ) : (
                    <div className="rounded-lg bg-gray-50 border border-dashed border-gray-300 py-20 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="mt-4 text-sm text-gray-500 italic">
                            No Oracle user tables found or the API server is currently unavailable.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
