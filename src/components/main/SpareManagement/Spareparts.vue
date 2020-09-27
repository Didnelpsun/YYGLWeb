<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-form :model="Query">
        <el-row >
          <el-col :span="18">
            <el-col :span="8">
              <div @click="sparetypeShow=true">
                <el-form-item label="备件类型：">
                  <el-input v-model="Query.sparepartstype" clearable placeholder="请选择备件类型"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div @click="SparemanufacturerShow=true">
                <el-form-item label="厂家：">
                  <el-input v-model="Query.manufacturer" clearable placeholder="请选择厂家"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div @click="sparemodelShow=true">
                <el-form-item label="备件型号：">
                  <el-input v-model="Query.sparemodel" clearable placeholder="请选择备件型号"></el-input>
                </el-form-item>
              </div>
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
          <el-col :span="12">
            <p class="SearchResult">查询结果</p>
          </el-col>
          <el-col :span="12">
            <div class="fr" style="margin-top: 0">
              <el-button @click="showImport" type="success"  :disabled="Loading" icon="el-icon-upload2">导入</el-button>
              <el-button @click="handleWrite(0)"  type="success" :disabled="Loading" icon="el-icon-plus">添加</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="tableData" v-loading="Loading" ref="table1" style="margin-top: 15px;">
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template>
        </el-table-column>
        <el-table-column prop="cityname" label="地市" width="70"></el-table-column>
        <el-table-column prop="areaname" label="区域" width="70"></el-table-column>
        <el-table-column prop="code" label="备件编码"></el-table-column>
        <el-table-column prop="typename" label="备件类型"></el-table-column>
        <el-table-column prop="manufacturername" label="厂家"></el-table-column>
        <el-table-column prop="unitname" label="权属"></el-table-column>
        <el-table-column prop="sparemodel" label="备件型号"></el-table-column>
        <el-table-column prop="depotsname" label="存放点 "></el-table-column>
        <el-table-column prop="warrantycode" label="备件质保编号" width="120"></el-table-column>
        <el-table-column prop="assetsencoding" label="资产编码"></el-table-column>
        <el-table-column prop="qrcode" label="二维码"></el-table-column>
        <el-table-column prop="realityname" label="提交人"></el-table-column>
        <el-table-column prop="createtime" label="提交时间"></el-table-column>
        <el-table-column label="操作" width="140px"   fixed="right" align="center">
          <template slot-scope="scope"  >
            <el-button type="text" size="mini" @click="handleWrite(2,scope.row)">详情</el-button>
            <el-button type="text" size="mini" @click="handleWrite(1, scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="handle2(scope.row)">删除</el-button>
            <el-button type="text"  size="mini">上站</el-button>
            <el-button @click="handleSpareparts(1,scope.row)"  type="text"  size="mini">替换</el-button>
            <el-button @click="handleSpareparts(2,scope.row)"  type="text"  size="mini">点验</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="center">
        <el-pagination @current-change="getMore" @size-change="changeSize1" :current-page="currentPage"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="total"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
    </div>
    <div class="write" v-show="showWrite&&!handleShow">
      <layuiTitle :title="WriteState === 0 ? '添加备件列表' : WriteState === 1 ? '编辑备件列表' : '备件列表详情'"></layuiTitle>

      <Details :WriteState="WriteState" :DicList="DicList"
               @fatheretMore="getMore(currentPage)" @fatherClose="WriteClose" ref="Details"></Details>

    </div>
    <div class="write" v-show="handleShow">
      <layuiTitle :title="Sparepartstate === 0 ? '上站' : Sparepartstate === 1 ? '替换' : '点验'"></layuiTitle>
      <SpareCheck   v-if="Sparepartstate === 2" :DicList="DicList" :Loading="Loading"
               @fatheretMore="getMore(currentPage)" @fatherClose="WriteClose" ref="SpareCheck"></SpareCheck>
      <SpareReplaceDetail  v-if="Sparepartstate === 1" :Loading="Loading"
                  @fatheretMore="getMore(currentPage)" @fatherClose="WriteClose" ref="SpareReplaceDetail"></SpareReplaceDetail>
    </div>
    <el-dialog top="1%" :visible.sync="sparetypeShow" title="选择备件类型" width="80%" :before-close="sparetypeClose">
      <Selectsparetype    @Selsparetypeid="Selsparetypeid"/>
    </el-dialog>
    <el-dialog top="1%" :visible.sync="SparemanufacturerShow" title="选择备件厂家" width="80%" :before-close="manufacturerClose">
      <Selectmanufacturer  @Selmanufacturerid="Selmanufacturerid"/>
    </el-dialog>
    <div v-if="sparemodelShow">
      <el-dialog top="1%" :visible.sync="sparemodelShow" title="选择备件型号" width="80%" :before-close="sparemodelClose">
        <SelectSpareconMode :istrue="true"  :sparetypeid="Query.sparepartstypeid" :sparemanufacturerid="Query.manufacturerid"  @SelSpareconModelid="SelSpareconModelid"/>
      </el-dialog>
    </div>
    <Import ref="ImportBox" @fatherGetData="getMore(1)"></Import>
  </div>
