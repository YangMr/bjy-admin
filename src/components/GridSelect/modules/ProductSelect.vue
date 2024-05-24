<template>
  <div class="product-select">
    <CommonForm
      :items="formItems"
      :params="searchCondition"
      @on-search="onSearch"
    ></CommonForm>
    <Grid
      ref="grid"
      :columns="tableColumns"
      url="/api/product"
      :search="searchCondition"
      @selection-change="onSelectionChange"
      :selectType="selectType"
      :rowSelectDisabled="rowSelectDisabled"
      :selectedRows="selectedRows"
      :pageSize="5"
      :pageSizes="[5, 10, 20, 50]"
    >
      <template v-slot:price_unit="{ row }">
        {{ row.price_unit | price }}
      </template>
    </Grid>
  </div>
</template>

<script>
import mixin from "../mixin";
export default {
  name: "ProductSelect",
  mixins: [mixin],
  data() {
    return {
      formItems: [
        {
          label: "产品编号",
          type: "input",
          key: "product_number",
        },
        {
          label: "产品线",
          type: "common-select",
          key: "product_direction",
          props: {
            presetType: "product_direction",
          },
        },
        {
          label: "产品名称",
          type: "input",
          key: "product_name",
        },
      ],
      searchCondition: {
        product_number: "",
        product_name: "",
        product_direction: "",
        enable_status: 1,
      },
      tableColumns: [
        {
          label: "产品编号",
          prop: "product_number",
          minWidth: 120,
        },
        {
          label: "产品线",
          prop: "product_direction",
        },
        {
          label: "产品名称",
          type: "input",
          prop: "product_name",
          minWidth: 160,
        },
        {
          label: "销售单位",
          prop: "sales_unit",
        },
        {
          label: "税率",
          prop: "tax_rate",
        },
        { label: "分辨率", prop: "resolution" },
        {
          label: "海外支持",
          prop: "overseas_support",
          enum: "YesOrNo",
          minWidth: 90,
        },
        {
          label: "内部核算价(元)",
          slot: "price_unit",
          fixed: "right",
          minWidth: 120,
        },
      ],
    };
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
