package main

import (
	"fmt"
	"log"
	"net/http"
	// "io/ioutil"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hi there, I love %s!", r.URL.Path[1:])
}

func main() {
	port := "8080"

	// Only for developpment, static files should be served by the webserver .ie nginx
	fs := http.FileServer(http.Dir("../public"))
	http.Handle("/dist/", fs)

	// Routes
	http.HandleFunc("/", handler)

	// Start the server
	log.Println("Listening: http://localhost:" + port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
