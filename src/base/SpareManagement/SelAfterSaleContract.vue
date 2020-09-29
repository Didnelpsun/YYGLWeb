<template>
  <div class="content">
    <el-form :model="query">
      <el-row>
        <!--选择器-->
        <el-col :span="18">
          <el-col :span="8">
            <el-form-item label="厂家名称：">
              <el-input v-model="query.name" placeholder="请填写厂家名称"  @keyup.enter.native="getTableData1More(1)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="厂家编码：">
              <el-input v-model="query.code" placeholder="请填写厂家编码"  @keyup.enter.native="getTableData1More(1)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="类型编码：">
              <el-input v-model="query.contractno" placeholder="请填写合同编号"  @keyup.enter.native="getTableData1More(1)"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="6">
          <div class="fr">
            <el-button type="primary" :disabled="Table1Loading" :icon="Table1Loading ? 'el-icon-loading' : 'el-icon-search'" @click="getTableData1More(1)">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" @click="resetQueryForm">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <!--<layuiTitle :title="'站点列表'"></layuiTitle>-->
    <el-table :data="tableList" v-loading="Table1Loading">
      <el-table-column label="序号" width="50">
        <template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template>
      </el-table-column>
      <el-table-column prop="cityname" label="地市"></el-table-column>
      <el-table-column prop="code" label="厂家编码"></el-table-column>
      <el-table-column prop="name" label="厂家名称 "></el-table-column>
      <el-table-column prop="contractno" label="合同编号"></el-table-column>
      <el-table-column prop="year" label="合同年度"></el-table-column>
      <el-table-column prop="administrator" label="负责人 "></el-table-column>
      <el-table-column prop="starttime" label="开始时间"></el-table-column>
      <el-table-column prop="endtime" label="结束时间"></el-table-column>
      <el-table-column prop="realityname" label="提交人"></el-table-column>
      <el-table-column prop="createtime" label="提交时间"></el-table-column>

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
import {Getmanufacturerinfo} from 'api/BJGL'
import { GlobalRes } from 'common/js/mixins'
export default {
  name: 'SelAfterSaleContract',
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
        name: null,
        code: null,
        contractno: null
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
      this.$axios.get(Getmanufacturerinfo, {
        params: {
          PageIndex: 1,
          PageSize: 10,
          provinceid: this.provinceid,
          cityid: this.cityid
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
      this.$axios.get(Getmanufacturerinfo, {params: Object.assign({}, this.query, {
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
    // 重置按钮
    resetQueryForm () {
      Object.assign(this.$data.query, this.$options.data().query)
      // Object.assign(this.$data.AreaList, this.$options.data().AreaList)
      this._getTableData1()
    },
    handleChoose (index, row) {
      this.$emit('SelAfterSaleContract', row.name, row.id)
    }
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
