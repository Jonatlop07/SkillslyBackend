# Story microservice

## Windows setup  

Follow these steps to get the microservice running locally, on your computer:  

1. Download [rustup](https://www.rust-lang.org/tools/install)
2. Run `cargo install sqlx-cli`
3. Run `sqlx database setup --database_url postgresql://user:password@host/db_name`
4. Set `$env:DATABASE_URL='postgresql://user:password@host/db_name'`
5. Run `cargo run --bin httpd`

## Available requests

Once the service is running, these are the currently available requests:

- **Create story:** `POST to http://localhost:8000/stories`
  - *Body:* `{ "owner_id": "...UUIDv4...", "description": "...", "media_locator": "..." }`
- **Query story:** `GET to http://localhost:8000/stories/<story_id>`
- **Query stories of user:** `GET to http://localhost:8000/user/<user_id>/stories`
- **Delete story:** `DELETE to http://localhost:8000/stories/<story_id>`