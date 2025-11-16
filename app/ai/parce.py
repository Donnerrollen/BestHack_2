import csv
import torch


def parse_embs():
    embeddings = []
    addreses = []
    with open("embdb.csv", encoding="utf-8") as csv_file:
        reader = csv.reader(csv_file)
        for i, row in enumerate(reader):
            if len(row) > 1:
                try:
                    emb_str = row[4].strip()
                    address, lat, lon = row[1], row[2], row[3]
                    if emb_str.startswith("[") and emb_str.endswith("]"):
                        emb_str = emb_str[1:-1]
                    emb_list = [float(x.strip()) for x in emb_str.split(",")]
                    embeddings.append(emb_list)
                    addreses.append((id, address, lat, lon))
                except ValueError as e:
                    print(f"Ошибка в строке {i}: {e}")
                    continue
    return addreses, torch.tensor(embeddings)
