
<script>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";


export default {
  setup() {
    const isMenuVisible = ref(false)

    const toggleAppBarMenu = () => isMenuVisible.value = !isMenuVisible.value

    const handleClickOutside = () => isMenuVisible.value = false
    onClickOutside(isMenuVisible, handleClickOutside)



    return {
      isMenuVisible,
      toggleAppBarMenu
    }
  }
}


</script>

<template>
  <div
    style="margin-bottom: 8em;"
  >
    <div class="ui tablet computer only grid padded">
      <div class="ui top fixed borderless fluid huge menu">
        <div class="ui container">
          <div class="header item">
            EngeLink
          </div>
          <router-link
            to="/"
            class="item"
          >
            Home
          </router-link>
          <router-link
            to="/favoritos"
            class="item"
          >
            Favoritos
          </router-link>
          <router-link
            to="/gifs-api"
            class="item"
          >
            API
          </router-link>
        </div>
      </div>
    </div>
    <div class="ui mobile only padded grid">
      <div class="ui top fixed borderless huge fluid menu flex-wrap">
        <div class="header item">
          EngeLink
        </div>

        <div class="right menu">
          <div class="item">
            <button
              class="ui icon toggle basic button"
              @click="toggleAppBarMenu()"
            >
              <i class="content icon" />
            </button>
          </div>
        </div>
        <div
          class="ui vertical borderless fluid menu"
          :style="[{ 'display': isMenuVisible ? 'block' : 'none' }]"
        >
          <router-link
            to="/"
            class="active item"
          >
            Home
          </router-link>
          <router-link
            to="/favoritos"
            class="item"
          >
            Favoritos
          </router-link>
          <router-link
            to="/gifs-api"
            class="item"
          >
            API
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .flex-wrap {
    display: flex;
    flex-wrap: wrap;
  }
</style>
