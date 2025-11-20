import type { Metadata } from "next";
import localFont from "next/font/local";
import { cn } from "@/lib/utils/cn";

import "./globals.css";
import { Provider } from "./provider";

export const metadata: Metadata = {
  title: "Sportsin",
};

const pretendard = localFont({
  src: "./lib/styles/fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
  weight: "45 920",
});

export default function RootLayout({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <html lang="ko" className={cn(pretendard.variable, "dark")}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
