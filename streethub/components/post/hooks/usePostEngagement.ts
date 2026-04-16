import { useState } from 'react';
import type { Post, PostVote } from '@/types/feed';

interface UsePostEngagementReturn {
  saved: boolean;
  userVote: PostVote;
  greenLights: number;
  redLights: number;
  totalVotes: number;
  greenRatio: number;
  handleVote: (voteType: 'green' | 'red') => void;
  handleSave: () => void;
}

export function usePostEngagement(post: Post): UsePostEngagementReturn {
  const [saved, setSaved] = useState(post.saved);
  const [userVote, setUserVote] = useState<PostVote>(post.userVote ?? null);
  const [greenLights, setGreenLights] = useState(post.greenLights ?? post.likes ?? 0);
  const [redLights, setRedLights] = useState(post.redLights ?? Math.max(0, Math.round((post.likes ?? 0) * 0.15)));

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
    setSaved((prev) => !prev);
    // Mock: substituir por chamada de API quando backend estiver pronto.
  };

  return {
    saved,
    userVote,
    greenLights,
    redLights,
    totalVotes,
    greenRatio,
    handleVote,
    handleSave,
  };
}