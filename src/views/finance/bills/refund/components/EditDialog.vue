<template>
  <div>
    <el-dialog @close="resetForm('form')" width="850px" title="处理退款" :visible.sync="dialogFormVisible">
      <div class="Edit-1">
        <table border="1" cellspacing="0" width="100%">
          <tr>
            <th>订单编号</th>
            <td>{{ EditData.order_num }}</td>
            <th>订单类型</th>
            <td>{{ EditData.order_type | orderType }}</td>
            <th>商品类型</th>
            <td>{{ EditData.shop_type | shopType }}</td>
          </tr>
          <tr>
            <th>退款单号</th>
            <td>{{ EditData.refund_num }}</td>
            <th>退款来源</th>
            <td>{{ EditData.create_type | createType }}</td>
            <th>退款方式</th>
            <td>{{ EditData.refund_type == 1 ? '线上退款' : '线下退款' }}</td>
          </tr>
          <tr>
            <th>退款原因</th>
            <td colspan="5"> {{ EditData.reason }}
              <span v-show="!EditData.reason">--</span>
            </td>
          </tr>
        </table>
        <p style="height: 60px; line-height: 60px;">
          <span style="margin-right: 10px;">退款意见</span>
          <el-radio v-model="radio" label="2">拒绝</el-radio>
          <el-radio v-model="radio" label="1" @input="resetForm('form')">同意</el-radio>
        </p>
      </div>
      <div class="Edit-2">
        <el-table :data="EditData.items" border style="width: 100%">
          <el-table-column prop="shop_name" label="商品名称" width="180">
          </el-table-column>
          <el-table-column label="商品原价*数量" width="180">
            <template slot-scope="scope">
              {{ scope.row.price | price }}*{{ scope.row.refund_num }}
            </template>
          </el-table-column>
          <el-table-column label="优惠金额">
            <template slot-scope="scope">
              {{ scope.row.coupon_price | price }}
            </template>
          </el-table-column>
          <el-table-column prop="paid_price" label="实际支付">
          </el-table-column>
          <el-table-column label="学习有效期">
            <template slot-scope="scope">
              {{ scope.row.valid_type == 1 ? '长期有效' : '未知' }}
            </template>
          </el-table-column>
          <el-table-column label="申请退款金额">
            {{ numMax }}
          </el-table-column>
          <el-table-column label="实际退款金额" v-if="radio == 1">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.refund_price" controls-position="right"
                :min="0" :max="numMax" :step="0.1" size="mini" style="width: 80px;"></el-input-number>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="Edit-4" v-show="radio == 1">
        <p>申请退款金额：{{ numMax }}</p>
        <p>实际退款金额：{{ EditData.items[0].refund_price }}</p>
      </div>
      <div class="Edit-3">
        <el-form ref="form" :rules="radio == 2 ? rules : {}" :model="form" label-width="80px">
          <el-form-item label="备注信息" prop="remark">
            <el-input type="textarea" v-model="form.remark" placeholder="请输入拒绝原因，必填" rows="4"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button style="background-color:#b24901 ; border: 0;" type="primary" @click="addOk('form')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { handleRefund, refuseRefund, agreeRefund } from '@/api/api_refund'
export default {
  name: 'BjyAdminEditDialog',

  data () {
    return {
      dialogFormVisible: false,
      radio: '2',
      form: {
        remark: ''
      },
      EditData: {
        items:[{refund_price:0}]
      },
      rules: {
        remark: [
          { required: true, message: '拒绝原因不能为空', trigger: 'blur' }
        ],
      },
      numMax:0
    }
  },
  methods: {
    EditdialogFn (id) {
      this.$emit('EditdialogFn');
      this.dialogFormVisible = true;
      handleRefund(id).then(res => {
        // console.log(res);
        this.EditData = res.data
        this.numMax = res.data.items[0].refund_price
      })
    },
    addOk (formName) {

      if (this.radio == 2) {
        let obj = {
          id: this.EditData.id,
          refund_price: [{ order_item_id: this.EditData.items[0].order_item_id, refund_price: this.EditData.items[0].refund_price }],
          remark: this.form.remark,
          type: this.radio,
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            refuseRefund(obj).then(res => {
              console.log(res);
              this.$emit('addOkFn')
              this.dialogFormVisible = false
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      } else {
        let obj = {
          id: this.EditData.id,
          refund_price: [{ order_item_id: this.EditData.items[0].order_item_id, refund_price: this.EditData.items[0].refund_price }],
          type: this.radio,
        }
        agreeRefund(obj).then(res => {
          this.$emit('addOkFn')
          this.dialogFormVisible = false
        })
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  },
  filters: {
    price: function (value) {
      if (value) {
        return value.toFixed(2)
      } else {
        value = 0.00
        return value.toFixed(2)
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
    shopType: function (value) {
      if (value == 4) {
        return '一对一'
      } else if (value == 1) {
        return '普通课程'
      } else if (value == 19) {
        return '班级'
      } else {
        return '未知'
      }
    },
    orderType: function (value) {
      if (value == 1) {
        return '普通订单'
      } else if (value == 8) {
        return '课程包订单'
      } else {
        return '未知'
      }
    }
  }
}
</script>
<style scoped lang="scss">
.Edit-1 {

  table {

    tr {
      height: 38px;
      font-size: 12px;

      th {
        width: 90px;
        background-color: #f7f7f8;
        font-weight: 200;
      }

      td {
        padding: 10px 5px;
      }
    }

  }
}

.Edit-3 {
  margin-top: 10px;
}

.Edit-4 {
  text-align: right;
  margin: 10px 0;

  p {
    font-size: 12px;
    height: 18px;
    line-height: 18px;
  }
}

/deep/ .el-dialog__header {
  border-bottom: 1px solid #e8eaec !important;
}

/deep/ .el-dialog__footer {
  border-top: 1px solid #e8eaec !important;
}

/deep/ .el-dialog__body {
  padding: 16px !important;
}

/deep/ .el-table th.el-table__cell {
  background-color: #f8f8f9 !important;
  color: #515a6e !important;
}

/deep/ .el-dialog {
  border-radius: 6px !important;
}
</style>