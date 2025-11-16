revision: build
	- read -p "Enter revision message: " revision_message && \
	$(DOCKER_COMPOSE_RUN) alembic revision --autogenerate -m "$$revision_message"

upgrade_head: build
	- $(DOCKER_COMPOSE_RUN) alembic upgrade head

upgrade: build
	- read -p "Enter revision: " revision && \
	$(DOCKER_COMPOSE_RUN) alembic upgrade "$$revision"

downgrade: build
	- read -p "Enter revision: " revision && \
	$(DOCKER_COMPOSE_RUN) alembic downgrade "$$revision"

migrate: revision upgrade_head

alembic: build
	- read -p "Enter any command: " command && \
	$(DOCKER_COMPOSE_RUN) alembic "$$command"

upgrade_head_test: build
	- $(DOCKER_COMPOSE_RUN_TESTS) alembic upgrade head