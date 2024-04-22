import asyncio
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.realpath(__file__))))

from model.db import get_managed_db_session  # noqa: E402
from model.article import fetch_latest_article  # noqa: E402
from summarize import get_html_text, summarize  # noqa: E402


async def main():
    index = int(sys.argv[1])
    print(f"Using index: {index}")
    async with get_managed_db_session() as session:
        latest = await fetch_latest_article(session)
        headlines = latest.headlines
        url = headlines["articles"][index]["url"]
        print(url)
        text = await get_html_text(url)
        print(text)
        summary = await summarize(text)
        print(summary)
        latest.summary = summary
        latest.url = url
        latest.text_content = text
        session.add(latest)
        await session.commit()


asyncio.run(main())
