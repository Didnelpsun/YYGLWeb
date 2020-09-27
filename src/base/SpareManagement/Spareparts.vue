<template>
  <div class="write">
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
            <th colspan="1" rowspan="1" class="el-table_8_column_64     table-headerStyle"><div class="cell">操作</div></th>
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
            <tr class="el-table__row" v-if="WriteState !== 2" >
              <td><div class="cell"><i class="must">*</i>存放点名称</div></td>
              <td><div class="cell">
                <div @click="SpareWarehouseShow=true">
                  <el-form-item class="form-item" prop="depotsname">
                  <el-input v-model="WriteData.depotsname" readonly placeholder="请选择存放点名"></el-input>
                  </el-form-item>
                </div></div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
           <!-- <tr class="el-table__row">
              <td colspan="3"  style="background-color:rgb(156, 186, 95)"><div class="cell">设置备件属性</div></td>
            </tr>-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>备件类型</div></td>
              <td><div class="cell">
                <div v-if="WriteState == 2">{{WriteData.typename}}</div>
                <div v-if="WriteState !== 2" @click="sparetypeShow=true">
                  <el-form-item class="form-item" prop="typename">
                  <el-input v-model="WriteData.typename" readonly placeholder="请选择备件类型"></el-input>
                  </el-form-item>
                </div></div>
              </td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>备件厂家</div></td>
              <td><div class="cell">
                <div v-if="WriteState == 2">{{WriteData.manufacturername}}</div>
                <div v-if="WriteState !== 2" @click="SparemanufacturerShow=true">
                  <el-form-item class="form-item" prop="manufacturername">
                  <el-input v-model="WriteData.manufacturername" readonly placeholder="请选择厂家"></el-input>
                  </el-form-item>
                </div></div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">权属</div></td>
              <td><div class="cell">
                <div v-if="WriteState == 2">{{WriteData.unitname}}</div>
                <div v-if="WriteState !== 2" @click="unitsShow=true">
                  <el-form-item class="form-item" prop="unitname">
                  <el-input v-model="WriteData.unitname" readonly placeholder="请选择权属"></el-input>
                  </el-form-item>
                </div></div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>备件型号</div></td>
              <td><div class="cell">
                <div v-if="WriteState == 2">{{WriteData.sparemodel}}</div>
                <div v-if="WriteState !== 2" @click="sparemodelShow=true">
                  <el-form-item class="form-item" prop="sparemodel">
                  <el-input v-model="WriteData.sparemodel" readonly placeholder="请选择备件型号"></el-input>
                  </el-form-item>
                </div></div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <!--<tr class="el-table__row" >
              <td colspan="3" style="background-color: rgb(230, 189, 189)"><div class="cell">扫码</div></td>
            </tr>-->

            <tr class="el-table__row"  v-if="WriteState == 0">
              <td><div class="cell">扫码</div></td>
              <td><div class="cell">
                <div>
                  <el-input v-model="code"   label-width="0"  clearable placeholder="请扫备件编码"></el-input>
                </div></div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">城市</div></td>
              <td><div class="cell">{{WriteData.cityname}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">区域</div></td>
              <td><div class="cell">{{WriteData.areaname}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">状态</div></td>
              <td><div class="cell">{{WriteData.storestate |state}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">存放点</div></td>
              <td><div class="cell">{{WriteData.depotsname}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState!==0" >
              <td><div class="cell">备件编码</div></td>
              <td v-show="WriteState==2"><div class="cell">{{WriteData.code}}</div></td>
              <td v-show="WriteState==1"><div class="cell">
                <el-form-item  class="form-item" label-width="0"  prop="code">
                  <el-input v-model="WriteData.code" placeholder="请扫资产编码"></el-input>
                </el-form-item>
              </div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState!==0" >
              <td><div class="cell">备件质保编号</div></td>
              <td  v-show="WriteState==2"><div class="cell">{{WriteData.warrantycode}}</div></td>
              <td v-show="WriteState==1"><div class="cell">
                <el-form-item  class="form-item" label-width="0"  prop="warrantycode">
                  <el-input v-model="WriteData.warrantycode" placeholder="请扫资产编码"></el-input>
                </el-form-item>
              </div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState!==0">
              <td><div class="cell">资产编码</div></td>
              <td  v-show="WriteState==2"><div class="cell">{{WriteData.assetsencoding}}</div></td>
              <td v-show="WriteState==1"><div class="cell">
                <el-form-item  class="form-item" label-width="0"  prop="assetsencoding">
                  <el-input v-model="WriteData.assetsencoding" placeholder="请扫资产编码"></el-input>
                </el-form-item>
              </div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">二维码</div></td>
              <td><div class="cell">{{WriteData.qrcode}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">备注</div></td>
              <td><div class="cell">{{WriteData.reamrk}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">提交人</div></td>
              <td><div class="cell">{{WriteData.realityname}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
           <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">提交时间</div></td>
              <td><div class="cell">{{WriteData.createtime}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            </tbody>
          </table>
        </div>
      </el-form>
      <el-form  v-if="showloading"  ref="WriteForm1" label-width="0" :show-message="false">
        <div class="el-table__body-wrapper is-scrolling-none"  v-for="(item,key) in WriteData.list" :key="key">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
            <colgroup>
              <col width="80"/>
              <col width="100"/>
              <!--  <col width="50"/>-->
              <col width="100"/>
            </colgroup>
            <tbody>
            <tr class="el-table__row">
              <td><div class="cell">备件编码</div></td>
              <td><div class="cell">
                <div>
                  <el-input v-model="item.code" label-width="0" @input="update($event)"  readonly placeholder="请扫备件编码"></el-input>
                </div></div>
              </td>
              <td><div class="cell"><el-button type="text" @click="handledelete(key)">删除</el-button></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">资产编码</div></td>
              <td><div class="cell">
                <el-form-item  class="form-item" label-width="0"  prop="assetsencoding">
                  <el-input v-model="item.assetsencoding" @input="update($event)" placeholder="请扫资产编码"></el-input>
                </el-form-item>
              </div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">质保编码</div></td>
              <td><div class="cell">
                <el-form-item  class="form-item" label-width="0" prop="warrantycode">
                  <el-input v-model="item.warrantycode" @input="update($event)"   placeholder="请扫质保编码"></el-input>
                </el-form-item>
              </div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            </tbody>
          </table>
        </div>
      </el-form>
    </div>
    <div class="center">
      <el-button v-show="WriteState !==2" @click="SubWrite" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-check'">提交</el-button>
      <el-button @click="WriteClose" icon="el-icon-arrow-left">返回</el-button>
    </div>
    <el-dialog top="1%" :visible.sync="sparetypeShow" title="选择备件类型" width="80%" :before-close="sparetypeClose">
      <Selectsparetype :provinceid="WriteData.provinceid"   :cityid="WriteData.cityid" @Selsparetypeid="Selsparetypeid"/>
    </el-dialog>
    <el-dialog top="1%" :visible.sync="SparemanufacturerShow" title="选择备件厂家" width="80%" :before-close="manufacturerClose">
      <Selectmanufacturer :provinceid="WriteData.provinceid" :cityid="WriteData.cityid" @Selmanufacturerid="Selmanufacturerid"/>
    </el-dialog>
    <div v-if="sparemodelShow">
      <el-dialog top="1%" :visible.sync="sparemodelShow"  title="选择备件型号" width="80%" :before-close="sparemodelClose">
        <SelectSpareconMode  :provinceid="WriteData.provinceid"  :sparetypeid="WriteData.sparepartstypeid" :sparemanufacturerid="WriteData.manufacturerid" :cityid="WriteData.cityid" @SelSpareconModelid="SelSpareconModelid"/>
      </el-dialog>
    </div>
    <div v-if="SpareWarehouseShow">
    <el-dialog top="1%" :visible.sync="SpareWarehouseShow" title="选择存放点" width="80%" :before-close="SelectUserOperationClose">
      <SelectUserOperation :check="check"  @SelectUserOperation="SelectUserOperation"/>
    </el-dialog>
    </div>
    <el-dialog top="1%" :visible.sync="unitsShow" title="选择存放点" width="80%" :before-close="SpareWarehousePickerClose">
      <SpareWarehousePicker :DicList="DicList"  @SpareWarehousePicker="SpareWarehousePicker"/>
    </el-dialog>
  </div>
</template>

<script>
import {GlobalRes} from 'common/js/mixins'
import Selectsparetype from 'base/SpareManagement/Selsparetypeid'
import Selectmanufacturer from 'base/SpareManagement/Selmanufacturerid'
import SelectSpareconMode from 'base/SpareManagement/SelSpareconModelid'
import SelectUserOperation from 'base/SpareManagement/SelectUserOperation'
import SpareWarehousePicker from 'base/SpareManagement/SpareWarehousePicker'

import {Editspareparts, Addspareparts} from 'api/BJGL'
export default {
  name: 'Spareparts',
  mixins: [GlobalRes],
  props: {
    WriteState: {
      type: Number,
      default: 0
    },
    DicList: {
      type: Object,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      code: null,
      unitsShow: false,
      sparetypeShow: false,
      sparemodelShow: false,
      SparemanufacturerShow: false,
      SpareWarehouseShow: false,
      isShow: false,
      check: 1,
      haslist: null,
      Loading: false,
      showloading: true,
      WriteData: {
        typename: null, // 备件类型名称
        sparepartstypeid: '', // 备件类型id
        manufacturerid: '', // 备件厂家id
        sparemodel: '', // 备件型号名称
        sparemodelid: '', // 备件型号id
        manufacturername: '', // 备件厂家名称
        depotsname: '', // 存放点名称
        depotsid: '', // 存放点di
        /*   operationtype: 1,
        storestate: 0 */
        list: [],
        unitname: ''
      },
      Rules: {
        depotsname: [{ required: true, message: '请选择存放点名称', trigger: 'change' }],
        unitname: [{ required: true, message: '请选择权属', trigger: 'change' }],
        sparemodel: [{ required: true, message: '请选择备件型号', trigger: 'change' }],
        manufacturername: [{ required: true, message: '请选择厂家', trigger: 'change' }],
        typename: [{ required: true, message: '请选择备件类型', trigger: 'change' }]

      }
    }
  },

  methods: {
    update: function (e) {
      this.$forceUpdate()
    },
    handledelete (val) {
      this.showloading = false
      this.WriteData.list.splice(val, 1)
      this.showloading = true
    },
    ResetWrite () {
      Object.assign(this.$data.WriteData, this.$options.data().WriteData)
      this.$refs.WriteForm.resetFields()
    },
    setWriteData (data) {
      this.WriteData = data
    },
    WriteClose () {
      this.ResetWrite()
      this.$emit('fatherClose')
    },
    SubWrite () {
      if (this.WriteState === 0) this.SubAdd()
      if (this.WriteState === 1) this.SubEdit()
    },
    Selsparetypeid (name, id) {
      this.sparetypeShow = false
      this.WriteData.sparepartstypeid = id
      this.WriteData.typename = name
      this.WriteData.sparemodelid = null
      this.WriteData.sparemodel = null
    },
    Selmanufacturerid (name, id) {
      this.SparemanufacturerShow = false
      this.WriteData.manufacturerid = id
      this.WriteData.manufacturername = name
      this.WriteData.sparemodelid = null
      this.WriteData.sparemodel = null
    },
    SelSpareconModelid (name, id) {
      this.sparemodelShow = false
      this.WriteData.sparemodelid = id
      this.WriteData.sparemodel = name
    },
    SelectUserOperation (operation, name, Warehousesid) {
      this.SpareWarehouseShow = false
      this.WriteData.depotsname = name
      this.WriteData.depotsid = Warehousesid
    },
    SpareWarehousePicker (name, code, id) {
      this.unitsShow = false
      this.WriteData.unitname = name
      this.WriteData.units = id
    },
    SelectUserOperationClose () { this.SpareWarehouseShow = false },
    SpareWarehousePickerClose () { this.unitsShow = false },
    sparetypeClose () { this.sparetypeShow = !this.sparetypeShow },
    manufacturerClose () { this.SparemanufacturerShow = !this.SparemanufacturerShow },
    sparemodelClose () { this.sparemodelShow = !this.sparemodelShow },
    SubAdd () {
      this.$refs.WriteForm.validate((vali, msg) => {
        if (this.WriteData.list.length === 0) return this.$message.error('请扫码！')
        this.WriteData.list.forEach(item => {
          for (var key in item) {
            this.haslist = item[key] === ''
            if (this.haslist) { return }
          }
        })
        if (this.haslist) { return this.$message.error('资产编码或质保编码未扫码！') }
        if (!vali) {
          return this.$message.error('请补全信息！')
        } else {
          this.Loading = true
          this.showloading = false
          this.$axios.post(Addspareparts, this.WriteData).then(res => {
            this.Loading = false
            this.showloading = true
            if (res.errorCode !== '200') return this.$message.error(res.msg)
            this.$message.success('添加成功!')
            this.$emit('fatheretMore')
            this.WriteClose()
          })
        }
      })
    },
    SubEdit () {
      this.$refs.WriteForm.validate((vali, msg) => {
        if (this.WriteData.warrantycode === '') return this.$message.error('质保编码信息不得为空！')
        if (this.WriteData.assetsencoding === '') return this.$message.error('资产编码信息不得为空！')
        if (this.WriteData.code === '') return this.$message.error('备件编码信息不得为空！')
        if (!vali) {
          return this.$message.error('请补全信息！')
        } else {
          this.Loading = true
          this.$axios.put(Editspareparts, this.WriteData).then(res => {
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
    Selectsparetype,
    Selectmanufacturer,
    SelectSpareconMode,
    SelectUserOperation,
    SpareWarehousePicker
  },
  watch: {
    code () {
      if (this.WriteData.list) {
        var haslist = this.WriteData.list.find(val => {
          return val.code === this.code
        })
      }
      if (this.code && !haslist) {
        this.WriteData.list.push({code: this.code, assetsencoding: '', warrantycode: ''})
      }
      if (haslist) {
        this.$message.error('请不要扫相同备件编码！')
      }
      this.code = ''
    }
  },
  filters: {
    state (val) {
      val = parseInt(val)
      return val === 1 ? '在网' : val === 2 ? '备件' : val === 3 ? '故障' : val === 4 ? '维修' : '报废'
    }
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
