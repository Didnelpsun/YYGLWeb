<template>
  <div class="content">
    <el-form :model="Query">
      <el-row :gutter="20">
        <!--选择器-->
        <el-col :sm="12" :md="8">
          <el-form-item label="区域：">
            <el-cascader v-model="Query.AreaList" :props="QareaProps" clearable @change="changeArea(Query)"></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="机房类型：">
            <el-select class="searchSelect" v-model="Query.roomtypes">
              <el-option label="请选择" value=""></el-option>
              <el-option v-for="i in DicList.roomtype" :key="i.value" :label="i.text" :value="i.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="天面类型：">
            <el-select class="searchSelect" v-model="Query.dayfacetypes">
              <el-option label="请选择" value=""></el-option>
              <el-option v-for="i in DicList.dayfacetype" :key="i.value" :label="i.text" :value="i.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :sm="12" :md="8">
          <el-form-item label="站址名称：">
            <el-input v-model="Query.sitename"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="11" :md="9">
          <el-button @click="getMore(1)" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-search'">查询</el-button>
          <el-button @click="ResetQuery" icon="el-icon-refresh">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableList" v-loading="Loading">
      <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template></el-table-column>
      <!-- <el-table-column prop="provincename" label="省份" width="70"></el-table-column> -->
      <el-table-column prop="cityname" label="地市" width="80"></el-table-column>
      <el-table-column prop="areaname" label="区域" width="80"></el-table-column>
      <el-table-column prop="sitecode" label="站址编码" width="140"></el-table-column>
      <el-table-column prop="sitename" label="站址名称" width="140"></el-table-column>
      <el-table-column prop="locationdescribe" label="位置描述" width=""></el-table-column>
      <el-table-column prop="roomtypename" label="机房类型" width=""></el-table-column>
      <el-table-column prop="dayfacetypename" label="天面类型" width=""></el-table-column>
      <el-table-column prop="confirmtime" label="确认时间" width="" :formatter="formatDate"></el-table-column>
      <el-table-column prop="confirmusername" label="确认人" width=""></el-table-column>

      <el-table-column prop="" label="操作" width="50">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleChoose(scope.$index, scope.row)">选择</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="center">
      <el-pagination @current-change="getMore" @size-change="changeSize1" :current-page="currentPage"
                     :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="total"
                     background layout="total, prev, pager, next, sizes"></el-pagination>
    </div>
  </div>
</template>

<script>
import {GlobalRes} from 'common/js/mixins'
import {DictionaryInfoList} from 'api/api'
import {GetSiteList} from 'api/YDSZ'
import {formatDate} from 'common/js/cache'

export default {
  name: 'SiteList',
  mixins: [GlobalRes],
  data () {
    return {
      // 查询相关属性
      Query: {
        name: '', // 站点名称
        classify: '', // 站点分类
        provinceid: '', // 省份
        cityid: '', // 城市
        areaid: '' // 区域
      },
      tableList: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      PageIndex: 1,
      DetailDialogVisible: false,
      Loading: false,
      selectId: [],
      DicList: {}
    }
  },
  created () {
    this.getData1()
    this.initDictionariesArray()
  },
  methods: {
    initDictionariesArray () {
      let arr = ['移动上站站址机房类型', '移动上站站址天面类型']
      this.$axios.post(DictionaryInfoList, arr).then(res => {
        if (res.errorCode === '200') {
          this.DicList.roomtype = res.data.filter(i => {
            return i.type === '移动上站站址机房类型'
          })
          this.DicList.dayfacetype = res.data.filter(i => {
            return i.type === '移动上站站址天面类型'
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    ResetQuery () {
      Object.assign(this.$data.Query, this.$options.data().Query)
      // this.Query.provinceid = null
      this.getData1()
    },
    getData1 () {
      this.Loading = true
      this.$axios.get(GetSiteList, {
        params: {
          PageIndex: 1,
          PageSize: this.pageSize
        }
      }).then(res => {
        this.Loading = false
        if (res.errorCode === '200') {
          this.tableList = res.data.list
          this.total = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getMore (e) {
      this.Loading = true
      this.currentPage = e
      this.$axios.get(GetSiteList, {params: Object.assign({}, this.Query, {
        PageIndex: e,
        PageSize: this.pageSize
      })}).then(res => {
        this.Loading = false
        if (res.errorCode === '200') {
          this.tableList = res.data.list
          this.total = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    changeSize1 (page) {
      this.pageSize = page
      this.getMore(this.currentPage)
    },
    formatDate (row) {
      return formatDate(row.confirmtime)
    },
    handleChoose (index, row) {
      this.$emit('selectSite', row.sitename, row.id)
    }
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
