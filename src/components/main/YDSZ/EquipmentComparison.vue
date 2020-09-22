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
                <el-input v-model.trim="Query.SiteCode" placeholder="请填写站址编码" @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="逻辑站名称：" label-width="120px">
                <el-input v-model.trim="Query.logicalstanding" placeholder="请填写逻辑站名称"  @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否匹配站址：" label-width="120px">
                <el-select v-model="Query.issite">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="是" :value="true"></el-option>
                  <el-option label="否" :value="false"></el-option>
                </el-select>
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
            <el-button @click="showImport(1)" type="success" icon="el-icon-upload2">导入上站设备</el-button>
            <el-button @click="showImport(2)" type="success" icon="el-icon-upload2">导入网元站址</el-button>
            <el-button @click="showImport(3)" type="success" icon="el-icon-upload2">导入订单站址</el-button>
            <el-button @click="showImport(4)" type="success" icon="el-icon-upload2">导入逻辑站坐标</el-button>
            <el-button @click="SiteExport" type="success" icon="el-icon-download">导出</el-button>
          </div>
        </el-col>
      </el-row>

      <el-table :data="tableList" v-loading="Loading" style="margin-top: 15px">
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(currentPage[0] - 1) * pageSize[0] + 1}}</template></el-table-column>
        <el-table-column prop="areaid" label="区域" width="80"></el-table-column>
        <el-table-column prop="logicalstanding" label="逻辑站"></el-table-column>
        <el-table-column prop="manufacturerid" label="设备厂家" width=""></el-table-column>
        <el-table-column prop="devicetype" label="设备类型" width=""></el-table-column>
        <el-table-column prop="equipmentmodel" label="设备型号" width="140"></el-table-column>
        <el-table-column prop="serinum" label="串号" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="detail" label="详细信息" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="sitecode" label="站址编码" width="120"></el-table-column>
        <el-table-column prop="deviation" label="距离偏差(M)" width=""></el-table-column>
        <el-table-column prop="power" label="功率" width=""></el-table-column>
        <el-table-column prop="ifmatches" label="是否匹配站址" :formatter="formatBoolean"></el-table-column>
        <el-table-column prop="" label="操作" width="60" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="FindSite(scope.row)">找站</el-button>
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
      <layuiTitle title="设备找站"></layuiTitle>
      <el-form :model="MatchQuery" size="mini" style="margin-top: 20px;">
        <el-row>
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="逻辑站名称：" label-width="110px">
                <el-input v-model.trim="MatchQuery.logicalstanding" placeholder="请填写逻辑站名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-left: 30px">
              <el-button @click="getMatchList(3)" :disabled="Loading1" :icon="Loading1 ? 'el-icon-loading' : 'el-icon-search'">查询</el-button>
              <el-button @click="ResetMatchQuery" icon="el-icon-refresh">重置</el-button>
            </el-col>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="matchList" v-loading="Loading" max-height="400">
        <el-table-column prop="logicalstanding" label="逻辑站" width=""></el-table-column>
        <el-table-column prop="devicetype" label="设备类型" width=""></el-table-column>
        <el-table-column prop="matchingsource" label="匹配来源"></el-table-column>
        <el-table-column prop="matchkeywords" label="匹配关键字" width=""></el-table-column>
        <el-table-column prop="sitecode" label="站址编码" width=""></el-table-column>
        <el-table-column prop="areaid" label="区域" width=""></el-table-column>
        <el-table-column prop="deviation" label="距离偏差(M)" width=""></el-table-column>
        <el-table-column prop="power" label="功率" width=""></el-table-column>
        <el-table-column prop="ifmatches" label="是否匹配站址" :formatter="formatBoolean"></el-table-column>
        <el-table-column prop="" label="操作" width="90" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="deleteSite(scope.row)">清空站址</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="center" style="padding-bottom: 10px">
        <!--<el-button @click="SubWrite" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-check'">提交</el-button>-->
        <el-button @click="WriteClose" type="primary" icon="el-icon-arrow-left">返回</el-button>
      </div>

      <el-form :model="Keywords" size="mini" style="margin-top: 20px;">
        <el-row>
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="逻辑站关键字：" label-width="110px">
                <el-input v-model.trim="Keywords.logicalstanding" placeholder="请填写逻辑站关键字"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-left: 30px">
              <el-button @click="getKeywordsList" :disabled="Loading1" :icon="Loading1 ? 'el-icon-loading' : 'el-icon-search'">查询</el-button>
              <el-button @click="ResetKeywords" icon="el-icon-refresh">重置</el-button>
            </el-col>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-col :span="12">
          <p style="margin-bottom: 10px;">订单站址列表</p>
          <el-table :data="orderSiteList" v-loading="Loading1">
            <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(currentPage[1] - 1) * pageSize[1] + 1}}</template></el-table-column>
            <el-table-column prop="logicalstanding" label="逻辑站"></el-table-column>
            <el-table-column prop="sitename" label="站址名称"></el-table-column>
            <el-table-column prop="sitecode" label="站址编码"></el-table-column>
            <el-table-column prop="productconfiguration" label="产品配置"></el-table-column>
            <el-table-column prop="areaid" label="区域" width=""></el-table-column>
            <el-table-column prop="" label="操作" width="90" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="orderSubmit(scope.row)">匹配提交</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="center">
            <el-pagination @current-change="getMore2" @size-change="changeSize2" :current-page="currentPage[1]"
                           :page-sizes="[10, 20, 50, 100]" :page-size="pageSize[1]" :total="total[1]"
                           background layout="total, prev, pager, next, sizes"></el-pagination>
          </div>
        </el-col>
        <el-col :span="12">
          <p style="margin-bottom: 10px;">网元匹配列表</p>
          <el-table :data="networkList" v-loading="Loading2">
            <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(currentPage[2] - 1) * pageSize[2] + 1}}</template></el-table-column>
            <el-table-column prop="logicalstanding" label="逻辑站"></el-table-column>
            <el-table-column prop="sitecode" label="站址编码"></el-table-column>
            <el-table-column prop="areaid" label="区域" width=""></el-table-column>
            <el-table-column prop="sitetype" label="站点类型" width=""></el-table-column>
            <el-table-column prop="" label="操作" width="90" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="networkSubmit(scope.row)">匹配提交</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="center">
            <el-pagination @current-change="getMore3" @size-change="changeSize3" :current-page="currentPage[2]"
                           :page-sizes="[10, 20, 50, 100]" :page-size="pageSize[2]" :total="total[2]"
                           background layout="total, prev, pager, next, sizes"></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <Import ref="ImportBox" @fatherGetData="getData1"></Import>
  </div>
