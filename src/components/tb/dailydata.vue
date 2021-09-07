<template>
  <div class="prs">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据同比</el-breadcrumb-item>
      <el-breadcrumb-item>日常</el-breadcrumb-item>
      <el-breadcrumb-item>日均</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="24" class="pasr">
      <el-col :span="4" :offset="15">
        <el-date-picker
          v-model="value1"
          type="monthrange"
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          @change="handerchangriqi"
        >
        </el-date-picker>
      </el-col>
      <el-col :span="1">
        <div class="tbs">同比</div>
      </el-col>
      <el-col :span="4">
        <el-date-picker
          v-model="value2"
          type="monthrange"
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          @change="handerchangriqi"
        >
        </el-date-picker>
      </el-col>
    </el-row>
    <!-- 卡片视图区域 -->
    <el-row class="mb20" :gutter="20">
      <el-col :span="4">
        
          <div class="card_box" @click="addbg(0,'pv')" :class="{active:0==nowIndex}">
            <h6>
              浏览量<i>M:{{ dqData.month }}</i>
            </h6>
            <h1>{{ dqData.pvB | thousandBitSeparator }}</h1>
            <span>{{ dqData.year }}Y: {{ dqData.pvA | thousandBitSeparator }}</span>
            <span
              ><i
                :class="[
                  dqData.pvzf > 0
                    ? 'el-icon-caret-top'
                    : 'el-icon-caret-bottom',
                ]"
                >{{ (dqData.pvzf * 100) | numFilter }}%</i
              ></span
            >
          </div>
        
      </el-col>
      <el-col :span="4">
        
          <div class="card_box" @click="addbg(1,'uv')" :class="{active:1==nowIndex}">
            <h6>
              访客数<i>M:{{ dqData.month }}</i>
            </h6>
            <h1>{{ dqData.uvB | thousandBitSeparator }}</h1>
            <span>{{ dqData.year }}Y: {{ dqData.uvA | thousandBitSeparator }}</span>
            <span
              ><i
                :class="[
                  dqData.uvzf > 0
                    ? 'el-icon-caret-top'
                    : 'el-icon-caret-bottom',
                ]"
                >{{ (dqData.uvzf * 100) | numFilter }}%</i
              ></span
            >
          </div>
       
      </el-col>
      <el-col :span="4">
       
          <div class="card_box" @click="addbg(2,'clickUv')" :class="{active:2==nowIndex}">
            <h6>
              点击人数<i>M:{{ dqData.month }}</i>
            </h6>
            <h1>{{ dqData.clickUvB | thousandBitSeparator }}</h1>
            <span>{{ dqData.year }}Y: {{ dqData.clickUvA | thousandBitSeparator }}</span>
            <span
              ><i
                :class="[
                  dqData.clickUvzf > 0
                    ? 'el-icon-caret-top'
                    : 'el-icon-caret-bottom',
                ]"
                >{{ (dqData.clickUvzf * 100) | numFilter }}%</i
              ></span
            >
          </div>
        
      </el-col>
      <el-col :span="4">
       
          <div class="card_box" @click="addbg(3,'clickRate')" :class="{active:3==nowIndex}">
            <h6>
              点击率<i>M:{{ dqData.month }}</i>
            </h6>
            <h1>{{ (dqData.clickRatezfB * 100) | numFilter }}%</h1>
            <span
              >{{ dqData.year }}Y: {{
                (dqData.clickRatezfA * 100) | numFilter
              }}%</span
            >
            <span
              ><i
                :class="[
                  dqData.clickRatezf > 0
                    ? 'el-icon-caret-top'
                    : 'el-icon-caret-bottom',
                ]"
                >{{ (dqData.clickRatezf * 100) | numFilter }}%</i
              ></span
            >
          </div>
     
      </el-col>

      <el-col :span="4">
       
          <div class="card_box" @click="addbg(4,'leOrderBuyerCnt')" :class="{active:4==nowIndex}">
            <h6>
              引导下单人数<i>M:{{ dqData.month }}</i>
            </h6>
            <h1>{{ dqData.leOrderBuyerCntB | thousandBitSeparator }}</h1>
            <span>{{ dqData.year }}Y: {{ dqData.leOrderBuyerCntA | thousandBitSeparator }}</span>
            <span
              ><i
                :class="[
                  dqData.leOrderBuyerCntzf > 0
                    ? 'el-icon-caret-top'
                    : 'el-icon-caret-bottom',
                ]"
                >{{ (dqData.leOrderBuyerCntzf * 100) | numFilter }}%</i
              ></span
            >
          </div>
        
      </el-col>

      <el-col :span="4">
          <div class="card_box" @click="addbg(5,'leOrderRate')" :class="{active:5==nowIndex}">
            <h6>
              引导下单转化率<i>M:{{ dqData.month }}</i>
            </h6>
            <h1>{{ (dqData.leOrderRateB * 100) | numFilter }}%</h1>
            <span
              >{{ dqData.year }}Y:{{
                (dqData.leOrderRateA * 100) | numFilter
              }}%</span
            >
            <span
              ><i
                :class="[
                  dqData.leOrderRatezf > 0
                    ? 'el-icon-caret-top'
                    : 'el-icon-caret-bottom',
                ]"
                >{{ (dqData.leOrderRatezf * 100) | numFilter }}%</i
              ></span
            >
          </div>
        
      </el-col>
    </el-row>
    <el-card>
      <!-- 图表 -->

      <el-row :gutter="24">
        <el-col :span="24">
          <EchartsZtorSt
            class="mb40"
            :chartData="clickCntOrPv"
            ref="lineuv"
            :clickName="active_text"
          />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import EchartsZtorSt from '../Echarts/ech_rctb.vue'
