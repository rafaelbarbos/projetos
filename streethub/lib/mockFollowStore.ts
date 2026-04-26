const FOLLOW_STORAGE_KEY = 'streethub.mock.following.v1';
const FOLLOW_EVENT_NAME = 'streethub:follow-state-changed';

type FollowStateMap = Record<string, boolean>;

// Evita acessar APIs do navegador durante SSR.
function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

// Lê o mapa de follows salvo localmente; falhas retornam estado vazio.
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

// Persiste o estado completo no localStorage.
function writeFollowState(nextState: FollowStateMap): void {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(FOLLOW_STORAGE_KEY, JSON.stringify(nextState));
}

// Notifica a aplicação de mudanças imediatas na mesma aba.
function emitFollowStateChange(userId: string): void {
  if (!isBrowser()) {
    return;
  }

  window.dispatchEvent(new CustomEvent(FOLLOW_EVENT_NAME, { detail: { userId } }));
}

// Retorna se o usuário atual está sendo seguido.
export function getMockFollowing(userId: string): boolean {
  const state = readFollowState();
  return Boolean(state[userId]);
}

// Atualiza o estado de follow para um usuário específico.
export function setMockFollowing(userId: string, isFollowing: boolean): void {
  const state = readFollowState();
  state[userId] = isFollowing;
  writeFollowState(state);
  emitFollowStateChange(userId);
}

// Alterna o follow e devolve o novo valor.
export function toggleMockFollowing(userId: string): boolean {
  const current = getMockFollowing(userId);
  const next = !current;
  setMockFollowing(userId, next);
  return next;
}

// Escuta mudanças entre abas (storage) e na mesma aba (evento customizado).
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
