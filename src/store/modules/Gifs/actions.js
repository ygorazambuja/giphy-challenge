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

    commit(MutationTypes.UPDATE_FAVOURITE_GIFS, { favouriteGifs });
    await addGifOnApi(gif);
  },

  [ActionTypes.REMOVE_FAVOURITE_GIF]: async ({ commit, state }, payload) => {
    const { id } = payload;

    const favouriteGifs = state.favouriteGifs.filter((gif) => gif.id !== id);

    commit(MutationTypes.UPDATE_FAVOURITE_GIFS, { favouriteGifs });
    await removeGifOnApi(id);
  },
  [ActionTypes.UPDATE_FAVOURITE_GIF]: async ({ commit, state }, gif) => {
    const favouriteGifs = state.favouriteGifs.map((favouriteGif) =>
      favouriteGif.id === gif.id ? gif : favouriteGif
    );

    commit(MutationTypes.UPDATE_FAVOURITE_GIFS, { favouriteGifs });
    await updateGifByIdOnApi(gif.id, gif);
  },

  toggleFavouriteGif({ state, dispatch }, payload) {
    if (state.favouriteGifs.some((gif) => gif.id === payload.id)) {
      dispatch(ActionTypes.REMOVE_FAVOURITE_GIF, payload);
    } else {
      dispatch(ActionTypes.ADD_FAVOURITE_GIF, payload);
    }
  },
};
