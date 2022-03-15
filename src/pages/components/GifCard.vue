<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useClipboard } from "@vueuse/core";

import { GifGetters } from "../../store/modules/Gifs/getters";
import useToast from "../../shared/hooks/useToast";
import { ActionTypes } from "../../store/modules/Gifs/actions";

export default {
  props: {
    gif: {
      type: Object,
      required: true,
    },
    onClick: {
      type: Function,
      required: false,
      default: () => { },
    },
  },

  setup(props) {
    const { getters, state, dispatch } = useStore();
    const { showToast } = useToast()
    const { copy, isSupported, copied } = useClipboard({ source: props.gif.url });



    const isFavouriteGif = computed(() =>
      getters[GifGetters.isFavourite](props.gif.id)
    );

    function handleGifClick() {
      // router.push(`/gif/${props.gif.id}`);
      props.onClick()
    }

    function handleCopyClick() {
      try {
        copy(props.gif.url);
        return showToast({ message: "👍 Copiado !", type: "success" });
      } catch (error) {
        return showToast({ message: "Ocorreu um Erro", type: "error" });
      }
    }

    async function handleLikeClick() {
      const { favouriteGifs } = state.Gifs
      const { gif } = props

      if (favouriteGifs?.includes(gif)) {
        dispatch(`Gifs/${ActionTypes.REMOVE_FAVOURITE_GIF}`, gif);
        return showToast({ message: "👍 Removido !", type: "success" });

      }
      dispatch(`Gifs/${ActionTypes.ADD_FAVOURITE_GIF}`, gif);
      return showToast({ message: "👍 Adicionado !", type: "success" });
    }

    return {
      props,
      isFavouriteGif,
      handleLikeClick,
      copy,
      isSupported,
      handleCopyClick,
      copied,
      handleGifClick
    };
  },
};
</script>

<template>
  <div class="ui card">
    <div
      class="content"
      @click="handleGifClick"
    >
      <div class="right floated meta">
        <i class="info circle icon" />
      </div>
      <img
        class="ui avatar image"
        :src="props.gif?.user?.avatar_url ?? 'https://ui-avatars.com/api/?background=random'"
        alt="Avatar"
      >
      {{ props.gif?.user?.display_name ?? 'Sem usuário' }}
    </div>
    <div
      class="image"
      @click="handleGifClick"
    >
      <img
        class="card-gif"
        :src="props.gif?.images?.original?.url"
        :alt="props.gif?.title"
      >
    </div>
    <div class="content">
      <div class="header">
        {{ props.gif?.title }}
      </div>

      <div class="description">
        {{ props.gif?.username }}
      </div>

      <span
        v-if="isSupported"
        class="right floated"
        @click="handleCopyClick"
      >
        <i
          :class="[
            'clipboard',
            'icon',
            copied ? 'check' : 'copy',
            copied ? 'green' : 'grey',
          ]"
        />
      </span>
      <span
        class="right floated"
        @click="handleLikeClick"
      >
        <i
          :class="[
            'heart',
            'like',
            'icon',
            { outline: !isFavouriteGif, red: isFavouriteGif },
          ]"
        />
      </span>
    </div>
  </div>
</template>


<style scoped>
.card-gif {
  max-height: 200px;
  object-fit: cover;
}
</style>
