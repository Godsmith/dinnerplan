#!/usr/bin/env sh
node_modules/.bin/chimp --ddp=http://localhost:3000 --watch --path=tests --webdriverio.waitforTimeout=5000
