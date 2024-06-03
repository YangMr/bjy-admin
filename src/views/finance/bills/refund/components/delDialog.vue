<template>
    <div>
        <el-dialog style="border-radius: 6px !important;" width="415px" title="提示" :visible.sync="dialogFormVisible">
            <span>删除后该任务将被取消，确定删除吗？</span>
            <div slot="footer" class="dialog-footer">
                <el-button style="color:#b24901 ;" type="text" @click="dialogFormVisible = false">取 消</el-button>
                <el-button style="background-color:#b24901 ; border: 0;" type="primary"
                    @click="submitForm">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
  
  <script>
import { deleteExport } from '@/api/api_refund';
export default {
    name: 'BjyAdminDialog',

    data () {
        return {
            dialogFormVisible: false,
            formLabelWidth: '120px',
            id:0
        };
    },

    mounted () {

    },

    methods: {
        delDialogFn (id) {
            this.$emit('delDialogFn');
            this.dialogFormVisible = true;
            this.id = id;
        },
        submitForm () {
            deleteExport(this.id).then(res => {
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
                this.dialogFormVisible = false;
                this.$emit('submitForm');
            }).catch(err => {
                this.$message({
                    message: '删除失败',
                    type: 'error'
                });
            })
        },

    },
};
</script>
  <style scoped lang="scss">
/deep/ .el-dialog {
    border-radius: 6px !important;
    padding: 16px;
    height: 155px;
}

/deep/ .el-form-item__content {
    margin: 0 !important;
    padding: 0;
    width: 200px;
}

/deep/ .el-form-item__label {
    width: 100px !important;
}
