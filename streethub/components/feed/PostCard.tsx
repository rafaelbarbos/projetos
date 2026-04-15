'use client';

import { useMemo, useState } from "react";
import Link from "next/link";
import {
    ThumbsUp,
    ThumbsDown,
    MessageCircle,
    Bookmark,
    Calculator,
    CheckCircle,
    ExternalLink,
    Clock,
    Weight,
} from "lucide-react";
import type { Post } from "@/types/feed";
import { Avatar } from "../shared/Avatar";

interface PostcardProps {
    post: Post;
}

export function PostCard({ post }: PostcardProps) {
        const [saved, setSaved] = useState(post.saved);
        const [currentImageIndex, setCurrentImageIndex] = useState(0);
        const [userVote, setUserVote] = useState<'green' | 'red' | null>(post.userVote ?? null);
        const [greenLights, setGreenLights] = useState(post.greenLights ?? post.likes ?? 0);
        const [redLights, setRedLights] = useState(post.redLights ?? Math.max(0, Math.round((post.likes ?? 0) * 0.15)));

        const images = useMemo(() => {
            if (post.images && post.images.length > 0) {
                return post.images.slice(0, 5);
            }

            if (post.image) {
                return [post.image];
            }

            return [];
        }, [post.images, post.image]);

        const shippingAgent = post.shippingAgent ?? {
            id: post.supplier?.id ?? 'unknown',
            name: post.supplier?.name ?? 'Agente não informado',
            avatar: post.supplier?.avatar ?? '📦',
            averageDelivery: post.supplier?.responseTime ?? '-',
            verified: post.supplier?.verified ?? false,
            rating: post.supplier?.ratting,
            totalOrders: post.supplier?.totalOrders,
        };

        const totalVotes = greenLights + redLights;
        const greenRatio = totalVotes > 0 ? Math.round((greenLights / totalVotes) * 100) : 0;

        const handleVote = (voteType: 'green' | 'red') => {
            if (userVote === voteType) {
                if (voteType === 'green') {
                    setGreenLights((prev) => Math.max(0, prev - 1));
                } else {
                    setRedLights((prev) => Math.max(0, prev - 1));
                }

                setUserVote(null);
                return;
            }

            if (userVote === 'green') {
                setGreenLights((prev) => Math.max(0, prev - 1));
            }

            if (userVote === 'red') {
                setRedLights((prev) => Math.max(0, prev - 1));
            }

            if (voteType === 'green') {
                setGreenLights((prev) => prev + 1);
            } else {
                setRedLights((prev) => prev + 1);
            }

            setUserVote(voteType);
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
                            {post.user.verified && <CheckCircle className="w-4 h-4 text-blue-500" />}
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
                                                src={images[currentImageIndex]}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:opacity-95 transition-opacity"
                    />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                        {images.length > 1 && (
                                            <>
                                                <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-xs text-white font-medium">
                                                    {currentImageIndex + 1}/{images.length}
                                                </div>

                                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                                    {images.map((_, index) => (
                                                        <button
                                                            key={`${post.id}-dot-${index}`}
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setCurrentImageIndex(index);
                                                            }}
                                                            className={`h-2 rounded-full transition-all ${
                                                                index === currentImageIndex ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
                                                            }`}
                                                            aria-label={`Ir para imagem ${index + 1}`}
                                                        />
                                                    ))}
                                                </div>
                                            </>
                                        )}
                </div>
            </Link>

            {/* Conteúdo do post */}
            <div className="p-4">
                {/* Título do post */}
                <Link href={`/post/${post.id}`}>
                    <h3 className="font-semibold text-white mb-2">
                        {post.title}
                    </h3>
                </Link>

                {post.description && (
                  <p className="text-sm text-neutral-400 mb-3 line-clamp-2">{post.description}</p>
                )}

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

                                        <div className="flex items-center justify-between pt-3 border-t border-neutral-800 mb-3">
                        <Link
                                                        href={`/suppliers/${shippingAgent.id}`}
                            className="flex items-center gap-2 hover:opacity-80"
                            >
                                <span className="text-lg">
                                                                        {shippingAgent.avatar}
                                </span>
                                <div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm font-medium text-white">
                                                                                        {shippingAgent.name}
                                        </span>
                                                                                {shippingAgent.verified && <CheckCircle className="w-3 h-3 text-green-500" />}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                                                            {shippingAgent.rating && <span className="text-yellow-500">★ {shippingAgent.rating}</span>}
                                                                            {shippingAgent.rating && shippingAgent.totalOrders && <span className="text-neutral-600">•</span>}
                                                                            {shippingAgent.totalOrders && (
                                                                                <span className="text-neutral-500">{shippingAgent.totalOrders.toLocaleString()} pedidos</span>
                                                                            )}
                                    </div>
                                </div>
                        </Link>

                                                {post.productLink && (
                                                    <a
                                                        href={post.productLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-1 px-3 py-1 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded-lg text-xs text-purple-400 transition-colors"
                                                    >
                                                        <ExternalLink className="w-3 h-3" />
                                                        Link
                                                    </a>
                                                )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-neutral-800">
                                            <div className="flex items-center gap-2 text-xs">
                                                <Weight className="w-3.5 h-3.5 text-neutral-500" />
                                                <span className="text-neutral-400">Peso:</span>
                                                <span className="text-white font-medium">{post.weight ? `${post.weight}kg` : 'N/I'}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs">
                                                <Clock className="w-3.5 h-3.5 text-neutral-500" />
                                                <span className="text-neutral-400">Warehouse:</span>
                                                <span className="text-white font-medium">{post.warehouseTime ?? 'N/I'}</span>
                                            </div>
                    </div>
                </div>

                                <div className="flex items-center gap-3 mb-4">
                                    <button
                                        type="button"
                                        onClick={() => handleVote('green')}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                                            userVote === 'green'
                                                ? 'bg-green-500/20 text-green-400 border border-green-500/40'
                                                : 'bg-neutral-800 text-neutral-400 hover:text-green-400 hover:bg-green-500/10 border border-transparent'
                                        }`}
                                    >
                                        <ThumbsUp className={`w-5 h-5 ${userVote === 'green' ? 'fill-current' : ''}`} />
                                        <span className="font-medium text-sm">GL {greenLights}</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleVote('red')}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                                            userVote === 'red'
                                                ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                                                : 'bg-neutral-800 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent'
                                        }`}
                                    >
                                        <ThumbsDown className={`w-5 h-5 ${userVote === 'red' ? 'fill-current' : ''}`} />
                                        <span className="font-medium text-sm">RL {redLights}</span>
                                    </button>

                                    <div className="flex-1 flex items-center gap-2">
                                        <div className="flex-1 h-2 bg-neutral-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-linear-to-r from-green-500 to-green-400 transition-all duration-300"
                                                style={{ width: `${greenRatio}%` }}
                                            />
                                        </div>
                                        <span className="text-xs text-neutral-500 font-medium">{greenRatio}% GL</span>
                                    </div>
                                </div>

                {/* Ações: Curtir, Comentar, Salvar */}
                                <div className="flex items-center gap-4 mb-4 pt-3 border-t border-neutral-800">
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
                            className="px-3 py-2 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-white font-medium text-sm flex items-center gap-2 transition-all"
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
                                    href={`/${comment.user.username}`}
                                    className="font-semibold text-white hover:opacity-80"
                                    >
                                        {comment.user.username}
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


