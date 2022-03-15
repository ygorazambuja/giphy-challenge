export const MutationTypes = {
  UPDATE_FAVOURITE_GIFS: "UPDATE_FAVOURITE_GIFS",
  UPDATE_SELECTED_GIF: "UPDATE_SELECTED_GIF",
};

export default {
  [MutationTypes.UPDATE_FAVOURITE_GIFS]: (state, data) => {
    state.favouriteGifs = data.favouriteGifs;
  },
  [MutationTypes.UPDATE_SELECTED_GIF]: (state, data) => {
    state.selectedGif = data.selectedGif;
  },
};
