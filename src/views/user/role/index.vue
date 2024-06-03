<template>

  <div class="box">

    <p style="width: 100%;padding: 10px;font-size: 16px;border-bottom: 1px solid #f2f2f2;margin-bottom: 20px;">后台角色管理
    </p>
    <!-- 搜索 -->
    <p style="height: 20px;padding-left: 10px;">角色名称:<el-input size="mini" style="display: inline-block;width:300px;"
        v-model="formList.keywords" placeholder="请输入内容">
      </el-input><span style="float: right;"><el-button type="warning" @click="UserSearch">查询</el-button><el-button
          @click="formList.keywords = ''">重置</el-button></span>
    </p>

    <!-- 新增角色 -->
    <el-button type="warning" style="margin-top: 25px;margin-left: 10px;" @click="add">新增角色</el-button>

    <!-- 表格 -->
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>

      <el-table-column prop="role_name" label="角色">
      </el-table-column>

      <el-table-column prop="description" label="描述">
      </el-table-column>
      <el-table-column label="更新时间">
        <template slot-scope="scope">
          {{ new Date(scope.row.updated_at * 1000).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row.role_id)">编辑</el-button>
          <el-button type="text" size="small" @click="del(scope.row.role_id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]"
      layout="total,  prev, pager, next,sizes, jumper" :total="total">
    </el-pagination>
    <el-button type="danger" :disabled="yilist.length === 0 ? true : false" style="margin-left: 10px;"
      @click="del(yilist)">删除</el-button>




    <!-- 新增模态框 -->
    <el-dialog :title="name" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <span style="margin-bottom: 30px; display: inline-block;font-weight: 700;">基本信息</span>
        <el-form-item label="名称">
          <el-input v-model="form.role_name" style="width: 90%;" autocomplete="off" maxlength="10"
            show-word-limit placeholder="请输入用户名"></el-input>
        </el-form-item>

        <el-form-item label="描述">

          <el-input style="width: 90%;" type="textarea" placeholder="请输入内容" v-model="form.description" maxlength="30"
            show-word-limit>
          </el-input>
        </el-form-item>
        <span style="margin: 20px 0; display: inline-block;font-weight: 700;">权限设置</span>

        <el-tree :data="data" show-checkbox node-key="id" ref="tree" :default-checked-keys="checkedid">
        </el-tree>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addok">确 定</el-button>

      </div>
    </el-dialog>








  </div>
</template>
<script>
// 引入API操作接口
import API from '@/api/api_enterprise'


export default {
  name: '',
  components: {

  },
  mixins: [],
  props: {

  },
  data() {
    return {
      //获取用户列表的参数
      formList: {
        keywords: '',
        page: '1',
        limit: '10'
      },

      total: 0,
      yilist: [],
      //表格数据->接收用户列表数据
      tableData: [{}],
      dialogFormVisible: false,

      form: {
        description: '',
        menu_ids: [],
        role_name: ''

      },


      data: [],
      name: '添加角色',
      checkedid: [],
      liid: 0,
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    //获取用户列表的方法
    UserSearch() {
      API.userList(this.formList).then(res => {
        console.log(res)
        this.tableData = res.data.list
        this.total = res.data.total


      })
    },

    handleSizeChange(val) {
      this.formList.limit = val
      this.UserSearch()
    },
    handleCurrentChange(val) {
      this.formList.page = val
      this.UserSearch()

    },



    handleSelectionChange(val) {

      // console.log(val);
      this.yilist = val.map((item) => item.role_id);
      this.yilist = this.yilist.join(',')
      console.log(this.yilist);
    },

    del(val) {
      // console.log(val);
      API.userDelete(val).then(res => {
        console.log(res);
        this.UserSearch()

      })
    },

    add() {
      this.name = '添加角色'
      this.dialogFormVisible = true
      API.userAddlist().then(res => {
        console.log(res);
        this.UserSearch()
        this.data = res.rows
        // console.log(res.rows);
      })
    },

    addok() {
      this.dialogFormVisible = false
      if (this.name == '添加角色') {
        this.getChecked()
        API.userAdd(this.form).then(res => {
          console.log(res);
          this.UserSearch()
        })

      } else {

        API.userUpdata(this.form).then(res => {
          console.log(res);
          this.UserSearch()
        })


        console.log(1111);
      }

    },
    getChecked() {
      // 使用 this.$refs 访问到 Tree 组件实例
      const checkedNodes = this.$refs.tree.getCheckedNodes();
      this.form.menu_ids = checkedNodes.map((item) => item.id);
      // console.log(this.form.menu_ids);
      this.form.menu_ids = this.form.menu_ids.join('/')
      console.log(checkedNodes); // 打印出已勾选的节点数据
      console.log(this.form.menu_ids);
    },
    edit(id) {
      // this.liidt = id
      this.name = '编辑角色'
      this.dialogFormVisible = true
      API.userAddlist().then(res => {
        console.log(res);
        this.UserSearch()
        this.data = res.rows
      })
      API.userUp(id).then(res => {
        console.log(res);
        this.form.description = res.data.description
        this.form.id = res.data.id
        this.form.role_name = res.data.role_name
        this.form.menu_ids = res.data.menu_ids
        this.checkedid = this.form.menu_ids.split('/').map(Number)


        console.log(this.form.menu_ids, 777777);




      })





    }

  },
  created() {
    //created生命周期 在创建前使用
    this.UserSearch()
  },

};
</script>
<style lang='' scoped>
.box{
  width: 100%;
  height: 100vh;
  background-color: #fff;
}
</style>