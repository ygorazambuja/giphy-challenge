export default {
  toggleToast({ commit }, payload) {
    commit("showToast", payload);

    setTimeout(() => {
      commit("hideToast");
    }, 3000);
  },
};
