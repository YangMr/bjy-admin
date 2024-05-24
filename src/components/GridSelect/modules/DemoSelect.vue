<template>
  <div class="demo-select">
    <CommonForm
      :items="formItems"
      :params="searchCondition"
      @on-search="onSearch"
      :columnCount="formColumnCount"
    ></CommonForm>
    <Grid
      ref="grid"
      :columns="tableColumns"
      url="/api/market"
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
  name: "DemoSelect",
  mixins: [mixin],
  data() {
    return {
      formItems: [
        {
          label: "市场活动编号",
          type: "input",
          key: "apply_number",
        },
        {
          label: "活动名称",
          type: "input",
          key: "apply_name",
        },
        {
          label: "活动状态",
          type: "enum-select",
          key: "status",
          enum: "ActivityStatus",
        },
      ],
      searchCondition: {
        apply_number: "",
        apply_name: "",
        status: "",
      },
      tableColumns: [
        { label: "序号", prop: "id", width: 60 },
        { label: "市场活动编号", key: "apply_number", formatter: "empty" },
        {
          label: "活动名称",
          prop: "apply_name",
        },
        {
          label: "活动状态",
          prop: "status",
          enum: "ActivityStatus",
        },
      ],
    };
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
