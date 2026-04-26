'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  getMockFollowing,
  setMockFollowing,
  subscribeMockFollowing,
  toggleMockFollowing,
} from '@/lib/mockFollowStore';

export function useMockFollowing(userId: string) {
  // Inicializa com o valor persistido para evitar flicker na UI.
  const [isFollowing, setIsFollowing] = useState<boolean>(() => getMockFollowing(userId));

  useEffect(() => {
    // Reidrata quando o userId muda e sincroniza eventos externos.
    setIsFollowing(getMockFollowing(userId));

    const unsubscribe = subscribeMockFollowing((changedUserId) => {
      if (!changedUserId || changedUserId === userId) {
        setIsFollowing(getMockFollowing(userId));
      }
    });

    return unsubscribe;
  }, [userId]);

  const toggleFollowing = useCallback(() => {
    // Atualização otimista local com persistência no store mock.
    const next = toggleMockFollowing(userId);
    setIsFollowing(next);
    return next;
  }, [userId]);

  const setFollowing = useCallback(
    (value: boolean) => {
      // Define explicitamente o follow para fluxos de botão/sugestão.
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
