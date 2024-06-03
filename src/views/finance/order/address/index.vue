<template>
  <div class="address">
    <div class="address-top">
      <p>发货地址</p>
    </div>
    <div class="address-list">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="发货地址">
          <el-input placeholder="请输入发货地址关键字" style="width: 350px;" v-model="formInline.address"></el-input>
        </el-form-item>
        <el-form-item label="所属校区">
          <el-select v-model="formInline.school_id" placeholder="请选择" style="width: 350px;">
            <el-option
              v-for="(item,index) in lists"
              :key="index"
              :label="item.org_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-left: 400px;">
          <el-button @click="search()" style="background-color:#b24901;color:white">查询</el-button>
          <el-button @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button style="background-color:#b24901;color:white;margin:10px 0" @click="add()">新增发货地址</el-button>
      <!-- 表格 -->
      <el-table style="background-color: aqua;" :data="tableData" border :row-class-name="tableRowClassName">
        <el-table-column :stripe="Boolean" fixed prop="add_name" label="发货地址名称" width="300"></el-table-column>
        <el-table-column prop="school_id" label="所属校区" width="300"></el-table-column>
        <el-table-column prop="ship_user_name" label="发货人" width="300"></el-table-column>
        <el-table-column prop="created_at" label="手机号码" width="300"></el-table-column>
        <el-table-column prop="address" label="地址详细信息" width="300"></el-table-column>
        <el-table-column fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)" size="small" style="color: #cd7184;">编辑-</el-button>
            <el-button
              type="text"
              size="small"
              style="color: #cd7184;"
              @click="open(scope.row)"
            >{{scope.row.dis_use == 0 ? '禁用' : '启用'}}</el-button>
            <!-- <el-button type="text" size="small" style="color: #cd7184;" @click="op(1)"  >启用</el-button> -->
            <el-button type="text" size="small" style="color: #cd7184;" @click="del(scope.row)">-删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <delivery ref="tt" @Rendering="Rendering"></delivery>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import delivery from "./component/delivery.vue";
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
  components: {
    delivery
  },
  data() {
    return {
      flag:false,
      title: "",
      total: 0,
      isHovered: false,
      arr:[],
      // value:false,
      // Boolean:true,
      //渲染列表参数
      Rend: {},
      //获取所属校区
      lists: [],
      //获取地址省数据
      dataa: [],
      // 市
      datab: [],
      //县
      datac: [],
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
  created() {
    this.getlist();
    this.getdata();
    this.Rendering();
    //  this.getcity()
    //  this.getarea()
  },
  methods: {
    //鼠标滑过
    tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
    add() {
      this.$refs.tt.oo("新增");
      // this.title='新增'
    },
    // //编辑打开
    edit(row) {
      console.log("编辑打卡", row);
      this.$refs.tt.bj("编辑", row);
    },

    //渲染列表
    Rendering() {
      getlist(this.formInline).then(res => {
        console.log("列表", res);
        this.arr = res.data.list;

        this.tableData = this.arr
        this.total = this.tableData.length;
      });
    },
    //搜索
    search() {
      getlist(this.formInline).then(res => {
        console.log("列表", res);
        this.tableData = res.data.list;
      });
    },
    //重置
    reset() {
      (this.formInline.address = ""),
        (this.formInline.school_id = ""),
        this.Rendering();
    },
    //删除
    del(row) {
      this.$confirm(`确定要删除【${row.add_name}】吗?`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          getdel(row.id).then(res => {
            console.log("删除", res);
            this.Rendering(),
              this.$message({
                type: "success",
                message: "删除成功!"
              });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //禁用
    open(row) {
      // this.arr.dis_use = row.dis_use == 1 ? 0 : 1;
      console.log("禁用***************", this.arr);
      this.arr.forEach(item => {
        if (item.id == row.id) {
          item.dis_use = row.dis_use == 1 ? 0 : 1;
        }
      });


      // console.log("禁用", row.dis_use);
      // if(row.dis_use==1){
      //   row.dis_use=0
      // }else{
      //   row.ids_use=1
      // }
      // getopen(row).then(res => {
      //   console.log("禁用", res);
      //   this.Rendering();
      // });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //获取地址列表数据
    getlist() {
      getAddressList().then(res => {
        console.log("省", res);
        this.dataa = res.data;
      });
    },

    //获取所属校区
    getdata() {
      getCampus().then(res => {
        console.log("校区", res);
        this.lists = res.data.school;
      });
    },
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.formInline.limit = val;
      this.Rendering();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.formInline.page = val;
      this.Rendering();
    }
  }
};
</script>
<style lang='scss' scoped>
.el-table{
  border-collapse: collapse !important ;
 background-color: pink !important ;

}
.el-table el-table-column{
  border: none; /* 移除单元格边框 */
 background-color: pink !important ;

}
.el-table_1_column_1     is-leaf el-table__cell{
  background-color: pink !important;

}
.hovered{
    background-color: pink;
}
//鼠标滑过
.jj:hover{
  background-color: pink;
}
.el-table .warning-row {
    background: rgb(202, 157, 74);
  }

  .el-table .success-row {
    background: #7ecf51;
  }
.address {
  width: 100%;
  height: 100vh;
  background-color: white;
  // padding: 0 10px;
  box-sizing: border-box;
}
.address-top {
  width: 100%;
  height: 50px;
  // background-color: rgb(194, 57, 57);
  border-bottom: 1px solid #ccc;
  margin-top: 10px;
  padding: 10px 10px;
  box-sizing: border-box;

  p {
    margin-left: 13px;
    color: #180c0c;
  }
}
.address-list {
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 15px 10px;
  box-sizing: border-box;
}
</style>
