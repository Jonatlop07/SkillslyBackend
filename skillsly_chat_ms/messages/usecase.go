package messages

import (
	"context"

	"github.com/angegonzalez/models"
)

type UseCase interface {
	SendMessage(ctx context.Context, message models.Message) error
	GetConversationMessages(ctx context.Context, conversationId string) ([]models.Message, error)
	HandleConversationWebSocket()
	HandleMessagesWebSocket()
}
