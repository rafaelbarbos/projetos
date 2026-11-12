import uuid

from pydantic import BaseModel

from app.db.models.user import User


class UserPublic(BaseModel):
    id: uuid.UUID
    username: str
    displayName: str
    avatar: str | None = None
    verified: bool
    followers: int
    following: int
    bio: str | None = None
    reputation: int
    isFollowing: bool = False


def user_to_public(user: User, is_following: bool = False) -> UserPublic:
    return UserPublic(
        id=user.id,
        username=user.username,
        displayName=user.display_name,
        avatar=user.avatar,
        verified=user.verified,
        followers=user.followers_count,
        following=user.following_count,
        bio=user.bio,
        reputation=user.reputation,
        isFollowing=is_following,
    )
