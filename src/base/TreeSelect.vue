<template>
  <el-dialog class="Tree" :title="title" :visible.sync="show" width="40%" center :modal-append-to-body="false">

    <el-scrollbar style="height: 50vh">
      <el-tree :data="data" :props="props" @check-change="CheckChange" @node-click="Select"
               :show-checkbox="showCheckBox" :check-strictly="checkStrictly" :default-expand-all="expandAll"
               ref="Tree" node-key="id"></el-tree>
    </el-scrollbar>

    <span slot="footer" class="dialog-footer">
      <el-button @click="show = false" type="">取 消</el-button>
      <el-button @click="handleConfirm">确 定</el-button>
    </span>
  </el-dialog>

</template>

<script>
export default {
  name: 'TreeSelect',
  props: {
    showCheckBox: { // 是否显示选择框
      type: Boolean,
      default: false
    },
    checkStrictly: { // 父子不关联的选择
      type: Boolean,
      default: false
    },
    expandAll: { // 展开全部结构
      type: Boolean,
      default: false
    },
    isRadio: { // false为多选 true为单选
      type: Boolean,
      default: false
    },
    title: { // 标题
      type: String,
      default: ''
    },
    data: { // 数据
      type: Array,
      default () {
        return []
      }
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
  methods: {
    open () { this.show = true },
    close () { this.show = false },
    showLoading () { this.Loading = true },
    closeLoading () { this.Loading = false },
    Select (list) { this.$emit('Select', list) },
    CheckChange (data, check) {
      if (this.isRadio) {
        console.log('单选')
        if (check) {
          let arr = [data.id]
          this.$refs.Tree.setCheckedKeys(arr)
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
        this.$refs.Tree.setCheckedKeys(data)
      })
    },
    handleConfirm () {
      this.show = false
      this.$emit('Confirm', this.$refs.Tree.getCheckedNodes())
    }
  }
}
</script>

<style scoped>

</style>
