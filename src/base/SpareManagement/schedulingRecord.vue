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
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">地市</div></td>
              <td><div class="cell">{{WriteData.cityname}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">区域</div></td>
              <td><div class="cell">{{WriteData.areaname}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">调度类型</div></td>
              <td><div class="cell">{{WriteData.schedulingtype}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">备件类型</div></td>
              <td><div class="cell">{{WriteData.typeencoding}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">备件编码</div></td>
              <td><div class="cell">{{WriteData.code}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">备件厂家</div></td>
              <td><div class="cell">{{WriteData.manufacturername}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">备件型号</div></td>
              <td><div class="cell">{{WriteData.sparemodel}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">出库存放点</div></td>
              <td><div class="cell">{{WriteData.outdepotname}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">入库存放点</div></td>
              <td><div class="cell">{{WriteData.indepotname}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">出库状态</div></td>
              <td><div class="cell">{{WriteData.outstate | state}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">入库状态</div></td>
              <td><div class="cell">{{WriteData.instate | state}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">出库权属</div></td>
              <td><div class="cell">{{WriteData.outunits}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">入库权属</div></td>
              <td><div class="cell">{{WriteData.inunits}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">申请人</div></td>
              <td><div class="cell">{{WriteData.applicanname}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">申请时间</div></td>
              <td><div class="cell">{{WriteData.applicanttime}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">审核人</div></td>
              <td><div class="cell">{{WriteData.outaudname}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">审核时间</div></td>
              <td><div class="cell">{{WriteData.outaudittime}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">审核状态</div></td>
              <td><div class="cell">{{WriteData.outauditstatus===4? '通过' :'不通过'}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            </tbody>
          </table>
        </div>
      </el-form>
    </div>
    <div class="center">
      <el-button @click="WriteClose" icon="el-icon-arrow-left">返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'schedulingRecord',
  props: {
    WriteState: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      isShow: false,
      Loading: false,
      WriteData: {
        id: null,
        cityname: '',
        realityname: '',
        createtime: null
      },
      Rules: {}
    }
  },

  methods: {
    ResetWrite () {
      Object.assign(this.$data.WriteData, this.$options.data().WriteData)
      this.$refs.WriteForm.resetFields()
    },
    setWriteData (data) {
      this.WriteData = data
      switch (parseInt(this.WriteData.schedulingtype)) {
        case 1:this.WriteData.schedulingtype = '新增'
          break
        case 2:this.WriteData.schedulingtype = '报修'
          break
        case 3:this.WriteData.schedulingtype = '送修'
          break
        case 4:this.WriteData.schedulingtype = '报废'
          break
        case 5:this.WriteData.schedulingtype = '借用'
          break
        case 6:this.WriteData.schedulingtype = '替换'
          break
        case 7:this.WriteData.schedulingtype = '归还'
          break
        case 8:this.WriteData.schedulingtype = '点验'
          break
        case 9:this.WriteData.schedulingtype = '上站'
          break
        case 10:this.WriteData.schedulingtype = '领用'
          break
        case 11:this.WriteData.schedulingtype = '返修'
          break
      }
    },
    WriteClose () {
      this.ResetWrite()
      this.$emit('fatherClose')
    }
  },
  components: {

  },
  filters: {
    state (val) {
      val = parseInt(val)
      return val === 1 ? '在网' : val === 2 ? '备件' : val === 3 ? '故障' : val === 4 ? '维修' : '报废'
    }
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
