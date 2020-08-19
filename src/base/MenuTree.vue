<template>
  <el-dialog class="MenuTree" title="选择菜单资源" :visible.sync="show" width="40%" center :modal-append-to-body="false">

    <el-scrollbar style="height: 50vh">
      <el-tree :data="list" :props="props" @check-change="CheckChange" @node-click="selectMenu"
               :show-checkbox="showCheckBox" :check-strictly="checkStrictly" :default-expand-all="expandAll"
               ref="MenuTree" node-key="id"></el-tree>
    </el-scrollbar>

    <span slot="footer" class="dialog-footer">
      <el-button @click="show = false" type="">取 消</el-button>
      <el-button @click="handleConfirm">确 定</el-button>
    </span>
  </el-dialog>

</template>

<script>
import {ResrouceList} from 'api/api'

export default {
  name: 'MenuTree',
  props: {
    showCheckBox: {
      type: Boolean,
      default: false
    },
    checkStrictly: {
      type: Boolean,
      default: false
    },
    expandAll: {
      type: Boolean,
      default: false
    },
    isRadio: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: false,
      Loading: false,
      list: [],
      props: {children: 'child', label: 'name'},
      checkList: []
    }
  },
  created () {
    this.getResMenuList()
  },
  methods: {
    async getResMenuList () {
      const res = await this.$axios.post(ResrouceList, {
        page: 1,
        pagesize: 10000,
        resourcetype: 2
      })
      if (res.error) setTimeout(() => { this.getMenuList() }, 1000)
      res.data.sort((a, b) => { return b.sort - a.sort })
      this.list = res.data
      // this.list = _normalizeTreeData(res.data, 'id', 'parentid', 'child', null)
    },
    open (key) {
      this.show = true
      this.$refs.MenuTree.setCheckedKeys([key])
    },
    close () { this.show = false },
    selectMenu (list) { this.$emit('selectMenu', list) },
    CheckChange (data, check) {
      if (this.isRadio) {
        console.log('单选')
        if (check) {
          let arr = [data.id]
          this.$refs.MenuTree.setCheckedKeys(arr)
        }
      } else {
        console.log('多选')
        let index = this.checkList.indexOf(data.id)
        if (check) {
          if (index < 0) { this.checkList.push(data.id) }
        } else {
          if (index >= 0) this.checkList.splice(index, 1)
        }
      }
    },
    setCheckedKeys (data = []) {
      this.$nextTick(() => {
        this.$refs.MenuTree.setCheckedKeys(data)
      })
    },
    handleConfirm () {
      this.show = false
      this.$emit('Confirm', this.$refs.MenuTree.getCheckedNodes())
    }
  }
}
</script>

<style scoped>

</style>
