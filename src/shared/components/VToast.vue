<script>
import { computed } from "vue";
export default {
  name: 'VToast',
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      default: "success",

    },
    show: {
      type: Boolean,
      required: true,
      default: false,
    }
  },
  setup(props) {

    const isSuccess = computed(() => props.type === "success");
    const isError = computed(() => props.type === "error");

    return {
      props,
      isSuccess,
      isError,
    }
  }
}
</script>

<template>
  <div
    v-if="props.show"
    class="ui container toast"
  >
    <div :class="['ui', 'icon', 'compact', 'message', { positive: isSuccess, negative: isError }]">
      <i class="circle loading" />
      <div class="content">
        <div class="header">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>


<style>
  .toast {
    position: fixed;
    z-index: 1000;
    right: 1rem;
  }
</style>
