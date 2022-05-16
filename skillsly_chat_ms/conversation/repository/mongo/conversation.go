package mongo

import (
	"context"
	"fmt"
	"time"

	"github.com/angegonzalez/conversation"
	"github.com/angegonzalez/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Member struct {
	UserID   string             `bson:"UserID"`
	IsAdmin  bool               `bson:"IsAdmin"`
	IsActive bool               `bson:"IsActive"`
	JoinedAt primitive.DateTime `bson:"JoinedAt"`
}

type Conversation struct {
	CreatorUserID string             `bson:"CreatorUserID"`
	Name          string             `bson:"Name,omitempty"`
	Description   string             `bson:"Description,omitempty"`
	Members       []Member           `bson:"Members"`
	CreatedAt     primitive.DateTime `bson:"CreatedAt"`
	IsPrivate     bool               `bson:"IsPrivate"`
}

type Message struct {
	MessageID   string `bson:"MessageID"`
	Content     string `bson:"Content"`
	Path        string `bson:"Path"`
	OwnerUserID string `bson:"OwnerUserID"`
	CreatedAt   string `bson:"CreatedAt"`
	UpdatedAt   string `bson:"UpdatedAt"`
}

type ConversationRepository struct {
	db *mongo.Collection
}

func NewConversationRepository(db *mongo.Database, collection string) *ConversationRepository {
	return &ConversationRepository{
		db: db.Collection(collection),
	}
}

func (c ConversationRepository) CreatePrivateConversation(ctx context.Context, creatorUserId string, receiverMember models.Member) error {

	model := toPrivateConversation(creatorUserId, receiverMember)

	_, err := c.db.InsertOne(ctx, model)
	if err != nil {
		fmt.Print(err)
		return err
	}

	return err
}
func (c ConversationRepository) CreateGroupConversation(ctx context.Context, conversation models.Conversation) error {
	model := toGroupConversation(conversation)
	_, err := c.db.InsertOne(ctx, model)
	if err != nil {
		fmt.Print(err)
		return err
	}

	return err
}

func (c ConversationRepository) DeletePrivateConversation(ctx context.Context, conversationId string, userId string) error {
	var result Conversation
	objID, _ := primitive.ObjectIDFromHex(conversationId)
	filter := bson.D{{"_id", objID}}
	err := c.db.FindOne(ctx, filter).Decode(&result)
	if err != nil {
		return conversation.ErrNoConversation
	}
	if result.CreatorUserID == userId {
		_, err := c.db.DeleteOne(ctx, filter)
		if err != nil {
			return err
		}
		return nil
	}
	return conversation.ErrCannotDeleteConversation
}

func (c ConversationRepository) DeleteGroupConversation(ctx context.Context, conversationId string, userId string) error {
	var result Conversation
	objID, _ := primitive.ObjectIDFromHex(conversationId)
	filter := bson.D{{"_id", objID}}
	err := c.db.FindOne(ctx, filter).Decode(&result)
	if err != nil {
		return conversation.ErrNoConversation
	}
	for _, member := range result.Members {
		if member.UserID == userId && member.IsAdmin && member.IsActive {
			_, err := c.db.DeleteOne(ctx, filter)
			if err != nil {
				return err
			}
			return nil
		}
	}
	return conversation.ErrCannotDeleteConversation
}

func (c ConversationRepository) ExitGroupConversation(ctx context.Context, conversationId string, memberUserId string) error {
	objID, _ := primitive.ObjectIDFromHex(conversationId)
	filter := bson.D{{"_id", objID}, {"Members.UserID", memberUserId}}
	update := bson.M{"$set": bson.M{"Members.$[elem].IsActive": false}}
	options := options.FindOneAndUpdate().SetArrayFilters(options.ArrayFilters{
		Filters: []interface{}{bson.M{"elem.UserID": memberUserId}},
	})
	res := c.db.FindOneAndUpdate(ctx, filter, update, options)
	if res.Err() != nil {
		return conversation.ErrNoConversation
	}
	return res.Decode(&res)
}

func (c ConversationRepository) GetConversationsCollection(ctx context.Context, userId string) ([]models.Conversation, error) {
	filter := bson.D{{"CreatorUserID", userId}}
	cursor, err := c.db.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	var conversations []models.Conversation
	if err = cursor.All(ctx, &conversations); err != nil {
		return nil, err
	}
	if conversations == nil {
		return nil, conversation.ErrNoConversations
	}

	return conversations, nil
}

func (c ConversationRepository) AddMembersGroupConversation(ctx context.Context, conversationId string, membersUserIds []string) {

	objID, _ := primitive.ObjectIDFromHex(conversationId)
	filter := bson.M{"_id": objID}

	for _, memberId := range membersUserIds {
		memberAdd := models.Member{
			UserID:   memberId,
			IsAdmin:  false,
			IsActive: true,
			JoinedAt: time.Now(),
		}
		change := bson.M{"$push": bson.M{"Members": toMember(memberAdd)}}
		c.db.FindOneAndUpdate(ctx, filter, change)
	}
}

func (c ConversationRepository) UpdateGroupConversation(ctx context.Context, conversationId string, conversationDetail models.Conversation) error {
	objID, _ := primitive.ObjectIDFromHex(conversationId)
	filter := bson.D{{"_id", objID}}
	update := bson.M{
		"$set": bson.M{"Name": conversationDetail.Name, "Description": conversationDetail.Description, "UpdatedAt": time.Now(), "IsPrivate": conversationDetail.IsPrivate},
	}
	res := c.db.FindOneAndUpdate(ctx, filter, update)
	if res.Err() != nil {
		fmt.Print(res.Err())
		return conversation.ErrNoConversation
	}
	return res.Decode(&res)
}

func toPrivateConversation(creatorUserId string, receiverMember models.Member) *Conversation {
	member := toMember(receiverMember)
	membersList := []Member{member}
	return &Conversation{
		CreatorUserID: creatorUserId,
		Members:       membersList,
		CreatedAt:     primitive.NewDateTimeFromTime(time.Now()),
		IsPrivate:     true,
	}
}

func toGroupConversation(conversation models.Conversation) *Conversation {
	members := toListMembers(conversation.Members)
	return &Conversation{
		CreatorUserID: conversation.CreatorUserID,
		Name:          conversation.Name,
		Description:   conversation.Description,
		Members:       members,
		CreatedAt:     primitive.NewDateTimeFromTime(conversation.CreatedAt),
		IsPrivate:     conversation.IsPrivate,
	}
}

func toMember(member models.Member) Member {
	return Member{
		UserID:   member.UserID,
		IsAdmin:  member.IsAdmin,
		IsActive: member.IsActive,
		JoinedAt: primitive.NewDateTimeFromTime(time.Now()),
	}
}

func toListMembers(members []models.Member) []Member {
	out := make([]Member, len(members))
	for i, m := range members {
		out[i] = toMember(m)
	}
	return out
}
