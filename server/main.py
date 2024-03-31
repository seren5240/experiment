from typing import List
import uuid
from fastapi import FastAPI, Depends
from pydantic import BaseModel
from translate import translate_text
from similarity import compute_similarity
from model.db import get_db_session
from model.base import Translation
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


class TranslationRequest(BaseModel):
    text: str
    target_languages: List[str]


class TranslationStep(BaseModel):
    text: str
    language: str


class TranslationResponse(BaseModel):
    original: str
    final: str
    steps: List[TranslationStep]
    similarity: float


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
async def get_translation(id: str) -> TranslationResponse:
    translation = get_translation(id)
    steps = [TranslationStep(**step) for step in translation.steps]
    return {
        "id": translation.id,
        "original": translation.original,
        "final": translation.final,
        "steps": steps,
        "similarity": translation.similarity,
    }
