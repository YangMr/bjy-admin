<template>
  <div class="user-select">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="资讯" name="3"></el-tab-pane>
      <el-tab-pane label="聚保盆需求" name="2"></el-tab-pane>
      <el-tab-pane label="聚保盆服务" name="4"></el-tab-pane>
      <el-tab-pane label="保聘" name="5" v-if="client_str == 1"></el-tab-pane>
    </el-tabs>
    <CommonForm
      :items="formItemsNeed"
      :params="searchNeed"
      ref="formItemsNeed"
      @on-search="onSearch"
      v-if="activeName == 2"
      :resetFunc="resetFunc"
    ></CommonForm>
    <CommonForm
      :items="formItemsNews"
      :params="searchNews"
      ref="formItemsNews"
      @on-search="onSearch"
      v-if="activeName == 3"
      :resetFunc="resetFunc"
    ></CommonForm>
    <CommonForm
      :items="formItemsService"
      :params="searchService"
      ref="formItemsService"
      @on-search="onSearch"
      v-if="activeName == 4"
      :resetFunc="resetFunc"
    ></CommonForm>
    <!--禁用某条数据:rowSelectDisabled="rowSelectDisabled"-->
    <template v-if="activeName == 2">
      <Grid
        ref="grid"
        :columns="tableColumnsNeed"
        url="/api/needList"
        :search="searchNeed"
        :formatter="onRowsFormatter"
        @selection-change="onSelectionChange"
        :selectType="selectType"
        :selectedRows="selectedRows"
        :pageSize="5"
        :pageSizes="[5, 10, 20, 50]"
      ></Grid>
    </template>
    <template v-else-if="activeName == 3">
      <Grid
        ref="grid"
        :columns="tableColumnsNews"
        url="/api/information"
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
        <template v-slot:title="{ row }">
          {{ row }}==
          <span v-if="row.is_recommend == 1" style="color: #1795ff">
            [置顶]
          </span>
          {{ row.title }}
        </template>
      </Grid>
    </template>
    <template v-else-if="activeName == 4">
      <Grid
        ref="grid"
        :columns="tableColumnsService"
        url="/api/serviceList"
        :search="searchService"
        :formatter="onRowsFormatter"
        @selection-change="onSelectionChange"
        :selectType="selectType"
        :selectedRows="selectedRows"
        :pageSize="5"
        :pageSizes="[5, 10, 20, 50]"
      ></Grid>
    </template>
    <template v-else-if="activeName == 5">
      <Grid
        ref="grid"
        keyField="id"
        url=""
        mode="client"
        :columns="tableRecruitment"
        :localData="dataRecruitment"
        :formatter="onRowsFormatter"
        @selection-change="onSelectionChange"
        :selectType="selectType"
        :selectedRows="selectedRows"
      ></Grid>
      <div>
        注意：
        <span style="color: red">人才库仅可作用于买家端</span>
      </div>
    </template>
  </div>
</template>

<script>
import mixin from "../mixin";
export default {
  name: "MarketSelect",
  mixins: [mixin],
  data() {
    return {
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
          type: "input",
          placeholder: "需求编号",
          key: "need_number",
        },
        {
          label: "买家真实姓名",
          placeholder: "买家真实姓名",
          type: "input",
          key: "identify_name",
        },
        {
          label: "买家手机号码",
          placeholder: "买家手机号码",
          type: "input",
          key: "mobile",
        },
      ],
      formItemsService: [
        //服务
        {
          label: "服务编号",
          placeholder: "服务编号",
          type: "input",
          key: "service_number",
        },
        {
          label: "卖家真实姓名",
          placeholder: "买家真实姓名",
          type: "input",
          key: "identify_name",
        },
        {
          label: "卖家手机号码",
          placeholder: "买家手机号码",
          type: "input",
          key: "mobile",
        },
      ],
      searchNews: {
        type: "",
        keywords: "",
        status: 1,
      },
      searchNeed: {
        need_number: "",
        identify_name: "",
        mobile: "",
        status: 1,
      },
      searchService: {
        need_number: "",
        identify_name: "",
        mobile: "",
        status: 1,
      },
      searchRecruitment: {
        aaaaaa: 1111,
      },
      tableColumnsNews: [
        {
          label: "资讯标题",
          prop: "title",
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
          prop: "need_number",
          minWidth: 180,
          align: "left",
        },
        {
          label: "买家手机号",
          prop: "mobile",
          width: 150,
        },
        {
          label: "买家真实姓名",
          prop: "identify_name",
          width: 120,
          align: "center",
        },
        {
          label: "购买险种",
          prop: "name",
          width: 200,
          align: "center",
        },
      ],
      tableColumnsService: [
        {
          label: "服务编号",
          prop: "service_number",
          minWidth: 180,
          align: "left",
        },
        {
          label: "商家手机号",
          prop: "mobile",
          width: 160,
        },
        {
          label: "商家真实姓名",
          prop: "identify_name",
          width: 120,
          align: "center",
        },
        {
          label: "售卖险种",
          prop: "name",
          width: 260,
          align: "center",
        },
      ],
      tableRecruitment: [
        {
          label: "id",
          prop: "id",
          minWidth: 180,
          align: "left",
        },
        {
          label: "模块内容",
          prop: "name",
          minWidth: 160,
        },
      ],
      dataRecruitment: [
        {
          id: 5,
          name: "人才库",
        },
      ],
    };
  },
  created() {
    this.dataRecruitment = [
      {
        id: 5,
        name: "人才库",
      },
    ];
  },
  methods: {
    handleClick(tab) {
      let that = this;
      this.activeName = tab.name.toString();
      setTimeout(function () {
        that.onSearch();
      }, 1);
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
