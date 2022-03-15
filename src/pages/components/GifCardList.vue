<script>
import GifCard from "./GifCard.vue";

export default {
  components: {
    GifCard,
  },

  props: {
    gifs: {
      type: Array,
      required: true,
    },
    onClick: {
      type: Function,
      required: false,
      default: () => {},
    }
  },

  setup(props) {
    return {
      props,
    };
  },
};
</script>

<template>
  <div
    v-if="props?.gifs?.length > 0"
    class="ui cards centered"
  >
    <gif-card
      v-for="gif in props.gifs"
      :key="gif.id"
      :gif="gif"
      @click="props.onClick(gif)"
    />
  </div>
</template>
