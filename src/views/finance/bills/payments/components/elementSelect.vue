<template>
  <div>
    <el-select v-model="currentValue" @change="handleSelectChange" placeholder="请选择">
      <el-option
        v-for="(item, index) in options"
        :key="index"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: ['value', 'options'],
  data() {
    return {
      currentValue: this.value
    };
  },
  watch: {
    value(newValue) {
      this.currentValue = newValue;
    },
    currentValue(newValue) {
      this.$emit('input', newValue);
    }
  },
  methods: {
    handleSelectChange(newValue) {
      this.currentValue = newValue;
    }
  },
  created() {
    this.currentValue = this.value;
  }
}
</script>

<style scoped>
.el-select {
  width: 200px;
}
</style>
