# Dinner Plan
Webapp for meal planning written in meteor.js, deployed at dinner-plan.herokuapp.com

## Set up environment

1. Install meteor.
2. Install node 4.9.1. 
   - New version throws errors when trying to install chimp, since the fibers package doesn't seem to work anymore. 
   - Node 5 installs but with a few strange printouts, and then hangs when trying to run chimp.
   Use nvm to easily switch between versions.
3. `npm install`

## Running the server

1. `meteor`
2. Go to localhost:3000 in a browser.

## Running tests

1. Make sure node 4.9.1 is chosen with `node --version`
2. `./chimp_all.sh`
