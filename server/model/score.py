from typing import Sequence, Tuple
from sqlalchemy import func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from model.base import Score


async def update_leaderboard(
    session: AsyncSession, score: Score
) -> Tuple[Sequence[Score], int]:
    article_id = score.article_id
    our_score = score.score
    session.add(score)
    await session.commit()
    query = (
        select(Score)
        .where(Score.article_id == article_id)
        .order_by(Score.score.desc())
        .limit(10)
    )
    res = await session.execute(query)
    leaderboard = res.scalars().all()
    placement_query = select(func.count(Score.id)).where(
        Score.article_id == article_id, Score.score > our_score
    )
    placement_res = await session.execute(placement_query)
    placement = placement_res.scalar_one() + 1

    return leaderboard, placement
