package main

import (
	"app/bot"
	"app/config"
	"app/events"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	tb "gopkg.in/tucnak/telebot.v2"
)

func main() {
	cfg, err := config.GetConfig("../../config.yml")
	if err != nil {
		log.Fatal(err)
	}
	b, err := bot.GetBot(cfg)
	if err != nil {
		log.Fatal(err)
	}
	var user *tb.User
	bot.ConfigureBot(b, user)
	r := mux.NewRouter()
	api := r.PathPrefix("/api").Subrouter()
	api.HandleFunc("/msg", events.MessageHandler(b, user)).Methods("POST")

	//buildHandler := http.FileServer(http.Dir("./build"))
	//r.PathPrefix("/").Handler(buildHandler)

	//staticHandler := http.StripPrefix("/static/", http.FileServer(http.Dir("./build/static")))
	//r.PathPrefix("/static/").Handler(staticHandler)

	srv := http.Server{
		Handler:      handlers.LoggingHandler(os.Stdout, r),
		Addr:         "127.0.0.1:8080",
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}
	go b.Start()
	log.Println("Now listening on port 8080")
	log.Fatal(srv.ListenAndServe())
}
