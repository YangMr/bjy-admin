<template>
  <div class="order-select">
    <CommonForm
      :items="formItems"
      :params="searchCondition"
      @on-search="onSearch"
    ></CommonForm>
    <Grid
      ref="grid"
      :columns="tableColumns"
      url="/api/order"
      :search="searchCondition"
      @selection-change="onSelectionChange"
      :selectType="selectType"
      :rowSelectDisabled="rowSelectDisabled"
      :selectedRows="selectedRows"
      :pageSize="5"
      :pageSizes="[5, 10, 20, 50]"
    >
      <template v-slot:order_number="{ row }">
        <span class="high-light" @click="onDetail(row)">
          {{ row.order_number }}
        </span>
      </template>
    </Grid>
  </div>
</template>

<script>
import mixin from "../mixin";
export default {
  name: "OrderSelect",
  mixins: [mixin],
  props: ["account_name", "is_invalid", "is_pay"],
  data() {
    return {
      searchCondition: {
        owner_type: 3,
        order_status: 2,
        account_name: this.account_name, // 关联订单选择客户名下的订单
        order_number: "",
        is_invalid: this.is_invalid, //去除已申请作废的订单
        is_pay: this.is_pay, //去除已收款完成的订单
      },
    };
  },
  computed: {
    formItems() {
      return [
        {
          label: "订单编号",
          type: "input",
          key: "order_number",
        },
        {
          label: "客户名称",
          type: "input",
          key: "account_name",
        },
      ];
    },
    tableColumns() {
      return [
        {
          label: "订单编号",
          slot: "order_number",
          formatter: "empty",
          width: 180,
        },
        {
          label: "客户ID",
          prop: "account_number",
          formatter: "empty",
          width: 140,
        },
        {
          label: "客户名称",
          prop: "account_name",
          formatter: "empty",
        },
        {
          label: "客户业务类型",
          prop: "account_business_type",
          width: 160,
        },
        {
          label: "订单产品类型",
          prop: "order_product_type",
          width: 150,
          formatter: "empty",
        },
      ];
    },
  },
  created() {},
  methods: {
    onDetail(row) {
      const { href } = this.$router.resolve({
        name: "OrderDetail",
        query: {
          id: row.id,
        },
      });
      window.open(href, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped></style>
