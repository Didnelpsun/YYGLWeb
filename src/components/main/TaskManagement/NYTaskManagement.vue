<template>
  <div class="content">
    <div class="main" v-show="showType === 0">
      <el-form :model="Query">
        <el-row>
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="来源类型：" label-width="130px">
                <el-select class="searchSelect" v-model="Query.sourcetypes">
                  <el-option v-for="i in DicList.sourcetypes" :key="i.value" :label="i.text" :value="i.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="任务状态：">
                <el-select class="searchSelect" v-model="Query.states">
                  <el-option v-for="i in DicList.states" :key="i.value" :label="i.text" :value="i.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="站点名称：">
                <el-input v-model="Query.resourcename" placeholder="请输入站点名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label-width="130px" label="设备类型名称：">
                <el-input v-model="Query.equipmentypename" placeholder="请输入设备类型名称"></el-input>
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
        <el-table-column prop="sourcetypename" label="来源类型"></el-table-column>
        <el-table-column prop="equipmentypename" label="设备类型" width=""></el-table-column>
        <el-table-column prop="statename" label="任务状态"></el-table-column>
        <el-table-column prop="createusername" label="创建人" width=""></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width="" :formatter="formatDate"></el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
            <el-button v-if="scope.row.statename === '待执行'" type="text" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button v-if="scope.row.statename === '待执行'" type="text" size="mini" @click="handleExamine(scope.$index, scope.row, 1)">提交审核</el-button>
            <el-button v-if="scope.row.statename === '待审核'" type="text" size="mini" @click="handleExamine(scope.$index, scope.row, 2)">审核</el-button>
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
            <el-form-item label="任务对象：" prop="TaskObject">
              <el-select v-model="addData.TaskObject">
                <el-option label="请选择" value=""></el-option>
                <el-option label="站点" value="1"></el-option>
                <el-option label="设备" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="任务批次：" prop="taskbatch">
              <el-input v-model="addData.taskbatch"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="完成时间：" prop="completetime">
              <el-date-picker v-model="addData.completetime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="center" style="margin-bottom: 20px">
          <el-button v-if="addData.TaskObject=='2'" @click="handleAddDevice" type="success" :disabled="table1Loading" :icon="table1Loading ? 'el-icon-loading' : 'el-icon-plus'">添加</el-button>
          <el-button v-else @click="handleSiteChoose" type="success" :disabled="table1Loading" :icon="table1Loading ? 'el-icon-loading' : 'el-icon-plus'">添加</el-button>
          <el-button @click="handleDelDevice" type="danger" :disabled="table1Loading" :icon="table1Loading ? 'el-icon-loading' : 'el-icon-delete'">删除</el-button>
        </div>
      </el-form>
      <el-table v-if="addData.TaskObject === '1'" :data="deviceList" v-loading="table1Loading" ref="table1" @selection-change="handleSelect1">
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
      <el-table v-else :data="deviceList" v-loading="table1Loading" ref="table1" @selection-change="handleSelect1">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template>
        </el-table-column>
        <el-table-column prop="cityname" label="城市" width=""></el-table-column>
        <el-table-column prop="areaname" label="区域" width=""></el-table-column>
        <el-table-column prop="resourcename" label="站点名称" width=""></el-table-column>
        <el-table-column prop="equipmenttypename" label="设备类型名称" width=""></el-table-column>
        <el-table-column prop="statename" label="设备状态" width=""></el-table-column>
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
        <el-tab-pane label="设备信息">
          <el-table :data="deviceInfo" v-loading="table1Loading" ref="">
            <el-table-column label="序号" width="50">
              <template slot-scope="scope">{{scope.$index+(currentPage2 - 1) * pageSize2 + 1}}</template>
            </el-table-column>
            <el-table-column prop="resourcename" label="站点名称"></el-table-column>
            <el-table-column prop="equipmenttypename" label="设备类型"></el-table-column>
            <el-table-column prop="cityname" label="城市"></el-table-column>
            <el-table-column prop="areaname" label="区域"></el-table-column>
            <el-table-column prop="statename" label="设备状态"></el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button v-if="showType == 1" type="text" size="mini" @click="showDeviceDetail(scope.$index, scope.row)">详情</el-button>
                <el-button v-if="showType == 2" type="text" size="mini" @click="showDeviceDetail(scope.$index, scope.row)">修改</el-button>
                <el-button v-if="showType == 2" type="text" size="mini" @click="DeviceDelete(scope.$index, scope.row)">删除</el-button>
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
                    <td><div class="cell">区域</div></td>
                    <td><div class="cell">{{ `${siteInfo.provincename} / ${siteInfo.cityname} / ${siteInfo.areaname}` }}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--站点编码-->
                  <tr class="el-table__row">
                    <td><div class="cell">站点编码</div></td>
                    <td><div class="cell">{{siteInfo.code}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--站点名称-->
                  <tr class="el-table__row">
                    <td><div class="cell">站点名称</div></td>
                    <td><div class="cell">{{siteInfo.name}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--站点类型-->
                  <tr class="el-table__row">
                    <td><div class="cell">站点类型</div></td>
                    <td><div class="cell">{{siteInfo.resourcetypename}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell">{{writeDic(DicList.resourcetype)}}</div></td>-->
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
                  <!--站点分类-->
                  <tr class="el-table__row">
                    <td><div class="cell">站点分类</div></td>
                    <td><div class="cell">{{siteInfo.classifyname}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell">{{writeDic(DicList.classify)}}</div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--原产权单位-->
                  <tr class="el-table__row">
                    <td><div class="cell">原产权单位</div></td>
                    <td v-show="showType == 2"><div class="cell">
                      <!--<el-form-item class="form-item">
                        <el-input v-model="siteInfo.rawpropertyrightunitname"></el-input>
                      </el-form-item>-->
                      <el-select v-model="siteInfo.rawpropertyrightunit" size="small">
                        <el-option label="请选择" value=""></el-option>
                        <el-option v-for="i in DicList.propertyrightunit" :key="i.value" :label="i.text" :value="i.value"></el-option>
                      </el-select>
                    </div></td>
                    <td v-if="showType == 1"><div class="cell">{{siteInfo.rawpropertyrightunitname}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell">{{writeDic(DicList.propertyrightunit)}}</div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--生命周期-->
                  <tr class="el-table__row">
                    <td><div class="cell">生命周期</div></td>
                    <td v-show="showType == 2"><div class="cell">
                      <el-form-item class="form-item">
                        <el-input v-model="siteInfo.lifecycle"></el-input>
                      </el-form-item>
                    </div></td>
                    <td v-if="showType == 1"><div class="cell">{{siteInfo.lifecycle}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--产权性质-->
                  <tr class="el-table__row">
                    <td><div class="cell">产权性质</div></td>
                    <td v-show="showType == 2"><div class="cell">
                      <el-form-item class="form-item">
                        <el-input v-model="siteInfo.propertyrights"></el-input>
                      </el-form-item>
                    </div></td>
                    <td v-if="showType == 1"><div class="cell">{{siteInfo.propertyrights}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--建站模式-->
                  <tr class="el-table__row">
                    <td><div class="cell">建站模式</div></td>
                    <td v-show="showType == 2"><div class="cell">
                      <el-form-item class="form-item">
                        <el-input v-model="siteInfo.websitebuildingmode"></el-input>
                      </el-form-item>
                    </div></td>
                    <td v-if="showType == 1"><div class="cell">{{siteInfo.websitebuildingmode}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--机房位置-->
                  <tr class="el-table__row">
                    <td><div class="cell">机房位置</div></td>
                    <td v-show="showType == 2"><div class="cell">
                      <el-form-item class="form-item">
                        <el-input v-model="siteInfo.computerroomposition"></el-input>
                      </el-form-item>
                    </div></td>
                    <td v-if="showType == 1"><div class="cell">{{siteInfo.computerroomposition}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--是否拉远站-->
                  <tr class="el-table__row">
                    <td><div class="cell"><i class="must">*</i>是否拉远站</div></td>
                    <td v-show="showType == 2">
                      <div class="cell">
                        <el-form-item class="form-item" prop="outstanding">
                          <el-select class="tableSelect" v-model="siteInfo.outstanding" size="mini">
                            <el-option label="请选择" value=""></el-option>
                            <el-option label="是" :value="true"></el-option>
                            <el-option label="否" :value="false"></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </td>
                    <td v-if="showType == 1"><div class="cell">{{siteInfo.outstanding ? '是' : '否'}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--站址地形-->
                  <tr class="el-table__row">
                    <td><div class="cell">站址地形</div></td>
                    <td v-show="showType == 2"><div class="cell">
                      <el-form-item class="form-item">
                        <el-input v-model="siteInfo.siteterrain"></el-input>
                      </el-form-item>
                    </div></td>
                    <td v-if="showType == 1"><div class="cell">{{siteInfo.siteterrain}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--覆盖场景-->
                  <tr class="el-table__row">
                    <td><div class="cell">覆盖场景</div></td>
                    <td v-show="showType == 2"><div class="cell">
                      <el-form-item class="form-item">
                        <el-input v-model="siteInfo.coversthescenario"></el-input>
                      </el-form-item>
                    </div></td>
                    <td v-if="showType == 1"><div class="cell">{{siteInfo.coversthescenario}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--合同签订主体-->
                  <tr class="el-table__row">
                    <td><div class="cell">合同签订主体</div></td>
                    <td v-show="showType == 2"><div class="cell">
                      <el-form-item class="form-item">
                        <el-input v-model="siteInfo.contractsigning"></el-input>
                      </el-form-item>
                    </div></td>
                    <td v-if="showType == 1"><div class="cell">{{siteInfo.contractsigning}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--移交批次-->
                  <tr class="el-table__row">
                    <td><div class="cell">移交批次</div></td>
                    <td v-show="showType == 2"><div class="cell">
                      <el-form-item class="form-item">
                        <el-input v-model="siteInfo.handoverbatch"></el-input>
                      </el-form-item>
                    </div></td>
                    <td v-if="showType == 1"><div class="cell">{{siteInfo.handoverbatch}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--是否共享-->
                  <tr class="el-table__row">
                    <td><div class="cell"><i class="must">*</i>是否共享</div></td>
                    <td v-show="showType == 2">
                      <div class="cell">
                        <el-form-item class="form-item" prop="shared">
                          <el-select class="tableSelect" v-model="siteInfo.shared" size="mini">
                            <el-option label="请选择" value=""></el-option>
                            <el-option label="是" :value="true"></el-option>
                            <el-option label="否" :value="false"></el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </td>
                    <td v-if="showType == 1"><div class="cell">{{siteInfo.shared ? '是' : '否'}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--共享单位-->
                  <tr class="el-table__row" v-if="siteInfo.shared === true || siteInfo.shared === '是' || siteInfo.shared === ''">
                    <td><div class="cell">共享单位</div></td>
                    <td v-show="showType == 2"><div class="cell">
                      <el-form-item class="form-item">
                        <el-input v-model="siteInfo.sharedunit"></el-input>
                      </el-form-item>
                    </div></td>
                    <td v-if="showType == 1"><div class="cell">{{siteInfo.sharedunit}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <tr class="el-table__row">
                    <td><div class="cell">资产识别码</div></td>
                    <td v-show="showType == 2"><div class="cell">
                      <el-form-item class="form-item">
                        <el-input v-model="siteInfo.identificationcode"></el-input>
                      </el-form-item>
                    </div></td>
                    <td v-if="showType == 1"><div class="cell">{{siteInfo.identificationcode}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--地址-->
                  <tr class="el-table__row">
                    <td><div class="cell">地址</div></td>
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
                  <tr class="el-table__row">
                    <td><div class="cell"><i class="must">*</i>经度</div></td>
                    <td v-show="showType == 2"><div class="cell">
                      <el-form-item class="form-item" prop="longitude">
                        <el-input v-model="siteInfo.longitude" @mousewheel.native.prevent type="number"></el-input>
                      </el-form-item>
                    </div></td>
                    <td v-show="showType == 1"><div class="cell">{{siteInfo.longitude}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--纬度-->
                  <tr class="el-table__row">
                    <td><div class="cell"><i class="must">*</i>纬度</div></td>
                    <td v-show="showType == 2"><div class="cell">
                      <el-form-item class="form-item" prop="latitude">
                        <el-input v-model="siteInfo.latitude" @mousewheel.native.prevent type="number"></el-input>
                      </el-form-item>
                    </div></td>
                    <td v-if="showType == 1"><div class="cell">{{siteInfo.latitude}}</div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--提交人-->
                  <tr class="el-table__row">
                    <td><div class="cell">提交人</div></td>
                    <td><div class="cell">
                      <el-form-item class="form-item">{{siteInfo.createusername}}</el-form-item>
                    </div></td>
                    <td><div class="cell"></div></td>
                    <!--<td><div class="cell"></div></td>-->
                    <td><div class="cell"></div></td>
                  </tr>
                  <!--创建时间-->
                  <tr class="el-table__row">
                    <td><div class="cell">创建时间</div></td>
                    <td><div class="cell">
                      <el-form-item class="form-item">{{siteInfo.createtime}}</el-form-item>
                    </div></td>
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
            <el-button v-if="showType == 2" @click="handleEditSite" type="primary" icon="el-icon-check">提交</el-button>
            <el-button @click="closeShowEdit" type="primary" icon="el-icon-arrow-left">返回</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="center" v-show="ViewTabIndex === '0'">
        <el-pagination @current-change="currentChange2" @size-change="SizeChange2" :current-page="currentPage2"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pageSize2" :total="total2"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
      <div class="center"  v-show="ViewTabIndex == 0">
        <el-button @click="closeShowEdit" type="primary" icon="el-icon-arrow-left">返回</el-button>
      </div>
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
      <ResourceList v-if="siteChoose" :isSite="addData.TaskObject" :resourcetype="1" :resource_id="currentSiteId" @chooseDevice="chooseDevice" @selectResource="selectResource"/>
      <deviceList v-if="deviceChoose" :resourcetype="1" :equipment_id="currentEquipmentId" @chooseDevice="chooseDevice"></deviceList>
      <TaskChargingPile v-if="showChargingPile" :DeviceID="DeviceID" :WriteState="WriteState"  @fatherOpenImgBox="OpenImgBox" @fatherClose="WriteClose"></TaskChargingPile>
      <TaskSwitchCabinet v-if="showSwitchCabinet" :DeviceID="DeviceID" :WriteState="WriteState"  @fatherOpenImgBox="OpenImgBox" @fatherClose="WriteClose"></TaskSwitchCabinet>
      <TaskReservepover v-if="showReservepover" :DeviceID="DeviceID" :WriteState="WriteState"  @fatherOpenImgBox="OpenImgBox" @fatherClose="WriteClose"></TaskReservepover>
      <TaskChangeBattery v-if="showChangeBattery" :DeviceID="DeviceID" :WriteState="WriteState"  @fatherOpenImgBox="OpenImgBox" @fatherClose="WriteClose"></TaskChangeBattery>
      <TaskOilFiredGenerator v-if="showOilFiredGenerator " :DeviceID="DeviceID" :WriteState="WriteState"  @fatherOpenImgBox="OpenImgBox" @fatherClose="WriteClose"></TaskOilFiredGenerator>
    </el-dialog>
    <ImgBox ref="ImgBox"></ImgBox>
  </div>
</template>

<script>
import {GlobalRes} from 'common/js/mixins'
import {DictionaryInfoList} from 'api/api'
import ResourceList from 'base/Resource/ResourceList'
import deviceList from 'base/Resource/deviceList'
import TaskChargingPile from 'base/TaskEquipment/TaskChargingPile'
import TaskSwitchCabinet from 'base/TaskEquipment/TaskSwitchCabinet'
import TaskReservepover from 'base/TaskEquipment/TaskReservepover'
import TaskChangeBattery from 'base/TaskEquipment/TaskChangeBattery'
import TaskOilFiredGenerator from 'base/TaskEquipment/TaskOilFiredGenerator'
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
      showType: 0, //  0:列表 1:查看 2:编辑 3:新增
      Query: {
        states: null,
        sourcetypes: null,
        resourcename: '',
        equipmentypename: ''
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
        equipment_id: [],
        TaskObject: ''
      },
      tableList: [], // 任务列表
      deviceList: [], // 任务设备列表
      deviceInfo: [], // 任务信息
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
        ],
        TaskObject: [
          {required: true, message: '请选择任务对象', trigger: 'change'}
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
      }
    }
  },
  activated () {
    this.getData1()
    this.initDictionariesArray()
  },
  methods: {
    initDictionariesArray () {
      let arr = ['资源任务来源类型', '任务状态', '设备产权单位']
      this.$axios.post(DictionaryInfoList, arr).then(res => {
        if (res.errorCode === '200') {
          this.DicList.sourcetypes = res.data.filter(i => {
            return i.type === '资源任务来源类型'
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
          } else {
            this.$message.error(res.msg)
          }
        })
      }
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
    handleEditSite  () {
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
    showDeviceDetail (index, row) {
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
    },
    selectResource (name, id) {
      this.showDialog = false
      this.addData.resource_id = id
      this.addData.resourcename = name
    }
  },
  watch: {
    deviceList (val) {
      if (this.addData.TaskObject === '1') {
        this.currentSiteId = val.map((item) => {
          return item.id
        })
        this.addData.resource_id = val.map((item) => {
          return item.id
        })
      } else if (this.addData.TaskObject === '2') {
        this.currentEquipmentId = val.map((item) => {
          return item.id
        })
        this.addData.equipment_id = val.map((item) => {
          return item.id
        })
      }
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
      }
    },
    'addData.TaskObject': function (newv, oldv) {
      if (!oldv) return
      if (newv !== oldv) {
        Object.assign(this.$data.addData, this.$options.data().addData)
        this.addData.TaskObject = newv
        this.deviceList = []
      }
    }
  },
  components: {
    layuiTitle,
    ResourceList,
    deviceList,
    TaskChargingPile,
    TaskSwitchCabinet,
    TaskReservepover,
    ImgBox,
    TaskChangeBattery,
    TaskOilFiredGenerator
  }
}
</script>

<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
