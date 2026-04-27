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
    TextFilterModule
} from 'ag-grid-community';
import { createCommonCodeGroupAction, updateCommonCodeGroupAction } from '@/lib/actions/code-actions';

ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    ValidationModule,
    CellStyleModule,
    TextFilterModule
]);

interface GroupManagementClientProps {
    initialGroups: any[];
}

export default function GroupManagementClient({ initialGroups }: GroupManagementClientProps) {
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingGroup, setEditingGroup] = useState<any>(null);
    const [formData, setFormData] = useState({
        gcode: '',
        gname: '',
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
        { headerName: 'Group Code', field: 'gcode', pinned: 'left', minWidth: 150 },
        { headerName: 'Group Name', field: 'gname', flex: 1, minWidth: 200 },
        { headerName: 'Remark', field: 'remark', flex: 1.5 },
        { 
            headerName: 'Status', 
            field: 'useYn', 
            width: 100,
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

    const handleEdit = (group: any) => {
        setEditingGroup(group);
        setFormData({
            gcode: group.gcode,
            gname: group.gname,
            remark: group.remark || '',
            useYn: group.useYn
        });
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setEditingGroup(null);
        setFormData({ gcode: '', gname: '', remark: '', useYn: 'Y' });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let result;
            if (editingGroup) {
                result = await updateCommonCodeGroupAction(formData.gcode, {
                    gname: formData.gname,
                    remark: formData.remark,
                    useYn: formData.useYn
                });
            } else {
                result = await createCommonCodeGroupAction(formData);
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
                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                    >
                        + New Group
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

            <div style={{ height: '600px' }} className="w-full shadow-lg border rounded-xl overflow-hidden bg-white">
                <AgGridReact
                    theme={myTheme}
                    rowData={initialGroups}
                    columnDefs={columnDefs}
                    defaultColDef={{
                        sortable: true,
                        resizable: true,
                        filter: true,
                        floatingFilter: isFilterVisible
                    }}
                    pagination={false}
                    paginationPageSize={10}
                    animateRows={true}
                />
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
                        <h2 className="text-xl font-bold mb-4">{editingGroup ? 'Edit Group' : 'New Code Group'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Group Code</label>
                                <input
                                    type="text"
                                    required
                                    disabled={!!editingGroup}
                                    value={formData.gcode}
                                    onChange={(e) => setFormData({...formData, gcode: e.target.value.toUpperCase()})}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none disabled:bg-gray-100"
                                    placeholder="e.g. USER_STATUS"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Group Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.gname}
                                    onChange={(e) => setFormData({...formData, gname: e.target.value})}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Remark</label>
                                <textarea
                                    rows={3}
                                    value={formData.remark}
                                    onChange={(e) => setFormData({...formData, remark: e.target.value})}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Usage Status</label>
                                <select
                                    value={formData.useYn}
                                    onChange={(e) => setFormData({...formData, useYn: e.target.value})}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none"
                                >
                                    <option value="Y">Active</option>
                                    <option value="N">Inactive</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500"
                                >
                                    {editingGroup ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
