import Log from "@app/monitoring/log";
import * as Env from "@app/config/env";
import * as HTTPPort from "@app/ports/http";
import * as TwirpPort from "@app/ports/twirp";
import { processSensorDataUpdates } from "@app/adapters/mq";

const main = async () => {
  await TwirpPort.newInstance(await HTTPPort.newInstance(Env.port));
  Log.trace("Going to try to subscribe to the sensor data");

  processSensorDataUpdates(({ data }: any) => {
    if (data.type === "weather.data.current") {
      Log.debug({ data }, "Current Weather");
    } else {
      Log.debug({ data }, "Sensor Lifecycle");
    }
  });
};

main().catch((err) => {
  Log.fatal({ err }, "System failed to start.");

  process.exit(1);
});
