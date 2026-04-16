import type { Post } from '@/types/feed';
import { usePostEngagement, usePostMedia, usePostShippingAgent } from '@/components/post/hooks';

export const usePostCardState = (post: Post) => {
  const { images, currentImageIndex, setCurrentImageIndex } = usePostMedia(post);
  const shippingAgent = usePostShippingAgent(post);
  const { saved, userVote, greenLights, redLights, totalVotes, greenRatio, handleVote, handleSave } = usePostEngagement(post);

  return {
    saved,
    currentImageIndex,
    setCurrentImageIndex,
    userVote,
    greenLights,
    redLights,
    images,
    shippingAgent,
    totalVotes,
    greenRatio,
    handleVote,
    handleSave,
  };
};
