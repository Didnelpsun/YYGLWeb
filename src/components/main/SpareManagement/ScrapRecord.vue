<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-col :span="18" style="margin: 10px 0px">
        <p class="SearchResult">查询结果</p>
      </el-col>
      <el-table :data="tableData" v-loading="Loading" ref="table1" style="margin-top: 15px;">
        <el-table-column label="序号" width="45">
          <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template>
        </el-table-column>
        <el-table-column prop="cityname"  label="地市"></el-table-column>
        <el-table-column prop="areaname" width="70px" label="区域"></el-table-column>
        <el-table-column prop="typename" label="备件类型"></el-table-column>
        <el-table-column prop="code" label="备件编码"></el-table-column>
        <el-table-column prop="manufacturername" label="备件厂家"></el-table-column>
        <el-table-column prop="sparemodel" label="备件型号"></el-table-column>
        <el-table-column prop="assetsencoding" label="资产编码"></el-table-column>
        <el-table-column prop="warrantycode" label="质保编码"></el-table-column>
        <el-table-column prop="applicanttime" label="报废时间"></el-table-column>
        <el-table-column prop="realityname" width="70px" label="报废人"></el-table-column>
        <!-- <el-table-column label="操作" width="140">
           <template slot-scope="scope">
             <el-button type="text" size="mini" @click="handleWrite(2,scope.row)">详情</el-button>
             <el-button type="text" size="mini" @click="handleWrite(1, scope.row)">编辑</el-button>
             <el-button type="text" size="mini" @click="handle2(scope.row)">删除</el-button>
           </template>
         </el-table-column>-->
      </el-table>
      <div class="center">
        <el-pagination @current-change="getData1" @size-change="changeSize1" :current-page="currentPage"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="total"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
import {ScrapRecord} from 'api/BJGL'
export default {
  name: 'ScrapRecord',
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      Loading: false,
      tableData: [],
      tableLoading: false,
      showWrite: false
    }
  },
  activated () {
    this.getData1(1)
  },
  methods: {
    getData1 (page) {
      this.currentPage = page
      this.Loading = true
      this.$axios.get(ScrapRecord, {
        params: {
          PageIndex: this.currentPage,
          PageSize: this.pageSize
        }}).then(res => {
        this.Loading = false
        if (res.errorCode !== '200') return this.$message.error(res.msg)
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    changeSize1 (page) {
      this.pageSize = page
      this.getData1(this.currentPage)
    },
    WriteClose () {
      this.showWrite = false
      Object.assign(this.$data, this.$options.data.call(this))
    }
  }
}
</script>

<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
