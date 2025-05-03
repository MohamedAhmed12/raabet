import { NextRequest, NextResponse } from "next/server";

export function middlewarePipeline(middlewares: Function[]) {
  return async (req: NextRequest) => {
    let response = NextResponse.next();

    for (let middleware of middlewares) {
      response = await middleware(req, response);
      if (response) return response;
    }

    return response;
  };
}
