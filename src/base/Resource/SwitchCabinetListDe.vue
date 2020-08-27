<template>
  <div class="write" v-loading="WriteLoading">
    <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--small">
      <!--表头-->
      <div class="el-table__header-wrapper">
        <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
          <colgroup>
            <col width="80" />
            <col width="100" />
            <col width="50" />
            <!-- <col width="400" /> -->
            <col width="100" />
          </colgroup>
          <thead>
            <tr>
              <th colspan="1" rowspan="1" class="el-table_8_column_60 table-headerStyle">
                <div class="cell">字段</div>
              </th>
              <th colspan="1" rowspan="1" class="el-table_8_column_61 table-headerStyle">
                <div class="cell">属性</div>
              </th>
              <th colspan="1" rowspan="1" class="el-table_8_column_62 table-headerStyle">
                <div class="cell">照片</div>
              </th>
              <!-- <th colspan="1" rowspan="1" class="el-table_8_column_63 table-headerStyle">
                <div class="cell">字典</div>
              </th> -->
              <th colspan="1" rowspan="1" class="el-table_8_column_64 table-headerStyle">
                <div class="cell">填写要求</div>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <!--表体-->
      <el-form :model="tableData" :rules="Rules" ref="tableForm">
        <div class="el-table__body-wrapper is-scrolling-none">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
            <colgroup>
              <col width="80" />
              <col width="100" />
              <col width="50" />
              <!-- <col width="400" /> -->
              <col width="100" />
            </colgroup>
            <tbody>
              <!--区域-->
              <!--<tr class="el-table__row" v-show="WriteState !== 2" >
                <td>
                  <div class="cell"><i class="must">*</i>区域</div>
                </td>
                <td>
                  <div class="cell">
                    <el-form-item label-width="0" class="form-item" v-model="tableData.areaid">
                      <el-cascader v-model="tableArea.AreaList" :props="areaProps" @change="changeArea(tableArea)" :options="areaOption" ref="csArea"></el-cascader>
                    </el-form-item>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                &lt;!&ndash; <td>
                  <div
                    class="cell"
                    v-show="WriteState === 1"
                  >{{tableData.provincename}}/{{tableData.cityname}}/{{tableData.areaname}}</div>
                </td> &ndash;&gt;
                <td>
                  <div class="cell"></div>
                </td>
              </tr>-->
              <!--地市-->
              <!--<tr class="el-table__row" v-show="WriteState == 2">
                <td>
                  <div class="cell"><i class="must">*</i>地市</div>
                </td>
                <td>
                  <div class="cell">
                    <div>{{tableData.cityname}}</div>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                &lt;!&ndash; <td>
                  <div
                    class="cell"
                    v-show="WriteState === 1"
                  >{{tableData.provincename}}/{{tableData.cityname}}/{{tableData.areaname}}</div>
                </td> &ndash;&gt;
                <td>
                  <div class="cell"></div>
                </td>
              </tr>-->
              <!--区域-->
              <!--<tr class="el-table__row" v-show="WriteState == 2">
                <td>
                  <div class="cell"><i class="must">*</i>区域</div>
                </td>
                <td>
                  <div class="cell">
                    <div>{{tableData.areaname}}</div>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                &lt;!&ndash; <td>
                  <div
                    class="cell"
                    v-show="WriteState === 1"
                  >{{tableData.provincename}}/{{tableData.cityname}}/{{tableData.areaname}}</div>
                </td> &ndash;&gt;
                <td>
                  <div class="cell"></div>
                </td>
              </tr>-->
              <!--站点编码-->
              <tr class="el-table__row">
                <td>
                  <div class="cell">
                    站点编码
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.resourcecode}}</div>
                    <div v-show="WriteState !== 2">
                      <el-input v-model="tableData.resourcecode" readonly placeholder="请选择"></el-input>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="cell"></div>
                </td>
                <!-- <td>
                  <div class="cell"></div>
                </td> -->
                <td>
                  <div class="cell"></div>
                </td>
              </tr>
              <!--站点名称-->
              <tr class="el-table__row">
                <td>
                  <div class="cell">
                    站点名称
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.resourcename}}</div>
                    <div v-show="WriteState !== 2" @click="isShow = true">
                      <el-input v-model="tableData.resourcename" readonly placeholder="请选择"></el-input>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="cell"></div>
                </td>
                <!-- <td>
                  <div class="cell"></div>
                </td> -->
                <td>
                  <div class="cell"></div>
                </td>
              </tr>
              <!--设备类型-->
              <tr class="el-table__row">
                <td>
                  <div class="cell">
                    设备类型
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.equipmenttypename}}</div>
                    <div v-show="WriteState !== 2">
                      <el-input v-model="tableData.equipmenttypename" placeholder="请选择"></el-input>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="cell"></div>
                </td>
                <!-- <td>
                  <div class="cell"></div>
                </td> -->
                <td>
                  <div class="cell"></div>
                </td>
              </tr>
              <!--设备厂家-->
              <tr class="el-table__row">
                <td>
                  <div class="cell">
                    <i class="must">*</i>设备厂家
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.manufacturername}}</div>
                    <el-form-item
                      label-width="0"
                      prop="manufacturer"
                      class="form-item"
                      v-show="WriteState !== 2"
                    >
                      <el-select
                        class="tableSelect"
                        v-model="tableData.manufacturer"
                        placeholder="请选择设备厂家"
                      >
                        <el-option label="请选择" :value="null"></el-option>
                        <el-option
                          v-for="item in dictionaryList.manufacturerList"
                          :key="item.id"
                          :label="item.text"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </td>
                <td @click="OpenImgBox('manufacturer')">
                  <div class="cell">{{this.manufacturerImgList.length}}</div>
                </td>
                <!-- <td>
                  <div class="cell">{{this.writeDic(dictionaryList.manufacturerList)}}</div>
                </td> -->
                <td>
                  <div class="cell"></div>
                </td>
              </tr>
              <!--设备型号-->
              <tr class="el-table__row">
                <td>
                  <div class="cell"><i class="must">*</i>设备型号</div>
                </td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.modelsname}}</div>
                    <el-form-item label-width="0" prop="models" class="form-item" v-show="WriteState !== 2">
                      <el-select
                        class="tableSelect"
                        v-model="tableData.models"
                        placeholder="请选择设备型号"
                      >
                        <el-option label="请选择" :value="null"></el-option>
                        <el-option
                          v-for="item in dictionaryList.modelsList"
                          :key="item.id"
                          :label="item.text"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </td>
                <td @click="OpenImgBox('models')">
                  <div class="cell">{{this.modelsImgList.length}}</div>
                </td>
                <!-- <td>
                  <div class="cell">{{this.writeDic(dictionaryList.modelsList)}}</div>
                </td> -->
                <td>
                  <div class="cell"></div>
                </td>
              </tr>
              <!--入网日期-->
              <tr class="el-table__row">
                <td>
                  <div class="cell">
                    <i class="must">*</i>入网日期
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.accessdate}}</div>
                    <el-form-item
                      label-width="0"
                      prop="accessdate"
                      class="form-item"
                      v-show="WriteState !== 2"
                    >
                      <el-date-picker
                        class="tableSelect"
                        v-model="tableData.accessdate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择入网日期"
                      ></el-date-picker>
                    </el-form-item>
                  </div>
                </td>
                <td>
                  <div class="cell"></div>
                </td>
                <!-- <td>
                  <div class="cell"></div>
                </td> -->
                <td>
                  <div class="cell"></div>
                </td>
              </tr>
              <!--标识码-->
              <tr class="el-table__row">
                <td>
                  <div class="cell">标识码</div>
                </td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.identificationcode}}</div>
                    <el-form-item
                      label-width="0"
                      prop="identificationcode"
                      class="form-item"
                      v-show="WriteState !== 2"
                    >
                      <el-input v-model="tableData.identificationcode" placeholder="请填入标识码"></el-input>
                    </el-form-item>
                  </div>
                </td>
                <td>
                  <div class="cell"></div>
                </td>
                <!-- <td>
                  <div class="cell"></div>
                </td> -->
                <td>
                  <div class="cell"></div>
                </td>
              </tr>
              <!--经度-->
              <tr class="el-table__row">
                <td>
                  <div class="cell"><i class="must">*</i>经度</div>
                </td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.longitude}}</div>
                    <el-form-item
                      label-width="0"
                      prop="longitude"
                      class="form-item"
                      v-show="WriteState !== 2"
                    >
                      <el-input v-model="tableData.longitude" placeholder="请填入经度"></el-input>
                    </el-form-item>
                  </div>
                </td>
                <td @click="OpenImgBox('longitude')">
                  <div class="cell">{{this.longitudeImgList.length}}</div>
                </td>
                <!-- <td>
                  <div class="cell"></div>
                </td> -->
                <td class="eel-table_8_column_64">
                  <div class="cell"></div>
                </td>
              </tr>
              <!--纬度-->
              <tr class="el-table__row">
                <td>
                  <div class="cell"><i class="must">*</i>纬度</div>
                </td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.latitude}}</div>
                    <el-form-item label-width="0" prop="latitude" class="form-item" v-show="WriteState !== 2">
                      <el-input v-model="tableData.latitude" placeholder="请填入纬度"></el-input>
                    </el-form-item>
                  </div>
                </td>
                <td>
                  <div class="cell"></div>
                </td>
                <!-- <td>
                  <div class="cell"></div>
                </td> -->
                <td>
                  <div class="cell"></div>
                </td>
              </tr>
              <!--产权单位-->
              <tr class="el-table__row">
                <td>
                  <div class="cell">
                    <i class="must">*</i>产权单位
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.propertyrightunitname}}</div>
                    <el-form-item label-width="0" prop="propertyrightunit" class="form-item" v-show="WriteState !== 2"
                    >
                      <el-select class="tableSelect" v-model="tableData.propertyrightunit" placeholder="请选择产权单位"
                      >
                        <el-option label="请选择" :value="null"></el-option>
                        <el-option
                          v-for="item in dictionaryList.propertyrightunitList"
                          :key="item.id"
                          :label="item.text"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </td>
                <td>
                  <div class="cell"></div>
                </td>
                <!-- <td>
                  <div class="cell"></div>
                </td> -->
                <td>
                  <div class="cell"></div>
                </td>
              </tr>
              <!--数量-->
              <tr class="el-table__row">
                <td>
                  <div class="cell">数量</div>
                </td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.number}}</div>
                    <el-form-item label-width="0" prop="number" class="form-item" v-show="WriteState !== 2">
                      <el-input v-model.number="tableData.number" placeholder="请填入数量"></el-input>
                    </el-form-item>
                  </div>
                </td>
                <td>
                  <div class="cell"></div>
                </td>
                <!-- <td>
                  <div class="cell"></div>
                </td> -->
                <td>
                  <div class="cell"></div>
                </td>
              </tr>
              <!--单位-->
              <tr class="el-table__row">
                <td>
                  <div class="cell">
                    单位
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.unitname}}</div>
                    <el-form-item label-width="0" prop="unit" class="form-item" v-show="WriteState !== 2">
                      <el-select class="tableSelect" v-model="tableData.unit" placeholder="请选择单位">
                        <el-option label="请选择" :value="null"></el-option>
                        <el-option
                          v-for="item in dictionaryList.unitList"
                          :key="item.id"
                          :label="item.text"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </td>
                <td>
                  <div class="cell"></div>
                </td>
                <!-- <td>
                  <div class="cell">{{this.writeDic(dictionaryList.unitList)}}</div>
                </td> -->
                <td>
                  <div class="cell"></div>
                </td>
              </tr>
              <!--质保编号-->
              <tr class="el-table__row">
                <td>
                  <div class="cell">质保编号</div>
                </td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.qualitycode}}</div>
                    <el-form-item
                      label-width="0"
                      prop="qualitycode"
                      class="form-item"
                      v-show="WriteState !== 2"
                    >
                      <el-input v-model="tableData.qualitycode" placeholder="请填入质保编号"></el-input>
                    </el-form-item>
                  </div>
                </td>
                <td>
                  <div class="cell"></div>
                </td>
                <!-- <td>
                  <div class="cell"></div>
                </td> -->
                <td>
                  <div class="cell"></div>
                </td>
              </tr>
              <!--生产日期-->
              <tr class="el-table__row">
                <td>
                  <div class="cell">生产日期</div>
                </td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.productiontime}}</div>
                    <el-form-item
                      label-width="0"
                      prop="productiontime"
                      class="form-item"
                      v-show="WriteState !== 2"
                    >
                      <el-date-picker
                        class="tableSelect"
                        v-model="tableData.productiontime"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择生产日期"
                      ></el-date-picker>
                    </el-form-item>
                  </div>
                </td>
                <td>
                  <div class="cell"></div>
                </td>
                <!-- <td>
                  <div class="cell"></div>
                </td> -->
                <td>
                  <div class="cell"></div>
                </td>
              </tr>
              <!--维护单位-->
              <tr class="el-table__row">
                <td>
                  <div class="cell">
                    维护单位
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.maintenanceunitname}}</div>
                    <el-form-item
                      label-width="0"
                      prop="maintenanceunit"
                      class="form-item"
                      v-show="WriteState !== 2"
                    >
                      <el-select
                        class="tableSelect"
                        v-model="tableData.maintenanceunit"
                        placeholder="请选择维护单位"
                      >
                        <el-option label="请选择" :value="null"></el-option>
                        <el-option
                          v-for="item in dictionaryList.maintenanceList"
                          :key="item.id"
                          :label="item.text"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </td>
                <td>
                  <div class="cell"></div>
                </td>
                <!-- <td>
                  <div class="cell">{{this.writeDic(dictionaryList.maintenanceList)}}</div>
                </td> -->
                <td>
                  <div class="cell"></div>
                </td>
              </tr>
              <!--设备状态-->
              <tr class="el-table__row">
                <td>
                  <div class="cell">
                    <i class="must">*</i>设备状态
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.statename}}</div>
                    <el-form-item label-width="0" prop="state" class="form-item" v-show="WriteState !== 2">
                      <el-select
                        class="tableSelect"
                        v-model="tableData.state"
                        placeholder="请选择设备状态"
                      >
                        <el-option label="请选择" :value="null"></el-option>
                        <el-option
                          v-for="item in dictionaryList.stateList"
                          :key="item.id"
                          :label="item.text"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </td>
                <td>
                  <div class="cell"></div>
                </td>
                <!-- <td>
                  <div class="cell">{{this.writeDic(dictionaryList.stateList)}}</div>
                </td> -->
                <td>
                  <div class="cell"></div>
                </td>
              </tr>
              <!--机身编码-->
              <tr class="el-table__row">
                <td>
                  <div class="cell">
                    <i class="must">*</i>机身编码
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.bodycode}}</div>
                    <el-form-item label-width="0" prop="bodycode" class="form-item" v-show="WriteState !== 2" >
                      <el-input v-model="tableData.bodycode" placeholder="请填入机身编码"></el-input>
                    </el-form-item>
                  </div>
                </td>
                <td @click="OpenImgBox('bodycode')">
                  <div class="cell">{{this.bodycodeImgList.length}}</div>
                </td>
                <!-- <td>
                  <div class="cell"></div>
                </td> -->
                <td>
                  <div class="cell"></div>
                </td>
              </tr>
              <!--详细地址-->
              <tr class="el-table__row">
                <td>
                  <div class="cell">
                    详细地址
                  </div>
                </td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.address}}</div>
                    <el-form-item label-width="0" prop="address" class="form-item" v-show="WriteState !== 2">
                      <el-input v-model="tableData.address" placeholder="请填入安装地址"></el-input>
                    </el-form-item>
                  </div>
                </td>
                <td>
                  <div class="cell"></div>
                </td>
                <!-- <td>
                  <div class="cell"></div>
                </td> -->
                <td>
                  <div class="cell"></div>
                </td>
              </tr>
              <!--仓位数-->
              <tr class="el-table__row">
                <td>
                  <div class="cell"><i class="must">*</i>仓位数</div>
                </td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.warehousenumber}}</div>
                    <el-form-item
                      label-width="0"
                      prop="warehousenumber"
                      class="form-item"
                      v-show="WriteState !== 2"
                    >
                      <el-input v-model.number="tableData.warehousenumber" placeholder="请填入仓位数"></el-input>
                    </el-form-item>
                  </div>
                </td>
                <td @click="OpenImgBox('warehousenumber')">
                  <div class="cell">{{this.warehousenumberImgList.length}}</div>
                </td>
                <!-- <td>
                  <div class="cell"></div>
                </td> -->
                <td>
                  <div class="cell"></div>
                </td>
              </tr>
              <!--共址站点-->
              <tr class="el-table__row">
                <td>
                  <div class="cell"><i class="must">*</i>是否为共址站点</div>
                </td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.commonsite ? '是' : '否'}}</div>
                    <el-form-item
                      label-width="0"
                      prop="commonsite"
                      class="form-item"
                      v-show="WriteState !== 2"
                    >
                      <el-select v-model="tableData.commonsite">
                        <el-option label="是" :value="true"></el-option>
                        <el-option label="否" :value="false"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </td>
                <td @click="OpenImgBox('commonsite')">
                  <div class="cell">{{this.commonsiteImgList.length}}</div>
                </td>
                <!-- <td>
                  <div class="cell" v-if="WriteState == 2">{{tableData.commonsite ? '是' : '否'}}</div>
                </td> -->
                <td>
                  <div class="cell"></div>
                </td>
              </tr>
              <!--雨棚-->
              <tr class="el-table__row">
                <td>
                  <div class="cell"><i class="must">*</i>是否有雨棚</div>
                </td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.canopy ? '是' : '否'}}</div>
                    <el-form-item label-width="0" prop="canopy" class="form-item" v-show="WriteState !== 2">
                      <el-select v-model="tableData.canopy">
                        <el-option label="是" :value="true"></el-option>
                        <el-option label="否" :value="false"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </td>
                <td @click="OpenImgBox('canopy')">
                  <div class="cell">{{this.canopyImgList.length}}</div>
                </td>
                <!-- <td>
                  <div class="cell" v-if="WriteState == 2">{{tableData.canopy ? '是' : '否'}}</div>
                </td> -->
                <td>
                  <div class="cell"></div>
                </td>
              </tr>
              <!--雨棚面积-->
              <tr class="el-table__row" v-show="tableData.canopy || WriteState === 2">
                <td>
                  <div class="cell">雨棚面积</div>
                </td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.canopyarea}}</div>
                    <el-form-item
                      label-width="0"
                      prop="canopyarea"
                      class="form-item"
                      v-show="WriteState !== 2"
                    >
                      <el-input v-model="tableData.canopyarea" placeholder="请填入雨棚面积"></el-input>
                    </el-form-item>
                  </div>
                </td>
                <td>
                  <div class="cell"></div>
                </td>
                <!-- <td>
                  <div class="cell"></div>
                </td> -->
                <td>
                  <div class="cell"></div>
                </td>
              </tr>
              <!--雨棚材料-->
              <tr class="el-table__row" v-show="tableData.canopy || WriteState === 2">
                <td>
                  <div class="cell">雨棚材料</div>
                </td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.canopymaterial}}</div>
                    <el-form-item
                      label-width="0"
                      prop="canopymaterial"
                      class="form-item"
                      v-show="WriteState !== 2"
                    >
                      <el-input v-model="tableData.canopymaterial" placeholder="请填入雨棚材料"></el-input>
                    </el-form-item>
                  </div>
                </td>
                <td>
                  <div class="cell"></div>
                </td>
                <!-- <td>
                  <div class="cell"></div>
                </td> -->
                <td>
                  <div class="cell"></div>
                </td>
              </tr>
              <tr class="el-table__row" v-if="WriteState === 2">
                <td><div class="cell">创建人</div></td>
                <td><div class="cell">{{tableData.createusername}}</div></td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row" v-if="WriteState === 2">
                <td><div class="cell">创建时间</div></td>
                <td><div class="cell">{{tableData.createtime}}</div></td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
            </tbody>
          </table>
        </div>
      </el-form>
      <div class="center" style="padding-bottom: 100px">
        <el-button
          @click="subData"
          type="primary"
          v-show="WriteState !==2"
          :disabled="WriteLoading"
          :icon="WriteLoading ? 'el-icon-loading' : 'el-icon-check'"
        >提交</el-button>
        <el-button @click="closeWrite" type="primary" icon="el-icon-back">返回</el-button>
      </div>
      <el-dialog
        top="1%"
        :visible.sync="isShow"
        title="选择站点"
        width="80%"
        :before-close="DetailhandleClose"
      >
        <ResourceList @selectResource="selectResource" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import ResourceList from 'base/Resource/ResourceList'
