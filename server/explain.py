import os
from pydantic import BaseModel
from instructor import patch
from openai import OpenAI
import instructor


class UserInfo(BaseModel):
    name: str
    age: int


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
        response_model=UserInfo,
        messages=[{"role": "user", "content": "John Doe is 30 years old."}],
    )

    print(explanation.name)
    print(explanation.age)


if __name__ == "__main__":
    main()
