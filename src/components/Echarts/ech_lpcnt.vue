<template>
  <div>
    <div
      style="width: 100%; height: 620px;"
      :id="echarts"
      class="echarts"
      ref="echarts"
    ></div>
  </div>
</template>

<script>
import './infographic.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import { EleResize } from './esresize.js'
export default {
  name: 'EchartsComponents',
  props: {
    // 接收父组件传递过来的信息
    chartData: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {}
  },
  methods: {
 
    drawChart () {
      const vm = this
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById(this.echarts), 'infographic')
      var screenUrl ="data:image/png;base64,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"
      // 绘制图表
      var option = {
        title: {
          text: this.chartData.titleName,
          left:'2%',
          textStyle:{
             color:"#999",
             fontWeight:'600'
          }
        },
        tooltip: {
          trigger: 'axis',
     

        },
        legend: {
          top: 0,
          padding: [5, 150],
          data: this.chartData.checkName
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: {
              show: true,
              readOnly: false,
              buttonColor: '#22c3aa',
              optionToContent: function (opt) {
                //console.info(opt);
                var axisData = opt.xAxis[0].data;
                var series = opt.series;
                var tdHeaders = '<td>名称</td>'; //表头
                series.forEach(function (item) {
                  tdHeaders += '<td>' + item.name + '</td>'; //组装表头
                });
                var table = '<div class="table-responsive"><table class="table table-bordered table-striped table-hover" style="text-align:center"><tbody><tr>' + tdHeaders + '</tr>';
                var tdBodys = ''; //数据
                for (let i = 0, l = axisData.length; i < l; i++) {
                  for (let j = 0; j < series.length; j++) {
                    tdBodys += '<td>' + series[j].data[i] + '</td>'; //组装表数据
                  }
                  table += '<tr><td>' + axisData[i] + '</td>' + tdBodys + '</tr>';
                  tdBodys = '';
                }

                table += '</tbody></table></div>';
                return table;
              }
            },
            magicType: { type: ['line', 'bar'] },
            // restore: {},
            saveAsImage: {
              backgroundColor: '#ffffff',
              pixelRatio: 2
            },
             myFull: {
        show: true,
        title: '全屏查看',
        icon: `image://${screenUrl}`,
        onclick: (e) => {
          const element = document.getElementById(this.echarts);
          if (element.requestFullScreen) { // HTML W3C 提议
            element.requestFullScreen();
          } else if (element.msRequestFullscreen) { // IE11
            element.msRequestFullScreen();
          } else if (element.webkitRequestFullScreen) { // Webkit (works in Safari5.1 and Chrome 15)
            element.webkitRequestFullScreen();
          } else if (element.mozRequestFullScreen) { // Firefox (works in nightly)
            element.mozRequestFullScreen();
          }
          // 退出全屏
          if (element.requestFullScreen) {
            document.exitFullscreen();
          } else if (element.msRequestFullScreen) {
            document.msExitFullscreen();
          } else if (element.webkitRequestFullScreen) {
            document.webkitCancelFullScreen();
          } else if (element.mozRequestFullScreen) {
            document.mozCancelFullScreen();
          }
        },
      },
          }
        },
        xAxis: {
          show: true,
          type: 'category',
          boundaryGap: false,
          data: this.chartData.xList,
          splitLine: {
            show: true,

          },
          axisLabel: {
            interval:0,
            rotate: 0,
            margin:15
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              // 使用深浅的间隔色
              color: ['#eee']
            }
          },

        },
        series: this.chartData.datalist
      }
      myChart.setOption(option, true)
      let listener = function () {
        myChart.resize();
      };
      EleResize.on(document.getElementById(this.echarts), listener);

    }
  },
  computed: {
    echarts () {
      return 'echarts' + Math.random() * 100000
    }
  },
  mounted: function () {
    const vm = this
    vm.$nextTick(() => {
      vm.drawChart()
    })
  },
  created: () => { },
  watch: {
    chartData: {
      handler (newVal, oldVal) {
        //console.log("更新数据")
        this.drawChart()
      },
      deep: true
    }

  }
}
</script>


<style lang="less">
:-webkit-full-screen {  
  background-color: #ffffff !important;  
}  
:-moz-full-screen {  
  background-color:#ffffff !important;  
}  
  
:-ms-fullscreen {  
  background-color: #ffffff !important;  
}  
:fullscreen {  
  background-color:#ffffff !important;  
}
</style>
