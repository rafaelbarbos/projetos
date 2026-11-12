from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.models.follow import Follow
from app.db.models.user import User
from app.deps import get_current_user, get_current_user_optional, get_db
from app.schemas.user import UserPublic, user_to_public

router = APIRouter(prefix="/api/users", tags=["users"])


def _get_user_or_404(db: Session, username: str) -> User:
    user = db.query(User).filter(User.username == username).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="user_not_found")
    return user


@router.get("/{username}", response_model=UserPublic)
def get_profile(
    username: str,
    db: Session = Depends(get_db),
    current_user: User | None = Depends(get_current_user_optional),
) -> UserPublic:
    target = _get_user_or_404(db, username)

    is_following = False
    if current_user is not None and current_user.id != target.id:
        is_following = (
            db.query(Follow)
            .filter(Follow.follower_id == current_user.id, Follow.following_id == target.id)
            .first()
            is not None
        )

    return user_to_public(target, is_following=is_following)


@router.post("/{username}/follow", response_model=UserPublic, status_code=status.HTTP_201_CREATED)
def follow_user(
    username: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> UserPublic:
    target = _get_user_or_404(db, username)
    if target.id == current_user.id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="cannot_follow_self")

    existing = (
        db.query(Follow)
        .filter(Follow.follower_id == current_user.id, Follow.following_id == target.id)
        .first()
    )
    if existing is None:
        db.add(Follow(follower_id=current_user.id, following_id=target.id))
        current_user.following_count += 1
        target.followers_count += 1
        db.commit()
        db.refresh(target)

    return user_to_public(target, is_following=True)


@router.delete("/{username}/follow", response_model=UserPublic)
def unfollow_user(
    username: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> UserPublic:
    target = _get_user_or_404(db, username)
    existing = (
        db.query(Follow)
        .filter(Follow.follower_id == current_user.id, Follow.following_id == target.id)
        .first()
    )
    if existing is not None:
        db.delete(existing)
        current_user.following_count = max(0, current_user.following_count - 1)
        target.followers_count = max(0, target.followers_count - 1)
        db.commit()
        db.refresh(target)

    return user_to_public(target, is_following=False)
