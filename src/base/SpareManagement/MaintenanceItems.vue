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
              <td><div class="cell"><i class="must">*</i>城市</div></td>
              <td v-if="WriteState !== 2"><div class="cell">
                <el-form-item  class="form-item" prop="AreaList">
                  <el-cascader v-model="WriteData.AreaList" placeholder="请选择区域" :props="cityareaProps" @change="changecityArea(WriteData)" ref="csArea"></el-cascader>
                </el-form-item>
              </div></td>
              <td v-show="WriteState == 2"><div class="cell">{{WriteData.areaname}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">维修厂家</div></td>
              <td><div class="cell">
                <div v-if="WriteState == 2">{{WriteData.manufacturername}}</div>
                <div v-if="WriteState !== 2" @click="manufactureridShow=true">
                  <el-input v-model="WriteData.manufacturername" readonly placeholder="请选择维修厂家"></el-input>
                </div></div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>备件厂家</div></td>
              <td><div class="cell">
                <div v-if="WriteState == 2">{{WriteData.name}}</div>
                <div v-if="WriteState !== 2" @click="SparemanufacturerShow=true">
                  <el-form-item class="form-item" prop="name">
                  <el-input v-model="WriteData.name" readonly placeholder="请选择厂家"></el-input>
                  </el-form-item>
                </div></div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
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
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>维修单价</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="price">
                  <el-input v-model="WriteData.price"  placeholder="请填写维修单价" ></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.price}}</div></td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>维修期</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="maintenancettime">
                  <el-input v-model="WriteData.maintenancettime" type="number"  placeholder="请填写维修期" clearable></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.maintenancettime}}</div></td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>保修期</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="warrantyperiod">
                  <el-input v-model="WriteData.warrantyperiod" type="number"  placeholder="请填写保修期" clearable></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.warrantyperiod}}</div></td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">提交时间</div></td>
              <td><div class="cell">{{WriteData.createtime}}</div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">提交人</div></td>
              <td><div class="cell">{{WriteData.realityname}}</div></td>

              <!-- <td><div class="cell"></div></td> -->
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
      <Selectsparetype  @Selsparetypeid="Selsparetypeid"/>
    </el-dialog>
    <el-dialog top="1%" :visible.sync="SparemanufacturerShow" title="选择备件厂家" width="80%" :before-close="manufacturerClose">
      <Selectmanufacturer  @Selmanufacturerid="Selmanufacturerid"/>
    </el-dialog>
    <div v-if="sparemodelShow">
    <el-dialog top="1%" :visible.sync="sparemodelShow" title="选择备件型号" width="80%" :before-close="sparemodelClose">
      <SelectSpareconMode  :sparetypeid="WriteData.sparetypeid"  :sparemanufacturerid="WriteData.sparemanufacturerid"  @SelSpareconModelid="SelSpareconModelid"/>
    </el-dialog>
    </div>
    <el-dialog top="1%" destroy-on-close :visible.sync="manufactureridShow" title="选择维修厂家" width="80%" :before-close="AfterSaleContractClose">
      <SelAfterSaleContract  @SelAfterSaleContract="SelAfterSaleContract"/>
    </el-dialog>
  </div>
</template>

<script>
import {GlobalRes} from 'common/js/mixins'
import Selectsparetype from 'base/SpareManagement/Selsparetypeid'
import Selectmanufacturer from 'base/SpareManagement/Selmanufacturerid'
import SelectSpareconMode from 'base/SpareManagement/SelSpareconModelid'
import SelAfterSaleContract from 'base/SpareManagement/SelAfterSaleContract'

