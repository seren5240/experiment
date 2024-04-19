import os
from bs4 import BeautifulSoup
import aiohttp
import asyncio


async def get_headlines():
    async with aiohttp.ClientSession() as session:
        api_key = os.getenv("RAPIDAPI_KEY")
        headers = {
            "X-RapidAPI-Key": api_key,
            "X-RapidAPI-Host": "news-api14.p.rapidapi.com",
        }
        response = await session.get(
            "https://news-api14.p.rapidapi.com/top-headlines?language=en",
            headers=headers,
        )
        data = await response.json()
        return data


async def get_html_text(url: str) -> str:
    async with aiohttp.ClientSession() as session:
        response = await session.get(url)
        text = await response.text()
        soup = BeautifulSoup(text, "html.parser")
        text = soup.get_text()
        text = "\n".join([line for line in text.split("\n") if line.strip()])
        return text


async def summarize(text: str) -> str:
    async with aiohttp.ClientSession() as session:
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
        return data["choices"][0]["message"]["content"]


async def main():
    headlines = await get_headlines()
    url = headlines["articles"][0]["url"]
    text = await get_html_text(url)
    print(text)
    summary = await summarize(text)
    print(summary)


if __name__ == "__main__":
    asyncio.run(main())
