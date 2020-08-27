<template>
  <div class="content" v-loading="ExportLoading" element-loading-text="正在导出,请等待！" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="main" v-show="!showWrite">
      <el-form :model="Query">
        <el-row>
          <!--选择器-->
          <el-col :span="18">
            <el-row>
              <el-col :span="8">
                <el-form-item label="需求名称：">
                  <el-input v-model="Query.demandname" placeholder="请输入需求名称" @keyup.enter.native="getMore(1)"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="建站方式：">
                  <el-select class="searchSelect" v-model="Query.constructionmode">
                    <el-option v-for="i in DicList.constructionmode" :key="i.value" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="审核状态：">
                  <el-select class="searchSelect" v-model="Query.taskstate">
                    <el-option v-for="i in DicList.taskstate" :key="i.value" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="需求单号：">
                  <el-input v-model="Query.demandno" placeholder="请输入需求单号" @keyup.enter.native="getMore(1)"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开始日期：">
                  <el-date-picker class="tableSelect" v-model="Query.starttime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择开始时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="结束日期：">
                  <el-date-picker class="tableSelect" v-model="Query.endtime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择结束时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="需求批次：">
                  <el-input v-model="Query.demandbatch" placeholder="请输入需求批次" @keyup.enter.native="getMore(1)"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="站点编码：">
                  <el-input v-model="Query.resourcecode" placeholder="请输入站点编码" @keyup.enter.native="getMore(1)"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="站点名称：">
                  <el-input v-model="Query.resourcename" placeholder="请输入站点名称" @keyup.enter.native="getMore(1)"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <div class="fr" style="margin-top:0">
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
            <el-button @click="SiteExport" type="success" icon="el-icon-download">导出</el-button>
            <el-button @click="handleAdd" type="success" icon="el-icon-plus">添加</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table :data="tableList" v-loading="Loading" style="margin-top: 15px">
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template></el-table-column>
        <el-table-column prop="cityname" label="地市" width="80"></el-table-column>
        <el-table-column prop="areaname" label="区域" width="80"></el-table-column>
        <el-table-column prop="demandname" label="需求名称" width="120"></el-table-column>
        <el-table-column prop="demandno" label="需求单号" width=""></el-table-column>
        <el-table-column prop="demandbatch" label="需求批次" width=""></el-table-column>
        <el-table-column prop="resourcename" label="站点名称" width="120"></el-table-column>
        <el-table-column prop="resourcecode" label="站点编码" width=""></el-table-column>
        <el-table-column prop="constructionmodename" label="建设方式" width=""></el-table-column>
        <el-table-column prop="taskstatename" label="审核状态" width=""></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width=""></el-table-column>
        <el-table-column prop="" label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.taskstatename" type="text" size="mini" @click="handleSend(scope.$index, scope.row)">派发</el-button>
            <el-button type="text" size="mini" @click="handleWrite(scope.$index, scope.row)">详情</el-button>
            <el-button type="text" @click="handleExport(scope.$index, scope.row)" size="mini">项目资料</el-button>
            <el-button v-if="!scope.row.taskstatename" type="text" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button v-if="!scope.row.taskstatename" type="text" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      <layuiTitle :title="WriteState === 0 ? '添加项目' : WriteState === 1 ? '编辑项目' : '设备详情'"></layuiTitle>
      <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--small" v-loading="Loading">
        <!--表头-->
        <div class="el-table__header-wrapper">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
            <colgroup>
              <col name="el-table_8_column_60" width="130"/>
              <col name="el-table_8_column_61" width="400"/>
              <!--<col name="el-table_8_column_63" width="400"/>-->
              <col name="el-table_8_column_64" width=""/>
            </colgroup>
            <thead>
            <tr>
              <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
              <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
              <!--<th colspan="1" rowspan="1" class="el-table_8_column_63     table-headerStyle"><div class="cell">字典</div></th>-->
              <th colspan="1" rowspan="1" class="el-table_8_column_64     table-headerStyle"><div class="cell">填写要求</div></th>
            </tr>
            </thead>
          </table>
        </div>
        <!--表体-->
        <!--表体-->
        <el-form :model="WriteData" :rules="Rules" ref="WriteForm" label-width="0" :show-message="false">
          <div class="el-table__body-wrapper is-scrolling-none">
            <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
              <colgroup>
                <col name="el-table_8_column_60" width="130"/>
                <col name="el-table_8_column_61" width="400"/>
                <!--<col name="el-table_8_column_63" width="400"/>-->
                <col name="el-table_8_column_64" width=""/>
              </colgroup>
              <tbody>
              <!--选择区域-->
              <tr class="el-table__row" v-if="WriteState !== 2">
                <td><div class="cell"><i class="must">*</i>区域</div></td>
                <td v-if="WriteState <= 1"><div class="cell">
                  <el-form-item class="form-item" prop="AreaList">
                    <el-cascader v-model="WriteData.AreaList" :props="areaProps" @change="changeArea(WriteData)" ref="csArea"></el-cascader>
                  </el-form-item>
                </div></td>
                <td v-show="WriteState == 2"><div class="cell">{{`${WriteData.provincename} / ${WriteData.cityname} / ${WriteData.areaname}`}}</div></td>
                <!--<td><div class="cell"></div></td>-->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>需求方</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="demandside">
                    <el-select v-model="WriteData.demandside" multiple placeholder="请选择" size="small">
                      <!--<el-option label="请选择" :value="0"></el-option>-->
                      <el-option v-for="i in DicList.rawoperator" :key="i.text" :label="i.text" :value="i.text"></el-option>
                    </el-select>
                  </el-form-item>
                </div></td>
                <td v-show="WriteState == 2"><div class="cell">{{WriteData.demandside}}</div></td>
                <!--<td><div class="cell"></div></td>-->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>需求批次</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="demandbatch">
                    <el-input v-model="WriteData.demandbatch"></el-input>
                  </el-form-item>
                </div></td>
                <td v-show="WriteState == 2"><div class="cell">{{WriteData.demandbatch}}</div></td>
                <!--<td><div class="cell"></div></td>-->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>需求单号</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="demandno">
                    <el-input v-model="WriteData.demandno"></el-input>
                  </el-form-item>
                </div></td>
                <td v-show="WriteState == 2"><div class="cell">{{WriteData.demandno}}</div></td>
                <!--<td><div class="cell"></div></td>-->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>需求名称</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="demandname">
                    <el-input v-model="WriteData.demandname"></el-input>
                  </el-form-item>
                </div></td>
                <td v-show="WriteState == 2"><div class="cell">{{WriteData.demandname}}</div></td>
                <!--<td><div class="cell"></div></td>-->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>建站方式</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-select v-model="WriteData.constructionmode" size="small" @change="handleChange">
                    <el-option v-for="i in DicList.constructionmode" :key="i.value" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </div></td>
                <td v-if="WriteState == 2"><div class="cell">{{WriteData.constructionmode}}</div></td>
                <!--<td><div class="cell">{{writeDic(DicList.constructionmode)}}</div></td>-->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell"><i class="must" v-show="isStockStation">*</i>站点名称</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="resourcename">
                    <el-input v-model="WriteData.resourcename"></el-input>
                  </el-form-item>
                </div></td>
                <td v-show="WriteState == 2"><div class="cell">{{WriteData.resourcename}}</div></td>
                <!--<td><div class="cell"></div></td>-->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell"><i class="must" v-show="isStockStation">*</i>站点编码</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="resourcecode">
                    <el-input v-model="WriteData.resourcecode"></el-input>
                  </el-form-item>
                </div></td>
                <td v-show="WriteState == 2"><div class="cell">{{WriteData.resourcecode}}</div></td>
                <!--<td><div class="cell"></div></td>-->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell"><i class="must" v-show="isStockStation">*</i>原运营商</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="rawoperator">
                    <el-select v-model="WriteData.rawoperator" multiple placeholder="请选择" size="small">
                      <!--<el-option label="请选择" :value="0"></el-option>-->
                      <el-option v-for="i in DicList.rawoperator" :key="i.text" :label="i.text" :value="i.text"></el-option>
                    </el-select>
                  </el-form-item>
                </div></td>
                <td v-if="WriteState == 2"><div class="cell">{{WriteData.rawoperatorname}}</div></td>
                <!--<td><div class="cell">{{writeDic(DicList.rawoperator)}}</div></td>-->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>需求经度</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="planninglongitude">
                    <el-input v-model="WriteData.planninglongitude"></el-input>
                  </el-form-item>
                </div></td>
                <td v-show="WriteState == 2"><div class="cell">{{WriteData.planninglongitude}}</div></td>
                <!--<td><div class="cell"></div></td>-->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>需求纬度</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="planninglatitude">
                    <el-input v-model="WriteData.planninglatitude"></el-input>
                  </el-form-item>
                </div></td>
                <td v-show="WriteState == 2"><div class="cell">{{WriteData.planninglatitude}}</div></td>
                <!--<td><div class="cell"></div></td>-->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">覆盖范围</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="coverage">
                    <el-input v-model="WriteData.coverage"></el-input>
                  </el-form-item>
                </div></td>
                <td v-show="WriteState == 2"><div class="cell">{{WriteData.coverage}}</div></td>
                <!--<td><div class="cell"></div></td>-->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">新增建设区域</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="createconstructionarea">
                    <el-input v-model="WriteData.createconstructionarea"></el-input>
                  </el-form-item>
                </div></td>
                <td v-show="WriteState == 2"><div class="cell">{{WriteData.createconstructionarea}}</div></td>
                <!--<td><div class="cell"></div></td>-->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">数据热点区域</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="hotdataarea">
                    <el-input v-model="WriteData.hotdataarea"></el-input>
                  </el-form-item>
                </div></td>
                <td v-show="WriteState == 2"><div class="cell">{{WriteData.hotdataarea}}</div></td>
                <!--<td><div class="cell"></div></td>-->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">覆盖目标</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="coveringtarget">
                    <el-input v-model="WriteData.coveringtarget"></el-input>
                  </el-form-item>
                </div></td>
                <td v-show="WriteState == 2"><div class="cell">{{WriteData.coveringtarget}}</div></td>
                <!--<td><div class="cell"></div></td>-->
                <td><div class="cell"></div></td>
              </tr>
              <tr v-if="WriteData.stockstationresults" class="el-table__row">
                <td><div class="cell">{{WriteData.constructionmode === 1 ? '最近站点验证结果' : '存量筛查结果'}}</div></td>
                <td><div class="cell">{{WriteData.stockstationresults}}</div></td>
                <!--<td><div class="cell"></div></td>-->
                <td><div class="cell"></div></td>
              </tr>
              </tbody>
            </table>
          </div>
        </el-form>
      </div>
      <div class="center" style="padding-bottom: 10px">
        <el-button v-show="WriteState !==2" @click="selectResource" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-search'">{{WriteData.constructionmode === 1 ? '最近站点验证' : '存量筛查'}}</el-button>
        <el-button v-show="WriteState !==2" @click="SubWrite" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-check'">提交</el-button>
        <el-button @click="WriteClose" type="primary" icon="el-icon-arrow-left">返回</el-button>
      </div>
    </div>

    <el-dialog top="1%" :visible.sync="DialogVisible" :title="showUser ? '选择用户' : '存量站筛查'" width="60%" :before-close="DialogClose" append-to-body>
      <div v-if="showSite">
        <div style="height: 30px;font-size: 16px;text-align: center">
          <span style="float: left;">站点编码:{{WriteData.resourcecode}}</span>
          建站方式:{{WriteData.constructionmode === 1 ? '新建站' : '存量站'}}
          <span style="float: right;">筛查结果:{{WriteData.stockstationresults}}</span>
        </div>
        <el-table :data="ResourceList" v-loading="DialogLoading">
          <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template></el-table-column>
          <el-table-column prop="resourcename" label="站点名称" width=""></el-table-column>
          <el-table-column prop="resourcecode" label="站点编码" width=""></el-table-column>
          <el-table-column prop="" label="起租情况" width=""></el-table-column>
          <el-table-column prop="M" label="需求距离（m）" width=""></el-table-column>
        </el-table>
      </div>
      <SelectUser v-if="showUser" @selectUser="selectUser"></SelectUser>
    </el-dialog>
  </div>
