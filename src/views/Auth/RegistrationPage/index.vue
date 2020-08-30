<template>
  <AuthCard>
    <template #header>Register</template>
    <template #form>
      <form @submit.prevent="register">
        <div class="form-group">
          <input type="text" placeholder="Full Name" class="form-control" v-model="name" />
        </div>
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
          <select class="form-control" v-model="gender">
            <option value selected disabled>Select Gender</option>
            <option value="m">Male</option>
            <option value="f">Female</option>
          </select>
        </div>
        <div class="form-group">
          <input
            type="password"
            placeholder="Password"
            class="form-control"
            :class="[password.length > 2 ? statusPassword : '']"
            @keyup="checkPassword"
            v-model="password"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            :class="[passwordVerification.length > 2 ? statusPassword : '']"
            @keyup="checkPassword"
            placeholder="Repeat Password"
            class="form-control"
            v-model="passwordVerification"
          />
          <div class="invalid-feedback">{{messagePassword}}</div>
          <div class="valid-feedback">{{messagePassword}}</div>
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
      Already have account?
      <router-link :to="{name: 'Login'}">login here</router-link>
    </template>
  </AuthCard>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MainButton from '@/components/ui/MainButton'
import AuthCard from '@/components/AuthCard'
export default {
  name: 'Register',
  components: {
    AuthCard,
    MainButton
  },
  data() {
    return {
      name: '',
      email: '',
      gender: '',
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
        password: this.password,
        passwordVerification: this.passwordVerification
      }
      this.registerUser(newUser)
        .then((response) => {
          this.$router.push({ name: 'Login' })
          this.$toast.success('Registration success, please login')
        })
        .catch(({ error }) => {
          this.$toast.error(
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

<style scoped>
</style>
