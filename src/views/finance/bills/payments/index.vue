<template>
  <div class="payments_content">
    <div class="payments_search">
      <div class="payments_title">
        <h3 class="title">收款单</h3>
      </div>
      <div class="search">
        <el-form :inline="true" label-position="right" label-width="98px" :model="paymentQuery">
          <el-form-item label="支付类型">
            <ele_select
              v-model="paymentQuery.pay_type"
              :options="userSearch.paymentType">
            </ele_select>
          </el-form-item>
          <el-form-item label="支付终端">
            <ele_select
              v-model="paymentQuery.tag_type"
              :options="userSearch.paymentTerminal">
            </ele_select>
          </el-form-item>
          <el-form-item label="状态">
            <ele_select
              v-model="paymentQuery.status"
              :options="userSearch.state">
            </ele_select>
          </el-form-item>
          <el-form-item label="支付时间">
            <el-date-picker
              v-model="time"
              end-placeholder="结束日期"
              range-separator=""
              start-placeholder="开始日期"
              style="width: 200px;"
              type="daterange"
              @change="handelTime"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="订单编号">
            <el-input v-model="paymentQuery.order_number" placeholder="请输入订单编号关键字"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="paymentQuery.mobile" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="订单所属校区">
            <ele_select
              v-model="paymentQuery.school_id"
              :options="userSearch.goods">
            </ele_select>
          </el-form-item>
          <el-form-item class="btn">
            <el-button  @click="getList" style="background-color: #b24901;color: #fff">查询</el-button>
            <el-button @click="resetFilters">重置</el-button>
          </el-form-item>
        </el-form>

        <el-button @click="batchexport" style="background-color: #b24901;color: #fff">批量导出</el-button>
        <el-button @click="$router.push('/exports')" style="background-color: #b24901; color: #fff">查看导出</el-button>
        <PaymentsTable :paymentList="paymentList" :tableConfig="tableConfig">
          <template v-slot:status="{ row }">
          <span>{{
              row.status == 1 ? '支付成功' : row.status == 2 ? '支付失败' : row.status == 3 ? '取消' : '准备发起支付'
            }}</span>
          </template>
          <template v-slot:tagType="{ row }">
            <span>{{ handelTagType(String(row.tag_type)) }}</span>
          </template>
          <template v-slot:payType="{ row }">
            <span>{{ handelType(row.pay_type) }}</span>
          </template>
          <template v-slot:school="{ row }">
            <span>{{ handelScholl(row.school_id) }}</span>
          </template>
          <template v-slot:trade="{ row }">
            <span>{{ row.trade_no ? row.trade_no : "--" }}</span>
          </template>
          <template v-slot:begin="{ row }">
            <span>{{ new Date(row.begin_time * 1000).toLocaleDateString() }}</span>
          </template>
          <template v-slot:payed="{ row }">
            <span>{{ new Date(row.payed_time * 1000).toLocaleDateString() }}</span>
          </template>
        </PaymentsTable>
        <elementDialog ref="dialogRef"></elementDialog>
        <el-pagination
          :current-page="paymentQuery.page"
          :page-size="paymentQuery.limit"
          :page-sizes="[10, 20, 30, 40]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handelSize"
          @current-change="handelPage">
        </el-pagination>
      </div>
    </div>
<!--    <div class="payments_table">-->

<!--    </div>-->

  </div>
</template>

<script>
import ele_select from './components/elementSelect.vue';
import PaymentsTable from './components/elementTable.vue';
import elementDialog from "./components/elementDialog.vue";
import {getPaymentsList} from '../../../../api/api_billsPayments';

