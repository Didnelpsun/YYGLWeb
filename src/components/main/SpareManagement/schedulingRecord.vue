<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-form :model="Query">
        <el-row >
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="备件类型：">
                <el-input v-model="Query.typename" placeholder="请填写备件类型"  @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="备件型号：">
                <el-input v-model="Query.sparemodel" placeholder="请填写备件型号"  @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="备件编码：">
                <el-input v-model="Query.code" placeholder="请填写备件编码"  @keyup.enter.native="getMore(1)"></el-input>
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
          <!--<el-col :span="6">
            <div class="fr" style="margin-top: 0">
              <el-button @click="handleWrite(0)"  type="success" :disabled="Loading" icon="el-icon-plus">添加</el-button>
            </div>
          </el-col>-->
        </el-row>
      </el-form>
      <el-table :data="tableData" v-loading="Loading" ref="table1" style="margin-top: 15px;">
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template>
        </el-table-column>
        <el-table-column prop="cityname" label="地市"></el-table-column>
        <el-table-column prop="areaname" label="区域"></el-table-column>
        <el-table-column prop="schedulingtype" :formatter="schedulingtypeShow" label="调度类型"></el-table-column>
        <el-table-column prop="typename" label="备件类型"></el-table-column>
        <el-table-column prop="code" label="备件编码"></el-table-column>
        <el-table-column prop="manufacturername" label="备件厂家"></el-table-column>
        <el-table-column prop="sparemodel" label="备件型号"></el-table-column>
        <el-table-column prop="instate"  :formatter="instateShow" label="备件状态"></el-table-column>
        <el-table-column prop="outdepotname" label="出库存放点"></el-table-column>
        <el-table-column prop="indepotname" label="入库存放点"></el-table-column>
        <el-table-column prop="applicanttime" label="申请时间"></el-table-column>
        <el-table-column prop="applicanname" label="申请人"></el-table-column>
        <el-table-column prop="outauditstatus" :formatter="statusshow" label="审核结果"></el-table-column>
        <el-table-column prop="outaudname" label="确认人"></el-table-column>
        <el-table-column prop="outaudittime" label="确认时间"></el-table-column>
        <el-table-column label="操作" fixed="right" width="60">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleWrite(2,scope.row)">详情</el-button>
       <!--     <el-button type="text" size="mini" @click="handleWrite(1, scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="handle2(scope.row)">删除</el-button>-->
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
      <layuiTitle :title="WriteState === 0 ? '添加调度日志' : WriteState === 1 ? '调度日志记录' : '调度日志详情'"></layuiTitle>

      <Details :WriteState="WriteState"
               @fatheretMore="getMore(currentPage)" @fatherClose="WriteClose" ref="Details"></Details>

    </div>

  </div>
</template>

<script>
import layuiTitle from 'base/layui-title'
import {Operationlog, Schedulingdetails} from 'api/BJGL'
import Details from 'base/SpareManagement/schedulingRecord'
export default {
  name: 'schedulingRecord',
  data () {
    return {
      Query: {
        typename: null,
        code: null,
        sparemodel: null
      },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      Loading: false,
      tableData: [],
      tableLoading: false,
      showWrite: false,
      WriteState: 0, // 0为添加 1为编辑 2为查看
      WriteLoading: false
    }
  },
  activated () {
    this.getData1()
  },
  methods: {
    statusshow (val) {
      val = parseInt(val.outauditstatus)
      return val === 4 ? '通过' : val === 3 ? '不通过' : val === 2 ? '待审核' : ''
    },
    instateShow (val) {
      val = parseInt(val.instate)
      return val === 1 ? '在网' : val === 2 ? '备件' : val === 3 ? '故障' : val === 4 ? '维修' : '报废'
    },
    schedulingtypeShow (val) {
      val = parseInt(val.schedulingtype)
      return val === 1 ? '新增' : val === 2 ? '报修' : val === 3 ? '送修' : val === 4 ? '报废' : val === 5 ? '借用' : val === 6 ? '替换' : val === 7 ? '归还' : val === 8 ? '点验' : val === 9 ? '上站' : val === 10 ? '领用' : '返修'
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
    },
    ResetQuery () {
      Object.assign(this.$data, this.$options.data.call(this))
      this.getData1()
    },
    getMore (page) {
      this.currentPage = page
      this.Loading = true
      this.$axios.get(Operationlog, {params: Object.assign({}, this.Query, {
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
