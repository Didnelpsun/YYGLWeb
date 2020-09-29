<template>
  <div class="write" style="margin: 0 20px">
    <layuiTitle title="调度申请"></layuiTitle>
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
              <td><div class="cell">调度类型</div></td>
              <td><div class="cell">
                <el-form-item class="form-item" prop="schedulingtype">
                  <el-select v-model="WriteData.schedulingtype">
                    <el-option v-for="i in DicList.schedulingtype" :key="i.id" :label="i.text" :value="i.value" placeholder="请选择调度类型"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteData.schedulingtype">
              <td><div class="cell"><i class="must">*</i>存放点名称</div></td>
              <td><div class="cell">
                <div @click="SelectUserOperationShow=true">
                  <el-input v-model="WriteData.operation" readonly placeholder="请选择存放点名"></el-input>
                </div></div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td colspan="3" style="background-color: rgb(230, 189, 189)"><div class="cell">扫码</div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">备件编码</div></td>
              <td><div class="cell">
                <el-form-item class="form-item" prop="inqrcode">
                  <el-input v-model="WriteData.inqrcode" clearable placeholder="请扫码备件编码"></el-input>
                </el-form-item>
              </div></td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>备件类型</div></td>
              <td><div class="cell">
                <div @click="sparetypeShow=true">
                  <el-input v-model="WriteData.sparepartstype" readonly placeholder="请选择备件类型"></el-input>
                </div></div>
              </td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>备件厂家</div></td>
              <td><div class="cell">
                <div  @click="SparemanufacturerShow=true">
                  <el-input v-model="WriteData.manufacturer" readonly placeholder="请选择厂家"></el-input>
                </div></div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>规格型号</div></td>
              <td><div class="cell">
                <div  @click="sparemodelShow=true">
                  <el-input v-model="WriteData.sparemodel" readonly placeholder="请选择备件型号"></el-input>
                </div></div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">备件状态</div></td>
              <td><div class="cell">
                <el-form-item class="form-item" prop="instate">
                  <el-select v-model="WriteData.instate">
                    <el-option v-for="i in DicList.instate" :key="i.id" :label="i.text" :value="i.value" placeholder="请选择备件状态"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">权属</div></td>
              <td><div class="cell">
                <div @click="Show=true">
                  <el-input v-model="WriteData.unitsname" readonly placeholder="请选择权属"></el-input>
                </div></div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            </tbody>
          </table>
        </div>
      </el-form>
    </div>
    <div class="center">
      <el-button  @click="SubAdd" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-check'">提交</el-button>
      <el-button @click="ResetWrite"  icon="el-icon-refresh">重置</el-button>
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
      <SpareWarehousePicker :provinceid="WriteData.provinceid"  :DicList="DicList" :cityid="WriteData.cityid" @SpareWarehousePicker="SpareWarehousePicker"/>
    </el-dialog>
    <div v-if="SelectUserOperationShow">
    <el-dialog top="1%" :visible.sync="SelectUserOperationShow" title="选择存放点" width="80%" :before-close="SelectUserOperationClose">
      <SelectUserOperation :check="WriteData.schedulingtype"  @SelectUserOperation="SelectUserOperation"/>
    </el-dialog>
    </div>
  </div>
</template>

<script>
import {GlobalRes} from 'common/js/mixins'
import {DictionaryInfoList} from 'api/api'
import layuiTitle from 'base/layui-title'
import Selectsparetype from 'base/SpareManagement/Selsparetypeid'
import Selectmanufacturer from 'base/SpareManagement/Selmanufacturerid'
import SelectSpareconMode from 'base/SpareManagement/SelSpareconModelid'
import SpareWarehousePicker from 'base/SpareManagement/SpareWarehousePicker'
import SelectUserOperation from 'base/SpareManagement/SelectUserOperation'
import {Dispatchoutbound} from 'api/BJGL'
export default {
  name: 'Scheduling',
  mixins: [GlobalRes],
  data () {
    return {
      Show: false,
      sparetypeShow: false,
      sparemodelShow: false,
      SparemanufacturerShow: false,
      SelectUserOperationShow: false,
      isShow: false,
      Loading: true,
      ImgList1: [],
      WriteData: {
        schedulingtype: null,
        inqrcode: null,
        indepotsid: null,
        inunits: null, // 权属id
        innumcode: null,
        instate: null,
        sparepartstype: null, // 备件类型名称
        sparepartstypeid: '', // 备件类型id
        manufacturerid: '', // 备件厂家id
        sparemodel: '', // 备件型号名称
        sparemodelid: '', // 备件型号id
        manufacturer: '', // 备件厂家名称
        unitsname: ''// 权属名称
      },
      DicList: {
      },
      Rules: {
        /* schedulingtype: [{ required: true, message: '请选择调度类型', trigger: 'blur' }] */
      }
    }
  },
  created () {
    this.getDic()
  },
  methods: {
    SelectUserOperation (operation, name, id) {
      this.SelectUserOperationShow = false
      this.WriteData.operation = name
      this.WriteData.operationid = id
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
      this.WriteData.unitsname = name
      this.WriteData.inunits = id
    },
    SelectUserOperationClose () {
      this.SelectUserOperationShow = false
    },
    SpareWarehousClose () { this.Show = false },
    sparetypeClose () { this.sparetypeShow = !this.sparetypeShow },
    manufacturerClose () { this.SparemanufacturerShow = !this.SparemanufacturerShow },
    sparemodelClose () { this.sparemodelShow = !this.sparemodelShow },
    getDic () {
      let arr = ['备件状态', '备件调度类型', '备件存放点类型']
      this.$axios.post(DictionaryInfoList, arr).then(res => {
        if (res.errorCode === '200') {
          let data = res.data
          this.DicList.instate = data.filter(i => { return i.type === '备件状态' })
          this.DicList.schedulingtype = data.filter(i => { return i.type === '备件调度类型' })
          this.DicList.warehousetype = data.filter(i => { return i.type === '备件存放点类型' })
        } else {
          this.$message.error(res.msg)
        }
        this.Loading = false
      })
    },
    ResetWrite () {
      Object.assign(this.$data.WriteData, this.$options.data().WriteData)
      this.$refs.WriteForm.resetFields()
    },
    setWriteData (data) {
      this.WriteData = data
    },
    SubAdd () {
    /*  this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali) {
          return this.$message.error('请补全信息！')
        } else {
          this.Loading = true
          this.$axios.post(Dispatchoutbound, this.WriteData).then(res => {
            this.Loading = false
            if (res.errorCode !== '200') return this.$message.error(res.msg)
            this.$message.success('添加成功!')
            this.ResetWrite()
          })
        }
      }) */
    }
  },
  components: {
    layuiTitle,
    Selectsparetype,
    Selectmanufacturer,
    SelectSpareconMode,
    SpareWarehousePicker,
    SelectUserOperation
  }
}
</script>

<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
