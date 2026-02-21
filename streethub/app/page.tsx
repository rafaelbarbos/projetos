
import Link from 'next/link';
import { TrendingUp, Users, Calculator, Crown, ArrowRight } from 'lucide-react';

export default function Onboarding() {
  return (
    <div className="min-h-screen bg-black bg-gradient-to-br from-neutral-950 via-purple-950/30 to-black flex items-center justify-center p-6">

      <div className="max-w-6xl w-full">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl mb-6">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-6xl font-black text-white mb-4">
            Bem-vindo ao <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">StreetHub</span>
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            A comunidade definitiva para amantes de streetwear importado. Descubra, compartilhe e importe as melhores peças da China.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Comunidade Ativa</h3>
            <p className="text-sm text-neutral-400">Conecte-se com milhares de importadores e entusiastas de streetwear</p>
          </div>

          <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-2xl p-6 hover:border-pink-500/50 transition-all">
            <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Posts de Peças</h3>
            <p className="text-sm text-neutral-400">Compartilhe suas descobertas e veja o que está em alta na comunidade</p>
          </div>

          <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-2xl p-6 hover:border-green-500/50 transition-all">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4">
              <Calculator className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Calculadora Smart</h3>
            <p className="text-sm text-neutral-400">Calcule o valor final com taxas, frete e conversão automática ¥ → R$</p>
          </div>

          <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-2xl p-6 hover:border-yellow-500/50 transition-all">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-4">
              <Crown className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Fornecedores Verificados</h3>
            <p className="text-sm text-neutral-400">Avaliações reais e sistema de reputação confiável</p>
          </div>
        </div>

        <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-4">Como funciona?</h2>
              <ul className="space-y-3 text-neutral-300">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <span>Crie seu perfil e siga outros importadores</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <span>Poste peças que você encontrou ou importou</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <span>Avalie fornecedores e ajude a comunidade</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <span>Use a calculadora para saber o valor final das peças</span>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-auto">
              <img 
                src="https://images.unsplash.com/photo-1721111260570-456f3306f8d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
                alt="Streetwear"
                className="w-full md:w-80 h-80 object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/auth"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-white font-semibold text-lg flex items-center justify-center gap-3 transition-all shadow-lg shadow-purple-500/30"
          >
            Começar Agora
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="/feed"
            className="w-full sm:w-auto px-8 py-4 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-white font-semibold text-lg transition-all"
          >
            Explorar Feed
          </Link>
        </div>

        <p className="text-center text-neutral-500 text-sm mt-8">
          Junte-se a mais de <span className="text-purple-400 font-semibold">50.000+</span> importadores ativos
        </p>
      </div>
    </div>
    
  );
}