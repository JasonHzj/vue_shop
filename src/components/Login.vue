<template>

    <div class="homepage-hero-module">
      <div class="video-container">
        <div :style="fixStyle" class="filter">
                 
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" />
      </div>
      <!-- 登入表单区域 -->
      <el-form
        ref="loginFormRef"
        class="login_from"
        :rules="loginFormRules"
        :model="loginForm"
        label-width="0px"
        @submit.native.prevent
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            type="password"
            placeholder="请输入密码"
            @keyup.enter.native="login"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登入</el-button>
          <!-- <el-button type="info" @click="resetLoginForm">重置</el-button> -->
        </el-form-item>
      </el-form>
    
  </div>
        </div>
        <video :style="fixStyle" autoplay loop muted class="fillWidth" v-on:canplay="canplay">
          <source src="../assets/night.mp4" type="video/mp4"/>
          浏览器不支持 video 标签，建议升级浏览器。
          <source src="../assets/night.webm" type="video/webm"/>
          浏览器不支持 video 标签，建议升级浏览器。
        </video>
        <div class="poster hidden" v-if="!vedioCanPlay">
  
        </div>
      </div>
    </div>



 
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入登入名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      },
      vedioCanPlay: false,
      fixStyle:''
    }
  },
  methods: {
    // 点击重置按钮
    canplay() {
        this.vedioCanPlay = true
      },
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()// 点击重置按钮调用 组件 resetFields()方法
    },
    login () {
      // 点击登录的时候先调用validate方法验证表单内容是否有误
      this.$refs.loginFormRef.validate(async valid => {
        console.log(valid)
        // 如果valid参数为true则验证通过
        if (!valid) return
        // 发送请求进行登录
        const { data: res } = await this.$http.post('https://shop.123hzj.com/api/login', this.loginForm)
        if (res.status !== 0) return this.$message.error(res.message)
        this.$message.success(res.message)
        // 保存token
        window.sessionStorage.setItem('token', res.token)
        // 跳转主页面
        this.$router.push('/home')
      })
    }
  },
   mounted: function() {   //屏幕自适应
      window.onresize = () => {
        const windowWidth = document.body.clientWidth
        const windowHeight = document.body.clientHeight
        const windowAspectRatio = windowHeight / windowWidth
        let videoWidth
        let videoHeight
        if (windowAspectRatio < 0.5625) {
          videoWidth = windowWidth
          videoHeight = videoWidth * 0.5625
          this.fixStyle = {
            height: windowWidth * 0.5625 + 'px',
            width: windowWidth + 'px',
            'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
            'margin-left': 'initial'
          }
        } else {
          videoHeight = windowHeight
          videoWidth = videoHeight / 0.5625
          this.fixStyle = {
            height: windowHeight + 'px',
            width: windowHeight / 0.5625 + 'px',
            'margin-left': (windowWidth - videoWidth) / 2 + 'px',
            'margin-bottom': 'initial'
          }
        }
      }
      window.onresize()
    }

}
</script>

<style lang="less" scoped>

.homepage-hero-module{
    position: relative;
    height: 100vh;
    overflow: hidden;
  }

 .video-container {
    position: relative;
    height: 100vh;
    overflow: hidden;
  }
 
  .video-container .poster img{
    z-index: 0;
    position: absolute;
  }
 
  .video-container .filter {
    z-index: 1;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    width: 100%;
  }
 
  .fillWidth {
    width: 100%;
  }

.login_componetn {
  background: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background: rgba(255,255,255,0.5);
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255,255,255,0.5);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: #eee;
    }
  }
  .btns {
    // display: flex;
    // justify-content: flex-end;
    width: 100%;
  }
  .el-button{ width: 100%;}
  .login_from {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 50px;
    box-sizing: border-box;
  }
  
 


}
</style>
