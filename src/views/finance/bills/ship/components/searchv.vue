<template>
  <div>
    <el-form
      :inline="true"
      :model="query"
      class="demo-form-inline"
      label-position="left"
    >
      <div style="display: flex; justify-content: space-between; width: 85%">
        <el-form-item label="订单编号">
          <el-input
            v-model="query.order_number"
            placeholder="请输入订单编号关键字"
          ></el-input>
        </el-form-item>
        <el-form-item label="发货单号">
          <el-input
            v-model="query.logistics_number"
            placeholder="请输入发货单号关键字"
          ></el-input>
        </el-form-item>
        <el-form-item label="物流单号">
          <el-input
            v-model="query.logistics_no"
            placeholder="请输入物流单号关键字"
          ></el-input>
        </el-form-item>
        <el-form-item label="物流状态">
          <el-select v-model="query.logistics_status" placeholder="请选择">
            <el-option label="待发货" value="1"></el-option>
            <el-option label="部分发货" value="2"></el-option>
            <el-option label="已发货" value="3"></el-option>
            <el-option label="已签收" value="4"></el-option>
            <el-option label="已取消" value="5"></el-option>
            <el-option label="待揽收" value="6"></el-option>
            <el-option label="快递员修改订单信息" value="7"></el-option>
            <el-option label="已取件" value="10"></el-option>
            <el-option label="已结算" value="15"></el-option>
            <el-option label="已接单" value="20"></el-option>
            <el-option label="收件中" value="21"></el-option>
            <el-option label="改派" value="22"></el-option>
            <el-option label="订单已取消" value="99"></el-option>
            <el-option label="运输中" value="101"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <br />
      <div style="display: flex; justify-content: space-between; width: 85%">
        <el-form-item label="收货人：">
          <el-input
            v-model="query.consignee"
            placeholder="请输入收货人关键字"
          ></el-input>
        </el-form-item>
        <el-form-item label="收货人手机号">
          <el-input
            v-model="query.address_mobile"
            placeholder="收货人"
          ></el-input>
        </el-form-item>
        <el-form-item label="订单所属校区">
          <el-select v-model="query.school_id" placeholder="请选择">
            <el-option label="测试1" value="2"></el-option>
            <el-option label="测试" value="3"></el-option>
            <el-option label="南京雨花台" value="5"></el-option>
            <el-option label="LSY测试校区" value="6"></el-option>
            <el-option label="三级校区的学校" value="8"></el-option>
            <el-option label="测试新增校区" value="9"></el-option>
            <el-option label="华东地区3" value="10"></el-option>
            <el-option label="xy的网校" value="11"></el-option>
            <el-option label="南京校区" value="12"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发货商品">
          <el-input
            v-model="query.product_name"
            placeholder="请输入发货商品关键字"
          ></el-input>
        </el-form-item>
      </div>
      <br />
      <el-form-item label="生成日期">
        <el-date-picker
          style="width: 230px"
          v-model="query.created_at"
          type="daterange"
          range-separator="——"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item style="margin-left: 850px">
        <el-button style="background-color: #b24901; color: #fff" @click="Sre"
          >查询</el-button
        >
        <el-button @click="out">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  inject: [],
  data() {
    return {};
  },
  methods: {
    out() {
      (this.query = {
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
        school_id: 0,
      }),
        window.location.reload();
      this.$message({
        type: "success",
        message: "重置成功!",
      });
    },
    Sre() {
      this.getlist();
      this.$message({
        type: "success",
        message: "查询成功!",
      });
    },
  },
  computed: {},
  components: {},
  filters: {},
  watch: {},
  created() {},
  mounted() {},
  props: ["query", "getlist"],
};
</script>

<style lang="scss" scoped>
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
