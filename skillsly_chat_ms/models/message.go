package models

import "time"

type Message struct {
	ConversationID string
	Content        string
	ContentPath    string
	OwnerUserID    string
	CreatedAt      time.Time
	UpdatedAt      time.Time
}
