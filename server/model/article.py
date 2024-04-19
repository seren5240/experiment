from model.base import Article
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select


async def fetch_latest_article(session: AsyncSession) -> Article:
    query = select(Article).order_by(Article.created_at.desc()).limit(1)
    res = await session.execute(query)
    row = res.first()
    return row[0] if row else None
