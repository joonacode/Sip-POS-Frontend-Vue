<template>
  <b-col md="12" v-if="showSearch">
    <div
      class="d-flex mb-4 mt-2 justify-content-center"
      :class="[result ? 'justify-content-between' : '', 'justify-content-center']"
    >
      <div>
        <span v-if="result" class="badge badge-primary p-2 search-result" style="cursor:default">
          Search: {{result}} ({{totalProduct}})
          <a
            @click.prevent="removeResult"
            class="text-white text-decoration-none border-left pl-2 ml-1"
            style="cursor:pointer"
          >X</a>
        </span>
      </div>
      <div>
        <form @submit.prevent="searchAction" v-if="showSearch">
          <div class="input-group-append">
            <input type="text" v-model="name" class="form-control" placeholder="Search product" />
            <button type="submit" class="btn btn-primary">Search</button>
          </div>
        </form>
      </div>
    </div>
  </b-col>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      result: '',
      name: ''
    }
  },
  methods: {
    ...mapActions('product', [
      'getProducts',
      'updateSearchInputText',
      'changeOrdering'
    ]),
    searchAction() {
      this.getProducts({ search: this.name, limit: 9 })
      this.result = this.name
      this.updateSearchInputText(this.name)
      this.name = ''
    },
    removeResult() {
      this.result = ''
      this.name = ''
      this.getProducts({})
      this.updateSearchInputText('')
      this.changeOrdering({ order: 'id', sort: 'desc' })
    }
  },
  computed: mapState('product', ['search', 'showSearch', 'totalProduct'])
}
</script>

<style scoped>
.search-result {
  font-size: 15px !important;
  font-weight: normal;
}
</style>
