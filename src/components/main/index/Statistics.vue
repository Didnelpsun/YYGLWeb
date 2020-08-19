<template>
  <div class="content">
    <div class="DataCount">
      <el-row :gutter="20" type="flex" justify="center" style="padding: 20px;">
        <!--<el-col :offset="2"></el-col>-->
        <el-col :xs="12" :sm="12" :lg="{span: '4-8'}" class="card-panel-col">
          <el-card class="box-card">
            <div class="text item pr">
              <span>当前区域</span>
              <el-divider></el-divider>
              <span>武汉市江岸区</span>
              <i class="el-icon-map-location icon"></i>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="{span: '4-8'}" class="card-panel-col">
          <el-card class="box-card">
            <div class="text item pr">
              <span>运维站点数量</span>
              <el-divider></el-divider>
              <span>20个</span>
              <i class="el-icon-map-location icon"></i>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="{span: '4-8'}" class="card-panel-col">
          <el-card class="box-card">
            <div class="text item pr">
              <span>运营商站点数量</span>
              <el-divider></el-divider>
              <span>20个</span>
              <i class="el-icon-map-location icon"></i>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="{span: '4-8'}" class="card-panel-col">
          <el-card class="box-card">
            <div class="text item pr">
              <span>电表数量</span>
              <el-divider></el-divider>
              <span>20个</span>
              <i class="el-icon-map-location icon"></i>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="{span: '4-8'}" class="card-panel-col">
          <el-card class="box-card">
            <div class="text item pr">
              <span>油机数量</span>
              <el-divider></el-divider>
              <span>20个</span>
              <i class="el-icon-map-location icon"></i>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="DataTable">
      <el-row :gutter="20" type="flex" justify="center" style="padding: 20px;">
        <el-col :span="8">
          <el-collapse v-model="activeNames">
            <el-collapse-item title="资源清查" name="1">
              <div id="ZYResource" :style="{width: '400px', height: '200px'}"></div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
        <el-col :span="8">

        </el-col>
        <el-col :span="8">

        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" justify="center" style="padding: 20px;">
        <el-col :span="8">
        </el-col>
        <el-col :span="8">

        </el-col>
        <el-col :span="8">

        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Statistics',
  data () {
    return {
      activeNames: ['1']
    }
  },
  created () {
  },
  mounted () {
    this.getZYResource()
  },
  methods: {
    getZYResource () {
      // 基于准备好的dom，初始化echarts实例
      let ZYResource = this.$echarts.init(document.getElementById('ZYResource'))
      // 绘制图表
      ZYResource.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['运维站点数量', '运营商站点数量']
        },
        color: ['#79E1E2', '#DA5BAE'],
        series: [
          {
            name: '资源清查',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              {value: 70, name: '运维站点数量'},
              {value: 30, name: '运营商站点数量'}
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },
    test () {
      /* this.$axios.get('http://192.168.0.131:5000/KCGL/Project/GetKCProjectExcel', {
        params: {
          id: 1111
        }
      }).then(res => {
        console.log(res)
      }) */
      this.$axios({
        method: 'get',
        url: 'http://192.168.0.131:5000/KCGL/Project/GetKCProjectExcel',
        params: {id: 1111},
        responseType: 'blob'
      }).then((res) => {
        const link = document.createElement('a')
        let blob = new Blob([res], { type: 'application/vnd.ms-excel' })
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)
        link.download = '测试.xls' // 下载的文件名  注意：加.xls是兼容火狐浏览器
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
  .pr {
    position: relative;
  }
  .icon {
    position: absolute;
    font-size: 26px;
    color:#1AB394;
    right: 0;
    bottom: 0;
  }
  .el-col-lg-4-8 {
    width: 20%;
  }
  .el-collapse {
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
  >>> .el-collapse-item__header {
    border-bottom: 1px solid #DCDFE6;
    padding-left: 15px;
    font-size: 16px;
  }
</style>
