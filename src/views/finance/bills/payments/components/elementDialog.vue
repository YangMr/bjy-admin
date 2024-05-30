

<template>
  <el-dialog
    :before-close="handleClose"
    :visible.sync="dialogVisible"
    title="导出"
    width="30%">
    <el-form :model="exportAddQuery" :rules="rules" ref="exportAddQuery" :inline="true">
      <el-form-item label="任务名称" prop="task_name">
        <el-input v-model="exportAddQuery.task_name" clearable></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-row>
        <el-button link >取消</el-button>
        <el-button link @click="handelLink">确定</el-button>
      </el-row>
    </template>
  </el-dialog>

</template>
<script>
import {getExportAdd} from '../../../../../api/api_billsPayments'
export default {
  name:'elementDialog',
  data(){
    return {
      dialogVisible:false,
      exportAddQuery:{
        mobile:'',
        order_number:'',
        pay_type:'',
        payed_end:'',
        payed_start:'',
        school_id:'',
        status:'',
        tag_type:'',
        task_name:'',
        type:8
      },
      rules:{
        task_name:[
          {required:true,message:'请输入任务名称',trigger:'blur'}
        ]
      }
    }
  },
  methods:{
    openDialog() {
      this.dialogVisible = true
    },
    handelLink() {
      this.$refs.exportAddQuery.validate((valid) => {
        if (valid) {
          getExportAdd(this.exportAddQuery).then(res => {
            console.log(res)
          })
          this.$router.push('/exports')
        } else {
          return false
        }
      })

    },

  }
}
</script>
<style lang="scss" scoped>
.el-input {
  width: 300px;
}
</style>
