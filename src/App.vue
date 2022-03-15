<script>
import VAppBar from "./shared/components/VAppBar.vue";
import VToast from "./shared/components/VToast.vue";
import VLoading from "./shared/components/VLoading.vue";

import useLoading from "./shared/hooks/useLoading";
import useToast from "./shared/hooks/useToast";

export default {
  components: {
    VAppBar,
    VToast,
    VLoading
  },
  setup() {
    const { isLoading } = useLoading()
    const { message, show, type } = useToast()

    return {
      message, show, type, isLoading
    }
  }
}
</script>

<template>
  <div id="app">
    <v-app-bar />
    <v-toast
      :type="type"
      :message="message"
      :show="show"
    />
    <v-loading :is-loading="isLoading" />
    <router-view />
  </div>
</template>
