import { Inter } from "next/font/google";
import "./globals.css";
import Menu from "@/components/app/Menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gazin-Tech",
  description: "Gazin-Tech teste de fullstack",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className}`}>
        <main className="w-full h-screen flex">
          <Menu />
          <div className="w-full pt-3 px-4">{children}</div>
        </main>
      </body>
    </html>
  );
}
