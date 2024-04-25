import asyncio
import os
import sys
from sqlalchemy import delete, select


sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.realpath(__file__))))

from model.db import get_managed_db_session  # noqa: E402
from model.article import fetch_latest_article  # noqa: E402
from model.base import Score, Translation  # noqa: E402


async def main():
    async with get_managed_db_session() as session:
        latest = await fetch_latest_article(session)
        score_translations_query = select(Score.translation_id).where(
            Score.article_id == latest.id
        )
        translations_to_delete = await session.execute(score_translations_query)
        translation_ids = [result for result in translations_to_delete.scalars().all()]

        print(f"Deleting {len(translation_ids)} translations")

        await session.execute(delete(Score).where(Score.article_id == latest.id))
        if translation_ids:
            await session.execute(
                delete(Translation).where(Translation.id.in_(translation_ids))
            )

        await session.commit()


asyncio.run(main())
