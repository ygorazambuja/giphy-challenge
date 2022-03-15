<script>
import { computed } from 'vue'

export default {
  props: {
    onClick: {
      type: Function,
      default: () => { },
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    fluid: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "",
    },
    inverted: {
      type: Boolean,
      default: false,
    }
  },

  setup(props) {

    const primary = computed(() => props.type === "primary");
    const secondary = computed(() => props.type === "secondary");
    const success = computed(() => props.type === "success");

    return {
      props,
      primary,
      secondary,
      success
    }
  }
};
</script>

<template>
  <button
    :class="['ui', 'button',
             {
               'loading': isLoading,
               'fluid': fluid,
               'primary': primary,
               'secondary': secondary,
               'green': success,
               'inverted': inverted
             }
    ]"
    :disabled="isLoading"
    @click="onClick"
  >
    <slot />
  </button>
</template>
