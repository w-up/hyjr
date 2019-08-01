<template>
  <!-- 止损开仓弹窗 -->
  <div class="tf_btn_more_alert_wrap">
    <div class="tf_btn_more_alert">
      <div class="tf_btn_more_alert_top">
        <h4>止损开仓</h4>
        <img src="../assets/img/closeBgGary.png" @click="tfRightBtnMoreAlertCloseFun" title="关闭">
      </div>
      <div class="tf_btn_more_alert_cont">
        <div class="tf_btn_more_alert_cont_top">
          <div>
            <span>合约：</span>
            <span>{{tfBtmThreeOrderSelect}}</span>
          </div>
          <div>
            <span>多头持仓：</span>
            <span>{{lossDepot.multiple_depot}}</span>
          </div>
          <div>
            <span>空头持仓：</span>
            <span>{{lossDepot.empty_depot}}</span>
          </div>
        </div>
        <div class="tf_btn_more_alert_cont_btm">
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
                  id="tf_more_alert_left_line2_ipt"
                >
                <label for="tf_more_alert_left_line2_ipt" class="mark">市价止盈损</label>
                <div>
                  <span>N秒后市价</span>
                  <input v-model="tfMoreAlertLine2Ipt" type="number">
                  <img @click="tfMoreAlertLine2SubFun" src="../assets/img/sub.png" alt>
                  <img
                    @click="tfMoreAlertLine2AddFun"
                    src="../assets/img/add.png"
                    alt
                  >
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
                <input v-model="tfMoreAlertLine4Check1" type="checkbox" id="tf_more_alert_left_line4_ipt1">
                <label for="tf_more_alert_left_line4_ipt1" class="mark">按跳</label>
                <span>{{tfMoreAlertLine4Check1?'止损跳':'止损价格'}}</span>
                <input v-model="tfMoreAlertLine4Check2" type="checkbox" id="tf_more_alert_left_line4_ipt2">
                <label for="tf_more_alert_left_line4_ipt2" class="mark">按跳</label>
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
          <div class="tf_btn_more_alert_cont_btm_r">
            <div class="tf_more_alert_r_top">
              <span>合约</span>
              <select v-model="tfBtmThreeOrderSelect" @change="tfChangeSelectFun(tfBtmThreeOrderSelect)">
                <option v-for="tfBtmThreeOrderOption in tfBtmThreeOrderOptions" :key="tfBtmThreeOrderOption.id">{{tfBtmThreeOrderOption.contract_name}}</option>
              </select>
            </div>
            <div class="tf_more_alert_r_btns" style="margin-top:20px;">
              <span
                @click="tfMoreAlertRBtnsFun(tfMoreAlertRBtn.id)"
                :class="tfMoreAlertRBtn.isClicked?'tf_more_alert_r_btns_active':''"
                v-for="tfMoreAlertRBtn in tfMoreAlertRBtns"
                :key="tfMoreAlertRBtn.id"
              >{{tfMoreAlertRBtn.name}}</span>
            </div>
            <div class="tf_more_alert_r_ipts" style="margin-top:20px;">
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
            <div class="tf_more_alert_r_sell_buy">
              <button @click="tfMoreAlertRightOrderBuySellFun('下单买')">下单买</button>
              <button @click="tfMoreAlertRightOrderBuySellFun('下单卖')">下单卖</button>
            </div>
            <div class="tf_more_alert_r_checkbox">
              <div>
                <input v-model="tfMoreAlertRightClose" type="checkbox" id="tf_more_alert_r_checkbox1">
                <label for="tf_more_alert_r_checkbox1" class="mark">关闭说明</label>
              </div>
              <div>
                <input v-model="tfMoreAlertRightOrderNotClose" type="checkbox" id="tf_more_alert_r_checkbox2">
                <label for="tf_more_alert_r_checkbox2" class="mark">下单后不关闭此窗口</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 止损开仓弹窗 end -->
</template>

