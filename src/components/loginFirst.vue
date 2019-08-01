<template>
  <div class="login_first" v-focus @keyup.enter="keyWordEnterFun" tabindex="0">
    <div class="login_first_cont">
      <div class="login_first_logo">
        <img src="../assets/img/qytLogo.png" alt>
        <p>行情交易系统</p>
      </div>
      <div class="login_first_login">
        <h4>选择行情服务器</h4>
        <select v-model="loginSelected">
          <option v-for="loginOption in loginOptions" :key="loginOption.id">{{loginOption.name}}</option>
        </select>
        <div>
          <button @click="loginFirstFun">登录</button>
          <button @click="exitFirstFun">退出</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginFirst",
  components: {},
  data() {
    return {
      loginSelected: "", //默认第一个
      loginOptions: "", //行情服务器
      loginSoftwareName: "" //软件名
    };
  },
  directives: {
    focus: {
    // 指令的定义
      inserted: function(el) {
        el.focus();
      }
    }
  },
  created() {},
  mounted: function() {
    let that = this;
    that
      .$http({ //行情登录页面
        url: "/",
        method: "post",
        data: {
          nozzle: "login_info"
        }
      })
      .then(res => {
        if (res.data.code == 1) {
          that.loginSelected = res.data.data.server[0].name; // 默认第一个
          that.loginOptions = res.data.data.server; // 服务器名字
          that.loginSoftwareName = res.data.data.name; //软件名
        } else if (res.data.code == 0 || res.data.code == -1) {
          that.$message.error(res.data.msg);
        }
      });
  },
  methods: {
    //登录主页
    loginFirstFun() {
      // console.log(this.loginSelected);
      this.$router.push({
        path: "/wrap"
      });
      this.$store.commit("isloginDisclaimerFun"); // 免责显示

      // 打包exe
      win.setResizable(true);
      win.setMaximumSize(0, 0);  // 设置窗口的最大尺寸
      win.setMinimumSize(1280, 720);
      var x = (1280 - 700) / 2;
      var y = (720 - 350) / 2;
      win.moveBy(-x, -y);
      win.resizeTo(1280, 720);
      window.localStorage.setItem('set_dragging', '0');
    },
    exitFirstFun() {
      window.opener = null;
      window.parent.close();
    },
    keyWordEnterFun() { //回车事件
      this.loginFirstFun();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login_first {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 1500;
  background: url("../assets/img/loginBg.png") 0 0 no-repeat / 100% 100%;
  outline: none;
}
.login_first_cont {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 1500;
  width: 750px;
  height: 403px;
  min-width: 750px;
  /* background: rgb(15, 44, 107); */
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  justify-content: space-around;
  -webkit-justify-content: space-around;
  align-items: center;
  /* background: url("../assets/img/loginBg.png") 0 0 no-repeat / 100% 100%; */
}
.login_first_logo {
  text-align: center;
  margin-left: 30px;
}
.login_first_logo > img {
  width: 179px;
  height: 47px;
}
.login_first_logo > p {
  margin-top: 24px;
  line-height: 27px;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
}

.login_first_login {
  text-align: center;
  /* background: rgba(0, 39, 81, 0.3); */
  padding: 30px;
  border-radius: 15px;
  margin-right: 30px;
}
.login_first_login > h4 {
  line-height: 22px;
  color: rgba(255, 255, 255, 1);
  font-size: 22px;
  font-weight: 700;
}
.login_first_login > select {
  width: 280px;
  height: 30px;
  line-height: 30px;
  color: rgba(16, 16, 16, 1);
  font-size: 16px;
  border: 1px solid rgba(187, 187, 187, 1);
  padding-left: 8px;
  margin-top: 30px;
  border-radius: 4px;
}
.login_first_login > div {
  margin-top: 44px;
  font-size: 0;
}
.login_first_login > div > button {
  width: 100px;
  height: 30px;
  line-height: 30px;
  border-radius: 4px;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}
.login_first_login > div > button:nth-child(1) {
  background-color: rgba(255, 152, 0, 1);
  margin-right: 18px;
}
.login_first_login > div > button:nth-child(1):hover {
  background-color: rgb(211, 127, 1);
}
.login_first_login > div > button:nth-child(2) {
  background-color: rgba(232, 232, 232, 1);
  color: rgba(16, 16, 16, 1);
}
.login_first_login > div > button:nth-child(2):hover {
  background-color: rgb(170, 170, 170);
}
</style>
