<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-form :model="Query">
        <el-row>
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="区域：">
                <el-cascader v-model="Query.AreaList" :props="QareaProps" @change="changeArea(Query)" ref="csArea" clearable></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="创建时间：">
                <el-date-picker class="tableSelect" v-model="Query.starttime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择开始时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="至：">
                <el-date-picker class="tableSelect" v-model="Query.endtime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择结束时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="站点名称：">
                <el-input v-model="Query.resourcename" placeholder=请输入站点名称 @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="6">
            <div class="fr" style="margin-top: 0">
              <el-button @click="getMore(1)" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-search'">查询</el-button>
              <el-button @click="ResetQuery" icon="el-icon-refresh">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>

      <el-row>
        <el-col :span="4" class="SearchResult">查询结果</el-col>
        <el-col :offset="2" :span="18" class="fr">
          <div class="fr">
            <!--<el-button @click="handleWrite(0)" type="success" icon="el-icon-plus">添加</el-button>-->
            <el-button @click="handleExport" type="success" icon="el-icon-download">导出</el-button>
          </div>
        </el-col>
      </el-row>

      <el-table :data="tableData" v-loading="Loading" ref="table1" style="margin-top: 15px;">
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template>
        </el-table-column>
        <el-table-column prop="cityname" label="地市"></el-table-column>
        <el-table-column prop="areaname" label="区域"></el-table-column>
        <el-table-column prop="resourcename" label="站点名称"></el-table-column>
        <el-table-column prop="resourcecode" label="站点编码"></el-table-column>
        <el-table-column prop="hiddendangertypename" label="隐患类型"></el-table-column>
        <el-table-column prop="maintainproject" label="维护项目"></el-table-column>
        <el-table-column prop="describe" label="问题描述" width=""></el-table-column>
        <el-table-column prop="treatment" label="处理情况" width=""></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width=""></el-table-column>
        <el-table-column prop="createusername" label="创建人" width=""></el-table-column>
        <el-table-column label="操作" width="50">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleWrite(2,scope.row)">详情</el-button>
            <!--<el-button type="text" size="mini" @click="handleWrite(1, scope.row)">编辑</el-button>-->
            <!--<el-button type="text" size="mini" @click="handle2(scope.row)">删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <div class="center">
        <el-pagination @current-change="getMore" @size-change="changeSize1" :current-page="currentPage"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="total"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
    </div>

    <div class="write" v-show="showWrite">
      <layuiTitle :title="WriteState === 0 ? '添加隐患' : WriteState === 1 ? '隐患电桩' : '隐患详情'"></layuiTitle>

      <!--<Details :WriteState="WriteState" :DicList="DicList" @fatherOpenImgBox="OpenImgBox"
               @fatheretMore="getMore(currentPage)" @fatherClose="WriteClose" ref="Details"></Details>-->
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
          <el-form :model="WriteData" :rules="Rules" v-loading="Loading" ref="WriteForm" label-width="0" :show-message="false">
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
                <!--站点编码-->
                <tr class="el-table__row">
                  <td><div class="cell">站点编码</div></td>
                  <td><div class="cell">
                    <div v-show="WriteState == 2">{{WriteData.resourcecode}}</div>
                    <div v-show="WriteState !== 2">
                      <el-input v-model="WriteData.resourcecode" readonly placeholder="请选择"></el-input>
                    </div></div>
                  </td>
                  <td><div class="cell"></div></td>
                  <!-- <td><div class="cell"></div></td> -->
                  <td><div class="cell"></div></td>
                </tr>
                <!--站点名称-->
                <tr class="el-table__row">
                  <td><div class="cell">站点名称</div></td>
                  <td><div class="cell">
                    <div v-show="WriteState == 2">{{WriteData.resourcename}}</div>
                    <div v-show="WriteState !== 2" @click="isShow = true">
                      <el-input v-model="WriteData.resourcename" readonly placeholder="请选择"></el-input>
                    </div></div>
                  </td>
                  <td><div class="cell"></div></td>
                  <!-- <td><div class="cell"></div></td> -->
                  <td><div class="cell"></div></td>
                </tr>
                <!--隐患类型-->
                <tr class="el-table__row">
                  <td><div class="cell">隐患类型</div></td>
                  <td><div class="cell">
                    <div v-show="WriteState == 2">{{WriteData.hiddendangertypename}}</div>
                    <div v-show="WriteState !== 2">
                      <el-input v-model="WriteData.hiddendangertype"></el-input>
                    </div></div>
                  </td>
                  <td><div class="cell"></div></td>
                  <!-- <td><div class="cell"></div></td> -->
                  <td><div class="cell"></div></td>
                </tr>
                <!--维护项目-->
                <tr class="el-table__row">
                  <td><div class="cell">维护项目</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="maintainproject">
                      <el-input v-model="WriteData.maintainproject"></el-input>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState == 2"><div class="cell">{{WriteData.maintainproject}}</div></td>
                  <td><div class="cell"></div></td>
                  <!-- <td><div class="cell"></div></td> -->
                  <td><div class="cell"></div></td>
                </tr>
                <!--问题描述-->
                <tr class="el-table__row">
                  <td><div class="cell">问题描述</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="describe">
                      <el-input v-model="WriteData.describe"></el-input>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState == 2"><div class="cell">{{WriteData.describe}}</div></td>
                  <td><div class="cell"></div></td>
                  <!-- <td><div class="cell"></div></td> -->
                  <td><div class="cell"></div></td>
                </tr>
                <!--处理情况-->
                <tr class="el-table__row">
                  <td><div class="cell">处理情况</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="treatment">
                      <el-input v-model="WriteData.treatment"></el-input>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState == 2"><div class="cell">{{WriteData.treatment}}</div></td>
                  <td><div class="cell"></div></td>
                  <!-- <td><div class="cell"></div></td> -->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row" v-if="WriteState === 2">
                  <td><div class="cell">创建人</div></td>
                  <td><div class="cell">
                    <el-form-item class="form-item">{{WriteData.createusername}}</el-form-item>
                  </div></td>
                  <td><div class="cell"></div></td>
                  <!-- <td><div class="cell"></div></td> -->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row" v-if="WriteState === 2">
                  <td><div class="cell">创建时间</div></td>
                  <td><div class="cell">
                    <el-form-item class="form-item">{{WriteData.createtime}}</el-form-item>
                  </div></td>
                  <td><div class="cell"></div></td>
                  <!-- <td><div class="cell"></div></td> -->
                  <td><div class="cell"></div></td>
                </tr>
                </tbody>
              </table>
            </div>
          </el-form>
        </div>
        <div class="center">
          <el-button v-show="WriteState !==2" @click="" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-check'">提交</el-button>
          <el-button @click="WriteClose" icon="el-icon-arrow-left">返回</el-button>
        </div>
    </div>
  </div>
