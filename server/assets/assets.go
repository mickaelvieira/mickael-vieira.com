package assets

import (
	"encoding/json"
	"io/ioutil"
	"log"
)

// Assets represents the list of available assets
type Assets struct {
	Index    string `json:"index"`
	Sw       string `json:"sw"`
	Styles   string `json:"styles"`
	StylesJs string `json:"stylesJs"`
}

// LoadAssetsDefinition loads the list of available assets
func LoadAssetsDefinition() *Assets {
	content, err := ioutil.ReadFile("../public/dist/hashes.json")

	if err != nil {
		log.Fatal(err)
	}

	var assets *Assets
	json.Unmarshal(content, &assets)

	return assets
}
