<template>
    <div class="tf_btn_more_alert_wrap">
      <div class="tf_btn_more_alert">
        <div class="tf_btn_more_alert_top">
          <h4>添加预埋单</h4>
          <img src="../assets/img/closeBgGary.png" @click="tfRightBtnMoreAlertCloseFun" title="关闭">
        </div>
        <div class="tf_btn_more_alert_cont">
          <div class="tf_btn_more_alert_cont_btm">
            <div class="tf_btn_more_alert_cont_btm_r">
              <div class="tf_more_alert_r_top">
                <span>合约</span>
                <select v-model="tfBtmThreeOrderSelect"  @change="tfChangeSelectFun(tfBtmThreeOrderSelect)">
                  <option v-for="tfBtmThreeOrderOption in tfBtmThreeOrderOptions" :key="tfBtmThreeOrderOption.id">{{tfBtmThreeOrderOption.contract_name}}</option>
                </select>
              </div>
              <div class="tf_more_alert_r_btns">
                <span
                  @click="tfMoreAlertRBtnsFun(tfMoreAlertRBtn.id)"
                  :class="tfMoreAlertRBtn.isClicked?'tf_more_alert_r_btns_active':''"
                  v-for="tfMoreAlertRBtn in tfMoreAlertRBtns"
                  :key="tfMoreAlertRBtn.id"
                >{{tfMoreAlertRBtn.name}}</span>
              </div>
              <div class="tf_more_alert_r_ipts">
                <div>
                  <span>价格</span>
                  <input v-model="tfMoreAlertRightIpt1" type="text">
                  <img @click="tfMoreAlertRightSubFun1" src="../assets/img/sub.png" alt>
                  <img @click="tfMoreAlertRightAddFun1" src="../assets/img/add.png" alt>
                </div>
                <div>
                  <span>手数</span>
                  <input v-model="tfMoreAlertRightIpt2" type="number">
                  <img @click="tfMoreAlertRightSubFun2" src="../assets/img/sub.png" alt>
                  <img @click="tfMoreAlertRightAddFun2" src="../assets/img/add.png" alt>
                </div>
              </div>
              <div class="tf_btm_l_li_tradition_btns">
                <div>
                  <h4 @click="tfFourOrderBuyFun">{{tfFourOrderBuy}}</h4>
                  <h4 @click="tfFourOrderSellFun">{{tfFourOrderSell}}</h4>
                </div>
                <div>
                  <h4 @click="tfFourOrderOpenFun">{{tfFourOrderOpen}}</h4>
                  <h4 @click="tfFourOrderPingFun">{{tfFourOrderPing}}</h4>
                </div>
              </div>
            </div>
            <div class="tf_btn_more_alert_cont_btm_l">
              <p class="tf_btn_more_alert_cont_btm_l_p">止盈/止损设置</p>
              <div class="tf_more_alert_l_cont">
                <div class="tf_more_alert_l_line1">
                  <span>有效期</span>
                  <select v-model="tfMoreAlertLine1Date">
                    <option value="当日有效">当日有效</option>
                    <option value="永久有效">永久有效</option>
                  </select>
                  <p>参数为“0”则不启用</p>
                </div>
                <div class="tf_more_alert_l_line2">
                  <input
                    v-model="tfMoreAlertLine2Check"
                    type="checkbox"
                    id="tf_more_alert_l_line2_ipt"
                  >
                  <label for="tf_more_alert_l_line2_ipt" class="mark">市价止盈损</label>
                  <div>
                    <span>N秒后市价</span>
                    <input v-model="addPrepaidSecPrice" type="number">
                    <img @click="addPrepaidSecPriceSubFun" src="../assets/img/sub.png" alt>
                    <img @click="addPrepaidSecPriceAddFun" src="../assets/img/add.png" alt>
                  </div>
                </div>
                <div class="tf_more_alert_l_line2 tf_more_alert_l_line3">
                  <div>
                    <span>回撤跳止损</span>
                    <input v-model="tfMoreAlertLine3Ipt" type="number">
                    <img @click="tfMoreAlertLine3SubFun" src="../assets/img/sub.png" alt>
                    <img @click="tfMoreAlertLine3AddFun" src="../assets/img/add.png" alt>
                  </div>
                  <span>预回撤：50(HKD)</span>
                </div>
                <div class="tf_more_alert_l_line2 tf_more_alert_l_line4">
                  <input
                    v-model="tfMoreAlertLine4Check1"
                    type="checkbox"
                    id="tf_more_alert_l_line4_ipt1"
                  >
                  <label for="tf_more_alert_l_line4_ipt1" class="mark">按跳</label>
                  <span>{{tfMoreAlertLine4Check1?'止损跳':'止损价格'}}</span>
                  <input
                    v-model="tfMoreAlertLine4Check2"
                    type="checkbox"
                    id="tf_more_alert_l_line4_ipt2"
                  >
                  <label for="tf_more_alert_l_line4_ipt2" class="mark">按跳</label>
                  <span>{{tfMoreAlertLine4Check2?'止盈跳':'止盈价格'}}</span>
                </div>
                <div class="tf_more_alert_l_line2">
                  <div>
                    <input v-model="tfMoreAlertLine5Ipt1" type="number">
                    <img @click="tfMoreAlertLine5SubFun1" src="../assets/img/sub.png" alt>
                    <img @click="tfMoreAlertLine5AddFun1" src="../assets/img/add.png" alt>
                  </div>
                  <div>
                    <input v-model="tfMoreAlertLine5Ipt2" type="number">
                    <img @click="tfMoreAlertLine5SubFun2" src="../assets/img/sub.png" alt>
                    <img @click="tfMoreAlertLine5AddFun2" src="../assets/img/add.png" alt>
                  </div>
                </div>
                <p class="tf_more_alert_l_line_p_green">---</p>
                <p class="tf_more_alert_l_line_p_red">---</p>
              </div>
            </div>
          </div>
          <div class="tf_btn7_online_ul_btn">
            <span @click="tfRightBtnMoreAlertCloseFun">取消</span>
            <span @click="info5AddOrderConfirmFun">确定</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "AddPrepaid",
  components: {},
  data() {
    return {
      tfBtmThreeOrderSelect: "", // 预埋单 select 默认选中
      tfBtmThreeOrderOptions: [], // 预埋单 option
      tfMoreAlertRBtns: [ // 止损开仓右边按钮
        { id: 1, name: "最新价", isClicked: false, price: 222 },
        { id: 2, name: "对手价", isClicked: true, price: 333 },
      ],
      tfMoreAlertLine1Date: "当日有效", // 有效期
      tfMoreAlertLine2Check: false, // 市价止盈损
      addPrepaidSecPrice: 0, // N秒后市价
      tfMoreAlertLine3Ipt: 0, // 回撤跳止损
      tfMoreAlertLine4Check1: false, // 按跳 跳止损
      tfMoreAlertLine4Check2: false, // 按跳 止盈跳
      tfMoreAlertLine5Ipt1: 0, // 右侧底部价格
      tfMoreAlertLine5Ipt2: 0, // 右侧底部数量
      tfMoreAlertRightIpt1: null, // 左侧价格
      tfMoreAlertRightIpt1Type: null, // 左侧价格类型 用来判断价格类型
      tfMoreAlertRightIpt2: 1, // 左侧手数
      tfFourOrderBuy: "买入", // 买入按钮
      tfFourOrderSell: "卖出", // 卖出按钮
      tfFourOrderOpen: "开仓", // 开仓按钮
      tfFourOrderPing: "平仓", // 平仓按钮
      tfFourOrderBuySell: "", // 点击后赋值判断
      tfFourOrderOpenPing: "", // 点击后赋值判断
      getOrderOneInfoFun: "", // 获取选中的合约的信息
    };
  },
  mounted: function() {
    let that = this;
    // console.log(this.addPrepaidSecPrice);
    that.getOrderSelectListsFun = function () {
      // infoFaceChild2中调用 三键 六键 传统 下单列表 点击按钮获取交易所合约内容
      that
        .$http({
          url: "/",
          method: "post",
          data: {
            nozzle: "query_home",
            type: that.$store.state.contractTyle, // 合约类型: 主力合约0 其他合约1
            exchange_id: that.$store.state.exchangeId // 交易所id
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            that.tfBtmThreeOrderOptions = res.data.data.contract; // 合约列表
            if (that.$store.state.codeName) {
              that.tfBtmThreeOrderSelect = that.$store.state.codeName;
            } else {
              that.tfBtmThreeOrderSelect = res.data.data.contract[0].contract_name; // 默认的第一个合约名字
            }
          } else if (res.data.code == 0 || res.data.code == -1) {
            that.$message.error(res.data.msg);
          }
        });
    };
    that.getOrderSelectListsFun(); // 调用一下合约列表
    that.getOrderOneInfoFun = function(index) { // 获取选中的合约信息
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
            that.lossDepot = res.data.data.depot; // 持仓数
            that.tfMoreAlertRBtns[0].price = res.data.data.current_info.current_price; // 最新价
            that.tfMoreAlertRBtns[1].price = res.data.data.current_info.current_price; // 也走最新价
            that.tfOrderSubAddPrice = res.data.data.current_info.wave_spot; // 加减数
            that.tfMoreAlertRightIpt1 = this.tfMoreAlertRBtns[1].name; //恢复默认对手价
          } else if (res.data.code == 0 || res.data.code == -1) {
            that.$message.error(res.data.msg);
          }
        });
    }
    that.getOrderOneInfoFun(that.$store.state.codeName);
    this.tfMoreAlertRightIpt1 = this.tfMoreAlertRBtns[1].name; //更多 止损开仓 价格默认对手价
    this.tfMoreAlertRightIpt1Type = this.tfMoreAlertRBtns[1].name; //添加云预埋单价格默认对手价类型
    $(function() {
      $(".tf_btn_more_alert").draggable({handle: ".tf_btn_more_alert_top", containment: 'body'});
    });
  },
  methods: {
    tfChangeSelectFun(index) {
      // 下拉框改变更新
      this.getOrderOneInfoFun(index);
      this.$store.commit("changeCodeNameFun", index); // 存下点击合约的名字
      // 通过ref调用其他地方的函数 值等
      if (this.$route.path == "/wrap/infoFace/infoFaceChild2") {
        this.$parent.$refs.route.$refs.infoRoute.infoC2ChangeCodeNameFun(); // 调用C2中改变选中的合约名
      }
      if (this.$route.path == "/wrap/infoFace/infoFaceChild3") {
        this.$parent.$refs.route.$refs.infoRoute.timeKlineFun(this.$store.state.codeName); // 调用C3中改变选中的合约名
      }
      if (this.$route.path == "/wrap/infoFace/infoFaceChild4") {
        this.$parent.$refs.route.$refs.infoRoute.infoC4GetKlineFun(this.$store.state.codeName, "001"); // 调用C4中改变K线
        this.$parent.$refs.route.$refs.infoRoute.infoC4RightFaceFun(this.$store.state.codeName); // C4改变右侧面板
      }
      if (this.$store.state.showTface == true) {
        // 显示的时候调用
        this.$parent.$refs.out.getOrderOptionListsFun(); // 调用外盘交易中的函数获取交易所列表
      }
      
    },
    addPrepaidSecPriceSubFun() {
      // 下单 云预埋单 添加云预埋单 N秒后市价 减
      if (this.addPrepaidSecPrice <= 0) {
        this.addPrepaidSecPrice = 0;
      } else {
        this.addPrepaidSecPrice = Math.floor(this.addPrepaidSecPrice) - 1;
      }
    },
    addPrepaidSecPriceAddFun() {
      // 下单 云预埋单 添加云预埋单 N秒后市价 加
      this.addPrepaidSecPrice = Math.floor(this.addPrepaidSecPrice) + 1;
    },
    tfMoreAlertLine3SubFun() {
      // 下单 云预埋单 添加云预埋单 回撤跳止损 减
      if (this.tfMoreAlertLine3Ipt <= 0) {
        this.tfMoreAlertLine3Ipt = 0;
      } else {
        this.tfMoreAlertLine3Ipt = Math.floor(this.tfMoreAlertLine3Ipt) - 1;
      }
    },
    tfMoreAlertLine3AddFun() {
      // 下单 云预埋单 添加云预埋单 回撤跳止损 加
      this.tfMoreAlertLine3Ipt = Math.floor(this.tfMoreAlertLine3Ipt) + 1;
    },
    tfMoreAlertLine5SubFun1() {
      //按跳价格 减
      if (this.tfMoreAlertLine4Check1 == false) {
        if (this.tfMoreAlertLine5Ipt1 <= 0) {
          this.tfMoreAlertLine5Ipt1 = 0;
        } else {
          let num;
          if (this.tfOrderSubAddPrice.indexOf(".") == -1) {
            num = 0;
          } else {
            num = Number(this.tfOrderSubAddPrice).toString().split(".")[1].length;
          }
          this.tfMoreAlertLine5Ipt1 = (Number(this.tfMoreAlertLine5Ipt1) - Number(this.tfOrderSubAddPrice)).toFixed(num);
        }
      } else {
        if (this.tfMoreAlertLine5Ipt1 <= 0) {
          this.tfMoreAlertLine5Ipt1 = 0;
        } else {
          this.tfMoreAlertLine5Ipt1 = Math.floor(this.tfMoreAlertLine5Ipt1) - 1;
        }
      }
    },
    tfMoreAlertLine5AddFun1() {
      // 按跳价格 加
      if (this.tfMoreAlertLine4Check1 == false) {
        let num;
        if (this.tfOrderSubAddPrice.indexOf(".") == -1) {
          num = 0;
        } else {
          num = Number(this.tfOrderSubAddPrice).toString().split(".")[1].length;
        }
        this.tfMoreAlertLine5Ipt1 = (Number(this.tfMoreAlertLine5Ipt1) + Number(this.tfOrderSubAddPrice)).toFixed(num);
      } else {
        this.tfMoreAlertLine5Ipt1 = Math.floor(this.tfMoreAlertLine5Ipt1) + 1;
      }
    },
    tfMoreAlertLine5SubFun2() {
      // 按跳价格 减
      if (this.tfMoreAlertLine4Check2 == false) {
        if (this.tfMoreAlertLine5Ipt2 <= 0) {
          this.tfMoreAlertLine5Ipt2 = 0;
        } else {
          let num;
          if (this.tfOrderSubAddPrice.indexOf(".") == -1) {
            num = 0;
          } else {
            num = Number(this.tfOrderSubAddPrice).toString().split(".")[1].length;
          }
          this.tfMoreAlertLine5Ipt2 = (Number(this.tfMoreAlertLine5Ipt2) - Number(this.tfOrderSubAddPrice)).toFixed(num);
        }
      } else {
        if (this.tfMoreAlertLine5Ipt2 <= 0) {
          this.tfMoreAlertLine5Ipt2 = 0;
        } else {
          this.tfMoreAlertLine5Ipt2 = Math.floor(this.tfMoreAlertLine5Ipt2) - 1;
        }
      }
    },
    tfMoreAlertLine5AddFun2() {
      // 按跳价格 加
      if (this.tfMoreAlertLine4Check2 == false) {
        let num;
        if (this.tfOrderSubAddPrice.indexOf(".") == -1) {
          num = 0;
        } else {
          num = Number(this.tfOrderSubAddPrice).toString().split(".")[1].length;
        }
        this.tfMoreAlertLine5Ipt2 = (Number(this.tfMoreAlertLine5Ipt2) + Number(this.tfOrderSubAddPrice)).toFixed(num);
      } else {
        this.tfMoreAlertLine5Ipt2 = Math.floor(this.tfMoreAlertLine5Ipt2) + 1;
      }
    },
    tfMoreAlertRightSubFun1() {
      // 预埋单 左边价格 减
      if (isNaN(Math.floor(this.tfMoreAlertRightIpt1))) {
        for (let i = 0; i < this.tfMoreAlertRBtns.length; i++) {
          if (this.tfMoreAlertRBtns[i].isClicked == true) {
            this.tfMoreAlertRightIpt1 = this.tfMoreAlertRBtns[i].price;
          }
        }
      }
      if (this.tfMoreAlertRightIpt1 <= 0) {
        this.tfMoreAlertRightIpt1 = 0;
      } else {
        let num;
        if (this.tfOrderSubAddPrice.indexOf(".") == -1) {
          num = 0;
        } else {
          num = Number(this.tfOrderSubAddPrice).toString().split(".")[1].length;
        }
        this.tfMoreAlertRightIpt1 = (Number(this.tfMoreAlertRightIpt1) - Number(this.tfOrderSubAddPrice)).toFixed(num);
      }
    },
    tfMoreAlertRightAddFun1() {
      // 预埋单 左边价格 加
      if (isNaN(Math.floor(this.tfMoreAlertRightIpt1))) {
        for (let i = 0; i < this.tfMoreAlertRBtns.length; i++) {
          if (this.tfMoreAlertRBtns[i].isClicked == true) {
            this.tfMoreAlertRightIpt1 = this.tfMoreAlertRBtns[i].price;
          }
        }
      }
      let num;
      if (this.tfOrderSubAddPrice.indexOf(".") == -1) {
        num = 0;
      } else {
        num = Number(this.tfOrderSubAddPrice).toString().split(".")[1].length;
      }
      this.tfMoreAlertRightIpt1 = (Number(this.tfMoreAlertRightIpt1) + Number(this.tfOrderSubAddPrice)).toFixed(num);
    },
    tfMoreAlertRightSubFun2() {
      // 预埋单 右边数量 减
      if (this.tfMoreAlertRightIpt2 <= 1) {
        this.tfMoreAlertRightIpt2 = 1;
      } else {
        this.tfMoreAlertRightIpt2 = Math.floor(this.tfMoreAlertRightIpt2) - 1;
      }
    },
    tfMoreAlertRightAddFun2() {
      // 预埋单 右边数量 加
      this.tfMoreAlertRightIpt2 = Math.floor(this.tfMoreAlertRightIpt2) + 1;
    },
    tfMoreAlertRBtnsFun(index) {
      // 预埋单 右侧按钮
      for (let i = 0; i < this.tfMoreAlertRBtns.length; i++) {
        if (index == this.tfMoreAlertRBtns[i].id) {
          this.tfMoreAlertRBtns[i].isClicked = true;
          this.tfMoreAlertRightIpt1 = this.tfMoreAlertRBtns[i].name;
          this.tfMoreAlertRightIpt1Type = this.tfMoreAlertRBtns[i].name;
        } else {
          this.tfMoreAlertRBtns[i].isClicked = false;
        }
      }
    },
    tfRightBtnMoreAlertCloseFun() {
      // 预埋单 关闭按钮
      this.$store.commit("isAddPrepaidFun");
    },
    tfFourOrderBuyFun() {
      // 预埋单 买
      this.tfFourOrderBuySell = this.tfFourOrderBuy;
      // console.log(this.tfFourOrderBuySell);
    },
    tfFourOrderSellFun() {
      // 预埋单 卖
      this.tfFourOrderBuySell = this.tfFourOrderSell;
      // console.log(this.tfFourOrderBuySell);
    },
    tfFourOrderOpenFun() {
      // 预埋单 开仓
      this.tfFourOrderOpenPing = this.tfFourOrderOpen;
      // console.log(this.tfFourOrderOpenPing);
    },
    tfFourOrderPingFun() {
      // 预埋单 平仓
      this.tfFourOrderOpenPing = this.tfFourOrderPing;
      // console.log(this.tfFourOrderOpenPing);
    },
    info5AddOrderConfirmFun() {
      // 预埋单 确认按钮
      let that = this;
      let userToken = that.$store.state.tokenStr; // 获取token
      // this.tfRightBtnMoreAlert = false;
      if (that.tfFourOrderBuySell == "") {
        that.$message.error("请选择买入或卖出类型!");
      } else if (that.tfFourOrderOpenPing == "") {
        that.$message.error("请选择开仓或平仓类型!");
      } else {
        let tfFourOrderBuySellType, // 开仓类型
        tfFourOrderOpenPingType, // 买卖类型
        tfOrderPrice, // 价格数字
        classify, // 价格类型 0： 限价 1：最新价 2：对手价 3：排队价 4:超价
        tfFourOrderLine2CheckType, // 市价止盈损 0 非校验 1校验
        tfFourOrderLine4Check1Type, // 止损 1按跳 ，0：按价格
        tfFourOrderLine4Check2Type; // 止盈 1按跳 ，0：按价格
         // 开仓 买卖 按钮
        if (that.tfFourOrderBuySell == "买入") {
          tfFourOrderBuySellType = 0;
        } else {
          tfFourOrderBuySellType = 1;
        }
        if (that.tfFourOrderOpenPing == "开仓") {
          tfFourOrderOpenPingType = 0;
        } else {
          tfFourOrderOpenPingType = 1;
        }
        // 价格类型
        if (that.tfMoreAlertRightIpt1Type == "排队价") {
          classify = 0;
        } else if (that.tfMoreAlertRightIpt1Type == "最新价") {
          classify = 1;
        } else if (that.tfMoreAlertRightIpt1Type == "对手价") {
          classify = 2;
        } else if (that.tfMoreAlertRightIpt1Type == "市价") {
          classify = 3;
        } else if (that.tfMoreAlertRightIpt1Type == "超价") {
          classify = 4;
        }
        if (isNaN(that.tfMoreAlertRightIpt1)) {
          // 如果价格不是数字就变成数字
          for (let i = 0; i < this.tfMoreAlertRBtns.length; i++) {
            if (this.tfMoreAlertRBtns[i].isClicked == true) {
              tfOrderPrice = this.tfMoreAlertRBtns[i].price;
            }
          }
        } else {
          tfOrderPrice = that.tfMoreAlertRightIpt1;
        }
        // console.log(classify);
        // console.log(tfOrderPrice);
        // 市价止盈损
        if (that.tfMoreAlertLine2Check == false) {
          tfFourOrderLine2CheckType = 0;
        } else {
          tfFourOrderLine2CheckType = 1;
        }
        // 止损按跳 止盈按跳
        if (that.tfMoreAlertLine4Check1 == false) {
          tfFourOrderLine4Check1Type = 0;
        } else {
          tfFourOrderLine4Check1Type = 1;
        }
        if (that.tfMoreAlertLine4Check2 == false) {
          tfFourOrderLine4Check2Type = 0;
        } else {
          tfFourOrderLine4Check2Type = 1;
        }
        // console.log(that.tfBtmThreeOrderSelect, tfOrderPrice, that.tfMoreAlertRightIpt2, that.addPrepaidSecPrice, that.tfMoreAlertLine3Ipt, that.tfMoreAlertLine5Ipt1, that.tfMoreAlertLine5Ipt2);
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "prepaid_bill",
              token: userToken,
              code: that.tfBtmThreeOrderSelect, //合约名字
              price: tfOrderPrice, // 委托价格
              number: that.tfMoreAlertRightIpt2, // 委托数量
              mold: tfFourOrderOpenPingType, // 开仓类型 0：开仓 1：平仓
              direction: tfFourOrderBuySellType, // 开仓类型 0：买涨(买入) 1：买跌(卖出)
              classify: classify, // 价格类型 0： 限价 1：最新价 2：对手价 3：排队价 4:超价
              market_loss: tfFourOrderLine2CheckType, // 市价止盈损 0 非校验 1校验
              time_seconds: that.addPrepaidSecPrice, // N秒后市价
              loss_spot_price: tfFourOrderLine4Check1Type, // 止损 1按跳 ，0：按价格
              profit_spot_price: tfFourOrderLine4Check2Type, // 止盈 1按跳 ，0：按价格
              back_loss: that.tfMoreAlertLine3Ipt, // 回撤跳止损
              loss: that.tfMoreAlertLine5Ipt1, // 止损跳/价格
              profit: that.tfMoreAlertLine5Ipt2, // 止盈跳/价格
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              that.$parent.$refs.out.prepaidOrderListsFun(); // 刷新预埋单
              that.tfMoreAlertRightIpt2 = 1; // 委托数量
              that.tfFourOrderBuySell = ""; // 清空按钮信息
              that.tfFourOrderOpenPing = "";
              that.tfMoreAlertLine2Check = false; // 市价止盈损
              that.addPrepaidSecPrice = 0; // N秒后市价
              that.tfMoreAlertLine3Ipt = 0; // 回撤跳止损
              that.tfMoreAlertLine5Ipt1 = 0; // 止损跳/价格
              that.tfMoreAlertLine5Ipt2 = 0; // 止损跳/价格
              this.$store.commit("isAddPrepaidFun"); //关闭弹窗
              that.$message.success(res.data.msg);
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      }
    }
  }
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
  z-index: 1500;
  background-color: rgba(0, 0, 0, 0.6);
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
.tf_btn_more_alert {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -380px;
  margin-top: -230px;
  z-index: 1500;
  width: 760px;
  height: 460px;
  min-width: 760px;
  border-radius: 15px;
  background: white;
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

.tf_btn_more_alert_cont_btm {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  align-items: center;
  -webkit-align-items: center;
  margin-top: 20px;
}

/* 开仓止损弹窗左侧 */
.tf_btn_more_alert_cont_btm_l {
  width: 355px;
  height: 314px;
  border: 1px solid rgba(187, 187, 187, 1);
}

.tf_btn_more_alert_cont_btm_l input {
  vertical-align: middle;
}

.tf_btn_more_alert_cont_btm_l label {
  vertical-align: middle;
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  cursor: pointer;
}

.tf_btn_more_alert_cont_btm_l input[type="checkbox"] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
  vertical-align: middle;
  cursor: pointer;
}

