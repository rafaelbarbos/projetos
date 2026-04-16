'use client';

import { Grid3X3, Bookmark } from "lucide-react";
import type { ReactNode } from "react";

export type ActiveTab = 'posts' | 'saved';

interface ProfileTabsProps {
    activeTab: ActiveTab;
    onTabChange: (tab: ActiveTab) => void;
    canSeeSaved: boolean;
}

const tabs: Array<{ id: ActiveTab; label: string; icon: ReactNode }> = [
    {id: 'posts', label: 'Posts', icon: <Grid3X3 className="w-5 h-5"/>},
    {id: 'saved', label: 'Salvos', icon: <Bookmark className="w-5 h-5"/>},
];

export function ProfileTabs({ activeTab, onTabChange, canSeeSaved }: ProfileTabsProps) {
    const visibleTabs = canSeeSaved ? tabs : tabs.filter((tab) => tab.id !== 'saved');

    return (
        <div className="flex gap-2 mb-8 border-b border-neutral-800">
            {visibleTabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
                        activeTab === tab.id
                            ? 'text-white border-b-2 border-purple-500'
                            : 'text-neutral-400 hover:text-white'
                    }`}
                >
                    {tab.icon}
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
    