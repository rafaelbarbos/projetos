'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Store, Calculator, User } from "lucide-react";

const items = [
    { icon: Home,       path: '/feed',       label: 'Feed'        },
    { icon: Compass,    path: '/explore',    label: 'Explorar'    },
    { icon: Store,      path: '/suppliers',  label: 'Fornecedores'},
    { icon: Calculator, path: '/calculator', label: 'Calculadora' },
    { icon: User,       path: '/profile',    label: 'Perfil'      },
];

export function BottomNav() { 
    const pathname = usePathname();

    return (
        // Barra de navegação inferior visível apenas em telas pequenas
        <nav className="fixed bottom-0 left-0 right-0 bg-neutral-950 border-t border-neutral-800 px-4 py-2
      flex md:hidden z-50">  {/* ← flex no mobile, some a partir de md */}
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.path;
        return (
          <Link
            key={item.path}
            href={item.path}
            className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl transition-colors ${
              isActive ? 'text-purple-400' : 'text-neutral-500'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs">{item.label}</span>
          </Link>
        );
      })}
    </nav>
    );
}