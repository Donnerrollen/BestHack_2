include .env

DOCKER_COMPOSE=docker compose -f docker-compose.yml
DOCKER_COMPOSE_RUN=${DOCKER_COMPOSE} run --rm app

build:
	- $(DOCKER_COMPOSE) -f docker-compose.yml build

up:
	- docker compose -f docker-compose.yml up --build
	- docker compose down

prod:
	- docker compose -f docker-compose-prod.yml up --build
	- docker compose down

test:
	- docker compose -f docker-compose-test.yml up --build
	- docker compose down

lint:
	- poetry run ruff check .

format:
	- poetry run ruff format .

fix:
	- poetry run ruff check --fix .
	- poetry run ruff format .

typecheck:
	- poetry run pyright .

