<template>
  <div v-loading="WriteLoading" style="margin:15px">
    <layuiTitle title="新建站详情"></layuiTitle>
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
              <td>
                <div class="cell">
                  <div>{{tableData2.planninglongitude}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--规划纬度-->
            <tr class="el-table__row">
              <td><div class="cell">需求纬度</div></td>
              <td>
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
            <tr class="el-table__row">
              <td><div class="cell">存量筛查结果</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData2.stockstationresults}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--存量站筛查站点编码-->
            <tr class="el-table__row">
              <td><div class="cell">存量站筛查站点编码</div></td>
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
              <!--基站地址-->
            <tr class="el-table__row">
              <td><div class="cell">基站地址</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.resourceaddress}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--地理环境-->
            <tr class="el-table__row">
              <td><div class="cell">地理环境</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.geographicname}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--建站模式-->
            <tr class="el-table__row">
              <td><div class="cell">建站模式</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.websitebuildingmodename}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--覆盖场景-->
            <tr class="el-table__row">
              <td><div class="cell">覆盖场景</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.coversscenarioname}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--实际经度-->
            <tr class="el-table__row">
              <td><div class="cell">实际经度</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.realitylongitude}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--实际纬度-->
            <tr class="el-table__row">
              <td><div class="cell">实际纬度</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.realitylatitude}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--与需求偏移距离-->
            <tr class="el-table__row">
              <td><div class="cell">与规划偏移距离(米)</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.demanddistance ? tableData.demanddistance.toFixed(2) : tableData.demanddistance}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--归属运营商-->
            <tr class="el-table__row">
              <td><div class="cell">本次需求归属运营商</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.ownedoperator}}</div>
                </div>
              </td>
              <!-- <td><div class="cell">{{this.writeDic(dictionaryList.ownedoperatorList)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--最近站点-->
            <tr class="el-table__row">
              <td><div class="cell">最近站点</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.recentlyresourcename}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--与存量站之间的距离-->
            <tr class="el-table__row">
              <td><div class="cell">与存量站之间的距离(米)</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.resourcedistance ? tableData.resourcedistance.toFixed(2) : tableData.resourcedistance}}</div>
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
            <template v-if="tableData.websitebuildingmode===1">
            <!--建筑物类型-->
            <tr class="el-table__row">
              <td><div class="cell">建筑物类型</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.buildingtype}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--是否能够获取楼面结构情况-->
            <tr class="el-table__row">
              <td><div class="cell">是否能够获取楼面结构情况</div></td>
              <td>
                <div class="cell">
                  <div v-if="tableData.floorstructurecondition === true">是</div>
                  <div v-else-if="tableData.floorstructurecondition === false">否</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--维护是否方便-->
            <tr class="el-table__row">
              <td><div class="cell">维护是否方便</div></td>
              <td>
                <div class="cell">
                  <div v-if="tableData.maintenancefriendly === true">是</div>
                  <div v-else-if="tableData.maintenancefriendly === false">否</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--建筑总楼层-->
            <tr class="el-table__row">
              <td><div class="cell">建筑总楼层</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.mainbuildingfloor}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--机房所在楼层-->
            <tr class="el-table__row">
              <td><div class="cell">机房所在楼层</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.computerroomfloor}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--塔桅所在楼层-->
            <tr class="el-table__row">
              <td><div class="cell">塔桅所在楼层</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.towermastfloor}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--楼面安全评估-->
            <tr class="el-table__row">
              <td><div class="cell">楼面安全评估</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.floorsafetyassessment}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--新建塔型-->
            <tr class="el-table__row">
                <td><div class="cell">新建塔型</div></td>
                <td>
                  <div class="cell">
                    <div>{{tableData.newtower}}</div>
                  </div>
                </td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
            </template>
            <template v-if="tableData.websitebuildingmode===2">
            <!--是否存在危险源-->
            <tr class="el-table__row">
              <td><div class="cell">是否存在危险源</div></td>
              <td>
                <div class="cell">
                  <div v-if="tableData.existinghazard === true">是</div>
                  <div v-else-if="tableData.existinghazard === false">否</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--是否在河道/铁路/高速附近-->
            <tr class="el-table__row">
              <td><div class="cell">是否在河道/铁路/高速附近</div></td>
              <td>
                <div class="cell">
                  <div v-if="tableData.theriver === true">是</div>
                  <div v-else-if="tableData.theriver === false">否</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--地势低洼-->
            <tr class="el-table__row">
              <td><div class="cell">地势低洼</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.owlying ? '是' : '否'}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--是否需要护坡/挡土墙-->
            <tr class="el-table__row">
              <td><div class="cell">是否需要护坡/挡土墙</div></td>
              <td>
                <div class="cell">
                  <div v-if="tableData.needrevetment === true">是</div>
                  <div v-else-if="tableData.needrevetment === false">否</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--是否需要修建围墙-->
            <tr class="el-table__row">
              <td><div class="cell">是否需要修建围墙</div></td>
              <td>
                <div class="cell">
                  <div v-if="tableData.buildwall === true">是</div>
                  <div v-else-if="tableData.buildwall === false">否</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--是否需要修建道路-->
            <tr class="el-table__row">
              <td><div class="cell">是否需要修建道路</div></td>
              <td>
                <div class="cell">
                  <div v-if="tableData.buildroads === true">是</div>
                  <div v-if="tableData.buildroads === false">否</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--是否需要二次搬运-->
            <tr class="el-table__row">
              <td><div class="cell">是否需要二次搬运</div></td>
              <td>
                <div class="cell">
                  <div v-if="tableData.secondaryhandling === true">是</div>
                  <div v-if="tableData.secondaryhandling === false">否</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--是否需要接地外引-->
            <tr class="el-table__row">
              <td><div class="cell">是否需要接地外引</div></td>
              <td>
                <div class="cell">
                  <div v-if="tableData.Irfpagrounding === true">是</div>
                  <div v-else-if="tableData.Irfpagrounding === false">否</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--是否有较深垃圾回填土质-->
            <tr class="el-table__row">
              <td><div class="cell">是否有较深垃圾回填土质</div></td>
              <td>
                <div class="cell">
                  <div v-if="tableData.backfillsoil === true">是</div>
                  <div v-else-if="tableData.backfillsoil === false">否</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--施工吊装机械是否可用入场-->
            <tr class="el-table__row">
              <td><div class="cell">施工吊装机械是否可用入场</div></td>
              <td>
                <div class="cell">
                  <div v-if="tableData.hoistingmachinery === true">是</div>
                  <div v-else-if="tableData.hoistingmachinery === false">否</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--施工空间是否足够-->
            <tr class="el-table__row">
              <td><div class="cell">施工空间是否足够</div></td>
              <td>
                <div class="cell">
                  <div v-if="tableData.constructionspace === true">是</div>
                  <div v-else-if="tableData.constructionspace === false">否</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--是否需要地勘-->
            <tr class="el-table__row">
              <td><div class="cell">是否需要地勘</div></td>
              <td>
                <div class="cell">
                  <div v-if="tableData.geologicalexploration === true">是</div>
                  <div v-else-if="tableData.geologicalexploration === false">否</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--新建塔型-->
            <tr class="el-table__row">
              <td><div class="cell">新建塔型</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.newtower}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
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
            <template v-if="tableData.websitebuildingmode === 1">
            <!--楼面站拟建楼面高度（米）-->
            <tr class="el-table__row">
              <td><div class="cell">楼面站拟建楼面高度（米）</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.floorheight}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--楼面站拟建塔桅数量，高度（米），及塔型-->
            <tr class="el-table__row">
              <td><div class="cell">楼面站拟建塔桅数量</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.towermastnumber}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">楼面站拟建塔桅高度(米)</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.towermastheight}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">楼面站拟建塔桅塔型</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.towermasttype}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            </template>
            <template v-if="tableData.websitebuildingmode === 2">
            <!--地面站拟建塔桅数量、高度（米）、及塔型-->
            <tr class="el-table__row">
              <td><div class="cell">地面站拟建塔桅数量</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.towermastnumber}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">地面站拟建塔桅高度(米)</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.towermastheight}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">地面站拟建塔桅塔型</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.towermasttype}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--地面站拟建场地山高（米），平面填零-->
            <tr class="el-table__row">
              <td><div class="cell">地面站拟建场地山高（米），平面填零</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.sitegrowtaller}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
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
            <!--拟建机房类型-->
            <tr class="el-table__row">
              <td><div class="cell">拟建机房类型</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.roomtypename}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--拟建机房细分类型-->
            <tr class="el-table__row" v-if="tableData.roomtype === 5">
              <td><div class="cell">拟建机房细分类型</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.roomsubdividetypename}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-if="tableData.roomtype === 1 || tableData.roomtype === 3 || tableData.roomtype === 4 || tableData.roomtype === 7">
              <td><div class="cell">拟建机房产权 </div></td>
              <td><div class="cell">{{tableData.roompropertyname}}</div></td>
              <!--<td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <!--拟建机房尺寸-->
            <tr class="el-table__row" v-if="tableData.roomtype !== 5 && tableData.roomtype !== 6">
              <td><div class="cell">拟建机房尺寸</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.roomsize}}</div>
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
            <!--原有引入类型-->
            <tr class="el-table__row">
              <td><div class="cell">引入类型</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.introducetypename}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--原有引入电压-->
            <tr class="el-table__row">
              <td><div class="cell">引入电压</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.introducevoltagename}}</div>
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
             <!--特殊情况说明-->
            <tr class="el-table__row el-table__row--striped">
              <td><div class="cell">特殊情况说明</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.special}}</div>
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
              <td><div class="cell">360环境照片</div></td>
              <td>
                <div class="cell" @click="Open360ImgBox()">
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
            </tbody>
          </table>
        </div>
        </el-form>
      </div>
      </el-tab-pane>
    </el-tabs>
    <div class="center" style="padding-bottom: 100px">
      <el-button @click="closeWrite" type="primary" icon="el-icon-back">返回</el-button>
      <el-button type="warning" @click="subAuit(2)" v-if="SurveyInfoType===2">审核打回</el-button>
      <el-button type="success" @click="subAuit(1)" v-if="SurveyInfoType===2">审核通过</el-button>
    </div>
    <ImgBox ref="ImgBox"></ImgBox>
    <EnvironmentImgBox ref="EnvironmentImgBox"></EnvironmentImgBox>
    <el-dialog title="审核" :visible.sync="auitShow" center width="30%" @close="auitClose">
      <el-form :data="auitData">
        <el-row style="margin-bottom:15px">
          <el-col :span="6">项目名称</el-col>
          <el-col :span="16">{{tableData2.resourcename}}</el-col>
        </el-row>
        <el-row style="margin-bottom:15px">
          <el-input type="textarea" :autosize="{ minRows: 2 }" placeholder="请输入审核意见，打回必填" v-model="auitData.remark"></el-input>
        </el-row>
        <el-row type="flex" justify="end">
          <el-button type="success" @click="handleAuit(2)">提交</el-button>
          <el-button type="primary" @click="auitShow = false">返回</el-button>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { GetProjectInfo, GetNewResourceCensusInfo, AuitTask } from 'api/SurveyManagement'
