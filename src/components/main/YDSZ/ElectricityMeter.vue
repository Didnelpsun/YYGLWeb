<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-form :model="Query">
        <el-row :gutter="20">
          <!--选择器-->
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="电表户号：">
                <el-input v-model="Query.electricmeterdoorno" placeholder="请输入电表户号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="供电方式：">
                <el-select class="searchSelect" v-model="Query.powersupplymode">
                  <el-option v-for="i in DicList.powersupplymode" :key="i.value" :label="i.text" :value="i.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电表编号：">
                <el-input v-model="Query.electricmeterno" placeholder="请输入电表编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="资产序列号：">
                <el-input v-model="Query.sharingnumber" placeholder="请填写资产序列号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开始日期：">
                <el-date-picker class="tableSelect" v-model="Query.starttime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择开始时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结束日期：">
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
            <el-button @click="SiteExport" type="success" icon="el-icon-download">导出</el-button>
            <!--<el-button @click="handleAdd" type="success" icon="el-icon-plus">添加</el-button>-->
          </div>
        </el-col>
      </el-row>

      <el-table :data="tableList" v-loading="Loading" style="margin-top: 15px">
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template></el-table-column>
        <!-- <el-table-column prop="provincename" label="省份" width="70"></el-table-column> -->
        <el-table-column prop="electricmeterno" label="电表编号" width="80"></el-table-column>
        <el-table-column prop="electricmeterdoorno" label="电表户号" width=""></el-table-column>
        <el-table-column prop="powersupplymodename" label="供电方式" width="80"></el-table-column>
        <el-table-column prop="sharingnumber" label="资产序列号" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="address" label="安装地址" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width=""></el-table-column>
        <el-table-column prop="createusername" label="创建人" width=""></el-table-column>
        <el-table-column prop="" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleWrite(2, scope.row)">详情</el-button>
            <el-button type="text" size="mini" @click="EditNumber(scope.row)">修改户号</el-button>
            <el-button type="text" size="mini" @click="handleDelete(scope.row)">删除</el-button>
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
      <layuiTitle title="电表详情"></layuiTitle>
      <el-tabs class="content-card" v-model="ViewTabIndex" @tab-click="handleTabs">
        <el-tab-pane label="电表详情">
          <ElectricityMeter ref="ElDetail" v-loading="Loading" :WriteState="WriteState" :DicList="DicList" @fatherClose="CloseDetail"
                         @fatherOpenImgBox="OpenImgBox"
          ></ElectricityMeter>
        </el-tab-pane>
        <el-tab-pane label="站址列表">
          <el-table :data="siteInfo" v-loading="Loading" ref="">
            <el-table-column label="序号" width="50">
              <template slot-scope="scope">{{scope.$index+(currentPage2 - 1) * pageSize2 + 1}}</template>
            </el-table-column>
            <el-table-column prop="cityname" label="地市" width="80"></el-table-column>
            <el-table-column prop="areaname" label="区域" width="80"></el-table-column>
            <el-table-column prop="sitecode" label="站址编码" width="140"></el-table-column>
            <el-table-column prop="sitename" label="站址名称" width="140"></el-table-column>
            <el-table-column prop="locationdescribe" label="位置描述" width=""></el-table-column>
            <el-table-column prop="roomtypename" label="机房类型" width=""></el-table-column>
            <el-table-column prop="dayfacetypename" label="天面类型" width=""></el-table-column>
            <el-table-column prop="confirmtime" label="确认时间" width="" :formatter="formatDate"></el-table-column>
            <el-table-column prop="confirmusername" label="确认人" width=""></el-table-column>
            <el-table-column label="操作" width="90">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="showSiteDetail(scope.$index, scope.row)">详情</el-button>
                <el-button type="text" size="mini" @click="SiteDelete(scope.$index, scope.row)">删除</el-button>
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
      <el-dialog top="1%" :visible.sync="DetailDialogVisible" title="站址详情" width="80%" :before-close="DetailhandleClose">
        <SiteDetail ref="SiteDetail" v-loading="Loading" :WriteState="2" :DicList="DicList" @fatherClose="DetailhandleClose"
                    @fatherOpenImgBox="OpenImgBox"
        ></SiteDetail>
      </el-dialog>
    </div>
    <el-dialog center :visible.sync="EditElectricMeterDoorNo" title="修改电表户号" width="40%">
      <el-form :data="WriteData">
        <el-row>
          <el-col>
            <el-form-item label="电表编号：">
              {{WriteData.electricmeterno}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="资产序列号：">
              {{WriteData.sharingnumber}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-bottom:15px">
          <el-col>
            <el-form-item label="电表户号：">
              <el-input v-model="WriteData.electricmeterdoorno"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-button type="success" @click="handleEdit" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-check'">提交</el-button>
          <el-button type="primary" @click="EditElectricMeterDoorNo = false" icon="el-icon-arrow-left">返回</el-button>
        </el-row>
      </el-form>
    </el-dialog>
    <ImgBox ref="ImgBox"></ImgBox>
  </div>
</template>

<script>
import {GlobalRes} from 'common/js/mixins'
import ImgBox from 'base/ImgBox'
import layuiTitle from 'base/layui-title'
import {DictionaryInfoList} from 'api/api'
import {formatDate} from 'common/js/cache'
import ElectricityMeter from 'base/YDSZ/ElectricityMeter'
import SiteDetail from 'base/YDSZ/SiteDetail'
import {GetElectricMeterList, GetElectricMeterInfo, GetSiteListByID, DelSiteElectricMeter,
  exportMethod, GetElectricMeterExcel, DelElectricMeter, UpdateElectricMeterDoorNo, GetSiteInfo} from 'api/YDSZ'
export default {
  mixins: [GlobalRes],
  data () {
    return {
      Query: {
        electricmeterno: '',
        electricmeterdoorno: '',
        sharingnumber: '',
        starttime: '',
        endtime: '',
        powersupplymode: null
      },
      WriteData: {
        powersupplymode: null,
        electricmeterno: '',
        electricmeterdoorno: '',
        checkcode: '',
        longitude: null,
        latitude: null,
        address: '',
        totalcurrent: '',
        imglist: [],
        sharingnumber: '',
        createtime: '',
        createusername: '',
        id: '',
        createuserid: '',
        powersupplymodename: ''
      },
      Rules: {
        sitename: [
          { required: true, message: '请选择确认站址', trigger: 'change' }
        ]
      },
      DicList: {},
      showWrite: false,
      WriteState: null,
      tableList: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      PageIndex: 1,
      Loading: false,
      isShow: false,
      ViewTabIndex: 0,
      total2: 0,
      currentPage2: 1,
      pageSize2: 10,
      siteInfo: [],
      currentId: '',
      DetailDialogVisible: false,
      EditElectricMeterDoorNo: false
    }
  },
  activated () {
    this.getData1()
    this.initDictionariesArray()
  },
  methods: {
    ResetQuery () {
      Object.assign(this.$data.Query, this.$options.data().Query)
      this.getData1()
    },
    initDictionariesArray () {
      let arr = ['移动上站供电方式']
      this.$axios.post(DictionaryInfoList, arr).then(res => {
        if (res.errorCode === '200') {
          this.DicList.powersupplymode = res.data.filter(i => {
            return i.type === '移动上站供电方式'
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getMore (e) {
      this.Loading = true
      this.currentPage = e
      this.$axios.get(GetElectricMeterList, {params: Object.assign({}, this.Query, {
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
      this.$axios.get(GetElectricMeterList, {
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
    changeSize1 (page) {
      this.pageSize = page
      this.getMore(this.currentPage)
    },
    SizeChange2 (page) {
      this.pageSize2 = page
      this.currentChange2(this.currentPage2)
    },
    currentChange2 (e) {
      this.Loading = true
      this.currentPage2 = e
      this.$axios.get(GetSiteListByID, {
        params: {
          electricmeterid: this.currentId,
          PageIndex: 1,
          PageSize: this.pageSize2
        }
      }).then(res => {
        this.Loading = false
        if (res.errorCode === '200') {
          this.siteInfo = res.data.list
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
        this.$axios.get(GetElectricMeterInfo, {
          params: {
            id: this.currentId
          }
        }).then(res => {
          this.Loading = false
          if (res.errorCode === '200') {
            this.WriteData = res.data
            this.$refs.ElDetail.setWriteData(this.WriteData)
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    getDetail (id) {
      this.Loading = true
      this.currentPage2 = 1
      this.$axios.get(GetSiteListByID, {
        params: {
          electricmeterid: id,
          PageIndex: 1,
          PageSize: this.pageSize2
        }
      }).then(res => {
        this.Loading = false
        if (res.errorCode === '200') {
          this.siteInfo = res.data.list
          this.total2 = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    EditNumber (row) {
      this.EditElectricMeterDoorNo = true
      this.$axios.get(GetElectricMeterInfo, {
        params: {
          id: row.id
        }
      }).then(res => {
        this.Loading = false
        this.WriteData = res.data
      })
    },
    handleDelete (row) {
      this.$confirm(`您确定要删除当前电表吗？`, '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios.delete(DelElectricMeter, {
          params: {
            id: row.id
          }
        }).then(res => {
          if (res.errorCode === '200') {
            this.$message.success('删除成功！')
            this.getData1()
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    handleEdit () {
      this.Loading = true
      this.$axios.get(UpdateElectricMeterDoorNo, {
        params: {
          id: this.WriteData.id,
          electricmeterdoorno: this.WriteData.electricmeterdoorno
        }
      }).then(res => {
        this.Loading = false
        if (res.errorCode === '200') {
          this.$message.success('修改成功!')
          this.EditElectricMeterDoorNo = false
          this.getData1()
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    handleWrite (state, row) {
      this.WriteState = state
      this.currentId = row.id
      this.showWrite = true
      this.Loading = true
      this.$axios.get(GetElectricMeterInfo, {
        params: {
          id: row.id
        }
      }).then(res => {
        this.Loading = false
        this.WriteData = res.data
        this.$refs.ElDetail.setWriteData(this.WriteData)
      })
    },
    showSiteDetail (index, row) {
      this.DetailDialogVisible = true
      this.Loading = true
      this.$axios.get(GetSiteInfo, {
        params: {
          id: row.siteid
        }
      }).then(res => {
        this.Loading = false
        this.$refs.SiteDetail.setWriteData(res.data)
      })
    },
    SiteDelete (index, row) {
      this.$confirm(`您确定要解除电表与当前站址的关系？`, '提示', {
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
    DetailhandleClose () {
      this.DetailDialogVisible = !this.DetailDialogVisible
    },
    OpenImgBox (title, name, list) {
      this.$refs.ImgBox.SetData(title, name, list)
      this.$refs.ImgBox.Open()
      this.WriteState === 2 ? this.$refs.ImgBox.Flag = true : this.$refs.ImgBox.Flag = false
    },
    WriteClose () {
      Object.assign(this.$data.WriteData, this.$options.data().WriteData)
      Object.assign(this.$data.Query, this.$options.data().Query)
      this.$refs.WriteForm.clearValidate()
      // this.setArea([])
      this.showWrite = false
      this.getData1()
    },
    CloseDetail () {
      Object.assign(this.$data.WriteData, this.$options.data().WriteData)
      this.siteInfo = []
      this.showWrite = false
      this.ViewTabIndex = '0'
    },
    SiteExport () {
      this.$confirm(`您确定要导出吗？`, '提示', {
        type: 'info'
      }).then(() => {
        let myObj = {
          method: 'get',
          url: GetElectricMeterExcel,
          fileName: '电表管理',
          data: this.Query
        }
        exportMethod(myObj)
      })
    },
    formatDate (row) {
      return formatDate(row.confirmtime)
    }
  },
  watch: {
    EditElectricMeterDoorNo (val) {
      if (!val) {
        Object.assign(this.$data.WriteData, this.$options.data().WriteData)
      }
    }
  },
  components: {
    layuiTitle,
    ImgBox,
    ElectricityMeter,
    SiteDetail
  }
}
</script>

<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
