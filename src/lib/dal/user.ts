import { prisma } from '@/lib/prisma';

/**
 * 이메일을 기반으로 사용자 정보를 조회합니다. (인증용)
 * 비밀번호 필드를 포함하여 반환합니다.
 */
export async function getUserByEmail(email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        return user;
    }
    catch (error) {
        console.error('[DAL#getUserByEmail] error:', error);
        throw new Error('Failed to fetch user by email');
    }
}

/**
 * ID를 기반으로 사용자 정보를 조회합니다.
 */
export async function getUserById(id: number) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (user) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...userWithoutPass } = user;
            return userWithoutPass;
        }
        return null;
    }
    catch (error) {
        console.error('[DAL#getUserById] error:', error);
        throw new Error('Failed to fetch user by ID');
    }
}
