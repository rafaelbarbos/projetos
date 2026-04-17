import { Grid3x3, Bookmark } from "lucide-react";
import Link from "next/link";
import { PostCard } from "../feed/PostCard";
import type { User, Post } from "@/types/feed";
import type { ActiveTab } from "./ProfileTabs";
import { currentUser } from "@/data/mockData";

interface ProfileContentProps {
    activeTab: ActiveTab;
    user: User;
    userPosts: Post[];
    canSeeSaved: boolean;
}

export function ProfileContent({ activeTab, user, userPosts, canSeeSaved }: ProfileContentProps) {
    const isOwnProfile = currentUser.username === user.username;

    if (activeTab === 'posts') {
        return (
            <div className="space-y-6">
                {userPosts.length > 0 ? (
                    userPosts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))
                ) : (
                    <div className="text-center py-16">
                        <Grid3x3 className="w-16 h-16 text-neutral-700 mx-auto mb-4"/>
                        <h3 className="text-xl font-semibold text-white mb-2">
                            Nenhum post ainda
                        </h3>
                        <p className="text-neutral-400">
                            {isOwnProfile
                                ? 'Publique sua primeira peça para começar a gerar interação na comunidade.'
                                : `Quando ${user.displayName} postar algo, aparecerá aqui.`}
                        </p>

                        {isOwnProfile ? (
                            <Link
                                href="/feed"
                                className="inline-flex mt-5 px-4 py-2 rounded-lg bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium text-sm transition-colors"
                            >
                                Criar primeiro post
                            </Link>
                        ) : null}
                    </div>
                )}
            </div>
        );
    }

        if (!canSeeSaved) {
            return (
                <div className="text-center py-16">
                    <Bookmark className="w-16 h-16 text-neutral-700 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Conteúdo privado</h3>
                    <p className="text-neutral-400">A aba de salvos só está disponível no seu próprio perfil.</p>
                </div>
            );
        }

    return (
        <div className="text-center py-16">
            <Bookmark className="w-16 h-16 text-neutral-700 mx-auto mb-4"/>
            <h3 className="text-xl font-semibold text-white mb-2">
                Posts salvos privados
            </h3>
            <p className="text-neutral-400">
                Seus itens salvos aparecerão aqui para consulta rápida.
            </p>
            <Link
                href="/explore"
                className="inline-flex mt-5 px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-sm transition-colors"
            >
                Explorar itens
            </Link>
        </div>
    );
}