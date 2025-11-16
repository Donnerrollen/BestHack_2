from sentence_transformers import SentenceTransformer
from sentence_transformers.util import cos_sim
from app.storage import storage

model = SentenceTransformer("cointegrated/rubert-tiny2")


def cos_dit(text):
    emb = model.encode(text.lower(), convert_to_tensor=True)
    cos_scores = cos_sim(emb, storage.TENSORS)[0]
    top_results = cos_scores.argsort(descending=True)[:5]
    return [(i.item(), cos_scores[i.item()].item()) for i in top_results]
