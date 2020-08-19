<template>
  <div class="content" style="height: 2000px">
    <div class="main">
      <layuiTitle title="标题"></layuiTitle>
      <el-form :model="AddForm" :rules="rules">
        <el-row >
          <el-col :sm="12" :md="8">
            <el-form-item label="用户账号：">
              <el-input ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8">
            <el-form-item label="用户名称：">
              <el-input ></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8">
            <el-form-item label="下拉框：">
              <el-select v-model="AddForm.state" placeholder="请选择站点状态">
                <el-option label="i.text" value="i.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="11" :md="7" :offset="1"></el-col>
        </el-row>
      </el-form>
      <el-table :data="tableData1" v-loading="table1Loading" ref="table1">
        <el-table-column prop="id" label="序号" width="50"></el-table-column>
        <el-table-column prop="userName" label="用户账号" width=""></el-table-column>
        <el-table-column prop="realityName" label="用户名称" width="110"></el-table-column>
        <el-table-column label="操作" width="90">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handle1(scope.$index, scope.row)">查看</el-button>
            <el-button type="text" size="mini" @click="handle2(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="center">
        <el-pagination ref="sjw" :current-page="currentPage" :page-size="pageSize" :total="total" @current-change="getTableData1More" background layout="prev, pager, next"></el-pagination>
      </div>
    </div>

    <div class="main">
      <el-table :data="text2" @selection-change="changeResource" tooltip-effect="dark" ref="table2">
        <el-table-column type="selection" width="39"></el-table-column>
        <el-table-column prop="id" label="序号" width="50"></el-table-column>
        <el-table-column prop="userName" label="用户账号" width=""></el-table-column>
        <el-table-column label="开关" width="110">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.enabled" inactive-color="#ff4949" :ref="`Switch${scope.$index}`"
                       @change="changeSwitch(scope.$index, scope.row, $event, $event)"></el-switch>
          </template>
        </el-table-column>
      </el-table>
      <div class="center">
        <el-button @click="SubTable">提交</el-button>
      </div>

    </div>

    <div class="main">
      <el-cascader v-model="value1" :props="props1"></el-cascader>
    </div>
  </div>
</template>

<script>
import {AreaList} from 'api/api'
import layuiTitle from 'base/layui-title'
import {_normalizeTreeData} from 'common/js/cache'
import testData from 'common/js/testData.json'
export default {
  name: 'mixin',
  data () {
    let _self = this
    return {
      rules: {
        userName: [
          { required: true, message: '请输入用户账号', trigger: 'blur' },
          { min: 3, max: 24, message: '长度在 3 到 24 个字符', trigger: 'blur' }
        ]
      },
      AddForm: {},
      tableData1: [],
      table1Loading: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      Switch: true,

      selectList: [],
      text2: [],
      SwitchLoadings: [false, false, false, false, false, false, false, false, false, false],
      SwitchLoading: false,

      value1: '',
      props1: {
        lazy: true,
        label: 'name',
        value: 'id',
        lazyLoad (node, resolve) {
          if (!node.level) {
            _self.$axios.post(AreaList, {parentid: null}).then((res) => { resolve(res.data) })
          } else {
            _self.$axios.post(AreaList, {parentid: node.data.id}).then((res) => { resolve(_self._normalizeAreaLevel(res.data)) })
          }
        }
      }

    }
  },
  created () {
    window.test = this
    let TreeData = _normalizeTreeData(testData.MenuList, 'id', 'parentid', 'child', null)
    TreeData.sort((a, b) => {
      return a.sort - b.sort
    })
    this.getTest2()
  },
  methods: {
    _normalizeAreaLevel (list) {
      for (let i in list) {
        if (list[i].leveltype >= 3) list[i].leaf = true
      }
      return list
    },
    getTableData1 () {
      this.table1Loading = true
      this.$axios.post('url', {
        page: 1,
        pageSize: this.pageSize
      }).then((res) => {
        console.log(res)
        this.table1Loading = false
        if (res.error) {
          this.$message.error(res.errorMessage)
        } else {
          this.$message.success('成功！')
        }
      })
    },
    getTableData1More (e) {
      this.currentPage = e
      this.table1Loading = true
      this.$axios.post('url', {
        page: e,
        pageSize: this.pageSize
      }).then((res) => {
        console.log(res)
        this.table1Loading = false
        if (res.error) {
          this.$message.error(res.errorMessage)
        } else {
          this.$message.success('成功！')
        }
      })
    },
    handle1 (index, row) {
      console.log(index, row)
    },
    handle2 (index, row) {
      console.log(index, row)
    },

    changeSwitch (index, row) {
      this.$refs.table2.$children[5].$children[2 * (index + 1)].disabled = true
      // this.SwitchLoadings[index] = true
      setTimeout(() => {
        this.$refs.table2.$children[5].$children[2 * (index + 1)].disabled = false
        // this.SwitchLoadings[index] = false
        this.$notify({
          title: '成功',
          message: `序号为：${row.id}，名称为：${row.username},已${row.enabled ? '开启' : '关闭'}`,
          type: 'success'
        })
      }, 1000)
    },

    getTest2 () {
      let list = [
        {
          id: 1,
          userName: '用户1',
          enabled: true
        },
        {
          id: 2,
          userName: '用户2',
          enabled: false
        },
        {
          id: 3,
          userName: '用户3',
          enabled: true
        },
        {
          id: 4,
          userName: '用户4',
          enabled: false
        }
      ]
      this.text2 = list
      this.checkTable2(list)
    },
    checkTable2 (list) {
      if (list) {
        this.$nextTick(() => {
          list.forEach((item, index) => {
            if (item.enabled) {
              // console.log(index)
              this.$refs.table2.toggleRowSelection(this.text2[index])
            }
          })
        })
      }
    },
    changeResource (val) { this.selectList = val },
    SubTable () {
      // console.log(this.selectList)
    }
  },
  components: {
    layuiTitle
  }
}
</script>

<style scoped>
  @import url(../common/css/mixin.css);
</style>
