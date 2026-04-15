import Link from "next/link";
import { CheckCircle, ExternalLink, Weight, Clock } from "lucide-react";
import type { Post } from "@/types/feed";

interface PostPricingProps{
    post: Post;
}

export function PostPricing ({post}: PostPricingProps){
        const shippingAgent = post.shippingAgent ?? {
            id: post.supplier?.id ?? 'unknown',
            name: post.supplier?.name ?? 'Agente não informado',
            avatar: post.supplier?.avatar ?? '📦',
            averageDelivery: post.supplier?.responseTime ?? '-',
            verified: post.supplier?.verified ?? false,
            rating: post.supplier?.ratting,
            totalOrders: post.supplier?.totalOrders,
        };

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
                <div>
                    <Link href={`/suppliers/${shippingAgent.id}`} className="flex items-center justify-between gap-3 hover:opacity-80">
                        <div className="flex items-center gap-3 min-w-0">
                            <span className="text-lg">{shippingAgent.avatar}</span>
                            <div className="min-w-0">
                                <div className="flex items-center gap-1 mb-1">
                                    <span className="font-semibold text-white">{shippingAgent.name}</span>
                                    {shippingAgent.verified && <CheckCircle className="w-4 h-4 text-green-500" />}
                                </div>
                                <div className="flex flex-wrap items-center gap-3 text-sm">
                                    {shippingAgent.rating && <span className="text-yellow-500">★ {shippingAgent.rating}</span>}
                                    {shippingAgent.rating && shippingAgent.totalOrders && <span className="text-neutral-600">•</span>}
                                    {shippingAgent.totalOrders && <span className="text-neutral-400">{shippingAgent.totalOrders.toLocaleString()} pedidos</span>}
                                    {shippingAgent.averageDelivery && <span className="text-neutral-600">•</span>}
                                    {shippingAgent.averageDelivery && <span className="text-green-400">{shippingAgent.averageDelivery}</span>}
                                </div>
                            </div>
                        </div>
                    </Link>

                    {post.productLink && (
                      <a
                        href={post.productLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 px-3 py-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded-lg text-sm text-purple-400 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Link do produto
                      </a>
                    )}

                    <div className="grid grid-cols-2 gap-3 pt-4 mt-4 border-t border-neutral-800">
                      <div className="flex items-center gap-2 text-sm">
                        <Weight className="w-4 h-4 text-neutral-500" />
                        <span className="text-neutral-400">Peso:</span>
                        <span className="text-white font-medium">{post.weight ? `${post.weight}kg` : 'N/I'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-neutral-500" />
                        <span className="text-neutral-400">Warehouse:</span>
                        <span className="text-white font-medium">{post.warehouseTime ?? 'N/I'}</span>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    );
}