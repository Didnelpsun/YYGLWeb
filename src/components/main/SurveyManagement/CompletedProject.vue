<template>
  <div class="content" v-loading="ExportLoading" element-loading-text="正在导出,请等待！" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="main" v-show="!showWrite">
      <el-form :model="Query">
        <el-row>
          <!--选择器-->
          <el-col :span="18">
            <el-row>
              <el-col :span="8">
                <el-form-item label="区域：">
                  <el-cascader v-model="Query.AreaList" :props="QareaProps" @change="changeArea(Query)" ref="queryInput"></el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="需求名称：">
                  <el-input v-model="Query.demandname" placeholder="请输入需求名称" @keyup.enter.native="getMore(1)"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="需求单号：">
                  <el-input v-model="Query.demandno" placeholder="请输入需求单号" @keyup.enter.native="getMore(1)"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="需求批次：">
                  <el-input v-model="Query.demandbatch" placeholder="请输入需求批次" @keyup.enter.native="getMore(1)"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开始日期：">
                  <el-date-picker class="tableSelect" v-model="Query.starttime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择开始时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="结束日期：">
                  <el-date-picker class="tableSelect" v-model="Query.endtime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择结束时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="站点编码：">
                  <el-input v-model="Query.resourcecode" placeholder="请输入站点编码" @keyup.enter.native="getMore(1)"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="站点名称：">
                  <el-input v-model="Query.resourcename" placeholder="请输入站点名称" @keyup.enter.native="getMore(1)"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="任务单号：">
                  <el-input v-model="Query.taskno" placeholder="请输入任务单号" @keyup.enter.native="getMore(1)"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="建站方式：">
                  <el-select class="searchSelect" v-model="Query.constructionmode">
                    <el-option v-for="i in DicList.constructionmode" :key="i.value" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <div class="fr" style="margin-top:0">
              <el-button @click="getMore(1)" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-search'">查询</el-button>
              <el-button @click="ResetQuery" icon="el-icon-refresh">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-col :span="4" class="SearchResult">查询结果</el-col>
        <el-col :offset="2" :span="18" class="fr">
          <div class="fr">
            <el-button @click="BatchExport" type="success" icon="el-icon-plus">批量导出项目明细</el-button>
          </div>
        </el-col>
      </el-row>

      <el-table :data="tableData" v-loading="Loading" style="margin-top: 15px;">
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template>
        </el-table-column>
        <el-table-column prop="cityname" label="地市" width="80"></el-table-column>
        <el-table-column prop="areaname" label="区域" width="80"></el-table-column>
        <el-table-column prop="taskno" label="任务单号" width="120"></el-table-column>
        <el-table-column prop="demandname" label="需求名称" width="120"></el-table-column>
        <el-table-column prop="demandno" label="需求单号" width=""></el-table-column>
        <el-table-column prop="demandbatch" label="需求批次" width=""></el-table-column>
        <el-table-column prop="resourcename" label="站点名称" width="120"></el-table-column>
        <el-table-column prop="resourcecode" label="站点编码" width=""></el-table-column>
        <el-table-column prop="constructionmodename" label="建设方式" width=""></el-table-column>
        <el-table-column prop="taskstatename" label="审核状态" width=""></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width=""></el-table-column>
        <el-table-column prop="" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleWrite(2,scope.row)">详情</el-button>
            <el-button type="text" @click="handleExport(scope.$index, scope.row)" size="mini">导出项目资料</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="center">
        <el-pagination @current-change="getMore" @size-change="changeSize" :current-page="currentPage"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="total"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
    </div>

    <ImgBox ref="ImgBox"></ImgBox>
  </div>
</template>

<script>
import {GetProjectList, ProjectDetailExcel} from 'api/SurveyManagement'
import {GlobalRes} from 'common/js/mixins'
import layuiTitle from 'base/layui-title'
import ImgBox from 'base/ImgBox'
import {mapMutations} from 'vuex'
import {reqURL, DictionaryInfoList} from 'api/api'

