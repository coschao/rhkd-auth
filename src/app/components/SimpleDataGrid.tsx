'use client';

import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { 
    ModuleRegistry, 
    ClientSideRowModelModule, 
    ValidationModule,
    themeQuartz,
    CellStyleModule,
    ColDef
} from 'ag-grid-community';

// AG Grid 필수 모듈 등록
ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    ValidationModule,
    CellStyleModule
]);

interface SimpleDataGridProps {
    rowData: any[];
    /** 표시할 컬럼 명칭 리스트. 없으면 전체 표시 */
    columns?: string[]; 
    /** 좌측에 고정할 컬럼 명칭 리스트 */
    pinnedColumns?: string[];
    /** 가장 좌측에 번호(순번) 표시 여부 */
    showRowNumber?: boolean;
    /** 우측 끝에 추가할 사용자 정의 컬럼 설정 */
    actionColumn?: {
        headerName: string;
        render: (params: any) => React.ReactNode;
        width?: number;
    };
}

export default function SimpleDataGrid({ 
    rowData, 
    columns, 
    pinnedColumns = [], 
    showRowNumber = false,
    actionColumn
}: SimpleDataGridProps) {
    
    const myTheme = useMemo(() => {
        return themeQuartz.withParams({
            headerBackgroundColor: 'rgb(243, 244, 246)',
            headerForegroundColor: 'rgb(55, 65, 81)',
            oddRowBackgroundColor: 'rgb(252, 253, 254)',
            wrapperBorderRadius: '8px',
        });
    }, []);

    const columnDefs = useMemo(() => {
        if (!rowData || rowData.length === 0) return [];
        
        const defs: ColDef[] = [];

        // 2. 가장 좌측 넘버링 추가
        if (showRowNumber) {
            defs.push({
                headerName: '#',
                valueGetter: "node.rowIndex + 1",
                width: 70,
                minWidth: 70,
                maxWidth: 80,
                pinned: 'left',
                suppressMovable: true,
                cellStyle: { textAlign: 'center', color: '#6b7280', fontWeight: '500' }
            });
        }

        // 0. 표시할 데이터 키 결정
        const keysToDisplay = columns || Object.keys(rowData[0]);
        
        const dataDefs: ColDef[] = keysToDisplay.map(key => {
            const actualKey = Object.keys(rowData[0]).find(
                k => k.toLowerCase() === key.toLowerCase()
            ) || key;

            const upperKey = actualKey.toUpperCase();
            
            // 1. 핀 고정 여부 확인
            const isPinned = pinnedColumns.some(p => p.toLowerCase() === key.toLowerCase());

            return {
                field: actualKey,
                headerName: key.toUpperCase(),
                sortable: true,
                resizable: true,
                flex: 1,
                minWidth: 150,
                pinned: isPinned ? 'left' as const : undefined,
                cellRenderer: (params: any) => {
                    if (upperKey === 'ACCOUNT_STATUS') {
                        const isOpen = params.value === 'OPEN';
                        return (
                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {params.value}
                            </span>
                        );
                    }
                    if (upperKey === 'ORACLE_MAINTAINED') {
                        return (
                            <span className={`px-2 py-1 rounded text-[10px] font-medium ${params.value === 'Y' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                                {params.value === 'Y' ? 'SYSTEM' : 'USER'}
                            </span>
                        );
                    }
                    if (params.value === null || params.value === undefined) {
                        return <span className="text-gray-300 italic">NULL</span>;
                    }
                    if (upperKey === 'CREATED' && params.value) {
                        return new Date(params.value).toLocaleDateString();
                    }
                    return params.value;
                }
            };
        });

        defs.push(...dataDefs);

        // 3. 우측 끝 사용자 정의 컬럼 추가
        if (actionColumn) {
            defs.push({
                headerName: actionColumn.headerName,
                width: actionColumn.width || 120,
                minWidth: actionColumn.width || 120,
                pinned: 'right',
                cellRenderer: (params: any) => actionColumn.render(params.data),
                suppressMovable: true,
                sortable: false,
                filter: false
            });
        }

        return defs;
    }, [rowData, columns, pinnedColumns, showRowNumber, actionColumn]);

    return (
        <div style={{ height: '600px' }} className="w-full shadow-md border rounded-lg overflow-hidden">
            <AgGridReact
                theme={myTheme}
                rowData={rowData}
                columnDefs={columnDefs}
                pagination={false}
                animateRows={true}
                overlayNoRowsTemplate="<span className='text-gray-500'>데이터가 없습니다.</span>"
            />
        </div>
    );
}
