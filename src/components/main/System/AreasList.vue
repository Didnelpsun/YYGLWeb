<template>
  <div class="content">
    <div class="main">
      <el-table :data="tableData1" v-loading="table1Loading" row-key="id" lazy :load="LoadAreaChild"
                :tree-props="{children: 'child', hasChildren: 'hasChild'}" ref="table1">
        <el-table-column prop="name" label="区域名称"></el-table-column>
        <el-table-column prop="area_Code" label="区域级别" :formatter="formatLevel"></el-table-column>
        <el-table-column prop="zipcode" label="邮政编码"></el-table-column>
      </el-table>
    </div>

  </div>

</template>

<script>
import {AreaList} from 'api/api'
import {AREA_LEVEL} from 'common/js/global'

export default {
  name: 'AreasList',
  data () {
    return {
      tableData1: [],
      table1Loading: false
    }
  },
  created () {
    this.getTableData1()
  },
  methods: {
    getTableData1 () {
      this.table1Loading = true
      this.$axios.post(AreaList, {
        parentid: 100000
      }).then((res) => {
        this.table1Loading = false
        if (res.error) {
          this.$message.error(res.errorMessage)
        } else {
          this.tableData1 = this._normalizeArea(res.data)
        }
      })
    },
    formatLevel (row) { return AREA_LEVEL[row.leveltype] },
    LoadAreaChild (row, treeNode, resolve) {
      let id = row.id
      this.$axios.post(AreaList, {
        parentid: id
      }).then((res) => {
        if (res.error) {
          this.$message.error(res.errorMessage)
        } else {
          resolve(this._normalizeArea(res.data))
        }
      })
    },
    _normalizeArea (list) {
      for (let i in list) {
        if (list[i].leveltype < 3) {
          list[i].hasChild = true
        }
      }
      return list
    }
  }
}
</script>

<style scoped>
  @import url(../../../common/css/mixin.css);
</style>
