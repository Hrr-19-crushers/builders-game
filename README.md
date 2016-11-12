## Instructions for running this repo:

1. `npm run watch-server` this will build the server using tsc and watch for changes
2. `npm run watch-client`: this will bundle the client using webpack and watch for changes
3. `npm start`: this will start the production server at build/server/server.js
4. `npm run dev-server`: this will serve the client files using webpack-dev-server.  
If you’re just working on the server side you don’t need this, but if you’re working on the 
client it gives allows you to have Hot Module Reloading (which is useful for React development).  
In production, the webpage and api info will be served from the same server, but in development 
we use a seperate WDS to allow HMR.