<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-form :model="Query" size="mini">
        <el-row>
          <!--选择器-->
          <el-col :span="18">
            <!--<el-col :span="8">
              <el-form-item label="区域：">
                <el-cascader v-model="Query.AreaList" :props="QareaProps" clearable @change="changeArea(Query)"></el-cascader>
              </el-form-item>
            </el-col>-->
            <el-col :span="8">
              <el-form-item label="区域：">
                <el-input v-model.trim="Query.areaid" placeholder="请填写区域" @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="站址编码：">
                <el-input v-model.trim="Query.sitecode" placeholder="请填写站址编码" @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="逻辑站名称：" label-width="120px">
                <el-input v-model.trim="Query.logicalstanding" placeholder="请填写逻辑站名称"  @keyup.enter.native="getMore(1)"></el-input>
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
          </div>
        </el-col>
      </el-row>

      <el-table :data="tableList" v-loading="Loading" style="margin-top: 15px">
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(currentPage[0] - 1) * pageSize[0] + 1}}</template></el-table-column>
        <el-table-column prop="areaid" label="区域" width=""></el-table-column>
        <el-table-column prop="operators" label="运营商"></el-table-column>
        <el-table-column prop="operatorname" label="运营商站点名称" width=""></el-table-column>
        <el-table-column prop="logicalstanding" label="逻辑站名称" width=""></el-table-column>
        <el-table-column prop="sitecode" label="站址编码" width="140"></el-table-column>
        <el-table-column prop="bbu" label="BBU数量"></el-table-column>
        <el-table-column prop="rru" label="RRU数量"></el-table-column>
        <el-table-column prop="orderstatus" label="订单状态"></el-table-column>
        <el-table-column prop="productconfiguration" label="产品配置" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="" label="操作" width="60" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="FindDevice(scope.row)">找设备</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="center">
        <el-pagination @current-change="getMore" @size-change="changeSize1" :current-page="currentPage[0]"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pageSize[0]" :total="total[0]"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
    </div>
    <div class="write" v-show="showWrite" v-loading="boxLoading">
      <layuiTitle title="站址找设备"></layuiTitle>
      <el-form :model="MatchQuery" size="mini" style="margin-top: 20px;">
        <el-row>
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="范围(米)：">
                <el-input v-model.trim="MatchQuery.Scope" placeholder="请填写范围"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-left: 30px">
              <el-button @click="getDeviceList" :disabled="Loading1" :icon="Loading1 ? 'el-icon-loading' : 'el-icon-search'">查询</el-button>
              <el-button @click="ResetMatchQuery" icon="el-icon-refresh">重置</el-button>
            </el-col>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="matchList" v-loading="Loading" max-height="400">
        <el-table-column prop="areaid" label="区域" width=""></el-table-column>
        <el-table-column prop="operators" label="运营商"></el-table-column>
        <el-table-column prop="operatorname" label="运营商站点名称" width=""></el-table-column>
        <el-table-column prop="logicalstanding" label="逻辑站名称" width=""></el-table-column>
        <el-table-column prop="sitecode" label="站址编码" width="140"></el-table-column>
        <el-table-column prop="bbu" label="BBU数量"></el-table-column>
        <el-table-column prop="rru" label="RRU数量"></el-table-column>
        <el-table-column prop="orderstatus" label="订单状态"></el-table-column>
        <el-table-column prop="productconfiguration" label="产品配置" :show-overflow-tooltip="true"></el-table-column>
      </el-table>
      <el-row style="margin-top: 20px;margin-bottom: 20px;">
        <el-col>
          <p style="margin-bottom: 10px;">设备列表</p>
          <el-table :data="deviceList" v-loading="Loading1" max-height="400">
            <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(currentPage[1] - 1) * pageSize[1] + 1}}</template></el-table-column>
            <el-table-column prop="areaid" label="区域" width="80"></el-table-column>
            <el-table-column prop="logicalstanding" label="逻辑站"></el-table-column>
            <el-table-column prop="manufacturerid" label="设备厂家" width=""></el-table-column>
            <el-table-column prop="devicetype" label="设备类型" width=""></el-table-column>
            <el-table-column prop="equipmentmodel" label="设备型号" width="140"></el-table-column>
            <el-table-column prop="serinum" label="串号" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="detail" label="详细信息" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="sitecode" label="站址编码" width="120"></el-table-column>
            <el-table-column prop="M" label="距离偏差(M)" :formatter="formatDistance"></el-table-column>
            <el-table-column prop="power" label="功率" width=""></el-table-column>
            <el-table-column prop="" label="操作" width="90" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="deleteDevice(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--<div class="center">
            <el-pagination @current-change="getMore2" @size-change="changeSize2" :current-page="currentPage[1]"
                           :page-sizes="[10, 20, 50, 100]" :page-size="pageSize[1]" :total="total[1]"
                           background layout="total, prev, pager, next, sizes"></el-pagination>
          </div>-->
          <div class="center" style="padding-bottom: 10px">
            <el-button @click="SubWrite" :disabled="boxLoading" :icon="boxLoading ? 'el-icon-loading' : 'el-icon-check'">提交</el-button>
            <el-button @click="WriteClose" type="primary" icon="el-icon-arrow-left">返回</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {GlobalRes} from 'common/js/mixins'
