import sys
import requests

if len(sys.argv) < 2:
    print("Please provide an API key")
    sys.exit()

api_key = sys.argv[1]
url = "https://skyscanner80.p.rapidapi.com/api/v1/flights/search-roundtrip"

querystring = {
    "fromId": "eyJzIjoiTllDQSIsImUiOiIyNzUzNzU0MiIsImgiOiIyNzUzNzU0MiIsInAiOiJDSVRZIn0=",
    "toId": "eyJzIjoiTEFYQSIsImUiOiIyNzUzNjIxMSIsImgiOiIyNzUzNjIxMSIsInAiOiJDSVRZIn0=",
    "departDate": "2024-04-11",
    "returnDate": "2024-04-18",
    "adults": "1",
    "currency": "USD",
    "market": "US",
    "locale": "en-US",
}

headers = {
    "X-RapidAPI-Key": api_key,
    "X-RapidAPI-Host": "skyscanner80.p.rapidapi.com",
}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
