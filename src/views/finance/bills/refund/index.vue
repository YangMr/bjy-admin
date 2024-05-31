<template>
  <div>
    <Breadcrumb></Breadcrumb>
    <header>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <div class="top">
          <el-form-item label="退款来源">
            <el-select size="small" clearable v-model="formInline.create_type" placeholder="请选择">
              <el-option label="学员申请" value="1"></el-option>
              <el-option label="管理员发起" value="2"></el-option>
              <el-option label="系统退款" value="3"></el-option>
              <el-option label="Scrm退款" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="退款方式">
            <el-select size="small" v-model="formInline.refund_type" placeholder="请选择">
              <el-option label="线上退款" value="1"></el-option>
              <el-option label="线下退款" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="退款状态">
            <el-select size="small" v-model="formInline.status" placeholder="请选择">
              <el-option label="待审批" value="1"></el-option>
              <el-option label="退款成功" value="2"></el-option>
              <el-option label="学员取消申请" value="3"></el-option>
              <el-option label="退款失败" value="4"></el-option>
              <el-option label="拒绝退款" value="5"></el-option>
              <el-option label="退款中" value="6"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发起退款时间">
            <div class="block">
              <el-date-picker style="width: 200px;" size="small" v-model="refund" type="datetimerange"
                range-separator="——" start-placeholder="开始时间" end-placeholder="结束时间">
              </el-date-picker>
            </div>
          </el-form-item>
        </div>
        <br />
        <div class="bottom">
          <el-form-item label="订单编号">
            <el-input size="small" v-model="formInline.order_number" placeholder="请输入订单编号关键字"></el-input>
          </el-form-item>
          <el-form-item label="手机号 ">
            <el-input size="small" v-model="formInline.mobile" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="订单所属校区">
            <el-select size="small" v-model="formInline.school_id" placeholder="请选择">
              <el-option v-for="(item, index) in getCampusList" :key="index" :label="item.org_name"
                :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="text-align: right">
            <div style="width: 270px">
              <el-button class="btn" @click="onSubmit" size="small">查询</el-button>
              <el-button size="small" @click="reset">重置</el-button>
            </div>
          </el-form-item>
        </div>
      </el-form>
    </header>
    <main>
      <p>
        <el-button class="btn" @click="dialogFn">批量导出</el-button>
        <el-button class="btn" @click="$router.push('/exports?type=6')">查看导出</el-button>
      </p>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="refund_num" label="退款单编号" width="180">
        </el-table-column>
        <el-table-column prop="payment_num" label="支付单编号" width="180">
        </el-table-column>
        <el-table-column prop="order_num" label="订单编号" width="180">
        </el-table-column>
        <el-table-column prop="trade_no" label="交易流水号" width="180">
          <template slot-scope="scope">
            <span v-show="!scope.row.trade_no">--</span>
            {{ scope.row.trade_no }}
          </template>
        </el-table-column>
        <el-table-column prop="mobile" label="学院手机号" width="180">
        </el-table-column>
        <el-table-column prop="school_id" label="订单所属校区" width="180">
          <template slot-scope="scope">
            {{ scope.row.school_id | school }}
          </template>
        </el-table-column>
        <el-table-column prop="refund_price" label="订单金额" width="180">
          <template slot-scope="scope">
            {{ scope.row.refund_price | price }}
          </template>
        </el-table-column>
        <el-table-column prop="send_back_fee" label="实际退款金额" width="180">
          <template slot-scope="scope">
            {{ scope.row.send_back_fee | price }}
          </template>
        </el-table-column>
        <el-table-column prop="create_type" label="退款来源" width="180">
          <template slot-scope="scope">
            {{ scope.row.create_type | createType }}
          </template>
        </el-table-column>
        <el-table-column prop="refund_type" label="退款方式" width="180">
          <template slot-scope="scope">
            {{ scope.row.refund_type ? '线上退款' : '线下退款' }}
          </template>
        </el-table-column>
        <el-table-column prop="reason" label="退款原因" width="180">
        </el-table-column>
        <el-table-column prop="status" label="退款状态" width="180">
          <template slot-scope="scope">
            {{ scope.row.status | status }}
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间" width="180">
          <template slot-scope="scope">
            {{ scope.row.created_at | time }}
          </template>
        </el-table-column>
        <el-table-column prop="updated_at" label="退款时间" width="180">
          <template slot-scope="scope">
            {{ scope.row.updated_at | time }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button style="color: #b24901;" type="text" v-show="scope.row.status==1" @click="RefEditdialogFn(scope.row.id)">处理退款</el-button>
            <p v-show="scope.row.status != 1">--</p>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="100"
          layout="total, prev, pager, next,sizes, jumper" :total="total">
        </el-pagination>
      </div>
    </main>
    <ExportDialog ref="RefdialogFn" ></ExportDialog>
    <EditDialog ref="RefEditdialog" @addOkFn="getRefundFn"></EditDialog>
  </div>
</template>

<script>
import Breadcrumb from "./components/Breadcrumb.vue";
import ExportDialog from './components/ExportDialog.vue';
import EditDialog from "./components/EditDialog.vue";
import { getCampusList, getRefundList } from '@/api/api_refund'
export default {
  name: "BjyAdminIndex",
  components: {
    Breadcrumb,
    ExportDialog,
    EditDialog
  },
  data() {
    return {
      refund: [],
      formInline: {
        page: 1,
        limit: 10,
        create_type: '',
        refund_type: '',
        status: '',
        refund_start: '',
        refund_end: '',
        order_number: '',
        mobile: '',
        school_id: ''
      },
      tableData: [],
      total: 0,
      currentPage4: 1,
      getCampusList: []
    }
  },

  created() {
    this.getCampusFn(),
      this.getRefundFn()
  },

  methods: {
    onSubmit() {
      if (this.refund.length > 0) {
        this.formInline.refund_start = this.refund[0].getTime()
        this.formInline.refund_end = this.refund[1].getTime()
      }
      console.log("submit!", this.formInline);
      this.getRefundFn()
    },
    reset() {
      this.formInline = {
        page: 1,
        limit: 10,
        create_type: '',
        refund_type: '',
        status: '',
        refund_start: '',
        refund_end: '',
        order_number: '',
        mobile: '',
        school_id: ''
      },
        this.refund = []
      this.getRefundFn()
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.formInline.limit = val
      this.getRefundFn()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.formInline.page = val
      this.getRefundFn()
    },

    getCampusFn() {
      getCampusList().then(res => {
        console.log(res)
        this.getCampusList = res.data.school
      })
    },
    getRefundFn() {
      getRefundList(this.formInline).then(res => {
        console.log(res)
        this.tableData = res.data.list
        this.total = res.data.total
        
      })
    },
    dialogFn(){
      this.$refs.RefdialogFn.dialogFn()
    },
    RefEditdialogFn(id){
      this.$refs.RefEditdialog.EditdialogFn(id)
    }
  },

  filters: {
    price: function (value) {
      if (value) {
        value /= 100
        return value.toFixed(2)
      } else {
        value = 0.00
        return value.toFixed(2)
      }
    },
    time: function (value) {
      if (value) {
        // 精确到秒
        return new Date(parseInt(value) * 1000).toLocaleString()
      } else {
        return ''
      }
    },
    status: function (value) {
      if (value == 1) {
        return '待审核'
      } else if (value == 2) {
        return '审核通过'
      } else if (value == 3) {
        return '学院取消申请'
      } else if (value == 4) {
        return '退款失败'
      } else if (value == 5) {
        return '拒绝退款'
      } else if (value == 6) {
        return '退款中'
      }
    },
    createType: function (value) {
      if (value == 1) {
        return '学员申请'
      } else if (value == 2) {
        return '管理员发起'
      } else if (value == 3) {
        return '系统退款'
      } else if (value == 4) {
        return 'Scrm退款'
      }
    },
    school: function (value) {
      if (value == 2) {
        return '测试1'
      } else if (value == 3) {
        return '测试'
      } else if (value == 5) {
        return '南京雨花台'
      } else if (value == 6) {
        return 'LSY 测试校区'
      } else if (value == 8) {
        return '三级校区学校'
      } else if (value == 9) {
        return '测试新增校区'
      } else if (value == 10) {
        return '华东地区3'
      } else if (value == 11) {
        return 'xy的网校'
      } else if (value == 12) {
        return '南京校区'
      }
    }
  }
}
</script>
<style scoped lang="scss">
header {
  text-align: left;
  padding: 30px 20px 20px 20px;
}

.el-form-item {
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  flex-grow: 0 !important;
  margin-left: 10px;
  width: 270px;
}

/deep/ .el-form-item__label {
  width: 70px;
  padding-right: 10px;
  text-align: left;
  line-height: 1.1;
}

.el-input,
.el-select {
  width: 175px !important;
  height: 30px !important;
}

/deep/ .el-input__suffix {
  display: flex;
  align-items: center;
}

.top,
.bottom {
  display: flex;
  height: 30px;
}

.btn {
  background-color: #b24901;
  color: #fff;
}

main {
  padding: 0 20px 20px 20px;

  p {}

  .el-table {
    border: 1px solid #dcdee2;
    margin-top: 10px;
  }

  .block {

    /deep/ .number,
    /deep/ .btn-next,
    /deep/ .btn-prev {
      display: inline-block;
      vertical-align: middle;
      min-width: 32px;
      height: 32px;
      line-height: 30px;
      margin-right: 4px;
      text-align: center;
      list-style: none;
      background-color: #fff;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      cursor: pointer;
      font-family: Arial;
      font-weight: 500;
      border: 1px solid #dcdee2;
      border-radius: 4px;

      &:hover {
        color: #b24901;
        border-color: #b24901;
      }
    }

    /deep/ .btn-prev {
      border-radius: 4px 0 0 4px;
    }

    /deep/ .btn-next {
      border-radius: 0 4px 4px 0;
    }

    /deep/ .el-pager li.active {
      border-color: #b24901;
      color: #b24901;
    }
  }
}

/deep/ .el-table th.el-table__cell {
  background-color: #f8f8f9 !important;
  color: #515a6e !important;
}
</style>
