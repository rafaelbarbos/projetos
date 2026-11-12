"""Popula o banco com dados equivalentes ao streethub/data/mockData.ts,
para a API nascer com o mesmo conteudo que o frontend hoje mostra via mock.
Idempotente: limpa as tabelas relevantes antes de inserir.
"""

from datetime import datetime, timedelta, timezone

from app.core.security import hash_password
from app.db.models.comment import Comment
from app.db.models.follow import Follow
from app.db.models.post import Post
from app.db.models.post_save import PostSave
from app.db.models.post_vote import PostVote
from app.db.models.shipping_agent import ShippingAgent
from app.db.models.supplier import Supplier
from app.db.models.user import User
from app.db.session import SessionLocal

NOW = datetime.now(timezone.utc)

USERS = [
    dict(
        username="johndoe",
        display_name="John Doe",
        email="johndoe@example.com",
        avatar="",
        verified=True,
        followers_count=1200,
        following_count=500,
        bio="Software developer passionate about creating innovative solutions.",
        reputation=1500,
    ),
    dict(
        username="hypebeast_br",
        display_name="Hypebeast BR",
        email="hypebeast_br@example.com",
        avatar="https://images.unsplash.com/photo-1620204389674-ef76805d76b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=150",
        verified=True,
        followers_count=8900,
        following_count=156,
        bio="Drops semanais • Premium only",
        reputation=95,
    ),
    dict(
        username="urbanstyle",
        display_name="Urban Style",
        email="urbanstyle@example.com",
        avatar="https://images.unsplash.com/photo-1609091289242-735df7a2207a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=150",
        verified=False,
        followers_count=2340,
        following_count=890,
        bio="Começando na importação 🚀",
        reputation=87,
    ),
    dict(
        username="drip_hunter",
        display_name="Drip Hunter",
        email="drip_hunter@example.com",
        avatar="https://images.unsplash.com/photo-1699903905361-4d408679753f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=150",
        verified=False,
        followers_count=5600,
        following_count=234,
        bio=None,
        reputation=92,
    ),
    dict(
        username="flex_imports",
        display_name="Flex Imports",
        email="flex_imports@example.com",
        avatar="https://images.unsplash.com/photo-1620204389674-ef76805d76b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=150",
        verified=True,
        followers_count=15200,
        following_count=120,
        bio=None,
        reputation=99,
    ),
]

SUPPLIERS = [
    dict(name="Yupoo Fashion Store", rating=4.8, total_orders=15420, verified=True, response_time="< 2h", avatar="🏪"),
    dict(name="Taobao Premium", rating=4.9, total_orders=23100, verified=True, response_time="< 1h", avatar="🛍️"),
    dict(name="Weidian Streetwear", rating=4.6, total_orders=8900, verified=True, response_time="< 3h", avatar="👕"),
    dict(name="1688 Direct", rating=4.7, total_orders=12300, verified=False, response_time="< 5h", avatar="📦"),
    dict(name="Pandabuy Goods", rating=4.9, total_orders=34200, verified=True, response_time="< 1h", avatar="🐼"),
]

SHIPPING_AGENTS = [
    dict(name="Pandabuy", avatar="🐼", average_delivery="7-15 dias", verified=True, rating=4.9, total_orders=34200),
    dict(name="CSSBuy", avatar="📦", average_delivery="10-20 dias", verified=True, rating=4.7, total_orders=22800),
    dict(name="Superbuy", avatar="✈️", average_delivery="8-18 dias", verified=True, rating=4.8, total_orders=19100),
    dict(name="Sugargoo", avatar="🍬", average_delivery="9-19 dias", verified=False, rating=4.6, total_orders=15400),
]

FALLBACK_DESCRIPTIONS = [
    "Tecido premium e ótimo caimento. Vale muito pelo custo-benefício.",
    "Batch muito consistente. Acabamento e conforto acima da média.",
    "Peça técnica com material leve e resistente para uso diário.",
    "Modelagem boa e estampa bem definida, sem aspecto lavado.",
    "Ótima opção para composição streetwear casual.",
    "Acessório com acabamento limpo e bom material.",
    "Boa capacidade interna e construção reforçada.",
    "Jaqueta com ótimo visual e bom nível de detalhe.",
]

