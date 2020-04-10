package bot

import (
	"app/config"
	"fmt"
	"log"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api"
)

type Message struct {
	Msgdata struct {
		Message string `json:"message"`
		Email   string `json:"email"`
	} `json:"msgdata"`
}

func (m Message) CreateMessage() string {
	return fmt.Sprintf("%v wants to contact you, they sent a message %v", m.Msgdata.Email, m.Msgdata.Message)
}

func ConfigureAndStartBot(c chan *Message) {
	cfg, err := config.GetConfig("../../config.yml")
	if err != nil {
		log.Fatal(err)
	}
	bot, err := tgbotapi.NewBotAPI(cfg.Token)
	if err != nil {
		log.Panic(err)
	}

	u := tgbotapi.NewUpdate(0)
	u.Timeout = 15

	updates, err := bot.GetUpdatesChan(u)
	if err != nil {
		log.Fatal(err)
	}
	var users []int64

	go func() {
		for u := range c {
			for _, user := range users {
				msg := tgbotapi.NewMessage(user, u.CreateMessage())
				bot.Send(msg)
			}
		}
	}()

	for update := range updates {
		if update.Message.Text == "/start" {
			msg := tgbotapi.NewMessage(update.Message.Chat.ID, "Bot is now working")
			msg.ReplyToMessageID = update.Message.MessageID
			bot.Send(msg)
			users = append(users, update.Message.Chat.ID)
		}
	}
}
