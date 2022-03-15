<script>
import { onMounted, ref } from "vue"
import { useStore } from "vuex";

import GifCardList from "./components/GifCardList.vue";

import { addGifOnApi, getAllGifsOnApi } from "../services/api"
import useLoading from "../shared/hooks/useLoading";
import useToast from "../shared/hooks/useToast";


export default {
  components: {
    GifCardList,
  },

  setup() {
    const { isLoading, toggleLoading } = useLoading()
    const gifs = ref([])
    const { showToast } = useToast();
    const { state,  } = useStore()

    async function asyncFetchGifs() {
      try {
        toggleLoading(true)
        const { data } = await getAllGifsOnApi()
        gifs.value = data.gifs

      } catch (error) {
        showToast({ message: "Ocorreu um erro", type: "error" })
      } finally {
        toggleLoading(false)
      }
    }

    async function syncApiWithStore() {
      const { favouriteGifs } = state.Gifs

      if(favouriteGifs?.length === 0) return

      return await new Promise((resolve) => {
        favouriteGifs.forEach(async (gif) => {
          const gifIsOnFavourite = gifs.value.some(
            (favouriteGif) => favouriteGif.id === gif.id
          )

          if (!gifIsOnFavourite) await addGifOnApi(gif)

        })

        asyncFetchGifs()
        resolve()
      })
    }

    onMounted(async () => {
      await asyncFetchGifs()
      await syncApiWithStore()
    })

    return {
      isLoading, gifs,
    }
  }
}

</script>


<template>
  <div class="ui container">
    <h1>Favoritos da API</h1>
    <gif-card-list :gifs="gifs" />
  </div>
</template>
