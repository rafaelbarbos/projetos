import uuid
from typing import Literal

from pydantic import BaseModel

from app.db.models.comment import Comment
from app.db.models.post import Post
from app.schemas.user import UserPublic, user_to_public

PostVote = Literal["green", "red"] | None


class SupplierPublic(BaseModel):
    id: uuid.UUID
    name: str
    avatar: str | None = None
    rating: float | None = None
    totalOrders: int
    verified: bool
    responseTime: str | None = None


class ShippingAgentPublic(BaseModel):
    id: uuid.UUID
    name: str
    avatar: str | None = None
    averageDelivery: str | None = None
    verified: bool
    rating: float | None = None
    totalOrders: int


class CommentPublic(BaseModel):
    id: uuid.UUID
    user: UserPublic
    text: str
    timestamp: str
    likes: int


class PostPublic(BaseModel):
    id: uuid.UUID
    user: UserPublic
    images: list[str]
    title: str
    description: str | None = None
    priceYuan: float
    priceReal: float
    supplier: SupplierPublic | None = None
    shippingAgent: ShippingAgentPublic | None = None
    productLink: str | None = None
    weight: float | None = None
    warehouseTime: str | None = None
    taxed: bool
    greenLights: int
    redLights: int
    userVote: PostVote = None
    comments: list[CommentPublic]
    saved: bool
    liked: bool
    timestamp: str
    category: str


class VoteRequest(BaseModel):
    vote: PostVote = None


class CommentCreateRequest(BaseModel):
    text: str


def comment_to_public(comment: Comment) -> CommentPublic:
    return CommentPublic(
        id=comment.id,
        user=user_to_public(comment.author),
        text=comment.content,
        timestamp=comment.created_at.isoformat(),
        likes=comment.likes,
    )


def post_to_public(post: Post, user_vote: PostVote, saved: bool) -> PostPublic:
    return PostPublic(
        id=post.id,
        user=user_to_public(post.author),
        images=post.images,
        title=post.title,
        description=post.description,
        priceYuan=float(post.price_yuan),
        priceReal=float(post.price_real),
        supplier=SupplierPublic(
            id=post.supplier.id,
            name=post.supplier.name,
            avatar=post.supplier.avatar,
            rating=float(post.supplier.rating) if post.supplier.rating is not None else None,
            totalOrders=post.supplier.total_orders,
            verified=post.supplier.verified,
            responseTime=post.supplier.response_time,
        )
        if post.supplier
        else None,
        shippingAgent=ShippingAgentPublic(
            id=post.shipping_agent.id,
            name=post.shipping_agent.name,
            avatar=post.shipping_agent.avatar,
            averageDelivery=post.shipping_agent.average_delivery,
            verified=post.shipping_agent.verified,
            rating=float(post.shipping_agent.rating) if post.shipping_agent.rating is not None else None,
            totalOrders=post.shipping_agent.total_orders,
        )
        if post.shipping_agent
        else None,
        productLink=post.product_link,
        weight=float(post.weight) if post.weight is not None else None,
        warehouseTime=post.warehouse_time,
        taxed=post.taxed,
        greenLights=post.green_lights,
        redLights=post.red_lights,
        userVote=user_vote,
        comments=[comment_to_public(comment) for comment in post.comments],
        saved=saved,
        liked=user_vote == "green",
        timestamp=post.created_at.isoformat(),
        category=post.category,
    )
