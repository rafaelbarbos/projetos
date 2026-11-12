import { useState } from 'react';
import type { Post, PostVote } from '@/types/feed';
import { ApiError } from '@/lib/apiClient';
import { savePost, votePost } from '@/lib/feedApi';

interface UsePostEngagementReturn {
  saved: boolean;
  userVote: PostVote;
  greenLights: number;
  redLights: number;
  totalVotes: number;
  greenRatio: number;
  error: string | null;
  handleVote: (voteType: 'green' | 'red') => void;
  handleSave: () => void;
}

export function usePostEngagement(post: Post): UsePostEngagementReturn {
  const [saved, setSaved] = useState(post.saved);
  const [userVote, setUserVote] = useState<PostVote>(post.userVote ?? null);
  const [greenLights, setGreenLights] = useState(post.greenLights ?? post.likes ?? 0);
  const [redLights, setRedLights] = useState(post.redLights ?? Math.max(0, Math.round((post.likes ?? 0) * 0.15)));
  const [error, setError] = useState<string | null>(null);

  const totalVotes = greenLights + redLights;
  const greenRatio = totalVotes > 0 ? Math.round((greenLights / totalVotes) * 100) : 0;

  const handleVote = (voteType: 'green' | 'red') => {
    const previous = { userVote, greenLights, redLights };
    const nextVote: PostVote = userVote === voteType ? null : voteType;

    // Otimista: aplica localmente antes da resposta da API.
    if (userVote === 'green') setGreenLights((prev) => Math.max(0, prev - 1));
    if (userVote === 'red') setRedLights((prev) => Math.max(0, prev - 1));
    if (nextVote === 'green') setGreenLights((prev) => prev + 1);
    if (nextVote === 'red') setRedLights((prev) => prev + 1);
    setUserVote(nextVote);
    setError(null);

    votePost(post.id, nextVote)
      .then((updated) => {
        setGreenLights(updated.greenLights ?? 0);
        setRedLights(updated.redLights ?? 0);
        setUserVote(updated.userVote ?? null);
      })
      .catch((err) => {
        setUserVote(previous.userVote);
        setGreenLights(previous.greenLights);
        setRedLights(previous.redLights);
        setError(err instanceof ApiError ? err.message : 'Não foi possível registrar o voto.');
      });
  };

  const handleSave = () => {
    const previous = saved;
    setSaved((prev) => !prev);
    setError(null);

    savePost(post.id)
      .then((updated) => setSaved(updated.saved))
      .catch((err) => {
        setSaved(previous);
        setError(err instanceof ApiError ? err.message : 'Não foi possível salvar o post.');
      });
  };

  return {
    saved,
    userVote,
    greenLights,
    redLights,
    totalVotes,
    greenRatio,
    error,
    handleVote,
    handleSave,
  };
}
