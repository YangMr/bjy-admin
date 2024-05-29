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
              <el-date-picker size="small" style="width: 200px;" v-model="refund" type="daterange" range-separator="——"
                start-placeholder="开始时间" end-placeholder="结束时间">
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
              <el-option v-for="(item, index) in getRefundList" :key="index" :label="item.org_name"
                :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="text-align: right">
            <div style="width: 270px">
              <el-button class="btn" @click="onSubmit" size="small">查询</el-button>
              <el-button size="small">重置</el-button>
            </div>
          </el-form-item>
        </div>
      </el-form>
    </header>
    <main>
      <p>
        <el-button class="btn">批量导出</el-button>
        <el-button class="btn" @click="$router.push('/exports?type=6')">查看导出</el-button>
      </p>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="退款单编号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="支付单编号" width="180">
        </el-table-column>
        <el-table-column prop="province" label="订单编号" width="180">
        </el-table-column>
        <el-table-column prop="city" label="交易流水号" width="180">
        </el-table-column>
        <el-table-column prop="address" label="学院手机号" width="180">
        </el-table-column>
        <el-table-column prop="zip" label="订单所属校区" width="180">
        </el-table-column>
        <el-table-column prop="zip" label="订单金额" width="180">
        </el-table-column>
        <el-table-column prop="zip" label="实际退款金额" width="180">
        </el-table-column>
        <el-table-column prop="zip" label="退款来源" width="180">
        </el-table-column>
        <el-table-column prop="zip" label="退款方式" width="180">
        </el-table-column>
        <el-table-column prop="zip" label="退款原因" width="180">
        </el-table-column>
        <el-table-column prop="zip" label="退款状态" width="180">
        </el-table-column>
        <el-table-column prop="zip" label="创建时间" width="180">
        </el-table-column>
        <el-table-column prop="zip" label="退款时间" width="180">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          --
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="100"
          layout="total, prev, pager, next,sizes, jumper" :total="400">
        </el-pagination>
      </div>
    </main>
  </div>
</template>

<script>
import Breadcrumb from "./components/Breadcrumb.vue";
import { getCampusList } from '@/api/api_refund'
export default {
  name: "BjyAdminIndex",
  components: {
    Breadcrumb,
  },
  data() {
    return {
      refund:[],
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
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
      ],
      currentPage4: 1,
      getRefundList: []
    };
  },
  created() {
    this.getRefundFn()
  },

  methods: {
    onSubmit() {
      console.log("submit!",this.refund);
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    getRefundFn() {
      getCampusList().then(res => {
        console.log(res)
        this.getRefundList = res.data.school
      })
    },
  },
};
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