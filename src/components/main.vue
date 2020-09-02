<template>
  <div class="container">
    <myHeader @addTabs="AddTabs"></myHeader>
    <div class="wrapper">
      <Aside :data="AsideData" :Index="AsideIndex" @selectAside="selectAside" ref="side"></Aside>
      <div class="main">
        <tabs :data="MenuList" :currentMenu="currentMenu" @changeCurrent="changeCurrent"></tabs>
        <div class="router-container">
          <el-scrollbar class="scrollbar">
            <keep-alive>
              <router-view @RefreshNav="getUserNavBar" @handleChange="handleChange"></router-view>
            </keep-alive>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {NavMenu, UserInfo, AreaList} from 'api/api'
import {_normalizeTreeData} from 'common/js/cache'
import testData from 'common/js/testData.json'
import myHeader from 'base/myHeader'
import Aside from 'base/aside'
import tabs from 'base/tabs'
import {mapMutations} from 'vuex'

export default {
  name: 'Main',
  data () {
    return {
      AsideData: [],
      AsideIndex: '/main/UserList',
      MenuList: [],
      currentMenu: {}
    }
  },
  created () {
    window.main = this
    this.hasToken() // 检测是否有token 如果没有就重新登录
    this.getProvinceList()
  },
  methods: {
    hasToken () {
      let token = localStorage.getItem('token')
      if (!token) {
        this.setToken('')
        this.setUserInfo({})
        this.$router.push({path: '/login'})
        return false
      }
      this.setToken(token)
      this.getUserInfo()
      this.getUserNavBar()
    },
    getUserInfo () {
      this.$axios.post(UserInfo).then((res) => {
        if (res.error) {
          setTimeout(() => {
            this.getUserInfo()
          }, 5000)
        } else {
          this.setUserInfo(res.data)
        }
      })
    },
    getUserNavBar () {
      this.$axios.post(NavMenu, {type: 2}).then((res) => {
        if (res.error) {
          setTimeout(() => {
            this.getUserNavBar()
          }, 10000)
        } else {
          res.data.sort((a, b) => { return b.sort - a.sort })
          let list = _normalizeTreeData(res.data, 'id', 'parentid', 'child', 'e0fe44c7-9fed-4ba9-9de2-a5733ecdfcef')
          this.AsideData = list
          let MenuList = sessionStorage.getItem('MenuList')
          let CurrentMenu = sessionStorage.getItem('CurrentMenu')
          if (MenuList) {
            this.MenuList = JSON.parse(MenuList)
            this.currentMenu = JSON.parse(CurrentMenu)
          } else {
            this.MenuList.push(testData.Redirect)
            this.currentMenu = testData.Redirect
          }
        }
      })
    },
    AddTabs (obj) {
      let index = this.MenuList.findIndex((item) => {
        return item.id === obj.id
      })
      if (index < 0) {
        this.currentIndex = this.MenuList.length
        this.MenuList.push(obj)
      }
      if (index >= 0) {
        this.currentIndex = index
      }
      this.currentMenu = this.MenuList[this.currentIndex]
    },
    selectAside (e) {
      let index = this.MenuList.findIndex((item) => {
        return item.id === e.id
      })
      if (index < 0) {
        this.currentIndex = this.MenuList.length
        if (this.MenuList.length === 10) {
          return this.$message.error('页面打开上限为10个,请手动关闭页面')
        } else {
          this.MenuList.push(e)
        }
      } else {
        this.currentIndex = index
      }
      this.currentMenu = this.MenuList[this.currentIndex]
    },
    changeCurrent (e) {
      this.currentMenu = e
    },
    getProvinceList () {
      this.$axios.post(AreaList, {parentid: null}).then(res => {
        if (res.error) {
          return this.$message.error(res.errorMessage)
        } else {
          localStorage.setItem('ProvinceList', JSON.stringify(res.data))
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    handleChange (val, id) {
      this.MenuList.forEach((i, index) => {
        if (this.MenuList[index].id === id) {
          this.MenuList[index].url = val
        }
      })
    },
    ...mapMutations({
      setToken: 'SET_TOKEN',
      setUserInfo: 'SET_USER_INFO'
    })
  },
  watch: {
    currentMenu (val) {
      this.AsideIndex = val.id
      this.$router.push({
        path: val.url
      })
      let MenuList = this.MenuList
      let CurrentMenu = val
      sessionStorage.setItem('MenuList', JSON.stringify(MenuList))
      sessionStorage.setItem('CurrentMenu', JSON.stringify(CurrentMenu))
    }
  },
  components: {
    myHeader,
    Aside,
    tabs
  }
}
</script>

<style scoped>
  .wrapper {
    width: 100%;
    position: fixed;
    /*top: 60px;*/
    top: 50px;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .main {
    position: fixed;
    top: 50px;
    bottom: 0;
    left: 220px;
    right: 0;
    background: #F9FAFB;
  }
  .router-container {
    position: fixed;
    /*top: 100px;*/
    top: 90px;
    left: 220px;
    bottom: 0;
    right: 0;
    overflow-x: hidden;
  }
  .scrollbar {
    height: 100%;
  }
</style>
