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
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>存放点名称</div></td>
              <td><div class="cell">
                <div @click="Show=true">
                  <el-form-item class="form-item" prop="operation">
                  <el-input v-model="WriteData.operation" readonly placeholder="请选择存放点名"></el-input>
                  </el-form-item>
                </div></div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" >
              <td colspan="3" style="background-color: rgb(230, 189, 189)"><div class="cell">扫码:单条扫码单条提交</div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">备件编码</div></td>
              <td><div class="cell">
                <div >
                  <el-input v-model="WriteData.code"  placeholder="请扫备件编码"></el-input>
                </div></div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>备件类型</div></td>
              <td><div class="cell">
                <div @click="sparetypeShow=true">
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
                <div  @click="SparemanufacturerShow=true">
                  <el-form-item class="form-item" prop="manufacturername">
                  <el-input v-model="WriteData.manufacturername" readonly placeholder="请选择厂家"></el-input>
                  </el-form-item>
                </div></div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">权属</div></td>
              <td><div class="cell">{{WriteData.unitname}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>备件型号</div></td>
              <td><div class="cell">
                <div  @click="sparemodelShow=true">
                  <el-form-item class="form-item" prop="sparemodel">
                  <el-input v-model="WriteData.sparemodel" readonly placeholder="请选择备件型号"></el-input>
                  </el-form-item>
                </div></div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">城市</div></td>
              <td><div class="cell">{{WriteData.cityname}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">区域</div></td>
              <td><div class="cell">{{WriteData.areaname}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">存放点 </div></td>
              <td><div class="cell">{{WriteData.depotsname}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">存放点类型</div></td>
              <td><div class="cell">
                <el-form-item class="form-item" prop="depotstype">
                  <el-select v-model="WriteData.depotstype">
                    <el-option v-for="i in DicList.warehousetype" :key="i.id" :label="i.text" :value="i.value" placeholder="请选择存放点类型"></el-option>
                  </el-select>
                </el-form-item>
                </div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">备件质保编号</div></td>
              <td><div class="cell">
                <el-form-item  class="form-item" prop="warrantycode">
                  <el-input v-model="WriteData.warrantycode"   placeholder="请扫备件质保编号"></el-input>
                </el-form-item>
              </div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">资产编码</div></td>
              <td><div class="cell">
                <el-form-item  class="form-item" prop="assetsencoding">
                  <el-input v-model="WriteData.assetsencoding"   placeholder="请扫备件资产编码"></el-input>
                </el-form-item>
              </div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">二维码</div></td>
              <td><div class="cell">
                <el-form-item  class="form-item" prop="qrcode">
                  <el-input v-model="WriteData.qrcode"   placeholder="请扫二维码"></el-input>
                </el-form-item>
              </div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">备注</div></td>
              <td><div class="cell">
                <el-form-item  class="form-item" prop="reamrk">
                  <el-input v-model="WriteData.reamrk"  clearable placeholder="请填入备注"></el-input>
                </el-form-item>
              </div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
             <tr class="el-table__row">
                  <td><div class="cell">提交时间</div></td>
                  <td><div class="cell">{{WriteData.createtime}}</div></td>
                  <td><div class="cell"></div></td>
             </tr>
            <tr class="el-table__row">
                  <td><div class="cell">提交人</div></td>
                  <td><div class="cell">{{WriteData.realityname}}</div></td>
                  <td><div class="cell"></div></td>
            </tr>
            </tbody>
          </table>
        </div>
      </el-form>
    </div>
    <div class="center">
      <el-button  @click="SubAdd()" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-check'">保存</el-button>
      <el-button @click="WriteClose" icon="el-icon-arrow-left">返回</el-button>
    </div>
    <el-dialog top="1%" :visible.sync="Show" title="选择存放点" width="80%" :before-close="SelectUserOperationClose">
      <SelectUserOperation :check="check"  @SelectUserOperation="SelectUserOperation"/>
    </el-dialog>
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
  </div>
</template>

<script>
import {GlobalRes} from 'common/js/mixins'
import SelectUserOperation from 'base/SpareManagement/SelectUserOperation'
import Selectsparetype from 'base/SpareManagement/Selsparetypeid'
import Selectmanufacturer from 'base/SpareManagement/Selmanufacturerid'
import SelectSpareconMode from 'base/SpareManagement/SelSpareconModelid'

export default {
  name: 'SpareCheck',
  mixins: [GlobalRes],
  props: {
    DicList: {warehousetype: []},
    Loading: false
  },
  data () {
    return {
      sparetypeShow: false,
      sparemodelShow: false,
      SparemanufacturerShow: false,
      check: 8,
      Show: false,
      SpareReplaceDetail: false,
      WriteData: {
        id: null,
        code: null,
        units: null,
        cityname: null,
        areaname: null,
        depotsid: null,
        depotstype: null,
        assetsencoding: null,
        warrantycode: null,
        qrcode: null,
        typename: null, // 备件类型名称
        sparepartstypeid: '', // 备件类型id
        manufacturerid: '', // 备件厂家id
        sparemodel: '', // 备件型号名称
        sparemodelid: '', // 备件型号id
        manufacturername: '' // 备件厂家名称
      },
      Rules: {
        operation: [{ required: true, message: '请选择存放点', trigger: 'change' }],
        typename: [{ required: true, message: '请选择备件类型', trigger: 'change' }],
        manufacturername: [{ required: true, message: '请选择厂家', trigger: 'change' }],
        sparemodel: [{ required: true, message: '请选择备件型号', trigger: 'change' }],
        code: [{ required: true, message: '请扫备件编码', trigger: 'change' }],
        warrantycode: [{ required: true, message: '请扫备件质保编码', trigger: 'change' }],
        assetsencoding: [{ required: true, message: '请扫资产编码', trigger: 'change' }],
        qrcode: [{ required: true, message: '请选择二维码', trigger: 'change' }]
      }
    }
  },

  methods: {
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
    SelectUserOperation (operation, name, id) {
      this.Show = false
      this.WriteData.operation = name
      this.WriteData.operationid = id
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
    sparetypeClose () { this.sparetypeShow = !this.sparetypeShow },
    manufacturerClose () { this.SparemanufacturerShow = !this.SparemanufacturerShow },
    sparemodelClose () { this.sparemodelShow = !this.sparemodelShow },
    SelectUserOperationClose () {
      this.Show = false
    },
    SubAdd () {
      /*   this.$refs.WriteForm.validate((vali, msg) => {
          if (!vali) {
            return this.$message.error('请补全信息！')
          } else {
            this.Loading = true
            let params={depotsid:this.WriteData.depotsid,code:this.WriteData.code,sparepartstypeid:this.WriteData.sparepartstypeid,manufacturerid:this.WriteData.manufacturerid,
                        warrantycode:this.WriteData.warrantycode,assetsencoding:this.WriteData.assetsencoding,qrcode:this.WriteData.qrcode,reamrk:this.WriteData.reamrk,,id:this.WriteData.id
            }
            this.$axios.post(Editspareparts, params).then(res => {
              this.Loading = false
              if (res.errorCode !== '200') return this.$message.error(res.msg)
              this.$message.success('添加成功!')
              this.WriteClose()
            })
          }
        }) */
    }
  },
  components: {
    SelectUserOperation,
    Selectsparetype,
    Selectmanufacturer,
    SelectSpareconMode
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
