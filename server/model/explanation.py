import aiounittest
import uuid
from sqlalchemy.ext.asyncio import AsyncSession

from model.base import StepExplanation
from sqlalchemy.future import select

from model.db import get_managed_db_session


async def fetch_by_translation_id_step_index(
    translation_id: str, step_index: int, session: AsyncSession
) -> StepExplanation | None:
    query = select(StepExplanation).where(
        StepExplanation.translation_id == translation_id,
        StepExplanation.step_index == step_index,
    )
    result = await session.execute(query)
    step_explanation = result.scalars().first()
    return step_explanation


class TestLanguageMethods(aiounittest.AsyncTestCase):
    async def test_returns_none_if_no_explanation_exists(self):
        random_id = str(uuid.uuid4())
        async with get_managed_db_session() as session:
            explanation = await fetch_by_translation_id_step_index(
                random_id, 0, session
            )
            self.assertIsNone(explanation)
