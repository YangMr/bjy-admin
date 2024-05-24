<template>
  <el-cascader
    class="cascader"
    :size="size"
    clearable
    :show-all-levels="showAllLevels"
    :placeholder="placeholder || '请选择'"
    :props="{
      expandTrigger: trigger,
      checkStrictly: checkStrictly,
    }"
    :options="options"
    @change="onChange"
    v-model="privateValue"
  ></el-cascader>
</template>

<script>
import http from "@/utils/http";
export default {
  name: "Cascader",
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    // 最后一级的值
    value: {
      default: "",
    },
    // 请求接口获取数据
    url: String,
    method: {
      type: String,
      default: "get",
    },
    // key
    childKey: {
      type: String,
      default: "children",
    },
    valueKey: {
      type: String,
      default: "value",
    },
    labelKey: {
      type: String,
      default: "label",
    },
    fullPath: {
      type: Boolean,
      default: false,
    },
    // 外部传入的数据，如果有该值，则不请求 url
    treeDatas: Array,
    // 组件自带属性
    placeholder: String,
    size: {
      type: String,
    },
    trigger: {
      type: String,
      default: "hover",
    },
    showAllLevels: {
      type: Boolean,
      default: false,
    },
    checkStrictly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      urlDatas: [],
      privateValue: [],
    };
  },
  computed: {
    options() {
      return this.treeDatas || this.urlDatas;
    },
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        this.calcPrivateValue();
      },
    },
    options() {
      this.calcPrivateValue();
    },
  },
  created() {
    this.requestData();
  },
  methods: {
    // on event
    onChange(value) {
      this.$emit(
        "change",
        value && value.length ? value[value.length - 1] : "",
      );
    },
    // other
    calcPrivateValue() {
      this.privateValue = this._getPath(this.options, this.value);
    },
    _getPath(options, value) {
      let result = [];
      let i = 0;
      for (; i < options.length; i++) {
        let item = options[i];
        if (item.value == value) {
          result.push(item.value);
          break;
        }
      }
      if (i == options.length) {
        for (i = 0; i < options.length; i++) {
          let item = options[i];
          if (item.children && item.children.length) {
            let childResult = this._getPath(item.children, value);
            if (childResult.length > 0) {
              childResult.unshift(item.value);
              result = childResult;
              break;
            }
          }
        }
      }
      return result;
    },
    _buildData(data) {
      const list = [];
      data.forEach(item => {
        item[this.childKey] = item[this.childKey] || [];
        const obj = {
          value: item[this.valueKey],
          label: item[this.labelKey],
        };
        if (item[this.childKey].length) {
          obj.children = this._buildData(item[this.childKey]);
        }
        list.push(obj);
      });
      return list;
    },
    // request
    async requestData() {
      if (this.treeDatas) return;
      const data = await http[this.method](this.url);
      this.urlDatas = this._buildData(data);
    },
  },
};
</script>

<style lang="scss" scoped></style>
