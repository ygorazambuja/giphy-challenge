<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";

import { fetchGifs } from "../services/giphy";
import GifCardList from "./components/GifCardList.vue";
import VButton from "../shared/components/VButton.vue";
import VInput from "../shared/components/VInput.vue";
import useToast from "../shared/hooks/useToast";
import GifDetails from "./components/GifDetails.vue";

export default {
  components: {
    GifCardList,
    VButton,
    VInput,
    GifDetails,
  },
  setup() {
    const {
      state,
      getters,
    } = useStore();
    const gifs = ref([]);
    const favouriteGifs = computed(() => state.Gifs.favouriteGifs);
    const selectedGif = ref({});
    const isLoading = ref(false);
    const search = ref("");
    const isDetailsOpen = ref(false)
    const isOpen = ref(false);

    const pagination = ref({ offset: 0, limit: 10 });

    const { showToast } = useToast()

    let favouriteGifsCount = computed(() => {
      return getters["Gifs/favouriteGifsCount"];
    });

    async function asyncFetchGifs() {
      try {
        setIsLoading(true);
        const { data } = await fetchGifs({
          searchTerm: search.value,
          limit: pagination.value.limit,
          offset: pagination.value.offset
        });

        gifs.value = data
      } catch (error) {
        showToast({ message: "Ocorreu um erro", type: "error" });
      } finally {
        setIsLoading(false);
      }
    }

    function handleAsyncFetchGifs() {
      asyncFetchGifs();
    }

    function setIsLoading(value) {
      isLoading.value = value;
    }

    function handleOpenDetails(gif) {
      selectedGif.value = gif;
      isDetailsOpen.value = true;
    }

    function handleCloseDetails() {
      isDetailsOpen.value = false;
      selectedGif.value = {};
    }

    async function asyncHandleLoadMore() {
      pagination.value.offset += pagination.value.limit;
      const { data } = await fetchGifs({
        searchTerm: search.value,
        limit: pagination.value.limit,
        offset: pagination.value.offset
      });

      gifs.value.push(...data);
    }

    return {
      handleAsyncFetchGifs,
      handleOpenDetails,
      handleCloseDetails,
      asyncHandleLoadMore,
      isDetailsOpen,
      favouriteGifsCount,
      favouriteGifs,
      gifs,
      search,
      isLoading,
      isOpen,
      selectedGif,
    };
  },
};
</script>

<template>
  <div
    class="ui container"
  >
    <div v-if="isDetailsOpen">
      <gif-details
        :open="isDetailsOpen"
        :gif="selectedGif"
        :on-close="handleCloseDetails"
      />
    </div>
    <h1>Giphy</h1>
    <div class="ui stackable two column grid centered">
      <div class="column">
        <v-input
          v-model="search"
          placeholder="Dogs"
        />
      </div>
      <div class="column">
        <v-button
          :is-loading="isLoading"
          fluid
          type="primary"
          @click="handleAsyncFetchGifs"
        >
          Search
        </v-button>
      </div>
    </div>
    <div v-if="!isLoading">
      <gif-card-list
        :gifs="gifs"
        :on-click="handleOpenDetails"
      />
    </div>
    <div
      v-if="gifs.length > 0"
      class="ui grid centered bottom-container"
    >
      <v-button
        type="primary"
        :on-click="asyncHandleLoadMore"
      >
        <span>Carregar Mais</span>
      </v-button>
    </div>
  </div>
</template>

<style scoped>
.bottom-container {
  padding: 20px;
}
</style>
