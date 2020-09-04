<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-form :model="Query">
        <el-row>
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="区域：">
                <el-cascader v-model="Query.AreaList" :props="QareaProps" @change="changeArea(Query)" ref="csArea" clearable></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="站点名称：">
                <el-input v-model="Query.resourcename" placeholder=请输入站点名称 @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="设备状态：">
                <el-select class="searchSelect" v-model="Query.dayfacetypes">
                  <el-option label="请选择" :value="null"></el-option>
                  <el-option v-for="i in DicList.state" :key="i.value" :label="i.text" :value="i.value"></el-option>
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
            <!--<el-button @click="handleWrite(0)" type="success" icon="el-icon-plus">添加</el-button>-->
            <el-button @click="handleExport" type="success" icon="el-icon-download">导出</el-button>
          </div>
        </el-col>
      </el-row>

      <el-table :data="tableData" v-loading="Loading" ref="table1" style="margin-top: 15px;">
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template>
        </el-table-column>
        <el-table-column prop="code" label="设备编码"></el-table-column>
        <el-table-column prop="resourcename" label="站点名称"></el-table-column>
        <el-table-column prop="resourcecode" label="站点编码"></el-table-column>
        <el-table-column prop="cityname" label="地市"></el-table-column>
        <el-table-column prop="areaname" label="区域"></el-table-column>
        <el-table-column prop="accessdate" label="入网日期"></el-table-column>
        <el-table-column prop="statename" label="设备状态"></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width=""></el-table-column>
        <el-table-column prop="createusername" label="创建人" width=""></el-table-column>
        <el-table-column label="操作" width="50">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleWrite(2,scope.row)">详情</el-button>
            <!--<el-button type="text" size="mini" @click="handleWrite(1, scope.row)">编辑</el-button>-->
            <!--<el-button type="text" size="mini" @click="handle2(scope.row)">删除</el-button>-->
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
      <layuiTitle :title="WriteState === 0 ? '添加充电桩' : WriteState === 1 ? '编辑充电桩' : '充电桩详情'"></layuiTitle>

      <Details :WriteState="WriteState" :DicList="DicList" @fatherOpenImgBox="OpenImgBox"
               @fatheretMore="getMore(currentPage)" @fatherClose="WriteClose" ref="Details"></Details>

    </div>

    <ImgBox ref="ImgBox"></ImgBox>
  </div>
</template>

<script>
import {DictionaryInfoList, ChargingPileList, ChargingPileInfo, DelEquipment, GetChargingPileExcel} from 'api/api'
import {exportMethod} from 'api/YDSZ'
import {GlobalRes} from 'common/js/mixins'
import Details from 'base/Resource/ChargingPile'
import layuiTitle from 'base/layui-title'
import ImgBox from 'base/ImgBox'

export default {
  name: 'ChargingPile',
  mixins: [GlobalRes],
  data () {
    return {
      Query: {
        AreaList: [],
        provinceid: null,
        cityid: null,
        areaid: null,
        resourcename: '',
        dayfacetypes: null,
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
      WriteLoading: false
    }
  },
  activated () {
    this.getData1()
    this.getDic()
  },
  methods: {
    ResetQuery () {
      Object.assign(this.$data.Query, this.$options.data().Query)
      this.getData1()
    },
    getData1 () {
      this.Loading = true
      this.$axios.get(ChargingPileList, {
        params: {
          PageIndex: 1,
          PageSize: this.pageSize
        }
      }).then(res => {
        this.Loading = false
        if (res.errorCode !== '200') return this.$message.error(res.msg)
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    getMore (page) {
      this.currentPage = page
      this.Loading = true
      this.$axios.get(ChargingPileList, {params: Object.assign({}, this.Query, {
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
    getDic () {
      let arr = ['充电桩设备厂家', '设备状态', '设备产权单位', '设备单位', '充电桩设备型号', '设备维护单位', '设备存放点类型', '充电桩设备细分类型', '充电桩设备供电类型', '充电桩设备门禁厂家']
      this.$axios.post(DictionaryInfoList, arr).then(res => {
        if (res.errorCode === '200') {
          let data = res.data
          this.DicList.propertyrightunit = data.filter(i => { return i.type === '设备产权单位' })
          this.DicList.unit = data.filter(i => { return i.type === '设备单位' })
          this.DicList.manufacturer = data.filter(i => { return i.type === '充电桩设备厂家' })
          this.DicList.maintenanceunit = data.filter(i => { return i.type === '设备维护单位' })
          this.DicList.models = data.filter(i => { return i.type === '充电桩设备型号' })
          this.DicList.state = data.filter(i => { return i.type === '设备状态' })
          this.DicList.facilitytype = data.filter(i => { return i.type === '充电桩设备细分类型' })
          this.DicList.powersupply = data.filter(i => { return i.type === '充电桩设备供电类型' })
          this.DicList.accesscontrolmanufacturer = data.filter(i => { return i.type === '充电桩设备门禁厂家' })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    formatState (row) { return this.DicList.state[row.state] },

    handleWrite (state, row) {
      this.WriteState = state
      this.showWrite = true
      if (state) {
        this.$refs.Details.Loading = true
        this.$axios.get(ChargingPileInfo, {
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
    WriteClose () { this.showWrite = false },
    OpenImgBox (title, name, list) {
      this.$refs.ImgBox.SetData(title, name, list)
      this.$refs.ImgBox.Open()
      this.WriteState === 2 ? this.$refs.ImgBox.Flag = true : this.$refs.ImgBox.Flag = false
    },
    handle2 (row) {
      this.$confirm(`您确定要删除 ${row.code} 设备吗？`, '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios.delete(DelEquipment, {
          params: {id: row.id}
        }).then(res => {
          if (res.errorCode === '200') {
            this.getMore(this.currentPage)
            this.$message.success('删除成功！')
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    handleExport () {
      this.$confirm(`您确定要导出吗？`, '提示', {
        type: 'info'
      }).then(() => {
        let myObj = {
          method: 'get',
          url: GetChargingPileExcel,
          fileName: '充电桩',
          data: this.Query
        }
        exportMethod(myObj)
      })
    }
  },
  components: { layuiTitle, Details, ImgBox }
}
</script>

<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
