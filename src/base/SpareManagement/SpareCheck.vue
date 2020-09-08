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
                  <el-input v-model="WriteData.typename" readonly placeholder="请选择存放点名"></el-input>
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
                  <el-input v-model="WriteData.code" clearable placeholder="请扫备件编码"></el-input>
                </div></div>
              </td>
              <td><div class="cell"><el-button type="text" @click="handleSubmit(WriteData.code)">提交</el-button></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">备件类型</div></td>
              <td><div class="cell">
                <div>
                  <el-input v-model="WriteData.sparepartstypeid" clearable placeholder="请扫备件类型"></el-input>
                </div></div>
              </td>
              <td><div class="cell"><el-button type="text" @click="handleSubmit(WriteData.sparepartstypeid)">提交</el-button></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">厂家</div></td>
              <td><div class="cell">
                <div>
                  <el-input v-model="WriteData.manufacturerid" clearable placeholder="请扫厂家"></el-input>
                </div></div>
              </td>
              <td><div class="cell"><el-button type="text" @click="handleSubmit(WriteData.manufacturerid)">提交</el-button></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">权属</div></td>
              <td><div class="cell">{{WriteData.units}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">备件型号</div></td>
              <td><div class="cell">
                <div>
                  <el-input v-model="WriteData.sparemodelid" clearable placeholder="请扫备件型号"></el-input>
                </div></div>
              </td>
              <td><div class="cell"><el-button type="text" @click="handleSubmit(WriteData.sparemodelid)">提交</el-button></div></td>
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
              <td><div class="cell">{{WriteData.depotsid}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">存放点类型</div></td>
              <td><div class="cell">
                <el-form-item  class="form-item" prop="depotstype">
                  <el-input v-model="WriteData.depotstype" clearable placeholder="请扫存放点类型"></el-input>
                </el-form-item>
              </div>
              </td>
              <td><div class="cell"><el-button type="text" @click="handleSubmit(WriteData.depotstype)">提交</el-button></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">备件质保编号</div></td>
              <td><div class="cell">
                <el-form-item  class="form-item" prop="warrantycode">
                  <el-input v-model="WriteData.warrantycode"  clearable placeholder="请扫备件质保编号"></el-input>
                </el-form-item>
              </div>
              </td>
              <td><div class="cell"><el-button type="text" @click="handleSubmit(WriteData.warrantycode)">提交</el-button></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">资产编码</div></td>
              <td><div class="cell">
                <el-form-item  class="form-item" prop="assetsencoding">
                  <el-input v-model="WriteData.assetsencoding"  clearable placeholder="请扫备件资产编码"></el-input>
                </el-form-item>
              </div>
              </td>
              <td><div class="cell"><el-button type="text" @click="handleSubmit(WriteData.assetsencoding)">提交</el-button></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">二维码</div></td>
              <td><div class="cell">
                <el-form-item  class="form-item" prop="qrcode">
                  <el-input v-model="WriteData.qrcode"  clearable placeholder="请扫二维码"></el-input>
                </el-form-item>
              </div>
              </td>
              <td><div class="cell"><el-button type="text" @click="handleSubmit(WriteData.qrcode)">提交</el-button></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">备注</div></td>
              <td><div class="cell">
                <el-form-item  class="form-item" prop="reamrk">
                  <el-input v-model="WriteData.reamrk"  clearable placeholder="请扫备注"></el-input>
                </el-form-item>
              </div>
              </td>
              <td><div class="cell"><el-button type="text" @click="handleSubmit(WriteData.reamrk)">提交</el-button></div></td>
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
    <el-dialog top="1%" :visible.sync="Show" title="选择存放点" width="80%" :before-close="SpareWarehousClose">
      <SpareWarehousePicker :provinceid="WriteData.provinceid"  :cityid="WriteData.cityid" @SpareWarehousePicker="SpareWarehousePicker"/>
    </el-dialog>
  </div>
</template>

<script>
import {GlobalRes} from 'common/js/mixins'
import SpareWarehousePicker from 'base/SpareManagement/SpareWarehousePicker'

import {Editmaintenanceconfig, Addmaintenanceconfig} from 'api/BJGL'
export default {
  name: 'SpareCheck',
  mixins: [GlobalRes],
  props: {

  },
  data () {
    return {
      Show: false,
      Loading: false,
      WriteData: {
        id: null,
        code: null,
        sparepartstypeid: null,
        manufacturerid: null,
        units: null,
        sparemodelid: null,
        cityname: null,
        areaname: null,
        depotsid: null,
        depotstype: null,
        assetsencoding: null,
        warrantycode: null,
        qrcode: null,
        reamrk: null,
        realityname: '',
        createtime: null,
        typename: '', // 存放点名称
        warehouseid: ''// 存放点di
      },
      Rules: {
        Belongtype: [{ required: true, message: '请选择所属类型', trigger: 'blur' }]

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
    SpareWarehousePicker (name, code, id) {
      this.WriteData.typename = name
      this.WriteData.warehouseid = id
    },
    SpareWarehousClose () {
      this.Show = false
    },
    handleSubmit (val) {

    },
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
    SpareWarehousePicker
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
