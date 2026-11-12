import { request } from './apiClient';
import { getAuthToken } from './authApi';

export type UserProfile = {
  id: string;
  username: string;
  displayName: string;
  avatar: string | null;
  verified: boolean;
  followers: number;
  following: number;
  bio: string | null;
  reputation: number;
  isFollowing: boolean;
};

function authHeaders(): Record<string, string> {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getUserProfile(username: string): Promise<UserProfile> {
  return request<UserProfile>(`/api/users/${username}`, {
    headers: authHeaders(),
  });
}

export async function followUser(username: string): Promise<UserProfile> {
  return request<UserProfile>(`/api/users/${username}/follow`, {
    method: 'POST',
    headers: authHeaders(),
  });
}

export async function unfollowUser(username: string): Promise<UserProfile> {
  return request<UserProfile>(`/api/users/${username}/follow`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
}
