<template>
  <div class="content">
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
            <el-button  @click="getTableData1More(1)" :disabled="Table1Loading" :icon="Table1Loading ? 'el-icon-loading' : 'el-icon-search'">查询</el-button>
            <el-button @click="ResetQuery" icon="el-icon-refresh">重置</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <p class="SearchResult">查询结果</p>
        </el-col>
      </el-row>
    </el-form>
    <!--<layuiTitle :title="'站点列表'"></layuiTitle>-->
    <el-table :data="tableList" v-loading="Table1Loading">
      <el-table-column label="序号" width="50">
        <template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template>
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
      <el-table-column prop="" label="操作" width="50" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleChoose(scope.$index, scope.row)">选择</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="center">
      <el-pagination @current-change="getTableData1More" @size-change="handelSizeChange" :current-page="pagination.currentPage"
                     :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize" :total="pagination.total"
                     background layout="total, prev, pager, next, sizes"></el-pagination>
    </div>
    <div v-if="sparetypeShow">
    <el-dialog top="1%" :visible.sync="sparetypeShow" title="选择备件类型" width="80%" :before-close="sparetypeClose">
      <Selectsparetype    @Selsparetypeid="Selsparetypeid"/>
    </el-dialog>
    </div>
    <div v-if="SparemanufacturerShow">
    <el-dialog top="1%" :visible.sync="SparemanufacturerShow" title="选择备件厂家" width="80%" :before-close="manufacturerClose">
      <Selectmanufacturer  @Selmanufacturerid="Selmanufacturerid"/>
    </el-dialog>
    </div>
    <div v-if="sparemodelShow">
      <el-dialog top="1%" :visible.sync="sparemodelShow" title="选择备件型号" width="80%" :before-close="sparemodelClose">
        <SelectSpareconMode   :sparetypeid="Query.sparepartstypeid" :sparemanufacturerid="Query.manufacturerid"  @SelSpareconModelid="SelSpareconModelid"/>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {GetsparepartsList} from 'api/BJGL'
import { GlobalRes } from 'common/js/mixins'
import Selectsparetype from 'base/SpareManagement/Selsparetypeid'
import Selectmanufacturer from 'base/SpareManagement/Selmanufacturerid'
import SelectSpareconMode from 'base/SpareManagement/SelSpareconModelid'
export default {
  name: 'SelSpareparts',
  mixins: [GlobalRes],
  props: {
    resourcetype: {
      type: Number,
      default: 1
    },
    provinceid: {// 省份
      type: Number,
      default: null
    },
    cityid: {// 城市
      type: Number,
      default: null
    }
  },
  data () {
    return {
      // 查询相关属性
      Query: {
        sparepartstype: null,
        sparepartstypeid: null,
        sparemodelid: null,
        sparemodel: null,
        manufacturerid: null,
        manufacturer: null
      },
      tableList: [],
      // 分页相关属性
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1,
        PageIndex: 1
      },
      DetailDialogVisible: false,
      Table1Loading: false,
      selectId: [],
      DicList: {},
      sparetypeShow: false,
      SparemanufacturerShow: false,
      sparemodelShow: false
    }
  },
  created () {
    this._getTableData1()
  },
  methods: {
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
      this.Query.sparemodelShow = false
      this.Query.sparemodelid = id
      this.Query.sparemodel = name
    },
    _getTableData1 () {
      this.Table1Loading = true
      this.$axios.get(GetsparepartsList, {
        params: {
          PageIndex: 1,
          PageSize: 10
        }}).then(res => {
        this.Table1Loading = false
        if (res.errorCode !== '200') return this.$message.error(res.msg)
        this.tableList = res.data.list
        this.pagination.total = res.data.total
      })
    },
    // 分页处理函数
    handelSizeChange (page) {
      this.pagination.pageSize = page
      this.getTableData1More(this.pagination.currentPage)
    },
    getTableData1More  (page) {
      this.pagination.currentPage = page
      this.Table1Loading = true
      this.$axios.get(GetsparepartsList, {params: Object.assign({}, this.Query, {
        PageIndex: this.pagination.currentPage,
        PageSize: this.pagination.pageSize
      })}).then(res => {
        this.Table1Loading = false
        if (res.errorCode !== '200') return this.$message.error(res.msg)
        this.tableList = res.data.list
        this.pagination.total = res.data.total
      })
    },
    // 重置按钮
    ResetQuery () {
      Object.assign(this.$data.Query, this.$options.data().Query)
      // Object.assign(this.$data.AreaList, this.$options.data().AreaList)
      this._getTableData1()
    },
    handleChoose (index, row) {
      this.$emit('SelSpareparts', row.typename, row.id)
    }
  },
  components: {
    Selectsparetype,
    Selectmanufacturer,
    SelectSpareconMode
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
