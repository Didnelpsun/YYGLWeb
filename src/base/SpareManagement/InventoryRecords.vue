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
                <el-form-item class="form-item" prop="code">
                  <el-input v-model="WriteData.code"  placeholder="请扫码备件编码" clearable></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState1 == 2"><div class="cell">{{WriteData.code}}</div></td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">备件类型</div></td>
              <td><div class="cell">
                <div v-if="WriteState1 == 2">{{WriteData.newsparepartstype}}</div>
                <div v-if="WriteState1 !== 2" @click="sparetypeShow=true">
                  <el-form-item class="form-item" prop="newsparepartstype">
                  <el-input v-model="WriteData.newsparepartstype" readonly placeholder="请选择备件类型"></el-input>
                  </el-form-item>
                </div></div>
              </td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">备件厂家</div></td>
              <td><div class="cell">
                <div v-if="WriteState1 == 2">{{WriteData.newmanufacturer}}</div>
                <div v-if="WriteState1 !== 2" @click="SparemanufacturerShow=true">
                  <el-form-item class="form-item" prop="newmanufacturer">
                  <el-input v-model="WriteData.newmanufacturer" readonly placeholder="请选择厂家"></el-input>
                  </el-form-item>
                </div></div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">备件型号</div></td>
              <td><div class="cell">
                <div v-if="WriteState1 == 2">{{WriteData.newnumcodename}}</div>
                <div v-if="WriteState1 !== 2" @click="sparemodelShow=true">
                  <el-form-item class="form-item" prop="newnumcodename">
                  <el-input v-model="WriteData.newnumcodename" readonly placeholder="请选择备件型号"></el-input>
                  </el-form-item>
                </div></div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">备件状态</div></td>
              <td><div class="cell">
                <div v-if="WriteState1 == 2">{{WriteData.newsparepartsstate}}</div>
                <el-form-item class="form-item" prop="newsparepartsstate" v-if="WriteState1!== 2">
                  <el-select  v-model="WriteData.newsparepartsstate" placeholder="请选择备件状态">
                     <el-option  v-for="i in DicList.newsparepartsstate" :key="i.id" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
                </div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">存放点名称</div></td>
              <td><div class="cell">
                <div v-if="WriteState1 == 2">{{WriteData.newwarehouse}}</div>
                <div v-if="WriteState1 !== 2" @click="SpareWarehouseShow=true">
                  <el-form-item class="form-item" prop="newwarehouse">
                  <el-input v-model="WriteData.newwarehouse" readonly placeholder="请选择存放点名"></el-input>
                  </el-form-item>
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
              <td><div class="cell">{{WriteData.newsparepartsstate |state}}</div></td>
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
    <el-dialog top="1%" :visible.sync="sparetypeShow" title="选择备件类型" width="80%" :before-close="SelSparepartsClose">
      <SelSpareparts  @SelSpareparts="SelSpareparts"/>
    </el-dialog>
    <el-dialog top="1%" :visible.sync="SparemanufacturerShow" title="选择备件厂家" width="80%" :before-close="manufacturerClose">
      <Selectmanufacturer  @Selmanufacturerid="Selmanufacturerid"/>
    </el-dialog>
    <div v-if="sparemodelShow">
      <el-dialog top="1%" :visible.sync="sparemodelShow" title="选择备件型号" width="80%" :before-close="sparemodelClose">
        <SelectSpareconMode  :istrue="true"  :sparemanufacturerid="WriteData.newmanufacturerid"  @SelSpareconModelid="SelSpareconModelid"/>
      </el-dialog>
    </div>
    <el-dialog top="1%" :visible.sync="SpareWarehouseShow" title="选择存放点" width="80%" :before-close="SpareWarehousClose">
      <SpareWarehousePicker :DicList="DicList"  @SpareWarehousePicker="SpareWarehousePicker"/>
    </el-dialog>
  </div>
</template>

<script>

import {Addinventoryrecords} from 'api/BJGL'

import SelSpareparts from 'base/SpareManagement/SelSpareparts'
import Selectmanufacturer from 'base/SpareManagement/Selmanufacturerid'
import SelectSpareconMode from 'base/SpareManagement/SelSpareconModelid'
import SpareWarehousePicker from 'base/SpareManagement/SpareWarehousePicker'
export default {
  name: 'Inventory',
  props: {
    WriteState1: {
      type: Number,
      default: 0
    },
    inventoryid: null,
    DicList: {
      type: Object,
      default () {
        return []
      }
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
        code: null,
        newsparepartstype: null, // 备件类型名称
        sparepartsid: '', // 备件类型id
        newmanufacturerid: '', // 备件厂家id
        newnumcodename: '', // 备件型号名称
        newnumcode: '', // 备件型号id
        newmanufacturer: '', // 备件厂家名称
        newwarehouse: '', // 存放点名称
        newwarehouseid: '', // 存放点id
        inventoryid: '' // 任务id
      },
      Rules: {
        newsparepartstype: [{ required: true, message: '请选择备件类型', trigger: 'change' }],
        newnumcodename: [{ required: true, message: '请选择备件型号', trigger: 'change' }],
        newmanufacturer: [{ required: true, message: '请选择厂家', trigger: 'change' }],
        newwarehouse: [{ required: true, message: '请选择存放点', trigger: 'change' }]
      }

    }
  },
  methods: {
    SelSpareparts (name, id) {
      this.sparetypeShow = false
      this.WriteData.sparepartsid = id
      this.WriteData.newsparepartstype = name
    },
    Selmanufacturerid (name, id) {
      this.SparemanufacturerShow = false
      this.WriteData.newmanufacturerid = id
      this.WriteData.newmanufacturer = name
      this.WriteData.newnumcodename = null
      this.WriteData.newnumcode = null
    },
    SelSpareconModelid (name, id) {
      this.sparemodelShow = false
      this.WriteData.newnumcode = id
      this.WriteData.newnumcodename = name
    },
    SpareWarehousePicker (name, code, id) {
      this.SpareWarehouseShow = false
      this.WriteData.newwarehouse = name
      this.WriteData.newwarehouseid = id
    },
    SpareWarehousClose () { this.SpareWarehouseShow = false },
    SelSparepartsClose () { this.sparetypeShow = !this.sparetypeShow },
    manufacturerClose () { this.SparemanufacturerShow = !this.SparemanufacturerShow },
    sparemodelClose () { this.sparemodelShow = !this.sparemodelShow },
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
      if (this.WriteState1 === 0) this.SubAdd()
      if (this.WriteState1 === 1) this.SubEdit()
    },
    SubAdd () {
      this.WriteData.inventoryid = this.inventoryid

      this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali) {
          return this.$message.error('请补全信息！')
        } else {
          this.Loading = true
          let {inventoryid, code, sparepartsid, newsparepartstype, newmanufacturerid, newnumcode, newsparepartsstate, newwarehouseid} = this.WriteData// eslint-disable-line no-unused-vars
          this.$axios.post(Addinventoryrecords, {inventoryid, code, sparepartsid, newsparepartstype, newmanufacturerid, newnumcode, newsparepartsstate, newwarehouseid}).then(res => {
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
    SelSpareparts,
    Selectmanufacturer,
    SelectSpareconMode,
    SpareWarehousePicker
  },
  filters: {
    state (val) {
      val = parseInt(val)
      return val === 1 ? '盘增' : val === 2 ? '盘平' : val === 3 ? '盘错' : val === 4 ? '盘减' : ''
    }
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
