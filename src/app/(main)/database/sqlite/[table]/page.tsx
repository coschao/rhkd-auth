import { getTableData } from '@/lib/dal/sqlitedao';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import TableDataGrid from '@/app/components/TableDataGrid';

export default async function TablePage({
    params,
}: {
    params: Promise<{ table: string }>
}) {
    const { table } = await params;
    const data = await getTableData(table);

    if (!data) {
        return notFound();
    }

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8 flex items-center justify-between">
                <Link 
                    href="/database/sqlite" 
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center gap-1 group"
                >
                    <svg className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Schema List
                </Link>
                <div className="text-xs text-gray-400 font-mono bg-gray-100 px-2 py-1 rounded">
                    SQLite Explorer Mode
                </div>
            </div>

            <div className="sm:flex sm:items-center mb-8">
                <div className="sm:flex-auto">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
                        <span className="h-10 w-2 bg-indigo-600 rounded-full"></span>
                        Table: <span className="text-indigo-600 font-mono">{table}</span>
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Showing data from <code className="font-mono bg-gray-100 px-1 rounded">{table}</code>. Sort and filter rows using AG Grid.
                    </p>
                </div>
            </div>

            <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <TableDataGrid rowData={data} />
            </div>

            <div className="mt-4 flex justify-end">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                    Top 100 rows loaded • Powered by AG Grid Community
                </p>
            </div>
        </div>
    );
}
