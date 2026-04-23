// import style from "styled-jsx/style"

// export default function HomePage() {
//     return (
//         <main className='flex min-h-screen flex-col items-center justify-between p-24'>
//             <h1 className='text-4xl font-semibold'>NextAuth</h1>
//             <SignInButton />
//         </main>
//     );
// }
/*
    <main style={{ padding: '50px', textAlign: 'center' }}>
            <h1>Hello, Next.js!</h1>
            <p>간단 예제</p>
        </main>
*/

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const { k, m } = await searchParams;

    return (
        <div className="relative isolate overflow-hidden">
            {/* Hero section */}
            <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
                    <h3 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                        Secure Auth for Your Next.js App
                    </h3>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Experience a seamless and secure authentication system built with Next.js 15, 
                        NextAuth.js v5, Prisma, and Redis.
                    </p>
                    {k || m ? (
                        <div className="mt-4 p-4 bg-indigo-50 rounded-md text-indigo-700 text-sm">
                            Active filters: <span className="font-mono">k={k}, m={m}</span>
                        </div>
                    ) : null}
                    <div className="mt-10 flex items-center gap-x-6">
                        <a
                            href="#"
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
                        >
                            Get started
                        </a>
                        <a href="/about" className="text-sm font-semibold leading-6 text-gray-900">
                            Learn more <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>

                {/* Decorative element or secondary feature */}
                <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                    <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                        <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                            <div className="rounded-md shadow-2xl ring-1 ring-gray-900/10 bg-white p-8 min-w-[300px]">
                                <h2 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">Status</h2>
                                <p className="mt-2 text-2xl font-bold text-gray-900 italic font-mono">System Operational</p>
                                <div className="mt-4 space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                        <span>NextAuth v5 Beta</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                        <span>Redis Session Storage</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                        <span>Prisma + SQLite</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}