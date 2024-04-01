import asyncio
import os
import aiohttp
from pydantic import BaseModel, Field

from schema import TranslationStep
from languages import language_code_to_name


class Explanation(BaseModel):
    challenges: str = Field(
        "Relevant challenges in translating between the given languages in the two snippets."
    )


async def explain(input: TranslationStep, output: TranslationStep) -> str:
    api_key = os.getenv("OPENROUTER_API_KEY")
    input_lang = language_code_to_name(input.language)
    output_lang = language_code_to_name(output.language)
    payload = {
        "model": "mistralai/mistral-7b-instruct:free",
        "messages": [
            {
                "role": "system",
                "content": """You are an expert translator tasked with breaking down the translation of a document for your client.
You are tasked with identifying any challenges, difficulties or quirks that are relevant in translating between the given languages in the two snippets.
Explain these challenges in a way that is understandable to a layperson who only speaks English.""",
            },
            {
                "role": "user",
                "content": f"""Original text in {input_lang}:
{input.text}

Translated text in {output_lang}:
{output.text}""",
            },
        ],
    }
    headers = {
        "Authorization": f"Bearer {api_key}",
    }
    async with aiohttp.ClientSession() as session:
        response = await session.post(
            url="https://openrouter.ai/api/v1/chat/completions",
            json=payload,
            headers=headers,
        )
        data = await response.json()
        return data["choices"][0]["message"]["content"]


async def main():
    explanation = await explain(
        TranslationStep(text="Hey, I just met you", language="en"),
        TranslationStep(text="Hé, je viens de te rencontrer", language="fr"),
    )
    print(explanation)


# Instructor not working
#     client = patch(
#         OpenAI(
#             api_key="",
#             base_url="https://openrouter.ai/api/v1",
#             default_headers={
#                 "Authorization": f"Bearer {api_key}",
#             },
#         ),
#         mode=instructor.Mode.JSON,
#     )
#     explanation = client.chat.completions.create(
#         model="mistralai/mistral-7b-instruct:free",
#         response_model=Explanation,
#         messages=[
#             {
#                 "role": "system",
#                 "content": """You are an expert translator tasked with breaking down the translation of a document for your client.
# You are tasked with identifying any challenges, difficulties or quirks that are relevant in translating between the two given languages in the two snippets.
# Explain these challenges in a way that is understandable to a layperson who only speaks English. Return ONLY valid JSON.""",
#             },
#             {
#                 "role": "user",
#                 "content": "Original text in English: Hey, I just met you\n\nTranslated text in French: Hé, je viens de te rencontrer",
#             },
#         ],
#     )

#     print(explanation)


if __name__ == "__main__":
    asyncio.run(main())
