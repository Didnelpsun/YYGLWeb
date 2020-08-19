<template>
  <div class="content">
      <el-form :model="query">
        <el-row :gutter="20">
          <!--选择器-->
          <el-col :sm="12" :md="8">
            <el-form-item label="站点名称：">
              <el-input class="searchSelect" v-model="query.name" placeholder="请输入站点名称"></el-input>
            </el-form-item>
          </el-col>
          <!--站点分类-->
          <el-col :span="8">
            <el-form-item label="站点分类：">
              <el-select class="searchSelect" v-model="query.classify">
                <el-option label="请选择" value=""></el-option>
                <el-option v-for="i in DicList.classify" :key="i.value" :label="i.text" :value="i.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" :disabled="Table1Loading" icon="el-icon-search" @click="handleSearch">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" @click="resetQueryForm">重置</el-button>
            <el-button v-if="isSite=='1'" type="primary" icon="el-icon-refresh" @click="isSiteChoose">选择</el-button>
          </el-col>
        </el-row>
      </el-form>
      <!--<layuiTitle :title="'站点列表'"></layuiTitle>-->
      <el-table :data="tableList" v-loading="Table1Loading" @selection-change="handleSelect1">
        <el-table-column v-if="isSite=='1'" type="selection" width="40"></el-table-column>
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template></el-table-column>
        <el-table-column prop="code" label="站点编码" width=""></el-table-column>
        <el-table-column prop="name" label="站点名称" width=""></el-table-column>
        <el-table-column prop="classifyname" label="站点分类" width=""></el-table-column>
        <el-table-column prop="resourcetypename" label="站点类型" width=""></el-table-column>
        <el-table-column prop="accessdate" label="入网日期" width=""></el-table-column>
        <!--<el-table-column prop="provincename" label="省份" width=""></el-table-column>-->
        <el-table-column prop="cityname" label="城市" width=""></el-table-column>
        <el-table-column prop="areaname" label="区域" width=""></el-table-column>

        <el-table-column prop="" label="操作" width="50" v-if="isSite==2">
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
import {GetZYResourceListAsync, GetEnergyListAsync, DictionaryInfoList} from 'api/api'

export default {
  name: 'ResourceList',
  props: {
    resourcetype: {
      type: Number,
      default: 1
    },
    isSite: {
      type: String,
      default: '2'
    },
    resource_id: {
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
        name: '', // 站点名称
        classify: '', // 站点分类
        provinceid: '', // 省份
        cityid: '', // 城市
        areaid: '' // 区域
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
      selectId: [],
      DicList: {}
    }
  },
  created () {
    this._getTableData1()
    this.initDictionariesArray()
  },
  methods: {
    async _getTableData1 () {
      this.Table1Loading = true
      let url = this.resourcetype === 1 ? GetEnergyListAsync : GetZYResourceListAsync
      const res = await this.$axios.post(url, this.resource_id, {params: Object.assign({}, this.query, {pageIndex: 1, pageSize: this.pagination.pageSize})})
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
      let url = this.resourcetype === 1 ? GetEnergyListAsync : GetZYResourceListAsync
      const res = await this.$axios.post(url, this.resource_id, {params: Object.assign({}, this.query, {pageIndex: page, pageSize: this.pagination.pageSize})})
      this.Table1Loading = false
      if (res.errorCode !== '200') return this.$message.error(res.msg)
      this.tableList = res.data.list
      this.pagination.total = res.data.total
    },
    initDictionariesArray () {
      let arr = ['站点分类', '站点类型']
      this.$axios.post(DictionaryInfoList, arr).then(res => {
        if (res.errorCode === '200') {
          this.DicList.classify = res.data.filter(i => {
            return i.type === '站点分类'
          })
          this.DicList.resourcetype = res.data.filter(i => {
            return i.type === '站点类型'
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 搜索按钮
    async handleSearch () {
      this.Table1Loading = true
      let query = {}
      for (let item in this.query) {
        if (this.query[item]) query[item] = this.query[item]
      }
      let url = this.resourcetype === 1 ? GetEnergyListAsync : GetZYResourceListAsync
      const res = await this.$axios.post(url, this.resource_id, {params: Object.assign(query, {pageIndex: this.pagination.PageIndex, pageSize: this.pagination.pageSize})})
      this.Table1Loading = false
      if (res.error) return this.$message.error(res.msg)
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
      this.$emit('selectResource', row.name, row.id)
    },
    handleSelect1 (list) {
      this.selectId = list
    },
    isSiteChoose () {
      this.$emit('chooseDevice', this.selectId)
    }
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
