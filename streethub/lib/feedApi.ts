import { request } from './apiClient';
import { getAuthToken } from './authApi';
import { formatRelativeTime } from './formatRelativeTime';
import type { Comment, Post, PostVote } from '@/types/feed';

// Formato que a API devolve (streethub-api: app/schemas/post.py) — já é
// quase idêntico a Post/Comment de @/types/feed, só o timestamp vem em ISO.
type RawComment = Omit<Comment, 'timestamp'> & { timestamp: string };
type RawPost = Omit<Post, 'timestamp' | 'comments'> & {
  timestamp: string;
  comments: RawComment[];
};

function mapComment(raw: RawComment): Comment {
  return { ...raw, timestamp: formatRelativeTime(raw.timestamp) };
}

function mapPost(raw: RawPost): Post {
  return {
    ...raw,
    timestamp: formatRelativeTime(raw.timestamp),
    comments: raw.comments.map(mapComment),
  };
}

function authHeaders(): Record<string, string> {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getFeedPosts(opts: { page?: number; pageSize?: number } = {}): Promise<Post[]> {
  const params = new URLSearchParams();
  if (opts.page) params.set('page', String(opts.page));
  if (opts.pageSize) params.set('page_size', String(opts.pageSize));
  const query = params.toString() ? `?${params.toString()}` : '';

  const raw = await request<RawPost[]>(`/api/feed/posts${query}`, {
    headers: authHeaders(),
  });
  return raw.map(mapPost);
}

export async function getPost(id: string): Promise<Post> {
  const raw = await request<RawPost>(`/api/feed/posts/${id}`, {
    headers: authHeaders(),
  });
  return mapPost(raw);
}

export async function votePost(id: string, vote: PostVote): Promise<Post> {
  const raw = await request<RawPost>(`/api/posts/${id}/vote`, {
    method: 'POST',
    headers: authHeaders(),
    body: { vote },
  });
  return mapPost(raw);
}

export async function savePost(id: string): Promise<Post> {
  const raw = await request<RawPost>(`/api/posts/${id}/save`, {
    method: 'POST',
    headers: authHeaders(),
  });
  return mapPost(raw);
}

export async function addComment(id: string, text: string): Promise<Comment> {
  const raw = await request<RawComment>(`/api/posts/${id}/comments`, {
    method: 'POST',
    headers: authHeaders(),
    body: { text },
  });
  return mapComment(raw);
}
