<template>
  <div id="page">
    <div class="main">
        <div class="yuanname">
            <ul>
                <li>活动标注:</li>
                <li><span class="daily"></span>日常</li>
                <li><span class="aus"></span>A</li>
                <li><span class="aplus"></span>A+</li>
                <li><span class="sus"></span>S</li>
                <li><span class="splus"></span>S+</li>
                </ul>

        </div>
      <FullCalendar :options="calendarOptions" ref="fullCalendar" />
    </div>

    <el-dialog :title="optTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="事件名称" label-width="80px">
          <el-input
            v-model="form.title"
            auto-complete="off"
            placeholder="请输入事件名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="开始时间" label-width="80px">
          <el-date-picker
            v-model="form.start"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" label-width="80px">
          <el-date-picker v-model="form.end" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动等级" label-width="80px">
          <el-select v-model="form.className" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.className"
              :label="item.label"
              :value="item.className"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="warning"
          @click="delEvent"
          v-if="form.id"
          style="float: left"
          >删 除</el-button
        >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEvent">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          interactionPlugin, // needed for dateClick
        ],
        defaultView: 'dayGridMonth',
        timeZone: 'UTC',
        firstDay: '1',
        weekNumberCalculation: 'ISO',
        initialDate: '2021-08-03',
        isRTL: true,
        height: 850,
        endParam: 'end',
        // locale: 'zh-cn',
        // weekNumbers:true,//显示第几周
        aspectRatio: 1.65,
        displayEventTime: false, // 是否显示时间
        allDaySlot: true, // 周，日视图时，all-day 不显示
        headerToolbar: {
          left: 'prevYear,nextYear',
          center: 'title',
          right: 'today prev,next',
        },
        titleFormat: {
          // will produce something like "Tuesday, September 18, 2018"

          month: 'long',
          year: 'numeric',
          //   day: 'numeric',
          //   weekday: 'short'
        },
        initialView: 'dayGridMonth',
        // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        events: [],
        editable: true,
        eventStartEditable: true,
        diableResizing: true,
        droppable: true,
        dayMaxEvents: true,
        eventDurationEditable: true,
        eventResourceEditable: true,
        eventResizableFromStart: true,
        displayEventEnd: true,
        selectable: true,
        selectMirror: true,
        weekends: true,
        // select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        eventDrop: (info) => {
          this.dropEvent(info)
        },
        datesRender: (arg) => {
          this.getEventsList(arg.view)
        },
        dateClick: (arg) => {
          this.handleDateClick(arg)
        },
        eventClick: (info) => {
          this.handleEventClick(info)
        },
      },
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
      calendarEvents: [],

      dialogFormVisible: false,
      value2: '',
      form: {
        title: null,
        start: null,
        end: null,
        className: null,
        id: null,
      },
      optTitle: '添加事件',
      options: [
        {
          className: 'daily',
          label: '日常',
        },
        {
          className: 'aus',
          label: 'A',
        },
        {
          className: 'aplus',
          label: 'A+',
        },
        {
          className: 'sus',
          label: 'S',
        },
        {
          className: 'splus',
          label: 'S+',
        },
      ],
    }
  },
  mounted() {},
  created() {
    this.getEventsList()
  },
  methods: {
    async getEventsList() {
      const { data: res } = await this.$http.get(
        'http://127.0.0.1:3007/ymlist/hddate'
      )
      if (res.status !== 0) return this.$message.error(res.message)

      res.data.forEach((item) => {
        const resul = {
          title: item.title,
          start: this.$moment(item.start).format('YYYY-MM-DD'),
          end: this.formatDate(this.$moment(item.end).valueOf()),
          className: item.className,
          id: item.id,
        }
        this.calendarOptions.events.push(resul)
      })
    },
    handleDateClick(arg) {
      //console.log(arg.date);
      this.dialogFormVisible = true
      this.optTitle = '新增活动'
      ;(this.form.title = ''), (this.form.id = ''), (this.form.start = arg.date)
      this.form.end = arg.date
    },
    handleEventClick(info) {
      info.el.style.height = 30
      this.dialogFormVisible = true
      this.optTitle = '修改活动'
      var endTime = this.formatDateS(this.$moment(info.event.end).valueOf())

      this.form = {
        id: info.event.id,
        title: info.event.title,
        start: info.event.start,
        end: endTime,
        className: info.event.classNames[0],
      }
    },
    async saveEvent() {
      const hditem = {
        title: this.form.title,
        start: this.$moment(this.form.start).format('YYYY-MM-DD'),
        end: this.$moment(this.form.end).format('YYYY-MM-DD'),
        className: this.form.className,
        id: this.form.id,
      }

      if (this.form.id === undefined || this.form.id == '') {
        //新增
        const { data: res } = await this.$http.post(
          'http://127.0.0.1:3007/ymlist/hdadd',
          hditem
        )
        if (res.status !== 0) return this.$message.error(res.message)

        this.$message({
          message: '新增成功！',
          type: 'success',
        })
      } else {
        //修改
        const { data: res } = await this.$http.post(
          'http://127.0.0.1:3007/ymlist/hdup',
          hditem
        )
        if (res.status !== 0) return this.$message.error(res.message)
        this.$message({
          message: '修改成功！',
          type: 'success',
        })
      }
      this.calendarOptions.events.forEach((item, index, arr) => {
        if (item.id == this.form.id) {
          arr.splice(index, 1)
          const hewod = {
            title: this.form.title,
            start: this.$moment(this.form.start).format('YYYY-MM-DD'),
            end: this.formatDate(this.$moment(this.form.end).valueOf()),
            className: this.form.className,
            id: this.form.id,
          }
          this.calendarOptions.events.push(hewod)
        }
      })

      //   this.calendarOptions.events = []
      //   this.getEventsList()
      this.dialogFormVisible = false
    },
    //删除事件
    async delEvent() {
      const { data: res } = await this.$http.post(
        'http://127.0.0.1:3007/ymlist/hddle',
        { id: this.form.id }
      )
      if (res.status !== 0) return this.$message.error(res.message)
      this.calendarOptions.events.forEach((item, index, arr) => {
        if (item.id == this.form.id) {
          arr.splice(index, 1)
        }
      })
      this.$message({
        message: '删除成功！',
        type: 'success',
      })

      this.dialogFormVisible = false
    },
    //拖动事件
    dropEvent(info) {
      var endTime = this.formatDateS(this.$moment(info.event.end).valueOf())
      this.form = {
        id: info.event.id,
        title: info.event.title,
        start: info.event.start,
        end: endTime,
        className: info.event.classNames[0],
      }
      this.saveEvent()
    },
    formatDate(timestamp) {
      var correctend = new Date()
      correctend.setTime(timestamp + 24 * 60 * 60 * 1000)
      // var end1 = correctend.getFullYear()+"-" + (correctend.getMonth()+1) + "-" + correctend.getDate();
      var year1 = correctend.getFullYear()
      var month1 = correctend.getMonth() + 1
      var day1 = correctend.getDate()
      if (month1 < 10) {
        month1 = '0' + month1
      }
      if (day1 < 10) {
        day1 = '0' + day1
      }

      return year1 + '-' + month1 + '-' + day1
    },
    formatDateS(timestamp) {
      var correctend = new Date()
      correctend.setTime(timestamp - 24 * 60 * 60 * 1000)
      var year1 = correctend.getFullYear()
      var month1 = correctend.getMonth() + 1
      var day1 = correctend.getDate()
      if (month1 < 10) {
        month1 = '0' + month1
      }
      if (day1 < 10) {
        day1 = '0' + day1
      }

      return year1 + '-' + month1 + '-' + day1
    },
  },
}
</script>
<style>
footer {
  padding-top: 20px;
  height: 60px;
  text-align: center;
}

