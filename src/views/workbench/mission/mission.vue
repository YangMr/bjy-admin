<template>
  <div class="warp-main">
    <div class="flow-query">
      <div class="content">
       333
        <Grid
          ref="grid"
          :columns="tableColumns"
          url="/api/order/index"
          :search="searchCondition"
          keyField="id"
          :formatter="onRowsFormatter"
          method="post"
        >
          <template v-slot:sort="{ index }">
            <span>
              {{ index + 1 }}
            </span>
          </template>
          <template v-slot:action="{ row }">
            <el-button type="text" @click="onDetail(row)">详情</el-button>
          </template>
        </Grid>
      </div>
    </div>
    <div @click="$router.push({name:'dddddd'})">fdsafsda</div>
    <el-row v-loading="loading" element-loading-text="拼命加载中">
      <el-col :span="24" class="toolbar">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.number" placeholder="请输入任务编号" auto-complete="off" @keyup.enter.native="handleSearch"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" v-on:click="handleSearch">查询</el-button>
          </el-form-item>
          <el-form-item class="pull-right">
            <el-button type="primary" size="medium" @click="showAddDialog" icon="el-icon-plus">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--表格数据-->
      <el-col class="table-wrapper">
        <el-table :data="tableData" stripe style="width: 100%" @row-click="handleDetail">
          <el-table-column prop="mId" v-if="idShow" label="任务ID"></el-table-column>
          <el-table-column prop="mNumber" label="任务编号" sortable></el-table-column>
          <el-table-column prop="mType" label="任务类型"></el-table-column>
          <el-table-column prop="mContent" label="任务内容"></el-table-column>
          <el-table-column prop="eRemark" label="任务备注" show-overflow-tooltip></el-table-column>
          <el-table-column prop="createTime" :formatter="dateFormatter" label="创建日期"></el-table-column>
          <el-table-column prop="activeTime" :formatter="activeTateFormatter" label="执行日期"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" class="toolbar">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="currentPage" :page-sizes="[10, 50, 100, 200]" :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </el-col>
    </el-row>

    <!--添加-->
    <mission-add ref="addMission" v-if="addVisible" :visible.sync="addVisible"></mission-add>
    <!--详情-->
    <div class="modal-mask" v-if="maskVisible" @click="cancelVisible"></div>
    <transition name="slide-fade">
      <div class="detail-box" v-if="detailVisible">
        <mission-detail ref="detailMission" :id="detailId"></mission-detail>
      </div>
    </transition>
  </div>
