<template>
  <div class="col-md-7 my-5" style="padding: 50px 60px 50px 60px">
    <h2 class="mb-3 font-weight-bold text-dark">
      Reset Password
      <b-icon icon="lock-fill" class="mb-1" />
    </h2>
    <small class="mb-4 d-inline-block">Enter your new password</small>
    <form @submit.prevent="register">
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label for>New Password</label>
            <input
              type="password"
              class="form-control"
              :class="[password.length > 2 ? statusPassword : '']"
              @keyup="checkPassword"
              v-model="password"
            />
          </div>
          <div class="form-group">
            <label for>Confirm Password</label>
            <input
              type="password"
              :class="[passwordVerification.length > 2 ? statusPassword : '']"
              @keyup="checkPassword"
              class="form-control"
              v-model="passwordVerification"
            />
            <div class="invalid-feedback">{{ messagePassword }}</div>
            <div class="valid-feedback">{{ messagePassword }}</div>
          </div>
        </div>
        <g-button
          :disabled="checkSubmit"
          type="sumbit"
          :isLoading="getLoading"
          variant="secondary"
          cusClass="btn-block my-3 shadow"
          >Confirm</g-button
        >
      </div>
    </form>
  </div>
</template>

<script>
import mixins from '@/components/mixins/swal'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  mixins: [mixins],
  data() {
    return {
      password: '',
      passwordVerification: '',
      statusPassword: '',
      messagePassword: ''
    }
  },
  methods: {
    ...mapActions('auth', ['resetPassword', 'verifyTokenPassword']),
    register() {
      const token = this.$route.query.token
      const dataResetPassword = {
        password: this.password,
        confirmPassword: this.passwordVerification,
        token
      }
      this.resetPassword(dataResetPassword)
        .then((response) => {
          this.$router.push({ name: 'Login' })
          this.toastSuccess('Password updated successfully')
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
    }
  },
  mounted() {
    const token = this.$route.query.token
    if (!token) {
      this.$router.push({ name: 'Login' })
    } else {
      this.verifyTokenPassword({ token })
        .then((response) => {
          this.toastSuccess('Token OK!')
        })
        .catch(({ error }) => {
          this.toastError(
            error.sqlMessage ? error.sqlMessage : error.join(', ')
          )
          this.$router.push({ name: 'Login' })
        })
    }
  },
  computed: {
    ...mapGetters(['getLoading']),
    ...mapState(['setting']),
    checkSubmit() {
      if (this.password && this.passwordVerification) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>
