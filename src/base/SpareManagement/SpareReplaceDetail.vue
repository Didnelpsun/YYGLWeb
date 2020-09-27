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
              <td><div class="cell">存放点</div></td>
              <td><div class="cell" >
                <div  @click="Show=true">
                  <el-form-item class="form-item">
                    <el-input v-model="operation" readonly placeholder="请选择存放点"></el-input>
                  </el-form-item>
                </div>
              </div></td>
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
              <td><div class="cell">备件类型</div></td>
              <td><div class="cell">{{WriteData.typename}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">厂家</div></td>
              <td><div class="cell">{{WriteData.manufacturername}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">权属</div></td>
              <td><div class="cell">{{WriteData.unitname}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">备件型号</div></td>
              <td><div class="cell">{{WriteData.sparemodel}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">城市</div></td>
              <td><div class="cell">{{WriteData.cityname}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">状态</div></td>
              <td><div class="cell">{{WriteData.storestate |state}}</div></td>
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
              <td><div class="cell">{{WriteData.reamrk}}</div></td>
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
    <el-dialog top="1%"  :visible.sync="Show" title="选择存放点" width="80%" :before-close="SelectUserOperationClose">
      <SelectUserOperation :check="check"  @SelectUserOperation="SelectUserOperation"/>
    </el-dialog>
  </div>
</template>

<script>
import SelectUserOperation from 'base/SpareManagement/SelectUserOperation'
import {GlobalRes} from 'common/js/mixins'
import {Editspareparts} from 'api/BJGL'
export default {
  name: 'SpareReplaceDetail',
  mixins: [GlobalRes],
  props: {
    Loading: false
  },
  data () {
    return {
      check: 6,
      operation: null,
      Show: false,
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
        reamrk: null
      },

      Rules: {
        code: [{ required: true, message: '请扫备件编码', trigger: 'change' }],
        warrantycode: [{ required: true, message: '请扫备件质保编码', trigger: 'change' }],
        assetsencoding: [{ required: true, message: '请扫资产编码', trigger: 'change' }],
        qrcode: [{ required: true, message: '请选择二维码', trigger: 'change' }]

      }
    }
  },

  methods: {
    SelectUserOperationClose () { this.Show = false },
    SelectUserOperation (operation, name, id) {
      this.Show = false
      this.operation = name
      this.WriteData.operationid = id
    },
    ResetWrite () {
      this.operation = null
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
    SubAdd () {
      /*   this.$refs.WriteForm.validate((vali, msg) => {
            if (!vali) {
              return this.$message.error('请补全信息！')
            } else {
              this.Loading = true
              let params={code:this.WriteData.code,warrantycode:this.WriteData.warrantycode,
              assetsencoding:this.WriteData.assetsencoding,warrantycode:this.WriteData.warrantycode
             qrcode:this.WriteData.qrcode,id:this.WriteData.id,depotsid:this.WriteData.depotsid }
              this.$axios.post(Editspareparts, this.WriteData).then(res => {
                this.Loading = false
                if (res.errorCode !== '200') return this.$message.error(res.msg)
                this.$message.success('添加成功!')
                this.$emit('fatheretMore')
                this.WriteClose()
              })
            }
          }) */
    }
  },
  components: {
    SelectUserOperation
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
