<template>
  <div class="bg-dark" style="min-height:100vh">
    <div class="d-flex align-items-center min-vh-100 py-3 py-md-0">
      <div class="container">
        <div class="card rounded border-0 shadow">
          <div class="row no-gutters here">
            <div class="col-md-5">
              <div class="bg-dark auth-left p-5 d-flex justify-content-between flex-column">
                <router-link :to="{name: 'Landing'}" class="item-side">
                  <img :src="require(`@/assets/images/logo2.png`)" width="80" class="img-fluid" alt />
                </router-link>
                <h1 class="text-white font-weight-bold item-side">
                  Welcome
                  <br />
                  To {{setting.appName}}
                </h1>
                <div class="text-white item-side clock">
                  <div
                    class="alert alert-primary alert-dismissible fade show mt-2"
                    role="alert"
                    v-if="setting.isOpenMessage"
                  >
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                      <span class="sr-only">Close</span>
                    </button>
                    {{setting.isOpenMessage}}
                  </div>
                  <p class="mb-0">
                    Now:
                    <b>{{setting.isOpen ? 'Open' : 'Close'}}</b>
                  </p>
                  <p class="mb-0">
                    {{setting.dayOne}}:
                    <b>{{setting.clockOne}}</b>
                  </p>
                  <p class="mb-0">
                    {{setting.dayTwo}}:
                    <b>{{setting.clockTwo}}</b>
                  </p>
                  <p class="mb-0">
                    Alamat:
                    <b>{{setting.address}}</b>
                  </p>
                </div>
              </div>
            </div>
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Auth',
  methods: mapActions(['getSetting']),
  created() {
    this.getSetting()
  },
  computed: mapState(['setting'])
}
</script>

<style scoped>
.bg-auth {
  background: linear-gradient(90deg, #343a40 45%, white 110%);
}
.auth-left {
  height: 100%;
  margin: 0;
  /* border-radius: 0 20px 20px 0; */
  box-shadow: 5px 5px 50px 5px rgba(0, 0, 0, 0, 1);
}
.login-card-img {
  border-radius: 0;
  position: absolute;
  width: 100%;
  height: 100%;
}
.clock {
  font-size: 14px;
}
@media screen and (max-width: 767px) {
  .item-side:nth-child(3) {
    margin-bottom: 10px;
  }
  .item-side {
    margin-bottom: 50px;
  }
}
</style>
