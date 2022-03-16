import { createServer } from "miragejs";
import { routes } from "./routes";
import { models } from "./model";
import { seeds } from "./seeds";
import { API_URL } from "../../../configs/env";

export function startMirageServer() {
  createServer({
    seeds,
    models,
    routes,
    timing: 1000,
  });
}
