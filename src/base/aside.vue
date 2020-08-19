<template>
  <el-aside class="aside" width="220px" style="width: 220px;height: 100%">
    <el-scrollbar class="scrollBar" :native="true">
      <el-menu style="height: 100%" :defaultActive="Index" background-color="#304156" text-color="#BFCBD9" unique-opened>
        <!-- 一级菜单 -->
        <template v-for="item in data">
          <el-submenu v-if="item.child && item.child.length" :index="item.id" :key="item.id">
            <template slot="title"><i :class="item.icon"></i><span>{{item.name}}</span></template>

            <!-- 二级菜单 -->
            <template v-for="itemChild in item.child">
              <el-submenu v-if="itemChild.child && itemChild.child.length" :index="itemChild.id" :key="itemChild.id">
                <template slot="title"><i :class="itemChild.icon"></i><span>{{itemChild.name}}</span></template>

                <!-- 三级菜单 -->
                <el-menu-item v-for="itemChild_Child in itemChild.child" :index="itemChild_Child.id" :key="itemChild_Child.id" @click="handleSelect(itemChild_Child)">
                  <i :class="itemChild_Child.icon"></i><span slot="title">{{itemChild_Child.name}}</span></el-menu-item>
              </el-submenu>

              <el-menu-item v-else :index="itemChild.id" :key="itemChild.id" @click="handleSelect(itemChild)">
                <i :class="itemChild.icon"></i>
                <span slot="title">{{itemChild.name}}</span>
              </el-menu-item>
            </template>
          </el-submenu>
          <el-menu-item v-else :index="item.id" :key="item.id" @click="handleSelect(item)">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </el-aside>

</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: 'Aside',
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    Index: {
      type: String,
      default: '/main/UserList'
    }
  },
  methods: {
    handleSelect (item) {
      if (item.id === '2d6a2407-c247-404f-b093-a91f524a56fa') {
        this.setSurveyInfoType(1)
      } else if (item.id === 'dc73026f-3906-4f64-a8bd-1a2bc646f1fe') {
        this.setSurveyInfoType(2)
      }
      this.$emit('selectAside', item)
    },
    ...mapMutations({
      setSurveyInfoType: 'SET_SURVEYINFOTYPE'
    })
  }
}
</script>

<style>
  .aside, .scrollBar {
    height: 100%;
    user-select: none;
  }
  .aside .el-scrollbar__view {
    height: 100%;
  }
  .aside .el-submenu__title {
    height: 50px;
    line-height: 50px;
  }
  /*.aside .is-active>.el-submenu__title,
  .aside .is-active>.el-submenu__title i{
    color: #f4f4f5 !important;
    transition: all .3s;
  }
  .aside .menu-item {
    height: 45px;
    line-height: 45px;
    background: #1F2D3D !important;
    transition: all .3s;
  }
  .aside .menu-item:hover,
  .aside .menu-item:hover i{
    background: #001528 !important;
    color: #409EFF !important;
    transition: all .3s;
  }
  .aside .menu-item.is-active {
    background: #001528 !important;
    transition: all .3s;
  }*/
  .aside .el-menu-item.is-active {
    background: #1d293b !important;
  }

</style>
