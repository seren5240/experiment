import json
import os
import unittest


def language_code_to_name(code: str) -> str:
    with open(
        f"{os.path.dirname(os.path.abspath(__file__))}/scripts/languages.json"
    ) as f:
        languages = json.load(f)
        return languages["translation"][code]["name"]


class TestLanguageMethods(unittest.TestCase):
    def test_returns_correct_language_name(self):
        self.assertEqual(language_code_to_name("en"), "English")
        self.assertEqual(language_code_to_name("zh-Hant"), "Chinese Traditional")
        self.assertEqual(language_code_to_name("pt-PT"), "Portuguese (Portugal)")
