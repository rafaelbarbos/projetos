'use client';

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, MessageCircle, Bookmark, Calculator, CheckCircle, AlertCircle, Divide } from "lucide-react";
import type { Post } from "@/types/feed";
import { Avatar } from "../shared/Avatar";

interface PostcardProps {
    post: Post;
}

export function PostCard({ post }: PostcardProps) {
    const router = useRouter();
    const [liked, setLiked]         =   useState(post.liked);
    const [saved, setSaved]         =   useState(post.saved);
    const [likesCount, setLikeCount] =   useState(post.likes);

    const handleLike = () => {
        setLiked(!liked);
        setLikeCount(liked ? likesCount - 1 : likesCount + 1);
        // ⚠️  Mock — substituir por: await fetch(`/api/posts/${post.id}/like`, { method: 'POST' })
    };

    const handleSave = () => {
        setSaved(!saved);
        // ⚠️  Mock — substituir por: await fetch(`/api/posts/${post.id}/save`, { method: 'POST' })
    };

    return(
        <div className="bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-neutral-700 transition-all">
            {/* Header — autor do post */}
            <div className="p-4 flex items-center gap-3">
                <Link href={`/${post.user.username}`}>
                    <Avatar
                        src={post.user.avatar}
                        name={post.user.displayName}
                        size="md"
                    />
                </Link>
                <div className="flex-1">
                    <Link 
                        href={`/${post.user.username}`}
                        className="flex items-center gap-1 hover:opacity-80"
                        >
                            <span className="font-semibold text-white">{post.user.displayName}
                            </span>
                            {post.user.isVerified && <CheckCircle className="w-4 h-4 text-blue-500" />}
                    </Link>
                    <p className="text-xs text-neutral-500">
                        {post.timestamp}
                    </p>
                </div>
                <div className="text-xs px-3 py-1 bg-neutral-800 rounded-full text-neutral-400">
                    {post.category}
                </div>
            </div>


            {/* Imagem do post */}
            <Link href={`/post/${post.id}`}>
                <div className=" aspect-square bg-neutral-950 relative group cursor-pointer overflow-hidden">
                    <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:opacity-95 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"/>
                </div>
            </Link>

            {/* Conteúdo do post */}
            <div className="p-4">
                {/* Título do post */}
                <Link href={`/post/${post.id}`}>
                    <h3 className="font-semibold text-white mb-3">
                        {post.title}
                    </h3>
                </Link>

                {/* Preço + Fornecedor */}
                <div className="bg-neutral-950 rounded-xl p-4 mb-4 border border-neutral-800">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                            <p className="text-xs text-neutral-500 mb-1">
                                Preço original
                            </p>
                            <p className="text-lg font-bold text-yellow-400">
                                ¥{post.priceYuan}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-neutral-500 mb-1">
                                Estimado BR
                            </p>
                            <p className="text-lg font-bold text-green-400">
                                R$ {post.priceReal.toFixed(2)}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t broder-neutral-800">
                        <Link
                            href={`/supplier/${post.supplier.id}`}
                            className="flex items-center gap-2 hover:opacity-80"
                            >
                                <span className="text-lg">
                                    {post.supplier.avatar}
                                </span>
                                <div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm font-medium text-white">
                                            {post.supplier.name}
                                        </span>
                                        {post.supplier.verified && <CheckCircle className="w-3 h-3 text-green-500" />}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <span className="text-yellow-500">
                                            ★ {post.supplier.rating}
                                        </span>
                                        <span className="text-neutral-600">
                                            •
                                        </span>
                                        <span className="text-neutral-500">
                                            {post.supplier.totalOrders.toLocaleString()} pedidos
                                        </span>
                                    </div>
                                </div>
                        </Link>

                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    post.taxed
                                    ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                    : 'bg-green-500/10 text-green-400 border border-green-500/20'
                                }`}>
                                    {post.taxed ? (
                                            <span className="flex items-center gap-1">
                                                    <AlertCircle className="w-3 h-3" />
                                                    Taxado
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1">
                                                    <CheckCircle className="w-3 h-3" />
                                                    Livre
                                                    </span>
                                                )}
                        </div>
                    </div>
                </div>

                {/* Ações: Curtir, Comentar, Salvar */}
                <div className="flex items-center gap-4 mb-4">
                    <button
                        onClick={handleLike}
                        className={`flex items-center gap-2 transition-colors ${liked ? 'text-red-500' : 'text-neutral-500 hover:text-red-500'}`}
                    >
                        <Heart className={`w-6 h-6 ${liked ? 'fill-current' : ''}`} 
                        />

                        <span className="text-medium">
                            {likesCount}
                        </span>
                    </button>

                        <Link
                            href={`/post/${post.id}`}
                            className="flex items-center gap-2 text-neutral-400 hover:text-blue-400 transition-colors"
                            >
                            <MessageCircle className="w-6 h-6" />
                            <span className="font-medium">
                                {post.comments.length}
                            </span>
                        </Link>

                        <button
                            onClick={handleSave}
                            className={`flex items-center gap-2 ml-auto transition-colors ${
                                saved ? 'text-purple-400' : 'text-neutral-400 hover:text-purple-400'}`}
                            >
                                <Bookmark className={`w-6 h-6 ${saved ? 'fill-current' : ''}`}
                                />
                        </button>

                        <Link
                            href={`/calculator?yuan=${post.priceYuan}`}
                            className="px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-white font-medium text-sm flex items-center gap-2 transition-all"
                            >
                            <Calculator className="w-4 h-4" />
                            Calcular
                        </Link>
                </div>

                {/* Preview de comentários */}
                {post.comments.length > 0 && (
                    <div className="space-y-2">
                        {post.comments.slice(0, 2).map((comment) => (
                            <div key={comment.id} className="text-sm">
                                <Link
                                    href={`/user/${comment.user.id}`}
                                    className="font-semibold text-white hover:opacity-80"
                                    >
                                        {comment.user.displayName}
                                </Link>
                                <span className="text-neutral-400 ml-2">
                                    {comment.text}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}


