<script>
import {getExportList, getExPortDel} from '../../../../api/api_billsPayments'

export default {
  data() {
    return {
      exportQuery: {
        page: 1,
        limit: 10,
        type: 8,
        status: ''
      },
      tableData: [],
      total: 0
    }
  },
  methods: {
    getExportList() {
      console.log('qwertyu')
      getExportList(this.exportQuery).then(res => {
        console.log(res)
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    reset() {
      this.exportQuery = {
        page: 1,
        limit: 10,
        type: 8,
        status: ''
      }
      this.getExportList()
    },
    handelDel(id) {
      getExPortDel(id).then(res => {
        console.log(res)
        this.getExportList()
      })
    }
  },
  created() {
    this.getExportList()
  }
}
</script>

<template>
  <div>
    <div class="payments_title">
      <h3>
        <el-breadcrumb separator="/" class="title">
        <el-breadcrumb-item><a href="/finance/bills/payments">收款单</a></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/exports' }">查看导出</el-breadcrumb-item>
      </el-breadcrumb>
      </h3>
    </div>
    <div class="exports_search">
      任务状态:
      <el-select v-model="exportQuery.status">
        <el-option label="待启动" value="0"></el-option>
        <el-option label="进行中" value="1"></el-option>
        <el-option label="已完成" value="2"></el-option>
        <el-option label="失败" value="3"></el-option>
      </el-select>
      <el-button icon="search" @click="getExportList">搜索</el-button>
      <el-button @click="reset">重置</el-button>
    </div>
    <div class="exports_table">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="任务名称"
          prop="name"
          width="480">
        </el-table-column>
        <el-table-column
          label="申请时间"
          prop="created_at"
          width="180">
          <template #default="{row}">
            <span>{{ new Date(row.created_at * 1000).toLocaleDateString() }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="申请人"
          width="180">
          <template>
            <span>超级管理员</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          prop="status"
          width="180">
          <template #default="{row}">
            <span>{{
                row.status == 0 ? '待启动' : row.status == 1 ? '进行中' : row.status == 2 ? '已完成' : '失败'
              }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="180"
        >
          <template #default="{row}">
            <el-button type="text">下载</el-button>
            <template>
              <el-popconfirm
                title="这是一段内容确定删除吗？"
              >
                <el-button slot="reference" type="text" @click="handelDel(row.id)">删除</el-button>
              </el-popconfirm>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      :current-page="exportQuery.page"
      :page-size="exportQuery.limit"
      :page-sizes="[10, 20, 30, 40]"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="getExportList"
      @current-change="getExportList">
    </el-pagination>
  </div>
</template>

<style lang="scss" scoped>
.exports_search {
  margin: 20px;
}

.exports_table {
  width: 100%;
  margin: auto;
  padding: 10px;
}

.payments_title {
  .title {
    padding: 12px 20px;
    font-size: 18px;
    font-weight: 400;
    color: #333;
    line-height: 30px;
  }

  border-bottom: 1px solid #f4f4f4;
}
</style>
