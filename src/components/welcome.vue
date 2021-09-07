<template>
  <div>
    <!-- 卡片视图区域 -->
    <el-row :gutter="20" class="mb20">
      <el-col :span="5">
        <div class="textwel">Dashboard</div>
      </el-col>
      <el-col :span="4" :offset="10">
         <el-cascader
    v-model="valueName"
    :options="obdoptions"
    :props="{ expandTrigger: 'hover' }"
    placeholder="请选择活动"
    @change="handleChange"></el-cascader>
      </el-col>
      <el-col :span="5" :offset="0">
         
        <el-date-picker
          v-model="value2"
          type="daterange"
          align="right"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          @change="handerchangriqi"
        ></el-date-picker>
      </el-col>
    </el-row>

    <el-row :gutter="24" class="mb20">
      <el-col :span="10">
        <el-col class="mb20" :span="12" style="padding: 0 24px 0 0">
          <el-card>
            <div class="cardsa">
              <div class="float-end">
                <i class="iconfont icon-users widget-icon"></i>
              </div>
              <h5 class="text-muted fw-normal mt-0" title="全店访客">访客</h5>
              <h3 class="mt-3 mb-3">{{ quand.uv | thousandBitSeparator }}</h3>
              <p class="mb-0 text-muted">
                <span
                  class="me-2"
                  :class="[qdzf.uv > 0 ? 'text-danger' : 'text-success']"
                  ><i
                    class="iconfont"
                    :class="[
                      qdzf.uv > 0
                        ? 'icon-zhangfulei-shangsheng'
                        : 'icon-zhangfulei-xiajiang',
                    ]"
                  ></i>
                  {{ (qdzf.uv * 100) | numFilter }}%</span
                >
                <span class="text-nowrap">环比前{{ timeTs }}日</span>
              </p>
            </div>
          </el-card>
        </el-col>
        <el-col class="mb20" :span="12" style="padding: 0">
          <el-card>
            <div class="cardsa">
              <div class="float-end">
                <i class="iconfont icon-user dernge-icon"></i>
              </div>
              <h5 class="text-muted fw-normal mt-0" title="全店访客">
                首页访客
              </h5>
              <h3 class="mt-3 mb-3">{{ syfks.uv | thousandBitSeparator }}</h3>
              <p class="mb-0 text-muted">
                <span
                  class="me-2"
                  :class="[zbzf.zbuv > 0 ? 'text-danger' : 'text-success']"
                  ><i
                    class="iconfont"
                    :class="[
                      zbzf.zbuv > 0
                        ? 'icon-zhangfulei-shangsheng'
                        : 'icon-zhangfulei-xiajiang',
                    ]"
                  ></i>
                  {{ (zbzf.zbuv * 100) | numFilter }}%</span
                >
                <span class="text-nowrap"
                  >占比全店:<span class="text-zb"
                    >{{ (fjjezb.fkzb * 100) | numFilter }}%</span
                  ></span
                >
              </p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12" style="padding: 0 24px 0 0">
          <el-card>
            <div class="cardsa">
              <div class="float-end">
                <i
                  class="
                    iconfont
                    icon-jine
                    widget-icon
                    text-success
                    bg-success-lighten
                  "
                ></i>
              </div>
              <h5 class="text-muted fw-normal mt-0" title="全店">支付金额</h5>
              <h3 class="mt-3 mb-3">
                {{ quand.lePayAmt | thousandBitSeparator }}
              </h3>
              <p class="mb-0 text-muted">
                <span
                  class="me-2"
                  :class="[qdzf.lePayAmt > 0 ? 'text-danger' : 'text-success']"
                  ><i
                    class="iconfont"
                    :class="[
                      qdzf.lePayAmt > 0
                        ? 'icon-zhangfulei-shangsheng'
                        : 'icon-zhangfulei-xiajiang',
                    ]"
                  ></i
                  >{{ (qdzf.lePayAmt * 100) | numFilter }}%</span
                >
                <span class="text-nowrap">环比前{{ timeTs }}日</span>
              </p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12" style="padding: 0">
          <el-card>
            <div class="cardsa">
              <div class="float-end">
                <i
                  class="
                    iconfont
                    icon-jine
                    widget-icon
                    text-success
                    bg-success-lighten
                  "
                ></i>
              </div>
              <h5 class="text-muted fw-normal mt-0" title="全店">
                首页引导支付金额
              </h5>
              <h3 class="mt-3 mb-3">
                {{ syfks.lePayAmt | thousandBitSeparator }}
              </h3>
              <p class="mb-0 text-muted">
                <span
                  class="me-2"
                  :class="[
                    zbzf.zblePayAmt > 0 ? 'text-danger' : 'text-success',
                  ]"
                  ><i
                    class="iconfont"
                    :class="[
                      zbzf.zblePayAmt > 0
                        ? 'icon-zhangfulei-shangsheng'
                        : 'icon-zhangfulei-xiajiang',
                    ]"
                  ></i>
                  {{ (zbzf.zblePayAmt * 100) | numFilter }}%</span
                >
                <span class="text-nowrap"
                  >占比全店:<span class="text-zb"
                    >{{ (fjjezb.jezb * 100) | numFilter }}%</span
                  ></span
                >
              </p>
            </div>
          </el-card>
        </el-col>
      </el-col>
      <el-col :span="14">
        <el-card>
          <EchartsCoponent :chartData="zbsjph" />
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="24">
      <el-col :span="16">
        <el-card>
          <Echartsfkdb :chartData="fkdb" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="tablesy">
            <table>
              <tr>
                <td style="width:67px">所属页面</td>
                <td style="width:117px">模块名称</td>
                <td style="width:78px">点击次数</td>
                <td style="width:78px">点击人数</td>
                <td style="width:78px">点击率</td>
                <td style="width:78px">涨幅</td>
              </tr>
              </table>
     <vue-seamless-scroll :data="biaogelist" class="table-content">
       <ul>
          <li class="tablesy" v-for="(item,index) in biaogelist"  :key="index">
            <table>
              <tr>
                <td style="width:67px">{{item.name}}</td>
                <td style="width:117px">{{item.moduleEditTitle}}</td>
                <td style="width:78px">{{item.clickCnt}}</td>
                <td style="width:78px">{{item.clickUv}}</td>
                <td>{{(item.clickRate*100) | numFilter }}%</td>
                <td style="width:78px"><span :class="[
                    item.clickRateZF >= 0 ? 'text-danger' : 'text-success',
                  ]">
                  <i class="iconfont iconesfs" :class="[
                      item.clickRateZF > 0
                        ? 'icon-zhangfulei-shangsheng'
                        : 'icon-zhangfulei-xiajiang',
                    ]"></i>{{(item.clickRateZF*100) | numFilter }}%</span>
                </td>
              </tr>
              </table>
              </li>
              </ul>
              </vue-seamless-scroll>
            
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import EchartsCoponent from '../components/Echarts/ech_wel.vue'
import Echartsfkdb from '../components/Echarts/ech_fkdb.vue'
import '../assets/global.css'
export default {
  data() {
    return {
      obdoptions:[],
      valueName:[],
      checkList: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近三天',
            onClick(picker) {
              const end = new Date()
              end.setTime(end.getTime() - 3600 * 1000 * 24)
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              end.setTime(end.getTime() - 3600 * 1000 * 24)
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              end.setTime(end.getTime() - 3600 * 1000 * 24)
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              end.setTime(end.getTime() - 3600 * 1000 * 24)
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            },
          },
        ],
      },
      value2: '',
      ymData: [],
      valueName:[],
      timeS: [],
      quand: {}, //当前周期数据
      qdzf: {}, //涨幅数据
      syfks: {}, //首页访客数
      fjjezb: {}, //占比
      zbzf: {}, //占比涨幅
      timeTs: '', //天数
      week: '', //当前周数
      year: '', //当前年份
      csDate: [], //存储日期
      zbsjph: {}, //折线图
      fkdb: {}, //树状图
       singleHeight: 57,
        waitTime: 2000,
        step: 0.5,
        hoverStop: false ,
        biaogelist:[],//表格数据
    }
  },
  components: {
    EchartsCoponent,
    Echartsfkdb,
  },
  created() {
    this.onStarClick()
    this.getListName()
    this.doHandleDate() //当前年份
    this.getWeekOfYear() //当前周数
    this.cliDaterq() //按周划分日期
    this.getSmallData()
  },
  methods: {
   async onStarClick() {
      //7天数据
      const end = new Date()
      end.setTime(end.getTime() - 3600 * 1000 * 24)
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 15)
      this.value2 = [start, end]

//按活动查询
       const { data: resas } = await this.$http.get(
        'https://shop.123hzj.com/ymlist/hdsele',
      )
      if (resas.status !== 0) return this.$message.error(resas.message)
      this.obdoptions = resas.options
    },
    async getListName() {
      const timeStar = this.$moment(this.value2[0]).format('YYYY-MM-DD')
      const timeEnd = this.$moment(this.value2[1]).format('YYYY-MM-DD')
      const item = {
        timeStar: timeStar,
        timeEnd: timeEnd,
      }
      const { data: res } = await this.$http.post(
        'https://shop.123hzj.com/ymlist/qdfk',
        item
      )
      if (res.status !== 0) return this.$message.error(res.message)
      this.quand = res.data
      this.qdzf = res.tbdata
      this.timeTs = res.time
      this.syfks = res.syfks
      this.fjjezb = res.fjjezb
      this.zbzf = res.zbzf

      const { data: resas } = await this.$http.post(
        'https://shop.123hzj.com/ymlist/fksdb',
        item
      )
      if (resas.status !== 0) return this.$message.error(resas.message)
      this.fkdb = resas.data
      const { data: resus } = await this.$http.get(
        'https://shop.123hzj.com/ymlist/symkzf',
        item
      )
      if (resus.status !== 0) return this.$message.error(resus.message)
      this.biaogelist = resus.data
    },
    getMorenList() {
      //查询默认七天数据

      setTimeout((value) => {
        //点击率
        const lineclickRate = this.$refs.lineclickRate.$vnode.data
        this.getSmallData(this.checkList, lineclickRate).then((res) => {
          this.ClickRate = res
        })
      }, 500)
    },
    async getSmallData() {
      const timeStar = this.$moment(this.value2[0]).format('YYYY-MM-DD')
      const timeEnd = this.$moment(this.value2[1]).format('YYYY-MM-DD')
      const item = {
        qdsumData: this.csDate,
      }
      const { data: res } = await this.$http.post(
        'https://shop.123hzj.com/ymlist/zbzxt',
        item
      )
      if (res.status !== 0) return this.$message.error(res.message)
      this.zbsjph = res.data
    },
    async postDateUp() {
      this.checkList = []
      await this.getListName().then(() => {
        const lineclickRate = this.$refs.lineclickRate.$vnode.data
        this.getSmallData(this.checkList, lineclickRate).then((res) => {
          this.ClickRate = res.data
        })
      })
      //点击率
    },
    async handerchangriqi() {
      //监听日期变化
      this.getListName()
    },
 handleChange(value) {
   //监听活动变化
        this.value2 = value[1]
        this.getListName()
      },
    doHandleDate() {
      //获取当前年份
      var myDate = new Date()
      var tYear = myDate.getFullYear()
      var tMonth = myDate.getMonth()

      var m = tMonth + 1
      if (m.toString().length == 1) {
        m = '0' + m
      }
      this.year = tYear
      return tYear
    },
    getWeekOfYear() {
      //获取前周数
      var today = new Date()
      var firstDay = new Date(today.getFullYear(), 0, 1)
      var dayOfWeek = firstDay.getDay()
      var spendDay = 1
      if (dayOfWeek != 0) {
        spendDay = 7 - dayOfWeek + 1
      }
      firstDay = new Date(today.getFullYear(), 0, 1 + spendDay)
      var d = Math.ceil((today.valueOf() - firstDay.valueOf()) / 86400000)
      var result = Math.ceil(d / 7)
      this.week = result - 5
      return result - 5
    },
    weekGetDate(year, weeksold) {
      var weeks = weeksold + 5
      var date = new Date(year, '0', '1')
      var time = date.getTime() // 获取当前星期几,0:星期一
      var _week = date.getDay() //当这一年的1月1日为周日时则本年有54周,否则没有54周,没有则去除第54周的提示
      if (_week != 0) {
        //一年53周情况
        if (weeks == 54) {
          return '今年没有54周'
        }
        var cnt = 0 // 获取距离周末的天数
        if (_week == 0) {
          cnt = 7
        } else if (_week == 1) {
          cnt = 6
        } else if (_week == 2) {
          cnt = 5
        } else if (_week == 3) {
          cnt = 4
        } else if (_week == 4) {
          cnt = 3
        } else if (_week == 5) {
          cnt = 2
        } else if (_week == 6) {
          cnt = 1
        }
        cnt += 1 //加1表示以星期一为一周的第一天    // 将这个长整形时间加上第N周的时间偏移
        time += cnt * 24 * 3600000 //第2周开始时间
        var nextYear = new Date(parseInt(year, 10) + 1, '0', '1')
        var nextWeek = nextYear.getDay()
        var lastcnt = 0 //获取最后一周开始时间到周末的天数
        if (nextWeek == 0) {
          lastcnt = 6
        } else if (nextWeek == 1) {
          lastcnt = 0
        } else if (nextWeek == 2) {
          lastcnt = 1
        } else if (nextWeek == 3) {
          lastcnt = 2
        } else if (nextWeek == 4) {
          lastcnt = 3
        } else if (nextWeek == 5) {
          lastcnt = 4
        } else if (nextWeek == 6) {
          lastcnt = 5
        }
        if (weeks == 1) {
          //第1周特殊处理    // 为日期对象 date 重新设置成时间 time
          var start = this.$moment(date).format('YYYY-MM-DD')
          var end = date.setTime(time - 24 * 3600000)

          const item = {
            start: start,
            end: this.$moment(end).format('YYYY-MM-DD'),
          }
          return item
        } else if (weeks == 53) {
          //第53周特殊处理
          var start = time + (weeks - 2) * 7 * 24 * 3600000 //第53周开始时间
          var end =
            time +
            (weeks - 2) * 7 * 24 * 3600000 +
            lastcnt * 24 * 3600000 -
            24 * 3600000 //第53周结束时间
          date.setTime(start)
          var _start = this.$moment(date).format('YYYY-MM-DD')
          date.setTime(end)
          var _end = this.$moment(date).format('YYYY-MM-DD')
          const item = {
            start: _start,
            end: _end,
          }
          return item
        } else {
          var start = time + (weeks - 2) * 7 * 24 * 3600000 //第n周开始时间
          var end = time + (weeks - 1) * 7 * 24 * 3600000 - 24 * 3600000 //第n周结束时间
          date.setTime(start)
          var _start = this.$moment(date).format('YYYY-MM-DD')
          date.setTime(end)
          var _end = this.$moment(date).format('YYYY-MM-DD')
          const item = {
            start: _start,
            end: _end,
          }
          return item
        }
      } else {
        //一年54周情况
        var cnt = 0 // 获取距离周末的天数
        if (_week == 0 && weeks == 1) {
          //第一周
          cnt = 0
        } else if (_week == 0) {
          cnt = 7
        } else if (_week == 1) {
          cnt = 6
        } else if (_week == 2) {
          cnt = 5
        } else if (_week == 3) {
          cnt = 4
        } else if (_week == 4) {
          cnt = 3
        } else if (_week == 5) {
          cnt = 2
        } else if (_week == 6) {
          cnt = 1
        }
        cnt += 1 //加1表示以星期一为一周的第一天
        // 将这个长整形时间加上第N周的时间偏移
        time += 24 * 3600000 //第2周开始时间
        var nextYear = new Date(parseInt(year, 10) + 1, '0', '1')
        var nextWeek = nextYear.getDay()
        var lastcnt = 0 //获取最后一周开始时间到周末的天数
        if (nextWeek == 0) {
          lastcnt = 6
        } else if (nextWeek == 1) {
          lastcnt = 0
        } else if (nextWeek == 2) {
          lastcnt = 1
        } else if (nextWeek == 3) {
          lastcnt = 2
        } else if (nextWeek == 4) {
          lastcnt = 3
        } else if (nextWeek == 5) {
          lastcnt = 4
        } else if (nextWeek == 6) {
          lastcnt = 5
        }
        if (weeks == 1) {
          //第1周特殊处理
          var start = date.Format('yyyy-MM-dd')
          date.setTime(time - 24 * 3600000)
          alert(start + '--' + date)
          const item = {
            start: _start,
            end: date,
          }
          return item
        } else if (weeks == 54) {
          //第54周特殊处理
          var start = time + (weeks - 2) * 7 * 24 * 3600000 //第54周开始时间
          var end =
            time +
            (weeks - 2) * 7 * 24 * 3600000 +
            lastcnt * 24 * 3600000 -
            24 * 3600000 //第53周结束时间
          date.setTime(start)
          var _start = date.Format('yyyy-MM-dd')
          date.setTime(end)
          var _end = date.Format('yyyy-MM-dd')
          const item = {
            start: _start,
            end: _end,
          }
          return item
        } else {
          var start = time + (weeks - 2) * 7 * 24 * 3600000 //第n周开始时间
          var end = time + (weeks - 1) * 7 * 24 * 3600000 - 24 * 3600000 //第n周结束时间
          date.setTime(start)
          var _start = date.Format('yyyy-MM-dd')
          date.setTime(end)
          var _end = date.Format('yyyy-MM-dd')
          const item = {
            start: _start,
            end: _end,
          }
          return item
        }
      }
    },
    cliDaterq() {
      //处理日期
      var date = Number(this.week)
      for (var a = 1; a <= date; a++) {
        var item = this.weekGetDate(this.year, a)
        this.csDate.push(item)
      }
      //console.log(this.csDate)
    },
    AAswitch(row) {
      const timeStar = this.$moment(row.date).format('YYYY-MM-DD')
      return timeStar
    },
    numFilter(row) {
      let str = Number(row.clickRate * 100).toFixed(2)
      let realVal = parseFloat(str).toFixed(2)

      realVal += '%'
      return realVal
    },
  },
  filters: {
    numFilter(value) {
      // 截取当前数据到小数点后两位，尾数四舍五入
      let realVal = parseFloat(value).toFixed(2)
      return realVal
    },
    toPercent(point) {
      //小数转换百分比
      let str = Number(point * 100).toFixed(2)
      str += '%'
      return str
    },
    thousandBitSeparator(num) {
      let realVal = parseFloat(num).toFixed(0)
      realVal = realVal + '' //数字转字符串
      var str = '' //字符串累加
      for (var i = realVal.length - 1, j = 1; i >= 0; i--, j++) {
        if (j % 3 == 0 && i != 0) {
          //每隔三位加逗号，过滤正好在第一个数字的情况
          str += realVal[i] + ',' //加千分位逗号
          continue
        }
        str += realVal[i] //倒着累加数字
      }
      return str.split('').reverse().join('') //字符串=>数组=>反转=>字符串
    },
  },
}
</script>

