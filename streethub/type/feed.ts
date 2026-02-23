export interface User {
    id: string;
    username: string;
    displayName: string;
    avatar: string;
    verified: boolean;
    followers: number;
    following: number;
    bio?: string;
    reputation: number;
}