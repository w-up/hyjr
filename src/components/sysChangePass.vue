<template>
  <div class="tf_menu_change_pass_wrap">
    <div class="tf_menu_change_pass">
      <div class="tf_menu_change_pass_top">
        <h4>更改密码</h4>
        <img src="../assets/img/closeBgGary.png" @click="sysCloseFun" title="关闭">
      </div>
      <div class="tf_menu_change_pass_cont">
        <div class="tf_menu_change_pass_cont_ipt">
          <div>
            <p>当前密码：</p>
            <div>
              <input type="password" v-model="tfBtnMenuOldPass">
            </div>
          </div>
          <div>
            <p>新密码：</p>
            <div>
              <input type="password" v-model="tfBtnMenuNewPass">
            </div>
          </div>
          <div>
            <p>确认新密码：</p>
            <div>
              <input type="password" v-model="tfBtnMenuRegNewPass">
            </div>
          </div>
        </div>
        <div class="tf_btn7_online_ul_btn">
          <span @click="sysCloseFun">取消</span>
          <span @click="tfBtnMenuChangePassConfirmFun">确定</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SysChangePass",
  components: {},
  data() {
    return {
      tfBtnMenuOldPass: '', // 右键更改交易密码 老密码
      tfBtnMenuNewPass: '', // 右键更改交易密码 新密码
      tfBtnMenuRegNewPass: '', // 右键更改交易密码 确认密码
    };
  },
  mounted: function() {
    $(function() {
      $(".tf_menu_change_pass").draggable({handle: ".tf_menu_change_pass_top", containment: 'body'});
    });
  },
  methods: {
    sysCloseFun() {
      this.$store.commit("isSysChangePassFun");
    },
    tfBtnMenuChangePassConfirmFun() { // 右键更改交易密码确认按钮
      let that = this;
      let userToken = that.$store.state.tokenStr; // 获取token
      if (that.tfBtnMenuOldPass == "") {
        that.$message.error("请输入原密码!");
      } else if (that.tfBtnMenuNewPass == "") {
        that.$message.error("请输入新密码!");
      } else if (that.tfBtnMenuNewPass != that.tfBtnMenuRegNewPass) {
        that.$message.error("密码不一致!");
      } else {
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "modify_login",
              token: userToken,
              old_password: that.tfBtnMenuOldPass,
              password: that.tfBtnMenuNewPass,
              confirm: that.tfBtnMenuRegNewPass
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              // console.log(res.data.data);
              that.$message.success(res.data.msg);
              localStorage.setItem("loginPass", that.tfBtnMenuNewPass);
              that.$store.commit("isSysChangePassFun"); // 更改密码关闭
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      }
    },
  }
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
}
.tf_menu_change_pass {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -230px;
  margin-top: -142.5px;
  z-index: 1500;
  width: 460px;
  height: 285px;
  min-width: 460px;
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

.tf_menu_change_pass_cont_ipt>div {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  align-items: center;
  -webkit-align-items: center;
  margin-top: 25px;
}

.tf_menu_change_pass_cont_ipt>div>p {
  width: 38%;
  line-height: 30px;
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  text-align: right;
}

.tf_menu_change_pass_cont_ipt>div>div {
  width: 62%;
  text-align: left;
  padding-left: 9px;
}

.tf_menu_change_pass_cont_ipt>div>div>input {
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  text-align: left;
  width: 193px;
  height: 30px;
  line-height: 30px;
  border: 1px solid rgba(202, 202, 202, 1);
  padding-left: 4px;
}

.tf_btn7_online_ul_btn {
  margin-top: 25px;
  text-align: center;
}

.tf_btn7_online_ul_btn span {
  display: inline-block;
  width: 100px;
  height: 30px;
  border-radius: 4px;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}

.tf_btn7_online_ul_btn span:nth-child(1) {
  background-color: rgba(189, 189, 189, 1);
  margin-right: 34px;
}

.tf_btn7_online_ul_btn span:nth-child(1):hover {
  background-color: rgb(170, 170, 170);
}

.tf_btn7_online_ul_btn span:nth-child(2) {
  background-color: #EE9D1E;
}

.tf_btn7_online_ul_btn span:nth-child(2):hover {
  background-color: rgb(224, 143, 13);
}

</style>
