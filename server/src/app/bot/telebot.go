package bot

import (
	"app/config"
	"time"

	tb "gopkg.in/tucnak/telebot.v2"
)

func GetBot(cfg config.Config) (b *tb.Bot, err error) {
	b, err = tb.NewBot(tb.Settings{
		Token:  cfg.Token,
		Poller: &tb.LongPoller{Timeout: 10 * time.Second},
	})
	if err != nil {
		return b, err
	}
	return b, err
}

func handleStart(bot *tb.Bot, user *tb.User) func(m *tb.Message) {
	return func(m *tb.Message) {
		user = m.Sender
		bot.Send(m.Sender, "Hello! Bot is now active")
	}
}

func ConfigureBot(b *tb.Bot, user *tb.User) {
	b.Handle("/start", handleStart(b, user))
}
