from bs4 import BeautifulSoup
import requests

url = "https://www.cbsnews.com/boston/news/ntsb-report-jetblue-hop-a-jet-close-call-logan-airport-boston-february-27/"


def main():
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    print(soup.get_text())


main()
