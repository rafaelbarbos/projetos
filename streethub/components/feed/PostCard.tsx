'use client';

import Link from 'next/link';
import type { Post } from '@/types/feed';
import { usePostCardState } from './hooks';
import {
  PostCardHeader,
  PostCardImage,
  PostCardPricing,
  SupplierInfo,
  ProductSpecs,
  VoteSection,
  PostActions,
  CommentsPreview,
} from './post-card';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const {
    saved,
    handleSave,
    currentImageIndex,
    setCurrentImageIndex,
    userVote,
    greenLights,
    redLights,
    images,
    shippingAgent,
    greenRatio,
    handleVote,
  } = usePostCardState(post);

  return (
    <div className="bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-neutral-700 transition-all">
      {/* Header — autor do post */}
      <PostCardHeader post={post} />

      {/* Imagem do post */}
      <PostCardImage
        postId={post.id}
        title={post.title}
        images={images}
        currentImageIndex={currentImageIndex}
        onImageChange={setCurrentImageIndex}
      />

      {/* Conteúdo do post */}
      <div className="p-4">
        {/* Título do post */}
        <Link href={`/post/${post.id}`}>
          <h3 className="font-semibold text-white mb-2">{post.title}</h3>
        </Link>

        {post.description && (
          <p className="text-sm text-neutral-400 mb-3 line-clamp-2">
            {post.description}
          </p>
        )}

        {/* Preço + Fornecedor */}
        <div className="bg-neutral-950 rounded-xl p-4 mb-4 border border-neutral-800">
          {/* Preços */}
          <PostCardPricing priceYuan={post.priceYuan} priceReal={post.priceReal} />

          {/* Informações do fornecedor */}
          <SupplierInfo
            id={shippingAgent.id}
            name={shippingAgent.name}
            avatar={shippingAgent.avatar}
            verified={shippingAgent.verified}
            rating={shippingAgent.rating}
            totalOrders={shippingAgent.totalOrders}
            productLink={post.productLink}
          />

          {/* Especificações do produto */}
          <ProductSpecs weight={post.weight} warehouseTime={post.warehouseTime} />
        </div>

        {/* Votação (GL/RL) */}
        <VoteSection
          userVote={userVote}
          greenLights={greenLights}
          redLights={redLights}
          greenRatio={greenRatio}
          onVote={handleVote}
        />

        {/* Ações: Comentários, Salvar, Calcular */}
        <PostActions
          postId={post.id}
          priceYuan={post.priceYuan}
          commentsCount={post.comments.length}
          saved={saved}
          onSave={handleSave}
        />

        {/* Preview de comentários */}
        <CommentsPreview comments={post.comments} />
      </div>
    </div>
  );
}