</template>

<script>
import {DictionaryInfoList} from 'api/api'
import {GetMaintainList, GetMaintainInfo} from 'api/SurveyManagement'
import {GlobalRes} from 'common/js/mixins'
import layuiTitle from 'base/layui-title'

export default {
  name: 'Maintain',
  mixins: [GlobalRes],
  data () {
    return {
      Query: {
        AreaList: [],
        provinceid: null,
        cityid: null,
        areaid: null,
        resourcename: '',
        dayfacetypes: null,
        starttime: '',
        endtime: ''
      },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      Loading: false,
      tableData: [],
      tableLoading: false,
      WriteData: {
        resourcename: '',
        resourcecode: '',
        hiddendangertypename: '',
        maintainproject: '',
        describe: '',
        treatment: '',
        createtime: '',
        create: ''
      },
      Rules: {},
      DicList: {
      },
      showWrite: false,
      WriteState: 0, // 0为添加 1为编辑 2为查看
      WriteLoading: false
    }
  },
  activated () {
    this.getData1()
    this.getDic()
  },
  methods: {
    ResetQuery () {
      Object.assign(this.$data.Query, this.$options.data().Query)
      this.getData1()
    },
    getData1 () {
      this.Loading = true
      this.$axios.get(GetMaintainList, {
        params: {
          PageIndex: 1,
          PageSize: this.pageSize
        }
      }).then(res => {
        this.Loading = false
        if (res.errorCode !== '200') return this.$message.error(res.msg)
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    getMore (page) {
      this.currentPage = page
      this.Loading = true
      this.$axios.get(GetMaintainList, {params: Object.assign({}, this.Query, {
        PageIndex: this.currentPage,
        PageSize: this.pageSize
      })}).then(res => {
        this.Loading = false
        if (res.errorCode !== '200') return this.$message.error(res.msg)
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    changeSize1 (page) {
      this.pageSize = page
      this.getMore(this.currentPage)
    },
    getDic () {
      let arr = ['设备状态']
      this.$axios.post(DictionaryInfoList, arr).then(res => {
        if (res.errorCode === '200') {
          let data = res.data
          this.DicList.state = data.filter(i => { return i.type === '设备状态' })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleWrite (state, row) {
      this.WriteState = state
      this.showWrite = true
      if (state) {
        this.Loading = true
        this.$axios.get(GetMaintainInfo, {
          params: {
            Id: row.id
          }
        }).then(res => {
          this.Loading = false
          this.WriteData = res.data
        }).catch(err => {
          this.Loading = false
          console.log(err)
        })
      }
    },
    WriteClose () {
      this.showWrite = false
      Object.assign(this.$data.WriteData, this.$options.data().WriteData)
    },
    handleExport () {
      this.$confirm(`您确定要导出吗？`, '提示', {
        type: 'info'
      }).then(() => {

      })
    }
  },
  components: { layuiTitle }
}
</script>

<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
