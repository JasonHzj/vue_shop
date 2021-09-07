<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>LP数据</el-breadcrumb-item>
      <el-breadcrumb-item>页面排行</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card class="mb20">
      <el-row :gutter="20">
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

 <el-card>
    <el-row :gutter="24" class="mb20">
    <el-col class="tabledate" :span="2">
     <table class="phtab mt64" cellspacing="0">
           
              <tr v-for="item in dateList" :key="item.traceId">
                  <td>{{item}}</td>
              </tr>
           
          </table>
           <table class="phtab mt104" cellspacing="0">
           
           <tr v-for="item in dateList" :key="item.traceId">
                  <td>{{item}}</td>
              </tr>
           
          </table>
    </el-col>
    <el-col class="tablelist" :span="22">
      <el-col :span="8" v-for="(item,index) in tableList" :key="index">
          <table class="phtab" cellspacing="0">
              <tr>
                  <th colspan="4">{{item.name}}</th>
              </tr>
              <tr>
                  <td>访客数</td>
                  <td>点击率</td>
                  <td>跳失率</td>
                  <td>引导下单转化率</td>
              </tr>
              <tr v-for="(items,x) in item.children" :key="x">
                  <td>{{items.uv}}</td>
                  <td>{{items.clickRate | toPercent}}</td>
                  <td>{{items.bounceRate | toPercent}}</td>
                  <td>{{items.leOrderRate | toPercent}}</td>
              </tr>
            
          </table>
       
      </el-col>
    </el-col>
  
    </el-row>
    
     </el-card>
  </div>
</template>

<script>
import EchartsCoponent from '../Echarts/ech_mlist.vue'
import '../../assets/global.css'
export default {
  data() {
    return {
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
      dateList:[],
      lastName:[],
      tableList:[]
    }
  },
  components: {
    EchartsCoponent,
  },
  created() {
    this.onStarClick()
    this.getSmallData()
  },
  methods: {
    onStarClick() {
      const end = new Date()
      end.setTime(end.getTime() - 3600 * 1000 * 24)
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      this.value2 = [start, end]
    },
    async getSmallData() {
      const timeStar = this.$moment(this.value2[0]).format('YYYY-MM-DD')
      const timeEnd = this.$moment(this.value2[1]).format('YYYY-MM-DD')
      const item = {
        timeStar: timeStar,
        timeEnd: timeEnd,
      }
      const { data: res } = await this.$http.post(
        'https://shop.123hzj.com/ymlist/lpph',
        item
      )
      if (res.status !== 0) return this.$message.error(res.message)
        this.dateList = res.data.date
        this.lastName = res.data.lastName
        this.tableList = res.data.dataList
         //console.log(this.tableList);
      return res.data
    },
    async postDateUp() {
      //点击率
      
      this.getSmallData()
    },
   

 AAswitch (row) {
        const timeStar = this.$moment(row.date).format('YYYY-MM-DD')
      return timeStar
},
numFilter (row) {
      let str = Number(row.clickRate * 100).toFixed(2);
      let realVal = parseFloat(str).toFixed(2);
      
      realVal += "%";
      return realVal;
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
.phtab {font-size:11px;color:#333333;border-collapse: collapse; margin-bottom: 40px; text-align: center; width: 100%; border-right: 1px dotted #666666;}
.phtab th { background: #000000; font-weight:600; color: #ffffff;padding: 8px;}
.phtab td {padding: 8px;border-style: 
solid;border-color: #666666;background-color: #ffffff;

}
.el-col{padding:0 !important;}
.el-button{ margin-left: 20px;}
</style>
