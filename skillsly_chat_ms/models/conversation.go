package models

import "time"

type Conversation struct {
	CreatorUserID string
	Name          string
	Description   string
	Members       []Member
	Messages      []Message
	CreatedAt     time.Time
	UpdatedAt     time.Time
	IsPrivate     bool
}
