package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"time"

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
	id, err := generate(bodyString)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte("{\"id\": \"" + id + "\"}"))
}

func main() {

	log.SetFlags(log.LstdFlags | log.Lshortfile)

	fs := http.FileServer(http.Dir("./outputs"))
	http.Handle("/outputs/", http.StripPrefix("/outputs/", fs))
	http.HandleFunc("/api/generate", handler)
	log.Println("Listening on port " + PORT)
	log.Fatal(http.ListenAndServe(PORT, nil))
}

func generate(payload string) (string, error) {
	log.Println(payload)
	json_bytes := []byte(payload)
	cad := kad.New()
	err := json.Unmarshal(json_bytes, cad)
	if err != nil {
		log.Println(err)
		return "", err
	}

	id := strconv.FormatInt(time.Now().Unix(), 10)
	// and you can define settings via the KAD instance
	cad.Hash = "output_" + id        // the name of the design
	cad.FileStore = kad.STORE_LOCAL  // store the files locally
	cad.FileDirectory = "./outputs/" // the path location where the files will be saved
	cad.FileServePath = "/"          // the url path for the 'results' (don't worry about this)

	// lets draw the SVG files now
	err = cad.Draw()
	if err != nil {
		log.Println(err)
		return "", err
	}

	return id, nil
}
