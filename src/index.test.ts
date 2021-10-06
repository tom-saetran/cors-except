import except from "."
import { RequestHandler } from "express"

describe("cors-except tests", () => {
  it("should test that except passes a valid request path through", () => {
    const req = { path: "/test" } as any
    const mockHandler = jest.fn<RequestHandler, any[]>()
    const next = jest.fn()
    except(["/test"], mockHandler)(req, {} as any, next)
    expect(next).toHaveBeenCalled()
  })

  it("should test that except does not pass an invalid request path through", () => {
    const req = { path: "/test" } as any
    const mockHandler = jest.fn<RequestHandler, any[]>()
    const next = jest.fn()
    except(["/not_test"], mockHandler)(req, {} as any, next)
    expect(next).not.toHaveBeenCalled()
  })
})
