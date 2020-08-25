<template>
  <div class="write">
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
              <!--姓名-->
              <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>姓名</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.name}}</div>
                  <el-form-item label-width="0" prop="name" class="form-item" v-show="WriteState !== 2">
                    <el-input v-model="tableData.name" placeholder="请填入姓名"></el-input>
                  </el-form-item>
                </div>
              </td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
              </tr>
              <!--身份证号-->
              <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>身份证号</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.cardnum}}</div>
                  <el-form-item label-width="0" prop="cardnum" class="form-item" v-show="WriteState !== 2">
                    <el-input v-model="tableData.cardnum" placeholder="请填入身份证号"></el-input>
                  </el-form-item>
                </div>
              </td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
              </tr>
              <!--手机号-->
              <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>手机号</div></td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.mobilnum}}</div>
                    <el-form-item label-width="0" prop="mobilnum" class="form-item" v-show="WriteState !== 2">
                      <el-input v-model="tableData.mobilnum" placeholder="请填入手机号"></el-input>
                    </el-form-item>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--备用手机号-->
              <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>备用手机号</div></td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.sparemobile}}</div>
                    <el-form-item label-width="0" prop="sparemobile" class="form-item" v-show="WriteState !== 2">
                      <el-input v-model="tableData.sparemobile" placeholder="请填入备用手机号"></el-input>
                    </el-form-item>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--住址-->
              <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>住址</div></td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.address}}</div>
                    <el-form-item label-width="0" prop="address" class="form-item" v-show="WriteState !== 2">
                      <el-input v-model="tableData.address" placeholder="请填入住址"></el-input>
                    </el-form-item>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--站点ID-->
              <tr class="el-table__row" v-show="WriteState !== 2" >
                <td><div class="cell"><i class="must">*</i>站点名称</div></td>
                <td>
                  <div class="cell">
                    <div label-width="0" prop="sitename" class="form-item" @click="siteOpen">
                      <el-input v-model="tableData.sitename" placeholder="请填入站点名称" readonly></el-input>
                    </div>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--油机ID-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>油机名称</div></td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState === 2">{{tableData.enginename[0]}}</div>
                    <div label-width="0" prop="enginename" class="form-item" v-show="WriteState !== 2" @click="engineOpen">
                      <el-input v-model="tableData.enginename[0]" placeholder="请填入油机名称" readonly></el-input>
                    </div>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--提交人-->
              <tr class="el-table__row" v-if="WriteState === 2">
                <td><div class="cell">提交人</div></td>
                <td>
                  <div class="cell">
                  <div>{{tableData.realityname}}</div>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--提交时间-->
              <tr class="el-table__row" v-if="WriteState === 2">
                <td><div class="cell">提交时间</div></td>
                <td>
                  <div class="cell">
                  <div>{{tableData.dateIdinfo}}</div>
                  </div>
                </td>
                <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
            </tbody>
          </table>
        </div>
      </el-form>
    </div>
    <div class="center" style="padding-bottom: 100px">
      <el-button @click="handleData(false)" type="primary" v-if="WriteState!==2" :disabled="WriteLoading" :icon="WriteLoading ? 'el-icon-loading' : 'el-icon-check'">保存</el-button>
      <el-button @click="handleData(true)" type="primary" v-if="WriteState!==2" :disabled="WriteLoading" :icon="WriteLoading ? 'el-icon-loading' : 'el-icon-check'">提交审核</el-button>
      <el-button @click="closeWrite" type="primary" icon="el-icon-back">返回</el-button>
    </div>
    <el-dialog top="1%" :visible.sync="siteShow" title="选择站点名称" width="80%" :before-close="SitehandleClose">
      <SitePicker @selectSite="selectSite" ref="site"/>
    </el-dialog>
    <el-dialog top="1%" :visible.sync="engineShow" title="选择油机名称" width="80%" :before-close="EnginehandleClose">
      <EnginePicker @selectEngine="selectEngine" ref="engine"/>
    </el-dialog>
  </div>
</template>

<script>
import { AddAssistant, EditAssistant } from 'api/YJGL'
import SitePicker from 'base/YJGL/SitePicker'
import EnginePicker from 'base/YJGL/EnginePicker'
import {GlobalRes} from 'common/js/mixins'

