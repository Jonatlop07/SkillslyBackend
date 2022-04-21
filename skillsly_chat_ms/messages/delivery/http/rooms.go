package http

import (
	"time"

	"github.com/angegonzalez/models"
	"github.com/dustin/go-broadcast"
)

type Listener struct {
	ConversationID string
	Chan           chan interface{}
}

type Manager struct {
	roomChannels map[string]broadcast.Broadcaster
	open         chan *Listener
	close        chan *Listener
	delete       chan string
	messages     chan *models.Message
}

func NewRoomManager() *Manager {
	manager := &Manager{
		roomChannels: make(map[string]broadcast.Broadcaster),
		open:         make(chan *Listener, 100),
		close:        make(chan *Listener, 100),
		delete:       make(chan string, 100),
		messages:     make(chan *models.Message, 100),
	}
	go manager.run()
	return manager
}

func (m *Manager) run() {
	for {
		select {
		case listener := <-m.open:
			m.register(listener)
		case listener := <-m.close:
			m.deregister(listener)
		case conversationID := <-m.delete:
			m.deleteBroadcast(conversationID)
		case message := <-m.messages:
			m.room(message.ConversationID).Submit(message.OwnerUserID + ":" + message.Content)
		}
	}
}

func (m *Manager) register(listener *Listener) {
	m.room(listener.ConversationID).Register(listener.Chan)
}

func (m *Manager) deregister(listener *Listener) {
	m.room(listener.ConversationID).Unregister(listener.Chan)
	close(listener.Chan)
}

func (m *Manager) deleteBroadcast(conversationID string) {
	b, ok := m.roomChannels[conversationID]
	if ok {
		b.Close()
		delete(m.roomChannels, conversationID)
	}
}

func (m *Manager) room(conversationID string) broadcast.Broadcaster {
	b, ok := m.roomChannels[conversationID]
	if !ok {
		b = broadcast.NewBroadcaster(10)
		m.roomChannels[conversationID] = b
	}
	return b
}

func (m *Manager) OpenListener(conversationID string) chan interface{} {
	listener := make(chan interface{})
	m.open <- &Listener{
		ConversationID: conversationID,
		Chan:           listener,
	}
	return listener
}

func (m *Manager) CloseListener(conversationID string, channel chan interface{}) {
	m.close <- &Listener{
		ConversationID: conversationID,
		Chan:           channel,
	}
}

func (m *Manager) DeleteBroadcast(conversationID string) {
	m.delete <- conversationID
}

func (m *Manager) Submit(conversationID, content, ownerUserID string) models.Message {
	msg := &models.Message{
		ConversationID: conversationID,
		Content:        content,
		OwnerUserID:    ownerUserID,
		CreatedAt:      time.Now(),
		UpdatedAt:      time.Now(),
	}

	m.messages <- msg

	return *msg
}
