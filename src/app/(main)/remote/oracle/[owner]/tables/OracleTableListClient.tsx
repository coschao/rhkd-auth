'use client';

import SimpleDataGrid from '@/app/components/SimpleDataGrid';
import Link from 'next/link';

interface OracleTableListClientProps {
    tables: any[];
}

export default function OracleTableListClient({ tables }: OracleTableListClientProps) {
    // 표시할 컬럼 : OWNER, TABLESPACE_NAME
    const displayColumns = [ 'TABLE_NAME', 'LAST_ANALYZED', 'PARTITIONED', 'NUM_ROWS', 'BLOCKS', 'AVG_ROW_LEN' ];
    
    // 고정할 컬럼
    const pinnedColumns = ['TABLE_NAME'];

    return (
        <SimpleDataGrid 
            rowData={tables} 
            columns={displayColumns}
            pinnedColumns={pinnedColumns}
            showRowNumber={true}
            actionColumn={{
                headerName: 'ACTIONS',
                width: 100,
                render: (data) => (
                    <Link 
                        href={`/remote/oracle/${data.owner}/${data.table_name}`}
                        className="text-orange-600 hover:text-orange-900 text-xs font-bold uppercase tracking-wider"
                    >
                        Table
                    </Link>
                )
            }}
        />
    );
}
