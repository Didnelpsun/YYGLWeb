<template>
  <div class="content">
    <el-form :model="query">
      <el-row>
        <!--选择器-->
        <el-col :span="18">
          <el-col :span="8">
            <el-form-item label="用户名称：">
              <el-input v-model="query.realityname" @keyup.enter.native="getRoleMore(1)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用户账号：">
              <el-input v-model="query.username" @keyup.enter.native="getRoleMore(1)"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="6">
          <div class="fr">
            <el-button type="primary"  icon="el-icon-search" @click="getRoleMore(1)">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" @click="resetQueryForm">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <!--<layuiTitle :title="'站点列表'"></layuiTitle>-->
    <el-table :data="tableData" v-loading="Table1Loading" style="margin-top: 15px;">
      <el-table-column label="序号" width="50">
        <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template>
      </el-table-column>
      <el-table-column prop="username" label="用户账号" ></el-table-column>
      <el-table-column prop="realityname" label="用户名称" ></el-table-column>
      <el-table-column prop="mobile_no" label="用户电话" ></el-table-column>
      <el-table-column prop="email" label="email" ></el-table-column>
      <el-table-column prop="orgname" label="部门" ></el-table-column>
      <el-table-column prop="createtime" label="注册时间" ></el-table-column>
      <<el-table-column label="操作" width="">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleChoose(scope.row)">选择</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="center">
      <el-pagination @current-change="getRoleMore(this.currentPage)" @size-change="handelSizeChange" :current-page="currentPage"
                     :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="total"
                     background layout="total, prev, pager, next, sizes"></el-pagination>
    </div>
  </div>
</template>

<script>
import {UserListAsync} from 'api/api'
import { GlobalRes } from 'common/js/mixins'
import {ROLE_TYPE} from 'common/js/global'

export default {
  name: 'SelectUser',
  mixins: [GlobalRes],
  props: {
    resourcetype: {
      type: Number,
      default: 1
    },
    provinceid: {// 省份
      type: Number,
      default: null
    },
    cityid: {// 城市
      type: Number,
      default: null
    }
  },
  data () {
    return {
      // 查询相关属性
      query: {
        username: null,
        realityname: null
      },
      params: null,
      tableData: [],
      // 分页相关属性

      total: 0,
      pageSize: 10,
      currentPage: 1,
      PageIndex: 1,
      SelectionChange: [],
      DetailDialogVisible: false,
      Table1Loading: false,
      ROLE_TYPE: [],
      selectId: [],
      DicList: {}
    }
  },
  created () {
    this.ROLE_TYPE = ROLE_TYPE.slice(1)
    this.getRoleList()
  },
  methods: {
    formatRoleType (row) { return `${ROLE_TYPE[row.role_type]}` },
    _getRoleList (data) {
      this.Table1Loading = true
      return this.$axios.post(UserListAsync, data).then((res) => {
        this.Table1Loading = false
        return Promise.resolve(res)
      })
    },
    getRoleList () {
      const data = {
        page: 1,
        pageSize: this.pageSize
      }
      this._getRoleList(data).then((res) => {
        if (res.error) {
          this.$message.error(res.errorMessage)
        } else {
          this.tableData = res.data.list
          this.total = res.data.total
        }
      })
    },
    // 分页处理函数
    handelSizeChange (page) {
      this.pagination.pageSize = page
      this.getRoleMore(this.currentPage)
    },
    getRoleMore (page) {
      this.currentPage = page
      const data = Object.assign({}, this.query, {
        page: page,
        pagesize: this.pageSize
      })
      this._getRoleList(data).then((res) => {
        if (res.error) {
          this.$message.error(res.errorMessage)
        } else {
          this.tableData = res.data.list
          this.total = res.data.total
        }
      })
    },
    // 重置按钮
    resetQueryForm () {
      Object.assign(this.$data.query, this.$options.data().query)
      // Object.assign(this.$data.AreaList, this.$options.data().AreaList)
      this.getRoleList()
    },
    handleChoose (row) {
      this.$emit('selectUser', row.id, row.realityname, row.mobile_no)
    }
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
