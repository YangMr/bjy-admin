<template>
  <div>
    <el-button
      style="background-color: #b24901; color: #fff; margin-left: 18px"
      @click="addmain"
      >批量导出</el-button
    >
    <el-button style="background-color: #b24901; color: #fff" @click="looks"
      >查看导出</el-button
    >

    <el-table
      :data="list"
      style="
        width: 100%;
        margin: 10px;
        border: 1px solid #cccccc7e;
        height: 43vh;
      "
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
      disabled
    >
      <el-table-column type="selection" width="55" disabled> </el-table-column>
      <el-table-column prop="logistics_number" label="发货单号" width="180">
      </el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="180">
      </el-table-column>
      <el-table-column prop="product_name" label="发货商品" width="180">
      </el-table-column>
      <el-table-column prop="material_content" label="物料内容" width="180">
      </el-table-column>
      <el-table-column prop="自行发货" label="发货方式" width="180">
        自行发货
      </el-table-column>
      <el-table-column prop="school_id" label="订单所属校区" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.school_id == 2">测试1</span>
        </template>
      </el-table-column>
      <el-table-column prop="logistics_no" label="物流单号" width="180">
      </el-table-column>
      <el-table-column prop="logistics_name" label="物流公司" width="180">
      </el-table-column>
      <el-table-column prop="logistics_status" label="物流状态" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.logistics_status == 4">已签收</span>
        </template>
      </el-table-column>
      <el-table-column prop="pick_code" label="取件码" width="180"
        >-
      </el-table-column>
      <el-table-column prop="consignee" label="收货人" width="180">
      </el-table-column>
      <el-table-column prop="address_mobile" label="收货人手机号" width="180">
      </el-table-column>
      <el-table-column prop="created_at" label="生成时间" width="180">
        <template slot-scope="scope">
          {{ new Date(scope.row.created_at * 1000).toLocaleDateString() }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click="handleClick(scope.row)"
            type="text"
            size="small"
            style="color: #bf6521"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="导出"
      :visible.sync="dialogFormVisible"
      style="width: 1000px; margin: auto; height: 600px"
    >
      <el-form
        :model="form"
        label-position="left"
        class="demo-form-inline"
        :inline="true"
        :rules="rules"
      >
        <el-form-item label="任务名称" prop="task_name">
          <el-input
            v-model="form.task_name"
            placeholder="请输入任务名称"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="auto">取消</el-button>
        <el-button
          type="primary"
          @click="addtask('form')"
          style="background-color: #b24901; color: #fff"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getTasklist } from "@/api/api_billsShip.js";
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        consignee: "",
        end_time: "",
        logistics_no: "",
        logistics_number: "",
        logistics_status: "",
        mobile: "",
        order_number: "",
        product_name: "",
        school_id: "",
        start_time: "",
        task_name: "",
        type: 7,
      },
      rules: {
        task_name: [
          { required: true, message: "请输入任务名称", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClick(row) {
      console.log(row);
      this.$router.push({
        path: `/detail?id=` + row.order_address_id,
        query: {
          id: row.order_address_id,
          name: row.order_number,
          number: row.logistics_number,
          consignee: row.consignee,
          material_content: row.material_content,
          logistics_name: row.logistics_name,
          school_id: row.school_id,
          address_mobile: row.address_mobile,
          product_name: row.product_name,
        },
      });
      this.$message({
        type: "success",
        message: "已进入详情页",
      });
    },
    addmain() {
      this.dialogFormVisible = true;
    },
    looks() {
      this.$router.push({ path: "/exports" });
    },
    auto() {
      this.dialogFormVisible = false;
      this.$message({
        type: "info",
        message: "已取消",
      });
    },

    addtask() {
      if (this.form.task_name == "") {
        this.$message({
          type: "info",
          message: "任务名称不能为空",
        });
      } else {
        this.dialogFormVisible = false;
        this.tasklist();
        this.$message({
          type: "success",
          message: "导出成功!",
        });
      }
    },

    async tasklist() {
      let res = await getTasklist(this.form);
      console.log(res);
      this.$router.push({
        path: "/exports",
        query: {
          // url的参数, 类似get请求的传参
          task_name: this.task_name,
          type: this.type,
        },
      });
    },
  },
  computed: {},
  components: {},
  filters: {},
  watch: {},
  created() {
    
  },
  mounted() {},
  props: ["list"],
};
</script>

<style lang="scss" scoped></style>
