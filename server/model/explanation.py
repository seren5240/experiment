import aiounittest
import uuid
from sqlalchemy import delete
from sqlalchemy.ext.asyncio import AsyncSession

from model.base import StepExplanation, Translation
from sqlalchemy.future import select

from model.db import get_managed_db_session


async def fetch_explanation_by_translation_step(
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
            explanation = await fetch_explanation_by_translation_step(
                random_id, 0, session
            )
            self.assertIsNone(explanation)

    async def test_gets_existing_explanation(self):
        translation_id = str(uuid.uuid4())
        step_index = 0
        explanation_text = "Test explanation"
        async with get_managed_db_session() as session:
            session.add(
                Translation(
                    id=translation_id,
                    original="Original placeholder",
                    final="Final placeholder",
                    steps=[{"text": "Test step", "language": "en"}],
                    similarity=0.5,
                ),
            )
            await session.commit()
            session.add(
                StepExplanation(
                    id=str(uuid.uuid4()),
                    translation_id=translation_id,
                    step_index=step_index,
                    explanation=explanation_text,
                ),
            )
            await session.commit()
            fetched = await fetch_explanation_by_translation_step(
                translation_id, step_index, session
            )
            self.assertIsNotNone(fetched)
            self.assertEqual(fetched.explanation, explanation_text)
            query = delete(StepExplanation).filter(
                StepExplanation.translation_id == translation_id
            )
            await session.execute(query)
            query = delete(Translation).filter(Translation.id == translation_id)
            await session.execute(query)
            await session.commit()
