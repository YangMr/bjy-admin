<template>
  <div class=''>
    <!-- :show-file-list="false"  -->
    <el-dialog width="520px" :before-close="beforeCloseSubmit" :title="title" :visible.sync="submitVisible">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="110px" label-position="rtl">
        <el-form-item label="上传图片模板" prop="img">
          <div style="display: flex;height: 115px;overflow: hidden;">
            <div v-show="form.img" style="width: 100px;">
              <img width="100%" :src="form.img" alt="">
            </div>
            <div style="margin-left: 10px;">
              <el-upload class="fileBtn" action="https:devwx.baijiayun.com/api/public/img" :limit="1"
                :headers="{ Authorization: 'Bearer ' + token }" :file-list="fileList"
                accept="image/jpeg,image/jpg,image/png"
                 :show-file-list="false"
                :on-success="headleChange" :before-upload="beforeUpload">
                <i class="el-icon-plus" style="font-size: 14px;" />
                <span>选择文件</span>
              </el-upload>
              <p style="line-height: 20px; color: #d2d2d2;">
                *分享时会在图片右下角自动生成分享二维码，支持jpg、jpeg、png，宽高：690*990像素</p>
              <el-progress v-show="progress" :percentage="percentage" status="success"></el-progress>
            </div>
          </div>

        </el-form-item>
        <el-form-item label="序号" prop="sort">
          <el-input-number v-model="form.sort" controls-position="right" size="small"
            style="width: 100px;"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="border-top: 1px solid #ccc;padding-top: 10px;">
        <el-button type="primary" style="background-color: #b24901;border: none;" @click="submitOk">确
          定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { AddListApi, UpdateListApi } from '@/api/api_mobileShare.js'
export default {
  props: ['submitVisible', 'title'],

  expose: ['backfill'],

  data() {
    return {
      progress: false,
      percentage: 0,
      titles: '',
      fileList: [],
      form: {
        img: '',
        sort: 2,
      },
      token: '',
      id: '',
      rules: {
        img: [
          { required: true, message: '请上传图片模板', trigger: 'change' }
        ],
        sort: [
          { required: true, message: '请填写序号', trigger: 'blur' }
        ],
      }
    }
  },
  created() {
    this.token = localStorage.getItem('adminToken');
  },
  methods: {
    beforeUpload() {
      console.log(111111111111111111);

      this.percentage=0;
      this.progress = true;
      setTimeout(() => {
        this.percentage = 100;
      }, 100)
    },
    //回填
    backfill(row) {
      console.log(row);
      this.id = row.id;
      this.form.img = row.img;
      this.form.sort = row.sort;
    },
    //关闭弹窗
    beforeCloseSubmit() {
      console.log("--------------------",this.form.img);
      this.fileList=[];
      this.percentage=0;
      this.form.img = '';
      console.log(this.form.img);
      this.form.sort = 1;
      this.$emit('beforeCloseSubmit');
    },
    //提交
    async submitOk() {
      this.$refs.formRef.validate(async (valid) => {
        if (valid) {
          try {
            if (this.titles == '新建模板') {
              console.log(this.titles);
              await AddListApi(this.form);
              this.$emit('createds');
              this.$message.success('添加成功');
              this.beforeCloseSubmit();
              // this.$emit('beforeCloseSubmit');
            } else {
              console.log(this.titles);
              await UpdateListApi(this.id, this.form);
              this.$emit('createds');
              this.$message.success('编辑成功');
              // this.$emit('beforeCloseSubmit');
              this.beforeCloseSubmit();
            }
          } catch (error) {
            console.log(error);
          }
        }
      });
    },
    //上传图片成功
    headleChange(response, file, fileList) {
      this.form.img = response.data.path;
      this.progress = false;
      this.fileList=[];
    }
  },
  watch: {
    title: {
      handler(newVal, oldVal) {
        this.titles = this.title;
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style lang='scss' scoped>
/deep/ .el-dialog__header{
  border-bottom:1px solid #ccc;
}
/deep/ .el-dialog {
  border-radius: 10px !important;
}

.prompt {
  color: #ccc;
}

.fileBtn {
  width: 110px;
  height: 40px;
  color: #676666;
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  i {
    font-size: 20px;
    margin-right: 5px;
  }
}
</style>
