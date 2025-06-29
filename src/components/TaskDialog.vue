<template>
  <v-dialog
    :model-value="visible"
    @update:model-value="onClose"
    max-width="500"
  >
    <v-card>
      <v-card-title>
        {{ mode === 'add' ? 'Add Task' : 'Edit Task' }}
      </v-card-title>

      <v-card-text>
        <v-text-field
          v-model="localTask.title"
          label="Title"
          dense
        />

        <v-select
          v-model="localTask.state_id"
          :items="statusOptions"
          label="Status"
          dense
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn text @click="onClose">Cancel</v-btn>
        <v-btn color="primary" @click="onSave">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { reactive, watch, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const props = defineProps({
  mode: {
    type: String,
    default: 'add', // 'add' | 'edit'
  },
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  modelVisible: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['save', 'close'])

const visible = computed({
  get: () => props.modelVisible,
  set: (val) => {
    if (!val) onClose()
  },
})

const localTask = reactive({
  id: '',
  title: '',
  state_id: 1,
})

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      localTask.id = newVal.id || uuidv4()
      localTask.title = newVal.title || ''
      localTask.state_id = newVal.state_id || 1
    }
  },
  { immediate: true }
)

const statusOptions = [
  { title: 'Open', value: 1 },
  { title: 'In Progress', value: 2 },
  { title: 'Done', value: 3 },
]

function onSave() {
  emit('save', { ...localTask })
  onClose()
}

function onClose() {
  emit('close')
}
</script>

<style lang="scss" scoped>
</style>
