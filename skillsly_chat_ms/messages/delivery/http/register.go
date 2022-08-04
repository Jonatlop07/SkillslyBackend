package http

import (
	"github.com/angegonzalez/messages"
	"github.com/gin-gonic/gin"
)

func RegisterHTTPEndpoints(router *gin.RouterGroup, uc messages.UseCase) {
	h := NewHandler(uc)

	messages := router.Group("/messages")
	{
		messages.GET("/:conversationID", h.GetConversationMessages)
		messages.GET("/ws/:conversationID", h.HandleConversationWebSocket)
	}
}
