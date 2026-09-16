import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "KQ Emporium", template: "%s | KQ Emporium" },
  description: "Industrial products, quotations, and business solutions.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
