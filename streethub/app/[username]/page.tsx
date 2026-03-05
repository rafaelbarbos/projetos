'use client';

import { use, useState } from "react";
import { notFound } from "next/navigation";
import { Sidebar } from "../components/feed/Sidebar";
import { Rightsidebar } from "../components/feed/Rightsidebar";
import { BottomNav } from "../components/shared/BottomNav";
import { ProfileHeader } from "../components/profile/Profileheader";
import { ProfileTabs } from "../components/profile/Profiletabs";
import { ProfileContent } from "../components/profile/Profilecontent";
import type { ActiveTab } from "../components/profile/Profiletabs";
import { mockUsers, mockPosts } from "@/data/mockData";


//   mockUsers e mockPosts → substituir por:
//   GET /api/users/:username
//   GET /api/users/:username/posts

export default function UserProfilePage({ 
    params, 
}: { 
    params: Promise<{ username: string }>; 
}) {
    const { username } = use(params);
    const [activeTab, setActiveTab] = useState<ActiveTab>("posts");

// Busca o usuário pelo username da URL
// Mock — substituir por fetch(`/api/users/${params.username}`)

    const user = mockUsers.find((u) => u.username === username);
    console.log('total de usuários carregados:', mockUsers.length);

    if (!user) {
        notFound();
    }
// Filtra os posts desse usuário
// ⚠️  Mock — substituir por fetch(`/api/users/${params.username}/posts`)
    const userPosts = mockPosts.filter((p) => p.user.username === username);

    return (
        <div className="min-h-screen bg-neutral-950">
            <Sidebar />
            <Rightsidebar />
            <BottomNav />

            <main className="ml-0 md:ml-64 mr-0 lg:mr-80 min-h-screen pb-16 md:pb-0">
                <div className="max-w-4xl mx-auto p-4 md:p-8">
                    <ProfileHeader
                        user={user}
                        postsCount={userPosts.length}
                    />

                    <ProfileTabs
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />

                    <ProfileContent
                        activeTab={activeTab}
                        user={user}
                        userPosts={userPosts}
                    />
                </div>

            </main>
        </div>
    );

}