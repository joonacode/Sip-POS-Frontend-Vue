<template>
  <div class="col-md-7 my-5" style="padding: 20px 60px 20px 60px;">
    <h2 class="mb-3 font-weight-bold text-dark">
      Register
      <b-icon icon="shield-lock" />
    </h2>
    <small class="mb-4 d-inline-block">Welcome please register to create account</small>
    <form @submit.prevent="register">
      <div class="row">
        <div class="col-md-6">
          <label for>Full Name</label>
          <div class="form-group">
            <input type="text" class="form-control" v-model="name" />
          </div>
          <div class="form-group">
            <label for>Email</label>
            <input
              type="text"
              @keyup="checkEmail"
              :class="[email.length > 2 ? statusEmail : '']"
              class="form-control"
              v-model="email"
            />
            <div class="invalid-feedback">{{messageEmail}}</div>
          </div>
          <div class="form-group">
            <label for>Gender</label>
            <select class="form-control" v-model="gender">
              <option value selected disabled></option>
              <option value="m">Male</option>
              <option value="f">Female</option>
            </select>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group" v-if="setting.showRole">
            <label for>Role</label>
            <select class="form-control" v-model="roleId">
              <option value selected disabled></option>
              <option value="3">User</option>
              <option value="2">Cashier</option>
            </select>
          </div>
          <div class="form-group">
            <label for>Password</label>
            <input
              type="password"
              class="form-control"
              :class="[password.length > 2 ? statusPassword : '']"
              @keyup="checkPassword"
              v-model="password"
            />
          </div>
          <div class="form-group">
            <label for>Repaeat Password</label>
            <input
              type="password"
              :class="[passwordVerification.length > 2 ? statusPassword : '']"
              @keyup="checkPassword"
              class="form-control"
              v-model="passwordVerification"
            />
            <div class="invalid-feedback">{{messagePassword}}</div>
            <div class="valid-feedback">{{messagePassword}}</div>
          </div>
        </div>
        <g-button
          :disabled="checkSubmit"
          type="sumbit"
          :isLoading="getLoading"
          variant="secondary"
          cusClass="btn-block my-3 shadow"
        >Register</g-button>
      </div>
    </form>
    <span>
      Already have account?
      <router-link :to="{name: 'Login'}">login here</router-link>
    </span>
  </div>
</template>

<script>
import mixins from '@/components/mixins/swal'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'Register',
  mixins: [mixins],
  data() {
    return {
      name: '',
      email: '',
      gender: '',
      roleId: '',
      password: '',
      passwordVerification: '',
      statusPassword: '',
      messagePassword: '',
      statusEmail: '',
      messageEmail: '',
      statusRegister: false
    }
  },
  methods: {
    ...mapActions('auth', ['registerUser']),
    register() {
      const newUser = {
        name: this.name,
        email: this.email,
        gender: this.gender,
        roleId: this.roleId,
        password: this.password,
        passwordVerification: this.passwordVerification
      }
      if (!this.setting.showRole) {
        newUser.roleId = '3'
      }
      this.registerUser(newUser)
        .then((response) => {
          this.$router.push({ name: 'Login' })
          this.toastSuccess(
            'Registration success, please check your email to activate account'
          )
        })
        .catch(({ error }) => {
          this.toastError(
            error.sqlMessage ? error.sqlMessage : error.join(', ')
          )
        })
    },
    checkPassword() {
      if (this.password.length < 6 || this.passwordVerification.length < 6) {
        this.statusPassword = 'is-invalid'
        this.messagePassword = 'Password min 6 character'
      } else {
        if (this.password !== this.passwordVerification) {
          this.statusPassword = 'is-invalid'
          this.messagePassword = 'Password and verify password not same'
        } else {
          this.statusPassword = 'is-valid'
          this.messagePassword = 'Password same'
        }
      }
    },
    checkEmail() {
      // eslint-disable-next-line no-useless-escape
      const isTrue = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        this.email
      )
      if (isTrue) {
        this.statusEmail = 'is-valid'
      } else {
        this.statusEmail = 'is-invalid'
        this.messageEmail = 'Invalid email'
      }
    }
  },
  computed: {
    ...mapGetters(['getLoading']),
    ...mapState(['setting']),
    checkSubmit() {
      if (
        this.name &&
        this.email &&
        this.gender &&
        this.password &&
        this.passwordVerification
      ) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>
