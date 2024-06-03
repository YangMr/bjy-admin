<template>
  <!-- 对话框 -->
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="55%"
    @close="resetForm('ruleForm')"
    :before-close="handleClose"
  >
    <!-- 内容 -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item label="所属校区" prop="school_id">
        <el-select style="width: 220px;" v-model="ruleForm.school_id" placeholder="请选择">
          <el-option
            v-for="(item,index) in lists"
            :key="index"
            :label="item.org_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发货地址名称" prop="add_name">
        <el-input style="width: 220px;" placeholder="请输入发货地址名称" v-model="ruleForm.add_name"></el-input>
      </el-form-item>
      <el-form-item label="发货人姓名" prop="ship_user_name">
        <el-input style="width: 220px;" placeholder="请输入发货人姓名" v-model="ruleForm.ship_user_name"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="ship_user_mobile">
        <el-input style="width: 220px;" placeholder="请输入手机号码" v-model="ruleForm.ship_user_mobile"></el-input>
      </el-form-item>
      <el-form-item label="地址信息" prop="province_id">
        <el-select v-model="ruleForm.province_id" @change="getcity" placeholder="请选择省">
          <el-option v-for="(item,index) in dataa" :key="index" :label="item.area_name" :value="item.id"  ></el-option>
        </el-select>
        <el-select v-model="ruleForm.city_id" @change="getarea" placeholder="请选择市">

            <el-option
            v-for="(item,index) in datab"
            :key="index"
            :label="item.area_name"
            :value="item.id"
          ></el-option>


        </el-select>
        <el-select v-model="ruleForm.district_id" placeholder="请选择县">

            <el-option
            v-for="(item,index) in datac"
            :key="index"
            :label="item.area_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-input
          placeholder="请输入详细地址、道路、门牌号,校区、楼栋数、单元等"
          type="textarea"
          v-model="ruleForm.address"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addno">取 消</el-button>
      <el-button type="primary" @click="addok('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script >
import {
  getAddressList,
  getCampus,
  getadd,
  getlist,
  getdel,
  geteditt,
  getopen
} from "@/api/address";

export default {
  // props:['Rendering'],
  data() {
    return {
      dialogVisible: false,
      title: "",
      total: 0,
      value: 1,
      // Boolean:true,
      //渲染列表参数
      // Rend: {},
      //获取所属校区
      lists: [],
      //获取地址省数据
      dataa: [{
        id:0
      }],
      // 市
      datab: [{
        id:0
      }],
      //县
      datac: [{
        id:0
      }],
      //表单
      formInline: {
        page: 1,
        limit: 10,
        address: "",
        schoo_id: ""
      },
      //对话框
      ruleForm: {
        add_name: "",
        address: "",
        city_id: "",
        district_id: "",
        id: "",
        province_id: "",
        school_id: "",
        ship_user_mobile: "",
        ship_user_name: ""
      },

      //表格
      tableData: [],
      //鉴权
      rules: {
        school_id: [{ required: true, message: "请输入", trigger: "blur" }],
        add_name: [{ required: true, message: "请输入", trigger: "blur" }],
        ship_user_name: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        ship_user_mobile: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        province_id: [{ required: true, message: "请输入", trigger: "blur" }],
        address: [{ required: true, message: "请输入", trigger: "blur" }]
      }
    };
  },
  methods: {
    oo(val) {
      this.$emit("oo");
      this.title = val;
      console.log(this.title);

      this.dialogVisible = true;
    },
    bj(val, row) {
      console.log("bj", val, row);
      this.$emit("bj");
      // console.log(this.title);
      this.dialogVisible = true;
      console.log("编辑", row.id, row);
      // this.ruleForm  row;
      this.ruleForm.id = row.id;
      this.ruleForm.add_name = row.add_name;
      this.ruleForm.address = row.address;
      this.ruleForm.city_id = row.city_name;
      this.ruleForm.district_id = row.district_name;
      this.ruleForm.id = row.id;
      this.ruleForm.province_id = row.province_id;
      this.ruleForm.school_id = row.school_id;
      this.ruleForm.ship_user_mobile = row.ship_user_mobile;
      this.ruleForm.ship_user_name = row.ship_user_name;
    },
    addno() {
      this.dialogVisible = false;
      // this.$refs[formName].resetFields();
    },
    handleClose(done) {
      this.$confirm("确认关闭?")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //渲染列表
    Rend() {
      this.$emit("Rendering");
    },
    //获取地址列表数据
    getlist() {
      getAddressList().then(res => {
        console.log("省", res);
        this.dataa = res.data;
      });
    },
    //获取市
    getcity(id) {
      console.log(id);
      getAddressList(id).then(res => {
        console.log(1);
        console.log("市", res);
        this.datab = res.data;
      });
    },
    //获取县
    getarea(id) {
      console.log(id);
      getAddressList(id).then(res => {
        console.log("县", res);
        this.datac = res.data;
      });
    },
    //获取所属校区
    getdata() {
      getCampus().then(res => {
        console.log("校区", res);
        this.lists = res.data.school;
      });
    },
    //确定鉴权
    addok(formName) {
      console.log(111);
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.title == "新增") {
            console.log(222);
            getadd(this.ruleForm).then(res => {
              console.log("添加数据", res);
              this.dialogVisible = false;
              this.Rend();
            });
          } else if (this.title == "编辑") {
            geteditt(this.ruleForm).then(res => {
              console.log("编辑数据", res);
              this.dialogVisible = false;
              this.Rend();
            });
          }
          // alert('submit!');
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.dialogVisible = false;
      this.$refs[formName].resetFields();
      this.ruleForm = {};
    }
  },
  created() {
    this.getcity();
    this.getarea();
    this.getlist();
    this.getdata();
    this.Rend();
  },
  mounted() {},
  watch: {},
  computed: {},
  filters: {},
  props: {}
};
</script>
<style lang='scss' scoped>
</style>