</template>
<script>
  import MissionAdd from './add'
  import MissionDetail from './detail'
  export default {
    name: 'mission',
    data: function(){
      return {
        tableColumns: [
        { label: "序号", slot: "sort", width: 60, fixed: "left" },
        {
          label: "车险订单号",
          prop: "order_number",
          minWidth: 160,
          align: "center",
        },
        {
          label: "关联车险服务编号",
          prop: "service_num",
          width: 160,
          align: "center",
        },
        {
          label: "买家手机号",
          prop: "buyer_mobile",
          width: 160,
          align: "center",
        },
        {
          label: "买家真实姓名",
          prop: "buyer_identify_name",
          width: 120,
          align: "center",
        },
        {
          label: "商家手机号",
          prop: "seller_mobile",
          width: 150,
          align: "center",
        },
        {
          label: "商家真实姓名",
          prop: "seller_identify_name",
          width: 120,
          align: "center",
        },
        {
          label: "购买险种类型",
          prop: "insurance_name",
          width: 120,
          align: "center",
        },
        {
          label: "交易保证金",
          prop: "price",
          width: 120,
          align: "center",
        },
        {
          label: "契约保证金",
          prop: "fulfill_money",
          width: 120,
          align: "center",
        },
        {
          label: "居间红包",
          prop: "reward_money",
          width: 120,
          align: "center",
        },
        {
          label: "订单金额",
          prop: "bid_total_price",
          width: 120,
          align: "center",
        },
        {
          label: "订单状态",
          prop: "big_status",
          enum: "bigOrderStatus",
          width: 120,
          align: "center",
        },
        {
          label: "关联需求",
          prop: "reward_name",
          width: 180,
          align: "center",
        },
        {
          label: "关联服务",
          prop: "service_name",
          width: 180,
          align: "center",
        },
        {
          label: "出账单行",
          prop: "bid_total_price",
          width: 120,
          align: "center",
        },
        {
          label: "创建时间",
          prop: "created_at",
          formatter: "datetime",
          width: 180,
          align: "center",
        },
        {
          label: "操作",
          slot: "action",
          fixed: "right",
          width: 100,
          align: "center",
        },
      ],
      formItems: [
        {
          label: "订单号",
          placeholder: "订单号",
          type: "input",
          key: "order_number",
        },
        {
          label: "买家手机号",
          placeholder: "买家手机号",
          type: "input",
          key: "buyer_mobile",
        },
        {
          label: "商家手机号",
          placeholder: "商家手机号",
          type: "input",
          key: "seller_mobile",
        },
        {
          label: "买家姓名",
          placeholder: "买家姓名",
          type: "input",
          key: "buyer_name",
        },
        {
          label: "商家姓名",
          placeholder: "商家姓名",
          type: "input",
          key: "seller_name",
        },
        {
          label: "险种",
          placeholder: "险种",
          type: "enum-select",
          enum: "isTop",
          key: "classify_id",
        },
        {
          label: "订单状态",
          placeholder: "订单状态",
          type: "enum-select",
          key: "status",
          enum: "bigOrderStatus",
        },
        {
          label: "创建时间",
          placeholder: "创建时间",
          type: "date-time-range-select",
          keyStart: "create_start_date",
          keyEnd: "create_end_date",
        },
      ],
      searchCondition: {
        order_number: "",
        buyer_mobile: "",
        seller_name: "",
        buyer_name: "",
        seller_mobile: "",
        classify_id: "",
        status: "",
        create_start_date: "",
        create_end_date: "",
      },
        loading: false,
        idShow: false,
        total: 2,
        currentPage: 1,
        pageSize: 10,
        tableData: [{
          mId: 1,
          mNumber: '10001',
          mType: '接收订单',
          mContent: '接乘客',
          eRemark: '无',
          createTime: 1540560471000,
          activeTime: 1540760471000
        },
          {
            mId: 2,
            mNumber: '10002',
            mType: '转发订单',
            mContent: '接乘客',
            eRemark: '无',
            createTime: 1540560471000,
            activeTime: 1540680471000
          }],
        addVisible: false, // 添加弹窗flag
        detailVisible: false, // 详情弹窗flag
        maskVisible: false, // 弹窗mask显示
        detailId: 0, // 详情ID
        filters: { // 搜索表单
          number: ''
        }
      };
    },
    components: {
      'mission-add': MissionAdd,
      'mission-detail': MissionDetail
    },
    methods: {
      onRowsFormatter(rows) {
      rows.forEach(row => {
        if (row.bid) {
          row.bid_total_price = this.$tool.calcPrice(row.bid.total_price);
          row.fulfill_money = this.$tool.calcPrice(row.bid.fulfill_money);
          row.reward_money = this.$tool.calcPrice(row.bid.reward_money);
          row.price = this.$tool.calcPrice(row.bid.price);
          row.insurance_name = row.bid.insurance_classify_name;
          if (row.bid.need_id > 0) {
            row.reward_name = row.bid.name;
          } else {
            row.reward_name = "--";
          }
          if (row.bid.service_id > 0) {
            row.service_name = row.bid.name;
          } else {
            row.service_name = "--";
          }
        } else {
          row.bid_total_price = "--";
          row.reward_name = "--";
          row.service_name = "--";
          row.fulfill_money = "--";
          row.reward_money = "--";
        }
        if (row.buyer) {
          row.buyer_mobile = this.$tool.isText(row.buyer.mobile);
          row.buyer_identify_name = this.$tool.isText(row.buyer.identify_name);
        }
        if (row.seller && row.seller.mobile) {
          row.seller_mobile = this.$tool.isText(row.seller.mobile);
        } else {
          row.seller_mobile = "--";
        }
        if (row.seller && row.seller.identify_name) {
          row.seller_identify_name = this.$tool.isText(
            row.seller.identify_name,
          );
        } else {
          row.seller_identify_name = "--";
        }
        if (row.type == 3) {
          row.service_num = row.car_insurance && row.car_insurance.service_num;
        }
      });
      console.log(rows);
    },
    onSearch(refresh = true) {
      this.$refs.grid.requestList(refresh);
    },
    resetFunc() {
      this.$refs.commonForm.resetParams();
    },
    async onDetail(row) {
      let name = "CornucopiaOrderDetails";
      if (this.type == 3) {
        name = "AutoInsuranceOrderDetails";
      }
      alert(name)
      alert(row)
    },
      // 搜索
      handleSearch(){
        console.info(this.filters.number);
      },
      // 详情
      handleDetail(row, event, column) {
        this.detailId = row.mId;
        this.maskVisible = true;
        this.detailVisible = true;
      },
      // 删除
      handleDelete(index, row) {
        console.log(index, row);
      },
      // 选择每页显示条数
      handleSizeChange(val){
//        this.pageSize = val;
//        this.currentPage = 1;
      },
      // 跳转页
      handleCurrentChange(val){
//        this.currentPage = val;
      },
      // 添加弹窗
      showAddDialog(){
        this.addVisible = true;
      },
      // 关闭所有弹窗
      cancelVisible() {
        this.maskVisible = false;
        this.detailVisible = false;
      },
      // 创建日期转换
      dateFormatter(row, column) {
        return this.getDateValue(row.createTime);
      },
      // 执行日期转换
      activeTateFormatter(row, column) {
        return this.getDateValue(row.activeTime);
      },
      // 获取日期
      getDateValue(datetime) {
        if (datetime) {
          datetime = new Date(datetime);
          let y = datetime.getFullYear() + '-';
          let mon = datetime.getMonth() + 1 + '-';
          let d = datetime.getDate();
          return y + mon + d;
        }
        return ''
      },
    }
  }
</script>
<style lang="scss" scoped>
  .detail-box {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 500px;
    height: 100%;
    overflow-y: auto;
    z-index: 2000;
    background-color: #fff;
  }
  .modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background-color: #000;
    opacity: .3;
  }
</style>