.main {
  margin: 10px;
  text-align: center;
  background: #fff;
  padding: 10px;
}
.fc-daygrid-day-number {
  color: #666666;
  float: right;
  height: 20px;
  width: 20px;
  text-align: center;
  line-height: 20px;
  background-color: #f1f3fa;
  border-radius: 50%;
  margin: 5px;
  font-size: 11px;
  padding: 0 !important;
}
.fc-center h2 {
  color: #6c757d;
  text-transform: uppercase;
}
.fc-unthemed th span {
  color: #6c757d;
}
.fc-h-event .fc-event-title-container {
  text-align: center;
  height: 28px;
  line-height: 25px;
  font-size: 14px;
}
.fc-h-event {
  border: none !important;
}
.daily {
  background: #0acf97;
}
.aus {
  background: #39afd1 !important;
}
.aplus {
  background: #727cf5 !important;
}
.sus {
  background: #ffbc00 !important;
}
.splus {
  background: #fa5c7c !important;
}
.yuanname{ position: absolute; left: 63%;
    top: 10.2%; z-index: 99999;color:#555555}
.yuanname ul li{ float: left;margin: 0 5px;}
.yuanname ul li span{ width: 10px; height: 10px; display:inline-block; border-radius: 100px; margin:0 3px; }
</style>