.mark::before {
  /* content: '\a0'; */
  content: '\2713';
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

.tf_btn_more_alert_cont_btm_l input[type="checkbox"]:checked+.mark::before {
  content: '\2713';
  color: white;
  background: #FA8E53;
  font-size: 10px;
  line-height: 14px;
  text-align: center;
  margin-right: 5px;
  vertical-align: middle;
}

.tf_btn_more_alert_cont_btm_l_p {
  width: 100%;
  height: 40px;
  background-color: rgba(238, 157, 30, 1);
  text-align: center;
  line-height: 40px;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
}

.tf_more_alert_l_cont {
  padding: 0 12px;
}

.tf_more_alert_l_line1 {
  width: 100%;
  height: 30px;
  margin-top: 12px;
}

.tf_more_alert_l_line1>span {
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  line-height: 30px;
}

.tf_more_alert_l_line1>select {
  width: 104px;
  height: 30px;
  line-height: 30px;
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  border: 1px solid rgba(187, 187, 187, 1);
  margin-left: 9px;
}

.tf_more_alert_l_line1>p {
  display: inline-block;
  color: rgba(255, 36, 36, 1);
  font-size: 14px;
  line-height: 30px;
  margin-left: 19px;
}

.tf_more_alert_l_line2 {
  margin-top: 12px;
  width: 100%;
  height: 30px;
  font-size: 0;
}

.tf_more_alert_l_line2 input {
  vertical-align: middle;
}

.tf_more_alert_l_line2>label {
  vertical-align: middle;
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  margin-right: 25px;
  cursor: pointer;
}

.tf_more_alert_l_line2>div {
  display: inline-block;
}

.tf_more_alert_l_line2>div>span {
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  line-height: 30px;
  vertical-align: middle;
}

.tf_more_alert_l_line2>div>input {
  width: 70px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  background-color: rgba(221, 221, 221, 1);
  padding-right: 4px;
  vertical-align: middle;
  text-align: right;
  margin-left: 9px;
}

.tf_more_alert_l_line2>div>img {
  width: 17px;
  height: 17px;
  vertical-align: middle;
  margin-left: 10px;
  cursor: pointer;
}

.tf_more_alert_l_line3>div>input {
  width: 58px;
}

.tf_more_alert_l_line3>span {
  color: rgba(189, 189, 189, 1);
  font-size: 14px;
  line-height: 30px;
  margin-left: 16px;
  vertical-align: middle;
}

.tf_more_alert_l_line4>span {
  color: rgba(255, 36, 36, 1);
  font-size: 14px;
  vertical-align: middle;
  line-height: 30px;
  margin-right: 54px;
}

.tf_more_alert_l_line_p_green {
  color: rgba(64, 163, 16, 1);
  font-size: 14px;
  line-height: 20px;
}

.tf_more_alert_l_line_p_red {
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 36, 36, 1);
}

