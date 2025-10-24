#!/bin/bash

# Build the client
cd client
npm install --legacy-peer-deps
DISABLE_ESLINT_PLUGIN=true npm run build
cd ..

echo "Build completed successfully"
