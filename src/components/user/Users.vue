<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- 搜索与添加 -->
          <el-autocomplete
            class="inline-input"
            v-model="queryInfo.query"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            ><el-button
              slot="append"
              icon="el-icon-search"
              @click="getTotal"
            ></el-button>
          </el-autocomplete>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="userList" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChanged(scope.row)"
              active-color="#409eff"
              inactive-color="#dcdfe6"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="">
            <el-tooltip
              class="item"
              effect="dark"
              content="修改信息"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                circle
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除用户"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                circle
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                circle
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 获取列表参数
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userList: [],
      restaurants: [],
      total: 0

    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getTotal () {
      // 动态匹配名称
      this.restaurants = []
      const { data: res } = await this.$http.get('users', {
        params: {
          query: '',
          pagenum: 1,
          pagesize: this.total
        }
      })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      res.data.users.forEach(results => {
        const item = {
          value: results.username
        }
        this.restaurants.push(item)
      })
    },
    async getUserList () {
      const { data: res } = await this.$http.get('users', { params: this.queryInfo })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.userList = res.data.users
      this.total = res.data.total
      this.getTotal()
    },
    handleSizeChange (newSize) {
      // 监听pagesize 改变事件
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    async userStateChanged (userinfo) {
      // 修改状态
      const { data: res } = await this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`)
      if (res.meta.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
    },
    querySearch (queryString, cb) {
      // 动态匹配名称
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      // 动态匹配名称
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-autocomplete {
  width: 100%;
}
</style>
