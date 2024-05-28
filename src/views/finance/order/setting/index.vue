<template>
  <div class="financeSetting">
    <el-card>
      订单设置
      <div class="hr"></div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
        <div class="Setting">订单基本设置</div>
        <el-form-item label="订单取消时间设置" prop="cancel_order_time">
          <span>超过</span>
          <el-input-number size="mini" style="width: 100px;" v-model="ruleForm.cancel_order_time"
            controls-position="right" :min="1"></el-input-number><span> 分钟未支付，自动取消订单</span>
        </el-form-item>
        <el-form-item label="系统自动确认收货设置" prop="auto_confirm_receipt">
          卖家发货后，超过
          <el-input-number size="mini" style="width: 100px;" v-model="ruleForm.auto_confirm_receipt"
            controls-position="right" :min="1"></el-input-number><span> 天未确认收货，系统将自动确认收货(最少1天，最多不限)</span>
        </el-form-item>
        <div class="Setting">订单退款设置 <i class="el-icon-question"></i></div>
        <el-form-item label="是否支持学员退款" prop="allow_refund">
          <el-radio-group v-model="ruleForm.allow_refund">
            <el-radio :label="1">支持</el-radio>
            <el-radio :label="2">不支持</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-if="ruleForm.allow_refund == 1">
          <el-form-item label="通过微信支付成功的订单" prop="wx_allow_refund_time">
            <span>超过</span>
            <el-input-number size="mini" style="width: 100px;" v-model="ruleForm.wx_allow_refund_time"
              controls-position="right" :min="1" :max="365"></el-input-number> <span> 天，将无法发起退款申请(最少1天，最多365天)</span>
          </el-form-item>
          <el-form-item label="通过支付宝支付成功的订单" prop="al_allow_refund_time">
            <span>超过</span>
            <el-input-number size="mini" style="width: 100px;" v-model="ruleForm.al_allow_refund_time"
              controls-position="right" :min="1" :max="90"></el-input-number><span> 天，将无法发起退款申请(最少1天，最多0天)</span>
          </el-form-item>
          <el-form-item label="通过线下支付成功的订单" prop="xx_allow_refund_time">
            <span>超过</span>
            <el-input-number size="mini" style="width: 100px;" v-model="ruleForm.xx_allow_refund_time"
              controls-position="right" :min="1"></el-input-number><span> 天，将无法发起退款申请(最少1天，最多不限)</span>
          </el-form-item>
          <el-form-item label="通过虚拟币支付成功的订单" prop="vr_allow_refund_time">
            <span>超过</span>
            <el-input-number size="mini" style="width: 100px;" v-model="ruleForm.vr_allow_refund_time"
              controls-position="right" :min="1"></el-input-number><span> 天，将无法发起退款申请(最少1天，最多不限)</span>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      {{ new Date(1716532606*1000).toLocaleString() }}
    </el-card>
  </div>
</template>
<script>
import API from '../../../../api/api_financeSetting.js'
export default {
  data() {
    return {
      ruleForm: {
        cancel_order_time: 30,
        auto_confirm_receipt: 15,
        allow_refund: 1,
        wx_allow_refund_time: 365,
        al_allow_refund_time: 90,
        xx_allow_refund_time: 365,
        vr_allow_refund_time: 365,
      },
      rules: {
        cancel_order_time: [{ required: true, message: '请输入', trigger: 'blur' },],
        auto_confirm_receipt: [{ required: true, message: '请输入', trigger: 'blur' },],
        allow_refund: [{ required: true, message: '请选择', trigger: 'blur' },],
        wx_allow_refund_time: [{ required: true, message: '请输入', trigger: 'blur' },],
        al_allow_refund_time: [{ required: true, message: '请输入', trigger: 'blur' },],
        xx_allow_refund_time: [{ required: true, message: '请输入', trigger: 'blur' },],
        vr_allow_refund_time: [{ required: true, message: '请输入', trigger: 'blur' },],
      }
    }
  },
  created() {
    this.getlist()
  },
  methods: {
    async getlist() {
      let res = await API.getFinanceSetting()
      console.log(res);
      this.ruleForm = res.data
    },
    submitForm(formName) { // 保存
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
          API.updateFinanceSetting(this.ruleForm).then(res => {
            console.log(res);
            if (res.code == 200) {
              this.$message.success('保存成功')
            } else {
              this.$message.error(res.msg)
            }
            // this.getlist()
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {// 重置
      this.ruleForm = {
        cancel_order_time: undefined,
        auto_confirm_receipt: undefined,
        allow_refund: undefined,
        wx_allow_refund_time: undefined,
        al_allow_refund_time: undefined,
        xx_allow_refund_time: undefined,
        vr_allow_refund_time: undefined,
      }
    }
  },
  components: {}
}
</script>
<style lang='scss' scoped>
span{
  white-space: nowrap;
}
::v-deep .el-input-number__decrease,
.el-input-number__increase {
  display: none !important;
}

.Setting {
  padding-left: 7px;
  border-left: 4px solid #b24901;
}

.hr {
  height: 2px;
  background-color: #eee;
  margin: 10px -2rem;
}
</style>