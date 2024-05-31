<template>
  <div class="boxv">
    <!-- 头部面包屑 -->
    <Headerv></Headerv>
    <!-- 搜索栏 -->
    <Searchv :query="query" :getlist="getlist"></Searchv>

    <!-- 主页渲染布局 -->
    <div class="mainv">
      <Mainv :list="list" :query="query"></Mainv>
      <!-- 底部分页 -->
      <Footerv :total="total" :query="query" :getlist="getlist"></Footerv>
    </div>
  </div>
</template>

<script>
import { getBillsList } from "@/api/api_billsShip.js";
import Headerv from "./components/headerv.vue";
import Searchv from "./components/searchv.vue";
import Mainv from "./components/mainv.vue";
import Footerv from "./components/footerv.vue";
export default {
  provide() {
    return {

    }
  },
  components: {
    Headerv,
    Searchv,
    Mainv,
    Footerv,
  },
  data() {
    return {
      query: {
        page: 1,
        limit: 10,
        order_number: "",
        logistics_number: "",
        logistics_no: "",
        logistics_status: "",
        consignee: "",
        address_mobile: "",
        address_consignee: "",
        product_name: "",
        created_at: "",
      },
      total: 0,
      list: [],
    };
  },
  methods: {
    async getlist() {
      let res = await getBillsList(this.query);
      console.log("aaaa", res);
      this.list = res.data.list;
      this.total = res.data.total;
      this.query.limit = res.data.limit;
      this.query.page = res.data.current_page;
    },
  },
  computed: {},
  filters: {},
  watch: {},
  created() {
    this.getlist();
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.boxv {
  width: 100vw;
  height: 100%;

  .mainv {
    width: 85%;
    height: 100vh;
    margin-top: 30px;
  }
}

.demo-form-inline {
  margin: 20px;
  line-height: 0;
  height: 140px;
}
.el-input {
  width: 230px;
}
.el-select {
  width: 230px;
}
</style>
