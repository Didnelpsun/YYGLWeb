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
        <!--<div class="center" style="margin-bottom: 20px;">
          <el-button icon="el-icon-search" @click="_getTableMore1(pagination.currentPage)">查询</el-button>
          <el-button icon="el-icon-refresh" @click="resetQuery">重置</el-button>
          <el-button type="success" icon="el-icon-plus" @click="addQueryForm">新增</el-button>
        </div>-->
      </el-form>

      <el-row>
        <el-col :span="4" class="SearchResult">查询结果</el-col>
        <el-col :offset="2" :span="18" class="fr">
          <div class="fr">
            <el-button type="success" icon="el-icon-plus" @click="addQueryForm">新增</el-button>
            <el-button @click="handleExport" type="success" icon="el-icon-download">导出</el-button>
          </div>
        </el-col>
      </el-row>

      <el-table :data="tableList" v-loading="Table1Loading" style="margin-top: 15px;">
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template></el-table-column>
        <el-table-column prop="cityname" label="地市" width="70"></el-table-column>
        <el-table-column prop="areaname" label="区域" width="70"></el-table-column>
        <el-table-column prop="name" label="站点名称" width=""></el-table-column>
        <el-table-column prop="code" label="站点编码" width=""></el-table-column>
        <el-table-column prop="classifyname" label="站点分类" width="70"></el-table-column>
        <el-table-column prop="resourceeqipmentname" label="站点配置模型" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="accessdate" label="入网日期" width=""></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width=""></el-table-column>
        <el-table-column prop="createusername" label="创建人" width="120"></el-table-column>
        <el-table-column prop="" label="操作" width="280">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handelDetail(scope.$index, scope.row)">详情</el-button>
            <el-button type="text" size="mini" @click="handelEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button type="text" size="mini" @click="OperationSite(scope.$index, scope.row)">运维站点</el-button>
            <el-button type="text" size="mini" @click="deviceConfig(scope.$index, scope.row)">站点设备配置</el-button>
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
        <el-form :model="tableData" :rules="Rules" v-loading="Loading2" ref="tableForm" :show-message="false" label-width="0">
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
              <tr class="el-table__row" v-if="pageType === '新增'">
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
              <!--市-->
              <tr class="el-table__row" v-if="pageType === '编辑'">
                <td class="el-table_8_column_60"><div class="cell"><i class="must">*</i>地市</div></td>
                <td class="el-table_8_column_61"><div class="cell">{{tableData.cityname}}</div></td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--区-->
              <tr class="el-table__row" v-if="pageType === '编辑'">
                <td class="el-table_8_column_60"><div class="cell"><i class="must">*</i>区域</div></td>
                <td class="el-table_8_column_61"><div class="cell">{{tableData.areaname}}</div></td>
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
                        <el-option label="请选择" value=""></el-option>
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
              <tr class="el-table__row" v-if="pageType === '新增'">
                <td class="el-table_8_column_60"><div class="cell">设备类型</div></td>
                <td class="el-table_8_column_61">
                  <div class="cell">
                    <el-form-item label-width="0" :class="[isValid?'mb_reset':'']" prop="equipmenttype_id">
                      <el-select v-model="tableData.equipmenttype_id" multiple @change="selectDisposeCode" placeholder="请选择" size="small">
                        <!--<el-option label="请选择" :value="0"></el-option>-->
                        <el-option v-for="(i,index) in EquipmentTypeList" :key="index" :label="i.name" :value="i.id"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--经度-->
              <tr class="el-table__row" v-if="tableData.classify === 1">
                <td class="el-table_8_column_60"><div class="cell"><i v-show="required" class="must">*</i>经度</div></td>
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
                <td class="el-table_8_column_60"><div class="cell"><i v-show="required" class="must">*</i>纬度</div></td>
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
              <!--详细地址-->
              <tr class="el-table__row" v-if="tableData.classify === 1">
                <td class="el-table_8_column_60"><div class="cell">详细地址</div></td>
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
          <el-form :model="tableData" :rules="Rules" v-loading="Loading3" :show-message="false" label-width="0">
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
                  <td class="el-table_8_column_60"><div class="cell"><i class="must">*</i>地市</div></td>
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
                <!--站点分类-->
                <tr class="el-table__row">
                  <td class="el-table_8_column_60"><div class="cell"><i class="must">*</i>站点分类</div></td>
                  <td class="el-table_8_column_61"><div class="cell">{{tableData.classifyname}}</div></td>
                  <td class="el-table_8_column_62"><div class="cell"></div></td>
                  <!-- <td class="el-table_8_column_63"><div class="cell">{{writeDic(DicList.classify)}}</div></td> -->
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
                <!--详细地址-->
                <tr class="el-table__row" v-if="tableData.classify === 1">
                  <td class="el-table_8_column_60"><div class="cell">详细地址</div></td>
                  <td class="el-table_8_column_61"><div class="cell">{{tableData.address}}</div></td>
                  <td class="el-table_8_column_62"><div class="cell"></div></td>
                  <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                  <td class="el-table_8_column_64"><div class="cell"></div></td>
                </tr>
                <!--创建人-->
                <tr class="el-table__row">
                  <td class="el-table_8_column_60"><div class="cell">创建人</div></td>
                  <td class="el-table_8_column_61"><div class="cell">{{tableData.createusername}}</div></td>
                  <td class="el-table_8_column_62"><div class="cell"></div></td>
                  <!-- <td class="el-table_8_column_63"><div class="cell"></div></td> -->
                  <td class="el-table_8_column_64"><div class="cell"></div></td>
                </tr>
                <!--创建时间-->
                <tr class="el-table__row">
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
      <div class="center" v-show="ViewTabIndex !== '0'">
        <!--<el-pagination @current-change="getTableData1More" @size-change="handelSizeChange" :current-page="currentPage2[PaginationIndex]"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pageSize2[PaginationIndex]" :total="total2[PaginationIndex]"
                       background layout="total, prev, pager, next, sizes"></el-pagination>-->
        <el-pagination @current-change="currentChange2" @size-change="SizeChange2" :current-page="currentPage2"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pageSize2" :total="total2"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
      <div class="center">
        <el-button @click="closeShowDetail" type="primary" icon="el-icon-arrow-left">返回</el-button>
      </div>
    </div>

    <div v-if="showOperationSite">
      <OperationSite ref="OperationSite" @fatherClose="fatherClose"></OperationSite>
    </div>

    <div v-if="showDeviceConfig">
      <NYResourceEquipment ref="NYResourceEquipment" @fatherClose="fatherClose"></NYResourceEquipment>
    </div>
    <!--dialog弹窗-->
    <ImgBox ref="ImgBox"></ImgBox>
    <GoogleMap v-if="showMap" ref="GoogleMap" @fatherGetData="getMapData"></GoogleMap>
  </div>
