<template>
  <div>
    <el-breadcrumb separator="/" class="titlev">
      <el-breadcrumb-item :to="{ path: '/finance/bills/ship' }"
        >发货单</el-breadcrumb-item
      >
      <el-breadcrumb-item><a href="/exports">查看导出</a></el-breadcrumb-item>
    </el-breadcrumb>

    <div class="ele">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="任务状态">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option label="待启动" value="0"></el-option>
            <el-option label="进行中" value="1"></el-option>
            <el-option label="已完成" value="2"></el-option>
            <el-option label="失败" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="sou">搜索</el-button>
          <el-button @click="chong">重置</el-button>
        </el-form-item>
      </el-form>

      <el-table
        :data="tableData"
        style="width: 100%; border: 1px solid #cccccc7e"
      >
        <el-table-column prop="name" label="任务名称" width="800px">
        </el-table-column>
        <el-table-column prop="created_at" label="申请时间">
          <template slot-scope="scope">
            <span>{{
              new Date(scope.row.created_at * 1000).toLocaleDateString()
                | dateFormat
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="creator" label="申请人"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 2">已完成</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="" type="text" size="small" style="color: #bf6521"
              >下载</el-button
            > -<el-button
              @click="del(scope.row)"
              type="text"
              size="small"
              style="color: #bf6521"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="form.page"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="form.limit"
        layout="total,prev ,pager ,next ,sizes , jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { addTasklist, delTasklist } from "@/api/api_billsShip.js";
export default {
  data() {
    return {
      tableData: [],
      total:0,
      form: {
        page: 1,
        limit: 10,
        task_name: "",
        type: 7,
        status: "",
      },
    };
  },
  methods: {
    async getTas() { 
      let res = await addTasklist(this.form);
      console.log(res);
      this.tableData = res.data.list;
      this.total = res.data.total;
    },
    sou() {
      this.form.page = 1;
      this.getTas();
      this.$message({
        type: "success",
        message: "搜索成功!",
      });
    },
    chong() {
      this.form.task_name = "";
      this.form.status = "";
      this.getTas();
      this.$message({
        type: "success",
        message: "重置成功!",
      });
    },

    handleCurrentChange(){
      this.form.page = 1
      this.getTas()
    },

    del(row) {
      console.log(row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          delTasklist(row.id).then((res) => {
            console.log(res);
            this.getTas();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  computed: {},
  components: {},
  filters: {},
  watch: {},
  created() {
    this.task_name = this.$route.query.task_name;
    (this.type = this.$route.query.type), this.getTas();
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.titlev {
  width: 86.4vw;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #cccccc7e;
  padding: 0 20px;
}
.ele {
  padding: 20px;
}
</style>
