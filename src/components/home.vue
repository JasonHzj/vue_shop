<template>
  <!-- 头部区域 -->
  <el-container class="home-container">
    <!-- 侧边栏切换按钮 -->
    <div
      :class="menuClick"
      class="product-navbar-collapse-inner"
      @click="toggleCollapse"
    >
      <div class="product-navbar-collapse-bg"></div>
      <div class="product-navbar-collapse">
        <span :class="menuClickJt"></span>
      </div>
    </div>
    <el-header>
      <div>
        <span><a class="colsw" href="/#/welcome">Victoria's Secret</a></span>
      </div>
      <el-button type="info" @click="loginOut">退出</el-button>
    </el-header>
    <!-- 页面主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="iscollapse ? '64px' : '200px'">
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          unique-opened
          :collapse="iscollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <i :class="iconObj[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subitem.path"
              v-for="subitem in item.children"
              :key="subitem.id"
              @click="saveNavState('/' + subitem.path)"
            >
              <i class="el-icon-menu"></i>
              <span>{{ subitem.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu></el-aside
      >
      <!-- 右边主体 -->
      <el-main>
        <div class="logpadding" style="margin:20px">
        <router-view></router-view></div>
        <el-footer class="footer">2021 © Copyright - v1.8</el-footer>
      </el-main>
     
    </el-container>
     
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menulist: [
        {
          id: 125,
          authName: '数据源管理',
          path: 'users',
          children: [
            {
              id: 110,
              authName: '采集数据',
              path: 'users',
              children: [],
              order: null,
            },
          ],
          order: 1,
        },
        {
          id: 103,
          authName: 'HP数据',
          path: 'rights',
          children: [
           
            {
              id: 923,
              authName: '首页总体数据',
              path: 'hpold',
              children: [],
              order: null,
            },
            {
              id: 924,
              authName: 'HP数据细分',
              path: 'zba',
              children: [],
              order: null,
            },
          ],
          order: 3,
        },
        {
          id: 101,
          authName: '模块数据',
          path: 'roles',
          children: [
            {
              id: 104,
              authName: '模块数据对比',
              path: 'roles',
              children: [],
              order: 1,
            },
            {
              id: 115,
              authName: '模块点击率',
              path: 'params',
              children: [],
              order: 2,
            },
          ],
          order: 3,
        },
        {
          id: 102,
          authName: 'LP数据',
          path: 'lpold',
          children: [
            {
              id: 107,
              authName: '点击次数',
              path: 'lpold',
              children: [],
              order: null,
            },{
              id: 165,
              authName: '页面排行',
              path: 'lpph',
              children: [],
              order: null,
            },
          ],
          order: 4,
        },
        {
          id: 175,
          authName: '数据同比',
          path: 'dailyData',
          children: [
            {
              id: 176,
              authName: '日常数据',
              path: 'dailyData',
              children: [],
              order: null,
            },
            {
              id: 178,
              authName: '活动数据',
              path: 'dictionaryData',
              children: [],
              order: null,
            },
          ],
          order: 6,
        },
        {
          id: 145,
          authName: '活动统计',
          path: 'reports',
          children: [
            {
              id: 146,
              authName: '添加活动',
              path: 'reports',
              children: [],
              order: null,
            }, {
              id: 147,
              authName: '数据源',
              path: 'zbdate',
              children: [],
              order: null,
            },
          ],
          order: 5,
        },
        
      ],
      iconObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao',
        175: 'iconfont icon-showpassword',
      },
      iscollapse: false,
      menuClick: '',
      menuClickJt: 'el-icon-arrow-left',
      activePath: '',
    }
  },
  created() {
    // this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    loginOut() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // async getMenuList() {
    //   const { data: res } = await this.$http.get('menus')
    //   if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
    //   this.menulist = res.data
    //   //console.log(res)
    // },
    toggleCollapse() {
      // 隐藏显示侧边栏
      this.iscollapse = !this.iscollapse
      this.menuClick = this.iscollapse ? 'product-left' : 'product-right'
      this.menuClickJt = this.iscollapse
        ? 'el-icon-arrow-right'
        : 'el-icon-arrow-left'
    },
    saveNavState(activePath) {
      // 保存链接的激活的状态
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
  },
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  font-size: 20px;
}
.el-aside {
  background-color: #333744;
  transition: all 0.12s ease;
  -webkit-transition: all 0.12s ease;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
  padding:0;
}
.iconfont {
  margin-right: 10px;
}
.product-navbar-collapse-inner {
  width: 12px;
  height: 66px;
  position: absolute;
  top: 50%;
  left: 200px;
  transform: translate(0px, -50%);
  transition: all 0.12s ease;
  -webkit-transition: all 0.12s ease;
  cursor: pointer;
  .product-navbar-collapse-bg {
    -webkit-transition: all 0.12s ease;
    height: 66px;
    left: 0;
    right: auto;
    border-bottom: 8px solid transparent;
    border-right: none;
    border-left: 12px solid #333744;
    border-top: 8px solid transparent;
  }
  .product-navbar-collapse {
    height: 66px;
    left: 0;
    right: auto;
    transition: all 0.12s ease;
    -webkit-transition: all 0.12s ease;
    .el-icon-arrow-left {
      color: #ffffff;
      font-size: 20px;
      position: absolute;
      top: 50%;
      left: -5px;
    }
    .el-icon-arrow-right {
      color: #ffffff;
      font-size: 20px;
      position: absolute;
      top: 50%;
      left: -5px;
    }
  }
}
.product-left {
  left: 64px;
}
.product-right {
  left: 200px;
}
.el-icon-arrow-right{
  top: 24px !important;
}
.el-icon-arrow-left{
  top: 24px !important;
}
.colsw{color:#ffffff;}
.footer {
   
    color: #98a6ad;
    text-align: center;
    line-height: 26px;
    width: 100%;
    display: block;
    height: 26px !important;
 
  }
</style>
