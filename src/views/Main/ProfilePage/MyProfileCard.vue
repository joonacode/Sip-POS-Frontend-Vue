<template>
  <ProfileCard>
    <template #header>My Profile</template>
    <template #body>
      <div class="d-flex">
        <div class="mr-3">
          <img
            :src="getDetailUser.image === null || getDetailUser.image === 'null' ? require(`@/assets/images/profile.png`) : getDetailUser.image"
            width="100"
            class="img-fluid img-thumbnail rounded-circle"
            alt
          />
        </div>
        <div class="detail">
          <p>Name: {{getDetailUser.nameBc}}</p>
          <p>Email: {{getDetailUser.email}}</p>
          <p>Gender: {{getDetailUser.gender === 'm' ? 'Male' : "Female"}}</p>
          <p>Role: {{getDetailUser.roleName}}</p>
        </div>
      </div>
    </template>
    <template #footer>
      <ButtonLogout classBtn="btn mr-2 my-1 btn-primary shadow">
        <span class="mr-2">Logout</span>
        <b-icon icon="box-arrow-in-left" scale="1" />
      </ButtonLogout>
      <b-button
        @click="$emit('show-modal', 'profile')"
        v-b-modal.modal-primary
        class="mr-2 my-1 shadow"
        variant="primary"
      >Update Profile</b-button>
      <b-button
        @click="$emit('show-modal', 'password')"
        v-b-modal.modal-primary
        class="mr-2 my-1 shadow"
        variant="primary"
      >Change Password</b-button>
    </template>
  </ProfileCard>
</template>

<script>
import { mapGetters } from 'vuex'
import ButtonLogout from '@/components/ButtonLogout'
import ProfileCard from '@/components/ProfileCard'
export default {
  name: 'MyProfileCard',
  components: {
    ProfileCard,
    ButtonLogout
  },
  computed: mapGetters('user', ['getDetailUser'])
}
</script>

<style scoped>
</style>
