<template>
  <div class="content">
    <!--<layuiTitle :title="'站点列表'"></layuiTitle>-->
    <el-table :data="tableList" v-loading="Table1Loading">
      <el-table-column prop="cityname" label="地市"></el-table-column>
      <el-table-column prop="areaname" label="区域"></el-table-column>
      <el-table-column prop="sparepartstypeid" label="备件类型"></el-table-column>
      <el-table-column prop="code" label="备件编码"></el-table-column>
      <el-table-column prop="manufacturerid" label="备件厂家"></el-table-column>
      <el-table-column prop="sparemodelid" label="备件型号"></el-table-column>
      <el-table-column prop="depotsid" label="存放点"></el-table-column>
      <el-table-column prop="units" label="权属"></el-table-column>
      <el-table-column prop="borrowerid" label="借用人"></el-table-column>
      <el-table-column prop="borrowtime" label="借用时间"></el-table-column>
      <el-table-column prop="alsocode" label="还件编码"></el-table-column>
      <el-table-column prop="createtime" label="还件存放点"></el-table-column>
      <el-table-column prop="alsounits" label="还件权属"></el-table-column>
      <el-table-column prop="alsopersontime" label="还件时间"></el-table-column>
      <el-table-column prop="alsopersonid" label="还件人"></el-table-column>
    </el-table>
    <div class="center">
      <el-pagination @current-change="getTableData1More" @size-change="handelSizeChange" :current-page="pagination.currentPage"
                     :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize" :total="pagination.total"
                     background layout="total, prev, pager, next, sizes"></el-pagination>
    </div>
  </div>
</template>

<script>
import {GetAlsorecord} from 'api/BJGL'
export default {
  name: 'SelBorrowerDetails',
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
        depotsid: '', // 存放点
        inventorystatus: '' // 盘存状态
      },
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
      this.$axios.get(GetAlsorecord, {
        params: {
          PageIndex: 1,
          PageSize: 10
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
      this.currentPage = page
      this.Table1Loading = true
      this.$axios.get(GetAlsorecord, {params: Object.assign({}, this.query, {
        PageIndex: this.pagination.currentPage,
        PageSize: this.pagination.pageSize
      })}).then(res => {
        this.Table1Loading = false
        if (res.errorCode !== '200') return this.$message.error(res.msg)
        this.tableList = res.data.list
        this.pagination.total = res.data.total
      })
    },
    // 重置按钮
    resetQueryForm () {
      Object.assign(this.$data.query, this.$options.data().query)
      // Object.assign(this.$data.AreaList, this.$options.data().AreaList)
      this._getTableData1()
    },
    handleChoose (index, row) {
      this.$emit('SelInventory', row.title, row.id)
    }
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
