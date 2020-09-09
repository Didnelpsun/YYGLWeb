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
              <td><div class="cell">备件类型</div></td>
              <td><div class="cell">
                <el-form-item class="form-item" prop="sparepartstypeid">
                  <el-input v-model="WriteData.sparepartstypeid" clearable placeholder="请扫码备件类型"></el-input>
                </el-form-item>
              </div></td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">厂家</div></td>
              <td><div class="cell">
                <el-form-item class="form-item" prop="manufacturerid">
                  <el-input v-model="WriteData.manufacturerid" clearable placeholder="请扫码厂家"></el-input>
                </el-form-item>
              </div></td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">规格型号</div></td>
              <td><div class="cell">
                <el-form-item class="form-item" prop="remark">
                  <el-input v-model="WriteData.remark" clearable placeholder="请扫码规格型号"></el-input>
                </el-form-item>
              </div></td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">备件状态</div></td>
              <td><div class="cell">
                <el-form-item class="form-item" prop="instate">
                  <el-input v-model="WriteData.instate" clearable placeholder="请扫码备件状态"></el-input>
                </el-form-item>
              </div></td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">权属</div></td>
              <td><div class="cell">
                <el-form-item class="form-item" prop="inunits">
                  <el-input  v-model="WriteData.inunits" clearabless  placeholder="请扫码权属"></el-input>
                </el-form-item>
              </div></td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            </tbody>
          </table>
        </div>
      </el-form>
    </div>
    <div class="center">
      <el-button  @click="SubAdd" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-check'">提交</el-button>
      <el-button @click="WriteClose" icon="el-icon-arrow-left">返回</el-button>
    </div>
  </div>
</template>

<script>
import {GlobalRes} from 'common/js/mixins'
import { DictionaryInfoList} from 'api/api'
import layuiTitle from 'base/layui-title'
import {EditSpareTyp, AddSpareTyp} from 'api/BJGL'
export default {
  name: 'Scheduling',
  mixins: [GlobalRes],
  data () {
    return {
      isShow: false,
      Loading: false,
      ImgList1: [],
      WriteData: {
        schedulingtype: null,
        inqrcode: null,
        indepotsid: null,
        inunits: null,
        sparepartstypeid: null,
        manufacturerid: null,
        innumcode: null,
        instate: null
      },
      DicList: {
        schedulingtype: []
      },
      Rules: {
        /* AreaList: [{ required: true, message: '请选择区域', trigger: 'change' }],
          typename: [{ required: true, message: '请填入类型名称', trigger: 'change' }],
          Belongtype: [{ required: true, message: '请选择所属类型', trigger: 'blur' }],
          typeencoding: [{ required: true, message: '请填入类型编码', trigger: 'change' }] */
      }
    }
  },
  created () {
    this.getDic()
  },
  methods: {
    getDic () {
      let arr = ['调度类型']
      this.$axios.post(DictionaryInfoList, arr).then(res => {
        if (res.errorCode === '200') {
          let data = res.data
          this.DicList.schedulingtype = data.filter(i => { return i.type === '调度类型' })
        } else {
          this.$message.error(res.msg)
        }
      })
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
    },
    SubAdd () {
      this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali) {
          if (msg.longitude) return this.$message.warning(msg.longitude[0].message)
          return this.$message.error('请补全信息！')
        } else {
          this.Loading = true
          this.$axios.post(null, this.WriteData).then(res => {
            this.Loading = false
            if (res.errorCode !== '200') return this.$message.error(res.msg)
            this.$message.success('添加成功!')
            this.$emit('fatheretMore')
            this.WriteClose()
          })
        }
      })
    }
  },
  components: {
    layuiTitle
  }
}
</script>

<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
