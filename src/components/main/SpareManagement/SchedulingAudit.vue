<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-form :model="Query">
        <el-row >
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="调度类型：">
               <el-select v-model="Query.schedulingtype">
                 <el-option v-for="i in DicList.schedulingtype" :key="i.id" :label="i.text" :value="i.value" placeholder="请选择调度类型"></el-option>
               </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="存放点：">
                <el-input v-model="Query.depotsid" placeholder="请填写类型编码"  @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="备件类型：">
                  <el-input v-model="Query.sparepartstypeid" placeholder="请填写备件类型"  @keyup.enter.native="getMore(1)"></el-input>
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
          <!-- <el-col :span="6">
            <div class="fr" style="margin-top: 0">
              <el-button @click="handleWrite(0)"  type="success" :disabled="Loading" icon="el-icon-plus">添加</el-button>
            </div>
          </el-col> -->
        </el-row>
      </el-form>
      <el-table :data="tableData" v-loading="Loading" ref="table1" style="margin-top: 15px;">
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template>
        </el-table-column>
        <el-table-column prop="cityname" label="地市"></el-table-column>
        <el-table-column prop="areaname" label="区域"></el-table-column>
        <el-table-column prop="schedulingtype" :formatter="schedulingtypeShow" label="调度类型"></el-table-column>
        <el-table-column prop="inqrcode" label="备件编码"></el-table-column>
        <el-table-column prop="sparepartstypeid" label="备件类型"></el-table-column>
        <el-table-column prop="manufacturerid" label="设备厂家"></el-table-column>
        <el-table-column prop="" label="备件型号"></el-table-column>
        <el-table-column prop="instate"  label="备件状态"></el-table-column>
        <el-table-column prop="depotsid" label="存放点"></el-table-column>
        <el-table-column prop="indepotsid" label="入库存放点"></el-table-column>
        <el-table-column prop="applicantid" label="申请时间"></el-table-column>
        <el-table-column prop="applicanttime" label="申请人"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="Audit(scope.row)">审核</el-button>
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
      <layuiTitle title="调度审核详情"></layuiTitle>

      <Details  :DicList="DicList"
               @fatheretMore="getMore(currentPage)" @fatherClose="WriteClose" ref="Details"></Details>

    </div>

  </div>
</template>

<script>
import layuiTitle from 'base/layui-title'
import {DictionaryInfoList} from 'api/api'
import {Operationlog, Schedulingdetails} from 'api/BJGL'
import Details from 'base/SpareManagement/SchedulingAudit'
export default {
  name: 'SchedulingAudit',
  data () {
    return {

      Query: {
        schedulingtype: null,
        depotsid: null,
        sparepartstypeid: null
      },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      Loading: false,
      tableData: [],
      tableLoading: false,
      showWrite: false,
      WriteLoading: false,
      DicList: {Belongtype: []}
    }
  },
  activated () {
    this.getData1()
    this.getDic()
  },
  methods: {

    schedulingtypeShow (val) {
      return val === 1 ? '新增' : val === 2 ? '报修' : val === 3 ? '送修' : val === 4 ? '报废' : val === 5 ? '借用' : val === 6 ? '替换' : val === 7 ? '归还' : val === 8 ? '点验' : val === 9 ? ' 上站' : val === 9 ? ' 领用' : '返修'
    },
    ResetQuery () {
      Object.assign(this.$data, this.$options.data.call(this))
      this.getData1()
    },
    getDic () {
      let arr = ['调度类型']
      this.$axios.post(DictionaryInfoList, arr).then(res => {
        if (res.errorCode === '200') {
          let data = res.data
          this.DicList.schedulingtype = data.filter(i => { return i.type === '调度类型' })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getData1 () {
      this.Loading = true
      this.$axios.get(Operationlog, {
        params: {
          PageIndex: 1,
          PageSize: 10
        }}).then(res => {
        this.Loading = false
        if (res.errorCode !== '200') return this.$message.error(res.msg)
        this.tableData = res.data.list
        this.total = res.data.total
      })
      this.tableData = [{cityname: '武汉'}]
      this.total = 1
    },
    getMore (page) {
      this.currentPage = page
      this.Loading = true
      this.$axios.get(Operationlog, {params: Object.assign({}, this.Query, {
        PageIndex: this.currentPage,
        PageSize: this.pageSize
      })}).then(res => {
        this.Loading = false
        this.getDic()
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
    Audit (row) {
      this.showWrite = true
      this.$refs.Details.Loading = true
      this.$axios.get(Schedulingdetails, {
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
  components: {
    layuiTitle,
    Details
  }
}
</script>

<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
