<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>LP数据</el-breadcrumb-item>
      <el-breadcrumb-item>点击次数</el-breadcrumb-item>
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

    <el-row :gutter="24" class="mb20">
      <el-col :span="24">
        <el-card>
          <EchartsCoponent
            :chartData="ClickRate"
            ref="lineclickRate"
            ClickRate="name,date,moduleEditTitle,clickCnt,clickUv,clickRate"
            echTitleName="点击率"
            line="mk"
            uclickName="clickRate"
          />
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="mb20">
      <el-col :span="24">
        <el-card>
          <el-table
            :data="tableList.slice((currentPage - 1) * pageSize,currentPage * pageSize)"
            border
            stripe
          >
            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column label="所属页面" prop="name"></el-table-column>
            <!-- <el-table-column label="日期" prop="date" :formatter = "AAswitch"></el-table-column> -->
            <el-table-column
              label="模块名称"
              prop="moduleEditTitle"
            ></el-table-column>
            <!-- <el-table-column label="点击次数" prop="clickCnt"></el-table-column> -->
            <el-table-column label="点击人数" prop="clickUv"></el-table-column>
            <el-table-column label="点击率" prop="clickRate" :formatter = "numFilter"></el-table-column>
          </el-table>
          <!-- 分页区 -->
          <el-pagination
            align="left"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 5, 10, 20,100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableList.length"
          >
          </el-pagination>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import EchartsCoponent from '../Echarts/ech_mlist.vue'
import '../../assets/global.css'
export default {
  data() {
    return {
      checkList: ['默认首页'],
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
      titleName: [],
      ClickRate: {}, //点击率
      leOrderRate: {}, //引导下单转化率
      avgStayTime: {}, //平均停留时长
      clickCntOrPv: {}, //点击次数&浏览量
      tableList: [], //表格数据
      fksData: '', //访客数
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 10, // 每页的数据条数
    }
  },
  components: {
    EchartsCoponent,
  },
  created() {
    this.onStarClick()
    this.getListName()
    this.getMorenList()
  },
  methods: {
    onStarClick() {
      const end = new Date()
      end.setTime(end.getTime() - 3600 * 1000 * 24)
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      this.value2 = [start, end]
    },
    async getListName() {
      const timeStar = this.$moment(this.value2[0]).format('YYYY-MM-DD')
      const timeEnd = this.$moment(this.value2[1]).format('YYYY-MM-DD')
      const item = {
        timeStar: timeStar,
        timeEnd: timeEnd,
      }
      const { data: res } = await this.$http.post(
        'https://shop.123hzj.com/ymlist/hpname',
        item
      )
      if (res.status !== 0) return this.$message.error(res.message)
      this.titleName = JSON.parse(JSON.stringify(res.data))
    
    },
    getMorenList() {
      //查询默认七天数据

      setTimeout((value) => {
        //点击率
        const lineclickRate = this.$refs.lineclickRate.$vnode.data
        this.getSmallData(this.checkList, lineclickRate).then((res) => {
          this.ClickRate = res
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
        'https://shop.123hzj.com/ymlist/fkmklist',
        item
      )
      if (res.status !== 0) return this.$message.error(res.message)
        this.tableList = res.list
      this.fksData = res.fkuv
      return res.data
    },
    async postDateUp() {
      //点击率
      const lineclickRate = this.$refs.lineclickRate.$vnode.data
      this.getSmallData(this.checkList, lineclickRate).then((res) => {
        this.ClickRate = res
      })
    },
    async handleCheckedCitiesChange(value) {
      //监听check变化
      //点击率
      if(value != 0){
      const lineclickRate = this.$refs.lineclickRate.$vnode.data
      this.getSmallData(value, lineclickRate).then((res) => {
        this.ClickRate = res
      })
      }else{
       return this.$message.error("请选择人群")
    }
    },
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      this.currentPage = val
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
</style>
