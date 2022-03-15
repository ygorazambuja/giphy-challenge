export const GifGetters = {
  favouriteGifsCount: "Gifs/favouriteGifsCount",
  isFavourite: "Gifs/isFavourite",
};

export default {
  favouriteGifsCount: (state) => {
    return state.favouriteGifs.length;
  },

  isFavourite: (state) => (id) => {
    return state.favouriteGifs.some((gif) => gif.id === id);
  },
};