<style lang="less" scoped>
.el-date-picker {
  zoom: 0.5;
}
.el-date-editor .el-range-separator {
  padding: 0 !important;
  margin: 0 5px !important;
}
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
.el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  width: 100%;
}
.el-checkbox {
  margin-bottom: 10px;
}
.el-button {
  width: 100%;
}
.textwel {
  font-size: 22px;
}

.float-end {
  float: right !important;
}
.widget-icon {
  color: #536de6;
  font-size: 20px;
  background-color: rgba(83, 109, 230, 0.25);
  height: 40px;
  width: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 3px;
  display: inline-block;
}

.dernge-icon {
  color: #f9c851;
  font-size: 20px;
  background-color: rgba(249, 200, 81, 0.25);
  height: 40px;
  width: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 3px;
  display: inline-block;
}

.text-success {
  color: #10c469 !important;
}

.bg-success-lighten {
  background-color: rgba(16, 196, 105, 0.25) !important;
}

.text-muted {
  color: #98a6ad !important;
}
.fw-normal {
  font-weight: 400 !important;
}
.mt-0 {
  margin-top: 0 !important;
}
.mb-3 {
  margin-bottom: 1.5rem !important;
}
.mt-3 {
  margin-top: 1.5rem !important;
}
.text-muted {
  color: #98a6ad !important;
}
.mb-0 {
  margin-bottom: 0 !important;
}
.text-success {
  color: #10c469 !important;
}
.me-2 {
  margin-right: 0.75rem !important;
}
.text-danger {
  color: #ff5b5b !important;
}
.text-nowrap {
  white-space: nowrap !important;
  float: right;
}
.h1,
.h2,
.h3,
.h4,
.h5,
.h6,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 10px 0;
  font-weight: 700;
}
h3 {
  font-size: 1.5rem;
  color: #6c757d !important;
}
.text-zb {
}

.tablesy table{
      position: relative;
    overflow: hidden;
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    background-color: #fff;
    font-size: 14px;
    color: #98a6ad;
    text-align: center;
}
.tablesy table th{border-bottom: 1px solid #ebeef5;line-height: 48px;}
.tablesy table td{border-bottom: 1px solid #ebeef5;line-height: 48px;}
.table-content {
    height: 376px;
    overflow: hidden;
}
.table-content ul{ padding: 0 !important; margin: 0 !important;}
.iconesfs{ float: left;}
</style>
