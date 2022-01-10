import Log from "@app/monitoring/log";
import * as Adapters from "@app/adapters";
import * as Ports from "@app/ports";
import WeatherModel from "@app/models/weather";

import { processSensorDataUpdates } from "@app/adapters/mq";

const main = async () => {
  Log.trace("Connecting the adapters");
  await Adapters.init();
  Log.trace("Adapters connected");
  Log.trace("Connecting the Ports");
  await Ports.init();

  Log.trace("Going to try to subscribe to the sensor data");

  processSensorDataUpdates(async ({ data }: any) => {
    if (data.type === "weather.data.current") {
      Log.debug({ data }, "Current Weather");
      const saved = await WeatherModel.create(data);
      Log.debug({ saved }, "Created In the Database");
    } else {
      Log.debug({ data }, "Sensor Lifecycle");
    }
  });
};

main().catch((err) => {
  Log.fatal({ err }, "System failed to start.");

  process.exit(1);
});
