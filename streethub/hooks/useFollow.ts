'use client';

import { useCallback, useEffect, useState } from 'react';
import { ApiError } from '@/lib/apiClient';
import { followUser, getUserProfile, unfollowUser } from '@/lib/userApi';

export function useFollow(username: string) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    getUserProfile(username)
      .then((profile) => {
        if (active) setIsFollowing(profile.isFollowing);
      })
      .catch(() => {
        // Perfil sem sessão/erro de rede: assume não-seguindo, sem travar a UI.
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [username]);

  const toggleFollowing = useCallback(() => {
    const previous = isFollowing;
    const next = !isFollowing;
    setIsFollowing(next);
    setError(null);

    const action = next ? followUser : unfollowUser;
    action(username)
      .then((profile) => setIsFollowing(profile.isFollowing))
      .catch((err) => {
        setIsFollowing(previous);
        setError(err instanceof ApiError ? err.message : 'Não foi possível atualizar o follow.');
      });
  }, [username, isFollowing]);

  return { isFollowing, loading, error, toggleFollowing };
}
