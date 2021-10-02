# cors-except

## License MIT

This package provides a middleware that allows CORS requests to be selectively checked. It is useful for services that needs to be accessed by browsers.

## Usage

```ts
import cors from "cors"
import express from "express"
import except from "..."

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
