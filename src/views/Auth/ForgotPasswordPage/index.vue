<template>
  <div class="col-md-7 my-5" style="padding: 100px 60px 100px">
    <h2 class="mb-3 font-weight-bold text-dark">
      Forgot Password
      <b-icon icon="lock-fill" class="mb-1" />
    </h2>
    <small class="mb-4 d-inline-block"
      >Enter the email that has been registered on the Sip POS Web</small
    >
    <form @submit.prevent="handleForgotPassword">
      <div class="form-group">
        <label for>Email</label>
        <input type="text" class="form-control" v-model="email" />
      </div>
      <g-button
        :disabled="checkSubmit"
        type="sumbit"
        :isLoading="getLoading"
        variant="secondary"
        cusClass="btn-block my-3 shadow"
        >Confirm</g-button
      >
    </form>
    <span>
      Already have account?
      <router-link :to="{ name: 'Login' }" class="text-decoration-none"
        >login here</router-link
      >
    </span>
  </div>
</template>

<script>
import mixins from '@/components/mixins/swal'
import { mapActions, mapGetters } from 'vuex'
export default {
  mixins: [mixins],
  data() {
    return {
      email: ''
    }
  },
  methods: {
    ...mapActions('auth', ['forgotPassword']),
    handleForgotPassword() {
      const dataForgotPassword = {
        email: this.email
      }
      this.forgotPassword(dataForgotPassword)
        .then((response) => {
          this.$router.push({ name: 'Login' })
          this.toastSuccess(
            'We have sent a link to reset your password to your email address'
          )
        })
        .catch(({ error }) => {
          this.toastError(
            error.sqlMessage ? error.sqlMessage : error.join(', ')
          )
          this.email = ''
        })
    }
  },
  computed: {
    checkSubmit() {
      if (this.email) {
        return false
      } else {
        return true
      }
    },
    ...mapGetters(['getLoading'])
  }
}
</script>
