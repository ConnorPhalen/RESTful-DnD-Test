# RESTful DnD Test with TypeORM

Dependancies:

  - TypeORM with MySQL Driver (https://github.com/typeorm/typeorm#quick-start)
  - Reflect-Metadata (https://www.npmjs.com/package/reflect-metadata)
  - MySQL Database (https://www.mysql.com/)
  - Axios Javascript Library (https://github.com/axios/axios)
  - Uses a RESTful API from https://www.dnd5eapi.co/ to gather Spell's

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file (Explained in 'Database Notes' below)
3. Run `npm start` command

# Database Notes:

As per security reasons, there is a database linkign file left out of the GitHub repo: ormconfig.json. This file is installed by default upon npm'ing TypeORM, and all that needs to be done is follow these steps to connect TypeORM to the backend database: https://github.com/typeorm/typeorm#quick-start

# Testing Class Notes:

TestRepo.ts is a sample driver class used to run test CRUD operations on the Spell entity. Just a simple program and small script section to double check the operation of the entity and database.
