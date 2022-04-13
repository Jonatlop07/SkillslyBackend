CREATE SCHEMA IF NOT EXISTS skillsly_story;
SET search_path TO skillsly_story;

CREATE TABLE IF NOT EXISTS skillsly_story.story
(
    story_id        UUID PRIMARY KEY NOT NULL,
    owner_id        UUID NOT NULL,
    description     TEXT,
    media_locator   TEXT,
    created_at      TIMESTAMPTZ NOT NULL
);