</template>

<script>
import GoogleMap from 'base/GoogleMap'
import OperationSite from 'base/Resource/OperationSite'
import NYResourceEquipment from 'base/Resource/NYResourceEquipment'
import {GlobalRes} from 'common/js/mixins'
import layuiTitle from 'base/layui-title'
import {isValidLongitude, isValidLatitude} from 'common/js/validata'
import ImgBox from 'base/ImgBox'
import {DictionaryInfoList, GetEnergyListAsync, AddZYResourceAsync, DeleteZYResourceAsync, EditZYResourceAsync, GetZYResourceIdListAsync, GetOperatorSiteList,
  GetMonitoringSite, MonitoringSiteIdInfo, GetOperatorSiteInfo, GetEquipmentTypeList} from 'api/api'

export default {
  name: 'Resource',
  mixins: [GlobalRes],
  data () {
    return {
      showMap: false,
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
      tableList: [],
      EquipmentTypeList: [], // 设备类型集合
      showList: true,
      showOperationSite: false,
      showDeviceConfig: false,
      // 显示编辑 && 新增
      showEdit: false,
      // 显示详情
      showDetail: false,
      detailsType: '',
      // Loading
      Table1Loading: false,
      // 新增 & 详请 & 编辑显示的table数据
      detailInfo: [],
      tableData: {
        provinceid: '', // 省份
        cityid: '', // 地市
        areaid: '', // 区域
        AreaList: [],
        code: '', // 站点编码
        name: '', // 站点名称
        accessdate: '', // 入网日期****
        classify: '', // 站点分类
        classifyname: '',
        resourcetype: 1, // 站点类型
        longitude: null, // 经度
        latitude: null, // 纬度
        address: '', // 地址
        createusername: '', // 提交人
        createtime: '', // 创建时间*
        cityname: '',
        areaname: '',
        provincename: '',
        equipmenttype_id: [],
        id: '',
        imglist: []
      },
      Rules: {
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
          {required: false, message: '请填写经度', trigger: 'change'},
          {pattern: isValidLongitude, message: '请输入正确的经度', trigger: 'blur'}
        ],
        latitude: [
          {required: false, message: '请填写纬度', trigger: 'change'},
          {pattern: isValidLatitude, message: '请输入正确的纬度', trigger: 'blur'}
        ],
        outstanding: [
          { required: true, message: '是否拉远站', trigger: 'change' }
        ],
        shared: [
          { required: true, message: '是否共享', trigger: 'change' }
        ]
      },
      // 详情 运营商站点table list
      OperatorsMap: {
        Monitor: [],
        Operators: [],
        Detail: {},
        // 分页相关属性
        pagination: {
          total: 0,
          pageSize: 10,
          currentPage: 1,
          PageIndex: 1
        }
      },
      currentPage2: 1,
      currentPageList: [1, 1],
      pageSize2: 10,
      pageSizeList: [10, 10],
      total2: 0,
      totalList: [0, 0],
      Loading2: false,
      Loading3: false,
      // Dialog
      DetailDialogVisible: false,
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
      // 选项卡菜单
      ViewTabIndex: '0',
      // 详情tabs id 转存
      tabsRowId: '',
      // imgbox实参
      CodeImgList: [],
      LongImgList: [],
      ImgList1: [],
      ImgList2: [],
      required: false,
      // 字典集合
      DicList: {
      },
      siteID: []
    }
  },
  created () {
    this._getTableData1()
    this.initDictionariesArray()
    this.GetEquipmentTypeList()
  },
  methods: {
    selectDisposeCode () {
      this.$forceUpdate()
    },
    // 入网日期
    accessdate (val) { this.tableData.accessdate = val },
    async _getTableData1 () {
      this.Table1Loading = true
      const res = await this.$axios.post(GetEnergyListAsync, this.siteID, {params: {PageIndex: 1, PageSize: this.pagination.pageSize, resourcetype: this.query.resourcetype}})
      this.Table1Loading = false
      if (res.errorCode !== '200') return this.$message.error(res.msg)
      this.tableList = res.data.list
      this.pagination.total = res.data.total
    },
    async _getTableMore1 (page) {
      this.pagination.currentPage = page
      this.Table1Loading = true
      const res = await this.$axios.post(GetEnergyListAsync, this.siteID, {
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
      const res = await this.$axios.post(GetEnergyListAsync, this.siteID, {params: Object.assign(query, {pageIndex: this.pagination.PageIndex, pageSize: this.pagination.pageSize})})
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
      this.showList = false
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
      this.ViewTabIndex = '0'
      this.tabsRowId = row.id
      this.Loading3 = true
      const res = await this.$axios.get(GetZYResourceIdListAsync, {params: {id: row.id}})
      this.Loading3 = false
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
      let arr = ['站点分类', '站点类型', '站点状态', '站点类型', '设备产权单位', '建站模式']
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
      }
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
    async handelEdit (index, row) {
      this.showEdit = !this.showEdit
      this.pageType = '编辑'
      this.CodeImgList = []
      this.LongImgList = []
      this.showList = false
      this.Loading2 = true
      const res = await this.$axios.get(GetZYResourceIdListAsync, {params: {id: row.id}})
      this.Loading2 = false
      if (res.errorCode !== '200') return this.$message.error(res.msg)
      if (!res.data) return
      this.tableData = Object.assign(res.data, {id: row.id})
      this.tableData.AreaList = [ res.data.provinceid, res.data.cityid, res.data.areaid ]
      if (res.data.imglist) {
        this.setImgList(res.data.imglist)
        /* res.data.imglist.forEach(item => {
          if (item.field_name === 'code') {
            this.CodeImgList.push(item)
          } else if (item.field_name === 'longitude') {
            this.LongImgList.push(item)
          }
        }) */
      }
    },
    // 删除按钮
    async handleDelete (index, row) {
      const confirmResult = await this.$confirm(`您确定要删除 ${row.name} 资源吗？`, '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).catch(err => err)
      if (confirmResult !== 'confirm') return
      const res = await this.$axios.delete(DeleteZYResourceAsync, {params: {id: row.id}})
      if (res.errorCode !== '200') return this.$message.error(res.msg)
      this.$message.success('删除成功！')
      this._getTableData1() // 刷新列表数据
    },
    // 新增 && 修改 返回事件
    closeShowEdit () {
      Object.assign(this.$data.tableData, this.$options.data().tableData)
      this.$refs.tableForm.clearValidate()
      this.showEdit = !this.showEdit
      this.showList = true
    },
    // 详情 返回事件
    closeShowDetail () {
      Object.assign(this.$data.tableData, this.$options.data().tableData)
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
            this.closeShowEdit()
            this._getTableData1()
          } else if (this.pageType === '编辑') {
            if (!this.tableData.AreaList.length) {
              return this.$message.error('请选择区域！')
            }
            const res = await this.$axios.put(EditZYResourceAsync, Object.assign({}, this.tableData, {imglist: this.imageList}))
            if (res.errorCode !== '200') return this.$message.error(res.msg)
            this.$message.success('修改成功！')
            this.closeShowEdit()
            this._getTableData1()
          }
        }
      })
    },
    // 选项卡 change 事件
    currentChange2 (page) {
      this.currentPage2 = page
      this.currentPageList[this.PaginationIndex] = page
      this.getTabsMore(this.PaginationIndex)
    },
    SizeChange2 (size) {
      this.pageSize2 = size
      this.pageSizeList[this.PaginationIndex] = size
      this.getTabsMore(this.PaginationIndex)
    },
    getTabsMore (index) {
      let data = {
        PageIndex: this.currentPageList[index],
        PageSize: this.pageSizeList[index],
        resourceid: this.tabsRowId
      }
      if (index === 0) return this.tabs1(data)
      if (index === 1) return this.tabs2(data)
    },
    handleTabs () {
      if (this.ViewTabIndex === '1') { this.tabs1() }
      if (this.ViewTabIndex === '2') { this.tabs2() }
    },
    async tabs1 (data) {
      let index = this.PaginationIndex
      this.Loading2 = true
      if (!data) { data = {PageIndex: this.currentPageList[index], PageSize: this.pageSizeList[index], resourceid: this.tabsRowId} }
      const res = await this.$axios.get(GetMonitoringSite, {params: data})
      this.Loading2 = false
      if (res.errorCode !== '200') return this.$message.error(res.msg)
      this.OperatorsMap.Monitor = res.data.list
      this.total2 = res.data.total
      // this.OperatorsMap.pagination.total = res.data.total
      this.totalList[index] = res.data.total
    },
    async tabs2 (data) {
      let index = this.PaginationIndex
      this.Loading2 = true
      if (!data) { data = {PageIndex: this.currentPageList[index], PageSize: this.pageSizeList[index], resourceid: this.tabsRowId} }
      const res = await this.$axios.get(GetOperatorSiteList, {params: data})
      this.Loading2 = false
      if (res.errorCode !== '200') return this.$message.error(res.msg)
      this.OperatorsMap.Operators = res.data.list
      this.total2 = res.data.total
      this.totalList[this.PaginationIndex] = res.data.total
    },
    // 选项卡中详情按钮
    async OperatorsMaphandleDetail (flag, row) {
      this.DetailDialogVisible = !this.DetailDialogVisible
      this.Loading3 = true
      if (flag === '监控') {
        this.detailsType = '监控'
        const res = await this.$axios.get(MonitoringSiteIdInfo, {params: {id: row.id}})
        if (res.errorCode !== '200') return this.$message.error(res.msg)
        this.OperatorsMap.Detail = res.data
        if (res.data.imglist) {
          this.setImgList(res.data.imglist)
        }
        this.Loading3 = false
      } else if (flag === '运营商') {
        this.detailsType = '运营商'
        const res = await this.$axios.get(GetOperatorSiteInfo, {params: {id: row.id}})
        if (res.errorCode !== '200') return this.$message.error(res.msg)
        this.OperatorsMap.Detail = res.data
        if (res.data.imglist) {
          this.setImgList(res.data.imglist)
        }
        this.Loading3 = false
        // this.DetailDialogVisible = !this.DetailDialogVisible
      } else { this.Loading3 = false }
    },
    setImgList (list) {
      this.CodeImgList = list.filter(i => i.field_name === 'code')
      this.LongImgList = list.filter(i => i.field_name === 'longitude')
    },
    DetailhandleClose () {
      this.WriteClose()
    },
    WriteClose () {
      this.OperatorsMap.Detail = {}
      this.ImgList1 = []
      this.ImgList2 = []
      this.DetailDialogVisible = !this.DetailDialogVisible
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
        case 1:
          this.$refs.ImgBox.SetData('运营商站点编码', 'monitoringcode', this.ImgList1)
          break
        case 2:
          this.$refs.ImgBox.SetData('经度', 'longitude', this.ImgList2)
          break
      }
      this.$refs.ImgBox.Open()
      this.pageType === '详情' ? this.$refs.ImgBox.Flag = true : this.$refs.ImgBox.Flag = false
    },
    _normalizeAreaLevel (list) {
      for (let i in list) {
        if (list[i].leveltype >= 3) list[i].leaf = true
      }
      return list
    },
    handleExport () {
      this.$confirm(`您确定要导出吗？`, '提示', {
        type: 'info'
      }).then(() => {

      })
    },
    OpenMap (val) { // 0: 查看 1: 编辑/新增
      this.showMap = true
      this.$nextTick(() => {
        this.$refs.GoogleMap.Open()
        this.$refs.GoogleMap.showType = val
        this.$refs.GoogleMap.longitude = this.tableData.longitude
        this.$refs.GoogleMap.latitude = this.tableData.latitude
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
    OperationSite (index, row) {
      this.showList = false
      this.showOperationSite = true
      this.$nextTick(() => {
        this.$refs.OperationSite.resource_id = row.id
        this.$refs.OperationSite.getData1()
      })
    },
    deviceConfig (index, row) {
      this.showList = false
      this.showDeviceConfig = true
      this.$nextTick(() => {
        this.$refs.NYResourceEquipment.resource_id = row.id
        this.$refs.NYResourceEquipment.getData1()
      })
    },
    fatherClose () {
      this.showOperationSite = false
      this.showDeviceConfig = false
      this.showList = true
      this._getTableData1()
    }
  },
  computed: {
    imageList () {
      return this.CodeImgList.concat(this.LongImgList)
    },
    PaginationIndex () {
      return this.ViewTabIndex <= 0 ? 0 : this.ViewTabIndex - 1
    }
  },
  watch: {
    'tableData.classify': function (val) {
      if (val === 2 || val === '') {
        this.Rules.longitude[0].required = false
        this.Rules.latitude[0].required = false
        this.required = false
      } else {
        this.required = true
        this.Rules.longitude[0].required = true
        this.Rules.latitude[0].required = true
      }
    },
    'tableData.longitude': function (val) {
      if (val === 0) {
        this.tableData.longitude = null
      }
    },
    'tableData.latitude': function (val) {
      if (val === 0) {
        this.tableData.latitude = null
      }
    },
    PaginationIndex (val) {
      console.log('watch PaginationIndex', val)
      this.currentPage2 = this.currentPageList[val]
      this.pageSize2 = this.pageSizeList[val]
      this.total2 = this.totalList[val]
    }
  },
  components: {
    layuiTitle,
    ImgBox,
    GoogleMap,
    OperationSite,
    NYResourceEquipment
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
