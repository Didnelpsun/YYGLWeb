<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-form :model="Query">
        <el-row :gutter="20">
          <!--选择器-->
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="区域：">
                <el-cascader v-model="Query.AreaList" :props="QareaProps" clearable @change="changeArea(Query)"></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="机房类型：">
                <el-select class="searchSelect" v-model="Query.roomtypes">
                  <el-option label="请选择" value=""></el-option>
                  <el-option v-for="i in DicList.roomtype" :key="i.value" :label="i.text" :value="i.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="天面类型：">
                <el-select class="searchSelect" v-model="Query.dayfacetypes">
                  <el-option label="请选择" value=""></el-option>
                  <el-option v-for="i in DicList.dayfacetype" :key="i.value" :label="i.text" :value="i.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="站址名称：">
                <el-input v-model="Query.sitename" placeholder=请输入站址名称 @keyup.enter.native="getMore(1)"></el-input>
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
        <!--<el-row :gutter="20">
          <el-col :sm="11" :md="9">
          </el-col>
        </el-row>-->
      </el-form>

      <el-row>
        <el-col :span="4" class="SearchResult">查询结果</el-col>
        <el-col :offset="2" :span="18" class="fr">
          <div class="fr">
            <el-button @click="showImport" type="success" icon="el-icon-upload2">导入</el-button>
            <el-button @click="SiteExport" type="success" icon="el-icon-download">导出</el-button>
            <el-button @click="handleAdd" type="success" icon="el-icon-plus">添加</el-button>
          </div>
        </el-col>
      </el-row>

      <el-table :data="tableList" v-loading="Loading" style="margin-top: 15px;">
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template></el-table-column>
        <!-- <el-table-column prop="provincename" label="省份" width="70"></el-table-column> -->
        <el-table-column prop="cityname" label="地市" width="80"></el-table-column>
        <el-table-column prop="areaname" label="区域" width="80"></el-table-column>
        <el-table-column prop="sitecode" label="站址编码" width="140"></el-table-column>
        <el-table-column prop="sitename" label="站址名称" width="140"></el-table-column>
        <el-table-column prop="locationdescribe" label="位置描述" width=""></el-table-column>
        <el-table-column prop="roomtypename" label="机房类型" width=""></el-table-column>
        <el-table-column prop="dayfacetypename" label="天面类型" width=""></el-table-column>
        <el-table-column prop="confirmtime" label="确认时间" width="" :formatter="formatDate"></el-table-column>
        <el-table-column prop="confirmusername" label="确认人" width=""></el-table-column>

        <el-table-column prop="" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleWrite(2, scope.row)">详情</el-button>
            <el-button type="text" size="mini" @click="handleWrite(1, scope.row)">编辑</el-button>
            <!--<el-button type="text" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
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
      <layuiTitle :title="WriteState === 0 ? '添加站址' : WriteState === 1 ? '编辑站址' : '站址详情'"></layuiTitle>
      <template v-if="WriteState === 2">
        <el-tabs class="content-card" v-model="ViewTabIndex" @tab-click="handleTabs">
          <el-tab-pane label="站址详情">
            <SiteDetail ref="SiteDetail" v-loading="Loading" :WriteState="2" :DicList="DicList" @fatherClose="CloseDetail"
                        @fatherOpenImgBox="OpenImgBox"
            ></SiteDetail>
          </el-tab-pane>
          <el-tab-pane label="电表列表">
            <el-table :data="ammeterInfo" v-loading="Loading" ref="">
              <el-table-column label="序号" width="50">
                <template slot-scope="scope">{{scope.$index+(currentPage2 - 1) * pageSize2 + 1}}</template>
              </el-table-column>
              <el-table-column prop="electricmeterno" label="电表编号" width="80"></el-table-column>
              <el-table-column prop="electricmeterdoorno" label="电表户号" width=""></el-table-column>
              <el-table-column prop="powersupplymodename" label="供电方式" width="80"></el-table-column>
              <el-table-column prop="sharingnumber" label="资产序列号" width="" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="address" label="安装地址" :show-overflow-tooltip="true"></el-table-column>
              <el-table-column prop="createtime" label="创建时间" width=""></el-table-column>
              <el-table-column prop="createusername" label="创建人" width=""></el-table-column>
              <el-table-column label="操作" width="90">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="showAmmeterDetail(scope.$index, scope.row)">详情</el-button>
                  <el-button type="text" size="mini" @click="AmmeterDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <div class="center" v-show="ViewTabIndex === '1'">
          <el-pagination @current-change="currentChange2" @size-change="SizeChange2" :current-page="currentPage2"
                         :page-sizes="[10, 20, 50, 100]" :page-size="pageSize2" :total="total2"
                         background layout="total, prev, pager, next, sizes"></el-pagination>
        </div>
        <div class="center"  v-show="ViewTabIndex === '1'">
          <el-button @click="CloseDetail" type="primary" icon="el-icon-arrow-left">返回</el-button>
        </div>
        <el-dialog top="1%" :visible.sync="DetailDialogVisible" title="电表详情" width="80%" :before-close="DetailhandleClose">
          <ElectricityMeter ref="ElDetail" v-loading="Loading" :WriteState="WriteState" :DicList="DicList" @fatherClose="DetailhandleClose"
                            @fatherOpenImgBox="OpenImgBox"
          ></ElectricityMeter>
        </el-dialog>
      </template>
      <SiteDetail v-else ref="Details" v-loading="Loading" :WriteState="WriteState" :DicList="DicList" @fatherClose="WriteClose"
                  @fatheretMore="getMore(1)" @fatherOpenImgBox="OpenImgBox"
      ></SiteDetail>
    </div>
    <ImgBox ref="ImgBox"></ImgBox>
    <Import ref="ImportBox" @fatherGetData="getData1"></Import>
  </div>
