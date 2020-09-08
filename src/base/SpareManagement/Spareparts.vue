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
              <td><div class="cell"><i class="must">*</i>存放点名称</div></td>
              <td><div class="cell">
                <div v-if="WriteState == 2">{{WriteData.typename}}</div>
                <div v-if="WriteState !== 2" @click="SpareWarehouseShowchange">
                  <el-input v-model="WriteData.typename" readonly placeholder="请选择存放点名"></el-input>
                </div></div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td colspan="3"  style="background-color:rgb(156, 186, 95)"><div class="cell">设置备件属性</div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>备件类型</div></td>
              <td><div class="cell">
                <div v-if="WriteState == 2">{{WriteData.sparepartstype}}</div>
                <div v-if="WriteState !== 2" @click="sparetypeShow=true">
                  <el-input v-model="WriteData.sparepartstype" readonly placeholder="请选择备件类型"></el-input>
                </div></div>
              </td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>备件厂家</div></td>
              <td><div class="cell">
                <div v-if="WriteState == 2">{{WriteData.manufacturer}}</div>
                <div v-if="WriteState !== 2" @click="SparemanufacturerShow=true">
                  <el-input v-model="WriteData.manufacturer" readonly placeholder="请选择厂家"></el-input>
                </div></div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>权属</div></td>
              <td><div class="cell">
                <div v-if="WriteState == 2">{{WriteData.unitsname}}</div>
                <div v-if="WriteState !== 2" @click="unitsShowchange">
                  <el-input v-model="WriteData.unitsname" readonly placeholder="请选择权属"></el-input>
                </div></div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>备件型号</div></td>
              <td><div class="cell">
                <div v-if="WriteState == 2">{{WriteData.sparemodel}}</div>
                <div v-if="WriteState !== 2" @click="sparemodelShow=true">
                  <el-input v-model="WriteData.sparemodel" readonly placeholder="请选择备件型号"></el-input>
                </div></div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" >
              <td colspan="3" style="background-color: rgb(230, 189, 189)"><div class="cell">扫码</div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">备件编码</div></td>
              <td><div class="cell">
                <div v-if="WriteState !== 2">
                  <el-input v-model="WriteData.code" clearable placeholder="请扫备件编码"></el-input>
                </div></div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">资产编码</div></td>
              <td><div class="cell">
                <el-form-item  class="form-item" prop="assetsencoding" v-if="WriteState !== 2">
                  <el-input v-model="WriteData.assetsencoding" clearable placeholder="请扫资产编码"></el-input>
                </el-form-item>
                </div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">质保编码</div></td>
              <td><div class="cell">
                  <el-form-item  class="form-item" prop="warrantycode" v-if="WriteState !== 2">
                     <el-input v-model="WriteData.warrantycode"  clearable placeholder="请扫质保编码"></el-input>
                  </el-form-item>
                </div>
              </td>
              <td><div class="cell"></div></td>
            </tr>

        <!--    <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">提交时间</div></td>
              <td><div class="cell">{{WriteData.createtime}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">提交人</div></td>
              <td><div class="cell">{{WriteData.realityname}}</div></td>
              <td><div class="cell"></div></td>
            </tr>-->
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
      <el-dialog top="1%" :visible.sync="sparemodelShow" title="选择备件型号" width="80%" :before-close="sparemodelClose">
        <SelectSpareconMode  :provinceid="WriteData.provinceid"  :sparetypeid="WriteData.sparepartstypeid" :sparemanufacturerid="WriteData.manufacturerid" :cityid="WriteData.cityid" @SelSpareconModelid="SelSpareconModelid"/>
      </el-dialog>
    </div>
    <el-dialog top="1%" :visible.sync="Show" title="选择存放点" width="80%" :before-close="SpareWarehousClose">
      <SpareWarehousePicker :provinceid="WriteData.provinceid"  :cityid="WriteData.cityid" @SpareWarehousePicker="SpareWarehousePicker"/>
    </el-dialog>
  </div>
</template>

<script>
import {GlobalRes} from 'common/js/mixins'
import Selectsparetype from 'base/SpareManagement/Selsparetypeid'
import Selectmanufacturer from 'base/SpareManagement/Selmanufacturerid'
import SelectSpareconMode from 'base/SpareManagement/SelSpareconModelid'
import SpareWarehousePicker from 'base/SpareManagement/SpareWarehousePicker'

import {Editmaintenanceconfig, Addmaintenanceconfig} from 'api/BJGL'
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
      Show: false,
      unitsShow: false,
      manufactureridShow: false,
      sparetypeShow: false,
      sparemodelShow: false,
      SparemanufacturerShow: false,
      SpareWarehouseShow: false,
      isShow: false,
      Loading: false,
      WriteData: {
        id: null,
        cityname: '',
        remark: '',
        storestate: null,
        realityname: '',
        createtime: null,
        sparepartstype: null, // 备件类型名称
        sparepartstypeid: '', // 备件类型id
        manufacturerid: '', // 备件厂家id
        sparemodel: '', // 备件型号名称
        sparemodelid: '', // 备件型号id
        manufacturer: '', // 备件厂家名称
        typename: '', // 存放点名称
        warehouseid: ''// 存放点di
      },
      Rules: {
        Belongtype: [{ required: true, message: '请选择所属类型', trigger: 'blur' }]

      }
    }
  },

  methods: {
    SpareWarehouseShowchange () {
      this.SpareWarehouseShow = true
      this.Show = true
    },
    unitsShowchange () {
      this.Show = true
      this.unitsShow = true
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
      this.WriteData.sparepartstype = name
      this.WriteData.sparemodelid = null
      this.WriteData.sparemodel = null
    },
    Selmanufacturerid (name, id) {
      this.SparemanufacturerShow = false
      this.WriteData.manufacturerid = id
      this.WriteData.manufacturer = name
      this.WriteData.sparemodelid = null
      this.WriteData.sparemodel = null
    },
    SelSpareconModelid (name, id) {
      this.sparemodelShow = false
      this.WriteData.sparemodelid = id
      this.WriteData.sparemodel = name
    },
    SpareWarehousePicker (name, code, id) {
      if (this.SpareWarehouseShow) {
        this.WriteData.typename = name
        this.WriteData.warehouseid = id
      }
      if (this.unitsShow) {
        this.WriteData.unitsname = name
        this.WriteData.units = id
      }
    },
    SpareWarehousClose () {
      this.SpareWarehouseShow = false
      this.unitsShow = false
      this.Show = false
    },
    sparetypeClose () { this.sparetypeShow = !this.sparetypeShow },
    manufacturerClose () { this.SparemanufacturerShow = !this.SparemanufacturerShow },
    sparemodelClose () { this.sparemodelShow = !this.sparemodelShow },
    SubAdd () {
      /*   this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali) {
          if (msg.longitude) return this.$message.warning(msg.longitude[0].message)
          if (msg.latitude) return this.$message.warning(msg.latitude[0].message)
          return this.$message.error('请补全信息！')
        } else {
          this.Loading = true
          this.$axios.post(Addmaintenanceconfig, this.WriteData).then(res => {
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
          if (msg.longitude) return this.$message.warning(msg.longitude[0].message)
          if (msg.latitude) return this.$message.warning(msg.latitude[0].message)
          this.$message.error('请补全信息！')
        } else {
          this.Loading = true
          this.$axios.put(Editmaintenanceconfig, this.WriteData).then(res => {
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
    Selectsparetype,
    Selectmanufacturer,
    SelectSpareconMode,
    SpareWarehousePicker
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
