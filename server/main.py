import uuid
from fastapi import FastAPI, Depends
from model.translation import fetch_translation
from schema import (
    TranslationRequest,
    TranslationResponse,
    TranslationStep,
    ExplanationRequest,
    ExplanationResponse,
)
from translate import translate_text
from similarity import compute_similarity
from explain import explain
from model.db import get_db_session
from model.base import Translation, StepExplanation
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from sqlalchemy.ext.asyncio import AsyncSession

# Construct the path to the .env file
dotenv_path = os.path.join(os.path.dirname(__file__), "..", ".env")
load_dotenv(dotenv_path)


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


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
    translation = await fetch_translation(request.translation_id, db)
    output_step = translation.steps[request.step_index]
    input_step = (
        translation.steps[request.step_index - 1]
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
