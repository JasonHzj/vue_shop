<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据源管理</el-breadcrumb-item>
      <el-breadcrumb-item>采集数据</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-row :gutter="24">
         <el-col :span="2">
          <el-button type="warning" @click="gxData">更新数据</el-button>
        </el-col>
        <el-col :span="6" :offset="14">
          <!-- 搜索与添加 -->
          <el-date-picker
            v-model="value2"
            type="daterange"
            align="center"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-col>
        <el-col :span="2" >
          <el-button type="primary" @click="yzData">开始采集</el-button>
        </el-col>
        
      </el-row>
      <el-row :gutter="20" v-bind:class="{ selected: Members }">
        <el-col :span="6">
          {{ caijiText }}
          <el-progress
            :text-inside="true"
            :stroke-width="26"
            :percentage="percentage"
          ></el-progress>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-bind:class="{ selected: MembersUp }">
        <el-col :span="6">
          {{ uPdataText }}
          <el-progress
            :text-inside="true"
            :stroke-width="26"
            :percentage="percentageUp"
            status="success"
          ></el-progress>
        </el-col>
      </el-row>
      <!-- 用户列表区域  -->
      <el-table
        :data="
          syData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        border
        stripe
      >
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column
          label="模块名称"
          prop="moduleEditTitle"
        ></el-table-column>
        <el-table-column label="点击次数" prop="clickCnt"></el-table-column>
        <el-table-column label="点击人数" prop="clickUv"></el-table-column>
        <el-table-column label="点击率" prop="clickRate"></el-table-column>
      </el-table>
      <!-- 分页区 -->
      <el-pagination
        align="left"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="syData.length"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
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
      timeS: [],
      syData: [],
      sqlData: [],
      Members: true,
      MembersUp: true,
      percentage: 0,
      percentageUp: 0,
      timer: '',
      caijiText: '正在采集数据，请勿刷新页面...',
      uPdataText: '正在上传数据，请勿刷新页面...',
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 10, // 每页的数据条数
      LpDataList: [], //lp列表
      lpData: {}, //lp数据
      hpData: {}, //HP数据
      qdData: {}, //全店数据
      yzsj:[]
    }
  },
  created() {
    this.getLpData()
  },
  methods: {
   async gxData(){
       const ends = new Date()
       ends.setTime(ends.getTime() - 3600 * 1000 * 24)
      const end = this.$moment(ends).format('YYYY-MM-DD')

        const { data: res } = await this.$http.get(
        'https://shop.123hzj.com/ymlist/gxsj'
      )
      if (res.status !== 0) return this.$message.error(res.message)
        const star = this.$moment(res.data[0].date).format('YYYY-MM-DD')
        var sssde = this.$moment(res.data[0].date).valueOf() + 3600 * 1000 * 24
        const starS = this.$moment(sssde).format('YYYY-MM-DD')
        this.value2 = [starS,end]
      if(end == star)  {
        this.gxstrs()
        this.value2 = [star,end]
      }else{
       this.getListDate()
      }
    },
    async getLpData() {
      const { data: lpList } = await this.$http.get(
        'https://sycm.taobao.com/bda/decorate/wl/config/listAllShopPages.json'
      )
      if (lpList.code !== 0) return this.$message.error('获取数据失败')
      lpList.data.list.forEach((resname) => {
        const item = {
          name: resname.name,
          pageId:resname.pageId,
          pageType: resname.pageType,
          spmb: resname.pageType + '_3265150369_' + resname.pageId,
        }
        this.LpDataList.push(item)
      })
    },
    async yzData(){
      const timeStar = this.$moment(this.value2[0]).format('YYYY-MM-DD')
      const timeEnd = this.$moment(this.value2[1]).format('YYYY-MM-DD')
      const item = {
        timeStar: timeStar,
        timeEnd: timeEnd,
      }
      const { data: res } = await this.$http.post(
        'https://shop.123hzj.com/ymlist/yzsj',
        item
      )
      if (res.status == 1){
        this.getListDate()
      }else{
        var hues = []
        res.data.forEach(item =>{
          hues.push(this.$moment(item.date).format('YYYY-MM-DD'))
        })
        this.yzstrs(hues)
      }
      
    },
    async getListDate() {
      //采集模板数据
      const timeStar = this.$moment(this.value2[0]).format('YYYY-MM-DD')
      const timeEnd = this.$moment(this.value2[1]).format('YYYY-MM-DD')
      this.timeS = this.timeS.concat(this.getdiffdate(timeStar, timeEnd))
      //console.log(this.timeS)
      this.Members = false

      var qdsumData = []
      //采集模块数据
      for (var r = 0; r < this.LpDataList.length; r++) {
       if (this.LpDataList[r].pageType == 'shop/index2') {
      for (var a = 0; a < this.timeS.length; a++) {
        const { data: res } = await this.$http.get(
          `https://alisite.m.taobao.com/minidata/shop/index/sycm.htm?pathInfo=shop/index2&userId=3265150369&shopId=288498688&pageId=${this.LpDataList[r].pageId}&recodeDate=${this.timeS[a]}`
        )
        if (res.status !== 0) return this.$message.error('获取信息失败')
    
        const { data: resa } = await this.$http.get(
          `https://sycm.taobao.com/flow/v2/decorate/wl/getPageDetailData.json?appType=20&dateRange=${this.timeS[a]}%7C${this.timeS[a]}&dateType=day&pageId=${this.LpDataList[r].pageId}&pageType=shop%2Findex2&spmb=shop%2Findex2_3265150369_${this.LpDataList[r].pageId}&pageType=shop%2Findex2&spmb=shop%2Findex2_3265150369_${this.LpDataList[r].pageId}&type=all`
        )

        if (resa.code !== 0){
          this.$message.error('获取信息失败')
           break;
        } 
       
     
        this.percentage = Math.floor(
          a * (100 / this.timeS.length) + 100 / this.timeS.length
        )

        if (this.percentage === 100) {
          setTimeout(this.dStext, 800)
        }

        for (var d = 0; d < res.module.moduleList.length; d++) {
          // 采集页面数据

          const yeData = resa.data.blockData
          for (var c = 0; c < yeData.length; c++) {
            if (
              yeData[c].id.value ===
              res.module.moduleList[d].moduleName +
                '_' +
                res.module.moduleList[d].widgetId
            ) {
              const item = {
                name:this.LpDataList[r].name,
                date: res.module.globalData.recodeDate,
                moduleEditTitle: res.module.moduleList[d].moduleData
                  .moduleEditTitle
                  ? res.module.moduleList[d].moduleData.moduleEditTitle
                  : res.module.moduleList[d].moduleNameDesc,
                moduleNameId:
                  res.module.moduleList[d].moduleName +
                  '_' +
                  res.module.moduleList[d].widgetId,
                clickCnt: yeData[c].clickCnt.value,
                clickUv: yeData[c].clickUv.value,
                clickRate: yeData[c].clickRate.value,
                leOrderByrCnt: yeData[c].leOrderByrCnt.value,
                leOrderAmt: yeData[c].leOrderAmt.value,
                leOrderRate: yeData[c].leOrderRate.value,
                lePayBuyerCnt: yeData[c].lePayBuyerCnt.value,
                lePayAmt: yeData[c].lePayAmt.value,
                lePayRate: yeData[c].lePayRate.value,
              }
              this.syData.push(item)
              break
            }
          }
        }
        this.ymData = []
       
      }
  }
      }


 //全店数据采集
 for (var t = 0; t < this.timeS.length; t++) {
        const { data: qduv } = await this.$http.get(
          `https://sycm.taobao.com/portal/diagnose/index/trend.json?dateType=recent1&dateRange=${this.timeS[t]}%7C${this.timeS[t]}&indexCode=uv`
        )
        if (qduv.content.code !== 0) return this.$message.error('获取信息失败')

        const { data: qdres } = await this.$http.get(
          `https://sycm.taobao.com/portal/diagnose/index/trend.json?dateType=recent1&dateRange=${this.timeS[t]}%7C${this.timeS[t]}&indexCode=payAmt`
        )
        if (qdres.content.code !== 0) return this.$message.error('获取信息失败')
        var uva = qduv.content.data.uv
        var uvS = uva[uva.length - 1]

        var patyAmta = qdres.content.data.payAmt
        var patyAmtS = patyAmta[patyAmta.length - 1]

        var itemqd = {
          name: '全店',
          date: this.timeS[t],
          uv: uvS,
          lePayAmt: patyAmtS,
        }
        qdsumData.push(itemqd)
}
      //end
      const itemsqs = {
        qdsumData: qdsumData,
      }
      this.qdData = itemsqs
      //采集LP数据
      var lpsumData = []
      var hpsumData = []
      for (var q = 0; q < this.LpDataList.length; q++) {
        if (this.LpDataList[q].pageType == 'shop/index2') {
            const { data: hpDataSmall } = await this.$http.get(
            `https://sycm.taobao.com/bda/decorate/wl/getGeneralTrend.json?appType=20&endDate=${timeEnd}&spmb=${this.LpDataList[q].spmb}&startDate=${timeStar}`
          )
          if (hpDataSmall.code !== 0) return this.$message.error('获取数据失败')
          this.postMdata(hpDataSmall, this.LpDataList[q].name, hpsumData)
         
        } else if(this.LpDataList[q].name == '定制页1624501436164'){
            const { data: LpDataSmall } = await this.$http.get(
            `https://sycm.taobao.com/bda/decorate/wl/getGeneralTrend.json?appType=20&endDate=${timeEnd}&spmb=${this.LpDataList[q].spmb}&startDate=${timeStar}`
          )
          if (LpDataSmall.code !== 0) return this.$message.error('获取数据失败')
          this.postMdata(LpDataSmall, "宝贝分类页2107", lpsumData)
        } else {
         const { data: LpDataSmall } = await this.$http.get(
            `https://sycm.taobao.com/bda/decorate/wl/getGeneralTrend.json?appType=20&endDate=${timeEnd}&spmb=${this.LpDataList[q].spmb}&startDate=${timeStar}`
          )
          if (LpDataSmall.code !== 0) return this.$message.error('获取数据失败')
          this.postMdata(LpDataSmall, this.LpDataList[q].name, lpsumData)
        }
      }
      const items = {
        lpsumData: lpsumData,
      }
      const itemsa = {
        hpsumData: hpsumData,
      }
      this.lpData = items
      this.hpData = itemsa

      this.Members = true
      this.MembersUp = false
      this.postListDate() //上传数据
    


    },
    postMdata(LpDataSmall, ecsa, lpsumData) {
      LpDataSmall.data.list.forEach((resData) => {
        const item = {
          name: ecsa,
          date: resData.date, //统计时段
          pv: resData.pv, //浏览量
          uv: resData.uv, //访客数
          clickCnt: resData.clickCnt, //点击次数
          clickUv: resData.clickUv, //点击人数
          clickRate: resData.clickRate, //点击率
          bounceRate: resData.bounceRate, //跳失率
          avgStayTime: resData.avgStayTime, //平均停留时长
          leOrderAmt: resData.leOrderAmt, //引导下单金额
          leOrderBuyerCnt: resData.leOrderBuyerCnt, //引导下单买家数
          leOrderRate: resData.leOrderRate, //引导下单转化率
          lePayAmt: resData.lePayAmt, //引导支付金额
          lePayBuyerCnt: resData.lePayBuyerCnt, //引导支付买家数
          lePayRate: resData.lePayRate, //引导支付转化率
        }
        lpsumData.push(item)
      })
    },
    async postListDate() {
      //上传模块数据
      for (var e = 0; e < this.syData.length; e++) {
        const { data: res } = await this.$http.post(
          'https://shop.123hzj.com/ymlist/yminfo',
          this.syData[e]
        )
        if (res.status !== 0) {
          return this.$message.error(res.message)
        }
        this.percentageUp = Math.floor(
          e * (100 / this.syData.length) + 100 / this.syData.length
        )
        if (this.percentageUp == 100 || this.percentageUp == 99) {
          setTimeout(this.uPtext, 1000)
        }
      }
      //上传LP数据
      const { data: resLp } = await this.$http.post(
        'https://shop.123hzj.com/ymlist/lpdata',
        this.lpData
      )
      if (resLp.status !== 0) {
        return this.$message.error(resLp.message)
      }
      //上传HP数据
      const { data: resHp } = await this.$http.post(
        'https://shop.123hzj.com/ymlist/hpdata',
        this.hpData
      )
      if (resHp.status !== 0) {
        return this.$message.error(resHp.message)
      }
      //上传全店数据
      const { data: resqd } = await this.$http.post(
        'https://shop.123hzj.com/ymlist/qddata',
        this.qdData
      )
      if (resqd.status !== 0) {
        return this.$message.error(resqd.message)
      }

      if (this.percentageUp == 100 || this.percentageUp == 99) {
        setTimeout(this.uPtext, 1000)
      }
    },
    dStext() {
      this.caijiText = '采集成功...'
    },
    uPtext() {
      this.uPdataText = '上传成功...'
      this.$notify({
        title: '上传成功',
        message: '数据以上传至数据库',
        type: 'success',
      })
    },
    yzstrs(hues) {
      this.uPdataText = '采集失败'
      this.$notify({
        title: '请重新选择日期',
        message: hues + '数据已存在，请重新采集',
        type: 'warning',
      })
    },
     gxstrs() {
      this.uPdataText = '更新失败'
      this.$notify({
        title: '更新失败',
        message:'当前已是最新数据，请勿重复更新',
        type: 'warning',
      })
    },
    getdiffdate(stime, etime) {
      //初始化日期列表，数组
      var diffdate = new Array()
      var i = 0
      //开始日期小于等于结束日期,并循环
      while (stime <= etime) {
        diffdate[i] = stime

        //获取开始日期时间戳
        var stime_ts = new Date(stime).getTime()

        //增加一天时间戳后的日期
        var next_date = stime_ts + 24 * 60 * 60 * 1000

        //拼接年月日，这里的月份会返回（0-11），所以要+1
        var next_dates_y = new Date(next_date).getFullYear() + '-'
        var next_dates_m =
          new Date(next_date).getMonth() + 1 < 10
            ? '0' + (new Date(next_date).getMonth() + 1) + '-'
            : new Date(next_date).getMonth() + 1 + '-'
        var next_dates_d =
          new Date(next_date).getDate() < 10
            ? '0' + new Date(next_date).getDate()
            : new Date(next_date).getDate()

        stime = next_dates_y + next_dates_m + next_dates_d

        //增加数组key
        i++
      }
      return diffdate
    },
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      this.currentPage = val
    },
  },
}
</script>

<style lang="less" scoped>
.el-autocomplete {
  width: 100%;
}
.el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  width: 100%;
}
.el-row {
  margin-bottom: 20px;
}
.el-progress {
  margin-top: 10px;
}
.selected {
  display: none;
}
</style>
