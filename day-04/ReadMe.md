This is Day-04 of Learning Backend.

* A proper folder structure is important because it improves code readability, scalability, and maintenance.
* The app.js file is created in src folder here we usually create server and config server.
* The server.js file is created in root folder here we usually start the server.

> "dev": "npx nodemon server.js" <= This is custom command to run server.js in terminal written in package.json file with in "scripts"


* req.params in DELETE API
* req.params is used to read values from the URL path.
* In /notes/:index, index is a dynamic parameter that tells the server which note to delete.
* Why use params and not body?
> Params are used to identify a resource (best for GET / DELETE)
,
> Body is used to send data (used in POST / PUT)
,
> Use URL params to select a resource and request body to send data


* PATCH  method is used to update an existing note without creating a new one.
* It Works => :index is a URL parameter that identifies which note to update, req.body contains the new data (title and description)
* Why PATCH ?
> PATCH is used for partial updates without replacing the entire data, Use params to select the resource, Use body to send updated values



📘 Today i learned =>
1. How to use DELETE method to remove a specific resource using URL params.
2. Understood PATCH method to update specific fields of existing data.
3. Learned the use of req.params to identify which resource to modify.
4. Used req.body to send update data to the server.
5. Followed REST API best practices for updating and deleting data.
