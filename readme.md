
# Setting up the app #

## Back-end ##
* Start your mongo-db server in terminal
* Connect to the db server in Mongo DB compass
* **npm start** in back-end folder 
  * This runs nodemon. Another alternative is **node index.js** in the same folder
* The express app runs at http://localhost:3900

#### Back-end node libraries used in this project ###
1. express
2. joi & joi-objectid (for validation)
3. lodash (utility)
4. bcrypt (hashing passwords)
5. cors (to allow cross-origin requests)
6. jsonwebtoken (authenticating http requests)
7. mongoose (connecting to Mongo DB)
8. config

## UI ##
* **npm start** in ui folder
* Server will run at http://localhost:3000

#### Front-end libraries used in this project ###
1. axios (for sending http requests)
2. bootstrap (css and themes
3. font-awesome 
4. joi-browser (for validation)
5. jwt-decode (for JWT authetication)
6. react-router-dom (for setting navigation routes in React)
7. react-toastify (for showing toasts)
