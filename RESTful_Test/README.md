# RESTful DnD Test with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Create and setup database settings inside `ormconfig.json` file (Further details below)
3. Run `npm start` command

Dependancies:

TypeORM with MySQL Driver (https://github.com/typeorm/typeorm#quick-start)
NodeJS (https://nodejs.org/en/)
MySQL Database (https://www.mysql.com/)
Axios Javascript Library (https://github.com/axios/axios)



Rough Notes (edit down later):

API: https://www.dnd5eapi.co/
ORM: TypeORM
TO-DO-LIST:
	- Create Spell Entity
	- Add test entity to database
	- GET spell data from DnD RESTful API above
	- Parse data into Spell Entity
	- Save data
	- Retrieve/lookover data
	- Create Unit Tests:
		- Test HTTP GET retrieval
		- Test Spell Entity fields
		- Test Spell Entity saving
		- Others?
	- Improve README.md (don't forget to mention left out database setting file)