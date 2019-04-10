package main

import (
	"log"
	"net/http"

	"github/mickaelvieira/mickaelvieira.com/server/routes"
)

func main() {
	port := "8000"

	// Only for developpment
	// static files should be served by the webserver .ie nginx
	fs := http.FileServer(http.Dir("../public"))
	http.Handle("/dist/", fs)

	// Routes
	http.HandleFunc("/", routes.IndexHandler)

	// Start the server
	log.Println("Listening: http://localhost:" + port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
