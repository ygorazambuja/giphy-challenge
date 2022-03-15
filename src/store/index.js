import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";
import Gifs from "./modules/Gifs";
import Toast from "./modules/Toast";
import Loading from "./modules/Loading";

export const store = createStore({
  devtools: true,
  modules: {
    Gifs,
    Toast,
    Loading,
  },
  plugins: [new VuexPersistence().plugin],
});
