<template>
  <el-date-picker
    class="date-range-select"
    v-model="innerValue"
    :type="type"
    :start-placeholder="startPlaceholder"
    :end-placeholder="endPlaceholder"
    value-format="timestamp"
    :size="size"
    @change="onChange"
    :clearable="clearable"
    prefix-icon="none"
    :editable="false"
    :picker-options="pickerOptions"
  ></el-date-picker>
</template>

<script>
export default {
  name: "DateRangeSelect",
  props: {
    // .sync  秒数
    start: {
      default: "",
    },
    end: {
      default: "",
    },
    type: {
      type: String,
      default: "daterange",
    },
    startPlaceholder: {
      type: String,
      default: "开始时间",
    },
    endPlaceholder: {
      type: String,
      default: "结束时间",
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
    clearable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      innerValue: [],
      innerValueCache: ["", ""],
    };
  },
  watch: {
    start: {
      immediate: true,
      handler(val) {
        let tmp = "";
        if (val) {
          tmp = val * 1000;
        }
        this.setInnerValue(tmp, undefined);
      },
    },
    end: {
      immediate: true,
      handler(val) {
        let tmp = "";
        if (val) {
          tmp = val * 1000;
        }
        this.setInnerValue(undefined, tmp);
      },
    },
  },
  created() {},
  methods: {
    onChange() {
      let valueStart = "",
        valueEnd = "";
      if (this.innerValue) {
        valueStart = this.innerValue[0]
          ? parseInt(+this.innerValue[0] / 1000)
          : "";
        valueEnd = this.innerValue[1]
          ? parseInt(+this.innerValue[1] / 1000)
          : "";
      }
      this.$emit("update:start", valueStart);
      this.$emit("update:end", valueEnd);
    },
    setInnerValue(start, end) {
      if (start !== undefined) {
        this.innerValueCache[0] = start;
      }
      if (end !== undefined) {
        this.innerValueCache[1] = end;
      }
      if (this.innerValueCache[0] && this.innerValueCache[1]) {
        this.innerValue = [...this.innerValueCache];
      } else {
        this.innerValue = [];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.date-range-select {
  padding-right: 0px;
  width: auto;
  /deep/ {
    .el-range__icon.none {
      display: none;
    }
    .el-range-separator {
      padding: 0 3px;
    }
    .el-range-input {
      width: 43%;
    }
  }
}
</style>
