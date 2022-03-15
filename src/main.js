import { createApp } from "vue";

import { router } from "./routes";
import { startMirageServer } from "./shared/plugins/mirage";
import { store } from "./store";
import { ENV_MODE } from "./configs/env";

import App from "./App.vue";

if (ENV_MODE === "development") {
  startMirageServer();
}

const app = createApp(App);

app.use(router);
app.use(store);

app.mount("#app");
