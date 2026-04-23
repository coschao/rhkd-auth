import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Providers from "../components/Providers";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="h-full bg-white">
        <Providers>
          <div className="flex flex-col min-h-full">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
