<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="!dataPagination.linkPagination.first  ? 'disabled' : ''">
        <button class="page-link" @click="$emit('clicked',1)" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>
      <li class="page-item" :class="!dataPagination.linkPagination.prev ? 'disabled' : ''">
        <button
          @click="$emit('clicked', dataPagination.linkPagination.prev)"
          class="page-link"
          href="#"
        >
          <span aria-hidden="true">&lt;</span>
        </button>
      </li>
      <li
        class="page-item"
        :class="i+1 === dataPagination.currentPage ? 'active' : ''"
        v-for="(page, i) in dataPagination.pagination.totalPages"
        :key="i"
      >
        <button @click="$emit('clicked', i+1)" class="page-link" href="#">{{i+1}}</button>
      </li>
      <li class="page-item" :class="!dataPagination.linkPagination.next ? 'disabled' : ''">
        <button
          @click="$emit('clicked', dataPagination.linkPagination.next)"
          class="page-link"
          href="#"
        >
          <span aria-hidden="true">&gt;</span>
        </button>
      </li>
      <li class="page-item" :class="!dataPagination.linkPagination.last ? 'disabled' : ''">
        <button
          @click="$emit('clicked', dataPagination.linkPagination.last)"
          class="page-link"
          href="#"
        >
          <span aria-hidden="true">&raquo;</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['dataPagination']
}
</script>

<style lang="scss" scoped>
</style>
