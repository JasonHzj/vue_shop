<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>模块数据</el-breadcrumb-item>
      <el-breadcrumb-item>模块数据对比</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card class="mb20">
      <el-row class="mb10 boder-b-t">
        <el-col :span="24">
          <el-checkbox-group
            v-model="renqunList"
            @change="handleCheckednameChange"
          >
            <el-checkbox
              v-for="item in renqunName"
              :label="item.name"
              :key="item.traceId"
              name="type"
            ></el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>
      <el-row class="mb10">
        <el-col :span="24">
          <el-checkbox-group
            v-model="checkList"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox
              v-for="item in titleName"
              :label="item.moduleEditTitle"
              :key="item.traceId"
              name="type"
            ></el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>
      <el-row  :gutter="20">
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
</el-card>


 <el-row :gutter="24" class="mb20">
        <el-col :span="12">
           <el-card>
          <EchartsCoponent
            :chartData="ClickRate"
            ref="lineclickRate"
            ClickRate="name,date,clickRate,moduleEditTitle"
            echTitleName="点击率"
            line="line"
            uclickName="clickRate"
          />
           </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
          <EchartsSzt
            :chartData="clickCnt"
            ref="lineclickCnt"
            ClickRate="name,date,clickCnt,moduleEditTitle"
            echTitleName="点击次数"
            line="bar"
            uclickName="clickCnt"
          />
          </el-card>
        </el-col>
      </el-row>


    
      <el-row :gutter="24">
        <el-col :span="12">
          <el-card>
          <EchartsCoponent
            :chartData="leOrderRate"
            ref="lineLeOrderRate"
            ClickRate="name,date,leOrderRate,moduleEditTitle"
            echTitleName="引导下单转化率"
            line="line"
            uclickName="leOrderRate"
          />
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
          <EchartsSzt
            :chartData="clickUv"
            ref="lineclickUv"
            ClickRate="name,date,clickUv,moduleEditTitle"
            echTitleName="点击人数"
            line="bar"
            uclickName="clickUv"
          />
          </el-card>
        </el-col>
      </el-row>
   
  </div>
</template>

