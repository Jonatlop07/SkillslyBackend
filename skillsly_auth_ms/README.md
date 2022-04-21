# Auth microservice

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

### Without auth token
- **Create user:** `POST to http://localhost:PORT/auth/user`  
*Body:* `{ "email": "...", "password": "..." }`
- **Login:** `POST to http://localhost:PORT/auth/login`  
*Body:* `{ "email": "...", "password": "..." }`
- **Request password reset:** `PATCH to http://localhost:PORT/auth/request-reset-password`  
*Body:* `{ "email": "..." }`
- **Reset password:** `PATCH to http://localhost:PORT/auth/reset-password/<token>`  
*Body:* `{ "password": "..." }`
### Auth token needed
- **Update credentials:** `PATCH to http://localhost:PORT/auth/user/<user_id>`  
*Body:* `{ "id": "...UUIDv4...", "email": "...", "password": "..." }`
- **Delete user:** `DELETE to http://localhost:PORT/auth/user/<user_id>?password=<password>`
- **Generate Two Factor Auth QR code:** `POST to http://localhost:PORT/2fa/generate`
- **Turn on Two Factor Auth:** `POST to http://localhost:PORT/2fa/turn-on`  
*Body:* `{ "code": "..." }`
- **Authenticate with Two Factor:** `POST to http://localhost:8000/2fa/authenticate`  
*Body:* `{ "code": "..." }`
