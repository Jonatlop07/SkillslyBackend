package http

import (
	"fmt"
	"io"
	"net/http"

	"github.com/angegonzalez/messages"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
)

var roomManager *Manager = NewRoomManager()

type Handler struct {
	useCase messages.UseCase
}

func NewHandler(useCase messages.UseCase) *Handler {
	return &Handler{
		useCase: useCase,
	}
}

type sendMessageInput struct {
	Content     string `json:"Content" binding:"required"`
	OwnerUserID string `json:"OwnerUserID"  binding:"required"`
}

func Stream(c *gin.Context) {
	conversationID := c.Param("conversationID")
	listener := roomManager.OpenListener(conversationID)
	defer roomManager.CloseListener(conversationID, listener)

	clientGone := c.Writer.CloseNotify()
	c.Stream(func(w io.Writer) bool {
		select {
		case <-clientGone:
			return false
		case message := <-listener:
			fmt.Print(message, "on", conversationID)
			c.SSEvent("message", message)
			return true
		}
	})
}

func (h *Handler) SendMessage(c *gin.Context) {
	conversationID := c.Param("conversationID")

	body := new(sendMessageInput)

	if err := c.MustBindWith(body, binding.JSON); err != nil {
		fmt.Println(err)
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	msg := roomManager.Submit(conversationID, body.Content, body.OwnerUserID)

	if err := h.useCase.SendMessage(c.Request.Context(), msg); err != nil {
		fmt.Print("error", err)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": body.Content,
	})

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
