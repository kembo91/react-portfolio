package bot

import (
	"github.com/kembo91/portfolio-server/config"
	"bufio"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"strconv"
	"strings"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api"
)

type UserFile struct {
	Path  string
	Users []int64
}

func IndexOf(i int64, s []int64) (int, error) {
	for k, v := range s {
		if v == i {
			return k, nil
		}
	}
	return 0, errors.New("Element not in a slice")
}

func (u *UserFile) InitUserfile() error {
	f, err := os.OpenFile(u.Path, os.O_RDONLY|os.O_CREATE, 0666)
	defer f.Close()

	if err != nil {
		return err
	}
	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		t := scanner.Text()
		i, err := strconv.ParseInt(t, 10, 64)
		if err != nil {
			return err
		}
		u.Users = append(u.Users, i)
	}
	if err := scanner.Err(); err != nil {
		return err
	}
	return nil
}

func RemoveFromList(ix int, s []string) []string {
	s[len(s)-1], s[ix] = s[ix], s[len(s)-1]
	return s[:len(s)-1]
}

func (u *UserFile) RemoveUser(ix int64) error {
	f, err := ioutil.ReadFile(u.Path)
	if err != nil {
		return err
	}
	lines := strings.Split(string(f), "\n")
	for i, line := range lines {
		if line != "" {
			li, err := strconv.Atoi(line)
			if err != nil {
				return err
			}

			if li == int(ix) {
				lines = RemoveFromList(i, lines)
				break
			}
		}
	}
	newLines := strings.Join(lines, "\n")
	err = ioutil.WriteFile(u.Path, []byte(newLines), 0644)
	if err != nil {
		return err
	}
	err = u.InitUserfile()
	if err != nil {
		return err
	}
	return nil
}

func (u *UserFile) CheckUserIn(i int64) bool {
	for _, b := range u.Users {
		if i == b {
			return true
		}
	}
	return false
}

func (u *UserFile) AddUser(i int64) error {
	if u.CheckUserIn(i) {
		return nil
	}
	f, err := os.OpenFile(u.Path, os.O_APPEND|os.O_WRONLY, 0666)
	defer f.Close()
	if err != nil {
		return err
	}
	u.Users = append(u.Users, i)

	_, err = f.WriteString(fmt.Sprintf("%s\n", strconv.Itoa(int(i))))

	if err != nil {
		return err
	}
	return nil
}

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
	cfg, err := config.GetConfig("config.yml")
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
	uf := UserFile{Path: "userfile.txt"}
	err = uf.InitUserfile()
	if err != nil {
		log.Println(err)
	}

	go func() {
		for u := range c {
			for _, user := range uf.Users {
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
			err := uf.AddUser(update.Message.Chat.ID)
			if err != nil {
				log.Println(err)
			}
		}
		if update.Message.Text == "/stop" {
			msg := tgbotapi.NewMessage(update.Message.Chat.ID, "Bot has now stopped working")
			msg.ReplyToMessageID = update.Message.MessageID
			bot.Send(msg)
			err := uf.RemoveUser(update.Message.Chat.ID)
			if err != nil {
				log.Println(err)
			}
		}
	}
}
