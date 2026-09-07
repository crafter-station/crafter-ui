import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import type { CSSProperties } from "react";
import { ThemeWorkbench } from "@/components/theme-workbench";
import { defaultConfig, themeVariables } from "@/lib/library-config";
import initialTheme from "@/theme.json";
import "./globals.css";

const geistMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ui.crafter.run"),
  title: "Crafter UI | Good defaults. Your fingerprints.",
  description:
    "Shape your own component library. Preview, personalize, and export shadcn components with your defaults.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} h-full antialiased`}
      style={
        Object.fromEntries(
          Object.entries(
            themeVariables({
              ...defaultConfig,
              theme: initialTheme as import("@/lib/theme-schema").ThemeDocument,
            }),
          ).map(([key, value]) => [`--${key}`, value]),
        ) as CSSProperties
      }
    >
      <body className="min-h-full flex flex-col">
        <ThemeWorkbench>{children}</ThemeWorkbench>
      </body>
    </html>
  );
}
