'use client';

import { Grid3X3, Bookmark } from "lucide-react";

export type ActiveTab = 'posts' | 'saved';

interface ProfileTabsProps {
    activeTab: ActiveTab;
    onTabChange: (tab: ActiveTab) => void;
}

const tabs = [
    {id: 'posts', label: 'Posts', icon: <Grid3X3 className="w-5 h-5"/>},
    {id: 'saved', label: 'Salvos', icon: <Bookmark className="w-5 h-5"/>},
];

export function ProfileTabs({ activeTab, onTabChange }: ProfileContentProps) {
    return (
        <div className="flex gap-2 mb-8 border-b border-neutral-800">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
                        activeTab === tab.id
                            ? 'text-white border-b2 border-purple-500'
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
    