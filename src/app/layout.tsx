import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets:["latin"],
  weight:["400", "700"],
})

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
      <body className={roboto.className}>
        <Header />
        {children}

        <footer className="bg-red-500">
          <h1>trirtirt</h1>
          <div>talalalala</div>
        </footer>
      </body>
    </html>
  );
}
