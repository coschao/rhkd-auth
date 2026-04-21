'use client'

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

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

    if (session && session.user) {
        console.log("############# session: ", session);
        return (
            <button
              className="px-12 py-4 border rounded-xl bg-red-300"
              onClick={() => signOut()}
            >
              {session.user.name}님 Log Out
            </button>
        );
    }
    else {
        return (
            <button
              className="px-12 py-4 border rounded-xl bg-yellow-300"
              onClick={() => signIn()}
            >
              LogIn
            </button>
        );
    }
}

export default SignInButton