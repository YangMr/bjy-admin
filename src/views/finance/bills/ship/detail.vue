<template>
  <div>
    <el-breadcrumb separator="/" class="titlev">
      <el-breadcrumb-item :to="{ path: '/finance/bills/ship' }"
        >发货单</el-breadcrumb-item
      >
      <el-breadcrumb-item><a href="/detail">发货单详情</a></el-breadcrumb-item>
    </el-breadcrumb>

    <div class="box">
      <div class="q">物流信息</div>
      <table>
        <tr>
          <td>订单编号：{{ order_number }}</td>
          <td>配送：快递</td>
          <td>物流编号：{{ school_id }}</td>
          <td>收货人：{{ consignee }}</td>
        </tr>
        <tr>
          <td>发货单号：{{ logistics_number }}</td>
          <td>物流公司：{{logistics_name}}</td>
          <td>物流费用：0</td>
          <td>收货人手机号：{{ address_mobile }}</td>
        </tr>
        <tr>
          <td>操作人：</td>
          <td>收货地址：</td>
          <td>物流状态：已签收</td>
          <td>取件码：-</td>
        </tr>
        <tr>
          <td>物流内容：{{ material_content }}</td>
        </tr>
      </table>

      <div class="q">发货信息</div>

      <table border="1" cellspacing="0" class="tab">
        <tr>
          <td>发货类型</td>
          <td>发货商品</td>
          <td>发货量</td>
          <td>发货说明</td>
        </tr>
        <tr>
          <td>{{ logistics_name }}</td>
          <td>{{ product_name }}</td>
          <td>1</td>
          <td>0</td>
        </tr>
      </table>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order_address_id: "",
      order_number:"",
      consignee:"",
      logistics_number:"",
      material_content:"",
      logistics_name:"",
      school_id:"",
      address_mobile:"",
      product_name:"",
    };
  },
  methods: {},
  computed: {},
  components: {},
  filters: {},
  watch: {},
  created() {
    this.order_address_id = this.$route.query.id;
    this.order_number = this.$route.query.name;
    this.logistics_number = this.$route.query.number;
    this.consignee = this.$route.query.consignee;
    this.material_content = this.$route.query.material_content;
    this.logistics_name = this.$route.query.logistics_name;
    this.school_id = this.$route.query.school_id;
    this.address_mobile = this.$route.query.address_mobile;
    this.product_name = this.$route.query.product_name;
  },
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
.box {
  padding: 20px;
}
.q {
  width: 70px;
  text-align: center;
  border-left: 3px solid red;
  margin: 15px 0;
}
table {
  width: 100%;
  height: 150px;
  td {
    width: 25%;
    height: 25%;
  }
}
.tab{
  text-align: center;
}
</style>
