Find Artists
===
This is a project done with React (first use) as test.

---
Setup
---
 1. Create the project directory structure.
    ```bash
    mkdir -p search_artist/{build/js,css,html,img,js,json}
    cd search_artist
    ```

 1. Create /package.json.
    ```json
    {
      "name": "hn",
      "version": "0.1.0",
      "private": true,
      "browserify": {
        "transform": [
          ["reactify"]
        ]
      }
    }
    ```

 1. Install Browserify, React, and tools.
    ```bash
    # These dependencies are required for running the app.
    npm install --save react jquery lodash moment

    # These dependencies are required for building the app.
    npm install --save-dev browserify watchify reactify

    # These dependencies are globally installed command line tools.
    npm install -g browserify watchify http-server
    ```

 1. Start Watchify and HTTP server .
    ```bash
    # Start Watchify. This compiles your React (JSX) components into ordinary JavaScript.
    watchify -v -o build/js/Item.js js/Item.js
    watchify -v -o build/js/TrackItem.js js/TrackItem.js
    watchify -v -o build/js/SearchArtist.js js/SearchArtist.js

    # Start the HTTP server.
    http-server -p 8888
    ```