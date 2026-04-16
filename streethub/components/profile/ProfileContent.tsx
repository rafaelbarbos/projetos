import { Grid3x3, Bookmark } from "lucide-react";
import { PostCard } from "../feed/PostCard";
import type { User, Post } from "@/types/feed";
import type { ActiveTab } from "./ProfileTabs";

interface ProfileContentProps {
    activeTab: ActiveTab;
    user: User;
    userPosts: Post[];
    canSeeSaved: boolean;
}

export function ProfileContent({ activeTab, user, userPosts, canSeeSaved }: ProfileContentProps) {
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
                            Quando {user.displayName} postar algo, aparecerá aqui.
                        </p>
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
                Apenas você pode ver os posts que salvou.
            </p>
        </div>
    );
}