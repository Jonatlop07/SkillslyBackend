package mongo

import (
	"context"
	"fmt"

	"github.com/angegonzalez/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MessageRepository struct {
	db *mongo.Collection
}

func (c MessageRepository) HandleConversationWebSocket() {
}

func (c MessageRepository) HandleMessageWebSocket() {
}

func NewMessageRepository(db *mongo.Database, collection string) *MessageRepository {
	return &MessageRepository{
		db: db.Collection(collection),
	}
}

type Message struct {
	ConversationID string             `bson:"ConversationID"`
	Content        string             `bson:"Content"`
	ContentPath    string             `bson:"ContentPath"`
	OwnerUserID    string             `bson:"OwnerUserID"`
	CreatedAt      primitive.DateTime `bson:"CreatedAt"`
	UpdatedAt      primitive.DateTime `bson:"UpdatedAt"`
}

func (c MessageRepository) SendMessage(ctx context.Context, message models.Message) error {
	model := toMessage(message)
	_, err := c.db.InsertOne(ctx, model)
	if err != nil {
		fmt.Print(err)
		return err
	}
	return err
}

func (c MessageRepository) GetConversationMessages(ctx context.Context, conversationId string) ([]models.Message, error) {

	var messages []models.Message
	filter := bson.D{{"ConversationID", conversationId}}
	findOptions := options.Find()
	findOptions.SetSort(bson.D{{"CreatedAt", 1}})
	res, err := c.db.Find(ctx, filter, findOptions)

	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	res.All(ctx, &messages)
	return messages, nil

}

func toMessage(message models.Message) Message {
	return Message{
		ConversationID: message.ConversationID,
		Content:        message.Content,
		ContentPath:    message.ContentPath,
		OwnerUserID:    message.OwnerUserID,
		CreatedAt:      primitive.NewDateTimeFromTime(message.CreatedAt),
		UpdatedAt:      primitive.NewDateTimeFromTime(message.UpdatedAt),
	}
}
