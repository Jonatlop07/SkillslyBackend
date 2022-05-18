package server

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/angegonzalez/conversation"
	"github.com/angegonzalez/messages"

	conversationhttp "github.com/angegonzalez/conversation/delivery/http"
	conversationmongo "github.com/angegonzalez/conversation/repository/mongo"
	conversationusecase "github.com/angegonzalez/conversation/usecase"

	messageshttp "github.com/angegonzalez/messages/delivery/http"
	messagesmongo "github.com/angegonzalez/messages/repository/mongo"
	messagesusecase "github.com/angegonzalez/messages/usecase"

	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type App struct {
	httpServer     *http.Server
	conversationUC conversation.UseCase
	messagesUC     messages.UseCase
}

func NewApp() *App {
	db := initDB()
	conversationRepo := conversationmongo.NewConversationRepository(db, viper.GetString("mongo.conversations_collection"))
	messagesRepo := messagesmongo.NewMessageRepository(db, viper.GetString("mongo.messages_collection"))
	return &App{
		conversationUC: conversationusecase.NewConversationUseCase(conversationRepo),
		messagesUC:     messagesusecase.NewMessageUseCase(messagesRepo),
	}
}

func (a *App) Run(port string) error {
	router := gin.Default()
	router.Use(
		gin.Recovery(),
		gin.Logger(),
	)

	api := router.Group("/api")

	conversationhttp.RegisterHTTPEndpoints(api, a.conversationUC)
	messageshttp.RegisterHTTPEndpoints(api, a.messagesUC)

	// HTTP Server
	a.httpServer = &http.Server{
		Addr:           ":" + port,
		Handler:        router,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	go func() {
		if err := a.httpServer.ListenAndServe(); err != nil {
			log.Fatalf("Failed to listen and serve: %+v", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, os.Interrupt)

	<-quit

	ctx, shutdown := context.WithTimeout(context.Background(), 5*time.Second)
	defer shutdown()

	return a.httpServer.Shutdown(ctx)
}

func initDB() *mongo.Database {

	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb+srv://admin:1234@skillslychatdb.ljndb.mongodb.net/?retryWrites=true&w=majority"))
	if err != nil {
		fmt.Println("Error creating DB client")
		log.Fatal(err)
	}

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)

	if err != nil {
		fmt.Println("Error while trying to connecting database")
		log.Fatal(err)
	}

	err = client.Ping(ctx, nil)

	if err != nil {
		fmt.Println("Error while pinging database")
		log.Fatal(err)
	}
	fmt.Println("Connected to MongoDB")

	return client.Database(viper.GetString("mongo.name"))
}
