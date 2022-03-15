<script>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

import VInput from "../shared/components/VInput.vue";
import VButton from "../shared/components/VButton.vue";

import { getGifById } from "../services/giphy";
import { GifGetters } from "../store/modules/Gifs/getters";
import { ActionTypes } from "../store/modules/Gifs/actions";

export default {
  components: { VInput, VButton },
  setup() {
    const route = useRoute();
    const routeId = computed(() => route.params.id);
    const isLoading = ref(false);
    const gif = ref({});
    const router = useRouter()
    const { getters, dispatch } = useStore()

    async function asyncFetchGifById() {
      try {
        setIsLoading(true);
        const data = await getGifById(routeId.value);
        gif.value = data;
      }
      catch (error) {
        // console.error(error)
      }
      finally {
        setIsLoading(false);
      }
    }

    function setIsLoading(value) {
      isLoading.value = value;
    }

    function handleGoBack() {
      router.back()
    }

    function asyncSubmitGif() {
      isGifOnFavorites() ?
        asyncHandleUpdateFromFavorites() :
        asyncHandleAddToFavorites()
    }

    async function asyncHandleUpdateFromFavorites() {
      await dispatch('Gifs/' + ActionTypes.UPDATE_FAVOURITE_GIF, gif.value)
    }

    async function asyncHandleAddToFavorites() {
      await dispatch('Gifs/' + ActionTypes.ADD_FAVOURITE_GIF, gif.value)
    }

    function isGifOnFavorites() {
      return getters[GifGetters.isFavourite](gif.value.id)
    }

    onMounted(asyncFetchGifById);

    // TODO: quando salvar, atualizar na store e na api
    // se o gif selecionado não tiver na store ter opção de adicionar
    // se o gif selecionado estiver na store, ter opção de deletar
    // não posso editar o ID
    // barra de ação inferior, ( adição e remoção - voltar tambem )
    // criar testes para componente

    return {
      routeId,
      gif,
      isLoading,
      handleGoBack,
      asyncSubmitGif
    };
  }
}
</script>

<template>
  <div class="ui container">
    <div v-if="isLoading">
      <div class="ui active centered inline loader" />
    </div>

    <div v-if="!isLoading">
      <img :src="gif.images?.original?.url">
      <form>
        <div class>
          <div class>
            <v-input
              v-model="gif.id"
              label="ID"
              disabled
            />
          </div>
          <div class>
            <v-input
              v-model="gif.title"
              label="Titulo"
            />
          </div>
        </div>
      </form>
    </div>

    <div
      id="button-container"
      class="ui grid centered"
    >
      <div class="six wide column">
        <v-button
          fluid
          type="secondary"
          inverted
          :on-click="handleGoBack"
        >
          Voltar
        </v-button>
      </div>
      <div class="six wide column">
        <v-button
          type="success"
          fluid
          :on-click="asyncSubmitGif"
        >
          Salvar
        </v-button>
      </div>
    </div>
  </div>
</template>

<style>
img {
  max-width: 100%;
}

#button-container {
  padding-top: 20px !important;
}

</style>

