import { getOracleUsers } from '@/lib/dal/oracledao';
import OracleListClient from './OracleListClient';
import RefreshButton from '@/app/components/RefreshButton';

export default async function OraclePage() {
    const users = await getOracleUsers();

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="sm:flex sm:items-center mb-8">
                <div className="sm:flex-auto">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Oracle Schema</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of schemas fetched from Oracle via 
                        <code className="ml-1 font-mono text-orange-600 bg-orange-50 px-1 rounded">REST API</code>.
                        (Enhanced with AG Grid features)
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <RefreshButton color="orange" className="block w-full sm:w-auto" />
                </div>
            </div>
            
            <div className="mt-8">
                {users.length > 0 ? (
                    <OracleListClient users={users} />
                ) : (
                    <div className="rounded-lg bg-gray-50 border border-dashed border-gray-300 py-20 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="mt-4 text-sm text-gray-500 italic">
                            No Oracle users found or the API server is currently unavailable.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
