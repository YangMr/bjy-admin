<template>
  <div style="min-height: 90vh;">
    <Breadcrumb></Breadcrumb>
    <header>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="任务状态">
          <el-select size="small" clearable v-model="formInline.status" placeholder="请选择">
            <el-option label="待启动" value="0"></el-option>
            <el-option label="进行中" value="1"></el-option>
            <el-option label="已完成" value="2"></el-option>
            <el-option label="失败" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit" size="small" icon="el-icon-search">搜索</el-button>
          <el-button size="small" @click="reset" icon="el-icon-refresh-left">重置</el-button>
        </el-form-item>
      </el-form>
    </header>
    <main>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="任务名称" width="560">
        </el-table-column>
        <el-table-column prop="start_at" label="申请时间">
          <template slot-scope="scope">
            {{ scope.row.start_at | time }}
          </template>
        </el-table-column>
        <el-table-column prop="creator" label="申请人">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{ scope.row.status | status }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button style="color: #b24901;" type="text" @click="httpFn" v-show="scope.row.status == 2">下载</el-button>
            <span v-show="scope.row.status == 2">-</span>
            <el-button style="color: #b24901;" type="text" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="100"
          layout="total, prev, pager, next,sizes, jumper" :total="total">
        </el-pagination>
      </div>
    </main>
    <delDialog ref="delDialogRef" @submitForm="getExportFn"></delDialog>
  </div>
</template>

<script>
import Breadcrumb from "./components/Breadcrumb.vue";
import delDialog from "./components/delDialog.vue";
import { getExportList } from '@/api/api_refund'
export default {
  name: 'BjyAdminExports',
  components: {
    Breadcrumb,
    delDialog
  },

  data () {
    return {
      formInline: {
        page: 1,
        limit: 10,
        type: 6,
        status: ''
      },
      tableData: [],
      total: 0,
      currentPage4: 1,
      getCampusList: []
    };
  },

  created () {
    this.getExportFn()
  },

  methods: {
    onSubmit () {
      this.getExportFn()
    },
    reset () {
      this.formInline = {
        page: 1,
        limit: 10,
        type: 6,
        status: ''
      }
      this.getExportFn()
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
      this.formInline.limit = val
      this.getRefundFn()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.formInline.page = val
      this.getRefundFn()
    },
    getExportFn () {
      getExportList(this.formInline).then(res => {
        console.log(res)
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    del(id){
      this.$refs.delDialogRef.delDialogFn(id)
    },
    httpFn(){
      window.open('https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fbaijiayunxiao.oss-accelerate.aliyuncs.com%2Fuploads%2Ffile%2F2024DqqbVcP6QS1717332843.xlsx&wdOrigin=BROWSELINK')
    }
  },
  filters: {
    time: function (value) {
      if (value) {
        // 精确到秒
        return new Date(parseInt(value) * 1000).toLocaleString()
      } else {
        return ''
      }
    },
    status: function (value) {
      if (value == 0) {
        return '待启动'
      } else if (value == 1) {
        return '进行中'
      } else if (value == 2) {
        return '已完成'
      } else if (value == 3) {
        return '失败'
      }
    },
  }
};
</script>
<style scoped lang="scss">
header {
  text-align: left;
  height: 60px;
  margin-top: 20px;
  margin-left: 20px;
}

/deep/ .el-input__suffix {
  display: flex;
  align-items: center;
}

main {
  padding: 0 20px 20px 20px;

  .el-table {
    border: 1px solid #dcdee2;
    margin-top: 10px;
  }

  .block {

    /deep/ .number,
    /deep/ .btn-next,
    /deep/ .btn-prev {
      display: inline-block;
      vertical-align: middle;
      min-width: 32px;
      height: 32px;
      line-height: 30px;
      margin-right: 4px;
      text-align: center;
      list-style: none;
      background-color: #fff;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      cursor: pointer;
      font-family: Arial;
      font-weight: 500;
      border: 1px solid #dcdee2;
      border-radius: 4px;

      &:hover {
        color: #b24901;
        border-color: #b24901;
      }
    }

    /deep/ .btn-prev {
      border-radius: 4px 0 0 4px;
    }

    /deep/ .btn-next {
      border-radius: 0 4px 4px 0;
    }

    /deep/ .el-pager li.active {
      border-color: #b24901;
      color: #b24901;
    }
  }
}

/deep/ .el-table th.el-table__cell {
  background-color: #f8f8f9 !important;
  color: #515a6e !important;
}
</style>