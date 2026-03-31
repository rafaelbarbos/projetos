'use client';

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Sidebar } from "@/app/components/feed/Sidebar";
import { Rightsidebar } from "@/app/components/feed/Rightsidebar";
import { BottomNav } from "@/app/components/shared/BottomNav";
import { PostImage } from "@/app/components/post/PostImage";
import { PostInfo } from "@/app/components/post/PostInfo";
import { mockPosts } from "@/data/mockData";
import { PostPricing } from "@/app/components/post/Postpricing";
import { PostActions } from "@/app/components/post/Postactions";
import { PostComments } from "@/app/components/post/Postcomments";


// mockPosts → substituir por GET /api/posts/:id

export default function PostDetailPage({ 
    params, 
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);

    const post = mockPosts.find((p) => p.id === id);

    if (!post) {
        notFound();
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

                        <PostImage src={post.image} alt={post.title} />
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