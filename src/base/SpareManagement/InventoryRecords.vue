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
              <td><div class="cell">备件编码</div></td>
              <td v-show="WriteState1 !== 2"><div class="cell">
                <el-form-item class="form-item" prop="sparepartsid">
                  <el-input v-model="WriteData.sparepartsid"  placeholder="请扫码备件编码" clearable></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState1 == 2"><div class="cell">{{WriteData.sparepartsid}}</div></td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">备件类型</div></td>
              <td><div class="cell">
                <div v-if="WriteState1 == 2">{{WriteData.sparepartstype}}</div>
                <div v-if="WriteState1 !== 2" @click="sparetypeShow=true">
                  <el-input v-model="WriteData.sparepartstype" readonly placeholder="请选择备件类型"></el-input>
                </div></div>
              </td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">备件厂家</div></td>
              <td><div class="cell">
                <div v-if="WriteState1 == 2">{{WriteData.manufacturer}}</div>
                <div v-if="WriteState1 !== 2" @click="SparemanufacturerShow=true">
                  <el-input v-model="WriteData.manufacturer" readonly placeholder="请选择厂家"></el-input>
                </div></div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">备件型号</div></td>
              <td><div class="cell">
                <div v-if="WriteState1 == 2">{{WriteData.sparemodel}}</div>
                <div v-if="WriteState1 !== 2" @click="sparemodelShow=true">
                  <el-input v-model="WriteData.sparemodel" readonly placeholder="请选择备件型号"></el-input>
                </div></div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">备件状态</div></td>
              <td><div class="cell">
                <div v-if="WriteState1 == 2">{{WriteData.sparepartsstate}}</div>
                <el-form-item class="form-item" prop="" v-if="WriteState1!== 2">
                  <el-select v-model="WriteData.sparepartsstate" placeholder="请选择备件状态"></el-select>
                </el-form-item>
                </div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">存放点名称</div></td>
              <td><div class="cell">
                <div v-if="WriteState1 == 2">{{WriteData.typename}}</div>
                <div v-if="WriteState1 !== 2" @click="SpareWarehouseShow=true">
                  <el-input v-model="WriteData.typename" readonly placeholder="请选择存放点名"></el-input>
                </div></div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState1==2">
              <td><div class="cell">权属</div></td>
              <td><div class="cell">{{WriteData.units}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState1==2">
              <td><div class="cell">资产编码</div></td>
              <td><div class="cell"></div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState1==2">
              <td><div class="cell">质保编码</div></td>
              <td><div class="cell"></div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState1==2">
              <td><div class="cell">责任人</div></td>
              <td><div class="cell"></div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState1==2">
              <td><div class="cell">备注</div></td>
              <td><div class="cell">{{WriteData.reamrk}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState1==2">
              <td><div class="cell">盘存时间</div></td>
              <td><div class="cell">{{WriteData.inventorytime}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState1==2">
              <td><div class="cell">盘存人</div></td>
              <td><div class="cell"></div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState1==2">
              <td><div class="cell">盘存状态</div></td>
              <td><div class="cell">{{WriteData.newsparepartsstate}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            </tbody>
          </table>
        </div>
      </el-form>
    </div>
    <div class="center">
      <el-button v-show="WriteState1 !==2" @click="SubWrite" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-check'">提交</el-button>
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
    <el-dialog top="1%" :visible.sync="SpareWarehouseShow" title="选择存放点" width="80%" :before-close="SpareWarehousClose">
      <SpareWarehousePicker :provinceid="WriteData.provinceid"  :cityid="WriteData.cityid" @SpareWarehousePicker="SpareWarehousePicker"/>
    </el-dialog>
  </div>
</template>

<script>

import {EditSpareTyp, AddSpareTyp} from 'api/BJGL'
import Selectsparetype from 'base/SpareManagement/Selsparetypeid'
import Selectmanufacturer from 'base/SpareManagement/Selmanufacturerid'
import SelectSpareconMode from 'base/SpareManagement/SelSpareconModelid'
import SpareWarehousePicker from 'base/SpareManagement/SpareWarehousePicker'
export default {
  name: 'Inventory',
  props: {
    WriteState1: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      sparetypeShow: false,
      sparemodelShow: false,
      SparemanufacturerShow: false,
      SpareWarehouseShow: false,
      isShow: false,
      Loading: false,
      WriteData: {
        id: null,
        cityname: '',
        realityname: '',
        createtime: null,
        sparepartstype: null, // 备件类型名称
        sparepartstypeid: '', // 备件类型id
        manufacturerid: '', // 备件厂家id
        sparemodel: '', // 备件型号名称
        sparemodelid: '', // 备件型号id
        manufacturer: '', // 备件厂家名称
        typename: '', // 存放点名称
        depotsid: '', // 存放点id
      },
      Rules: {
        AreaList: [{ required: true, message: '请选择区域', trigger: 'change' }],
        typename: [{ required: true, message: '请填入类型名称', trigger: 'change' }],
        Belongtype: [{ required: true, message: '请选择所属类型', trigger: 'blur' }],
        typeencoding: [{ required: true, message: '请填入类型编码', trigger: 'change' }]
      }
    }
  },
  methods: {
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
      this.WriteData.typename = name
      this.WriteData.depotsid = id
    },
    SpareWarehousClose () { this.SpareWarehouseShow = false },
    sparetypeClose () { this.sparetypeShow = !this.sparetypeShow },
    manufacturerClose () { this.SparemanufacturerShow = !this.SparemanufacturerShow },
    sparemodelClose () { this.sparemodelShow = !this.sparemodelShow },
    ResetWrite () {
      Object.assign(this.$data.WriteData, this.$options.data().WriteData)
      this.$refs.WriteForm.resetFields()
    },
    setWriteData (data) {
      this.WriteData = data
      this.WriteData.AreaList = [ data.provinceid, data.cityid ]
      this.setArea(this.WriteData.AreaList, 'csArea')
    },
    WriteClose () {
      this.ResetWrite()
      this.$emit('fatherClose')
    },
    SubWrite () {
      if (this.WriteState1 === 0) this.SubAdd()
      if (this.WriteState1 === 1) this.SubEdit()
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
