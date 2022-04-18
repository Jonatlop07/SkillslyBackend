package conversation

import (
	"context"

	"github.com/angegonzalez/models"
)

type Repository interface {
	CreatePrivateConversation(ctx context.Context, creatorUserId string, receiverMember models.Member) error
	CreateGroupConversation(ctx context.Context, conversation models.Conversation) error
	DeleteGroupConversation(ctx context.Context, conversationId string, userId string) error
	ExitGroupConversation(ctx context.Context, conversationId string, memberUserId string) error
	GetConversationsCollection(ctx context.Context, userId string) ([]models.Conversation, error)
	AddMembersGroupConversation(ctx context.Context, conversationId string, membersUserIds []string)
	UpdateGroupConversation(ctx context.Context, conversationId string, conversationDetail models.Conversation) error
}
