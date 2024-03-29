from fastapi import FastAPI
from pydantic import BaseModel
from translate import translate_text

app = FastAPI()


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