</template>

<script>
import {GlobalRes} from 'common/js/mixins'
import Import from 'base/Import'
import {AreaList} from 'api/api'
import layuiTitle from 'base/layui-title'
import {formatDate} from 'common/js/cache'
import {EquipmenTcontrastList, SitenetWorkList, OrderSiteList, UpdateEquipmenTcontrast,
  UpdateSitenetWorkEquipmenTcontrast, ImportSiteNetWorksExcel, ImportEquipmentExcel,
  ImportOrderSiteExcel, ImportStationlatitudeExcel, EmptyEquipmentSite, EquipmenExport, exportMethod} from 'api/YDSZ'
export default {
  name: 'EquipmentComparison',
  mixins: [GlobalRes],
  data () {
    var _this = this
    return {
      QareaProps: {
        lazy: true,
        checkStrictly: true,
        label: 'name',
        value: 'name',
        lazyLoad (node, resolve) {
          if (!node.level) {
            resolve(JSON.parse(localStorage.getItem('ProvinceList')))
          } else {
            if (!node.hasChildren) return resolve([])
            _this.$axios.post(AreaList, {parentid: node.data.id}).then((res) => {
              if (res.error) {
                _this.$message.error(res.errorMessage)
              } else {
                resolve(_this._normalizeAreaLevel(res.data))
              }
            })
          }
        }
      },
      Query: {
        AreaList: [],
        WhetherSite: false,
        logicalstanding: '',
        SiteCode: '',
        provinceid: null, // 省份
        cityid: null, // 城市
        areaid: null, // 区域
        issite: ''
      },
      Keywords: {
        logicalstanding: ''
      },
      MatchQuery: {
        logicalstanding: ''
      },
      showWrite: false,
      Loading1: false,
      Loading2: false,
      boxLoading: false,
      tableList: [],
      matchList: [],
      orderSiteList: [],
      networkList: [],
      total: [0, 0, 0],
      pageSize: [10, 10, 10],
      currentPage: [1, 1, 1],
      PageIndex: [1, 1, 1],
      Loading: false,
      MatchLogicstandname: ''
    }
  },
  activated () {
    this.getData1()
    /* this.$refs.ImportBox.searchName = '移动上站BBU模板'
    this.$refs.ImportBox.GetTemplateInfo() */
  },
  methods: {
    ResetQuery () {
      Object.assign(this.$data.Query, this.$options.data().Query)
      this.getData1()
    },
    ResetKeywords () {
      Object.assign(this.$data.Keywords, this.$options.data().Keywords)
    },
    ResetMatchQuery () {
      Object.assign(this.$data.MatchQuery, this.$options.data().MatchQuery)
    },
    getMore (e) {
      this.Loading = true
      this.currentPage[0] = e
      this.$axios.get(EquipmenTcontrastList, {params: Object.assign({}, this.Query, {
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
    getMore2 (e) {
      this.Loading1 = true
      this.currentPage[1] = e
      this.$axios.get(OrderSiteList, {params: Object.assign({}, this.Keywords, {
        PageIndex: e,
        PageSize: this.pageSize[1],
        issite: false
      })}).then(res => {
        this.Loading1 = false
        if (res.errorCode === '200') {
          this.orderSiteList = res.data.list
          this.total[1] = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getMore3 (e) {
      this.Loading2 = true
      this.currentPage[2] = e
      this.$axios.get(SitenetWorkList, {params: Object.assign({}, this.Keywords, {
        PageIndex: e,
        PageSize: this.pageSize[2]
      })}).then(res => {
        this.Loading2 = false
        if (res.errorCode === '200') {
          this.networkList = res.data.list
          this.total[2] = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getMatchList (val) {
      this.Loading = true
      if (val === 3) {
        this.MatchLogicstandname = this.MatchQuery.logicalstanding
      }
      this.$axios.get(EquipmenTcontrastList, {params: Object.assign({}, {
        logicalstanding: val === 1 ? this.MatchQuery.logicalstanding : this.MatchLogicstandname,
        WhetherSite: true
      })}).then(res => {
        this.Loading = false
        if (res.errorCode === '200') {
          this.matchList = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getData1 () {
      this.currentPage[0] = 1
      this.Loading = true
      this.$axios.get(EquipmenTcontrastList, {params: Object.assign({}, this.Query, {
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
    changeSize2 (page) {
      this.pageSize[1] = page
      this.getMore2(this.currentPage[1])
    },
    changeSize3 (page) {
      this.pageSize[2] = page
      this.getMore3(this.currentPage[2])
    },
    SubWrite (val) {
      const arr = this.matchList.filter(item => !item.ifmatches)
      return this.$axios.put(val === 1 ? UpdateEquipmenTcontrast : UpdateSitenetWorkEquipmenTcontrast, arr, {
        params: {
          contrast: false
        }
      }).then((res) => {
        return Promise.resolve(res)
      })
    },
    deleteSite (row) {
      this.$confirm(`您确定要清空站址？`, '提示', {
        type: 'warning'
      }).then(() => {
        this.boxLoading = true
        this.$axios.get(EmptyEquipmentSite, {params: Object.assign({}, {
          equipmentid: row.id
        })}).then(res => {
          this.boxLoading = false
          if (res.errorCode === '200') {
            this.getMatchList(2)
            this.$message.success('清空成功!')
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    orderSubmit (row) {
      this.matchList.forEach(item => {
        if (!item.ifmatches) {
          item.matchingsource = '订单'
          item.matchkeywords = this.Keywords.logicalstanding
          item.sitecode = row.sitecode
          item.areaid = row.areaid
        }
      })
      this.boxLoading = true
      this.SubWrite(1).then((res) => {
        this.boxLoading = false
        if (res.errorCode === '200') {
          this.getMatchList(2)
          this.$message.success('修改成功!')
        } else {
          this.$message.error(res.msg)
          this.getMatchList(2)
        }
      })
    },
    networkSubmit (row) {
      this.matchList.forEach(item => {
        if (!item.ifmatches) {
          item.matchingsource = '网元'
          item.matchkeywords = this.Keywords.logicalstanding
          item.sitecode = row.sitecode
          item.areaid = row.areaid
        }
      })
      this.boxLoading = true
      this.SubWrite(2).then((res) => {
        this.boxLoading = false
        if (res.errorCode === '200') {
          this.getMatchList(2)
          this.$message.success('修改成功!')
        } else {
          this.$message.error(res.msg)
          this.getMatchList(2)
        }
      })
    },
    getKeywordsList () {
      if (!this.Keywords.logicalstanding) return this.$message.error('请填写逻辑站关键字!')
      this.Loading1 = true
      this.$axios.get(OrderSiteList, {
        params: {
          PageIndex: 1,
          PageSize: this.pageSize[0],
          logicalstanding: this.Keywords.logicalstanding,
          issite: false
        }
      }).then(res => {
        this.Loading1 = false
        if (res.errorCode === '200') {
          this.orderSiteList = res.data.list
          this.total[1] = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      })
      this.Loading2 = true
      this.$axios.get(SitenetWorkList, {
        params: {
          PageIndex: 1,
          PageSize: this.pageSize[0],
          logicalstanding: this.Keywords.logicalstanding
        }
      }).then(res => {
        this.Loading2 = false
        if (res.errorCode === '200') {
          this.networkList = res.data.list
          this.total[2] = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    WriteClose () {
      Object.assign(this.$data.Keywords, this.$options.data().Keywords)
      this.matchList = []
      this.networkList = []
      this.orderSiteList = []
      this.MatchLogicstandname = []
      this.showWrite = false
      this.getData1()
    },
    formatDate (row) {
      return formatDate(row.confirmtime)
    },
    SiteExport () {
      this.$confirm(`您确定要导出吗？`, '提示', {
        type: 'info'
      }).then(() => {
        let myObj = {
          method: 'post',
          url: EquipmenExport,
          fileName: '设备找站',
          data: this.Query
        }
        exportMethod(myObj)
      })
    },
    FindSite (row) {
      this.showWrite = true
      this.MatchQuery.logicalstanding = row.logicalstanding
      this.MatchLogicstandname = row.logicalstanding
      this.getMatchList(1)
    },
    showImport (val) {
      this.$refs.ImportBox.Open()
      this.$refs.ImportBox.uploadURL = val === 1 ? ImportEquipmentExcel : val === 2 ? ImportSiteNetWorksExcel : val === 3 ? ImportOrderSiteExcel : ImportStationlatitudeExcel
      this.$refs.ImportBox.fileName = val === 1 ? '错误设备数据' : val === 2 ? '错误网元站址数据' : val === 3 ? '错误订单站址数据' : '错误逻辑站坐标数据'
    },
    formatBoolean (row) {
      return row.ifmatches ? '是' : '否'
    }
  },
  components: {
    layuiTitle,
    Import

  }
}
</script>

<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
