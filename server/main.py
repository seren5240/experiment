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
    target_language: str


@app.post("/translate")
async def translate(request: TranslationRequest):
    output = translate_text(request.text, request.target_language)
    return {"translation": output}
