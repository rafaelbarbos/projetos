import { request } from './apiClient';
import { getAuthToken } from './authApi';

export type ReportReason = 'spam' | 'scam' | 'misleading' | 'other';

export const REPORT_REASONS: { value: ReportReason; label: string }[] = [
  { value: 'spam', label: 'Spam' },
  { value: 'scam', label: 'Golpe/fraude' },
  { value: 'misleading', label: 'Conteúdo enganoso' },
  { value: 'other', label: 'Outro' },
];

function authHeaders(): Record<string, string> {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function reportPost(id: string, reason: ReportReason): Promise<void> {
  await request(`/api/posts/${id}/report`, {
    method: 'POST',
    headers: authHeaders(),
    body: { reason },
  });
}

export async function reportComment(id: string, reason: ReportReason): Promise<void> {
  await request(`/api/comments/${id}/report`, {
    method: 'POST',
    headers: authHeaders(),
    body: { reason },
  });
}
