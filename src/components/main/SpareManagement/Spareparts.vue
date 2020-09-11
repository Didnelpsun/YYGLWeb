<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-form :model="Query">
        <el-row >
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="备件类型：">
                <el-input v-model="Query.sparepartstype" clearable placeholder="请填写备件类型"  @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="备件型号：">
                <el-input v-model="Query.sparemodel" clearable placeholder="请填写备件型号"  @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="备件编码：">
                <el-input v-model="Query.code" clearable placeholder="请填写备件编码"  @keyup.enter.native="getMore(1)"></el-input>
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
          <el-col :span="12">
            <p class="SearchResult">查询结果</p>
          </el-col>
          <el-col :span="12">
            <div class="fr" style="margin-top: 0">
              <el-button @click="handleSpareparts(0)"  type="success" :disabled="Loading">上站</el-button>
              <el-button @click="handleSpareparts(1)"  type="success" :disabled="Loading" >替换</el-button>
              <el-button @click="handleSpareparts(2)"  type="success" :disabled="Loading" >点验</el-button>
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
        <el-table-column prop="depotsname" label="权属"></el-table-column>
        <el-table-column prop="sparemodel" label="备件型号"></el-table-column>
        <el-table-column prop="depots" label="存放点 "></el-table-column>
        <el-table-column prop="warrantycode" label="备件质保编号" width="120"></el-table-column>
        <el-table-column prop="assetsencoding" label="资产编码"></el-table-column>
        <el-table-column prop="qrcode" label="二维码"></el-table-column>
        <el-table-column prop="realityname" label="提交人"></el-table-column>
        <el-table-column prop="createtime" label="提交时间"></el-table-column>
      <!--  <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleWrite(2,scope.row)">详情</el-button>
            <el-button type="text" size="mini" @click="handleWrite(1, scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="handle2(scope.row)">删除</el-button>
          </template>
        </el-table-column>-->
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
      <SpareCheck   v-show="Sparepartstate === 2" :WriteState="WriteState" :DicList="DicList"
               @fatheretMore="getMore(currentPage)" @fatherClose="WriteClose" ref="SpareCheck"></SpareCheck>
      <SpareReplace  v-show="Sparepartstate === 1" :WriteState="WriteState" :DicList="DicList"
                  @fatheretMore="getMore(currentPage)" @fatherClose="WriteClose" ref="SpareReplace"></SpareReplace>
    </div>

  </div>
</template>

<script>
import { GlobalRes } from 'common/js/mixins'
import layuiTitle from 'base/layui-title'
import {DictionaryInfoList} from 'api/api'
import {GetsparepartsList, GetsparepartsidList, Deletespareparts} from 'api/BJGL'
import Details from 'base/SpareManagement/Spareparts'
import SpareCheck from 'base/SpareManagement/SpareCheck'
import SpareReplace from 'base/SpareManagement/SpareReplace'
export default {
  name: 'Spareparts',
  mixins: [GlobalRes],
  data () {
    return {
      Query: {
        code: null,
        sparepartstype: null,
        sparemodel: null
      },
      handleShow: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      Loading: false,
      tableData: [],
      tableLoading: false,
      showWrite: false,
      WriteState: 0, // 0为添加 1为编辑 2为查看
      Sparepartstate: 0, // 0为上站 1为替换 2点验
      WriteLoading: false,
      DicList: {storestate: []}
    }
  },
  activated () {
    this.getData1()
    this.getDic()
  },
  methods: {
    handleSpareparts (val) {
      this.Sparepartstate = val
      this.showWrite = true
      this.handleShow = true
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
        this.getDic()
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
    SpareReplace
  }
}
</script>

<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
