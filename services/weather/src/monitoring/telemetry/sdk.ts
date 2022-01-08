import * as openTel from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";

export default new openTel.NodeSDK({
  traceExporter: new openTel.tracing.ConsoleSpanExporter(),
  instrumentations: [getNodeAutoInstrumentations()],
});
