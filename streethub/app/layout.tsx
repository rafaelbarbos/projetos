import type { Metadata } from "next";
import { AuthProvider } from "@/components/auth/AuthProvider";
import "./globals.css";



export const metadata: Metadata = {
  title: 'Street Hub - Streetwear Importado',
  description: 'A comunidade definitiva para amantes de streetwear e importações da Ásia.',
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
