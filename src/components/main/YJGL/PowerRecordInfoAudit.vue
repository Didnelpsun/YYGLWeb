<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-form :data="query" ref="NodeQueryForm">
        <el-row>
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="区域：">
                <el-cascader v-model="query.AreaList" :props="QareaProps" @change="changeArea(query)" ref="queryInput" :options="queryOption"></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="工单号：">
                <el-input v-model="query.code" placeholder="请输入工单号" @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="站点名：">
                <el-input v-model="query.resourcesname" placeholder="请输入站点名" @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="6">
            <div class="fr" style="margin-top:0">
              <el-button type="primary" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-search'" @click="getMore(1)">查询</el-button>
              <el-button type="primary" icon="el-icon-refresh" @click="resetQueryForm">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-col :span="4" class="SearchResult">查询结果</el-col>
      </el-row>
      <el-table :data="tableList" v-loading="Loading" style="margin-top: 15px">>
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template></el-table-column>
        <!-- <el-table-column prop="provincename" label="省份" width="75"></el-table-column> -->
        <el-table-column prop="cityname" label="地市" width="75"></el-table-column>
        <el-table-column prop="areaname" label="区域" width="75"></el-table-column>
        <el-table-column prop="code" label="工单号" width="200"></el-table-column>
        <el-table-column prop="resourcescode" label="站点编码" width=""></el-table-column>
        <el-table-column prop="resourcesname" label="站点名称" width="120"></el-table-column>
        <el-table-column prop="begintime" label="开始发电时间" width=""></el-table-column>
        <el-table-column prop="powertime" label="发电时长" width="90"></el-table-column>
      <!--  <el-table-column prop="" label="是否自动监控" width="75"></el-table-column>
        <el-table-column prop="" label="监控开始发电时长" width="200"></el-table-column>
        <el-table-column prop="" label="监控发电时长" width=""></el-table-column>
        <el-table-column prop="" label="代维公司" width="120"></el-table-column>
        <el-table-column prop="" label="工作站" width=""></el-table-column>
        <el-table-column prop="" label="网格" width="90"></el-table-column>
        <el-table-column prop="" label="维护员" width="90"></el-table-column>-->
        <el-table-column prop="resourcename" label="审核状态" width="120"></el-table-column>
        <el-table-column label="操作" width="50" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="Audit(scope.row)">详情</el-button>
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
import { ObtainAuditList, ObtainAuObtainAuditInfo } from 'api/YJGL'
import { GlobalRes } from 'common/js/mixins'
import Details from 'base/YJGL/PowerRecordInfoAudit'

export default {
  name: 'PowerRecordInfoAudit',
  // 合并对象，必须以文件名:[导出对象名]的格式
  mixins: [GlobalRes],
  data () {
    return {
      // 查询相关属性
      query: {
        AreaList: [
        ],
        code: '',
        resourcesname: ''

      },
      queryOption: [],
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
      let area = {
        'provinceid': this.query.AreaList[0],
        'cityid': this.query.AreaList[1],
        'areaid': this.query.AreaList[2]
      }
      this.$axios.get(ObtainAuditList,
        {
          params: Object.assign({}, area, {
            pageIndex: e,
            pageSize: this.pagination.pageSize,
            code: this.query.code,
            resourcesname: this.query.resourcesname
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
    // 重置表单按钮
    resetQueryForm () {
      this.query.AreaList.splice(0, this.query.AreaList.length)
      Object.assign(this.$data.query, this.$options.data().query)
      this.queryOption = []
      this.getMore(1)
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
      this.$refs.Details.WriteLoading = true
      if (this.$data.tableData !== null || this.$data.tableData !== undefined) {
        // this.$data.tableData = {}
        Object.assign(this.$data.tableData, this.$options.data().tableData)
        this.$axios.get(ObtainAuObtainAuditInfo, {
          params: {
            id: row.id
          }
        }).then(res => {
          if (res.error !== true) {
            this.showWrite = true
            try {
              if (res.data) {
                this.showWrite = true
                this.tableData = res.data
                this.tableData = Object.assign({}, this.tableData, {id: row.id})
                this.$refs.Details.setWriteData(this.tableData)
              } else { this.$message.error('查询详情失败') }
            } catch (e) {
              console.log(e)
            }
          } else { this.$message.error('查询详情失败') }
        })
      } else {
        this.$message.error('查询详情失败')
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
