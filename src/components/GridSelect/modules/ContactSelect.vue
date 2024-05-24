<template>
  <div class="contact-select">
    <Grid
      ref="grid"
      :columns="tableColumns"
      url="/api/contact"
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
  name: "ContactSelect",
  mixins: [mixin],
  props: ["account_number"],
  data() {
    return {
      searchCondition: {
        account_number: this.account_number,
      },
    };
  },
  computed: {
    tableColumns() {
      return [
        {
          label: "姓名",
          prop: "contact_name",
        },
        {
          label: "职务",
          prop: "post",
          formatter: "empty",
        },
        {
          label: "手机",
          prop: "mobile",
          formatter: "empty",
        },
        {
          label: "客户ID",
          prop: "account_number",
        },
        {
          label: "客户名称",
          prop: "account_name",
          minWidth: 200,
        },
        {
          label: "客户业务类型",
          prop: "account_business_type",
        },
      ];
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped></style>
