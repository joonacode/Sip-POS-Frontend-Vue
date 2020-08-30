import {
  mapActions
} from 'vuex'

export default {
  data() {
    return {
      title: 'Hello from mixins'
    }
  },
  methods: {
    ...mapActions('auth', ['logoutUser']),
    logout() {
      const ok = confirm('Are you sure want to logout ?')
      if (ok) {
        this.logoutUser()
        this.$router.push({
          name: 'Login'
        })
        this.$toast.success('Logout success')
      }
    }
  }
}
