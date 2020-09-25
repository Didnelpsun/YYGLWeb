<template>
  <div class="write">
    <el-tabs class="content-card" v-model="ViewTabIndex"  v-loading="WriteLoading" @tab-click="changeTab">
      <el-tab-pane :label="WriteState===0? '盘存任务新增':WriteState===1?'盘存任务编辑':'盘存任务详情'">
    <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--small">
      <!--表头-->
      <div class="el-table__header-wrapper">
        <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
          <colgroup>
            <col width="80"/>
            <col width="100"/>
            <!--  <col width="50"/>-->
            <col width="100"/>
          </colgroup>
          <thead>
          <tr>
            <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
            <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
            <!--<th colspan="1" rowspan="1" class="el-table_8_column_62     table-headerStyle"><div class="cell">照片</div></th>-->
            <th colspan="1" rowspan="1" class="el-table_8_column_64     table-headerStyle"><div class="cell">填写要求</div></th>
          </tr>
          </thead>
        </table>
      </div>
      <!--表体-->
      <el-form :model="WriteData" :rules="Rules" v-loading="Loading" ref="WriteForm" label-width="0" :show-message="false">
        <div class="el-table__body-wrapper is-scrolling-none">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
            <colgroup>
              <col width="80"/>
              <col width="100"/>
              <!--  <col width="50"/>-->
              <col width="100"/>
            </colgroup>
            <tbody>
            <tr class="el-table__row">
              <td><div class="cell">标题</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="title">
                  <el-input v-model="WriteData.title"  placeholder="请填写标题" clearable></el-input>
                </el-form-item>
              </div></td>
              <td v-show="WriteState == 2"><div class="cell">{{WriteData.title}}</div></td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>存放点名称</div></td>
              <td><div class="cell">
                <div v-show="WriteState == 2">{{WriteData.depotsname}}</div>
                <div v-show="WriteState !== 2" @click="SpareWarehouseShow=true">
                  <el-form-item class="form-item" prop="depotsname">
                  <el-input v-model="WriteData.depotsname" readonly placeholder="请选择存放点名"></el-input>
                  </el-form-item>
                </div></div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">备件数量</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="sparenumber">
                  <el-input v-model="WriteData.sparenumber" type="number"   placeholder="请填写备件数量" clearable></el-input>
                </el-form-item>
              </div></td>
              <td v-show="WriteState == 2"><div class="cell">{{WriteData.sparenumber}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">区域</div></td>
              <td><div class="cell">{{WriteData.cityname}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">盘存状态</div></td>
              <td><div class="cell">{{WriteData.inventorystatus  ? '结束' : '未结束'}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">盘增数量</div></td>
              <td><div class="cell">{{WriteData.inventorycount}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">盘对数量</div></td>
              <td><div class="cell">{{WriteData.facenumber}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">盘错数量</div></td>
              <td><div class="cell">{{WriteData.wrongnumber}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">盘减数量</div></td>
              <td><div class="cell">{{WriteData.wrongnumber}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">提交时间</div></td>
              <td><div class="cell">{{WriteData.createtime}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">提交人</div></td>
              <td><div class="cell">{{WriteData.createusername}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            </tbody>
          </table>
        </div>
      </el-form>
    </div>
      </el-tab-pane>
      <el-tab-pane label="盘存记录列表" v-if="Inventoryshow">
        <div class="main" v-show="!showWrite">
          <el-form :model="Query" ref="Inventory">
            <el-row >
              <el-col :span="18">
                <el-col :span="8">
                  <!--<div @click="sparetypeShow=true">
                    <el-form-item label="备件类型：">
                      <el-input v-model="Query.typename" clearable placeholder="请选择备件类型"></el-input>
                    </el-form-item>
                  </div>-->
                  <el-form-item label="备件类型：">
                    <el-input v-model="Query.typename"  @keyup.enter.native="getMore(1)" clearable placeholder="请选择备件类型"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                 <!-- <div @click="sparemodelShow=true">
                  <el-form-item label="备件型号：">
                    <el-input v-model="Query.sparemodel" clearable placeholder="请选择备件型号"></el-input>
                  </el-form-item>
                </div>-->
                  <el-form-item label="备件型号：">
                    <el-input v-model="Query.sparemodel" @keyup.enter.native="getMore(1)" clearable placeholder="请选择备件型号"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="备件编码：">
                    <el-input v-model="Query.code" placeholder="请填写备件编码"  @keyup.enter.native="getMore(1)"></el-input>
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
              <el-col :span="18">
                <p class="SearchResult">查询结果</p>
              </el-col>
              <el-col :span="6">
                <div class="fr" style="margin-top: 0">
                  <el-button @click="handleWrite(0)"  type="success" :disabled="Loading" icon="el-icon-plus">添加</el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>
          <el-table :data="tableData" v-loading="Loading" ref="table1" style="margin-top: 15px;">
            <el-table-column label="序号" width="50">
              <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template>
            </el-table-column>
            <el-table-column prop="cityname" label="地市"></el-table-column>
            <el-table-column prop="code" label="备件编码"></el-table-column>
            <el-table-column prop="typename" label="备件类型"></el-table-column>
            <el-table-column prop="manufacturername" label="备件厂家"></el-table-column>
            <el-table-column prop="sparemodel" label="备件型号"></el-table-column>
            <el-table-column prop="depotname" label="存放点"></el-table-column>
            <el-table-column prop="Inventoryresults" :formatter="showInventoryresults" label="盘存状态"></el-table-column>
            <el-table-column prop="createtime" label="盘存时间"></el-table-column>
            <el-table-column prop="realityname" label="盘存人"></el-table-column>
          <!--  <el-table-column label="操作" width="140">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="handleWrite(2,scope.row)">详情</el-button>
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
      </el-tab-pane>
    </el-tabs>
    <div class="center">
      <el-button v-show="WriteState !==2&&!showWrite" @click="SubWrite" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-check'">提交</el-button>
      <el-button v-show="!showWrite" @click="WriteClose" icon="el-icon-arrow-left">返回</el-button>
    </div>
    <el-dialog top="1%" :visible.sync="SpareWarehouseShow" title="选择存放点" width="80%" :before-close="SpareWarehousClose">
      <SpareWarehousePicker  @SpareWarehousePicker="SpareWarehousePickers"/>
    </el-dialog>
    <div class="write" v-show="showWrite">
      <layuiTitle :title="WriteState1 === 0 ? '添加盘存记录' : WriteState1 === 1 ? '编辑盘存记录' : '盘存记录详情'"></layuiTitle>

      <Details :WriteState1="WriteState1" :inventoryid="WriteData.id" :DicList="DicList"
               @fatheretMore="getMore(currentPage)" @fatherClose="WriteClose1" ref="Details"></Details>

    </div>
  <!--  <el-dialog top="1%" :visible.sync="sparetypeShow" title="选择备件类型" width="80%" :before-close="sparetypeClose">
      <Selectsparetype    @Selsparetypeid="Selsparetypeid"/>
    </el-dialog>
    <div v-if="sparemodelShow">
      <el-dialog top="1%" :visible.sync="sparemodelShow" title="选择备件型号" width="80%" :before-close="sparemodelClose">
        <SelectSpareconMode   :sparetypeid="sparepartstypeid"   @SelSpareconModelid="SelSpareconModelid"/>
      </el-dialog>
    </div>-->
  </div>
</template>

<script>
import {DictionaryInfoList} from 'api/api'
import {AddInventoryTask, EditInventoryTask, GetInventoryrecords} from 'api/BJGL'
import SpareWarehousePicker from 'base/SpareManagement/SpareWarehousePicker'
import layuiTitle from 'base/layui-title'
import Details from 'base/SpareManagement/InventoryRecords'
/* import SelectSpareconMode from 'base/SpareManagement/SelSpareconModelid'
import Selectsparetype from 'base/SpareManagement/Selsparetypeid' */
export default {
  name: 'Inventory',
  props: {
    WriteState: {
      type: Number,
      default: 0// 0为添加 1为编辑 2为查看
    }
  },
  data () {
    return {
      Query: {
        typename: null,
        code: null,
        sparemodel: null
      },
      /* sparepartstypeid: null, */
      SpareWarehouseShow: false,
      ViewTabIndex: 0,
      isShow: false,
      Loading: false,
      WriteData: {
        depotsid: null, // 存放点
        sparenumbe: null,
        titile: null
      },
      Inventoryshow: false,
      sparetypeShow: false,
      sparemodelShow: false,
      WriteState1: null,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      tableLoading: false,
      showWrite: false,
      WriteLoading: false,
      Rules: {
        /* depotsname: [{ required: true, message: '请选择存放点', trigger: 'change' }] */
        sparenumber: [{required: 'true', message: '备件数量不能为空', trigger: 'change'}]
      },
      DicList: {}
    }
  },
  activated () {
    this.getData1()
    this.getDic()
  },
  methods: {
    /* sparetypeClose () { this.sparetypeShow = !this.sparetypeShow }, */
    /*  sparemodelClose () { this.sparemodelShow = !this.sparemodelShow },
    Selsparetypeid (name, id) {
      this.sparetypeShow = false
      this.sparepartstypeid = id
      this.Query.typename = name
      this.Query.sparemodelid = null
      this.Query.sparemodel = null
    },
    SelSpareconModelid (name, id) {
      this.sparemodelShow = false
      this.Query.sparemodel = name
    }, */
    open (state) {
      state === 2 ? this.Inventoryshow = true : this.Inventoryshow = false
    },
    showInventoryresults (val) {
      val = parseInt(val.Inventoryresults)
      return val === 1 ? '在网' : val === 2 ? '备件' : val === 3 ? '故障' : val === 4 ? '维修' : '报废'
    },
    getData1 () {
      this.Loading = true
      this.$axios.get(GetInventoryrecords, {
        params: {
          PageIndex: 1,
          PageSize: 10,
          Id: this.WriteData.id
        }}).then(res => {
        this.Loading = false
        if (res.errorCode !== '200') return this.$message.error(res.msg)
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    getDic () {
      let arr = ['备件状态']
      this.$axios.post(DictionaryInfoList, arr).then(res => {
        if (res.errorCode === '200') {
          let data = res.data
          this.DicList.newsparepartsstate = data.filter(i => { return i.type === '备件状态' })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    ResetQuery () {
      Object.assign(this.$data.Query, this.$options.data().Query)
      this.$refs.Inventory.resetFields()
      this.getData1()
    },
    getMore (page) {
      this.currentPage = page
      this.Loading = true
      this.$axios.get(GetInventoryrecords, {params: Object.assign({}, this.Query, {
        PageIndex: this.currentPage,
        PageSize: this.pageSize,
        Id: this.WriteData.id
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

    changeTab () {
      if (this.ViewTabIndex === '0') {
        this.getDic()
      }
      if (this.ViewTabIndex === '1') {
        this.getData1()
        this.getDic()
      }
    },
    WriteClose () {
      this.showWrite = false
      this.ViewTabIndex = '0'
      Object.assign(this.$data.WriteData, this.$options.data().WriteData)
      this.$refs.WriteForm.resetFields()
      this.$emit('fatherClose')
    },
    WriteClose1 () {
      this.showWrite = !this.showWrite
      this.ViewTabIndex = '1'
    },
    handleWrite (state, row) {
      this.WriteState1 = state
      this.showWrite = true
      if (state) {
        this.$refs.Details.Loading = true
        this.$axios.get(GetInventoryrecords, {
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
      /*     this.$confirm(`您确定要删除 ${row.code} 设备吗？`, '提示', {
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
        }) */
    },
    SpareWarehousePickers (name, code, id) {
      this.SpareWarehouseShow = false
      this.WriteData.depotsname = name
      this.WriteData.depotsid = id
    },
    SpareWarehousClose () {
      this.SpareWarehouseShow = false
    },
    ResetWrite () {
      Object.assign(this.$data.WriteData, this.$options.data().WriteData)
      this.$refs.WriteForm.resetFields()
    },
    setWriteData (data) {
      this.WriteData = data
    },
    SubWrite () {
      if (this.WriteState === 0) this.SubAdd()
      if (this.WriteState === 1) this.SubEdit()
    },
    SubAdd () {
      this.$refs.WriteForm.validate((vali, msg) => {
        if (this.WriteData.depotsname === undefined) return this.$message.error('存放点未选择！')
        if (!vali) {
          return this.$message.error(msg.sparenumber[0])
        } else {
          this.Loading = true
          this.$axios.post(AddInventoryTask, {title: this.WriteData.title, depotsid: this.WriteData.depotsid, sparenumber: this.WriteData.sparenumber}).then(res => {
            this.Loading = false
            if (res.errorCode !== '200') return this.$message.error(res.msg)
            this.$message.success('添加成功!')
            this.$emit('fatheretMore')
            this.ResetWrite()
            this.WriteClose()
          })
        }
      })
    },
    SubEdit () {
      console.log()
      this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali) {
          this.$message.error(msg.sparenumber[0])
        } else {
          this.Loading = true
          this.$axios.put(EditInventoryTask, {title: this.WriteData.title, depotsid: this.WriteData.depotsid, sparenumber: this.WriteData.sparenumber, Id: this.WriteData.id}).then(res => {
            this.Loading = false
            if (res.errorCode !== '200') return this.$message.error(res.msg)
            this.$message.success('编辑成功!')
            this.$emit('fatheretMore')
            this.ResetWrite()
            this.WriteClose()
          })
        }
      })
    }
  },
  components: {
    SpareWarehousePicker,
    layuiTitle,
    Details
  /*  Selectsparetype,
    SelectSpareconMode */
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
