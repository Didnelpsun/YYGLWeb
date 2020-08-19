<template>
  <div class="content">
      <el-form :model="query">
        <el-row :gutter="20">
          <!--选择器-->
          <el-col :sm="12" :md="8">
            <el-form-item label="区域：" label-width="100px">
              <el-cascader v-model="query.AreaList" :props="QareaProps" @change="changeArea(query)" ref="queryInput" :options="queryOption"></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8">
            <el-form-item label="资源名称：" label-width="100px">
              <el-input v-model="query.resourcename" placeholder="请输入资源名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-search'" @click="getMore(1)">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" @click="resetQueryForm">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="tableList" v-loading="Loading">
        <!-- <el-table-column v-if="isSite=='1'" type="selection" width="40"></el-table-column> -->
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template></el-table-column>
        <el-table-column prop="provincename" label="省份" width=""></el-table-column>
        <el-table-column prop="cityname" label="地市" width=""></el-table-column>
        <el-table-column prop="areaname" label="区域" width=""></el-table-column>
        <el-table-column prop="resourcename" label="资源名" width=""></el-table-column>
        <!-- <el-table-column prop="modulecode" label="编码" width=""></el-table-column> -->
        <el-table-column prop="" label="操作" width="50">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleChoose(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="center">
        <el-pagination @current-change="getMore" @size-change="changeSize" :current-page="pagination.currentPage"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize" :total="pagination.total"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
  </div>
</template>

<script>
import {GetRectifierModuleList} from 'api/api'
import { GlobalRes } from 'common/js/mixins'

export default {
  name: 'TagPicker',
  mixins: [GlobalRes],
  data () {
    return {
      // 查询相关属性
      query: {
        propertyunit: '',
        AreaList: [
        ]
      },
      queryOption: [],
      tableList: [],
      // 分页相关属性
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1,
        PageIndex: 1
      },
      Loading: false
    }
  },
  created () {
    this.getMore(1)
    // this.initDictionariesArray()
  },
  methods: {
    // 分页处理函数
    changeSize (page) {
      this.pagination.pageSize = page
      this.getMore(this.pagination.currentPage)
    },
    async getMore (page) {
      this.pagination.currentPage = page
      this.Loading = true
      let area = {
        'provinceid': this.query.AreaList[0],
        'cityid': this.query.AreaList[1],
        'areaid': this.query.AreaList[2]
      }
      this.$axios.get(GetRectifierModuleList, {
        params: Object.assign({}, area, {
          resourcename: this.query.resourcename,
          PageIndex: page,
          PageSize: this.pagination.pageSize
        })
      }).then(res => {
        this.tableList = res.data.list
        this.pagination.total = res.data.total
      }).catch(error => {
        console.log(error)
      })
      this.Loading = false
    },
    // 重置按钮
    resetQueryForm () {
      this.query.AreaList.splice(0, this.query.AreaList.length)
      Object.assign(this.$data.query, this.$options.data().query)
      this.queryOption = []
      this.getMore(1)
    },
    handleChoose (row) {
      this.$emit('selectEquipment', row.id)
    }
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
