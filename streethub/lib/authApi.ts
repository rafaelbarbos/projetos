const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

const LOCAL_TOKEN_KEY = 'streethub_auth_token';
const SESSION_TOKEN_KEY = 'streethub_auth_token_session';

type RequestOptions = RequestInit & {
  body?: unknown;
};

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

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

function buildUrl(path: string): string {
  return `${API_BASE_URL}${path}`;
}

function extractErrorMessage(payload: unknown, fallback: string): string {
  if (typeof payload === 'string' && payload.trim()) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    const maybeMessage = (payload as { message?: unknown }).message;
    if (typeof maybeMessage === 'string' && maybeMessage.trim()) {
      return maybeMessage;
    }

    const maybeError = (payload as { error?: unknown }).error;
    if (typeof maybeError === 'string' && maybeError.trim()) {
      return maybeError;
    }
  }

  return fallback;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, headers, ...rest } = options;
  const response = await fetch(buildUrl(path), {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const rawText = await response.text();
  const parsed = rawText ? (JSON.parse(rawText) as unknown) : null;

  if (!response.ok) {
    const message = extractErrorMessage(parsed, 'Falha ao processar a autenticacao.');
    throw new ApiError(message, response.status);
  }

  return parsed as T;
}

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

export function saveAuthToken(token: string, remember: boolean): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.sessionStorage.removeItem(SESSION_TOKEN_KEY);
  window.localStorage.removeItem(LOCAL_TOKEN_KEY);

  if (remember) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    return;
  }

  window.sessionStorage.setItem(SESSION_TOKEN_KEY, token);
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
