<template>
  <div class="card border-0" :class="[shadow]">
    <div
      v-if="isHeader"
      class="card-header bg-light d-flex justify-content-between align-items-center"
    >
      <h4 class="card-title text-dark mb-0">{{title}}</h4>
      <div v-if="!noButtonHeader">
        <g-button
          @cus-click="$emit('refresh-body')"
          class="mr-2"
          variant="primary"
          :isLoading="getLoading"
        >
          <b-icon icon="arrow-clockwise" />
        </g-button>
        <b-button
          @click="$emit('add-modal')"
          v-b-modal.modal-primary
          variant="primary"
        >Add {{title}}</b-button>
      </div>
    </div>
    <slot name="customHeader"></slot>
    <div class="card-body">
      <slot name="cardBody"></slot>
    </div>
    <div class="card-footer" v-if="isFooter">
      <slot name="cardFooter"></slot>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    title: {
      type: String
    },
    isHeader: {
      type: Boolean,
      default: true
    },
    noButtonHeader: {
      type: Boolean,
      default: false
    },
    isFooter: {
      type: Boolean,
      default: false
    },
    shadow: {
      type: String,
      default: 'shadow'
    }
  },
  computed: mapGetters(['getLoading'])
}
</script>

<style scoped>
</style>
