import Vue from 'vue'
import {
  Button, Form, FormItem, Input, Message, Container, Header, Aside, Main, menu, Submenu, MenuItem, Breadcrumb, BreadcrumbItem, Card, Row, Col,
  Table, TableColumn, Switch, Tooltip, Pagination, Autocomplete, Dialog, MessageBox, Tag, DatePicker, Progress, Notification, CheckboxGroup, Checkbox, Footer, TimeSelect, TimePicker, Icon, Select, Option
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(menu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Autocomplete)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(DatePicker)
Vue.use(Progress)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Footer)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Icon)
Vue.use(Select)
Vue.use(Option)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$notify = Notification