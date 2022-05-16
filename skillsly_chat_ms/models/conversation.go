package models

import "time"

type Conversation struct {
	ConversationID string `bson:"_id"`
	CreatorUserID  string
	Name           string
	Description    string
	Members        []Member
	Messages       []Message
	CreatedAt      time.Time
	UpdatedAt      time.Time
	IsPrivate      bool
}
