import {
  addGifOnApi,
  removeGifOnApi,
  updateGifByIdOnApi,
} from "../../../services/api";
import { MutationTypes } from "./mutations";

export const ActionTypes = {
  ADD_FAVOURITE_GIF: "ADD_FAVOURITE_GIF",
  REMOVE_FAVOURITE_GIF: "REMOVE_FAVOURITE_GIF",
  UPDATE_FAVOURITE_GIF: "UPDATE_FAVOURITE_GIF",
};

export default {
  [ActionTypes.ADD_FAVOURITE_GIF]: async ({ commit, state }, gif) => {
    const favouriteGifs = [...state.favouriteGifs, gif];

    await addGifOnApi(gif);

    commit(MutationTypes.UPDATE_FAVOURITE_GIFS, { favouriteGifs });
  },

  [ActionTypes.REMOVE_FAVOURITE_GIF]: async ({ commit, state }, payload) => {
    const { id } = payload;

    const favouriteGifs = state.favouriteGifs.filter((gif) => gif.id !== id);

    await removeGifOnApi(id);

    commit(MutationTypes.UPDATE_FAVOURITE_GIFS, { favouriteGifs });
  },
  [ActionTypes.UPDATE_FAVOURITE_GIF]: async ({ commit, state }, gif) => {
    const favouriteGifs = state.favouriteGifs.map((favouriteGif) =>
      favouriteGif.id === gif.id ? gif : favouriteGif
    );

    await updateGifByIdOnApi(gif.id, gif);

    commit(MutationTypes.UPDATE_FAVOURITE_GIFS, { favouriteGifs });
  },

  toggleFavouriteGif({ state, dispatch }, payload) {
    if (state.favouriteGifs.some((gif) => gif.id === payload.id)) {
      dispatch(ActionTypes.REMOVE_FAVOURITE_GIF, payload);
    } else {
      dispatch(ActionTypes.ADD_FAVOURITE_GIF, payload);
    }
  },
};
