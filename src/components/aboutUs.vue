<template>
  <div class="login_disclaimer" v-focus @keyup.enter="keyWordEnterFun" tabindex="0">
    <div class="login_disclaimer_wrap">
      <div class="login_disclaimer_wrap_alert">
        <div class="login_disclaimer_wrap_alert_top">
          <h4>关于我们</h4>
          <img src="../assets/img/closeBgGary.png" @click="loginDisclaimerCloseFun" title="关闭">
        </div>
        <div class="login_disclaimer_wrap_alert_cont">
          <div v-html="aboutUsCont"></div>
          <button @click="loginDisclaimerCloseFun">同意</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutUs",
  components: {},
  data() {
    return {
      aboutUsCont: ''
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
    $(function() {
      $(".login_disclaimer_wrap_alert").draggable({handle: ".login_disclaimer_wrap_alert_top", containment: 'body'});
    });
    let that = this;
    that
      .$http({ //免责协议
        url: "/",
        method: "post",
        data: {
          nozzle: "about_us"
        }
      })
      .then(res => {
        if (res.data.code == 1) {
          that.aboutUsCont = res.data.data.content; // 免责协议条款
        } else if (res.data.code == 0 || res.data.code == -1) {
          that.$message.error(res.data.msg);
        }
      });
  },
  methods: {
    loginDisclaimerCloseFun() { //同意协议关闭
      this.$store.commit("isAboutUsFun");
    },
    keyWordEnterFun() {
      this.$store.commit("isAboutUsFun");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login_disclaimer_wrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1500;
  background-color: rgba(0, 0, 0, 0.6);
}
.login_disclaimer_wrap_alert {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -250px;
  margin-top: -190px;
  z-index: 1500;
  width: 500px;
  height: 380px;
  min-width: 500px;
  border-radius: 15px;
  background: white;
}

.login_disclaimer_wrap_alert_top {
  position: relative;
  width: 100%;
  height: 40px;
  border-radius: 15px 15px 0px 0px;
  background-color: rgba(235, 235, 238, 1);
  text-align: center;
}

.login_disclaimer_wrap_alert_top > h4 {
  color: rgba(16, 16, 16, 1);
  font-size: 18px;
  line-height: 40px;
  display: inline-block;
}

.login_disclaimer_wrap_alert_top > img {
  position: absolute;
  top: 7px;
  right: 12px;
  width: 26px;
  height: 26px;
  padding: 5px;
  border-radius: 50%;
  background: #bdbdbd;
  cursor: pointer;
}

.login_disclaimer_wrap_alert_top > img:hover {
  background: #999;
}

.login_disclaimer_wrap_alert_cont {
  padding: 26px;
  text-align: center;
}
.login_disclaimer_wrap_alert_cont > div {
  overflow-y: auto;
  width: 100%;
  height: 243px;
  text-align: left;
  font-size: 14px;
  text-align: justify;
  color: rgba(123, 123, 123, 1);
}

/* 滚动条整体部分 */
.login_disclaimer_wrap_alert_cont > div::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  background-color: rgba(230, 230, 232, 1);
  text-align: center;
}

/* 外层轨道 */
.login_disclaimer_wrap_alert_cont > div::-webkit-scrollbar-track {
  background-color: rgba(230, 230, 232, 1);
  border-radius: 6px;
  width: 6px;
  padding: 0 4px;
}

/* 滚动条滑块 */
.login_disclaimer_wrap_alert_cont > div::-webkit-scrollbar-thumb {
  border-radius: 6px;
  /* border: 1px solid #807c7c; */
  background: rgba(213, 210, 210, 1);
  width: 6px;
}

.login_disclaimer_wrap_alert_cont > button {
  width: 100px;
  height: 30px;
  border-radius: 4px;
  background-color: rgba(238, 157, 30, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
  cursor: pointer;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
/* 选中的颜色背景 */
.login_disclaimer_wrap_alert_cont > button::selection {
  background:#999999; 
  color:white;
}

.login_disclaimer_wrap_alert_cont > button::-moz-selection {
  background:#999999; 
  color:white;
}

.login_disclaimer_wrap_alert_cont > button::-webkit-selection {
  background:#999999; 
  color:white;
}
.login_disclaimer_wrap_alert_cont > button:hover {
  background-color: rgb(221, 141, 13);
}
</style>
