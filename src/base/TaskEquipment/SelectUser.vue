<template>
  <div class="content">
    <el-form :model="query">
      <el-row :gutter="20">
        <!--选择器-->
        <el-col :sm="12" :md="8">
          <el-form-item label="用户名称：">
            <el-input class="searchSelect" v-model="query.username" placeholder="请输入用户名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" :disabled="Table1Loading" icon="el-icon-search" @click="handleSearch">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh" @click="resetQueryForm">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!--<layuiTitle :title="'站点列表'"></layuiTitle>-->
    <el-table :data="tableList" v-loading="Table1Loading">
      <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template></el-table-column>
      <el-table-column prop="username" label="用户账号" width=""></el-table-column>
      <el-table-column prop="mobile_no" label="联系电话" width=""></el-table-column>
      <el-table-column prop="organizationname" label="部门" width=""></el-table-column>
      <el-table-column prop="" label="操作" width="50">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleChoose(scope.$index, scope.row)">选择</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="center">
      <el-pagination @current-change="getTableData1More" @size-change="handelSizeChange" :current-page="pagination.currentPage"
                     :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize" :total="pagination.total"
                     background layout="total, prev, pager, next, sizes"></el-pagination>
    </div>
  </div>
</template>

<script>
import {GetUserIdTenantUsers} from 'api/api'
import {mapGetters} from 'vuex'

export default {
  name: 'SelectUser',
  data () {
    return {
      // 查询相关属性
      query: {
        username: ''
      },
      tableList: [],
      // 分页相关属性
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1,
        PageIndex: 1
      },
      DetailDialogVisible: false,
      Table1Loading: false
    }
  },
  created () {
    if (this.UserInfo.usertype === 3) {
      this.query.tenantid = this.UserInfo.tenantid
    }
    this._getTableData1()
  },
  methods: {
    async _getTableData1 () {
      this.Table1Loading = true
      const res = await this.$axios.post(GetUserIdTenantUsers, Object.assign({}, this.query, {page: 1, pagesize: this.pagination.pageSize}))
      this.Table1Loading = false
      if (res.error) return this.$message.error(res.errorMessage)
      this.tableList = res.data.list
      this.pagination.total = res.data.total
    },
    // 分页处理函数
    handelSizeChange (page) {
      this.pagination.pageSize = page
      this.getTableData1More(this.pagination.currentPage)
    },
    async getTableData1More (page) {
      this.pagination.currentPage = page
      this.Table1Loading = true
      const res = await this.$axios.post(GetUserIdTenantUsers, Object.assign({}, this.query, {page: 1, pagesize: this.pagination.pageSize}))
      this.Table1Loading = false
      if (res.error) return this.$message.error(res.errorMessage)
      this.tableList = res.data.list
      this.pagination.total = res.data.total
    },
    // 搜索按钮
    async handleSearch () {
      this.Table1Loading = true
      let query = {}
      for (let item in this.query) {
        if (this.query[item]) query[item] = this.query[item]
      }
      const res = await this.$axios.post(GetUserIdTenantUsers, Object.assign({}, this.query, {page: 1, pagesize: this.pagination.pageSize}))
      this.Table1Loading = false
      if (res.error) return this.$message.error(res.errorMessage)
      if (res.data) {
        this.tableList = res.data.list
        this.pagination.total = res.data.total
      }
    },
    // 重置按钮
    resetQueryForm () {
      Object.assign(this.$data.query, this.$options.data().query)
      // Object.assign(this.$data.AreaList, this.$options.data().AreaList)
      this._getTableData1()
    },
    handleChoose (index, row) {
      this.$emit('selectUser', row.id)
    }
  },
  computed: {
    ...mapGetters(['UserInfo'])
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
