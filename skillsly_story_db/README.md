# Story Database

PostgreSQL database:

- Download postgres image and run with: `docker run --name skillsly_story_db -e POSTGRES_DB=skillsly_story_db -e POSTGRES_USER=skillsly -e POSTGRES_PASSWORD=story -d postgres`
- Execute with: `docker exec -it skillsly_story_db psql -d skillsly_story_db -U skillsly`

- Setup:
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