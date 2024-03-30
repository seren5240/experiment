from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
from translate import translate_text
from similarity import compute_similarity
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

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
async def translate(request: TranslationRequest) -> TranslationResponse:
    text = request.text
    steps = []
    for i in range(len(request.target_languages)):
        text = translate_text(
            text,
            request.target_languages[i],
            request.target_languages[i - 1] if i > 0 else "en",
        )
        steps.append(TranslationStep(text=text, language=request.target_languages[i]))
    similarity = compute_similarity(request.text, text)
    return {
        "original": request.text,
        "final": text,
        "steps": steps,
        "similarity": similarity,
    }
