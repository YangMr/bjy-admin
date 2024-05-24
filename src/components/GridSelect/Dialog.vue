<template>
  <el-dialog
    :title="title"
    :width="width"
    :visible.sync="visible"
    @closed="_onClosed"
    :top="top"
  >
    <slot></slot>
    <div slot="footer">
      <el-button @click="_onCancel">取消</el-button>
      <el-button type="primary" @click="_onOk">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    // 标题
    title: {
      type: String,
      default: "选择",
    },
    // 宽度
    width: {
      type: String,
      default: "1100px",
    },
    // 距离顶部距离
    top: {
      type: String,
      default: "10vh",
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  created() {},
  methods: {
    // on event
    _onClosed() {
      this.$destroy();
      if (this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    },
    _onCancel() {},
    _onOk() {},
  },
};
</script>

<style lang="scss" scoped></style>
