<template>
  <div class="customer-select">
    <CommonForm
      :items="formItems"
      :params="searchCondition"
      @on-search="onSearch"
    ></CommonForm>
    <Grid
      ref="grid"
      :columns="tableColumns"
      url="/api/account"
      :search="searchCondition"
      @selection-change="onSelectionChange"
      :selectType="selectType"
      :rowSelectDisabled="rowSelectDisabled"
      :selectedRows="selectedRows"
      :pageSize="5"
      :pageSizes="[5, 10, 20, 50]"
    ></Grid>
  </div>
</template>

<script>
import mixin from "../mixin";
export default {
  name: "CustomerSelect",
  mixins: [mixin],
  data() {
    return {
      searchCondition: {
        account_name: "",
        owner_type: 3,
      },
    };
  },
  computed: {
    formItems() {
      return [
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
          label: "客户ID",
          prop: "account_number",
          width: 140,
        },
        {
          label: "客户名称",
          prop: "account_name",
        },
        {
          label: "客户业务类型",
          prop: "account_business_type",
          width: 160,
        },
        {
          label: "客户状态",
          prop: "high_sea_status",
          width: 120,
          enum: "CustomerStatus",
        },
        {
          label: "客户所有人",
          prop: "owner_name",
          width: 120,
        },
      ];
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped></style>
