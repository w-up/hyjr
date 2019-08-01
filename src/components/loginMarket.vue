<template>
  <div class="login_market" v-focus @keyup.enter="keyWordEnterFun" tabindex="0">
    <div class="login_market_cont">
      <div>
        <p>网域：</p>
        <select v-model="loginNet">
          <option>实盘</option>
          <option>模拟</option>
        </select>
      </div>
      <div class="login_market_cont_userpass">
        <p>用户：</p>
        <input v-model="loginUser" type="text">
      </div>
      <div class="login_market_cont_userpass">
        <p>密码：</p>
        <input v-model="loginPass" type="password">
      </div>
      <div class="login_market_cont_check">
        <input v-model="loginRememberUser" type="checkbox" id="login_market_cont_username">
        <label for="login_market_cont_username" class="login_market_checkbox">记住账号</label>
        <input v-model="loginRememberPass" type="checkbox" id="login_market_cont_password">
        <label for="login_market_cont_password" class="login_market_checkbox">记住密码</label>
      </div>
      <div class="login_market_cont_btns">
        <button @click="loginFirstFun" :disabled="isDisable">登录</button>
        <button @click="cancelLoginFirstFun" :disabled="isDisable">取消</button>
      </div>
      <div class="login_market_cont_plan" v-show="isShowLoginState">
        <span>登录进度</span>
        <div>
          <div :style="{ left: loginMarketActiveLfte + 'px'}"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginMarket",
  components: {},
  data() {
    return {
      isDisable: false, //按钮点击
      loginNet: "实盘",
      loginUser: "",
      loginPass: "",
      loginUserToken: "", // 用户登录token
      loginOutTranTimer: "",
      loginMarketActiveLfte: 0,
      loginDirection: true, // 控制滚动方向
      isShowLoginState: false, // 登录时的滚动
      loginRememberUser: false, //记住账号
      loginRememberPass: false, // 记住密码
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
  mounted: function() {
    if (localStorage.getItem("loginRememberUser")) { // 判断是否记住账号
      if (localStorage.getItem("loginRememberUser") == "true") {
        this.loginRememberUser = true;
        this.loginUser = localStorage.getItem("loginUser");
      } else {
        this.loginRememberUser = false;
      }
    }
    if (localStorage.getItem("loginRememberPass")) { // 判断是否记住密码
      if (localStorage.getItem("loginRememberPass") == "true") {
        this.loginRememberPass = true;
        this.loginPass = localStorage.getItem("loginPass");
      } else {
        this.loginRememberPass = false;
      }
    }
  },
  methods: {
    loginFirstFun() {
      clearInterval(this.loginOutTranTimer); //清除计时器
      if (this.loginUser == "") {
        this.$notify({
          title: "提示",
          message: "账号不能为空",
          type: "warning"
        });
        this.isDisable = true;
        setTimeout(() => {
          this.isDisable = false;
        }, 1000);
      } else if (this.loginPass == "") {
        this.$notify({
          title: "提示",
          message: "密码不能为空",
          type: "warning"
        });
        this.isDisable = true;
        setTimeout(() => {
          this.isDisable = false;
        }, 1000);
      } else {
        // console.log(this.loginNet, this.loginUser, this.loginPass);
        // console.log(this.loginRememberUser);
        this.isDisable = true;
        if (this.loginRememberUser) {
          // 记住账号
          localStorage.setItem("loginUser", this.loginUser);
          localStorage.setItem("loginRememberUser", true);
        } else {
          localStorage.setItem("loginUser", "");
          localStorage.setItem("loginRememberUser", false);
        }
        if (this.loginRememberPass) {
          // 记住密码
          localStorage.setItem("loginPass", this.loginPass);
          localStorage.setItem("loginRememberPass", true);
        } else {
          localStorage.setItem("loginPass", "");
          localStorage.setItem("loginRememberPass", false);
        }
        let that = this;
        let mold;
        if (that.loginNet == "实盘") {
          mold = 1;
        } else if (that.loginNet == "模拟") {
          mold = 2;
        }
        that
          .$http({
            //外盘交易登录
            url: "/",
            method: "post",
            data: {
              nozzle: "login",
              number: that.loginUser,
              password: that.loginPass,
              classify: 1,
              mold: mold,
              version: "1.0.0",
            }
          })
          .then(res => {
            if (res.data.code == 1) { // 登录成功
              that.loginUserToken = res.data.data.token; // 用户登录token
              this.$store.commit("tokenStrFun", res.data.data.token); // 存储token
              // console.log(that.loginUserToken);
              this.isShowLoginState = true;
              this.loginOutTranTimer = setInterval(() => {
                if (this.loginDirection) {
                  if (this.loginMarketActiveLfte > 260) {
                    this.loginDirection = false;
                  }
                  this.loginMarketActiveLfte++;
                } else {
                  if (this.loginMarketActiveLfte < 0) {
                    this.loginDirection = true;
                  }
                  this.loginMarketActiveLfte--;
                }
              }, 5);
              let randomNum = Math.floor(Math.random() * (25 - 10 + 1) + 15) * 100; //生成2s-3.5s整百的数
              setTimeout(() => {
                clearInterval(this.loginOutTranTimer); //清除计时器
                that.isDisable = false;
                this.isShowLoginState = false;
                this.$store.commit("cancelLoginOutTranFun");
                this.$store.state.noLoginOutTran = false; //登录成功隐藏外盘交易未登录按钮
                this.$store.state.isLoginedOutTran = true; //登录成功显示外盘交易已登录按钮
                this.$store.state.showTface = true; //登录成功显示外盘交易面板
                this.$store.state.infoFaceHeight = true; //登录成功高度变低
                // console.log(this.$parent);
                if (this.$route.path == "/wrap/infoFace/infoFaceChild3") {
                  this.$nextTick(()=>{
                    window.myChart.resize(); // 调整分时的宽高
                  });
                }
                // if (this.$route.path == "/wrap/infoFace/infoFaceChild4") {
                //   this.$parent.$refs.route.$refs.infoRoute.infoChangeKlineWHFun(); //登录后改变K线大小
                // }
                this.$store.commit("isLoginSuccessFun");
              }, randomNum);
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
              that.isDisable = true;
              setTimeout(() => {
                that.isDisable = false;
              }, 1500);
            }
          });
      }
    },
    keyWordEnterFun() {
      this.loginFirstFun();
    },
    cancelLoginFirstFun() {
      clearInterval(this.loginOutTranTimer); //清除计时器
      this.$store.commit("cancelLoginOutTranFun"); //隐藏登录界面
      // window.localStorage.setItem("isLoginedOutTran", false); //取消登录
    }
  },
  beforeDestroy() {
    //在开始销毁实例时调用。此时实例仍然有功能。
    //清除定时器
    clearInterval(this.loginOutTranTimer);
    // console.log("beforeDestroy");
  },
  destroyed() {
    //在实例被销毁之后调用。此时所有的绑定和实例的指令已经解绑，注意是解绑不是销毁,所有的子实例也已经被销毁。
    //清除定时器
    clearInterval(this.loginOutTranTimer);
    // console.log("destroyed");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login_market {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 1500;
  background-color: rgba(0, 0, 0, 0.6);
  outline: none;
}
.login_market_cont {
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
  background: rgb(15, 44, 107);
  padding-top: 60px;
  text-align: center;
  background: url("../assets/img/loginBg.png") 0 0 no-repeat / 100% 100%;
}
.login_market_cont > div {
  width: 100%;
  margin-top: 15px;
  text-align: center;
}
.login_market_cont > div > p {
  display: inline-block;
  /* width: 264px; */
  text-align: right;
  line-height: 30px;
  color: rgba(255, 255, 255, 1);
  font-size: 17px;
}
.login_market_cont > div > select {
  width: 234px;
  height: 30px;
  line-height: 30px;
  color: rgba(16, 16, 16, 1);
  font-size: 16px;
  border: 1px solid rgba(187, 187, 187, 1);
  padding-left: 2px;
}
.login_market_cont > .login_market_cont_userpass > input {
  width: 234px;
  height: 34px;
  line-height: 34px;
  text-align: left;
  border: 1px solid rgba(187, 187, 187, 1);
  font-size: 16px;
  padding-left: 4px;
}

.login_market_cont_check {
  padding-left: 82px;
}

.login_market_cont_check label {
  vertical-align: middle;
  color: rgba(255, 255, 255, 1);
  font-size: 12px;
  margin-right: 49px;
  line-height: 1px;
  cursor: pointer;
}

.login_market_cont_check input[type="checkbox"] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
  vertical-align: middle;
  cursor: pointer;
}

.login_market_checkbox::before {
  content: '\a0';
  /* content: "\2713"; */
  background-color: white;
  color: rgba(170, 170, 170, 1);
  font-size: 10px;
  line-height: 14px;
  display: inline-block;
  border: 0 none;
  text-align: center;
  width: 14px;
  height: 14px;
  font-weight: bold;
  margin-right: 12px;
}

.login_market_cont_check
  input[type="checkbox"]:checked
  + .login_market_checkbox::before {
  content: "\2713";
  color: white;
  background: #fa8e53;
  font-size: 10px;
  line-height: 14px;
  text-align: center;
  margin-right: 12px;
}

.login_market_cont > .login_market_cont_btns {
  margin-top: 49px;
}

.login_market_cont_btns > button {
  width: 100px;
  height: 30px;
  line-height: 30px;
  border-radius: 4px;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}
.login_market_cont_btns > button:nth-child(1) {
  background-color: rgba(255, 152, 0, 1);
  margin-right: 18px;
}
.login_market_cont_btns > button:nth-child(1):hover {
  background-color: rgb(211, 127, 1);
}
.login_market_cont_btns > button:nth-child(2) {
  background-color: rgba(232, 232, 232, 1);
  color: rgba(16, 16, 16, 1);
}
.login_market_cont_btns > button:nth-child(2):hover {
  background-color: rgb(170, 170, 170);
}

.login_market_cont > .login_market_cont_plan {
  margin-top: 37px;
  text-align: center;
}
.login_market_cont > .login_market_cont_plan > span {
  line-height: 20px;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  vertical-align: middle;
  margin-right: 23px;
}
.login_market_cont > .login_market_cont_plan > div {
  display: inline-block;
  width: 320px;
  height: 10px;
  background: white;
  vertical-align: middle;
  position: relative;
}
.login_market_cont > .login_market_cont_plan > div > div {
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  width: 60px;
  height: 10px;
  background-color: rgba(105, 123, 122, 1);
}
</style>
