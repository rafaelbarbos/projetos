import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Street Hub - Streetwear Importado',
  description: 'A comunidade definitiva para amantes de streetwear e importações da Ásia.',
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