import layuiTitle from 'base/layui-title'
import {OrderSiteList, UpdateEquipmenTcontrast, GetScopeEquipmentList} from 'api/YDSZ'
export default {
  name: 'SiteComparison',
  mixins: [GlobalRes],
  data () {
    return {
      Query: {
        AreaList: [],
        WhetherSite: false,
        logicalstanding: '',
        sitecode: '',
        provinceid: null, // 省份
        cityid: null, // 城市
        areaid: null, // 区域
        issite: true
      },
      showWrite: false,
      Loading1: false,
      boxLoading: false,
      tableList: [],
      matchList: [],
      deviceList: [],
      MatchQuery: {
        Scope: 50
      },
      total: [0, 0],
      pageSize: [10, 10],
      currentPage: [1, 1],
      PageIndex: [1, 1],
      Loading: false,
      MatchLogicstandname: '',
      selectList: {},
      ordersiteid: ''
    }
  },
  activated () {
    this.getData1()
  },
  methods: {
    ResetMatchQuery () {
      Object.assign(this.$data.MatchQuery, this.$options.data().MatchQuery)
      this.selectList = {}
      this.deviceList = []
    },
    ResetQuery () {
      Object.assign(this.$data.Query, this.$options.data().Query)
      this.getData1()
    },
    getMore (e) {
      this.Loading = true
      this.currentPage[0] = e
      this.$axios.get(OrderSiteList, {params: Object.assign({}, this.Query, {
        PageIndex: e,
        PageSize: this.pageSize[0]
      })}).then(res => {
        this.Loading = false
        if (res.errorCode === '200') {
          this.tableList = res.data.list
          this.total[0] = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    /* getMore2 (e) {
      this.Loading1 = true
      this.currentPage[1] = e
      this.$axios.get(GetScopeEquipmentList, {params: Object.assign({}, this.MatchQuery, {
        PageIndex: e,
        PageSize: this.pageSize[1],
        ordersiteid: this.ordersiteid
      })}).then(res => {
        this.Loading1 = false
        if (res.errorCode === '200') {
          this.deviceList = res.data
          this.total[1] = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      })
    }, */
    getMatchList () {
      this.Loading = true
      this.$axios.get(OrderSiteList, {params: Object.assign({}, {
        logicalstanding: this.MatchLogicstandname,
        issite: true
      })}).then(res => {
        this.Loading = false
        if (res.errorCode === '200') {
          this.matchList = res.data.list
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getDeviceList () {
      if (!this.MatchQuery.Scope) return this.$message.error('请输入范围!')
      this.Loading1 = true
      this.$axios.get(GetScopeEquipmentList, {params: Object.assign({}, this.MatchQuery, {
        ordersiteid: this.ordersiteid
      })}).then(res => {
        this.Loading1 = false
        if (res.errorCode === '200') {
          this.deviceList = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    deleteDevice (index) {
      this.deviceList.splice(index, 1)
    },
    getData1 () {
      this.currentPage[0] = 1
      this.Loading = true
      this.$axios.get(OrderSiteList, {params: Object.assign({}, this.Query, {
        PageIndex: 1,
        PageSize: this.pageSize[0]
      })}).then(res => {
        this.Loading = false
        if (res.errorCode === '200') {
          this.tableList = res.data.list
          this.total[0] = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    changeSize1 (page) {
      this.pageSize[0] = page
      this.getMore(this.currentPage[0])
    },
    /* changeSize2 (page) {
      this.pageSize[1] = page
      this.getMore2(this.currentPage[1])
    }, */
    SubWrite () {
      if (!this.deviceList.length) return this.$message.error('请选择站址,查询设备列表!')
      this.boxLoading = true
      this.deviceList.forEach(item => {
        item.sitecode = this.selectList.sitecode
        item.longitudes = this.selectList.longitude
        item.latitudes = this.selectList.latitude
        item.areaid = this.selectList.areaid
        item.matchkeywords = this.selectList.logicalstanding
        item.matchingsource = '订单'
      })
      this.$axios.put(UpdateEquipmenTcontrast, this.deviceList, {
        params: {
          contrast: true
        }
      }).then(res => {
        this.boxLoading = false
        if (res.errorCode === '200') {
          this.$message.success('编辑成功!')
          this.WriteClose()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    WriteClose () {
      this.matchList = []
      this.deviceList = []
      this.MatchLogicstandname = []
      this.selectList = {}
      Object.assign(this.$data.MatchQuery, this.$options.data().MatchQuery)
      this.ordersiteid = ''
      this.showWrite = false
      this.getData1()
    },
    FindDevice (row) {
      this.showWrite = true
      this.selectList = row
      this.ordersiteid = row.id
      this.MatchLogicstandname = row.logicalstanding
      this.getMatchList()
      this.getDeviceList()
    },
    formatDistance (row) {
      return row.M.toFixed(2)
    }
  },
  components: {
    layuiTitle
  }
}
</script>

<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
