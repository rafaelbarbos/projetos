'use client';

import { CheckCircle, Share2, Heart, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import type { ShippingAgent } from '@/types/feed';

interface SupplierHeaderProps {
  agent: ShippingAgent;
}

export function SupplierHeader({ agent }: SupplierHeaderProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (typeof window === 'undefined' || !navigator?.clipboard) {
      return;
    }

    const url = `${window.location.origin}/suppliers/${agent.id}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-8 mb-8">
      {/* Header Grid */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
        {/* Info Left */}
        <div className="flex items-center gap-6">
          <div className="text-7xl">{agent.avatar}</div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {agent.name}
              </h1>
              {agent.verified && (
                <CheckCircle className="w-8 h-8 text-green-500" />
              )}
            </div>
            <p className="text-neutral-400 mb-2">Agente de Envio</p>
            <p className="text-sm text-neutral-500">
              Ativo na plataforma desde Jan 2025
            </p>
          </div>
        </div>

        {/* Botões Right */}
        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-all ${
              isFavorited
                ? 'bg-red-500/10 text-red-400 border-red-500/30'
                : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-white'
            }`}
          >
            <Heart className="w-5 h-5" fill={isFavorited ? 'currentColor' : 'none'} />
            <span className="text-sm font-medium hidden sm:inline">
              {isFavorited ? 'Favorito' : 'Favoritar'}
            </span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg text-neutral-400 hover:text-white transition-all"
          >
            <Share2 className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:inline">
              {copied ? 'Copiado' : 'Compartilhar'}
            </span>
          </button>

          <a
            href={`https://www.pandabuy.com`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-white font-medium transition-all"
          >
            <ExternalLink className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:inline">Visitar</span>
          </a>
        </div>
      </div>

      {/* Info Row */}
      <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-neutral-800 text-sm">
        <div>
          <p className="text-neutral-500">Status</p>
          <p className="text-white font-semibold">🟢 Ativo agora</p>
        </div>
        <div>
          <p className="text-neutral-500">Tempo de resposta</p>
          <p className="text-white font-semibold">&lt; 1 hora</p>
        </div>
        <div>
          <p className="text-neutral-500">Localização</p>
          <p className="text-white font-semibold">China • Hong Kong</p>
        </div>
        <div>
          <p className="text-neutral-500">Início de atividade</p>
          <p className="text-white font-semibold">2023</p>
        </div>
      </div>
    </div>
  );
}