/* 开仓止损弹窗右侧 */
.tf_btn_more_alert_cont_btm_r {
  width: 330px;
  height: 314px;
}

.tf_more_alert_r_top>span {
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  vertical-align: middle;
}

.tf_more_alert_r_top>select {
  width: 247px;
  height: 30px;
  line-height: 30px;
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  border: 1px solid rgba(232, 232, 232, 1);
  vertical-align: middle;
  margin-left: 22px;
  padding-left: 5px;
  border-radius: 4px;
}

.tf_more_alert_r_btns {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  justify-content: space-around;
  -webkit-justify-content: space-around;
  align-items: center;
  -webkit-align-items: center;
  width: 100%;
  height: 30px;
  background-color: rgba(236, 236, 236, 1);
  margin-top: 17px;
}

.tf_more_alert_r_btns>span {
  color: rgba(172, 172, 172, 1);
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
}

.tf_more_alert_r_btns>.tf_more_alert_r_btns_active {
  color: rgba(255, 36, 36, 1);
}

.tf_more_alert_r_ipts {
  margin-top: 17px;
  font-size: 0;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  align-items: center;
  -webkit-align-items: center;
}

.tf_more_alert_r_ipts>div {
  height: 30px;
}

.tf_more_alert_r_ipts>div>span {
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  line-height: 30px;
  vertical-align: middle;
  margin-right: 6px;
}

