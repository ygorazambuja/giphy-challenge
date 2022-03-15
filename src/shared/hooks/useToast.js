import { useStore } from "vuex";
import { computed } from "vue";

export default function useToast() {
  const { dispatch, state } = useStore();

  const message = computed(() => state.Toast.message);
  const show = computed(() => state.Toast.show);
  const type = computed(() => state.Toast.type);

  function showToast(payload) {
    dispatch("Toast/toggleToast", payload);
  }

  return { showToast, message, show, type };
}
