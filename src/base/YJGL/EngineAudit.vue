<template>
  <div class="write" style="margin:15px">
    <layuiTitle title="油机审核"></layuiTitle>
    <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--small">
      <!--表头-->
      <div class="el-table__header-wrapper">
        <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
          <colgroup>
            <col width="80"/>
            <col width="100"/>
            <col width="50"/>
            <!-- <col width="400"/> -->
            <col width="100"/>
          </colgroup>
            <thead>
              <tr>
                <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
                <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
                <th colspan="1" rowspan="1" class="el-table_8_column_62     table-headerStyle"><div class="cell">照片</div></th>
                <!-- <th colspan="1" rowspan="1" class="el-table_8_column_63     table-headerStyle"><div class="cell">字典</div></th> -->
                <th colspan="1" rowspan="1" class="el-table_8_column_64     table-headerStyle"><div class="cell">填写要求</div></th>
              </tr>
              </thead>
            </table>
          </div>
          <!--表体-->
          <el-form :model="tableData" :rules="Rules" ref="tableForm" v-loading="WriteLoading">
            <div class="el-table__body-wrapper is-scrolling-none">
              <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
              <colgroup>
            <col width="80"/>
            <col width="100"/>
            <col width="50"/>
            <!-- <col width="400"/> -->
            <col width="100"/>
              </colgroup>
              <tbody>
              <!--提交人-->
              <tr class="el-table__row">
                <td><div class="cell">油机缸号</div></td>
                <td>
                  <div class="cell">
                    <div>{{tableData.machinebatchno}}</div>
                  </div>
                </td>
                <td  @click="OpenImgBox(1)"><div class="cell"> {{ImgList1.length}}</div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--提交人-->
              <tr class="el-table__row">
                <td><div class="cell">油机编号</div></td>
                <td>
                  <div class="cell">
                    <div>{{tableData.machinenumber}}</div>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--提交人-->
              <tr class="el-table__row">
                <td><div class="cell">标签编码</div></td>
                <td>
                  <div class="cell">
                    <div>{{tableData.modulecode}}</div>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--提交人-->
              <tr class="el-table__row">
                <td><div class="cell">采集器ID</div></td>
                <td>
                  <div class="cell">
                    <div>{{tableData.swver}}</div>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--申请类型-->
              <tr class="el-table__row">
                <td><div class="cell">申请类型</div></td>
                <td>
                  <div class="cell">
                    <div>{{tableData.applicanttype==1? '油机解绑':'油机绑定'}}</div>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--提交人-->
              <tr class="el-table__row">
                <td><div class="cell">提交人</div></td>
                <td>
                  <div class="cell">
                    <div>{{tableData.applicantname}}</div>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--提交时间-->
              <tr class="el-table__row">
                <td><div class="cell">提交时间</div></td>
                <td>
                  <div class="cell">
                    <div>{{tableData.applytime}}</div>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--审核状态-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>审核状态</div></td>
                <td>
                  <div class="cell">
                    <el-form-item label-width="0" prop="auditorstate" class="form-item">
                      <el-select class="tableSelect" v-model="tableData.auditorstate" placeholder="请选择审核状态">
                        <!-- <el-option label="请选择" value=""></el-option> -->
                        <el-option key="4" label="通过" :value="4"></el-option>
                        <el-option key="3" label="不通过" :value="3"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell">{{this.writeDic(dictionaryList.manufactorList)}}</div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">审核意见</div></td>
                <td>
                  <div class="cell">
                    <el-form-item label-width="0" prop="auditopinion" class="form-item">
                      <el-input v-model="tableData.auditopinion" placeholder="请填入审核意见" type="textarea" :rows="2"></el-input>
                    </el-form-item>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell">{{this.writeDic(dictionaryList.manufactorList)}}</div></td> -->
                <td><div class="cell"></div></td>
              </tr>
            </tbody>
            </table>
          </div>
        </el-form>
      </div>
    <div class="center" style="padding-bottom: 100px">
      <el-button @click="auditData" type="primary" icon="el-icon-check">审核</el-button>
      <el-button @click="closeWrite" type="primary" icon="el-icon-back">返回</el-button>
    </div>
  </div>
</template>

<script>
// import { AddEngine, EditEngine } from 'api/YJGL'
import { Machineaudit } from 'api/YJGL'
import layuiTitle from 'base/layui-title'
import {GlobalRes} from 'common/js/mixins'

export default{
  name: 'EngineAudit',
  mixins: [GlobalRes],
  data () {
    return {
      WriteLoading: false,
      ImgList1: [],
      // 新增表格相关属性
      tableData: {
        id: '',
        modulecode: '',
        swver: '',
        applicanttype: 0,
        applicantname: '',
        applytime: '',
        auditopinion: '',
        imglist: []
      },
      issend: null,
      // 表单验证
      Rules: {
        auditorstate: [
          { required: true, message: '请选择审核状态', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    setWriteData (data) {
      this.tableData = data
      this.setImgList(data.imglist)
    },
    ResetWrite () {
      // Object.assign(this.$data.WriteData, this.$options.data().WriteData)
      this.ImgList1 = []
      this.$refs.tableForm.resetFields()
    },
    setImgList (list) {
      if (list === null) return
      this.ImgList1 = list.filter(i => {
        return i.field_name === 'machinebatchno'
      })
    },
    OpenImgBox (val) {
      if (val === 1) this.$emit('fatherOpenImgBox', '油机缸号', 'machinebatchno', this.ImgList1)
    },
    auditData () {
      if (this.tableData.auditopinion === '' || this.tableData.auditopinion === undefined || this.tableData.auditopinion === null) return this.$message.error('请填写审核意见！')
      this.$refs.tableForm.validate((vali, msg) => {
        if (!vali) {
          return this.$message.error('请选择审核状态！')
        } else {
          this.$axios.put(Machineaudit, {
            id: this.tableData.id,
            auditorstate: this.tableData.auditorstate,
            auditopinion: this.tableData.auditopinion
          }).then(res => {
            if (res.success === false) {
              this.$message.error(res.msg)
            }
            if (res.success === true) {
              this.$message.success('审核成功！')
              this.closeWrite()
              this.ResetWrite()
            }
          }).catch(error => {
            console.log(error)
          })
        }
      })
    },
    // 返回关闭编辑函数
    closeWrite () {
      this.$refs.tableForm.clearValidate() // 初始化表单校验
      Object.assign(this.$data.tableData, this.$options.data().tableData)
      this.$nextTick(() => { this.$refs.tableForm.resetFields() })
      this.showWrite = !this.showWrite
      this.$emit('fatherClose')
    }
  },
  components: {
    layuiTitle
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
