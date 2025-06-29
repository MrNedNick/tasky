<template>
  <v-container class="home">
    <v-row justify="center">
      <v-col cols="12" md="8" class="text-center">
        <h1 class="text-h4 font-weight-medium mb-4">Welcome to Tasky</h1>
        <p class="mb-6">Your personal Kanban board to track tasks.</p>
        <v-btn color="primary" @click="goToTasks">Go to Tasks</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToTasks() {
  router.push({ name: 'Tasks' })
}
</script>

<style lang="scss" scoped>
.home {
  padding-top: 80px;
}
</style>
