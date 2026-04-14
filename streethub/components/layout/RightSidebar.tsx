import Link from "next/link";
import { CheckCircle, Divide, TrendingUp } from "lucide-react";
import { mockUsers, mockSuppliers, trendingCategories } from "@/data/mockData";

// ⚠️  Todos os dados aqui são mock — substituir por:
//   mockUsers          → GET /api/users/suggestions
//   mockSuppliers      → GET /api/suppliers/featured
//   trendingCategories → GET /api/categories/trending

export function Rightsidebar() {
    return(
        <aside className="fixed right-0 top-0 h-screen w-80 bg-neutral-950 border-l border-neutral overflow-y-auto p-6 hidden lg:block">
            {/* Sugestões de usuários */}
            {/* ⚠️  Mock — substituir por dados reais */}
            <div className="mb-8">
                <h3 className="text-white font-semibold mb-4">
                    Sugestões para você 
                </h3>
                <div className="space-y-4">
                    {mockUsers.slice(1, 4).map((user) => (
                        <div key={user.id} className="flex items-center justify-between">
                            <img 
                                src={user.avatar} alt={user.displayName} className="w-10 h-10 rounded-full object-cover" 
                            />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1">
                                    <p className="font-medium text-white text-sm">
                                        {user.displayName}
                                    </p>
                                    {user.verified && <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />}
                                </div>
                                <p className="text-xs text-neutral-500">
                                    @{user.username}
                                </p>
                            </div>
                            <button className="text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors flex-shrink-0">
                                Seguir
                            </button>
                        </div>
                    ))}
                </div>
                <Link
                    href="explore"
                    className="text-xs text-neutral-500 hover:text-neutral-400 mt-4 block">
                        Ver mais sugestões →
                </Link>
            </div>

            {/* Fornecedores verificados */}
            {/* ⚠️  Mock — substituir por dados reais */}
            <div className="mb-8">
        <h3 className="text-white font-semibold mb-4">Fornecedores Verificados</h3>
        <div className="space-y-3">
          {mockSuppliers.filter((s) => s.verified).slice(0, 3).map((supplier) => (
            <Link
              key={supplier.id}
              href={`/supplier/${supplier.id}`}
              className="block p-3 bg-neutral-900 rounded-xl hover:bg-neutral-800 transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{supplier.avatar}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="font-medium text-white text-sm truncate">{supplier.name}</p>
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-neutral-500">{supplier.totalOrders.toLocaleString()} pedidos</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-yellow-500">★ {supplier.ratting}</span>
                <span className="text-green-400">{supplier.responseTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Tendências */}
      {/* ⚠️  Mock — substituir por dados reais */}
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
        </aside>
    );
}