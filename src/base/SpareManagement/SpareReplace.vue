<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-form :model="Query">
        <el-row >
          <el-col :span="18">
            <el-col :span="8">
                <div  @click="Show=true">
                  <el-form-item label="存放点：">
                    <el-input v-model="operation" readonly placeholder="请选择存放点"></el-input>
                  </el-form-item>
                  </div>
            </el-col>
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
        <!--  <el-col :span="12">
            <div class="fr" style="margin-top: 0">
              <el-button @click="handleWrite(0)"  type="success" :disabled="Loading" icon="el-icon-plus">添加</el-button>
            </div>
          </el-col>-->
        </el-row>
      </el-form>
      <el-table :data="tableData" v-loading="Loading" ref="table1" style="margin-top: 15px;">
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template>
        </el-table-column>
        <el-table-column prop="code" label="备件编码" ></el-table-column>
        <el-table-column prop="sparepartstypeid" label="备件类型" ></el-table-column>
        <el-table-column prop="manufacturerid" label="厂家"></el-table-column>
        <el-table-column prop="sparemodelid" label="备件型号"></el-table-column>
        <el-table-column prop="units" label="权属单位"></el-table-column>
          <el-table-column label="操作" width="140">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="handleWrite(2,scope.row)">详情</el-button>
            </template>
          </el-table-column>
      </el-table>
      <div  style="text-align: center">
        <el-pagination @current-change="getMore" @size-change="changeSize1" :current-page="currentPage"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="total"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
        <el-button @click="WriteClose" icon="el-icon-arrow-left">返回</el-button>
      </div>
    </div>
    <div class="write" v-show="showWrite">
      <Details :WriteState="WriteState" :DicList="DicList"
               @fatheretMore="getMore(currentPage)" @fatherClose="WriteClose" ref="Details"></Details>
    </div>

    <el-dialog top="1%" :visible.sync="sparetypeShow" title="选择备件类型" width="80%" :before-close="sparetypeClose">
      <Selectsparetype    @Selsparetypeid="Selsparetypeid"/>
    </el-dialog>
    <el-dialog top="1%" :visible.sync="SparemanufacturerShow" title="选择备件厂家" width="80%" :before-close="manufacturerClose">
      <Selectmanufacturer  @Selmanufacturerid="Selmanufacturerid"/>
    </el-dialog>
    <div v-if="sparemodelShow">
      <el-dialog top="1%" :visible.sync="sparemodelShow" title="选择备件型号" width="80%" :before-close="sparemodelClose">
        <SelectSpareconMode   :sparetypeid="sparepartstypeid" :sparemanufacturerid="manufacturerid"  @SelSpareconModelid="SelSpareconModelid"/>
      </el-dialog>
    </div>
    <el-dialog top="1%"  :visible.sync="Show" title="选择存放点" width="80%" :before-close="SelectUserOperationClose">
      <SelectUserOperation :check="check"  @SelectUserOperation="SelectUserOperation"/>
    </el-dialog>
  </div>
</template>

<script>
import { GlobalRes } from 'common/js/mixins'
import layuiTitle from 'base/layui-title'
import {DictionaryInfoList} from 'api/api'
import {GetSpareTypList, GetIdSpareTypList, DeleteSpareTyp} from 'api/BJGL'
import Details from 'base/SpareManagement/SpareReplaceDetail'
import Selectsparetype from 'base/SpareManagement/Selsparetypeid'
import Selectmanufacturer from 'base/SpareManagement/Selmanufacturerid'
import SelectSpareconMode from 'base/SpareManagement/SelSpareconModelid'
import SelectUserOperation from 'base/SpareManagement/SelectUserOperation'
export default {
  name: 'SpareReplace',
  mixins: [GlobalRes],
  data () {
    return {
      Query: {
        operationid: null,
        manufacturer: null,
        sparepartstype: null,
        sparemodel: null
      },
      operation: null,
      check: 6,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      Loading: false,
      tableData: [],
      tableLoading: false,
      showWrite: false,
      WriteState: 0, // 0为添加 1为编辑 2为查看
      WriteLoading: false,
      DicList: {storestate: []},
      sparetypeShow: false,
      SparemanufacturerShow: false,
      sparemodelShow: false,
      Show: false,
      sparepartstypeid: null,
      manufacturerid: null,
      sparemodelid: null

    }
  },
  activated () {
    this.getData1()
    this.getDic()
  },
  methods: {
    sparetypeClose () { this.sparetypeShow = !this.sparetypeShow },
    manufacturerClose () { this.SparemanufacturerShow = !this.SparemanufacturerShow },
    sparemodelClose () { this.sparemodelShow = !this.sparemodelShow },
    SelectUserOperationClose () { this.Show = false },
    SelectUserOperation (operation, name, id) {
      this.operation = name
      this.Query.operationid = id
    },
    Selsparetypeid (name, id) {
      this.sparetypeShow = false
      this.sparepartstypeid = id
      this.Query.sparepartstype = name
      this.sparemodelid = null
      this.Query.sparemodel = null
    },
    Selmanufacturerid (name, id) {
      this.SparemanufacturerShow = false
      this.Query.manufacturerid = id
      this.Query.manufacturer = name
      this.sparemodelid = null
      this.Query.sparemodel = null
    },
    SelSpareconModelid (name, id) {
      this.sparemodelShow = false
      this.sparemodelid = id
      this.Query.sparemodel = name
    },
    ResetQuery () {
      Object.assign(this.$data, this.$options.data.call(this))
      this.getData1()
    },
    getDic () {
      let arr = ['备件状态']
      this.$axios.post(DictionaryInfoList, arr).then(res => {
        if (res.errorCode === '200') {
          let data = res.data
          this.DicList.storestate = data.filter(i => { return i.type === '备件状态' })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    formatState (row) { return this.DicList.state[row.state] },
    getData1 () {
      /*  this.Loading = true
          this.$axios.get(GetSpareTypList, {
            params: {
              PageIndex: 1,
              PageSize: 10
            }}).then(res => {
            this.Loading = false
            if (res.errorCode !== '200') return this.$message.error(res.msg)
            this.tableData = res.data.list
            this.total = res.data.total
          }) */
      this.tableData = [{code: '123'}]
      this.total = 1
    },
    getMore (page) {
      /*  this.currentPage = page
          this.Loading = true
          this.$axios.get(GetSpareTypList, {params: Object.assign({}, this.Query, {
            PageIndex: this.currentPage,
            PageSize: this.pageSize
          })}).then(res => {
            this.Loading = false
            this.getDic()
            if (res.errorCode !== '200') return this.$message.error(res.msg)
            this.tableData = res.data.list
            this.total = res.data.total
          }) */
    },
    changeSize1 (page) {
      this.pageSize = page
      this.getMore(this.currentPage)
    },
    WriteClose () {
      Object.assign(this.$data.Query, this.$options.data().Query)
      Object.assign(this.$data.tableData, this.$options.data().tableData)
      this.showWrite = false
      this.$emit('fatherClose')
    },
    handleWrite (state, row) {
      this.WriteState = state
      this.showWrite = true
      /*    if (state) {
          this.$refs.Details.Loading = true
          this.$axios.get(GetIdSpareTypList, {
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
        } */
    }
    /* handle2 (row) {
        this.$confirm(`您确定要删除 ${row.code} 设备吗？`, '提示', {
          type: 'warning'
        }).then(() => {
          this.$axios.delete(DeleteSpareTyp, {
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
      } */

  },
  components: {
    layuiTitle,
    Details,
    Selectsparetype,
    Selectmanufacturer,
    SelectSpareconMode,
    SelectUserOperation
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
