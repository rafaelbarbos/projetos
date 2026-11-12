'use client';

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Rightsidebar } from "@/components/layout/RightSidebar";
import { BottomNav } from "@/components/shared/BottomNav";
import { PostImage } from "@/components/post/PostImage";
import { PostInfo } from "@/components/post/PostInfo";
import { PostPricing } from "@/components/post/PostPricing";
import { PostActions } from "@/components/post/PostActions";
import { PostComments } from "@/components/post/PostComments";
import { getPost } from "@/lib/feedApi";
import { ApiError } from "@/lib/apiClient";
import type { Post } from "@/types/feed";

export default function PostDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    // key={id} força remontar ao trocar de post, assim o estado inicial
    // (loading=true, isMissing=false, post=null) já nasce correto sem
    // precisar resetar sincronamente dentro do effect.
    return <PostDetailContent key={id} id={id} />;
}

function PostDetailContent({ id }: { id: string }) {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [isMissing, setIsMissing] = useState(false);

    useEffect(() => {
        let active = true;

        getPost(id)
            .then((data) => {
                if (active) setPost(data);
            })
            .catch((err) => {
                if (active && err instanceof ApiError && err.status === 404) {
                    setIsMissing(true);
                }
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => {
            active = false;
        };
    }, [id]);

    if (isMissing) {
        notFound();
    }

    if (loading || !post) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
                <p className="text-neutral-500">Carregando post...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-950">
            <Sidebar />
            <Rightsidebar />
            <BottomNav />

            <main className="ml-0 md:ml-64 mr-0 lg:mr-80 min-h-screen pb-16 md:pb-0">
                <div className="max-w-5xl mx-auto p-4 md:p-8">

                    {/* Botão de voltar */}
                    <Link
                        href="/feed"
                        className="inline-flex items-center gap-2 text-neutral-400 hover:text-white mb-6 transition-colors"
                        >
                        <ArrowLeft className="w-5 h-5" />
                        Voltar para o Feed
                    </Link>

                    {/* Layout em duas colunas no desktop, coluna unica no mobile */}
                    <div className="grid lg:grid-cols-2 gap-8">

                        <PostImage post={post} />
                        {/* Coluna direita - detalhe + comentários */}
                        <div className="space-y-6">

                            <PostInfo post={post} />
                            <PostPricing post={post} />
                            <PostActions post={post} />
                            <PostComments post={post} />
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
