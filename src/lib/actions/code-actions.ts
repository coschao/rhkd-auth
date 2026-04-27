'use server';

import { revalidatePath } from 'next/cache';
import * as codeDal from '@/lib/dal/code';

/* --- Code Groups --- */

export async function createCommonCodeGroupAction(data: { gcode: string; gname: string; remark?: string; useYn: string }) {
    try {
        const result = await codeDal.createCommonCodeGroup(data);
        revalidatePath('/system/code/cgroups');
        return { success: true, data: result };
    } catch (error) {
        console.error('Action Error [createCommonCodeGroupAction]:', error);
        return { success: false, error: 'Failed to create code group' };
    }
}

export async function updateCommonCodeGroupAction(gcode: string, data: { gname: string; remark?: string; useYn: string }) {
    try {
        const result = await codeDal.updateCommonCodeGroup(gcode, data);
        revalidatePath('/system/code/cgroups');
        return { success: true, data: result };
    } catch (error) {
        console.error('Action Error [updateCommonCodeGroupAction]:', error);
        return { success: false, error: 'Failed to update code group' };
    }
}

/* --- Common Codes (Details) --- */

export async function createCommonCodeAction(data: { 
    gcode: string; 
    ccode: string; 
    cname: string; 
    sort?: number;
    attr1?: string;
    attr2?: string;
    attr3?: string;
    attr4?: string;
    attr5?: string;
    remark?: string;
    useYn: string 
}) {
    try {
        const result = await codeDal.createCommonCode(data);
        revalidatePath('/system/code/ccodes');
        return { success: true, data: result };
    } catch (error) {
        console.error('Action Error [createCommonCodeAction]:', error);
        return { success: false, error: 'Failed to create common code' };
    }
}

export async function updateCommonCodeAction(
    gcode: string, 
    ccode: string, 
    data: { 
        cname: string; 
        sort?: number;
        attr1?: string;
        attr2?: string;
        attr3?: string;
        attr4?: string;
        attr5?: string;
        remark?: string;
        useYn: string 
    }
) {
    try {
        const result = await codeDal.updateCommonCode(gcode, ccode, data);
        revalidatePath('/system/code/ccodes');
        return { success: true, data: result };
    } catch (error) {
        console.error('Action Error [updateCommonCodeAction]:', error);
        return { success: false, error: 'Failed to update common code' };
    }
}
