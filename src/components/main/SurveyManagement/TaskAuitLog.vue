<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-form :data="query" ref="NodeQueryForm">
        <el-row>
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="开始时间：">
                <el-date-picker class="tableSelect" v-model="query.starttime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择开始时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结束时间：">
                <el-date-picker class="tableSelect" v-model="query.endtime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择结束时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="需求名称：">
                <el-input class="searchSelect" v-model="query.resourcename" placeholder="请输入需求名称" @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="站点编码：">
                <el-input v-model="query.resourcecode" placeholder="请输入站点编码" @keyup.enter.native="getMore(1)"></el-input>
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
        <el-col :offset="2" :span="18" class="fr">
          <div class="fr">
            <el-button @click="SiteExport" type="success" icon="el-icon-download">导出</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table :data="tableList" v-loading="Loading" style="margin-top: 15px">
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template></el-table-column>
        <el-table-column prop="resourcecode" label="站点编码" width=""></el-table-column>
        <el-table-column prop="resourcename" label="需求名称" width=""></el-table-column>
        <el-table-column prop="steps" label="操作步骤" width="100"></el-table-column>
        <el-table-column prop="auitstate" label="审核状态" width=""></el-table-column>
        <el-table-column prop="auidopinion" label="审核意见" width="100"></el-table-column>
        <el-table-column prop="createusername" label="审核人" width=""></el-table-column>
        <el-table-column prop="createtime" label="审核时间" width="100"></el-table-column>
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
import { GetTaskAuitLogList, GetTaskAuitLogExcel } from 'api/SurveyManagement'
import {exportMethod} from 'api/YDSZ'
import { GlobalRes } from 'common/js/mixins'

export default {
  name: 'Battery',
  // 合并对象，必须以文件名:[导出对象名]的格式
  mixins: [GlobalRes],
  data () {
    return {
      // 查询相关属性
      query: {
        resourcename: '',
        starttime: '',
        endtime: '',
        resourcecode: ''
      },
      // 加载
      Loading: false,
      isShow: false,
      tableList: [
      ],
      tableData: {},
      // 分页相关属性
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      },
      showWrite: false
    }
  },
  activated () {
    this.getMore(1)
  },
  created () {
  },
  methods: {
    getMore (e) {
      this.Loading = true
      this.pagination.currentPage = e
      this.$axios.get(GetTaskAuitLogList,
        {
          params: {
            pageIndex: e,
            pageSize: this.pagination.pageSize,
            resourcename: this.query.resourcename,
            resourcecode: this.query.resourcecode,
            starttime: this.query.starttime,
            endtime: this.query.endtime
          }
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
      Object.assign(this.$data.query, this.$options.data().query)
      this.getMore(1)
    },
    // 分页处理函数
    changeSize (page) {
      this.pagination.pageSize = page
      this.getMore(this.pagination.currentPage)
    },
    SiteExport () {
      this.$confirm(`您确定要导出吗？`, '提示', {
        type: 'info'
      }).then(() => {
        let myObj = {
          method: 'get',
          url: GetTaskAuitLogExcel,
          fileName: '任务审核记录',
          data: this.query
        }
        exportMethod(myObj)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
