import Link from "next/link";
import { CheckCircle, AlertCircle } from "lucide-react";
import type { Post } from "@/types/feed";

interface PostPricingProps{
    post: Post;
}

export function PostPricing ({post}: PostPricingProps){
    return(
        <div className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800">

            {/* Preços */}
            <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                    <p className="text-sm text-neutral-500 mb-2">
                        Preço Original
                    </p>
                    <p className="text-3xl font-bold text-yellow-400">
                        ¥{post.priceYuan}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-neutral-500 mb-2">Estimado em Reais</p>
                    <p className="text-3xl font-bold text-green-400">R${post.priceReal.toFixed(2)}</p>
                </div>
            </div>

            <div className="pt-6 border-t border-neutral-800 space-y-4">
                
                {/* Fornecedor */}
                {/* ⚠️ Link usa supplier.id — quando backend pronto, usar supplier.slug */}
                
                <div>
                    <Link href={`/suppliers/${post.supplier.id}`} className="flex items-center gap-3 hover:opacity-80">
                        <span className="flex-1">
                            {post.supplier.avatar}
                            <div className="flex-1">
                                <div className="flex items-center gap-1 mb-1">
                                    <span className="font-semibold text-white">{post.supplier.name}</span>
                                    {post.supplier.verified && <CheckCircle className="w-4 h-4 text-green-500" />}
                                </div>
                                <div className="flex flex-wrap items-center gap-3 text-sm">
                                    <span className="text-yellow-500">★ {post.supplier.ratting}</span>
                                    <span className="text-neutral-600">•</span>
                                    <span className="text-neutral-400">{post.supplier.totalOrders.toLocaleString()}</span>
                                    <span className="text-neutral-600">•</span>
                                    <span className="text-green-400">{post.supplier.responseTime}</span>
                                </div>
                            </div>
                        </span>
                    </Link>

                    {/* Status da Taxa */}
                    <div className={`flex flex-items-center px-4 py-3 rounded-xl ${
                        post.taxed
                        ? 'bg-red-500/10 border border-red-500/20'
                        : 'bg-green-500/10 border border-green-500/20'
                    }`}>
                        {post.taxed ? (
                            <span className="flex items-center gap-2 font-medium text-red-400">
                                <AlertCircle className="w-5 h-5" /> Sujeito a Taxa de Importação
                            </span>
                        ) : (
                            <span className="flex items-center gap-2 font-medium text-green-400">
                                <CheckCircle className="w-5 h-5" /> Livre de Taxa
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}