import except from "."

describe("cors-except tests", () => {
  it("should test that except passes a defined request through", () => {
    const req = {} as any
    const next = jest.fn()
    except([], next)(req, {} as any, next)
    expect(next).toHaveBeenCalled()
  })

  it("should test that except passes a defined request path through", () => {
    const req = { path: "/test" } as any
    const next = jest.fn()
    except(["/test"], next)(req, {} as any, next)
    expect(next).toHaveBeenCalled()
  })
})
