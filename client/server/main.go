package main

import (
	"github.com/gorilla/handlers"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"

	"config"

	"github.com/gorilla/mux"
)

func main() {
	cfg, err := GetConfig("config.yml")

	r := mux.NewRouter()
	api := r.PathPrefix("/api").Subrouter()
	api.HandleFunc("/msg", MessageHandler).Methods("POST")

	buildHandler := http.FileServer(http.Dir("./build"))
	r.PathPrefix("/").Handler(buildHandler)
	srv := http.Server{
		Handler:      handlers.LoggingHandler(os.Stdout, r),
		Addr:         "127.0.0.1:8080",
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}
	log.Fatal(srv.ListenAndServe())
}

func MessageHandler(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Printf("Can't read body", err)
		http.Error(w, "Can't read body", http.StatusBadRequest)
	}
	log.Print(body)
}
