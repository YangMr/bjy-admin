<template>
  <div class="user-select">
    <CommonForm
      :items="formItemsNews"
      :params="searchNews"
      ref="formItemsNews"
      @on-search="onSearch"
      v-if="activeName == 1"
      :resetFunc="resetFunc"
    ></CommonForm>
    <CommonForm
      :items="formItemsNeed"
      :params="searchNeed"
      ref="formItemsNeed"
      @on-search="onSearch"
      v-if="activeName == 2"
      :resetFunc="resetFunc"
    ></CommonForm>
    <!--禁用某条数据:rowSelectDisabled="rowSelectDisabled"-->
    <Grid
      v-if="activeName == 1"
      ref="grid"
      :columns="tableColumnsNews"
      url="/api/job"
      :search="searchNews"
      @selection-change="onSelectionChange"
      :selectType="selectType"
      :formatter="onRowsFormatter"
      :selectedRows="selectedRows"
      :pageSize="5"
      :pageSizes="[5, 10, 20, 50]"
    >
      <template v-slot:thumb_img="{ row }">
        <img :src="row.thumb_img" style="height: 50px" />
      </template>
    </Grid>
    <Grid
      v-if="activeName == 2"
      ref="grid"
      :columns="tableColumnsNeed"
      url="/api/recruit"
      :search="searchNeed"
      :formatter="onRowsFormatter"
      @selection-change="onSelectionChange"
      :selectType="selectType"
      :selectedRows="selectedRows"
      :pageSize="5"
      :pageSizes="[5, 10, 20, 50]"
    ></Grid>
  </div>
</template>

<script>
import mixin from "../mixin";
export default {
  name: "RecruitmentPositionSelect",
  mixins: [mixin],
  data() {
    return {
      dataUrl: "",
      activeName: this.link_type,
      formItemsNews: [
        {
          label: "发布范围",
          type: "enum-select",
          enum: "newsType",
          key: "type",
        },
        {
          label: "资讯标题",
          placeholder: "资讯标题",
          type: "input",
          key: "keywords",
        },
      ],
      formItemsNeed: [
        //需求
        {
          label: "需求编号",
          type: "enum-select",
          enum: "newsType",
          key: "aaaa",
        },
        {
          label: "买家真实姓名",
          placeholder: "买家真实姓名",
          type: "input",
          key: "bbbb",
        },
        {
          label: "买家手机号码",
          placeholder: "买家手机号码",
          type: "input",
          key: "cccc",
        },
      ],
      formItemsService: [
        //服务
        {
          label: "需求编号",
          type: "enum-select",
          enum: "newsType",
          key: "aaaa",
        },
        {
          label: "卖家真实姓名",
          placeholder: "买家真实姓名",
          type: "input",
          key: "bbbb",
        },
        {
          label: "卖家手机号码",
          placeholder: "买家手机号码",
          type: "input",
          key: "cccc",
        },
      ],
      searchNews: {
        type: "",
        keywords: "",
        status: 1,
      },
      searchNeed: {
        aaaa: "",
        bbbb: "",
        cccc: "",
      },
      tableColumnsNews: [
        { label: "资讯封面", slot: "thumb_img", width: 100, align: "left" },
        {
          label: "资讯标题",
          slot: "title",
          minWidth: 120,
        },

        {
          label: "发布状态",
          prop: "status",
          enum: "newsStatus",
          width: 90,
          align: "center",
        },
        {
          label: "发布范围",
          prop: "type",
          enum: "newsType",
          width: 130,
          align: "center",
        },
        {
          label: "最后修改时间",
          prop: "updated_at",
          formatter: "datetime",
          width: 170,
          align: "center",
        },
      ],
      tableColumnsNeed: [
        {
          label: "需求编号",
          prop: "type",
          enum: "newsType",
          align: "center",
        },
        {
          label: "买家真实姓名",
          prop: "type",
          enum: "newsType",
          width: 130,
          align: "center",
        },
        {
          label: "买家手机号码",
          prop: "type",
          enum: "newsType",
          width: 130,
          align: "center",
        },
        {
          label: "需求险种",
          prop: "type",
          enum: "newsType",
          width: 130,
          align: "center",
        },
        {
          label: "最后修改时间",
          prop: "updated_at",
          formatter: "datetime",
          width: 170,
          align: "center",
        },
      ],
    };
  },
  created() {},
  methods: {
    handleClick(tab) {
      this.activeName = tab.name.toString();
      this.onSearch();
    },
    onRowsFormatter(rows) {
      rows.forEach(row => {
        row.linkType = this.activeName;
      });
    },
    resetFunc() {
      if (this.activeName == 3) {
        this.$refs.formItemsNews.resetParams();
      } else if (this.activeName == 2) {
        this.$refs.formItemsNeed.resetParams();
      } else if (this.activeName == 4) {
        this.$refs.formItemsService.resetParams();
      }
    },
    onSearch() {
      this.$refs.grid.requestList(true);
    },
    onDetail(row) {
      const { href } = this.$router.resolve({
        name: "MarketDetail",
        params: {
          id: row.id,
        },
      });
      window.open(href, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped></style>
