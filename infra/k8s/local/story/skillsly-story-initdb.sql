CREATE SCHEMA IF NOT EXISTS skillsly_story;
SET search_path TO skillsly_story;

CREATE TABLE IF NOT EXISTS skillsly_story.story
(
    story_id        TEXT PRIMARY KEY NOT NULL,
    owner_id        TEXT NOT NULL,
    description     TEXT,
    media_locator   TEXT,
    created_at      TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS skillsly_story.story_view
(
    story_id        TEXT NOT NULL,
    viewer_id       TEXT NOT NULL,
    viewed_at      TIMESTAMPTZ NOT NULL,
    PRIMARY KEY (story_id, viewer_id),
    FOREIGN KEY (story_id) REFERENCES skillsly_story.story(story_id)
    ON DELETE CASCADE
);