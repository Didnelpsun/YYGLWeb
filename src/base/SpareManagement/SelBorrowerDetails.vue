<template>
 <!-- <div class="content">
    <el-table :data="tableList" v-loading="Table1Loading">
      <el-table-column prop="cityname" label="地市"></el-table-column>
      <el-table-column prop="areaname" label="区域"></el-table-column>
      <el-table-column prop="sparepartstypeid" label="备件类型"></el-table-column>
      <el-table-column prop="code" label="备件编码"></el-table-column>
      <el-table-column prop="manufacturerid" label="备件厂家"></el-table-column>
      <el-table-column prop="sparemodelid" label="备件型号"></el-table-column>
      <el-table-column prop="depotsid" label="存放点"></el-table-column>
      <el-table-column prop="units" label="权属"></el-table-column>
      <el-table-column prop="borrowerid" label="借用人"></el-table-column>
      <el-table-column prop="borrowtime" label="借用时间"></el-table-column>
      <el-table-column prop="alsocode" label="还件编码"></el-table-column>
      <el-table-column prop="createtime" label="还件存放点"></el-table-column>
      <el-table-column prop="alsounits" label="还件权属"></el-table-column>
      <el-table-column prop="alsopersontime" label="还件时间"></el-table-column>
      <el-table-column prop="alsopersonid" label="还件人"></el-table-column>
    </el-table>
  </div>-->
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
        <el-form :model="WriteData" v-loading="loading" label-width="0" :show-message="false">
          <div class="el-table__body-wrapper is-scrolling-none">
            <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
              <colgroup>
                <col width="80"/>
                <col width="100"/>
                <!--  <col width="50"/>-->
                <col width="100"/>
              </colgroup>
              <tbody>
              <tr class="el-table__row">
                <td><div class="cell">地市</div></td>
                <td><div class="cell">{{WriteData.cityname}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">区域</div></td>
                <td><div class="cell">{{WriteData.areaname}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">备件类型</div></td>
                <td><div class="cell">{{WriteData.alsotypename}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">备件编码</div></td>
                <td><div class="cell">{{WriteData.code}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">备件厂家</div></td>
                <td><div class="cell">{{WriteData.manufacturername}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">备件型号</div></td>
                <td><div class="cell">{{WriteData.sparemodel}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">存放点</div></td>
                <td><div class="cell">{{WriteData.depotsname}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">权属</div></td>
                <td><div class="cell">{{WriteData.units}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">借用人</div></td>
                <td><div class="cell">{{WriteData.borrowername}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">借用时间</div></td>
                <td><div class="cell">{{WriteData.borrowtime}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">还件编码</div></td>
                <td><div class="cell">{{WriteData.alsocode}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">还件存放点</div></td>
                <td><div class="cell">{{WriteData.alsodepotsname}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row" >
                <td><div class="cell">还件权属</div></td>
                <td><div class="cell">{{WriteData.alsounits}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row" >
                <td><div class="cell">还件时间</div></td>
                <td><div class="cell">{{WriteData.alsopersontime}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">还件人</div></td>
                <td><div class="cell">{{WriteData.alsopersonname}}</div></td>
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
import {Getdetails} from 'api/BJGL'
export default {
  name: 'SelBorrowerDetails',
  props: {
    id: null
  },
  data () {
    return {
      /*   tableList: [],
      Table1Loading: false */
      WriteData: {},
      Loading: false
    }
  },
  created () {
    this._getTableData1()
  },
  methods: {
    _getTableData1 () {
      this.loading = true
      /* this.Table1Loading = true */
      this.$axios.get(Getdetails, {
        params: {
          id: this.id
        }}).then(res => {
        /* this.Table1Loading = false */
        if (res.errorCode !== '200') return this.$message.error(res.msg)
        this.WriteData = res.data
        this.loading = false
        /* this.tableList = res.data.list
         this.pagination.total = res.data.total */
      })
    },
    WriteClose () {
      this.$emit('SelBorrowerDetails')
    }
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
