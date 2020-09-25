<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-form :model="Query">
        <el-row>
          <el-col :span="18">
            <el-col :span="8">
              <div  @click="sparetypeidShow=true">
                <el-form-item class="form-item" label="备件类型">
                  <el-input v-model="Query.typename" readonly placeholder="请选择备件类型"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <el-form-item label="备件型号：">
                <el-input v-model="Query.sparemodel" placeholder="请填写备件型号"  @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="6">
            <div class="fr" style="margin-top: 0">
              <el-button  @click="getMore(1)" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-search'">查询</el-button>
              <el-button @click="ResetQuery" icon="el-icon-refresh">重置</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <p class="SearchResult">查询结果</p>
          </el-col>
          <el-col :span="6">
            <div class="fr" style="margin-top: 0">
              <el-button @click="handleExport" type="success" icon="el-icon-download">导出</el-button>
              <el-button @click="showImport" type="success" icon="el-icon-upload2">导入</el-button>
              <el-button @click="handleWrite(0)"  type="success" :disabled="Loading" icon="el-icon-plus">添加</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="tableData" v-loading="Loading" ref="table1" style="margin-top: 15px;">
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template>
        </el-table-column>
        <el-table-column prop="cityname" label="地市"></el-table-column>
        <el-table-column prop="sparemodel" label="备件型号"></el-table-column>
        <el-table-column prop="typename" label="备件类型"></el-table-column>
        <el-table-column prop="manufacturersname" label="厂家编码"></el-table-column>
        <el-table-column prop="remark" label="说明"></el-table-column>
        <el-table-column prop="realityname" label="提交人"></el-table-column>
        <el-table-column prop="createtime" label="提交时间"></el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleWrite(2,scope.row)">详情</el-button>
            <el-button type="text" size="mini" @click="handleWrite(1, scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="handle2(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="center">
        <el-pagination @current-change="getMore" @size-change="changeSize1" :current-page="currentPage"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="total"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
    </div>
    <div class="write" v-show="showWrite">
      <layuiTitle :title="WriteState === 0 ? '添加备件型号' : WriteState === 1 ? '编辑备件型号' : '备件型号详情'"></layuiTitle>

      <Details :WriteState="WriteState"
               @fatheretMore="getMore(currentPage)" @fatherClose="WriteClose" ref="Details"></Details>

    </div>
    <el-dialog top="1%" :visible.sync="sparetypeidShow" title="选择备件类型" width="80%" :before-close="sparetypeClose">
      <Selsparetypeid  @Selsparetypeid="Selsparetypeid"/>
    </el-dialog>
    <Import ref="ImportBox" @fatherGetData="getMore(1)"></Import>
  </div>
</template>

<script>
import Import from 'base/Import'
import {exportMethod} from 'api/YDSZ'
import { GlobalRes } from 'common/js/mixins'
import layuiTitle from 'base/layui-title'
import {GetSpareConfigList, GetSpareConfigIdList, DeleteSpareConfig, SpareConfigImport, SpareConfigExport} from 'api/BJGL'
import Details from 'base/SpareManagement/SpareconModel'
import Selsparetypeid from 'base/SpareManagement/Selsparetypeid'
export default {
  name: 'SpareconModel',
  mixins: [GlobalRes],
  data () {
    return {
      Query: {
        typename: null,
        sparemodel: null,
        sparetypeid: null
      },
      sparetypeidShow: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      Loading: false,
      tableData: [],
      tableLoading: false,
      showWrite: false,
      WriteState: 0 // 0为添加 1为编辑 2为查看
    }
  },
  activated () {
    this.getData1()
    this.$refs.ImportBox.searchName = ''
    this.$refs.ImportBox.GetTemplateInfo()
  },
  methods: {
    handleExport () {
      this.$confirm(`您确定要导出吗？`, '提示', {
        type: 'info'
      }).then(() => {
        let myObj = {
          method: 'post',
          url: SpareConfigExport,
          fileName: '备件型号',
          data: this.Query.sparetypeid
        }
        exportMethod(myObj)
      })
    },
    showImport () {
      this.$refs.ImportBox.Open()
      this.$refs.ImportBox.uploadURL = SpareConfigImport
      this.$refs.ImportBox.fileName = '错误备件型号列表导入数据'
    },
    sparetypeClose () { this.sparetypeidShow = !this.sparetypeidShow },
    Selsparetypeid (name, id) {
      this.sparetypeidShow = false
      this.Query.sparetypeid = id
      this.Query.typename = name
    },
    ResetQuery () {
      Object.assign(this.$data, this.$options.data.call(this))
      this.Query.sparetypeid = null
      this.getData1()
    },
    getData1 () {
      this.Loading = true
      this.$axios.get(GetSpareConfigList, {
        params: {
          PageIndex: 1,
          PageSize: 10
        }}).then(res => {
        this.Loading = false
        if (res.errorCode !== '200') return this.$message.error(res.msg)
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    getMore (page) {
      this.currentPage = page
      this.Loading = true
      this.$axios.get(GetSpareConfigList, {params: Object.assign({}, this.Query, {
        PageIndex: this.currentPage,
        PageSize: this.pageSize
      })}).then(res => {
        this.Loading = false
        if (res.errorCode !== '200') return this.$message.error(res.msg)
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    changeSize1 (page) {
      this.pageSize = page
      this.getMore(this.currentPage)
    },
    WriteClose () { this.showWrite = false },
    handleWrite (state, row) {
      this.WriteState = state
      this.showWrite = true
      if (state) {
        this.$refs.Details.Loading = true
        this.$axios.get(GetSpareConfigIdList, {
          params: {
            Id: row.id
          }
        }).then(res => {
          this.$refs.Details.Loading = false
          this.$refs.Details.setWriteData(res.data)
        }).catch(err => {
          this.$refs.Details.Loading = false
          console.log(err)
        })
      }
    },
    handle2 (row) {
      this.$confirm(`您确定要删除 ${row.code} 设备吗？`, '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios.delete(DeleteSpareConfig, {
          params: {id: row.id}
        }).then(res => {
          if (res.errorCode === '200') {
            this.getData1()
            this.$message.success('删除成功！')
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    }

  },
  components: {
    layuiTitle,
    Details,
    Selsparetypeid,
    Import
  }
}
</script>

<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