export default {
  name: 'CompletedProject',
  mixins: [GlobalRes],
  data () {
    return {
      Query: {
        AreaList: [
        ],
        provinceid: null, // 省份
        cityid: null, // 城市
        areaid: null, // 区域
        demandname: '',
        resourcename: '',
        constructionmode: null,
        demandno: '',
        starttime: '',
        endtime: '',
        demandbatch: '',
        resourcecode: '',
        taskno: '',
        taskstate: 4
      },
      tableData: [],
      Loading: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      DicList: {
      },
      showWrite: false,
      ExportLoading: false,
      WriteData: {},
      WriteState: 0 // 0为添加 1为编辑 2为详情
    }
  },
  activated () {
    this.initDictionariesArray()
    this.getTable()
  },
  methods: {
    initDictionariesArray () {
      let arr = ['勘察建站方式', '建站模式', '勘察审核状态', '勘察运营商']
      this.$axios.post(DictionaryInfoList, arr).then(res => {
        if (res.errorCode === '200') {
          this.DicList.models = res.data.filter(i => {
            return i.type === '建站模式'
          })
          this.DicList.taskstate = res.data.filter(i => {
            return i.type === '勘察审核状态'
          })
          this.DicList.constructionmode = res.data.filter(i => {
            return i.type === '勘察建站方式'
          })
          this.DicList.rawoperator = res.data.filter(i => {
            return i.type === '勘察运营商'
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    ResetQuery () {
      Object.assign(Object.assign(this.$data.Query, this.$options.data().Query))
      this.getTable()
    },
    ResetWrite () {
      Object.assign(Object.assign(this.$data.WriteData, this.$options.data().WriteData))
    },
    getTable () {
      this.Loading = true
      this.$axios.get(GetProjectList, {params: Object.assign({}, this.Query, {
        PageIndex: 1,
        PageSize: this.pageSize
      })}).then(res => {
        this.Loading = false
        if (res.errorCode === '200') {
          this.tableData = res.data.list
          this.total = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    getMore (page) {
      this.currentPage = page
      this.Loading = true
      this.$axios.get(GetProjectList, {
        params: Object.assign({}, this.Query, {
          PageIndex: page,
          PageSize: this.pageSize
        })
      }).then(res => {
        this.Loading = false
        if (res.errorCode === '200') {
          this.tableData = res.data.list
          this.total = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    BatchExport () {
      this.$confirm(`您确定要批量导出当前列表项目明细吗？`, '提示', {
        type: 'info'
      }).then(() => {
        this.ExportLoading = true
        this.$axios.get(ProjectDetailExcel, {
          params: Object.assign({}, this.Query)
        }).then(res => {
          this.ExportLoading = false
          if (res.errorCode === '200') {
            window.location.href = reqURL + '/' + res.msg
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.ExportLoading = false
          this.$message.error(err)
        })
      })
    },
    handleExport (index, row) {
      this.$confirm(`您确定要导出当前项目资料吗？`, '提示', {
        type: 'info'
      }).then(() => {
        window.location.href = reqURL + '/' + row.excelurl
      })
    },
    handleWrite (state, row) {
      let data = {
        id: row.id,
        state: state,
        taskstate: row.taskstatename,
        from: 'CompletedProject'
      }
      this.setSurveyInfo(data)
      if (row.constructionmodename === '存量站') {
        this.$router.push({name: 'StockStation'})
        this.$emit('handleChange', 'StockStation', '68574cc1-6d88-4d03-a9c0-4493b0c0754b')
        this.setSurveyInfoType(4)
      } else if (row.constructionmodename === '新建站') {
        this.$router.push({name: 'NewBuildStation'})
        this.$emit('handleChange', 'NewBuildStation', '68574cc1-6d88-4d03-a9c0-4493b0c0754b')
        this.setSurveyInfoType(4)
      }
    },
    changeSize (page) {
      this.pageSize = page
      this.getMore(this.currentPage)
    },
    ...mapMutations({
      setSurveyInfo: 'SET_COMPLETEDPROJECT_INFO',
      setSurveyInfoType: 'SET_SURVEYINFOTYPE'
    })
  },
  components: {layuiTitle, ImgBox}
}
</script>

<style scoped>
  @import url('../../../common/css/mixin.css');
</style>
