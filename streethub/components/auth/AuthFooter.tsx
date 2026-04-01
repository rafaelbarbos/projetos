import Link from 'next/link';

export function AuthFooter() {
  return (
    <p className="text-center text-neutral-500 text-xs mt-6">
      Ao continuar, você concorda com nossos{' '}
      <Link href="/terms" className="text-purple-400 hover:text-purple-300 transition-colors">
        Termos de Uso
      </Link>
      {' '}e{' '}
      <Link href="/privacy" className="text-purple-400 hover:text-purple-300 transition-colors">
        Política de Privacidade
      </Link>
    </p>
  );
}