import os
from typing import List, Tuple
from pydantic import BaseModel
from instructor import patch
from openai import OpenAI
import instructor


class Explanation(BaseModel):
    breakdown: List[Tuple[str, str]]
    challenges: str


def main():
    api_key = os.getenv("OPENROUTER_API_KEY")
    client = patch(
        OpenAI(
            api_key="",
            base_url="https://openrouter.ai/api/v1",
            default_headers={
                "Authorization": f"Bearer {api_key}",
            },
        ),
        mode=instructor.Mode.JSON,
    )
    explanation = client.chat.completions.create(
        model="mistralai/mistral-7b-instruct:free",
        response_model=Explanation,
        messages=[
            {
                "role": "system",
                "content": "You are an expert translator tasked with breaking down the translation of a document for your client. You must perform two tasks: first, you should break down the translation into the smallest logical components, whether that is a word, phrase or a full sentence, that can be matched from one language to the other. Return the breakdown in the form of a list of tuples, where each tuple contains the original text and the translated text. Second, you should identify any challenges, difficulties or quirks that are relevant in translating between the two given languages in the two snippets. Explain these challenges in a way that is understandable to a layperson who only speaks English.",
            },
            {
                "role": "user",
                "content": "Original text in English: Hey, I just met you\n\nTranslated text in French: Hé, je viens de te rencontrer",
            },
        ],
    )

    print(explanation)


if __name__ == "__main__":
    main()
