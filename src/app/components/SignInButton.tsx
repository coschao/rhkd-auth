'use client'

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { cn } from "@/lib/utils"

// function SignInButton() {
//     return (
//         <div className='space-x-10'>
//             <button
//               className='rounded-xl border bg-yellow-300 px-12 py-4'
//               onClick={() => signIn()}
//             >
//               LogIn
//             </button>
//             <button
//               className='rounded-xl border bg-red-300 px-12 py-4'
//               onClick={() => signOut()}
//             >
//               Log Out
//             </button>
//         </div>
//     )
// }
function SignInButton() {
    const { data: session } = useSession();
    console.log("[SignInButton] session: ", session);
    const isSignedIn = !!session?.user;
    const buttonClass = cn(`px-9 py-1 border rounded-xl bg-${isSignedIn ? "green" : "gray"}-200`);
    const buttonText = isSignedIn ? `${session?.user?.name}님!` : "LogIn";
    return (
        <button className={buttonClass} 
                onClick={() => isSignedIn ? signOut() : signIn()}
                title={isSignedIn ? "로그아웃" : "로그인"}>
            {buttonText}
        </button>
    );
    // if (session && session.user) {
    //     return (
    //         <button
    //           className={cn("px-12 py-4 border rounded-xl bg-orange-100 px-12 py-4 border px-12 py-4 border")}
    //           onClick={() => signOut()}
    //           title="로그아웃"
    //         >
    //           {session.user.name}님 Log Out
    //         </button>
    //     );
    // }
    // else {
    //     return (
    //         <button
    //           className={cn("px-12 py-4 border rounded-xl bg-yellow-100")}
    //           onClick={() => signIn()}
    //         >
    //           LogIn
    //         </button>
    //     );
    // }
}

export default SignInButton