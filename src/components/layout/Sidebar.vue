<template>
    <div class="sidebar">
      <div class="sidebar-sub">
        <router-link to="/" class="sidebar-item">
          <img :src="require(`../../assets/images/fork.png`)" alt="food" />
        </router-link>
        <router-link to="/history" class="sidebar-item">
          <img :src="require(`../../assets/images/clipboard.png`)" alt="history" />
        </router-link>
        <button type="button" class="btn sidebar-item" data-toggle="modal" data-target="#addMenu">
          <img :src="require(`../../assets/images/add.png`)" alt="add" />
        </button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Sidebar'
}

</script>

<style lang="scss" scoped>

</style>
