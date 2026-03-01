import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloating } from "@/components/layout/WhatsAppFloating";
import { Analytics } from "@vercel/analytics/react";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const viewport: Viewport = {
  themeColor: "#003594",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sigma-ai-agency.vercel.app"),
  title: "Agencia Sigma IA: Automatización Inteligente para Negocios | Sigma IA Agency",
  description:
    "Sistemas web y automatización para sectores de alto valor. Landings de alta conversión, plataformas corporativas y dashboards a medida. Real Estate, concesionarias, B2B.",
  keywords: [
    "automatización",
    "landing pages",
    "plataformas web",
    "dashboards",
    "Real Estate",
    "concesionarias",
    "Sigma IA Agency",
  ],
  authors: [{ name: "Sigma AI Agency" }],
  openGraph: {
    title: "Agencia Sigma IA: Sistemas Web y Automatización para Sectores de Alto Valor",
    description:
      "Landings, plataformas corporativas y sistemas a medida. Agendar consultoría gratuita.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Sigma AI Agency - Automatización con IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sigma AI Agency | Automatización con IA",
    description: "Agencia de automatización inteligente para negocios en México.",
  },
  robots: "index, follow",
  icons: {
    icon: "/logo-azul.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={montserrat.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-[#FFFFFF] font-sans text-[#003594] antialiased" suppressHydrationWarning>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppFloating />
        <Analytics />
      </body>
    </html>
  );
}
