## This is Day-06 of Learning Backend. Cohort-2.0

The focus of this day was to **connect a Node.js backend with MongoDB Atlas** using **Mongoose** and to understand **real world database connection and DNS related issues**.


## What I Did

- Created a **MongoDB Atlas cluster**
- Created a **database user** and configured permissions
- Allowed database access from **anywhere (0.0.0.0/0)** in Atlas Network Access
- Connected the database using **MongoDB Compass**
- Installed **mongoose** using npm
- Required mongoose in `server.js`
- Created a database connection function
- Used `mongoose.connect()` with `.then()` to confirm successful connection
- Connected MongoDB with the backend server successfully

## Issue Faced 

While connecting MongoDB using the default **SRV connection string**, I faced DNS related issues:
```txt
mongodb+srv://chetan:<db_password>@cluster0.xksnwyz.mongodb.net/
```
This issue consumed a lot of debugging time and helped me understand system level and DNS related problems.

## To solve the issue 
I used the standard MongoDB connection string (non SRV), which bypasses SRV DNS completely.
```txt
mongodb://DB_USERNAME:DB_PASSWORD@
ac-mqjooxx-shard-00-00.hsfowz7.mongodb.net:27017,
ac-mqjooxx-shard-00-01.hsfowz7.mongodb.net:27017,
ac-mqjooxx-shard-00-02.hsfowz7.mongodb.net:27017/
DB_NAME?ssl=true&replicaSet=atlas-oxxjkl-shard-0&authSource=admin&retryWrites=true&w=majority
```
Using this method, the database connected successfully and the server started working as expected.

## Key Learnings
- MongoDB databases are created automatically when data is inserted
- mongodb+srv:// can fail due to DNS or OS level issues
- Using mongodb:// with shard hosts is a valid, safe, and production ready approach
- Real world backend development often involves debugging environment and system issues
- Persistence and debugging skills are as important as writing code