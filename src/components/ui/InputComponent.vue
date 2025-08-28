<template>
  <v-text-field
    :model-value="props.modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    :label="props.label"
    :placeholder="props.placeholder"
    clearable
    dense
    variant="outlined"
    class="custom-input"
  />
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: 'Custom Input',
  },
  placeholder: {
    type: String,
    default: '',
  },
})
</script>
вnвувв
<style scoped>
.custom-input {
  max-width: 450px;

}
</style>
