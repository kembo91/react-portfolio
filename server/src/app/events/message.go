package events

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	tb "gopkg.in/tucnak/telebot.v2"
)

type Message struct {
	message string
	email   string
}

func (m Message) createMessage() string {
	return fmt.Sprintf("%v wants to contact you, they sent a message %v", m.email, m.message)
}

func MessageHandler(b *tb.Bot, user *tb.User) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		var m Message
		err := json.NewDecoder(r.Body).Decode(&m)
		if err != nil {
			log.Printf("Can't read body", err)
			http.Error(w, "Can't read body", http.StatusBadRequest)
		}
		b.Send(user, m.createMessage())
	}
}
