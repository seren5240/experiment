import os
import requests
import json

api_key = os.getenv("OPENROUTER_API_KEY")
response = requests.post(
    url="https://openrouter.ai/api/v1/chat/completions",
    headers={
        "Authorization": f"Bearer {api_key}",
    },
    data=json.dumps(
        {
            "model": "mistralai/mistral-7b-instruct:free",
            "messages": [{"role": "user", "content": "What is the meaning of life?"}],
        }
    ),
)

print(response.json())
