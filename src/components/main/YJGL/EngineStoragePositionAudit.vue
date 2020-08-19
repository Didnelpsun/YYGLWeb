<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-row>
        <el-col :span="4" class="SearchResult">查询结果</el-col>
      </el-row>
      <el-table :data="tableList" v-loading="Loading" style="margin-top: 15px">>
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template></el-table-column>
        <el-table-column prop="machinenumber" label="油机编号" width=""></el-table-column>
        <el-table-column prop="machinebatchno" label="油机缸号" width=""></el-table-column>
        <el-table-column prop="fueltype" label="油机类型" width=""></el-table-column>
        <el-table-column prop="resourcescode" label="站点编码" width=""></el-table-column>
        <el-table-column prop="resourcesname" label="站点名称" width=""></el-table-column>
        <el-table-column prop="realityname" label="申请人" width=""></el-table-column>
        <el-table-column prop="applicanttime" label="申请时间" width=""></el-table-column>
        <el-table-column prop="storageplacetype" label="存放点位置类型" width=""></el-table-column>
        <el-table-column label="操作" width="140" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="Audit(scope.row)">审核</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="center">
        <el-pagination @current-change="getMore" @size-change="changeSize" :current-page="pagination.currentPage"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize" :total="pagination.total"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
    </div>
    <div v-show="showWrite">
      <Details @fatherClose="closeWrite" ref="Details" @fatheretMore="getMore(pagination.currentPage)"/>
    </div>

  </div>
</template>

<script>
import { AuditList, GtIdAuditList } from 'api/YJGL'
import { GlobalRes } from 'common/js/mixins'
import Details from 'base/YJGL/EngineStoragePositionAudit'

export default {
  name: 'EngineStoragePositionAudit',
  // 合并对象，必须以文件名:[导出对象名]的格式
  mixins: [GlobalRes],
  data () {
    return {
      // 加载
      Loading: false,
      showWrite: false,
      tableList: [
      ],
      tableData: {},
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
  methods: {
    // writeDic: GlobalRes.methods.writeDic,
    getMore (e) {
      this.Loading = true
      this.pagination.currentPage = e
      this.$axios.get(AuditList,
        {
          params: Object.assign({}, {
            pageIndex: e,
            pageSize: this.pagination.pageSize
          })
        })
        .then(res => {
          this.Loading = false
          this.tableList = res.data.list
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
    },
    // 返回关闭编辑函数
    closeWrite () {
      this.getMore(1)
      this.showWrite = !this.showWrite
    },
    // 审核函数
    Audit (row) {
      console.log(row)
      this.$refs.Details.WriteLoading = true
      if (this.$data.tableData) {
        // this.$data.tableData = {}
        Object.assign(this.$data.tableData, this.$options.data().tableData)
        this.$axios.get(GtIdAuditList, {
          params: {
            id: row.id
          }
        }).then(res => {
          if (res.error !== true) {
            try {
              if (res.data) {
                this.showWrite = true
                this.tableData = res.data
                // this.tableData = Object.assign({}, this.tableData, {id: row.id})
                this.$refs.Details.setWriteData(this.tableData)
              } else { this.$message.error('查询详情失败') }
            } catch (e) {
              console.log(e)
            }
          } else { this.$message.error('查询详情失败') }
        })
      }
      this.$refs.Details.WriteLoading = false
    }
  },
  components: {
    Details
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
