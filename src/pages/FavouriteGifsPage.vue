<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

import GifCardList from "./components/GifCardList.vue";
import GifDetails from "./components/GifDetails.vue";

export default {
  components: { GifCardList, GifDetails },
  setup() {
    const { state } = useStore();
    const isDetailsOpen = ref(false)
    const selectedGif = ref({})

    const favouriteGifs = computed(() => state.Gifs.favouriteGifs);

    function handleOpenDetails(gif) {
      selectedGif.value = gif;
      isDetailsOpen.value = true;
    }

    function handleCloseDetails() {
      isDetailsOpen.value = false;
      selectedGif.value = {};
    }

    return {
      handleOpenDetails,
      handleCloseDetails,
      favouriteGifs,
      isDetailsOpen,
      selectedGif
    };
  },
};
</script>

<template>
  <div class="ui container">
    <h1>Favoritos</h1>

    <div v-if="isDetailsOpen">
      <gif-details
        :open="isDetailsOpen"
        :gif="selectedGif"
        :on-close="handleCloseDetails"
      />
    </div>

    <div>
      <gif-card-list
        :gifs="favouriteGifs"
        :on-click="handleOpenDetails"
      />
    </div>
  </div>
</template>
