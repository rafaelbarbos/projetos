'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, User, Store, Calculator, Crown, Settings, TrendingUp } from "lucide-react";
import { Logo } from '@/components/shared/Logo';
import path from "path";
import { User as CurrentUser } from "@/types/feed";
import { currentUser, mockUsers } from "@/data/mockData";
import { Avatar } from "../shared/Avatar";

const menuItems = [
    { icon: Home, label: 'Feed', path: '/feed' },
    { icon: Compass, label: 'Explorar', path: '/explore' },
    { icon: Store, label: 'Fornecedores', path: '/suppliers' },
    { icon: Calculator, label: 'Calculadora', path: '/calculator' },
    { icon: Crown, label: 'Premium', path: '/premium' },
    { icon: User, label: 'Perfil', path: `/${currentUser.username}` },
    { icon: Settings, label: 'Configurações', path: '/settings' },
];

export function Sidebar() {
    const pathname = usePathname();

    return(
        <aside className="fixed left-0 top-0 h-screen w-64 bg-neutral-950 border-r border-neutral-850 flex flex-col p-6 hidden md:flex">

            {/*LOGO*/}
            <Link href="/feed" className="mb-10">
                <Logo/>
            </Link>

            {/* Navegação */}
            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.path;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                                isActive
                                ? 'bg-neutral-800 text-white'
                                : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                            }`}
                            >
                            <Icon className="w-6 h-6" />
                            <span className="font-medium">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            {/* Usuário logado */}
            {/* ⚠️  Dados mock — substituir por dados reais do contexto de auth */}
            <div className="pt-6 border-t border-neutral-800">
                <Link
                    href={`/${currentUser.username}`}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-900 transition-all"
                    >
                        <Avatar 
                            src={currentUser.avatar} 
                            name={currentUser.displayName} 
                            size="md"
                            /> 
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-white text-sm truncate">
                                    @{currentUser.username}
                                </p>
                                <p className="text-xs text-neutral-500">
                                    Ver perfil
                                </p>
                            </div>
                </Link>
            </div>
        </aside>
    );
}