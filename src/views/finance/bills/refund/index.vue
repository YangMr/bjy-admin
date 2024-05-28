<template>
  <div>
    <Breadcrumb></Breadcrumb>
    <header>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <div class="top">
          <el-form-item label="活动区域">
            <el-select v-model="formInline.region" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="formInline.region" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="formInline.region" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发起退款时间">
            <div class="block">
              <el-date-picker style="width: 200px;" v-model="value1" type="daterange" range-separator="——"
                start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </el-form-item>
        </div>
        <br>
        <div class="bottom">
          <el-form-item label="订单编号">
            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="手机号 ">
            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="订单所属校区">
            <el-select v-model="formInline.region" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="text-align: right;">
            <div style="width: 270px;">
              <el-button type="primary" @click="onSubmit" :size="'small'">查询</el-button>
            <el-button :size="'small'">重置</el-button>
            </div>
          </el-form-item>
        </div>
      </el-form>
    </header>
    <main>
      <p></p>
    </main>
  </div>
</template>

<script>
import Breadcrumb from "./components/Breadcrumb.vue";
export default {
  name: 'BjyAdminIndex',
  components: {
    Breadcrumb
  },
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      }
    };
  },
  created() {

  },

  methods: {
    onSubmit() {
      console.log('submit!');
    }
  },
};
</script>
<style scoped lang="scss">
header {
  text-align: left;
  padding: 20px;
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
.top,.bottom{
  display: flex;
}
</style>