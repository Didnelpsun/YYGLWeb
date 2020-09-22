<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-form :model="Query" size="mini">
        <el-row>
          <!--选择器-->
          <el-col :span="18">
            <!--<el-col :span="8">
              <el-form-item label="区域：">
                <el-cascader v-model="Query.AreaList" :props="QareaProps" clearable @change="changeArea(Query)"></el-cascader>
              </el-form-item>
            </el-col>-->
            <el-col :span="8">
              <el-form-item label="逻辑站名称：">
                <el-input v-model.trim="Query.logicalstanding" placeholder="请填写逻辑站名称" @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="设备类型：">
                <el-input v-model.trim="Query.devicetype" placeholder="请填写设备类型" @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="经度是否为空：" label-width="120px">
                <el-select v-model="Query.islongitude">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="是" :value="true"></el-option>
                  <el-option label="否" :value="false"></el-option>
                </el-select>
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
      </el-form>

      <el-row>
        <el-col :span="4" class="SearchResult">查询结果</el-col>
        <el-col :offset="2" :span="18" class="fr">
          <div class="fr">
          </div>
        </el-col>
      </el-row>

      <el-table :data="tableList" v-loading="Loading" style="margin-top: 15px">
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(currentPage[0] - 1) * pageSize[0] + 1}}</template></el-table-column>
        <el-table-column prop="logicalstanding" label="逻辑站" width=""></el-table-column>
        <el-table-column prop="devicetype" label="设备类型"></el-table-column>
        <el-table-column prop="equipmentmodel" label="设备型号" width=""></el-table-column>
        <el-table-column prop="sitecode" label="站址编码" width=""></el-table-column>
        <el-table-column prop="deviation" label="偏差距离(M)" width="140"></el-table-column>
        <el-table-column prop="longitude" label="经度"></el-table-column>
        <el-table-column prop="latitude" label="纬度"></el-table-column>
        <el-table-column prop="" label="操作" width="140" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="EditCoordinate(scope.row)">同步坐标</el-button>
            <el-button type="text" size="mini" @click="DeleteCoordinate(scope.row)">清空坐标</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="center">
        <el-pagination @current-change="getMore" @size-change="changeSize1" :current-page="currentPage[0]"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pageSize[0]" :total="total[0]"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
    </div>
    <div class="write" v-show="showWrite" v-loading="boxLoading">
      <layuiTitle title="站址找设备"></layuiTitle>
      <el-form :model="MatchQuery" size="mini" style="margin-top: 20px;">
        <el-row>
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="逻辑站名：">
                <el-input v-model.trim="MatchQuery.logicalstanding" placeholder="请填写逻辑站名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="设备类型：">
                <el-input v-model.trim="MatchQuery.devicetype" placeholder="请填写设备类型"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="margin-left: 20px;">
              <el-button @click="getMatchList(2)" :disabled="Loading1" :icon="Loading1 ? 'el-icon-loading' : 'el-icon-search'">查询</el-button>
              <el-button @click="ResetMatchQuery" icon="el-icon-refresh">重置</el-button>
            </el-col>
          </el-col>
        </el-row>
      </el-form>
      <el-form :model="MatchQuery" :rules="Rules" ref="WriteForm" size="mini" style="margin-top: 20px;">
        <el-row>
          <el-row style="margin-bottom: 20px;">
            <el-col>更新经纬度</el-col>
          </el-row>
          <el-col :span="8">
            <el-form-item label="经度：" prop="longitude">
              <el-input v-model.trim="MatchQuery.longitude" placeholder="请填写经度"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="纬度：" prop="latitude">
              <el-input v-model.trim="MatchQuery.latitude" placeholder="请填写纬度"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="margin-left: 20px;">
            <el-button @click="handleUpdate" icon="el-icon-check">更新</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="matchList" v-loading="Loading" max-height="600">
        <el-table-column prop="logicalstanding" label="逻辑站" width=""></el-table-column>
        <el-table-column prop="devicetype" label="设备类型"></el-table-column>
        <el-table-column prop="equipmentmodel" label="设备型号" width=""></el-table-column>
        <el-table-column prop="sitecode" label="站址编码" width=""></el-table-column>
        <el-table-column prop="deviation" label="偏差距离(M)" width="140"></el-table-column>
        <el-table-column prop="longitude" label="经度"></el-table-column>
        <el-table-column prop="latitude" label="纬度"></el-table-column>
        <el-table-column prop="" label="操作" width="140" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="Delete(scope.$index)">剔除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="center" style="padding-bottom: 10px">
        <el-button @click="SubWrite" :disabled="boxLoading" :icon="boxLoading ? 'el-icon-loading' : 'el-icon-check'">提交</el-button>
        <el-button @click="WriteClose" type="primary" icon="el-icon-arrow-left">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {GlobalRes} from 'common/js/mixins'
