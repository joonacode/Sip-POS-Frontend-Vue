<template>
  <AuthCard>
    <template #header>Login</template>
    <template #form>
      <form @submit.prevent="login">
        <div class="form-group">
          <input
            type="text"
            @keyup="checkEmail"
            :class="[email.length > 2 ? statusEmail : '']"
            placeholder="Email"
            class="form-control"
            v-model="email"
          />
          <div class="invalid-feedback">{{messageEmail}}</div>
        </div>
        <div class="form-group">
          <input type="password" placeholder="Password" class="form-control" v-model="password" />
        </div>
        <MainButton
          :disabled="checkSubmit"
          type="sumbit"
          :isLoading="getLoading"
          variant="primary"
        >Login</MainButton>
      </form>
    </template>
    <template #footer>
      {{lihatStatus ? clearRedirect() : ''}}
      No have account?
      <router-link :to="{name: 'Register'}">register here</router-link>
    </template>
  </AuthCard>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AuthCard from '@/components/AuthCard'
import MainButton from '@/components/ui/MainButton'
export default {
  name: 'Login',
  components: {
    AuthCard,
    MainButton
  },
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
          this.$toast.success('Login success')
        })
        .catch(({ error }) => {
          this.$toast.error(
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

<style scoped>
</style>
