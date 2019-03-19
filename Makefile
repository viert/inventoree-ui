CONTAINER_NAME = inventoree-ui-builder

all:
	docker build -t $(CONTAINER_NAME) . && docker run -it $(CONTAINER_NAME)
