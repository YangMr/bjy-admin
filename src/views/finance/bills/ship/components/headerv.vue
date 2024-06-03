<template>
  <div>
    <el-breadcrumb separator="/" class="titlev">
      <el-breadcrumb-item :to="{ path: '/finance/bills/ship' }"
        >发货单</el-breadcrumb-item
      >
    </el-breadcrumb>  


  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  methods: {},
  computed: {},
  components: {},
  filters: {},
  watch: {},
  created() {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
.titlev {
  width: 86.4vw;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #cccccc7e;
  padding: 0 20px;
}
</style>
