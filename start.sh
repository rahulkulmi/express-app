#!/bin/bash

cd /express-app
npm install

pm2-docker process.yml
