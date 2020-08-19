<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-form :model="Query">
        <el-row :gutter="20">
          <!--选择器-->
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="区域：">
                <el-cascader v-model="Query.AreaList" :props="QareaProps" clearable @change="changeArea(Query)"></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="设备类型：">
                <el-select class="searchSelect" v-model="Query.types">
                  <el-option label="请选择" value=""></el-option>
                  <el-option v-for="i in DicList.type" :key="i.value" :label="i.text" :value="i.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="确认站址：">
                <el-input v-model="Query.sitename" placeholder="请输入确认站址"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="设备标识码：">
                <el-input v-model="Query.sharingnumber" placeholder="请填写设备标识码"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="6">
            <div class="fr" style="margin-top: 0">
              <el-button @click="getMore(1)" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-search'">查询</el-button>
              <el-button @click="ResetQuery" icon="el-icon-refresh">重置</el-button>
            </div>
          </el-col>
        </el-row>
        <!--<div class="center" style="margin-bottom: 20px;">
          <el-button @click="getMore(1)" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-search'">查询</el-button>
          <el-button @click="ResetQuery" icon="el-icon-refresh">重置</el-button>
          <el-button @click="SiteExport" type="success" icon="el-icon-download">导出</el-button>
        </div>-->
      </el-form>

      <el-row>
        <el-col :span="4" class="SearchResult">查询结果</el-col>
        <el-col :offset="2" :span="18" class="fr">
          <div class="fr">
            <el-button @click="SiteExport" type="success" icon="el-icon-download">导出</el-button>
            <el-button @click="handleAdd" type="success" icon="el-icon-plus">添加</el-button>
          </div>
        </el-col>
      </el-row>

      <el-table :data="tableList" v-loading="Loading" style="margin-top: 15px">
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template></el-table-column>
        <!-- <el-table-column prop="provincename" label="省份" width="70"></el-table-column> -->
        <el-table-column prop="cityname" label="地市" width="80"></el-table-column>
        <el-table-column prop="areaname" label="区域" width="80"></el-table-column>
        <el-table-column prop="typesname" label="设备类型" width=""></el-table-column>
        <el-table-column prop="sharingnumber" label="设备标识码" width="" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="manufacturer" label="设备厂家" width=""></el-table-column>
        <el-table-column prop="models" label="设备型号" width=""></el-table-column>
        <el-table-column prop="capacity" label="功率(KW)" width=""></el-table-column>
        <el-table-column prop="currenttypename" label="电流类型" width=""></el-table-column>
        <el-table-column prop="current" label="电流(A)" width=""></el-table-column>
        <el-table-column prop="sitename" label="所在站址" width="140"></el-table-column>
        <el-table-column prop="" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleWrite(2, scope.row)">详情</el-button>
            <el-button type="text" size="mini" @click="handleWrite(1, scope.row)">编辑</el-button>
            <!--<el-button type="text" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <div class="center">
        <el-pagination @current-change="getMore" @size-change="changeSize1" :current-page="currentPage"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="total"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
    </div>
    <div class="write" v-show="showWrite">
      <layuiTitle :title="WriteState === 0 ? '添加设备' : WriteState === 1 ? '编辑设备' : '设备详情'"></layuiTitle>
      <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--small" v-loading="WriteLoading">
        <!--表头-->
        <div class="el-table__header-wrapper">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
            <colgroup>
              <col width="120"/>
              <col width="100"/>
              <col width="50"/>
              <!-- <col width="400"/> -->
              <col width="100"/>
            </colgroup>
            <thead>
            <tr>
              <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
              <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
              <th colspan="1" rowspan="1" class="el-table_8_column_62     table-headerStyle"><div class="cell">照片</div></th>
              <!-- <th colspan="1" rowspan="1" class="el-table_8_column_63     table-headerStyle"><div class="cell">字典</div></th> -->
              <th colspan="1" rowspan="1" class="el-table_8_column_64     table-headerStyle"><div class="cell">填写要求</div></th>
            </tr>
            </thead>
          </table>
        </div>
        <!--表体-->
        <!--表体-->
        <el-form :model="WriteData" :rules="Rules" ref="WriteForm" label-width="0" :show-message="false">
          <div class="el-table__body-wrapper is-scrolling-none">
            <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
              <colgroup>
                <col width="120"/>
                <col width="100"/>
                <col width="50"/>
                <!-- <col width="400"/> -->
                <col width="100"/>
              </colgroup>
              <tbody>
              <!--<tr class="el-table__row" v-if="WriteState === 0">
                <td><div class="cell">区域</div></td>
                <td><div class="cell">
                  <el-form-item class="form-item" prop="AreaList">
                    <el-cascader v-model="WriteData.AreaList" :props="areaProps" @change="changeArea"
                                 ref="csArea"></el-cascader>
                  </el-form-item>
                </div></td>
                <td><div class="cell"></div></td>
                &lt;!&ndash; <td><div class="cell"></div></td> &ndash;&gt;
                <td><div class="cell"></div></td>
              </tr>-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>站址名称</div></td>
                <td v-show="WriteState !== 2"><div class="cell" @click="isShow = true">
                  <el-form-item class="form-item" prop="sitename">
                    <el-input v-model="WriteData.sitename" readonly placeholder="请选择"></el-input>
                  </el-form-item>
                </div></td>
                <td v-show="WriteState == 2"><div class="cell">{{WriteData.sitename}}</div></td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row" v-if="WriteState === 2">
                <td><div class="cell">地市</div></td>
                <td><div class="cell">{{WriteData.cityname}}</div></td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row" v-if="WriteState === 2">
                <td><div class="cell">区域</div></td>
                <td><div class="cell">{{WriteData.areaname}}</div></td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">设备类型</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-select v-model="WriteData.types" size="small">
                    <el-option label="请选择" :value="0"></el-option>
                    <el-option v-for="i in DicList.type" :key="i.value" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </div></td>
                <td v-if="WriteState == 2"><div class="cell">{{WriteData.typesname}}</div></td>

                <td><div class="cell"></div></td>
                <!-- <td><div class="cell">{{writeDic(DicList.type)}}</div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">设备标识码</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="sharingnumber">
                    <el-input v-model="WriteData.sharingnumber"></el-input>
                  </el-form-item>
                </div></td>
                <td v-show="WriteState == 2"><div class="cell">{{WriteData.sharingnumber}}</div></td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">设备厂家</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="manufacturer">
                    <el-input v-model="WriteData.manufacturer"></el-input>
                  </el-form-item>
                </div></td>
                <td v-show="WriteState == 2"><div class="cell">{{WriteData.manufacturer}}</div></td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">设备型号</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="models">
                    <el-input v-model="WriteData.models"></el-input>
                  </el-form-item>
                </div></td>
                <td v-show="WriteState == 2"><div class="cell">{{WriteData.models}}</div></td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">容量/功率(KW)</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="capacity">
                    <el-input v-model="WriteData.capacity"></el-input>
                  </el-form-item>
                </div></td>
                <td v-show="WriteState == 2"><div class="cell">{{WriteData.capacity}}</div></td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">铭牌照片</div></td>
                <td><div class="cell"></div></td>
                <td @click="OpenImgBox(1)"><div class="cell" style="cursor: pointer;color: #409EFF;">有&nbsp;{{ImgList1.length}}&nbsp;张图片</div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">电流类型</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-select v-model="WriteData.currenttype" size="small">
                    <el-option label="请选择" :value="0"></el-option>
                    <el-option v-for="i in DicList.currenttype" :key="i.value" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </div></td>
                <td v-if="WriteState == 2"><div class="cell">{{WriteData.currenttypename}}</div></td>

                <td><div class="cell"></div></td>
                <!-- <td><div class="cell">{{writeDic(DicList.currenttype)}}</div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">电流(A)</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="current">
                    <el-input v-model="WriteData.current"></el-input>
                  </el-form-item>
                </div></td>
                <td v-show="WriteState == 2"><div class="cell">{{WriteData.current}}</div></td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">测量照片</div></td>
                <td><div class="cell"></div></td>
                <td @click="OpenImgBox(2)"><div class="cell" style="cursor: pointer;color: #409EFF;">有&nbsp;{{ImgList2.length}}&nbsp;张图片</div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row" v-if="WriteState !== 0">
                <td><div class="cell">确认时间</div></td>
                <td><div class="cell">
                  <el-form-item class="form-item">{{WriteData.confirmtime == ('0001-01-01 ') ? '' : WriteData.confirmtime}}</el-form-item>
                </div></td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row" v-if="WriteState !== 0">
                <td><div class="cell">确认人</div></td>
                <td><div class="cell">
                  <el-form-item class="form-item">{{WriteData.confirmusername}}</el-form-item>
                </div></td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              </tbody>
            </table>
          </div>
        </el-form>
      </div>
      <div class="center" style="padding-bottom: 10px">
        <el-button v-show="WriteState !==2" @click="SubWrite" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-check'">提交</el-button>
        <el-button @click="WriteClose" type="primary" icon="el-icon-arrow-left">返回</el-button>
      </div>
    </div>
    <el-dialog top="1%" :visible.sync="isShow" width="80%" :before-close="DetailhandleClose">
      <SiteList @selectSite="selectSite"/>
    </el-dialog>
    <ImgBox ref="ImgBox"></ImgBox>
  </div>
