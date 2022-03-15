<script>
import { computed, ref, watch } from "vue";

export default {
  props: {
    label: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    modelValue: {
      type: [String, Number],
      required: true,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],

  modelValue: { required: false },

  setup(props, { emit }) {

    watch(() => props.model, (value) => {
      emit('update:modelValue', value);
    });

    const name = computed(() => props.label || "input");
    const model = ref(props.modelValue);

    return {
      name,
      model
    };
  },
};
</script>

<template>
  <div class="ui form field container">
    <label>{{ label }}</label>
    <input
      v-model="model"
      :class="['ui', 'input', { 'disabled': disabled }]"
      type="text"
      :placeholder="placeholder"
      :name="name"
      :disabled="disabled"
      @input="$emit('update:modelValue', $event.target.value)"
    >
  </div>
</template>

<style scoped>
</style>
