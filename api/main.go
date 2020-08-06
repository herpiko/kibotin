package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/swill/kad"
)

const PORT = ":8000"

func handler(w http.ResponseWriter, r *http.Request) {

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	bodyString := string(body)
	err = generate(bodyString)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
}

func main() {
	http.HandleFunc("/api/generate", handler)
	log.Println("Listening on port " + PORT)
	log.Fatal(http.ListenAndServe(PORT, nil))
}

func generate(payload string) error {
	// you can define settings and the layout in JSON
	log.Println(payload)
	json_bytes := []byte(payload)
	// create a new KAD instance
	cad := kad.New()

	// populate the 'cad' instance with the JSON contents
	err := json.Unmarshal(json_bytes, cad)
	if err != nil {
		log.Fatalf("Failed to parse json data into the KAD file\nError: %s", err.Error())
	}
	// and you can define settings via the KAD instance
	cad.Hash = "usage_example"      // the name of the design
	cad.FileStore = kad.STORE_LOCAL // store the files locally
	cad.FileDirectory = "./"        // the path location where the files will be saved
	cad.FileServePath = "/"         // the url path for the 'results' (don't worry about this)

	// here are some more settings defined for this case
	cad.Case.UsbWidth = 12 // all dimension are in 'mm'
	cad.Fillet = 3         // 3mm radius on the rounded corners of the case

	// lets draw the SVG files now
	err = cad.Draw()
	if err != nil {
		log.Println(err)
		return err
	}

	return nil
}
