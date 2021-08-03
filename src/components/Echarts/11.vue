<template>
  
</template>

<script>
new Vue({
  el: "#app",
  data() {
    return {
      comName: ['公司1', '公司2', '公司3', '公司4', '公司5', '公司6'],
      avgPriceRate: [-1.7, -2.8, -3.9, -6.5, -0.8, 6.6], // 均价涨幅 单位%
      giveInterestPrice: [55555.5, 66666.6, 44444.4, 33333.3, 8767.1, 15432.1], // 让利金额 单位万元
    }
  },
  created() {
  },
  mounted() {
    this.initChart('Echarts 数据在x轴下方展示','chart', this.comName, this.avgPriceRate, this.giveInterestPrice);
  },
  methods: {
    getTableLine(num, idName) {
      let width = $(`#${idName}`).width();
      let list = [];
      let bottom = 125;
      let height = 31;
      list.push({
        type: 'line',
        bottom: 63,
        left: 120,
        style: {
          fill: '#333'
        },
        shape: {
          x1: 0,
          y1: 95,
          x2: 0,
          y2: 0
        }
      });
      for (let i = 0; i < num; i++) {
        list.push({
          type: 'line',
          bottom: bottom - i * height,
          right: 80,
          style: {
            fill: '#333'
          },
          shape: {
            x1: 0,
            y1: 0,
            x2: width * 0.92,
            y2: 0
          }
        });
      }
      return list;
    },
    initChart(name, idName, xData, yData1, yData2) {
      let lineList = this.getTableLine(3, idName);
      let option = {
        title: [{
          text: name,
          left: 'center',
          textStyle: {
            lineHeight: 20,
            fontSize: 25,
          },
        }],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#283b56'
            }
          }
        },
        legend: {
          left: 25,
          bottom: 68,
          orient:'vertical',
          itemGap: 15,
          data: ['让利金额', '均价涨幅']
        },
        grid: {
          bottom: 160,
          left: 120,
          right: 80,
        },
        xAxis: [{
          type: 'category',
          boundaryGap: true,
          data: xData,
          axisTick: {
            length: 96
          },
          axisLabel: {
            interval:0,
            rotate: 0,
            formatter(value, index) {
              return `{table|${value}}\n{table|${yData2[index]}}\n{table|${yData1[index]}%}`;
            },
            rich: {
              table: {
                lineHeight: 30,
                align: 'center',
              }
            }
          }
        }],
        yAxis: [{
          type: 'value',
          name: '万元',
          splitLine: {
            show: true
          },
          splitNumber: 3,
        },
          {
            type: 'value',
            name: '%',
            splitLine: {
              show: true
            },
            axisLabel: {
                formatter: '{value} %'
            },
            splitNumber: 3,
          }],
        series: [{
          name: '让利金额',
          yAxisIndex: 0,
          type: 'bar',
          symbol:'rect',
          symbolSize:'8',
          data: yData2,
          barWidth: 30,
          itemStyle: {
            normal: {
              barBorderRadius: [10, 10, 10, 10],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgb(74, 122, 180)'
              }, {
                offset: 1,
                color: 'rgb(74, 122, 180)'
              }]),
            }
          },
        }, {
          name: '均价涨幅',
          yAxisIndex: 1,
          type: 'line',
          symbol:'rect',
          symbolSize:'8',
          data: yData1,
          itemStyle: {
            normal: {
              color: 'rgb(161, 180, 212)',
              lineStyle: {
                width: 3,
                type: 'dotted',
              }
            }
          }
        }],
        graphic: lineList
      };


      let chart = document.getElementById(idName);
      echarts.init(chart).setOption(option);
    },
  }
})

    

</script>

<style>

</style>