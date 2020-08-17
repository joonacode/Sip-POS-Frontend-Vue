<template>
  <div class="sidebar">
    <div class="sidebar-sub">
      <router-link :to="{name: 'Home'}" class="sidebar-item">
        <img :src="require(`@/assets/images/fork.png`)" alt="food" />
      </router-link>
      <router-link :to="{name: 'History'}" class="sidebar-item">
        <img :src="require(`@/assets/images/clipboard.png`)" alt="history" />
      </router-link>
      <router-link :to="{name: 'Product'}" class="sidebar-item">
        <b-icon icon="box" font-scale="1.5"></b-icon>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<style scoped>
</style>
