<template>
  <div v-loading="WriteLoading" style="margin:15px">
    <layuiTitle :title="SurveyInfo.state === 1 ? '编辑存量站' : '存量站详情'"></layuiTitle>
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
                  <td><div class="cell">任务单号 </div></td>
                  <td><div class="cell">{{WriteData.taskno}}</div></td>
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
                  <td @click="OpenMap(0, true)">
                    <div class="cell"><span>{{WriteData.planninglongitude}}<i class="el-icon-location icon_location"></i></span></div>
                  </td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">需求纬度 </div></td>
                  <td @click="OpenMap(0, true)"><div class="cell">{{WriteData.planninglatitude}}</div></td>
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
          <el-form :model="StockStationInfo" v-loading="table1Loading" :rules="Rules1" ref="WriteForm1" :show-message="false" label-width="0">
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
                      <el-input v-model="StockStationInfo.resourceaddress"></el-input>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState === 2"><div class="cell">{{StockStationInfo.resourceaddress}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <!--地理环境-->
                <tr class="el-table__row">
                  <td><div class="cell"><i class="must">*</i>地理环境</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="geographic">
                      <el-select v-model="StockStationInfo.geographic">
                        <el-option label="请选择" :value="null"></el-option>
                        <el-option v-for="i in DicList.geographic" :key="i.id" :label="i.text" :value="i.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </div></td>
                  <td v-show="WriteState === 2"><div class="cell">{{StockStationInfo.geographicname}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <!--建站模式-->
                <tr class="el-table__row">
                  <td><div class="cell"><i class="must">*</i>建站模式</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="websitebuildingmode">
                      <el-select v-model="StockStationInfo.websitebuildingmode">
                        <el-option label="请选择" :value="null"></el-option>
                        <el-option v-for="i in DicList.websitebuildingmode" :key="i.id" :label="i.text" :value="i.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </div></td>
                  <td v-show="WriteState === 2"><div class="cell">{{StockStationInfo.websitebuildingmodename}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <!--覆盖场景-->
                <tr class="el-table__row">
                  <td><div class="cell"><i class="must">*</i>覆盖场景</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="coversscenario">
                      <el-select v-model="StockStationInfo.coversscenario">
                        <el-option label="请选择" :value="null"></el-option>
                        <el-option v-for="i in DicList.coversscenario" :key="i.id" :label="i.text" :value="i.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </div></td>
                  <td v-show="WriteState === 2"><div class="cell">{{StockStationInfo.coversscenarioname}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <!--实际经度-->
                <tr class="el-table__row">
                  <td><div class="cell"><i class="must">*</i>实际经度</div></td>
                  <td v-show="WriteState !== 2" @click="OpenMap(1)"><div class="cell">
                    <el-form-item class="form-item" prop="realitylongitude">
                      <el-input v-model="StockStationInfo.realitylongitude" readonly style="width: 80%"></el-input>
                      <i class="el-icon-location" style="font-size: 20px;color:#F64245;"></i>
                    </el-form-item>
                  </div></td>
                  <td v-show="WriteState == 2" @click="OpenMap(0)">
                    <div class="cell location"><span>{{StockStationInfo.realitylongitude}}</span><i class="el-icon-location icon_location"></i></div>
                  </td>
                  <td><div class="cell"></div></td>
                </tr>
                <!--实际纬度-->
                <tr class="el-table__row">
                  <td><div class="cell"><i class="must">*</i>实际纬度</div></td>
                  <td v-show="WriteState !== 2" @click="OpenMap(1)"><div class="cell">
                    <el-form-item class="form-item" prop="realitylatitude">
                      <el-input v-model="StockStationInfo.realitylatitude" readonly style="width: 80%"></el-input>
                    </el-form-item>
                  </div></td>
                  <td v-show="WriteState == 2" @click="OpenMap(0)">
                    <div class="cell">{{StockStationInfo.realitylatitude}}</div>
                  </td>
                  <td><div class="cell"></div></td>
                </tr>
                <!--与需求偏移距离-->
                <tr class="el-table__row">
                  <td><div class="cell"><i class="must">*</i>与规划偏移距离(米)</div></td>
                  <td>
                    <div class="cell">
                      <div>{{StockStationInfo.demanddistance}}</div>
                    </div>
                  </td>
                  <!-- <td><div class="cell"></div></td> -->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell"><i class="must">*</i>本次需求归属运营商</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="ownedoperator">
                      <el-select v-model="StockStationInfo.ownedoperator" multiple placeholder="请选择" size="small">
                        <!--<el-option label="请选择" :value="0"></el-option>-->
                        <el-option v-for="i in DicList.ownedoperator" :key="i.text" :label="i.text" :value="i.text"></el-option>
                      </el-select>
                    </el-form-item>
                  </div></td>
                  <td v-show="WriteState == 2"><div class="cell">{{StockStationInfo.ownedoperator}}</div></td>
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
          <el-form :model="StockStationInfo" v-loading="table1Loading" :rules="Rules2" ref="WriteForm2" :show-message="false" label-width="0">
            <div class="el-table__body-wrapper is-scrolling-none">
              <table v-if="StockStationInfo.websitebuildingmode === 1" cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
                <colgroup>
                  <col name="el-table_8_column_60" width="100"/>
                  <col name="el-table_8_column_61" width="230"/>
                  <!--<col name="el-table_8_column_63" width="400"/>-->
                  <col name="el-table_8_column_64" width="100"/>
                </colgroup>
                <tbody>
                <!--原有塔型-->
                <tr class="el-table__row">
                  <td><div class="cell"><i class="must">*</i>原有塔型</div></td>
                  <td v-if="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="rawtower">
                      <el-select v-model="StockStationInfo.rawtower" multiple placeholder="请选择" size="small">
                        <!--<el-option label="请选择" :value="0"></el-option>-->
                        <el-option v-for="i in DicList.rawtower" :key="i.text" :label="i.text" :value="i.text"></el-option>
                      </el-select>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState == 2"><div class="cell">{{StockStationInfo.rawtower instanceof Array ? '' : StockStationInfo.rawtower}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <!--建筑物类型-->
                <tr class="el-table__row">
                  <td><div class="cell"><i class="must">*</i>建筑物类型</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="buildingtype">
                      <el-input v-model="StockStationInfo.buildingtype"></el-input>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState === 2"><div class="cell">{{StockStationInfo.buildingtype}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <!--是否能够获取楼面结构情况-->
                <tr class="el-table__row">
                  <td><div class="cell"><i class="must">*</i>是否能够获取楼面结构情况</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="floorstructurecondition">
                      <el-select v-model="StockStationInfo.floorstructurecondition">
                        <el-option label="请选择" :value="null"></el-option>
                        <el-option label="是" :value="true"></el-option>
                        <el-option label="否" :value="false"></el-option>
                      </el-select>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState === 2"><div class="cell">{{StockStationInfo.floorstructurecondition === null ? '' : StockStationInfo.floorstructurecondition ? '是' : '否'}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <!--维护是否方便-->
                <tr class="el-table__row">
                  <td><div class="cell"><i class="must">*</i>维护是否方便</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="maintenancefriendly">
                      <el-select v-model="StockStationInfo.maintenancefriendly">
                        <el-option label="请选择" :value="null"></el-option>
                        <el-option label="是" :value="true"></el-option>
                        <el-option label="否" :value="false"></el-option>
                      </el-select>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState === 2"><div class="cell">{{StockStationInfo.maintenancefriendly === null ? '' : StockStationInfo.maintenancefriendly ? '是' : '否'}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <!--建筑总楼层-->
                <tr class="el-table__row">
                  <td><div class="cell"><i class="must">*</i>建筑总楼层</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="mainbuildingfloor">
                      <el-input v-model="StockStationInfo.mainbuildingfloor"></el-input>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState === 2"><div class="cell">{{StockStationInfo.mainbuildingfloor}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <!--机房所在楼层-->
                <tr class="el-table__row">
                  <td><div class="cell"><i class="must">*</i>机房所在楼层</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="computerroomfloor">
                      <el-input v-model="StockStationInfo.computerroomfloor"></el-input>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState === 2"><div class="cell">{{StockStationInfo.computerroomfloor}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <!--塔桅所在楼层-->
                <tr class="el-table__row">
                  <td><div class="cell"><i class="must">*</i>塔桅所在楼层</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="towermastfloor">
                      <el-input v-model="StockStationInfo.towermastfloor"></el-input>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState === 2"><div class="cell">{{StockStationInfo.towermastfloor}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <!--楼面安全评估-->
                <tr class="el-table__row">
                  <td><div class="cell"><i class="must">*</i>楼面安全评估</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="floorsafetyassessment">
                      <el-input v-model="StockStationInfo.floorsafetyassessment"></el-input>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState === 2"><div class="cell">{{StockStationInfo.floorsafetyassessment}}</div></td>
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
                <!--原有塔型-->
                <tr class="el-table__row">
                  <td><div class="cell"><i class="must">*</i>原有塔型</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="rawtower">
                      <el-select v-model="StockStationInfo.rawtower">
                        <el-option label="请选择" :value="null"></el-option>
                        <el-option v-for="i in DicList.rawtower" :key="i.id" :label="i.text" :value="i.text"></el-option>
                      </el-select>
                    </el-form-item>
                  </div></td>
                  <td v-show="WriteState === 2"><div class="cell">{{StockStationInfo.rawtower}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <!--原有塔高-->
                <tr class="el-table__row">
                  <td><div class="cell"><i class="must">*</i>原有塔高</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="rawhightower">
                      <el-input v-model="StockStationInfo.rawhightower"></el-input>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState === 2"><div class="cell">{{StockStationInfo.rawhightower}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <!--原有平台数-->
                <tr class="el-table__row">
                  <td><div class="cell"><i class="must">*</i>原有平台数</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="rawplatformnumber">
                      <el-input v-model="StockStationInfo.rawplatformnumber"></el-input>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState === 2"><div class="cell">{{StockStationInfo.rawplatformnumber}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <!--是否有空余抱杆-->
                <tr class="el-table__row">
                  <td><div class="cell"><i class="must">*</i>是否有空余抱杆</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="sparederrick">
                      <el-select v-model="StockStationInfo.sparederrick">
                        <el-option label="请选择" :value="null"></el-option>
                        <el-option label="是" :value="true"></el-option>
                        <el-option label="否" :value="false"></el-option>
                      </el-select>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState === 2"><div class="cell">{{StockStationInfo.sparederrick === null ? '' : StockStationInfo.sparederrick ? '是' : '否'}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <!--空余抱杆数量-->
                <tr class="el-table__row">
                  <td><div class="cell"><i class="must">*</i>空余抱杆数量</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="sparederricknumber">
                      <el-input v-model="StockStationInfo.sparederricknumber" :disabled="!StockStationInfo.sparederrick"></el-input>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState === 2"><div class="cell">{{StockStationInfo.sparederricknumber}}</div></td>
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
          <el-form :model="StockStationInfo" v-loading="table1Loading" :rules="Rules3" ref="WriteForm3" :show-message="false" label-width="0">
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
                  <td><div class="cell"><i class="must">*</i>机房类型</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="roomtype">
                      <el-select v-model="StockStationInfo.roomtype">
                        <el-option label="请选择" :value="null"></el-option>
                        <el-option v-for="i in DicList.roomtype" :key="i.id" :label="i.text" :value="i.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </div></td>
                  <td v-show="WriteState === 2"><div class="cell">{{StockStationInfo.roomtypename}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row" v-if="StockStationInfo.roomtype === 5">
                  <td><div class="cell"><i class="must">*</i>机房细分类型</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="roomsubdividetype">
                      <el-select v-model="StockStationInfo.roomsubdividetype">
                        <el-option label="请选择" :value="null"></el-option>
                        <el-option v-for="i in DicList.roomsubdividetype" :key="i.id" :label="i.text" :value="i.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </div></td>
                  <td v-show="WriteState === 2"><div class="cell">{{StockStationInfo.roomsubdividetypename}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row" v-if="StockStationInfo.roomtype === 1 || StockStationInfo.roomtype === 3 || StockStationInfo.roomtype === 4 || StockStationInfo.roomtype === 7">
                  <td><div class="cell"><i class="must">*</i>机房产权</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="roomproperty">
                      <el-select v-model="StockStationInfo.roomproperty">
                        <el-option label="请选择" :value="null"></el-option>
                        <el-option v-for="i in DicList.roomproperty" :key="i.id" :label="i.text" :value="i.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </div></td>
                  <td v-show="WriteState === 2"><div class="cell">{{StockStationInfo.roompropertyname}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row" v-if="StockStationInfo.roomtype !== 5 && StockStationInfo.roomtype !== 6">
                  <td><div class="cell"><i class="must">*</i>机房尺寸</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="roomsize">
                      <el-input v-model="StockStationInfo.roomsize"></el-input>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState === 2"><div class="cell">{{StockStationInfo.roomsize}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row" v-if="StockStationInfo.roomtype !== 5">
                  <td><div class="cell"><i class="must">*</i>馈线窗空余情况(剩余孔数)</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="feederwindow">
                      <el-input v-model.number="StockStationInfo.feederwindow"></el-input>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState === 2"><div class="cell">{{StockStationInfo.feederwindow}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row" v-if="StockStationInfo.roomtype === 2">
                  <td><div class="cell"><i class="must">*</i>原有一体化机柜数量</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="cabinetnumber">
                      <el-input v-model.number="StockStationInfo.cabinetnumber"></el-input>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState === 2"><div class="cell">{{StockStationInfo.cabinetnumber}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row" v-if="StockStationInfo.roomtype === 2">
                  <td><div class="cell">原有一体化机柜规格</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="cabinetspecifications">
                      <el-input v-model="StockStationInfo.cabinetspecifications"></el-input>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState === 2"><div class="cell">{{StockStationInfo.cabinetspecifications}}</div></td>
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
                  <td><div class="cell">原有交挂型号</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="rawcrosshangingtype">
                      <el-input v-model="StockStationInfo.rawcrosshangingtype"></el-input>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState === 2"><div class="cell">{{StockStationInfo.rawcrosshangingtype}}</div></td>
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
          <el-form :model="StockStationInfo" v-loading="table1Loading" :rules="Rules4" ref="WriteForm4" :show-message="false" label-width="0">
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
                  <td><div class="cell"><i class="must">*</i>原有开关电源型号</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="switchmodel">
                      <el-input v-model="StockStationInfo.switchmodel"></el-input>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState === 2"><div class="cell">{{StockStationInfo.switchmodel}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">原有开关电源使用年限</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="switchage">
                      <el-input v-model="StockStationInfo.switchage"></el-input>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState === 2"><div class="cell">{{StockStationInfo.switchage}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell"><i class="must">*</i>原有开关电源负载信息（电流）</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="switchcurrentload">
                      <el-input v-model="StockStationInfo.switchcurrentload" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></el-input>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState === 2"><div class="cell">{{StockStationInfo.switchcurrentload}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell"><i class="must">*</i>原有开关电源负载信息（电压）</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="switchvoltageload">
                      <el-input v-model="StockStationInfo.switchvoltageload" onkeyup="this.value=this.value.replace(/[^\d.]/g,'')"></el-input>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState === 2"><div class="cell">{{StockStationInfo.switchvoltageload}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell"><i class="must">*</i>整流模块型号</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="rectifiermodulemodel">
                      <el-input v-model="StockStationInfo.rectifiermodulemodel"></el-input>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState === 2"><div class="cell">{{StockStationInfo.rectifiermodulemodel}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">整流模块名称</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="rectifiermodulename">
                      <el-input v-model="StockStationInfo.rectifiermodulename"></el-input>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState === 2"><div class="cell">{{StockStationInfo.rectifiermodulename}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell"><i class="must">*</i>整流模块使用数量</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="rectifiermodulenusednumber">
                      <el-input v-model.number="StockStationInfo.rectifiermodulenusednumber"></el-input>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState === 2"><div class="cell">{{StockStationInfo.rectifiermodulenusednumber}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell"><i class="must">*</i>整流模块空余数量</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="rectifiermodulensparenumber">
                      <el-input v-model.number="StockStationInfo.rectifiermodulensparenumber"></el-input>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState === 2"><div class="cell">{{StockStationInfo.rectifiermodulensparenumber}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell"><i class="must">*</i>整流模块总数</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="rectifiermodulentotal">
                      <el-input v-model.number="StockStationInfo.rectifiermodulentotal"></el-input>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState === 2"><div class="cell">{{StockStationInfo.rectifiermodulentotal}}</div></td>
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
          <el-form :model="StockStationInfo" v-loading="table1Loading" :rules="Rules5" ref="WriteForm5" :show-message="false" label-width="0">
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
                  <td><div class="cell"><i class="must">*</i>原有蓄电池型号</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="batterymodel">
                      <el-input v-model="StockStationInfo.batterymodel"></el-input>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState === 2"><div class="cell">{{StockStationInfo.batterymodel}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell"><i class="must">*</i>原有蓄电池使用年限</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="batteryage">
                      <el-input v-model="StockStationInfo.batteryage"></el-input>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState === 2"><div class="cell">{{StockStationInfo.batteryage}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell"><i class="must">*</i>原有蓄电池组数</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="batterygroupnumber">
                      <el-input v-model.number="StockStationInfo.batterygroupnumber"></el-input>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState === 2"><div class="cell">{{StockStationInfo.batterygroupnumber}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell"><i class="must">*</i>原蓄电池单组容量(AH)</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="batterysinglecapacity">
                      <el-input v-model="StockStationInfo.batterysinglecapacity"></el-input>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState === 2"><div class="cell">{{StockStationInfo.batterysinglecapacity}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell"><i class="must">*</i>原有蓄电池总容量（AH）</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="batterytotal">
                      <el-input v-model="StockStationInfo.batterytotal"></el-input>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState === 2"><div class="cell">{{StockStationInfo.batterytotal}}</div></td>
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
          <el-form :model="StockStationInfo" v-loading="table1Loading" :rules="Rules6" ref="WriteForm6" :show-message="false" label-width="0">
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
                  <td><div class="cell"><i class="must">*</i>原有引入类型</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="introducetype">
                      <el-select v-model="StockStationInfo.introducetype">
                        <el-option label="请选择" :value="null"></el-option>
                        <el-option v-for="i in DicList.introducetype" :key="i.id" :label="i.text" :value="i.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </div></td>
                  <td v-show="WriteState === 2"><div class="cell">{{StockStationInfo.introducetypename}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell"><i class="must">*</i>原有引入电压</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="introducevoltage">
                      <el-select v-model="StockStationInfo.introducevoltage">
                        <el-option label="请选择" :value="null"></el-option>
                        <el-option v-for="i in DicList.introducevoltage" :key="i.id" :label="i.text" :value="i.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </div></td>
                  <td v-show="WriteState === 2"><div class="cell">{{StockStationInfo.introducevoltagename}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell"><i class="must">*</i>原有引入距离</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="introducedistance">
                      <el-input v-model.number="StockStationInfo.introducedistance"></el-input>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState === 2"><div class="cell">{{StockStationInfo.introducedistance}}</div></td>
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
          <el-form :model="StockStationInfo" v-loading="table1Loading" :rules="Rules7" ref="WriteForm7" :show-message="false" label-width="0">
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
                  <td><div class="cell"><i class="must">*</i>原有空调情况</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="conditioner">
                      <el-select v-model="StockStationInfo.conditioner">
                        <el-option label="请选择" :value="null"></el-option>
                        <el-option v-for="i in DicList.conditioner" :key="i.id" :label="i.text" :value="i.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </div></td>
                  <td v-show="WriteState === 2"><div class="cell">{{StockStationInfo.conditionername}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell"><i class="must">*</i>原有动环监控情况</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="ringmonitoring">
                      <el-select v-model="StockStationInfo.ringmonitoring">
                        <el-option label="请选择" :value="null"></el-option>
                        <el-option v-for="i in DicList.ringmonitoring" :key="i.id" :label="i.text" :value="i.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </div></td>
                  <td v-show="WriteState === 2"><div class="cell">{{StockStationInfo.ringmonitoringname}}</div></td>
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell"><i class="must">*</i>原有接地情况</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="grounding">
                      <el-select v-model="StockStationInfo.grounding">
                        <el-option label="请选择" :value="null"></el-option>
                        <el-option v-for="i in DicList.grounding" :key="i.id" :label="i.text" :value="i.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </div></td>
                  <td v-show="WriteState === 2"><div class="cell">{{StockStationInfo.groundingname}}</div></td>
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
                  <td><div class="cell">特殊情况说明</div></td>
                  <td v-show="WriteState !== 2"><div class="cell">
                    <el-form-item class="form-item" prop="special">
                      <el-input v-model="StockStationInfo.special"></el-input>
                    </el-form-item>
                  </div></td>
                  <td v-if="WriteState === 2"><div class="cell">{{StockStationInfo.special}}</div></td>
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
                  <td><div class="cell"><i class="must">*</i>360环境照片 </div></td>
                  <td><div class="cell" @click="OpenSurveyImgBox('360环境照片')">{{formatResult(StockStationInfo.environment)}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">机房照片 </div></td>
                  <td><div class="cell" @click="OpenSurveyImgBox('机房照片')">{{formatResult(StockStationInfo.roomsintegration)}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">塔桅及天面照片 </div></td>
                  <td><div class="cell" @click="OpenSurveyImgBox('塔桅及天面照片')">{{formatResult(StockStationInfo.roofing)}}</div></td>
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
                  <td><div class="cell" @click="OpenSurveyImgBox('勘察草图')">{{formatResult(StockStationInfo.sketch)}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">设备照片（机房） </div></td>
                  <td><div class="cell" @click="OpenSurveyImgBox('设备照片（机房）')">{{formatResult(StockStationInfo.roomequipmentimg)}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <tr class="el-table__row">
                  <td><div class="cell">设备照片(室外一体化机柜) </div></td>
                  <td><div class="cell" @click="OpenSurveyImgBox('设备照片(室外一体化机柜)')">{{formatResult(StockStationInfo.cabinetquipmentimg)}}</div></td>
                  <!--<td><div class="cell"></div></td>-->
                  <td><div class="cell"></div></td>
                </tr>
                <!--电表照片-->
                <tr class="el-table__row">
                  <td><div class="cell">电表照片</div></td>
                  <td>
                    <div class="cell" @click="OpenSurveyImgBox('电表照片')">
                      {{formatResult(StockStationInfo.electricmeterimg)}}
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
      <el-tab-pane v-if="SurveyInfo.taskstate" label="站点隐患">
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
      <el-button v-if="WriteState === 1" @click="SubmitAuit" type="primary" icon="el-icon-back">提交审核</el-button>
      <el-button v-if="WriteState === 1" @click="SubmitSave" type="primary" icon="el-icon-back">保存</el-button>
      <el-button @click="closeShowEdit" type="primary" style="margin-bottom: 40px;" icon="el-icon-arrow-left">返回</el-button>
      <el-button type="warning" @click="subAuit(2)" v-if="SurveyInfoType===2">审核退回</el-button>
      <el-button type="success" @click="subAuit(1)" v-if="SurveyInfoType===2">审核通过</el-button>
    </div>
    <ImgBox ref="ImgBox"></ImgBox>
    <SurveyImgBox ref="SurveyImgBox"></SurveyImgBox>
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
          <el-form-item label="需求单号：" v-if="WriteData.taskstatename === '地市审核'">
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
  </div>
</template>

<script>
import GoogleMap from 'base/GoogleMap'
import layuiTitle from 'base/layui-title'
import {DictionaryInfoList} from 'api/api'
import {mapGetters} from 'vuex'
import ImgBox from 'base/ImgBox'
import SurveyImgBox from 'base/SurveyImgBox'
import EnvironmentImgBox from 'base/EnvironmentImgBox'
import {GetProjectInfo, GetStockResourceCensusInfo, AuitTask, GetDistance, GetInvestigateImgConfigurationList, UpdateStockResourceCensus, GetStockResourceCensusSubmitAuit} from 'api/SurveyManagement'
export default {
  name: 'StockStation',
  data () {
    return {
      ViewTabIndex: '0',
      WriteState: null,
      showMap: false,
      isShow: false,
      WriteLoading: false,
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
        geographic: null,
        websitebuildingmode: null,
        geographicname: '',
        coversscenario: null,
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
        roomsubdividetype: null,
        roomsubdividetypename: '',
        roomproperty: null,
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
        batterymodel: '',
        batteryage: '',
        batterygroupnumber: '',
        batterysinglecapacity: '',
        batterytotal: '',
        introducetype: null,
        introducetypename: '',
        introducevoltage: null,
        introducevoltagename: '',
        introducedistance: null,
        conditionername: '',
        conditioner: null,
        ringmonitoring: null,
        grounding: null,
        ringmonitoringname: '',
        groundingname: '',
        special: '',
        environment: [],
        roomsintegration: [],
        roofing: [],
        sitesupplementarymap: [],
        sketch: [],
        roomequipmentimg: [],
        cabinetquipmentimg: [],
        electricmeterimg: [],
        roomsarehd: [],
        roomequipmenthd: [],
        towermasthd: [],
        floorstandroofinghd: [],
        columnfootanchorhd: [],
        staysituationhd: [],
        netsituationhd: []
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
        rawtower: [
          { required: true, message: '请选择原有塔型', trigger: 'change' }
        ],
        rawhightower: [
          { required: true, message: '请输入原有塔高', trigger: 'blur' }
        ],
        rawplatformnumber: [
          { required: true, message: '请输入原有平台数', trigger: 'blur' }
        ],
        sparederrick: [
          { required: true, message: '请选择是否有空余抱杆', trigger: 'change' }
        ],
        sparederricknumber: [
          { required: true, message: '请输入空余抱杆数量', trigger: 'blur' }
        ]
      },
      Rules3: {
        roomtype: [
          { required: true, message: '请选择机房类型', trigger: 'change' }
        ],
        roomsubdividetype: [
          { required: true, message: '请选择机房细分类型', trigger: 'change' }
        ],
        roomproperty: [
          { required: true, message: '请选择拟建机房产权', trigger: 'change' }
        ],
        roomsize: [
          { required: true, message: '请输入机房尺寸', trigger: 'blur' }
        ],
        feederwindow: [
          { required: true, message: '请输入馈线窗空余情况', trigger: 'blur' }
        ],
        cabinetnumber: [
          { required: true, message: '请输入原有一体化机柜数量', trigger: 'blur' }
        ]
      },
      Rules4: {
        switchmodel: [
          { required: true, message: '请输入原有开关电源型号', trigger: 'blur' }
        ],
        switchcurrentload: [
          { required: true, message: '请输入原有开关电源负载信息（电流）', trigger: 'blur' }
        ],
        switchvoltageload: [
          { required: true, message: '请输入原有开关电源负载信息（电压）', trigger: 'blur' }
        ],
        rectifiermodulemodel: [
          { required: true, message: '请输入整流模块型号', trigger: 'blur' }
        ],
        rectifiermodulenusednumber: [
          { required: true, message: '请输入整流模块使用数量', trigger: 'blur' }
        ],
        rectifiermodulensparenumber: [
          { required: true, message: '请输入整流模块空余数量', trigger: 'blur' }
        ],
        rectifiermodulentotal: [
          { required: true, message: '请输入整流模块总数', trigger: 'blur' }
        ]
      },
      Rules5: {
        batterymodel: [
          { required: true, message: '请输入原有蓄电池型号', trigger: 'blur' }
        ],
        batteryage: [
          { required: true, message: '请输入原有蓄电池使用年限', trigger: 'blur' }
        ],
        batterygroupnumber: [
          { required: true, message: '请输入原有蓄电池组数', trigger: 'blur' }
        ],
        batterysinglecapacity: [
          { required: true, message: '请输入原蓄电池单组容量(AH)', trigger: 'blur' }
        ],
        batterytotal: [
          { required: true, message: '请输入原有蓄电池总容量（AH）', trigger: 'blur' }
        ]
      },
      Rules6: {
        introducetype: [
          { required: true, message: '请选择原有引入类型', trigger: 'change' }
        ],
        introducevoltage: [
          { required: true, message: '请选择原有引入电压', trigger: 'change' }
        ],
        introducedistance: [
          { required: true, message: '请输入原有引入距离', trigger: 'blur' }
        ]
      },
      Rules7: {
        conditioner: [
          { required: true, message: '请选择原有空调情况', trigger: 'change' }
        ],
        ringmonitoring: [
          { required: true, message: '请选择原有动环监控情况', trigger: 'change' }
        ],
        grounding: [
          { required: true, message: '请选择原有接地情况', trigger: 'change' }
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
      },
      table1Loading: false,
      SurveyInfo: {
      },
      DicList: {}
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
    this.getDetailInfo()
    this.getList()
    if (this.SurveyInfo.taskstate) {
      this.getStockStationInfo()
    }
  },
  methods: {
    getList () {
      let s = ['勘察建站模式', '勘察运营商', '勘察地理环境', '勘察覆盖场景',
        '勘察塔型', '勘察机房细分类型', '勘察机房类型', '勘察引入类型',
        '勘察引入电压', '勘察空调情况', '勘察动环监控情况', '勘察接地情况', '勘察机房产权']
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
          this.DicList.conditioner = data.filter(i => {
            return i.type === '勘察空调情况'
          })
          this.DicList.ringmonitoring = data.filter(i => {
            return i.type === '勘察动环监控情况'
          })
          this.DicList.grounding = data.filter(i => {
            return i.type === '勘察接地情况'
          })
          this.DicList.rawtower = data.filter(i => {
            return i.type === '勘察塔型'
          })
        }
      })
      this.Loading = false
    },
    getDetailInfo () {
      this.WriteLoading = true
      this.$axios.get(GetProjectInfo, {
        params: {
          id: this.SurveyInfo.id
        }
      }).then(res => {
        this.WriteLoading = false
        if (res.data !== null) {
          this.WriteData = res.data
        }
        if (res.success === false) {
          this.closeShowEdit()
        }
      }).catch(error => {
        this.WriteLoading = false
        console.log(error)
      })
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
          this.StockStationInfo.websitebuildingmode = this.StockStationInfo.websitebuildingmode === 0 ? null : this.StockStationInfo.websitebuildingmode
          this.StockStationInfo.demanddistance = this.StockStationInfo.demanddistance ? this.StockStationInfo.demanddistance : '请选择经纬度后计算'
          if (this.WriteState === 1) {
            if (this.StockStationInfo.websitebuildingmode === 1) {
              this.StockStationInfo.rawtower = this.StockStationInfo.rawtower ? this.StockStationInfo.rawtower.split(',') : this.StockStationInfo.rawtower === null ? [] : this.StockStationInfo.rawtower.split('')
            }
            this.StockStationInfo.ownedoperator = this.StockStationInfo.ownedoperator ? this.StockStationInfo.ownedoperator.split(',') : this.StockStationInfo.ownedoperator === null ? [] : this.StockStationInfo.ownedoperator.split('')
          }
        /* if (res.data.environment) {
          this.imgList.environment = JSON.parse(res.data.environment)
        }
        if (res.data.roomsintegration) {
          this.imgList.roomsintegration = JSON.parse(res.data.roomsintegration)
        } */
        }
      })
    },
    SubmitSave () {
      this.WriteLoading = true
      if (this.StockStationInfo.websitebuildingmode === 1) {
        if (this.StockStationInfo.rawtower.length) {
          this.StockStationInfo.rawtower = this.StockStationInfo.rawtower.join(',')
        } else {
          this.StockStationInfo.rawtower = this.StockStationInfo.rawtower.toString()
        }
      }
      if (this.StockStationInfo.ownedoperator.length) {
        this.StockStationInfo.ownedoperator = this.StockStationInfo.ownedoperator.join(',')
      } else {
        this.StockStationInfo.ownedoperator = this.StockStationInfo.ownedoperator.toString()
      }
      this.StockStationInfo.environment = this.StockStationInfo.environment.filter(i => i.url)
      this.StockStationInfo.roomsintegration = this.StockStationInfo.roomsintegration.filter(i => i.url)
      this.StockStationInfo.roofing = this.StockStationInfo.roofing.filter(i => i.url)
      this.StockStationInfo.sketch = this.StockStationInfo.sketch.filter(i => i.url)
      this.StockStationInfo.roomequipmentimg = this.StockStationInfo.roomequipmentimg.filter(i => i.url)
      this.StockStationInfo.cabinetquipmentimg = this.StockStationInfo.cabinetquipmentimg.filter(i => i.url)
      this.StockStationInfo.electricmeterimg = this.StockStationInfo.electricmeterimg.filter(i => i.url)
      this.StockStationInfo.demanddistance = this.StockStationInfo.demanddistance === '请选择经纬度后计算' ? null : this.StockStationInfo.demanddistance
      this.$axios.put(UpdateStockResourceCensus, this.StockStationInfo).then(res => {
        this.WriteLoading = false
        if (res.errorCode === '200') {
          this.$message.success('保存成功!')
          this.closeShowEdit()
        } else {
          this.StockStationInfo.rawtower = this.StockStationInfo.rawtower ? this.StockStationInfo.rawtower.split(',') : this.StockStationInfo.rawtower.split('')
          this.StockStationInfo.ownedoperator = this.StockStationInfo.ownedoperator ? this.StockStationInfo.ownedoperator.split(',') : this.StockStationInfo.ownedoperator.split('')
          this.$message.error(res.msg)
        }
      })
    },
    SubmitSaveAsync () {
      this.WriteLoading = true
      if (this.StockStationInfo.websitebuildingmode === 1) {
        if (this.StockStationInfo.rawtower.length) {
          this.StockStationInfo.rawtower = this.StockStationInfo.rawtower.join(',')
        } else {
          this.StockStationInfo.rawtower = this.StockStationInfo.rawtower.toString()
        }
      }
      if (this.StockStationInfo.ownedoperator.length) {
        this.StockStationInfo.ownedoperator = this.StockStationInfo.ownedoperator.join(',')
      } else {
        this.StockStationInfo.ownedoperator = this.StockStationInfo.ownedoperator.toString()
      }
      this.StockStationInfo.environment = this.StockStationInfo.environment.filter(i => i.url)
      this.StockStationInfo.roomsintegration = this.StockStationInfo.roomsintegration.filter(i => i.url)
      this.StockStationInfo.roofing = this.StockStationInfo.roofing.filter(i => i.url)
      this.StockStationInfo.sketch = this.StockStationInfo.sketch.filter(i => i.url)
      this.StockStationInfo.roomequipmentimg = this.StockStationInfo.roomequipmentimg.filter(i => i.url)
      this.StockStationInfo.cabinetquipmentimg = this.StockStationInfo.cabinetquipmentimg.filter(i => i.url)
      this.StockStationInfo.electricmeterimg = this.StockStationInfo.electricmeterimg.filter(i => i.url)
      this.StockStationInfo.demanddistance = this.StockStationInfo.demanddistance === '请选择经纬度后计算' ? null : this.StockStationInfo.demanddistance
      return this.$axios.put(UpdateStockResourceCensus, this.StockStationInfo).then((res) => {
        return Promise.resolve(res)
      })
    },
    SubmitAuit () {
      if (this.StockStationInfo.environment.filter(it => it.url).length !== 8) return this.$message.error('请补全360环境照片！')
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
                  return this.$message.error('机房情况有未填完信息,请补全！')
                } else {
                  this.$refs.WriteForm4.validate((vali, msg) => {
                    if (!vali) {
                      return this.$message.error('开关电源有未填完信息,请补全！')
                    } else {
                      this.$refs.WriteForm5.validate((vali, msg) => {
                        if (!vali) {
                          return this.$message.error('蓄电池有未填完信息,请补全！')
                        } else {
                          this.$refs.WriteForm6.validate((vali, msg) => {
                            if (!vali) {
                              return this.$message.error('外电引入有未填完信息,请补全！')
                            } else {
                              this.$refs.WriteForm7.validate((vali, msg) => {
                                if (!vali) {
                                  return this.$message.error('其他有未填完信息,请补全！')
                                } else {
                                  this.SubmitSaveAsync().then((res) => {
                                    if (res.errorCode === '200') {
                                      this.$axios.get(GetStockResourceCensusSubmitAuit, {
                                        params: {
                                          project_id: this.SurveyInfo.id
                                        }
                                      }).then(res => {
                                        console.log(res)
                                        if (res.errorCode === '200') {
                                          this.WriteLoading = false
                                          this.$message.success('提交审核成功!')
                                          this.closeShowEdit()
                                        } else {
                                          this.WriteLoading = false
                                          this.$message.error(res.msg)
                                        }
                                      }).catch(error => {
                                        this.WriteLoading = false
                                        console.log(error)
                                      })
                                    } else {
                                      this.StockStationInfo.rawtower = this.StockStationInfo.rawtower ? this.StockStationInfo.rawtower.split(',') : this.StockStationInfo.rawtower.split('')
                                      this.StockStationInfo.ownedoperator = this.StockStationInfo.ownedoperator ? this.StockStationInfo.ownedoperator.split(',') : this.StockStationInfo.ownedoperator.split('')
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
            }
          })
        }
      })
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
      } else if (this.SurveyInfo.from === 'MyProject') {
        this.$router.push({name: 'MyProject'})
        this.$emit('handleChange', 'MyProject', '296a0c73-6a8a-450a-9e3e-f1ac571a695d')
      } else if (this.SurveyInfo.from === 'CompletedProject') {
        this.$router.push({name: 'CompletedProject'})
        this.$emit('handleChange', 'CompletedProject', '68574cc1-6d88-4d03-a9c0-4493b0c0754b')
      }
    },
    getImgTitle (val) {
      return this.$axios.get(GetInvestigateImgConfigurationList, {
        params: {
          attribution: val,
          constructionmode: 2,
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
    OpenSurveyImgBox (val, flag) {
      switch (val) {
        case '360环境照片':
          if (this.WriteState === 1) {
            this.getEnvironmentTitle().then((res) => {
              if (res.data.length) {
                res.data.forEach(item => {
                  if (!this.StockStationInfo.environment.filter(it => it.title === item.text).length) {
                    const obj = {
                      field_name: 'environment',
                      remarks: '',
                      title: item.text,
                      url: ''
                    }
                    this.StockStationInfo.environment.push(obj)
                  }
                })
              }
            })
          }
          this.$refs.SurveyImgBox.SetData('360环境照片', 'environment', this.StockStationInfo.environment, true)
          break
        case '机房照片':
          if (this.WriteState === 1) {
            this.getImgTitle('机房照片').then((res) => {
              if (res.data.total) {
                res.data.list.forEach(item => {
                  if (!this.StockStationInfo.roomsintegration.filter(it => it.title === item.title).length) {
                    const obj = {
                      field_name: 'roomsintegration',
                      remarks: '',
                      title: item.title,
                      url: ''
                    }
                    this.StockStationInfo.roomsintegration.push(obj)
                  }
                })
              }
            })
          }
          this.$refs.SurveyImgBox.SetData('机房照片', 'roomsintegration', this.StockStationInfo.roomsintegration, true)
          break
        case '塔桅及天面照片':
          if (this.WriteState === 1) {
            this.getImgTitle('塔桅及天面照片').then((res) => {
              if (res.data.total) {
                res.data.list.forEach(item => {
                  if (!this.StockStationInfo.roofing.filter(it => it.title === item.title).length) {
                    const obj = {
                      field_name: 'roofing',
                      remarks: '',
                      title: item.title,
                      url: ''
                    }
                    this.StockStationInfo.roofing.push(obj)
                  }
                })
              }
            })
          }
          this.$refs.SurveyImgBox.SetData('塔桅及天面照片', 'roofing', this.StockStationInfo.roofing, true)
          break
        case '勘察草图':
          if (this.WriteState === 1) {
            this.getImgTitle('勘察草图').then((res) => {
              if (res.data.total) {
                res.data.list.forEach(item => {
                  if (!this.StockStationInfo.sketch.filter(it => it.title === item.title).length) {
                    const obj = {
                      field_name: 'sketch',
                      remarks: '',
                      title: item.title,
                      url: ''
                    }
                    this.StockStationInfo.sketch.push(obj)
                  }
                })
              }
            })
          }
          this.$refs.SurveyImgBox.SetData('勘察草图', 'sketch', this.StockStationInfo.sketch, true)
          break
        case '设备照片（机房）':
          if (this.WriteState === 1) {
            this.getImgTitle('设备照片（机房站）').then((res) => {
              if (res.data.total) {
                res.data.list.forEach(item => {
                  if (!this.StockStationInfo.roomequipmentimg.filter(it => it.title === item.title).length) {
                    const obj = {
                      field_name: 'roomequipmentimg',
                      remarks: '',
                      title: item.title,
                      url: ''
                    }
                    this.StockStationInfo.roomequipmentimg.push(obj)
                  }
                })
              }
            })
          }
          this.$refs.SurveyImgBox.SetData('设备照片（机房）', 'roomequipmentimg', this.StockStationInfo.roomequipmentimg, true)
          break
        case '设备照片(室外一体化机柜)':
          if (this.WriteState === 1) {
            this.getImgTitle('设备照片（室外一体化机柜站）').then((res) => {
              if (res.data.total) {
                res.data.list.forEach(item => {
                  if (!this.StockStationInfo.cabinetquipmentimg.filter(it => it.title === item.title).length) {
                    const obj = {
                      field_name: 'cabinetquipmentimg',
                      remarks: '',
                      title: item.title,
                      url: ''
                    }
                    this.StockStationInfo.cabinetquipmentimg.push(obj)
                  }
                })
              }
            })
          }
          this.$refs.SurveyImgBox.SetData('设备照片(室外一体化机柜)', 'cabinetquipmentimg', this.StockStationInfo.cabinetquipmentimg, true)
          break
        case '电表照片':
          if (this.WriteState === 1) {
            this.getImgTitle('电表照片').then((res) => {
              if (res.data.total) {
                res.data.list.forEach(item => {
                  if (!this.StockStationInfo.electricmeterimg.filter(it => it.title === item.title).length) {
                    const obj = {
                      field_name: 'electricmeterimg',
                      remarks: '',
                      title: item.title,
                      url: ''
                    }
                    this.StockStationInfo.electricmeterimg.push(obj)
                  }
                })
              }
            })
          }
          this.$refs.SurveyImgBox.SetData('电表照片', 'electricmeterimg', this.StockStationInfo.electricmeterimg, true)
          break
      }
      this.$refs.SurveyImgBox.Open()
      this.WriteState === 2 ? this.$refs.SurveyImgBox.Flag = true : this.$refs.SurveyImgBox.Flag = false
    },
    OpenImgBox (val, flag) {
      switch (val) {
        case '机房所处地隐患':
          this.$refs.ImgBox.SetData('机房所处地隐患', 'roomsarehd', this.StockStationInfo.roomsarehd)
          break
        case '机房内设备隐患':
          this.$refs.ImgBox.SetData('机房内设备隐患', 'roomequipmenthd', this.StockStationInfo.roomequipmenthd)
          break
        case '塔桅隐患':
          this.$refs.ImgBox.SetData('塔桅隐患', 'towermasthd', this.StockStationInfo.towermasthd)
          break
        case '楼面站天面隐患':
          this.$refs.ImgBox.SetData('楼面站天面隐患', 'floorstandroofinghd', this.StockStationInfo.floorstandroofinghd)
          break
        case '塔脚，地锚隐患':
          this.$refs.ImgBox.SetData('塔脚，地锚隐患', 'columnfootanchorhd', this.StockStationInfo.columnfootanchorhd)
          break
        case '拉线情况隐患':
          this.$refs.ImgBox.SetData('拉线情况隐患', 'staysituationhd', this.StockStationInfo.staysituationhd)
          break
        case '地网情况隐患':
          this.$refs.ImgBox.SetData('地网情况隐患', 'netsituationhd', this.StockStationInfo.netsituationhd)
          break
      }
      this.$refs.ImgBox.Open()
      this.WriteState === 2 ? this.$refs.ImgBox.Flag = true : this.$refs.ImgBox.Flag = false
    },
    Open360ImgBox () {
      this.$refs.EnvironmentImgBox.SetData('360环境照片', 'environment', this.StockStationInfo.environment, true)
      this.$refs.EnvironmentImgBox.Open()
      this.$refs.EnvironmentImgBox.Flag = true
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
      if (!this.auitData.demandno && state === 1 && this.WriteData.taskstatename === '地市审核') return this.$message.warning('请输入需求单号')
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
          this.closeShowEdit()
        } else {
          this.$message.warning(res.msg)
        }
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
      return val !== undefined && val.length ? `有（${val.length}张）` : '无'
    },
    formatResult (val) {
      return val !== undefined && val.filter(it => it.url).length ? `有（${val.filter(it => it.url).length}张）` : '无'
    },
    OpenMap (val, isCheck = false) { // 0: 查看 1: 编辑/新增
      this.showMap = true
      this.$nextTick(() => {
        this.$refs.GoogleMap.Open()
        this.$refs.GoogleMap.showType = val
        if (isCheck) {
          this.$refs.GoogleMap.longitude = this.WriteData.planninglongitude
          this.$refs.GoogleMap.latitude = this.WriteData.planninglatitude
        } else {
          this.$refs.GoogleMap.longitude = this.StockStationInfo.realitylongitude
          this.$refs.GoogleMap.latitude = this.StockStationInfo.realitylatitude
          this.$refs.GoogleMap.Query.longitude = this.StockStationInfo.realitylongitude
          this.$refs.GoogleMap.Query.latitude = this.StockStationInfo.realitylatitude
        }
      })
    },
    getMapData (longitude, latitude) {
      this.showMap = false
      if (longitude && this.$refs.GoogleMap.showType === 1) {
        this.StockStationInfo.realitylongitude = longitude
      }
      if (latitude && this.$refs.GoogleMap.showType === 1) {
        this.StockStationInfo.realitylatitude = latitude
      }
      if (longitude && latitude && this.$refs.GoogleMap.showType === 1) {
        this.$axios.get(GetDistance, {
          params: {
            lat1: latitude,
            lng1: longitude,
            lat2: this.WriteData.planninglatitude,
            lng2: this.WriteData.planninglongitude
          }
        }).then(res => {
          if (res.errorCode === '200') {
            if (res.data) {
              this.StockStationInfo.demanddistance = res.data.toFixed(2)
            }
          } else {
            this.$message.warning(res.msg)
          }
        })
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
        this.getDetailInfo()
        if (this.SurveyInfo.taskstate) {
          this.getStockStationInfo()
        }
      }
    },
    'StockStationInfo.sparederrick': function (newv) {
      if (!newv) {
        this.StockStationInfo.sparederricknumber = 0
      }
    }
  },
  components: {
    layuiTitle,
    ImgBox,
    SurveyImgBox,
    EnvironmentImgBox,
    GoogleMap
  }
}
</script>

<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
