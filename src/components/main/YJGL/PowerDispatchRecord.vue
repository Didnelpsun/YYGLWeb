<template>
  <div class="content">
    <div class="main">
      <el-form :model="Query">
        <el-row >
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="调度类型：">
                <el-input v-model="Query.dispatchtype" placeholder="请填写调度类型"  @keyup.enter.native="getMore1(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="故障单编码：">
                <el-input v-model="Query.code" placeholder="请填写故障单编码"  @keyup.enter.native="getMore1(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="油机缸号：">
                <el-input v-model="Query.machinebatchno" placeholder="请填写油机缸号"  @keyup.enter.native="getMore1(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="站点名称：">
                <el-input v-model="Query.stationname" placeholder="请填写站点名称"  @keyup.enter.native="getMore1(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="站点编码：">
                <el-input v-model="Query.stationcode" placeholder="请填写站点编码"  @keyup.enter.native="getMore1(1)"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="6">
            <div class="fr" style="margin-top: 0">
              <el-button  @click="getMore1(1)" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-search'">查询</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <p class="SearchResult">查询结果</p>
          </el-col>
          <el-col :span="6">
            <div class="fr" style="margin-top: 0">
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="tableList" v-loading="Loading" style="margin-top: 15px">>
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template></el-table-column>
        <el-table-column prop="dispatchtype" label="调度类型" width=""></el-table-column>
        <el-table-column prop="positiondeviation" label="位置偏差" width=""></el-table-column>
        <el-table-column prop="power" label="功率" width="60"></el-table-column>
        <el-table-column prop="frequency" label="频率" width=""></el-table-column>
        <el-table-column prop="voltage" label="电压" width="60"></el-table-column>
        <el-table-column prop="seemingmain" label="疑似市电" width=""></el-table-column>
        <el-table-column prop="code" label="故障单编码" width="180"></el-table-column>
        <el-table-column prop="workorderstatus" label="工单状态" width=""></el-table-column>
        <el-table-column prop="machinebatchno" label="油机缸号" width=""></el-table-column>
        <el-table-column prop="machinenumber" label="油机编号" width=""></el-table-column>
        <el-table-column prop="stationname" label="站点名称" width=""></el-table-column>
        <el-table-column prop="stationcode" label="站点编码" width=""></el-table-column>
        <el-table-column prop="realityname" label="调度人" width="60"></el-table-column>
        <el-table-column prop="dateinfo" label="调度时间" width=""></el-table-column>
      </el-table>

      <div class="center">
        <el-pagination @current-change="getMore" @size-change="changeSize" :current-page="pagination.currentPage"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize" :total="pagination.total"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { PowerDispatchRecordList } from 'api/YJGL'
import { GlobalRes } from 'common/js/mixins'

export default {
  name: 'PowerDispatchRecord',
  // 合并对象，必须以文件名:[导出对象名]的格式
  mixins: [GlobalRes],
  data () {
    return {
      // 加载
      Query: {
        dispatchtype: null,
        code: null,
        machinebatchno: null,
        stationname: null,
        stationcode: null
      },
      Loading: false,
      tableList: [
      ],
      // 分页相关属性
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    }
  },
  activated () {
    // this.check(AreaList)
    this.getMore(1)
  },
  created () {
  },
  methods: {
    getMore1 (e) {
      this.Loading = true
      this.pagination.currentPage = e
      this.$axios.get(PowerDispatchRecordList,
        {params: Object.assign({}, this.Query, {
          PageIndex: this.currentPage,
          PageSize: this.pageSize
        })
        })
        .then(res => {
          this.Loading = false
          // 数据改变
          this.tableList = res.data.list.map(function (val) {
            val.power = val.power.toFixed(2)
            return val
          })
          this.pagination.total = res.data.total
        })
        .catch(error => {
          console.log(error)
        })
    },
    // writeDic: GlobalRes.methods.writeDic,
    getMore (e) {
      this.Loading = true
      this.pagination.currentPage = e
      this.$axios.get(PowerDispatchRecordList,
        {
          params: {
            pageIndex: e,
            pageSize: this.pagination.pageSize
          }
        })
        .then(res => {
          this.Loading = false
          // 数据改变
          this.tableList = res.data.list.map(function (val) {
            val.power = val.power.toFixed(2)
            return val
          })
          this.pagination.total = res.data.total
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 分页处理函数
    changeSize (page) {
      this.pagination.pageSize = page
      this.getMore(this.pagination.currentPage)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
