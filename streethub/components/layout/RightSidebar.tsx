"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CheckCircle, UserCheck, UserPlus, X } from "lucide-react";
import { currentUser, mockUsers, mockSuppliers } from "@/data/mockData";
import { Avatar } from "@/components/shared/Avatar";
import type { User } from "@/types/feed";
import { useMockFollowing } from "@/hooks/useMockFollowing";

// ⚠️  Todos os dados aqui são mock — substituir por:
//   mockUsers          → GET /api/users/suggestions
//   mockSuppliers      → GET /api/suppliers/featured
//   trendingCategories → GET /api/categories/trending

export function Rightsidebar() {
  const initialSuggestions = useMemo(() => mockUsers.filter((user) => user.id !== currentUser.id).slice(0, 6), []);
  const [suggestions, setSuggestions] = useState(initialSuggestions);

  const dismissSuggestion = (userId: string) => {
    setSuggestions((prev) => prev.filter((user) => user.id !== userId));
  };

    return(
    <aside className="fixed right-0 top-0 h-screen w-80 bg-neutral-950 border-l border-neutral-800 overflow-y-auto p-6 hidden lg:block">
            {/* Sugestões de usuários */}
            {/* ⚠️  Mock — substituir por dados reais */}
            <div className="mb-8">
                <h3 className="text-white font-semibold mb-4">
                    Sugestões para você 
                </h3>
        <div className="space-y-2">
          {suggestions.slice(0, 3).map((user) => (
            <SuggestionRow key={user.id} user={user} onDismiss={dismissSuggestion} />
          ))}
                </div>

        {suggestions.length === 0 ? (
          <p className="text-sm text-neutral-500 mt-3">Sem mais sugestões no momento.</p>
        ) : (
          <Link
            href="/explore"
            className="text-xs text-neutral-500 hover:text-neutral-400 mt-4 block"
          >
            Ver mais sugestões →
          </Link>
        )}
            </div>

            {/* Fornecedores verificados */}
            {/* ⚠️  Mock — substituir por dados reais */}
            <div className="mb-8">
                <h3 className="text-white font-semibold mb-4">Fornecedores Verificados</h3>
                <div className="space-y-3">
                    {mockSuppliers.filter((s) => s.verified).slice(0, 3).map((supplier) => (
                        <Link
                            key={supplier.id}
                        href={`/suppliers/${supplier.id}`}
                            className="block p-3 bg-neutral-900 rounded-xl border border-neutral-800 hover:bg-neutral-800 hover:border-neutral-700 transition-all"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl">{supplier.avatar}</span>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1">
                                        <p className="font-medium text-white text-sm truncate">{supplier.name}</p>
                                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                                    </div>
                                    <p className="text-xs text-neutral-500">{supplier.totalOrders.toLocaleString()} pedidos</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-yellow-500">★ {supplier.rating}</span>
                                <span className="text-green-400">{supplier.responseTime}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

      {/* Tendências (COMENTADO PARA VALIDAÇÃO DO MVP. FUNCIONALIDADE FUTURA)*/}
      {/* ⚠️  Mock — substituir por dados reais */}
      {/*


      <div>
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Tendências da Semana
        </h3>
        <div className="space-y-3">
          {trendingCategories.map((category) => (
            <div
              key={category.name}
              className="p-3 bg-neutral-900 rounded-xl hover:bg-neutral-800 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-white font-medium text-sm">#{category.name}</span>
                <span className={`text-xs font-medium ${
                  category.growth.startsWith('+') ? 'text-green-400' : 'text-red-400'
                }`}>
                  {category.growth}
                </span>
              </div>
              <p className="text-xs text-neutral-500">{category.count} posts</p>
              <div className="w-full bg-neutral-800 h-1 rounded-full mt-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full"
                  style={{ width: `${Math.min((category.count / 3000) * 100, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>


      */}
      
        </aside>
    );
}

interface SuggestionRowProps {
  user: User;
  onDismiss: (userId: string) => void;
}

function SuggestionRow({ user, onDismiss }: SuggestionRowProps) {
  const { isFollowing, toggleFollowing } = useMockFollowing(user.id);

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors">
      <Link href={`/${user.username}`} className="shrink-0">
        <Avatar src={user.avatar} name={user.displayName} size="md" />
      </Link>

      <div className="flex-1 min-w-0">
        <Link href={`/${user.username}`} className="flex items-center gap-1 hover:opacity-80">
          <p className="font-medium text-white text-sm truncate">{user.displayName}</p>
          {user.verified && <CheckCircle className="w-4 h-4 text-blue-500 shrink-0" />}
        </Link>
        <p className="text-xs text-neutral-500 truncate">@{user.username}</p>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <button
          type="button"
          onClick={toggleFollowing}
          className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            isFollowing
              ? 'bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20'
              : 'bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20'
          }`}
          aria-label={isFollowing ? `Deixar de seguir ${user.displayName}` : `Seguir ${user.displayName}`}
        >
          {isFollowing ? <UserCheck className="w-3.5 h-3.5" /> : <UserPlus className="w-3.5 h-3.5" />}
          {isFollowing ? 'Seguindo' : 'Seguir'}
        </button>

        <button
          type="button"
          onClick={() => onDismiss(user.id)}
          className="p-1.5 rounded-lg text-neutral-500 hover:text-white hover:bg-neutral-800 transition-colors"
          aria-label={`Remover sugestão de ${user.displayName}`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}