import {Editmaintenanceconfig, Addmaintenanceconfig} from 'api/BJGL'
import {AreaList} from 'api/api'
export default {
  name: 'MaintenanceItems',
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
    var _this = this
    return {
      cityareaProps: {
        lazy: true,
        label: 'name',
        value: 'id',
        lazyLoad (node, resolve) {
          if (!node.level) {
            _this.$axios.post(AreaList, {parentid: null}).then((res) => {
              if (res.error) {
                _this.$message.error(res.errorMessage)
              } else {
                resolve(_this._normalizeCityAreaLevel(res.data))
              }
            })
          } else {
            if (!node.hasChildren) return resolve([])
            _this.$axios.post(AreaList, {parentid: node.data.id}).then((res) => {
              if (res.error) {
                _this.$message.error(res.errorMessage)
              } else {
                resolve(_this._normalizeCityAreaLevel(res.data))
              }
            })
          }
        }
      },
      manufactureridShow: false,
      sparetypeShow: false,
      sparemodelShow: false,
      SparemanufacturerShow: false,
      isShow: false,
      Loading: false,
      WriteData: {
        AreaList: [],
        price: null,
        warrantyperiod: null,
        maintenancettime: null, //
        typename: null, // 备件类型名称
        sparetypeid: '', // 备件类型id
        sparemanufacturerid: '', // 备件厂家id
        manufacturername: '', // 维修厂家名称
        sparemodel: '', // 备件型号名称
        sparemodelid: '', // 备件型号id
        manufacturerid: '', // 维修厂家
        name: ''// 备件厂家名称

      },
      Rules: {
        price: [{ required: true, message: '请填写维修单价', trigger: 'change' }],
        typename: [{ required: true, message: '请选择备件类型', trigger: 'change' }],
        sparemodel: [{ required: true, message: '请选择备件型号', trigger: 'change' }],
        warrantyperiod: [{ required: true, message: '请填写保修期', trigger: 'change' }],
        maintenancettime: [{ required: true, message: '请填写维修期', trigger: 'change' }],
        name: [{ required: true, message: '请选择厂家', trigger: 'change' }]

      }
    }
  },

  methods: {
    changecityArea (obj) {
      // console.log(obj)
      obj.provinceid = obj.AreaList[0]
      obj.cityid = obj.AreaList[1]
    },
    setArea (list, key = 'csArea') {
      this.nodes = list
      this.$refs[key].panel.activePath = []
      this.$refs[key].panel.loadCount = 0
      this.$refs[key].panel.lazyLoad()
    },
    _normalizeCityAreaLevel (list) {
      for (let i in list) {
        if (list[i].leveltype >= 2) list[i].leaf = true
      }
      return list
    },
    ResetWrite () {
      Object.assign(this.$data.WriteData, this.$options.data().WriteData)
      this.$refs.WriteForm.resetFields()
    },
    setWriteData (data) {
      this.WriteData = data
      if (this.WriteState !== 2) {
        this.WriteData.AreaList = [ data.provinceid, data.cityid ]
        this.setArea(this.WriteData.AreaList, 'csArea')
      }
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
      this.WriteData.sparetypeid = id
      this.WriteData.typename = name
      this.WriteData.sparemodelid = null
      this.WriteData.sparemodel = null
    },
    Selmanufacturerid (name, id) {
      this.SparemanufacturerShow = false
      this.WriteData.sparemanufacturerid = id
      this.WriteData.name = name
      this.WriteData.sparemodelid = null
      this.WriteData.sparemodel = null
    },
    SelSpareconModelid (name, id) {
      this.sparemodelShow = false
      this.WriteData.sparemodelid = id
      this.WriteData.sparemodel = name
    },
    SelAfterSaleContract (name, id) {
      this.manufactureridShow = false
      this.WriteData.manufacturerid = id
      this.WriteData.manufacturername = name
    },
    sparetypeClose () { this.sparetypeShow = !this.sparetypeShow },
    manufacturerClose () { this.SparemanufacturerShow = !this.SparemanufacturerShow },
    sparemodelClose () { this.sparemodelShow = !this.sparemodelShow },
    AfterSaleContractClose () { this.manufactureridShow = !this.manufactureridShow },
    SubAdd () {
      this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali || this.WriteData.AreaList.length === 0) {
          if (this.WriteData.AreaList.length === 0) return this.$message.error('请选择区域！')
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
      })
    },
    SubEdit () {
      this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali || this.WriteData.AreaList.length === 0) {
          if (this.WriteData.AreaList.length === 0) return this.$message.error('请选择区域！')
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
      })
    }
  },
  components: {
    Selectsparetype,
    Selectmanufacturer,
    SelectSpareconMode,
    SelAfterSaleContract
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
