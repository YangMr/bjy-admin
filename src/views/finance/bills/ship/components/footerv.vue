<template>
  <div>
    <div class="foot">
      <!-- 分页 -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="query.page"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="query.limit"
        layout="total,prev ,pager ,next ,sizes , jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleCurrentChange(){
      this.query.page = 1
      this.getlist()
    }
  },
  computed: {},
  components: {},
  filters: {},
  watch: {},
  created() {},
  mounted() {},
  props: ["query", "getlist", "total"],
};
</script>

<style lang="scss" scoped>
.foot {
  float: right;
  margin-bottom: 10px;
}
</style>
