

<script >
export default {
  props: {
    isLoading: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    return props
  }
}
</script>
<template>
  <div v-if="isLoading">
    <div class="ui active inverted dimmer">
      <div class="ui text loader">
        Loading
      </div>
    </div>
  </div>
</template>
