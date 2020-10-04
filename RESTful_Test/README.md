# RESTful DnD Test with TypeORM

Dependancies:

TypeORM with MySQL Driver (https://github.com/typeorm/typeorm#quick-start)
Reflect-Metadata (https://www.npmjs.com/package/reflect-metadata)
MySQL Database (https://www.mysql.com/)
Axios Javascript Library (https://github.com/axios/axios)

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file (Explained in 'Database Notes' below)
3. Run `npm start` command

Database Notes:

As per security reasons, there is a database linkign file left out of the GitHub repo: ormconfig.json. This file is installed by default upon npm'ing TypeORM, and all that needs to be done is follow these steps to connect TypeORM to the backend database: https://github.com/typeorm/typeorm#quick-start

Rough Notes (edit down later):

API: https://www.dnd5eapi.co/
ORM: TypeORM
TO-DO-LIST:
	- Parse data into Spell Entity
	- Save data
	- Retrieve/lookover data
	- Create Unit Tests:
		- Test HTTP GET retrieval
		- Test Spell Entity fields
		- Test Spell Entity saving
		- Others?
	- Improve README.md (don't forget to mention left out database setting file)