<script>
import EchartsCoponent from '../Echarts/ech_date.vue'
import EchartsSzt from '../Echarts/ech_szt.vue'
import '../../assets/global.css'
export default {
  data () {
    return {
      renqunList:["默认首页"],
      renqunName:[],
      checkList: ['吸顶', 'KV轮播弹窗', '优惠券'],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近三天',
            onClick (picker) {
              const end = new Date()
              end.setTime(end.getTime() - 3600 * 1000 * 24)
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              end.setTime(end.getTime() - 3600 * 1000 * 24)
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              end.setTime(end.getTime() - 3600 * 1000 * 24)
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近三个月',
            onClick (picker) {
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
      titleName: [],
      ClickRate: {}, //点击率
      leOrderRate: {},//引导下单转化率
      clickCnt: {},//点击次数
      clickUv: {},//点击人数
    }
  },
  components: {
    EchartsCoponent,
    EchartsSzt
  },
  created () {
    this.onStarClick()
    this.ymtitlerq()
    this.getListName()
    this.getMorenList()

  },
  methods: {
    onStarClick () {
      const end = new Date()
      end.setTime(end.getTime() - 3600 * 1000 * 24)
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      this.value2 = [start, end]
      console.log(this.value2);
    },
      async ymtitlerq () {
        const timeStar = this.$moment(this.value2[0]).format('YYYY-MM-DD')
      const timeEnd = this.$moment(this.value2[1]).format('YYYY-MM-DD')
        const item = {
       timeStar: timeStar,
        timeEnd: timeEnd,
      }
      const { data: res } = await this.$http.post(
        'https://shop.123hzj.com/ymlist/ymtitlerq',item
      )
      if (res.status !== 0) return this.$message.error(res.message)
      this.renqunName = JSON.parse(JSON.stringify(res.data))
    },
    async getListName () {
      const timeStar = this.$moment(this.value2[0]).format('YYYY-MM-DD')
      const timeEnd = this.$moment(this.value2[1]).format('YYYY-MM-DD')
        const item = {
       timeStar: timeStar,
        timeEnd: timeEnd,
        renqunList:this.renqunList,
      }
      const { data: res } = await this.$http.post(
        'https://shop.123hzj.com/ymlist/ymtitlename',item
      )
      if (res.status !== 0) return this.$message.error(res.message)
      this.titleName = JSON.parse(JSON.stringify(res.data))
    },
    getMorenList () {
      //查询默认七天数据

      setTimeout((value) => {
        //点击率
        const lineclickRate = this.$refs.lineclickRate.$vnode.data
        this.getSmallData(this.checkList,this.renqunList, lineclickRate).then(res => {
          this.ClickRate = res
        })
        //引导下单转化率
        const lineLeOrderRate = this.$refs.lineLeOrderRate.$vnode.data
        this.getSmallData(this.checkList,this.renqunList, lineLeOrderRate).then(res => {
          this.leOrderRate = res
        })
        //点击次数
        const lineclickCnt = this.$refs.lineclickCnt.$vnode.data
        this.getSmallData(this.checkList,this.renqunList, lineclickCnt).then(res => {
          this.clickCnt = res
        })
        //点击人数
        const lineclickUv = this.$refs.lineclickUv.$vnode.data
        this.getSmallData(this.checkList,this.renqunList, lineclickUv).then(res => {
          this.clickUv = res
        })
      })

    },
    async getSmallData (value,rqName, refConter) {
      const timeStar = this.$moment(this.value2[0]).format('YYYY-MM-DD')
      const timeEnd = this.$moment(this.value2[1]).format('YYYY-MM-DD')
      const item = {
        timeStar: timeStar,
        timeEnd: timeEnd,
        fieldName: refConter.attrs.ClickRate,//查询字段名称
        checkArr: value,
        type: refConter.attrs.line, //获取图标类型
        titleName: refConter.attrs.echTitleName,
        uclickName: refConter.attrs.uclickName,
        renqunList:rqName
      }
      const { data: res } = await this.$http.post(
        'https://shop.123hzj.com/ymlist/ymcheck', item
      )
      if (res.status !== 0) return this.$message.error(res.message)
      return res.data
    },
    async postDateUp () {
      //点击率
      const lineclickRate = this.$refs.lineclickRate.$vnode.data
      this.getSmallData(this.checkList,this.renqunList, lineclickRate).then(res => {
        this.ClickRate = res
      })
      //引导下单转化率
      const lineLeOrderRate = this.$refs.lineLeOrderRate.$vnode.data
      this.getSmallData(this.checkList,this.renqunList, lineLeOrderRate).then(res => {
        this.leOrderRate = res
      })
      //点击次数
      const lineclickCnt = this.$refs.lineclickCnt.$vnode.data
      this.getSmallData(this.checkList,this.renqunList, lineclickCnt).then(res => {
        this.clickCnt = res
      })
      //点击人数
      const lineclickUv = this.$refs.lineclickUv.$vnode.data
      this.getSmallData(this.checkList,this.renqunList, lineclickUv).then(res => {
        this.clickUv = res
      })



    },
    async handleCheckedCitiesChange (value) {
      //监听check变化
      //点击率
      const lineclickRate = this.$refs.lineclickRate.$vnode.data
      this.getSmallData(value,this.renqunList, lineclickRate).then(res => {
        this.ClickRate = res
      })
      //引导下单转化率
      const lineLeOrderRate = this.$refs.lineLeOrderRate.$vnode.data
      this.getSmallData(value,this.renqunList, lineLeOrderRate).then(res => {
        this.leOrderRate = res
      })
      //点击次数
      const lineclickCnt = this.$refs.lineclickCnt.$vnode.data
      this.getSmallData(value,this.renqunList, lineclickCnt).then(res => {
        this.clickCnt = res
      })
      //点击人数
      const lineclickUv = this.$refs.lineclickUv.$vnode.data
      this.getSmallData(value,this.renqunList, lineclickUv).then(res => {
        this.clickUv = res
      })
    },
    async handleCheckednameChange (value) {
      this.getListName()
        const lineclickRate = this.$refs.lineclickRate.$vnode.data
      this.getSmallData(this.checkList,value, lineclickRate).then(res => {
        this.ClickRate = res
      })
      //引导下单转化率
      const lineLeOrderRate = this.$refs.lineLeOrderRate.$vnode.data
      this.getSmallData(this.checkList,value, lineLeOrderRate).then(res => {
        this.leOrderRate = res
      })
 //点击次数
      const lineclickCnt = this.$refs.lineclickCnt.$vnode.data
      this.getSmallData(this.checkList,value, lineclickCnt).then(res => {
        this.clickCnt = res
      })
      //点击人数
      const lineclickUv = this.$refs.lineclickUv.$vnode.data
      this.getSmallData(this.checkList,value, lineclickUv).then(res => {
        this.clickUv = res
      })



    }
  }
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
.boder-b-t{ border-bottom: 1px dotted #d6d6d6;}
</style>
