<template>
  <div>
    <div class="form-group" v-if="!isRow" :cusClass="cusClass">
      <label v-if="label">{{label}}</label>
      <input
        :id="idInp"
        :placeholder="placeholder"
        :type="type"
        class="form-control"
        :class="[cusClassInp, noShadow ? '' : 'form-shadow']"
        :value="value"
        @input="handleInput()"
        :ref="refInp"
        @change="$emit('change-inp')"
        :disabled="disabled"
      />
    </div>
    <div class="form-group row" v-if="isRow">
      <label class="col-sm-2 col-form-label">{{label}}</label>
      <div class="col-sm-10">
        <input
          :id="idInp"
          :placeholder="placeholder"
          :type="type"
          class="form-control"
          :class="[cusClassInp, noShadow ? '' : 'form-shadow']"
          :value="value"
          @input="handleInput()"
          :ref="refInp"
          @change="$emit('change-inp')"
          :disabled="disabled"
        />
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
    noShadow: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String
    },
    cusClass: {
      type: String
    },
    cusClassInp: {
      type: String
    },
    idInp: {
      type: String
    },
    value: {
      type: [String, Number]
    },
    refInp: {
      type: String
    },
    placeholder: {
      type: String,
      default: ''
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
