<template>
  <v-container>
    <v-row justify="space-between" class="mb-4">
      <v-col>
        <h1 class="text-h5 font-weight-medium">Tasky — Kanban Board</h1>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" @click="openAdd">Add Task</v-btn>
      </v-col>
    </v-row>

    <TaskFilters @filter-change="applyFilters" />

    <KanbanBoard :filters="filters" @edit="openEdit" />

    <TaskDialog
      :model-visible="dialog"
      :model-value="task"
      :mode="mode"
      @save="saveTask"
      @close="dialog = false"
    />
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import KanbanBoard from '@/components/KanbanBoard.vue'
import TaskDialog from '@/components/TaskDialog.vue'
import TaskFilters from '@/components/TaskFilters.vue'
import { useTasksStore } from '@/store/useTasksStore'

const dialog = ref(false)
const mode = ref('add')
const task = ref({})
const filters = ref({
  search: '',
  priority: null,
  status: null,
})

const store = useTasksStore()

function openAdd() {
  mode.value = 'add'
  task.value = {}
  dialog.value = true
}

function openEdit(t) {
  mode.value = 'edit'
  task.value = t
  dialog.value = true
}

function saveTask(t) {
  if (mode.value === 'add') {
    store.addTask(t)
  } else {
    store.updateTask(t.id, t)
  }
}

function applyFilters(payload) {
  filters.value = payload
}
</script>
