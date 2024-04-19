from model.base import Translation, Article
from sqlalchemy.ext.asyncio import AsyncSession


def fetch_latest_article(session: AsyncSession) -> Translation:
    return session.query(Article).order_by(Article.created_at.desc()).first()
