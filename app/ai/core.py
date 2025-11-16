from sentence_transformers import SentenceTransformer
from sentence_transformers.util import cos_sim

model = SentenceTransformer("./output_model")


def embed(text: str):
    return model.encode(text, convert_to_tensor=True)


def cos_dit(emb, embeddings):
    cos_scores = cos_sim(emb, embeddings)[0]
    top_results = cos_scores.argsort(descending=True)[:5]
    return top_results

