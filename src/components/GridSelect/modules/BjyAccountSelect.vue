<template>
  <div class="bjy-account-select">
    <CommonForm
      :items="formItems"
      :params="searchCondition"
      @on-search="onSearch"
    ></CommonForm>
    <Grid
      ref="grid"
      :columns="tableColumns"
      url="/api/bjyaccount"
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
  name: "BjyAccountSelect",
  mixins: [mixin],
  props: ["account_number", "private_sea"],
  data() {
    return {
      searchCondition: {
        owner_type: 3,
        account_number: this.account_number,
        private_sea: this.private_sea,
        account_name: "",
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
          label: "账号（手机号）",
          prop: "mobile",
          width: 140,
        },
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
          label: "账号所有人",
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
