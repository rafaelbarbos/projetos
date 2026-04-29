'use client';

import { Globe, Mail, MapPin, Clock, Shield, Zap, TrendingUp } from 'lucide-react';
import type { ShippingAgent } from '@/types/feed';

interface SupplierInfoProps {
  agent: ShippingAgent;
}

export function SupplierInfo({ agent }: SupplierInfoProps) {
  return (
    <div className="space-y-6">
      {/* Seção de sobre */}
      <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Sobre {agent.name}</h2>

        <p className="text-neutral-300 mb-6 leading-relaxed">
          {agent.name} é uma plataforma confiável de compra e envio de produtos
          da Ásia. Oferece serviços de consolidação de pacotes, armazenamento em
          warehouse e envio internacional com rastreamento completo.
        </p>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-purple-400 flex-shrink-0" />
            <div>
              <p className="text-sm text-neutral-500">Website</p>
              <a
                href="https://www.pandabuy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 font-medium"
              >
                www.pandabuy.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-green-400 flex-shrink-0" />
            <div>
              <p className="text-sm text-neutral-500">Localização</p>
              <p className="text-white font-medium">China, Hong Kong</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <div>
              <p className="text-sm text-neutral-500">Suporte</p>
              <p className="text-white font-medium">support@pandabuy.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Políticas e Operação */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Tempos */}
        <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-400" />
            Tempos de Operação
          </h3>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-neutral-500">Tempo de resposta</p>
              <p className="text-white font-semibold">&lt; 1 hora (24/7)</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">
                Processamento de pacote
              </p>
              <p className="text-white font-semibold">1-2 dias úteis</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Tempo de warehouse</p>
              <p className="text-white font-semibold">Até 30 dias</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Entrega estimada</p>
              <p className="text-white font-semibold">7-15 dias (Standard)</p>
            </div>
          </div>
        </div>

        {/* Segurança */}
        <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-400" />
            Segurança e Proteção
          </h3>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-neutral-500">Proteção do comprador</p>
              <p className="text-green-400 font-semibold">✓ Garantida</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Rastreamento</p>
              <p className="text-green-400 font-semibold">✓ Completo (Real-time)</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Reembolso</p>
              <p className="text-green-400 font-semibold">✓ 30 dias</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Cobertura de seguro</p>
              <p className="text-green-400 font-semibold">✓ Disponível</p>
            </div>
          </div>
        </div>
      </div>

      {/* Métodos de Envio */}
      <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-blue-400" />
          Métodos de Envio Disponíveis
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-neutral-950 rounded-lg border border-neutral-800 p-4">
            <p className="text-white font-semibold mb-2">Standard</p>
            <p className="text-sm text-neutral-400 mb-3">30-45 dias</p>
            <p className="text-green-400 font-semibold text-sm">Mais econômico</p>
          </div>

          <div className="bg-neutral-950 rounded-lg border border-neutral-800 p-4">
            <p className="text-white font-semibold mb-2">Express</p>
            <p className="text-sm text-neutral-400 mb-3">7-15 dias</p>
            <p className="text-blue-400 font-semibold text-sm">Recomendado</p>
          </div>

          <div className="bg-neutral-950 rounded-lg border border-neutral-800 p-4">
            <p className="text-white font-semibold mb-2">DHL/UPS</p>
            <p className="text-sm text-neutral-400 mb-3">3-7 dias</p>
            <p className="text-purple-400 font-semibold text-sm">Premium</p>
          </div>
        </div>
      </div>

      {/* Performance */}
      <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-400" />
          Performance
        </h3>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <p className="text-3xl font-bold text-purple-400">98%</p>
            <p className="text-sm text-neutral-400">Taxa de sucesso</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-green-400">4.9★</p>
            <p className="text-sm text-neutral-400">Avaliação média</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-yellow-400">34k</p>
            <p className="text-sm text-neutral-400">Pedidos processados</p>
          </div>
        </div>

        <div className="bg-neutral-950 rounded-lg p-4 border border-neutral-800">
          <p className="text-sm text-neutral-400 mb-2">Membro desde</p>
          <p className="text-white font-semibold">Março 2023 (3 anos de operação)</p>
        </div>
      </div>
    </div>
  );
}
