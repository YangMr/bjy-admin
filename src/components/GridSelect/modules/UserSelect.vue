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
      url="/api/user"
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
  name: "UserSelect",
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
          label: "用户姓名",
          type: "input",
          key: "user_name",
        },
        {
          label: "用户手机",
          type: "input",
          key: "mobile",
        },
      ],
      searchCondition: {
        user_name: "",
        mobile: "",
        is_seller: this.is_seller,
        is_real_name_certificatio: this.type,
      },
      tableColumns: [
        {
          label: "用户姓名",
          prop: "user_name",
        },
        {
          label: "真实用户姓名",
          prop: "identify_name",
          width: 160,
          align: "center",
        },
        {
          label: "用户手机号",
          prop: "mobile",
          width: 160,
          align: "center",
        },
        {
          label: "注册时间",
          prop: "created_at",
          formatter: "datetime",
          width: 180,
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
