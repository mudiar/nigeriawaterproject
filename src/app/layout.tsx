import type { Metadata } from "next";
import { Figtree, Syne } from "next/font/google";
import { Footer, Header } from "@/components/layout/SiteChrome";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nigeriawaterproject.org"),
  title: {
    default: "Nigeria Water Project",
    template: "%s · Nigeria Water Project",
  },
  description:
    "Bringing clean, sustainable water access to communities in Nigeria through borehole construction, community partnerships, and transparent impact.",
  icons: {
    icon: "/assets/images/nwp-logo.png",
    apple: "/assets/images/nwp-logo.png",
  },
  openGraph: {
    title: "Nigeria Water Project",
    description:
      "Clean water. Community-led boreholes. Measurable impact across Edo State, Nigeria.",
    type: "website",
    images: ["/assets/images/b3bfc899-0e7f-4479-a27b-92cbf9d4937d.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} ${syne.variable}`}>
        <a className="skip-link" href="#main">
          Skip to Content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
