import asyncio
from contextlib import asynccontextmanager
import datetime
import uuid
from fastapi import FastAPI, Depends
from model.translation import fetch_translation
from schema import (
    ArticleResponse,
    ScoreRequest,
    ScoreResponse,
    TranslationRequest,
    TranslationResponse,
    TranslationStep,
    ExplanationRequest,
    ExplanationResponse,
)
from model.explanation import fetch_explanation_by_translation_step
from model.article import fetch_latest_article
from model.score import update_leaderboard
from translate import translate_text
from similarity import compute_similarity
from explain import explain
from model.db import get_db_session, get_managed_db_session
from model.base import Score, Translation, StepExplanation
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from summarize import get_article
from util import time_until


async def sync_article():
    target_time = datetime.time(12, 0, 0)
    while True:
        async with get_managed_db_session() as session:
            article = await fetch_latest_article(session)
            if article is None or article.created_at.date() < datetime.date.today():
                article = await get_article()
                session.add(article)
                await session.commit()

        sleep_seconds = time_until(target_time)
        await asyncio.sleep(sleep_seconds)


@asynccontextmanager
async def lifespan(app: FastAPI):
    asyncio.create_task(sync_article())
    yield


app = FastAPI(lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root(db: AsyncSession = Depends(get_db_session)):
    await db.execute(text("SELECT 1"))
    return {"message": "Hello World", "db": True}


@app.post("/translate")
async def translate(
    request: TranslationRequest, db: AsyncSession = Depends(get_db_session)
) -> TranslationResponse:
    text = request.text
    steps = []
    for i in range(len(request.target_languages)):
        text = await translate_text(
            text,
            request.target_languages[i],
            request.target_languages[i - 1] if i > 0 else "en",
        )
        steps.append(TranslationStep(text=text, language=request.target_languages[i]))
    similarity = compute_similarity(request.text, text)
    id = str(uuid.uuid4())
    translation = Translation(
        id=id,
        original=request.text,
        final=text,
        steps=[step.dict() for step in steps],
        similarity=similarity,
    )
    db.add(translation)
    await db.commit()
    return {
        "id": id,
        "original": request.text,
        "final": text,
        "steps": steps,
        "similarity": similarity,
    }


@app.get("/translation/{id}")
async def get_translation(
    id: str, db: AsyncSession = Depends(get_db_session)
) -> TranslationResponse:
    translation = await fetch_translation(id, db)
    steps = [TranslationStep(**step) for step in translation.steps]
    return {
        "id": str(translation.id),
        "original": translation.original,
        "final": translation.final,
        "steps": steps,
        "similarity": translation.similarity,
    }


@app.post("/explain")
async def explain_step(
    request: ExplanationRequest, db: AsyncSession = Depends(get_db_session)
) -> ExplanationResponse:
    existing = await fetch_explanation_by_translation_step(
        request.translation_id, request.step_index, db
    )
    if existing:
        return {
            "id": str(existing.id),
            "explanation": existing.explanation,
        }
    translation = await fetch_translation(request.translation_id, db)
    output_step = TranslationStep(**translation.steps[request.step_index])
    input_step = (
        TranslationStep(**translation.steps[request.step_index - 1])
        if request.step_index > 0
        else TranslationStep(text=translation.original, language="en")
    )
    explanation = await explain(input_step, output_step)
    id = str(uuid.uuid4())
    db.add(
        StepExplanation(
            id=id,
            translation_id=translation.id,
            step_index=request.step_index,
            explanation=explanation,
        )
    )
    await db.commit()
    return {
        "id": id,
        "explanation": explanation,
    }


@app.get("/summary")
async def get_summary(db: AsyncSession = Depends(get_db_session)) -> ArticleResponse:
    article = await fetch_latest_article(db)
    return {
        "id": str(article.id),
        "summary": article.summary,
    }


@app.post("/score")
async def add_score(
    score: ScoreRequest, db: AsyncSession = Depends(get_db_session)
) -> ScoreResponse:
    id = str(uuid.uuid4())
    name = score.name
    our_score = score.score
    translation_id = score.translation_id
    score = Score(
        id=id,
        name=name,
        score=our_score,
        article_id=score.article_id,
        translation_id=translation_id,
    )
    leaderboard, placement = await update_leaderboard(db, score)
    return {
        "leaderboard": [
            {
                "id": str(item.id),
                "name": item.name,
                "score": item.score,
                "translation_id": str(item.translation_id),
            }
            for item in leaderboard
        ],
        "added": {
            "id": id,
            "name": name,
            "score": our_score,
            "translation_id": translation_id,
            "placement": placement,
        },
    }
