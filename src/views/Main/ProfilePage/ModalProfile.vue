<template>
  <b-modal id="modal-primary" ref="modal-primary" hide-footer :title="'Update ' +whatModal">
    <form @submit.prevent="whatModal === 'profile' ? onUpdateProfile() : onUpdatePassword()">
      <div v-if="whatModal === 'profile'">
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
            <input type="text" class="form-control form-shadow" v-model="user.name" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
            <input type="text" class="form-control form-shadow" v-model="user.email" readonly />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Gender</label>
          <div class="col-sm-10">
            <input type="text" class="form-control form-shadow" v-model="getGender" readonly />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Image</label>
          <div class="col-sm-10">
            <b-form-group class="form-shadow mb-0" label-for="file-default">
              <input
                type="file"
                class="form-control"
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
        <div class="form-group">
          <label>Old Password</label>
          <input type="password" v-model="oldPassword" class="form-control" />
        </div>
        <div class="form-group">
          <label>New Password</label>
          <input type="password" class="form-control" v-model="newPassword" />
        </div>
        <div class="form-group">
          <label>Verification New Password</label>
          <input type="password" class="form-control" v-model="verifyNewPassword" />
        </div>
      </div>
      <div class="modal-footer border-top-0">
        <button
          type="button"
          @click="hideModal"
          class="btn btn-one px-4 rounded-xs"
          data-dismiss="modal"
        >Cancel</button>
        <MainButton
          type="submit"
          customClass="btn-two px-4 rounded-xs"
          :isLoading="getLoading"
        >Update</MainButton>
      </div>
    </form>
  </b-modal>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import MainButton from '@/components/ui/MainButton'

export default {
  name: 'ModalProfile',
  props: ['whatModal'],
  components: {
    MainButton
  },
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
          this.$toast.success('Profile updated')
          this.hideModal()
          this.clearState()
        })
        .catch((err) => {
          this.$toast.error(
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
          this.$toast.info('Password successfully updated')
        })
        .catch(({ error }) => {
          this.$toast.error(
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

<style lang="scss" scoped>
</style>
