import json
import os


def main():
    with open(f"{os.path.dirname(os.path.abspath(__file__))}/languages.json") as f:
        languages = json.load(f)
        print(languages)


main()
