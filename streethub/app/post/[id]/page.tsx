'use client';

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Sidebar } from "@/app/components/feed/Sidebar";
import { Rightsidebar } from "@/app/components/feed/Rightsidebar";
import { BottomNav } from "@/app/components/shared/BottomNav";
import { mockPosts } from "@/data/mockData";

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
                    
                </div>
            </main>
        </div>
    );
}