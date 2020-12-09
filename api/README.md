## Getting Started

To get up and running with this project, run the following commands from the root of the folder that contains this README file.

First, install the project's dependencies using `npm`.

```
npm install
```

Second, seed the SQLite database.

```
npm run seed
```

And lastly, start the application.

```
npm start
```

To test the Express server, browse to the URL [http://localhost:5000/](http://localhost:5000/).

### Testing the routes

- If you haven’t already, install Postman. Links and instructions are available on their website at 
https://www.getpostman.com/.
- Once you have Postman installed and open, click on the “Import” button in the top left hand corner of the 
application’s window.
- In the opened dialog, click the “Choose Files” button and browse to the folder that contains your project files.
- Select the RESTAPI.postman_collection.json file.
- You should now see the FSJS Techdegree: REST API Project collection in the left hand pane of the main Postman window.
- Click on one of the available requests to load it into a tab. Click on the Send button to issue the request to the 
local server.
- When testing routes that require authentication, make sure to set the Authorization Type in postman to Basic Auth to 
enter the user's username (their email address) and password.