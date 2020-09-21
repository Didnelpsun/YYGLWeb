<template>
  <div class="content">
    <div class="main">
      <el-form ref="NodeQueryForm" :data="query">
        <el-row>
          <!--区域级联选择器-->
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="区域：">
                <el-cascader v-model="query.AreaList" :props="QareaProps" @change="changeArea(query)" ref="queryInput" :options="queryOption"></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="需求名称：">
                <el-input class="searchSelect" v-model="query.demandname" placeholder="请输入需求名称" @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="需求单号：">
                <el-input class="searchSelect" v-model="query.demandno" placeholder="请输入需求单号" @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开始日期：">
                <el-date-picker class="tableSelect" v-model="query.starttime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择开始时间">
                    </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结束日期：">
                <el-date-picker class="tableSelect" v-model="query.endtime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择结束时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="需求批次：">
                <el-input class="searchSelect" v-model="query.demandbatch" placeholder="请输入需求批次" @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="站点编码：">
                <el-input class="searchSelect" v-model="query.resourcecode" placeholder="请输入站点编码" @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="站点名称：">
                <el-input class="searchSelect" v-model="query.resourcename" placeholder="请输入站点名称" @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="任务单号：">
                <el-input v-model="query.taskno" placeholder="请输入任务单号" @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="6">
            <div class="fr" style="margin-top:0">
                <el-button type="primary" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-search'" @click="getMore(1)" style="margin-left:15px">查询</el-button>
                <el-button type="primary" icon="el-icon-refresh" @click="resetQueryForm">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-col :span="4" class="SearchResult">查询结果</el-col>
          <el-col :offset="2" :span="18" class="fr">
            <div class="fr">
              <el-button type="success" @click="SiteExport" icon="el-icon-download" >导出</el-button>
              <!-- <el-button @click="handleWrite(0)" type="success" icon="el-icon-plus">新增</el-button> -->
          </div>
        </el-col>
      </el-row>
      <el-table :data="tableList" v-loading="Loading" style="margin-top: 15px">
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template></el-table-column>
        <el-table-column prop="cityname" label="地市" width="100"></el-table-column>
        <el-table-column prop="areaname" label="区域" width="100"></el-table-column>
        <el-table-column prop="taskno" label="任务单号" width="120"></el-table-column>
        <el-table-column prop="demandname" label="需求名称" width=""></el-table-column>
        <el-table-column prop="demandno" label="需求单号" width="100"></el-table-column>
        <el-table-column prop="demandbatch" label="需求批次" width=""></el-table-column>
        <el-table-column prop="resourcename" label="站点名称" width="120"></el-table-column>
        <el-table-column prop="resourcecode" label="站点编码" width=""></el-table-column>
        <el-table-column prop="constructionmodename" label="建设方式" width=""></el-table-column>
        <el-table-column prop="taskstatename" label="审核状态" width="100"></el-table-column>
        <el-table-column prop="updatetime" label="创建时间" width=""></el-table-column>
        <el-table-column label="操作" width="90">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="checkDetail(scope.row)" v-if="scope.row.taskstatename!=='已完成'">审核</el-button>
            <el-button type="text" size="mini" @click="handleDelete(scope.row)" v-if="scope.row.taskstatename==='待执行'">删除</el-button>
          </template>
        </el-table-column>
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
import layuiTitle from 'base/layui-title'
import {mapMutations} from 'vuex'
import {exportMethod} from 'api/YDSZ'
import { GetWebTaskList, DelTask, GetTaskStateList, GetTaskExcel } from 'api/SurveyManagement'
import { GlobalRes } from 'common/js/mixins'
import Details from './NewBuildStation'

export default {
  name: 'Reservepover',
  // 合并对象，必须以文件名:[导出对象名]的格式
  mixins: [GlobalRes],
  data () {
    return {
      // 查询相关属性
      query: {
        AreaList: [
        ],
        provinceid: null, // 省份
        cityid: null, // 城市
        areaid: null, // 区域
        demandname: '',
        resourcename: '',
        demandno: '',
        starttime: '',
        endtime: '',
        demandbatch: '',
        resourcecode: '',
        taskno: ''
      },
      // 区域查询数组
      queryOption: [],
      // 加载
      Loading: false,
      // 展示列表
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
    this.getState()
  },
  methods: {
    getState () {
      this.$axios.get(GetTaskStateList).then(res => {
        if (res.data != null) {
          this.stateList = res.data
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getMore (e) {
      this.Loading = true
      this.pagination.currentPage = e
      this.$axios.get(GetWebTaskList,
        {
          params: Object.assign({}, this.query, {
            pageIndex: e,
            pageSize: this.pagination.pageSize
          })
        })
        .then(res => {
          this.Loading = false
          if (res.errorCode === '200') {
            this.tableList = res.data.list
            this.pagination.total = res.data.total
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 重置表单按钮
    resetQueryForm () {
      this.queryOption = []
      Object.assign(this.$data.query, this.$options.data().query)
      this.getMore(1)
    },
    // 导出数据
    SiteExport () {
      this.$confirm(`您确定要导出吗？`, '提示', {
        type: 'info'
      }).then(() => {
        let myObj = {
          method: 'get',
          url: GetTaskExcel,
          fileName: '勘察任务',
          data: this.query
        }
        exportMethod(myObj)
      })
    },
    // 分页处理函数
    changeSize (page) {
      this.pagination.pageSize = page
      this.getMore(this.pagination.currentPage)
    },
    // 查看详情函数
    checkDetail (row) {
      let data = {
        id: row.project_id,
        state: 2,
        taskid: row.id,
        taskstate: row.taskstatename,
        from: 'TaskManagement'
      }
      this.setSurveyInfo(data)
      if (row.constructionmodename === '新建站') {
        this.$router.push({name: 'NewBuildStation'})
        this.$emit('handleChange', 'NewBuildStation', 'dc73026f-3906-4f64-a8bd-1a2bc646f1fe')
        this.setSurveyInfoType(2)
      } else if (row.constructionmodename === '存量站') {
        this.$router.push({name: 'StockStation'})
        this.$emit('handleChange', 'StockStation', 'dc73026f-3906-4f64-a8bd-1a2bc646f1fe')
        this.setSurveyInfoType(2)
      }
    },
    handleDelete (row) {
      this.$confirm(`您确定要删除 ${row.resourcename} 任务吗？`, '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios.delete(DelTask, {
          params: {
            id: row.id
          }
        }).then(res => {
          if (res.errorCode === '200') {
            this.getMore(this.pagination.currentPage)
            this.$message.success('删除成功！')
          } else {
            this.$message.error(res.msg)
          }
        }).catch(error => {
          console.log(error)
        })
      }).catch(error => {
        console.log(error)
      })
      // console.log(this.pagination)
    },
    ...mapMutations({
      setSurveyInfo: 'SET_TASKSURVEY_INFO',
      setSurveyInfoType: 'SET_SURVEYINFOTYPE'
    })
  },
  components: {
    layuiTitle,
    Details
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
