<template>
  <div class="card-header bg-light d-flex justify-content-between align-items-center">
    <h3 class="card-title mb-0">{{title}}</h3>
    <div>
      <MainButton
        @cus-click="$emit('refresh-body')"
        class="mr-2"
        variant="primary"
        :isLoading="getLoading"
      >
        <b-icon icon="arrow-clockwise" />
      </MainButton>
      <b-button @click="$emit('add-modal')" v-b-modal.modal-primary variant="primary">Add {{title}}</b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MainButton from '@/components/ui/MainButton'

export default {
  name: 'ProductHeaderCard',
  props: {
    limit: Number,
    title: String
  },
  components: {
    MainButton
  },
  computed: mapGetters(['getLoading'])
}
</script>

<style scoped>
</style>
