export default {
  showToast(state, payload) {
    state.show = true;
    state.type = payload.type;
    state.message = payload.message;
  },
  hideToast(state) {
    state.show = false;
    state.type = "";
    state.message = "";
  },
};
