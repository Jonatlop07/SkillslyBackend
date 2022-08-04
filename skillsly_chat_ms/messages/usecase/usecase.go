package usecase

import (
	"context"

	"github.com/angegonzalez/messages"
	"github.com/angegonzalez/models"
)

type MessageUseCase struct {
	messageRepo messages.Repository
}

func NewMessageUseCase(messageRepo messages.Repository) *MessageUseCase {
	return &MessageUseCase{
		messageRepo: messageRepo,
	}
}

func (c MessageUseCase) SendMessage(ctx context.Context, message models.Message) error {
	return c.messageRepo.SendMessage(ctx, message)
}

func (c MessageUseCase) GetConversationMessages(ctx context.Context, conversationId string) ([]models.Message, error) {
	return c.messageRepo.GetConversationMessages(ctx, conversationId)
}

func (c MessageUseCase) HandleConversationWebSocket() {
}
func (c MessageUseCase) HandleMessagesWebSocket() {
}
