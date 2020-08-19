<template>
  <div class="write">
    <el-tabs class="content-card" v-model="ViewTabIndex" @tab-click="resetData">
      <el-tab-pane :label="WriteState===0?'任务新增':WriteState===1?'任务编辑':'任务详情'">
        <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--small">
          <!--表头-->
          <div class="el-table__header-wrapper">
            <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
              <colgroup>
                <col width="40"/>
                <col width="80"/>
                <col width="40"/>
                <col width="80"/>
                <col width="40"/>
                <col width="80"/>
                <col width="40"/>
                <col width="80"/>
              </colgroup>
            </table>
          </div>
          <!--表体-->
          <el-form :model="tableData1" :rules="Rules" ref="tableForm"  v-loading="WriteLoading">
            <div class="el-table__body-wrapper is-scrolling-none">
              <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
                <colgroup>
                  <col width="40"/>
                  <col width="80"/>
                  <col width="40"/>
                  <col width="80"/>
                  <col width="40"/>
                  <col width="80"/>
                  <col width="40"/>
                  <col width="80"/>
                </colgroup>
                <tbody>
                  <tr class="el-table__row">
                    <td><div class="cell">区域</div></td>
                    <td><div class="cell">{{tableData1.area}}</div></td>
                    <td><div class="cell">乡镇</div></td>
                    <td><div class="cell">{{tableData1.town}}</div></td>
                    <td><div class="cell">站点名称</div></td>
                    <td><div class="cell">{{tableData1.sitename}}</div></td>
                    <td><div class="cell">站点编码</div></td>
                    <td><div class="cell">{{tableData1.sitecode}}</div></td>
                  </tr>
                  <tr class="el-table__row">
                    <td><div class="cell">运维ID</div></td>
                    <td><div class="cell">{{tableData1.siteid}}</div></td>
                    <td><div class="cell">工单编号</div></td>
                    <td><div class="cell">{{tableData1.code}}</div></td>
                    <td><div class="cell">工单状态</div></td>
                    <td><div class="cell">{{tableData1.workorderstatus}}</div></td>
                    <td><div class="cell">接单员</div></td>
                    <td><div class="cell"></div></td>
                  </tr>
                  <tr class="el-table__row">
                    <td><div class="cell">派单时间</div></td>
                    <td><div class="cell">{{tableData1.sendsingletime}}</div></td>
                    <td><div class="cell">接单时间</div></td>
                    <td><div class="cell">{{tableData1.ordertime}}</div></td>
                    <td><div class="cell">回单时间</div></td>
                    <td><div class="cell">{{tableData1.receipttime}}</div></td>
                    <td><div class="cell">归档时间</div></td>
                    <td><div class="cell">{{tableData1.archivetime}}</div></td>
                  </tr>
                  <tr class="el-table__row">
                    <td><div class="cell">站点地址</div></td>
                    <td colspan="5"><div class="cell">{{tableData1.address}}</div></td>
                    <td><div class="cell">起租情况</div></td>
                    <td><div class="cell"></div></td>
                  </tr>
                  <tr class="el-table__row">
                    <td><div class="cell">机房类型</div></td>
                    <td><div class="cell">{{tableData1.roomtype}}</div></td>
                    <td><div class="cell">保障级别</div></td>
                    <td><div class="cell"></div></td>
                    <td><div class="cell">发电功率</div></td>
                    <td><div class="cell"></div></td>
                    <td><div class="cell">协管员</div></td>
                    <td><div class="cell">{{tableData1.assistantname}}:{{tableData1.mobilnum}}</div></td>
                  </tr>
                  <tr class="el-table__row">
                    <td><div class="cell">油机编号</div></td>
                    <td><div class="cell">{{tableData1.machinenumber}}</div></td>
                    <td><div class="cell">油机缸号</div></td>
                    <td><div class="cell">{{tableData1.machinebatchno}}</div></td>
                    <td><div class="cell">燃油类型</div></td>
                    <td><div class="cell">{{tableData1.fueltype}}</div></td>
                    <td><div class="cell">功率</div></td>
                    <td><div class="cell"></div></td>
                  </tr>
                  <tr class="el-table__row">
                    <td><div class="cell">代维单位</div></td>
                    <td><div class="cell">{{tableData1.DaiWeicompany}}</div></td>
                    <td><div class="cell">网格</div></td>
                    <td><div class="cell"></div></td>
                    <td><div class="cell">发电员</div></td>
                    <td><div class="cell">姓名电话</div></td>
                    <td><div class="cell"></div></td>
                    <td><div class="cell"></div></td>
                  </tr>
                  <tr class="el-table__row">
                    <td colspan="4"><div class="cell">工单事件</div></td>
                    <td colspan="4"><div class="cell">油机事件</div></td>
                  </tr>
                  <tr class="el-table__row">
                    <td><div class="cell">工单事件</div></td>
                    <td><div class="cell">时间</div></td>
                    <td><div class="cell">电压电流</div></td>
                    <td><div class="cell">续航时长</div></td>
                    <td><div class="cell">油机事件</div></td>
                    <td><div class="cell">时间</div></td>
                    <td><div class="cell">工作状态</div></td>
                    <td><div class="cell">照片</div></td>
                  </tr>
                  <tr class="el-table__row">
                    <td><div class="cell">告警</div></td>
                    <td><div class="cell">{{tableData1.alarmtime}}</div></td>
                    <td><div class="cell"></div></td>
                    <td><div class="cell"></div></td>
                    <td><div class="cell">出发</div></td>
                    <td><div class="cell">{{tableData1.setdateinfo}}</div></td>
                    <td><div class="cell">{{tableData1.setworkingstate}}</div></td>
                    <td @click="OpenImgBox('setimglist')">
                      <div class="cell" v-if="tableData1.setimglist">{{tableData1.setimglist.length}}</div>
                    </td>
                  </tr>
                  <tr class="el-table__row">
                    <td><div class="cell">开始停电</div></td>
                    <td><div class="cell">{{tableData1.starttime}}</div></td>
                    <td><div class="cell"></div></td>
                    <td><div class="cell"></div></td>
                    <td><div class="cell">部署</div></td>
                    <td><div class="cell">{{tableData1.deploydateinfo}}</div></td>
                    <td><div class="cell">{{tableData1.deployworkingstate}}</div></td>
                    <td @click="OpenImgBox('deployimglist')">
                      <div class="cell" v-if="tableData1.deployimglist">{{tableData1.deployimglist.length}}</div>
                    </td>
                  </tr>
                  <tr class="el-table__row">
                    <td><div class="cell">发电</div></td>
                    <td><div class="cell">{{tableData1.powerstarttime}}</div></td>
                    <td><div class="cell"></div></td>
                    <td><div class="cell"></div></td>
                    <td><div class="cell">发电</div></td>
                    <td><div class="cell">{{tableData1.powerdateinfo}}</div></td>
                    <td><div class="cell">{{tableData1.powerworkingstate}}</div></td>
                    <td @click="OpenImgBox('powerimglist')">
                      <div class="cell" v-if="tableData1.powerimglist">{{tableData1.powerimglist.length}}</div>
                    </td>
                  </tr>
                  <tr class="el-table__row">
                    <td><div class="cell">结束停电</div></td>
                    <td><div class="cell"></div></td>
                    <td><div class="cell"></div></td>
                    <td><div class="cell"></div></td>
                    <td><div class="cell">停电</div></td>
                    <td><div class="cell">{{tableData1.stopdateinf}}</div></td>
                    <td><div class="cell">{{tableData1.stopworkingstate}}</div></td>
                    <td @click="OpenImgBox('stopimglist')">
                      <div class="cell" v-if="tableData1.stopimglist">{{tableData1.stopimglist.length}}</div>
                    </td>
                  </tr>
                  <tr class="el-table__row">
                    <td><div class="cell">结束发电</div></td>
                    <td><div class="cell">{{tableData1.endgenerationtime}}</div></td>
                    <td><div class="cell"></div></td>
                    <td><div class="cell"></div></td>
                    <td><div class="cell">结束</div></td>
                    <td><div class="cell">{{tableData1.enddateinfo}}</div></td>
                    <td><div class="cell">{{tableData1.endworkingstate}}</div></td>
                    <td  @click="OpenImgBox('endimglist')">
                      <div class="cell" v-if="tableData1.endimglist">{{tableData1.endimglist.length}}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="调度日志">
        <el-table :data="tableData2" v-loading="WriteLoading">
          <!-- <el-table-column v-if="isSite=='1'" type="selection" width="40"></el-table-column> -->
          <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template></el-table-column>
          <el-table-column prop="" label="调度类型" width=""></el-table-column>
          <el-table-column prop="" label="油机编号" width=""></el-table-column>
          <el-table-column prop="" label="油机缸号" width=""></el-table-column>
          <el-table-column prop="" label="是否自动监控" width=""></el-table-column>
          <el-table-column prop="" label="油机位置偏差" width=""></el-table-column>
          <el-table-column prop="" label="位置监控时间" width=""></el-table-column>
          <el-table-column prop="" label="油机状态" width=""></el-table-column>
          <el-table-column prop="" label="状态监控时间" width=""></el-table-column>
          <el-table-column prop="" label="操作人" width=""></el-table-column>
          <el-table-column prop="" label="操作时间" width=""></el-table-column>
          <el-table-column prop="" label="操作" width="50">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="handleChoose(scope.row)">选择</el-button>
              </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="告警">
        <el-table :data="tableData3" v-loading="WriteLoading">
          <!-- <el-table-column v-if="isSite=='1'" type="selection" width="40"></el-table-column> -->
          <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template></el-table-column>
          <el-table-column prop="" label="模块编号" width=""></el-table-column>
          <el-table-column prop="" label="IP" width=""></el-table-column>
          <el-table-column prop="" label="手机卡号" width=""></el-table-column>
          <el-table-column prop="" label="IMSI" width=""></el-table-column>
          <el-table-column prop="" label="IMEI" width=""></el-table-column>
          <el-table-column prop="" label="油机编号" width=""></el-table-column>
          <el-table-column prop="" label="油机缸号" width=""></el-table-column>
          <el-table-column prop="" label="告警类型" width=""></el-table-column>
          <el-table-column prop="" label="告警时间" width=""></el-table-column>
          <el-table-column prop="" label="操作" width="50">
          <template slot-scope="scope">
              <el-button type="text" size="mini" @click="handleChoose(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      </el-tab-pane>
      <el-tab-pane label="运营商站点">
        <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--small" v-loading="WriteLoading">
        <!--表头-->
        <div class="el-table__header-wrapper">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
            <colgroup>
              <col width="120"/>
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
        <el-form :model="tableData4" ref="WriteForm" label-width="0" :show-message="false">
          <div class="el-table__body-wrapper is-scrolling-none">
            <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
              <colgroup>
                <col width="40"/>
                <col width="80"/>
                <col width="40"/>
                <col width="80"/>
              </colgroup>
              <tbody>
                <tr class="el-table__row">
                  <td><div class="cell">城市</div></td>
                  <td><div class="cell">{{tableData4.cityname}}</div></td>
                  <td><div class="cell"></div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">区域</div></td>
                  <td><div class="cell">{{tableData4.areaname}}</div></td>
                  <td><div class="cell"></div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">系统编码</div></td>
                  <td><div class="cell">{{tableData4.systemcode}}</div></td>
                  <td><div class="cell"></div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <!--系统名称-->
                <tr class="el-table__row">
                  <td><div class="cell">系统名称</div></td>
                  <td><div class="cell">{{tableData4.systemname}}</div></td>
                  <td><div class="cell"></div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">资源站点名称</div></td>
                  <td><div class="cell">{{tableData4.resourcename}}</div></td>
                  <td><div class="cell"></div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">资源站点编码</div></td>
                  <td><div class="cell">{{tableData4.resourcecode}}</div></td>
                  <td><div class="cell"></div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">开通日期</div></td>
                  <td><div class="cell">{{tableData4.openingdate}}</div></td>
                  <td><div class="cell"></div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">产权单位</div></td>
                  <td><div class="cell">{{tableData4.propertyrightunitname}}</div></td>
                  <td><div class="cell"></div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">生命周期</div></td>
                  <td><div class="cell">{{tableData4.lifecycle}}</div></td>
                  <td><div class="cell"></div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">创建人</div></td>
                  <td><div class="cell">{{tableData4.createname}}</div></td>
                  <td><div class="cell"></div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">创建时间</div></td>
                  <td><div class="cell">{{tableData4.createtime}}</div></td>
                  <td><div class="cell"></div></td>
                  <td><div class="cell"></div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-form>
      </div>
      </el-tab-pane>
    </el-tabs>
    <div class="center" style="padding-bottom: 100px">
      <el-button @click="closeWrite" type="primary" icon="el-icon-back">返回</el-button>
    </div>
    <ImgBox ref="ImgBox"></ImgBox>
  </div>