</template>

<script>
import {GlobalRes} from 'common/js/mixins'
import ImgBox from 'base/ImgBox'
import Import from 'base/Import'
import layuiTitle from 'base/layui-title'
import {formatDate} from 'common/js/cache'
import {DictionaryInfoList} from 'api/api'
import {isValidLongitude, isValidLatitude} from 'common/js/validata'
import SiteDetail from 'base/YDSZ/SiteDetail'
import ElectricityMeter from 'base/YDSZ/ElectricityMeter'
import {GetSiteList, GetSiteInfo, DownSiteExcel, exportMethod, DelSiteElectricMeter,
  GetSiteElectricMeterList, ImportSiteExcel, GetElectricMeterInfo} from 'api/YDSZ'
export default {
  name: 'SiteManagement',
  mixins: [GlobalRes],
  data () {
    return {
      Query: {
        AreaList: [],
        roomtypes: '',
        dayfacetypes: '',
        sitename: '',
        provinceid: null, // 省份
        cityid: null, // 城市
        areaid: null // 区域
      },
      WriteData: {
        AreaList: [],
        provinceid: 0,
        cityid: 0,
        areaid: 0,
        sitename: '',
        sitecode: '',
        longitude: null,
        latitude: null,
        locationdescribe: '',
        roomtype: 0,
        roomtypename: '',
        roomacreage: '',
        dayfacetypename: '',
        dayfacetype: 0,
        dayfaceheight: '',
        rrunumber: '',
        imglist: [],
        confirmtime: '',
        id: '',
        createuserid: '',
        createtime: '',
        createusername: ''
      },
      Rules: {
        sitename: [
          { required: true, message: '请输入站址名称', trigger: 'change' }
        ],
        longitude: [
          {required: false, message: '请填写经度', trigger: 'blur'},
          {pattern: isValidLongitude, message: '请输入正确的经度', trigger: 'blur'}
        ],
        latitude: [
          {required: false, message: '请填写纬度', trigger: 'blur'},
          {pattern: isValidLatitude, message: '请输入正确的纬度', trigger: 'blur'}
        ]
      },
      DicList: {},
      showWrite: false,
      WriteLoading: false,
      WriteState: null,
      tableList: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      PageIndex: 1,
      total2: 0,
      currentPage2: 1,
      pageSize2: 10,
      ViewTabIndex: 0,
      currentId: '',
      ammeterInfo: [],
      DetailDialogVisible: false,
      Loading: false
      // uploadURL: 'https://jsonplaceholder.typicode.com/posts/'
    }
  },
  activated () {
    this.getData1()
    this.initDictionariesArray()
    this.$refs.ImportBox.searchName = '移动上站站址模板'
    this.$refs.ImportBox.GetTemplateInfo()
  },
  methods: {
    ResetQuery () {
      Object.assign(this.$data.Query, this.$options.data().Query)
      // this.Query.provinceid = null
      this.getData1()
    },
    initDictionariesArray () {
      let arr = ['移动上站站址机房类型', '移动上站站址天面类型']
      this.$axios.post(DictionaryInfoList, arr).then(res => {
        if (res.errorCode === '200') {
          this.DicList.roomtype = res.data.filter(i => {
            return i.type === '移动上站站址机房类型'
          })
          this.DicList.dayfacetype = res.data.filter(i => {
            return i.type === '移动上站站址天面类型'
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getMore (e) {
      this.Loading = true
      this.currentPage = e
      this.$axios.get(GetSiteList, {params: Object.assign({}, this.Query, {
        PageIndex: e,
        PageSize: this.pageSize
      })}).then(res => {
        this.Loading = false
        if (res.errorCode === '200') {
          this.tableList = res.data.list
          this.total = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getData1 () {
      this.currentPage = 1
      this.Loading = true
      this.$axios.get(GetSiteList, {
        params: {
          PageIndex: 1,
          PageSize: this.pageSize
        }
      }).then(res => {
        this.Loading = false
        if (res.errorCode === '200') {
          this.tableList = res.data.list
          this.total = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    SizeChange2 (page) {
      this.pageSize2 = page
      this.currentChange2(this.currentPage2)
    },
    currentChange2 (e) {
      this.Loading = true
      this.currentPage2 = e
      this.$axios.get(GetSiteElectricMeterList, {
        params: {
          siteid: this.currentId,
          PageIndex: 1,
          PageSize: this.pageSize2
        }
      }).then(res => {
        this.Loading = false
        if (res.errorCode === '200') {
          this.ammeterInfo = res.data.list
          this.total2 = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleTabs () {
      if (this.ViewTabIndex === '1') {
        this.getDetail(this.currentId)
      } else {
        this.Loading = true
        this.$axios.get(GetSiteInfo, {
          params: {
            id: this.currentId
          }
        }).then(res => {
          this.Loading = false
          if (res.errorCode === '200') {
            this.WriteData = res.data
            this.$refs.SiteDetail.setWriteData(this.WriteData)
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    getDetail (id) {
      this.Loading = true
      this.currentPage2 = 1
      this.$axios.get(GetSiteElectricMeterList, {
        params: {
          siteid: id,
          PageIndex: 1,
          PageSize: this.pageSize2
        }
      }).then(res => {
        this.Loading = false
        if (res.errorCode === '200') {
          this.ammeterInfo = res.data.list
          this.total2 = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    DetailhandleClose () {
      this.DetailDialogVisible = !this.DetailDialogVisible
    },
    showAmmeterDetail (index, row) {
      this.DetailDialogVisible = true
      this.Loading = true
      this.$axios.get(GetElectricMeterInfo, {
        params: {
          id: row.electricmeterid
        }
      }).then(res => {
        this.Loading = false
        this.$refs.ElDetail.setWriteData(res.data)
      })
    },
    AmmeterDelete (index, row) {
      this.$confirm(`您确定要解除站址与当前电表的关系？`, '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios.delete(DelSiteElectricMeter, {
          params: {
            id: row.id
          }
        }).then(res => {
          if (res.errorCode === '200') {
            this.$message.success('删除成功！')
            this.getDetail(this.currentId)
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    handleAdd () {
      this.showWrite = true
      this.WriteState = 0
    },
    changeSize1 (page) {
      this.pageSize = page
      this.getMore(this.currentPage)
    },
    handleWrite (state, row) {
      this.WriteState = state
      this.currentId = row.id
      this.showWrite = true
      this.Loading = true
      this.$axios.get(GetSiteInfo, {
        params: {
          id: row.id
        }
      }).then(res => {
        this.Loading = false
        this.WriteData = res.data
        if (state === 1) {
          this.WriteData.longitude = this.WriteData.longitude ? this.WriteData.longitude : null
          this.WriteData.latitude = this.WriteData.latitude ? this.WriteData.latitude : null
        }
        if (state === 2) {
          this.$refs.SiteDetail.setWriteData(this.WriteData)
        } else {
          this.$refs.Details.setWriteData(this.WriteData)
        }
      })
    },
    OpenImgBox (title, name, list) {
      this.$refs.ImgBox.SetData(title, name, list)
      this.$refs.ImgBox.Open()
      this.WriteState === 2 ? this.$refs.ImgBox.Flag = true : this.$refs.ImgBox.Flag = false
    },
    WriteClose () {
      // Object.assign(this.$data.WriteData, this.$options.data().WriteData)
      Object.assign(this.$data.Query, this.$options.data().Query)
      this.showWrite = false
    },
    CloseDetail () {
      Object.assign(this.$data.WriteData, this.$options.data().WriteData)
      this.ammeterInfo = []
      this.showWrite = false
      this.ViewTabIndex = '0'
    },
    SiteExport () {
      this.$confirm(`您确定要导出吗？`, '提示', {
        type: 'info'
      }).then(() => {
        let myObj = {
          method: 'get',
          url: DownSiteExcel,
          fileName: '站址管理',
          data: this.Query
        }
        exportMethod(myObj)
      })
    },
    showImport () {
      this.$refs.ImportBox.Open()
      this.$refs.ImportBox.uploadURL = ImportSiteExcel
      this.$refs.ImportBox.fileName = '错误站址数据'
    },
    formatDate (row) {
      return formatDate(row.confirmtime)
    }
  },
  components: {
    layuiTitle,
    ImgBox,
    Import,
    SiteDetail,
    ElectricityMeter
  }
}
</script>

<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
