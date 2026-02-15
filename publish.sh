#!/bin/bash

# --- Configuration ---
REGISTRY="oci.private.flyp.si"
IMAGE_NAME="bongo"
TAG="latest"
FULL_IMAGE="$REGISTRY/$IMAGE_NAME:$TAG"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Starting Build & Push (Legacy Mode) for: $FULL_IMAGE${NC}"

export DOCKER_BUILDKIT=1

echo -e "${BLUE}🔨 Building image...${NC}"
docker buildx build -t "$FULL_IMAGE" .

if [ $? -ne 0 ]; then
    echo "❌ Error during build."
    exit 1
fi

# 2. Pushing
echo -e "${BLUE}☁️  Uploading image...${NC}"
docker push "$FULL_IMAGE"

if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ Done! Image is online.${NC}"
else
  echo "❌ Error during upload."
  exit 1
fi
