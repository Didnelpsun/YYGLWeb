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
              <!--区域-->
              <tr class="el-table__row" v-if="WriteState == 2">
                <td><div class="cell"><i class="must">*</i>区域</div></td>
                <td>
                  <div class="cell">
                    <div>{{tableData.areaname}}</div>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--地市-->
              <tr class="el-table__row" v-if="WriteState == 2">
                <td><div class="cell"><i class="must">*</i>地市</div></td>
                <td>
                  <div class="cell">
                    <div>{{tableData.cityname}}</div>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--台区ID-->
              <tr class="el-table__row">
                <td><div class="cell">台区名称</div></td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.courtsname}}</div>
                    <div label-width="0" prop="courtsname" class="form-item" v-show="WriteState !== 2" @click="courtOpen">
                      <el-input v-model="tableData.courtsname" placeholder="请填入台区名称" readonly></el-input>
                    </div>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
               <!--计划停电时间-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>计划停电时间</div></td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.planpowertime}}</div>
                    <el-form-item label-width="0" prop="planpowertime" class="form-item" v-show="WriteState !== 2">
                      <el-date-picker class="tableSelect" v-model="tableData.planpowertime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="计划停电时间">
                      </el-date-picker>
                    </el-form-item>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
               <!--计划来电时间-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>计划来电时间</div></td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.plancalltime}}</div>
                    <el-form-item label-width="0" prop="plancalltime" class="form-item" v-show="WriteState !== 2">
                      <el-date-picker class="tableSelect" v-model="tableData.plancalltime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="计划来电时间">
                      </el-date-picker>
                    </el-form-item>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--协管员ID-->
             <!-- <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>协管员名称</div></td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.assistantname}}</div>
                    <div label-width="0" prop="assistantname" class="form-item" v-show="WriteState !== 2" @click="assistantOpen">
                      <el-input v-model="tableData.assistantname" placeholder="请填入协管员名称" readonly></el-input>
                    </div>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <td><div class="cell"></div></td>
              </tr>-->

              <!--告警时间-->
              <tr class="el-table__row" v-if="WriteState == 2">
                <td><div class="cell"><i class="must">*</i>告警时间</div></td>
                <td>
                  <div class="cell">
                    <div>{{tableData.alarmtime}}</div>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--派单时间-->
              <tr class="el-table__row" v-if="WriteState == 2">
                <td><div class="cell"><i class="must">*</i>派单时间</div></td>
                <td>
                  <div class="cell">
                    <div>{{tableData.sendsingletime}}</div>
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
      <el-button @click="handleData" type="primary" v-if="WriteState!==2" :disabled="WriteLoading" :icon="WriteLoading ? 'el-icon-loading' : 'el-icon-check'">保存</el-button>
      <el-button @click="closeWrite" type="primary" icon="el-icon-back">返回</el-button>
    </div>
    <el-dialog top="1%" :visible.sync="courtShow" title="选择台区名称" width="80%" :before-close="CourthandleClose">
      <CourtsPicker @selectCourts="selectCourts" ref="court"/>
    </el-dialog>
    <!--<el-dialog top="1%" :visible.sync="assistantShow" title="选择协管员名称" width="80%" :before-close="AssistanthandleClose">
      <AssistantPicker @selectAssistant="selectAssistant" ref="assistant"/>
    </el-dialog>-->
  </div>
</template>

<script>
import { AddPowerwarning, EditPowerwarning, JobInfo } from 'api/YJGL'
import CourtsPicker from 'base/YJGL/CourtsPicker'
import AssistantPicker from 'base/YJGL/AssistantPicker'
import {GlobalRes} from 'common/js/mixins'

export default{
  name: 'PowerWarningList',
  mixins: [GlobalRes],
  props: {
    WriteState: {
      type: Number,
      default: 0 // 0为添加 1为编辑 2为查看
    }
  },
  data () {
    return {
      courtShow: false,
      assistantShow: false,
      tableArea: {
        AreaList: []
      },
      areaOption: [],
      WriteLoading: false,
      // 新增表格相关属性
      tableData: {
        courtsid: '',
        courtsname: '',
        planpowertime: '',
        plancalltime: '',
        assistantid: '',
        assistantname: ''
      },
      // 分页数据
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      },
      // 表单验证
      Rules: {
        areaid: [
          { required: true, message: '请选择区域', trigger: 'blur' }
        ],
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
      this.tableData = data
    },
    courtOpen () {
      this.courtShow = true
      if (this.$refs.court) {
        this.$refs.court.getMore(1)
      }
    },
    /* assistantOpen () {
      this.assistantShow = true
      if (this.$refs.assistant) {
        this.$refs.assistant.getMore(1)
      }
    }, */
    selectCourts (id, name) {
      this.courtShow = false
      this.tableData.courtsid = id
      this.tableData.courtsname = name
    },
    selectAssistant (id, name) {
      this.assistantShow = false
      this.tableData.assistantid = id
      this.tableData.assistantname = name
    },
    // 提交函数
    handleData () {
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
            this.tableData.provinceid = this.tableArea.provinceid
            this.tableData.cityid = this.tableArea.cityid
            this.tableData.areaid = this.tableArea.areaid
            this.WriteLoading = true
            const res = await this.$axios.post(AddPowerwarning, this.tableData)
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
            if (this.tableArea.areaid && this.tableArea.cityid && this.tableArea.provinceid) {
              this.tableData.provinceid = this.tableArea.provinceid
              this.tableData.cityid = this.tableArea.cityid
              this.tableData.areaid = this.tableArea.areaid
            }
            this.WriteLoading = true
            const res = await this.$axios.put(EditPowerwarning, this.tableData)
            this.WriteLoading = false
            if (res.error === true) {
              this.$message.warning('请补全信息')
              // console.log(res.error)
            }
            // this.$message.error('输入参数为非法值，请重新输入')
            if (res.success === true) {
              this.$message.success('修改成功！')
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
      this.$refs.tableForm.clearValidate() // 初始化表单校验
      Object.assign(this.$data.tableData, this.$options.data().tableData)
      this.$nextTick(() => { this.$refs.tableForm.resetFields() })
      this.showWrite = !this.showWrite
      this.$emit('fatherClose')
    },
    CourthandleClose () {
      this.courtShow = !this.courtShow
    },
    AssistanthandleClose () {
      this.assistantShow = !this.assistantShow
    }
  },
  components: {
    CourtsPicker,
    AssistantPicker
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
