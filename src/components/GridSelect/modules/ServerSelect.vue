<template>
  <div class="user-select">
    <CommonForm
      ref="commonForm"
      :items="formItems"
      :params="searchCondition"
      @on-search="onSearch"
    ></CommonForm>
    <Grid
      ref="grid"
      :columns="tableColumns"
      url="/api/serviceCenter"
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
  name: "ServerSelect",
  mixins: [mixin],
  props: {
    type: {
      type: String,
      default: "1",
    },
    is_seller: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      formItems: [
        {
          label: "服务中心名称",
          type: "input",
          key: "store_name",
        },
        {
          label: "服务门店号",
          type: "input",
          key: "store_number",
        },
      ],
      searchCondition: {
        store_name: "",
        store_number: "",
      },
      tableColumns: [
        {
          label: "用户姓名",
          prop: "store_name",
        },
        {
          label: "服务门店号",
          prop: "store_number",
          width: 160,
          align: "center",
        },
      ],
    };
  },
  created() {},
  methods: {
    onSearch(refresh = true) {
      this.$refs.grid.requestList(refresh);
    },
    resetFunc() {
      this.$refs.searchCondition.resetParams();
    },
  },
};
</script>

<style lang="scss" scoped></style>
