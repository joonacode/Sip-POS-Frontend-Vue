<template>
  <div class="bg-dark">
    <div class="container">
      <div class="row min-vh-100">
        <div class="col-md-12 mx-auto d-flex align-items-center justify-content-center flex-column">
          <h1 class="font-weight-bold text-center text-white">404 Page Not Found</h1>
          <router-link :to="{name:'Home'}" class="btn btn-danger shadow mt-4 btn-lg">Back To Home</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
</style>
