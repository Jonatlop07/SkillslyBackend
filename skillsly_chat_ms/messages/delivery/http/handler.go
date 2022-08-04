package http

import (
	"fmt"
	"github.com/angegonzalez/messages"
	"github.com/angegonzalez/models"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

var clients = make(map[*websocket.Conn]bool)
var broadcast = make(chan messageInput)
var upgrader = websocket.Upgrader{}

type Handler struct {
	useCase messages.UseCase
}

type messageInput struct {
	ConversationID string    `json:"conversation_id"`
	Content        string    `json:"content"`
	ContentPath    string    `json:"content_path"`
	OwnerUserID    string    `json:"owner_user_id"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
}

func NewHandler(useCase messages.UseCase) *Handler {
	return &Handler{
		useCase: useCase,
	}
}

func (h *Handler) GetConversationMessages(c *gin.Context) {
	conversationID := c.Param("conversationID")

	res, err := h.useCase.GetConversationMessages(c.Request.Context(), conversationID)

	if err != nil {
		fmt.Print("error", err)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"messages": res,
	})

}

func (h *Handler) HandleMessagesWebSocket() {
	for {
		msg := <-broadcast
		for client := range clients {
			err := client.WriteJSON(msg)
			if err != nil {
				log.Printf("error: %v", err)
				client.Close()
				delete(clients, client)
			}
		}
	}
}

func (h *Handler) HandleConversationWebSocket(c *gin.Context) {
	go h.HandleMessagesWebSocket()

	conversationID := c.Param("conversationID")
	log.Printf(conversationID)
	ws, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Fatal(err)
	}
	defer ws.Close()

	clients[ws] = true

	for {
		msg := new(messageInput)
		err := ws.ReadJSON(&msg)
		if err != nil {
			log.Printf("error: %v", err)
			delete(clients, ws)
			break
		}
		//if err := c.MustBindWith(msg, binding.JSON); err != nil {
		//	log.Printf("error: %v", err)
		//	c.AbortWithStatus(http.StatusBadRequest)
		//	return
		//}
		go h.SendMessage(c, *msg)
		broadcast <- *msg
	}
}

func (h *Handler) SendMessage(c *gin.Context, msg messageInput) {
	if err := h.useCase.SendMessage(c.Request.Context(), *toMessage(msg)); err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}
}

func toMessage(message messageInput) *models.Message {
	return &models.Message{
		ConversationID: message.ConversationID,
		Content:        message.Content,
		ContentPath:    message.ContentPath,
		OwnerUserID:    message.OwnerUserID,
		CreatedAt:      message.CreatedAt,
		UpdatedAt:      message.UpdatedAt,
	}
}
