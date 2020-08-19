<template>
  <div>
    <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--small">
      <!--表头-->
      <div class="el-table__header-wrapper">
        <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
          <colgroup>
            <col width="100"/>
            <col width="300"/>
            <!-- <col width="250"/> -->
            <col width="100"/>
          </colgroup>
          <thead>
          <tr>
            <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
            <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
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
              <col width="100"/>
              <col width="300"/>
              <!-- <col width="250"/> -->
              <col width="100"/>
            </colgroup>
            <tbody>
            <!--图片名称-->
            <tr class="el-table__row el-table__row--striped">
              <td><div class="cell"><i class="must">*</i>图片名称</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.name}}</div>
                  <div v-show="WriteState !== 2">
                    <el-input v-model="tableData.name" placeholder="请输入图片名称"></el-input>
                  </div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--图片标题-->
            <tr class="el-table__row el-table__row--striped">
              <td>
                <div class="cell"><i class="must">*</i>图片标题</div>
              </td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.title}}</div>
                  <div v-show="WriteState !== 2" >
                    <el-input v-model="tableData.title" placeholder="请输入图片标题"></el-input>
                  </div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--建站方式-->
            <tr class="el-table__row el-table__row--striped">
              <td><div class="cell"><i class="must">*</i>建站方式</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.constructionmodename}}</div>
                  <el-form-item label-width="0" prop="models" class="form-item" v-show="WriteState !== 2">
                    <el-select class="tableSelect" v-model="tableData.constructionmode" placeholder="请选择建站方式">
                      <el-option label="请选择" value=""></el-option>
                      <el-option v-for="item in constructionmodeList" :key="item.id" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </td>
              <!-- <td><div class="cell">{{this.writeDic(constructionmodeList)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--创建人-->
            <tr v-show="WriteState == 2" class="el-table__row el-table__row--striped">
              <td><div class="cell">创建人</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.createusername}}</div>
                </div>
              </td>
              <!-- <td>
                <div class="cell" v-show="WriteState === 1">{{tableData.name}}</div>
              </td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--创建时间-->
            <tr v-show="WriteState == 2" class="el-table__row el-table__row--striped">
              <td>
                <div class="cell">创建时间</div>
              </td>
              <td>
                <div class="cell">
                  <div>{{tableData.createtime}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            </tbody>
          </table>
        </div>
      </el-form>
    </div>
    <div class="center" style="padding-bottom: 100px">
      <el-button @click="subData" type="primary" v-show="WriteState !==2" :disabled="WriteLoading" :icon="WriteLoading ? 'el-icon-loading' : 'el-icon-check'">提交</el-button>
      <el-button @click="closeWrite" type="primary" icon="el-icon-back">返回</el-button>
    </div>
  </div>
</template>

<script>
import { AddInvestigateImgConfiguration, UpdateInvestigateImgConfiguration } from 'api/SurveyManagement'
import {GlobalRes} from 'common/js/mixins'

export default{
  name: 'InvestigateImgConfiguration',
  mixins: [GlobalRes],
  props: {
    WriteState: {
      type: Number,
      default: 0 // 0为添加 1为编辑 2为查看
    },
    constructionmodeList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      WriteLoading: false,
      // 新增表格相关属性
      tableData: {
        name: '',
        title: '',
        constructionmode: ''
      },
      // 表单验证
      Rules: {
        name: [
          { required: true, message: '请输入图片名称', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请选择图片标题', trigger: 'blur' }
        ],
        constructionmodename: [
          { required: true, message: '请选择建站方式', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 在进行提交新增时赋值方法，在父组件中调用该方法
    setWriteData (data) {
      this.tableData = data
      if (this.tableData.createtime.trim() === '0001-01-01') this.tableData.productiontime = ''
    },
    // 提交函数
    subData () {
      if (this.WriteState === 0) this.add()
      if (this.WriteState === 1) this.edit()
    },
    // 添加提交
    async add () {
      this.$refs.tableForm.validate(async (valid, msg) => {
        try {
          this.WriteLoading = true
          const res = await this.$axios.post(AddInvestigateImgConfiguration, this.tableData)
          this.WriteLoading = false
          if (res.error === true) {
            this.$message.warning('请补全信息')
            console.log(res.errorMessage)
          }
          if (res.success === true) {
            this.$message.success('添加成功！')
            this.$emit('fatheretMore')
            this.closeWrite()
          } else { this.$message.warning(res.msg) }
        } catch (e) {
          console.log(e)
        }
      })
    },
    // 修改提交
    async edit () {
      this.$refs.tableForm.validate(async (valid, msg) => {
        try {
          this.WriteLoading = true
          const res = await this.$axios.put(UpdateInvestigateImgConfiguration, this.tableData)
          this.WriteLoading = false
          if (res.error === true) {
            this.$message.warning('请补全信息')
          }
          if (res.success === true) {
            this.$message.success('修改成功！')
            this.$emit('fatheretMore')
            this.closeWrite()
          } else { this.$message.warning(res.msg) }
        } catch (e) {
          console.log(e)
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
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
