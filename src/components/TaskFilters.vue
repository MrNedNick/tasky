<template>
  <v-card class="filters">
    <v-card-text>
      <v-text-field
        v-model="search"
        label="Search by title"
        prepend-inner-icon="mdi-magnify"
        clearable
        dense
        variant="outlined"
      />

      <v-select
        v-model="priority"
        :items="priorityOptions"
        label="Filter by priority"
        clearable
        dense
        variant="outlined"
      />

      <v-select
        v-model="status"
        :items="statusOptions"
        label="Filter by status"
        clearable
        dense
        variant="outlined"
      />
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, watch } from 'vue'

const search = ref('')
const priority = ref(null)
const status = ref(null)

const priorityOptions = ['Low', 'Medium', 'High']
const statusOptions = ['Open', 'In Progress', 'Done', 'Trash']

watch([search, priority, status], ([newSearch, newPriority, newStatus]) => {
  // console.log('Filters changed:', newSearch, newPriority, newStatus)
  // emit('filter-change', { search: newSearch, priority: newPriority, status: newStatus })
})
</script>

<style lang="scss" scoped>
.filters {
  margin-bottom: 16px;

  &__field {
    margin-bottom: 12px;
  }
}
</style>
