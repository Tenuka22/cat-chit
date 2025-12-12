import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "@/components/providers/ConvexClientProvider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const sans = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Cat-Chit | A Dating site for Cat persons",
  description: "__ Development __",
  icons: {
    icon: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${sans.className} min-w-screen min-h-screen flex flex-col antialiased relative size-full`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          themes={["dark", "light"]}
          enableSystem
          disableTransitionOnChange
        >
          <NuqsAdapter>
            <div className="isolate size-full flex flex-1 flex-col">
              <ConvexClientProvider>{children}</ConvexClientProvider>
            </div>
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  );
}