export default {
  components: {
    ele_select,
    PaymentsTable,
    elementDialog
  },
  data() {
    return {
      userSearch: {
        paymentType: [
          {label: '微信', value: '1'},
          {label: '支付宝', value: '2'},
          {label: '虚拟币支付', value: '3'},
          {label: '赠送', value: '6'},
          {label: '优惠劵支付', value: '7'},
          {label: '线下支付', value: '8'},
          {label: '免费', value: '10'}
        ],
        paymentTerminal: [
          {label: 'PC', value: '1'},
          {label: '安卓', value: '2'},
          {label: 'ios', value: '3'},
          {label: 'H5', value: '4'},
          {label: '小程序', value: '5'},
          {label: '微信内置H5', value: '6'},
          {label: 'IPAD', value: '7'},
          {label: '管理端', value: '8'},
          {label: 'SCRM', value: '9'}
        ],
        state: [
          {label: '准备发起支付', value: '0'},
          {label: '支付成功', value: '1'},
          {label: '支付失败', value: '2'},
          {label: '取消', value: '3'}
        ],
        goods: [
          {label: '测试1', value: '2'},
          {label: '测试', value: '3'},
          {label: '南京雨花台', value: '5'},
          {label: 'LSY测试校区', value: '6'},
          {label: '三级校区的学校', value: '8'},
          {label: '测试新增校区', value: '9'},
          {label: '华东地区3', value: '10'},
          {label: 'xy的网校', value: '11'},
          {label: '南京校区', value: '12'}
        ]
      },
      paymentQuery: {
        page: 1,
        limit: 10,
        pay_type: '',
        tag_type: '',
        status: '',
        payed_start: '',
        payed_end: '',
        order_number: '',
        mobile: '',
        school_id: ''
      },
      paymentList: [],
      tableConfig: [
        {label: '付款单编号', prop: 'payment_number', width: 180, align: 'center'},
        {label: '订单编号', prop: 'order_number', width: 180, align: 'center'},
        {label: '订单所属校区', prop: 'school_id', align: 'center', width: 180, slot: 'school'},
        {label: '交易流水号', prop: 'trade_no', slot: 'trade', align: 'center', width: 180},
        {label: '用户手机号', prop: 'mobile', align: 'center', width: 180},
        {label: '支付金额', prop: 'pay_price', align: 'center'},
        {label: '支付类型', prop: 'pay_type', align: 'center', slot: 'payType'},
        {label: '支付终端', prop: 'tag_type', align: 'center', slot: 'tagType'},
        {label: '状态', prop: '', align: 'center', slot: 'status'},
        {label: '创建时间', prop: 'begin_time', align: 'center', slot: 'begin', width: 100},
        {label: '支付时间', prop: 'payed_time', align: 'center', slot: 'payed', width: 100}
      ],
      time:'',
      total:0
    };
  },
  methods: {
    handelScholl(id) {
      switch (id) {
        case 2:
          return '测试1';
        case 3:
          return '测试';
        case 5:
          return '南京雨花台';
        case 6:
          return 'LSY测试校区';
        case 8:
          return '三级校区的学校';
        case 9:
          return '测试新增校区';
        case 10:
          return '华东地区3';
        case 11:
          return 'xy的网校';
        case 12:
          return '南京校区';
        default:
          return '未知';
      }
    },
    handelType(type) {
      switch (type) {
        case '1':
          return '微信';
        case '2':
          return '支付宝';
        case '3':
          return '虚拟币支付';
        case '6':
          return '赠送';
        case '7':
          return '优惠劵支付';
        case '8':
          return '线下支付';
        case '10':
          return '免费';
        default:
          return '未知';
      }
    },
    handelTagType(type) {
      switch (type) {
        case '1':
          return 'PC';
        case '2':
          return '安卓';
        case '3':
          return 'ios';
        case '4':
          return 'H5';
        case '5':
          return '小程序';
        case '6':
          return '微信内置H5';
        case '7':
          return 'IPAD';
        case '8':
          return '管理端';
        case '9':
          return 'SCRM';
        default:
          return '未知';
      }
    },
    resetFilters() {
      this.paymentQuery = {
        page: 1,
        limit: 10,
        pay_type: '',
        tag_type: '',
        status: '',
        payed_start: '',
        payed_end: '',
        order_number: '',
        mobile: '',
        school_id: ''
      };
    },
    getList() {
      getPaymentsList(this.paymentQuery).then(res => {
        this.paymentList = res.data.list;
        this.total = res.data.total
      });
    },
    handelTime(){
      this.paymentQuery.payed_start = this.time[0];
      this.paymentQuery.payed_end = this.time[1];
    },
    batchexport() {
      this.$refs.dialogRef.openDialog()
    },
    handelPage(val) {
     this.paymentQuery.page = val;
      this.getList()
    },
    handelSize(val) {
      this.paymentQuery.limit = val;
      this.getList()
    }
  },
  created() {

  this.getList()
  }
};
</script>

<style scoped>
.search {
  margin-top: 20px;
  background-color: #fff;
  padding: 0 20px;
  height: 110vh;
overflow: hidden;
  .el-input {
    width: 200px;
  }

  .btn {
    .el-button {
      &:first-child {
        margin-left: 100px;
      }
    }
  }
}

.payments_content {
  width: 100%;
  height: 200px;
  background-color: #fff;

  .payments_search {

    .payments_title {
      .title {
        padding: 12px 20px;
        font-size: 18px;
        font-weight: 400;
        color: #333;
      }

      border-bottom: 1px solid #f4f4f4;
    }
  }
}

</style>
