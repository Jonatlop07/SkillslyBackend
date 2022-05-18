package http

import (
	"github.com/angegonzalez/conversation"
	"github.com/gin-gonic/gin"
)

func RegisterHTTPEndpoints(router *gin.RouterGroup, uc conversation.UseCase) {
	h := NewHandler(uc)

	conversation := router.Group("/conversation")
	{
		conversation.GET("/:userID", h.GetConversationsCollection)
		conversation.POST("", h.CreatePrivateConversation)
		conversation.POST("/group", h.CreateGroupConversation)
		conversation.PATCH("/group", h.UpdateGroupConversation)
		conversation.PATCH("/group/add", h.AddMembersGroupConversation)
		conversation.PATCH("/group/exit", h.ExitGroupConversation)
		//conversation.DELETE("/group", h.DeleteGroupConversation)
		conversation.DELETE("", h.DeletePrivateConversation)
	}
}
