import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";
import { AppProviders } from "./appProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "dtiFlix",
  description: `Full stack application built with Next.js + TypeScript and Sequelize, 
    integrating the OMDb API to search movies, manage favorites, write reviews, 
    and display personalized statistics in a dashboard. Includes search history,
     average ratings, favorite genres/decades, and a responsive UI.`,
  abstract: `Full stack application built with Next.js + TypeScript and Sequelize, 
    integrating the OMDb API to search movies, manage favorites, write reviews, 
    and display personalized statistics in a dashboard. Includes search history,
     average ratings, favorite genres/decades, and a responsive UI.`,
  authors: [
    {
      name: "Davi Candinato de Almeida",
      url: "https://github.com/DaviKandido",
    },
  ],
  applicationName: "dtiFlix",
  category: "technology",
  creator: "Davi Candinato de Almeida",
  keywords: [
    "dti",
    "backend",
    "express",
    "next",
    "typescript",
    "sequelize",
    "omdb",
    "movie",
    "search",
    "favorite",
    "review",
    "dashboard",
    "statistics",
    "responsive",
  ],
  openGraph: {
    title: "dtiFlix",
    description: `Full stack application built with Next.js + TypeScript and Sequelize, 
    integrating the OMDb API to search movies, manage favorites, write reviews, 
    and display personalized statistics in a dashboard. Includes search history,
     average ratings, favorite genres/decades, and a responsive UI.`,
    images: [
      {
        url: "https://dtiflix.vercel.app/og.png",
        width: 800,
        height: 600,
      },
    ],
    type: "website",
    locale: "pt-BR",
    siteName: "dtiFlix",
    url: "https://dtiflix.vercel.app",
    emails: [
      "davicandidopucminas@gmail.com",
      "davi.alumni@gmail.com",
      "davi.candido.almeida11@gmail.com",
    ],
    phoneNumbers: ["+55 (31) 973067259"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        cz-shortcut-listen="true"
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
