import uuid

import pytest
from sqlalchemy import delete

from model.db import get_managed_db_session
from model.explanation import fetch_explanation_by_translation_step
from model.base import StepExplanation, Translation


@pytest.mark.asyncio
async def test_returns_none_if_no_explanation_exists():
    random_id = str(uuid.uuid4())
    async with get_managed_db_session() as session:
        explanation = await fetch_explanation_by_translation_step(random_id, 0, session)
        assert explanation is None


@pytest.mark.asyncio
async def test_gets_existing_explanation():
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
        assert fetched is not None
        assert fetched.explanation == explanation_text
        query = delete(StepExplanation).filter(
            StepExplanation.translation_id == translation_id
        )
        await session.execute(query)
        query = delete(Translation).filter(Translation.id == translation_id)
        await session.execute(query)
        await session.commit()