import '../../assets/global.css'
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '本月',
            onClick(picker) {
              picker.$emit('pick', [new Date(), new Date()])
            },
          },
          {
            text: '今年至今',
            onClick(picker) {
              const end = new Date()
              const start = new Date(new Date().getFullYear(), 0)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近六个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setMonth(start.getMonth() - 6)
              picker.$emit('pick', [start, end])
            },
          },
        ],
      },
      value1: '',
      value2: '',
      nowIndex: 0,
      active_text:'pv',
      ymData: [],
      timeS: [],
      datalist: [],
      titleName: ['点击次数', '浏览量'],
      clickCntOrPv: {}, //点击率
      leOrderRate: {}, //引导下单转化率
      clickCnt: {}, //点击次数
      clickUv: {}, //点击人数
      dbdata: {}, //以前数据
      dqData: {}, //当前数据
      timeTs: '', //天数
    }
  },
  components: {
    EchartsZtorSt,
  },
  created() {
    this.onStarStClick()
    this.getMorenList()
  },
  methods: {
    async onStarStClick() {
      //前一年和当年月份
      const start = new Date()
      start.setMonth(start.getMonth() - 13)
      this.value1 = [start, start]
      const startEnd = new Date()
      startEnd.setMonth(startEnd.getMonth() - 1)
      this.value2 = [startEnd, startEnd]
      //console.log(this.value1, this.value2)
    },
    handerchangriqi() {
      //监听日期变化
      this.getMorenList()
    },
    async getMorenList() {
      const rcA = this.$moment(this.value1[0]).format('YYYY')
      const rcC = this.$moment(this.value2[0]).format('YYYY')
      const rcAmStar = this.$moment(this.value1[0]).format('M')
      const rcAmEnd = this.$moment(this.value1[1]).format('M')
      const rcBmStar = this.$moment(this.value2[0]).format('M')
      const rcBmEnd = this.$moment(this.value2[1]).format('M')
      const rcB = this.week(rcAmStar, rcAmEnd)
      const rcD = this.week(rcBmStar, rcBmEnd)
      const item = {
        rcA: rcA,
        rcB: rcB,
        rcC: rcC,
        rcD: rcD,
      }
      const { data: res } = await this.$http.post(
        'https://shop.123hzj.com/ymlist/hdrc',
        item
      )
      if (res.status !== 0) return this.$message.error(res.message)
      this.dqData = res.data
      //查询默认当月数据
      const lineuv = this.$refs.lineuv.$vnode.data
      const items = {
        clickName: lineuv.attrs.clickName, //查询字段名称
      }
      const { data: resse } = await this.$http.post(
        'https://shop.123hzj.com/ymlist/hdrctb',
        items
      )
      if (resse.status !== 0) return this.$message.error(resse.message)
      this.clickCntOrPv = resse
    },

    week(arr, arr2) {
      let a = parseInt(arr)
      let b = parseInt(arr2)
      let c = []
      if (arr - b < 0) {
        const number = Math.abs(a - b) + 1
        for (let i = a; i < a + number; i++) {
          c.push(i)
        }
      } else if (a - b === 0) {
        c.push(a)
      } else if (a - b > 0) {
        const number = Math.abs(a - b)
        for (let i = a; i > number; i--) {
          c.push(i)
        }
      }
      return c
    },
 async addbg (index, active_text) {

this.nowIndex = index;
this.active_text= active_text;
  //查询默认当月数据
  //console.log(this.active_text);
 this.getMorenList()
}
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
      num = num + '' //数字转字符串
      var str = '' //字符串累加
      for (var i = num.length - 1, j = 1; i >= 0; i--, j++) {
        if (j % 3 == 0 && i != 0) {
          //每隔三位加逗号，过滤正好在第一个数字的情况
          str += num[i] + ',' //加千分位逗号
          continue
        }
        str += num[i] //倒着累加数字
      }
      return str.split('').reverse().join('') //字符串=>数组=>反转=>字符串
    },
  },
}
</script>

<style lang="less" scoped>
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
.el-icon-caret-top {
  color: #f56c6c;
}
.el-icon-caret-bottom {
  color: #67c23a;
}
.card_box {
  padding: 20px;
  background: #ffffff;
  border-radius: 2px;
  box-shadow: 5px 10px 10px #bbbbbb ; cursor: pointer;
  transition: all .6s; -webkit-transition: all .6s;
}
.card_box h1 {
  margin: 17px 0px;
  font-size: 2.5rem;
  color: #6c757d !important;
}
.card_box h6 {
  font-size: 18px;
  color: #98a6ad !important;
}
.card_box h6 i {
  float: right;
  font-size: 14px;
  line-height: 21px;
  color: #98a6ad !important;
}
.card_box span {
  font-size: 14px;
  color: #98a6ad !important;
}
.card_box span:last-child {
  float: right;
}
.el-date-editor {
  width: 100% !important;
}
.tbs {
  line-height: 40px;
  font-size: 1.2rem;
  text-align: center;
}
.prs {
  position: relative;
}
.pasr {
  position: absolute;
  top: -11px;
  right: 0px;
  width: 100%;
}
.el-breadcrumb {
  margin-bottom: 33px !important;
  margin-top: 27px;
}
.el-col-1 {
  padding: 0 !important;
}
.active{box-shadow: 0 2px 2px 0 rgba(0,0,0,.2) !important;}
</style>
