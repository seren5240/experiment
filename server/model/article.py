from model.base import Translation, Article
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select


async def fetch_latest_article(session: AsyncSession) -> Translation:
    query = select(Article).order_by(Article.created_at.desc()).limit(1)
    res = await session.execute(query)
    return res.first()
