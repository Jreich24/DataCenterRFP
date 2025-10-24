#!/bin/bash

# This script sets up the project environment by installing dependencies for both client and server.

# Navigate to the client directory and install dependencies
cd client
npm install

# Navigate to the server directory and install dependencies
cd ../server
npm install

# Return to the root directory
cd ..

echo "Project setup complete. Dependencies installed for both client and server."