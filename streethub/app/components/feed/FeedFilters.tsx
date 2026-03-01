'use client';

import { useState } from "react";
 
const filters = [
    'Todos',
    'Seguindo',
    'Hoodies',
    'Tênis',
    'Jaquetas',
    'Cargos',
    'Acessórios',
];

export function FeedFilters() {
    const [active, setActive] = useState('Todos');

    return(
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {filters.map((filter) => (
                <button
                    key={filter}
                    onClick={() => setActive(filter)}
                    className={`px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                        active === filter
                        ? 'bg-neutral-800 text-white'
                        : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white'
                        }`}
                        >
                            {filter}
                </button>
            ))}
        </div>
    );
}