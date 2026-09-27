#!/usr/bin/env bash
# Build, tag and push the api/web images to ECR, then force a new ECS deployment.
# Requires: aws CLI configured, docker, and terraform already applied once
# (so the ECR repositories and ECS services referenced below exist).
set -euo pipefail

AWS_REGION="${AWS_REGION:-ap-southeast-1}"
PROJECT="${PROJECT:-esports-tournament}"
ENVIRONMENT="${ENVIRONMENT:-production}"
IMAGE_TAG="${IMAGE_TAG:-$(git rev-parse --short HEAD)}"

ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
REGISTRY="${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

aws ecr get-login-password --region "$AWS_REGION" | docker login --username AWS --password-stdin "$REGISTRY"

for svc in api web; do
  repo="${REGISTRY}/${PROJECT}/${svc}"
  docker build -t "${repo}:${IMAGE_TAG}" "./src/${svc}"
  docker push "${repo}:${IMAGE_TAG}"
done

aws ecs update-service --cluster "${PROJECT}-${ENVIRONMENT}" --service "${PROJECT}-${ENVIRONMENT}-api" --force-new-deployment --region "$AWS_REGION"
aws ecs update-service --cluster "${PROJECT}-${ENVIRONMENT}" --service "${PROJECT}-${ENVIRONMENT}-web" --force-new-deployment --region "$AWS_REGION"

echo "Deployed image tag: ${IMAGE_TAG}"
