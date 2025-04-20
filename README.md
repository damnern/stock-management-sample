# stock-management-sample

## This project contains tech stacks of:
- Node.js using ES Module
- MySLQ

## Also includes:
- Docker for easy deploment.
- phpMyAdmin to inspect the database.
- Postman collection for API Testing.

## Implemented Features:
- Stock management system to keeps track tasks.
- Basic user database with Roles.
- Some tasks can record additional details for further usage.
- Task can be updated by ID or its unique serial.
- MySQL Relational database with triggers.

________
## How to deploy and test on your Windows locally.
1. Clone this git or simply Download .zip and extract at your desired path.
2. Ready your Docker Desktop from https://www.docker.com/ for easy inspection.
3. Open your Command Prompt (cmd) and use cd to locate to clone project path. Such as 
	```
	cd D:\Github\stock-management-sample
	```
4. Run compose command
	```
	docker compose up -d
	```
5. Wait for Docker to setup the project environment.
6. Once setup is done. Now you can try to access phpMyAdmin via http://localhost:8081/ using defalt username/password
	```
	Username: root
	Password: rootPassword
	```
> You can check "stockManageDB" for tables, ready to serve.

7. http://localhost:5000/ to access the stock management API.
> You can try http://localhost:5000/greet to check if the server is ready for operation.

## Test the API with Postman collection:
At this state, you can use [Postman](https://www.postman.com/) to test the API.
- Import _stock-management-sample-API.postman_collection_ for API samples.
- Import _Local Dev.postman_environment_ for basic Environments.
- Access requests in your Postmand along with inspect at [phpMyAdmin](http://localhost:8081/) to see its function.

________
### To be implement
- Authetication accord to user's role.
- React webpage frontend
- Additional logs