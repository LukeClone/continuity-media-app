# media-app

Single SPA aplication for displaying media records. 

For connection to real API you have to replace `apiCall` fn in `mediaRecordsService.js` with some http client (fetch, axios, etc). `apiCall` simulates http client by adding timeouted Promise with one can fail as well as real-world API.

App is bundled in `dist/` folder for demonstration purposes only.

Preffered build engine: Node v12  

## List of available commands

## Project 
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
