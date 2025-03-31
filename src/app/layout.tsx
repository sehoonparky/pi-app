import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const mulish = localFont({
  src: [
    {
      path: "./fonts/Mulish-Black-3.woff",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-mulish",
});

export const metadata: Metadata = {
  title: "Pi Blockchain, Community & Developer Platform | Pi Network",
  description: "Cryptocurrency App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${mulish.className} font-mulish antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
