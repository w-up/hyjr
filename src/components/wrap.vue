<template>
  <div class="wrap" ref="wrap" v-focus @keyup.27="keyWordNoLoginEsc" @keyup.112="keyWordNoLoginF1" @keyup.113="keyWordNoLoginF2" @keyup.114="keyWordNoLoginF3" @keyup.115="keyWordNoLoginF4" @keyup.116="keyWordNoLoginF5" @keyup.123="keyWordNoLoginF12" @keyup.enter="keyWordNoLoginEnter" tabindex="0">
    <!-- 头部导航栏 -->
    <nav-top ref="navTop"></nav-top>
    <!-- 免责声明 -->
    <login-disclaimer v-if="$store.state.isloginDisclaimer"></login-disclaimer>
    <!-- 登录成功 -->
    <login-success-alert v-if="$store.state.isLoginSuccess"></login-success-alert>
    <router-view ref="route"></router-view>
    <!-- <info-face></info-face> -->
    <!-- 外盘交易面板 -->
    <out-tran-face ref="out" v-if="$store.state.showTface"></out-tran-face>
    <!-- 关于我们 -->
    <about-us v-if="$store.state.isAboutUs"></about-us>
    <!-- 关闭窗口 -->
    <win-close v-if="$store.state.isWinShow"></win-close>
    <!-- 画线下单 -->
    <draw-order v-if="$store.state.isDrawOrder" ref="drawOrder"></draw-order>
    <!-- 添加预埋单 -->
    <add-prepaid v-if="$store.state.isAddPrepaid" ref="addPrepaid"></add-prepaid>
    <!-- 添加条件单 -->
    <add-condition v-if="$store.state.isAddCondition" ref="addCondition"></add-condition>
    <!-- 止损开仓 -->
    <add-loss v-if="$store.state.isAddLoss" ref="addLoss"></add-loss>
    <!-- 登录外盘 -->
    <login-market v-if="$store.state.showOutTranLogin" ref="loginMarket"></login-market>
  </div>
</template>

