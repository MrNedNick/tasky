import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref([])

  const tasksByState = computed(() => {
    return (stateId) => tasks.value.filter((task) => task.state_id === stateId)
  })

  function addTask(task) {
    tasks.value.unshift(task)
  }

  function updateTask(id, updates) {
    const index = tasks.value.findIndex((t) => t.id === id)
    if (index !== -1) {
      tasks.value[index] = { ...tasks.value[index], ...updates }
    }
  }

  function deleteTask(id) {
    const index = tasks.value.findIndex((t) => t.id === id)
    if (index !== -1) {
      tasks.value[index].state_id = 4
    }
  }

  function restoreTask(id) {
    const index = tasks.value.findIndex((t) => t.id === id)
    if (index !== -1) {
      tasks.value[index].state_id = 1
    }
  }

  return {
    tasks,
    tasksByState,
    addTask,
    updateTask,
    deleteTask,
    restoreTask,
  }
})
