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
              <el-form-item label="站点名称：">
                <el-input v-model="Query.resourcename" placeholder=请输入站点名称 @keyup.enter.native="getMore1(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label-width="125px" label="设备厂家：">
                <el-select class="searchSelect" v-model="Query.manufacturer">
                  <el-option label="请选择" :value="null"></el-option>
                  <el-option v-for="i in DicList.manufacturer" :key="i.value" :label="i.text" :value="i.value"></el-option>
                </el-select>
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
              <el-button @click="downloadQuery" type="success" icon="el-icon-download">导出</el-button>
              <el-button @click="handleWrite(0)"  type="success" :disabled="Loading" icon="el-icon-plus">添加</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="tableData" v-loading="Loading" ref="table1" style="margin-top: 15px;">
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template>
        </el-table-column>
        <el-table-column prop="cityname" label="地市" width=""></el-table-column>
        <el-table-column prop="areaname" label="区域" width=""></el-table-column>
        <el-table-column prop="code" label="设备编码" width=""></el-table-column>
        <el-table-column prop="resourcename" label="站点名称" width=""></el-table-column>
        <el-table-column prop="resourcecode" label="站点编码" width=""></el-table-column>
        <el-table-column prop="accessdate" label="入网日期" width=""></el-table-column>
        <el-table-column prop="manufacturername" label="设备厂家" width=""></el-table-column>
        <el-table-column prop="createusername" label="创建人" width=""></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width=""></el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleWrite(2,scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="center">
        <el-pagination @current-change="getMore" @size-change="changeSize1" :current-page="currentPage"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="total"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
    </div>
    <div class="write" v-if="showWrite">
      <layuiTitle :title="WriteState === 0 ? '添加开关电源' : WriteState === 1 ? '编辑开关电源' : '开关电源详情'"></layuiTitle>

      <Details :WriteState="WriteState" :DeviceID="DeviceID" :DicList="DicList" @fatherOpenImgBox="OpenImgBox"
               @fatheretMore="getMore(currentPage)" @fatherClose="WriteClose" ref="Details"></Details>

    </div>

    <ImgBox ref="ImgBox"></ImgBox>
  </div>
</template>

<script>
import {GetSwitchingPowerSupplyList, GetSwitchingPowerSupplyExcel} from 'api/SurveyManagement'
import {DictionaryInfoList} from 'api/api'
import {exportMethod} from 'api/YDSZ'
import { GlobalRes } from 'common/js/mixins'
import ImgBox from '../../../base/ImgBox'
import layuiTitle from 'base/layui-title'
import Details from 'base/ZYResource/SwitchingPowerSupply'

export default {
  name: 'SwitchingPowerSupply',
  mixins: [GlobalRes],
  data () {
    return {
      Query: {
        AreaList: [],
        provinceid: 0,
        cityid: 0,
        areaid: 0,
        resourcename: '',
        manufacturer: null,
        starttime: '',
        endtime: ''
      },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      Loading: false,
      tableData: [],
      tableLoading: false,
      DicList: {
        propertyrightunit: [],
        unit: [],
        manufacturer: [],
        maintenanceunit: [],
        models: [],
        state: [],
        facilitytype: [],
        powersupply: [],
        accesscontrolmanufacturer: []
      },

      showWrite: false,
      WriteState: 0, // 0为添加 1为编辑 2为查看
      WriteLoading: false,
      DeviceID: ''
    }
  },
  activated () {
    this.getData1()
    this.getDic()
  },
  methods: {
    ResetQuery () {
      Object.assign(this.$data, this.$options.data.call(this))
      this.getData1()
    },
    getData1 () {
      this.Loading = true
      this.$axios.get(GetSwitchingPowerSupplyList, {
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
      this.$axios.get(GetSwitchingPowerSupplyList, {params: Object.assign({}, this.Query, {
        PageIndex: this.currentPage,
        PageSize: this.pageSize
      })}).then(res => {
        this.Loading = false
        if (res.errorCode !== '200') return this.$message.error(res.msg)
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    getDic () {
      let arr = ['开关电源设备厂家']
      this.$axios.post(DictionaryInfoList, arr).then(res => {
        if (res.errorCode === '200') {
          let data = res.data
          this.DicList.manufacturer = data.filter(i => { return i.type === '开关电源设备厂家' })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    changeSize1 (page) {
      this.pageSize = page
      this.getMore(this.currentPage)
    },
    downloadQuery () {
      this.$confirm(`您确定要导出吗？`, '提示', {
        type: 'info'
      }).then(() => {
        let myObj = {
          method: 'get',
          url: GetSwitchingPowerSupplyExcel,
          fileName: '开关电源',
          data: this.Query
        }
        exportMethod(myObj)
      })
    },
    WriteClose () { this.showWrite = false },
    OpenImgBox (title, name, list) {
      this.$refs.ImgBox.SetData(title, name, list)
      this.$refs.ImgBox.Open()
      this.WriteState === 2 ? this.$refs.ImgBox.Flag = true : this.$refs.ImgBox.Flag = false
    },
    handleWrite (state, row) {
      this.WriteState = state
      this.DeviceID = row.id
      this.showWrite = true
    }

  },
  components: {
    layuiTitle,
    ImgBox,
    Details
  }
}
</script>

<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
