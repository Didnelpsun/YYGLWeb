import {AreaList} from 'api/api'

export const GlobalRes = {
  data () {
    const _this = this
    return {
      areaProps: {
        lazy: true,
        label: 'name',
        value: 'id',
        lazyLoad (node, resolve) {
          if (!node.level) {
            resolve(JSON.parse(localStorage.getItem('ProvinceList')))
            /* _this.$axios.post(AreaList, {parentid: null}).then((res) => {
              if (res.error) {
                _this.$message.error(res.errorMessage)
              } else {
                resolve(_this._normalizeAreaLevel(res.data))
              }
            }) */
          } else {
            if (!node.hasChildren) return resolve([])
            _this.$axios.post(AreaList, {parentid: node.data.id}).then((res) => {
              if (res.error) {
                _this.$message.error(res.errorMessage)
              } else {
                resolve(_this._normalizeAreaLevel(res.data))
              }
            })
          }
        }
      },
      QareaProps: {
        lazy: true,
        checkStrictly: true,
        label: 'name',
        value: 'id',
        lazyLoad (node, resolve) {
          if (!node.level) {
            resolve(JSON.parse(localStorage.getItem('ProvinceList')))
            /* _this.$axios.post(AreaList, {parentid: null}).then((res) => {
              if (res.error) {
                _this.$message.error(res.errorMessage)
              } else {
                _this.Query.AreaList = [res.data[0].id]
                resolve(_this._normalizeAreaLevel(res.data))
              }
            }) */
          } else {
            if (!node.hasChildren) return resolve([])
            _this.$axios.post(AreaList, {parentid: node.data.id}).then((res) => {
              if (res.error) {
                _this.$message.error(res.errorMessage)
              } else {
                resolve(_this._normalizeAreaLevel(res.data))
              }
            })
          }
        }
      }
    }
  },
  methods: {
    writeDic (list) {
      let txt = ''
      for (let i in list) {
        i === '0' ? txt = list[i].text : txt += ` | ${list[i].text}`
      }
      return txt
    },
    formatDic (list, val) {
      let i = list.findIndex(i => { return i.value === val })
      return i < 0 ? '' : list[i].text
    },
    formatToF (data) { return data ? '是' : '否' },
    _normalizeAreaLevel (list) {
      for (let i in list) {
        if (list[i].leveltype >= 3) list[i].leaf = true
      }
      return list
    },
    changeArea (obj) {
      // console.log(obj)
      obj.provinceid = obj.AreaList[0]
      obj.cityid = obj.AreaList[1]
      obj.areaid = obj.AreaList[2]
    },
    setArea (list, key = 'csArea') {
      this.nodes = list
      this.$refs[key].panel.activePath = []
      this.$refs[key].panel.loadCount = 0
      this.$refs[key].panel.lazyLoad()
    },
    QAreaChange (list, key = 'Query') {
      this[key].provinceid = list[0]
      this[key].cityid = list[1]
      this[key].areaid = list[2]
    }
  }
}