</template>

<script>
import {GlobalRes} from 'common/js/mixins'
import ImgBox from 'base/ImgBox'
import layuiTitle from 'base/layui-title'
import {DictionaryInfoList} from 'api/api'
import SiteList from 'base/YDSZ/SiteList'
import {GetEquipmentList, GetEquipmentInfo, exportMethod, DownEquipmentExcel, CreateEquipment, UpdateEquipment} from 'api/YDSZ'
export default {
  name: 'EquipmentManagement',
  mixins: [GlobalRes],
  data () {
    return {
      Query: {
        AreaList: [],
        types: null,
        sitename: '',
        sharingnumber: '',
        provinceid: null, // 省份
        cityid: null, // 城市
        areaid: null // 区域
      },
      WriteData: {
        sitename: '',
        types: 0,
        sharingnumber: '',
        manufacturer: '',
        models: '',
        capacity: 0,
        currenttype: 0,
        current: 0,
        id: '',
        siteid: '',
        createuserid: '',
        confirmtime: '',
        currenttypename: '',
        typesname: '',
        imglist: []
      },
      Rules: {
        sitename: [
          { required: true, message: '请选择确认站址', trigger: 'change' }
        ]
      },
      DicList: {},
      showWrite: false,
      WriteLoading: false,
      WriteState: null,
      tableList: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      PageIndex: 1,
      ImgList1: [],
      ImgList2: [],
      Loading: false,
      isShow: false
    }
  },
  activated () {
    this.getData1()
    this.initDictionariesArray()
  },
  methods: {
    ResetQuery () {
      Object.assign(this.$data.Query, this.$options.data().Query)
      this.getData1()
    },
    initDictionariesArray () {
      let arr = ['移动上站设备类型', '移动上站设备电流类型']
      this.$axios.post(DictionaryInfoList, arr).then(res => {
        if (res.errorCode === '200') {
          this.DicList.type = res.data.filter(i => {
            return i.type === '移动上站设备类型'
          })
          this.DicList.currenttype = res.data.filter(i => {
            return i.type === '移动上站设备电流类型'
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getMore (e) {
      this.Loading = true
      this.currentPage = e
      this.$axios.get(GetEquipmentList, {params: Object.assign({}, this.Query, {
        PageIndex: e,
        PageSize: this.pageSize
      })}).then(res => {
        this.Loading = false
        if (res.errorCode === '200') {
          this.tableList = res.data.list
          this.total = res.data.total
          if (!this.tableList.length && this.Query.sharingnumber) {
            this.$confirm('未查询到该设备标识码对应的BBU,是否新增', '提示', {
              type: 'warning'
            }).then(() => {
              this.handleAdd()
              this.WriteData.sharingnumber = this.Query.sharingnumber
            })
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getData1 () {
      this.currentPage = 1
      this.Loading = true
      this.$axios.get(GetEquipmentList, {
        params: {
          PageIndex: 1,
          PageSize: this.pageSize
        }
      }).then(res => {
        this.Loading = false
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
    handleWrite (state, row) {
      this.WriteState = state
      this.showWrite = true
      this.WriteLoading = true
      this.$axios.get(GetEquipmentInfo, {
        params: {
          id: row.id
        }
      }).then(res => {
        this.WriteLoading = false
        this.WriteData = res.data
        if (res.data.imglist) {
          this.setImgList(res.data.imglist)
        }
      })
    },
    handleAdd () {
      this.showWrite = true
      this.WriteState = 0
    },
    SubWrite () {
      if (this.WriteState === 0) this.SubAdd()
      if (this.WriteState === 1) this.SubEdit()
    },
    SubAdd () {
      this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali) {
          return this.$message.error('请选择站址！')
        } else {
          this.Loading = true
          this.$axios.post(CreateEquipment, this.WriteData).then(res => {
            this.Loading = false
            if (res.errorCode === '200') {
              this.$message.success('添加成功!')
              this.WriteClose()
            } else {
              this.$message.error(res.msg)
            }
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    SubEdit () {
      this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali) {
          return this.$message.error('请输入站址名称！')
        } else {
          this.Loading = true
          this.WriteData.imglist = this.WriteData.imglist ? this.WriteData.imglist : []
          this.$axios.put(UpdateEquipment, this.WriteData).then(res => {
            this.Loading = false
            if (res.errorCode === '200') {
              this.$message.success('编辑成功!')
              this.WriteClose()
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    DetailhandleClose () {
      this.isShow = !this.isShow
    },
    selectSite (name, id) {
      this.WriteData.sitename = name
      this.WriteData.siteid = id
      this.isShow = false
    },
    OpenImgBox (val) {
      switch (val) {
        case 1:
          this.$refs.ImgBox.SetData('铭牌照片', 'nameplate_img', this.ImgList1)
          break
        case 2:
          this.$refs.ImgBox.SetData('测量照片', 'measure_img', this.ImgList2)
          break
      }
      this.$refs.ImgBox.Open()
      this.WriteState === 2 ? this.$refs.ImgBox.Flag = true : this.$refs.ImgBox.Flag = false
    },
    setImgList (list) {
      list.forEach((item) => {
        if (item.field_name === 'nameplate_img') this.ImgList1.push(item)
        if (item.field_name === 'measure_img') this.ImgList2.push(item)
      })
    },
    WriteClose () {
      Object.assign(this.$data.WriteData, this.$options.data().WriteData)
      Object.assign(this.$data.Query, this.$options.data().Query)
      this.$refs.WriteForm.clearValidate()
      // this.setArea([])
      this.ImgList1 = []
      this.ImgList2 = []
      this.showWrite = false
      this.getData1()
    },
    SiteExport () {
      this.$confirm(`您确定要导出吗？`, '提示', {
        type: 'info'
      }).then(() => {
        let myObj = {
          method: 'get',
          url: DownEquipmentExcel,
          fileName: '设备管理',
          data: this.Query
        }
        exportMethod(myObj)
      })
    }
  },
  computed: {
    ImgList () {
      return this.ImgList1.concat(this.ImgList2)
    }
  },
  watch: {
    ImgList (val) {
      this.WriteData.imglist = val
    }
  },
  components: {
    layuiTitle,
    ImgBox,
    SiteList
  }
}
</script>

<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
