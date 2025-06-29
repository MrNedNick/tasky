import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import TasksPage from '@/views/TasksPage.vue'

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: TasksPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
