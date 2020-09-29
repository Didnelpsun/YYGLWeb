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
            <el-button type="primary" :disabled="Loading" icon="el-icon-search" @click="getMore(1)">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" @click="resetQueryForm">重置</el-button>
            <el-button type="primary"  @click="select">确认选择</el-button>
          </el-col>
        </el-row>
      </el-form>
      <!--<layuiTitle :title="'站点列表'"></layuiTitle>-->
      <el-table :data="tableList" v-loading="Loading"    :row-key="getRowKey"  ref="multipleTable" @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55" :reserve-selection="true" >
        </el-table-column>
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template></el-table-column>
        <!-- <el-table-column prop="provincename" label="省份" width=""></el-table-column> -->
        <el-table-column prop="cityname" label="城市" width="80"></el-table-column>
        <el-table-column prop="areaname" label="区域" width="80"></el-table-column>
        <el-table-column prop="name" label="站点名称" width="" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="code" label="站点编码" width="" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="classifyname" label="站点分类" width=""></el-table-column>
        <el-table-column prop="accessdate" label="入网日期" width=""></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width=""></el-table-column>
        <el-table-column prop="createusername" label="创建人" width=""></el-table-column>
        <el-table-column prop="" label="操作" width="50">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleChoose(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="center">
        <el-pagination @current-change="getMore" @size-change="handelSizeChange" :current-page="pagination.currentPage"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize" :total="pagination.total"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
  </div>
</template>

<script>
import {GetZYResourceListAsync, DictionaryInfoList} from 'api/api'

export default {
  name: 'SitePicker',
  data () {
    return {
      // 查询相关属性
      query: {
        // id: '',
        name: '', // 站点名称
        classify: '', // 站点分类
        provinceid: '', // 省份
        cityid: '', // 城市
        areaid: '' // 区域
      },
      id: [],
      tableList: [],
      info: [],
      // 分页相关属性
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1,
        PageIndex: 1
      },
      getRowKey (row) {
        return row.id
      },
      Loading: false,
      DicList: {
        classify: []
      }
    }
  },
  created () {
    this.getMore(1)
    this.getList()
  },
  methods: {
    select () {
      this.$emit('selectSite', this.info)
      this.$refs.multipleTable.clearSelection()
    },
    handleSelectionChange (val) {
      this.info = val
    },
    async getMore (page) {
      this.pagination.currentPage = page
      this.Loading = true
      const res = await this.$axios.post(GetZYResourceListAsync, this.id, {params: Object.assign({}, this.query, {pageIndex: page, pageSize: this.pagination.pageSize})})
      this.Loading = false
      if (res.errorCode !== '200') return this.$message.error(res.msg)
      this.tableList = res.data.list
      this.pagination.total = res.data.total
    },
    // 分页处理函数
    handelSizeChange (page) {
      this.pagination.pageSize = page
      this.getMore(this.pagination.currentPage)
    },
    getList () {
      let arr = ['站点分类']
      this.$axios.post(DictionaryInfoList, arr).then(res => {
        if (res.errorCode === '200') {
          this.DicList.classify = res.data.filter(i => {
            return i.type === '站点分类'
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 重置按钮
    resetQueryForm () {
      Object.assign(this.$data.query, this.$options.data().query)
      this.getMore(1)
      this.$refs.multipleTable.clearSelection()
    },
    handleChoose (row) {
      this.$emit('selectSite', row)
      this.$refs.multipleTable.clearSelection()
    }
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
