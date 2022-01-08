import Log from "@app/monitoring/log";
import { createGateway } from "@app/protos/gateway.twirp";
import { createWeatherAPIServer } from "@app/protos/service.twirp";
import type { Application } from "express";

const log = Log.child({
  type: "PORT",
  port: "twirp",
});

interface PortCTX<T> {
  data?: T;
  assign: (v: T) => void;
}

export type HTTPPortType = Application;

export const newInstance = async (httpPortCtx: PortCTX<HTTPPortType>) => {
  log.trace({ httpPortCtx }, "Starting new Twirp Port Instance");

  if (!httpPortCtx.data) {
    throw new TypeError(
      `Cannot create a Twirp Port without an HTTP Port. Given "${typeof httpPortCtx.data}" instead`
    );
  }

  const server = createWeatherAPIServer({
    SayHello: async (_, { name }) => {
      log.trace({ name }, "NAME INCOMING");
      return {
        response: `Hello ${name}!`,
      };
    },
    GetCurrentWeather: async () => ({
      f: 69.0,
      c: 420.0,
    }),
  });

  const gateway = createGateway();

  httpPortCtx.data
    .use(gateway.twirpRewrite())
    .post(server.matchingPath(), server.httpHandler())
    .get(server.matchingPath(), server.httpHandler());

  return httpPortCtx;
};
