<template>
  <div class="filters">
    <div class="filters__top">
      <InputComponent v-model="search" label="Search by title" placeholder="Enter task title" />
      <ButtonComponent
        :color="filtersVisible ? 'primary' : 'default'"
        :variant="filtersVisible ? 'outlined' : 'flat'"
        icon="mdi-filter"
        @click="toggleFilters"
      >
        Filters
      </ButtonComponent>
    </div>
    <div v-if="filtersVisible" class="filters__wrapper">
      <SelectComponent
        v-model="priority"
        :items="priorityOptions"
        label="Filter by priority"
        clearable
      />
      <SelectComponent v-model="status" :items="statusOptions" label="Filter by status" clearable />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import InputComponent from './ui/InputComponent.vue'
import ButtonComponent from './ui/ButtonComponent.vue'
import SelectComponent from './ui/SelectComponent.vue'

const search = ref('')
const priority = ref(null)
const status = ref(null)
const filtersVisible = ref(false)

const priorityOptions = ['Low', 'Medium', 'High']
const statusOptions = ['Open', 'In Progress', 'Done', 'Trash']

function toggleFilters() {
  filtersVisible.value = !filtersVisible.value
}

watch([search, priority, status], ([newSearch, newPriority, newStatus]) => {
  // emit('filter-change', { search: newSearch, priority: newPriority, status: newStatus })
})
</script>

<style lang="scss" scoped>
.filters {
  display: flex;
  flex-direction: column;
  gap: 12px;

  &__top {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__wrapper {
    display: flex;
    gap: 12px;
  }
}
</style>