import {DictionaryInfoList} from 'api/api'
import ImgBox from 'base/ImgBox'
import EnvironmentImgBox from 'base/EnvironmentImgBox'
import {mapGetters} from 'vuex'
import ResourceList from 'base/Resource/ResourceList'
import layuiTitle from 'base/layui-title'
import {GlobalRes} from 'common/js/mixins'

export default {
  name: 'ReservepoverDe',
  mixins: [GlobalRes],
  data () {
    return {
      ViewTabIndex: '0',
      WriteLoading: false,
      // 保存属性取值的列表
      dictionaryList: {
        // taskstatename
        taskstatenameList: [],
        // ownedoperator
        ownedoperatorList: [],
        // constructionmode
        constructionmodeList: []
      },
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
        stockstationresults: '',
        // 存量站筛查站点编码
        recentlyresourcecode: ''
      },
      // 新建站表格相关属性
      tableData: {
        // 基站地址
        resourceaddress: '',
        // 地理环境
        geographicname: '',
        // 建站模式
        websitebuildingmode: 0,
        // 覆盖场景
        coversscenarioname: '',
        // 实际经度
        realitylongitude: '',
        // 实际纬度
        realitylatitude: '',
        // 与需求偏移距离
        demanddistance: 0,
        // 归属运营商
        ownedoperator: '',
        // 最近站点
        recentlyresourcename: '',
        // 与存量站之间的距离
        resourcedistance: 0,
        // 建筑物类型
        buildingtype: '',
        // 是否能获取楼面结构情况
        floorstructurecondition: '',
        // 维护是否方便
        maintenancefriendly: '',
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
        existinghazard: '',
        // 是否在河道/铁路/高速附近
        theriver: '',
        // 地势低洼
        lowlying: '',
        // 是否需要护坡/挡土墙
        needrevetment: '',
        // 是否需要修建围墙
        buildwall: '',
        // 是否需要修建道路
        buildroads: '',
        // 是否需要二次搬运
        secondaryhandling: '',
        // 是否需要接地外引
        Irfpagrounding: '',
        // 是否有较深垃圾回填土质
        backfillsoil: '',
        // 施工吊装机械是否可以入场
        hoistingmachinery: '',
        // 施工空间是否足够
        constructionspace: '',
        // 是否需要地勘
        geologicalexploration: '',
        // 楼面站拟建楼面高度（米）
        floorheight: '',
        // 楼面站/地面站拟建塔桅数量，高度（米），及塔型
        towermastnumber: '',
        towermastheight: '',
        towermasttype: '',
        // 地面站拟建场地山高（米），平面填零
        sitegrowtaller: '',
        //  拟建机房类型
        roomtype: '',
        roomtypename: '',
        //  拟建机房细分类型
        roomsubdividetypename: '',
        // 拟建机房产权
        roompropertyname: '',
        // 拟建机房尺寸
        roomsize: '',
        // 引入类型
        introducetypename: '',
        // 引入电压
        introducevoltagename: '',
        // 特殊情况说明
        special: '',
        // 图片列表
        environment: [],
        housingconstruction: [],
        roofing: [],
        sketch: []
      },
      // 审核弹窗
      auitShow: false,
      // 审核数据
      auitData: {
        taskid: '',
        remark: ''
      }
    }
  },
  activated () {
    if (this.SurveyInfoType === 1) {
      this.SurveyInfo = this.ProjectSurveyInfo
    } else if (this.SurveyInfoType === 2) {
      this.SurveyInfo = this.TaskSurveyInfo
    }
    this.ViewTabIndex = '0'
    // this.getList()
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
        if (res.data != null) {
          this.tableData2 = res.data
        }
        if (res.success === false) {
          this.closeWrite()
        }
      }).catch(error => {
        console.log(error)
      })
      this.WriteLoading = false
    },
    getNewBuildStationInfo () {
      this.$axios.get(GetNewResourceCensusInfo, {
        params: {
          projectid: this.SurveyInfo.id
        }
      }).then(res => {
        if (res.data != null) {
          this.tableData = res.data
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
      let s = ['勘察审核状态', '勘察建站方式', '勘察归属地运营商']
      this.Loading = true
      this.$axios.post(DictionaryInfoList, s).then(res => {
        if (res.errorCode === '200') {
          let data = res.data
          this.dictionaryList.taskstatenameList = data.filter(i => {
            return i.type === '勘察审核状态'
          })
          this.dictionaryList.constructionmodeList = data.filter(i => {
            return i.type === '勘察建站方式'
          })
          this.dictionaryList.ownedoperatorList = data.filter(i => {
            return i.type === '勘察归属地运营商'
          })
        }
      })
      this.Loading = false
    },
    OpenImgBox (s) {
      switch (s) {
        case 'housingconstruction':
          this.$refs.ImgBox.SetData('机房建设地照片', 'housingconstruction', this.tableData.housingconstruction, true)
          break
        case 'roofing':
          this.$refs.ImgBox.SetData('塔桅及天面照片', 'roofing', this.tableData.roofing, true)
          break
        case 'sketch':
          this.$refs.ImgBox.SetData('勘察草图', 'sketch', this.tableData.sketch, true)
          break
      }
      this.$refs.ImgBox.Open()
      this.$refs.ImgBox.Flag = true
    },
    Open360ImgBox () {
      this.$refs.EnvironmentImgBox.SetData('360环境照片', 'environment', this.tableData.environment, true)
      this.$refs.EnvironmentImgBox.Open()
      this.$refs.EnvironmentImgBox.Flag = true
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
      }
    },
    subAuit (s) {
      if (this.SurveyInfoType === 2) {
        this.auitData.taskid = this.SurveyInfo.taskid
      }
      if (s === 2) {
        this.auitShow = true
      } else {
        this.$confirm('您确认要通过审核吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.handleAuit(s)
        })
      }
    },
    handleAuit (state) {
      if (!this.auitData.remark && state === 2) return this.$message.warning('请输入审核意见')
      this.$axios.get(AuitTask, {
        params: {
          taskid: this.auitData.taskid,
          state: state,
          remark: this.auitData.remark
        }
      }).then(res => {
        if (res.errorCode === '200') {
          state === 1 ? this.$message.success('审核成功') : this.$message.success('打回成功')
          this.auitShow = false
          this.closeWrite()
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    auitClose () {
      this.auitData.remark = ''
    },
    formatString (val) {
      return val !== undefined && val.length ? `有（${val.length}张）` : '无'
    }
  },
  computed: {
    ...mapGetters(['ProjectSurveyInfo', 'TaskSurveyInfo', 'SurveyInfoType'])
  },
  watch: {
    SurveyInfoType (newd, old) {
      if (newd !== old) {
        if (this.SurveyInfoType === 1) {
          this.SurveyInfo = this.ProjectSurveyInfo
        } else if (this.SurveyInfoType === 2) {
          this.SurveyInfo = this.TaskSurveyInfo
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
    layuiTitle
  }
}
</script>

<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
