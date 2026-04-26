import Link from 'next/link';
import { ArrowLeft, Mail, ShieldCheck } from 'lucide-react';
import { MobileLogo } from '@/components/shared/MobileLogo';

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-black bg-gradient-to-br from-neutral-950 via-purple-950/20 to-neutral-950 flex items-center justify-center p-6">
      <section className="w-full max-w-lg">
        <div className="mb-8 flex justify-center md:justify-start">
          <MobileLogo />
        </div>

        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 backdrop-blur-xl p-8 shadow-2xl shadow-black/30">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
            <ShieldCheck className="h-4 w-4" />
            Recuperação de conta
          </div>

          <h1 className="text-3xl font-black text-white sm:text-4xl">Esqueceu a senha?</h1>
          <p className="mt-3 text-sm leading-6 text-neutral-400">
            Informe seu email para receber um link de redefinição assim que o backend estiver conectado.
          </p>

          <form className="mt-8 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-300">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" />
                <input
                  type="email"
                  placeholder="Digite seu email"
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-12 py-3 text-white placeholder:text-neutral-600 focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 py-3 text-lg font-semibold text-white transition-all hover:from-purple-700 hover:to-pink-700"
            >
              Enviar link de recuperação
            </button>
          </form>

          <div className="mt-6 border-t border-neutral-800 pt-6">
            <Link
              href="/auth"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-400 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para login
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}