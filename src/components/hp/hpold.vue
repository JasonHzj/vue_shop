<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>HP数据</el-breadcrumb-item>
      <el-breadcrumb-item>首页总体数据</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-row class="mb20" :gutter="20">
      <el-col :span="6">
        <el-card>
          <div class="card_box">
            <h6>浏览量</h6>
            <h1>{{dqData.pv | thousandBitSeparator}}</h1>
            <span>较前{{timeTs}}日</span>
            <span><i :class="[dbdata.pv > 0?'el-icon-top':'el-icon-bottom']">{{dbdata.pv * 100 | numFilter}}%</i></span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
         <div class="card_box">
            <h6>访客数</h6>
            <h1>{{dqData.uv | thousandBitSeparator}}</h1>
            <span>较前{{timeTs}}日</span>
            <span><i :class="[dbdata.uv > 0?'el-icon-top':'el-icon-bottom']">{{dbdata.uv * 100 | numFilter}}%</i></span>
          </div>  
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="card_box">
            <h6>点击人数</h6>
           <h1>{{dqData.clickUv | thousandBitSeparator}}</h1>
            <span>较前{{timeTs}}日</span>
            <span><i :class="[dbdata.clickUv > 0?'el-icon-top':'el-icon-bottom']">{{dbdata.clickUv * 100 | numFilter}}%</i></span>
          </div>
           </el-card>
      </el-col>
      <el-col :span="6">
        <el-card> 
          <div class="card_box">
            <h6>点击率</h6>
            <h1>{{(dqData.clickUv / dqData.uv)*100 | numFilter}}%</h1>
            <span>较前{{timeTs}}日</span>
            <span><i :class="[dbdata.clickRate > 0?'el-icon-top':'el-icon-bottom']">{{dbdata.clickRate * 100 | numFilter}}%</i></span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-card>
      <!-- 图表 -->
      <el-row class="mb40" :gutter="20">
        <el-col :span="6">
          <el-date-picker
            v-model="value2"
            type="daterange"
            align="right"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-col>

        <el-col :span="3">
          <el-button type="primary" @click="postDateUp">确认</el-button>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="24">
          <EchartsZtorSt
            class="mb40"
            :chartData="clickCntOrPv"
            ref="lineuv"
            ClickRate="date,clickRate,moduleEditTitle"
            echTitleName="首页点击次数及浏览量"
            line="line"
            uclickName="clickCnt"
          />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import EchartsCoponent from '../Echarts/ech_date.vue'
import EchartsSzt from '../Echarts/ech_szt.vue'
import EchartsZtorSt from '../Echarts/ech_ztorst.vue'
import '../../assets/global.css'
export default {
  data() {
    return {
      checkList: ['吸顶', 'KV轮播弹窗', '优惠券'],
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
      timeS: [],
      datalist: [],
      titleName: ['点击次数', '浏览量'],
      clickCntOrPv: {}, //点击率
      leOrderRate: {}, //引导下单转化率
      clickCnt: {}, //点击次数
      clickUv: {}, //点击人数
      dbdata:{},//以前数据
      dqData:{},//当前数据
      timeTs:'',//天数
    }
  },
  components: {
    EchartsCoponent,
    EchartsSzt,
    EchartsZtorSt,
  },
  created() {
    this.onStarStClick()
    this.getMorenList()
  },
  methods: {
    onStarClick() {
      //七天数据
      const end = new Date()
      end.setTime(end.getTime() - 3600 * 1000 * 24)
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      this.value2 = [start, end]
      console.log(this.value2)
    },
    onStarStClick() {
      //30天数据
      const end = new Date()
      end.setTime(end.getTime() - 3600 * 1000 * 24)
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      this.value2 = [start, end]
    },
    getMorenList() {
      //查询默认七天数据

      setTimeout((value) => {
        //点击率
        const lineuv = this.$refs.lineuv.$vnode.data
        this.getSmallData(this.titleName, lineuv).then((res) => {
          this.clickCntOrPv = res
        })
    
      })
    },
    async getSmallData(value, refConter) {
      const timeStar = this.$moment(this.value2[0]).format('YYYY-MM-DD')
      const timeEnd = this.$moment(this.value2[1]).format('YYYY-MM-DD')
      const item = {
        timeStar: timeStar,
        timeEnd: timeEnd,
        fieldName: refConter.attrs.ClickRate, //查询字段名称
        checkArr: value,
        type: refConter.attrs.line, //获取图标类型
        titleName: refConter.attrs.echTitleName,
        uclickName: refConter.attrs.uclickName,
      }
      const { data: res } = await this.$http.post(
        'https://shop.123hzj.com/ymlist/hpsum',
        item
      )
      if (res.status !== 0) return this.$message.error(res.message)
       this.dbdata = res.dbdata
       this.dqData = res.dqData
       this.timeTs = res.time
      return res.data
    },
    async postDateUp() {
      //点击率
      const lineuv = this.$refs.lineuv.$vnode.data
      this.getSmallData(this.titleName, lineuv).then((res) => {
        this.clickCntOrPv = res
      })
    
    },
  },
    filters: {
    numFilter(value) {
      // 截取当前数据到小数点后两位，尾数四舍五入
      let realVal = parseFloat(value).toFixed(2);
      return realVal;
    },
    toPercent(point) {
      //小数转换百分比
      let str = Number(point * 100).toFixed(2);
      str += "%";
      return str;
    },
thousandBitSeparator(num){
			 num=num+'';//数字转字符串
			  var str="";//字符串累加
			  for(var i=num.length- 1,j=1;i>=0;i--,j++){
			      if(j%3==0 && i!=0){//每隔三位加逗号，过滤正好在第一个数字的情况
			          str+=num[i]+",";//加千分位逗号
			          continue;
			      }
			      str+=num[i];//倒着累加数字
			  }
			  return str.split('').reverse().join("");//字符串=>数组=>反转=>字符串
			}
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
.el-icon-top{
  color: #f56c6c;
}
.el-icon-bottom{
  color: #67c23a;
}
.card_box {
 height: 117px;
}
.card_box h1{     margin: 15px 0px;
    font-size: 42px;}
.card_box h6{ font-size: 18px;}
.card_box span{font-size: 16px;}
.card_box span:last-child{
  float:right;
}
</style>
