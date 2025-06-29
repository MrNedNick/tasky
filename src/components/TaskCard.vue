<template>
  <v-card
    class="task-card"
    elevation="2"
    @click="onEdit"
  >
    <v-card-text class="task-card__content">
      <span class="task-card__title">{{ task.title }}</span>
    </v-card-text>
  </v-card>
</template>

<script setup>
const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['edit'])

function onEdit() {
  emit('edit', props.task)
}
</script>

<style lang="scss" scoped>
.task-card {
  margin-bottom: 8px;
  cursor: pointer;

  &__content {
    padding: 12px;
  }

  &__title {
    font-size: 14px;
    font-weight: 500;
    word-break: break-word;
  }
}
</style>