import { UpdateSwitchCabinet, AddSwitchCabinet } from 'api/api'
import { isValidLongitude, isValidLatitude } from 'common/js/validata'
import { GlobalRes } from 'common/js/mixins'

export default {
  name: 'SwitchCabinetListDe',
  mixins: [GlobalRes],
  props: {
    WriteState: {
      type: Number,
      default: 0 // 0为添加 1为编辑 2为查看
    },
    dictionaryList: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      isShow: false,
      // 图片列表
      longitudeImgList: [],
      manufacturerImgList: [],
      modelsImgList: [],
      bodycodeImgList: [],
      commonsiteImgList: [],
      warehousenumberImgList: [],
      canopyImgList: [],
      // 填写区域属性
      tableArea: {
        AreaList: []
      },
      areaOption: [],
      WriteLoading: false,
      // 新增表格相关属性
      tableData: {
        'resourcename': '',
        'resourcecode': '',
        'resource_id': '',
        'provinceid': 0,
        'cityid': 0,
        'areaid': 0,
        'bodycode': '',
        'longitude': null,
        'latitude': null,
        'accessdate': '',
        'equipmenttypename': '',
        'equipmenttype': null,
        'propertyrightunit': null,
        'number': null,
        'unit': null,
        'qualitycode': '',
        'identificationcode': '',
        'productiontime': '',
        'maintenanceunit': null,
        'manufacturer': null,
        'models': null,
        'state': null,
        'address': '',
        'warehousenumber': null, // 仓库编码
        'commonsite': true, // 普通站点
        'canopy': true, // 是否有雨棚
        'canopyarea': '', // 雨棚面积
        'canopymaterial': '', // 雨棚材料
        'imglist': [
          {
            'field_name': '',
            'url': '',
            'remarks': ''
          }
        ]
      },
      // 表单验证
      Rules: {
        manufacturer: [
          { required: true, message: '请选择设备厂家', trigger: 'change' }
        ],
        models: [
          { required: true, message: '请选择设备型号', trigger: 'change' }
        ],
        accessdate: [
          { required: true, message: '请选择入网日期', trigger: 'change' }
        ],
        propertyrightunit: [
          { required: true, message: '请选择产权单位', trigger: 'change' }
        ],
        state: [
          { required: true, message: '请选择设备状态', trigger: 'change' }
        ],
        bodycode: [
          { required: true, message: '请填写机身编码', trigger: 'blur' }
        ],
        warehousenumber: [
          { required: true, message: '请填写仓位数', trigger: 'blur' }
        ],
        commonsite: [
          { required: true, message: '请选择是否共址站点', trigger: 'change' }
        ],
        canopy: [
          { required: true, message: '请选择是否有雨棚', trigger: 'change' }
        ],
        longitude: [
          {required: true, message: '请填写经度', trigger: 'blur'},
          {pattern: isValidLongitude, message: '请输入正确的经度', trigger: 'blur'}
        ],
        latitude: [
          {required: true, message: '请填写纬度', trigger: 'blur'},
          {pattern: isValidLatitude, message: '请输入正确的纬度', trigger: 'blur'}
        ],
        number: [
          { type: 'number', message: '必须为数字类型' }
        ]
      }
    }
  },
  methods: {
    // 在进行提交新增时赋值方法，在父组件中调用该方法
    setWriteData (data) {
      this.tableData = data
      this.setImgList(data.imglist)
    },
    OpenImgBox (s) {
      switch (s) {
        case 'longitude':
          this.$emit('fatherOpenImgBox', '经度', 'longitude', this.longitudeImgList)
          break
        case 'manufacturer':
          this.$emit('fatherOpenImgBox', '设备厂家', 'manufacturer', this.manufacturerImgList)
          break
        case 'models':
          this.$emit('fatherOpenImgBox', '设备型号', 'models', this.modelsImgList)
          break
        case 'bodycode':
          this.$emit('fatherOpenImgBox', '机身编码', 'bodycode', this.bodycodeImgList)
          break
        case 'commonsite':
          this.$emit('fatherOpenImgBox', '共址站点', 'commonsite', this.commonsiteImgList)
          break
        case 'warehousenumber':
          this.$emit('fatherOpenImgBox', '仓位数', 'warehousenumber', this.warehousenumberImgList)
          break
        case 'canopy':
          this.$emit('fatherOpenImgBox', '雨棚', 'canopy', this.canopyImgList)
      }
    },
    // 提交函数
    subData () {
      if (this.WriteState === 0) this.add()
      if (this.WriteState === 1) this.edit()
    },
    // 检查图片
    validImgList () {
      if (!this.longitudeImgList.length) {
        return this.$message.warning('经度图片必须上传')
      }
      if (!this.manufacturerImgList.length) {
        return this.$message.warning('设备厂家图片必须上传')
      }
      if (!this.modelsImgList.length) {
        return this.$message.warning('设备型号图片必须上传')
      }
      if (!this.bodycodeImgList.length) {
        return this.$message.warning('机身图片必须上传')
      }
      if (!this.commonsiteImgList.length) {
        return this.$message.warning('共址站点图片必须上传')
      }
      if (!this.warehousenumberImgList.length) {
        return this.$message.warning('共址站点图片必须上传')
      }
      if (!this.canopyImgList.length) {
        return this.$message.warning('雨棚图片必须上传')
      }
    },
    // 抽离共有的逻辑
    async add () {
      if (this.validImgList()) return
      this.$refs.tableForm.validate(async (valid, msg) => {
        // console.log(this.tableData)
        if (!valid) {
          if (msg.longitude) return this.$message.warning(msg.longitude[0].message)
          if (msg.latitude) return this.$message.warning(msg.latitude[0].message)
          this.$message.warning('请补全信息')
        } else {
          try {
            this.tableData.provinceid = this.tableArea.provinceid
            this.tableData.cityid = this.tableArea.cityid
            this.tableData.areaid = this.tableArea.areaid
            this.WriteLoading = true
            const res = await this.$axios.post(AddSwitchCabinet, this.tableData)
            this.WriteLoading = false
            if (res.error === true) {
              this.$message.warning('请补全信息')
              console.log(res.errorMessage)
            }
            if (res.success === true) {
              this.$message.success('添加成功！')
              this.$emit('fatheretMore')
              // this.dictionaryList.areaList = []
              this.closeWrite()
            } else { this.$message.warning(res.msg) }
          } catch (e) {
            console.log(e)
          }
        }
      })
    },
    async edit () {
      if (this.validImgList()) return
      this.$refs.tableForm.validate(async (valid, msg) => {
        // console.log(this.tableData)
        if (!valid) {
          if (msg.longitude) return this.$message.warning(msg.longitude[0].message)
          if (msg.latitude) return this.$message.warning(msg.latitude[0].message)
          this.$message.warning('请补全信息')
        } else {
          try {
            if (this.tableArea.areaid !== null && this.tableArea.areaid !== '' && this.tableArea.areaid !== undefined) {
              this.tableData.provinceid = this.tableArea.provinceid
              this.tableData.cityid = this.tableArea.cityid
              this.tableData.areaid = this.tableArea.areaid
            }
            this.WriteLoading = true
            const res = await this.$axios.put(UpdateSwitchCabinet, this.tableData)
            this.WriteLoading = false
            if (res.error === true) {
              // console.log(res.error)
            }
            // this.$message.error('输入参数为非法值，请重新输入')
            if (res.success === true) {
              this.$message.success('修改成功！')
              this.$emit('fatheretMore')
              // this.dictionaryList.areaList = []
              this.closeWrite()
            } else { this.$message.error(res.msg) }
          } catch (e) {
            console.log(e)
          }
        }
      })
    },
    setImgList (list) {
      if (list !== null && list !== undefined) {
        list.forEach((item) => {
          if (item.field_name === 'longitude') this.longitudeImgList.push(item)
          if (item.field_name === 'manufacturer') this.manufacturerImgList.push(item)
          if (item.field_name === 'models') this.modelsImgList.push(item)
          if (item.field_name === 'bodycode') this.bodycodeImgList.push(item)
          if (item.field_name === 'commonsite') this.commonsiteImgList.push(item)
          if (item.field_name === 'warehousenumber') this.warehousenumberImgList.push(item)
          if (item.field_name === 'canopy') this.canopyImgList.push(item)
        })
      }
    },
    // 返回关闭编辑函数
    closeWrite () {
      this.$refs.tableForm.clearValidate() // 初始化表单校验
      Object.assign(this.$data.tableData, this.$options.data().tableData)
      this.$nextTick(() => { this.$refs.tableForm.resetFields() })
      this.areaOption = []
      this.tableArea.AreaList.splice(0, this.tableArea.AreaList.length)
      this.longitudeImgList = []
      this.manufacturerImgList = []
      this.modelsImgList = []
      this.bodycodeImgList = []
      this.commonsiteImgList = []
      this.warehousenumberImgList = []
      this.canopyImgList = []
      // this.getMore(1)
      this.showWrite = !this.showWrite
      this.$emit('fatherClose')
    },
    selectResource (name, id) {
      this.isShow = false
      this.tableData.resource_id = id
      this.tableData.resourcename = name
    },
    DetailhandleClose () {
      this.isShow = !this.isShow
    }
  },
  computed: {
    ImgList () {
      return this.longitudeImgList.concat(this.manufacturerImgList, this.modelsImgList, this.bodycodeImgList, this.commonsiteImgList, this.warehousenumberImgList, this.canopyImgList)
    }
  },
  watch: {
    ImgList (val) {
      this.tableData.imglist = val
    }
  },
  components: {
    ResourceList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url('../../common/css/mixin.css');
</style>
