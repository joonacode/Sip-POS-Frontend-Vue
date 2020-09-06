<template>
  <b-col md="12" v-if="showSearch">
    <div class="search-section mb-4 mt-2" :class="[result ? 'active' : '', '']">
      <div>
        <span
          v-if="result"
          class="badge badge-primary mr-2 p-2 search-result"
          style="cursor:default"
        >
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
            <input
              type="text"
              v-model="name"
              name="search"
              class="form-control rounded-0"
              placeholder="Search product"
              v-focus
            />
            <button type="submit" class="btn rounded-0 border-0 btn-primary">
              <b-icon icon="search" font-scale="1"></b-icon>
            </button>
          </div>
        </form>
      </div>
    </div>
  </b-col>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      result: '',
      name: ''
    }
  },
  methods: {
    ...mapActions('product', ['getProducts']),
    ...mapMutations('product', ['UPDATE_SEARCH_INPUT_TEXT', 'CHANGE_ORDERING']),
    searchAction() {
      this.getProducts({
        search: this.name,
        limit: this.roleId !== 3 ? 9 : 12
      })
      this.result = this.name
      this.UPDATE_SEARCH_INPUT_TEXT(this.name)
      this.name = ''
    },
    removeResult() {
      this.result = ''
      this.name = ''
      this.getProducts({ limit: this.roleId !== 3 ? 9 : 12 })
      this.UPDATE_SEARCH_INPUT_TEXT('')
      this.CHANGE_ORDERING({ order: 'id', sort: 'desc' })
    }
  },
  computed: {
    ...mapState('product', ['search', 'showSearch', 'totalProduct']),
    ...mapState('auth', ['roleId'])
  }
}
</script>

<style scoped>
.search-result {
  font-size: 15px !important;
  font-weight: normal;
}
.search-inp {
  border-radius: auto 0 0 auto;
}
.btn-inp {
  border-radius: 0 auto auto 0 !important;
}
.search-section {
  display: flex;
  justify-content: center;
}

.search-section.active {
  justify-content: space-between;
}

@media screen and (max-width: 450px) {
  .search-section {
    flex-direction: column-reverse;
    align-items: center;
  }
  .search-result {
    margin-top: 10px;
  }
}
</style>
