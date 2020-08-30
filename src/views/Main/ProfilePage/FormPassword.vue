<template>
  <div>
    <div class="form-group">
      {{password.oldPassword}}
      <label>Old Password</label>
      <input type="text" v-model="password.oldPassword" class="form-control" />
    </div>
    <div class="form-group">
      <label>New Password</label>
      <input type="text" class="form-control" v-model="password.newPassword" />
    </div>
    <div class="form-group">
      <label>Verification New Password</label>
      <input type="text" class="form-control" v-model="password.verifyNewPassword" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['password']
}
</script>

<style scoped>
</style>
