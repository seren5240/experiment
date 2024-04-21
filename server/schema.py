from typing import List
from pydantic import BaseModel


class TranslationRequest(BaseModel):
    text: str
    target_languages: List[str]


class TranslationStep(BaseModel):
    text: str
    language: str


class TranslationResponse(BaseModel):
    id: str
    original: str
    final: str
    steps: List[TranslationStep]
    similarity: float


class ExplanationRequest(BaseModel):
    translation_id: str
    step_index: int


class ExplanationResponse(BaseModel):
    id: str
    explanation: str


class ArticleResponse(BaseModel):
    id: str
    summary: str
