import json
import os


def main():
    f = open(f"{os.path.dirname(os.path.abspath(__file__))}/languages.json")
    languages = json.load(f)
    print(languages)


main()
