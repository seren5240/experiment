import sys
from db import session
from model.base import Translation


def get_translation(id: str) -> Translation:
    id = sys.argv[1]
    return session.get(Translation, id)
