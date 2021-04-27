# 项目名
NAME = shs
# 目标主机内容存放目录
CONTENT_PATH = /data/release
# 使用的docker镜像
DOCKER_IMAGE = styd/node:8.12.0

pull-image:
	docker pull $(DOCKER_IMAGE)


# below are ci flows
build:pull-image
	docker run -i --rm \
	--cpus=2 \
	--dns=101.132.119.70 \
	-v $(PWD):/app \
	$(DOCKER_IMAGE) \
	npm run ci

# 同步文件
# @params {to} 推送服务器主机名
# @example :: make rsync to=saas-dev
rsync:
	ssh $(to) -t "mkdir -p $(CONTENT_PATH)/$(NAME)"
	rsync -auz --exclude=.git --exclude=frontend/node_modules $(PWD)/ $(to):$(CONTENT_PATH)/$(NAME)
	ssh $(to) -t "sudo chmod -R 777 $(CONTENT_PATH)/$(NAME)"

# 执行启动服务
# @params {to} 推送服务器主机名
# @example :: make release to=saas-dev
release:
	ssh $(to) -t "source /etc/profile && cd $(CONTENT_PATH)/$(NAME) && npm start"

clean:
	sudo docker run -i --rm \
	-v $(PWD):/app \
	$(DOCKER_IMAGE) \
	rm -rf ./node_modules/ ./frontend/node_modules/