</template>

<script>
import {GlobalRes} from 'common/js/mixins'
import ImgBox from 'base/ImgBox'

export default{
  name: 'TaskList',
  mixins: [GlobalRes],
  props: {
    WriteState: {
      type: Number,
      default: 0 // 0为添加 1为编辑 2为查看
    }
  },
  data () {
    return {
      isShow: false,
      WriteLoading: false,
      // 新增表格相关属性
      tableData1: {
        setimglist: [],
        deployimglist: [],
        powerimglist: [],
        stopimglist: [],
        endimglist: []
      },
      tableData2: [],
      tableData3: [],
      tableData4: {
      },
      ViewTabIndex: '0',
      // 表单验证
      Rules: {
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
        // try {
        //   if (this.tableData1.accessdate) {
        //     if (this.tableData1.accessdate.trim() === '0001-01-01') this.tableData1.productiontime = ''
        //   }
        //   if (this.tableData1.createtime) {
        //     if (this.tableData1.createtime.trim() === '0001-01-01') this.tableData1.createtime = ''
        //   }
        // } catch (e) {
        //   console.log(e)
        // }
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
        // try {
        //   for (let i = 0; i < this.tableData3.length; i++) {
        //     if (this.tableData3[i].openingdate) {
        //       if (this.tableData3[i].openingdate.trim() === '0001-01-01') this.tableData3[i].openingdate = ''
        //     }
        //   }
        // } catch (e) {
        //   console.log(e)
        // }
      }
    },
    setWriteData4 (data4) {
      if (data4) {
        this.tableData4 = data4
      }
    },
    OpenImgBox (s) {
      switch (s) {
        case 'setimglist':
          this.$refs.ImgBox.SetData('出发图片', '出发图片', this.tableData1.setimglist)
          break
        case 'deployimglist':
          this.$refs.ImgBox.SetData('部署图片', '部署图片', this.tableData1.deployimglist)
          break
        case 'powerimglist':
          this.$refs.ImgBox.SetData('发电图片', '发电图片', this.tableData1.powerimglist)
          break
        case 'stopimglist':
          this.$refs.ImgBox.SetData('停电图片', '停电图片', this.tableData1.stopimglist)
          break
        case 'endimglist':
          this.$refs.ImgBox.SetData('结束图片', '结束图片', this.tableData1.endimglist)
          break
      }
      this.$refs.ImgBox.Open()
      this.$refs.ImgBox.Flag = true
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
    },
    // 返回关闭编辑函数
    closeWrite () {
      // this.$refs.tableForm.clearValidate() // 初始化表单校验
      this.ViewTabIndex = '0'
      Object.assign(this.$data.tableData1, this.$options.data().tableData1)
      Object.assign(this.$data.tableData2, this.$options.data().tableData2)
      Object.assign(this.$data.tableData3, this.$options.data().tableData3)
      Object.assign(this.$data.tableData4, this.$options.data().tableData4)
      this.showWrite = !this.showWrite
      this.$emit('fatherClose')
    }
  },
  components: {
    ImgBox
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
