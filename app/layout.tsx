import "./globals.css";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { ExternalLinkIcon } from "lucide-react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Crafter UI",
  description: "A collection of beautifully designed components built with Tailwind CSS and React",
};

const geistSans = Geist({
  display: "swap",
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  display: "swap",
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <header className="w-full border-b">
              <div className="container flex h-14 items-center justify-between">
                <div className="flex items-center gap-6">
                  <Link href="/" className="flex gap-1 items-center">
                    <Logo />
                    <span className="font-bold">Crafter UI</span>
                  </Link>
                  {/* <nav className="hidden md:flex gap-6">
                    <Link href="/registry" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                      Registry
                    </Link>
                    <Link href="/docs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                      Docs
                    </Link>
                  </nav> */}
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    target="_blank"
                    href="https://github.com/crafter-station/crafter-ui" className="hover:underline transition-all underline-offset-2 decoration-dotted flex gap-1 items-center text-sm text-muted-foreground hover:text-foreground">
                    GitHub
                    <ExternalLinkIcon className="w-4 h-4" />
                  </Link>
                  <ThemeSwitcher />
                  {/* {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />} */}
                </div>
              </div>
            </header>
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
