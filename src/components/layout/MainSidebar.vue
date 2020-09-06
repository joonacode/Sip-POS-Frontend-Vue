<template>
  <div class="sidebar">
    <div class="sidebar-sub">
      <router-link
        title="Home"
        :to="{name: 'Home'}"
        class="sidebar-item"
        v-active="currentRouteName"
      >
        <img :src="require(`@/assets/images/fork.png`)" alt="food" />
      </router-link>
      <router-link
        v-if="roleId === 1 || roleId === 2"
        title="History"
        :to="{name: 'History'}"
        class="sidebar-item"
        v-active="currentRouteName"
      >
        <img :src="require(`@/assets/images/clipboard.png`)" alt="history" />
      </router-link>
      <router-link
        v-if="roleId === 1"
        title="Product"
        :to="{name: 'Product'}"
        class="sidebar-item"
        v-active="currentRouteName"
      >
        <b-icon icon="box" font-scale="1.5"></b-icon>
      </router-link>
      <router-link
        v-if="roleId === 1"
        title="Category"
        :to="{name: 'Category'}"
        class="sidebar-item"
        v-active="currentRouteName"
      >
        <img :src="require(`@/assets/images/category.png`)" alt="history" />
      </router-link>
      <router-link
        v-if="roleId === 1"
        title="Users"
        :to="{name: 'Users'}"
        class="sidebar-item"
        v-active="currentRouteName"
      >
        <img :src="require(`@/assets/images/users.png`)" alt="users" />
      </router-link>
      <router-link
        title="Profile"
        :to="{name: 'Profile'}"
        class="sidebar-item"
        v-active="currentRouteName"
      >
        <b-icon icon="person" scale="2" />
      </router-link>
      <ButtonLogout classBtn="btn m-0 p-0 sidebar-item">
        <b-icon icon="box-arrow-in-left" scale="1.5" />
      </ButtonLogout>
    </div>
    <b-modal id="modal-logout" title="Logout">
      <p class="my-4">Hello from modal!</p>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ButtonLogout from '@/components/molecules/ButtonLogout'
export default {
  name: 'Sidebar',
  directives: {
    active: {
      inserted: (el, binding) => {
        if (el.title === binding.value) {
          el.classList.add('active')
        }
      }
    }
  },
  components: {
    ButtonLogout
  },
  computed: {
    currentRouteName() {
      return this.$route.name
    },
    ...mapState('auth', ['roleId'])
  }
}
</script>

<style scoped>
.sidebar-item {
  animation: 1s ease-in-out;
}
.sidebar-item.active {
  animation: 1s ease-in-out;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
}
.sidebar-item.active:nth-child(1) {
  margin-top: 10px;
}
</style>
