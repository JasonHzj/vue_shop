<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>HP数据</el-breadcrumb-item>
      <el-breadcrumb-item>HP数据细分</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card class="mb20">
      <el-row class="mb10">
        <el-col :span="24">
          <el-checkbox-group
            v-model="checkList"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox
              v-for="item in titleName"
              :label="item.name"
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
            @change="dispsrsChange"
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
                <EchartsSzt
            :chartData="avgStayTime"
            ref="barAvgStayTime"
            ClickRate="date,avgStayTime,name"
            echTitleName="平均停留时长"
            line="bar"
            uclickName="avgStayTime"
          />
           </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <EchartsZtorSt
            :chartData="clickCntOrPv"
            ref="lineclickCntOrPv"
            ClickRate="date,pv,clickCnt,name"
            echTitleName="点击次数&浏览量"
            line="clickCntOrPv"
            uclickName="clickCntOrPv"
          />
          </el-card>
        </el-col>
      </el-row>


    
      <el-row :gutter="24" class="mb20">
        <el-col :span="12">
          <el-card>
          <EchartsCoponent
            :chartData="ClickRate"
            ref="lineclickRate"
            ClickRate="date,clickRate,name"
            echTitleName="点击率"
            line="line"
            uclickName="clickRate"
          />
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
          <EchartsCoponent
            :chartData="leOrderRate"
            ref="lineLeOrderRate"
            ClickRate="date,leOrderRate,name"
            echTitleName="引导下单转化率"
            line="line"
            uclickName="leOrderRate"
          />
          </el-card>
        </el-col>
      </el-row>
    <el-row :gutter="24" class="mb20">
        <el-col :span="24">
           <el-card>
                <EchartsSzt
            :chartData="avguv"
            ref="barAvgUv"
            ClickRate="date,uv,name"
            echTitleName="访客数"
            line="uv"
            uclickName="uv"
          />
           </el-card>
        </el-col>
        
      </el-row>
  </div>
</template>

<script>
import EchartsCoponent from '../Echarts/ech_date.vue'
import EchartsSzt from '../Echarts/ech_sztAg.vue'
import EchartsZtorSt from '../Echarts/ech_ztorst2.vue'
import '../../assets/global.css'
export default {
  data () {
    return {
      checkList: ['默认首页'],
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
      avgStayTime: {},//平均停留时长
      clickCntOrPv: {},//点击次数&浏览量
      avguv: {},//访客数
    }
  },
  components: {
    EchartsCoponent,
    EchartsSzt,
    EchartsZtorSt
  },
  created () {
    this.onStarClick()
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
    },
    async getListName () {
      const timeStar = this.$moment(this.value2[0]).format('YYYY-MM-DD')
      const timeEnd = this.$moment(this.value2[1]).format('YYYY-MM-DD')
        const item = {
        timeStar: timeStar,
        timeEnd: timeEnd
        }
      const { data: res } = await this.$http.post(
        'https://shop.123hzj.com/ymlist/hpname',item
      )
      if (res.status !== 0) return this.$message.error(res.message)
      this.titleName = JSON.parse(JSON.stringify(res.data))
      return res.data
    },
    getMorenList () {
      //查询默认七天数据

      setTimeout((value) => {
        //点击率
        const lineclickRate = this.$refs.lineclickRate.$vnode.data
        this.getSmallData(this.checkList, lineclickRate).then(res => {
          this.ClickRate = res
        })
        // //引导下单转化率
        const lineLeOrderRate = this.$refs.lineLeOrderRate.$vnode.data
        this.getSmallData(this.checkList, lineLeOrderRate).then(res => {
          this.leOrderRate = res
        })
        //点击次数
        const barAvgStayTime = this.$refs.barAvgStayTime.$vnode.data
        this.getSmallData(this.checkList, barAvgStayTime).then(res => {
          this.avgStayTime = res
        })
        //点击人数
        const lineclickCntOrPv = this.$refs.lineclickCntOrPv.$vnode.data
        this.getSmallData(this.checkList, lineclickCntOrPv).then(res => {
          this.clickCntOrPv = res
        })
        //访客数
      const barAvgUv = this.$refs.barAvgUv.$vnode.data
      this.getSmallData(this.checkList, barAvgUv).then(res => {
        this.avguv = res
      })
      })

    },
    async getSmallData (value, refConter) {
      const timeStar = this.$moment(this.value2[0]).format('YYYY-MM-DD')
      const timeEnd = this.$moment(this.value2[1]).format('YYYY-MM-DD')
      const item = {
        timeStar: timeStar,
        timeEnd: timeEnd,
        fieldName: refConter.attrs.ClickRate,//查询字段名称
        checkArr: value,
        type: refConter.attrs.line, //获取图标类型
        titleName: refConter.attrs.echTitleName,
        uclickName: refConter.attrs.uclickName
      }
      const { data: res } = await this.$http.post(
        'https://shop.123hzj.com/ymlist/hpnamecheck', item
      )
      if (res.status !== 0) return this.$message.error(res.message)
      return res.data
    },
    async postDateUp () {
      //点击率
      const lineclickRate = this.$refs.lineclickRate.$vnode.data
      this.getSmallData(this.checkList, lineclickRate).then(res => {
        this.ClickRate = res
      })
      //引导下单转化率
      const lineLeOrderRate = this.$refs.lineLeOrderRate.$vnode.data
      this.getSmallData(this.checkList, lineLeOrderRate).then(res => {
        this.leOrderRate = res
      })
      //点击次数
      const barAvgStayTime = this.$refs.barAvgStayTime.$vnode.data
      this.getSmallData(this.checkList, barAvgStayTime).then(res => {
        this.avgStayTime = res
      })
      //点击人数
      const lineclickCntOrPv = this.$refs.lineclickCntOrPv.$vnode.data
      this.getSmallData(this.checkList, lineclickCntOrPv).then(res => {
        this.clickCntOrPv = res
      })
 //访客数
      const barAvgUv = this.$refs.barAvgUv.$vnode.data
      this.getSmallData(this.checkList, barAvgUv).then(res => {
        this.avguv = res
      })


    },
    async handleCheckedCitiesChange (value) {
      //监听check变化
      //点击率
      const lineclickRate = this.$refs.lineclickRate.$vnode.data
      this.getSmallData(value, lineclickRate).then(res => {
        this.ClickRate = res
      })
  //引导下单转化率
      const lineLeOrderRate = this.$refs.lineLeOrderRate.$vnode.data
      this.getSmallData(value, lineLeOrderRate).then(res => {
        this.leOrderRate = res
      })
      //点击次数
      const barAvgStayTime = this.$refs.barAvgStayTime.$vnode.data
      this.getSmallData(value, barAvgStayTime).then(res => {
        this.avgStayTime = res
      })
      //点击人数
      const lineclickCntOrPv = this.$refs.lineclickCntOrPv.$vnode.data
      this.getSmallData(value, lineclickCntOrPv).then(res => {
        this.clickCntOrPv = res
      })
      //访客数
      const barAvgUv = this.$refs.barAvgUv.$vnode.data
      this.getSmallData(this.checkList, barAvgUv).then(res => {
        this.avguv = res
      })
    },
    async dispsrsChange () {
      this.checkList = []
     const res =  this.getListName()
      res.then(result => {
        result.forEach(item => {
          this.checkList.push(item.name)
        });
      })
     console.log(this.checkList);
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
</style>
