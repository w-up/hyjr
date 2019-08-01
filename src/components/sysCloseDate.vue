<template>
  <div class="tf_menu_change_pass_wrap" v-focus @keyup.enter="keyWordEnterFun" tabindex="0">
    <div class="tf_menu_info_time">
      <div class="tf_menu_change_pass_top">
        <h4>信息</h4>
        <img src="../assets/img/closeBgGary.png" @click="loginDisclaimerCloseFun" title="关闭">
      </div>
      <div class="tf_menu_info_time_cont">
        <div class="tf_menu_info_time_cont_time">
          <img src="../assets/img/info.png" alt>
          <p>每个交易日的06:00</p>
        </div>
        <div class="tf_menu_info_time_cont_btn">
          <span @click="loginDisclaimerCloseFun">确定</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SysCloseDate",
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
      $(".tf_menu_info_time").draggable({handle: ".tf_menu_change_pass_top", containment: 'body'});
    });
  },
  methods: {
    loginDisclaimerCloseFun() {
      this.$store.commit("isSysCloseDateFun");
    },
    keyWordEnterFun() {
      this.$store.commit("isSysCloseDateFun");
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tf_menu_change_pass_wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1500;
  background-color: rgba(0, 0, 0, 0.6);
  outline: none;
}
.tf_menu_info_time {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -150px;
  margin-top: -100px;
  z-index: 1500;
  width: 300px;
  height: 200px;
  min-width: 300px;
  border-radius: 15px;
  background: white;
}

.tf_menu_change_pass_top {
  position: relative;
  width: 100%;
  height: 40px;
  border-radius: 21px 21px 0px 0px;
  background-color: rgba(235, 235, 238, 1);
  text-align: center;
}

.tf_menu_change_pass_top>h4 {
  color: rgba(16, 16, 16, 1);
  font-size: 18px;
  line-height: 40px;
  display: inline-block;
}

.tf_menu_change_pass_top>img {
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

.tf_menu_change_pass_top>img:hover {
  background: #999;
}

.tf_menu_info_time_cont_time {
  text-align: center;
  margin-top: 41px;
}

.tf_menu_info_time_cont_time>img {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}

.tf_menu_info_time_cont_time>p {
  display: inline-block;
  line-height: 30px;
  color: rgba(16, 16, 16, 1);
  font-size: 16px;
  vertical-align: middle;
}

.tf_menu_info_time_cont_btn {
  margin-top: 30px;
  width: 100%;
  text-align: center;
}

.tf_menu_info_time_cont_btn>span {
  display: inline-block;
  width: 100px;
  height: 30px;
  border-radius: 4px;
  background-color: rgba(238, 157, 30, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}

.tf_menu_info_time_cont_btn>span:hover {
  background-color: rgb(224, 143, 13);
}
</style>
