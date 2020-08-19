<template>
  <el-dialog class="AreaTree" title="选择区域" :visible.sync="show" width="40%" center>

    <el-scrollbar style="height: 50vh">
      <el-tree :props="props" ref="AreaTree" node-key="id" lazy :load="loadArea" @node-click="selectArea" highlight-current></el-tree>
    </el-scrollbar>

    <span slot="footer" class="dialog-footer"><el-button @click="show = false">确 定</el-button></span>
  </el-dialog>

</template>

<script>
import {AreaList} from 'api/api'

export default {
  name: 'AreaTree',
  data () {
    return {
      show: false,
      props: {
        label: 'name',
        isLeaf: 'leaf', // true 为表示没有子节点
        children: 'child'
      }
    }
  },
  methods: {
    open () { this.show = true },
    close () { this.show = false },
    selectArea (list) { this.$emit('selectArea', list) },
    loadArea (node, resolve) {
      if (node.level <= 0) {
        this.$axios.post(AreaList, {
          parentid: 100000
        }).then((res) => {
          if (res.error) {
            this.$message.error(res.errorMessage)
          } else {
            resolve(this._normalizeArea(res.data))
          }
        })
      } else {
        this.$axios.post(AreaList, {
          parentid: node.data.id
        }).then((res) => {
          if (res.error) {
            this.$message.error(res.errorMessage)
          } else {
            resolve(this._normalizeArea(res.data))
          }
        })
      }
    },
    _normalizeArea (list) {
      for (let i in list) {
        if (list[i].leveltype >= 3) { // 默认地区最小leveltype为3
          list[i].leaf = true
        }
      }
      console.log(list)
      return list
    }
  }
}
</script>

<style scoped>

</style>
