#!/bin/bash

set -e

IMAGE_NAME=registry.cn-shenzhen.aliyuncs.com/lnktech/h5edit-ui
IMAGE_TAG=latest
echo "构建包（要发布到npm上的包[packags.json中private不为true的]，每次修改完都需要执行此命令，以供其他包引用最新的内容）"
npm run build
echo "开始运行 npm run webpack..."
npm run webpack
echo "开始构建 Docker 镜像..."
docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
echo "将镜像推送到仓库..."
docker push ${IMAGE_NAME}:${IMAGE_TAG}
echo "镜像构建并推送完成：${IMAGE_NAME}:${IMAGE_TAG}"
# docker build -t registry.cn-shenzhen.aliyuncs.com/lnktech/h5edit-ui:latest .
# docker push registry.cn-shenzhen.aliyuncs.com/lnktech/h5edit-ui:latest