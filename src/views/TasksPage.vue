<template>
  <v-container>
    <v-row justify="space-between" class="mb-4">
      <v-col>
        <h1 class="text-h5 font-weight-medium">Tasky — Kanban Board</h1>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" class="mr-2" @click="openAdd">Add Task</v-btn>
        <v-btn color="error" @click="clearAll">Clear All Tasks</v-btn>
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

function clearAll() {
  store.clearAllTasks()
}

function applyFilters(payload) {
  filters.value = payload
}
</script>

<style lang="scss" scoped>
.tasks-page {
  background-color: #001d4a;
  min-height: 100vh;
  padding: 16px;
}
</style>
