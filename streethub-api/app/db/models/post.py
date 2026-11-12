import uuid
from datetime import datetime

from sqlalchemy import BigInteger, Boolean, DateTime, ForeignKey, Numeric, String, Text, func
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base


class Post(Base):
    __tablename__ = "posts"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    author_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    images: Mapped[list[str]] = mapped_column(JSONB, nullable=False, default=list)
    price_yuan: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    price_real: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    category: Mapped[str] = mapped_column(String(50), nullable=False)
    taxed: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    supplier_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("suppliers.id", ondelete="SET NULL"), nullable=True
    )
    shipping_agent_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("shipping_agents.id", ondelete="SET NULL"), nullable=True
    )
    product_link: Mapped[str | None] = mapped_column(String(500), nullable=True)
    weight: Mapped[float | None] = mapped_column(Numeric(6, 2), nullable=True)
    warehouse_time: Mapped[str | None] = mapped_column(String(50), nullable=True)
    green_lights: Mapped[int] = mapped_column(BigInteger, nullable=False, default=0)
    red_lights: Mapped[int] = mapped_column(BigInteger, nullable=False, default=0)
    comments_count: Mapped[int] = mapped_column(BigInteger, nullable=False, default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    author = relationship("User", lazy="joined")
    supplier = relationship("Supplier", lazy="joined")
    shipping_agent = relationship("ShippingAgent", lazy="joined")
    comments = relationship("Comment", back_populates="post", order_by="Comment.created_at")
