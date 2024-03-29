import sys
import requests

url = "https://microsoft-translator-text.p.rapidapi.com/translate"


def main():
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

    response = requests.post(url, json=payload, headers=headers, params=querystring)

    print(response.json())


if __name__ == "__main__":
    main()
