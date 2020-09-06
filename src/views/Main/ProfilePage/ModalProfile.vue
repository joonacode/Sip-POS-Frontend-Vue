<template>
  <b-modal id="modal-primary" ref="modal-primary" hide-footer :title="'Update ' +whatModal">
    <form @submit.prevent="whatModal === 'profile' ? onUpdateProfile() : onUpdatePassword()">
      <div v-if="whatModal === 'profile'">
        <g-form-group label="Name" refInp="name" :isRow="true" v-model="user.name" />
        <g-form-group
          label="Email"
          refInp="email"
          :isRow="true"
          v-model="user.email"
          :disabled="true"
        />
        <g-form-group
          label="Gender"
          refInp="gender"
          :isRow="true"
          v-model="getGender"
          :disabled="true"
        />
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Image</label>
          <div class="col-sm-10">
            <b-form-group class="mb-0" label-for="file-default">
              <input
                type="file"
                class="form-control form-shadow"
                id="image"
                ref="image"
                @change="handleFileUpload()"
              />
            </b-form-group>
            <input type="hidden" v-model="user.image" />
          </div>
        </div>
        <div class="form-group row" v-if="user.image !== 'null' && user.image !== null">
          <label class="col-sm-2 col-form-label">Old Image</label>
          <div class="col-sm-10">
            <img :src="user.image" width="150" class="img-fluid img-thumbnail" alt="image" />
          </div>
        </div>
      </div>
      <div v-if="whatModal === 'password'">
        <g-form-group
          type="password"
          label="Old Password"
          refInp="oldPassword"
          v-model="oldPassword"
        />
        <g-form-group
          type="password"
          label="New Password"
          refInp="newPassword"
          v-model="newPassword"
        />
        <g-form-group
          type="password"
          label="Verification New Password"
          refInp="verificationNewPassword"
          v-model="verifyNewPassword"
        />
      </div>
      <div class="modal-footer border-top-0">
        <button
          type="button"
          @click="hideModal"
          class="btn btn-one px-4 rounded-xs"
          data-dismiss="modal"
        >Cancel</button>
        <g-button type="submit" cusClass="btn-two px-4 rounded-xs" :isLoading="getLoading">Update</g-button>
      </div>
    </form>
  </b-modal>
</template>

<script>
import mixins from '@/components/mixins/swal'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'ModalProfile',
  props: ['whatModal'],
  mixins: [mixins],
  data() {
    return {
      fileImage: '',
      oldPassword: '',
      newPassword: '',
      verifyNewPassword: ''
    }
  },
  methods: {
    ...mapActions('user', ['updateProfile', 'changePassword']),
    handleFileUpload() {
      this.fileImage = this.$refs.image.files[0]
    },
    hideModal() {
      this.$refs['modal-primary'].hide()
    },
    onUpdateProfile() {
      // eslint-disable-next-line prefer-const
      let formData = new FormData()
      formData.append('image', this.fileImage)
      formData.append('name', this.user.name)
      formData.append('oldImage', this.user.image)
      this.updateProfile({ data: formData, id: this.user.id })
        .then((response) => {
          this.toastSuccess('Profile updated')
          this.hideModal()
          this.clearState()
        })
        .catch((err) => {
          this.toastError(
            err.data.error.sqlMessage
              ? err.data.error.sqlMessage
              : err.data.error.join(', ')
          )
        })
    },
    clearState() {
      this.fileImage = ''
      this.oldPassword = ''
      this.newPassword = ''
      this.verifyNewPassword = ''
    },
    onUpdatePassword() {
      const data = {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
        verifyNewPassword: this.verifyNewPassword
      }
      this.changePassword({ data, id: this.user.id })
        .then((response) => {
          this.clearState()
          this.hideModal()
          this.toastSuccess('Password successfully updated')
        })
        .catch(({ error }) => {
          this.toastError(
            error.sqlMessage ? error.sqlMessage : error.join(', ')
          )
        })
    }
  },

  computed: {
    ...mapState('user', ['user']),
    ...mapGetters(['getLoading']),
    getGender() {
      return this.user.gender === 'm' ? 'Male' : 'Female'
    }
  }
}
</script>

<style scoped>
.form-shadow {
  border: 0;
  box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
</style>
