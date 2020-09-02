<template>
  <div class="content">
    <div class="DataCount">
      <el-row :gutter="10" type="flex" justify="center" style="padding: 15px;">
        <el-col :span="4">
          <el-card class="box-card">
            <div class="text item pr">
              <span>当前区域</span>
              <el-divider></el-divider>
              <span>武汉市江岸区</span>
              <i class="el-icon-map-location icon"></i>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card class="box-card">
            <div class="text item pr">
              <span>站点数量</span>
              <el-divider></el-divider>
              <span>20个</span>
              <i class="el-icon-map-location icon"></i>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card class="box-card">
            <div class="text item pr">
              <span>运维站点数量</span>
              <el-divider></el-divider>
              <span>20个</span>
              <i class="el-icon-map-location icon"></i>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card class="box-card">
            <div class="text item pr">
              <span>运营商站点数量</span>
              <el-divider></el-divider>
              <span>20个</span>
              <i class="el-icon-map-location icon"></i>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card class="box-card">
            <div class="text item pr">
              <span>电表数量</span>
              <el-divider></el-divider>
              <span>20个</span>
              <i class="el-icon-map-location icon"></i>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
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
          <el-collapse v-model="activeNames1">
            <el-collapse-item title="资源清查" name="1">
              <div id="ZYResource" :style="{width: '100%', height: '250px'}"></div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
        <el-col :span="8">
          <el-collapse v-model="activeNames2">
            <el-collapse-item title="能源清查" name="1">
              <div id="NYResource" :style="{width: '100%', height: '250px'}"></div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
        <el-col :span="8">
          <el-collapse v-model="activeNames3">
            <el-collapse-item title="项目勘察" name="1">
              <div id="Survey" :style="{width: '100%', height: '250px'}"></div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" justify="center" style="padding: 20px;">
        <el-col :span="8">
          <el-collapse v-model="activeNames4">
            <el-collapse-item title="电费分摊" name="1">
              <div id="Electricity" :style="{width: '100%', height: '250px'}"></div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
        <el-col :span="8">
          <el-collapse v-model="activeNames5">
            <el-collapse-item title="发电工单" name="1">
              <div id="FDGD" :style="{width: '100%', height: '250px'}"></div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
        <el-col :span="8">
          <el-collapse v-model="activeNames6">
            <el-collapse-item title="停电预警" name="1">
              <div id="TDYJ" :style="{width: '100%', height: '250px'}"></div>
            </el-collapse-item>
          </el-collapse>
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
      activeNames1: ['1'],
      activeNames2: ['1'],
      activeNames3: ['1'],
      activeNames4: ['1'],
      activeNames5: ['1'],
      activeNames6: ['1'],
      areaArr: ['江岸区', '江汉区', '武昌区', '洪山区', '青山区']
    }
  },
  created () {
  },
  mounted () {
    this.getZYResource()
    this.getNYResource()
    this.getSurvey()
    this.getElectricity()
    this.getFDGDdata()
    this.getTDYJdata()
  },
  methods: {
    getZYResource () {
      let ZYResource = this.$echarts.init(document.getElementById('ZYResource'))
      ZYResource.setOption({
        grid: {
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'item',
          confine: true,
          formatter: '{a} <br/>{b}' + '待执行任务' + ': {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          top: '5%',
          left: 'left',
          data: this.areaArr
        },
        color: ['#79E1E2', '#DA5BAE', '#7FAE90', '#FFE79A', '#EAA3A0'],
        series: [
          {
            name: '资源清查',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              {value: 70, name: '江岸区'},
              {value: 30, name: '江汉区'},
              {value: 38, name: '武昌区'},
              {value: 60, name: '洪山区'},
              {value: 45, name: '青山区'}
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
      window.addEventListener('resize', () => {
        ZYResource.resize()
      })
    },
    getNYResource () {
      let NYResource = this.$echarts.init(document.getElementById('NYResource'))
      NYResource.setOption({
        grid: {
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'item',
          confine: true,
          formatter: '{a} <br/>{b}' + '待执行任务' + ': {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          top: '5%',
          left: 'left',
          data: this.areaArr
        },
        calculable: true,
        color: ['#70B4E0', '#E89779', '#31FA6E', '#CA8622', '#C23531'],
        series: [
          {
            name: '能源清查',
            type: 'pie',
            radius: ['45%', '65%'],
            center: ['50%', '50%'],
            data: [
              {value: 35, name: '江岸区'},
              {value: 10, name: '江汉区'},
              {value: 60, name: '武昌区'},
              {value: 78, name: '洪山区'},
              {value: 24, name: '青山区'}
            ]
          }
        ]
      })
      window.addEventListener('resize', () => {
        NYResource.resize()
      })
    },
    getSurvey () {
      let Survey = this.$echarts.init(document.getElementById('Survey'))
      var nameArr = ['江岸区', '江汉区', '武昌区', '洪山区', '青山区']
      Survey.setOption({
        // 图表的位置
        grid: {
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          confine: true,
          enterable: true, // 鼠标是否可以移动到tooltip区域内
          formatter: function (params) {
            var relVal = params.seriesName
            for (var i = 0, l = params.value.length; i < l; i++) {
              relVal += '<br/>' + nameArr[i] + '待执行任务' + ' : ' + params.value[i]
            }
            return relVal
          }
        },
        radar: {
          shape: 'circle',
          splitNumber: 5, // 雷达图圈数设置
          name: {
            // fontSize: 10,
            textStyle: {
              color: '#95a4b8'
            }
          },
          // 设置雷达图中间射线的颜色
          axisLine: {
            lineStyle: {
              color: 'rgba(131,141,158,.1)'
            }
          },
          indicator: [
            {
              name: '江岸区',
              max: 80
            },
            {
              name: '江汉区',
              max: 80
            },
            {
              name: '武昌区',
              max: 80
            },
            {
              name: '洪山区',
              max: 80
            },
            {
              name: '青山区',
              max: 80
            }
          ],
          radius: '65%',
          center: ['50%', '55%'], // 位置
          splitArea: {
            show: false,
            areaStyle: {
              color: '#fff', // 图表背景的颜色
              type: 'dashed'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: '#000', // 设置网格的颜色
              type: 'dashed'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#000',
              type: 'dashed'
            }
          }
        },
        series: [
          {
            name: '项目勘察', // tooltip中的标题
            type: 'radar', // 表示是雷达图
            symbol: 'circle', // 拐点的样式，还可以取值'rect','angle'等
            symbolSize: 8, // 拐点的大小
            areaStyle: {
              normal: {
                width: 1,
                // opacity: 0.2,
                color: '#DD706E'
              }
            },
            data: [
              {
                value: [56, 39, 39, 52, 28],
                label: { // 单个拐点文本的样式设置
                  normal: {
                    show: true,
                    position: 'top',
                    distance: 5,
                    color: 'rgba(255,0,0,1)',
                    fontSize: 14,
                    formatter: function (params) {
                      return params.value
                    }
                  }
                }
              }
            ]
          }
        ]
      })
      window.addEventListener('resize', () => {
        Survey.resize()
      })
    },
    getElectricity () {
      let Electricity = this.$echarts.init(document.getElementById('Electricity'))
      Electricity.setOption({
        grid: {
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'item',
          confine: true,
          formatter: '{a} <br/>{b}' + '待执行任务' + ': {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          top: '5%',
          left: 'left',
          data: this.areaArr
        },
        color: ['#99FF00', '#CC3300', '#CC00FF', '#F28B3A', '#15DD76'],
        series: [
          {
            name: '资源清查',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              {value: 70, name: '江岸区'},
              {value: 30, name: '江汉区'},
              {value: 38, name: '武昌区'},
              {value: 60, name: '洪山区'},
              {value: 45, name: '青山区'}
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
      window.addEventListener('resize', () => {
        Electricity.resize()
      })
    },
    getFDGDdata () {
      let FDGD = this.$echarts.init(document.getElementById('FDGD'))
      FDGD.setOption({
        grid: {
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'item',
          confine: true,
          formatter: '{a} <br/>{b}' + '待执行任务' + ': {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          top: '5%',
          left: 'left',
          data: this.areaArr
        },
        calculable: true,
        color: ['#00FF66', '#660033', '#FC571E', '#0295FD', '#6F26FE'],
        series: [
          {
            name: '能源清查',
            type: 'pie',
            radius: ['45%', '65%'],
            center: ['50%', '50%'],
            data: [
              {value: 35, name: '江岸区'},
              {value: 10, name: '江汉区'},
              {value: 60, name: '武昌区'},
              {value: 78, name: '洪山区'},
              {value: 24, name: '青山区'}
            ]
          }
        ]
      })
      window.addEventListener('resize', () => {
        FDGD.resize()
      })
    },
    getTDYJdata () {
      let TDYJ = this.$echarts.init(document.getElementById('TDYJ'))
      var nameArr = ['江岸区', '江汉区', '武昌区', '洪山区', '青山区']
      TDYJ.setOption({
        // 图表的位置
        grid: {
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          confine: true,
          enterable: true, // 鼠标是否可以移动到tooltip区域内
          formatter: function (params) {
            var relVal = params.seriesName
            for (var i = 0, l = params.value.length; i < l; i++) {
              relVal += '<br/>' + nameArr[i] + '待执行任务' + ' : ' + params.value[i]
            }
            return relVal
          }
        },
        radar: {
          shape: 'circle',
          splitNumber: 5, // 雷达图圈数设置
          name: {
            // fontSize: 10,
            textStyle: {
              color: '#95a4b8'
            }
          },
          // 设置雷达图中间射线的颜色
          axisLine: {
            lineStyle: {
              color: 'rgba(131,141,158,.1)'
            }
          },
          indicator: [
            {
              name: '江岸区',
              max: 80
            },
            {
              name: '江汉区',
              max: 80
            },
            {
              name: '武昌区',
              max: 80
            },
            {
              name: '洪山区',
              max: 80
            },
            {
              name: '青山区',
              max: 80
            }
          ],
          radius: '65%',
          center: ['50%', '55%'], // 位置
          splitArea: {
            show: false,
            areaStyle: {
              color: '#fff', // 图表背景的颜色
              type: 'dashed'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: '#000', // 设置网格的颜色
              type: 'dashed'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#000',
              type: 'dashed'
            }
          }
        },
        series: [
          {
            name: '项目勘察', // tooltip中的标题
            type: 'radar', // 表示是雷达图
            symbol: 'circle', // 拐点的样式，还可以取值'rect','angle'等
            symbolSize: 8, // 拐点的大小
            areaStyle: {
              normal: {
                width: 1,
                // opacity: 0.2,
                color: '#6F26FE'
              }
            },
            data: [
              {
                value: [56, 39, 39, 52, 28],
                label: { // 单个拐点文本的样式设置
                  normal: {
                    show: true,
                    position: 'top',
                    distance: 5,
                    color: '#6F26FE',
                    fontSize: 14,
                    formatter: function (params) {
                      return params.value
                    }
                  }
                },
                itemStyle: { // 单个拐点标志的样式设置。
                  normal: {
                    borderColor: '#6F26FE',
                    // 拐点的描边颜色。[ default: '#000' ]
                    borderWidth: 3
                    // 拐点的描边宽度，默认不描边。[ default: 0 ]
                  }
                }
              }
            ]
          }
        ]
      })
      window.addEventListener('resize', () => {
        TDYJ.resize()
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
  .el-collapse {
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
  >>> .el-collapse-item__header {
    border-bottom: 1px solid #DCDFE6;
    padding-left: 15px;
    font-size: 16px;
  }
</style>
