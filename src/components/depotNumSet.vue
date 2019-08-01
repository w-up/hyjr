<template>
  <div class="tf_btn_more_alert_wrap" v-if="stateShow">
    <div class="tf_btn_entrust_alert">
      <div class="tf_btn_entrust_alert_top">
        <h4>{{this.msg.depotChoose == 2?"止盈":"止损"}}设置</h4>
        <img src="../assets/img/closeBgGary.png" @click="tfDepotCloseFun" title="关闭">
      </div>
      <div class="tf_btn_entrust_alert_cont">
        <div>
          <div>
            <span>合约名称: </span>
            <h4>{{msg.depotinfo.contract}}</h4>
          </div>
          <div>
            <span>{{this.msg.depotChoose == 2?"止盈":"止损"}}数量: </span>
            <input type="number" v-model="depotNum">
          </div>
          <div>
            <span>{{this.msg.depotChoose == 2?"止盈":"止损"}}价格: </span>
            <input type="number" v-model="depotPrice">
          </div>
        </div>
        <div class="tf_btn7_online_ul_btn">
          <span @click="tfDepotCloseFun">禁止</span>
          <span @click="tfDepotConfirmFun">启用</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DepotNumSet",
  components: {},
  props: {
    msg: "", // 委托 选中的合约信息
    stateShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      depotNum: "", // 数量
      depotPrice: "", // 价格
    };
  },
  mounted: function() {
    $(function() {
      $(".tf_btn_entrust_alert").draggable({handle: ".tf_btn_entrust_alert_top", containment: 'body'}); // 云预埋单弹窗移动
    });
  },
  methods: {
    tfDepotCloseFun() { // 委托 改价关闭弹窗
      this.$emit("tfChangeDepotStateFun", false); // 更改显示隐藏状态
    },
    tfDepotConfirmFun() { // 委托 改价 确认按钮
      let that = this;
      let userToken = that.$store.state.tokenStr; // 获取token
      if (that.depotNum == "") {
        that.$message.error("请输入数量");
      } else if (that.depotPrice == "") {
        that.$message.error("请输入价格");
      } else {
        if (that.msg.depotChoose == 1) { // 止损
          that
            .$http({
              url: "/",
              method: "post",
              data: {
                nozzle: "set_loss",
                token: userToken,
                mark: that.msg.depotinfo.id,
                number: that.depotNum,
                price: that.depotPrice
              }
            })
            .then(res => {
              if (res.data.code == 1) {
                // console.log(res.data.data);
                that.$message.success(res.data.msg);
                // that.entrustBtmContListsFun(0); // 刷新委托
                this.$emit("tfChangeDepotStateFun", false); // 更改显示隐藏状态
              } else if (res.data.code == 0 || res.data.code == -1) {
                that.$message.error(res.data.msg);
              }
            });
        } else if (that.msg.depotChoose == 2) { // 止盈
          that
            .$http({
              url: "/",
              method: "post",
              data: {
                nozzle: "set_profit",
                token: userToken,
                mark: that.msg.depotinfo.id,
                number: that.depotNum,
                price: that.depotPrice
              }
            })
            .then(res => {
              if (res.data.code == 1) {
                // console.log(res.data.data);
                that.$message.success(res.data.msg);
                // that.entrustBtmContListsFun(0); // 刷新委托
                this.$emit("tfChangeDepotStateFun", false); // 更改显示隐藏状态
              } else if (res.data.code == 0 || res.data.code == -1) {
                that.$message.error(res.data.msg);
              }
            });
        }
        
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tf_btn_more_alert_wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  background-color: rgba(0, 0, 0, 0.6);
}
.tf_btn_entrust_alert {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -195px;
  margin-top: -135px;
  z-index: 1500;
  width: 390px;
  height: 270px;
  min-width: 390px;
  border-radius: 15px;
  background: white;
}

.tf_btn_entrust_alert_top,
.tf_btn_more_alert_top {
  position: relative;
  width: 100%;
  height: 40px;
  border-radius: 15px 15px 0px 0px;
  background-color: rgba(235, 235, 238, 1);
  text-align: center;
}
.tf_btn_entrust_alert_top>h4,
.tf_btn_more_alert_top>h4 {
  color: rgba(16, 16, 16, 1);
  font-size: 18px;
  line-height: 40px;
  display: inline-block;
}
.tf_btn_entrust_alert_top>img,
.tf_btn_more_alert_top>img {
  position: absolute;
  top: 7px;
  right: 12px;
  width: 26px;
  height: 26px;
  padding: 5px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
}
.tf_btn_entrust_alert_top>img:hover,
.tf_btn_more_alert_top>img:hover {
  background: #999;
}
.tf_btn_entrust_alert_cont {
  padding: 0 20px;
}
.tf_btn_more_alert_cont {
  padding: 0 25px;
}
.tf_btn_entrust_alert_cont>div {
  width: 100%;
  height: 130px;
}
.tf_btn_entrust_alert_cont>div>div {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  align-items: center;
  -webkit-align-items: center;
  margin-top: 20px;
}
.tf_btn_entrust_alert_cont>div>div>span {
  display: inline-block;
  width: 48%;
  font-size: 15px;
  line-height: 30px;
  color: #333;
  text-align: right;
  margin-right: 10px;
}
.tf_btn_entrust_alert_cont>div>div>h4 {
  font-size: 15px;
  line-height: 30px;
  color: #333;
}
.tf_btn_entrust_alert_cont>div>div>p {
  font-size: 15px;
  line-height: 30px;
  color: #333;
  text-align: left;
}
.tf_btn_entrust_alert_cont>div>div>input {
  width: 100px;
  font-size: 15px;
  line-height: 30px;
  color: #333;
  height: 30px;
  padding-left: 4px;
  border: 1px solid rgba(202, 202, 202, 1);
}
.tf_btn7_online_ul_btn {
  width: 100%;
  margin-top: 23px;
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
