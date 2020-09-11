<template>
  <div class="content">
    <div class="main" v-show="showType === 0">
      <el-form :model="Query">
        <el-row>
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="区域：">
                <el-cascader v-model="Query.AreaList" :props="QareaProps" clearable @change="changeArea(Query)"></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="站点名称：">
                <el-input v-model="Query.name" placeholder="请输入站点名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="站点编码：">
                <el-input v-model="Query.code" placeholder="请输入站点编码"></el-input>
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
              <el-form-item label="任务状态：">
                <el-select class="searchSelect" v-model="Query.states">
                  <el-option v-for="i in DicList.states" :key="i.value" :label="i.text" :value="i.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="6">
            <div class="fr" style="margin-top: 0">
              <el-button @click="getMore(1)" :disabled="table1Loading" :icon="table1Loading ? 'el-icon-loading' : 'el-icon-search'">查询</el-button>
              <el-button @click="ResetQuery" icon="el-icon-refresh">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>

      <el-row>
        <el-col :span="4" class="SearchResult">查询结果</el-col>
        <el-col :offset="2" :span="18" class="fr">
          <div class="fr">
            <el-button @click="handleAdd" type="success" icon="el-icon-plus">添加</el-button>
            <el-button @click="handleExport" type="success" icon="el-icon-download">导出</el-button>
          </div>
        </el-col>
      </el-row>

      <el-table :data="tableList" v-loading="table1Loading" style="margin-top: 15px;" ref="table1">
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">{{scope.$index+(currentPage[0] - 1) * pageSize[0] + 1}}</template>
        </el-table-column>
        <el-table-column prop="cityname" label="地市" width="100"></el-table-column>
        <el-table-column prop="areaname" label="区域" width="100"></el-table-column>
        <el-table-column prop="resourcename" label="站点名称"></el-table-column>
        <el-table-column prop="resourcecode" label="站点编码"></el-table-column>
        <el-table-column prop="statename" label="任务状态" width=""></el-table-column>
        <el-table-column prop="taskbatch" label="任务批次"></el-table-column>
        <el-table-column prop="completetime" label="完成时间"></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width=""></el-table-column>
        <el-table-column prop="createusername" label="创建人" width=""></el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
            <el-button v-if="scope.row.statename === '待执行'" type="text" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <!--<el-button v-if="scope.row.statename === '待执行'" type="text" size="mini" @click="handleExamine(scope.$index, scope.row, 1)">提交审核</el-button>-->
            <el-button v-if="scope.row.statename === '待审核'" type="text" size="mini" @click="handleByExamine(scope.$index, scope.row)">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="center">
        <el-pagination @current-change="getMore" @size-change="changeSize1" :current-page="currentPage[0]"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pageSize[0]" :total="total[0]"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
    </div>
    <!--添加-->
    <div v-show="showType === 3">
      <layuiTitle title="新增任务"></layuiTitle>
      <el-form :model="addData" :rules="AddRules" ref="AddForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="任务批次：" prop="taskbatch">
              <el-input v-model="addData.taskbatch" placeholder="请填写任务批次"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="完成时间：" prop="completetime">
              <el-date-picker v-model="addData.completetime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="margin-left: 25px;">
            <!--<div class="fr" style="margin-top: 0">-->
              <el-button @click="handleSiteChoose" type="success" :disabled="table1Loading" :icon="table1Loading ? 'el-icon-loading' : 'el-icon-plus'">添加站点</el-button>
              <el-button @click="handleAddDevice" type="success" :disabled="table1Loading" :icon="table1Loading ? 'el-icon-loading' : 'el-icon-plus'">添加设备</el-button>
            <!--</div>-->
          </el-col>
        </el-row>
        <!--<div class="center" style="margin-bottom: 20px">
          &lt;!&ndash;<el-button @click="handleDelDevice" type="danger" :disabled="table1Loading" :icon="table1Loading ? 'el-icon-loading' : 'el-icon-delete'">删除</el-button>&ndash;&gt;
        </div>-->
      </el-form>
      <el-table :data="deviceList" v-loading="table1Loading" ref="table1" :row-key="getRowKeys" :expand-row-keys="expandKey" @expand-change="changeKey">
        <el-table-column type="expand">
          <el-table :data="boardData">
            <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(1 - 1) * 10 + 1}}</template></el-table-column>
            <el-table-column prop="cityname" label="城市" width=""></el-table-column>
            <el-table-column prop="areaname" label="区域" width=""></el-table-column>
            <el-table-column prop="equipmenttypename" label="设备类型名称" width=""></el-table-column>
            <el-table-column prop="statename" label="设备状态" width=""></el-table-column>
            <el-table-column label="操作" width="50">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="DeleteDevice(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-table-column>
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">{{scope.$index+(1 - 1) * 10 + 1}}</template>
        </el-table-column>
        <el-table-column prop="cityname" label="城市" width=""></el-table-column>
        <el-table-column prop="areaname" label="区域" width=""></el-table-column>
        <el-table-column prop="name" label="站点名称" width=""></el-table-column>
        <el-table-column prop="code" label="站点编码" width="120"></el-table-column>
        <el-table-column prop="classifyname" label="站点分类" width=""></el-table-column>
        <el-table-column label="操作" width="50">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="DeleteSite(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="center" style="padding-bottom: 100px">
        <el-button @click="handleAddTask" type="primary" :disabled="table1Loading" :icon="table1Loading ? 'el-icon-loading' : 'el-icon-check'">提交</el-button>
        <el-button @click="closeShowAdd" type="primary" :disabled="table1Loading" :icon="table1Loading ? 'el-icon-loading' : 'el-icon-arrow-left'">返回</el-button>
      </div>
    </div>
    <!--详情-->
    <div v-show="showType === 1 || showType === 2 || showType === 4">
      <layuiTitle title="任务设备列表"></layuiTitle>
      <el-tabs class="content-card" v-model="ViewTabIndex" @tab-click="handleTabs">
        <el-row v-if="ViewTabIndex !== '1'" style="margin-bottom: 15px;">
          <el-col :span="4" class="SearchResult">查询结果</el-col>
          <el-col :offset="2" :span="18" class="fr">
            <div class="fr">
              <el-button v-if="showType === 2" @click="AddTaskDevice" type="success" icon="el-icon-plus">添加</el-button>
            </div>
          </el-col>
        </el-row>
        <el-tab-pane label="设备信息">
          <el-table :data="deviceInfo" v-loading="table1Loading" ref="">
            <el-table-column label="序号" width="50">
              <template slot-scope="scope">{{scope.$index+(currentPage[1] - 1) * pageSize[1] + 1}}</template>
            </el-table-column>
            <el-table-column prop="equipmenttypename" label="设备类型"></el-table-column>
            <el-table-column prop="accessdate" label="入网日期"></el-table-column>
            <el-table-column prop="createtime" label="创建日期"></el-table-column>
            <el-table-column prop="createusername" label="创建人"></el-table-column>
            <el-table-column prop="censusstatename" label="普查状态"></el-table-column>
            <el-table-column prop="auditusername" label="审核人"></el-table-column>
            <el-table-column prop="audittime" label="审核时间" :formatter="formatDate"></el-table-column>
            <el-table-column label="操作" width="200" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="showDeviceDetail(scope.$index, scope.row, 2)">详情</el-button>
                <el-button v-if="showType !== 1 && scope.row.censusstatename === '待执行'" type="text" size="mini" @click="showDeviceDetail(scope.$index, scope.row, 1)">修改</el-button>
                <el-button v-if="showType !== 1 && scope.row.censusstatename === '待执行'" type="text" size="mini" @click="handleExamine(scope.$index, scope.row, 1, 1)">提交审核</el-button>
                <el-button v-if="showType == 4 && scope.row.censusstatename === '待审核'" type="text" size="mini" @click="handleExamine(scope.$index, scope.row, 2, 1)">审核</el-button>
                <el-button v-if="showType === 2" type="text" size="mini" @click="DeviceDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="站点信息">
          <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--mini">
            <!--表头-->
            <div class="el-table__header-wrapper">
              <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
                <colgroup>
                  <col name="el-table_8_column_60" width="80"/>
                  <col name="el-table_8_column_61" width="230"/>
                  <col name="el-table_8_column_62" width="50"/>
                  <!--<col name="el-table_8_column_63" width="400"/>-->
                  <col name="el-table_8_column_64" width="100"/>
                </colgroup>
                <thead>
                <tr>
                  <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
                  <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
                  <th colspan="1" rowspan="1" class="el-table_8_column_62     table-headerStyle"><div class="cell">照片</div></th>
                  <!--<th colspan="1" rowspan="1" class="el-table_8_column_63     table-headerStyle"><div class="cell">字典</div></th>-->
                  <th colspan="1" rowspan="1" class="el-table_8_column_64     table-headerStyle"><div class="cell">规范要求</div></th>
                </tr>
                </thead>
              </table>
            </div>
            <!--表体-->
            <el-form :model="siteInfo" :rules="siteRules" v-loading="table1Loading" ref="siteInfoForm" :show-message="false" label-width="0">
              <div class="el-table__body-wrapper is-scrolling-none">
                <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
                  <colgroup>
                    <col name="el-table_8_column_60" width="80"/>
                    <col name="el-table_8_column_61" width="230"/>
                    <col name="el-table_8_column_62" width="50"/>
                    <!--<col name="el-table_8_column_63" width="400"/>-->
                    <col name="el-table_8_column_64" width="100"/>
                  </colgroup>
                  <tbody>
                  <!--省市区-->
                  <tr class="el-table__row">
                    <td><div class="cell">地市</div></td>
                    <td><div class="cell">{{siteInfo.cityname}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <tr class="el-table__row">
                    <td><div class="cell">区域</div></td>
                    <td><div class="cell">{{siteInfo.areaname}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--站点编码-->
                  <tr class="el-table__row">
                    <td><div class="cell"><i class="must">*</i>站点编码</div></td>
                    <td v-show="showType == 2 && siteInfo.censusstatename == '待执行'"><div class="cell">
                      <el-form-item class="form-item" prop="code">
                        <el-input v-model="siteInfo.code"></el-input>
                      </el-form-item>
                    </div></td>
                    <td v-if="showType == 1 || siteInfo.censusstatename == '待审核'"><div class="cell">{{siteInfo.code}}</div></td>
                    <td><div class="cell" @click="OpenImgBox('站点编码', 'code', ImgList1)">{{ImgList1.length}}</div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--站点名称-->
                  <tr class="el-table__row">
                    <td><div class="cell"><i class="must">*</i>站点名称</div></td>
                    <td v-show="showType == 2 && siteInfo.censusstatename == '待执行'"><div class="cell">
                      <el-form-item class="form-item" prop="name">
                        <el-input v-model="siteInfo.name"></el-input>
                      </el-form-item>
                    </div></td>
                    <td v-if="showType == 1 || siteInfo.censusstatename == '待审核'"><div class="cell">{{siteInfo.name}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--站点分类-->
                  <tr class="el-table__row">
                    <td><div class="cell">站点分类</div></td>
                    <td><div class="cell">{{siteInfo.classifyname}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell">{{writeDic(DicList.classify)}}</div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--入网日期-->
                  <tr class="el-table__row">
                    <td><div class="cell">入网日期</div></td>
                    <td><div class="cell">{{siteInfo.accessdate}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--经度-->
                  <tr class="el-table__row" v-if="siteInfo.classify == 1">
                    <td><div class="cell">经度</div></td>
                    <!--<td><div class="cell">{{siteInfo.longitude}}</div></td>-->
                    <td @click="OpenMap(0)">
                      <div class="cell location"><span>{{siteInfo.longitude}}</span><i class="el-icon-location icon_location"></i></div>
                    </td>
                    <td><div class="cell" @click="OpenImgBox('经度', 'longitude', ImgList2)">{{ImgList2.length}}</div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--纬度-->
                  <tr class="el-table__row" v-if="siteInfo.classify == 1">
                    <td><div class="cell">纬度</div></td>
                    <td @click="OpenMap(0)"><div class="cell">{{siteInfo.latitude}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--生命周期-->
                  <tr class="el-table__row">
                    <td><div class="cell">生命周期</div></td>
                    <td v-show="showType == 2 && siteInfo.censusstatename == '待执行'"><div class="cell">
                      <el-form-item class="form-item">
                        <el-input v-model="siteInfo.lifecycle"></el-input>
                      </el-form-item>
                    </div></td>
                    <td v-if="showType == 1 || siteInfo.censusstatename == '待审核'"><div class="cell">{{siteInfo.lifecycle}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--产权性质-->
                  <tr class="el-table__row">
                    <td><div class="cell">产权性质</div></td>
                    <td v-show="showType == 2 && siteInfo.censusstatename == '待执行'"><div class="cell">
                      <el-form-item class="form-item">
                        <el-input v-model="siteInfo.propertyrights"></el-input>
                      </el-form-item>
                    </div></td>
                    <td v-if="showType == 1 || siteInfo.censusstatename == '待审核'"><div class="cell">{{siteInfo.propertyrights}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--原产权单位-->
                  <tr class="el-table__row">
                    <td><div class="cell">原产权单位</div></td>
                    <td v-show="showType == 2 && siteInfo.censusstatename == '待执行'"><div class="cell">
                      <el-select v-model="siteInfo.rawpropertyrightunit" size="small">
                        <el-option label="请选择" :value="null"></el-option>
                        <el-option v-for="i in DicList.rawpropertyrightunit" :key="i.value" :label="i.text" :value="i.value"></el-option>
                      </el-select>
                    </div></td>
                    <td v-if="showType == 1 || siteInfo.censusstatename == '待审核'"><div class="cell">{{siteInfo.rawpropertyrightunitname}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--机房类型-->
                  <tr class="el-table__row">
                    <td><div class="cell">机房类型</div></td>
                    <td v-show="showType == 2 && siteInfo.censusstatename == '待执行'"><div class="cell">
                      <el-select v-model="siteInfo.roomtype" size="small">
                        <el-option label="请选择" :value="null"></el-option>
                        <el-option v-for="i in DicList.roomtype" :key="i.value" :label="i.text" :value="i.value"></el-option>
                      </el-select>
                    </div></td>
                    <td v-if="showType == 1 || siteInfo.censusstatename == '待审核'"><div class="cell">{{siteInfo.roomtypesname}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--建站模式-->
                  <tr class="el-table__row">
                    <td><div class="cell"><i class="must">*</i>建站模式</div></td>
                    <td v-show="showType == 2 && siteInfo.censusstatename == '待执行'"><div class="cell">
                      <el-form-item class="form-item" prop="websitebuildingmode">
                        <el-select v-model="siteInfo.websitebuildingmode" size="small">
                          <el-option label="请选择" :value="null"></el-option>
                          <el-option v-for="i in DicList.websitebuildingmode" :key="i.value" :label="i.text" :value="i.value"></el-option>
                        </el-select>
                      </el-form-item>
                    </div></td>
                    <td v-if="showType == 1 || siteInfo.censusstatename == '待审核'"><div class="cell">{{siteInfo.websitebuildingmodename}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--机房位置-->
                  <tr class="el-table__row">
                    <td><div class="cell">机房位置</div></td>
                    <td v-show="showType == 2 && siteInfo.censusstatename == '待执行'"><div class="cell">
                      <el-form-item class="form-item">
                        <el-input v-model="siteInfo.computerroomposition"></el-input>
                      </el-form-item>
                    </div></td>
                    <td v-if="showType == 1 || siteInfo.censusstatename == '待审核'"><div class="cell">{{siteInfo.computerroomposition}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--是否拉远站-->
                  <tr class="el-table__row">
                    <td><div class="cell"><i class="must">*</i>是否拉远站</div></td>
                    <td v-show="showType == 2 && siteInfo.censusstatename == '待执行'"><div class="cell">
                      <el-form-item class="form-item" prop="outstanding">
                        <el-select v-model="siteInfo.outstanding" size="small">
                          <el-option label="是" :value="true"></el-option>
                          <el-option label="否" :value="false"></el-option>
                        </el-select>
                      </el-form-item>
                    </div></td>
                    <td v-if="showType == 1 || siteInfo.censusstatename == '待审核'"><div class="cell">{{siteInfo.outstanding ? '是' : '否'}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--站址地形-->
                  <tr class="el-table__row">
                    <td><div class="cell">站址地形</div></td>
                    <td v-show="showType == 2 && siteInfo.censusstatename == '待执行'"><div class="cell">
                      <el-form-item class="form-item">
                        <el-input v-model="siteInfo.siteterrain"></el-input>
                      </el-form-item>
                    </div></td>
                    <td v-if="showType == 1 || siteInfo.censusstatename == '待审核'"><div class="cell">{{siteInfo.siteterrain}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--覆盖场景-->
                  <tr class="el-table__row">
                    <td><div class="cell">覆盖场景</div></td>
                    <td v-show="showType == 2 && siteInfo.censusstatename == '待执行'"><div class="cell">
                      <el-form-item class="form-item">
                        <el-input v-model="siteInfo.coversthescenario"></el-input>
                      </el-form-item>
                    </div></td>
                    <td v-if="showType == 1 || siteInfo.censusstatename == '待审核'"><div class="cell">{{siteInfo.coversthescenario}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--合同签订主体-->
                  <tr class="el-table__row">
                    <td><div class="cell">合同签订主体</div></td>
                    <td v-show="showType == 2 && siteInfo.censusstatename == '待执行'"><div class="cell">
                      <el-form-item class="form-item">
                        <el-input v-model="siteInfo.contractsigning"></el-input>
                      </el-form-item>
                    </div></td>
                    <td v-if="showType == 1 || siteInfo.censusstatename == '待审核'"><div class="cell">{{siteInfo.contractsigning}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--移交批次-->
                  <tr class="el-table__row">
                    <td><div class="cell">移交批次</div></td>
                    <td v-show="showType == 2 && siteInfo.censusstatename == '待执行'"><div class="cell">
                      <el-form-item class="form-item">
                        <el-input v-model="siteInfo.handoverbatch"></el-input>
                      </el-form-item>
                    </div></td>
                    <td v-if="showType == 1 || siteInfo.censusstatename == '待审核'"><div class="cell">{{siteInfo.handoverbatch}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--是否共享-->
                  <tr class="el-table__row">
                    <td><div class="cell"><i class="must">*</i>是否共享</div></td>
                    <td v-show="showType == 2 && siteInfo.censusstatename == '待执行'"><div class="cell">
                      <el-form-item class="form-item" prop="shared">
                        <el-select v-model="siteInfo.shared" size="small">
                          <el-option label="是" :value="true"></el-option>
                          <el-option label="否" :value="false"></el-option>
                        </el-select>
                      </el-form-item>
                    </div></td>
                    <td v-if="showType == 1 || siteInfo.censusstatename == '待审核'"><div class="cell">{{siteInfo.shared ? '是' : '否'}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--共享单位-->
                  <tr class="el-table__row" v-if="siteInfo.shared">
                    <td><div class="cell">共享单位</div></td>
                    <td v-show="showType == 2 && siteInfo.censusstatename == '待执行'"><div class="cell">
                      <el-form-item class="form-item">
                        <el-input v-model="siteInfo.sharedunit"></el-input>
                      </el-form-item>
                    </div></td>
                    <td v-if="showType == 1 || siteInfo.censusstatename == '待审核'"><div class="cell">{{siteInfo.sharedunit}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--资产识别码-->
                  <tr class="el-table__row">
                    <td><div class="cell">资产识别码</div></td>
                    <td v-show="showType == 2 && siteInfo.censusstatename == '待执行'"><div class="cell">
                      <el-form-item class="form-item">
                        <el-input v-model="siteInfo.identificationcode"></el-input>
                      </el-form-item>
                    </div></td>
                    <td v-if="showType == 1 || siteInfo.censusstatename == '待审核'"><div class="cell">{{siteInfo.identificationcode}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--详细地址-->
                  <tr class="el-table__row" v-if="siteInfo.classify == 1">
                    <td><div class="cell">详细地址</div></td>
                    <td v-show="showType == 2 && siteInfo.censusstatename == '待执行'"><div class="cell">
                      <el-form-item class="form-item">
                        <el-input v-model="siteInfo.address"></el-input>
                      </el-form-item>
                    </div></td>
                    <td v-if="showType == 1 || siteInfo.censusstatename == '待审核'"><div class="cell">{{siteInfo.address}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </el-form>
          </div>
          <div class="center" style="padding-bottom: 100px">
            <el-button v-if="showType == 4 && siteInfo.censusstatename === '待审核'" type="primary" icon="el-icon-check" @click="handleExamine(0, 0, 2, 2)">审核</el-button>
            <el-button v-if="showType == 2 && siteInfo.censusstatename == '待执行'" @click="handleEditSite(1)" type="primary" icon="el-icon-check">提交审核</el-button>
            <el-button v-if="showType == 2 && siteInfo.censusstatename == '待执行'" @click="handleEditSite(0)" type="primary" icon="el-icon-check">保存</el-button>
            <el-button @click="closeShowEdit" type="primary" icon="el-icon-arrow-left">返回</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="隐患">
          <el-table :data="HiddenDangerList" v-loading="table1Loading" ref="">
            <el-table-column label="序号" width="50">
              <template slot-scope="scope">{{scope.$index+(currentPage[3] - 1) * pageSize[3] + 1}}</template>
            </el-table-column>
            <el-table-column prop="hiddendangertype" label="隐患类型"></el-table-column>
            <el-table-column prop="hiddendangerlevel" label="隐患级别"></el-table-column>
            <el-table-column prop="hiddendangerdescribe" label="隐患描述"></el-table-column>
            <el-table-column prop="handlingsuggestions" label="处理建议"></el-table-column>
            <el-table-column prop="createtime" label="创建日期"></el-table-column>
            <el-table-column prop="createusername" label="创建人"></el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button v-if="showType === 2" type="text" size="mini" @click="EditHiddenDanger(scope.$index, scope.row, 1)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="代维">
          <el-table :data="MaintainList" v-loading="table1Loading" ref="">
            <el-table-column label="序号" width="50">
              <template slot-scope="scope">{{scope.$index+(currentPage[4] - 1) * pageSize[4] + 1}}</template>
            </el-table-column>
            <el-table-column prop="hiddendangertypename" label="隐患类型"></el-table-column>
            <el-table-column prop="maintainproject" label="维护项目"></el-table-column>
            <el-table-column prop="describe" label="问题描述"></el-table-column>
            <el-table-column prop="treatment" label="处理情况"></el-table-column>
            <el-table-column prop="createtime" label="创建时间"></el-table-column>
            <el-table-column prop="createusername" label="创建人"></el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button v-if="showType === 2" type="text" size="mini" @click="EditMaintain(scope.$index, scope.row, 1)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <div class="center" v-if="ViewTabIndex === '0'">
        <el-pagination @current-change="currentChange2" @size-change="SizeChange2" :current-page="currentPage[1]"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pageSize[1]" :total="total[1]"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
      <!--<div class="center" v-if="ViewTabIndex === '2'">
        <el-pagination @current-change="currentChange3" @size-change="SizeChange3" :current-page="currentPage[2]"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pageSize[2]" :total="total[2]"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>-->
      <div class="center" v-if="ViewTabIndex === '2'">
        <el-pagination @current-change="currentChange4" @size-change="SizeChange4" :current-page="currentPage[3]"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pageSize[3]" :total="total[3]"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
      <div class="center" v-if="ViewTabIndex === '3'">
        <el-pagination @current-change="currentChange5" @size-change="SizeChange5" :current-page="currentPage[4]"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pageSize[4]" :total="total[4]"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
      <div class="center"  v-show="ViewTabIndex !== '1'">
        <el-button @click="closeShowEdit" type="primary" icon="el-icon-arrow-left">返回</el-button>
      </div>
      <el-dialog center append-to-body :visible.sync="showTaskDialog" width="60%" title="请选择设备类型" :close-on-click-modal="false" :before-close="TaskhandleClose">
        <el-form :data="DeviceType">
          <el-row>
            <el-col>
              <el-form-item label="设备类型：">
                <el-select class="searchSelect" v-model="SelectDeviceType">
                  <el-option label="请选择" value=""></el-option>
                  <el-option v-for="(i, index) in DeviceType" :key="index" :label="i" :value="i"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-button type="success" @click="handleSelectDeviceType" icon="el-icon-check">确定</el-button>
            <el-button type="primary" @click="TaskhandleClose" icon="el-icon-arrow-left">返回</el-button>
          </el-row>
        </el-form>
      </el-dialog>
    </div>

    <el-dialog title="审核"  :visible.sync="auitShow" v-loading="table1Loading" center width="30%" @close="auitClose">
      <el-form :data="auitData">
        <el-row style="margin-bottom:15px" v-if="ViewTabIndex === '0' || ViewTabIndex === '2'">
          <el-col :span="6">设备类型</el-col>
          <el-col :span="16">{{auitData.equipmenttypename}}</el-col>
        </el-row>
        <el-row style="margin-bottom:15px">
          <el-col :span="6">站点名称</el-col>
          <el-col :span="16">{{auitData.resourcename}}</el-col>
        </el-row>
        <el-row style="margin-bottom:15px">
          <el-input type="textarea" :autosize="{ minRows: 2}" placeholder="请输入审核意见" v-model="auitData.auditremark"></el-input>
        </el-row>
        <el-row type="flex" justify="end">
          <el-button type="success" @click="subAuit(3)">审核通过</el-button>
          <el-button type="danger" @click="subAuit(4)">审核不通过</el-button>
          <el-button type="warning" @click="subAuit(5)">审核退回</el-button>
        </el-row>
      </el-form>
    </el-dialog>

    <el-dialog top="1%" append-to-body :visible.sync="showDialog" width="80%" :title="dialogTitle" :close-on-click-modal="false" :before-close="AddhandleClose">
      <ResourceList v-if="siteChoose" :isSite="1" :resourcetype="2" :resource_id="currentSiteId" @chooseDevice="chooseSite"/>
      <deviceList v-if="deviceChoose" :resourcetype="2" :equipment_id="currentEquipmentId" @chooseDevice="chooseDevice"></deviceList>
      <OperatorEquipment ref="OperatorEquipment" :isTask="1" v-if="showOperatorEquipment" :DeviceID="DeviceID" :WriteState="WriteState"  @fatherOpenImgBox="OpenImgBox" @fatherClose="WriteClose"></OperatorEquipment>
      <TheTower ref="TheTower" v-if="showTheTower" :isTask="1" :DeviceID="DeviceID" :WriteState="WriteState"  @fatherOpenImgBox="OpenImgBox" @fatherClose="WriteClose"></TheTower>
      <ComputerRoom ref="ComputerRoom" v-if="showComputerRoom" :isTask="1" :DeviceID="DeviceID" :WriteState="WriteState"  @fatherOpenImgBox="OpenImgBox" @fatherClose="WriteClose"></ComputerRoom>
      <AcDistriButionBox ref="AcDistriButionBox" v-if="showAcDistriButionBox" :isTask="1" :DeviceID="DeviceID" :WriteState="WriteState"  @fatherOpenImgBox="OpenImgBox" @fatherClose="WriteClose"></AcDistriButionBox>
      <ComputerRoomAirConditioning ref="ComputerRoomAirConditioning" v-if="showComputerRoomAirConditioning" :isTask="1" :DeviceID="DeviceID" :WriteState="WriteState"  @fatherOpenImgBox="OpenImgBox" @fatherClose="WriteClose"></ComputerRoomAirConditioning>
      <SwitchingPowerSupply ref="SwitchingPowerSupply" v-if="showSwitchingPowerSupply" :isTask="1" :DeviceID="DeviceID" :WriteState="WriteState"  @fatherOpenImgBox="OpenImgBox" @fatherClose="WriteClose"></SwitchingPowerSupply>
      <StorageBattery ref="StorageBattery" v-if="showStorageBattery" :isTask="1" :DeviceID="DeviceID" :WriteState="WriteState"  @fatherOpenImgBox="OpenImgBox" @fatherClose="WriteClose"></StorageBattery>
      <PowerAndEnvironment ref="PowerAndEnvironment" v-if="showPowerAndEnvironment" :isTask="1" :DeviceID="DeviceID" :WriteState="WriteState"  @fatherOpenImgBox="OpenImgBox" @fatherClose="WriteClose"></PowerAndEnvironment>
      <CommunicationAndLocation ref="CommunicationAndLocation" v-if="showCommunicationAndLocation" :isTask="1" :DeviceID="DeviceID" :WriteState="WriteState"  @fatherOpenImgBox="OpenImgBox" @fatherClose="WriteClose"></CommunicationAndLocation>
      <RectifierModule ref="RectifierModule" v-if="showRectifierModule" :isTask="1" :DeviceID="DeviceID" :WriteState="WriteState"  @fatherOpenImgBox="OpenImgBox" @fatherClose="WriteClose"></RectifierModule>
      <HiddenDanger ref="HiddenDanger" v-if="showHiddenDanger" :DeviceID="DeviceID" :WriteState="WriteState"  @fatherOpenImgBox="OpenImgBox" @fatherClose="WriteClose"></HiddenDanger>
      <Maintain ref="Maintain" v-if="showMaintain" :DeviceID="DeviceID" :WriteState="WriteState"  @fatherOpenImgBox="OpenImgBox" @fatherClose="WriteClose"></Maintain>
    </el-dialog>
    <ImgBox ref="ImgBox"></ImgBox>
    <GoogleMap v-if="showMap" ref="GoogleMap" @fatherGetData="getMapData"></GoogleMap>
  </div>
</template>

<script>
import {GlobalRes} from 'common/js/mixins'
import {DictionaryInfoList} from 'api/api'
import ResourceList from 'base/Resource/ResourceList'
import deviceList from 'base/Resource/deviceList'
import GoogleMap from 'base/GoogleMap'
import OperatorEquipment from 'base/ZYResource/OperatorEquipment'
import TheTower from 'base/ZYResource/TheTower'
import ComputerRoom from 'base/ZYResource/ComputerRoom'
import AcDistriButionBox from 'base/ZYResource/AcDistriButionBox'
import ComputerRoomAirConditioning from 'base/ZYResource/ComputerRoomAirConditioning'
import SwitchingPowerSupply from 'base/ZYResource/SwitchingPowerSupply'
import StorageBattery from 'base/ZYResource/StorageBattery'
import PowerAndEnvironment from 'base/ZYResource/PowerAndEnvironment'
import RectifierModule from 'base/ZYResource/RectifierModule'
import CommunicationAndLocation from 'base/ZYResource/CommunicationAndLocation'
import HiddenDanger from 'base/TaskEquipment/HiddenDanger'
import Maintain from 'base/TaskEquipment/Maintain'
import {GetResourcesTaskList, AddTask, GetTaskEquipmentList, GetTaskResourceList, GetMaintainList,
  UpdateTaskResource, DelTaskEquipment, GetsubmitEquipmentaudit, GetResourecEquipmentList, GetHiddenDangerList,
  TaskAudit, TaskEquipment, GetEquipmentInfoList, GetTaskState, GetTaskResourceEquipment} from 'api/SurveyManagement'
import {isValidLongitude, isValidLatitude} from 'common/js/validata'
import {formatDate} from 'common/js/cache'
import ImgBox from 'base/ImgBox'
import layuiTitle from 'base/layui-title'
export default {
  mixins: [GlobalRes],
  name: 'TaskManagement',
  data () {
    return {
      showMap: false,
      showType: 0, //  0:列表 1:查看 2:编辑 3:新增 4:审核
      expandKey: [],
      getRowKeys: (row) => {
        return row.resource_id
      },
      boardData: [],
      Query: {
        AreaList: [],
        provinceid: null, // 省份
        cityid: null, // 城市
        areaid: null, // 区域
        states: null,
        name: '',
        code: '',
        classify: null,
        starttime: '',
        endtime: ''
      },
      total: [0, 0, 0, 0, 0],
      currentPage: [1, 1, 1, 1, 1],
      pageSize: [10, 10, 10, 10, 10],
      addData: {
        taskbatch: '',
        completetime: '',
        resourcetype: 2,
        createtasks: []
      },
      tableList: [], // 任务列表
      deviceList: [], // 任务设备列表
      deviceInfo: [], // 任务信息
      MaintainList: [], // 上站维护列表
      HiddenDangerList: [], // 隐患列表
      siteInfo: {}, // 任务站点信息
      selectList: [], // 选择任务设备
      currentEquipmentId: [],
      currentSiteId: [],
      currentTaskId: '', // 当前任务id
      editSiteId: '', // 编辑时的站点ID
      editResourcecode: '', // 编辑时的站点编码
      editResourcename: '', // 编辑是的站点名称
      DeviceTypeList: [],
      result: '', // 任务状态
      siteRules: {
        code: [
          { required: true, message: '请填写站点编码', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请填写站点名称', trigger: 'blur' }
        ],
        outstanding: [
          { required: true, message: '请选择是否拉远站', trigger: 'change' }
        ],
        websitebuildingmode: [
          { required: true, message: '请选择建站模式', trigger: 'change' }
        ],
        shared: [
          { required: true, message: '请选择是否共享', trigger: 'change' }
        ],
        longitude: [
          {required: true, message: '请填写经度', trigger: 'blur'},
          {pattern: isValidLongitude, message: '请输入正确的经度', trigger: 'blur'}
        ],
        latitude: [
          {required: true, message: '请填写纬度', trigger: 'blur'},
          {pattern: isValidLatitude, message: '请输入正确的纬度', trigger: 'blur'}
        ]
      },
      AddRules: {
        resourcename: [
          { required: true, message: '请选择站点', trigger: 'change' }
        ],
        taskbatch: [
          { required: true, message: '请填写任务批次', trigger: 'blur' }
        ],
        completetime: [
          { required: true, message: '请选择完成时间', trigger: 'change' }
        ]
      },
      table1Loading: false,
      siteChoose: false,
      showDialog: false,
      deviceChoose: false,
      showOperatorEquipment: false, // 网络设备
      showTheTower: false, // 铁塔
      showComputerRoom: false, // 机房
      showAcDistriButionBox: false, // 交流配电箱
      showComputerRoomAirConditioning: false, // 机房空调
      showSwitchingPowerSupply: false, // 开关电源
      showStorageBattery: false, // 蓄电池
      showPowerAndEnvironment: false, // 动力及环境监测单元
      showCommunicationAndLocation: false, // 通讯与位置终端
      showRectifierModule: false, // 整流模块
      showHiddenDanger: false, // 隐患详情
      showMaintain: false,
      showTaskDialog: false, // 选择任务设备类型弹框
      ViewTabIndex: 0,
      DicList: {},
      WriteState: null,
      DeviceID: '',
      dialogTitle: '',
      auitShow: false,
      auitData: {
        taskid: '',
        taskequipment_id: '',
        taskresource_id: '',
        auditremark: '',
        equipmenttypename: '',
        resourcename: ''
      },
      ImgList1: [],
      ImgList2: [],
      DeviceType: [],
      SelectDeviceType: ''
    }
  },
  activated () {
    this.getData1()
    this.initDictionariesArray()
  },
  methods: {
    initDictionariesArray () {
      let arr = ['任务状态', '设备产权单位', '建站模式', '站点机房类型', '站点分类']
      this.$axios.post(DictionaryInfoList, arr).then(res => {
        if (res.errorCode === '200') {
          this.DicList.classify = res.data.filter(i => {
            return i.type === '站点分类'
          })
          this.DicList.websitebuildingmode = res.data.filter(i => {
            return i.type === '建站模式'
          })
          this.DicList.states = res.data.filter(i => {
            return i.type === '任务状态'
          })
          this.DicList.propertyrightunit = res.data.filter(i => {
            return i.type === '设备产权单位'
          })
          this.DicList.rawpropertyrightunit = res.data.filter(i => {
            return i.type === '设备产权单位'
          })
          this.DicList.roomtype = res.data.filter(i => {
            return i.type === '站点机房类型'
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    ResetQuery () {
      Object.assign(this.$data.Query, this.$options.data().Query)
      this.getData1()
    },
    getMore (e) {
      this.table1Loading = true
      this.$set(this.currentPage, 0, e)
      this.$axios.get(GetResourcesTaskList, {params: Object.assign({}, this.Query, {
        PageIndex: e,
        PageSize: this.pageSize[0]
      })}).then(res => {
        this.table1Loading = false
        if (res.errorCode === '200') {
          this.tableList = res.data.list
          this.$set(this.total, 0, res.data.total)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getData1 () {
      this.$set(this.currentPage, 0, 1)
      this.table1Loading = true
      this.$axios.get(GetResourcesTaskList, {
        params: {
          PageIndex: 1,
          PageSize: this.pageSize[0]
        }
      }).then(res => {
        this.table1Loading = false
        if (res.errorCode === '200') {
          this.tableList = res.data.list
          this.$set(this.total, 0, res.data.total)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    changeSize1 (page) {
      this.$set(this.pageSize, 0, page)
      this.getMore(1)
    },
    formatDate (row) {
      return formatDate(row.audittime)
    },
    handleAdd () {
      this.showType = 3
    },
    handleDetail (index, row) {
      this.showType = 1
      this.WriteState = 2
      this.editSiteId = row.resource_id
      this.getDeviceDetail(row.id)
    },
    handleEdit (index, row) {
      this.showType = 2
      this.WriteState = 1
      this.editSiteId = row.resource_id
      this.editResourcecode = row.resourcecode
      this.editResourcename = row.resourcename
      this.getDeviceDetail(row.id)
    },
    getDeviceDetail (id) {
      this.table1Loading = true
      // this.$set(this.currentPage, 1, 1)
      this.currentTaskId = id
      this.$axios.get(GetTaskEquipmentList, {
        params: {
          taskid: id,
          PageIndex: this.currentPage[1],
          PageSize: this.pageSize[1]
        }
      }).then(res => {
        this.table1Loading = false
        if (res.errorCode === '200') {
          this.deviceInfo = res.data.list
          this.$set(this.total, 1, res.data.total)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    GetHiddenDangerList () {
      this.table1Loading = true
      this.$set(this.currentPage, 3, 1)
      this.$axios.get(GetHiddenDangerList, {
        params: {
          resource_id: this.editSiteId,
          PageIndex: 1,
          resourcetype: 2,
          PageSize: this.pageSize[2]
        }
      }).then(res => {
        this.table1Loading = false
        if (res.errorCode === '200') {
          this.HiddenDangerList = res.data.list
          this.$set(this.total, 3, res.data.total)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    GetMaintainList () {
      this.table1Loading = true
      this.$set(this.currentPage, 4, 1)
      this.$axios.get(GetMaintainList, {
        params: {
          resource_id: this.editSiteId,
          PageIndex: 1,
          resourcetype: 2,
          PageSize: this.pageSize[4]
        }
      }).then(res => {
        this.table1Loading = false
        if (res.errorCode === '200') {
          this.MaintainList = res.data.list
          this.$set(this.total, 4, res.data.total)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleAddDevice () {
      this.$refs.AddForm.validate((vali, msg) => {
        if (!vali) {
          return this.$message.error('请补全信息！')
        } else {
          this.showDialog = true
          this.deviceChoose = true
          this.dialogTitle = ''
        }
      })
    },
    chooseSite (list) {
      this.deviceList.push(...list)
      this.deviceList.forEach((val, index) => {
        val.resource_id = val.id
        // val.equipment_id = []
        val.equipment_id = val.equipment_id ? val.equipment_id : []
      })
      this.showDialog = !this.showDialog
    },
    chooseDevice (list) {
      this.showDialog = !this.showDialog
      const arr = list.map((item) => {
        return item.id
      })
      this.table1Loading = true
      this.$axios.post(TaskEquipment, arr).then((res) => {
        this.table1Loading = false
        if (res.errorCode !== '200') {
          this.$message.error(res.msg)
        } else {
          if (!this.deviceList.length) {
            this.deviceList.push(...res.data)
          } else {
            const newList = this.concat(this.deviceList, res.data, {
              equipment_id: (v1, v2) => v1 ? [...v1, ...v2] : [],
              name: (v1, v2) => v1 || (v2 || ''),
              code: (v1, v2) => v1 || (v2 || ''),
              classifyname: (v1, v2) => v1 || (v2 || ''),
              cityname: (v1, v2) => v1 || (v2 || ''),
              areaname: (v1, v2) => v1 || (v2 || '')
            })
            this.deviceList = newList
          }
        }
      })
    },
    concat (arr1, arr2, merger = {}) {
      const uniq = arr => [...new Set(arr)]
      const keys = [...arr1, ...arr2].map(it => it.resource_id)

      return uniq(keys).reduce((pre, key) => {
        const a1 = arr1.filter(it => it.resource_id === key)
        const a2 = arr2.filter(it => it.resource_id === key)

        const item = Object.keys(merger)
          .reduce((pre, key) => ({
            ...pre,
            // 用外部传入的合并函数合并两个入参数组的累加值
            [key]: merger[key](
              // 第一个合并函数用于合并reduce传入的上次循环返回值与当次循环的值
              // 第二个合并函数用于获取reduce的默认值
              a1.reduce((p, i) => merger[key](p, i[key]), merger[key]()),
              a2.reduce((p, i) => merger[key](p, i[key]), merger[key]())
            )
          }), {})

        return [...pre, {
          resource_id: key,
          ...item
        }]
      }, [])
    },
    changeKey (row, rowList) {
      if (rowList.length) {
        this.expandKey = []
        if (row) {
          this.$axios.post(GetEquipmentInfoList, row.equipment_id, {
            params: {
              rsource_id: row.resource_id
            }
          }).then(res => {
            if (res.error !== true) {
              try {
                Object.assign(this.$data.boardData, this.$options.data().boardData)
                this.boardData = res.data
                // console.log(this.boardData)
                this.expandKey.push(row.resource_id)
                res.data.forEach((i) => {
                  this.deviceList.forEach((k) => {
                    if (i.resource_id === k.resource_id) {
                      if (k.equipment_id.indexOf(i.id) === -1) {
                        k.equipment_id.push(i.id)
                      }
                    }
                  })
                })
              } catch (e) {
                console.log(e)
              }
            } else { this.$message.error('查询详情失败') }
          }).catch(error => {
            console.log(error)
          })
        }
      } else {
        this.expandKey = []
        this.boardData = []
      }
    },
    handleDelDevice () {
      if (!this.selectList.length) return this.$message.warning('请勾选列表')
      this.$confirm(this.addData.TaskObject === '1' ? '您确认要批量删除选中的站点吗' : '您确认要批量删除选中的设备吗？', '警告', {
        type: 'warning'
      }).then(() => {
        let arr = []
        this.deviceList.forEach((i, index) => {
          if (this.selectList.indexOf(i) === -1) {
            arr.push(i)
          }
        })
        this.deviceList = arr
      })
    },
    handleExamine (index, row, type, state) { // type 1: 提交审核 2: 审核  state: 1:任务设备 2: 任务站点
      if (type === 1) {
        this.$confirm('您确认要提交审核吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.$axios.get(GetsubmitEquipmentaudit, {
            params: {
              taskequipmentid: row.id
            }
          }).then((res) => {
            if (res.errorCode !== '200') {
              this.$message.error(res.msg)
            } else {
              this.$message.success('提交成功！')
              // this.checkState()
              this.table1Loading = true
              this.checkState().then((res) => {
                this.table1Loading = false
                if (res.errorCode === '200') {
                  this.result = res.msg
                  switch (this.ViewTabIndex) {
                    case '0':
                      // this.$set(this.currentPage, 0, 1)
                      if (this.result === '待执行') {
                        this.getDeviceDetail(this.currentTaskId)
                      } else {
                        this.closeShowEdit()
                      }
                      break
                    case '1':
                      // this.$set(this.currentPage, 1, 1)
                      this.table1Loading = true
                      this.$axios.get(GetTaskResourceList, {
                        params: {
                          task_id: this.currentTaskId
                        }
                      }).then(res => {
                        this.table1Loading = false
                        if (res.errorCode === '200') {
                          this.siteInfo = res.data
                          this.setImgList(res.data.imglist)
                        } else {
                          this.$message.error(res.msg)
                        }
                      })
                      break
                  }
                } else {
                  this.$message.error(res.msg)
                }
              })
            }
          })
        })
      } else {
        this.auitShow = true
        if (state === 1) {
          this.auitData.taskequipment_id = row.id
          this.auitData.equipmenttypename = row.equipmenttypename
        } else if (state === 2) {
          this.auitData.taskresource_id = this.siteInfo.id
          this.auitData.resourcename = this.siteInfo.name
        }
        this.auitData.taskid = this.currentTaskId
      }
    },
    checkState () {
      return this.$axios.get(GetTaskState, {
        params: {
          task_id: this.currentTaskId
        }
      }).then((res) => {
        return Promise.resolve(res)
      })
    },
    handleByExamine (index, row) {
      this.showType = 4
      this.WriteState = 2
      this.editSiteId = row.resource_id
      this.getDeviceDetail(row.id)
    },
    subAuit (type) {
      if (type === 4 || type === 5) {
        if (!this.auitData.auditremark) {
          return this.$message.error('请填写审核意见！')
        }
      }
      this.table1Loading = true
      this.$axios.get(TaskAudit, {
        params: {
          taskid: this.auitData.taskid,
          state: type,
          taskequipment_id: this.auitData.taskequipment_id,
          taskresource_id: this.auitData.taskresource_id,
          auditremark: this.auitData.auditremark
        }
      }).then(res => {
        this.table1Loading = false
        if (res.errorCode === '200') {
          this.$message.success('操作成功！')
          Object.assign(this.$data.auitData, this.$options.data().auitData)
          this.auitShow = false
          /* this.$set(this.currentPage, 0, 1)
          this.getData1() */
          switch (this.ViewTabIndex) {
            case '0':
              this.$set(this.currentPage, 0, 1)
              this.getDeviceDetail(this.currentTaskId)
              break
            case '1':
              this.$set(this.currentPage, 1, 1)
              this.table1Loading = true
              this.$axios.get(GetTaskResourceList, {
                params: {
                  task_id: this.currentTaskId
                }
              }).then(res => {
                this.table1Loading = false
                if (res.errorCode === '200') {
                  this.siteInfo = res.data
                  this.setImgList(res.data.imglist)
                } else {
                  this.$message.error(res.msg)
                }
              })
              break
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    auitClose () {
      Object.assign(this.$data.auitData, this.$options.data().auitData)
      this.auitShow = false
    },
    AddTaskDevice () {
      switch (this.ViewTabIndex) {
        case '0':
          this.showTaskDialog = true
          this.$axios.get(GetResourecEquipmentList, {
            params: {
              resource_id: this.editSiteId,
              PageIndex: 1,
              PageSize: 200
            }
          }).then(res => {
            this.DeviceTypeList = res.data.list
            this.DeviceType = res.data.list.map((item) => {
              return item.equipmenttypename
            })
          }).catch(error => {
            console.log(error)
          })
          break
        case '2':
          this.showDialog = true
          this.showHiddenDanger = true
          this.dialogTitle = '新增隐患'
          this.WriteState = 0
          this.$nextTick(() => {
            this.$refs.HiddenDanger.WriteData.resource_id = this.editSiteId
          })
          break
        case '3':
          this.showDialog = true
          this.showMaintain = true
          this.dialogTitle = '新增上站维护'
          this.WriteState = 0
          this.$nextTick(() => {
            this.$refs.Maintain.WriteData.resource_id = this.editSiteId
          })
          break
      }
    },
    TaskhandleClose () {
      this.SelectDeviceType = ''
      this.showTaskDialog = false
    },
    checkAddDevise (id) {
      return this.$axios.get(GetTaskResourceEquipment, {
        params: {
          equipmenttype_id: id,
          resource_id: this.editSiteId
        }
      }).then((res) => {
        return Promise.resolve(res)
      })
    },
    handleSelectDeviceType () {
      if (!this.SelectDeviceType) this.$message.error('请选择设备类型！')
      const obj = this.DeviceTypeList.filter(i => {
        return i.equipmenttypename === this.SelectDeviceType
      })
      this.checkAddDevise(obj[0].equipmenttype_id).then((res) => {
        if (res.errorCode === '200') {
          this.dialogTitle = '新增' + this.SelectDeviceType
          this.showTaskDialog = false
          this.showDialog = true
          this.WriteState = 0
          switch (this.SelectDeviceType) {
            case '网络设备':
              this.showOperatorEquipment = true
              this.$nextTick(() => {
                this.$refs.OperatorEquipment.WriteData.task_id = this.currentTaskId
                this.$refs.OperatorEquipment.WriteData.equipmenttype_id = obj[0].equipmenttype_id
                this.$refs.OperatorEquipment.WriteData.resource_id = this.editSiteId
                this.$refs.OperatorEquipment.WriteData.resourcecode = this.editResourcecode
                this.$refs.OperatorEquipment.WriteData.resourcename = this.editResourcename
                this.$refs.OperatorEquipment.WriteData.equipmenttypename = this.SelectDeviceType
              })
              break
            case '铁塔':
              this.showTheTower = true
              this.$nextTick(() => {
                this.$refs.TheTower.WriteData.task_id = this.currentTaskId
                this.$refs.TheTower.WriteData.equipmenttype_id = obj[0].equipmenttype_id
                this.$refs.TheTower.WriteData.resource_id = this.editSiteId
                this.$refs.TheTower.WriteData.resourcecode = this.editResourcecode
                this.$refs.TheTower.WriteData.resourcename = this.editResourcename
                this.$refs.TheTower.WriteData.equipmenttypename = this.SelectDeviceType
              })
              break
            case '机房':
              this.showComputerRoom = true
              this.$nextTick(() => {
                this.$refs.ComputerRoom.WriteData.task_id = this.currentTaskId
                this.$refs.ComputerRoom.WriteData.equipmenttype_id = obj[0].equipmenttype_id
                this.$refs.ComputerRoom.WriteData.resource_id = this.editSiteId
                this.$refs.ComputerRoom.WriteData.resourcecode = this.editResourcecode
                this.$refs.ComputerRoom.WriteData.resourcename = this.editResourcename
                this.$refs.ComputerRoom.WriteData.equipmenttypename = this.SelectDeviceType
              })
              break
            case '交流配电箱':
              this.showAcDistriButionBox = true
              this.$nextTick(() => {
                this.$refs.AcDistriButionBox.WriteData.task_id = this.currentTaskId
                this.$refs.AcDistriButionBox.WriteData.equipmenttype_id = obj[0].equipmenttype_id
                this.$refs.AcDistriButionBox.WriteData.resource_id = this.editSiteId
                this.$refs.AcDistriButionBox.WriteData.resourcecode = this.editResourcecode
                this.$refs.AcDistriButionBox.WriteData.resourcename = this.editResourcename
                this.$refs.AcDistriButionBox.WriteData.equipmenttypename = this.SelectDeviceType
              })
              break
            case '机房空调':
              this.showComputerRoomAirConditioning = true
              this.$nextTick(() => {
                this.$refs.ComputerRoomAirConditioning.WriteData.task_id = this.currentTaskId
                this.$refs.ComputerRoomAirConditioning.WriteData.equipmenttype_id = obj[0].equipmenttype_id
                this.$refs.ComputerRoomAirConditioning.WriteData.resource_id = this.editSiteId
                this.$refs.ComputerRoomAirConditioning.WriteData.resourcecode = this.editResourcecode
                this.$refs.ComputerRoomAirConditioning.WriteData.resourcename = this.editResourcename
                this.$refs.ComputerRoomAirConditioning.WriteData.equipmenttypename = this.SelectDeviceType
              })
              break
            case '开关电源':
              this.showSwitchingPowerSupply = true
              this.$nextTick(() => {
                this.$refs.SwitchingPowerSupply.WriteData.task_id = this.currentTaskId
                this.$refs.SwitchingPowerSupply.WriteData.equipmenttype_id = obj[0].equipmenttype_id
                this.$refs.SwitchingPowerSupply.WriteData.resource_id = this.editSiteId
                this.$refs.SwitchingPowerSupply.WriteData.resourcecode = this.editResourcecode
                this.$refs.SwitchingPowerSupply.WriteData.resourcename = this.editResourcename
                this.$refs.SwitchingPowerSupply.WriteData.equipmenttypename = this.SelectDeviceType
              })
              break
            case '蓄电池':
              this.showStorageBattery = true
              this.$nextTick(() => {
                this.$refs.StorageBattery.WriteData.task_id = this.currentTaskId
                this.$refs.StorageBattery.WriteData.equipmenttype_id = obj[0].equipmenttype_id
                this.$refs.StorageBattery.WriteData.resource_id = this.editSiteId
                this.$refs.StorageBattery.WriteData.resourcecode = this.editResourcecode
                this.$refs.StorageBattery.WriteData.resourcename = this.editResourcename
                this.$refs.StorageBattery.WriteData.equipmenttypename = this.SelectDeviceType
              })
              break
            case '动力及环境监测单元':
              this.showPowerAndEnvironment = true
              this.$nextTick(() => {
                this.$refs.PowerAndEnvironment.WriteData.task_id = this.currentTaskId
                this.$refs.PowerAndEnvironment.WriteData.equipmenttype_id = obj[0].equipmenttype_id
                this.$refs.PowerAndEnvironment.WriteData.resource_id = this.editSiteId
                this.$refs.PowerAndEnvironment.WriteData.resourcecode = this.editResourcecode
                this.$refs.PowerAndEnvironment.WriteData.resourcename = this.editResourcename
                this.$refs.PowerAndEnvironment.WriteData.equipmenttypename = this.SelectDeviceType
              })
              break
            case '整流模块':
              this.showRectifierModule = true
              this.$nextTick(() => {
                this.$refs.RectifierModule.WriteData.task_id = this.currentTaskId
                this.$refs.RectifierModule.WriteData.equipmenttype_id = obj[0].equipmenttype_id
                this.$refs.RectifierModule.WriteData.resource_id = this.editSiteId
                this.$refs.RectifierModule.WriteData.resourcecode = this.editResourcecode
                this.$refs.RectifierModule.WriteData.resourcename = this.editResourcename
                this.$refs.RectifierModule.WriteData.equipmenttypename = this.SelectDeviceType
              })
              break
            case '通讯与位置终端':
              this.showCommunicationAndLocation = true
              this.$nextTick(() => {
                this.$refs.CommunicationAndLocation.WriteData.task_id = this.currentTaskId
                this.$refs.CommunicationAndLocation.WriteData.equipmenttype_id = obj[0].equipmenttype_id
                this.$refs.CommunicationAndLocation.WriteData.resource_id = this.editSiteId
                this.$refs.CommunicationAndLocation.WriteData.resourcecode = this.editResourcecode
                this.$refs.CommunicationAndLocation.WriteData.resourcename = this.editResourcename
                this.$refs.CommunicationAndLocation.WriteData.equipmenttypename = this.SelectDeviceType
              })
              break
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleTabs () {
      switch (this.ViewTabIndex) {
        case '0':
          this.getDeviceDetail(this.currentTaskId)
          break
        case '1':
          this.table1Loading = true
          this.$axios.get(GetTaskResourceList, {
            params: {
              task_id: this.currentTaskId
            }
          }).then(res => {
            this.table1Loading = false
            if (res.errorCode === '200') {
              this.siteInfo = res.data
              this.setImgList(res.data.imglist)
            } else {
              this.$message.error(res.msg)
            }
          })
          break
        case '2':
          this.GetHiddenDangerList()
          break
        case '3':
          this.GetMaintainList()
          break
      }
    },
    setImgList (list) {
      if (list === null) return
      this.ImgList1 = list.filter(i => { return i.field_name === 'code' })
      this.ImgList2 = list.filter(i => { return i.field_name === 'longitude' })
    },
    handleAddTask () {
      this.$refs.AddForm.validate((vali, msg) => {
        if (!vali) {
          return this.$message.error('请补全信息！')
        } else {
          if (this.deviceList.length === 0) {
            return this.$message.error('请添加设备！')
          }
          this.table1Loading = true
          this.$axios.post(AddTask, this.addData).then(res => {
            this.table1Loading = false
            if (res.errorCode === '200') {
              this.$message.success('添加成功!')
              this.showType = 0
              Object.assign(this.$data.addData, this.$options.data().addData)
              this.$refs.AddForm.clearValidate()
              this.deviceList = []
              this.currentEquipmentId = []
              this.currentSiteId = []
              this.boardData = []
              this.getData1()
            } else {
              this.$message.error(res.msg)
            }
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    OpenImgBox (title, name, list) {
      this.$refs.ImgBox.SetData(title, name, list)
      this.$refs.ImgBox.Open()
      this.WriteState === 2 ? this.$refs.ImgBox.Flag = true : this.$refs.ImgBox.Flag = false
    },
    handleEditSite (state) {
      this.$refs.siteInfoForm.validate((vali, msg) => {
        if (!vali) {
          return this.$message.error('请补全信息！')
        } else {
          this.table1Loading = true
          this.siteInfo.imglist = this.siteInfo.imglist ? this.siteInfo.imglist : []
          this.siteInfo.auditstate = state
          this.$axios.put(UpdateTaskResource, this.siteInfo, {
            params: {
              auditstate: state
            }
          }).then(res => {
            this.table1Loading = false
            if (res.errorCode === '200') {
              this.$message.success('编辑成功!')
              this.closeShowEdit()
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    setTitle (name) {
      if (this.WriteState === 1) {
        this.dialogTitle = '编辑' + name
      } else if (this.WriteState === 2) {
        this.dialogTitle = name + '详情'
      } else if (this.WriteState === 0) {
        this.dialogTitle = '新增' + name
      }
    },
    EditHiddenDanger (index, row, type) {
      this.WriteState = type
      this.DeviceID = row.id
      this.showDialog = true
      this.setTitle('隐患')
      this.showHiddenDanger = true
    },
    EditMaintain (index, row, type) {
      this.WriteState = type
      this.DeviceID = row.id
      this.showDialog = true
      this.setTitle('上站维护')
      this.showMaintain = true
    },
    showDeviceDetail (index, row, type) {
      this.WriteState = type
      this.DeviceID = row.id
      this.showDialog = true
      this.setTitle(row.equipmenttypename)
      switch (row.equipmenttypename) {
        case '网络设备':
          this.showOperatorEquipment = true
          break
        case '铁塔':
          this.showTheTower = true
          break
        case '机房':
          this.showComputerRoom = true
          break
        case '交流配电箱':
          this.showAcDistriButionBox = true
          break
        case '机房空调':
          this.showComputerRoomAirConditioning = true
          break
        case '开关电源':
          this.showSwitchingPowerSupply = true
          break
        case '蓄电池':
          this.showStorageBattery = true
          break
        case '动力及环境监测单元':
          this.showPowerAndEnvironment = true
          break
        case '整流模块':
          this.showRectifierModule = true
          break
        case '通讯与位置终端':
          this.showCommunicationAndLocation = true
          break
      }
    },
    DeleteDevice (index, row) {
      this.deviceList.forEach((i) => {
        if (row.resource_id === i.resource_id) {
          if (i.equipment_id.indexOf(row.id) !== -1) {
            i.equipment_id.splice(i.equipment_id.indexOf(row.id), 1)
          }
        }
      })
      if (this.boardData.length === 1) {
        this.deviceList.splice(this.deviceList.findIndex(item => item.id === row.resource_id), 1)
      }
      this.boardData.splice(this.boardData.findIndex(item => item.id === row.id), 1)
    },
    DeleteSite (index, row) {
      let arr = []
      this.deviceList.forEach((i, index) => {
        if (row.resource_id.indexOf(i.resource_id) === -1) {
          arr.push(i)
        }
      })
      this.deviceList = arr
    },
    DeviceDelete (index, row) {
      this.$confirm('您确认要删除当前任务设备吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios.delete(DelTaskEquipment, {
          params: {
            id: row.id
          }
        }).then((res) => {
          if (res.errorCode !== '200') {
            this.$message.error(res.msg)
          } else {
            this.$message.success('删除成功！')
            this.checkState().then((result) => {
              if (result.errorCode === '200') {
                if (result.msg === '待执行') {
                  this.$set(this.currentPage, 1, 1)
                  this.getDeviceDetail(this.currentTaskId)
                } else {
                  this.closeShowEdit()
                }
              } else {
                this.$message.error(result.msg)
              }
            })
          }
        })
      })
    },
    WriteClose () {
      this.DeviceID = ''
      this.showDialog = false
      switch (this.ViewTabIndex) {
        case '0':
          this.getDeviceDetail(this.currentTaskId)
          break
        case '1':
          this.table1Loading = true
          this.$axios.get(GetTaskResourceList, {
            params: {
              task_id: this.currentTaskId
            }
          }).then(res => {
            this.table1Loading = false
            if (res.errorCode === '200') {
              this.siteInfo = res.data
              this.setImgList(res.data.imglist)
            } else {
              this.$message.error(res.msg)
            }
          })
          break
        case '2':
          this.GetHiddenDangerList()
          break
        case '3':
          this.GetMaintainList()
          break
      }
    },
    closeShowEdit () {
      this.showType = 0
      this.ViewTabIndex = '0'
      this.siteInfo = {}
      this.deviceInfo = []
      this.HiddenDangerList = []
      this.MaintainList = []
      this.$set(this.total, 1, 0)
      this.$set(this.currentPage, 1, 1)
      this.$set(this.pageSize, 1, 10)
      this.currentTaskId = ''
      this.DeviceID = ''
      this.ImgList1 = []
      this.ImgList2 = []
      this.editSiteId = ''
      this.DeviceType = []
      this.DeviceTypeList = []
      this.editResourcecode = ''
      this.editResourcename = ''
      this.$nextTick(() => {
        this.$refs.siteInfoForm.clearValidate()
      })
      this.getMore(1)
    },
    closeShowAdd () {
      this.showType = 0
      Object.assign(this.$data.addData, this.$options.data().addData)
      this.$refs.AddForm.clearValidate()
      this.deviceList = []
      this.currentEquipmentId = []
      this.currentSiteId = []
    },
    currentChange2 (e) {
      this.table1Loading = true
      this.$set(this.currentPage, 1, e)
      this.$axios.get(GetTaskEquipmentList, {
        params: {
          taskid: this.currentTaskId,
          PageIndex: e,
          PageSize: this.pageSize[1]
        }
      }).then(res => {
        this.table1Loading = false
        if (res.errorCode === '200') {
          this.deviceInfo = res.data.list
          this.$set(this.total, 1, res.data.total)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    currentChange4 (e) {
      this.table1Loading = true
      this.$set(this.currentPage, 3, e)
      this.$axios.get(GetHiddenDangerList, {
        params: {
          resource_id: this.editSiteId,
          PageIndex: e,
          PageSize: this.pageSize[3]
        }
      }).then(res => {
        this.table1Loading = false
        if (res.errorCode === '200') {
          this.HiddenDangerList = res.data.list
          this.$set(this.total, 3, res.data.total)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    currentChange5 (e) {
      this.table1Loading = true
      this.$set(this.currentPage, 4, e)
      this.$axios.get(GetMaintainList, {
        params: {
          resource_id: this.editSiteId,
          PageIndex: e,
          PageSize: this.pageSize[4]
        }
      }).then(res => {
        this.table1Loading = false
        if (res.errorCode === '200') {
          this.MaintainList = res.data.list
          this.$set(this.total, 4, res.data.total)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    SizeChange2 (page) {
      this.$set(this.pageSize, 1, page)
      this.currentChange2(1)
    },
    SizeChange4 (page) {
      this.$set(this.pageSize, 3, page)
      this.currentChange4(1)
    },
    SizeChange5 (page) {
      this.$set(this.pageSize, 4, page)
      this.currentChange5(1)
    },
    handleSiteChoose () {
      this.$refs.AddForm.validate((vali, msg) => {
        if (!vali) {
          return this.$message.error('请补全信息！')
        } else {
          this.showDialog = true
          this.siteChoose = true
        }
      })
    },
    AddhandleClose () {
      this.showDialog = !this.showDialog
      this.DeviceID = ''
    },
    selectResource (name, id) {
      this.showDialog = false
      this.addData.resource_id = id
      this.addData.resourcename = name
    },
    OpenMap (val) { // 0: 查看 1: 编辑/新增
      this.showMap = true
      this.$nextTick(() => {
        this.$refs.GoogleMap.Open()
        this.$refs.GoogleMap.showType = val
        this.$refs.GoogleMap.longitude = this.siteInfo.longitude
        this.$refs.GoogleMap.latitude = this.siteInfo.latitude
      })
    },
    getMapData (longitude, latitude) {
      this.showMap = false
      /* if (longitude) {
        this.WriteData.longitude = longitude
      }
      if (latitude) {
        this.WriteData.latitude = latitude
      } */
    },
    handleExport () {
      this.$confirm(`您确定要导出吗？`, '提示', {
        type: 'info'
      }).then(() => {

      })
    }
  },
  watch: {
    deviceList: {
      handler (val) {
        this.addData.createtasks = []
        this.currentEquipmentId = []
        val.forEach((i) => {
          var obj = {
            resource_id: i.resource_id,
            equipment_id: i.equipment_id
          }
          this.addData.createtasks.push(obj)
          this.currentEquipmentId = this.currentEquipmentId.concat(i.equipment_id)
        })
        this.currentSiteId = val.map((item) => {
          return item.id ? item.id : item.resource_id
        })
      },
      deep: true
    },
    showDialog (val) {
      if (!val) {
        this.SelectDeviceType = ''
        this.siteChoose = false
        this.deviceChoose = false
        this.showOperatorEquipment = false
        this.showTheTower = false
        this.showComputerRoom = false
        this.showAcDistriButionBox = false
        this.showComputerRoomAirConditioning = false
        this.showSwitchingPowerSupply = false
        this.showRectifierModule = false
        this.showCommunicationAndLocation = false
        this.showStorageBattery = false
        this.showPowerAndEnvironment = false
        this.showHiddenDanger = false
        this.showMaintain = false
      }
    },
    ImgList (val) {
      this.siteInfo.imglist = val
    }
  },
  computed: {
    ImgList () {
      return this.ImgList1.concat(this.ImgList2)
    }
  },
  components: {
    layuiTitle,
    GoogleMap,
    ResourceList,
    deviceList,
    OperatorEquipment,
    TheTower,
    ComputerRoom,
    ImgBox,
    AcDistriButionBox,
    ComputerRoomAirConditioning,
    SwitchingPowerSupply,
    StorageBattery,
    PowerAndEnvironment,
    HiddenDanger,
    Maintain,
    RectifierModule,
    CommunicationAndLocation
  }
}
</script>

<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
