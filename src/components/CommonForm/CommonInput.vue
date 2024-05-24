<template>
  <div class="form-input">
    <el-input
      v-model="privateValue"
      :type="type"
      :placeholder="placeholder"
      :readonly="readonly"
      :maxlength="maxlength"
      :show-word-limit="showWordLimit"
      :size="size"
      :disabled="disabled"
      @input="onChange"
      :autosize="{ minRows: 3 }"
    >
      <el-button slot="append" v-if="isSearch" @click="onSearch">
        {{ text }}
      </el-button>
    </el-input>
    <Icon :name="icon" class="icon" v-if="icon"></Icon>
  </div>
</template>
<script>
export default {
  name: "FormInput",
  props: {
    type: {
      type: String,
    },
    placeholder: {
      type: String,
      default: "请输入",
    },
    text: {
      type: String,
      default: "搜索",
    },
    maxlength: {
      type: String,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [Number, String],
      default: "",
    },
    size: {
      type: String,
    },
    showWordLimit: {
      type: Boolean,
      default: false,
    },
    isSearch: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      default: "",
    },
  },
  model: {
    event: "change",
    prop: "value",
  },
  data() {
    return {
      privateValue: this.value,
    };
  },
  watch: {
    privateValue(newValue) {
      this.$emit("change", newValue);
    },
    value(val) {
      this.privateValue = val;
    },
  },
  methods: {
    onSearch() {
      this.$emit("onSearch");
    },
    onChange(value) {
      this.$emit("onChange", value);
    },
  },
};
</script>
<style lang="scss" scoped>
.form-input {
  position: relative;
  .icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 5px;
    font-size: 14px;
  }
}
.form-input_count {
  position: absolute;
  right: 10px;
  bottom: 13px;
  color: #999999;
}
/deep/ .el-input-group__append,
.el-input-group__prepend {
  background: blue;
  color: #fff;
  border: 1px solid blue;
}
</style>