.tf_more_alert_r_ipts>div>input {
  width: 78px;
  height: 30px;
  line-height: 30px;
  background-color: rgba(221, 221, 221, 1);
  text-align: right;
  font-size: 14px;
  padding-right: 4px;
}

.tf_more_alert_r_ipts>div>img {
  width: 17px;
  height: 17px;
  margin-left: 9px;
  cursor: pointer;
}
.tf_btm_l_li_tradition_btns {
  margin-top: 20px;
  text-align: center;
}
.tf_btm_l_li_tradition_btns>div>h4 {
  display: inline-block;
  margin: 9px 22px;
  width: 103px;
  height: 44px;
  line-height: 44px;
  border-radius: 4px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  font-size: 22px;
  font-weight: 500;
  cursor: pointer;
}

.tf_btm_l_li_tradition_btns>div:nth-child(1)>h4:nth-child(1) {
  background-color: rgba(225, 85, 68, 1);
}

.tf_btm_l_li_tradition_btns>div:nth-child(1)>h4:nth-child(1):hover {
  background-color: rgb(207, 58, 41);
}

.tf_btm_l_li_tradition_btns>div:nth-child(1)>h4:nth-child(2) {
  background-color: rgba(64, 163, 16, 1);
}

.tf_btm_l_li_tradition_btns>div:nth-child(1)>h4:nth-child(2):hover {
  background-color: rgb(49, 134, 7);
}

.tf_btm_l_li_tradition_btns>div:nth-child(2)>h4 {
  background-color: rgba(221, 140, 10, 1);
}

.tf_btm_l_li_tradition_btns>div:nth-child(2)>h4:hover {
  background-color: rgb(206, 131, 11);
}

.tf_more_alert_r_checkbox {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  align-items: center;
  -webkit-align-items: center;
  margin-top: 40px;
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
