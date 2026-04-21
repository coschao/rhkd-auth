// import style from "styled-jsx/style"
import SignInButton from "./components/SignInButton"

export default function HomePage() {
    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            <h1 className='text-4xl font-semibold'>NextAuth</h1>
            <SignInButton />
        </main>
    );
}
/*
    <main style={{ padding: '50px', textAlign: 'center' }}>
            <h1>Hello, Next.js!</h1>
            <p>가장 간단한 예제입니다.</p>
        </main>
*/