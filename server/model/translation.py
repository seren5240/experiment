from model.base import Translation
from sqlalchemy.ext.asyncio import AsyncSession


def fetch_translation(id: str, session: AsyncSession) -> Translation:
    return session.get(Translation, id)
