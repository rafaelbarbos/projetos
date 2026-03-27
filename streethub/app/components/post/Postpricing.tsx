import Link from "next/link";
import { CheckCircle, AlertCircle } from "lucide-react";
import type { Post } from "@/type/feed";

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
                    PREÇO ESTIMADO BR
                </div>
            </div>
        </div>
    );
}