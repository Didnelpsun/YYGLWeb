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
              <td><div class="cell">{{WriteData.code}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">调度类型</div></td>
              <td><div class="cell">{{WriteData.schedulingtype}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">备件类型</div></td>
              <td><div class="cell">{{WriteData.sparepartstypeid}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">厂家</div></td>
              <td><div class="cell">{{WriteData.manufacturerid}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">规格型号</div></td>
              <td><div class="cell">{{WriteData.innumcode}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">存放点</div></td>
              <td><div class="cell">{{WriteData.depotsid}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">入库存放点 </div></td>
              <td><div class="cell">{{WriteData.indepotsid}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">权属</div></td>
              <td><div class="cell">{{WriteData.units}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">入库权属</div></td>
              <td><div class="cell">{{WriteData.inunits}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">状态</div></td>
              <td><div class="cell">{{WriteData.state}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">入库状态</div></td>
              <td><div class="cell">{{WriteData.instate}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">申请时间</div></td>
              <td><div class="cell">{{WriteData.applicantid}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">申请人</div></td>
              <td><div class="cell">{{WriteData.applicanttime}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>关联借用备件</div></td>
              <td>
                <div class="cell">
                  <el-form-item label-width="0" prop="assistantstate" class="form-item">
                    <el-select class="tableSelect" v-model="WriteData.assistantstate">
<el-option v-for="i in DicList.schedulingtype" :key="i.id" :label="i.text" :value="i.value" placeholder="请选择关联借用备件"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </td>
              <td></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>审核状态</div></td>
              <td>
                <div class="cell">
                  <el-form-item label-width="0" prop="inauditstatus" class="form-item">
                    <el-select class="tableSelect" v-model="WriteData.inauditstatus" placeholder="请选择审核状态">
                      <el-option key="4" label="通过" :value="4"></el-option>
                      <el-option key="3" label="不通过" :value="3"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </td>
              <td></td>
            </tr>
            <tr class="el-table__row" >
              <td><div class="cell">审核意见</div></td>
              <td>
                <div class="cell">
                  <el-form-item label-width="0" prop="inauditopinion" class="form-item">
                    <el-input v-model="WriteData.inauditopinion" placeholder="请填入审核意见" type="textarea" :rows="2"></el-input>
                  </el-form-item>
                </div>
              </td>
              <td></td>
            </tr>
            </tbody>
          </table>
        </div>
      </el-form>
    </div>
    <div class="center">
      <el-button @click="Audit" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-check'">保存</el-button>
      <el-button @click="WriteClose" icon="el-icon-arrow-left">返回</el-button>
    </div>
  </div>
</template>

<script>
import {EditSpareTyp} from 'api/BJGL'
export default {
  name: 'SchedulingAudit',
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
      isShow: false,
      Loading: false,
      WriteData: {

      },
      Rules: {
        typeencoding: [{ required: true, message: '请填入类型编码', trigger: 'change' }]
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

    Audit () {
      /*   this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali) {
          return this.$message.error('请补全信息！')
        } else {
          this.Loading = true
          this.$axios.post(AddSpareTyp, this.WriteData).then(res => {
            this.Loading = false
            if (res.errorCode !== '200') return this.$message.error(res.msg)
            this.$message.success('审核成功!')
            this.$emit('fatheretMore')
            this.WriteClose()
          })
        }
      }) */
    }
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
