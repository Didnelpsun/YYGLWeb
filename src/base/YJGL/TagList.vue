<template>
  <div>
    <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--small">
      <!--表头-->
      <div class="el-table__header-wrapper">
        <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
          <colgroup>
            <col width="150"/>
            <col width="200"/>
            <!-- <col width="250"/> -->
            <col width="150"/>
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
              <col width="150"/>
              <col width="200"/>
              <!-- <col width="250"/> -->
              <col width="150"/>
            </colgroup>
            <tbody>
              <!--地市-->
              <tr class="el-table__row" v-if="WriteState === 0">
                <td><div class="cell"><i class="must">*</i>地市</div></td>
                <td>
                  <div class="cell">
                    <el-form-item label-width="0" class="form-item"  prop="AreaList">
                    <el-cascader v-model="tableData.AreaList" :props="areaProps" @change="changeArea(tableData)" :options="areaOption" ref="csArea"></el-cascader>
                  </el-form-item>
                </div>
              </td>
              <!-- <td>
                <div class="cell" v-show="WriteState === 1">{{tableData.provincename}}/{{tableData.cityname}}/{{tableData.areaname}}</div>
              </td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--省份-->
            <tr class="el-table__row" v-show="WriteState !== 0">
              <td><div class="cell"><i class="must">*</i>省份</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.provincename}}</div>
                </div>
              </td>
              <!-- <td>
                <div class="cell" v-show="WriteState === 1">{{tableData.provincename}}/{{tableData.cityname}}/{{tableData.areaname}}</div>
              </td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--地市-->
            <tr class="el-table__row" v-show="WriteState !== 0">
              <td><div class="cell"><i class="must">*</i>地市</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.cityname}}</div>
                </div>
              </td>
              <!-- <td>
                <div class="cell" v-show="WriteState === 1">{{tableData.provincename}}/{{tableData.cityname}}/{{tableData.areaname}}</div>
              </td> -->
              <td><div class="cell"></div></td>
            </tr>
          <!--  &lt;!&ndash;产权单位&ndash;&gt;
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>产权单位</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.propertyunitname}}</div>
                  <el-form-item label-width="0" prop="models" class="form-item" v-show="WriteState !== 2">
                    <el-select class="tableSelect" v-model="tableData.propertyunit" placeholder="请选择产权单位">
                      <el-option label="请选择" value=""></el-option>
                      <el-option v-for="item in dictionaryList.propertyunitList" :key="item.id" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </td>
              &lt;!&ndash; <td><div class="cell">{{this.writeDic(constructionmodeList)}}</div></td> &ndash;&gt;
              <td><div class="cell"></div></td>
            </tr>-->
            <!--编码-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>标签编码</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.modulecode}}</div>
                  <el-form-item label-width="0" prop="modulecode" class="form-item" v-show="WriteState !== 2">
                    <el-input v-model="tableData.modulecode" placeholder="请填入标签编码"></el-input>
                  </el-form-item>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--提交人-->
            <tr v-show="WriteState == 2" class="el-table__row">
              <td><div class="cell">提交人</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.username}}</div>
                </div>
              </td>
              <!-- <td>
                <div class="cell" v-show="WriteState === 1">{{tableData.name}}</div>
              </td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--提交时间-->
            <tr v-show="WriteState == 2" class="el-table__row">
              <td>
                <div class="cell">提交时间</div>
              </td>
              <td>
                <div class="cell">
                  <div>{{tableData.registrationtime}}</div>
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
import { AddTag, EditTag } from 'api/YJGL'
import {GlobalRes} from 'common/js/mixins'

export default{
  name: 'TagList',
  mixins: [GlobalRes],
  props: {
    WriteState: {
      type: Number,
      default: 0 // 0为添加 1为编辑 2为查看
    },
    dictionaryList: {
      type: Object,
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
        provinceid: '',
        cityid: '',
        name: '',
        title: '',
        modulecode: '',
        propertyunit: '',
        AreaList: []
      },
      areaOption: [],
      // 表单验证
      Rules: {
        AreaList: [
          { required: true, message: '请选择区域', trigger: 'blur' }
        ],
        modulecode: [
          { required: true, message: '请选择编码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 在进行提交新增时赋值方法，在父组件中调用该方法
    setWriteData (data) {
      this.tableData = data
      if (this.tableData.registrationtime.trim() === '0001-01-01') this.tableData.productiontime = ''
    },
    // 提交函数
    subData () {
      if (this.WriteState === 0) this.add()
      if (this.WriteState === 1) this.edit()
    },
    // 添加提交
    async add () {
      this.$refs.tableForm.validate((valid, msg) => {
        if (!valid) {
          return this.$message.warning('请补全信息')
        } else {
          this.WriteLoading = true
          this.$axios.post(AddTag, this.tableData).then(res => {
            this.WriteLoading = false
            if (res.errorCode !== '200') return this.$message.error(res.msg)
            this.$message.success('添加成功!')
            this.$emit('fatheretMore')
            this.closeWrite()
          })
        }
      })
    },
    // 修改提交
    async edit () {
      this.$refs.tableForm.validate((valid, msg) => {
        if (this.tableData.modulecode === undefined || this.tableData.modulecode === '') {
          return this.$message.warning('请补全信息')
        } else {
          this.WriteLoading = true
          this.$axios.put(EditTag, this.tableData).then(res => {
            if (res.errorCode !== '200') return this.$message.error(res.msg)
            this.$message.success('添加成功!')
            this.$emit('fatheretMore')
            this.closeWrite()
          })
        }
      })
    },
    // 返回关闭编辑函数
    closeWrite () {
      this.$refs.tableForm.clearValidate() // 初始化表单校验
      Object.assign(this.$data.tableData, this.$options.data().tableData)
      this.$refs.tableForm.resetFields()
      this.showWrite = !this.showWrite
      this.$emit('fatherClose')
    }
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
