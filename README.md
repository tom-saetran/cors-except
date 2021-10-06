![NPM license](https://img.shields.io/npm/l/cors-except)
![GitHub contributors](https://img.shields.io/github/contributors/tom-saetran/cors-except)
![GitHub issues](https://img.shields.io/github/issues/tom-saetran/cors-except)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/tom-saetran/cors-except)
![GitHub release date](https://img.shields.io/github/release-date/tom-saetran/cors-except)
![NPM downloads](https://img.shields.io/npm/dm/cors-except)
![GitHub package.json dynamic](https://img.shields.io/github/package-json/keywords/tom-saetran/cors-except)

# cors-except

This package provides a middleware that allows CORS requests to be selectively checked. It is useful for services that needs to be accessed by browsers.

## Usage

```js
import cors from "cors"
import express from "express"
import except from "cors-except"

const server = express()

const whitelist = ["https://frontend.url"]
const corsOptions = {
  origin: (origin, next) => {
    try {
      if (whitelist.indexOf(origin) !== -1) next(null, true)
      else next(new Error("Not allowed by CORS"))
    } catch (error) {
      next(error)
    }
  }
}

const corsExceptions = ["/without-cors"]
server.use(except(corsExceptions, cors(corsOptions)))

server.get("/without-cors", (_, res) => res.send("Any origin"))
server.get("*", (_, res) => res.send("corsOptions origin only"))
server.listen(() => console.log("Server started"))
```
