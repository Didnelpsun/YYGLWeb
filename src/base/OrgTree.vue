<template>
  <el-dialog class="OrgTree" title="选择部门" :visible.sync="show" width="40%" center :loading="loading">
    <el-scrollbar style="height: 50vh">
      <el-tree :data="list" :props="props" :show-checkbox="showCheckBox" :check-strictly="checkStrictly"
               @check-change="CheckChange" :default-expand-all="expandAll" node-key="id" ref="tree"></el-tree>
    </el-scrollbar>
    <span slot="footer" class="dialog-footer">
      <el-button @click="show = false" type="">取 消</el-button>
      <el-button @click="handleConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {OrgList} from 'api/api'
import {_normalizeTreeData} from 'common/js/cache'

export default {
  name: 'OrgTree',
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
      loading: false,
      show: false,
      list: [],
      props: {children: 'child', label: 'orgname'}
    }
  },
  methods: {
    open () { this.show = true },
    close () { this.show = false },
    getOrgList () {
      this.loading = true
      this.$axios.post(OrgList, {
        page: 1,
        pageSize: 10000
      }).then((res) => {
        setTimeout(() => {
          this.loading = false
        }, 1000)
        if (res.error) {
          this.$message.error(res.errorMessage)
        } else {
          res.data.list = this.formatParentId(res.data.list)
          this.list = _normalizeTreeData(res.data.list, 'id', 'parentorg_id', 'child', null)
        }
      })
    },
    formatParentId (list) {
      list.forEach(i => {
        if (!list.find(j => j.id === i.parentorg_id)) i.parentorg_id = null
      })
      return list
    },
    CheckChange (data, check) {
      if (this.isRadio) { // 单选
        if (check) {
          let arr = [data.id]
          this.$refs.tree.setCheckedKeys(arr)
        }
      } else { // 多选
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
        this.$refs.tree.setCheckedKeys(data)
      })
    },
    handleConfirm () {
      this.$emit('Confirm', this.$refs.tree.getCheckedNodes())
      this.close()
    }
  }
}
</script>

<style scoped>

</style>