<script>
import NavTop from "../components/navTop"; //头部导航栏
import OutTranFace from "../components/outTranFace"; //外盘交易面板
import LoginDisclaimer from "../components/loginDisclaimer"; //免责声明
import AboutUs from "../components/aboutUs"; //关于我们
import DrawOrder from "../components/drawOrder"; //画线下单
import AddPrepaid from "../components/addPrepaid"; //添加预埋单
import AddCondition from "../components/addCondition"; //添加条件单
import AddLoss from "../components/addLoss"; //止损开仓
import LoginMarket from "../components/loginMarket"; //登录外盘
import LoginSuccessAlert from "../components/loginSuccessAlert"; //登录成功弹窗
import WinClose from "../components/winClose"; //关闭窗口
export default {
  name: "wrap",
  components: {
    "nav-top": NavTop,
    // FooterBar,
    // InfoFace,
    "out-tran-face": OutTranFace,
    "login-disclaimer": LoginDisclaimer,
    "about-us": AboutUs,
    "draw-order": DrawOrder,
    "add-prepaid": AddPrepaid,
    "add-condition": AddCondition,
    "add-loss": AddLoss,
    "login-market": LoginMarket,
    "login-success-alert": LoginSuccessAlert,
    "win-close": WinClose
  },
  data() {
    return {
      loginMarketShow: false, // 外盘登录界面默认隐藏
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
    if (window.localStorage.getItem("theme")) {
      let theme = Number(window.localStorage.getItem("theme"));
      this.$store.commit("themeStyleFun", theme);
    }
    if (this.$store.state.showOutTranLogin) {
      this.loginMarketShow = true; //点击外盘交易显示登录
    }
    document.onkeydown = document.onkeyup = document.onkeypress = function(event) {
      var e = event || window.event || arguments.callee.caller.arguments[0];
      if (e && e.keyCode == 123 || e.keyCode == 112 || e.keyCode == 113 || e.keyCode == 114 || e.keyCode == 115 || e.keyCode == 117) {
        return (false);
      }
    }

    // var hidden, visibilityChange;
    // if (typeof document.hidden !== "undefined") {
    //     hidden = "hidden";
    //     visibilityChange = "visibilitychange";
    // } else if (typeof document.msHidden !== "undefined") {
    //     hidden = "msHidden";
    //     visibilityChange = "msvisibilitychange";
    // } else if (typeof document.webkitHidden !== "undefined") {
    //     hidden = "webkitHidden";
    //     visibilityChange = "webkitvisibilitychange";
    // }

    // function handleVisibilityChange() {
    //   if (document[hidden]) {
    //     // console.log("失去焦点");
    //     // this.$store.commit("isFocusFun", false);
    //   } else {
    //     // console.log("得到焦点");
    //     // this.$store.commit("isFocusFun", true);
    //   }
    // }

    // // 判断浏览器的支持情况
    // if (typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined") {
    //     console.log("此演示需要一个浏览器，如谷歌浏览器或Firefox，支持页面可见性API。");
    // } else {
    //     // 监听visibilityChange事件
    //     document.addEventListener(visibilityChange, handleVisibilityChange, false);
    // }

    
    //当前窗口得到焦点 
    window.onfocus = function() { 
      // console.log("1111得到焦点");
    }; 
    
    //当前窗口失去焦点 
    window.onblur = function() { 
      // console.log("2222失去焦点");
    };
  },
  methods: {
    keyWordNoLoginEsc() { // 退出快捷键
      this.$store.commit("isWinShowFun");
    },
    keyWordNoLoginF1() {
      // console.log("F1");
      this.$router.push({
        path: "/wrap/infoFace/infoFaceChild1"
      });
      // 调用infoFace里面的函数改变自选按钮
      this.$refs.route.infoLeftBtnsActiveFun(1);
    },
    keyWordNoLoginF2() {
      // console.log("F2");
      this.$router.push({
        path: "/wrap/infoFace/infoFaceChild2"
      });
      // 调用infoFace里面的函数改变报价按钮
      this.$refs.route.infoLeftBtnsActiveFun(2);
    },
    keyWordNoLoginF3() {
      // console.log("F3");
      this.$router.push({
        path: "/wrap/infoFace/infoFaceChild3"
      });
      // 调用infoFace里面的函数改变分时按钮
      this.$refs.route.infoLeftBtnsActiveFun(3);
    },
    keyWordNoLoginF4() {
      // console.log("F4");
      this.$router.push({
        path: "/wrap/infoFace/infoFaceChild4"
      });
      // 调用infoFace里面的函数改变K线按钮
      this.$refs.route.infoLeftBtnsActiveFun(4);
    },
    keyWordNoLoginF5() {
      location.reload();
    },
    keyWordNoLoginF12() {
      if (!(this.$store.state.isloginDisclaimer || this.$store.state.isAboutUs || this.$store.state.isWinShow || this.$store.state.isLoginSuccess)) { // 有一个是true不允许调用快捷键
        if (this.$store.state.noLoginOutTran) {
          // 未登录
          this.$store.commit('loginOutTranFun'); // 控制外盘登录显示
        } else {
          // 已登录
          if (this.$store.state.isShowAlertTface) {
            // 已经弹出了按键F12
            if (this.$store.state.isShowTf) {
              this.$store.commit("isShowTfFun", false); // // 已登录按F12外盘显隐控制
            } else {
              this.$store.commit("isShowTfFun", true); // // 已登录按F12外盘显隐控制
            }
            this.$store.commit("infoFaceHeightFun", false); // 已登录点击F12按钮 高
            
          } else {
            // 未弹出了按键F12
            if (this.$store.state.isShowTf) {
              this.$store.commit("isShowTfFun", false); // // 已登录按F12外盘显隐控制
            } else {
              this.$store.commit("isShowTfFun", true); // // 已登录按F12外盘显隐控制
            }
            if (this.$store.state.infoFaceHeight) {
              this.$store.commit("infoFaceHeightFun", false); // 已登录点击F12按钮高低控制
            } else {
              this.$store.commit("infoFaceHeightFun", true); // 已登录点击F12按钮高低控制
            }
            if (this.$route.path == "/wrap/infoFace/infoFaceChild4") {
              this.$refs.route.$refs.infoRoute.infoChangeKlineWHFun(); // 调用改变K线宽高
            }
            if (this.$route.path == "/wrap/infoFace/infoFaceChild3") {
              this.$nextTick(() => {
                window.myChart.resize();
              })
            }
          }
        }
      }
    },
    keyWordNoLoginEnter() {
      if (this.$store.state.isloginDisclaimer) { // 回车风险提示关闭
        this.$store.commit("isloginDisclaimerFun");
      }
      if (!this.$store.state.isLoginSuccess) { // 回车登录成功关闭后让wrap再次获取焦点
        $(".wrap").focus();
      }
      // if (this.$store.state.isSysCloseDate) { // 查看结算时间
      //   this.$store.commit("isSysCloseDateFun");
      // }
      // if (this.$store.state.isAboutUs) { // 关于我们
      //   this.$store.commit("isAboutUsFun");
      // }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  background: rgba(224, 224, 224, 1);
  cursor: default;
  outline: none;
}
</style>
