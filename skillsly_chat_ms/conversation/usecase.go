package conversation

import (
	"context"

	"github.com/angegonzalez/models"
)

type UseCase interface {
	CreatePrivateConversation(ctx context.Context, creatorUserId string, receiverMember models.Member) error
	CreateGroupConversation(ctx context.Context, conversation models.Conversation) error
	DeletePrivateConversation(ctx context.Context, conversationId string, userId string) error
	DeleteGroupConversation(ctx context.Context, conversationId string, userId string) error
	AddMembersGroupConversation(ctx context.Context, conversationId string, membersUserIds []string)
	ExitGroupConversation(ctx context.Context, conversationId string, memberUserId string) error
	UpdateGroupConversation(ctx context.Context, conversationId string, conversationDetail models.Conversation) error
	GetConversationsCollection(ctx context.Context, userId string) ([]models.Conversation, error)
}
