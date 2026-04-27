'use client';

import SimpleDataGrid from '@/app/components/SimpleDataGrid';
import Link from 'next/link';

interface OracleListClientProps {
    users: any[];
}

export default function OracleListClient({ users }: OracleListClientProps) {
    // 표시할 컬럼
    const displayColumns = ['USERNAME', 'USER_ID', 'CREATED', 'ORACLE_MAINTAINED', 'TABLE_COUNT'];
    
    // 고정할 컬럼
    const pinnedColumns = ['USERNAME'];

    return (
        <SimpleDataGrid 
            rowData={users} 
            columns={displayColumns}
            pinnedColumns={pinnedColumns}
            showRowNumber={true}
            actionColumn={{
                headerName: 'ACTIONS',
                width: 100,
                render: (data) => (
                    <Link 
                        href={`/remote/oracle/${data.username}/tables`}
                        className="text-orange-600 hover:text-orange-900 text-xs font-bold uppercase tracking-wider"
                    >
                        Explore
                    </Link>
                )
            }}
        />
    );
}
