# Story microservice

## Windows setup  

Follow these steps to get the microservice running locally, on your computer:  

1. Download [rustup](https://www.rust-lang.org/tools/install)
2. Run `cargo install sqlx-cli`
3. Run `sqlx database setup --database_url postgresql://user:password@host/db_name`
4. Set `$env:DATABASE_URL='postgresql://user:password@host/db_name'`
5. Run `cargo run --bin httpd`

## Docker

### PostgreSQL database:

- Download postgres image and run with: `docker run -d --name skillsly_story_db -e POSTGRES_DB=skillsly_story_db -e POSTGRES_USER=skillsly -e POSTGRES_PASSWORD=story -p 35003:5432 postgres`
- Execute with: `docker exec -it skillsly_story_db psql -d skillsly_story_db -U skillsly`
- Type:
  - `CREATE SCHEMA skillsly_story;`
  - `SHOW search_path;`
  - `SET search_path TO skillsly_story;`
  - `CREATE TABLE skillsly_story.story
    (
    story_id        TEXT PRIMARY KEY NOT NULL,
    owner_id        TEXT NOT NULL,
    description     TEXT,
    media_locator   TEXT,
    created_at      TIMESTAMPTZ NOT NULL
    );`
  - `CREATE TABLE IF NOT EXISTS skillsly_story.story_view
    (
    story_id        TEXT PRIMARY KEY NOT NULL,
    viewer_id       TEXT NOT NULL,
    viewed_at      TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (story_id) REFERENCES skillsly_story.story(story_id)
    ON DELETE CASCADE
    );`
  - `\q` to close the CLI
  - `docker inspect skillsly_story_db` to query container's ip address

### Microservice container

- Build with: `docker build -t skillsly_story_ms .`
- Run with: `docker run --name skillsly_story_ms -d -p 8003:8000 -e DATABASE_URL=postgresql://skillsly:story@172.17.0.2/skillsly_story_db skillsly_story_ms`
- To see logs: `docker logs -f <container_id>`. Use `docker ps` to get the container id

## Available requests

Once the service is running, these are the currently available requests:

Depending on whether the service is running locally or in docker, PORT is 8000 or 8003, respectively.

- **Create story:** `POST to http://localhost:PORT/stories`
*Body:* `{ "owner_id": "...UUIDv4...", "description": "...", "media_locator": "..." }`
- **Query story:** `GET to http://localhost:PORT/stories/<story_id>?viewer_id=<viewer_id>`
- **Query stories of user:** `GET to http://localhost:PORT/user/<user_id>/stories`
- **Delete stories of user:** `DELETE to http://localhost:PORT/user/<user_id>/stories`
- **Delete story:** `DELETE to http://localhost:PORT/stories/<story_id>`
