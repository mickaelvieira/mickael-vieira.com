package routes

import (
	"net/http"
	"text/template"

	"github/mickaelvieira/mickaelvieira.com/server/assets"
)

var templates = template.Must(template.ParseFiles("templates/index.html", "templates/404.html"))

// IndexHandler handles index requests
func IndexHandler(w http.ResponseWriter, r *http.Request) {
	hashes := assets.LoadAssetsDefinition()

	if r.URL.Path != "/" {
		w.WriteHeader(http.StatusNotFound)
		err := templates.ExecuteTemplate(w, "404.html", hashes)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	} else {
		err := templates.ExecuteTemplate(w, "index.html", hashes)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	}
}
