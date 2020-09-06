<template>
  <g-card title="Settings" isFooter noButtonHeader>
    <template #cardBody>
      <div class="row">
        <div :class="[roleId === 1 ? 'col-md-6' : 'col-md-12']">
          <g-form-group
            label="App Name"
            v-if="roleId === 1"
            refInp="name"
            noShadow
            v-model="setting.appName"
          />
          <div class="form-group">
            <label>Status</label>
            <select class="form-control" v-model="setting.isOpen">
              <option value="1" :selected="setting.isOpen === 1">Open</option>
              <option value="0" :selected="setting.isOpen === 0">Close</option>
            </select>
          </div>
          <g-form-group
            v-if="roleId === 1"
            label="Status Message"
            refInp="statusMessage"
            noShadow
            v-model="setting.isOpenMessage"
          />
          <div class="form-group" v-if="roleId === 1">
            <label>Address</label>
            <textarea class="form-control" v-model="setting.address"></textarea>
          </div>
          <div class="form-group" v-if="roleId === 1">
            <label>Show Select Role</label>
            <select class="form-control" v-model="setting.showRole">
              <option value="1" :selected="setting.showRole === 1">Active</option>
              <option value="0" :selected="setting.showRole === 0">Disable</option>
            </select>
          </div>
        </div>

        <div :class="[roleId === 1 ? 'col-md-6' : 'col-md-12']">
          <g-form-group
            label="Day Setting 1"
            refInp="DaySetting1"
            noShadow
            v-model="setting.dayOne"
          />
          <g-form-group
            label="Clock Setting 1"
            refInp="ClockSetting1"
            noShadow
            v-model="setting.clockOne"
          />
          <g-form-group
            label="Day Setting 2"
            refInp="DaySetting2"
            noShadow
            v-model="setting.dayTwo"
          />
          <g-form-group
            label="Clock Setting 2"
            refInp="ClockSetting2"
            noShadow
            v-model="setting.clockTwo"
          />
        </div>
      </div>
    </template>
    <template #cardFooter>
      <g-button variant="primary" @cus-click="updateSetting" :isLoading="getLoading">Update</g-button>
    </template>
  </g-card>
</template>

<script>
import mixins from '@/components/mixins/swal'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  mixins: [mixins],
  methods: {
    ...mapActions(['getSetting', 'patchSetting']),
    updateSetting() {
      const newSetting = {
        appName: this.setting.appName,
        address: this.setting.address,
        clockOne: this.setting.clockOne,
        clockTwo: this.setting.clockTwo,
        dayOne: this.setting.dayOne,
        dayTwo: this.setting.dayTwo,
        isOpen: this.setting.isOpen,
        isOpenMessage: this.setting.isOpenMessage,
        showRole: this.setting.showRole
      }
      this.patchSetting(newSetting)
        .then((response) => {
          this.toastSuccess('Setting successfully updated')
        })
        .catch(({ error }) => {
          this.$store.dispatch('getSetting')
          this.toastError(
            error.sqlMessage ? error.sqlMessage : error.join(', ')
          )
        })
    }
  },
  created() {
    this.getSetting()
  },
  computed: {
    ...mapGetters(['getLoading']),
    ...mapState('auth', ['roleId']),
    ...mapState(['setting'])
  }
}
</script>

<style scoped>
</style>
