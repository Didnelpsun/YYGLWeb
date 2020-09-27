<template>
  <div class="content">
    <div v-show="showList">
      <el-form :model="query" ref="NodeQueryForm">
        <el-row :gutter="20">
          <!--选择器-->
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="区域：">
                <el-cascader v-model="query.AreaList" :props="QareaProps" @change="changeArea(query)" ref="AreaSelect" clearable></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="站点编码：">
                <el-input class="searchSelect" v-model="query.code" placeholder="请输入站点编码" @keyup.enter.native="_getTableMore1(pagination.currentPage)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="站点名称：">
                <el-input class="searchSelect" v-model="query.name" placeholder="请输入站点名称" @keyup.enter.native="_getTableMore1(pagination.currentPage)"></el-input>
              </el-form-item>
            </el-col>
            <!--站点分类-->
            <el-col :span="8">
              <el-form-item label="站点分类：">
                <el-select class="searchSelect" v-model="query.classify">
                  <el-option label="请选择" value=""></el-option>
                  <el-option v-for="i in DicList.classify" :key="i.value" :label="i.text" :value="i.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="创建时间：">
                <el-date-picker class="tableSelect" v-model="query.starttime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择开始时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="至：">
                <el-date-picker class="tableSelect" v-model="query.endtime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择结束时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="6">
            <div class="fr" style="margin-top: 0">
              <el-button icon="el-icon-search" @click="_getTableMore1(pagination.currentPage)">查询</el-button>
              <el-button icon="el-icon-refresh" @click="resetQuery">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>

      <el-row>
        <el-col :span="4" class="SearchResult">查询结果</el-col>
        <el-col :offset="2" :span="18" class="fr">
          <div class="fr">
            <el-button @click="showImport" type="success" icon="el-icon-upload2">导入</el-button>
            <el-button @click="handleExport" type="success" icon="el-icon-download">导出</el-button>
          <!--  <el-button type="success" icon="el-icon-plus" @click="addQueryForm">新增</el-button>-->
          </div>
        </el-col>
      </el-row>

      <el-table :data="tableList" v-loading="Table1Loading" style="margin-top: 15px">
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template></el-table-column>
        <el-table-column prop="cityname" label="城市" width="80"></el-table-column>
        <el-table-column prop="areaname" label="区域" width="80"></el-table-column>
        <el-table-column prop="name" label="站点名称" width="" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="code" label="站点编码" width="" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="classifyname" label="站点分类" width=""></el-table-column>
        <el-table-column prop="accessdate" label="入网日期" width=""></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width=""></el-table-column>
        <el-table-column prop="createusername" label="创建人" width=""></el-table-column>
        <el-table-column prop="" label="操作" >
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handelDetail(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="center">
        <el-pagination @current-change="_getTableMore1" @size-change="handelSizeChange" :current-page="pagination.currentPage"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize" :total="pagination.total"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
    </div>
    <!--添加 && 修改-->
    <div v-show="showEdit">
      <layuiTitle :title="pageType + '站点'"></layuiTitle>
      <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--mini">
        <!--表头-->
        <div class="el-table__header-wrapper">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
            <colgroup>
              <col name="el-table_8_column_60" width="80"/>
              <col name="el-table_8_column_61" width="100"/>
              <col name="el-table_8_column_62" width="50"/>
              <!-- <col name="el-table_8_column_63" width="400"/> -->
              <col name="el-table_8_column_64" width="100"/>
            </colgroup>
            <thead>
            <tr>
              <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
              <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
              <th colspan="1" rowspan="1" class="el-table_8_column_62     table-headerStyle"><div class="cell">照片</div></th>
              <!-- <th colspan="1" rowspan="1" class="el-table_8_column_63     table-headerStyle"><div class="cell">字典</div></th> -->
              <th colspan="1" rowspan="1" class="el-table_8_column_64     table-headerStyle"><div class="cell">规范要求</div></th>
            </tr>
            </thead>
          </table>
        </div>
        <!--表体-->
        <el-form :model="tableData" :rules="Rules" v-loading="Loading" ref="tableForm" :show-message="false" label-width="0">
          <div class="el-table__body-wrapper is-scrolling-none">
            <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
              <colgroup>
                <col name="el-table_8_column_60" width="80"/>
                <col name="el-table_8_column_61" width="100"/>
                <col name="el-table_8_column_62" width="50"/>
                <!-- <col name="el-table_8_column_63" width="400"/> -->
                <col name="el-table_8_column_64" width="100"/>
              </colgroup>
              <tbody>
              <!--省市区-->
              <tr class="el-table__row" v-show="pageType === '新增'">
                <td class="el-table_8_column_60"><div class="cell"><i class="must">*</i>区域</div></td>
                <td class="el-table_8_column_61">
                  <div class="cell">
                    <el-form-item label-width="0" :class="[isValid?'mb_reset':'']">
                      <el-cascader ref="csArea" width="100%" v-model="tableData.AreaList" :props="areaProps" @change="changeArea(tableData)" placeholder="请选择"></el-cascader>
                    </el-form-item>
                  </div>
                </td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--站点编码-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell"><i class="must">*</i>站点编码</div></td>
                <td class="el-table_8_column_61">
                  <div class="cell">
                    <el-form-item label-width="0" :class="[isValid?'mb_reset':'']" prop="code">
                      <el-input v-model="tableData.code"></el-input>
                    </el-form-item>
                  </div>
                </td>
                <td class="el-table_8_column_62"><div class="cell" @click="OpenImgBox('站点编码')">{{CodeImgList.length}}</div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--站点名称-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell"><i class="must">*</i>站点名称</div></td>
                <td class="el-table_8_column_61">
                  <div class="cell">
                    <el-form-item label-width="0" :class="[isValid?'mb_reset':'']" prop="name">
                      <el-input v-model="tableData.name"></el-input>
                    </el-form-item>
                  </div>
                </td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--站点分类-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell"><i class="must">*</i>站点分类</div></td>
                <td class="el-table_8_column_61">
                  <div class="cell">
                    <el-form-item label-width="0" :class="[isValid?'mb_reset':'']" prop="classify">
                      <el-select class="searchSelect" v-model="tableData.classify" placeholder="请选择站点分类">
                        <el-option label="请选择" :value="null"></el-option>
                        <el-option v-for="i in DicList.classify" :key="i.value" :label="i.text" :value="i.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell">{{writeDic(DicList.classify)}}</div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--入网日期-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell"><i class="must">*</i>入网日期</div></td>
                <td class="el-table_8_column_61">
                  <div class="cell">
                    <el-form-item label-width="0" :class="[isValid?'mb_reset':'']" prop="accessdate">
                      <el-date-picker v-model="tableData.accessdate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                  </div>
                </td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--设备类型-->
              <!--<tr class="el-table__row" v-if="pageType === '新增'">
                <td class="el-table_8_column_60"><div class="cell">设备类型</div></td>
                <td class="el-table_8_column_61">
                  <div class="cell">
                    <el-form-item label-width="0" :class="[isValid?'mb_reset':'']" prop="equipmenttype_id">
                      <el-select v-model="tableData.equipmenttype_id" multiple @change="selectDisposeCode" placeholder="请选择" size="small">
                        &lt;!&ndash;<el-option label="请选择" :value="0"></el-option>&ndash;&gt;
                        <el-option v-for="(i,index) in EquipmentTypeList" :key="index" :label="i.name" :value="i.id"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                &lt;!&ndash; <td class="el-table_8_column_63"><div class="cell"></div></td> &ndash;&gt;
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>-->
              <!--经度-->
              <tr class="el-table__row" v-if="tableData.classify === 1">
                <td class="el-table_8_column_60"><div class="cell"><i class="must">*</i>经度</div></td>
                <td class="el-table_8_column_61" @click="OpenMap(1)">
                  <div class="cell">
                    <el-form-item label-width="0" :class="[isValid?'mb_reset':'']" prop="longitude">
                      <el-input v-model="tableData.longitude" readonly style="width: 80%"></el-input>
                      <i class="el-icon-location" style="font-size: 20px;color:#F64245;"></i>
                    </el-form-item>
                  </div>
                </td>
                <td class="el-table_8_column_62"><div class="cell" @click="OpenImgBox('经度')">{{LongImgList.length}}</div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--纬度-->
              <tr class="el-table__row" v-if="tableData.classify === 1">
                <td class="el-table_8_column_60"><div class="cell"><i class="must">*</i>纬度</div></td>
                <td class="el-table_8_column_61" @click="OpenMap(1)">
                  <div class="cell">
                    <el-form-item label-width="0" :class="[isValid?'mb_reset':'']" prop="latitude">
                      <el-input v-model="tableData.latitude" readonly style="width: 80%"></el-input>
                    </el-form-item>
                  </div>
                </td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--生命周期-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell">生命周期</div></td>
                <td class="el-table_8_column_61"><div class="cell">
                  <el-form-item label-width="0" :class="[isValid?'mb_reset':'']">
                    <el-input v-model="tableData.lifecycle"></el-input>
                  </el-form-item>
                </div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--产权性质-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell">产权性质</div></td>
                <td class="el-table_8_column_61"><div class="cell">
                  <el-form-item label-width="0" :class="[isValid?'mb_reset':'']">
                    <el-input v-model="tableData.propertyrights"></el-input>
                  </el-form-item>
                </div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--原产权单位-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell">原产权单位</div></td>
                <td class="el-table_8_column_61"><div class="cell">
                  <!--<el-form-item label-width="0" :class="[isValid?'mb_reset':'']">
                    <el-input v-model="tableData.rawpropertyrightunit"></el-input>
                  </el-form-item>-->
                  <el-select v-model="tableData.rawpropertyrightunit" size="small">
                    <el-option label="请选择" :value="null"></el-option>
                    <el-option v-for="i in DicList.propertyrightunit" :key="i.value" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell">{{writeDic(DicList.propertyrightunit)}}</div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--机房类型-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell">机房类型</div></td>
                <td class="el-table_8_column_61">
                  <div class="cell">
                    <el-form-item label-width="0" :class="[isValid?'mb_reset':'']" prop="roomtype">
                      <el-select class="searchSelect" v-model="tableData.roomtype">
                        <el-option label="请选择" :value="0"></el-option>
                        <el-option v-for="i in DicList.roomtype" :key="i.value" :label="i.text" :value="i.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell">{{writeDic(DicList.roomtype)}}</div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--建站模式-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell">建站模式</div></td>
                <td class="el-table_8_column_61"><div class="cell">
                  <el-select v-model="tableData.websitebuildingmode" size="small">
                    <el-option label="请选择" :value="null"></el-option>
                    <el-option v-for="i in DicList.models" :key="i.value" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--机房位置-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell">机房位置</div></td>
                <td class="el-table_8_column_61"><div class="cell">
                  <el-form-item label-width="0" :class="[isValid?'mb_reset':'']">
                    <el-input v-model="tableData.computerroomposition"></el-input>
                  </el-form-item>
                </div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--是否拉远站-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell"><i class="must">*</i>是否拉远站</div></td>
                <td class="el-table_8_column_61">
                  <div class="cell">
                    <el-form-item label-width="0" :class="[isValid?'mb_reset':'']" prop="outstanding">
                      <el-select class="tableSelect" v-model="tableData.outstanding" size="small">
                        <el-option label="是" :value="true"></el-option>
                        <el-option label="否" :value="false"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--站址地形-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell">站址地形</div></td>
                <td class="el-table_8_column_61"><div class="cell">
                  <el-form-item label-width="0" :class="[isValid?'mb_reset':'']">
                    <el-input v-model="tableData.siteterrain"></el-input>
                  </el-form-item>
                </div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--覆盖场景-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell">覆盖场景</div></td>
                <td class="el-table_8_column_61"><div class="cell">
                  <el-form-item label-width="0" :class="[isValid?'mb_reset':'']">
                    <el-input v-model="tableData.coversthescenario"></el-input>
                  </el-form-item>
                </div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--合同签订主体-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell">合同签订主体</div></td>
                <td class="el-table_8_column_61"><div class="cell">
                  <el-form-item label-width="0" :class="[isValid?'mb_reset':'']">
                    <el-input v-model="tableData.contractsigning"></el-input>
                  </el-form-item>
                </div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--移交批次-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell">移交批次</div></td>
                <td class="el-table_8_column_61"><div class="cell">
                  <el-form-item label-width="0" :class="[isValid?'mb_reset':'']">
                    <el-input v-model="tableData.handoverbatch"></el-input>
                  </el-form-item>
                </div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--是否共享-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell"><i class="must">*</i>是否共享</div></td>
                <td class="el-table_8_column_61">
                  <div class="cell">
                    <el-form-item label-width="0" :class="[isValid?'mb_reset':'']" prop="shared">
                      <el-select class="tableSelect" v-model="tableData.shared" size="small">
                        <el-option label="是" :value="true"></el-option>
                        <el-option label="否" :value="false"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--共享单位-->
              <tr class="el-table__row" v-if="tableData.shared === true || tableData.shared === '是' || tableData.shared === ''">
                <td class="el-table_8_column_60"><div class="cell">共享单位</div></td>
                <td class="el-table_8_column_61"><div class="cell">
                  <el-form-item label-width="0" :class="[isValid?'mb_reset':'']">
                    <el-input v-model="tableData.sharedunit"></el-input>
                  </el-form-item>
                </div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--资产识别码-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell">资产识别码</div></td>
                <td class="el-table_8_column_61"><div class="cell">
                  <el-form-item label-width="0" :class="[isValid?'mb_reset':'']">
                    <el-input v-model="tableData.identificationcode"></el-input>
                  </el-form-item>
                </div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--地址-->
              <tr class="el-table__row" v-if="tableData.classify === 1">
                <td class="el-table_8_column_60"><div class="cell">地址</div></td>
                <td class="el-table_8_column_61"><div class="cell">
                  <el-form-item label-width="0" :class="[isValid?'mb_reset':'']">
                    <el-input type="textarea" :rows="2" v-model="tableData.address"></el-input>
                  </el-form-item>
                </div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              </tbody>
            </table>
          </div>
        </el-form>
      </div>
      <div class="center" style="padding-bottom: 100px">
        <el-button @click="handleAddData" type="primary" icon="el-icon-check">提交</el-button>
        <el-button @click="closeShowEdit" type="primary" icon="el-icon-arrow-left">返回</el-button>
      </div>
    </div>
    <!--详情-->
    <div v-show="showDetail">
      <layuiTitle :title="'站点' + pageType"></layuiTitle>
      <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--mini">
        <!--表头-->
        <div class="el-table__header-wrapper">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
            <colgroup>
              <col name="el-table_8_column_60" width="80"/>
              <col name="el-table_8_column_61" width="100"/>
              <col name="el-table_8_column_62" width="50"/>
              <!-- <col name="el-table_8_column_63" width="400"/> -->
              <col name="el-table_8_column_64" width="100"/>
            </colgroup>
            <thead>
            <tr>
              <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
              <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
              <th colspan="1" rowspan="1" class="el-table_8_column_62     table-headerStyle"><div class="cell">照片</div></th>
              <!-- <th colspan="1" rowspan="1" class="el-table_8_column_63     table-headerStyle"><div class="cell">字典</div></th> -->
              <th colspan="1" rowspan="1" class="el-table_8_column_64     table-headerStyle"><div class="cell">规范要求</div></th>
            </tr>
            </thead>
          </table>
        </div>
        <!--表体-->
        <el-form :model="tableData" :rules="Rules" v-loading="Loading" :show-message="false" label-width="0">
          <div class="el-table__body-wrapper is-scrolling-none">
            <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
              <colgroup>
                <col name="el-table_8_column_60" width="80"/>
                <col name="el-table_8_column_61" width="100"/>
                <col name="el-table_8_column_62" width="50"/>
                <!-- <col name="el-table_8_column_63" width="400"/> -->
                <col name="el-table_8_column_64" width="100"/>
              </colgroup>
              <tbody>
              <!--市-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell"><i class="must">*</i>城市</div></td>
                <td class="el-table_8_column_61"><div class="cell">{{tableData.cityname}}</div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--区-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell"><i class="must">*</i>区域</div></td>
                <td class="el-table_8_column_61"><div class="cell">{{tableData.areaname}}</div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--站点编码-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell"><i class="must">*</i>站点编码</div></td>
                <td class="el-table_8_column_61"><div class="cell">{{tableData.code}}</div></td>
                <td class="el-table_8_column_62"><div class="cell" @click="OpenImgBox('站点编码', 'Detali')">{{CodeImgList.length}}</div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--站点名称-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell"><i class="must">*</i>站点名称</div></td>
                <td class="el-table_8_column_61"><div class="cell">{{tableData.name}}</div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--入网日期-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell"><i class="must">*</i>入网日期</div></td>
                <td class="el-table_8_column_61"><div class="cell">{{tableData.accessdate}}</div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--站点分类-->
              <!--<tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell"><i class="must">*</i>站点分类</div></td>
                <td class="el-table_8_column_61"><div class="cell">{{tableData.classifyname}}</div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                &lt;!&ndash; <td class="el-table_8_column_63"><div class="cell">{{writeDic(DicList.classify)}}</div></td> &ndash;&gt;
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>-->
              <!--站点类型-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell"><i class="must">*</i>站点类型</div></td>
                <td class="el-table_8_column_61"><div class="cell">{{tableData.resourcetypename}}</div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell">{{writeDic(DicList.resourcetype)}}</div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--机房类型-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell">机房类型</div></td>
                <td class="el-table_8_column_61"><div class="cell">{{tableData.roomtypename}}</div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell">{{writeDic(DicList.roomtype)}}</div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--经度-->
              <tr class="el-table__row" v-if="tableData.classify === 1">
                <td class="el-table_8_column_60"><div class="cell"><i class="must">*</i>经度</div></td>
                <td class="el-table_8_column_61" @click="OpenMap(0)"><div class="cell location"><span>{{tableData.longitude}}</span><i class="el-icon-location icon_location"></i></div></td>
                <td class="el-table_8_column_62"><div class="cell" @click="OpenImgBox('经度', 'Detali')">{{LongImgList.length}}</div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--纬度-->
              <tr class="el-table__row" v-if="tableData.classify === 1">
                <td class="el-table_8_column_60"><div class="cell"><i class="must">*</i>纬度</div></td>
                <td class="el-table_8_column_61" @click="OpenMap(0)"><div class="cell">{{tableData.latitude}}</div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--生命周期-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell">生命周期</div></td>
                <td class="el-table_8_column_61"><div class="cell">{{tableData.lifecycle}}</div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--产权性质-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell">产权性质</div></td>
                <td class="el-table_8_column_61"><div class="cell">{{tableData.propertyrights}}</div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--设备产权单位-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell">原产权单位</div></td>
                <td class="el-table_8_column_61"><div class="cell">{{tableData.rawpropertyrightunitname}}</div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell">{{writeDic(DicList.propertyrightunit)}}</div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--建站模式-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell">建站模式</div></td>
                <td class="el-table_8_column_61"><div class="cell">{{tableData.websitebuildingmodename}}</div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--机房位置-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell">机房位置</div></td>
                <td class="el-table_8_column_61"><div class="cell">{{tableData.computerroomposition}}</div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--是否拉远站-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell"><i class="must">*</i>是否拉远站</div></td>
                <td class="el-table_8_column_61"><div class="cell">{{tableData.outstanding ?  '是' : '否'}}</div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--站址地形-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell">站址地形</div></td>
                <td class="el-table_8_column_61"><div class="cell">{{tableData.siteterrain}}</div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--覆盖场景-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell">覆盖场景</div></td>
                <td class="el-table_8_column_61"><div class="cell">{{tableData.coversthescenario}}</div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--合同签订主体-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell">合同签订主体</div></td>
                <td class="el-table_8_column_61"><div class="cell">{{tableData.contractsigning}}</div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--移交批次-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell">移交批次</div></td>
                <td class="el-table_8_column_61"><div class="cell">{{tableData.handoverbatch}}</div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--是否共享-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell"><i class="must">*</i>是否共享</div></td>
                <td class="el-table_8_column_61"><div class="cell">{{tableData.shared ? '是' : '否'}}</div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--共享单位-->
              <tr class="el-table__row" v-if="tableData.shared">
                <td class="el-table_8_column_60"><div class="cell">共享单位</div></td>
                <td class="el-table_8_column_61"><div class="cell">{{tableData.sharedunit}}</div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--资产识别码-->
              <tr class="el-table__row">
                <td class="el-table_8_column_60"><div class="cell">资产识别码</div></td>
                <td class="el-table_8_column_61"><div class="cell">{{tableData.identificationcode}}</div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--地址-->
              <tr class="el-table__row" v-if="tableData.classify === 1">
                <td class="el-table_8_column_60"><div class="cell">地址</div></td>
                <td class="el-table_8_column_61"><div class="cell">{{tableData.address}}</div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--提交人-->
              <tr class="el-table__row" v-show="pageType == '编辑' || pageType == '详情'">
                <td class="el-table_8_column_60"><div class="cell">创建人</div></td>
                <td class="el-table_8_column_61"><div class="cell">{{tableData.createusername}}</div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--创建时间-->
              <tr class="el-table__row" v-show="pageType == '编辑' || pageType == '详情'">
                <td class="el-table_8_column_60"><div class="cell">创建时间</div></td>
                <td class="el-table_8_column_61"><div class="cell">{{tableData.createtime}}</div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              </tbody>
            </table>
          </div>
        </el-form>
      </div>
      <div class="center">
        <el-button @click="closeShowDetail" type="primary" icon="el-icon-arrow-left">返回</el-button>
      </div>
    </div>

    <!--dialog弹窗-->
    <ImgBox ref="ImgBox"></ImgBox>
    <Import ref="ImportBox" @fatherGetData="_getTableData1"></Import>
    <GoogleMap v-if="showMap" ref="GoogleMap" @fatherGetData="getMapData"></GoogleMap>
  </div>
</template>

<script>
import GoogleMap from 'base/GoogleMap'
import Import from 'base/Import'
import {GlobalRes} from 'common/js/mixins'
import layuiTitle from 'base/layui-title'
import {isValidLongitude, isValidLatitude} from 'common/js/validata'
import ImgBox from 'base/ImgBox'
import {exportMethod} from 'api/YDSZ'
import {DictionaryInfoList, GetZYResourceListAsync, AddZYResourceAsync, GetZYResourceIdListAsync,
  GetEquipmentTypeList, GetResourceExcel, ImportResourceExcel} from 'api/api'

export default {
  name: 'SiteManagement',
  mixins: [GlobalRes],
  data () {
    return {
      // 查询相关属性
      query: {
        AreaList: [],
        name: '', // 站点名称
        resourcetype: 1, // 站点类型
        classify: '', // 站点分类
        provinceid: '', // 省份
        cityid: '', // 城市
        areaid: '', // 区域
        starttime: '',
        endtime: '',
        code: ''
      },
      // 查询区域下拉框
      AreaList: {
        province: '',
        city: '',
        area: ''
      },
      showMap: false,
      showList: true,
      tableList: [],
      // 显示编辑 && 新增
      showEdit: false,
      // 显示详情
      showDetail: false,
      // Loading
      Table1Loading: false,
      tableData: {
        provinceid: '', // 省份
        cityid: '', // 地市
        areaid: '', // 区域
        AreaList: [],
        code: '', // 站点编码
        name: '', // 站点名称
        equipmenttype_id: [],
        accessdate: '', // 入网日期****
        classify: null, // 站点分类
        roomtype: 0,
        resourcetype: 2, // 站点类型
        longitude: null, // 经度
        latitude: null, // 纬度
        lifecycle: '', // 生命周期
        propertyrights: '', // 产权性质
        rawpropertyrightunit: null, // 设备产权单位
        websitebuildingmode: null, // 建站模式
        computerroomposition: '', // 机房位置
        outstanding: true, // 是否拉远站
        siteterrain: '', // 站址地形
        coversthescenario: '', // 覆盖场景
        contractsigning: '', // 合同签订主体
        handoverbatch: '', // 移交批次
        shared: true, // 是否共享
        sharedunit: '', // 共享单位
        identificationcode: '', // 资产识别码
        address: '', // 地址
        createusername: '', // 提交人
        createtime: '', // 创建时间*
        cityname: '',
        areaname: '',
        provincename: '',
        id: ''
      },
      Rules: {
        provinceid: [
          { required: true, message: '请选择省份', trigger: 'change' }
        ],
        cityid: [
          { required: true, message: '请选择地市', trigger: 'change' }
        ],
        areaid: [
          { required: true, message: '请选择区域', trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入站点编码', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入站点名称', trigger: 'blur' }
        ],
        accessdate: [
          { required: true, message: '请选择入网日期', trigger: 'change' }
        ],
        classify: [
          { required: true, message: '请选择站点分类', trigger: 'change' }
        ],
        resourcetype: [
          { required: true, message: '请选择站点类型', trigger: 'change' }
        ],
        longitude: [
          {required: true, message: '请填写经度', trigger: 'blur'},
          {pattern: isValidLongitude, message: '请输入正确的经度', trigger: 'blur'}
        ],
        latitude: [
          {required: true, message: '请填写纬度', trigger: 'blur'},
          {pattern: isValidLatitude, message: '请输入正确的纬度', trigger: 'blur'}
        ],
        outstanding: [
          { required: true, message: '是否拉远站', trigger: 'change' }
        ],
        shared: [
          { required: true, message: '是否共享', trigger: 'change' }
        ]
      },
      Loading: false,
      // 点击按钮时存放变量
      pageType: '',
      isValid: true,
      // 分页相关属性
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1,
        PageIndex: 1
      },
      // 详情tabs id 转存
      tabsRowId: '',
      // imgbox实参
      CodeImgList: [],
      LongImgList: [],
      // 字典集合
      DicList: {
      },
      siteID: [],
      EquipmentTypeList: [] // 设备类型集合
    }
  },
  activated () {
    this._getTableData1()
    this.initDictionariesArray()
    this.GetEquipmentTypeList()
    this.$refs.ImportBox.searchName = '站点管理模板'
    this.$refs.ImportBox.GetTemplateInfo()
  },
  methods: {
    selectDisposeCode () {
      this.$forceUpdate()
    },
    async GetEquipmentTypeList () {
      const res = await this.$axios.get(GetEquipmentTypeList, {
        params: {
          classify: 1,
          PageIndex: 1,
          PageSize: 200
        }
      })
      if (res.errorCode !== '200') {
        return this.$message.error(res.msg)
      } else {
        this.EquipmentTypeList = res.data.list
      }
    },
    // 入网日期
    accessdate (val) { this.tableData.accessdate = val },
    async _getTableData1 () {
      this.pagination.currentPage = 1
      this.Table1Loading = true
      const res = await this.$axios.post(GetZYResourceListAsync, this.siteID, {params: {PageIndex: 1, PageSize: this.pagination.pageSize, resourcetype: this.query.resourcetype}})
      this.Table1Loading = false
      if (res.errorCode !== '200') return this.$message.error(res.msg)
      this.tableList = res.data.list
      this.pagination.total = res.data.total
    },
    async _getTableMore1 (page) {
      this.pagination.currentPage = page
      this.Table1Loading = true
      const res = await this.$axios.post(GetZYResourceListAsync, this.siteID, {
        params: Object.assign({}, this.query, {
          PageIndex: page,
          PageSize: this.pagination.pageSize
        })
      })
      this.Table1Loading = false
      if (res.errorCode !== '200') return this.$message.error(res.msg)
      this.tableList = res.data.list
      this.pagination.total = res.data.total
    },
    // 分页处理函数
    handelSizeChange (page) {
      this.pagination.pageSize = page
      this._getTableMore1(this.pagination.currentPage)
    },
    // 搜索按钮
    async handleSearch () {
      let query = {}
      for (let item in this.query) {
        if (this.query[item]) query[item] = this.query[item]
      }
      const res = await this.$axios.post(GetZYResourceListAsync, this.siteID, {params: Object.assign(query, {pageIndex: this.pagination.PageIndex, pageSize: this.pagination.pageSize})})
      if (res.errorCode !== '200') return this.$message.error(res.msg)
      if (res.data) {
        this.tableList = res.data.list
        this.pagination.total = res.data.total
      }
    },
    resetQuery () {
      Object.assign(this.$data.query, this.$options.data().query)
      Object.assign(this.$data.AreaList, this.$options.data().AreaList)
      this._getTableData1()
    },
    // 新增按钮
    addQueryForm () {
      this.$refs.tableForm.clearValidate() // 初始化表单校验
      this.pageType = '新增'
      this.CodeImgList = []
      this.LongImgList = []
      this.showList = !this.showList
      this.showEdit = !this.showEdit
    },
    // 详情按钮
    async handelDetail (index, row) {
      this.pageType = '详情'
      this.CodeImgList = []
      this.LongImgList = []
      this.showDetail = !this.showDetail
      this.showEdit = false
      this.showList = false
      this.tabsRowId = row.id
      this.Loading = true
      const res = await this.$axios.get(GetZYResourceIdListAsync, {params: {id: row.id}})
      this.Loading = false
      if (res.errorCode !== '200') return this.$message.error(res.msg)
      if (res.data) {
        this.tableData = res.data
        this.tableData.AreaList = [ res.data.provinceid, res.data.cityid, res.data.areaid ]
        if (res.data.imglist) {
          res.data.imglist.forEach(item => {
            if (item.field_name === 'code') {
              this.CodeImgList.push(item)
            } else if (item.field_name === 'longitude') {
              this.LongImgList.push(item)
            }
          })
        }
      }
    },
    async initDictionariesArray () {
      let arr = ['站点分类', '站点类型', '站点状态', '站点类型', '设备产权单位', '站点机房类型', '建站模式']
      const res = await this.$axios.post(DictionaryInfoList, arr)
      if (res.errorCode !== '200') {
        return this.$message.error(res.msg)
      } else {
        this.DicList.models = res.data.filter(i => {
          return i.type === '建站模式'
        })
        this.DicList.classify = res.data.filter(i => {
          return i.type === '站点分类'
        })
        this.DicList.resourcetype = res.data.filter(i => {
          return i.type === '站点类型'
        })
        this.DicList.state = res.data.filter(i => {
          return i.type === '站点状态'
        })
        this.DicList.operatorsitetype = res.data.filter(i => {
          return i.type === '站点类型'
        })
        this.DicList.propertyrightunit = res.data.filter(i => {
          return i.type === '设备产权单位'
        })
        this.DicList.roomtype = res.data.filter(i => {
          return i.type === '站点机房类型'
        })
      }
    },
    // 新增 && 修改 返回事件
    closeShowEdit () {
      Object.assign(this.$data.tableData, this.$options.data().tableData)
      this._getTableMore1(1)
      this.showEdit = !this.showEdit
      this.showList = true
    },
    // 详情 返回事件
    closeShowDetail () {
      Object.assign(this.$data.tableData, this.$options.data().tableData)
      this._getTableMore1(1)
      this.showDetail = !this.showDetail
      this.showList = true
    },
    // 新增 && 修改页面的提交按钮
    handleAddData () {
      this.$refs.tableForm.validate(async (vali, msg) => {
        if (!vali) {
          if (msg.longitude) return this.$message.warning(msg.longitude[0].message)
          if (msg.latitude) return this.$message.warning(msg.latitude[0].message)
          this.$message.error('请补全信息！')
        } else {
          if (this.tableData.classify === 1 && this.LongImgList.length === 0) return this.$message.warning('请上传经度照片')
          if (this.pageType === '新增') {
            if (!this.tableData.AreaList.length) {
              return this.$message.error('请选择区域！')
            }
            const res = await this.$axios.post(AddZYResourceAsync, Object.assign({}, this.tableData, {imglist: this.imageList}))
            if (res.errorCode !== '200') return this.$message.error(res.msg)
            this.$message.success('添加成功！')
            this.showEdit = !this.showEdit
            this.showList = true
            this._getTableData1()
          }
        }
      })
    },
    setImgList (list) {
      this.CodeImgList = list.filter(i => i.field_name === 'code')
      this.LongImgList = list.filter(i => i.field_name === 'longitude')
    },
    // 添加图片方法
    OpenImgBox (val, flag) {
      switch (val) {
        case '站点编码':
          this.$refs.ImgBox.SetData('站点编码', 'code', this.CodeImgList)
          break
        case '经度':
          this.$refs.ImgBox.SetData('经度', 'longitude', this.LongImgList)
          break
      }
      this.$refs.ImgBox.Open()
      this.pageType === '详情' ? this.$refs.ImgBox.Flag = true : this.$refs.ImgBox.Flag = false
    },
    showImport () {
      this.$refs.ImportBox.Open()
      this.$refs.ImportBox.uploadURL = ImportResourceExcel
      this.$refs.ImportBox.fileName = '错误站点数据'
    },
    handleExport () {
      this.$confirm(`您确定要导出吗？`, '提示', {
        type: 'info'
      }).then(() => {
        let myObj = {
          method: 'get',
          url: GetResourceExcel,
          fileName: '站点管理',
          data: Object.assign({}, this.Query, {resourcetype: 2})
        }
        exportMethod(myObj)
      })
    },
    OpenMap (val) { // 0: 查看 1: 编辑/新增
      this.showMap = true
      this.$nextTick(() => {
        this.$refs.GoogleMap.Open()
        this.$refs.GoogleMap.showType = val
        this.$refs.GoogleMap.longitude = this.tableData.longitude
        this.$refs.GoogleMap.latitude = this.tableData.latitude
        this.$refs.GoogleMap.Query.longitude = this.tableData.longitude
        this.$refs.GoogleMap.Query.latitude = this.tableData.latitude
      })
    },
    getMapData (longitude, latitude) {
      this.showMap = false
      if (longitude) {
        this.tableData.longitude = longitude
      }
      if (latitude) {
        this.tableData.latitude = latitude
      }
    },
    fatherClose () {
      this.showList = true
      this._getTableData1()
    }
  },
  computed: {
    imageList () {
      return this.CodeImgList.concat(this.LongImgList)
    }
  },
  watch: {
    'tableData.longitude': function (val) {
      if (val === 0) {
        this.tableData.longitude = null
      }
    },
    'tableData.latitude': function (val) {
      if (val === 0) {
        this.tableData.latitude = null
      }
    }
  },
  components: {
    layuiTitle,
    ImgBox,
    GoogleMap,
    Import
  }
}
</script>

<style scoped>
  @import url('./../../../common/css/mixin.css');
  .tableSelect{
    width: 100%;
  }
  .mb_reset{
    margin: 0 !important;
  }
</style>
