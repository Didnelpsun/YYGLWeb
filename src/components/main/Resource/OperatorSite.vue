<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-form :model="Query">
        <el-row>
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label-width="130px" label="系统名称：">
                <el-input v-model="Query.systemname" placeholder="请输入系统名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label-width="130px" label="所属站点名称：">
                <el-input v-model="Query.resourcename" placeholder="请输入所属站点名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属区域：">
                <el-cascader v-model="Query.AreaList" :props="QareaProps" @change="changeArea(Query)" clearable></el-cascader>
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
            <el-button type="success" @click="SiteExport" icon="el-icon-download" >导出</el-button>
            <el-button @click="handleWrite(0)" type="success" icon="el-icon-plus">添加</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table :data="tableData" v-loading="Loading" ref="table1" style="margin-top: 15px;">
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template></el-table-column>
        <el-table-column prop="cityname" label="城市" width=""></el-table-column>
        <el-table-column prop="areaname" label="区域" width=""></el-table-column>
        <el-table-column prop="systemcode" label="系统编码" width=""></el-table-column>
        <el-table-column prop="systemname" label="系统名称" width=""></el-table-column>
        <el-table-column prop="resourcename" label="所属站点" width=""></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width=""></el-table-column>
        <el-table-column abel="操作" width="140">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleWrite(2,scope.row)">详情</el-button>
            <el-button type="text" size="mini" @click="handleWrite(1,scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="center">
        <el-pagination @size-change="changeSize1" @current-change="getMore" :current-page.sync="currentPage"
                       :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" background>
        </el-pagination>
      </div>
    </div>
    <div class="write" v-show="showWrite" v-loading="WriteLoading" >
      <layuiTitle :title="WriteState === 0 ? '添加运营商站点' : WriteState === 1 ? '编辑运营商站点' : '运营商站点详情'"></layuiTitle>
      <OperatorSite :WriteData="WriteData" :WriteState="WriteState" :ImgList1="ImgList1" :DicList="DicList" @fatherClose="WriteClose"
                    @fatheretMore="getMore(1)" @fatherOpenImgBox="OpenImgBox"
      ></OperatorSite>
    </div>

    <ImgBox ref="ImgBox"></ImgBox>
  </div>
</template>

<script>
import ImgBox from 'base/ImgBox'
import OperatorSite from 'base/Resource/OperatorSite'
import {GlobalRes} from 'common/js/mixins'
import layuiTitle from 'base/layui-title'
import {GetOperatorSiteList, GetOperatorSiteInfo, DelOperatorSite, DictionaryInfoList} from 'api/api'
export default {
  mixins: [GlobalRes],
  data () {
    return {
      Query: {
        AreaList: [],
        systemname: '',
        resourcename: ''
      },
      total: 0,
      pageSize: 10,
      currentPage: 1,
      tableData: [],
      AreaList: [],
      resList: [],
      // 新增 & 详请 & 编辑显示的table数据
      WriteData: {
        AreaList: [],
        imglist: [],
        provinceid: 0,
        cityid: 0,
        areaid: 0,
        systemcode: '', // 系统编码
        systemname: '', // 系统名称
        openingdate: '', // 开通日期
        propertyrightunit: '', // 产权单位
        lifecycle: '', // 生命周期
        resource_id: '',
        createdby: '', // 创建人*
        createtime: '' // 创建时间*
      },
      showWrite: false,
      Loading: false,
      ImgList1: [],
      ImgList2: [],
      WriteState: 0, // 0为添加 1为编辑 2为查看
      WriteLoading: false,
      isValid: false,
      // 字典集合
      DicList: {
      }
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
    ResetWrite () {
      Object.assign(this.$data.WriteData, this.$options.data().WriteData)
      this.$refs.WriteForm.clearValidate()
      // this.setArea([])
      this.ImgList1 = []
      this.ImgList2 = []
    },
    initDictionariesArray () {
      let arr = ['设备产权单位']
      this.$axios.post(DictionaryInfoList, arr).then(res => {
        if (res.errorCode === '200') {
          this.DicList.propertyrightunit = res.data.filter(i => {
            return i.type === '设备产权单位'
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 分页处理函数
    changeSize1 (page) {
      this.pageSize = page
      this.getMore(this.currentPage)
    },
    getData1 () {
      this.currentPage = 1
      this.Loading = true
      this.$axios.get(GetOperatorSiteList, {
        params: {
          PageIndex: 1,
          PageSize: this.pageSize
        }
      }).then(res => {
        this.Loading = false
        if (res.errorCode === '200') {
          this.tableData = res.data.list
          this.total = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getMore (e) {
      this.Loading = true
      this.currentPage = e
      this.$axios.get(GetOperatorSiteList, {params: Object.assign({}, this.Query, {
        PageIndex: e,
        PageSize: this.pageSize
      })}).then(res => {
        this.Loading = false
        if (res.errorCode === '200') {
          this.tableData = res.data.list
          this.total = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    setArea (list) {
      this.nodes = list
      this.$refs.csArea.panel.activePath = []
      this.$refs.csArea.panel.loadCount = 0
      this.$refs.csArea.panel.lazyLoad()
    },
    OpenImgBox (val) {
      // console.log(val)
      switch (val) {
        case 1:
          this.$refs.ImgBox.SetData('系统编码', 'monitoringcode', this.ImgList1)
          break
        case 2:
          this.$refs.ImgBox.SetData('经度', 'longitude', this.ImgList2)
          break
      }
      this.$refs.ImgBox.Open()
      this.WriteState === 2 ? this.$refs.ImgBox.Flag = true : this.$refs.ImgBox.Flag = false
    },
    WriteClose () {
      this.showWrite = false
      this.ImgList1 = []
      this.ImgList2 = []
    },
    handleWrite (state, row) {
      this.WriteState = state
      if (this.$data.WriteData !== null || this.$data.WriteData !== undefined) {
        // this.$data.WriteData = {}
        Object.assign(this.$data.WriteData, this.$options.data().WriteData)
      }
      this.showWrite = true
      // console.log(this.DicList)
      if (state) {
        this.WriteLoading = true
        this.$axios.get(GetOperatorSiteInfo, {
          params: {
            id: row.id
          }
        }).then(res => {
          this.WriteLoading = false
          this.WriteData = res.data
          // console.log(this.DicList)
          if (res.data.imglist) {
            this.setImgList(res.data.imglist)
          }
        })
      }
    },
    setImgList (list) {
      list.forEach((item) => {
        if (item.field_name === 'monitoringcode') this.ImgList1.push(item)
        if (item.field_name === 'longitude') this.ImgList2.push(item)
      })
    },
    // 删除按钮
    handleDelete (row) {
      this.$confirm(`您确定要删除 ${row.systemname} 资源吗？`, '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios.delete(DelOperatorSite, {
          params: {
            id: row.id
          }
        }).then(res => {
          if (res.errorCode === '200') {
            this.$message.success('删除成功！')
            this.getData1()
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    // 导出数据
    SiteExport () {
      this.$confirm(`您确定要导出吗？`, '提示', {
        type: 'info'
      }).then(() => {
        this.$axios.get('http://192.168.0.131:5000/KCGL/Project/GetKCProjectExcel?id=1111').then(res => {
          console.log(res)
          let f = new FileReader(res)
          console.log(f)
        }).catch(e => { console.log(e) })
        // let myObj = {
        //   method: 'get',
        //   url: null,
        //   fileName: '设备管理',
        //   data: this.Query
        // }
        // // exportMethod(myObj)
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
    ImgBox,
    layuiTitle,
    OperatorSite
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
