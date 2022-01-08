import { Gateway, Pattern } from "twirp-ts";
import { match } from "path-to-regexp";

export function createGateway() {
  return new Gateway({
    post: [
      {
        packageName: "weather.api",
        methodName: "SayHello",
        serviceName: "WeatherAPI",
        httpMethod: "post" as Pattern,
        matchingPath: "/hello{:query_string(\\?.*)}?",
        matcher: match("/hello{:query_string(\\?.*)}?"),
        bodyKey: "*",
        responseBodyKey: "",
      },
    ],
    get: [],
    put: [],
    patch: [],
    delete: [],
  });
}
