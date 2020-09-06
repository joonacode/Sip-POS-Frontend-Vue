<template>
  <div>Aloha</div>
</template>

<script>
import mixins from '@/components/mixins/swal'
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('auth', ['verifyAccount'])
  },
  mixins: [mixins],
  mounted() {
    const token = this.$route.query.token
    this.verifyAccount({ token })
      .then((response) => {
        this.toastSuccess(response.message)
        this.$router.push({ name: 'Login' })
      })
      .catch(({ error }) => {
        this.toastError(error)
        this.$router.push({ name: 'Login' })
      })
  }
}
</script>
