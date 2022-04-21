package usecase

import (
	"context"

	"github.com/angegonzalez/conversation"
	"github.com/angegonzalez/models"
)

type ConversationUseCase struct {
	conversationRepo conversation.Repository
}

func NewConversationUseCase(conversationRepo conversation.Repository) *ConversationUseCase {
	return &ConversationUseCase{
		conversationRepo: conversationRepo,
	}
}

func (c ConversationUseCase) CreatePrivateConversation(ctx context.Context, creatorUserId string, receiverMember models.Member) error {
	return c.conversationRepo.CreatePrivateConversation(ctx, creatorUserId, receiverMember)
}

func (c ConversationUseCase) CreateGroupConversation(ctx context.Context, conversation models.Conversation) error {
	return c.conversationRepo.CreateGroupConversation(ctx, conversation)
}

func (c ConversationUseCase) DeleteGroupConversation(ctx context.Context, conversationId string, userId string) error {
	return c.conversationRepo.DeleteGroupConversation(ctx, conversationId, userId)
}

func (c ConversationUseCase) ExitGroupConversation(ctx context.Context, conversationId string, memberUserId string) error {
	return c.conversationRepo.ExitGroupConversation(ctx, conversationId, memberUserId)
}

func (c ConversationUseCase) GetConversationsCollection(ctx context.Context, userId string) ([]models.Conversation, error) {
	return c.conversationRepo.GetConversationsCollection(ctx, userId)
}

func (c ConversationUseCase) AddMembersGroupConversation(ctx context.Context, conversationId string, membersUserIds []string) {
	c.conversationRepo.AddMembersGroupConversation(ctx, conversationId, membersUserIds)
}
func (c ConversationUseCase) UpdateGroupConversation(ctx context.Context, conversationId string, conversationDetail models.Conversation) error {
	return c.conversationRepo.UpdateGroupConversation(ctx, conversationId, conversationDetail)
}

// func (c ConversationUseCase) CreateGroupConversation(ctx context.Context, name string, members []string) error {
// 	return c.CreateGroupConversation(ctx, name, members)
// }

// func (c ConversationUseCase) GetConversations(ctx context.Context, requestUserId string) error {
// 	return c.GetConversations(ctx, requestUserId)
// }

// func (c ConversationUseCase) GetConversationMessages(ctx context.Context, conversationId string) error {
// 	return c.GetConversationMessages(ctx, conversationId)
// }