</template>

<script>
import {GlobalRes} from 'common/js/mixins'
import layuiTitle from 'base/layui-title'
import {mapMutations} from 'vuex'
import {DictionaryInfoList, AreaList} from 'api/api'
import SelectUser from 'base/TaskEquipment/SelectUser'
import {exportMethod} from 'api/YDSZ'
import {GetKCProjectExcel, AddProject, GetProjectList, GetProjectInfo, UpdateProject, DelProject, GetResourceList, GetDistributeProject, GetProjectExcel} from 'api/SurveyManagement'
export default {
  name: 'EquipmentManagement',
  mixins: [GlobalRes],
  data () {
    var _this = this
    return {
      areaProps: {
        lazy: true,
        label: 'name',
        value: 'id',
        lazyLoad (node, resolve) {
          if (!node.level) {
            _this.$axios.post(AreaList, {parentid: null}).then((res) => {
              if (res.error) {
                _this.$message.error(res.errorMessage)
              } else {
                resolve(_this._normalizeAreaLevel(res.data))
              }
            })
          } else {
            if (!node.hasChildren) return resolve([])
            _this.$axios.post(AreaList, {parentid: node.data.id}).then((res) => {
              if (res.error) {
                _this.$message.error(res.errorMessage)
              } else {
                resolve(_this._normalizeAreaLevel(res.data))
              }
            })
          }
        }
      },
      Query: {
        demandname: '',
        resourcename: '',
        constructionmode: null,
        taskstate: null,
        demandno: '',
        starttime: '',
        endtime: '',
        demandbatch: '',
        resourcecode: ''
      },
      WriteData: {
        AreaList: [],
        provinceid: 0,
        cityid: 0,
        areaid: 0,
        constructionmode: '',
        demandside: '',
        demandno: '',
        demandbatch: '',
        resourcename: '',
        resourcecode: '',
        demandname: '',
        rawoperator: '',
        planninglongitude: null,
        planninglatitude: null,
        constructionscene: '',
        coverage: '',
        createconstructionarea: '',
        hotdataarea: '',
        coveringtarget: '',
        stockstationresults: '',
        recentlyresource_id: '',
        id: ''
      },
      Rules: {
        AreaList: [{ required: true, message: '请选择区域', trigger: 'blur' }],
        demandside: [
          { required: true, message: '请输入需求方', trigger: 'blur' }
        ],
        demandno: [
          { required: true, message: '请输入需求单号', trigger: 'blur' }
        ],
        demandbatch: [
          { required: true, message: '请输入需求批次', trigger: 'blur' }
        ],
        demandname: [
          { required: true, message: '请输入需求名称', trigger: 'blur' }
        ],
        resourcename: [
          { required: false, message: '请输入站点名称', trigger: 'blur' }
        ],
        constructionmode: [
          { required: true, message: '请选择建站方式', trigger: 'change' }
        ],
        resourcecode: [
          { required: false, message: '请输入站点编码', trigger: 'blur' }
        ],
        rawoperator: [
          { required: false, message: '请选择原运营商', trigger: 'change' }
        ],
        planninglongitude: [
          { required: true, pattern: /^-?(180(\.0{0,6})?|(1[0-7][0-9]|[1-9]?[0-9])(\.[0-9]{0,6}))$/, message: '请输入正确的经度,保留小数6位', trigger: 'blur' }
        ],
        planninglatitude: [
          { required: true, pattern: /^-?(90(\.0{0,6})?|[1-8]?[0-9](\.[0-9]{0,6})?)$/, message: '请输入正确的纬度.保留小数6位', trigger: 'blur' }
        ]
      },
      DicList: {},
      showWrite: false,
      WriteState: null,
      tableList: [],
      ResourceList: [],
      DialogLoading: false,
      total: 0,
      pageSize: 10,
      currentPage: 1,
      PageIndex: 1,
      Loading: false,
      DialogVisible: false,
      showSite: false,
      showUser: false,
      userId: '',
      projectId: '',
      isStockStation: false,
      ExportLoading: false
    }
  },
  activated () {
    this.getData1()
    this.initDictionariesArray()
  },
  methods: {
    changeArea (obj) {
      // console.log(obj)
      obj.provinceid = obj.AreaList[0]
      obj.cityid = obj.AreaList[1]
      obj.areaid = obj.AreaList[2]
    },
    setArea (list, key = 'csArea') {
      this.nodes = list
      this.$refs[key].panel.activePath = []
      this.$refs[key].panel.loadCount = 0
      this.$refs[key].panel.lazyLoad()
    },
    ResetQuery () {
      Object.assign(this.$data.Query, this.$options.data().Query)
      this.getData1()
    },
    initDictionariesArray () {
      let arr = ['勘察建站方式', '建站模式', '勘察审核状态', '勘察运营商']
      this.$axios.post(DictionaryInfoList, arr).then(res => {
        if (res.errorCode === '200') {
          this.DicList.models = res.data.filter(i => {
            return i.type === '建站模式'
          })
          this.DicList.taskstate = res.data.filter(i => {
            return i.type === '勘察审核状态'
          })
          this.DicList.constructionmode = res.data.filter(i => {
            return i.type === '勘察建站方式'
          })
          this.DicList.rawoperator = res.data.filter(i => {
            return i.type === '勘察运营商'
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getMore (e) {
      this.Loading = true
      this.currentPage = e
      this.$axios.get(GetProjectList, {params: Object.assign({}, this.Query, {
        PageIndex: e,
        PageSize: this.pageSize
      })}).then(res => {
        this.Loading = false
        if (res.errorCode === '200') {
          this.tableList = res.data.list
          this.total = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getData1 () {
      this.currentPage = 1
      this.Loading = true
      this.$axios.get(GetProjectList, {
        params: {
          PageIndex: 1,
          PageSize: this.pageSize
        }
      }).then(res => {
        this.Loading = false
        if (res.errorCode === '200') {
          this.tableList = res.data.list
          this.total = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    changeSize1 (page) {
      this.pageSize = page
      this.getMore(this.currentPage)
    },
    handleAdd () {
      this.WriteState = 0
      this.showWrite = true
    },
    selectResource () {
      if (!this.WriteData.constructionmode) { return this.$message.error('请先选择建设方式！') }
      // if (!this.WriteData.resourcecode) { return this.$message.error('请先填写站点编码！') }
      if (!this.WriteData.planninglongitude) { return this.$message.error('请先填写需求经度！') }
      if (!this.WriteData.planninglatitude) { return this.$message.error('请先填写需求纬度！') }
      this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali) {
          if (msg.planninglongitude) return this.$message.warning(msg.planninglongitude[0].message)
          if (msg.planninglatitude) return this.$message.warning(msg.planninglatitude[0].message)
          return this.$message.error('请补全信息！')
        } else {
          this.DialogVisible = true
          this.showSite = true
          this.DialogLoading = true
          this.$axios.get(GetResourceList, {
            params: {
              lng: this.WriteData.planninglongitude,
              lat: this.WriteData.planninglatitude,
              resourcename: this.WriteData.resourcename,
              constructionmode: this.WriteData.constructionmode
            }
          }).then(res => {
            this.DialogLoading = false
            this.ResourceList = res.data
            let arr = this.ResourceList.filter(i => {
              return i.resourcecode === this.WriteData.resourcecode
            })
            if (arr.length) {
              this.WriteData.constructionmode === 1 ? this.WriteData.stockstationresults = '新建站重名' : this.WriteData.stockstationresults = '存量站'
            } else {
              this.WriteData.constructionmode === 1 ? this.WriteData.stockstationresults = '最近存量站' : this.WriteData.stockstationresults = '存量站不存在'
            }
            this.WriteData.recentlyresource_id = res.data[0].id
          })
        }
      })
    },
    DialogClose () {
      this.DialogVisible = false
      this.showSite = false
      this.showUser = false
    },
    SubWrite () {
      if (!this.WriteData.stockstationresults) {
        if (this.WriteData.constructionmode === 1) {
          return this.$message.error('未进行最近站点验证！')
        } else if (this.WriteData.constructionmode === 2) {
          return this.$message.error('未进行存量筛查！')
        }
      }
      if (this.WriteState === 0) this.SubAdd()
      if (this.WriteState === 1) this.SubEdit()
    },
    SubAdd () {
      this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali) {
          return this.$message.error('请补全信息！')
        } else {
          this.Loading = true
          if (this.WriteData.rawoperator.length) {
            this.WriteData.rawoperator = this.WriteData.rawoperator.join(',')
          } else {
            this.WriteData.rawoperator = this.WriteData.rawoperator.toString()
          }
          this.WriteData.demandside = this.WriteData.demandside.join(',')
          this.WriteData.planninglongitude = this.WriteData.planninglongitude ? this.WriteData.planninglongitude : 0
          this.WriteData.planninglatitude = this.WriteData.planninglatitude ? this.WriteData.planninglatitude : 0
          this.$axios.post(AddProject, this.WriteData).then(res => {
            this.Loading = false
            if (res.errorCode === '200') {
              this.$message.success('添加成功!')
              this.WriteClose()
              this.getData1()
            } else {
              this.WriteData.rawoperator = this.WriteData.rawoperator ? this.WriteData.rawoperator.split(',') : this.WriteData.rawoperator.split('')
              this.WriteData.demandside = this.WriteData.demandside.split(',')
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    SubEdit () {
      this.$refs.WriteForm.validate(vali => {
        if (!vali) {
          this.$message.error('请补全信息！')
        } else {
          this.Loading = true
          if (this.WriteData.rawoperator.length) {
            this.WriteData.rawoperator = this.WriteData.rawoperator.join(',')
          } else {
            this.WriteData.rawoperator = this.WriteData.rawoperator.toString()
          }
          this.WriteData.demandside = this.WriteData.demandside.join(',')
          this.WriteData.planninglongitude = this.WriteData.planninglongitude ? this.WriteData.planninglongitude : 0
          this.WriteData.planninglatitude = this.WriteData.planninglatitude ? this.WriteData.planninglatitude : 0
          this.$axios.put(UpdateProject, this.WriteData).then(res => {
            this.Loading = false
            if (res.errorCode === '200') {
              this.$message.success('编辑成功!')
              this.WriteClose()
              this.getData1()
            } else {
              this.WriteData.rawoperator = this.WriteData.rawoperator ? this.WriteData.rawoperator.split(',') : this.WriteData.rawoperator.split('')
              this.WriteData.demandside = this.WriteData.demandside.split(',')
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    selectUser (id) {
      this.$confirm('您确认要派发给当前用户吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios.get(GetDistributeProject, {
          params: {
            id: this.projectId,
            userid: id
          }
        }).then((res) => {
          if (res.errorCode !== '200') {
            this.$message.error(res.msg)
          } else {
            this.$message.success('派发成功！')
            this.DialogVisible = false
            this.showSite = false
            this.showUser = false
            this.currentPage = 1
            this.getData1()
          }
        })
      })
    },
    handleSend (index, row) {
      this.projectId = row.id
      this.DialogVisible = true
      this.showUser = true
    },
    handleEdit (index, row) {
      this.WriteState = 1
      this.showWrite = true
      this.Loading = true
      this.$axios.get(GetProjectInfo, {
        params: {
          id: row.id
        }
      }).then(res => {
        this.Loading = false
        this.WriteData = res.data
        this.WriteData.AreaList = [ res.data.provinceid, res.data.cityid, res.data.areaid ]
        this.setArea(this.WriteData.AreaList, 'csArea')
        this.isStockStation = false
        this.WriteData.planninglongitude = this.WriteData.planninglongitude ? this.WriteData.planninglongitude : null
        this.WriteData.planninglatitude = this.WriteData.planninglatitude ? this.WriteData.planninglatitude : null
        // this.WriteData.rawoperator = this.WriteData.rawoperator.split(',')
        this.WriteData.rawoperator = this.WriteData.rawoperator ? this.WriteData.rawoperator.split(',') : this.WriteData.rawoperator.split('')
        this.WriteData.demandside = this.WriteData.demandside.split(',')
      })
    },
    // 导出数据
    SiteExport () {
      this.$confirm(`您确定要导出吗？`, '提示', {
        type: 'info'
      }).then(() => {
        let myObj = {
          method: 'get',
          url: GetProjectExcel,
          fileName: '勘察项目',
          data: this.Query
        }
        exportMethod(myObj)
      })
    },
    handleDelete (index, row) {
      this.$confirm('您确认要删除当前项目吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios.delete(DelProject, {
          params: {
            id: row.id
          }
        }).then((res) => {
          if (res.errorCode !== '200') {
            this.$message.error(res.msg)
          } else {
            this.$message.success('删除成功！')
            this.currentPage = 1
            this.getData1()
          }
        })
      })
    },
    handleWrite (index, row) {
      let data = {
        id: row.id,
        taskstate: row.taskstatename,
        from: 'ProjectManagement'
      }
      this.setSurveyInfo(data)
      if (row.constructionmodename === '存量站') {
        this.$router.push({name: 'StockStation'})
        this.$emit('handleChange', 'StockStation', '2d6a2407-c247-404f-b093-a91f524a56fa')
      } else if (row.constructionmodename === '新建站') {
        this.$router.push({name: 'NewBuildStation'})
        this.$emit('handleChange', 'NewBuildStation', '2d6a2407-c247-404f-b093-a91f524a56fa')
      }
    },
    WriteClose () {
      this.setArea([])
      Object.assign(this.$data.WriteData, this.$options.data().WriteData)
      this.$refs.WriteForm.clearValidate()
      this.showWrite = false
      this.isStockStation = false
    },
    handleChange (val) {
      if (val === 1 || val === 0) {
        this.Rules.resourcecode[0].required = false
        this.Rules.rawoperator[0].required = false
        this.Rules.resourcename[0].required = false
        this.isStockStation = false
        // this.WriteData.rawoperator = ''
      } else {
        this.isStockStation = true
        this.Rules.resourcecode[0].required = true
        this.Rules.rawoperator[0].required = true
        this.Rules.resourcename[0].required = true
        // this.WriteData.rawoperator = []
      }
      this.WriteData.stockstationresults = ''
      this.WriteData.recentlyresource_id = ''
    },
    handleExport (index, row) {
      console.log(row)
      this.$confirm(`您确定要导出项目资料吗？`, '提示', {
        type: 'info'
      }).then(() => {
        this.ExportLoading = true
        this.$axios({
          method: 'get',
          url: GetKCProjectExcel,
          params: {constructionmode: row.constructionmode, id: row.id},
          responseType: 'blob'
        }).then((res) => {
          this.ExportLoading = false
          const link = document.createElement('a')
          let blob = new Blob([res], { type: 'application/vnd.ms-excel' })
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)
          link.download = row.constructionmodename + row.demandname + '项目资料' + '.xlsx' // 下载的文件名  注意：加.xls是兼容火狐浏览器
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }).catch(error => {
          console.log(error)
        })
      })
    },
    ...mapMutations({
      setSurveyInfo: 'SET_PROJECTSURVEY_INFO'
    })
  },
  watch: {
    'WriteData.resourcecode': function (newv, oldv) {
      if (!oldv) return
      if (newv !== oldv) {
        this.WriteData.stockstationresults = ''
        this.WriteData.recentlyresource_id = ''
      }
    },
    'WriteData.planninglongitude': function (newv, oldv) {
      if (!oldv) return
      if (newv !== oldv) {
        this.WriteData.stockstationresults = ''
        this.WriteData.recentlyresource_id = ''
      }
    },
    'WriteData.planninglatitude': function (newv, oldv) {
      if (!oldv) return
      if (newv !== oldv) {
        this.WriteData.stockstationresults = ''
        this.WriteData.recentlyresource_id = ''
      }
    }
  },
  components: {
    layuiTitle,
    SelectUser
  }
}
</script>

<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
