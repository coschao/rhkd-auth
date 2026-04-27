import { prisma } from '@/lib/prisma';

/**
 * 모든 코드 그룹 조회
 */
export async function getCommonCodeGroups() {
    return await prisma.commonCodeGroup.findMany({
        orderBy: { gcode: 'asc' }
    });
}

/**
 * 코드 그룹 생성
 */
export async function createCommonCodeGroup(data: { gcode: string; gname: string; remark?: string; useYn: string }) {
    return await prisma.commonCodeGroup.create({ data });
}

/**
 * 코드 그룹 수정
 */
export async function updateCommonCodeGroup(gcode: string, data: { gname: string; remark?: string; useYn: string }) {
    return await prisma.commonCodeGroup.update({
        where: { gcode },
        data: {
            ...data,
            updatedAt: new Date()
        }
    });
}

/**
 * 모든 상세 코드 조회 (그룹 정보 포함)
 */
export async function getCommonCodes() {
    return await prisma.commonCode.findMany({
        include: {
            group: true
        },
        orderBy: [
            { gcode: 'asc' },
            { sort: 'asc' }
        ]
    });
}

/**
 * 상세 코드 생성
 */
export async function createCommonCode(data: { 
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
    return await prisma.commonCode.create({ data });
}

/**
 * 상세 코드 수정
 */
export async function updateCommonCode(
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
    return await prisma.commonCode.update({
        where: {
            gcode_ccode: { gcode, ccode }
        },
        data: {
            ...data,
            updatedAt: new Date()
        }
    });
}