export default{
  name: 'AssistantList',
  mixins: [GlobalRes],
  props: {
    WriteState: {
      type: Number,
      default: 0 // 0为添加 1为编辑 2为查看
    }
  },
  data () {
    return {
      list: [2, 5, 7],
      siteShow: false,
      engineShow: false,
      WriteLoading: false,
      // 新增表格相关属性
      tableData: {
        'name': '',
        'cardnum': '',
        'mobilnum': '',
        'sparemobile': '',
        'address': '',
        'professional': '',
        'resource': [
          {
            type: 1,
            resourcesname: '',
            resourcescode: ''
          },
          {
            type: 2,
            resourcescode: '',
            resourcesname: ''
          }
        ],
        'siteid': [],
        'sitename': '',
        'engineid': [],
        'enginename': [],
        'remark': '',
        'issubmit': false
      },
      // 分页数据
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      },
      // 表单验证
      Rules: {
        equipmentid: [
          { required: true, message: '请选择设备id', trigger: 'blur' }
        ],
        swver: [
          { required: true, message: '请选择设备软件版本号', trigger: 'blur' }
        ],
        faccode: [
          { required: true, message: '请选择厂家编码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 在进行提交新增时赋值方法，在父组件中调用该方法
    setWriteData (data) {
      this.tableData = Object.assign({}, this.tableData, data)
      for (let i = 0; i < this.tableData.resource.length; i++) {
        if (this.tableData.resource[i]['resourcescode']) {
          if (this.tableData.resource[i]['type'] === 1) {
            this.tableData.siteid.push(this.tableData.resource[i]['resourcescode'])
            this.tableData.sitename = this.tableData.resource[i]['resourcesname']
          } else if (this.tableData.resource[i]['type'] === 2) {
            this.tableData.engineid.push(this.tableData.resource[i]['resourcescode'])
            this.tableData.enginename.push(this.tableData.resource[i]['resourcesname'])
          }
        }
      }
    },
    siteOpen () {
      this.siteShow = true
      if (this.$refs.site) {
        this.$refs.site.getMore(1)
      }
    },
    engineOpen () {
      this.engineShow = true
      if (this.$refs.engine) {
        this.$refs.engine.getMore(1)
      }
    },
    selectSite (id, name) {
      this.siteShow = false
      this.tableData.siteid[0] = id
      this.tableData.sitename = name
    },
    selectEngine (id, name) {
      this.engineShow = false
      this.tableData.engineid[0] = id
      this.tableData.enginename = name
    },
    // 提交函数
    handleData (issubmit) {
      if (issubmit) {
        this.tableData.issubmit = issubmit
      } else {
        this.tableData.issubmit = false
      }
      if (this.WriteState === 0) this.add()
      if (this.WriteState === 1) this.edit()
    },
    // 添加提交
    async add () {
      this.$refs.tableForm.validate(async (valid, msg) => {
        // console.log(this.tableData)
        if (!valid) {
          this.$message.warning('请补全信息')
        } else {
          try {
            this.WriteLoading = true
            const res = await this.$axios.post(AddAssistant, this.tableData)
            this.WriteLoading = false
            if (res.error === true) {
              this.$message.warning('请补全信息')
              console.log(res.errorMessage)
            }
            if (res.success === true) {
              if (this.tableData.issubmit) {
                this.$message.success('提交审核成功！')
              } else { this.$message.success('添加成功！') }
              this.$emit('fatheretMore')
              this.closeWrite()
            } else { this.$message.warning(res.msg) }
          } catch (e) {
            console.log(e)
          }
        }
      })
    },
    // 修改提交
    async edit () {
      this.$refs.tableForm.validate(async (valid, msg) => {
        // console.log(this.tableData)
        if (!valid) {
          this.$message.warning('请补全信息')
        } else {
          try {
            this.WriteLoading = true
            const res = await this.$axios.put(EditAssistant, this.tableData)
            this.WriteLoading = false
            if (res.error === true) {
              this.$message.warning('请补全信息')
              // console.log(res.error)
            }
            // this.$message.error('输入参数为非法值，请重新输入')
            if (res.success === true) {
              if (this.tableData.issubmit) {
                this.$message.success('提交审核成功！')
              } else { this.$message.success('修改成功！') }
              this.$emit('fatheretMore')
              this.closeWrite()
            } else { this.$message.warning(res.msg) }
          } catch (e) {
            console.log(e)
          }
        }
      })
    },
    // 返回关闭编辑函数
    closeWrite () {
      // this.$refs.tableForm.clearValidate() // 初始化表单校验
      Object.assign(this.$data.tableData, this.$options.data().tableData)
      // this.$nextTick(() => { this.$refs.tableForm.resetFields() })
      this.showWrite = !this.showWrite
      this.$emit('fatherClose')
    },
    SitehandleClose () {
      this.siteShow = !this.siteShow
    },
    EnginehandleClose () {
      this.engineShow = !this.engineShow
    }
  },
  components: {
    SitePicker,
    EnginePicker
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
