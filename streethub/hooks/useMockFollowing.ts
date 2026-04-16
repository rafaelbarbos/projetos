'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  getMockFollowing,
  setMockFollowing,
  subscribeMockFollowing,
  toggleMockFollowing,
} from '@/lib/mockFollowStore';

export function useMockFollowing(userId: string) {
  const [isFollowing, setIsFollowing] = useState<boolean>(() => getMockFollowing(userId));

  useEffect(() => {
    setIsFollowing(getMockFollowing(userId));

    const unsubscribe = subscribeMockFollowing((changedUserId) => {
      if (!changedUserId || changedUserId === userId) {
        setIsFollowing(getMockFollowing(userId));
      }
    });

    return unsubscribe;
  }, [userId]);

  const toggleFollowing = useCallback(() => {
    const next = toggleMockFollowing(userId);
    setIsFollowing(next);
    return next;
  }, [userId]);

  const setFollowing = useCallback(
    (value: boolean) => {
      setMockFollowing(userId, value);
      setIsFollowing(value);
    },
    [userId]
  );

  return {
    isFollowing,
    toggleFollowing,
    setFollowing,
  };
}
