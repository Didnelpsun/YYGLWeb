<template>
  <div class="content">
      <el-form :model="query">
        <el-row :gutter="20">
          <!--选择器-->
          <el-col :sm="12" :md="8">
            <el-form-item label-width="140px" label="设备类型名称：">
              <el-input class="searchSelect" v-model="query.equipmenttypename" placeholder="请填写设备类型名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" :disabled="Table1Loading" icon="el-icon-search" @click="handleSearch">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" @click="resetQueryForm">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
      <!--<layuiTitle :title="'站点列表'"></layuiTitle>-->
      <el-table :data="tableList" v-loading="Table1Loading" @selection-change="handleSelect1">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template></el-table-column>
        <el-table-column prop="provincename" label="省份" width=""></el-table-column>
        <el-table-column prop="cityname" label="城市" width=""></el-table-column>
        <el-table-column prop="areaname" label="区域" width=""></el-table-column>
        <el-table-column prop="resourcename" label="站点名称" width=""></el-table-column>
        <el-table-column prop="equipmenttypename" label="设备类型名称" width=""></el-table-column>
        <el-table-column prop="statename" label="设备状态" width=""></el-table-column>
      </el-table>
      <div class="center">
        <el-pagination @current-change="getTableData1More" @size-change="handelSizeChange" :current-page="pagination.currentPage"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize" :total="pagination.total"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
    <div class="center">
      <el-button @click="handleChoose" type="primary" icon="el-icon-check">提交</el-button>
    </div>
  </div>
</template>

<script>
import {GetEqipmentList} from 'api/SurveyManagement'

export default {
  name: 'deviceList',
  props: {
    resourcetype: {
      type: Number,
      default: 1
    },
    equipment_id: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      // 查询相关属性
      query: {
        equipmenttypename: ''
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
      Table1Loading: false,
      chooseList: []
    }
  },
  created () {
    this._getTableData1()
  },
  methods: {
    async _getTableData1 () {
      this.Table1Loading = true
      this.query.resourcetype = this.resourcetype
      const res = await this.$axios.post(GetEqipmentList, this.equipment_id, {params: Object.assign({}, this.query, {pageIndex: 1, pageSize: this.pagination.pageSize})})
      this.Table1Loading = false
      if (res.errorCode !== '200') return this.$message.error(res.msg)
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
      this.query.resourcetype = this.resourcetype
      const res = await this.$axios.post(GetEqipmentList, this.equipment_id, {params: Object.assign({}, this.query, {pageIndex: 1, pageSize: this.pagination.pageSize})})
      this.Table1Loading = false
      if (res.errorCode !== '200') return this.$message.error(res.msg)
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
      this.query.resourcetype = this.resourcetype
      const res = await this.$axios.post(GetEqipmentList, this.equipment_id, {params: Object.assign({}, this.query, {pageIndex: 1, pageSize: this.pagination.pageSize})})
      this.Table1Loading = false
      if (res.errorCode !== '200') return this.$message.error(res.msg)
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
    handleSelect1 (list) {
      this.chooseList = list
    },
    handleChoose () {
      this.$emit('chooseDevice', this.chooseList)
    }
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
