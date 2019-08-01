<template>
  <div class="tf_btn7_top_online_alert_wrap">
    <div class="tf_btn7_top_online_alert">
      <div class="tf_btn7_top_online_alert_top">
        <h4>出入金</h4>
        <img src="../assets/img/closeBgGary.png" @click="tfBtn7AlertCloseFun" title="关闭">
      </div>
      <div class="tf_btn7_top_online_alert_cont">
        <h4>出入金说明</h4>
        <div v-html="tfOnlineOutInMoneyInfo.content"></div>
      </div>
      <div class="tf_btn7_top_online_alert_btn_wrap">
        <!-- 在线出入金线下入金按钮 -->
        <div class="tf_btn7_top_online_alert_btn">
          <span
            @click="tfOnlineMoneyBtnFun(tfOnlineMoneyBtn.id)"
            :class="{tf_btn7_online_active: tfOnlineMoneyBtnName == tfOnlineMoneyBtn.name}"
            v-for="tfOnlineMoneyBtn in tfOnlineMoneyBtns"
            :key="tfOnlineMoneyBtn.id"
          >{{tfOnlineMoneyBtn.name}}</span>
          <p>{{tfOnlineOutInMoneyInfo.phone}}</p>
        </div>
        <ul class="tf_btn7_online_enter" v-show="0">
          <li class="tf_btn7_online_enter_li">
            <p>入金通道：</p>
            <div>
              <select v-model="tfBtn7OnlineEnterSelect1">
                <option
                  v-for="passageway in tfOnlineOutInMoneyInfo.passageway"
                  :key="passageway.id"
                >{{passageway.name}}</option>
              </select>
            </div>
          </li>
          <li class="tf_btn7_online_enter_li">
            <p>入金账号：</p>
            <div>
              <select v-model="tfBtn7OnlineEnterSelect2">
                <option>{{tfOnlineOutInMoneyInfo.number}}</option>
              </select>
            </div>
          </li>
          <li class="tf_btn7_online_enter_li">
            <p>到账币种：</p>
            <span>{{tfOnlineOutInMoneyInfo.currency}}</span>
          </li>
          <li class="tf_btn7_online_enter_li">
            <p>金额(人民币)：</p>
            <div>
              <input v-model="tfBtn7OnlineEnterMoney" type="number">
            </div>
          </li>
          <div class="tf_btn7_online_ul_btn">
            <span @click="tfBtn7AlertCloseFun">取消</span>
            <span @click="tfBtn7AlertEnterConfirmFun">在线入金</span>
          </div>
        </ul>
        <ul class="tf_btn7_online_out" v-show="tfOnlineMoneyBtnName == tfOnlineMoneyBtns[0].name">
          <li class="tf_btn7_online_enter_li tf_btn7_online_out_li">
            <p>入金账号：</p>
            <div>
              <select v-model="tfBtn7OnlineEnterSelect2">
                <option>{{tfOnlineOutInMoneyInfo.number}}</option>
              </select>
            </div>
          </li>
          <li class="tf_btn7_online_enter_li tf_btn7_online_out_li">
            <p>金额(人民币)：</p>
            <div>
              <input v-model="tfBtn7OfflineEnterMoney" type="number">
              <span>可用资金: {{tfOnlineOutInMoneyInfo.account}}</span>
            </div>
          </li>
          <div class="tf_btn7_offline_enter">
            <p>入金方式:</p>
            <div class="tf_btn7_offline_enter_bank">
              <div class="tf_btn7_offline_enter_bank_btn" @click="tfOfflineChoosePayFun(1)">
                <img
                  :src="tfOfflineChoosePayName == tfOfflineChoosePayLists[0].name?require('../assets/img/tfActiveBtn.png'):require('../assets/img/tfUnActiveBtn.png')"
                  alt
                >
                <img src="../assets/img/tfBankCard.png" alt>
                <span>银行卡</span>
              </div>
              <div class="tf_btn7_offline_enter_bank_info">
                <p>开户名：{{tfOnlineOutInMoneyOffline.user_name}}</p>
                <p>开户行：{{tfOnlineOutInMoneyOffline.bank_name}}</p>
                <p>账&emsp;号：{{tfOnlineOutInMoneyOffline.bank_card}}</p>
              </div>
            </div>
            <div class="tf_btn7_offline_enter_ali_wx">
              <div class="tf_btn7_offline_enter_ali_wx_flex">
                <div>
                  <div class="tf_btn7_offline_enter_flex_btn" @click="tfOfflineChoosePayFun(2)">
                    <img
                      :src="tfOfflineChoosePayName == tfOfflineChoosePayLists[1].name?require('../assets/img/tfActiveBtn.png'):require('../assets/img/tfUnActiveBtn.png')"
                      alt
                    >
                    <img src="../assets/img/tfAliPay.png" alt>
                    <span>支付宝</span>
                  </div>
                  <div class="tf_btn7_offline_enter_flex_cont">
                    <img :src="tfOnlineOutInMoneyPayImg.ali_pay" alt>
                  </div>
                </div>
                <div>
                  <!-- <div class="tf_btn7_offline_enter_flex_btn" @click="tfOfflineChoosePayFun(3)">
                    <img
                      :src="tfOfflineChoosePayName == tfOfflineChoosePayLists[2].name?require('../assets/img/tfActiveBtn.png'):require('../assets/img/tfUnActiveBtn.png')"
                      alt
                    >
                    <img src="../assets/img/tfWeChatPay.png" alt>
                    <span>微信</span>
                  </div>
                  <div class="tf_btn7_offline_enter_flex_cont">
                    <img :src="tfOnlineOutInMoneyPayImg.we_chat_pay" alt>
                  </div> -->
                </div>
              </div>
              <div class="tf_btn7_offline_enter_pay_money">
                <div id="tf_offline_pay_upload" class="upLoad">
                  <img src alt>
                </div>
              </div>
            </div>
          </div>
          <div class="tf_btn7_online_ul_btn">
            <span @click="tfBtn7AlertCloseFun">取消</span>
            <span @click="tfBtn7AlertOfflineConfirmFun">确认入金</span>
          </div>
        </ul>
        <ul class="tf_btn7_online_out" v-show="tfOnlineMoneyBtnName == tfOnlineMoneyBtns[1].name">
          <li class="tf_btn7_online_enter_li tf_btn7_online_out_li">
            <p>出金账号：</p>
            <div>
              <select v-model="tfBtn7OnlineEnterSelect2">
                <option>{{tfOnlineOutInMoneyInfo.number}}</option>
              </select>
            </div>
          </li>
          <li class="tf_btn7_online_enter_li tf_btn7_online_out_li">
            <p>到账币种：</p>
            <div>
              <p>人民币(¥)</p>
            </div>
          </li>
          <li class="tf_btn7_online_enter_li tf_btn7_online_out_li">
            <p>出金金额({{tfOnlineOutInMoneyInfo.currency}})：</p>
            <div>
              <input v-model="tfBtn7OnlineOutMoney" type="number">
              <span>可用资金: {{tfOnlineOutInMoneyInfo.account}}</span>
            </div>
          </li>
          <div class="tf_btn7_online_ul_btn">
            <span @click="tfBtn7AlertCloseFun">取消</span>
            <span @click="tfBtn7AlertOutConfirmFun">确认出金</span>
          </div>
        </ul>
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
      tfOnlineMoneyBtns: [ // 出入金按钮
        // {id:1, name: "在线入金"},
        {id:2, name: "入金"},
        {id:3, name: "出金"},
      ],
      tfOnlineMoneyBtnName: "入金", // 出入金按钮控制默认在线入金
      tfBtn7OnlineEnterSelect1: "", // 出入金 入金通道
      tfBtn7OnlineEnterSelect2: "", // 出入金 出入金账户
      tfBtn7OnlineEnterMoney: null, // 出入金 入金金额
      tfBtn7OnlineOutMoney: null, // 出入金 出金金额
      tfBtn7OfflineEnterMoney: null, // 出入金 线下入金金额
      tfOfflineChoosePayLists: [ // 选择支付方式
        {id:1, name: "银行卡"},
        {id:2, name: "支付宝"},
        {id:3, name: "微信"}
      ],
      tfOfflineChoosePayName: "银行卡", // 支付方式默认银行卡
      tfOfflineMoneyUrl: "", // 先下入金支付截图
      tfOnlineOutInMoneyFun: "", // 在线出金入金获取信息函数
      tfOnlineOutInMoneyInfo: "", // 在线出金入金获取信息
      tfOnlineOutInMoneyOffline: "", // 在线出金线下入金银行信息
      tfOnlineOutInMoneyPayImg: "", // 在线出金线下入金二维码
    };
  },
  mounted: function() {
    let that = this;
    let userToken = that.$store.state.tokenStr; // 获取token
    that.tfOnlineOutInMoneyFun = function() { //在线入金/出金
      that
        .$http({
          url: "/",
          method: "post",
          data: {
            nozzle: "recharge_info",
            token: userToken
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            // console.log(res.data.data);
            that.tfOnlineOutInMoneyInfo = res.data.data;
            that.tfOnlineOutInMoneyOffline = res.data.data.offline.bank_info; // 银行卡
            that.tfOnlineOutInMoneyPayImg = res.data.data.offline; // 二维码
            that.tfBtn7OnlineEnterSelect1 = res.data.data.passageway[0].name; // 通道默认
            that.tfBtn7OnlineEnterSelect2 = res.data.data.number; // 账户默认
          } else if (res.data.code == 0 || res.data.code == -1) {
            that.$message.error(res.data.msg);
          }
        });
    }
    that.tfOnlineOutInMoneyFun(); // 调用在线出金入金信息函数
    $(function() {
      $(".tf_btn7_top_online_alert").draggable({handle: ".tf_btn7_top_online_alert_top", containment: 'body'}); // 在线出入金弹窗移动
      layui.use("upload", function() {
        var $ = layui.jquery,
          upload = layui.upload;
        //普通图片上传
        var uploadInst1 = upload.render({
          elem: ".tf_btn7_offline_enter_pay_money",
          url: "http://hfjrserve.shienkeji.com/upload",
          before: function(obj) {
            //预读本地文件示例，不支持ie8
            obj.preview(function(index, file, result) {
              $("#tf_offline_pay_upload img").attr("src", result); //图片链接（base64）
            });
          },
          done: function(res) {
            //上传成功
            if (res.code == 1) {
              that.$message.success("上传成功");
              that.tfOfflineMoneyUrl = res.data;
            } else {
              that.$message.error("上传失败");
            }
          },
          error: function() {
            //演示失败状态，并实现重传
            var demoText = $("#demoText");
            demoText.html(
              '<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>'
            );
            demoText.find(".demo-reload").on("click", function() {
              uploadInst.upload();
            });
          }
        });
      });
    });
  },
  methods: {
    tfBtn7AlertCloseFun() {
      // 出入金关闭按钮
      this.$store.commit("isSysOnlineMoneyFun");
    },
    tfBtn7AlertEnterConfirmFun() {
      // 在线入金 确认按钮
      let that = this;
      let userToken = that.$store.state.tokenStr; // 获取token
      let tfBtn7OnlineEnterNum; // 入金通道 1,2,3,4
      if (that.tfBtn7OnlineEnterSelect1 == that.tfOnlineOutInMoneyInfo.passageway[0].name) {
        tfBtn7OnlineEnterNum = 1;
      } else if (that.tfBtn7OnlineEnterSelect1 == that.tfOnlineOutInMoneyInfo.passageway[1].name) {
        tfBtn7OnlineEnterNum = 2;
      } else if (that.tfBtn7OnlineEnterSelect1 == that.tfOnlineOutInMoneyInfo.passageway[2].name) {
        tfBtn7OnlineEnterNum = 3;
      } else if (that.tfBtn7OnlineEnterSelect1 == that.tfOnlineOutInMoneyInfo.passageway[3].name) {
        tfBtn7OnlineEnterNum = 4;
      }
      if (that.tfBtn7OnlineEnterMoney == null) {
        that.$message.warning("请输入入金金额!")
      } else {
        //console.log(that.tfBtn7OnlineEnterSelect1,tfBtn7OnlineEnterNum, that.tfBtn7OnlineEnterMoney);
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "recharge",
              token: userToken,
              passageway: tfBtn7OnlineEnterNum,
              number: that.tfBtn7OnlineEnterMoney
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              that.$message.success(res.data.msg);
              that.$store.commit("isSysOnlineMoneyFun");
              that.tfBtn7OnlineEnterMoney = ""; // 金额置空
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      }
    },
    tfOnlineMoneyBtnFun(index) {
      // 在线出入金线下入金按钮切换
      for (let i = 0; i < this.tfOnlineMoneyBtns.length; i++) {
        if (index == this.tfOnlineMoneyBtns[i].id) {
          this.tfOnlineMoneyBtnName = this.tfOnlineMoneyBtns[i].name;
        }
      }
    },
    tfOfflineChoosePayFun(index) {
      // 在线出入金选择其中一种方式
      for (let i = 0; i < this.tfOfflineChoosePayLists.length; i++) {
        if (index == this.tfOfflineChoosePayLists[i].id) {
          this.tfOfflineChoosePayName = this.tfOfflineChoosePayLists[i].name;
        }
      }
    },
    tfBtn7AlertOutConfirmFun() { // 在线出金 确认按钮
      let that = this;
      let userToken = that.$store.state.tokenStr; // 获取token
      // console.log(that.tfBtn7OnlineOutMoney);
      if (that.tfBtn7OnlineOutMoney == null) {
        that.$message.warning("请输入出金金额!")
      } else {
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "withdraw",
              token: userToken,
              number: that.tfBtn7OnlineOutMoney
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              that.$message.success(res.data.msg);
              that.$store.commit("isSysOnlineMoneyFun");
              that.tfBtn7OnlineOutMoney = ""; // 金额置空
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      }
    },
    tfBtn7AlertOfflineConfirmFun() { // 线下入金 确认按钮
      let that = this;
      let userToken = that.$store.state.tokenStr; // 获取token
      let choosePayNum; // 支付方式 1银行 2微信 3支付宝
      if (that.tfOfflineChoosePayName == that.tfOfflineChoosePayLists[0].name) {
        choosePayNum = 1;
      } else if (that.tfOfflineChoosePayName == that.tfOfflineChoosePayLists[1].name) {
        choosePayNum = 3;
      } else if (that.tfOfflineChoosePayName == that.tfOfflineChoosePayLists[2].name) {
        choosePayNum = 2;
      }
      if (that.tfBtn7OfflineEnterMoney == null) {
        that.$message.warning("请输入出金金额!");
      } else if (that.tfOfflineMoneyUrl == "") {
        that.$message.warning("请上传支付截图!");
      } else {
        // console.log(that.tfBtn7OfflineEnterMoney, choosePayNum, that.tfOfflineMoneyUrl)
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "offline",
              token: userToken,
              number: that.tfBtn7OfflineEnterMoney,
              passageway: choosePayNum,
              picture: that.tfOfflineMoneyUrl
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              that.$message.success(res.data.msg);
              that.$store.commit("isSysOnlineMoneyFun");
              that.tfBtn7OfflineEnterMoney = null; // 金额置空
              that.tfOfflineMoneyUrl = ""; // 图片链接置空
              $("#tf_offline_pay_upload img").attr("src", ""); // 图片置空
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
/* 在线出金入金弹窗 */
.tf_btn7_top_online_alert_wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1500;
  background-color: rgba(0, 0, 0, 0.6);
}

.tf_btn7_top_online_alert {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1500;
  margin-left: -300px;
  margin-top: -284px;
  width: 600px;
  height: 568px;
  min-width: 650px;
  border-radius: 15px;
  background: white;
}

.tf_btn7_top_online_alert_top {
  position: relative;
  width: 100%;
  height: 40px;
  border-radius: 15px 15px 0px 0px;
  background-color: rgba(235, 235, 238, 1);
  text-align: center;
}

.tf_btn7_top_online_alert_top>h4 {
  color: rgba(16, 16, 16, 1);
  font-size: 18px;
  line-height: 40px;
  display: inline-block;
}

.tf_btn7_top_online_alert_top>img {
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

.tf_btn7_top_online_alert_top>img:hover {
  background: #999;
}

.tf_btn7_top_online_alert_cont {
  padding: 0 20px;
}

.tf_btn7_top_online_alert_cont>h4 {
  height: 15px;
  color: rgba(0, 0, 0, 1);
  font-size: 15px;
  line-height: 15px;
  margin-top: 20px;
}

.tf_btn7_top_online_alert_cont>div {
  width: 100%;
  height: 152px;
  background-color: rgba(247, 247, 247, 1);
  margin-top: 20px;
  overflow-y: auto;
  padding: 10px 15px;
  text-align: justify;
  font-size: 14px;
  /* line-height: 16px; */
  color: rgba(0, 0, 0, 1);
}
/* 滚动条整体部分 */
.tf_btn7_top_online_alert_cont > div::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  background-color: rgba(230, 230, 232, 1);
  text-align: center;
}

/* 外层轨道 */
.tf_btn7_top_online_alert_cont > div::-webkit-scrollbar-track {
  background-color: rgba(230, 230, 232, 1);
  border-radius: 6px;
  width: 6px;
  padding: 0 4px;
}

/* 滚动条滑块 */
.tf_btn7_top_online_alert_cont > div::-webkit-scrollbar-thumb {
  border-radius: 6px;
  /* border: 1px solid #807c7c; */
  background: rgba(213, 210, 210, 1);
  width: 6px;
}

.tf_btn7_top_online_alert_btn_wrap {
  margin-top: 20px;
}

.tf_btn7_top_online_alert_btn {
  font-size: 0;
  margin: 0 20px;
  border-bottom: 1px solid rgba(223, 223, 223, 1);
}

.tf_btn7_top_online_alert_btn>span {
  display: inline-block;
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  border-radius: 4px;
}

.tf_btn7_top_online_alert_btn>span:hover {
  background-color: rgb(238, 157, 30);
  color: rgba(255, 255, 255, 1);
}

.tf_btn7_top_online_alert_btn .tf_btn7_online_active {
  background-color: rgb(238, 157, 30);
  color: rgba(255, 255, 255, 1);
}

.tf_btn7_top_online_alert_btn>p {
  display: block;
  color: rgba(255, 36, 36, 1);
  font-size: 14px;
  line-height: 30px;
  float: right;
}

/* 入金 */
.tf_btn7_online_enter,
.tf_btn7_online_out {
  padding: 0 25px;
  height: 254px;
  overflow-y: auto;
}
.tf_btn7_online_out::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  background-color: rgba(230, 230, 232, 1);
  text-align: center;
}

/* 外层轨道 */
.tf_btn7_online_out::-webkit-scrollbar-track {
  background-color: rgba(230, 230, 232, 1);
  border-radius: 6px;
  width: 6px;
  padding: 0 4px;
}

/* 滚动条滑块 */
.tf_btn7_online_out::-webkit-scrollbar-thumb {
  border-radius: 6px;
  /* border: 1px solid #807c7c; */
  background: rgba(213, 210, 210, 1);
  width: 6px;
}

.tf_btn7_online_enter_li {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  align-items: center;
  -webkit-align-items: center;
  margin-top: 20px;
}

.tf_btn7_online_enter_li>p {
  width: 45%;
  text-align: right;
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
}

.tf_btn7_online_out_li>p {
  width: 33%;
}

.tf_btn7_online_enter_li>div {
  width: 52%;
  text-align: left;
  padding-left: 9px;
}

.tf_btn7_online_out_li>div {
  width: 61%;
}

.tf_btn7_online_out_li>div>span {
  line-height: 20px;
  color: rgba(255, 36, 36, 1);
  font-size: 14px;
  text-align: left;
  margin-left: 10px;
}
.tf_btn7_online_out_li>div>p {
  display: inline-block;
  width: 170px;
  height: 30px;
  line-height: 30px;
  color: rgba(16, 16, 16, 1);
  border: 1px solid rgba(187, 187, 187, 1);
  padding-left: 4px;
  font-size: 14px;
  border-radius: 4px;
}

.tf_btn7_online_enter_li>div>select {
  width: 170px;
  height: 30px;
  line-height: 30px;
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  border: 1px solid rgba(187, 187, 187, 1);
  border-radius: 4px;
}

.tf_btn7_online_enter_li>span {
  display: inline-block;
  margin-left: 9px;
  text-align: left;
  width: 170px;
  height: 30px;
  line-height: 30px;
  color: rgba(16, 16, 16, 1);
  border: 1px solid rgba(187, 187, 187, 1);
  padding-left: 4px;
  font-size: 14px;
  border-radius: 4px;
}

.tf_btn7_online_enter_li>div>input {
  width: 170px;
  height: 28px;
  line-height: 28px;
  border: 1px solid rgba(187, 187, 187, 1);
  padding-left: 4px;
  color: rgba(16, 16, 16, 1);
  border-radius: 4px;
}

.tf_btn7_offline_enter {
  width: 422px;
  margin: auto;
}

.tf_btn7_offline_enter>p {
  height: 20px;
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  margin-top: 20px;
}

.tf_btn7_offline_enter_bank {
  margin-top: 20px;
}
.tf_btn7_offline_enter_bank>.tf_btn7_offline_enter_bank_btn{
  display: inline-block;
  cursor: pointer;
}
.tf_btn7_offline_enter_bank>.tf_btn7_offline_enter_bank_btn>img {
  width: 20px;
  height: 20px;
  vertical-align: top;
}
.tf_btn7_offline_enter_bank>.tf_btn7_offline_enter_bank_btn>span {
  color: rgba(8, 16, 62, 1);
  line-height: 20px;
  font-size: 14px;
  vertical-align: top;
}

.tf_btn7_offline_enter_bank_info {
  margin: 6px 0 0 20px;
}
.tf_btn7_offline_enter_bank_info>p {
  color: rgba(179, 179, 179, 1);
  font-size: 14px;
  line-height: 20px;
}

.tf_btn7_offline_enter_ali_wx {
  margin-top: 20px;
}
.tf_btn7_offline_enter_ali_wx_flex {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  align-items: center;
  -webkit-align-items: center;
}
.tf_btn7_offline_enter_ali_wx_flex>div{
  width: 50%;
}
.tf_btn7_offline_enter_ali_wx_flex>div>.tf_btn7_offline_enter_flex_btn{
  display: inline-block;
  cursor: pointer;
}
.tf_btn7_offline_enter_ali_wx_flex>div>.tf_btn7_offline_enter_flex_btn>img{
  width: 20px;
  height: 20px;
  vertical-align: top;
}
.tf_btn7_offline_enter_ali_wx_flex>div>.tf_btn7_offline_enter_flex_btn>span{
  color: rgba(8, 16, 62, 1);
  line-height: 20px;
  font-size: 14px;
  vertical-align: top;
}
.tf_btn7_offline_enter_ali_wx_flex>div>.tf_btn7_offline_enter_flex_cont {
  text-align: center;
  margin-top: 20px;
}
.tf_btn7_offline_enter_ali_wx_flex>div>.tf_btn7_offline_enter_flex_cont>img {
  border: 1px solid #f0f0f0;
  width: 168px;
  height: 168px;
}
.tf_btn7_offline_enter_pay_money {
  width: 380px;
  height: 180px;
  border-radius: 4px;
  border: 1px solid rgba(187, 187, 187, 1);
  margin: 20px auto 0;
  cursor: pointer;
}
/* 上传图片 */
#tf_offline_pay_upload {
  width: 100%;
  height: 100%;
}
#tf_offline_pay_upload> img {
  width: 100%;
  height: 100%;
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
