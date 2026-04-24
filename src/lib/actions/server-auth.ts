'use server'

import { auth, signOut } from "@/app/auth";
import { prisma } from "@/lib/prisma";
import { getUserByEmail } from '@/lib/dal/user';
import * as bcrypt from 'bcrypt';

/**
 * NextAuth CredentialsProvider의 authorize 콜백에서 사용할 커스텀 함수
 */
export async function customAuthorize(credentials: Record<string, unknown>) {
    console.log('[customAuthorize] credentials:', credentials);

    if (!credentials?.email || !credentials?.password) {
        console.log('[customAuthorize] Missing email or password');
        return null;
    }

    try {
        const user = await getUserByEmail(credentials.email as string);

        if (!user || !user.password) {
            console.log('[customAuthorize] User not found or no password');
            return null;
        }

        const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            user.password
        );

        if (isPasswordValid) {
            const { password, ...userWithoutPass } = user;
            const userId = userWithoutPass.id;

            // [추가] 로그인 성공 시 로그 기록
            try {
                await prisma.userLoginLog.upsert({
                    where: { userId: userId },
                    update: {
                        lastSignedInAt: new Date(),
                        updatedAt: new Date(),
                    },
                    create: {
                        userId: userId,
                        lastSignedInAt: new Date(),
                    },
                });
                console.log(`[customAuthorize] User ${userId} login log updated.`);
            } catch (logError) {
                console.error("[customAuthorize] Failed to update login log:", logError);
            }

            // NextAuth 호환을 위해 id를 string으로 변환
            return {
                ...userWithoutPass,
                id: userId.toString(),
            };
        }

        console.log('[customAuthorize] Invalid password');
        return null;
    }
    catch (error) {
        console.error('[customAuthorize] error during authorize:', error);
        return null;
    }
}

/**
 * 커스텀 로그아웃 서버 액션 (로그 기록용)
 */
export async function updateLogoutLog() {
  const session = await auth();
  
  if (session?.user?.id) {
    const userId = parseInt(session.user.id);
    
    try {
      await prisma.userLoginLog.upsert({
        where: { userId: userId },
        update: {
          lastSignedOutAt: new Date(),
          updatedAt: new Date(),
        },
        create: {
          userId: userId,
          lastSignedOutAt: new Date(),
          lastSignedInAt: new Date(),
        },
      });
      console.log(`[updateLogoutLog] User ${userId} logout log updated.`);
      return { success: true };
    } catch (error) {
      console.error("[updateLogoutLog] Failed to update logout log:", error);
      return { success: false, error };
    }
  }
  return { success: false, message: "No session found" };
}
