<template>
  <div class="login_disclaimer">
    <div class="login_disclaimer_wrap_alert" :class="{login_disclaimer_height: !drawLossRadio1}">
      <div class="login_disclaimer_wrap_alert_top">
        <h4>画线下单</h4>
        <img src="../assets/img/closeBgGary.png" @click="drawOrderCloseFun" title="关闭">
      </div>
      <div class="draw_alert_wrap">
        <div class="draw_alert_top draw_alert_top1">
          <div class="draw_alert_top1_user">
            <span>账号</span>
            <select v-model="drawSelectUser">
              <option>{{drawSelectUser}}</option>
            </select>
          </div>
          <div>
            <input v-model="drawLossRadio1" type="checkbox" id="draw_loss_radio1">
            <label for="draw_loss_radio1" class="mark">止损</label>
          </div>
        </div>
        <div class="draw_alert_top draw_alert_top2">
          <div>
            <span>手数</span>
            <input v-model="drawHandNum" type="number">
            <img @click="drawHandNumSubFun" src="../assets/img/sub.png" alt>
            <img @click="drawHandNumAddFun" src="../assets/img/add.png" alt>
          </div>
          <div class="draw_alert_top2_btn">
            <span
              @click="drawOrderBtnsFun(drawOrderBtn.id)"
              :class="{draw_order_btns_active: drawOrderBtn.id == drawOrderBtnName}"
              v-for="drawOrderBtn in drawOrderBtns"
              :key="drawOrderBtn.id"
            >{{drawOrderBtn.name}}</span>
          </div>
        </div>
        <div class="draw_alert_top draw_alert_top3" v-show="drawLossRadio1">
          <select v-model="drawSelectData">
            <option value="当日有效">当日有效</option>
            <option value="永久有效">永久有效</option>
          </select>
          <div>
            <input v-model="drawLossRadio2" type="checkbox" id="draw_loss_radio2">
            <label for="draw_loss_radio2" class="mark">市价止盈损</label>
          </div>
          <div>
            <span>N秒后市价</span>
            <input v-model="drawSecPrice" type="number">
            <img @click="drawSecPriceSubFun" src="../assets/img/sub.png" alt>
            <img @click="drawSecPriceAddFun" src="../assets/img/add.png" alt>
          </div>
        </div>
        <div class="draw_alert_top draw_alert_top4" v-show="drawLossRadio1">
          <div>
            <div>
              <span>回撤跳止损</span>
            </div>
            <input v-model="drawBackPrice" type="number">
            <img @click="drawBackPriceSubFun" src="../assets/img/sub.png" alt>
            <img @click="drawBackPriceAddFun" src="../assets/img/add.png" alt>
          </div>
          <div>
            <div>
              <input v-model="drawLossRadio3" type="checkbox" id="draw_loss_radio3">
              <label for="draw_loss_radio3" class="mark">按跳止损</label>
            </div>
            <input v-model="drawLossPrice" type="number">
            <img @click="drawLossPriceSubFun" src="../assets/img/sub.png" alt>
            <img @click="drawLossPriceAddFun" src="../assets/img/add.png" alt>
          </div>
          <div>
            <div>
              <input v-model="drawLossRadio4" type="checkbox" id="draw_loss_radio4">
              <label for="draw_loss_radio4" class="mark">按跳止盈</label>
            </div>
            <input v-model="drawGainPrice" type="number">
            <img @click="drawGainPriceSubFun" src="../assets/img/sub.png" alt>
            <img @click="drawGainPriceAddFun" src="../assets/img/add.png" alt>
          </div>
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
      drawSelectUser: "", // 三键六键下单 select 默认选中
      drawOptionUsers: [], // 三键六键下单 option
      drawHandNum: 1, // 手数
      drawOrderBtns: [
        // 买开 卖开 平多 平空 按钮
        { id: 1, name: "买开" },
        { id: 2, name: "卖开" },
        { id: 3, name: "平多" },
        { id: 4, name: "平空" }
      ],
      drawOrderBtnName: "", // 控制按钮颜色
      drawSelectData: "当日有效", // 止损开仓弹窗 有效期
      drawLossRadio1: true, // 止损
      drawLossRadio2: false, // 市价止盈损
      drawLossRadio3: true, // 按跳止损
      drawLossRadio4: true, // 按跳止赢
      drawSecPrice: 0, // N秒后市价
      drawBackPrice: 0, // 回撤跳止损
      drawLossPrice: 0, // 按跳止损
      drawGainPrice: 0, // 按跳止盈
      getOrderOneInfoFun: "", // 获取选中的合约的信息
      tfOrderSubAddPrice: "", // 加减数
    };
  },
  mounted: function() {
    $(function() {
      $(".login_disclaimer_wrap_alert").draggable({
        handle: ".login_disclaimer_wrap_alert_top",
        containment: "body"
      });
    });
    let that = this;
    that.getOrderOneInfoFun = function(index) { // 获取选中的合约信息
      let userToken = that.$store.state.tokenStr; // 获取token
      that.drawSelectUser = that.$store.state.userName;
      that
        .$http({
          url: "/",
          method: "post",
          data: {
            nozzle: "option_contract",
            token: that.$store.state.tokenStr,
            code: index
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            // console.log(res.data.data);
            that.tfOrderSubAddPrice = res.data.data.current_info.wave_spot; // 加减数
            let num;
            if (this.tfOrderSubAddPrice.indexOf(".") == -1) {
              num = 0;
            } else {
              num = Number(this.tfOrderSubAddPrice).toString().split(".")[1].length;
            }
            window.sessionStorage.setItem("drawNumPoint", num);
          } else if (res.data.code == 0 || res.data.code == -1) {
            that.$message.error(res.data.msg);
          }
        });
    }
    that.getOrderOneInfoFun(this.$store.state.codeName); // 获取选中的合约的信息
  },
  methods: {
    drawOrderCloseFun() {
      //画线下单关闭
      this.$store.commit("isDrawOrderFun");
    },
    drawHandNumSubFun() {
      // 画线手数 减
      if (this.drawHandNum <= 1) {
        this.drawHandNum = 1;
      } else {
        this.drawHandNum = Math.floor(this.drawHandNum) - 1;
      }
    },
    drawHandNumAddFun() {
      // 画线手数 加
      this.drawHandNum = Math.floor(this.drawHandNum) + 1;
    },
    drawSecPriceSubFun() {
      // 画线N秒后市价 减
      if (this.drawSecPrice <= 0) {
        this.drawSecPrice = 0;
      } else {
        this.drawSecPrice = Math.floor(this.drawSecPrice) - 1;
      }
    },
    drawSecPriceAddFun() {
      // 画线N秒后市价 加
      this.drawSecPrice = Math.floor(this.drawSecPrice) + 1;
    },
    drawBackPriceSubFun() {
      // 回撤跳止损 减
      if (this.drawBackPrice <= 0) {
        this.drawBackPrice = 0;
      } else {
        this.drawBackPrice = Math.floor(this.drawBackPrice) - 1;
      }
    },
    drawBackPriceAddFun() {
      // 回撤跳止损 加
      this.drawBackPrice = Math.floor(this.drawBackPrice) + 1;
    },
    drawLossPriceSubFun() {
      // 按跳止损 减
      if (this.drawLossPrice <= 0) {
        this.drawLossPrice = 0;
      } else {
        let num;
        if (this.tfOrderSubAddPrice.indexOf(".") == -1) {
          num = 0;
        } else {
          num = Number(this.tfOrderSubAddPrice).toString().split(".")[1].length;
        }
        this.drawLossPrice = (Number(this.drawLossPrice) - Number(this.tfOrderSubAddPrice)).toFixed(num);
      }
    },
    drawLossPriceAddFun() {
      // 按跳止损 加
      let num;
        if (this.tfOrderSubAddPrice.indexOf(".") == -1) {
          num = 0;
        } else {
          num = Number(this.tfOrderSubAddPrice).toString().split(".")[1].length;
        }
        this.drawLossPrice = (Number(this.drawLossPrice) + Number(this.tfOrderSubAddPrice)).toFixed(num);
    },
    drawGainPriceSubFun() {
      // 按跳止盈 减
      if (this.drawGainPrice <= 0) {
        this.drawGainPrice = 0;
      } else {
        let num;
        if (this.tfOrderSubAddPrice.indexOf(".") == -1) {
          num = 0;
        } else {
          num = Number(this.tfOrderSubAddPrice).toString().split(".")[1].length;
        }
        this.drawGainPrice = (Number(this.drawGainPrice) - Number(this.tfOrderSubAddPrice)).toFixed(num);
      }
    },
    drawGainPriceAddFun() {
      // 按跳止盈 加
      let num;
      if (this.tfOrderSubAddPrice.indexOf(".") == -1) {
        num = 0;
      } else {
        num = Number(this.tfOrderSubAddPrice).toString().split(".")[1].length;
      }
      this.drawGainPrice = (Number(this.drawGainPrice) + Number(this.tfOrderSubAddPrice)).toFixed(num);
    },
    drawOrderBtnsFun(index) {
      // 买开等按钮
      for (let i = 0; i < this.drawOrderBtns.length; i++) {
        if (index == this.drawOrderBtns[i].id) {
          this.drawOrderBtnName = index;
          window.Kline.instance.chartMgr.setRunningMode(13);
        }
      }
      window.sessionStorage.setItem("userToken", this.$store.state.tokenStr);
      window.sessionStorage.setItem("drawHandNum", this.drawHandNum);
      if (this.drawSelectData == "当日有效") {
        window.sessionStorage.setItem("drawSelectData", 0); // 当日有效
      } else {
        window.sessionStorage.setItem("drawSelectData", 1); // 永久有效
      }
      if (this.drawLossRadio2 == false) { // 市价止盈损
        window.sessionStorage.setItem("drawLossRadio2", 0); // 0 非校验 1校验
      } else {
        window.sessionStorage.setItem("drawLossRadio2", 1); // 0 非校验 1校验
      }
      if (this.drawLossRadio3 == false) { // 按跳止损 1按跳 ，0：按价格
        window.sessionStorage.setItem("drawLossRadio3", 0);
      } else {
        window.sessionStorage.setItem("drawLossRadio3", 1);
      }
      if (this.drawLossRadio4 == false) { // 按跳止赢 1按跳 ，0：按价格
        window.sessionStorage.setItem("drawLossRadio4", 0);
      } else {
        window.sessionStorage.setItem("drawLossRadio4", 1);
      }
      window.sessionStorage.setItem("drawSecPrice", this.drawSecPrice); // N秒后市价
      window.sessionStorage.setItem("drawBackPrice", this.drawBackPrice); // 回撤跳止损
      window.sessionStorage.setItem("drawLossPrice", this.drawLossPrice); // 按跳止损价格
      window.sessionStorage.setItem("drawGainPrice", this.drawGainPrice); // 按跳止盈价格
      if (index == 1) { // 买开
        window.sessionStorage.setItem("drawTimeType", 1); // 价格类型 0 大于最新价 1 小于最新价
        window.sessionStorage.setItem("drawMold", 0); //0：开仓 1：平仓
        window.sessionStorage.setItem("drawDirection", 0); //0：买涨(买入) 1：买跌(卖出)
      } else if (index == 2) { //卖开
        window.sessionStorage.setItem("drawTimeType", 1); // 价格类型 0 大于最新价 1 小于最新价
        window.sessionStorage.setItem("drawMold", 0); //0：开仓 1：平仓
        window.sessionStorage.setItem("drawDirection", 1); //0：买涨(买入) 1：买跌(卖出)
      } else if (index == 3) { //平多
        window.sessionStorage.setItem("drawTimeType", 0); // 价格类型 0 大于最新价 1 小于最新价
        window.sessionStorage.setItem("drawMold", 1); //0：开仓 1：平仓
        window.sessionStorage.setItem("drawDirection", 0); //0：买涨(买入) 1：买跌(卖出)
      } else if (index == 4) { //平空
        window.sessionStorage.setItem("drawTimeType", 0); // 价格类型 0 大于最新价 1 小于最新价
        window.sessionStorage.setItem("drawMold", 1); //0：开仓 1：平仓
        window.sessionStorage.setItem("drawDirection", 1); //0：买涨(买入) 1：买跌(卖出)
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login_disclaimer_wrap_alert {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -200px;
  margin-top: -130px;
  z-index: 1500;
  width: 400px;
  height: 240px;
  border-radius: 15px;
  background: white;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
.login_disclaimer_height{
  height: 130px;
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

.draw_alert_wrap {
  padding: 0 10px 0;
}
.draw_alert_top {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  align-items: center;
  -webkit-align-items: center;
  margin-top: 10px;
}

.draw_alert_top1 > .draw_alert_top1_user > span {
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  vertical-align: middle;
}

.draw_alert_top1 > .draw_alert_top1_user > select {
  width: 247px;
  height: 30px;
  line-height: 30px;
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  border: 1px solid rgba(232, 232, 232, 1);
  vertical-align: middle;
  padding-left: 5px;
  border-radius: 4px;
}

.draw_alert_wrap input {
  vertical-align: middle;
}

.draw_alert_wrap label {
  vertical-align: middle;
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  cursor: pointer;
}

.draw_alert_wrap input[type="checkbox"] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
  vertical-align: middle;
  cursor: pointer;
}

.mark::before {
  /* content: '\a0'; */
  content: "\2713";
  background-color: rgba(170, 170, 170, 1);
  color: white;
  font-size: 10px;
  line-height: 14px;
  display: inline-block;
  /* border: 1px solid silver; */
  border: 0 none;
  text-align: center;
  width: 14px;
  height: 14px;
  font-weight: bold;
  margin-right: 5px;
  vertical-align: middle;
}

.draw_alert_wrap input[type="checkbox"]:checked + .mark::before {
  content: "\2713";
  color: white;
  background: #fa8e53;
  font-size: 10px;
  line-height: 14px;
  text-align: center;
  margin-right: 5px;
  vertical-align: middle;
}
.draw_alert_top2> .draw_alert_top2_btn>span {
  display: inline-block;
  width: 50px;
  height: 30px;
  line-height: 30px;
  color: #333;
  font-size: 14px;
  border: 1px solid rgba(232, 232, 232, 1);
  border-radius: 4px;
  margin-left: 3px;
  text-align: center;
}
.draw_alert_top2> div >.draw_order_btns_active {
  background-color: rgba(221, 221, 221, 1);
}

.draw_alert_top > div > span {
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  line-height: 30px;
  vertical-align: middle;
}

.draw_alert_top > div > input {
  width: 50px;
  height: 30px;
  line-height: 30px;
  background-color: rgba(221, 221, 221, 1);
  border-radius: 4px;
  text-align: right;
  font-size: 14px;
  padding-right: 4px;
}

.draw_alert_top > div > img {
  width: 17px;
  height: 17px;
  margin-left: 3px;
  cursor: pointer;
}

.draw_alert_top3 > select {
  width: 90px;
  height: 30px;
  line-height: 30px;
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  border: 1px solid rgba(232, 232, 232, 1);
  vertical-align: middle;
  padding-left: 5px;
  border-radius: 4px;
}
.draw_alert_top4>div>div{
  margin-bottom: 10px;
}
</style>
