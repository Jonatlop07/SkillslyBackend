/* create schema if not exists skillsly_story;

show search_path;

set search_path to skillsly_story; */

CREATE TABLE IF NOT EXISTS skillsly_story.story
(
    story_id        TEXT PRIMARY KEY NOT NULL,
    owner_id        TEXT NOT NULL,
    description     TEXT,
    media_locator   TEXT,
    created_at      TIMESTAMPTZ NOT NULL
);