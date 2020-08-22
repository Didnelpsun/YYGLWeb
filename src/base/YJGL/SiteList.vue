<template>
  <div class="write">
    <el-tabs class="content-card" v-model="ViewTabIndex" @tab-click="resetData">
    <el-tab-pane :label="WriteState===1?'站点编辑':'站点详情'">
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
        <el-form :model="tableData1" :rules="Rules" ref="tableForm" v-loading="WriteLoading">
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
                <tr class="el-table__row" v-show="WriteState !== 2">
                  <td><div class="cell"><i class="must">*</i>区域</div></td>
                  <td>
                    <div class="cell">
                      <el-form-item label-width="0" class="form-item" v-model="tableData1.areaid">
                        <el-cascader v-model="tableArea.AreaList" :props="areaProps" @change="changeArea(tableArea)" :options="areaOption" ref="csArea"></el-cascader>
                      </el-form-item>
                    </div>
                  </td>
                  <td><div class="cell"></div></td>
                  <!-- <td>
                    <div class="cell" v-show="WriteState === 1">{{tableData1.provincename}}/{{tableData1.cityname}}/{{tableData1.areaname}}</div>
                  </td> -->
                  <td><div class="cell"></div></td>
                </tr>
                <!--地市-->
                <tr class="el-table__row" v-show="WriteState == 2">
                  <td><div class="cell"><i class="must">*</i>地市</div></td>
                  <td>
                    <div class="cell">
                      <div>{{tableData1.cityname}}</div>
                    </div>
                  </td>
                  <td><div class="cell"></div></td>
                  <!-- <td>
                    <div class="cell" v-show="WriteState === 1">{{tableData1.provincename}}/{{tableData1.cityname}}/{{tableData1.areaname}}</div>
                  </td> -->
                  <td><div class="cell"></div></td>
                </tr>
                <!--区域-->
                <tr class="el-table__row" v-show="WriteState == 2">
                  <td><div class="cell"><i class="must">*</i>区域</div></td>
                  <td>
                    <div class="cell">
                      <div>{{tableData1.areaname}}</div>
                    </div>
                  </td>
                  <td><div class="cell"></div></td>
                  <!-- <td>
                    <div class="cell" v-show="WriteState === 1">{{tableData1.provincename}}/{{tableData1.cityname}}/{{tableData1.areaname}}</div>
                  </td> -->
                  <td><div class="cell"></div></td>
                </tr>
                <!--站点名-->
                <tr class="el-table__row">
                  <td><div class="cell">站点名称</div></td>
                  <td>
                    <div class="cell">
                      <div>{{tableData1.name}}</div>
                    </div>
                  </td>
                  <td><div class="cell"></div></td>
                  <!-- <td><div class="cell"></div></td> -->
                  <td><div class="cell"></div></td>
                </tr>
                <!--站点类型-->
                <tr class="el-table__row">
                  <td><div class="cell"><i class="must">*</i>站点类型</div></td>
                  <td>
                    <div class="cell">
                      <div v-show="WriteState == 2">{{tableData1.resourcetype}}</div>
                      <el-form-item label-width="0" prop="maintenanceunit" class="form-item" v-show="WriteState !== 2">
                        <el-select class="tableSelect" v-model="tableData1.resourcetype" placeholder="请选择站点类型">
                          <el-option label="请选择" value=""></el-option>
                          <el-option v-for="item in dictionaryList.resourcetypeList" :key="item.id" :label="item.text" :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </td>
                  <td><div class="cell"></div></td>
                  <!-- <td><div class="cell"></div></td> -->
                  <td><div class="cell"></div></td>
                </tr>
                <!--站点编码-->
                <tr class="el-table__row">
                  <td><div class="cell">站点编码</div></td>
                  <td>
                    <div class="cell">
                      <div>{{tableData1.code}}</div>
                    </div>
                  </td>
                  <td><div class="cell"></div></td>
                  <!-- <td><div class="cell"></div></td> -->
                  <td><div class="cell"></div></td>
                </tr>
                <!--经度-->
                <tr class="el-table__row">
                  <td><div class="cell">经度</div></td>
                  <td>
                    <div class="cell">
                      <div>{{tableData1.longitude}}</div>
                    </div>
                  </td>
                  <td><div class="cell"></div></td>
                  <!-- <td><div class="cell"></div></td> -->
                  <td><div class="cell"></div></td>
                </tr>
                <!--纬度-->
                <tr class="el-table__row">
                  <td><div class="cell">纬度</div></td>
                  <td>
                    <div class="cell">
                      <div>{{tableData1.latitude}}</div>
                    </div>
                  </td>
                  <td><div class="cell"></div></td>
                  <!-- <td><div class="cell"></div></td> -->
                  <td><div class="cell"></div></td>
                </tr>
                <!--协管员-->
                <tr class="el-table__row">
                  <td><div class="cell">协管员</div></td>
                  <td>
                    <div class="cell">
                      <div>{{tableData1.assistantname}}</div>
                    </div>
                  </td>
                  <td><div class="cell"></div></td>
                  <!-- <td><div class="cell"></div></td> -->
                  <td><div class="cell"></div></td>
                </tr>
                <!--入网日期-->
                <tr class="el-table__row">
                  <td><div class="cell">入网日期</div></td>
                  <td>
                    <div class="cell">
                      <div>{{tableData1.accessdate}}</div>
                    </div>
                  </td>
                  <td><div class="cell"></div></td>
                  <!-- <td><div class="cell"></div></td> -->
                  <td><div class="cell"></div></td>
                </tr>
                <!--操作人-->
                <tr class="el-table__row">
                  <td><div class="cell">操作人</div></td>
                  <td>
                    <div class="cell">
                      <div>{{tableData1.createusername}}</div>
                    </div>
                  </td>
                  <td><div class="cell"></div></td>
                  <!-- <td><div class="cell"></div></td> -->
                  <td><div class="cell"></div></td>
                </tr>
                <!--机房类型-->
                <tr class="el-table__row">
                  <td><div class="cell">机房类型</div></td>
                  <td>
                    <div class="cell">
                      <div></div>
                    </div>
                  </td>
                  <td><div class="cell"></div></td>
                  <!-- <td><div class="cell"></div></td> -->
                  <td><div class="cell"></div></td>
                </tr>
                <!--保障级别-->
                <tr class="el-table__row">
                  <td><div class="cell">保障级别</div></td>
                  <td>
                    <div class="cell">
                      <div></div>
                    </div>
                  </td>
                  <td><div class="cell"></div></td>
                  <!-- <td><div class="cell"></div></td> -->
                  <td><div class="cell"></div></td>
                </tr>
                <!--发电功率-->
                <tr class="el-table__row">
                  <td><div class="cell">发电功率</div></td>
                  <td>
                    <div class="cell">
                      <div></div>
                    </div>
                  </td>
                  <td><div class="cell"></div></td>
                  <!-- <td><div class="cell"></div></td> -->
                  <td><div class="cell"></div></td>
                </tr>
                <!--站长-->
                <tr class="el-table__row">
                  <td><div class="cell">站长</div></td>
                  <td>
                    <div class="cell">
                      <div></div>
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
    </el-tab-pane>
    <el-tab-pane label="运维站点列表">
      <el-table :data="tableData2" v-loading="WriteLoading">
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="siteid" label="运维ID"></el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="运营商站点列表">
      <el-table :data="tableData3">
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="" label="系统编号"></el-table-column>
        <el-table-column prop="" label="系统名称"></el-table-column>
        <el-table-column prop="openingdate" label="入网日期"></el-table-column>
        <el-table-column prop="" label="设备功率"></el-table-column>
        <el-table-column prop="" label="起租时间"></el-table-column>
        <el-table-column prop="" label="截至时间"></el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="协管员信息">
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
        <el-form :model="tableData4" v-loading="WriteLoading">
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
                  <td><div class="cell">姓名</div></td>
                  <td>
                    <div class="cell">
                      <div>{{tableData4.name}}</div>
                    </div>
                  </td>
                  <td><div class="cell"></div></td>
                  <!-- <td><div class="cell"></div></td> -->
                  <td><div class="cell"></div></td>
                </tr>
                <!--身份证号-->
                <tr class="el-table__row">
                  <td><div class="cell">身份证号</div></td>
                  <td>
                    <div class="cell">
                      <div>{{tableData4.cardnum}}</div>
                    </div>
                  </td>
                  <td><div class="cell"></div></td>
                  <!-- <td><div class="cell"></div></td> -->
                  <td><div class="cell"></div></td>
                </tr>
                <!--手机号-->
                <tr class="el-table__row">
                  <td><div class="cell">联系电话</div></td>
                  <td>
                    <div class="cell">
                      <div>{{tableData4.mobilnum}}</div>
                    </div>
                  </td>
                  <td><div class="cell"></div></td>
                  <!-- <td><div class="cell"></div></td> -->
                  <td><div class="cell"></div></td>
                </tr>
                <!--备用手机号-->
                <tr class="el-table__row">
                  <td><div class="cell">紧急联系人</div></td>
                  <td>
                    <div class="cell">
                      <div>{{tableData4.sparemobile}}</div>
                    </div>
                  </td>
                  <td><div class="cell"></div></td>
                  <!-- <td><div class="cell"></div></td> -->
                  <td><div class="cell"></div></td>
                </tr>
                <!--住址-->
                <tr class="el-table__row">
                  <td><div class="cell">住址</div></td>
                  <td>
                    <div class="cell">
                      <div>{{tableData4.address}}</div>
                    </div>
                  </td>
                  <td><div class="cell"></div></td>
                  <!-- <td><div class="cell"></div></td> -->
                  <td><div class="cell"></div></td>
                </tr>
                <!--职业-->
                <tr class="el-table__row">
                  <td><div class="cell">职业</div></td>
                  <td>
                    <div class="cell">
                      <div>{{tableData4.professional}}</div>
                    </div>
                  </td>
                  <td><div class="cell"></div></td>
                  <!-- <td><div class="cell"></div></td> -->
                  <td><div class="cell"></div></td>
                </tr>
                <!--工作时间-->
                <tr class="el-table__row">
                  <td><div class="cell">工作时间</div></td>
                  <td>
                    <div class="cell">
                      <!-- <div>{{tableData4.createusername}}</div> -->
                    </div>
                  </td>
                  <td><div class="cell"></div></td>
                  <!-- <td><div class="cell"></div></td> -->
                  <td><div class="cell"></div></td>
                </tr>
                <!--登记人-->
                <tr class="el-table__row">
                  <td><div class="cell">登记人</div></td>
                  <td>
                    <div class="cell">
                      <div>{{tableData4.realityname}}</div>
                    </div>
                  </td>
                  <td><div class="cell"></div></td>
                  <!-- <td><div class="cell"></div></td> -->
                  <td><div class="cell"></div></td>
                </tr>
                <!--登记时间-->
                <tr class="el-table__row">
                  <td><div class="cell">登记时间</div></td>
                  <td>
                    <div class="cell">
                      <div>{{tableData4.dateIdinfo}}</div>
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
    </el-tab-pane>
    <el-tab-pane label="发电点列表">
      <el-table :data="tableData5" v-loading="WriteLoading">
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">{{scope.$index+ 1}}</template>
        </el-table-column>
        <el-table-column prop="placeinfo" label="发电点位置"></el-table-column>
        <el-table-column prop="km" label="距离"  :formatter="toFix"></el-table-column>
        <el-table-column prop="realityname" label="提交人"></el-table-column>
        <el-table-column prop="applytime" label="提交时间"></el-table-column>
        <el-table-column label="操作" width="140" fixed="right">
          <template>
            <el-button type="text" size="mini">启用</el-button>
            <el-button type="text" size="mini">复用</el-button>
            <el-button type="text" size="mini">作废</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    </el-tabs>
    <div class="center" style="padding-bottom: 100px">
      <el-button @click="subData" type="primary" v-show="WriteState !==2&& ViewTabIndex==='0'" :disabled="WriteLoading" :icon="WriteLoading ? 'el-icon-loading' : 'el-icon-check'">提交</el-button>
      <el-button @click="closeWrite" type="primary" icon="el-icon-back">返回</el-button>
    </div>
  </div>
