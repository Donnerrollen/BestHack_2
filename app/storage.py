from torch import Tensor


class Storage:
    TENSORS: Tensor
    ADDRESES: list[tuple[str, float, float]]


storage = Storage()
