<template>
  <v-select
    :items="props.items"
    :label="props.label"
    :placeholder="props.placeholder"
    :model-value="props.modelValue"
    :disabled="props.disabled"
    :clearable="props.clearable"
    :variant="props.variant"
    :density="props.density"
    @update:modelValue="updateValue"
    class="select-component"
  />
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Number, Object],
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: 'outlined',
  },
  density: {
    type: String,
    default: 'comfortable',
  },
})

const emit = defineEmits(['update:modelValue'])

function updateValue(value) {
  emit('update:modelValue', value)
}
</script>

<style lang="scss" scoped>
.select-component {
  min-width: 200px;
}
</style>
