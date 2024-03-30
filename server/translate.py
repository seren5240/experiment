import os
import sys
import aiohttp

url = "https://microsoft-translator-text.p.rapidapi.com/translate"


async def main():
    if len(sys.argv) < 2:
        print("Please provide an API key")
        sys.exit()

    api_key = sys.argv[1]
    querystring = {
        "to[0]": "fr",
        "api-version": "3.0",
    }

    payload = [
        {"Text": "I would really like to drive your car around the block a few times."}
    ]
    headers = {
        "content-type": "application/json",
        "X-RapidAPI-Key": api_key,
        "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
    }

    response = await aiohttp.post(
        url, json=payload, headers=headers, params=querystring
    )

    print(response.json())


async def translate_text(text: str, language: str, from_language: str) -> str:
    api_key = os.getenv("RAPIDAPI_KEY")
    querystring = {
        "from": from_language,
        "to[0]": language,
        "api-version": "3.0",
    }

    payload = [{"Text": text}]
    headers = {
        "content-type": "application/json",
        "X-RapidAPI-Key": api_key,
        "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
    }

    session = aiohttp.ClientSession()
    response = await session.post(
        url, json=payload, headers=headers, params=querystring
    )
    return response.json()[0]["translations"][0]["text"]


if __name__ == "__main__":
    main()
