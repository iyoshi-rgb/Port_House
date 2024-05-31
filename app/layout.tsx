import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider, Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PortHouse",
  description:
    "せっかく作った作品見てもらいたくないですか？作品を作ったままにさせないアプリケーションです。ポートフォリオ集まれ！！",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <NextAuthProvider>
        <body>
          <Providers>{children}</Providers>
        </body>
      </NextAuthProvider>
    </html>
  );
}
