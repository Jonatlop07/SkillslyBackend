CREATE SCHEMA IF NOT EXISTS skillsly_notification;
SET search_path TO skillsly_notification;

CREATE TABLE IF NOT EXISTS skillsly_notification.notification
(
    id		                    UUID PRIMARY KEY NOT NULL,
    notification_resource_id    UUID NOT NULL,
    notifier_id                 UUID NOT NULL,
    status                      TINYINT NOT NULL,
    FOREIGN KEY (notification_resource_id) REFERENCES skillsly_notification.notification_resource(id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS skillsly_notification.notification_resource
(
    id                  UUID PRIMARY KEY NOT NULL,
    resource_type_id    UUID NOT NULL,
    resource_id         UUID NOT NULL,
    created_at          TIMESTAMPTZ NOT NULL,
    status              TINYINT NOT NULL
);

CREATE TABLE IF NOT EXISTS skillsly_notification.notification_change
(
    id		                    UUID PRIMARY KEY NOT NULL,
    notification_resource_id    UUID NOT NULL,
    actor_id                    UUID NOT NULL,
    status                      TINYINT NOT NULL,
    FOREIGN KEY (notification_resource_id) REFERENCES skillsly_notification.notification_resource(id)
    ON DELETE CASCADE
);
