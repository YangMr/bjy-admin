<template>
  <el-select
    class="enum-select"
    v-model="privateValue"
    placeholder="请选择"
    :size="size"
    :clearable="clearable"
    :disabled="disabled"
    @change="onChange"
    :multiple="multiple"
    style="width: 100%"
  >
    <el-option
      v-for="type in types"
      :key="type.key"
      :label="type.value"
      :value="type.key"
    ></el-option>
  </el-select>
</template>

<script>
import * as enums from "@/utils/enums";
export default {
  name: "EnumSelect",
  props: {
    // 枚举类型
    type: {
      type: String,
      required: true,
    },
    value: [Number, String],
    except: {
      type: Array,
      default: function () {
        return [];
      },
    },
    size: {
      type: String,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: "value",
    event: "onChange",
  },
  computed: {
    types() {
      let item = this.enums[this.type];
      if (!item) {
        return [];
      }
      return item.getOptions().filter(t => this.except.indexOf(t.key) < 0);
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (!val) {
          this.privateValue = "";
          return;
        }
        this.privateValue = val.toString();
      },
    },
  },
  data() {
    return {
      enums,
      privateValue: "",
    };
  },
  methods: {
    onChange() {
      let privateValue = this.privateValue;
      if (this.multiple) {
        privateValue = privateValue.join(",");
        console.log(privateValue);
      } else {
        this.$emit("onChange", privateValue);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
