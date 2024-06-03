<template>
  <div>
    <el-dialog width="520px" title="导出" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" :model="form" ref="form">
        <el-form-item prop="task_name" label="任务名称" :label-width="formLabelWidth">
          <el-input style="width: 200px;" size="small" v-model="form.task_name" placeholder="请输入任务名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button style="color:#b24901 ;" type="text" @click="dialogFormVisible = false">取 消</el-button>
        <el-button style="background-color:#b24901 ; border: 0;" type="primary"
          @click="submitForm('form')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { batchExport } from '@/api/api_refund'
export default {
  name: 'BjyAdminDialog',

  data() {
    return {
      dialogFormVisible: false,
      form: {
        create_type: "",
        mobile: "",
        order_number: "",
        refund_end: "",
        refund_start: "",
        refund_type: "",
        school_id: "",
        status: "",
        task_name: "",
        type: 6
      },
      rules: {
        task_name: [
          { required: true, message: '任务名称不能为空', trigger: 'blur' },
        ],
      },
      formLabelWidth: '120px'
    };
  },

  mounted() {

  },

  methods: {
    dialogFn() {
      this.$emit('dialogFn');
      this.dialogFormVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          batchExport(this.form).then(res => {
            console.log(res);
            this.dialogFormVisible = false
            this.$router.push('/exports')
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
};
</script>
<style scoped lang="scss">
/deep/ .el-dialog {
  border-radius: 6px !important;
}

/deep/ .el-dialog__header {
  border-bottom: 1px solid #e8eaec !important;
}

/deep/ .el-dialog__footer {
  border-top: 1px solid #e8eaec !important;
}

/deep/ .el-form-item {
  display: flex;
  align-items: center;
  width: 300px;
}

/deep/ .el-form-item__content {
  margin: 0 !important;
  padding: 0;
  width: 200px;
}

/deep/ .el-form-item__label {
  width: 100px !important;
}
</style>
