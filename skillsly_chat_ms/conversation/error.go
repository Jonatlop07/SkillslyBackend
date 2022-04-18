package conversation

import "errors"

var ErrNoConversations = errors.New("no conversations found")
var ErrNoMessagesInConversation = errors.New("no messages in conversation found")
var ErrCannotDeleteConversation = errors.New("Cannot delete conversation, you aren't allowed to delete this conversation")
var ErrNoConversation = errors.New("No conversation found!")
