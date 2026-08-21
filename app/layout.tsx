import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "販売価格逆算ツール｜目標利益から必要な売値を無料計算",

  description:
    "目標利益・仕入れ値・送料・販売手数料率から、必要な販売価格を無料で逆算。メルカリなどのフリマ販売や物販で、利益を確保するための売値・出品価格を簡単に計算できます。",

  keywords: [
    "販売価格 逆算",
    "販売価格 計算",
    "売値 計算",
    "目標利益",
    "利益 逆算",
    "メルカリ 販売価格",
    "メルカリ 利益計算",
  ],

  verification: {
    google: "miCxwdbgRhGe66W37cjiBB0MFNO1tB2WJxh9Dm_zTjc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
  <script
    async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7726060769550218"
    crossOrigin="anonymous"
  ></script>
</head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
