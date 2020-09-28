<template>
  <div class="write">
    <el-row style="margin: 15px 0px;">
      <el-col :span="4" class="SearchResult">停电预警详情</el-col>
      <el-col :offset="2" :span="18" class="fr">
        <div class="fr">
        </div>
      </el-col>
    </el-row>
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
      <el-form :model="tableData1" v-loading="WriteLoading">
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
              <td><div class="cell">{{tableData1.towns}}</div></td>
              <td><div class="cell">乡镇</div></td>
              <td><div class="cell">{{tableData1.area}}</div></td>
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
              <td><div class="cell"></div></td>
              <td><div class="cell">姓名电话</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td colspan="4" style="background-color: rgb(230, 189, 189)"><div class="cell" >工单事件</div></td>
              <td colspan="4" style="background-color:rgb(156, 186, 95)"><div class="cell">油机事件</div></td>
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
    <div class="center">
      <el-button @click="WriteClose" icon="el-icon-arrow-left">返回</el-button>
    </div>
    <ImgBox ref="ImgBox"></ImgBox>
  </div>
</template>

<script>
import {GlobalRes} from 'common/js/mixins'
import ImgBox from 'base/ImgBox'
export default {
  name: 'PowerWarningListDetails',
  mixins: [GlobalRes],
  data () {
    return {
      tableData1: {
        area: null,
        setimglist: [],
        deployimglist: [],
        powerimglist: [],
        stopimglist: [],
        endimglist: []
      },
      WriteLoading: false
    }
  },
  methods: {
    setWriteData1 (data1) {
      if (data1) {
        this.tableData1 = data1
      }
    },
    WriteClose () {
      //  this.$refs.tableForm.clearValidate() // 初始化表单校验
      Object.assign(this.$data.tableData1, this.$options.data().tableData1)
      this.$emit('fatherCloses')
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
    }
  },
  components: {
    ImgBox
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
  .borderColor{
    border-top-color: #F64245;
  }
</style>
