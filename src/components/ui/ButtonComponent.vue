<template>
  <v-btn
    :color="props.color"
    :disabled="props.disabled"
    :block="props.block"
    :loading="props.loading"
    :min-width="props.minWidth"
    :min-height="props.minHeight"
    :max-width="props.maxWidth"
    :max-height="props.maxHeight"
    :ripple="props.ripple"
    :rounded="props.rounded"
    :variant="props.secondary ? 'outlined' : props.variant"
    :class="{ 'button-component--uppercase': props.uppercase }"
    class="button-component"
  >
    <v-icon v-if="icon" class="mr-1" size="20px">{{ icon }}</v-icon>
    <slot />
  </v-btn>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  secondary: Boolean,
  color: {
    type: String,
    default: 'primary',
  },
  disabled: Boolean,
  icon: String,
  block: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  minWidth: {
    type: [Number, String],
    default: 90,
  },
  minHeight: {
    type: [Number, String],
    default: 40,
  },
  maxWidth: {
    type: [Number, String],
    default: '',
  },
  maxHeight: {
    type: [Number, String],
    default: '',
  },
  rounded: {
    type: [String, Number, Boolean],
    default: '4px',
  },
  ripple: {
    type: Boolean,
    default: true,
  },
  variant: {
    type: String,
    default: 'flat',
  },
  uppercase: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss" scoped>
.button-component {
  letter-spacing: inherit !important;

  &.bg-primary {
    color: #fff !important;
  }
  &.button-component--uppercase {
    text-transform: uppercase;
  }
  .v-btn__content {
    font-size: 14px;
  }
  &.v-btn--block {
    min-width: 100% !important;
  }
  &.v-btn--disabled {
    background-color: rgba(0, 0, 0, 0.12) !important;
    color: rgba(0, 0, 0, 0.26) !important;

    & i {
      color: rgba(0, 0, 0, 0.26) !important;
    }

    &.v-btn--variant-outlined {
      background-color: rgba(0, 0, 0, 0.02) !important;
      color: rgba(0, 0, 0, 0.86) !important;
    }

    &.v-btn--variant-plain {
      background-color: transparent !important;
      color: rgba(0, 0, 0, 0.26) !important;
      opacity: 1;
    }
  }

  &.v-btn--variant-plain {
    opacity: 1;
  }

  &.v-btn > .v-btn__overlay {
    transition: opacity 0.2s cubic-bezier(0.4, 0, 0.6, 1);
    opacity: 0;
  }

  &.v-btn:hover {
    opacity: 0.6;
    transition: opacity 0.12s;
  }
}
</style>