import layuiTitle from 'base/layui-title'
import {EquipmenTcontrastList, Removecoordinates, Modifycoordinates} from 'api/YDSZ'
export default {
  name: 'DeviceCoordinate',
  mixins: [GlobalRes],
  data () {
    return {
      Query: {
        WhetherSite: false,
        logicalstanding: '',
        devicetype: '',
        islongitude: ''
      },
      showWrite: false,
      Loading1: false,
      boxLoading: false,
      tableList: [],
      matchList: [],
      MatchQuery: {
        logicalstanding: '',
        devicetype: '',
        longitude: '',
        latitude: ''
      },
      Rules: {
        longitude: [
          { required: false, pattern: /^-?(180(\.0{0,6})?|(1[0-7][0-9]|[1-9]?[0-9])(\.[0-9]{0,6}))$/, message: '请输入正确的经度,保留小数6位', trigger: 'blur' }
        ],
        latitude: [
          { required: false, pattern: /^-?(90(\.0{0,6})?|[1-8]?[0-9](\.[0-9]{0,6})?)$/, message: '请输入正确的纬度.保留小数6位', trigger: 'blur' }
        ]
      },
      total: [0, 0],
      pageSize: [10, 10],
      currentPage: [1, 1],
      PageIndex: [1, 1],
      Loading: false,
      MatchLogicstandname: ''
    }
  },
  activated () {
    this.getData1()
  },
  methods: {
    ResetMatchQuery () {
      Object.assign(this.$data.MatchQuery, this.$options.data().MatchQuery)
    },
    ResetQuery () {
      Object.assign(this.$data.Query, this.$options.data().Query)
      this.getData1()
    },
    getMore (e) {
      this.Loading = true
      this.currentPage[0] = e
      this.$axios.get(EquipmenTcontrastList, {params: Object.assign({}, this.Query, {
        PageIndex: e,
        PageSize: this.pageSize[0]
      })}).then(res => {
        this.Loading = false
        if (res.errorCode === '200') {
          this.tableList = res.data.list
          this.total[0] = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    /* getMore2 (e) {
      this.Loading1 = true
      this.currentPage[1] = e
      this.$axios.get(GetScopeEquipmentList, {params: Object.assign({}, this.MatchQuery, {
        PageIndex: e,
        PageSize: this.pageSize[1],
        ordersiteid: this.ordersiteid
      })}).then(res => {
        this.Loading1 = false
        if (res.errorCode === '200') {
          this.matchList = res.data
          this.total[1] = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      })
    }, */
    getMatchList (val) {
      this.Loading = true
      if (val === 2) {
        this.MatchLogicstandname = this.MatchQuery.logicalstanding
      }
      this.$axios.get(EquipmenTcontrastList, {params: Object.assign({}, {
        logicalstanding: val === 1 ? this.MatchQuery.logicalstanding : this.MatchLogicstandname,
        devicetype: this.MatchQuery.devicetype,
        WhetherSite: true
      })}).then(res => {
        this.Loading = false
        if (res.errorCode === '200') {
          this.matchList = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getData1 () {
      this.currentPage[0] = 1
      this.Loading = true
      this.$axios.get(EquipmenTcontrastList, {params: Object.assign({}, this.Query, {
        PageIndex: 1,
        PageSize: this.pageSize[0]
      })}).then(res => {
        this.Loading = false
        if (res.errorCode === '200') {
          this.tableList = res.data.list
          this.total[0] = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    changeSize1 (page) {
      this.pageSize[0] = page
      this.getMore(this.currentPage[0])
    },
    /* changeSize2 (page) {
      this.pageSize[1] = page
      this.getMore2(this.currentPage[1])
    }, */
    SubWrite () {
      this.boxLoading = true
      this.$axios.put(Modifycoordinates, this.matchList).then(res => {
        this.boxLoading = false
        if (res.errorCode === '200') {
          this.$message.success('更新成功!')
          this.WriteClose()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    Delete (index) {
      this.matchList.splice(index, 1)
    },
    handleUpdate () {
      this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali) {
          return this.$message.error('填写信息有误！')
        } else {
          if (this.MatchQuery.longitude || this.MatchQuery.latitude) {
            this.matchList.forEach(item => {
              if (this.MatchQuery.longitude) {
                item.longitude = this.MatchQuery.longitude
              }
              if (this.MatchQuery.latitude) {
                item.latitude = this.MatchQuery.latitude
              }
            })
          } else {
            return this.$message.error('请填写经度或纬度！')
          }
        }
      })
    },
    WriteClose () {
      this.matchList = []
      this.MatchLogicstandname = []
      Object.assign(this.$data.MatchQuery, this.$options.data().MatchQuery)
      this.showWrite = false
      this.getData1()
    },
    EditCoordinate (row) {
      this.showWrite = true
      if (row.longitude) {
        this.MatchQuery.longitude = row.longitude
      }
      if (row.latitude) {
        this.MatchQuery.latitude = row.latitude
      }
      this.MatchQuery.logicalstanding = row.logicalstanding
      this.MatchLogicstandname = row.logicalstanding
      this.getMatchList(1)
    },
    DeleteCoordinate (row) {
      this.$confirm(`您确定要清空坐标？`, '提示', {
        type: 'warning'
      }).then(() => {
        this.boxLoading = true
        const url = Removecoordinates + '?id=' + row.id
        this.$axios.put(url).then(res => {
          this.boxLoading = false
          if (res.errorCode === '200') {
            this.getData1()
            this.$message.success('清空成功!')
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    formatDistance (row) {
      return row.M.toFixed(2)
    }
  },
  components: {
    layuiTitle
  }
}
</script>

<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
