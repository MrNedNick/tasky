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
          <TaskCard :task="element" @edit="editTask(element)" />
        </template>
      </draggable>
    </v-col>
  </v-row>
</template>

<script setup>
import { computed } from 'vue'
import { useTasksStore } from '@/store/useTasksStore'
import draggable from 'vuedraggable'
import TaskCard from './TaskCard.vue'
import { toRefs } from 'vue'

// Принимаем filters как проп
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

// Список колонок
const columns = [
  { id: 1, title: 'Open' },
  { id: 2, title: 'In Progress' },
  { id: 3, title: 'Done' },
  { id: 4, title: 'Trash' },
]

// Метод, возвращающий отфильтрованные задачи
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

// Перемещение
function onDragEnd(evt) {
  const { item, to } = evt
  const newStateId = columns.find((col) =>
    to.closest('.kanban__column').querySelector('.kanban__title').textContent.startsWith(col.title),
  ).id
  store.updateTask(item.id, { state_id: newStateId })
}

// Редактирование
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
