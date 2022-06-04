CREATE SCHEMA IF NOT EXISTS skillsly_auth;
SET search_path TO skillsly_auth;

CREATE TABLE IF NOT EXISTS skillsly_auth.user
(
    id		                    UUID PRIMARY KEY NOT NULL,
    email	                    VARCHAR(125) NOT NULL,
    password                    TEXT NOT NULL,
    access_token                TEXT,
    two_factor_auth_secret      TEXT,
    updated_at                  TIMESTAMPTZ,
    is_two_factor_auth_enabled  BOOLEAN NOT NULL,
    reset_password_token        TEXT
);
