<template>
  <el-date-picker
    class="date-select"
    v-model="innerValue"
    :type="type"
    :placeholder="placeholder"
    :value-format="valueFormat"
    :size="size"
    @change="onChange"
    :clearable="clearable"
    prefix-icon="none"
    :editable="false"
    :picker-options="pickerOptions"
    :format="type == 'week' ? formatWeek : format"
    :disabled="disabled"
    style="width: 100%"
  ></el-date-picker>
</template>

<script>
export default {
  name: "DateSelect",
  props: {
    // .sync  秒数
    value: {
      default: "",
    },
    type: {
      type: String,
      default: "datetime",
    },
    placeholder: {
      type: String,
      default: "请选择",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
    },
    pickerOptions: {
      type: Object,
      default: () => {},
    },
    valueFormat: {
      type: String,
      default: "timestamp",
    },
    format: {
      type: String,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.innerValue = val ? val * 1000 : "";
      },
    },
  },
  computed: {
    //日期格式
    formatWeek() {
      let { start, end } = $tool.calcStart(+this.innerValue / 1000);
      let newStart = $tool.ts(start, "dateline");
      let newEnd = $tool.ts(end, "dateline");
      return newStart + " 至" + " " + newEnd;
    },
  },
  data() {
    return {
      innerValue: "",
    };
  },
  methods: {
    onChange() {
      let val = "";
      if (this.type == "week") {
        val = $tool.calcStart(+this.innerValue / 1000).start;
      } else {
        val = this.innerValue ? parseInt(+this.innerValue / 1000) : "";
      }
      this.$emit("update:value", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.date-select {
  width: auto;
  /deep/.el-input__inner {
    padding-left: 15px;
  }
}
</style>
