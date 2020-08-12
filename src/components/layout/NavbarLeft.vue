<template>
    <div class="navbar-left border-right">
      <button type="button" @click="toggleMenu" class="btn m-0 p-0 hamburger text-decoration-none">
        <img width="25" height="25" :src="require(`../../assets/images/menu.png`)" alt="menu" />
      </button>
      <div class="navbar-title">Food Items</div>
      <div>
        <button type="button" class="btn py-0 position-relative" data-toggle="modal" data-target="#modalCart"
          id="modal-cart">
          <svg width="28" height="28" viewBox="0 0 16 16" class="bi bi-cart" fill="currentColor"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
          </svg>
          <span class="badge badge-info rounded-circle cart-ic-res">0</span>
        </button>
        <button class="btn p-0 m-0">
          <div v-if="!history">
            <img width="25" height="25" :src="require(`../../assets/images/search.png`)" alt="search" />
          </div>
        </button>

      </div>
  </div>
</template>

<script>
export default {
  name: 'NavbarLeft',
  props: ['history'],
  methods: {
    toggleMenu () {
      const sidebar = document.querySelector('.sidebar')
      sidebar.classList.toggle('active')
      document.querySelector('.content-left').classList.toggle('active')
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
