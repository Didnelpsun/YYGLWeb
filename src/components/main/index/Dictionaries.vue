<template>
  <div class="content">
    <div class="main" v-show="!dictionaryBox">
      <el-form :model="Query">
        <el-row >
          <el-col :span="18">
            <el-col :span="9">
              <el-form-item label="字典字段：">
                <el-input v-model="Query.type"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="字典文本：">
                <el-input v-model="Query.text"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="6">
            <div class="fr" style="margin-top: 0">
              <el-button style="margin-left: 20px" @click="searchData1" :disabled="QueryLoading" :icon="QueryLoading ? 'el-icon-loading' : 'el-icon-search'">查询</el-button>
              <el-button @click="resetQuery" icon="el-icon-refresh">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>

      <el-row>
        <el-col :span="4" class="SearchResult">查询结果</el-col>
        <el-col :offset="2" :span="18" class="fr">
          <div class="fr">
            <el-button @click="showBox('add')" type="success" icon="el-icon-plus">添加</el-button>
          </div>
        </el-col>
      </el-row>

      <el-table :data="tableData1" v-loading="table1Loading"
                row-key="id" :tree-props="{children: 'child'}" default-expand-all style="margin-top: 15px;">
        <el-table-column prop="type" label="字段字段" ></el-table-column>
        <el-table-column prop="text" label="显示文本" ></el-table-column>
        <el-table-column prop="value" label="字典值" ></el-table-column>
        <el-table-column prop="sort" label="排序" ></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width=""></el-table-column>
        <el-table-column label="操作" width="">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="showBox('edit', scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="handle1(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="center">
        <el-pagination @size-change="handelSizeChange" @current-change="getTableData1More"
                       :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" background>
        </el-pagination>
      </div>
    </div>
    <div class="add" v-show="dictionaryBox">
      <layuiTitle :title="dictionaryType === 'add' ? '添加字典' : '编辑字典'"></layuiTitle>
      <el-form :model="AddForm" :rules="AddRules" ref="AddForm">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="字典字段：" prop="type">
              <el-input v-model="AddForm.type"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="显示文本：" prop="text">
              <el-input v-model="AddForm.text"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="字典值：" prop="value">
              <el-input v-model="AddForm.value"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="排序：" prop="sort">
              <el-input v-model="AddForm.sort"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="center">
        <el-button @click="DicUpdate" :disabled="addDicLoading" :icon="addDicLoading ? 'el-icon-loading' : 'el-icon-check'">提交</el-button>
        <el-button @click="dictionaryBox = !dictionaryBox" icon="el-icon-arrow-left">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {GetDictionarylist, AddDictionary, GetDictionaryinfo, EditDictionary, DelDictionary} from 'api/api'
import layuiTitle from 'base/layui-title'

export default {
  name: 'OrganizationList',
  data () {
    var validatePass = (rule, value, callback) => {
      var re = /^(0|\+?[1-9][0-9]*)$/
      if (!re.test(value)) {
        callback(new Error('请输入正整数'))
      } else {
        callback()
      }
    }
    var validatePass1 = (rule, value, callback) => {
      var re = /^\+?[1-9]\d*$/
      if (!re.test(value)) {
        callback(new Error('请输入大于0的整数'))
      } else {
        callback()
      }
    }
    return {
      pageSize: 10,
      pageIndex: 1,
      currentPage: 1,
      total: 0,
      Query: {},
      QueryLoading: false,
      table1Loading: false,
      tableData1: [],
      dictionaryBox: false,
      addDicLoading: false,
      dictionaryType: '',
      currentID: '',
      AddForm: {
        type: '',
        text: '',
        value: null,
        sort: null,
        createtime: ''
      },
      AddRules: {
        type: [
          {required: true, message: '请输入字典字段', trigger: 'blur'}
        ],
        text: [
          {required: true, message: '请输入显示文本', trigger: 'blur'}
        ],
        value: [
          {required: true, message: '请输入字典值', trigger: 'blur'},
          {validator: validatePass1, trigger: 'blur'}
        ],
        sort: [
          {required: true, message: '请输入序号', trigger: 'blur'},
          {validator: validatePass, trigger: 'blur'}
        ]
      }
    }
  },
  created () {
    this.getTableData1()
  },
  watch: {
    dictionaryBox (newVal, oldVal) {
      if (newVal === false) {
        this.$refs.AddForm.clearValidate()
        this.AddForm = {
          type: '',
          text: '',
          value: null,
          sort: null,
          createtime: ''
        }
      }
    }
  },
  methods: {
    handelSizeChange (newSize) {
      this.pageSize = newSize
      this.getTableData1()
    },
    getTableData1 () {
      this.table1Loading = true
      this.$axios.get(GetDictionarylist, {
        params: {
          PageIndex: this.pageIndex,
          PageSize: this.pageSize,
          type: this.Query.type,
          text: this.Query.text
        }
      }).then((res) => {
        this.table1Loading = false
        if (res.errorCode !== '200') {
          // this.getTableData1()
        } else {
          this.tableData1 = res.data.list
          this.total = res.data.total
        }
      })
    },
    getTableData1More (e) {
      this.currentPage = e
      this.table1Loading = true
      this.$axios.get(GetDictionarylist, {
        params: {
          PageIndex: e,
          PageSize: this.pageSize,
          type: this.Query.type,
          text: this.Query.text
        }
      }).then((res) => {
        this.table1Loading = false
        if (res.errorCode !== '200') {
          // this.getTableData1()
        } else {
          this.tableData1 = res.data.list
          this.total = res.data.total
        }
      })
    },
    resetQuery () {
      this.Query = {}
      this.searchData1()
    },
    searchData1 () {
      this.QueryLoading = true
      this.table1Loading = true
      this.$axios.get(GetDictionarylist, {
        params: {
          PageIndex: this.pageIndex,
          PageSize: this.pageSize,
          type: this.Query.type,
          text: this.Query.text
        }
      }).then((res) => {
        this.QueryLoading = false
        this.table1Loading = false
        if (res.errorCode !== '200') {
          // this.getTableData1()
        } else {
          this.tableData1 = res.data.list
          this.total = res.data.total
        }
      })
    },
    showBox (type, index, row) {
      this.dictionaryBox = true
      this.dictionaryType = type
      if (this.dictionaryType === 'edit') {
        this.tabs1(row.id)
        this.currentID = row.id
      }
    },
    tabs1 (id) {
      this.$axios.get(GetDictionaryinfo, { // 获取字典详情
        params: {
          id: id
        }
      }).then((res) => {
        if (res.errorCode !== '200') {
          this.$message.error(res.errorMessage)
        } else {
          this.AddForm.sort = res.data.sort
          this.AddForm.text = res.data.text
          this.AddForm.type = res.data.type
          this.AddForm.value = res.data.value
          this.AddForm.createtime = res.data.createtime
        }
      })
    },
    handle1 (index, row) {
      this.$confirm('您确认要删除当前字典吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios.delete(DelDictionary, {
          params: {
            id: row.id
          }
        }).then((res) => {
          if (res.error) {
            this.$message.error(res.errorMessage)
          } else {
            this.$message.success('删除成功！')
            this.getTableData1()
            this.currentPage = 1
          }
        })
      })
    },
    DicUpdate () {
      if (this.dictionaryType === 'add') {
        this.SubAdd()
      } else if (this.dictionaryType === 'edit') {
        this.SubEdit()
      }
    },
    SubAdd () {
      this.addDicLoading = true
      this.$refs.AddForm.validate((valid) => {
        if (!valid) {
          this.$message.warning('请补全完整信息！')
          this.addDicLoading = false
        } else {
          this.$axios.post(AddDictionary, this.AddForm).then((res) => {
            this.addDicLoading = false
            if (res.errorCode !== '200') {
              this.$message.error(res.msg)
              this.addDicLoading = false
            } else {
              this.dictionaryBox = false
              this.$message.success('添加成功！')
              // this.Query = {}
              this.getTableData1More(this.currentPage)
              this.AddForm = {
                type: '',
                text: '',
                value: null,
                sort: null,
                createtime: ''
              }
            }
          })
        }
      })
    },
    SubEdit () {
      this.addDicLoading = true
      this.$refs.AddForm.validate((vali) => {
        if (!vali) {
          this.$message.error('请补全表单信息')
        } else {
          this.AddForm.id = this.currentID
          this.$axios.put(EditDictionary, this.AddForm).then((res) => {
            this.addDicLoading = false
            if (res.errorCode !== '200') {
              this.$message.error(res.msg)
            } else {
              this.$message.success('修改成功！')
              // this.Query = {}
              this.dictionaryBox = false
              this.AddForm = {
                type: '',
                text: '',
                value: null,
                sort: null,
                createtime: ''
              }
              this.getTableData1More(this.currentPage)
            }
          })
        }
      })
    }
  },
  components: {
    layuiTitle
  }
}
</script>

<style scoped>
  @import url('../../../common/css/mixin.css');
</style>
