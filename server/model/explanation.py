from sqlalchemy.ext.asyncio import AsyncSession

from model.base import StepExplanation
from sqlalchemy.future import select


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
