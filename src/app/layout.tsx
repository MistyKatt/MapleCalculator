import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MapleCalculator",
  description: "Compare MapleStory character stats and damage changes.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
