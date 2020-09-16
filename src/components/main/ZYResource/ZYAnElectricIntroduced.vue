<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-form :model="Query">
        <el-row>
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="区域选择：">
                <el-cascader v-model="Query.AreaList" :props="QareaProps" @change="changeArea(Query)" ref="csArea" clearable></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="创建时间：">
                <el-date-picker class="tableSelect" v-model="Query.starttime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择开始时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="至：">
                <el-date-picker class="tableSelect" v-model="Query.endtime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择结束时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="站点名称：">
                <el-input v-model="Query.resourcename" placeholder=请输入站点名称 @keyup.enter.native="getMore1(1)"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="6">
            <div class="fr" style="margin-top: 0">
              <el-button @click="getMore1(1)" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-search'">查询</el-button>
              <el-button @click="ResetQuery" icon="el-icon-refresh">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>

      <el-row>
        <el-col :span="4" class="SearchResult">查询结果</el-col>
        <el-col :offset="2" :span="18" class="fr">
          <div class="fr">
            <el-button @click="handleExport" type="success" icon="el-icon-download">导出</el-button>
            <el-button @click="handleWrite(0)" type="success" icon="el-icon-plus">添加</el-button>
          </div>
        </el-col>
      </el-row>

      <el-table :data="tableData" v-loading="Loading" style="margin-top: 15px;">
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template>
        </el-table-column>
        <el-table-column prop="resourcename" label="站点名称" width=""></el-table-column>
        <el-table-column prop="resourcecode" label="站点编码" width=""></el-table-column>
        <el-table-column prop="externalpacking" label="外电是否报装" width="" :formatter="formatState1"></el-table-column>
        <el-table-column prop="poleline" label="有无杆路" width="" :formatter="formatState2"></el-table-column>
        <el-table-column prop="polelinenumber" label="杆路数量" width=""></el-table-column>
        <el-table-column prop="polelineheight" label="杆路高度(米)" width=""></el-table-column>
        <el-table-column prop="polelinelength" label="杆路长度(米)" width=""></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width=""></el-table-column>
        <el-table-column prop="createusername" label="创建人" width=""></el-table-column>
        <el-table-column prop="" label="操作" width="50">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleWrite(2,scope.row)">详情</el-button>
            <el-button type="text" size="mini" @click="handleWrite(1,scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="center">
        <el-pagination @current-change="getMore1" @size-change="changeSize1" :current-page="currentPage"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="total"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
    </div>

    <div class="write" v-show="showWrite">
      <layuiTitle :title="WriteState === 0 ? '添加外电引入' : WriteState === 1 ? '修改外电引入' : '外电引入详情'"></layuiTitle>
      <Detail v-loading="Loading" :DeviceID="DeviceID" :WriteState="WriteState" :DicList="DicList" @fatherClose="WriteClose" ref="Details"
                     @fatherOpenImgBox="OpenImgBox" @fatheretMore="getMore1(currentPage)"></Detail>
    </div>

    <ImgBox ref="ImgBox"></ImgBox>
  </div>
</template>

<script>
import {GetElectricIntroducedList, GetElectricIntroducedExcel} from 'api/api'
import {exportMethod} from 'api/YDSZ'
import {GlobalRes} from 'common/js/mixins'
import layuiTitle from 'base/layui-title'
import ImgBox from 'base/ImgBox'
import Detail from 'base/ZYResource/AnElectricIntroduced'

export default {
  name: 'AnElectricIntroduced',
  mixins: [GlobalRes],
  data () {
    return {
      Query: {
        AreaList: [],
        provinceid: 0,
        cityid: 0,
        areaid: 0,
        resourcename: '',
        starttime: '',
        endtime: ''
      },
      tableData: [],
      Loading: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      DicList: {
      },
      DeviceID: '',
      showWrite: false,
      WriteData: {},
      WriteState: 0 // 0为添加 1为编辑 2为详情
    }
  },
  activated () {
    this.getTable1()
    this.getDicList()
  },
  methods: {
    ResetQuery () {
      Object.assign(Object.assign(this.$data.Query, this.$options.data().Query))
      this.getTable1()
    },
    ResetWrite () {
      Object.assign(Object.assign(this.$data.WriteData, this.$options.data().WriteData))
    },
    getDicList () {

    },
    getTable1 () {
      this.Loading = true
      this.$axios.get(GetElectricIntroducedList, {
        params: {
          PageIndex: 1,
          PageSize: this.pageSize
        }
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
    getMore1 (page) {
      this.currentPage = page
      this.Loading = true
      this.$axios.get(GetElectricIntroducedList, {
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
    formatState1 (row) { return row.externalpacking ? '是' : '否' },
    formatState2 (row) { return row.poleline ? '是' : '否' },
    handleWrite (state, row) {
      this.WriteState = state
      this.DeviceID = row ? row.id : ''
      this.showWrite = true
    },
    WriteClose () {
      this.showWrite = false
      this.ResetWrite()
    },
    OpenImgBox (title, name, list) {
      this.$refs.ImgBox.SetData(title, name, list)
      this.$refs.ImgBox.Open()
      this.WriteState === 2 ? this.$refs.ImgBox.Flag = true : this.$refs.ImgBox.Flag = false
    },
    changeSize1 (page) {
      this.pageSize = page
      this.getMore1(this.currentPage)
    },
    handleExport () {
      this.$confirm(`您确定要导出吗？`, '提示', {
        type: 'info'
      }).then(() => {
        let myObj = {
          method: 'get',
          url: GetElectricIntroducedExcel,
          fileName: '外电引入',
          data: this.Query
        }
        exportMethod(myObj)
      })
    }
  },
  components: {Detail, layuiTitle, ImgBox}
}
</script>

<style scoped>
  @import url('../../../common/css/mixin.css');
</style>
