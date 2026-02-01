import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "Crypto Tracker | Živé ceny kryptoměn",
  description: "Moderní krypto tracker postavený na Next.js 15, TypeScriptu a Tailwind CSS. Využívá Server Components pro maximální výkon a Client Components pro interaktivní vyhledávání a filtrování.",
  keywords: ["kryptoměny", "bitcoin", "ethereum", "ceny kryptoměn", "crypto tracker"]
};

const RootLayout = ({ children, }: Readonly<{children: React.ReactNode;}>) => {
  return (
    <html lang="cs">
      <body className="p-4 md:max-w-screen-2xl mx-auto">
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}

export default RootLayout;