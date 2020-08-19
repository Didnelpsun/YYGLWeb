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
        <el-col :sm="12" :md="8">
          <el-form-item label="基站名称：">
            <el-input v-model="Query.logicstandname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8">
          <el-form-item label="基站编号：">
            <el-input v-model="Query.logicstandcode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="center" style="margin-bottom: 20px;">
        <el-button @click="getMore(1)" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-search'">查询</el-button>
        <el-button @click="ResetQuery" icon="el-icon-refresh">重置</el-button>
      </div>
    </el-form>
    <el-table :data="tableList" v-loading="Loading">
      <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template></el-table-column>
      <!-- <el-table-column prop="provincename" label="省份" width="80"></el-table-column> -->
      <el-table-column prop="cityname" label="地市" width="80"></el-table-column>
      <el-table-column prop="areaname" label="区域" width="100"></el-table-column>
      <el-table-column prop="logicstandname" label="基站名称" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="logicstandcode" label="基站编码" width=""></el-table-column>
      <el-table-column prop="" label="BBU归属站点" width=""></el-table-column>
      <el-table-column prop="" label="RRU归属站点" width=""></el-table-column>
      <el-table-column prop="rrunumber" label="RRU数量" width=""></el-table-column>

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
import {GetLogicStandList} from 'api/YDSZ'

export default {
  name: 'LogicStationList',
  mixins: [GlobalRes],
  data () {
    return {
      // 查询相关属性
      Query: {
        AreaList: [],
        logicstandname: '',
        logicstandcode: '',
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
  },
  methods: {
    ResetQuery () {
      Object.assign(this.$data.Query, this.$options.data().Query)
      // this.Query.provinceid = null
      this.getData1()
    },
    getData1 () {
      this.Loading = true
      this.$axios.get(GetLogicStandList, {
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
      this.$axios.get(GetLogicStandList, {params: Object.assign({}, this.Query, {
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
    handleChoose (index, row) {
      this.$emit('selectSite', row.logicstandcode, row.id, row.logicstandname)
    }
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
