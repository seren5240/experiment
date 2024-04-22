from typing import List
from pydantic import BaseModel

from model.base import Score


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


class ScoreRequest(BaseModel):
    name: str
    score: int
    article_id: str
    translation_id: str


class ScoreItem(BaseModel):
    id: str
    name: str
    score: int


class ScoreResponse(BaseModel):
    leaderboard: List[ScoreItem]
