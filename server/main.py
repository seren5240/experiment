from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
from translate import translate_text
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


@app.post("/translate")
async def translate(request: TranslationRequest):
    text = request.text
    for i in range(len(request.target_languages)):
        text = translate_text(
            text,
            request.target_languages[i],
            request.target_languages[i - 1] if i > 0 else "en",
        )
    return {"translation": text}
