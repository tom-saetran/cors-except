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

```ts
import cors from "cors"
import express from "express"
import except from "cors-except"

const { FRONTEND_URL } = process.env
if (!FRONTEND_URL) throw new Error("FRONTEND_URL is missing")

const server = express()

const whitelist = [FRONTEND_URL]
const corsExceptions = ["/users/login/oauth/google/redirect", "/users/login/oauth/facebook/redirect"]

const corsOptions: cors.CorsOptions = {
  origin: (origin, next) => {
    try {
      if (whitelist.indexOf(origin!) !== -1) next(null, true)
      else next(createError(400, "Cross-Site Origin Policy blocked your request"))
    } catch (error: any) {
      next(error)
    }
  },
  credentials: true
}

server.use(except(corsExceptions, cors(corsOptions)))
```
