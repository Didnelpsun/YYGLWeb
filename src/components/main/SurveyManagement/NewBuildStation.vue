<template>
  <div v-loading="WriteLoading" style="margin:15px">
    <layuiTitle :title="SurveyInfo.state === 1 ? '编辑新建站' : '新建站详情'"></layuiTitle>
    <el-tabs class="content-card" v-model="ViewTabIndex">
      <el-tab-pane label="项目详情">
      <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--small">
        <!--表头-->
        <div class="el-table__header-wrapper">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
            <colgroup>
              <col width="100"/>
              <col width="230"/>
              <!-- <col width="400"/> -->
              <col width="100"/>
            </colgroup>
            <thead>
            <tr>
              <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
              <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
              <!-- <th colspan="1" rowspan="1" class="el-table_8_column_63     table-headerStyle"><div class="cell">字典</div></th> -->
              <th colspan="1" rowspan="1" class="el-table_8_column_64     table-headerStyle"><div class="cell">填写要求</div></th>
            </tr>
            </thead>
          </table>
        </div>
        <!--表体-->
        <el-form :model="tableData2" v-loading="WriteLoading">
        <div class="el-table__body-wrapper is-scrolling-none">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
            <colgroup>
              <col width="100"/>
              <col width="230"/>
              <!-- <col width="400"/> -->
              <col width="100"/>
            </colgroup>
            <tbody>
            <!--地市-->
            <tr class="el-table__row">
              <td><div class="cell">地市</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData2.cityname}}</div>
                </div>
              </td>
              <!-- <td></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--区域-->
            <tr class="el-table__row">
              <td><div class="cell">区域</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData2.areaname}}</div>
                </div>
              </td>
              <!-- <td></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--需求方-->
            <tr class="el-table__row">
              <td>
                <div class="cell">需求方</div>
              </td>
              <td>
                <div class="cell">
                  <div>{{tableData2.demandside}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--任务单号-->
            <tr class="el-table__row">
              <td>
                <div class="cell">任务单号</div>
              </td>
              <td>
                <div class="cell">
                  <div>{{tableData2.taskno}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--需求单号-->
            <tr class="el-table__row">
              <td>
                <div class="cell">需求单号</div>
              </td>
              <td>
                <div class="cell">
                  <div>{{tableData2.demandno}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--需求批次-->
            <tr class="el-table__row">
              <td>
                <div class="cell">需求批次</div>
              </td>
              <td>
                <div class="cell">
                  <div>{{tableData2.demandbatch}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--需求名称-->
            <tr class="el-table__row">
              <td>
                <div class="cell">需求名称</div>
              </td>
              <td>
                <div class="cell">
                  <div>{{tableData2.demandname}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--建站方式-->
            <tr class="el-table__row">
              <td><div class="cell">建站方式</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData2.constructionmodename}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--站点名称-->
            <tr class="el-table__row">
              <td>
                <div class="cell">站点名称</div>
              </td>
              <td>
                <div class="cell">
                  <div>{{tableData2.resourcename}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--站点编码-->
            <tr class="el-table__row">
              <td><div class="cell">站点编码</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData2.resourcecode}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--原运营商-->
            <tr class="el-table__row">
              <td><div class="cell">原运营商</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData2.rawoperator}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--审核状态-->
            <tr class="el-table__row">
              <td><div class="cell">审核状态</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData2.taskstatename}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--规划经度-->
            <tr class="el-table__row">
              <td><div class="cell">需求经度</div></td>
              <td @click="OpenMap(0, true)">
                <div class="cell location">
                  <div><span>{{tableData2.planninglongitude}}<i class="el-icon-location icon_location"></i></span></div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--规划纬度-->
            <tr class="el-table__row">
              <td><div class="cell">需求纬度</div></td>
              <td @click="OpenMap(0, true)">
                <div class="cell">
                  <div>{{tableData2.planninglatitude}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--覆盖范围-->
            <tr class="el-table__row">
              <td><div class="cell">覆盖范围</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData2.coverage}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--新建建设区域-->
            <tr class="el-table__row">
              <td><div class="cell">新建建设区域</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData2.createconstructionarea}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--数据热点区域-->
            <tr class="el-table__row">
              <td><div class="cell">数据热点区域</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData2.hotdataarea}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--覆盖目标-->
            <tr class="el-table__row">
              <td><div class="cell">覆盖目标</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData2.coveringtarget}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--存量筛查结果-->
            <!--<tr class="el-table__row">
              <td><div class="cell">存量筛查结果</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData2.stockstationresults}}</div>
                </div>
              </td>
              &lt;!&ndash; <td><div class="cell"></div></td> &ndash;&gt;
              <td><div class="cell"></div></td>
            </tr>-->
            <!--最近站点编码-->
            <tr class="el-table__row">
              <td><div class="cell">最近站点编码</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData2.recentlyresourcecode}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            </tbody>
          </table>
        </div>
        </el-form>
      </div>
      </el-tab-pane>
      <el-tab-pane label="基本情况" v-if="SurveyInfo.taskstate">
      <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--small">
        <!--表头-->
        <div class="el-table__header-wrapper">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
            <colgroup>
              <col width="100"/>
              <col width="230"/>
              <!-- <col width="400"/> -->
              <col width="100"/>
            </colgroup>
            <thead>
            <tr>
              <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
              <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
              <!-- <th colspan="1" rowspan="1" class="el-table_8_column_63     table-headerStyle"><div class="cell">字典</div></th> -->
              <th colspan="1" rowspan="1" class="el-table_8_column_64     table-headerStyle"><div class="cell">填写要求</div></th>
            </tr>
            </thead>

          </table>
        </div>
        <!--表体-->
        <el-form :model="tableData" :rules="Rules1" v-loading="WriteLoading" ref="WriteForm1" label-width="0">
        <div class="el-table__body-wrapper is-scrolling-none">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
            <colgroup>
              <col width="100"/>
              <col width="230"/>
              <!-- <col width="400"/> -->
              <col width="100"/>
            </colgroup>
            <tbody>
            <!--基站地址-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>基站地址</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="resourceaddress">
                  <el-input v-model="tableData.resourceaddress"></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState === 2"><div class="cell">{{tableData.resourceaddress}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <!--地理环境-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>地理环境</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="geographic">
                  <el-select v-model="tableData.geographic">
                    <el-option label="请选择" :value="null"></el-option>
                    <el-option v-for="i in DicList.geographic" :key="i.id" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-show="WriteState === 2"><div class="cell">{{tableData.geographicname}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <!--建站模式-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>建站模式</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="websitebuildingmode">
                  <el-select v-model="tableData.websitebuildingmode">
                    <el-option label="请选择" :value="null"></el-option>
                    <el-option v-for="i in DicList.websitebuildingmode" :key="i.id" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-show="WriteState === 2"><div class="cell">{{tableData.websitebuildingmodename}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <!--覆盖场景-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>覆盖场景</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="coversscenario">
                  <el-select v-model="tableData.coversscenario">
                    <el-option label="请选择" :value="null"></el-option>
                    <el-option v-for="i in DicList.coversscenario" :key="i.id" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-show="WriteState === 2"><div class="cell">{{tableData.coversscenarioname}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <!--实际经度-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>实际经度</div></td>
              <td v-show="WriteState !== 2" @click="OpenMap(1)"><div class="cell">
                <el-form-item class="form-item" prop="realitylongitude">
                  <el-input v-model="tableData.realitylongitude" readonly style="width: 80%"></el-input>
                  <i class="el-icon-location" style="font-size: 20px;color:#F64245;"></i>
                </el-form-item>
              </div></td>
              <td v-show="WriteState == 2" @click="OpenMap(0)">
                <div class="cell location"><span>{{tableData.realitylongitude}}</span><i class="el-icon-location icon_location"></i></div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <!--实际纬度-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>实际纬度</div></td>
              <td v-show="WriteState !== 2" @click="OpenMap(1)"><div class="cell">
                <el-form-item class="form-item" prop="realitylatitude">
                  <el-input v-model="tableData.realitylatitude" readonly style="width: 80%"></el-input>
                </el-form-item>
              </div></td>
              <td v-show="WriteState == 2" @click="OpenMap(0)">
                <div class="cell">{{tableData.realitylatitude}}</div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <!--与需求偏移距离-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>与规划偏移距离(米)</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.demanddistance}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>本次需求归属运营商</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="ownedoperator">
                  <el-select v-model="tableData.ownedoperator" multiple placeholder="请选择" size="small">
                    <!--<el-option label="请选择" :value="0"></el-option>-->
                    <el-option v-for="i in DicList.ownedoperator" :key="i.text" :label="i.text" :value="i.text"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-show="WriteState == 2"><div class="cell">{{tableData.ownedoperator}}</div></td>
              <!--<td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <!--最近站点-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>最近站点</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.recentlyresourcename}}</div>
                  <div v-show="WriteState !== 2" @click="showDialog">
                    <el-form-item class="form-item" prop="recentlyresourcename">
                      <el-input v-model="tableData.recentlyresourcename" readonly placeholder="请选择"></el-input>
                    </el-form-item>
                  </div></div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <!--与存量站之间的距离-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>与存量站之间的距离(米)</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.resourcedistance}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            </tbody>
          </table>
        </div>
        </el-form>
      </div>
      </el-tab-pane>
      <el-tab-pane label="站点情况" v-if="SurveyInfo.taskstate">
      <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--small">
        <!--表头-->
        <div class="el-table__header-wrapper">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
            <colgroup>
              <col width="100"/>
              <col width="230"/>
              <!-- <col width="400"/> -->
              <col width="100"/>
            </colgroup>
            <thead>
            <tr>
              <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
              <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
              <!-- <th colspan="1" rowspan="1" class="el-table_8_column_63     table-headerStyle"><div class="cell">字典</div></th> -->
              <th colspan="1" rowspan="1" class="el-table_8_column_64     table-headerStyle"><div class="cell">填写要求</div></th>
            </tr>
            </thead>
          </table>
        </div>
        <!--表体-->
        <el-form :model="tableData" v-loading="WriteLoading" :rules="Rules2" ref="WriteForm2" label-width="0">
        <div class="el-table__body-wrapper is-scrolling-none">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
            <colgroup>
              <col width="100"/>
              <col width="230"/>
              <!-- <col width="400"/> -->
              <col width="100"/>
            </colgroup>
            <tbody>
            <template v-if="tableData.websitebuildingmode===1">
            <!--建筑物类型-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>建筑物类型</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="buildingtype">
                    <el-input v-model="tableData.buildingtype"></el-input>
                  </el-form-item>
                </div></td>
                <td v-if="WriteState === 2"><div class="cell">{{tableData.buildingtype}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
            <!--是否能够获取楼面结构情况-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>是否能够获取楼面结构情况</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="floorstructurecondition">
                    <el-select v-model="tableData.floorstructurecondition">
                      <el-option label="请选择" :value="null"></el-option>
                      <el-option label="是" :value="true"></el-option>
                      <el-option label="否" :value="false"></el-option>
                    </el-select>
                  </el-form-item>
                </div></td>
                <td v-if="WriteState === 2"><div class="cell">{{tableData.floorstructurecondition === null ? '' : tableData.floorstructurecondition ? '是' : '否'}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
            <!--维护是否方便-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>维护是否方便</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="maintenancefriendly">
                    <el-select v-model="tableData.maintenancefriendly">
                      <el-option label="请选择" :value="null"></el-option>
                      <el-option label="是" :value="true"></el-option>
                      <el-option label="否" :value="false"></el-option>
                    </el-select>
                  </el-form-item>
                </div></td>
                <td v-if="WriteState === 2"><div class="cell">{{tableData.maintenancefriendly === null ? '' : tableData.maintenancefriendly ? '是' : '否'}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
            <!--建筑总楼层-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>建筑总楼层</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="mainbuildingfloor">
                    <el-input v-model="tableData.mainbuildingfloor"></el-input>
                  </el-form-item>
                </div></td>
                <td v-if="WriteState === 2"><div class="cell">{{tableData.mainbuildingfloor}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
            <!--机房所在楼层-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>机房所在楼层</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="computerroomfloor">
                    <el-input v-model="tableData.computerroomfloor"></el-input>
                  </el-form-item>
                </div></td>
                <td v-if="WriteState === 2"><div class="cell">{{tableData.computerroomfloor}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
            <!--塔桅所在楼层-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>塔桅所在楼层</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="towermastfloor">
                    <el-input v-model="tableData.towermastfloor"></el-input>
                  </el-form-item>
                </div></td>
                <td v-if="WriteState === 2"><div class="cell">{{tableData.towermastfloor}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
            <!--楼面安全评估-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>楼面安全评估</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="floorsafetyassessment">
                    <el-input v-model="tableData.floorsafetyassessment"></el-input>
                  </el-form-item>
                </div></td>
                <td v-if="WriteState === 2"><div class="cell">{{tableData.floorsafetyassessment}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
            <!--新建塔型-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>新建塔型</div></td>
                <td v-if="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="newtower">
                    <el-select v-model="tableData.newtower" multiple placeholder="请选择" size="small">
                      <!--<el-option label="请选择" :value="0"></el-option>-->
                      <el-option v-for="i in DicList.newtower" :key="i.text" :label="i.text" :value="i.text"></el-option>
                    </el-select>
                  </el-form-item>
                </div></td>
                <td v-if="WriteState == 2"><div class="cell">{{tableData.newtower instanceof Array ? '' : tableData.newtower}}</div></td>
                <!--<td><div class="cell"></div></td>-->
                <td><div class="cell"></div></td>
              </tr>
            </template>
            <template v-if="tableData.websitebuildingmode===2">
            <!--是否存在危险源-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>是否存在危险源</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="existinghazard">
                    <el-select v-model="tableData.existinghazard">
                      <el-option label="请选择" :value="null"></el-option>
                      <el-option label="是" :value="true"></el-option>
                      <el-option label="否" :value="false"></el-option>
                    </el-select>
                  </el-form-item>
                </div></td>
                <td v-if="WriteState === 2"><div class="cell">{{tableData.existinghazard === null ? '' : tableData.existinghazard ? '是' : '否'}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
            <!--是否在河道/铁路/高速附近-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>是否在河道/铁路/高速附近</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="theriver">
                    <el-select v-model="tableData.theriver">
                      <el-option label="请选择" :value="null"></el-option>
                      <el-option label="是" :value="true"></el-option>
                      <el-option label="否" :value="false"></el-option>
                    </el-select>
                  </el-form-item>
                </div></td>
                <td v-if="WriteState === 2"><div class="cell">{{tableData.theriver === null ? '' : tableData.theriver ? '是' : '否'}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
            <!--地势低洼-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>地势低洼</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="lowlying">
                    <el-select v-model="tableData.lowlying">
                      <el-option label="请选择" :value="null"></el-option>
                      <el-option label="是" :value="true"></el-option>
                      <el-option label="否" :value="false"></el-option>
                    </el-select>
                  </el-form-item>
                </div></td>
                <td v-if="WriteState === 2"><div class="cell">{{tableData.lowlying === null ? '' : tableData.lowlying ? '是' : '否'}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
            <!--是否需要护坡/挡土墙-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>是否需要护坡/挡土墙</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="needrevetment">
                    <el-select v-model="tableData.needrevetment">
                      <el-option label="请选择" :value="null"></el-option>
                      <el-option label="是" :value="true"></el-option>
                      <el-option label="否" :value="false"></el-option>
                    </el-select>
                  </el-form-item>
                </div></td>
                <td v-if="WriteState === 2"><div class="cell">{{tableData.needrevetment === null ? '' : tableData.needrevetment ? '是' : '否'}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
            <!--是否需要修建围墙-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>是否需要修建围墙</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="buildwall">
                    <el-select v-model="tableData.buildwall">
                      <el-option label="请选择" :value="null"></el-option>
                      <el-option label="是" :value="true"></el-option>
                      <el-option label="否" :value="false"></el-option>
                    </el-select>
                  </el-form-item>
                </div></td>
                <td v-if="WriteState === 2"><div class="cell">{{tableData.buildwall === null ? '' : tableData.buildwall ? '是' : '否'}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
            <!--是否需要修建道路-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>是否需要修建道路</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="buildroads">
                    <el-select v-model="tableData.buildroads">
                      <el-option label="请选择" :value="null"></el-option>
                      <el-option label="是" :value="true"></el-option>
                      <el-option label="否" :value="false"></el-option>
                    </el-select>
                  </el-form-item>
                </div></td>
                <td v-if="WriteState === 2"><div class="cell">{{tableData.buildroads === null ? '' : tableData.buildroads ? '是' : '否'}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
            <!--是否需要二次搬运-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>是否需要二次搬运</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="secondaryhandling">
                    <el-select v-model="tableData.secondaryhandling">
                      <el-option label="请选择" :value="null"></el-option>
                      <el-option label="是" :value="true"></el-option>
                      <el-option label="否" :value="false"></el-option>
                    </el-select>
                  </el-form-item>
                </div></td>
                <td v-if="WriteState === 2"><div class="cell">{{tableData.secondaryhandling === null ? '' : tableData.secondaryhandling ? '是' : '否'}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
            <!--是否需要接地外引-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>是否需要接地外引</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="Irfpagrounding">
                    <el-select v-model="tableData.Irfpagrounding">
                      <el-option label="请选择" :value="null"></el-option>
                      <el-option label="是" :value="true"></el-option>
                      <el-option label="否" :value="false"></el-option>
                    </el-select>
                  </el-form-item>
                </div></td>
                <td v-if="WriteState === 2"><div class="cell">{{tableData.Irfpagrounding === null ? '' : tableData.Irfpagrounding ? '是' : '否'}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
            <!--是否有较深垃圾回填土质-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>是否有较深垃圾回填土质</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="backfillsoil">
                    <el-select v-model="tableData.backfillsoil">
                      <el-option label="请选择" :value="null"></el-option>
                      <el-option label="是" :value="true"></el-option>
                      <el-option label="否" :value="false"></el-option>
                    </el-select>
                  </el-form-item>
                </div></td>
                <td v-if="WriteState === 2"><div class="cell">{{tableData.backfillsoil === null ? '' : tableData.backfillsoil ? '是' : '否'}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
            <!--施工吊装机械是否可用入场-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>施工吊装机械是否可用入场</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="hoistingmachinery">
                    <el-select v-model="tableData.hoistingmachinery">
                      <el-option label="请选择" :value="null"></el-option>
                      <el-option label="是" :value="true"></el-option>
                      <el-option label="否" :value="false"></el-option>
                    </el-select>
                  </el-form-item>
                </div></td>
                <td v-if="WriteState === 2"><div class="cell">{{tableData.hoistingmachinery === null ? '' : tableData.hoistingmachinery ? '是' : '否'}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
            <!--施工空间是否足够-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>施工空间是否足够</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="constructionspace">
                    <el-select v-model="tableData.constructionspace">
                      <el-option label="请选择" :value="null"></el-option>
                      <el-option label="是" :value="true"></el-option>
                      <el-option label="否" :value="false"></el-option>
                    </el-select>
                  </el-form-item>
                </div></td>
                <td v-if="WriteState === 2"><div class="cell">{{tableData.constructionspace === null ? '' : tableData.constructionspace ? '是' : '否'}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
            <!--是否需要地勘-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>是否需要地勘</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="geologicalexploration">
                    <el-select v-model="tableData.geologicalexploration">
                      <el-option label="请选择" :value="null"></el-option>
                      <el-option label="是" :value="true"></el-option>
                      <el-option label="否" :value="false"></el-option>
                    </el-select>
                  </el-form-item>
                </div></td>
                <td v-if="WriteState === 2"><div class="cell">{{tableData.geologicalexploration === null ? '' : tableData.geologicalexploration ? '是' : '否'}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
            <!--新建塔型-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>新建塔型</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="newtower">
                    <el-select v-model="tableData.newtower">
                      <el-option label="请选择" :value="null"></el-option>
                      <el-option v-for="i in DicList.newtower" :key="i.id" :label="i.text" :value="i.text"></el-option>
                    </el-select>
                  </el-form-item>
                </div></td>
                <td v-show="WriteState === 2"><div class="cell">{{tableData.newtower}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
            </template>
            </tbody>
          </table>
        </div>
        </el-form>
      </div>
      </el-tab-pane>
      <el-tab-pane label="铁塔情况" v-if="SurveyInfo.taskstate">
      <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--small">
        <!--表头-->
        <div class="el-table__header-wrapper">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
            <colgroup>
              <col width="100"/>
              <col width="230"/>
              <!-- <col width="400"/> -->
              <col width="100"/>
            </colgroup>
            <thead>
            <tr>
              <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
              <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
              <!-- <th colspan="1" rowspan="1" class="el-table_8_column_63     table-headerStyle"><div class="cell">字典</div></th> -->
              <th colspan="1" rowspan="1" class="el-table_8_column_64     table-headerStyle"><div class="cell">填写要求</div></th>
            </tr>
            </thead>
          </table>
        </div>
        <!--表体-->
        <el-form :model="tableData" v-loading="WriteLoading" :rules="Rules3" ref="WriteForm3" label-width="0">
        <div class="el-table__body-wrapper is-scrolling-none">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
            <colgroup>
              <col width="100"/>
              <col width="230"/>
              <!-- <col width="400"/> -->
              <col width="100"/>
            </colgroup>
            <tbody>
            <template v-if="tableData.websitebuildingmode === 1">
            <!--楼面站拟建楼面高度（米）-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>楼面站拟建楼面高度（米）</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="floorheight">
                    <el-input v-model="tableData.floorheight"></el-input>
                  </el-form-item>
                </div></td>
                <td v-if="WriteState === 2"><div class="cell">{{tableData.floorheight}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
            <!--楼面站拟建塔桅数量，高度（米），及塔型-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>楼面站拟建塔桅数量</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="towermastnumber">
                    <el-input v-model="tableData.towermastnumber"></el-input>
                  </el-form-item>
                </div></td>
                <td v-if="WriteState === 2"><div class="cell">{{tableData.towermastnumber}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>楼面站拟建塔桅高度(米)</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="towermastheight">
                    <el-input v-model="tableData.towermastheight"></el-input>
                  </el-form-item>
                </div></td>
                <td v-if="WriteState === 2"><div class="cell">{{tableData.towermastheight}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>楼面站拟建塔桅塔型</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="towermasttype">
                    <el-input v-model="tableData.towermasttype"></el-input>
                  </el-form-item>
                </div></td>
                <td v-if="WriteState === 2"><div class="cell">{{tableData.towermasttype}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
            </template>
            <template v-if="tableData.websitebuildingmode === 2">
            <!--地面站拟建塔桅数量、高度（米）、及塔型-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>地面站拟建塔桅数量</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="towermastnumber">
                    <el-input v-model="tableData.towermastnumber"></el-input>
                  </el-form-item>
                </div></td>
                <td v-if="WriteState === 2"><div class="cell">{{tableData.towermastnumber}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>地面站拟建塔桅高度(米)</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="towermastheight">
                    <el-input v-model="tableData.towermastheight"></el-input>
                  </el-form-item>
                </div></td>
                <td v-if="WriteState === 2"><div class="cell">{{tableData.towermastheight}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>地面站拟建塔桅塔型</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="towermasttype">
                    <el-input v-model="tableData.towermasttype"></el-input>
                  </el-form-item>
                </div></td>
                <td v-if="WriteState === 2"><div class="cell">{{tableData.towermasttype}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
            <!--地面站拟建场地山高（米），平面填零-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>地面站拟建场地山高（米），平面填零</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="sitegrowtaller">
                    <el-input v-model="tableData.sitegrowtaller"></el-input>
                  </el-form-item>
                </div></td>
                <td v-if="WriteState === 2"><div class="cell">{{tableData.sitegrowtaller}}</div></td>
                <td><div class="cell"></div></td>
              </tr>
            </template>
            </tbody>
          </table>
        </div>
        </el-form>
      </div>
      </el-tab-pane>
      <el-tab-pane label="机房情况" v-if="SurveyInfo.taskstate">
      <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--small">
        <!--表头-->
        <div class="el-table__header-wrapper">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
            <colgroup>
              <col width="100"/>
              <col width="230"/>
              <!-- <col width="400"/> -->
              <col width="100"/>
            </colgroup>
            <thead>
            <tr>
              <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
              <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
              <!-- <th colspan="1" rowspan="1" class="el-table_8_column_63     table-headerStyle"><div class="cell">字典</div></th> -->
              <th colspan="1" rowspan="1" class="el-table_8_column_64     table-headerStyle"><div class="cell">填写要求</div></th>
            </tr>
            </thead>
          </table>
        </div>
        <!--表体-->
        <el-form :model="tableData" v-loading="WriteLoading" :rules="Rules4" ref="WriteForm4" label-width="0">
        <div class="el-table__body-wrapper is-scrolling-none">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
            <colgroup>
              <col width="100"/>
              <col width="230"/>
              <!-- <col width="400"/> -->
              <col width="100"/>
            </colgroup>
            <tbody>
            <!--拟建机房类型-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>拟建机房类型</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="roomtype">
                  <el-select v-model="tableData.roomtype">
                    <el-option label="请选择" :value="null"></el-option>
                    <el-option v-for="i in DicList.roomtype" :key="i.id" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-show="WriteState === 2"><div class="cell">{{tableData.roomtypename}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <!--拟建机房细分类型-->
            <tr class="el-table__row" v-if="tableData.roomtype === 5">
              <td><div class="cell"><i class="must">*</i>拟建机房细分类型</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="roomsubdividetype">
                  <el-select v-model="tableData.roomsubdividetype">
                    <el-option label="请选择" :value="null"></el-option>
                    <el-option v-for="i in DicList.roomsubdividetype" :key="i.id" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-show="WriteState === 2"><div class="cell">{{tableData.roomsubdividetypename}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-if="tableData.roomtype === 1 || tableData.roomtype === 3 || tableData.roomtype === 4 || tableData.roomtype === 7">
              <td><div class="cell"><i class="must">*</i>拟建机房产权</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="roomproperty">
                  <el-select v-model="tableData.roomproperty">
                    <el-option label="请选择" :value="null"></el-option>
                    <el-option v-for="i in DicList.roomproperty" :key="i.id" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-show="WriteState === 2"><div class="cell">{{tableData.roompropertyname}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <!--拟建机房尺寸-->
            <tr class="el-table__row" v-if="tableData.roomtype !== 5 && tableData.roomtype !== 6">
              <td><div class="cell"><i class="must">*</i>拟建机房尺寸</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="roomsize">
                  <el-input v-model="tableData.roomsize"></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState === 2"><div class="cell">{{tableData.roomsize}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            </tbody>
          </table>
        </div>
        </el-form>
      </div>
      </el-tab-pane>
      <el-tab-pane label="外电引入" v-if="SurveyInfo.taskstate">
      <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--small">
        <!--表头-->
        <div class="el-table__header-wrapper">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
            <colgroup>
              <col width="100"/>
              <col width="230"/>
              <!-- <col width="400"/> -->
              <col width="100"/>
            </colgroup>
            <thead>
            <tr>
              <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
              <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
              <!-- <th colspan="1" rowspan="1" class="el-table_8_column_63     table-headerStyle"><div class="cell">字典</div></th> -->
              <th colspan="1" rowspan="1" class="el-table_8_column_64     table-headerStyle"><div class="cell">填写要求</div></th>
            </tr>
            </thead>
          </table>
        </div>
        <!--表体-->
        <el-form :model="tableData" v-loading="WriteLoading" :rules="Rules5" ref="WriteForm5" label-width="0">
        <div class="el-table__body-wrapper is-scrolling-none">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
            <colgroup>
              <col width="100"/>
              <col width="230"/>
              <!-- <col width="400"/> -->
              <col width="100"/>
            </colgroup>
            <tbody>
            <!--原有引入类型-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>引入类型</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="introducetype">
                  <el-select v-model="tableData.introducetype">
                    <el-option label="请选择" :value="null"></el-option>
                    <el-option v-for="i in DicList.introducetype" :key="i.id" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-show="WriteState === 2"><div class="cell">{{tableData.introducetypename}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <!--原有引入电压-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>引入电压</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="introducevoltage">
                  <el-select v-model="tableData.introducevoltage">
                    <el-option label="请选择" :value="null"></el-option>
                    <el-option v-for="i in DicList.introducevoltage" :key="i.id" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-show="WriteState === 2"><div class="cell">{{tableData.introducevoltagename}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <!--引入距离-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>引入距离</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="introducedistance">
                  <el-input v-model.number="tableData.introducedistance"></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState === 2"><div class="cell">{{tableData.introducedistance}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            </tbody>
          </table>
        </div>
        </el-form>
      </div>
      </el-tab-pane>
      <el-tab-pane label="特殊情况" v-if="SurveyInfo.taskstate">
      <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--small">
        <!--表头-->
        <div class="el-table__header-wrapper">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
            <colgroup>
              <col width="100"/>
              <col width="230"/>
              <!-- <col width="400"/> -->
              <col width="100"/>
            </colgroup>
            <thead>
            <tr>
              <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
              <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
              <!-- <th colspan="1" rowspan="1" class="el-table_8_column_63     table-headerStyle"><div class="cell">字典</div></th> -->
              <th colspan="1" rowspan="1" class="el-table_8_column_64     table-headerStyle"><div class="cell">填写要求</div></th>
            </tr>
            </thead>
          </table>
        </div>
        <!--表体-->
        <el-form :model="tableData" v-loading="WriteLoading" label-width="0">
        <div class="el-table__body-wrapper is-scrolling-none">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
            <colgroup>
              <col width="100"/>
              <col width="230"/>
              <!-- <col width="400"/> -->
              <col width="100"/>
            </colgroup>
            <tbody>
             <!--特殊情况说明-->
             <tr class="el-table__row">
               <td><div class="cell">特殊情况说明</div></td>
               <td v-show="WriteState !== 2"><div class="cell">
                 <el-form-item class="form-item" prop="special">
                   <el-input v-model.number="tableData.special"></el-input>
                 </el-form-item>
               </div></td>
               <td v-if="WriteState === 2"><div class="cell">{{tableData.special}}</div></td>
               <td><div class="cell"></div></td>
             </tr>
            </tbody>
          </table>
        </div>
        </el-form>
      </div>
      </el-tab-pane>
      <el-tab-pane label="勘察图片" v-if="SurveyInfo.taskstate">
      <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--small">
        <!--表头-->
        <div class="el-table__header-wrapper">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
            <colgroup>
              <col width="100"/>
              <col width="230"/>
              <!-- <col width="400"/> -->
              <col width="100"/>
            </colgroup>
            <thead>
            <tr>
              <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
              <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
              <!-- <th colspan="1" rowspan="1" class="el-table_8_column_63     table-headerStyle"><div class="cell">字典</div></th> -->
              <th colspan="1" rowspan="1" class="el-table_8_column_64     table-headerStyle"><div class="cell">填写要求</div></th>
            </tr>
            </thead>
          </table>
        </div>
        <!--表体-->
        <el-form :model="tableData" v-loading="WriteLoading">
        <div class="el-table__body-wrapper is-scrolling-none">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
            <colgroup>
              <col width="100"/>
              <col width="230"/>
              <!-- <col width="400"/> -->
              <col width="100"/>
            </colgroup>
            <tbody>
            <!--360环境照片-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>360环境照片</div></td>
              <td>
                <div class="cell" @click="OpenImgBox('environment')">
                  {{formatString(tableData.environment)}}
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--机房建设照片-->
            <tr class="el-table__row">
              <td><div class="cell">机房建设照片</div></td>
              <td>
                <div class="cell" @click="OpenImgBox('housingconstruction')">
                  {{formatString(tableData.housingconstruction)}}
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--塔桅及天面照片-->
            <tr class="el-table__row">
              <td><div class="cell">塔桅及天面照片</div></td>
              <td>
                <div class="cell" @click="OpenImgBox('roofing')">
                  {{formatString(tableData.roofing)}}
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--现场勘察图片-->
            <tr class="el-table__row">
              <td><div class="cell">勘察草图</div></td>
              <td>
                <div class="cell" @click="OpenImgBox('sketch')">
                  {{formatString(tableData.sketch)}}
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--电表照片-->
            <tr class="el-table__row">
              <td><div class="cell">电表照片</div></td>
              <td>
                <div class="cell" @click="OpenImgBox('electricmeterimg')">
                  {{formatString(tableData.electricmeterimg)}}
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
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
      <el-button v-if="WriteState === 1" @click="SubmitAuit" type="primary" icon="el-icon-back">提交审核</el-button>
      <el-button v-if="WriteState === 1" @click="SubmitSave" type="primary" icon="el-icon-back">保存</el-button>
      <el-button @click="closeWrite" type="primary" icon="el-icon-back">返回</el-button>
      <el-button type="warning" @click="subAuit(2)" v-if="SurveyInfoType===2">审核退回</el-button>
      <el-button type="success" @click="subAuit(1)" v-if="SurveyInfoType===2">审核通过</el-button>
    </div>
    <ImgBox ref="ImgBox"></ImgBox>
    <EnvironmentImgBox ref="EnvironmentImgBox"></EnvironmentImgBox>
    <el-dialog title="审核退回" v-loading="dialogLoading" :visible.sync="auitShow" center width="30%" @close="auitClose">
      <el-form :data="auitData">
        <el-row style="margin-bottom:15px">
          <el-form-item label="审核意见：">
            <el-input type="textarea" :autosize="{ minRows: 2 }" placeholder="请输入审核意见，退回必填" v-model="auitData.remark"></el-input>
          </el-form-item>
        </el-row>
        <el-row type="flex" justify="center">
          <el-button type="success" @click="handleAuit(2)">提交</el-button>
          <el-button type="primary" @click="auitShow = false">返回</el-button>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog title="审核通过" v-loading="dialogLoading" :visible.sync="auitPassShow" center width="30%" @close="auitPassClose">
      <el-form :data="auitData">
        <el-row style="margin-bottom:15px">
          <el-form-item label="需求单号：" v-if="tableData2.taskstatename === '地市审核'">
            <el-input v-model="auitData.demandno" placeholder="请输入需求单号"></el-input>
          </el-form-item>
        </el-row>
        <el-row style="margin-bottom:15px">
          <el-form-item label="审核意见：">
            <el-input type="textarea" :autosize="{ minRows: 2 }" placeholder="请输入审核意见，退回必填" v-model="auitData.remark"></el-input>
          </el-form-item>
        </el-row>
        <el-row type="flex" justify="center">
          <el-button type="success" @click="handleAuit(1)">提交</el-button>
          <el-button type="primary" @click="auitPassShow = false">返回</el-button>
        </el-row>
      </el-form>
    </el-dialog>
    <GoogleMap v-if="showMap" ref="GoogleMap" @fatherGetData="getMapData"></GoogleMap>

    <el-dialog top="1%" :visible.sync="isShow" title="选择站点" width="80%" :before-close="DialogClose">
      <ResourceList v-if="isShow" :lng="tableData.realitylongitude" :lat="tableData.realitylatitude" @selectResource="selectResource"/>
    </el-dialog>
  </div>
</template>

<script>
import GoogleMap from 'base/GoogleMap'
import { GetProjectInfo, GetNewResourceCensusInfo, AuitTask, GetDistance, GetInvestigateImgConfigurationList, UpdateNewResourceCensus, GetNewResourceSubmitAuit } from 'api/SurveyManagement'
import {DictionaryInfoList} from 'api/api'
import ImgBox from 'base/SurveyImgBox'
import EnvironmentImgBox from 'base/EnvironmentImgBox'
import {mapGetters} from 'vuex'
import ResourceList from 'base/SurveyManagement/ResourceList'
import layuiTitle from 'base/layui-title'
import {GlobalRes} from 'common/js/mixins'

export default {
  name: 'NewBuildStationDe',
  mixins: [GlobalRes],
  data () {
    return {
      ViewTabIndex: '0',
      WriteLoading: false,
      WriteState: null,
      showMap: false,
      isShow: false,
      DicList: {},
      SurveyInfo: {},
      // 项目属性
      tableData2: {
        // 地市
        cityname: '',
        // 区域
        areaname: '',
        // 需求方
        demandside: '',
        // 需求单号
        demandno: '',
        // 需求名称
        demandname: '',
        // 需求批次
        demandbatch: '',
        // 建站方式
        constructionmodename: '',
        // 站点名称
        resourcename: '',
        // 站点编码
        resourcecode: '',
        // 原运营商
        rawoperator: '',
        // 审核状态
        taskstatename: '',
        // 规划经度
        planninglongitude: '',
        // 规划纬度
        planninglatitude: '',
        // 覆盖范围
        coverage: '',
        // 新增建设区域
        createconstructionarea: '',
        // 数据热点区域
        hotdataarea: '',
        // 覆盖目标
        coveringtarget: '',
        // 存量筛查结果
        // stockstationresults: '',
        // 存量站筛查站点编码
        recentlyresourcecode: ''
      },
      // 新建站表格相关属性
      tableData: {
        // 基站地址
        resourceaddress: '',
        // 地理环境
        geographicname: '',
        geographic: null,
        // 建站模式
        websitebuildingmode: null,
        // 覆盖场景
        coversscenario: '',
        // 实际经度
        realitylongitude: '',
        // 实际纬度
        realitylatitude: '',
        // 与需求偏移距离
        demanddistance: null,
        // 归属运营商
        ownedoperator: [],
        // 最近站点
        recentlyresourcename: '',
        recentlyresource: '',
        // 与存量站之间的距离
        resourcedistance: null,
        // 建筑物类型
        buildingtype: '',
        // 是否能获取楼面结构情况
        floorstructurecondition: null,
        // 维护是否方便
        maintenancefriendly: null,
        // 建筑总楼层
        mainbuildingfloor: '',
        // 机房所在楼层
        computerroomfloor: '',
        // 塔桅所在楼层
        towermastfloor: '',
        // 楼面安全评估
        floorsafetyassessment: '',
        // 新建塔型
        newtower: '',
        // 是否存在危险源
        existinghazard: null,
        // 是否在河道/铁路/高速附近
        theriver: null,
        // 地势低洼
        lowlying: null,
        // 是否需要护坡/挡土墙
        needrevetment: null,
        // 是否需要修建围墙
        buildwall: null,
        // 是否需要修建道路
        buildroads: null,
        // 是否需要二次搬运
        secondaryhandling: null,
        // 是否需要接地外引
        Irfpagrounding: null,
        // 是否有较深垃圾回填土质
        backfillsoil: null,
        // 施工吊装机械是否可以入场
        hoistingmachinery: null,
        // 施工空间是否足够
        constructionspace: null,
        // 是否需要地勘
        geologicalexploration: null,
        // 楼面站拟建楼面高度（米）
        floorheight: '',
        // 楼面站/地面站拟建塔桅数量，高度（米），及塔型
        towermastnumber: '',
        towermastheight: '',
        towermasttype: '',
        // 地面站拟建场地山高（米），平面填零
        sitegrowtaller: '',
        //  拟建机房类型
        roomtype: null,
        // 机房细分类型
        roomsubdividetype: null,
        // 机房产权
        roomproperty: null,
        roomtypename: '',
        //  拟建机房细分类型
        roomsubdividetypename: '',
        // 拟建机房产权
        roompropertyname: '',
        // 拟建机房尺寸
        roomsize: '',
        // 引入类型
        introducetype: null,
        // 引入电压
        introducevoltage: null,
        // 引入距离
        introducedistance: null,
        // 特殊情况说明
        special: '',
        // 图片列表
        environment: [],
        housingconstruction: [],
        roofing: [],
        sketch: [],
        electricmeterimg: []
      },
      Rules1: {
        resourceaddress: [
          { required: true, message: '请输入基站地址', trigger: 'blur' }
        ],
        geographic: [
          { required: true, message: '请选择地理环境', trigger: 'change' }
        ],
        websitebuildingmode: [
          { required: true, message: '请选择建站模式', trigger: 'change' }
        ],
        coversscenario: [
          { required: true, message: '请选择覆盖场景', trigger: 'change' }
        ],
        realitylongitude: [
          { required: true, message: '请选择经度', trigger: 'change' }
        ],
        realitylatitude: [
          { required: true, message: '请选择纬度', trigger: 'change' }
        ],
        ownedoperator: [
          { required: true, message: '请选择本次需求运营商', trigger: 'change' }
        ],
        recentlyresourcename: [
          { required: true, message: '请选择最近站点', trigger: 'change' }
        ]
      },
      Rules2: {
        buildingtype: [
          { required: true, message: '请输入建筑物类型', trigger: 'blur' }
        ],
        floorstructurecondition: [
          { required: true, message: '请选择是否能获取楼面结构情况', trigger: 'change' }
        ],
        maintenancefriendly: [
          { required: true, message: '请选择维护是否方便', trigger: 'change' }
        ],
        mainbuildingfloor: [
          { required: true, message: '请输入建筑总楼层', trigger: 'blur' }
        ],
        computerroomfloor: [
          { required: true, message: '请输入机房所在楼层', trigger: 'blur' }
        ],
        towermastfloor: [
          { required: true, message: '请输入塔桅所在楼层', trigger: 'blur' }
        ],
        floorsafetyassessment: [
          { required: true, message: '请输入楼面安全评估', trigger: 'blur' }
        ],
        newtower: [
          { required: true, message: '请选择新建塔型', trigger: 'change' }
        ],
        existinghazard: [
          { required: true, message: '请选择是否存在危险源', trigger: 'change' }
        ],
        theriver: [
          { required: true, message: '请选择是否在河道/铁路/高速附近', trigger: 'change' }
        ],
        lowlying: [
          { required: true, message: '请选择是否地势低洼', trigger: 'change' }
        ],
        needrevetment: [
          { required: true, message: '请选择是否需要护坡/挡土墙', trigger: 'change' }
        ],
        buildwall: [
          { required: true, message: '请选择是否需要修建围墙', trigger: 'change' }
        ],
        buildroads: [
          { required: true, message: '请选择是否需要修建道路', trigger: 'change' }
        ],
        secondaryhandling: [
          { required: true, message: '请选择是否需要二次搬运', trigger: 'change' }
        ],
        Irfpagrounding: [
          { required: true, message: '请选择是否需要接地外引', trigger: 'change' }
        ],
        backfillsoil: [
          { required: true, message: '请选择是否有较深垃圾回填土质', trigger: 'change' }
        ],
        hoistingmachinery: [
          { required: true, message: '请选择施工吊装机械是否可以入场', trigger: 'change' }
        ],
        constructionspace: [
          { required: true, message: '请选择施工空间是否足够', trigger: 'change' }
        ],
        geologicalexploration: [
          { required: true, message: '请选择是否需要地勘', trigger: 'change' }
        ]
      },
      Rules3: {
        floorheight: [
          { required: true, message: '请输入楼面站拟建楼面高度（米）', trigger: 'blur' }
        ],
        towermasttype: [
          { required: true, message: '请输入楼面站拟建塔桅塔型', trigger: 'blur' }
        ],
        towermastnumber: [
          { required: true, message: '请输入楼面站拟建塔桅数量', trigger: 'blur' }
        ],
        towermastheight: [
          { required: true, message: '请输入楼面站拟建塔桅高度(米)', trigger: 'blur' }
        ],
        sitegrowtaller: [
          { required: true, message: '请输入地面站拟建场地山高（米），平面填零', trigger: 'blur' }
        ]
      },
      Rules4: {
        roomtype: [
          { required: true, message: '请选择拟建机房类型', trigger: 'change' }
        ],
        roomsubdividetype: [
          { required: true, message: '请选择拟建机房细分类型', trigger: 'change' }
        ],
        roomproperty: [
          { required: true, message: '请选择拟建机房产权', trigger: 'change' }
        ],
        roomsize: [
          { required: true, message: '请输入拟建机房尺寸', trigger: 'blur' }
        ]
      },
      Rules5: {
        introducetype: [
          { required: true, message: '请选择引入类型', trigger: 'change' }
        ],
        introducevoltage: [
          { required: true, message: '请选择引入电压', trigger: 'change' }
        ],
        introducedistance: [
          { required: true, message: '请输入引入距离', trigger: 'blur' }
        ]
      },
      // 审核弹窗
      auitShow: false,
      auitPassShow: false,
      dialogLoading: false,
      // 审核数据
      auitData: {
        taskid: '',
        remark: '',
        demandno: ''
      }
    }
  },
  activated () {
    if (this.SurveyInfoType === 1) {
      this.SurveyInfo = this.ProjectSurveyInfo
    } else if (this.SurveyInfoType === 2) {
      this.SurveyInfo = this.TaskSurveyInfo
    } else if (this.SurveyInfoType === 3) {
      this.SurveyInfo = this.MyProject
    } else if (this.SurveyInfoType === 4) {
      this.SurveyInfo = this.CompletedProject
    }
    this.WriteState = this.SurveyInfo.state
    this.ViewTabIndex = '0'
    this.getList()
    this.getTableData()
    if (this.SurveyInfo.taskstate) {
      this.getNewBuildStationInfo()
    }
  },
  methods: {
    getTableData () {
      this.WriteLoading = true
      this.$axios.get(GetProjectInfo, {
        params: {
          id: this.SurveyInfo.id
        }
      }).then(res => {
        this.WriteLoading = false
        if (res.data != null) {
          this.tableData2 = res.data
        }
        if (res.success === false) {
          this.closeWrite()
        }
      }).catch(error => {
        this.WriteLoading = false
        console.log(error)
      })
    },
    getNewBuildStationInfo () {
      this.$axios.get(GetNewResourceCensusInfo, {
        params: {
          projectid: this.SurveyInfo.id
        }
      }).then(res => {
        if (res.data != null) {
          this.tableData = res.data
          this.tableData.websitebuildingmode = this.tableData.websitebuildingmode === 0 ? null : this.tableData.websitebuildingmode
          this.tableData.demanddistance = this.tableData.demanddistance ? this.tableData.demanddistance : this.tableData.demanddistance === 0 ? this.tableData.demanddistance : '请选择经纬度后计算'
          this.tableData.resourcedistance = this.tableData.resourcedistance ? this.tableData.resourcedistance.toFixed(2) : 0
          if (this.WriteState === 1) {
            if (this.tableData.websitebuildingmode === 1) {
              this.tableData.newtower = this.tableData.newtower ? this.tableData.newtower.split(',') : this.tableData.newtower === null ? [] : this.tableData.newtower.split('')
            }
            this.tableData.ownedoperator = this.tableData.ownedoperator ? this.tableData.ownedoperator.split(',') : this.tableData.ownedoperator === null ? [] : this.tableData.ownedoperator.split('')
          }
          // if (res.data.environment) {
          //   this.environment = JSON.parse(res.data.environment)
          //   this.housingconstruction = JSON.parse(res.data.housingconstruction)
          //   this.roofing = JSON.parse(res.data.roofing)
          //   this.sitesupplementarymap = JSON.parse(res.data.sitesupplementarymap)
          //   this.sketch = JSON.parse(res.data.sketch)
          // }
        }
      })
    },
    getList () {
      let s = ['勘察建站模式', '勘察运营商', '勘察地理环境', '勘察覆盖场景',
        '勘察塔型', '勘察机房细分类型', '勘察机房类型', '勘察引入类型', '勘察引入电压', '勘察机房产权']
      this.Loading = true
      this.$axios.post(DictionaryInfoList, s).then(res => {
        if (res.errorCode === '200') {
          let data = res.data
          this.DicList.geographic = data.filter(i => {
            return i.type === '勘察地理环境'
          })
          this.DicList.websitebuildingmode = data.filter(i => {
            return i.type === '勘察建站模式'
          })
          this.DicList.coversscenario = data.filter(i => {
            return i.type === '勘察覆盖场景'
          })
          this.DicList.ownedoperator = data.filter(i => {
            return i.type === '勘察运营商'
          })
          this.DicList.roomsubdividetype = data.filter(i => {
            return i.type === '勘察机房细分类型'
          })
          this.DicList.roomtype = data.filter(i => {
            return i.type === '勘察机房类型'
          })
          this.DicList.roomproperty = data.filter(i => {
            return i.type === '勘察机房产权'
          })
          this.DicList.introducetype = data.filter(i => {
            return i.type === '勘察引入类型'
          })
          this.DicList.introducevoltage = data.filter(i => {
            return i.type === '勘察引入电压'
          })
          this.DicList.newtower = data.filter(i => {
            return i.type === '勘察塔型'
          })
        }
      })
      this.Loading = false
    },
    SubmitSave () {
      if (!this.tableData.websitebuildingmode) return this.$message.error('请选择建站模式！')
      this.WriteLoading = true
      if (this.tableData.websitebuildingmode === 1) {
        if (this.tableData.newtower.length) {
          this.tableData.newtower = this.tableData.newtower.join(',')
        } else {
          this.tableData.newtower = this.tableData.newtower.toString()
        }
      }
      if (this.tableData.ownedoperator.length) {
        this.tableData.ownedoperator = this.tableData.ownedoperator.join(',')
      } else {
        this.tableData.ownedoperator = this.tableData.ownedoperator.toString()
      }
      this.tableData.environment = this.tableData.environment.filter(i => i.url)
      this.tableData.housingconstruction = this.tableData.housingconstruction.filter(i => i.url)
      this.tableData.roofing = this.tableData.roofing.filter(i => i.url)
      this.tableData.sketch = this.tableData.sketch.filter(i => i.url)
      this.tableData.electricmeterimg = this.tableData.electricmeterimg.filter(i => i.url)
      this.tableData.demanddistance = this.tableData.demanddistance === '请选择经纬度后计算' ? null : this.tableData.demanddistance
      this.$axios.put(UpdateNewResourceCensus, this.tableData).then(res => {
        this.WriteLoading = false
        if (res.errorCode === '200') {
          this.$message.success('保存成功!')
          this.closeWrite()
        } else {
          this.tableData.newtower = this.tableData.newtower ? this.tableData.newtower.split(',') : this.tableData.newtower.split('')
          this.tableData.ownedoperator = this.tableData.ownedoperator ? this.tableData.ownedoperator.split(',') : this.tableData.ownedoperator.split('')
          this.$message.error(res.msg)
        }
      }).catch(error => {
        this.WriteLoading = false
        console.log(error)
      })
    },
    SubmitSaveAsync () {
      this.WriteLoading = true
      if (this.tableData.websitebuildingmode === 1) {
        if (this.tableData.newtower.length) {
          this.tableData.newtower = this.tableData.newtower.join(',')
        } else {
          this.tableData.newtower = this.tableData.newtower.toString()
        }
      }
      if (this.tableData.ownedoperator.length) {
        this.tableData.ownedoperator = this.tableData.ownedoperator.join(',')
      } else {
        this.tableData.ownedoperator = this.tableData.ownedoperator.toString()
      }
      this.tableData.environment = this.tableData.environment.filter(i => i.url)
      this.tableData.housingconstruction = this.tableData.housingconstruction.filter(i => i.url)
      this.tableData.roofing = this.tableData.roofing.filter(i => i.url)
      this.tableData.sketch = this.tableData.sketch.filter(i => i.url)
      this.tableData.electricmeterimg = this.tableData.electricmeterimg.filter(i => i.url)
      this.tableData.demanddistance = this.tableData.demanddistance === '请选择经纬度后计算' ? null : this.tableData.demanddistance
      return this.$axios.put(UpdateNewResourceCensus, this.tableData).then((res) => {
        return Promise.resolve(res)
      })
    },
    SubmitAuit () {
      if (this.tableData.environment.filter(it => it.url).length !== 8) return this.$message.error('请补全360环境照片！')
      this.$refs.WriteForm1.validate((vali, msg) => {
        if (!vali) {
          return this.$message.error('基本情况有未填完信息,请补全！')
        } else {
          this.$refs.WriteForm2.validate((vali, msg) => {
            if (!vali) {
              return this.$message.error('站点情况有未填完信息,请补全！')
            } else {
              this.$refs.WriteForm3.validate((vali, msg) => {
                if (!vali) {
                  return this.$message.error('铁塔情况有未填完信息,请补全！')
                } else {
                  this.$refs.WriteForm4.validate((vali, msg) => {
                    if (!vali) {
                      return this.$message.error('机房情况有未填完信息,请补全！')
                    } else {
                      this.$refs.WriteForm5.validate((vali, msg) => {
                        if (!vali) {
                          return this.$message.error('外电引入有未填完信息,请补全！')
                        } else {
                          this.SubmitSaveAsync().then((res) => {
                            if (res.errorCode === '200') {
                              this.$axios.get(GetNewResourceSubmitAuit, {
                                params: {
                                  project_id: this.SurveyInfo.id
                                }
                              }).then(res => {
                                console.log(res)
                                if (res.errorCode === '200') {
                                  this.WriteLoading = false
                                  this.$message.success('提交审核成功!')
                                  this.closeWrite()
                                } else {
                                  this.WriteLoading = false
                                  this.$message.error(res.msg)
                                }
                              }).catch(error => {
                                this.WriteLoading = false
                                console.log(error)
                              })
                            } else {
                              this.WriteData.newtower = this.WriteData.newtower ? this.WriteData.newtower.split(',') : this.WriteData.newtower.split('')
                              this.WriteData.ownedoperator = this.WriteData.ownedoperator ? this.WriteData.ownedoperator.split(',') : this.WriteData.ownedoperator.split('')
                              this.$message.error(res.msg)
                            }
                          })
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    },
    getImgTitle (val) {
      return this.$axios.get(GetInvestigateImgConfigurationList, {
        params: {
          attribution: val,
          constructionmode: 1,
          PageIndex: 1,
          PageSize: 200
        }
      }).then((res) => {
        return Promise.resolve(res)
      })
    },
    getEnvironmentTitle () {
      return this.$axios.post(DictionaryInfoList, ['360度环境照片']).then((res) => {
        return Promise.resolve(res)
      })
    },
    OpenImgBox (s) {
      switch (s) {
        case 'environment':
          if (this.WriteState === 1) {
            this.getEnvironmentTitle().then((res) => {
              if (res.data.length) {
                res.data.forEach(item => {
                  if (!this.tableData.environment.filter(it => it.title === item.text).length) {
                    const obj = {
                      field_name: 'environment',
                      remarks: '',
                      title: item.text,
                      url: ''
                    }
                    this.tableData.environment.push(obj)
                  }
                })
              }
            })
          }
          this.$refs.ImgBox.SetData('360环境照片', 'environment', this.tableData.environment, true)
          break
        case 'housingconstruction':
          if (this.WriteState === 1) {
            this.getImgTitle('机房建设地照片').then((res) => {
              if (res.data.total) {
                res.data.list.forEach(item => {
                  if (!this.tableData.housingconstruction.filter(it => it.title === item.title).length) {
                    const obj = {
                      field_name: 'housingconstruction',
                      remarks: '',
                      title: item.title,
                      url: ''
                    }
                    this.tableData.housingconstruction.push(obj)
                  }
                })
              }
            })
          }
          this.$refs.ImgBox.SetData('机房建设地照片', 'housingconstruction', this.tableData.housingconstruction, true)
          break
        case 'roofing':
          if (this.WriteState === 1) {
            this.getImgTitle('塔桅及天面照片').then((res) => {
              if (res.data.total) {
                res.data.list.forEach(item => {
                  if (!this.tableData.roofing.filter(it => it.title === item.title).length) {
                    const obj = {
                      field_name: 'roofing',
                      remarks: '',
                      title: item.title,
                      url: ''
                    }
                    this.tableData.roofing.push(obj)
                  }
                })
              }
            })
          }
          this.$refs.ImgBox.SetData('塔桅及天面照片', 'roofing', this.tableData.roofing, true)
          break
        case 'sketch':
          if (this.WriteState === 1) {
            this.getImgTitle('勘察草图').then((res) => {
              if (res.data.total) {
                res.data.list.forEach(item => {
                  if (!this.tableData.sketch.filter(it => it.title === item.title).length) {
                    const obj = {
                      field_name: 'sketch',
                      remarks: '',
                      title: item.title,
                      url: ''
                    }
                    this.tableData.sketch.push(obj)
                  }
                })
              }
            })
          }
          this.$refs.ImgBox.SetData('勘察草图', 'sketch', this.tableData.sketch, true)
          break
        case 'electricmeterimg':
          if (this.WriteState === 1) {
            this.getImgTitle('电表照片').then((res) => {
              if (res.data.total) {
                res.data.list.forEach(item => {
                  if (!this.tableData.electricmeterimg.filter(it => it.title === item.title).length) {
                    const obj = {
                      field_name: 'electricmeterimg',
                      remarks: '',
                      title: item.title,
                      url: ''
                    }
                    this.tableData.electricmeterimg.push(obj)
                  }
                })
              }
            })
          }
          this.$refs.ImgBox.SetData('电表照片', 'electricmeterimg', this.tableData.electricmeterimg, true)
          break
      }
      this.$refs.ImgBox.Open()
      this.WriteState === 2 ? this.$refs.ImgBox.Flag = true : this.$refs.ImgBox.Flag = false
    },
    Open360ImgBox () {
      this.$refs.EnvironmentImgBox.SetData('360环境照片', 'environment', this.tableData.environment, true)
      this.$refs.EnvironmentImgBox.Open()
      this.WriteState === 2 ? this.$refs.ImgBox.Flag = true : this.$refs.ImgBox.Flag = false
    },
    // 返回关闭函数
    closeWrite () {
      this.ViewTabIndex = '0'
      Object.assign(this.$data.tableData, this.$options.data().tableData)
      Object.assign(this.$data.tableData2, this.$options.data().tableData2)
      if (this.SurveyInfo.from === 'ProjectManagement') {
        this.$router.push({name: 'ProjectManagement'})
        this.$emit('handleChange', 'ProjectManagement', '2d6a2407-c247-404f-b093-a91f524a56fa')
      } else if (this.SurveyInfo.from === 'TaskManagement') {
        this.$router.push({name: 'TaskManagement'})
        this.$emit('handleChange', 'TaskManagement', 'dc73026f-3906-4f64-a8bd-1a2bc646f1fe')
      } else if (this.SurveyInfo.from === 'MyProject') {
        this.$router.push({name: 'MyProject'})
        this.$emit('handleChange', 'MyProject', '296a0c73-6a8a-450a-9e3e-f1ac571a695d')
      } else if (this.SurveyInfo.from === 'CompletedProject') {
        this.$router.push({name: 'CompletedProject'})
        this.$emit('handleChange', 'CompletedProject', '68574cc1-6d88-4d03-a9c0-4493b0c0754b')
      }
    },
    subAuit (s) {
      if (this.SurveyInfoType === 2) {
        this.auitData.taskid = this.SurveyInfo.taskid
      }
      if (s === 2) {
        this.auitShow = true
      } else {
        this.auitPassShow = true
      }
    },
    handleAuit (state) {
      if (!this.auitData.remark && state === 2) return this.$message.warning('请输入审核意见')
      if (!this.auitData.demandno && state === 1 && this.tableData2.taskstatename === '地市审核') return this.$message.warning('请输入需求单号')
      this.dialogLoading = true
      this.$axios.get(AuitTask, {
        params: {
          taskid: this.auitData.taskid,
          state: state,
          remark: this.auitData.remark,
          demandno: this.auitData.demandno
        }
      }).then(res => {
        this.dialogLoading = false
        if (res.errorCode === '200') {
          if (state === 1) {
            this.$message.success('审核成功')
            this.auitPassShow = false
          } else {
            this.$message.success('退回成功')
            this.auitShow = false
          }
          this.closeWrite()
        } else {
          this.$message.warning(res.msg)
        }
      }).catch(error => {
        this.dialogLoading = false
        console.log(error)
      })
    },
    auitClose () {
      this.auitData.remark = ''
    },
    auitPassClose () {
      this.auitData.demandno = ''
      this.auitData.remark = ''
    },
    formatString (val) {
      return val !== undefined && val.filter(it => it.url).length ? `有（${val.filter(it => it.url).length}张）` : '无'
    },
    OpenMap (val, isCheck = false) { // 0: 查看 1: 编辑/新增
      this.showMap = true
      this.$nextTick(() => {
        this.$refs.GoogleMap.Open()
        this.$refs.GoogleMap.showType = val
        if (isCheck) {
          this.$refs.GoogleMap.longitude = this.tableData2.planninglongitude
          this.$refs.GoogleMap.latitude = this.tableData2.planninglatitude
        } else {
          this.$refs.GoogleMap.longitude = this.tableData.realitylongitude
          this.$refs.GoogleMap.latitude = this.tableData.realitylatitude
          this.$refs.GoogleMap.Query.longitude = this.tableData.realitylongitude
          this.$refs.GoogleMap.Query.latitude = this.tableData.realitylatitude
        }
      })
    },
    getMapData (longitude, latitude) {
      this.showMap = false
      if (longitude && this.$refs.GoogleMap.showType === 1) {
        this.tableData.realitylongitude = longitude
      }
      if (latitude && this.$refs.GoogleMap.showType === 1) {
        this.tableData.realitylatitude = latitude
      }
      if (longitude && latitude && this.$refs.GoogleMap.showType === 1) {
        this.$axios.get(GetDistance, {
          params: {
            lat1: latitude,
            lng1: longitude,
            lat2: this.tableData2.planninglatitude,
            lng2: this.tableData2.planninglongitude
          }
        }).then(res => {
          if (res.errorCode === '200') {
            // if (res.data) {
            this.tableData.demanddistance = res.data.toFixed(2)
            // }
          } else {
            this.$message.warning(res.msg)
          }
        })
      }
    },
    DialogClose () {
      this.isShow = !this.isShow
    },
    selectResource (name, id, M) {
      this.tableData.recentlyresource_id = id
      this.tableData.resourcedistance = M
      this.tableData.recentlyresourcename = name
      this.isShow = false
    },
    showDialog () {
      if (this.tableData.realitylongitude && this.tableData.realitylatitude) {
        this.isShow = true
      } else {
        this.$message.error('请选择实际经纬度')
      }
    }
  },
  computed: {
    ...mapGetters(['ProjectSurveyInfo', 'TaskSurveyInfo', 'SurveyInfoType', 'MyProject', 'CompletedProject'])
  },
  watch: {
    SurveyInfoType (newd, old) {
      if (newd !== old) {
        if (this.SurveyInfoType === 1) {
          this.SurveyInfo = this.ProjectSurveyInfo
        } else if (this.SurveyInfoType === 2) {
          this.SurveyInfo = this.TaskSurveyInfo
        } else if (this.SurveyInfoType === 3) {
          this.SurveyInfo = this.MyProject
        } else if (this.SurveyInfoType === 4) {
          this.SurveyInfo = this.CompletedProject
        }
        this.ViewTabIndex = '0'
        this.getTableData()
        if (this.SurveyInfo.taskstate) {
          this.getNewBuildStationInfo()
        }
      }
    }
  },
  components: {
    ResourceList,
    ImgBox,
    EnvironmentImgBox,
    layuiTitle,
    GoogleMap
  }
}
</script>

<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