</template>

<script>
import Import from 'base/Import'
import { GlobalRes } from 'common/js/mixins'
import layuiTitle from 'base/layui-title'
import {GetsparepartsList, GetsparepartsidList, Deletespareparts, sparepartsImport} from 'api/BJGL'
import Details from 'base/SpareManagement/Spareparts'
import SpareCheck from 'base/SpareManagement/SpareCheck'
import SpareReplaceDetail from 'base/SpareManagement/SpareReplaceDetail'
import Selectsparetype from 'base/SpareManagement/Selsparetypeid'
import Selectmanufacturer from 'base/SpareManagement/Selmanufacturerid'
import SelectSpareconMode from 'base/SpareManagement/SelSpareconModelid'
import {DictionaryInfoList} from 'api/api'
export default {
  name: 'Spareparts',
  mixins: [GlobalRes],
  data () {
    return {
      Query: {
        sparepartstype: null,
        sparepartstypeid: null,
        sparemodelid: null,
        sparemodel: null,
        manufacturerid: null,
        manufacturer: null
      },
      DicList: {},
      handleShow: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      Loading: false,
      tableData: [],
      showWrite: false,
      WriteState: 0, // 0为添加 1为编辑 2为查看
      Sparepartstate: 0, // 0为上站 1为替换 2点验
      sparetypeShow: false,
      SparemanufacturerShow: false,
      sparemodelShow: false

    }
  },
  activated () {
    this.getData1()
    this.getDic()
    this.$refs.ImportBox.searchName = ''
    this.$refs.ImportBox.GetTemplateInfo()
  },
  methods: {
    getDic () {
      let arr = ['备件存放点类型']
      this.$axios.post(DictionaryInfoList, arr).then(res => {
        if (res.errorCode === '200') {
          let data = res.data
          this.DicList.warehousetype = data.filter(i => { return i.type === '备件存放点类型' })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    showImport () {
      this.$refs.ImportBox.Open()
      this.$refs.ImportBox.uploadURL = sparepartsImport
      this.$refs.ImportBox.fileName = '错误备件调度管理备件列表导入数据'
    },
    sparetypeClose () { this.sparetypeShow = !this.sparetypeShow },
    manufacturerClose () { this.SparemanufacturerShow = !this.SparemanufacturerShow },
    sparemodelClose () { this.sparemodelShow = !this.sparemodelShow },
    Selsparetypeid (name, id) {
      this.sparetypeShow = false
      this.Query.sparepartstypeid = id
      this.Query.sparepartstype = name
      this.Query.sparemodelid = null
      this.Query.sparemodel = null
    },
    Selmanufacturerid (name, id) {
      this.SparemanufacturerShow = false
      this.Query.manufacturerid = id
      this.Query.manufacturer = name
      this.Query.sparemodelid = null
      this.Query.sparemodel = null
    },
    SelSpareconModelid (name, id) {
      this.sparemodelShow = false
      this.Query.sparemodelid = id
      this.Query.sparemodel = name
    },
    handleSpareparts (val, row) {
      this.Sparepartstate = val
      this.showWrite = true
      this.handleShow = true
      this.Loading = true
      this.$axios.get(GetsparepartsidList, {
        params: {
          Id: row.id
        }
      }).then(res => {
        this.Loading = false
        if (val === 2) {
          this.$refs.SpareCheck.setWriteData(res.data)
        } else if (val === 1) {
          this.$refs.SpareReplaceDetail.setWriteData(res.data)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    ResetQuery () {
      Object.assign(this.$data, this.$options.data.call(this))
      this.getData1()
    },
    getData1 () {
      this.Loading = true
      this.$axios.get(GetsparepartsList, {
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
      this.$axios.get(GetsparepartsList, {params: Object.assign({}, this.Query, {
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
    WriteClose () {
      this.showWrite = false
      this.handleShow = false
    },
    handleWrite (state, row) {
      this.WriteState = state
      this.showWrite = true
      if (state) {
        this.$refs.Details.Loading = true
        this.$axios.get(GetsparepartsidList, {
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
    handle2 (row) {
      this.$confirm(`您确定要删除 ${row.code} 设备吗？`, '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios.delete(Deletespareparts, {
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
    }

  },
  components: {
    layuiTitle,
    Details,
    SpareCheck,
    SpareReplaceDetail,
    Selectsparetype,
    Selectmanufacturer,
    SelectSpareconMode,
    Import
  }
}
</script>

<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
