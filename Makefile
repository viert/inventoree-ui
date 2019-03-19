CONTAINER_NAME = inventoree-ui-builder

build:
	docker build -t $(CONTAINER_NAME) . && docker run -it $(CONTAINER_NAME)
