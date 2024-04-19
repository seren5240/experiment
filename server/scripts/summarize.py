from bs4 import BeautifulSoup
import aiohttp
import asyncio

url = "https://www.cbsnews.com/boston/news/ntsb-report-jetblue-hop-a-jet-close-call-logan-airport-boston-february-27/"


async def main():
    async with aiohttp.ClientSession() as session:
        response = await session.get(url)
        text = await response.text()
        soup = BeautifulSoup(text, "html.parser")
        print(soup.get_text())


asyncio.run(main())
