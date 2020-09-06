<template>
  <b-modal
    id="modal-primary"
    ref="modal-users"
    hide-footer
    :title="statusModal === 'add' ? 'Add user' : 'Update user'"
  >
    <form @submit.prevent="statusModal === 'add' ? addUser() : updateUser()">
      <input type="hidden" v-model="modalDataUser.id" />
      <input type="hidden" v-model="modalDataUser.oldEmail" />
      <g-form-group label="Name" refInp="name" :isRow="true" v-model="modalDataUser.name" />
      <g-form-group label="Email" refInp="email" :isRow="true" v-model="modalDataUser.email" />
      <g-form-group-select
        label="Gender"
        refInp="gender"
        :isRow="true"
        v-model="modalDataUser.gender"
      >
        <option value disabled selected>Select Gender</option>
        <option
          v-for="(gender, i) in genders"
          :selected="modalDataUser.gender === gender.val"
          :value="gender.val"
          :key="i"
        >{{gender.name}}</option>
      </g-form-group-select>
      <g-form-group-select label="Role" refInp="role" :isRow="true" v-model="modalDataUser.roleId">
        <option value selected disabled>Select Role</option>
        <option
          v-for="(role, i) in roles"
          :selected="modalDataUser.roleId === Number(role.val)"
          :value="role.val"
          :key="i"
        >{{role.name}}</option>
      </g-form-group-select>
      <g-form-group-select
        label="Status"
        refInp="status"
        :isRow="true"
        v-model="modalDataUser.status"
      >
        <option value selected disabled>Select Status</option>
        <option value="1" :selected="modalDataUser.status === 1">Active</option>
        <option value="2" :selected="modalDataUser.status === 2">Non Active</option>
        <option value="0" :selected="modalDataUser.status === 0">Disable</option>
      </g-form-group-select>
      <g-form-group
        type="password"
        v-if="statusModal === 'add'"
        label="Password"
        refInp="password"
        :isRow="true"
        v-model="password"
      />
      <g-form-group
        type="password"
        v-if="statusModal === 'add'"
        label="Verify Password"
        refInp="verifyPassword"
        :isRow="true"
        v-model="passwordVerification"
      />
      <div class="form-group row" v-if="statusModal !== 'add'">
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
          <input type="hidden" v-model="modalDataUser.image" />
        </div>
      </div>
      <div
        class="form-group row"
        v-if="statusModal !== 'add' && modalDataUser.image && modalDataUser.image !== 'null'"
      >
        <label class="col-sm-2 col-form-label">Old Image</label>
        <div class="col-sm-10">
          <img :src="modalDataUser.image" width="150" class="img-fluid img-thumbnail" alt="image" />
        </div>
      </div>
      <div class="modal-footer border-top-0">
        <button
          type="button"
          @click="hideModal"
          class="btn btn-one px-4 rounded-xs"
          data-dismiss="modal"
        >Cancel</button>
        <g-button
          type="submit"
          cusClass="btn-two px-4 rounded-xs"
          :isLoading="getLoading"
        >{{statusModal === 'add' ? 'Add' : 'Update'}}</g-button>
      </div>
      {{statusHideModal ? hideModal() : ''}}
    </form>
  </b-modal>
</template>

<script>
import mixins from '@/components/mixins/swal'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'ModalUsers',
  mixins: [mixins],
  data() {
    return {
      genders: [
        {
          val: 'm',
          name: 'Male'
        },
        {
          val: 'f',
          name: 'Female'
        }
      ],
      roles: [
        {
          val: '1',
          name: 'Admin'
        },
        {
          val: '2',
          name: 'Cashier'
        },
        {
          val: '3',
          name: 'Member'
        }
      ],
      password: '',
      passwordVerification: '',
      fileImage: ''
    }
  },
  methods: {
    ...mapActions(['changeStatusHideModal']),
    ...mapActions({
      actAddUser: 'user/addUser',
      actUpdateUser: 'user/updateUser'
    }),
    handleFileUpload() {
      this.fileImage = this.$refs.image.files[0]
    },
    addUser() {
      const data = {
        name: this.modalDataUser.name,
        gender: this.modalDataUser.gender,
        email: this.modalDataUser.email,
        roleId: this.modalDataUser.roleId,
        status: this.modalDataUser.status,
        password: this.password,
        passwordVerification: this.passwordVerification
      }
      this.actAddUser(data)
        .then((response) => {
          this.toastSuccess('Data successfully added')
          this.hideModal()
          this.clearPassword()
        })
        .catch(({ error }) => {
          this.toastError(
            error.sqlMessage ? error.sqlMessage : error.join(', ')
          )
        })
    },
    updateUser() {
      // eslint-disable-next-line prefer-const
      let formData = new FormData()
      formData.append('image', this.fileImage)
      formData.append('oldImage', this.modalDataUser.image)
      formData.append('name', this.modalDataUser.name)
      formData.append('gender', this.modalDataUser.gender)
      formData.append('email', this.modalDataUser.email)
      formData.append('oldEmail', this.modalDataUser.oldEmail)
      formData.append('roleId', this.modalDataUser.roleId)
      formData.append('status', this.modalDataUser.status)
      this.actUpdateUser({ data: formData, id: this.modalDataUser.id })
        .then((response) => {
          this.toastSuccess('Data successfully updated')
          this.hideModal()
          this.fileImage = ''
        })
        .catch(({ error }) => {
          this.toastError(
            error.sqlMessage ? error.sqlMessage : error.join(', ')
          )
        })
    },
    clearPassword() {
      this.password = ''
      this.passwordVerification = ''
    },
    hideModal() {
      this.$refs['modal-users'].hide()
      this.changeStatusHideModal(false)
    }
  },
  computed: {
    ...mapState(['statusHideModal', 'statusModal']),
    ...mapGetters(['getLoading']),
    ...mapState('user', ['modalDataUser'])
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
