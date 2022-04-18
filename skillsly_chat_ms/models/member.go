package models

import "time"

type Member struct {
	UserID   string
	IsAdmin  bool
	IsActive bool
	JoinedAt time.Time
}
