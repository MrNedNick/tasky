<template>
  <v-row class="kanban" no-gutters>
    <v-col v-for="(state, index) in columns" :key="index" cols="12" md="3" class="kanban__column">
      <div class="kanban__header">
        <h3 class="kanban__title">
          {{ state.title }} ({{ filteredTasksByState(state.id).length }})
        </h3>
      </div>
      <draggable
        class="kanban__list"
        :list="filteredTasksByState(state.id)"
        group="tasks"
        item-key="id"
        @end="onDragEnd"
      >
        <template #item="{ element }">
          <div :data-id="element.id">
            <TaskCard :task="element" @edit="editTask(element)" />
          </div>
        </template>
      </draggable>
    </v-col>
  </v-row>
</template>

<script setup>
import { useTasksStore } from '@/store/useTasksStore'
import draggable from 'vuedraggable'
import TaskCard from './TaskCard.vue'

const props = defineProps({
  filters: {
    type: Object,
    default: () => ({
      search: '',
      priority: null,
      status: null,
    }),
  },
})

const store = useTasksStore()

const columns = [
  { id: 1, title: 'Open' },
  { id: 2, title: 'In Progress' },
  { id: 3, title: 'Done' },
  { id: 4, title: 'Trash' },
]

function filteredTasksByState(stateId) {
  return store.tasksByState(stateId).filter((task) => {
    const searchMatch = props.filters.search
      ? task.title.toLowerCase().includes(props.filters.search.toLowerCase())
      : true

    const priorityMatch = props.filters.priority ? task.priority === props.filters.priority : true

    const statusMatch = props.filters.status ? task.state_id === props.filters.status : true

    return searchMatch && priorityMatch && statusMatch
  })
}

function onDragEnd(evt) {
  const taskId = evt.item.dataset.id
  if (!taskId) return

  const newStateId = columns.find((col) =>
    evt.to
      .closest('.kanban__column')
      .querySelector('.kanban__title')
      .textContent.startsWith(col.title),
  ).id

  store.updateTask(taskId, { state_id: newStateId })
}

function editTask(task) {
  console.log('Edit', task)
}
</script>

<style lang="scss" scoped>
.kanban {
  &__column {
    padding: 8px;
  }

  &__header {
    text-align: center;
    margin-bottom: 8px;
  }

  &__title {
    font-weight: 600;
    font-size: 16px;
  }

  &__list {
    min-height: 120px;
  }
}
</style>
