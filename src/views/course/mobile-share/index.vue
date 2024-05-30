<template>
  <div class="shareBox" style="padding:0 20px;">
    <div class="top">课程分享海报</div>

    <div class="nav">
      <i class="el-icon-warning"></i>
      <span>设置后，学员在移动端通过海报将课程分享给好友，如未配置图片，则不展示海报分享入口</span>
      <a @click="lookImg">查看示例图</a>
    </div>
    <el-button class='addbtn' type="warning" @click="handleAdd">新建模板</el-button>

    <el-table :border="false" :data="tableData" style="width: 100%">
      <el-table-column align="center" prop="sort" label="序号" width="60" />
      <el-table-column align="center" prop="name" label="图片">
        <template #default="{ row }">
          <img width="86.2" height="100" :src="row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="creator_name" label="创建人" width="120" />
      <el-table-column align="center" prop="created_at" label="创建时间" width="170">
        <template #default="{ row }">
          {{ new Date(row.created_at * 1000).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column class="tableColumn" align="center" label="操作" width="100">
        <template #default="{ row }">
          <button class="tableColumnBtn" @click="handleEdit(row)">编辑</button>-<button class="tableColumnBtn"
            @click="headleDelete(row.id)">删除</button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

    <shareDialog :visible="visible" @beforeCloseImg="beforeCloseImg"></shareDialog>
    <submitDialog :rowData="rowData" :title="title" :submitVisible="submitVisible" @beforeCloseSubmit="beforeCloseSubmit"
      @createds="createds">
    </submitDialog>
  </div>
</template>
<script>
import shareDialog from './components/share-dialog.vue'
import submitDialog from './components/submit-dialog.vue'
import { getMobileShareListApi, mobileShareDeleteApi } from '@/api/api_mobileShare.js'



export default {
  components: {
    shareDialog,
    submitDialog
  },
  data() {
    return {
      page: 1,
      limit: 10,
      tableData: [],
      total: 0,
      visible: false,
      submitVisible: false,
      title: '',
      rowData:{}
    }
  },
  created() {
    this.getList();

  },
  methods: {
    //编辑模板
    handleEdit(row) {
      this.submitVisible = true;
      this.title = '编辑模板';
      this.rowData=row;
    },
    createds() {
      this.getList();
    },
    //新建模板
    handleAdd() {
      this.submitVisible = true;
      this.title = '新建模板';
    },
    //关闭新建模板对话框
    beforeCloseSubmit() {
      this.submitVisible = false;
    },
    //点击查看图片
    lookImg() {
      this.visible = true;
    },
    //关闭图片对话框
    beforeCloseImg() {
      this.visible = false;
    },

    getList() {
      getMobileShareListApi({
        page: this.page,
        limit: this.limit
      }).then(res => {
        console.log(res)
        this.tableData = res.data.list;
        this.total = res.data.total;
        console.log("tableData=>", this.tableData);
      })
    },
    handleSizeChange(val) {
      this.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    //删除
    headleDelete(id) {
      console.log(id);
      this.$confirm('确认删除么?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '再想想',
        type: 'warning'
      }).then(async () => {
        await mobileShareDeleteApi(id);
        this.getList();
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      })
    }
  },
}
</script>
<style lang='scss' scoped>
/deep/ .el-table th.el-table__cell {
  background-color: #f8f8f9 !important;
}


//  /deep/ .el-table__row:hover {
//    background-color: #f2e8da !important;
//  }

.el-table {
  border: 1px solid #dcdee2;
}

.tableColumn {
  box-shadow: -2px 0 6px -2px rgba(0, 0, 0, .2) !important;
}

.tableColumnBtn {
  background-color: transparent;
  border-radius: 5px;
  padding: 8px 0;
  border: none;
  color: #b24901;
}

.tableColumnBtn:hover {
  background-color: #fff;
}

.addbtn {
  background-color: #b24901;
  margin: 10px 0;
  font-size: 14px;
  width: 87.6px;
  height: 34.67px;
  display: flex;
  align-items: center;
  justify-content: center;
}

a {
  color: #2d8cf0;
  cursor: pointer;
}

.shareBox {
  height: calc(100vh - 48px);

  .top {
    height: 48px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    width: 100%;
    border-bottom: 1px solid #f4f4f4;
    background-color: #fff;
    box-sizing: border-box;
  }
}
</style>
