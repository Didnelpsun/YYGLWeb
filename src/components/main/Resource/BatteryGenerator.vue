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
            <!--<el-button @click="handleWrite(0)" type="success" icon="el-icon-plus">添加</el-button>-->
          </div>
        </el-col>
      </el-row>

      <el-table :data="tableData" v-loading="Loading" style="margin-top: 15px;">
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template>
        </el-table-column>
        <el-table-column prop="code" label="设备编码" width="110"></el-table-column>
        <el-table-column prop="resourcename" label="站点名称" width=""></el-table-column>
        <el-table-column prop="resourcecode" label="站点编码" width=""></el-table-column>
        <el-table-column prop="cylinderno" label="缸号" width=""></el-table-column>
        <el-table-column prop="devicecode" label="装置编码" width=""></el-table-column>
        <el-table-column prop="cityname" label="地市" width="80"></el-table-column>
        <el-table-column prop="areaname" label="区域" width="100"></el-table-column>
        <el-table-column prop="manufacturername" label="设备厂家" width=""></el-table-column>
        <el-table-column prop="statename" label="设备状态" width=""></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width=""></el-table-column>
        <el-table-column prop="createusername" label="创建人" width=""></el-table-column>
        <el-table-column prop="" label="操作" width="50">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleWrite(2,scope.row)">详情</el-button>
            <!--<el-button type="text" size="mini" @click="handleWrite(1,scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="handle2(scope.row)">删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <div class="center">
        <el-pagination @current-change="getMore1(currentPage)" @size-change="changeSize1" :current-page="currentPage"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="total"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
    </div>

    <div class="write" v-show="showWrite">
      <layuiTitle :title="WriteState === 0 ? '添加电池发电装置' : WriteState === 1 ? '修改电池发电装置' : '电池发电装置详情'"></layuiTitle>
      <BatteryDetail v-loading="Loading" :WriteState="WriteState" :DicList="DicList" @fatherClose="WriteClose" ref="Details"
                     @fatherOpenImgBox="OpenImgBox" @fatheretMore="getMore1(currentPage)"></BatteryDetail>
    </div>

    <ImgBox ref="ImgBox"></ImgBox>
  </div>
</template>

<script>
import {DictionaryInfoList, BatteryGeneratorList, DelEquipment, BatteryGeneratorInfo} from 'api/api'
import {formatDate} from 'common/js/cache'
import {GlobalRes} from 'common/js/mixins'
import layuiTitle from 'base/layui-title'
import ImgBox from 'base/ImgBox'
import BatteryDetail from 'base/Resource/BatteryGenerator'

export default {
  name: 'BatteryGenerator',
  mixins: [GlobalRes],
  data () {
    return {
      Query: {
        AreaList: [],
        provinceid: 0,
        cityid: 0,
        areaid: 0,
        resourcename: '',
        dayfacetypes: null,
        starttime: '',
        endtime: ''
      },
      tableData: [],
      Loading: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      DicList: {
        state: [],
        propertyrightunit: [],
        maintenanceunit: [],
        manufacturer: [],
        models: []
      },

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
      let arr = ['设备状态', '设备产权单位', '设备存放点类型', '设备单位', '设备维护单位', '电池发电装置设备厂家', '电池发电装置设备型号']
      this.$axios.post(DictionaryInfoList, arr).then(res => {
        if (res.errorCode === '200') {
          this.DicList.unitList = res.data.filter(i => { return i.type === '设备单位' })
          this.DicList.state = res.data.filter(i => { return i.type === '设备状态' })
          this.DicList.propertyrightunit = res.data.filter(i => { return i.type === '设备产权单位' })
          this.DicList.maintenanceunit = res.data.filter(i => { return i.type === '设备维护单位' })
          this.DicList.manufacturer = res.data.filter(i => { return i.type === '电池发电装置设备厂家' })
          this.DicList.models = res.data.filter(i => { return i.type === '电池发电装置设备型号' })
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    getTable1 () {
      this.Loading = true
      this.$axios.get(BatteryGeneratorList, {
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
      this.$axios.get(BatteryGeneratorList, {
        params: Object.assign({}, this.Query, {
          PageIndex: 1,
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
    formatAccessDate (row) { return formatDate(row.accessdate) },
    handleWrite (state, row) {
      this.WriteState = state
      this.showWrite = true
      if (state !== 0) {
        this.Loading = true
        this.$axios.get(BatteryGeneratorInfo, {
          params: {id: row.id}
        }).then(res => {
          this.Loading = false
          if (res.errorCode !== '200') return this.$message.error(res.errorMessage)
          this.WriteData = res.data
          this.$refs.Details.setWriteData(this.WriteData)
        }).catch(err => {
          this.Loading = false
          this.$message.error(err)
        })
      }
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
    handle2 (row) {
      this.$confirm(`您确认要删除 ${row.devicecode} 电池发电设备吗？`, '提示').then(() => {
        this.$axios.delete(DelEquipment, {
          id: row.id
        }).then(res => {
          if (res.errorCode === '200') {
            this.$message.success('成功！')
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err)
        })
      }).catch(() => {
        console.log('err')
      })
    },
    changeSize1 (page) {
      this.pageSize = page
      this.getMore1(this.currentPage)
    }
  },
  components: {BatteryDetail, layuiTitle, ImgBox}
}
</script>

<style scoped>
  @import url('../../../common/css/mixin.css');
</style>
