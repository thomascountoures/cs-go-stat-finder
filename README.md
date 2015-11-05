# CS GO stat finder by Thomas Countoures
A small web app built with AngularJS, Express, Node.js and MongoDB. Type a user name or steam ID into the search bar to get user statistics.

# instructions
Please clone repo and do the following:

Go to root folder with package.json file.

`npm install`

Mongo Restore the database files to your specified database folder (eg. /Users/User/data/db), eg:

`mongorestore -d battlefy /mongodb/battlefy/dump/database/`

Run node server through node or grunt, and make sure mongo is running.

`node server.js` or `grunt nodemon` and
`mongod -f /path/to/config/file`

Go to port 8000 of your localhost.

`http://localhost:8000/`

# api

I've constructed a small internal API to hold the most recent users viewed. Route is accessibile at:

`/api/recentPlayers`

# development screenshots

![alt tag](https://raw.github.com/thomascountoures/project_synergy/screenshots/screenshots/cs1.png)
![alt tag](https://raw.github.com/thomascountoures/project_synergy/screenshots/screenshots/cs2.png)
![alt tag](https://raw.github.com/thomascountoures/project_synergy/screenshots/screenshots/cs3.png)
![alt tag](https://raw.github.com/thomascountoures/project_synergy/screenshots/screenshots/cs4.png)
![alt tag](https://raw.github.com/thomascountoures/project_synergy/screenshots/screenshots/cs5.png)
![alt tag](https://raw.github.com/thomascountoures/project_synergy/screenshots/screenshots/cs6.png)
![alt tag](https://raw.github.com/thomascountoures/project_synergy/screenshots/screenshots/cs7.png)
![alt tag](https://raw.github.com/thomascountoures/project_synergy/screenshots/screenshots/cs8.png)
![alt tag](https://raw.github.com/thomascountoures/project_synergy/screenshots/screenshots/cs9.png)
![alt tag](https://raw.github.com/thomascountoures/project_synergy/screenshots/screenshots/cs10.png)
![alt tag](https://raw.github.com/thomascountoures/project_synergy/screenshots/screenshots/cs11.png)
![alt tag](https://raw.github.com/thomascountoures/project_synergy/screenshots/screenshots/cs12.png)
![alt tag](https://raw.github.com/thomascountoures/project_synergy/screenshots/screenshots/cs13.png)




