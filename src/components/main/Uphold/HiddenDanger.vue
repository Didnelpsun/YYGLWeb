<template>
  <div class="content">
    <div class="main">
      <el-form :model="Query">
        <el-row>
          <el-col :sm="12" :md="8">
            <el-form-item label=""></el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" class="center">
            <el-button @click="resetQuery" icon="el-icon-refresh">重置</el-button>
            <el-button @click="handleWrite(0)" type="success" icon="el-icon-plus">添加</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="tableData" v-loading="Loading">
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template>
        </el-table-column>
        <el-table-column label="流水号"></el-table-column>
        <el-table-column label="地市"></el-table-column>
        <el-table-column label="区域"></el-table-column>
        <el-table-column label="站点名称"></el-table-column>
        <el-table-column label="站点编码"></el-table-column>
        <el-table-column label="资源类型"></el-table-column>
        <el-table-column label="隐患类型"></el-table-column>
        <el-table-column label="隐患级别"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleWrite(2, scope.row)">查看</el-button>
            <el-button type="text" size="mini" @click="handleWrite(1, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HiddenDanger',
  data () {
    return {
      Query: {},
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      Loading: false
    }
  },
  methods: {

    handleWrite (state, row) {
      console.log(state, row)
    },
    resetQuery () {
      Object.assign(this.$data.Query, this.$options.data().Query)
    }
  }
}
</script>

<style scoped>
  @import url('../../../common/css/mixin.css');
</style>
