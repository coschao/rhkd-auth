import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Providers from "../components/Providers";
import SignInButton from "../components/SignInButton"
import Navbar from "../components/Navbar"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "RHKD App",
    description: "Main area layout",
};

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
            <body className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
                <Providers>
                    <Navbar />

                    {/* Main Content */}
                    <main className="flex-1">
                        {children}
                    </main>

                    {/* Footer */}
                    <footer className="border-t bg-white">
                        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                                <p className="text-sm text-gray-500">
                                    &copy; {new Date().getFullYear()} rhkd-auth. All rights reserved.
                                </p>
                                <div className="flex gap-6">
                                    <a href="#" className="text-gray-400 hover:text-gray-500">
                                        Privacy Policy
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-gray-500">
                                        Terms of Service
                                    </a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </Providers>
            </body>
        </html>
    );
}