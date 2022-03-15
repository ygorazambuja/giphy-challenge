import { computed } from "vue";
import { useStore } from "vuex";

export default function useLoading() {
  const { state, dispatch } = useStore();

  function toggleLoading(payload) {
    dispatch("Loading/toggleLoading", payload);
  }

  const isLoading = computed(() => {
    return state.Loading.isLoading;
  });

  return {
    isLoading,
    toggleLoading,
  };
}
