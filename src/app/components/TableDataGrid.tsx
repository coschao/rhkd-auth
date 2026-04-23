'use client';

import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { 
    ModuleRegistry, 
    ClientSideRowModelModule, 
    ValidationModule,
    TextFilterModule,
    NumberFilterModule,
    DateFilterModule,
    PaginationModule,
    CustomFilterModule,
    themeQuartz,
    CellStyleModule // [1] CellStyleModule 추가
} from 'ag-grid-community';

// AG Grid 필수 모듈 등록
ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    PaginationModule,
    TextFilterModule,
    NumberFilterModule,
    DateFilterModule,
    CustomFilterModule,
    ValidationModule,
    CellStyleModule // [2] 여기에 등록
]);

// 스타일 임포트 제거 (v33 Theming API는 테마 객체에 스타일을 포함합니다)
// import 'ag-grid-community/styles/ag-grid.css';

interface TableDataGridProps {
    rowData: any[];
}

export default function TableDataGrid({ rowData }: TableDataGridProps) {
    const [isFilterVisible, setIsFilterVisible] = React.useState(true);

    // v33 Theming API를 사용한 테마 설정
    const myTheme = useMemo(() => {
        return themeQuartz.withParams({
            headerBackgroundColor: 'rgb(243, 244, 246)',
            headerForegroundColor: 'rgb(55, 65, 81)',
            oddRowBackgroundColor: 'rgb(252, 253, 254)',
            wrapperBorderRadius: '12px',
        });
    }, []);

    // 데이터의 첫 번째 행을 기반으로 컬럼 정의 생성
    const columnDefs = useMemo(() => {
        if (!rowData || rowData.length === 0) return [];
        
        return Object.keys(rowData[0]).map(key => {
            const isID = key.toLowerCase() === 'id';
            return {
                field: key,
                headerName: key.toUpperCase(),
                filter: true,
                sortable: true,
                resizable: true,
                flex: isID ? 0 : 1,
                minWidth: isID ? 80 : 150,
                pinned: isID ? 'left' as const : undefined,
                // 고정된 ID 컬럼의 배경색 설정
                cellStyle: isID ? { backgroundColor: 'rgba(243, 244, 246, 0.5)' } : undefined,
                cellRenderer: (params: any) => {
                    if (typeof params.value === 'boolean') {
                        return (
                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${params.value ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {params.value.toString().toUpperCase()}
                            </span>
                        );
                    }
                    if (params.value === null || params.value === undefined) {
                        return <span className="text-gray-300 italic">NULL</span>;
                    }
                    return params.value;
                }
            };
        });
    }, [rowData]);

    const defaultColDef = useMemo(() => ({
        filter: true,
        floatingFilter: isFilterVisible, // 상태와 연동
    }), [isFilterVisible]);

    return (
        <div className="flex flex-col gap-4">
            {/* 상단 컨트롤 영역 */}
            <div className="flex justify-end items-center px-4">
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-tight">Show Filter</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={isFilterVisible}
                            onChange={() => setIsFilterVisible(!isFilterVisible)}
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                </div>
            </div>

            <div style={{ height: '600px' }} className="w-full shadow-lg border rounded-xl overflow-hidden">
                <AgGridReact
                    theme={myTheme}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    pagination={true}
                    paginationPageSize={20}
                    paginationPageSizeSelector={[10, 20, 50, 100]}
                    animateRows={true}
                    overlayNoRowsTemplate="<span className='text-gray-500'>데이터가 없습니다.</span>"
                />
            </div>
        </div>
    );
}
