<template>
    <div class=''>
        <!-- :show-file-list="false"  -->
        <el-dialog width="520px" :before-close="beforeCloseSubmit" :title="title" :visible.sync="submitVisible">
            <el-form :model="ruleForm" :rules="rules" label-width="110px" label-position="rtl">
                <el-form-item label="上传图片模板" prop="img">
                    <div style="display: flex;height: 100px;overflow: hidden;">
                        <img v-show="strImg" width="100px" height="150px" :src="strImg" alt="">
                        <div style="margin-left: 10px;">
                            <el-upload ref="upload" class="fileBtn" action="https:devwx.baijiayun.com/api/public/img"
                            :limit="1" :headers="{ Authorization: 'Bearer ' + token }" :file-list="fileList"
                            :show-file-list="false" :on-success="headleChange">
                            <i class="el-icon-plus" style="font-size: 14px;" />
                            <span>选择文件</span>
                        </el-upload>
                            <p style="line-height: 20px; color: #d2d2d2;">*分享时会在图片右下角自动生成分享二维码，支持jpg、jpeg、png，宽高：690*990像素</p>
                        </div>
                    </div>

                </el-form-item>
                <el-form-item label="序号" prop="sort">
                    <el-input-number v-model="sort" controls-position="right" size="small"
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
import { AddListApi } from '@/api/api_mobileShare.js'
export default {
    props: ['submitVisible', 'title'],
    components: {

    },
    data() {
        return {
            fileList: [],
            strImg: '',
            sort: 1,
            token: '',
            ruleForm: {
                img: '',
                sort: ''
            },
            rules: {
                img: [
                    { required: true, trigger: 'blur' }
                ],
                sort: [
                    { required: true, trigger: 'blur' }
                ],
            }
        }
    },
    created() {
        this.token = localStorage.getItem('adminToken');
    },
    methods: {
        beforeCloseSubmit() {
            this.$emit('beforeCloseSubmit');
            this.strImg = '';
            this.sort = 1;
        },
        async submitOk() {
            try {
              console.log(this.strImg);
                await AddListApi({ img: this.strImg, sort: this.sort });
                this.$emit('createds');
                this.strImg = '';
                this.sort = 1;
                this.$message.success('添加成功');
                this.$emit('beforeCloseSubmit');
            } catch (error) {
                console.log(error);
            }

        },
        //上传成功
        headleChange(response, file, fileList) {
            this.strImg = response.data.path;
        }
    }
}
</script>
<style lang='scss' scoped>
/deep/ .el-dialog{
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
