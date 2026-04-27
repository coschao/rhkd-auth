import dayjs from 'dayjs';

/**
 * Oracle 데이터베이스 관련 데이터 액세스 로직
 */

export interface OracleUser {
    USERNAME: string;
    ACCOUNT_STATUS: string;
    CREATED: string;
    EXPIRY_DATE?: string;
    LAST_LOGIN?: string;
}

/**
 * REST API를 통해 Oracle 스키마(사용자) 목록을 가져옵니다.
 */
export async function getOracleUsers(): Promise<OracleUser[]> {
    const apiUrl = 'http://127.0.0.1:8000/api/sys/db/users';
    try {
        const response = await fetch(apiUrl, {
            cache: 'no-store', // 실시간 데이터를 위해 캐시 비활성화
            next: { revalidate: 0 }
        });

        if (!response.ok) {
            console.error(`[OracleDAO] API fetch failed: ${response.status} ${response.statusText}`);
            return [];
        }

        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('[OracleDAO] Error fetching Oracle users:', error);
        return [];
    }
}

/**
 * REST API를 통해 Oracle 스키마(사용자) 목록을 가져옵니다.
 */
export async function getOracleUserTables(owner: string): Promise<OracleUser[]> {
    const apiUrl = `http://127.0.0.1:8000/api/sys/db/${owner}/tables`;
    try {
        const response = await fetch(apiUrl, {
            cache: 'no-store', // 실시간 데이터를 위해 캐시 비활성화
            next: { revalidate: 0 }
        });

        if (!response.ok) {
            console.error(`[OracleDAO] API fetch failed: ${response.status} ${response.statusText}`);
            return [];
        }

        const data = await response.json();
        return Array.isArray(data) ? data : [];
    }
    catch (error) {
        console.error('[OracleDAO] Error fetching Oracle user tables:', error);
        return [];
    }
}


/**
 * 특정 테이블의 데이터를 조회
 */
export async function getTableData(owner: string, tableName: string): Promise<any[]> {
    const apiUrl = `http://127.0.0.1:8000/api/sys/db/${owner}/${tableName}/paged-data?page=1&pageSize=10`;

    try {
        // 테이블 이름 유효성 검사 (알파벳, 숫자, 언더바만 허용하여 SQL Injection 방지)
        if (!/^[a-zA-Z0-9_]+$/.test(tableName)) {
            throw new Error('Invalid table name');
        }

        const response = await fetch(apiUrl, {
            cache: 'no-store', // 실시간 데이터를 위해 캐시 비활성화
            next: { revalidate: 0 }
        });

        const data = await response.json();
        
        // 테이블 데이터 가공
        const processedData = data.map(row => {
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

