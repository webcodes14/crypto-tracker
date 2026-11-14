import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: {
    default: "Crypto Tracker | Přehled kryptoměn",
    template: "%s | Crypto Tracker",
  },
  description:
    "Přehled cen, tržních změn a sedmidenního vývoje největších kryptoměn.",
  keywords: ["kryptoměny", "bitcoin", "ethereum", "ceny kryptoměn", "crypto tracker"],
  openGraph: {
    title: "Crypto Tracker",
    description: "Přehled cen a vývoje kryptoměn.",
    locale: "cs_CZ",
    type: "website",
  },
};

const RootLayout = ({ children, }: Readonly<{children: React.ReactNode;}>) => {
  return (
    <html lang="cs">
      <body>
        <div className="mx-auto min-h-screen max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <Header />
          <main>{children}</main>
          <footer className="mt-16 border-t border-slate-200 py-6 text-center text-sm text-slate-500">
            Tržní data poskytuje CoinGecko. Data se obnovují přibližně každých 60 sekund.
          </footer>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;