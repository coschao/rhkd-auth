'use client'

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { cn } from "@/lib/utils"
import { updateLogoutLog } from "@/lib/actions/server-auth";

function SignInButton() {
    const { data: session } = useSession();
    const isSignedIn = !!session?.user;
    const buttonClass = cn(`px-9 py-1 border rounded-xl bg-${isSignedIn ? "green" : "gray"}-200`);
    const buttonText = isSignedIn ? `${session?.user?.name}님!` : "LogIn";

    const handleButtonClick = async () => {
        if (isSignedIn) {
            // 1. DB 로그 업데이트 (서버 액션)
            await updateLogoutLog();
            
            // 2. 클라이언트 세션 종료 및 홈 리다이렉트
            await signOut({ callbackUrl: "/" });
        } else {
            await signIn();
        }
    };

    return (
        <button className={buttonClass} 
                onClick={handleButtonClick}
                title={isSignedIn ? "로그아웃" : "로그인"}>
            {buttonText}
        </button>
    );
}

export default SignInButton