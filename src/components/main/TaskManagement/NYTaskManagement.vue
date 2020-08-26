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
              <el-form-item label="站点分类：">
                <el-select class="searchSelect" v-model="Query.classify">
                  <el-option v-for="i in DicList.classify" :key="i.value" :label="i.text" :value="i.value"></el-option>
                </el-select>
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
                <el-select class="searchSelect" v-model="Query.state">
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
          </div>
        </el-col>
      </el-row>

      <el-table :data="tableList" v-loading="table1Loading" style="margin-top: 15px;" ref="table1">
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template>
        </el-table-column>
        <el-table-column prop="cityname" label="地市" width="100"></el-table-column>
        <el-table-column prop="areaname" label="区域" width="100"></el-table-column>
        <el-table-column prop="resourcename" label="站点名称"></el-table-column>
        <el-table-column prop="code" label="站点编码"></el-table-column>
        <el-table-column prop="classifyname" label="站点分类"></el-table-column>
        <el-table-column prop="statename" label="任务状态" width=""></el-table-column>
        <el-table-column prop="taskbatch" label="任务批次"></el-table-column>
        <el-table-column prop="" label="完成时间"></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width="" :formatter="formatDate"></el-table-column>
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
        <el-pagination @current-change="getMore" @size-change="changeSize1" :current-page="currentPage"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="total"
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
      <el-table :data="deviceList" v-loading="table1Loading" ref="table1" @selection-change="handleSelect1">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template>
        </el-table-column>
        <el-table-column prop="cityname" label="城市" width=""></el-table-column>
        <el-table-column prop="areaname" label="区域" width=""></el-table-column>
        <el-table-column prop="name" label="站点名称" width=""></el-table-column>
        <el-table-column prop="code" label="站点编码" width="120"></el-table-column>
        <el-table-column prop="classifyname" label="站点分类" width=""></el-table-column>
      </el-table>
      <div class="center" style="padding-bottom: 100px">
        <el-button @click="handleAddTask" type="primary" :disabled="table1Loading" :icon="table1Loading ? 'el-icon-loading' : 'el-icon-check'">提交</el-button>
        <el-button @click="closeShowAdd" type="primary" :disabled="table1Loading" :icon="table1Loading ? 'el-icon-loading' : 'el-icon-arrow-left'">返回</el-button>
      </div>
    </div>
    <!--详情-->
    <div v-show="showType === 1 || showType === 2">
      <layuiTitle title="任务设备列表"></layuiTitle>
      <el-tabs class="content-card" v-model="ViewTabIndex" @tab-click="handleTabs">
        <el-row v-if="ViewTabIndex !== '1'" style="margin-bottom: 15px;">
          <el-col :span="4" class="SearchResult">查询结果</el-col>
          <el-col :offset="2" :span="18" class="fr">
            <div class="fr">
              <el-button @click="AddTaskDevice" type="success" icon="el-icon-plus">添加</el-button>
            </div>
          </el-col>
        </el-row>
        <el-tab-pane label="设备信息">
          <el-table :data="deviceInfo" v-loading="table1Loading" ref="">
            <el-table-column label="序号" width="50">
              <template slot-scope="scope">{{scope.$index+(currentPage2 - 1) * pageSize2 + 1}}</template>
            </el-table-column>
            <el-table-column prop="equipmenttypename" label="设备类型"></el-table-column>
            <el-table-column prop="accessdate" label="入网日期"></el-table-column>
            <el-table-column prop="statename" label="设备状态"></el-table-column>
            <el-table-column prop="censusstatename" label="普查状态"></el-table-column>
            <el-table-column prop="auditusername" label="审核人"></el-table-column>
            <el-table-column prop="audittime" label="审核时间"></el-table-column>
            <el-table-column prop="createtime" label="创建日期"></el-table-column>
            <el-table-column prop="createusername" label="创建人"></el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="showDeviceDetail(scope.$index, scope.row, 2)">详情</el-button>
                <el-button v-if="showType !== 1 && scope.row.statename === '待执行'" type="text" size="mini" @click="showDeviceDetail(scope.$index, scope.row, 1)">修改</el-button>
                <el-button v-if="showType !== 1 && scope.row.statename === '待执行'" type="text" size="mini" @click="handleExamine(scope.$index, scope.row, 1)">提交审核</el-button>
                <el-button v-if="showType == 4 && scope.row.statename === '待审核'" type="text" size="mini" @click="handleExamine(scope.$index, scope.row, 2)">审核</el-button>
                <el-button v-if="showType !== 1" type="text" size="mini" @click="DeviceDelete(scope.$index, scope.row)">删除</el-button>
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
                    <td><div class="cell">站点编码</div></td>
                    <td v-show="showType == 2"><div class="cell">
                      <el-form-item class="form-item">
                        <el-input v-model="siteInfo.code"></el-input>
                      </el-form-item>
                    </div></td>
                    <td v-if="showType == 1"><div class="cell">{{siteInfo.code}}</div></td>
                    <td><div class="cell" @click="OpenImgBox('站点编码', 'code', ImgList1)">{{ImgList1.length}}</div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--站点名称-->
                  <tr class="el-table__row">
                    <td><div class="cell">站点名称</div></td>
                    <td v-show="showType == 2"><div class="cell">
                      <el-form-item class="form-item">
                        <el-input v-model="siteInfo.name"></el-input>
                      </el-form-item>
                    </div></td>
                    <td v-if="showType == 1"><div class="cell">{{siteInfo.name}}</div></td>
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
                  <!--详细地址-->
                  <tr class="el-table__row" v-if="siteInfo.classify == 1">
                    <td><div class="cell">详细地址</div></td>
                    <td v-show="showType == 2"><div class="cell">
                      <el-form-item class="form-item">
                        <el-input v-model="siteInfo.address"></el-input>
                      </el-form-item>
                    </div></td>
                    <td v-if="showType == 1"><div class="cell">{{siteInfo.address}}</div></td>
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
            <el-button v-if="showType == 2" @click="handleEditSite" type="primary" icon="el-icon-check">保存</el-button>
            <el-button @click="closeShowEdit" type="primary" icon="el-icon-arrow-left">返回</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="电表">
          <el-table :data="AmmeterInfo" v-loading="table1Loading" ref="">
            <el-table-column label="序号" width="50">
              <template slot-scope="scope">{{scope.$index+(currentPage2 - 1) * pageSize2 + 1}}</template>
            </el-table-column>
            <el-table-column prop="statename" label="电表状态"></el-table-column>
            <el-table-column prop="accessdate" label="入网日期"></el-table-column>
            <el-table-column prop="electricmeterno" label="电表编号"></el-table-column>
            <el-table-column prop="powersupplymode" label="供电方式"></el-table-column>
            <el-table-column prop="powersupplytheowner" label="供电业主"></el-table-column>
            <el-table-column prop="theownerphone" label="供电联系方式"></el-table-column>
            <el-table-column prop="censusstatename" label="普查状态"></el-table-column>
            <el-table-column prop="createtime" label="创建日期"></el-table-column>
            <el-table-column prop="createusername" label="创建人"></el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="showDeviceDetail(scope.$index, scope.row)">详情</el-button>
                <el-button v-if="showType !== 1 && scope.row.statename === '待执行'" type="text" size="mini" @click="showDeviceDetail(scope.$index, scope.row)">修改</el-button>
                <el-button v-if="showType !== 1 && scope.row.statename === '待执行'" type="text" size="mini" @click="handleExamine(scope.$index, scope.row, 1)">提交审核</el-button>
                <el-button v-if="showType == 4 && scope.row.statename === '待审核'" type="text" size="mini" @click="handleExamine(scope.$index, scope.row, 2)">审核</el-button>
                <el-button v-if="showType !== 1" type="text" size="mini" @click="DeviceDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="隐患">
          <el-table :data="AmmeterInfo" v-loading="table1Loading" ref="">
            <el-table-column label="序号" width="50">
              <template slot-scope="scope">{{scope.$index+(currentPage2 - 1) * pageSize2 + 1}}</template>
            </el-table-column>
            <el-table-column prop="hiddendangertype" label="隐患类型"></el-table-column>
            <el-table-column prop="hiddendangerlevel" label="隐患级别"></el-table-column>
            <el-table-column prop="hiddendangerdescribe" label="隐患描述"></el-table-column>
            <el-table-column prop="handlingsuggestions" label="处理建议"></el-table-column>
            <el-table-column prop="createtime" label="创建日期"></el-table-column>
            <el-table-column prop="createusername" label="创建人"></el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="">详情</el-button>
                <el-button type="text" size="mini" @click="">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="代维">
          <el-table :data="AmmeterInfo" v-loading="table1Loading" ref="">
            <el-table-column label="序号" width="50">
              <template slot-scope="scope">{{scope.$index+(currentPage2 - 1) * pageSize2 + 1}}</template>
            </el-table-column>
            <el-table-column prop="hiddendangertypename" label="隐患类型"></el-table-column>
            <el-table-column prop="maintainproject" label="维护项目"></el-table-column>
            <el-table-column prop="describe" label="问题描述"></el-table-column>
            <el-table-column prop="treatment" label="处理情况"></el-table-column>
            <el-table-column prop="createtime" label="创建时间"></el-table-column>
            <el-table-column prop="createusername" label="创建人"></el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="">详情</el-button>
                <el-button type="text" size="mini" @click="">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <div class="center" v-show="ViewTabIndex === '0'">
        <el-pagination @current-change="currentChange2" @size-change="SizeChange2" :current-page="currentPage2"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pageSize2" :total="total2"
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

    <el-dialog title="审核"  :visible.sync="auitShow" center width="30%">
      <el-form :data="auitData">
        <el-row style="margin-bottom:15px">
          <el-col :span="6">站点名称</el-col>
          <el-col :span="16">{{auitData.resourcename}}</el-col>
        </el-row>
        <el-row style="margin-bottom:15px">
          <el-input type="textarea" :autosize="{ minRows: 2}" placeholder="请输入审核意见" v-model="auitData.remark"></el-input>
        </el-row>
        <el-row type="flex" justify="end">
          <el-button type="success" @click="subAuit(3)">审核通过</el-button>
          <el-button type="danger" @click="subAuit(4)">审核不通过</el-button>
          <el-button type="warning" @click="subAuit(5)">审核退回</el-button>
        </el-row>
      </el-form>
    </el-dialog>

    <el-dialog top="1%" append-to-body :visible.sync="showDialog" width="80%" :title="dialogTitle" :close-on-click-modal="false" :before-close="AddhandleClose">
      <ResourceList v-if="siteChoose" :isSite="1" :resourcetype="1" :resource_id="currentSiteId" @chooseDevice="chooseDevice" @selectResource="selectResource"/>
      <deviceList v-if="deviceChoose" :resourcetype="1" :equipment_id="currentEquipmentId" @chooseDevice="chooseDevice"></deviceList>
      <TaskChargingPile v-if="showChargingPile" :DeviceID="DeviceID" :WriteState="WriteState"  @fatherOpenImgBox="OpenImgBox" @fatherClose="WriteClose"></TaskChargingPile>
      <TaskSwitchCabinet v-if="showSwitchCabinet" :DeviceID="DeviceID" :WriteState="WriteState"  @fatherOpenImgBox="OpenImgBox" @fatherClose="WriteClose"></TaskSwitchCabinet>
      <TaskReservepover v-if="showReservepover" :DeviceID="DeviceID" :WriteState="WriteState"  @fatherOpenImgBox="OpenImgBox" @fatherClose="WriteClose"></TaskReservepover>
      <TaskChangeBattery v-if="showChangeBattery" :DeviceID="DeviceID" :WriteState="WriteState"  @fatherOpenImgBox="OpenImgBox" @fatherClose="WriteClose"></TaskChangeBattery>
      <TaskOilFiredGenerator v-if="showOilFiredGenerator " :DeviceID="DeviceID" :WriteState="WriteState"  @fatherOpenImgBox="OpenImgBox" @fatherClose="WriteClose"></TaskOilFiredGenerator>
      <TaskBatteryGenerator v-if="showBatteryGenerator " :DeviceID="DeviceID" :WriteState="WriteState"  @fatherOpenImgBox="OpenImgBox" @fatherClose="WriteClose"></TaskBatteryGenerator>
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
import TaskChargingPile from 'base/TaskEquipment/TaskChargingPile'
import TaskSwitchCabinet from 'base/TaskEquipment/TaskSwitchCabinet'
import TaskReservepover from 'base/TaskEquipment/TaskReservepover'
import TaskChangeBattery from 'base/TaskEquipment/TaskChangeBattery'
import TaskOilFiredGenerator from 'base/TaskEquipment/TaskOilFiredGenerator'
import TaskBatteryGenerator from 'base/TaskEquipment/TaskBatteryGenerator'
import {GetEnergyTaskList, AddEnergyTask, GetTaskEquipmentList, GetTaskResourceList, UpdateTaskResource, DelTaskEquipment, GetEnergySubmitAudit, AuditEnergyTask} from 'api/SurveyManagement'
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
      Query: {
        AreaList: [],
        provinceid: null, // 省份
        cityid: null, // 城市
        areaid: null, // 区域
        states: null,
        name: '',
        code: '',
        classify: null,
        state: null,
        starttime: '',
        endtime: ''
      },
      total: 0,
      currentPage: 1,
      pageSize: 10,
      total2: 0,
      currentPage2: 1,
      pageSize2: 10,
      addData: {
        taskbatch: '',
        completetime: '',
        resourcename: '',
        resource_id: [],
        equipment_id: []
      },
      tableList: [], // 任务列表
      deviceList: [], // 任务设备列表
      deviceInfo: [], // 任务信息
      AmmeterInfo: [], // 任务电表
      siteInfo: {}, // 任务站点信息
      selectList: [], // 选择任务设备
      currentEquipmentId: [],
      currentSiteId: [],
      currentTaskId: '', // 当前任务id
      siteRules: {
        outstanding: [
          { required: true, message: '是否拉远站', trigger: 'change' }
        ],
        shared: [
          { required: true, message: '是否共享', trigger: 'change' }
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
      showChargingPile: false, // 充电桩详情
      showSwitchCabinet: false, // 换电柜详情
      showReservepover: false, // 备电详情
      showChangeBattery: false, // 换电池详情
      showOilFiredGenerator: false, // 燃油发电机详情
      showBatteryGenerator: false,
      showTaskDialog: false, // 选择任务设备类型弹框
      ViewTabIndex: 0,
      DicList: {},
      WriteState: null,
      DeviceID: '',
      dialogTitle: '',
      auitShow: false,
      auitData: {
        resourcename: '',
        remark: '',
        task_id: ''
      },
      ImgList1: [],
      ImgList2: [],
      DeviceType: ['外电引入', '换电柜', '燃油发电机', '换电电池', '电池发电装置', '充电桩', '备电'],
      SelectDeviceType: ''
    }
  },
  activated () {
    this.getData1()
    this.initDictionariesArray()
  },
  methods: {
    initDictionariesArray () {
      let arr = ['任务状态', '设备产权单位', '建站模式', '站点分类']
      this.$axios.post(DictionaryInfoList, arr).then(res => {
        if (res.errorCode === '200') {
          this.DicList.classify = res.data.filter(i => {
            return i.type === '站点分类'
          })
          this.DicList.models = res.data.filter(i => {
            return i.type === '建站模式'
          })
          this.DicList.states = res.data.filter(i => {
            return i.type === '任务状态'
          })
          this.DicList.propertyrightunit = res.data.filter(i => {
            return i.type === '设备产权单位'
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
      this.currentPage = e
      this.$axios.get(GetEnergyTaskList, {params: Object.assign({}, this.Query, {
        PageIndex: e,
        PageSize: this.pageSize
      })}).then(res => {
        this.table1Loading = false
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
      this.table1Loading = true
      this.$axios.get(GetEnergyTaskList, {
        params: {
          PageIndex: 1,
          PageSize: this.pageSize
        }
      }).then(res => {
        this.table1Loading = false
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
    formatDate (row) {
      return formatDate(row.createtime)
    },
    handleAdd () {
      this.showType = 3
    },
    handleDetail (index, row) {
      this.showType = 1
      this.WriteState = 2
      this.getDeviceDetail(row.id)
    },
    handleEdit (index, row) {
      this.showType = 2
      this.WriteState = 1
      this.getDeviceDetail(row.id)
    },
    getDeviceDetail (id) {
      this.table1Loading = true
      this.currentPage2 = 1
      this.currentTaskId = id
      this.$axios.get(GetTaskEquipmentList, {
        params: {
          taskid: id,
          PageIndex: 1,
          PageSize: this.pageSize2
        }
      }).then(res => {
        this.table1Loading = false
        if (res.errorCode === '200') {
          this.deviceInfo = res.data.list
          this.total2 = res.data.total
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
    chooseDevice (list) {
      this.deviceList.push(...list)
      this.showDialog = !this.showDialog
    },
    handleSelect1 (list) {
      this.selectList = list
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
    handleExamine (index, row, type) {
      if (type === 1) {
        this.$confirm('您确认要提交审核吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.$axios.get(GetEnergySubmitAudit, {
            params: {
              task_id: row.id
            }
          }).then((res) => {
            if (res.errorCode !== '200') {
              this.$message.error(res.msg)
            } else {
              this.$message.success('提交成功！')
              this.currentPage = 1
              this.getData1()
            }
          })
        })
      } else {
        this.auitShow = true
        this.auitData.task_id = row.id
        this.auitData.resourcename = row.resourcename
      }
    },
    handleByExamine (index, row) {
      this.showType = 4
      this.WriteState = 2
      this.getDeviceDetail(row.id)
    },
    subAuit (type) {
      if (type === 4 || type === 5) {
        if (!this.auitData.remark) {
          return this.$message.error('请填写审核意见！')
        }
      }
      this.$axios.get(AuditEnergyTask, {
        params: {
          task_id: this.auitData.task_id,
          state: type,
          auditremark: this.auitData.remark
        }
      }).then(res => {
        this.table1Loading = false
        if (res.errorCode === '200') {
          this.$message.success('操作成功！')
          Object.assign(this.$data.auitData, this.$options.data().auitData)
          this.auitShow = false
          this.currentPage = 1
          this.getData1()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    AddTaskDevice () {
      switch (this.ViewTabIndex) {
        case '0':
          this.showTaskDialog = true
          break
        case '2':
          break
        case '3':
          break
        case '4':
          break
      }
    },
    TaskhandleClose () {
      this.SelectDeviceType = ''
      this.showTaskDialog = false
    },
    handleSelectDeviceType () {
      if (!this.SelectDeviceType) this.$message.error('请选择设备类型！')
      this.dialogTitle = '新增' + this.SelectDeviceType
      this.showTaskDialog = false
      this.showDialog = true
      this.WriteState = 0
      switch (this.SelectDeviceType) {
        case '充电桩':
          this.showChargingPile = true
          break
        case '换电柜':
          this.showSwitchCabinet = true
          break
        case '备电':
          this.showReservepover = true
          break
        case '换电电池':
          this.showChangeBattery = true
          break
        case '燃油发电机':
          this.showOilFiredGenerator = true
          break
        case '电池发电装置':
          this.showBatteryGenerator = true
          break
      }
    },
    handleTabs () {
      if (this.ViewTabIndex === '0') {
        this.getDeviceDetail(this.currentTaskId)
      } else {
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
            if (this.addData.TaskObject === '1') {
              return this.$message.error('请添加站点！')
            } else {
              return this.$message.error('请添加设备！')
            }
          }
          this.table1Loading = true
          this.$axios.post(AddEnergyTask, this.addData).then(res => {
            this.table1Loading = false
            if (res.errorCode === '200') {
              this.$message.success('添加成功!')
              this.showType = 0
              Object.assign(this.$data.addData, this.$options.data().addData)
              this.$refs.AddForm.clearValidate()
              this.deviceList = []
              this.currentEquipmentId = []
              this.currentSiteId = []
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
    handleEditSite () {
      this.$refs.siteInfoForm.validate((vali, msg) => {
        if (!vali) {
          return this.$message.error('请补全信息！')
        } else {
          this.table1Loading = true
          this.siteInfo.imglist = []
          this.$axios.put(UpdateTaskResource, this.siteInfo).then(res => {
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
    showDeviceDetail (index, row, type) {
      this.WriteState = type
      this.DeviceID = row.id
      this.showDialog = true
      this.setTitle(row.equipmenttypename)
      switch (row.equipmenttypename) {
        case '充电桩':
          this.showChargingPile = true
          break
        case '换电柜':
          this.showSwitchCabinet = true
          break
        case '备电':
          this.showReservepover = true
          break
        case '换电电池':
          this.showChangeBattery = true
          break
        case '燃油发电机':
          this.showOilFiredGenerator = true
          break
        case '电池发电装置':
          this.showBatteryGenerator = true
          break
      }
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
            this.currentPage2 = 1
            this.getDeviceDetail(this.currentTaskId)
          }
        })
      })
    },
    WriteClose () {
      this.getDeviceDetail(this.currentTaskId)
      this.DeviceID = ''
      this.showDialog = false
    },
    closeShowEdit () {
      this.showType = 0
      this.ViewTabIndex = '0'
      this.siteInfo = {}
      this.deviceInfo = []
      this.total2 = 0
      this.currentPage2 = 1
      this.pageSize2 = 10
      this.currentTaskId = ''
      this.DeviceID = ''
      this.ImgList1 = []
      this.ImgList2 = []
      this.$nextTick(() => {
        this.$refs.siteInfoForm.clearValidate()
      })
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
      this.currentPage2 = e
      this.$axios.get(GetTaskEquipmentList, {
        params: {
          taskid: this.currentTaskId,
          PageIndex: e,
          PageSize: this.pageSize2
        }
      }).then(res => {
        this.table1Loading = false
        if (res.errorCode === '200') {
          this.deviceInfo = res.data.list
          this.total2 = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    SizeChange2 (page) {
      this.pageSize2 = page
      this.currentChange2(this.currentPage2)
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
    }
  },
  watch: {
    deviceList (val) {
      this.addData.resource_id = val.map((item) => {
        return item.id
      })
    },
    showDialog (val) {
      if (!val) {
        this.siteChoose = false
        this.deviceChoose = false
        this.showChargingPile = false
        this.showSwitchCabinet = false
        this.showReservepover = false
        this.showChangeBattery = false// 换电池详情
        this.showOilFiredGenerator = false // 燃油发电机详情
        this.showBatteryGenerator = false
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
    TaskChargingPile,
    TaskSwitchCabinet,
    TaskReservepover,
    ImgBox,
    TaskChangeBattery,
    TaskOilFiredGenerator,
    TaskBatteryGenerator
  }
}
</script>

<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
