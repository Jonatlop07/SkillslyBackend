CREATE SCHEMA IF NOT EXISTS skillsly_user;
SET search_path TO skillsly_user;

CREATE TABLE IF NOT EXISTS skillsly_user.user
(
    id		                    UUID PRIMARY KEY NOT NULL,
    email	                    VARCHAR(125) NOT NULL,
    name                        TEXT NOT NULL,
    date_of_birth               TEXT NOT NULL,
    gender                      TEXT NOT NULL CHECK (gender IN ('Male', 'Female', 'Other')),
    created_at                  TIMESTAMPTZ NOT NULL,
    updated_at                  TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS skillsly_user.user_relationship
(
    follower_id     UUID NOT NULL,
    following_id    UUID NOT NULL,
    status          TEXT NOT NULL CHECK (status IN ('Pending', 'Following')),
    accepted_at     TIMESTAMPTZ,
    PRIMARY KEY (follower_id, following_id),
    FOREIGN KEY (follower_id) REFERENCES skillsly_user.user(id)
    ON DELETE CASCADE
    FOREIGN KEY (following_id) REFERENCES skillsly_user.user(id)
    ON DELETE CASCADE
);
