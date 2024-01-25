import type { Metadata } from "next";
import { Cabin } from "next/font/google";
import "@/app/ui/globals.css";

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
    <html lang='en'>
      <body className={cabin.className}>{children}</body>
    </html>
  );
}