# índice de user/supplier referem-se às listas USERS/SUPPLIERS acima.
POSTS = [
    dict(
        user=0,
        images=[
            "https://images.unsplash.com/photo-1721111260570-456f3306f8d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
        ],
        title="Essentials Hoodie Oversized - Bege Premium",
        price_yuan=158,
        price_real=112.50,
        supplier=0,
        taxed=False,
        likes=342,
        saved=False,
        liked=False,
        age=timedelta(hours=2),
        category="Moletom",
        comments=[
            (1, "Essa peça é insana! Já comprei e a qualidade é top 🔥", timedelta(hours=1), 12),
            (2, "Qual o peso aproximado pra calcular o frete?", timedelta(minutes=45), 3),
        ],
    ),
    dict(
        user=1,
        images=[
            "https://images.unsplash.com/photo-1761942028138-2b494760aa3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
            "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
            "https://images.unsplash.com/photo-1491553895911-0055eca6402d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
        ],
        title="Dunk Low Panda - Replica 1:1",
        price_yuan=280,
        price_real=199.00,
        supplier=1,
        taxed=True,
        likes=856,
        saved=True,
        liked=True,
        age=timedelta(hours=5),
        category="Tênis",
        comments=[(3, "Melhor batch do mercado! Recomendo demais", timedelta(hours=3), 45)],
    ),
    dict(
        user=4,
        images=["https://images.unsplash.com/photo-1764698192198-4cfb7188c6d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"],
        title="Corta-Vento Tech Reflective - Preto",
        price_yuan=198,
        price_real=140.85,
        supplier=2,
        taxed=False,
        likes=234,
        saved=False,
        liked=False,
        age=timedelta(days=1),
        category="Jaqueta",
        comments=[],
    ),
    dict(
        user=2,
        images=["https://images.unsplash.com/photo-1499713907394-43c9d094ac2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"],
        title="Camiseta Vintage Graphic - Coleção Street",
        price_yuan=68,
        price_real=48.40,
        supplier=0,
        taxed=False,
        likes=189,
        saved=False,
        liked=True,
        age=timedelta(days=2),
        category="Camiseta",
        comments=[
            (0, "Print de qualidade? Não desbota na lavagem?", timedelta(days=1), 8),
            (2, "Lavei 3x e continua perfeita!", timedelta(hours=20), 15),
        ],
    ),
    dict(
        user=3,
        images=[
            "https://images.unsplash.com/photo-1649850874075-49e014357b9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
            "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
            "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
        ],
        title="Cargo Pants Tactical - Verde Militar",
        price_yuan=145,
        price_real=103.15,
        supplier=3,
        taxed=False,
        likes=421,
        saved=True,
        liked=False,
        age=timedelta(days=3),
        category="Calça",
        comments=[],
    ),
    dict(
        user=0,
        images=["https://images.unsplash.com/photo-1763192756578-7943a4103967?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"],
        title="Beanie Bordado Premium - Collection",
        price_yuan=42,
        price_real=29.89,
        supplier=1,
        taxed=False,
        likes=156,
        saved=False,
        liked=False,
        age=timedelta(days=4),
        category="Acessórios",
        comments=[],
    ),
    dict(
        user=4,
        images=["https://images.unsplash.com/photo-1610659592009-088d5c2c4776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"],
        title="Mochila Urban Tech - 30L",
        price_yuan=220,
        price_real=156.50,
        supplier=4,
        taxed=True,
        likes=678,
        saved=True,
        liked=True,
        age=timedelta(days=5),
        category="Acessórios",
        comments=[(1, "Cabe notebook 15 polegadas?", timedelta(days=4), 5)],
    ),
    dict(
        user=1,
        images=[
            "https://images.unsplash.com/photo-1760126070359-5b82710274fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
            "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
            "https://images.unsplash.com/photo-1556906781-9a412961c28c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
        ],
        title="Bomber Jacket Reversível - Preto/Laranja",
        price_yuan=312,
        price_real=222.00,
        supplier=0,
        taxed=True,
        likes=945,
        saved=False,
        liked=True,
        age=timedelta(weeks=1),
        category="Jaqueta",
        comments=[],
    ),
]


def seed() -> None:
    db = SessionLocal()
    try:
        db.query(Comment).delete()
        db.query(PostVote).delete()
        db.query(PostSave).delete()
        db.query(Follow).delete()
        db.query(Post).delete()
        db.query(Supplier).delete()
        db.query(ShippingAgent).delete()
        db.query(User).delete()
        db.flush()

        users = [User(password_hash=hash_password("streethub123"), **u) for u in USERS]
        db.add_all(users)
        suppliers = [Supplier(**s) for s in SUPPLIERS]
        db.add_all(suppliers)
        agents = [ShippingAgent(**a) for a in SHIPPING_AGENTS]
        db.add_all(agents)
        db.flush()

        current_user = users[0]  # equivalente ao `currentUser = mockUsers[0]` do mock

        for index, p in enumerate(POSTS):
            green_lights = p["likes"]
            red_lights = max(8, round(green_lights * 0.18))
            post = Post(
                author_id=users[p["user"]].id,
                title=p["title"],
                description=FALLBACK_DESCRIPTIONS[index % len(FALLBACK_DESCRIPTIONS)],
                images=p["images"],
                price_yuan=p["price_yuan"],
                price_real=p["price_real"],
                category=p["category"],
                taxed=p["taxed"],
                supplier_id=suppliers[p["supplier"]].id,
                shipping_agent_id=agents[index % len(agents)].id,
                product_link=f"https://www.pandabuy.com/product/{index + 1}",
                weight=round(0.4 + (index % 5) * 0.2, 1),
                warehouse_time=f"{2 + (index % 4)} dias",
                green_lights=green_lights,
                red_lights=red_lights,
                comments_count=len(p["comments"]),
                created_at=NOW - p["age"],
            )
            db.add(post)
            db.flush()

            if p["liked"]:
                db.add(PostVote(post_id=post.id, user_id=current_user.id, vote="green"))
            if p["saved"]:
                db.add(PostSave(post_id=post.id, user_id=current_user.id))

            for author_index, text, comment_age, likes in p["comments"]:
                db.add(
                    Comment(
                        post_id=post.id,
                        author_id=users[author_index].id,
                        content=text,
                        likes=likes,
                        created_at=NOW - comment_age,
                    )
                )

        db.commit()
        print(f"Seed ok: {len(users)} usuarios, {len(suppliers)} suppliers, {len(agents)} agentes, {len(POSTS)} posts.")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
