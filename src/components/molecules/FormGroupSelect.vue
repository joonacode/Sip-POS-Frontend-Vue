<template>
  <div>
    <div class="form-group" v-if="!isRow" :cusClass="cusClass">
      <label v-if="label">{{label}}</label>
      <select
        :name="refInp"
        :ref="refInp"
        @input="handleInput()"
        :class="cusClassInp"
        class="form-control form-shadow"
      >
        <slot></slot>
      </select>
    </div>
    <div class="form-group row" v-if="isRow">
      <label class="col-sm-2 col-form-label">{{label}}</label>
      <div class="col-sm-10">
        <select
          :name="refInp"
          :ref="refInp"
          @input="handleInput()"
          :class="cusClassInp"
          class="form-control form-shadow"
        >
          <slot></slot>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String
    },
    isRow: {
      type: Boolean,
      default: false
    },
    cusClass: {
      type: String
    },
    cusClassInp: {
      type: String
    },
    refInp: {
      type: String
    }
  },
  methods: {
    handleInput(e) {
      this.$emit('input', this.$refs[this.refInp].value)
    }
  }
}
</script>

<style scoped>
.form-shadow {
  border: 0;
  box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
</style>
