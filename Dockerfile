FROM python:3.13-slim AS base

WORKDIR /app

ENV POETRY_HOME=/opt/poetry
ENV PATH="$POETRY_HOME/bin:$PATH"

RUN apt update && \
  apt install -y curl && \
  curl -sSL https://install.python-poetry.org | python - --version 2.1.2 && \
  poetry --version

FROM base AS development

COPY poetry.lock pyproject.toml ./
RUN poetry config virtualenvs.create false && \
  poetry install --no-interaction --no-cache --no-root

COPY ./embdb.csv ./embdb.csv
COPY ./output_model/ ./output_model/
COPY main.py ./
COPY ./app ./app

CMD ["/bin/bash", "-c", "python main.py"]


FROM base AS production

COPY poetry.lock pyproject.toml ./
RUN poetry config virtualenvs.create false && \
  poetry install --without dev --no-interaction --no-cache --no-root

COPY ./embdb.csv ./embdb.csv
COPY ./output_model/ ./output_model/
COPY main.py ./
COPY ./app ./app

CMD ["/bin/bash", "-c", "python main.py"]
