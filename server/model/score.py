from typing import Sequence
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from model.base import Score


async def update_leaderboard(session: AsyncSession, score: Score) -> Sequence[Score]:
    article_id = score.article_id
    session.add(score)
    await session.commit()
    query = (
        select(Score)
        .where(Score.article_id == article_id)
        .order_by(Score.score.desc())
        .limit(10)
    )
    res = await session.execute(query)
    return res.scalars().all()
