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
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.title}}</div></td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>存放点名称</div></td>
              <td><div class="cell">
                <div v-if="WriteState == 2">{{WriteData.typename}}</div>
                <div v-if="WriteState !== 2" @click="SpareWarehouseShow=true">
                  <el-input v-model="WriteData.typename" readonly placeholder="请选择存放点名"></el-input>
                </div></div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">备件数量</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="sparenumber">
                  <el-input v-model="WriteData.sparenumber" type="number"  placeholder="请填写备件数量" clearable></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.sparenumber}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">区域</div></td>
              <td><div class="cell">{{WriteData.createtime}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">盘存状态</div></td>
              <td><div class="cell">{{WriteData.inventorystatus}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">盘存结果</div></td>
              <td><div class="cell">{{WriteData.Inventoryresults}}</div></td>
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
              <td><div class="cell">{{WriteData.realityname}}</div></td>
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
              <td><div class="cell">{{WriteData.realityname}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            </tbody>
          </table>
        </div>
      </el-form>
    </div>
      </el-tab-pane>
      <el-tab-pane label="盘存记录列表" v-if="WriteState===2">
        <div class="main" v-show="!showWrite">
          <el-form :model="Query">
            <el-row >
              <el-col :span="18">
                <el-col :span="8">
                  <el-form-item label="备件类型：">
                    <el-input v-model="Query.sparepartstype" placeholder="请填写备件类型"  @keyup.enter.native="getMore(1)"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="备件型号：">
                    <el-input v-model="Query.sparemodel" placeholder="请填写备件型号"  @keyup.enter.native="getMore(1)"></el-input>
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
            <el-table-column prop="sparepartstype" label="备件类型"></el-table-column>
            <el-table-column prop="manufacturerid" label="备件厂家"></el-table-column>
            <el-table-column prop="sparemodel" label="备件型号"></el-table-column>
            <el-table-column prop="warehouseid" label="存放点"></el-table-column>
            <el-table-column prop="inventorystatus" label="盘存状态"></el-table-column>
            <el-table-column prop="inventorytime" label="盘存时间"></el-table-column>
            <el-table-column prop="" label="盘存人"></el-table-column>
            <el-table-column label="操作" width="140">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="handleWrite(2,scope.row)">详情</el-button>
                <el-button type="text" size="mini" @click="handle2(scope.row)">删除</el-button>
              </template>
            </el-table-column>
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
      <SpareWarehousePicker :provinceid="WriteData.provinceid"  :cityid="WriteData.cityid" @SpareWarehousePicker="SpareWarehousePicker"/>
    </el-dialog>
    <div class="write" v-show="showWrite">
      <layuiTitle :title="WriteState1 === 0 ? '添加盘存记录' : WriteState1 === 1 ? '编辑盘存记录' : '盘存记录详情'"></layuiTitle>

      <Details :WriteState1="WriteState1"
               @fatheretMore="getMore(currentPage)" @fatherClose="WriteClose1" ref="Details"></Details>

    </div>
  </div>
</template>

<script>

import {EditSpareTyp, AddSpareTyp, GetSpareTypList, GetIdSpareTypList, DeleteSpareTyp} from 'api/BJGL'
import SpareWarehousePicker from 'base/SpareManagement/SpareWarehousePicker'
import layuiTitle from 'base/layui-title'
import Details from 'base/SpareManagement/InventoryRecords'
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
        sparepartstype: null,
        code: '',
        sparemodel: null
      },
      SpareWarehouseShow: false,
      ViewTabIndex: 0,
      isShow: false,
      Loading: false,
      WriteData: {
        id: null,
        cityname: '',
        typename: null, // 存放点名称
        depotsid: null, // 存放点
        realityname: '',
        createtime: null
      },
      WriteState1: null,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      tableLoading: false,
      showWrite: false,
      WriteLoading: false,
      Rules: {
        AreaList: [{ required: true, message: '请选择区域', trigger: 'change' }],
        typename: [{ required: true, message: '请填入类型名称', trigger: 'change' }],
        Belongtype: [{ required: true, message: '请选择所属类型', trigger: 'blur' }],
        typeencoding: [{ required: true, message: '请填入类型编码', trigger: 'change' }]
      }
    }
  },
  activated () {
    this.getData1()
  },
  methods: {
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
      this.tableData = [{cityname: '武汉'}]
      this.total = 1
    },
    ResetQuery () {
      Object.assign(this.$data, this.$options.data.call(this))
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

    changeTab () {
      if (this.ViewTabIndex === '0') {

      }
      if (this.ViewTabIndex === '1') {
        this.getData1()
      }
    },
    WriteClose () {
      this.showWrite = false
      this.ViewTabIndex = '0'
      this.$emit('fatherClose')
    },
    WriteClose1 () {
      this.showWrite = !this.showWrite
      this.ViewTabIndex = '1'
    },
    handleWrite (state, row) {
      this.WriteState1 = state
      this.showWrite = true
      /*   if (state) {
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
    SpareWarehousePicker (name, code, id) {
      this.WriteData.typename = name
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
    /*  this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali) {
          return this.$message.error('请补全信息！')
        } else {
          this.Loading = true
          this.$axios.post(AddSpareTyp, this.WriteData).then(res => {
            this.Loading = false
            if (res.errorCode !== '200') return this.$message.error(res.msg)
            this.$message.success('添加成功!')
            this.$emit('fatheretMore')
            this.WriteClose()
          })
        }
      }) */
    },
    SubEdit () {
      /*    this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali) {
          this.$message.error('请补全信息！')
        } else {
          this.Loading = true
          this.$axios.put(EditSpareTyp, this.WriteData).then(res => {
            this.Loading = false
            if (res.errorCode !== '200') return this.$message.error(res.msg)
            this.$message.success('编辑成功!')
            this.$emit('fatheretMore')
            this.ResetWrite()
            this.WriteClose()
          })
        }
      }) */
    }
  },
  components: {
    SpareWarehousePicker,
    layuiTitle,
    Details
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
