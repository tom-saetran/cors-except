import { NextFunction, Request, RequestHandler, Response } from "express"

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
 * ```ts
 * import cors from "cors"
 * import express from "express"
 * import except from "cors-except"
 *
 * const { FRONTEND_URL } = process.env
 * if (!FRONTEND_URL) throw new Error("FRONTEND_URL is missing")
 *
 * const server = express()
 *
 * const whitelist = [FRONTEND_URL]
 * const corsExceptions = [
 *   "/users/login/oauth/google/redirect",
 *   "/users/login/oauth/facebook/redirect"
 * ]
 *
 * const corsOptions: cors.CorsOptions = {
 *   origin: (origin, next) => {
 *     try {
 *       if (whitelist.indexOf(origin!) !== -1) next(null, true)
 *       else next(createError(400, "Cross-Site Origin Policy blocked your request"))
 *     } catch (error: any) {
 *       next(error)
 *     }
 *   },
 *   credentials: true
 * }
 *
 * server.use(except(corsExceptions, cors(corsOptions)))
 * ```
 */
export default function except(paths: string[], fn: RequestHandler): RequestHandler {
  return (req, res, next) => {
    const { path } = req
    if (paths.indexOf(path) !== -1) return next()
    return fn(req, res, next)
  }
}
