# CS GO stat finder by Thomas Countoures
A small web app built with AngularJS, Express, Node.js and MongoDB. Type a user name or steam ID into the search bar to get user statistics.

# instructions
Please clone repo and do the following:

1. Go to root folder with package.json file.

`npm install`

2. Mongo Restore the database files.

`mongorestore -d battlefy /location/of/mongo/dump/`

3. Run node server through node or grunt.

`node server.js` or `grunt nodemon`

4. Go to port 8000 of your localhost.

`http://localhost:8000/`

# api

I've constructed a small internal API to hold the most recent users viewed. Route is accessibile at:

`/api/recentPlayers`

# development screenshots




