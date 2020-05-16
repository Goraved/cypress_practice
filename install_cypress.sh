#!/usr/bin/env bash

# Install node and npm

# Linux
#sudo apt install nodejs
#sudo apt install npm

# Mac
brew install node

node -v
npm -v

npm i cypress --save-dev
npm install mocha

npx cypress open
