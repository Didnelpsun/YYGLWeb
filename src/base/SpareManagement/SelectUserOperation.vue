<template>
  <div class="content">
    <el-table :data="tableList" v-loading="Table1Loading">
      <el-table-column label="序号">
        <template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template>
      </el-table-column>
      <el-table-column prop="name" label="仓库类型"></el-table-column>
      <el-table-column prop="operation" label="操作"></el-table-column>
      <el-table-column prop="" label="操作" >
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
import {GetUserOperation} from 'api/BJGL'

export default {
  name: 'SelectUserOperation',
  props: {
    check: null
  },
  data () {
    return {
      tableList: [],
      // 分页相关属性
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1,
        PageIndex: 1
      },
      Table1Loading: false
    }
  },
  created () {
    this._getTableData1()
  },
  methods: {
    _getTableData1 () {
      this.Table1Loading = true
      this.$axios.get(GetUserOperation, {
        params: {
          /* operationid: this.check */
        }}).then(res => {
        this.Table1Loading = false
        if (res.errorCode !== '200') return this.$message.error(res.msg)
        this.tableList = res.data.list
        this.pagination.total = res.data.total
      })
    },
    // 分页处理函数
    handelSizeChange (page) {
      this.pagination.pageSize = page
      this.getTableData1More(this.pagination.currentPage)
    },
    getTableData1More  (page) {
      this.pagination.currentPage = page
      this.Table1Loading = true
      this.$axios.get(GetUserOperation, {params: Object.assign({}, this.query, {
        PageIndex: this.pagination.currentPage,
        PageSize: this.pagination.pageSize,
        provinceid: this.provinceid,
        cityid: this.cityid
      })}).then(res => {
        this.Table1Loading = false
        if (res.errorCode !== '200') return this.$message.error(res.msg)
        this.tableList = res.data.list
        this.pagination.total = res.data.total
      })
    },
    handleChoose (index, row) {
      this.$emit('SelectUserOperation', row.operation, row.name, row.id)
    }
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
