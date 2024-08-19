import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ShowComponent from "@/components/ShowComponent/ShowComponent";
import { AuthProvider } from "@/context/AuthContext";

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
      <body className={`${inter.className} flex h-screen flex-col items-center justify-between w-full`}>
        <AuthProvider>
          <ShowComponent>
            <Navbar />
          </ShowComponent>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
