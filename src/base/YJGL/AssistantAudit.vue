<template>
  <div class="write" style="margin:15px">
    <layuiTitle title="协管员审核"></layuiTitle>
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
              <!--类型-->
              <tr class="el-table__row">
                <td><div class="cell">类型</div></td>
                <td>
                  <div class="cell">
                    <div v-if="tableData.type===1">站点</div>
                    <div v-if="tableData.type===2">油机</div>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--备注-->
              <tr class="el-table__row">
                <td><div class="cell">备注</div></td>
                <td>
                  <div class="cell">
                    <div>{{tableData.remark}}</div>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--申请人-->
              <tr class="el-table__row">
                <td><div class="cell">申请人</div></td>
                <td>
                  <div class="cell">
                    <div>{{tableData.applicantname}}</div>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--申请时间-->
              <tr class="el-table__row">
                <td><div class="cell">申请时间</div></td>
                <td>
                  <div class="cell">
                    <div>{{tableData.applytime}}</div>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--站点名称-->
              <tr class="el-table__row" v-if="tableData.type===1">
                <td><div class="cell">站点名称</div></td>
                <td>
                  <div class="cell">
                    <div>{{tableData.sitename}}</div>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--油机缸号-->
              <tr class="el-table__row" v-if="tableData.type===2">
                <td><div class="cell">油机缸号</div></td>
                <td>
                  <div class="cell">
                    <div>{{tableData.machinebatchno}}</div>
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
                    <el-form-item label-width="0" prop="assistantstate" class="form-item">
                      <el-select class="tableSelect" v-model="tableData.assistantstate" placeholder="请选择审核状态">
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
import { AuditApply } from 'api/YJGL'
import layuiTitle from 'base/layui-title'
import {GlobalRes} from 'common/js/mixins'

export default{
  name: 'EngineAudit',
  mixins: [GlobalRes],
  data () {
    return {
      WriteLoading: false,
      // 新增表格相关属性
      tableData: {
        id: '',
        modulecode: '',
        swver: '',
        applicanttype: 0,
        applicantname: '',
        applytime: '',
        assistantstate: 4,
        auditopinion: ''
      },
      // 表单验证
      Rules: {
        assistantstate: [
          { required: true, message: '请选择审核状态', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    setWriteData (data) {
      this.tableData = data
    },
    auditData () {
      if (!this.tableData.assistantstate) {
        this.$message.warning('请选择审核状态')
      } else {
        this.$axios.put(AuditApply, {
          id: this.tableData.id,
          assistantstate: this.tableData.assistantstate,
          auditopinion: this.tableData.auditopinion
        }).then(res => {
          if (res.success === false) {
            this.$message.error(res.msg)
          }
          if (res.success === true) {
            this.$message.success('审核成功！')
            this.closeWrite()
          }
        }).catch(error => {
          console.log(error)
        })
      }
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