</template>

<script>
import { EditBattery } from 'api/api'
import {GlobalRes} from 'common/js/mixins'

export default{
  name: 'BatteryDe',
  mixins: [GlobalRes],
  props: {
    WriteState: {
      type: Number,
      default: 0 // 0为添加 1为编辑 2为查看
    },
    dictionaryList: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      isShow: false,
      // 填写区域属性
      tableArea: {
        AreaList: []
      },
      areaOption: [],
      WriteLoading: false,
      // 新增表格相关属性
      tableData1: {
        'name': '',
        'code': '',
        'provinceid': 0,
        'cityid': 0,
        'areaid': 0,
        'resourcetype': '',
        'longitude': null,
        'latitude': null,
        'accessdate': '',
        'assistant': '',
        'createusername': ''
      },
      tableData2: [],
      tableData3: [],
      tableData4: {
      },
      tableData5: [],
      ViewTabIndex: '0',
      // 表单验证
      Rules: {
        resourcetype: [
          { required: true, message: '请输入站点类型', trigger: 'blur' }
        ],
        areaid: [
          { required: true, message: '请选择区域', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 在进行提交新增时赋值方法，在父组件中调用该方法
    setWriteData1 (data1) {
      // console.log('setWriteData1->data1:')
      // console.log(data1)
      if (data1) {
        this.tableData1 = data1
        try {
          if (this.tableData1.accessdate) {
            if (this.tableData1.accessdate.trim() === '0001-01-01') this.tableData1.productiontime = ''
          }
          if (this.tableData1.createtime) {
            if (this.tableData1.createtime.trim() === '0001-01-01') this.tableData1.createtime = ''
          }
        } catch (e) {
          console.log(e)
        }
      }
    },
    setWriteData2 (data2) {
      if (data2) {
        this.tableData2 = data2
      }
    },
    setWriteData3 (data3) {
      if (data3) {
        this.tableData3 = data3
        try {
          for (let i = 0; i < this.tableData3.length; i++) {
            if (this.tableData3[i].openingdate) {
              if (this.tableData3[i].openingdate.trim() === '0001-01-01') this.tableData3[i].openingdate = ''
            }
          }
        } catch (e) {
          console.log(e)
        }
      }
    },
    setWriteData4 (data4) {
      if (data4) {
        this.tableData4 = data4
      }
    },
    setWriteData5 (data5) {
      if (data5) {
        this.tableData5 = data5
      }
    },
    resetData () {
      if (this.ViewTabIndex === '0') {
        this.$emit('fathersetData1')
      }
      if (this.ViewTabIndex === '1') {
        this.$emit('fathersetData2')
      }
      if (this.ViewTabIndex === '2') {
        this.$emit('fathersetData3')
      }
      if (this.ViewTabIndex === '3') {
        this.$emit('fathersetData4')
      }
      if (this.ViewTabIndex === '4') {
        this.$emit('fathersetData5')
      }
    },
    // 提交函数
    subData () {
      if (this.WriteState === 1) this.edit()
    },
    // 修改提交
    async edit () {
      this.$refs.tableForm.validate(async (valid, msg) => {
        // console.log(this.tableData1)
        if (!valid) {
          this.$message.warning('请补全信息')
        } else {
          try {
            if (this.tableArea.areaid !== null && this.tableArea.areaid !== '' && this.tableArea.areaid !== undefined) {
              this.tableData1.provinceid = this.tableArea.provinceid
              this.tableData1.cityid = this.tableArea.cityid
              this.tableData1.areaid = this.tableArea.areaid
            }
            this.WriteLoading = true
            const res = await this.$axios.put(EditBattery, this.tableData1)
            this.WriteLoading = false
            if (res.error === true) {
              this.$message.warning('请补全信息')
              // console.log(res.error)
            }
            // this.$message.error('输入参数为非法值，请重新输入')
            if (res.success === true) {
              this.$message.success('修改成功！')
              this.$emit('fatheretMore')
              // this.dictionaryList.areaList = []
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
      this.ViewTabIndex = '0'
      Object.assign(this.$data.tableData1, this.$options.data().tableData1)
      Object.assign(this.$data.tableData2, this.$options.data().tableData2)
      Object.assign(this.$data.tableData3, this.$options.data().tableData3)
      Object.assign(this.$data.tableData4, this.$options.data().tableData4)
      Object.assign(this.$data.tableData5, this.$options.data().tableData5)
      this.$nextTick(() => { this.$refs.tableForm.resetFields() })
      this.setArea([])
      this.areaOption = []
      this.tableArea.AreaList.splice(0, this.tableArea.AreaList.length)
      // this.getMore(1)
      this.showWrite = !this.showWrite
      this.$emit('fatherClose')
    },
    toFix (row, col) {
      return row.km.toFixed(2)
    }
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
