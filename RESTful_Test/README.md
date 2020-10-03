# RESTful DnD Test with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Create and setup database settings inside `ormconfig.json` file (Example at https://github.com/typeorm/typeorm#quick-start)
3. Run `npm start` command


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