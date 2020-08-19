<template>
  <div class="tabs">
    <el-tabs :value="TabIndex" type="border-card" closable @tab-click="clickTab" @tab-remove="removeTab" class="tabs">
      <el-tab-pane class="item" v-for="item in data" :key="item.id" :label="item.name" :name="item.id"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: 'tabs',
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    currentMenu: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    TabIndex () {
      return this.currentMenu.id
    }
  },
  methods: {
    clickTab (e) {
      if (e.name === '2d6a2407-c247-404f-b093-a91f524a56fa') {
        this.setSurveyInfoType(1)
      } else if (e.name === 'dc73026f-3906-4f64-a8bd-1a2bc646f1fe') {
        this.setSurveyInfoType(2)
      }
      let index = e.index
      if (this.data[index].id !== this.currentMenu.id) {
        this.$emit('changeCurrent', this.data[index])
      }
    },
    removeTab (id) {
      let tabs = this.data
      let index = tabs.findIndex(item => { return item.id === id })
      let Cindex = tabs.findIndex(item => { return item.id === this.currentMenu.id })
      if (this.data.length === 1) return // 如果标签页只有一个 就停止删除操作
      this.data.splice(index, 1)
      if (Cindex === index) {
        index -= 1
        this.$emit('changeCurrent', this.data[index])
        return false
      }
      /* if (index >= this.data.length) {
        index -= 1
        this.$emit('changeCurrent', this.data[index])
        return false
      } */
      // this.$emit('changeCurrent', this.data[index])
    },
    ...mapMutations({
      setSurveyInfoType: 'SET_SURVEYINFOTYPE'
    })
  }
}
</script>

<style scoped>
  .tabs {
    position: fixed;
    top: 50px;
    bottom: 0;
    left: 220px;
    right: 0;
    user-select: none;
  }
  >>> .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
    color: #409EFF;
    border-right-color: #409EFF;
    border-left-color: #409EFF;
  }
  >>> .el-tabs--border-card>.el-tabs__header {
    border-bottom: 1px solid #409EFF;
  }
  >>> .el-tabs--border-card {
    border-top: 1px solid #409EFF;
  }
</style>
