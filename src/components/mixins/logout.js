import {
  mapActions
} from 'vuex'
import mixins from './swal'
export default {
  data() {
    return {
      da: 'asd'
    }
  },
  mixins: [mixins],
  methods: {
    ...mapActions('auth', ['logoutUser']),
    logout() {
      this.confirmSwal('Logout', 'Are you sure you want to log out ?', 'warning', () => {
        this.logoutUser()
        this.$router.push({
          name: 'Login'
        })
        this.toastSuccess('Logout success')
      })
    }
  }
}
