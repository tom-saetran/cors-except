import { RequestHandler } from "express"

/**
 * Exclusion Middleware
 *
 * Made by [@tom-saetran](https://github.com/tom-saetran)
 *
 * Takes an array of paths to compare against the current request path,
 * and a middleware to execute if the path is not in the list.
 * If the path is in the list, the middleware is not executed.
 *
 * @param {string[]} paths An array of paths to compare against the request path.
 * @param {RequestHandler} fn The middleware to run if the path is not excluded.
 * @example
 * ```js
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
 * ```
 */
const except =
    (paths: string[], fn: RequestHandler): RequestHandler =>
    (req, res, next) =>
        paths.indexOf(req.path) !== -1 ? next() : fn(req, res, next)
export default except
