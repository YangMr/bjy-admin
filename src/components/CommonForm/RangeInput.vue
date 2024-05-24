<template>
  <div class="range-input">
    <div class="input-wrap">
      <el-input
        v-model="startValue"
        @change="onStartChange"
        :size="size"
        :placeholder="placeholder"
      ></el-input>
      <Icon :name="icon" class="icon" v-if="icon"></Icon>
    </div>
    <span class="line">-</span>
    <div class="input-wrap">
      <el-input
        v-model="endValue"
        @change="onEndChange"
        :placeholder="placeholder"
        :size="size"
      ></el-input>
      <Icon :name="icon" class="icon" v-if="icon"></Icon>
    </div>
  </div>
</template>
<script>
export default {
  name: "RangeInput",
  props: {
    size: {
      default: "small",
    },
    placeholder: {
      default: "请输入",
    },
    icon: {
      default: "",
    },
    start: {
      default: "",
    },
    end: {
      default: "",
    },
  },
  data() {
    return {
      startValue: "",
      endValue: "",
    };
  },
  watch: {
    start(newVal) {
      this.startValue = newVal;
    },
    end(newVal) {
      this.endValue = newVal;
    },
  },
  methods: {
    onStartChange() {
      this.$emit("update:start", this.startValue);
    },
    onEndChange() {
      this.$emit("update:end", this.endValue);
    },
  },
};
</script>
<style lang="scss" scoped>
.range-input {
  display: flex;
  align-items: center;
  .line {
    margin: 0 5px;
  }
  .input-wrap {
    width: 100%;
    position: relative;
    .icon {
      position: absolute;
      right: 5px;
      font-size: 12px;
    }
  }
}
</style>
