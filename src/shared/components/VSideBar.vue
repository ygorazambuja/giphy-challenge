<script>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

export default {
  props: {
    open: {
      type: Boolean,
      required: true,
      default: false
    },
    onClose: {
      type: Function,
      required: true,
      default: () => { }
    }
  },
  setup(props) {

    const target = ref(null)
    onClickOutside(target, () => handleClose())

    function handleClose() {
      props.onClose();
    }

    return {
      handleClose,
      props,
      target,
    };
  }
}
</script>

<template>
  <div
    ref="target"
    :class="['ui sidebar vertical right menu', { visible: props.open }]"
  >
    <slot />
  </div>
</template>

