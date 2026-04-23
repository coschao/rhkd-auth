/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '@/lib/prisma';
import dayjs from 'dayjs';

export interface TableInfo {
    name: string;
    count: number;
}

/**
 * SQLite 데이터베이스의 테이블 목록과 각 테이블의 데이터 수를 조회합니다.
 */
export async function getSqliteTables(): Promise<TableInfo[]> {
    try {
        // 1. 먼저 테이블 이름 목록을 조회합니다.
        const tables = await prisma.$queryRaw<{ name: string }[]>`
            SELECT name FROM sqlite_master 
            WHERE type='table' 
            AND name NOT LIKE 'sqlite_%' 
            AND name NOT LIKE '_prisma_migrations';
        `;

        if (tables.length === 0) return [];

        // 2. 각 테이블의 count(*)를 UNION ALL로 합친 동적 쿼리 생성
        // 예: SELECT 'User' as name, count(*) as count FROM User UNION ALL SELECT 'Post' as name...
        const countQuery = tables
            .map(t => `SELECT '${t.name}' as name, count(*) as count FROM ${t.name}`)
            .join(' UNION ALL ');

        const results = await prisma.$queryRawUnsafe<any[]>(countQuery);

        return results.map(r => ({
            name: r.name,
            count: Number(r.count)
        }));
    }
    catch (error) {
        console.error('[DAL#getSqliteTables] error:', error);
        throw new Error('Failed to fetch database tables with counts');
    }
}


/**
 * 특정 테이블의 데이터를 조회
 */
export async function getTableData(tableName: string): Promise<any[]> {
    try {
        // 테이블 이름 유효성 검사 (알파벳, 숫자, 언더바만 허용하여 SQL Injection 방지)
        if (!/^[a-zA-Z0-9_]+$/.test(tableName)) {
            throw new Error('Invalid table name');
        }

        // Prisma의 $queryRawUnsafe를 사용하여 동적 테이블 쿼리 실행
        //const data = await prisma.$queryRawUnsafe(`SELECT * FROM ${tableName} a LIMIT 100`);
        const tabledata = await prisma.$queryRawUnsafe<any[]>(
            `SELECT a.* FROM ${tableName} a LIMIT 100`
        );
        
        // 테이블 데이터 가공
        const processedData = tabledata.map(row => {
            // 1. password 칼럼 제외
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...rest } = row;

            // 2. email 마스킹
            if (rest.email && typeof rest.email === 'string') {
                const parts = rest.email.split('@');
                if (parts.length === 2) {
                    const [user, domain] = parts;
                    const maskedUser = user.length > 4
                        ? user.substring(0, 2) + '***' + user.substring(user.length - 2)
                        : user.charAt(0) + '**' + user.charAt(user.length - 1);
                    rest.email = `${maskedUser}@${domain}`;
                }
            }
            Object.keys(rest).forEach(key => {
                const val = (rest as any)[key];
                if (val instanceof Date) {
                    (rest as any)[key] = dayjs(val).format('YYYY-MM-DD HH:mm:ss'); //Date 타입 포맷팅
                }
            });
            return rest;
        });

        return processedData;
    }
    catch (error) {
        console.error(`[DAL#getTableData] error for table ${tableName}:`, error);
        return [];
    }
}
