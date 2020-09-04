<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-row>
        <el-col :span="4" class="SearchResult">查询结果</el-col>
        <el-col :offset="2" :span="18" class="fr">
          <div class="fr">
            <el-button @click="handleWrite(0)" type="success" icon="el-icon-plus">添加</el-button>
          </div>
        </el-col>
      </el-row>

      <el-table :data="tableData" v-loading="Loading" ref="table1" style="margin-top: 15px;">
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template>
        </el-table-column>
        <el-table-column prop="resourcename" label="站点名称"></el-table-column>
        <el-table-column prop="resourcecode" label="站点编码"></el-table-column>
        <el-table-column prop="equipmenttypename" label="设备类型"></el-table-column>
        <el-table-column prop="createusername" label="创建人" width=""></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width=""></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleWrite(1,scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="center">
        <el-pagination @current-change="getMore" @size-change="changeSize1" :current-page="currentPage"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="total"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
      <div class="center">
        <el-button @click="handleClose" icon="el-icon-arrow-left">返回</el-button>
      </div>
    </div>
    <div class="write" v-show="showWrite">
      <layuiTitle :title="WriteState === 0 ? '添加站点设备配置' : WriteState === 1 ? '编辑站点设备配置' : '站点设备配置详情'"></layuiTitle>

      <!--<Details :WriteState="WriteState" :DicList="DicList" @fatherOpenImgBox="OpenImgBox"
               @fatheretMore="getMore(currentPage)" @fatherClose="WriteClose" ref="Details"></Details>-->
      <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--small">
        <!--表头-->
        <div class="el-table__header-wrapper">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
            <colgroup>
              <col width="80"/>
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

        <el-form :model="WriteData" :rules="Rules" v-loading="Loading" ref="WriteForm">
          <div class="el-table__body-wrapper is-scrolling-none">
            <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
              <colgroup>
                <col name="el-table_8_column_60" width="80"/>
                <col name="el-table_8_column_61" width="230"/>
                <col name="el-table_8_column_62" width="50"/>
                <col name="el-table_8_column_64" width="100"/>
              </colgroup>
              <tbody>
              <!--设备类型-->
              <tr class="el-table__row el-table__row--striped">
                <td class="el-table_8_column_60">
                  <div class="cell"><i class="must">*</i>设备类型</div>
                </td>
                <td class="el-table_8_column_61">
                  <div class="cell">
                    <div v-show="WriteState == 2">{{WriteData.equipmenttypename}}</div>
                    <div v-show="WriteState !== 2" prop="equipmenttype_id">
                      <el-select v-model="WriteData.equipmenttype_id" filterable remote reserve-keyword :filter-method="querySearch" :loading="Loading" size="small">
                        <el-option v-for="item in queryList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--必须-->
              <tr class="el-table__row el-table__row--striped">
                <td class="el-table_8_column_60">
                  <div class="cell">是否必须</div>
                </td>
                <td class="el-table_8_column_61">
                  <div class="cell">
                    <div v-show="WriteState == 2">{{WriteData.necessary ? '是' : '否'}}</div>
                    <el-form-item label-width="0" prop="necessary" class="form-item" v-show="WriteState !== 2">
                      <el-select v-model="WriteData.necessary">
                        <el-option label="是" :value="true"></el-option>
                        <el-option label="否" :value="false"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--是否单记录-->
              <tr class="el-table__row el-table__row--striped">
                <td class="el-table_8_column_60">
                  <div class="cell">是否单记录</div>
                </td>
                <td class="el-table_8_column_61">
                  <div class="cell">
                    <div v-show="WriteState == 2">{{WriteData.manyrecords ? '是' : '否'}}</div>
                    <el-form-item label-width="0" prop="manyrecords" class="form-item" v-show="WriteState !== 2">
                      <el-select v-model="WriteData.manyrecords">
                        <el-option label="是" :value="true"></el-option>
                        <el-option label="否" :value="false"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--创建人-->
              <tr class="el-table__row el-table__row--striped" v-show="WriteState == 2">
                <td class="el-table_8_column_60">
                  <div class="cell">创建人</div>
                </td>
                <td class="el-table_8_column_61">
                  <div class="cell">
                    <div>{{WriteData.createusername}}</div>
                  </div>
                </td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--创建时间-->
              <tr class="el-table__row el-table__row--striped" v-show="WriteState == 2">
                <td class="el-table_8_column_60">
                  <div class="cell">创建时间</div>
                </td>
                <td class="el-table_8_column_61">
                  <div class="cell">
                    <div>{{WriteData.createtime}}</div>
                  </div>
                </td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              </tbody>
            </table>
          </div>
        </el-form>
      </div>
      <div class="center">
        <el-button v-show="WriteState !==2" @click="SubWrite" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-check'">提交</el-button>
        <el-button @click="WriteClose" icon="el-icon-arrow-left">返回</el-button>
      </div>
    </div>
    <ImgBox ref="ImgBox"></ImgBox>
    <GoogleMap v-if="showMap" ref="GoogleMap" @fatherGetData="getMapData"></GoogleMap>
  </div>
</template>

<script>
import {AddEnergyResourceEquipment, GetEnergyResourceEquipmentList, GetResourceEquipmentInfo, DelResourceEquipment, UpdateEnergyResourceEquipment, GetEquipmentTypeList} from 'api/api'
import GoogleMap from 'base/GoogleMap'
import {GlobalRes} from 'common/js/mixins'
import ImgBox from 'base/ImgBox'
import layuiTitle from 'base/layui-title'

export default {
  name: 'NYResourceEquipment',
  mixins: [GlobalRes],
  data () {
    return {
      showMap: false,
      resource_id: '',
      ImgList1: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      Loading: false,
      tableData: [],
      queryList: [],
      tableLoading: false,
      WriteData: {
        equipmenttype_id: '0',
        necessary: true,
        manyrecords: false
      },
      Rules: {
        equipmenttype_id: [
          { required: true, message: '请输入设备类型', trigger: 'change' }
        ]
      },
      showWrite: false,
      WriteState: 0, // 0为添加 1为编辑 2为查看
      WriteLoading: false
    }
  },
  methods: {
    ResetQuery () {
      Object.assign(this.$data.Query, this.$options.data().Query)
      this.getData1()
    },
    getData1 () {
      this.Loading = true
      this.$axios.get(GetEnergyResourceEquipmentList, {
        params: {
          PageIndex: 1,
          PageSize: this.pageSize,
          resource_id: this.resource_id
        }
      }).then(res => {
        this.Loading = false
        if (res.errorCode !== '200') return this.$message.error(res.msg)
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    getMore (page) {
      this.currentPage = page
      this.Loading = true
      this.$axios.get(GetEnergyResourceEquipmentList, {params: Object.assign({}, this.Query, {
        PageIndex: this.currentPage,
        PageSize: this.pageSize,
        resource_id: this.resource_id
      })}).then(res => {
        this.Loading = false
        if (res.errorCode !== '200') return this.$message.error(res.msg)
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    changeSize1 (page) {
      this.pageSize = page
      this.getMore(this.currentPage)
    },
    setImgList (list) {
      list.forEach((item) => {
        if (item.field_name === 'monitoringcode') this.ImgList1.push(item)
      })
    },
    handleWrite (state, row) {
      this.WriteState = state
      this.showWrite = true
      if (state) {
        this.Loading = true
        this.$axios.get(GetResourceEquipmentInfo, {
          params: {
            Id: row.id
          }
        }).then(res => {
          this.Loading = false
          this.WriteData = res.data
          let obj = {
            name: res.data.equipmenttypename,
            id: res.data.equipmenttype_id
          }
          this.queryList.push(obj)
          if (res.data.imglist) {
            this.setImgList(res.data.imglist)
          }
        }).catch(err => {
          this.Loading = false
          console.log(err)
        })
      }
    },
    handleDelete (row) {
      this.$confirm('您确认要删除当前设备配置吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios.delete(DelResourceEquipment, {
          params: {
            id: row.id
          }
        }).then((res) => {
          if (res.errorCode !== '200') {
            this.$message.error(res.msg)
          } else {
            this.$message.success('删除成功！')
            this.getData1()
          }
        })
      })
    },
    SubWrite () {
      if (this.WriteState === 0) this.SubAdd()
      if (this.WriteState === 1) this.SubEdit()
    },
    SubAdd () {
      this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali) {
          return this.$message.error('请补全信息！')
        } else {
          this.Loading = true
          this.WriteData.resource_id = this.resource_id
          this.$axios.post(AddEnergyResourceEquipment, this.WriteData).then(res => {
            this.Loading = false
            if (res.errorCode === '200') {
              this.$message.success('添加成功!')
              this.WriteClose()
            } else {
              this.$message.error(res.msg)
            }
          }).catch(err => {
            this.Loading = false
            console.log(err)
          })
        }
      })
    },
    SubEdit () {
      this.$refs.WriteForm.validate(vali => {
        if (!vali) {
          this.$message.error('请补全信息！')
        } else {
          this.WriteLoading = true
          this.WriteData.resource_id = this.resource_id
          this.$axios.put(UpdateEnergyResourceEquipment, this.WriteData).then(res => {
            this.WriteLoading = false
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
    WriteClose () {
      this.showWrite = false
      this.ImgList1 = []
      Object.assign(this.$data.WriteData, this.$options.data().WriteData)
      this.getData1()
    },
    OpenImgBox () {
      this.$refs.ImgBox.SetData('运维ID', 'monitoringcode', this.ImgList1)
      this.$refs.ImgBox.Open()
      this.WriteState === 2 ? this.$refs.ImgBox.Flag = true : this.$refs.ImgBox.Flag = false
    },
    handleClose () {
      this.tableData = []
      this.$emit('fatherClose')
    },
    OpenMap (val) { // 0: 查看 1: 编辑/新增
      this.showMap = true
      this.$nextTick(() => {
        this.$refs.GoogleMap.Open()
        this.$refs.GoogleMap.showType = val
        this.$refs.GoogleMap.longitude = this.WriteData.longitude
        this.$refs.GoogleMap.latitude = this.WriteData.latitude
      })
    },
    getMapData (longitude, latitude) {
      this.showMap = false
      if (longitude) {
        this.WriteData.longitude = longitude
      }
      if (latitude) {
        this.WriteData.latitude = latitude
      }
    },
    querySearch (query) {
      this.Loading = true
      this.$axios.get(GetEquipmentTypeList, {
        params: {
          name: query,
          classify: 1,
          PageIndex: 1,
          PageSize: 200
        }
      }).then(res => {
        this.queryList = res.data.list
      }).catch(error => {
        console.log(error)
      })
      this.Loading = false
    }
  },
  computed: {
    ImgList () {
      return this.ImgList1
    }
  },
  watch: {
    ImgList (val) {
      this.WriteData.imglist = val
    }
  },
  components: { layuiTitle, GoogleMap, ImgBox }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
