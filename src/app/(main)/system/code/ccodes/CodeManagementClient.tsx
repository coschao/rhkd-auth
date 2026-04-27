'use client';

import React, { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { 
    ModuleRegistry, 
    ClientSideRowModelModule, 
    ValidationModule,
    themeQuartz,
    CellStyleModule,
    ColDef,
    TextFilterModule,
    NumberFilterModule,
    PaginationModule
} from 'ag-grid-community';
import { createCommonCodeAction, updateCommonCodeAction } from '@/lib/actions/code-actions';

ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    ValidationModule,
    CellStyleModule,
    TextFilterModule,
    NumberFilterModule,
    PaginationModule
]);

// 재사용 가능한 입력 필드 행 컴포넌트
const FormRow = ({ label, children, required, alignTop = false }: { label: string, children: React.ReactNode, required?: boolean, alignTop?: boolean }) => (
    <div className={`flex gap-4 ${alignTop ? 'items-start' : 'items-center'}`}>
        <label className={`w-32 shrink-0 text-[11px] font-bold text-gray-500 uppercase text-right ${alignTop ? 'pt-2' : ''}`}>
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="flex-1">
            {children}
        </div>
    </div>
);

interface CodeManagementClientProps {
    initialCodes: any[];
    groups: any[];
}

export default function CodeManagementClient({ initialCodes, groups }: CodeManagementClientProps) {
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCode, setEditingCode] = useState<any>(null);
    const [formData, setFormData] = useState({
        gcode: '',
        ccode: '',
        cname: '',
        sort: 1,
        attr1: '',
        attr2: '',
        attr3: '',
        attr4: '',
        attr5: '',
        remark: '',
        useYn: 'Y'
    });

    const myTheme = useMemo(() => {
        return themeQuartz.withParams({
            headerBackgroundColor: 'rgb(243, 244, 246)',
            headerForegroundColor: 'rgb(55, 65, 81)',
            oddRowBackgroundColor: 'rgb(252, 253, 254)',
            wrapperBorderRadius: '12px',
        });
    }, []);

    const columnDefs: ColDef[] = useMemo(() => [
        { headerName: 'Group', field: 'gcode', pinned: 'left', minWidth: 120, filter: 'agTextColumnFilter' },
        { headerName: 'Code', field: 'ccode', pinned: 'left', minWidth: 120, filter: 'agTextColumnFilter' },
        { headerName: 'Name', field: 'cname', flex: 1, minWidth: 150, filter: 'agTextColumnFilter' },
        { headerName: 'Sort', field: 'sort', width: 80, filter: 'agNumberColumnFilter' },
        { headerName: 'Status', field: 'useYn', width: 100,
            cellRenderer: (params: any) => (
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${params.value === 'Y' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {params.value === 'Y' ? 'ACTIVE' : 'INACTIVE'}
                </span>
            )
        },
        {
            headerName: 'Actions',
            width: 100,
            pinned: 'right',
            cellRenderer: (params: any) => (
                <button 
                    onClick={() => handleEdit(params.data)}
                    className="text-indigo-600 hover:text-indigo-900 font-bold text-xs uppercase"
                >
                    Edit
                </button>
            )
        }
    ], []);

    const handleEdit = (code: any) => {
        setEditingCode(code);
        setFormData({
            gcode: code.gcode,
            ccode: code.ccode,
            cname: code.cname,
            sort: code.sort,
            attr1: code.attr1 || '',
            attr2: code.attr2 || '',
            attr3: code.attr3 || '',
            attr4: code.attr4 || '',
            attr5: code.attr5 || '',
            remark: code.remark || '',
            useYn: code.useYn
        });
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setEditingCode(null);
        setFormData({ 
            gcode: groups.length > 0 ? groups[0].gcode : '', 
            ccode: '', 
            cname: '', 
            sort: 1, 
            attr1: '', 
            attr2: '', 
            attr3: '', 
            attr4: '', 
            attr5: '', 
            remark: '', 
            useYn: 'Y' 
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let result;
            if (editingCode) {
                result = await updateCommonCodeAction(formData.gcode, formData.ccode, {
                    cname: formData.cname,
                    sort: Number(formData.sort),
                    attr1: formData.attr1,
                    attr2: formData.attr2,
                    attr3: formData.attr3,
                    attr4: formData.attr4,
                    attr5: formData.attr5,
                    remark: formData.remark,
                    useYn: formData.useYn
                });
            } else {
                result = await createCommonCodeAction({
                    ...formData,
                    sort: Number(formData.sort)
                });
            }

            if (result.success) {
                setIsModalOpen(false);
            } else {
                alert(result.error);
            }
        } catch (error) {
            alert('An unexpected error occurred');
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleAddNew}
                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
                    >
                        + New Code
                    </button>
                </div>
                
                <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                    <span className="text-xs font-bold text-gray-500 uppercase">Filters</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={isFilterVisible}
                            onChange={() => setIsFilterVisible(!isFilterVisible)}
                        />
                        <div className="w-10 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                </div>
            </div>

            <div style={{ height: '650px' }} className="w-full shadow-lg border rounded-xl overflow-hidden bg-white">
                <AgGridReact
                    theme={myTheme}
                    rowData={initialCodes}
                    columnDefs={columnDefs}
                    defaultColDef={{
                        sortable: true,
                        resizable: true,
                        filter: true,
                        floatingFilter: isFilterVisible
                    }}
                    pagination={true}
                    paginationPageSize={20}
                    animateRows={true}
                />
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl flex flex-col max-h-[90vh]">
                        {/* Header */}
                        <div className="px-6 py-4 border-b">
                            <h2 className="text-xl font-bold text-gray-800">{editingCode ? 'Edit Common Code' : 'New Common Code'}</h2>
                        </div>
                        
                        {/* Body - Horizontal Layout */}
                        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30">
                            <form id="code-form" onSubmit={handleSubmit} className="space-y-3">
                                <FormRow label="Group Code" required>
                                    <select
                                        disabled={!!editingCode}
                                        value={formData.gcode}
                                        onChange={(e) => setFormData({...formData, gcode: e.target.value})}
                                        className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-indigo-500 focus:outline-none disabled:bg-gray-100"
                                    >
                                        {groups.map(g => (
                                            <option key={g.gcode} value={g.gcode}>{g.gname} ({g.gcode})</option>
                                        ))}
                                    </select>
                                </FormRow>

                                <FormRow label="Detail Code" required>
                                    <input
                                        type="text"
                                        required
                                        maxLength={300}
                                        disabled={!!editingCode}
                                        value={formData.ccode}
                                        onChange={(e) => setFormData({...formData, ccode: e.target.value.toUpperCase()})}
                                        className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-indigo-500 focus:outline-none disabled:bg-gray-100"
                                        placeholder="e.g. ACTIVE"
                                    />
                                </FormRow>
                                
                                <FormRow label="Code Name" required>
                                    <input
                                        type="text"
                                        required
                                        maxLength={300}
                                        value={formData.cname}
                                        onChange={(e) => setFormData({...formData, cname: e.target.value})}
                                        className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-indigo-500 focus:outline-none"
                                    />
                                </FormRow>

                                <div className="border-t border-gray-100 my-4 pt-4 space-y-3">
                                    {[1, 2, 3, 4, 5].map(num => (
                                        <FormRow key={num} label={`Attribute ${num}`}>
                                            <input
                                                type="text"
                                                maxLength={300}
                                                value={(formData as any)[`attr${num}`]}
                                                onChange={(e) => setFormData({...formData, [`attr${num}`]: e.target.value})}
                                                className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-indigo-500 focus:outline-none"
                                            />
                                        </FormRow>
                                    ))}
                                </div>

                                <FormRow label="Remark" alignTop>
                                    <textarea
                                        rows={2}
                                        maxLength={500}
                                        value={formData.remark}
                                        onChange={(e) => setFormData({...formData, remark: e.target.value})}
                                        className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-indigo-500 focus:outline-none"
                                    />
                                </FormRow>

                                <div className="border-t border-gray-100 my-4 pt-4 grid grid-cols-2 gap-x-8">
                                    <FormRow label="Sort Order" required>
                                        <input
                                            type="number"
                                            required
                                            min={1}
                                            max={999}
                                            value={formData.sort || ''} // 0인 경우 빈 문자열로 표시하여 입력 편의성 제공
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                // 3자리 이하인 경우에만 업데이트
                                                if (val.length <= 3) {
                                                    const numVal = parseInt(val);
                                                    setFormData({...formData, sort: isNaN(numVal) ? 0 : numVal});
                                                }
                                            }}
                                            className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-indigo-500 focus:outline-none"
                                        />
                                    </FormRow>
                                    <FormRow label="Status">
                                        <select
                                            value={formData.useYn}
                                            onChange={(e) => setFormData({...formData, useYn: e.target.value})}
                                            className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-indigo-500 focus:outline-none"
                                        >
                                            <option value="Y">Active</option>
                                            <option value="N">Inactive</option>
                                        </select>
                                    </FormRow>
                                </div>
                            </form>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 border-t bg-gray-50 rounded-b-xl flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                form="code-form"
                                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 shadow-sm transition-colors"
                            >
                                {editingCode ? 'Update Changes' : 'Create Code'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
