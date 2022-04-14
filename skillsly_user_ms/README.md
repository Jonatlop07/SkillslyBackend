# User microservice

## Windows setup

Follow these steps to get the microservice running locally, on your computer:

1. Download [nvm](https://github.com/coreybutler/nvm-windows/releases)
2. Run `nvm use 16.11.1`
3. Run `npm install`
4. Run `npm start` or `npm start:dev` to watch for changes

## Docker

- Get the service and its database up and running with `docker compose up`

## Available requests

Once the service is running, these are the currently available requests:

Depending on whether the service is running locally or in docker, PORT is 3000 or 8000, respectively.

- **Create user account:** `POST to http://localhost:PORT/user/account`  
*Body:* `{ "email": "...", "name": "...", "date_of_birth": "...", "gender": "..." }`
- **Query user account:** `GET to http://localhost:PORT/user/account/<user_id>`
- **Update user account:** `PUT to http://localhost:PORT/user/account/<user_id>`  
*Body:* `{ "email": "...", "name": "...", "date_of_birth": "...", "gender": "..." }`
- **Delete user account:** `DELETE to http://localhost:PORT/user/account/<user_id>`
- **Search users:** `GET to http://localhost:PORT/user?email=email&name=name&limit=limit&offset=offset`
- **Create follow user request:** `POST to http://localhost:PORT/user/<user_id>/follow/<user_to_follow_id>`
- **Update follow user request:** `PUT to http://localhost:PORT/user/<user_id>/follow/<user_that_requests_id>`  
*Body:* `{ "accept": boolean }`
- **Delete follow user request:** `DELETE to http://localhost:PORT/user/<user_id>/follow/<user_to_follow_id>`
- **Query follow user request collection:** `GET to http://localhost:PORT/user/:user_id/follow`
