<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-form :model="query">
        <el-row type="flex" justify="start">
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="区域：">
                <el-input v-model="query.areaname" placeholder="请输入区域名" @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="站点名称：">
                <el-input v-model="query.sitename" placeholder="请输入站点名称" @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否归档：">
                <el-select v-model="query.isarchived" placeholder="请选择是否归档">
                  <el-option label="已归档" :value="true"></el-option>
                  <el-option label="未归档" :value="false"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="站点编码：">
                <el-input v-model="query.sitecode" placeholder="请输入站点编码" @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="工单状态：">
                <el-input v-model="query.Workorderstatus" placeholder="请输入工单状态" @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="工单编号：">
                <el-input v-model="query.code" placeholder="请输入工单编号" @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="查询类型：">
                <el-select v-model="query.ishistory" placeholder="请选择查询类型">
                  <el-option label="当天工单" :value="true"></el-option>
                  <el-option label="历史工单" :value="false"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="6">
            <div class="fr" style="margin-top: 0">
              <el-button @click="getMore(1)" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-search'">查询</el-button>
              <el-button @click="resetQueryForm" icon="el-icon-refresh">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-col :span="18" class="SearchResult">查询结果</el-col>
        <el-col :span="6">
          <div class="fr" style="margin-top: 0">
            <el-button @click="showImport" type="success" icon="el-icon-upload2">导入</el-button>
            <el-button @click="handleWrite(0)"  type="success" :disabled="Loading" icon="el-icon-plus">添加</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table :data="tableList" v-loading="Loading" style="margin-top: 15px">
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template></el-table-column>
        <el-table-column prop="area" label="区域" width="80"></el-table-column>
        <el-table-column prop="towns" label="乡镇" width="200" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="code" label="工单编号" width="190" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="workorderstatus" label="工单状态" width="82"></el-table-column>
        <el-table-column prop="sitetype" label="站点类型" width="70" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="sitecode" label="站点编码" width="200" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="sitename" label="站点名称" width="200" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="siteid" label="运维站点ID" width="160" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="starttime" label="停电开始时间" width="140" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="receipttime" label="来电时间" width="140" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="powerstarttime" label="开始发电时间" width="140" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="endgenerationtime" label="结束发电时间" width="140" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="maintenancepersonnel" label="网格" width="70" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="maintenancepersonnelcontact" label="电话" width="190" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="services" label="购买发电服务" width="100" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="batteryvoltage" label="电池电压V" width="80" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="loadcurrent" label="负载电流A" width="80" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="batterypack1" label="电池组1电流" width="90" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="操作" fixed="right" width="130">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleWrite(2, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="center">
        <el-pagination @current-change="getMore" @size-change="changeSize" :page-sizes="[10, 20, 30, 50]"
                       :current-page="pagination.currentPage" :page-size="pagination.pageSize" :total="pagination.total"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
    </div>

    <div v-show="showWrite">
      <layuiTitle title="添加发电任务" v-if="WriteState === 0"></layuiTitle>
      <Details :WriteState="WriteState" @fatherClose="closeWrite" ref="Details" @fatheretMore="getMore(pagination.currentPage)"
      @fathersetData1="setData1" @fathersetData2="setData2"  @fathersetData3="setData3" @fathersetData4="setData4"/>
    </div>
    <Import ref="ImportBox" @fatherGetData="getMore(1)"></Import>
  </div>
</template>

<script>
import {JobList, JobInfo, TaskIdMonitoring, TaskIdOperationLog, ImportBBUExcel, GetOperatorSiteList} from 'api/YJGL'
import {GlobalRes} from 'common/js/mixins'
import Details from 'base/YJGL/TaskList'
import Import from 'base/Import'
import layuiTitle from 'base/layui-title'
export default {
  name: 'TaskList',
  mixins: [GlobalRes],
  data () {
    return {
      // 查询相关属性
      id: '',
      query: {
        areaname: '',
        code: '',
        Workorderstatus: '',
        isarchived: false,
        ishistory: false,
        sitecode: '',
        sitename: ''
      },
      dictionaryList: {},
      Loading: false,
      tableList: [],
      // 分页相关属性
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      },
      tableData1: {},
      tableData2: [],
      tableData3: [],
      tableData4: {},
      showWrite: false,
      WriteState: 2 // 1为编辑 2为查看

    }
  },

  activated () {
    this.getMore(1)
    this.$refs.ImportBox.searchName = '油机调度任务工单导入'
    this.$refs.ImportBox.GetTemplateInfo()
  },
  methods: {
    getMore (e) {
      this.Loading = true
      this.pagination.currentPage = e
      this.$axios.get(JobList,
        {
          params: Object.assign({}, this.query, {
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
    showImport () {
      this.$refs.ImportBox.Open()
      this.$refs.ImportBox.uploadURL = ImportBBUExcel
      this.$refs.ImportBox.fileName = '错误油机调度任务工单导入数据'
    },
    // 重置表单按钮
    resetQueryForm () {
      Object.assign(this.$data.query, this.$options.data().query)
      // console.log(this.query)
      this.getMore(1)
    },
    setData1 () {
      let params = { id: this.id }
      if (this.tableData1) {
        // this.$data.tableData = {}
        Object.assign(this.$data.tableData1, this.$options.data().tableData1)
      }
      this.$axios.get(JobInfo, {
        params
      }).then(res => {
        if (res.success) {
          try {
            this.tableData1 = res.data
            if (this.tableData1) {
              this.$nextTick(this.$refs.Details.setWriteData1(this.tableData1))
              return true
            } else {
              return false
            }
          } catch (e) {
            console.log(e)
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    setData2 () {
      let params = { id: this.id }
      if (this.tableData2) {
        Object.assign(this.$data.tableData2, this.$options.data().tableData2)
      }
      this.$axios.get(TaskIdOperationLog, {
        params
      }).then(res => {
        if (res.success) {
          try {
            this.tableData2 = res.data.list
            this.$nextTick(this.$refs.Details.setWriteData2(this.tableData2))
          } catch (e) {
            console.log(e)
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    setData3 () {
      let params = { id: this.id }
      if (this.tableData3) {
        Object.assign(this.$data.tableData3, this.$options.data().tableData3)
      }
      this.$axios.get(TaskIdMonitoring, {
        params
      }).then(res => {
        if (res.success) {
          try {
            this.tableData3 = res.data.list
            this.$nextTick(this.$refs.Details.setWriteData3(this.tableData3))
          } catch (e) {
            console.log(e)
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    setData4 () {
      let params = { id: this.tableData1.resourceid }
      if (this.tableData4) {
        Object.assign(this.$data.tableData4, this.$options.data().tableData4)
      }
      if (params.id) {
        this.$axios.get(GetOperatorSiteList, {
          params
        }).then(res => {
          if (res.success) {
            try {
              this.tableData4 = res.data
              this.$nextTick(this.$refs.Details.setWriteData4(this.tableData4))
            } catch (e) {
              console.log(e)
            }
          }
        }).catch(error => {
          console.log(error)
        })
      }
    },
    setData () {
      if (this.$nextTick(this.setData1())) {
        this.$refs.Details.setWriteData1(this.tableData1)
        this.showWrite = true
      } else {
        this.$message.error('查询详情失败')
        this.showWrite = false
      }
    },
    handleWrite (state, row) {
      this.$refs.Details.WriteLoading = true
      // console.log(this.tableData)
      this.WriteState = state
      if (state === 0) {
        this.showWrite = true
      }
      if (state) {
        this.id = row.id
        this.setData()
      }
      this.$refs.Details.WriteLoading = false
    },
    handleDelete (index, row) {
      this.$confirm(`您确定要删除 ${row.code} 任务吗？`, '提示', {
        type: 'warning'
      }).then(() => {
        alert('待开发')
        /* this.$axios.post('url', {}).then(res => {
          if (res.errorCode === '200') {
            this.$message.success('成功！')
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err)
        }) */
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
      this.showWrite = false
    }
  },
  components: {
    Details,
    Import,
    layuiTitle
  }
}
</script>

<style scoped>
  @import url('../../../common/css/mixin.css');
  .SearchResult {
    font-size: 18px;
  }
</style>
