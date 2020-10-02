<template>
  <div class="col-md-7 my-5" style="padding: 60px 60px 60px">
    <h2 class="mb-3 font-weight-bold text-dark">
      Login
      <b-icon icon="shield-lock-fill" />
    </h2>
    <small class="mb-4 d-inline-block"
      >Welcome please login to your account</small
    >
    <form @submit.prevent="login">
      <div class="form-group">
        <label for>Email</label>
        <input
          type="text"
          @keyup="checkEmail"
          :class="[email.length > 2 ? statusEmail : '']"
          class="form-control"
          v-model="email"
        />
        <div class="invalid-feedback">{{ messageEmail }}</div>
      </div>
      <div class="form-group">
        <label for>Password</label>
        <input type="password" class="form-control" v-model="password" />
      </div>
      <router-link :to="{ name: 'ForgotPassword' }" class="text-decoration-none"
        >Forgot password ?</router-link
      >
      <g-button
        :disabled="checkSubmit"
        type="sumbit"
        :isLoading="getLoading"
        variant="secondary"
        cusClass="btn-block my-3 shadow"
        >Login</g-button
      >
    </form>
    <span>
      {{ lihatStatus ? clearRedirect() : '' }}
      No have account?
      <router-link :to="{ name: 'Register' }" class="text-decoration-none"
        >register here</router-link
      >
    </span>
  </div>
</template>

<script>
import mixins from '@/components/mixins/swal'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Login',
  mixins: [mixins],
  data() {
    return {
      email: '',
      password: '',
      messageEmail: '',
      statusEmail: ''
    }
  },
  methods: {
    ...mapActions('auth', ['loginUser']),
    clearRedirect() {
      this.email = ''
      this.password = ''
      this.statusEmail = ''
      this.messageEmail = ''
      this.$router.push({ name: 'Home' })
    },
    checkEmail() {
      // eslint-disable-next-line no-useless-escape
      const isTrue = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        this.email
      )
      if (isTrue) {
        this.statusEmail = ''
      } else {
        this.statusEmail = 'is-invalid'
        this.messageEmail = 'Invalid email'
      }
    },
    login() {
      const dataLogin = {
        email: this.email,
        password: this.password
      }
      this.loginUser(dataLogin)
        .then((response) => {
          this.$router.push({ name: 'Home' })
          this.toastSuccess('Login succes')
        })
        .catch(({ error }) => {
          this.toastError(
            error.sqlMessage ? error.sqlMessage : error.join(', ')
          )
          this.password = ''
        })
    }
  },
  computed: {
    lihatStatus() {
      return this.$store.state.auth.statusLogin
    },
    checkSubmit() {
      if (this.email && this.password) {
        return false
      } else {
        return true
      }
    },
    ...mapGetters(['getLoading'])
  }
}
</script>
