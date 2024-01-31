import type { Metadata } from "next";
import { Cabin } from "next/font/google";
import "@/app/ui/globals.css";
import ThemeController from "./ui/ThemeController";
// import { ThemeProvider } from "./ui/theme-context";
// import ClientThemeWrapper from "./ui/client-themeWrapper";

const cabin = Cabin({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Teachmate",
    default: "Teachmate",
  },
  description: "Task Mangement application.",
  metadataBase: new URL("https://localhost:3000"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang='en'>
        <body className={` ${cabin.className}`}>
          {children}
          <div className='fixed bottom-4 right-10'>
            <ThemeController />
          </div>
        </body>
      </html>
    </>
  );
}
