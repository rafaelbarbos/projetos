import { ApiError, request } from './apiClient';

export { ApiError };

const LOCAL_TOKEN_KEY = 'streethub_auth_token';
const SESSION_TOKEN_KEY = 'streethub_auth_token_session';
const COOKIE_KEY = 'streethub_auth_token';
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24; // espelha JWT_EXPIRATION_MINUTES do backend

export type LoginPayload = {
  username: string;
  password: string;
};

export type RegisterPayload = {
  username: string;
  displayName: string;
  email: string;
  password: string;
  avatar?: string | null;
  bio?: string | null;
};

export type LoginResponse = {
  token: string;
};

export type AuthUser = {
  id: string;
  username: string;
  displayName: string;
  avatar: string | null;
  verified: boolean;
  followers: number;
  following: number;
  bio: string | null;
  reputation: number;
};

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  return request<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: payload,
  });
}

export async function register(payload: RegisterPayload): Promise<void> {
  await request('/api/auth/register', {
    method: 'POST',
    body: payload,
  });
}

export async function getCurrentUser(token: string): Promise<AuthUser> {
  return request<AuthUser>('/api/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
}

function setAuthCookie(token: string, remember: boolean): void {
  const maxAge = remember ? `; max-age=${COOKIE_MAX_AGE_SECONDS}` : '';
  document.cookie = `${COOKIE_KEY}=${token}; path=/; samesite=lax${maxAge}`;
}

function clearAuthCookie(): void {
  document.cookie = `${COOKIE_KEY}=; path=/; max-age=0; samesite=lax`;
}

export function saveAuthToken(token: string, remember: boolean): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.sessionStorage.removeItem(SESSION_TOKEN_KEY);
  window.localStorage.removeItem(LOCAL_TOKEN_KEY);

  if (remember) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
  } else {
    window.sessionStorage.setItem(SESSION_TOKEN_KEY, token);
  }

  // Espelho só para o middleware checar presença de sessão nas rotas;
  // a autorização de fato continua via Authorization: Bearer no storage acima.
  setAuthCookie(token, remember);
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    window.localStorage.getItem(LOCAL_TOKEN_KEY) ??
    window.sessionStorage.getItem(SESSION_TOKEN_KEY)
  );
}

export function clearAuthToken(): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  window.sessionStorage.removeItem(SESSION_TOKEN_KEY);
  clearAuthCookie();
}
