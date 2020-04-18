package main

import (
	"app/bot"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	c := make(chan *bot.Message)
	go bot.ConfigureAndStartBot(c)
	r := mux.NewRouter()
	api := r.PathPrefix("/api").Subrouter()
	api.HandleFunc("/msg", MessageHandler(c)).Methods("POST")

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
	log.Fatal(srv.ListenAndServe())
	log.Println("Now listening on port 8080")

}

func MessageHandler(c chan *bot.Message) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		var m bot.Message
		err := json.NewDecoder(r.Body).Decode(&m)
		if err != nil {
			http.Error(w, "Can't read body", http.StatusBadRequest)
		}
		c <- &m
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(200)

	}
}
