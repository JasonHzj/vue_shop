<template>
    <div id="page">

        <div class="main">
            <FullCalendar :options="calendarOptions" 
            ref="fullCalendar"
          @dateClick="handleDateClick"
        @eventClick="handleEventClick"
        @eventDrop="calendarEventDrop"
        @datesRender="handleDatesRender"
             />
        </div>
        

        <el-dialog :title="optTitle" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="事件名称" label-width="80px">
              <el-input v-model="form.title" auto-complete="off" placeholder="请输入事件名称"></el-input>
            </el-form-item>
            <el-form-item label="开始时间" label-width="80px">
                <el-date-picker
                  v-model="form.start"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" label-width="80px">
                <el-date-picker
                  v-model="form.end"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="warning" @click="delEvent" v-if="form.id" style="float: left;">删 除</el-button>
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveEvent">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

export default {
    components: {
        FullCalendar
    },
    data() {
        return {
            calendarOptions: {
                    plugins: [
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin // needed for dateClick
                    ],
                    defaultView:"dayGridMonth",
                    timeZone:"UTC",
                    firstDay:"1",
                    weekNumberCalculation:"ISO",
                    editable:"true",
                    droppable:"true",
                    displayEventEnd:"true",
                    initialDate: '2021-01-15',
                    isRTL: true,
                    locale: "zh-cn",
                    aspectRatio: 1.65,
                    displayEventTime: true, // 是否显示时间
                    allDaySlot: false, // 周，日视图时，all-day 不显示
              header: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
                    titleFormat: { // will produce something like "Tuesday, September 18, 2018"
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        // weekday: 'long'
                    },
                    hour12: false,
                    initialView: 'timeGridWeek',
                    // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
                    events: [],
                    editable: true,
                    selectable: true,
                    selectMirror: true,
                    dayMaxEvents: true,
                    weekends: true,
                    slotLabelFormat: {
                        hour: "2-digit",
                        minute: "2-digit",
                        meridiem: false,
                        hour12: false, // 设置时间为24小时
                    },
                    // select: this.handleDateSelect,
                    eventClick: this.handleEventClick,
                    eventsSet: this.handleEvents,
                    evnetTime: {
                hour: 'numeric',
                minute: '2-digit',
                hour12: false
            }
},
          

            calendarEvents: [],
            calendarEventDrop: info => {
                this.dropEvent(info);
            },
            handleDatesRender: arg => {
                this.getEventsList(arg.view)
            },

            dialogFormVisible: false,
            form: {
                title: null,
                start: null,
                end: null
            },
            optTitle: '添加事件',
        }
    },
    mounted() {
        
    },
    created() {
        //
    },
    methods: {
        getEventsList(info) {
            let params = {
                start: info.activeStart,
                end: info.activeEnd
            };
            this.$get('events.php', params)
            .then((res) => {
                this.calendarEvents = res;
            });
        },
        handleDateClick(arg) {
            ////console.log(arg.date);
            this.dialogFormVisible = true;
            this.optTitle = '新增事件';
            this.form.title = '',
            this.form.id = '',
            this.form.start = arg.date;
            this.form.end = arg.date;
            ////console.log(this.calendarEvents);
        },
        handleEventClick(info) {
            info.el.style.borderColor = 'red';
            this.dialogFormVisible = true;
            this.optTitle = '修改事件';
            this.form = {
                id: info.event.id,
                title: info.event.title,
                start: info.event.start,
                end: info.event.end,
            };
        },
        saveEvent() {
            this.$post('events.php?action=save', this.form)
            .then((res) => {
                if (res.code === 0) {
                    if (this.form.id === undefined || this.form.id == '') { //新增
                        this.form.id = res.id;
                        this.calendarEvents.push(this.form);
                        this.$message({
                            message: '新增成功！',
                            type: 'success'
                        });
                    } else { //修改
                        this.calendarEvents.forEach((item, index, arr) => {
                            if (item.id == this.form.id) {
                                arr[index].title = this.form.title
                                arr[index].start = this.form.start
                                arr[index].end = this.form.end
                            }
                        });
                        this.$message({
                            message: '修改成功！',
                            type: 'success'
                        });
                    }
                    
                    this.dialogFormVisible = false;
                } else {
                    this.$message({
                        message: res.message,
                        type: 'error'
                    });
                }
            });
        },
        //删除事件
        delEvent() {
            this.$post('events.php?action=del', {id: this.form.id})
            .then((res) => {
                if (res.code === 0) {
                    this.calendarEvents.forEach((item, index, arr) => {
                        if(item.id == this.form.id) {
                            arr.splice(index, 1);
                        }
                    });
                    this.dialogFormVisible = false;
                    this.$message({
                        message: '删除成功！',
                        type: 'success'
                    });
                } else {
                    this.$message({
                        message: res.message,
                        type: 'error'
                    });
                }
            });
        },
        //拖动事件
        dropEvent(info) {
            this.form = {
                id: info.event.id,
                title: info.event.title,
                start: info.event.start,
                end: info.event.end
            };
            this.saveEvent();
        }
    }
}
</script>
<style>


footer {
    padding-top: 20px;
    height: 60px;
    text-align: center;
}
#page p{
    text-align: center;
    line-height: 42px;
}
#page h2{
    padding-top: 20px;
    text-align: center;
    font-size: 20px;
}
.main{
    margin: 10px;
    text-align: center;
    background: #fff;
    padding: 10px;
}
</style>