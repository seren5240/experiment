from sentence_transformers import SentenceTransformer, util


def main():
    model = SentenceTransformer("all-MiniLM-L6-v2")

    sentence1 = "This is a sentence."
    sentence2 = "This is a different sentence."

    # Compute embedding for both lists
    embeddings1 = model.encode(sentence1, convert_to_tensor=True)
    embeddings2 = model.encode(sentence2, convert_to_tensor=True)

    # Compute cosine similarity
    cosine_scores = util.pytorch_cos_sim(embeddings1, embeddings2)

    print("Sentence 1:", sentence1)
    print("Sentence 2:", sentence2)
    print("Cosine similarity:", cosine_scores.item())


def compute_similarity(sentence1: str, sentence2: str) -> float:
    model = SentenceTransformer("all-MiniLM-L6-v2")

    embeddings1 = model.encode(sentence1, convert_to_tensor=True)
    embeddings2 = model.encode(sentence2, convert_to_tensor=True)

    cosine_scores = util.pytorch_cos_sim(embeddings1, embeddings2)

    return cosine_scores.item()


# if directly invoking as __main__ then call the function main
if __name__ == "__main__":
    main()
