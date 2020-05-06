package main

import (
	"app/bot"
	"app/user"
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/go-playground/colors"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	c := make(chan *bot.Message)
	go bot.ConfigureAndStartBot(c)
	r := mux.NewRouter()
	api := r.PathPrefix("/api").Subrouter()
	api.HandleFunc("/msg", MessageHandler(c)).Methods("POST")
	api.HandleFunc("/color", ColorHandler).Methods("GET")

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

type ColormindResponse struct {
	Result [][]int `json:result`
}

type ApiResponse struct {
	Bg   string `json:"--bgcolor"`
	Text string `json:"--textcolor"`
	Hl   string `json:"--hlcolor"`
	Menu string `json:"--menucolor"`
}

func ProcessResponse(c *ColormindResponse) (a ApiResponse) {
	convert := func(b []int) string {
		col, _ := colors.RGB(uint8(b[0]), uint8(b[1]), uint8(b[2]))
		return col.ToHEX().String()
	}
	cls := c.Result
	a.Bg = convert(cls[4])
	a.Text = convert(cls[3])
	a.Hl = convert(cls[2])
	a.Menu = convert(cls[1])
	return a
}

func ColorHandler(w http.ResponseWriter, r *http.Request) {
	reqBody, err := json.Marshal(map[string]string{
		"model": "ui",
	})
	if err != nil {
		http.Error(w, "this is BS", http.StatusBadRequest)
	}
	resp, err := http.Post("http://colormind.io/api/", "application/json", bytes.NewBuffer(reqBody))
	if err != nil {
		http.Error(w, "Colormind api call failed", http.StatusBadRequest)
	}
	defer resp.Body.Close()
	var c ColormindResponse
	err = json.NewDecoder(resp.Body).Decode(&c)
	rp := ProcessResponse(&c)
	btres, err := json.Marshal(rp)
	log.Println(rp)
	if err != nil {
		http.Error(w, "Can't marshal shit", http.StatusBadRequest)
	}
	w.Write(btres)
}

func MessageHandler(c chan *bot.Message) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		var m bot.Message
		err := json.NewDecoder(r.Body).Decode(&m)
		if err != nil {
			http.Error(w, "Can't read body", http.StatusBadRequest)
			return
		}
		err = user.CheckContact(m.Msgdata.Email)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		c <- &m
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(200)

	}
}
