<template>
  <div style="margin:15px">
    <layuiTitle title="存量站详情"></layuiTitle>
    <el-tabs class="content-card" v-model="ViewTabIndex">
      <el-tab-pane label="项目详情">
        <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--mini">
          <!--表头-->
          <div class="el-table__header-wrapper">
            <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
              <colgroup>
                <col name="el-table_8_column_60" width="100"/>
                <col name="el-table_8_column_61" width="230"/>
                <!--<col name="el-table_8_column_63" width="400"/>-->
                <col name="el-table_8_column_64" width="100"/>
              </colgroup>
              <thead>
              <tr>
                <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
                <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
                <!--<th colspan="1" rowspan="1" class="el-table_8_column_63     table-headerStyle"><div class="cell">字典</div></th>-->
                <th colspan="1" rowspan="1" class="el-table_8_column_64     table-headerStyle"><div class="cell">规范要求</div></th>
              </tr>
              </thead>
            </table>
          </div>
          <!--表体-->
          <el-form :model="WriteData" v-loading="table1Loading" :show-message="false" label-width="0">
            <div class="el-table__body-wrapper is-scrolling-none">
              <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
                <colgroup>
                  <col name="el-table_8_column_60" width="100"/>
                  <col name="el-table_8_column_61" width="230"/>
                  <!--<col name="el-table_8_column_63" width="400"/>-->
                  <col name="el-table_8_column_64" width="100"/>
                </colgroup>
                <tbody>
                <tr class="el-table__row">
                  <td><div class="cell">城市 </div></td>
                  <td><div class="cell">{{WriteData.cityname}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">区域 </div></td>
                  <td><div class="cell">{{WriteData.areaname}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">需求方 </div></td>
                  <td><div class="cell">{{WriteData.demandside}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">需求批次 </div></td>
                  <td><div class="cell">{{WriteData.demandbatch}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">需求单号 </div></td>
                  <td><div class="cell">{{WriteData.demandno}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">需求名称 </div></td>
                  <td><div class="cell">{{WriteData.demandname}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">建站方式 </div></td>
                  <td><div class="cell">{{WriteData.constructionmodename}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">站点名称 </div></td>
                  <td><div class="cell">{{WriteData.resourcename}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">站点编码 </div></td>
                  <td><div class="cell">{{WriteData.resourcecode}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">原运营商 </div></td>
                  <td><div class="cell">{{WriteData.rawoperator}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">审核状态 </div></td>
                  <td><div class="cell">{{WriteData.taskstatename}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">需求经度 </div></td>
                  <td><div class="cell">{{WriteData.planninglongitude}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">需求纬度 </div></td>
                  <td><div class="cell">{{WriteData.planninglatitude}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">覆盖范围 </div></td>
                  <td><div class="cell">{{WriteData.coverage}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">新增建设区域 </div></td>
                  <td><div class="cell">{{WriteData.createconstructionarea}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">数据热点区域 </div></td>
                  <td><div class="cell">{{WriteData.hotdataarea}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">覆盖目标 </div></td>
                  <td><div class="cell">{{WriteData.coveringtarget}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">存量筛查结果 </div></td>
                  <td><div class="cell">{{WriteData.stockstationresults}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">存量站筛查站点编码 </div></td>
                  <td><div class="cell">{{WriteData.recentlyresourcecode}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                </tbody>
              </table>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="SurveyInfo.taskstate" label="基本情况">
        <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--mini">
          <!--表头-->
          <div class="el-table__header-wrapper">
            <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
              <colgroup>
                <col name="el-table_8_column_60" width="100"/>
                <col name="el-table_8_column_61" width="230"/>
                <!--<col name="el-table_8_column_63" width="400"/>-->
                <col name="el-table_8_column_64" width="100"/>
              </colgroup>
              <thead>
              <tr>
                <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
                <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
                <!--<th colspan="1" rowspan="1" class="el-table_8_column_63     table-headerStyle"><div class="cell">字典</div></th>-->
                <th colspan="1" rowspan="1" class="el-table_8_column_64     table-headerStyle"><div class="cell">规范要求</div></th>
              </tr>
              </thead>
            </table>
          </div>
          <!--表体-->
          <el-form :model="StockStationInfo" v-loading="table1Loading" :show-message="false" label-width="0">
            <div class="el-table__body-wrapper is-scrolling-none">
              <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
                <colgroup>
                  <col name="el-table_8_column_60" width="100"/>
                  <col name="el-table_8_column_61" width="230"/>
                  <!--<col name="el-table_8_column_63" width="400"/>-->
                  <col name="el-table_8_column_64" width="100"/>
                </colgroup>
                <tbody>
                <tr class="el-table__row">
                  <td><div class="cell">基站地址 </div></td>
                  <td><div class="cell">{{StockStationInfo.resourceaddress}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">地理环境 </div></td>
                  <td><div class="cell">{{StockStationInfo.geographicname}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">建站模式 </div></td>
                  <td><div class="cell">{{StockStationInfo.websitebuildingmodename}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">覆盖场景 </div></td>
                  <td><div class="cell">{{StockStationInfo.coversscenarioname}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">实际经度 </div></td>
                  <td><div class="cell">{{StockStationInfo.realitylongitude}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">实际纬度 </div></td>
                  <td><div class="cell">{{StockStationInfo.realitylatitude}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">与规划偏移距离(米) </div></td>
                  <td><div class="cell">{{StockStationInfo.demanddistance.toFixed(2)}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">本次需求归属运营商 </div></td>
                  <td><div class="cell">{{StockStationInfo.ownedoperator}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                </tbody>
              </table>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="SurveyInfo.taskstate" label="站点情况">
        <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--mini">
          <!--表头-->
          <div class="el-table__header-wrapper">
            <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
              <colgroup>
                <col name="el-table_8_column_60" width="100"/>
                <col name="el-table_8_column_61" width="230"/>
                <!--<col name="el-table_8_column_63" width="400"/>-->
                <col name="el-table_8_column_64" width="100"/>
              </colgroup>
              <thead>
              <tr>
                <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
                <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
                <!--<th colspan="1" rowspan="1" class="el-table_8_column_63     table-headerStyle"><div class="cell">字典</div></th>-->
                <th colspan="1" rowspan="1" class="el-table_8_column_64     table-headerStyle"><div class="cell">规范要求</div></th>
              </tr>
              </thead>
            </table>
          </div>
          <!--表体-->
          <el-form :model="StockStationInfo" v-loading="table1Loading" :show-message="false" label-width="0">
            <div class="el-table__body-wrapper is-scrolling-none">
              <table v-if="StockStationInfo.websitebuildingmodename === '楼面站'" cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
                <colgroup>
                  <col name="el-table_8_column_60" width="100"/>
                  <col name="el-table_8_column_61" width="230"/>
                  <!--<col name="el-table_8_column_63" width="400"/>-->
                  <col name="el-table_8_column_64" width="100"/>
                </colgroup>
                <tbody>
                <tr class="el-table__row">
                  <td><div class="cell">原有塔型 </div></td>
                  <td><div class="cell">{{StockStationInfo.rawtower}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">建筑物类型 </div></td>
                  <td><div class="cell">{{StockStationInfo.buildingtype}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">是否能获取楼面结构情况 </div></td>
                  <td><div class="cell">{{StockStationInfo.floorstructurecondition ? '是' : '否'}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">维护是否方便 </div></td>
                  <td><div class="cell">{{StockStationInfo.maintenancefriendly ? '是' : '否'}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">建筑总楼层 </div></td>
                  <td><div class="cell">{{StockStationInfo.mainbuildingfloor}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">机房所在楼层 </div></td>
                  <td><div class="cell">{{StockStationInfo.computerroomfloor}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">塔桅所在楼层 </div></td>
                  <td><div class="cell">{{StockStationInfo.towermastfloor}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">楼面安全评估 </div></td>
                  <td><div class="cell">{{StockStationInfo.floorsafetyassessment}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                </tbody>
              </table>
              <table v-else cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
                <colgroup>
                  <col name="el-table_8_column_60" width="100"/>
                  <col name="el-table_8_column_61" width="230"/>
                  <!--<col name="el-table_8_column_63" width="400"/>-->
                  <col name="el-table_8_column_64" width="100"/>
                </colgroup>
                <tbody>
                <tr class="el-table__row">
                  <td><div class="cell">原有塔型 </div></td>
                  <td><div class="cell">{{StockStationInfo.rawtower}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">原有塔高 </div></td>
                  <td><div class="cell">{{StockStationInfo.rawhightower}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">原有平台数 </div></td>
                  <td><div class="cell">{{StockStationInfo.rawplatformnumber}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">是否有空余抱杆 </div></td>
                  <td><div class="cell">{{StockStationInfo.sparederrick ? '是' : '否'}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">空余抱杆数量 </div></td>
                  <td><div class="cell">{{StockStationInfo.sparederricknumber}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                </tbody>
              </table>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="SurveyInfo.taskstate" label="机房情况">
        <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--mini">
          <!--表头-->
          <div class="el-table__header-wrapper">
            <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
              <colgroup>
                <col name="el-table_8_column_60" width="100"/>
                <col name="el-table_8_column_61" width="230"/>
                <!--<col name="el-table_8_column_63" width="400"/>-->
                <col name="el-table_8_column_64" width="100"/>
              </colgroup>
              <thead>
              <tr>
                <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
                <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
                <!--<th colspan="1" rowspan="1" class="el-table_8_column_63     table-headerStyle"><div class="cell">字典</div></th>-->
                <th colspan="1" rowspan="1" class="el-table_8_column_64     table-headerStyle"><div class="cell">规范要求</div></th>
              </tr>
              </thead>
            </table>
          </div>
          <!--表体-->
          <el-form :model="StockStationInfo" v-loading="table1Loading" :show-message="false" label-width="0">
            <div class="el-table__body-wrapper is-scrolling-none">
              <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
                <colgroup>
                  <col name="el-table_8_column_60" width="100"/>
                  <col name="el-table_8_column_61" width="230"/>
                  <!--<col name="el-table_8_column_63" width="400"/>-->
                  <col name="el-table_8_column_64" width="100"/>
                </colgroup>
                <tbody>
                <tr class="el-table__row">
                  <td><div class="cell">机房类型 </div></td>
                  <td><div class="cell">{{StockStationInfo.roomtypename}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row" v-if="StockStationInfo.roomtype === 5">
                  <td><div class="cell">机房细分类型 </div></td>
                  <td><div class="cell">{{StockStationInfo.roomsubdividetypename}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row" v-if="StockStationInfo.roomtype === 1 || StockStationInfo.roomtype === 3 || StockStationInfo.roomtype === 4 || StockStationInfo.roomtype === 7">
                  <td><div class="cell">机房产权 </div></td>
                  <td><div class="cell">{{StockStationInfo.roompropertyname}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row" v-if="StockStationInfo.roomtype !== 5 && StockStationInfo.roomtype !== 6">
                  <td><div class="cell">机房尺寸 </div></td>
                  <td><div class="cell">{{StockStationInfo.roomsize}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row" v-if="StockStationInfo.roomtype !== 5">
                  <td><div class="cell">馈线窗空余情况(剩余孔数) </div></td>
                  <td><div class="cell">{{StockStationInfo.feederwindow}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row" v-if="StockStationInfo.roomtype === 2">
                  <td><div class="cell">原有一体化机柜数量 </div></td>
                  <td><div class="cell">{{StockStationInfo.cabinetnumber}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row" v-if="StockStationInfo.roomtype === 2">
                  <td><div class="cell">原有一体化机柜规格 </div></td>
                  <td><div class="cell">{{StockStationInfo.cabinetspecifications}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                </tbody>
              </table>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="SurveyInfo.taskstate" label="交流挂箱">
        <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--mini">
          <!--表头-->
          <div class="el-table__header-wrapper">
            <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
              <colgroup>
                <col name="el-table_8_column_60" width="100"/>
                <col name="el-table_8_column_61" width="230"/>
                <!--<col name="el-table_8_column_63" width="400"/>-->
                <col name="el-table_8_column_64" width="100"/>
              </colgroup>
              <thead>
              <tr>
                <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
                <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
                <!--<th colspan="1" rowspan="1" class="el-table_8_column_63     table-headerStyle"><div class="cell">字典</div></th>-->
                <th colspan="1" rowspan="1" class="el-table_8_column_64     table-headerStyle"><div class="cell">规范要求</div></th>
              </tr>
              </thead>
            </table>
          </div>
          <!--表体-->
          <el-form :model="StockStationInfo" v-loading="table1Loading" :show-message="false" label-width="0">
            <div class="el-table__body-wrapper is-scrolling-none">
              <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
                <colgroup>
                  <col name="el-table_8_column_60" width="100"/>
                  <col name="el-table_8_column_61" width="230"/>
                  <!--<col name="el-table_8_column_63" width="400"/>-->
                  <col name="el-table_8_column_64" width="100"/>
                </colgroup>
                <tbody>
                <tr class="el-table__row">
                  <td><div class="cell">原有交挂型号 </div></td>
                  <td><div class="cell">{{StockStationInfo.rawcrosshangingtype}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                </tbody>
              </table>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="SurveyInfo.taskstate" label="开关电源">
        <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--mini">
          <!--表头-->
          <div class="el-table__header-wrapper">
            <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
              <colgroup>
                <col name="el-table_8_column_60" width="150"/>
                <col name="el-table_8_column_61" width="230"/>
                <!--<col name="el-table_8_column_63" width="400"/>-->
                <col name="el-table_8_column_64" width="100"/>
              </colgroup>
              <thead>
              <tr>
                <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
                <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
                <!--<th colspan="1" rowspan="1" class="el-table_8_column_63     table-headerStyle"><div class="cell">字典</div></th>-->
                <th colspan="1" rowspan="1" class="el-table_8_column_64     table-headerStyle"><div class="cell">规范要求</div></th>
              </tr>
              </thead>
            </table>
          </div>
          <!--表体-->
          <el-form :model="StockStationInfo" v-loading="table1Loading" :show-message="false" label-width="0">
            <div class="el-table__body-wrapper is-scrolling-none">
              <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
                <colgroup>
                  <col name="el-table_8_column_60" width="150"/>
                  <col name="el-table_8_column_61" width="230"/>
                  <!--<col name="el-table_8_column_63" width="400"/>-->
                  <col name="el-table_8_column_64" width="100"/>
                </colgroup>
                <tbody>
                <tr class="el-table__row">
                  <td><div class="cell">原有开关电源型号 </div></td>
                  <td><div class="cell">{{StockStationInfo.switchmodel}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">原有开关电源使用年限 </div></td>
                  <td><div class="cell">{{StockStationInfo.switchage}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">原有开关电源负载信息（电流） </div></td>
                  <td><div class="cell">{{StockStationInfo.switchcurrentload}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">原有开关电源负载信息（电压） </div></td>
                  <td><div class="cell">{{StockStationInfo.switchvoltageload}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">整流模块型号 </div></td>
                  <td><div class="cell">{{StockStationInfo.rectifiermodulemodel}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">整流模块名称 </div></td>
                  <td><div class="cell">{{StockStationInfo.rectifiermodulename}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">整流模块使用数量 </div></td>
                  <td><div class="cell">{{StockStationInfo.rectifiermodulenusednumber}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">整流模块空余数量 </div></td>
                  <td><div class="cell">{{StockStationInfo.rectifiermodulensparenumber}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">整流模块总数 </div></td>
                  <td><div class="cell">{{StockStationInfo.rectifiermodulentotal}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                </tbody>
              </table>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="SurveyInfo.taskstate" label="蓄电池">
        <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--mini">
          <!--表头-->
          <div class="el-table__header-wrapper">
            <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
              <colgroup>
                <col name="el-table_8_column_60" width="140"/>
                <col name="el-table_8_column_61" width="230"/>
                <!--<col name="el-table_8_column_63" width="400"/>-->
                <col name="el-table_8_column_64" width="100"/>
              </colgroup>
              <thead>
              <tr>
                <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
                <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
                <!--<th colspan="1" rowspan="1" class="el-table_8_column_63     table-headerStyle"><div class="cell">字典</div></th>-->
                <th colspan="1" rowspan="1" class="el-table_8_column_64     table-headerStyle"><div class="cell">规范要求</div></th>
              </tr>
              </thead>
            </table>
          </div>
          <!--表体-->
          <el-form :model="StockStationInfo" v-loading="table1Loading" :show-message="false" label-width="0">
            <div class="el-table__body-wrapper is-scrolling-none">
              <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
                <colgroup>
                  <col name="el-table_8_column_60" width="140"/>
                  <col name="el-table_8_column_61" width="230"/>
                  <!--<col name="el-table_8_column_63" width="400"/>-->
                  <col name="el-table_8_column_64" width="100"/>
                </colgroup>
                <tbody>
                <tr class="el-table__row">
                  <td><div class="cell">蓄电池是否地埋 </div></td>
                  <td><div class="cell">{{StockStationInfo.batteryburied ? '是' : '否'}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">原有蓄电池型号 </div></td>
                  <td><div class="cell">{{StockStationInfo.batterymodel}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">原有蓄电池使用年限 </div></td>
                  <td><div class="cell">{{StockStationInfo.batteryage}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">原有蓄电池组数 </div></td>
                  <td><div class="cell">{{StockStationInfo.batterygroupnumber}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">原蓄电池单组容量(AH) </div></td>
                  <td><div class="cell">{{StockStationInfo.batterysinglecapacity}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">原有蓄电池总容量（AH） </div></td>
                  <td><div class="cell">{{StockStationInfo.batterytotal}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                </tbody>
              </table>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="SurveyInfo.taskstate" label="外电引入">
        <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--mini">
          <!--表头-->
          <div class="el-table__header-wrapper">
            <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
              <colgroup>
                <col name="el-table_8_column_60" width="100"/>
                <col name="el-table_8_column_61" width="230"/>
                <!--<col name="el-table_8_column_63" width="400"/>-->
                <col name="el-table_8_column_64" width="100"/>
              </colgroup>
              <thead>
              <tr>
                <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
                <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
                <!--<th colspan="1" rowspan="1" class="el-table_8_column_63     table-headerStyle"><div class="cell">字典</div></th>-->
                <th colspan="1" rowspan="1" class="el-table_8_column_64     table-headerStyle"><div class="cell">规范要求</div></th>
              </tr>
              </thead>
            </table>
          </div>
          <!--表体-->
          <el-form :model="StockStationInfo" v-loading="table1Loading" :show-message="false" label-width="0">
            <div class="el-table__body-wrapper is-scrolling-none">
              <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
                <colgroup>
                  <col name="el-table_8_column_60" width="100"/>
                  <col name="el-table_8_column_61" width="230"/>
                  <!--<col name="el-table_8_column_63" width="400"/>-->
                  <col name="el-table_8_column_64" width="100"/>
                </colgroup>
                <tbody>
                <tr class="el-table__row">
                  <td><div class="cell">原有引入类型 </div></td>
                  <td><div class="cell">{{StockStationInfo.introducetypename}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">原有引入电压 </div></td>
                  <td><div class="cell">{{StockStationInfo.introducevoltagename}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                </tbody>
              </table>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="SurveyInfo.taskstate" label="其他">
        <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--mini">
          <!--表头-->
          <div class="el-table__header-wrapper">
            <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
              <colgroup>
                <col name="el-table_8_column_60" width="100"/>
                <col name="el-table_8_column_61" width="230"/>
                <!--<col name="el-table_8_column_63" width="400"/>-->
                <col name="el-table_8_column_64" width="100"/>
              </colgroup>
              <thead>
              <tr>
                <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
                <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
                <!--<th colspan="1" rowspan="1" class="el-table_8_column_63     table-headerStyle"><div class="cell">字典</div></th>-->
                <th colspan="1" rowspan="1" class="el-table_8_column_64     table-headerStyle"><div class="cell">规范要求</div></th>
              </tr>
              </thead>
            </table>
          </div>
          <!--表体-->
          <el-form :model="StockStationInfo" v-loading="table1Loading" :show-message="false" label-width="0">
            <div class="el-table__body-wrapper is-scrolling-none">
              <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
                <colgroup>
                  <col name="el-table_8_column_60" width="100"/>
                  <col name="el-table_8_column_61" width="230"/>
                  <!--<col name="el-table_8_column_63" width="400"/>-->
                  <col name="el-table_8_column_64" width="100"/>
                </colgroup>
                <tbody>
                <tr class="el-table__row">
                  <td><div class="cell">原有空调情况 </div></td>
                  <td><div class="cell">{{StockStationInfo.conditionername}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">原有动环监控情况 </div></td>
                  <td><div class="cell">{{StockStationInfo.ringmonitoringname}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">原有接地情况 </div></td>
                  <td><div class="cell">{{StockStationInfo.groundingname}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                </tbody>
              </table>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="SurveyInfo.taskstate" label="特殊情况">
        <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--mini">
          <!--表头-->
          <div class="el-table__header-wrapper">
            <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
              <colgroup>
                <col name="el-table_8_column_60" width="100"/>
                <col name="el-table_8_column_61" width="230"/>
                <!--<col name="el-table_8_column_63" width="400"/>-->
                <col name="el-table_8_column_64" width="100"/>
              </colgroup>
              <thead>
              <tr>
                <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
                <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
                <!--<th colspan="1" rowspan="1" class="el-table_8_column_63     table-headerStyle"><div class="cell">字典</div></th>-->
                <th colspan="1" rowspan="1" class="el-table_8_column_64     table-headerStyle"><div class="cell">规范要求</div></th>
              </tr>
              </thead>
            </table>
          </div>
          <!--表体-->
          <el-form :model="StockStationInfo" v-loading="table1Loading" :show-message="false" label-width="0">
            <div class="el-table__body-wrapper is-scrolling-none">
              <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
                <colgroup>
                  <col name="el-table_8_column_60" width="100"/>
                  <col name="el-table_8_column_61" width="230"/>
                  <!--<col name="el-table_8_column_63" width="400"/>-->
                  <col name="el-table_8_column_64" width="100"/>
                </colgroup>
                <tbody>
                <tr class="el-table__row">
                  <td><div class="cell">特殊情况说明 </div></td>
                  <td><div class="cell">{{StockStationInfo.special}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                </tbody>
              </table>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="SurveyInfo.taskstate" label="勘察图片">
        <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--mini">
          <!--表头-->
          <div class="el-table__header-wrapper">
            <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
              <colgroup>
                <col name="el-table_8_column_60" width="100"/>
                <col name="el-table_8_column_61" width="230"/>
                <!--<col name="el-table_8_column_63" width="400"/>-->
                <col name="el-table_8_column_64" width="100"/>
              </colgroup>
              <thead>
              <tr>
                <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
                <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
                <!--<th colspan="1" rowspan="1" class="el-table_8_column_63     table-headerStyle"><div class="cell">字典</div></th>-->
                <th colspan="1" rowspan="1" class="el-table_8_column_64     table-headerStyle"><div class="cell">规范要求</div></th>
              </tr>
              </thead>
            </table>
          </div>
          <!--表体-->
          <el-form :model="StockStationInfo" v-loading="table1Loading" :show-message="false" label-width="0">
            <div class="el-table__body-wrapper is-scrolling-none">
              <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
                <colgroup>
                  <col name="el-table_8_column_60" width="100"/>
                  <col name="el-table_8_column_61" width="230"/>
                  <!--<col name="el-table_8_column_63" width="400"/>-->
                  <col name="el-table_8_column_64" width="100"/>
                </colgroup>
                <tbody>
                <tr class="el-table__row">
                  <td><div class="cell">360环境照片 </div></td>
                  <td><div class="cell" @click="OpenImgBox('360环境照片')">{{formatString(StockStationInfo.environment)}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">机房照片 </div></td>
                  <td><div class="cell" @click="OpenImgBox('机房照片')">{{formatString(StockStationInfo.roomsintegration)}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">塔桅及天面照片 </div></td>
                  <td><div class="cell" @click="OpenImgBox('塔桅及天面照片')">{{formatString(StockStationInfo.roofing)}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <!--<tr class="el-table__row">
                  <td><div class="cell">站点补充图 </div></td>
                  <td><div class="cell" @click="OpenImgBox('站点补充图')">{{formatString(StockStationInfo.sitesupplementarymap)}}</div></td>
                  &lt;!&ndash;<td><div class="cell"></div></td>&ndash;&gt;
                  <td><div class="cell"></div></td>
                </tr>-->
                <tr class="el-table__row">
                  <td><div class="cell">勘察草图 </div></td>
                  <td><div class="cell" @click="OpenImgBox('勘察草图')">{{formatString(StockStationInfo.sketch)}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">设备照片 </div></td>
                  <td><div class="cell" @click="OpenImgBox('设备照片')">{{formatString(StockStationInfo.equipmentimg)}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                </tbody>
              </table>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="SurveyInfo.taskstate" label="勘察隐患">
        <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--mini">
          <!--表头-->
          <div class="el-table__header-wrapper">
            <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
              <colgroup>
                <col name="el-table_8_column_60" width="100"/>
                <col name="el-table_8_column_61" width="230"/>
                <!--<col name="el-table_8_column_63" width="400"/>-->
                <col name="el-table_8_column_64" width="100"/>
              </colgroup>
              <thead>
              <tr>
                <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
                <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
                <!--<th colspan="1" rowspan="1" class="el-table_8_column_63     table-headerStyle"><div class="cell">字典</div></th>-->
                <th colspan="1" rowspan="1" class="el-table_8_column_64     table-headerStyle"><div class="cell">规范要求</div></th>
              </tr>
              </thead>
            </table>
          </div>
          <!--表体-->
          <el-form :model="StockStationInfo" v-loading="table1Loading" :show-message="false" label-width="0">
            <div class="el-table__body-wrapper is-scrolling-none">
              <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
                <colgroup>
                  <col name="el-table_8_column_60" width="100"/>
                  <col name="el-table_8_column_61" width="230"/>
                  <!--<col name="el-table_8_column_63" width="400"/>-->
                  <col name="el-table_8_column_64" width="100"/>
                </colgroup>
                <tbody>
                <tr class="el-table__row">
                  <td><div class="cell">机房所处地隐患 </div></td>
                  <td><div class="cell" @click="OpenImgBox('机房所处地隐患')">{{formatString(StockStationInfo.roomsarehd)}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">机房内设备隐患 </div></td>
                  <td><div class="cell" @click="OpenImgBox('机房内设备隐患')">{{formatString(StockStationInfo.roomequipmenthd)}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">塔桅隐患 </div></td>
                  <td><div class="cell" @click="OpenImgBox('塔桅隐患')">{{formatString(StockStationInfo.towermasthd)}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">楼面站天面隐患 </div></td>
                  <td><div class="cell" @click="OpenImgBox('楼面站天面隐患')">{{formatString(StockStationInfo.floorstandroofinghd)}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">塔脚，地锚隐患 </div></td>
                  <td><div class="cell" @click="OpenImgBox('塔脚，地锚隐患')">{{formatString(StockStationInfo.columnfootanchorhd)}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">拉线情况隐患 </div></td>
                  <td><div class="cell" @click="OpenImgBox('拉线情况隐患')">{{formatString(StockStationInfo.staysituationhd)}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">地网情况隐患 </div></td>
                  <td><div class="cell" @click="OpenImgBox('地网情况隐患')">{{formatString(StockStationInfo.netsituationhd)}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                </tbody>
              </table>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="center">
      <el-button @click="closeShowEdit" type="primary" style="margin-bottom: 40px;" icon="el-icon-arrow-left">返回</el-button>
      <el-button type="warning" @click="subAuit(2)" v-if="SurveyInfoType===2">审核打回</el-button>
      <el-button type="success" @click="subAuit(1)" v-if="SurveyInfoType===2">审核通过</el-button>
    </div>
    <ImgBox ref="ImgBox"></ImgBox>
    <el-dialog title="审核打回" :visible.sync="auitShow" center width="30%" @close="auitClose">
      <el-form :data="auitData">
        <el-row style="margin-bottom:15px">
          <el-col :span="6">项目名称</el-col>
          <el-col :span="16">{{WriteData.resourcename}}</el-col>
        </el-row>
        <el-row style="margin-bottom:15px">
          <el-input type="textarea" :autosize="{ minRows: 2 }" placeholder="请输入审核意见" v-model="auitData.remark"></el-input>
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
import layuiTitle from 'base/layui-title'
import {mapGetters} from 'vuex'
import ImgBox from 'base/ImgBox'
import {GetProjectInfo, GetStockResourceCensusInfo, AuitTask} from 'api/SurveyManagement'
export default {
  name: 'StockStation',
  data () {
    return {
      ViewTabIndex: '0',
      WriteData: {
        cityname: '',
        areaname: '',
        demandside: '',
        demandno: '',
        demandname: '',
        demandbatch: '',
        resourcename: '',
        constructionmodename: '',
        resourcecode: '',
        rawoperator: '',
        taskstatename: '',
        planninglongitude: '',
        planninglatitude: '',
        coverage: '',
        createconstructionarea: '',
        hotdataarea: '',
        coveringtarget: '',
        stockstationresults: '',
        recentlyresourcecode: ''
      },
      StockStationInfo: {
        resourceaddress: '',
        geographicname: '',
        websitebuildingmodename: '',
        coversscenarioname: '',
        realitylongitude: '',
        realitylatitude: '',
        demanddistance: 0,
        ownedoperator: '',
        buildingtype: '',
        floorstructurecondition: '',
        maintenancefriendly: '',
        mainbuildingfloor: '',
        computerroomfloor: '',
        towermastfloor: '',
        floorsafetyassessment: '',
        rawtower: '',
        roomtype: null,
        rawhightower: '',
        rawplatformnumber: '',
        sparederrick: '',
        sparederricknumber: '',
        roomtypename: '',
        roomsubdividetypename: '',
        roompropertyname: '',
        roomsize: '',
        rawcrosshangingtype: '',
        feederwindow: '',
        cabinetnumber: '',
        cabinetspecifications: '',
        switchmodel: '',
        switchage: '',
        switchcurrentload: '',
        switchvoltageload: '',
        rectifiermodulemodel: '',
        rectifiermodulename: '',
        rectifiermodulenusednumber: '',
        rectifiermodulensparenumber: '',
        rectifiermodulentotal: '',
        batteryburied: '',
        batterymodel: '',
        batteryage: '',
        batterygroupnumber: '',
        batterysinglecapacity: '',
        batterytotal: '',
        introducetypename: '',
        introducevoltagename: '',
        conditionername: '',
        ringmonitoringname: '',
        groundingname: '',
        special: '',
        environment: [],
        roomsintegration: [],
        roofing: [],
        sitesupplementarymap: [],
        sketch: [],
        equipmentimg: [],
        roomsarehd: [],
        roomequipmenthd: [],
        towermasthd: [],
        floorstandroofinghd: [],
        columnfootanchorhd: [],
        staysituationhd: [],
        netsituationhd: []
      },
      // 审核弹窗
      auitShow: false,
      // 审核数据
      auitData: {
        taskid: '',
        remark: ''
      },
      table1Loading: false,
      SurveyInfo: {
      }/*,
      imgList: {
        environment: [],
        roomsintegration: [],
        roofing: [],
        sitesupplementarymap: [],
        sketch: [],
        equipmentimg: [],
        roomsarehd: [],
        roomequipmenthd: [],
        towermasthd: [],
        floorstandroofinghd: [],
        columnfootanchorhd: [],
        staysituationhd: [],
        netsituationhd: []
      } */
    }
  },
  activated () {
    if (this.SurveyInfoType === 1) {
      this.SurveyInfo = this.ProjectSurveyInfo
    } else if (this.SurveyInfoType === 2) {
      this.SurveyInfo = this.TaskSurveyInfo
    }
    this.ViewTabIndex = '0'
    this.getDetailInfo()
    if (this.SurveyInfo.taskstate) {
      this.getStockStationInfo()
    }
  },
  methods: {
    getDetailInfo () {
      this.table1Loading = true
      this.$axios.get(GetProjectInfo, {
        params: {
          id: this.SurveyInfo.id
        }
      }).then(res => {
        if (res.data !== null) {
          this.WriteData = res.data
        }
        if (res.success === false) {
          this.closeShowEdit()
        }
      }).catch(error => {
        console.log(error)
      })
      this.table1Loading = false
    },
    getStockStationInfo () {
      // Object.assign(this.$data.imgList, this.$options.data().imgList)
      this.$axios.get(GetStockResourceCensusInfo, {
        params: {
          projectid: this.SurveyInfo.id
        }
      }).then(res => {
        if (res.data != null) {
          this.StockStationInfo = res.data
        /* if (res.data.environment) {
          this.imgList.environment = JSON.parse(res.data.environment)
        }
        if (res.data.roomsintegration) {
          this.imgList.roomsintegration = JSON.parse(res.data.roomsintegration)
        } */
        }
      })
    },
    handleTabs () {

    },
    closeShowEdit () {
      this.ViewTabIndex = '0'
      Object.assign(this.$data.WriteData, this.$options.data().WriteData)
      // Object.assign(this.$data.imgList, this.$options.data().imgList)
      Object.assign(this.$data.StockStationInfo, this.$options.data().StockStationInfo)
      if (this.SurveyInfo.from === 'ProjectManagement') {
        this.$router.push({name: 'ProjectManagement'})
        this.$emit('handleChange', 'ProjectManagement', '2d6a2407-c247-404f-b093-a91f524a56fa')
      } else if (this.SurveyInfo.from === 'TaskManagement') {
        this.$router.push({name: 'TaskManagement'})
        this.$emit('handleChange', 'TaskManagement', 'dc73026f-3906-4f64-a8bd-1a2bc646f1fe')
      }
    },
    OpenImgBox (val, flag) {
      switch (val) {
        case '360环境照片':
          console.log(this.StockStationInfo.environment)
          this.$refs.ImgBox.SetData('360环境照片', '360度环境照片', this.StockStationInfo.environment, true)
          break
        case '机房照片':
          this.$refs.ImgBox.SetData('机房照片', '机房照片', this.StockStationInfo.roomsintegration)
          break
        case '塔桅及天面照片':
          this.$refs.ImgBox.SetData('塔桅及天面照片', '塔桅及天面照片', this.StockStationInfo.roofing)
          break
        case '站点补充图':
          this.$refs.ImgBox.SetData('站点补充图', '站点补充图', this.StockStationInfo.sitesupplementarymap)
          break
        case '勘察草图':
          this.$refs.ImgBox.SetData('勘察草图', '勘察草图', this.StockStationInfo.sketch)
          break
        case '设备照片':
          this.$refs.ImgBox.SetData('设备照片', '设备照片', this.StockStationInfo.equipmentimg)
          break
        case '机房所处地隐患':
          this.$refs.ImgBox.SetData('机房所处地隐患', '机房所处地隐患', this.StockStationInfo.roomsarehd)
          break
        case '机房内设备隐患':
          this.$refs.ImgBox.SetData('机房内设备隐患', '机房内设备隐患', this.StockStationInfo.roomequipmenthd)
          break
        case '塔桅隐患':
          this.$refs.ImgBox.SetData('塔桅隐患', '塔桅隐患', this.StockStationInfo.towermasthd)
          break
        case '楼面站天面隐患':
          this.$refs.ImgBox.SetData('楼面站天面隐患', '楼面站天面隐患', this.StockStationInfo.floorstandroofinghd)
          break
        case '塔脚，地锚隐患':
          this.$refs.ImgBox.SetData('塔脚，地锚隐患', '塔脚，地锚隐患', this.StockStationInfo.columnfootanchorhd)
          break
        case '拉线情况隐患':
          this.$refs.ImgBox.SetData('拉线情况隐患', '拉线情况隐患', this.StockStationInfo.staysituationhd)
          break
        case '地网情况隐患':
          this.$refs.ImgBox.SetData('地网情况隐患', '地网情况隐患', this.StockStationInfo.netsituationhd)
          break
      }
      this.$refs.ImgBox.Open()
      this.$refs.ImgBox.Flag = true
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
          this.closeShowEdit()
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
        this.getDetailInfo()
        if (this.SurveyInfo.taskstate) {
          this.getStockStationInfo()
        }
      }
    }
  },
  components: {
    layuiTitle,
    ImgBox
  }
}
</script>

<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
