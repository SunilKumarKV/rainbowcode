import type { Metadata } from "next";
import type { ReactNode } from "react";
// import "./globals.css";

export const metadata: Metadata = {
  title: "RainbowCode",
  description:
    "A global design-to-code platform for brands, themes, components, canvas, and production-ready code.",
};

type RootLayoutProps = {
  readonly children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[999] focus:rounded-xl focus:bg-slate-950 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:bg-white dark:focus:text-slate-950"
        >
          Skip to main content
        </a>

        {children}
      </body>
    </html>
  );
}