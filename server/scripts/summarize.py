import os
from bs4 import BeautifulSoup
import aiohttp
import asyncio

url = "https://www.cbsnews.com/boston/news/ntsb-report-jetblue-hop-a-jet-close-call-logan-airport-boston-february-27/"


async def main():
    async with aiohttp.ClientSession() as session:
        response = await session.get(url)
        text = await response.text()
        soup = BeautifulSoup(text, "html.parser")
        text = soup.get_text()

        api_key = os.getenv("OPENROUTER_API_KEY")
        payload = {
            "model": "mistralai/mistral-7b-instruct:free",
            "messages": [
                {
                    "role": "system",
                    "content": """You are an expert analyst tasked with summarizing a news article whose text, extracted from the HTML of its webpage, is provided below.
                    Please return a paragraph-long summary of the article. Ignore any extraneous text that may have been extracted from the HTML which is not related to the article.""",
                },
                {
                    "role": "user",
                    "content": f"""Article text:
    {text}""",
                },
            ],
        }
        headers = {
            "Authorization": f"Bearer {api_key}",
        }
        response = await session.post(
            url="https://openrouter.ai/api/v1/chat/completions",
            json=payload,
            headers=headers,
        )
        data = await response.json()
        print(data["choices"][0]["message"]["content"])


asyncio.run(main())