<script>
export default {
  name: "AddPrepaid",
  components: {},
  data() {
    return {
      tfBtmThreeOrderSelect: "", // 预埋单 select 默认选中
      tfBtmThreeOrderOptions: [], // 预埋单 option
      tfRightBtnMore: false, //止损开仓显示初始值
      tfMoreAlertRBtns: [ // 止损开仓右边按钮
        { id: 1, name: "最新价", isClicked: false, price: 222 },
        { id: 2, name: "对手价", isClicked: true, price: 333 },
      ],
      tfMoreAlertRightIpt1: "", // 止损开仓弹窗 右侧价格
      tfMoreAlertRightIpt1Type: null, // 添加预埋单弹窗 左侧价格类型 用来判断价格类型
      tfMoreAlertLine1Date: "当日有效", // 止损开仓弹窗 有效期
      tfMoreAlertLine2Check: null, // 止损开仓弹窗 市价止盈损
      tfMoreAlertLine2Ipt: 0, // 止损开仓弹窗 N秒后市价
      tfMoreAlertLine3Ipt: 0, // 止损开仓弹窗 回撤跳止损
      tfMoreAlertLine4Check1: false, // 止损开仓弹窗 按跳 跳止损
      tfMoreAlertLine4Check2: false, // 止损开仓弹窗 按跳 止盈跳
      tfMoreAlertLine5Ipt1: 0, // 止损开仓弹窗 价格
      tfMoreAlertLine5Ipt2: 0, // 止损开仓弹窗 数量
      tfMoreAlertRightSelect: "", // 止损开仓弹窗 合约
      tfMoreAlertRightIpt2: 1, // 止损开仓弹窗 右侧手数
      tfMoreAlertRightClose: true, // 止损开仓弹窗 右侧关闭说明
      tfMoreAlertRightOrderNotClose: null, // 止损开仓弹窗 右侧下单不关闭弹窗
      getOrderOneInfoFun: "", // 获取选中的合约的信息
      lossDepot: "", // 持仓数
      tfOrderSubAddPrice: "", // 加减数
    };
  },
  mounted: function() {
    let that = this;
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
      $(".tf_btn_more_alert").draggable({handle: ".tf_btn_more_alert_top", containment: 'body'}); // 止损开仓弹窗移动
    });
  },
  methods: {
    tfMoreAlertLine2SubFun() {
      // 止损开仓 N秒后市价 减
      if (this.tfMoreAlertLine2Ipt <= 0) {
        this.tfMoreAlertLine2Ipt = 0;
      } else {
        this.tfMoreAlertLine2Ipt = Math.floor(this.tfMoreAlertLine2Ipt) - 1;
      }
    },
    tfMoreAlertLine2AddFun() {
      // 止损开仓 N秒后市价 加
      this.tfMoreAlertLine2Ipt = Math.floor(this.tfMoreAlertLine2Ipt) + 1;
    },
    tfMoreAlertLine3SubFun() {
      // 止损开仓 回撤跳止损 减
      if (this.tfMoreAlertLine3Ipt <= 0) {
        this.tfMoreAlertLine3Ipt = 0;
      } else {
        this.tfMoreAlertLine3Ipt = Math.floor(this.tfMoreAlertLine3Ipt) - 1;
      }
    },
    tfMoreAlertLine3AddFun() {
      // 止损开仓 回撤跳止损 加
      this.tfMoreAlertLine3Ipt = Math.floor(this.tfMoreAlertLine3Ipt) + 1;
    },
    tfMoreAlertLine5SubFun1() {
      //止损按跳价格 减
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
      // 止损按跳价格 加
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
      // 止损按跳价格 减
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
      // 止损按跳价格 加
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
      // 止损开仓 右边价格 减
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
      // 止损开仓 右边价格 加
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
      // 止损开仓 右边数量 减
      if (this.tfMoreAlertRightIpt2 <= 1) {
        this.tfMoreAlertRightIpt2 = 1;
      } else {
        this.tfMoreAlertRightIpt2 = Math.floor(this.tfMoreAlertRightIpt2) - 1;
      }
    },
    tfMoreAlertRightAddFun2() {
      // 止损开仓 右边数量 加
      this.tfMoreAlertRightIpt2 = Math.floor(this.tfMoreAlertRightIpt2) + 1;
    },
    tfMoreAlertRBtnsFun(index) {
      // 止损开仓右侧按钮
      for (let i = 0; i < this.tfMoreAlertRBtns.length; i++) {
        if (index == this.tfMoreAlertRBtns[i].id) {
          this.tfMoreAlertRBtns[i].isClicked = true;
          this.tfMoreAlertRightIpt1 = this.tfMoreAlertRBtns[i].name;
        } else {
          this.tfMoreAlertRBtns[i].isClicked = false;
        }
      }
    },
    tfMoreAlertRightOrderBuySellFun(index) {
      let that = this;
      let userToken = that.$store.state.tokenStr; // 获取token
      let effective, // 有效期 0当日有效 1永久有效
      tfOrderPrice, // 价格数字
      classify, // 价格类型 0： 限价 1：最新价 2：对手价 3：排队价 4:超价
      tfFourOrderLine2CheckType, // 市价止盈损 0 非校验 1校验
      tfFourOrderLine4Check1Type, // 止损 1按跳 ，0：按价格
      tfFourOrderLine4Check2Type; // 止盈 1按跳 ，0：按价格
      // 有效期
      if (that.tfMoreAlertLine1Date == "当日有效") {
        effective = 0;
      } else if (that.tfMoreAlertLine1Date == "永久有效") {
        effective = 1;
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
      // console.log(effective);
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
      if (index == "下单买") {
        // 止损开仓 下单买 按钮
        // console.log(that.tfBtmThreeOrderSelect, tfOrderPrice, that.tfMoreAlertRightIpt2);
        // console.log(that.tfMoreAlertLine2Ipt, that.tfMoreAlertLine3Ipt, that.tfMoreAlertLine5Ipt1, that.tfMoreAlertLine5Ipt2);
        // console.log(tfFourOrderLine2CheckType, tfFourOrderLine4Check1Type, tfFourOrderLine4Check2Type)
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "stop_loss",
              token: userToken,
              code: that.tfBtmThreeOrderSelect, //合约名字
              price: tfOrderPrice, // 委托价格
              number: that.tfMoreAlertRightIpt2, // 委托数量
              direction: 0, // 开仓类型 0：买涨(买入) 1：买跌(卖出)
              classify: classify, // 价格类型 0： 限价 1：最新价 2：对手价 3：排队价 4:超价
              effective: effective, // 有效期设置 0当日有效 1永久有效
              market_loss: tfFourOrderLine2CheckType, // 市价止盈损 0 非校验 1校验
              time_seconds: that.tfMoreAlertLine2Ipt, // N秒后市价
              loss_spot_price: tfFourOrderLine4Check1Type, // 止损 1按跳 ，0：按价格
              profit_spot_price: tfFourOrderLine4Check2Type, // 止盈 1按跳 ，0：按价格
              back_loss: that.tfMoreAlertLine3Ipt, // 回撤跳止损
              loss: that.tfMoreAlertLine5Ipt1, // 止损跳/价格
              profit: that.tfMoreAlertLine5Ipt2, // 止盈跳/价格
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              if (this.tfMoreAlertRightOrderNotClose != true) {
                // 关闭就恢复原数据
                that.tfMoreAlertRightIpt2 = 1; // 委托数量
                that.tfMoreAlertLine2Check = false; // 市价止盈损
                that.tfMoreAlertLine2Ipt = 0; // N秒后市价
                that.tfMoreAlertLine4Check1 = false; // 止损按跳
                that.tfMoreAlertLine4Check2 = false; // 止盈按跳
                that.tfMoreAlertLine3Ipt = 0; // 回撤跳止损
                that.tfMoreAlertLine5Ipt1 = 0; // 止损跳/价格
                that.tfMoreAlertLine5Ipt2 = 0; // 止盈跳/价格
                //是否关闭弹窗
                that.$store.commit("isAddLossFun");
              }
              that.$message.success(res.data.msg);
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      } else {
        // 止损开仓 下单卖 按钮
        // console.log("下单卖");
        // console.log(that.tfBtmThreeOrderSelect, tfOrderPrice, that.tfMoreAlertRightIpt2);
        // console.log(that.tfMoreAlertLine2Ipt, that.tfMoreAlertLine3Ipt, that.tfMoreAlertLine5Ipt1, that.tfMoreAlertLine5Ipt2);
        // console.log(tfFourOrderLine2CheckType, tfFourOrderLine4Check1Type, tfFourOrderLine4Check2Type)
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "stop_loss",
              token: userToken,
              code: that.tfBtmThreeOrderSelect, //合约名字
              price: tfOrderPrice, // 委托价格
              number: that.tfMoreAlertRightIpt2, // 委托数量
              mold: 0, // 开仓类型 0：开仓 1：平仓
              direction: 1, // 开仓类型 0：买涨(买入) 1：买跌(卖出)
              classify: classify, // 价格类型 0： 限价 1：最新价 2：对手价 3：排队价 4:超价
              effective: effective, // 有效期设置 0当日有效 1永久有效
              market_loss: tfFourOrderLine2CheckType, // 市价止盈损 0 非校验 1校验
              time_seconds: that.tfMoreAlertLine2Ipt, // N秒后市价
              loss_spot_price: tfFourOrderLine4Check1Type, // 止损 1按跳 ，0：按价格
              profit_spot_price: tfFourOrderLine4Check2Type, // 止盈 1按跳 ，0：按价格
              back_loss: that.tfMoreAlertLine3Ipt, // 回撤跳止损
              loss: that.tfMoreAlertLine5Ipt1, // 止损跳/价格
              profit: that.tfMoreAlertLine5Ipt2, // 止盈跳/价格
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              if (this.tfMoreAlertRightOrderNotClose != true) {
                // 关闭就恢复原数据
                that.tfMoreAlertRightIpt2 = 1; // 委托数量
                that.tfMoreAlertLine2Check = false; // 市价止盈损
                that.tfMoreAlertLine2Ipt = 0; // N秒后市价
                that.tfMoreAlertLine4Check1 = false; // 止损按跳
                that.tfMoreAlertLine4Check2 = false; // 止盈按跳
                that.tfMoreAlertLine3Ipt = 0; // 回撤跳止损
                that.tfMoreAlertLine5Ipt1 = 0; // 止损跳/价格
                that.tfMoreAlertLine5Ipt2 = 0; // 止盈跳/价格
                //是否关闭弹窗
                that.$store.commit("isAddLossFun");
              }
              that.$message.success(res.data.msg);
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      }
    },
    tfRightBtnMoreAlertCloseFun() {
      // 止损开仓关闭按钮
      this.$store.commit("isAddLossFun");
    },
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 止损开仓弹窗 */
.tf_btn_more_alert_wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1500;
  background-color: rgba(0, 0, 0, 0.6);
}

.tf_btn_more_alert {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -382.5px;
  margin-top: -217.5px;
  z-index: 1500;
  width: 765px;
  height: 435px;
  min-width: 765px;
  border-radius: 15px;
  background: white;
}

.tf_btn_more_alert_top {
  position: relative;
  width: 100%;
  height: 40px;
  border-radius: 15px 15px 0px 0px;
  background-color: rgba(235, 235, 238, 1);
  text-align: center;
}

.tf_btn_more_alert_top>h4 {
  color: rgba(16, 16, 16, 1);
  font-size: 18px;
  line-height: 40px;
  display: inline-block;
}

.tf_btn_more_alert_top>img {
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

.tf_btn_more_alert_top>img:hover {
  background: #999;
}

.tf_btn_more_alert_cont {
  padding: 0 20px;
}

.tf_btn_more_alert_cont_top {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  align-items: center;
  -webkit-align-items: center;
  padding-right: 60px;
}

.tf_btn_more_alert_cont_top>div {
  margin-top: 20px;
}

.tf_btn_more_alert_cont_top>div>span {
  color: rgba(16, 16, 16, 1);
  font-size: 16px;
}

.tf_btn_more_alert_cont_top>div>span:nth-child(2) {
  font-weight: 600;
}

.tf_btn_more_alert_cont_top>div:nth-child(2)>span:nth-child(1) {
  color: rgba(225, 85, 68, 1);
}

.tf_btn_more_alert_cont_top>div:nth-child(3)>span:nth-child(1) {
  color: rgba(64, 163, 16, 1);
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

.tf_btn_more_alert_cont_btm input {
  vertical-align: middle;
}

.tf_btn_more_alert_cont_btm label {
  vertical-align: middle;
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  margin-right: 30px;
  cursor: pointer;
}

.tf_btn_more_alert_cont_btm input[type="checkbox"] {
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

.tf_btn_more_alert_cont_btm input[type="checkbox"]:checked+.mark::before {
  content: '\2713';
  color: white;
  background: #FA8E53;
  font-size: 10px;
  line-height: 14px;
  text-align: center;
  margin-right: 5px;
  vertical-align: middle;
}

/* 开仓止损弹窗左侧 */
.tf_btn_more_alert_cont_btm_l {
  width: 355px;
  height: 314px;
  border: 1px solid rgba(187, 187, 187, 1);
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
  padding: 0 13px;
}

.tf_more_alert_l_line1 {
  width: 100%;
  height: 30px;
  margin-top: 13px;
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
  margin-top: 15px;
  width: 100%;
  height: 30px;
  font-size: 0
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
  width: 350px;
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
  margin-top: 10px;
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
  margin-top: 10px;
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

.tf_more_alert_r_sell_buy {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  justify-content: space-around;
  -webkit-justify-content: space-around;
  align-items: center;
  -webkit-align-items: center;
  margin-top: 53px;
  width: 100%;
}

.tf_more_alert_r_sell_buy>button {
  width: 118px;
  height: 60px;
  border-radius: 4px;
  text-align: center;
  line-height: 60px;
  color: rgba(255, 255, 255, 1);
  font-size: 20px;
  cursor: pointer;
}

.tf_more_alert_r_sell_buy>button:nth-child(1) {
  background-color: rgba(225, 85, 68, 1);
}

.tf_more_alert_r_sell_buy>button:nth-child(2) {
  background-color: rgba(64, 163, 16, 1);
}

.tf_more_alert_r_sell_buy>button:nth-child(1):hover {
  background-color: rgb(207, 58, 41);
}

.tf_more_alert_r_sell_buy>button:nth-child(2):hover {
  background-color: rgb(49, 134, 7);
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
  margin-top: 53px;
}
</style>
