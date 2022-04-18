package http

import (
	"fmt"
	"time"

	"net/http"

	"github.com/angegonzalez/conversation"
	"github.com/angegonzalez/models"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
)

// type Conversation struct {
// 	conversation_id string           `json:"conversation_id"`
// 	creator_user_id string           `json:"creator_user_id"`
// 	name            string           `json:"name", omitempty`
// 	description     string           `json:"description", omitempty`
// 	members         []models.Member  `json:"members"`
// 	messages        []models.Message `json: "messages"`
// 	created_at      time.Time        `json:"created_at"`
// 	updated_at      time.Time        `json:"updated_at"`
// 	is_private      bool             `json:"is_private"`
// }

type Handler struct {
	useCase conversation.UseCase
}

func NewHandler(useCase conversation.UseCase) *Handler {
	return &Handler{
		useCase: useCase,
	}
}

type createPrivateConversationInput struct {
	CreatorUserID string `json:"CreatorUserID" binding:"required"`
	MemberUserID  string `json:"MemberUserID"  binding:"required"`
}

type createGroupConversationInput struct {
	RequestUserID string          `json:"RequestUserID" binding:"required"`
	Name          string          `json:"Name"`
	Description   string          `json:"Description" binding:"required"`
	Members       []models.Member `json:"Members"  binding:"required"`
	IsPrivate     bool            `json:"IsPrivate"  binding:"required"`
}
type deleteConversationInput struct {
	ConversationID string `json:"ConversationID" binding:"required"`
	UserID         string `json:"UserID" binding:"required"`
}
type exitGroupConversationInput struct {
	ConversationID string `json:"ConversationID" binding:"required"`
	UserID         string `json:"UserID" binding:"required"`
}

type getConversationsCollectionInput struct {
	UserID string `json:"UserID" binding:"required"`
}

type addMembersGroupConversationInput struct {
	UsersIDs       []string `json:"UsersIDs" binding:"required"`
	ConversationID string   `json:"ConversationID" binding:"required"`
}

type getConversationMessagesInput struct {
	ConversationID string `json:"ConversationID" binding:"required"`
}

type updateGroupConversationInput struct {
	ConversationID string `json:"ConversationID" binding:"required"`
	Name           string `json:"Name" binding:"required"`
	Description    string `json:"Description" binding:"required"`
	IsPrivate      bool   `json:"IsPrivate" `
}

type getGroupCollectionsResponse struct {
	Conversations []models.Conversation `json:"Conversations"`
}
type getGroupConversationMessageResponse struct {
	Messages []models.Message `json:"Messages"`
}

func (h *Handler) CreatePrivateConversation(c *gin.Context) {
	body := new(createPrivateConversationInput)

	if err := c.MustBindWith(body, binding.JSON); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	receiverMember := models.Member{
		UserID:   body.MemberUserID,
		IsAdmin:  false,
		IsActive: true,
		JoinedAt: time.Now(),
	}

	if err := h.useCase.CreatePrivateConversation(c.Request.Context(), body.CreatorUserID, receiverMember); err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.Status(http.StatusOK)

}

func (h *Handler) CreateGroupConversation(c *gin.Context) {
	body := new(createGroupConversationInput)

	if err := c.MustBindWith(body, binding.JSON); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	if err := h.useCase.CreateGroupConversation(c.Request.Context(), *toGroupConversation(*body)); err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.Status(http.StatusOK)
}

func (h *Handler) DeleteGroupConversation(c *gin.Context) {
	body := new(deleteConversationInput)

	if err := c.MustBindWith(body, binding.JSON); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	if err := h.useCase.DeleteGroupConversation(c.Request.Context(), body.ConversationID, body.UserID); err != nil {
		if err == conversation.ErrNoConversation {
			c.JSON(404, gin.H{"message": "No Conversation found!"})
			return
		} else if err == conversation.ErrCannotDeleteConversation {
			c.JSON(404, gin.H{"message": "This member can't delete this conversation!"})
			return
		}

		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.Status(http.StatusOK)
}

func (h *Handler) ExitGroupConversation(c *gin.Context) {
	body := new(exitGroupConversationInput)

	if err := c.MustBindWith(body, binding.JSON); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	if err := h.useCase.ExitGroupConversation(c.Request.Context(), body.ConversationID, body.UserID); err != nil {
		if err == conversation.ErrNoConversation {
			c.JSON(404, gin.H{"message": "No Conversation found!"})
			return
		}
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.Status(http.StatusOK)
}

func (h *Handler) GetConversationsCollection(c *gin.Context) {
	userID := c.Param("userID")

	response, err := h.useCase.GetConversationsCollection(c.Request.Context(), userID)

	if err != nil {
		if err == conversation.ErrNoConversations {
			c.JSON(404, gin.H{"message": "No conversations for this user were found!"})
			return
		}
		fmt.Print(err)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}
	c.JSON(http.StatusOK, &getGroupCollectionsResponse{
		Conversations: response,
	})
}

func (h *Handler) AddMembersGroupConversation(c *gin.Context) {
	body := new(addMembersGroupConversationInput)

	if err := c.MustBindWith(body, binding.JSON); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	h.useCase.AddMembersGroupConversation(c.Request.Context(), body.ConversationID, body.UsersIDs)
	c.Status(http.StatusOK)
}

func (h *Handler) UpdateGroupConversation(c *gin.Context) {
	body := new(updateGroupConversationInput)

	if err := c.MustBindWith(body, binding.JSON); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	var conversationDetail = models.Conversation{
		Name:        body.Name,
		Description: body.Description,
		IsPrivate:   body.IsPrivate,
	}

	if err := h.useCase.UpdateGroupConversation(c.Request.Context(), body.ConversationID, conversationDetail); err != nil {
		fmt.Print(err)
		if err == conversation.ErrNoConversation {
			c.JSON(404, gin.H{"message": "No Conversation found!"})
			return
		}
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.Status(http.StatusOK)
}

func toGroupConversation(conversation createGroupConversationInput) *models.Conversation {
	name := ""
	if conversation.Name == "" {
		for _, member := range conversation.Members {
			name += member.UserID + ","
		}
	} else {
		name = conversation.Name
	}

	return &models.Conversation{
		CreatorUserID: conversation.RequestUserID,
		Name:          name,
		Description:   conversation.Description,
		Members:       conversation.Members,
		CreatedAt:     time.Now(),
		IsPrivate:     conversation.IsPrivate,
	}
}
