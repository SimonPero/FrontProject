import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-blue-500">
          <h1>trirtirt</h1>
          <Link href="/signIn"> Please Log In</Link>
        </header>

        {children}

        <footer className="bg-red-500">
          <h1>trirtirt</h1>
          <div>talalalala</div>
        </footer>
      </body>
    </html>
  );
}
