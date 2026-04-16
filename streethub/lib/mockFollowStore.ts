const FOLLOW_STORAGE_KEY = 'streethub.mock.following.v1';
const FOLLOW_EVENT_NAME = 'streethub:follow-state-changed';

type FollowStateMap = Record<string, boolean>;

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

function readFollowState(): FollowStateMap {
  if (!isBrowser()) {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(FOLLOW_STORAGE_KEY);
    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw) as FollowStateMap;
    return parsed ?? {};
  } catch {
    return {};
  }
}

function writeFollowState(nextState: FollowStateMap): void {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(FOLLOW_STORAGE_KEY, JSON.stringify(nextState));
}

function emitFollowStateChange(userId: string): void {
  if (!isBrowser()) {
    return;
  }

  window.dispatchEvent(new CustomEvent(FOLLOW_EVENT_NAME, { detail: { userId } }));
}

export function getMockFollowing(userId: string): boolean {
  const state = readFollowState();
  return Boolean(state[userId]);
}

export function setMockFollowing(userId: string, isFollowing: boolean): void {
  const state = readFollowState();
  state[userId] = isFollowing;
  writeFollowState(state);
  emitFollowStateChange(userId);
}

export function toggleMockFollowing(userId: string): boolean {
  const current = getMockFollowing(userId);
  const next = !current;
  setMockFollowing(userId, next);
  return next;
}

export function subscribeMockFollowing(listener: (userId?: string) => void): () => void {
  if (!isBrowser()) {
    return () => {};
  }

  const onStorage = (event: StorageEvent) => {
    if (event.key === FOLLOW_STORAGE_KEY) {
      listener();
    }
  };

  const onCustom = (event: Event) => {
    const customEvent = event as CustomEvent<{ userId?: string }>;
    listener(customEvent.detail?.userId);
  };

  window.addEventListener('storage', onStorage);
  window.addEventListener(FOLLOW_EVENT_NAME, onCustom as EventListener);

  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(FOLLOW_EVENT_NAME, onCustom as EventListener);
  };
}
