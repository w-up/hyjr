<template>
  <div class="systemAlertWrap" v-focus @keyup.enter="keyWordEnterFun" tabindex="0">
    <div class="systemalert">
      <div class="alert_top">
        <span class="alert_top_text">系统提示</span>
        <button class="alert_top_close" @click="winCloseFun">X</button>
      </div>
      <div class="alert_cont">
        <div class="alert_cont_text">
          <!-- <i class="el-icon-warning"></i> -->
          <div>
            <img src="../assets/img/isMark.png" alt>
            <span>您将退出系统,是否继续?</span>
          </div>
        </div>
        <div class="alert_btn">
          <button @click="winExitFun">确认</button>
          <button @click="winCloseFun">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "winClose",
  components: {},
  data() {
    return {
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
      $(".systemalert").draggable({handle: ".alert_top", containment: 'body'}); // 云预埋单弹窗移动
    });
  },
  methods: {
    winCloseFun() { // 关闭弹窗
      this.$store.commit("isWinShowFun"); // 窗口关闭
    },
    winExitFun() { // 确认按钮
      window.opener = null;
      this.$store.commit("isWinShowFun");
      window.parent.close();
      this.$router.push({
        path: "/"
      });
    },
    keyWordEnterFun() {
      this.winExitFun();
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.systemAlertWrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  /* background-color: rgba(0, 0, 0, 0.6); */
  outline: none;
}
.systemalert {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -127px;
  margin-top: -92.5px;
  width: 254px;
  height: 185px;
  z-index: 1021;
  background: #b9d1ea;
  border: 1px solid #404c58;
  border-radius: 4px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.4);
}
.alert_top {
  width: 100%;
  height: 28px;
}
.alert_top_text {
  font-size: 12px;
  margin-left: 8px;
  line-height: 28px;
  color: #000;
}
.alert_top_close {
  position: absolute;
  top: 0;
  right: 8px;
  width: 48px;
  height: 19px;
  line-height: 18px;
  display: inline-block;
  background: -webkit-linear-gradient(#f3b3ac, #ce4b38, #f3b3ac); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(#f3b3ac, #ce4b38, #f3b3ac); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(#f3b3ac, #ce4b38, #f3b3ac); /* Firefox 3.6 - 15 */
  background: linear-gradient(#f3b3ac, #ce4b38, #f3b3ac); /* 标准的语法（必须放在最后） */
  -webkit-text-stroke: 1px #505767;
  color: white;
  border: 1px solid #5d3e47;
  border-top: 0 none;
  border-radius: 0 0 3px 3px;
  text-align: center;
  font-weight: 900;
}
.alert_top_img:hover {
  background: #ff0707;
}
.alert_top_img > img {
  margin-top: 5px;
  width: 15px;
  height: 15px;
}
.alert_cont {
  width: 95%;
  height: 150px;
  margin: auto;
  background: #efefef;
  border: 1px solid #5c6c7a;
}
.alert_cont_text {
  width: 100%;
  margin: auto;
  background: white;
  text-align: center;
}
.alert_cont_text > div {
  width: 250px;
  height: 93px;
  display: table-cell;
  vertical-align: middle;
}
.alert_cont_text > div > img {
  width: 32px;
  height: 32px;
  vertical-align: middle;
}
.alert_cont_text > div > span {
  vertical-align: middle;
  margin-left: 5px;
  font-size: 12px;
  color: #000;
}
.alert_btn {
  padding-left: 35px;
  font-size: 0;
}
.alert_btn> button {
  width: 86px;
  height: 28px;
  border: 1px solid #707070;
  background: -webkit-linear-gradient(#ebf3f5 50%, #c5d9e5 50%); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(#ebf3f5 50%, #c5d9e5 50%); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(#ebf3f5 50%, #c5d9e5 50%); /* Firefox 3.6 - 15 */
  background: linear-gradient(#ebf3f5 50%, #c5d9e5 50%); /* 标准的语法（必须放在最后） */
  color: #000;
  border-radius: 3px;
  font-size: 12px;
  line-height: 28px;
  margin-top: 13px;
  margin-left: 10px;
}
.alert_btn> button:nth-child(1) {
  border: 1px solid #3c7eb1;
}
</style>
