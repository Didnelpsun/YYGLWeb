<template>
  <div class="content">
    <div class="main">
      <el-row>
        <el-col :span="4" class="SearchResult">查询结果</el-col>
        <el-col :offset="2" :span="18" class="fr">
          <div class="fr">
          </div>
        </el-col>
      </el-row>
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
