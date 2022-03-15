<script>
import VSideBar from "../../shared/components/VSideBar.vue";
import VButton from "../../shared/components/VButton.vue";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { GifGetters } from "../../store/modules/Gifs/getters";
import useToast from "../../shared/hooks/useToast";
import { useRouter } from "vue-router";
export default {
  components: { VSideBar, VButton },
  props: {
    gif: {
      type: Object,
      required: true
    },
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
    const { getters, dispatch } = useStore()
    const isFavourite = computed(() => getters[GifGetters.isFavourite](props?.gif?.id))

    const { showToast } = useToast()
    const router = useRouter()

    function handleToggleFavourite() {
      if (isFavourite.value) {
        dispatch("Gifs/toggleFavouriteGif", props.gif)
        showToast({ message: "Gif removido dos favoritos", type: "success" })
        return props.onClose()
      }
      dispatch("Gifs/toggleFavouriteGif", props.gif)
      showToast({ message: "Gif adicionado aos favoritos", type: "success" })
      return props.onClose()
    }

    function handleRedirectEdit() {
      props.onClose()
      return router.push({ name: "GifDetailsPage", params: { id: props.gif.id } })
    }

    return {
      props,
      isFavourite,
      handleToggleFavourite,
      handleRedirectEdit
    };
  }
}
</script>


<template>
  <v-side-bar
    :open="props.open"
    :on-close="props.onClose"
  >
    <div class="ui container">
      <div>
        <div class="ui segment">
          ID: {{ props.gif?.id }}
        </div>
        <div class="ui segment">
          Rating: {{ props.gif?.rating }}
        </div>
        <div class="ui segment">
          Username: {{ props.gif?.user?.username }}
        </div>
        <div class="ui segment">
          Instagram: {{ props.gif?.user?.instagram_url }}
        </div>
      </div>
    </div>
    <div class="action-bar">
      <v-button :on-click="handleToggleFavourite">
        <i
          class="heart icon"
          :class="[{ red: isFavourite }]"
        />
        <span>{{ isFavourite ? 'Desfavoritar' : 'Favoritar' }}</span>
      </v-button>
      <v-button :on-click="handleRedirectEdit">
        <i class="edit icon" />
        <span>Editar</span>
      </v-button>
    </div>
  </v-side-bar>
</template>

<style>
.action-bar {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
