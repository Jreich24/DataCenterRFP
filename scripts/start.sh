#!/bin/bash

# Navigate to the server directory and start the server
cd server
npm install
npm run start &

# Navigate to the client directory and start the client
cd ../client
npm install
npm run start &

# Wait for both processes to finish
wait