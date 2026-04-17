'use client';

import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { Sidebar } from "../../components/layout/Sidebar";
import { Rightsidebar } from "../../components/layout/RightSidebar";
import { BottomNav } from "../../components/shared/BottomNav";
import { ProfileHeader } from "../../components/profile/ProfileHeader";
import { ProfileTabs } from "../../components/profile/ProfileTabs";
import { ProfileContent } from "../../components/profile/ProfileContent";
import { ProfileConnectionsModal } from "../../components/profile/ProfileConnectionsModal";
import type { ActiveTab } from "../../components/profile/ProfileTabs";
import { currentUser, mockUsers, mockPosts } from "@/data/mockData";


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
        const [connectionsModal, setConnectionsModal] = useState<{ open: boolean; type: 'followers' | 'following' }>({
            open: false,
            type: 'followers',
        });

// Busca o usuário pelo username da URL
// Mock — substituir por fetch(`/api/users/${params.username}`)

    const user = mockUsers.find((u) => u.username === username);

    if (!user) {
        notFound();
    }

        const isOwnProfile = currentUser.username === user.username;

        useEffect(() => {
            if (!isOwnProfile && activeTab === 'saved') {
                setActiveTab('posts');
            }
        }, [activeTab, isOwnProfile]);

// Filtra os posts desse usuário
// ⚠️  Mock — substituir por fetch(`/api/users/${params.username}/posts`)
    const userPosts = mockPosts.filter((p) => p.user.username === username);

        const followersPreview = mockUsers
            .filter((u) => u.id !== user.id)
            .slice(0, Math.min(user.followers, 12));

        const followingPreview = mockUsers
            .filter((u) => u.id !== user.id)
            .slice(1, Math.min(user.following + 1, 13));

        const modalUsers = connectionsModal.type === 'followers' ? followersPreview : followingPreview;

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
                        isOwnProfile={isOwnProfile}
                        onOpenFollowers={() => setConnectionsModal({ open: true, type: 'followers' })}
                        onOpenFollowing={() => setConnectionsModal({ open: true, type: 'following' })}
                    />

                    <ProfileTabs
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                        canSeeSaved={isOwnProfile}
                    />

                    <ProfileContent
                        activeTab={activeTab}
                        user={user}
                        userPosts={userPosts}
                        canSeeSaved={isOwnProfile}
                    />
                </div>

            </main>

            <ProfileConnectionsModal
                isOpen={connectionsModal.open}
                title={connectionsModal.type === 'followers' ? 'Seguidores' : 'Seguindo'}
                users={modalUsers}
                onClose={() => setConnectionsModal((prev) => ({ ...prev, open: false }))}
            />
        </div>
    );

}