<template>
    <div class="tf_btn_more_alert_wrap">
      <div class="tf_btn_more_alert">
        <div class="tf_btn_more_alert_top">
          <h4>{{$store.state.isAddConditionChange?'修改':'添加'}}条件单</h4>
          <img src="../assets/img/closeBgGary.png" @click="tfRightBtnMoreAlertCloseFun" title="关闭">
        </div>
        <div class="tf_btn_more_alert_cont">
          <div class="tf_btn_more_alert_cont_btm">
            <div class="tf_btn_more_alert_cont_btm_l">
              <div class="tf_more_alert_r_top">
                <span>账号</span>
                <p>{{$store.state.userNumber}}</p>
              </div>
              <div class="tf_more_alert_r_top" style="margin-top: 10px;">
                <span>合约</span>
                <p v-show="$store.state.isAddConditionChange">{{tfBtmThreeOrderSelect}}</p>
                <select v-model="tfBtmThreeOrderSelect"  v-show="!$store.state.isAddConditionChange" @change="tfChangeSelectFun(tfBtmThreeOrderSelect)">
                  <option v-for="tfBtmThreeOrderOption in tfBtmThreeOrderOptions" :disabled="tfBtmThreeOrderOption.current_price == '--'" :key="tfBtmThreeOrderOption.id">{{tfBtmThreeOrderOption.contract_name}}</option>
                </select>
              </div>

              <p class="tf_btn_more_alert_cont_btm_r_p">触发条件</p>
              <div class="tf_more_alert_l_cont">
                <div class="tf_more_alert_l_line add_condition_btn">
                  <div @click="addConditionChooseBtnFun(addConditionChooseBtn.id)" v-for="addConditionChooseBtn in addConditionChooseBtns" :key="addConditionChooseBtn.id">
                    <img :class="{add_condition_btn_back: addConditionChooseBtn.id == addConditionChooseBtnId}" src="../assets/img/orderState.png" alt="">
                    <span :class="{add_condition_btn_disspan: $store.state.isAddConditionChange == true}">{{addConditionChooseBtn.name}}</span>
                  </div>
                </div>
                <div v-show="isAddConditionChooseNewPrice" class="tf_more_alert_l_line tf_more_alert_l_line1 tf_more_alert_l_line2">
                  <span>最新价</span>
                  <select v-model="tfMoreAlertLine1Size">
                    <option value=">=">>=</option>
                    <option value="<=">&lt;=</option>
                    <!-- <option>&ge;&le;</option>` -->
                  </select>
                  <div>
                    <input v-model="addConditionNew" type="number">
                    <img @click="addConditionNewSubFun" src="../assets/img/sub.png" alt>
                    <img @click="addConditionNewAddFun" src="../assets/img/add.png" alt>
                  </div>
                </div>
                <div v-show="isAddConditionChooseNewTime" class="tf_more_alert_l_line tf_more_alert_l_line1">
                  <span>时&emsp;间</span>
                  <span>>=</span>
                  <div class="add_condition_time">
                    <input @click="addConH" v-model="addConditionTimeHours" type="number" oninput="if(value>23)value=23;if(value.length>2)value=value.slice(0,2);if(value<0)value=0">
                    <span>:</span>
                    <input @click="addConM" v-model="addConditionTimeMinute" type="number" oninput="if(value>59)value=59;if(value.length>2)value=value.slice(0,2);if(value<0)value=0">
                    <img @click="addConditionTimeSubFun" src="../assets/img/sub.png" alt>
                    <img @click="addConditionTimeAddFun" src="../assets/img/add.png" alt>
                  </div>
                </div>
                <p class="tf_btn_more_alert_cont_btm_r_p">报单信息</p>
                <div class="tf_more_alert_l_line add_condition_btn">
                  <div @click="addConditionChooseInfo1BtnFun(addConditionChooseInfo1Btn.id)" v-for="addConditionChooseInfo1Btn in addConditionChooseInfo1Btns" :key="addConditionChooseInfo1Btn.id">
                    <img :class="{add_condition_btn_back: addConditionChooseInfo1Btn.id == addConditionChooseInfo1BtnId}" src="../assets/img/orderState.png" alt="">
                    <span>{{addConditionChooseInfo1Btn.name}}</span>
                  </div>
                  <div @click="addConditionChooseInfo2BtnFun(addConditionChooseInfo2Btn.id)" v-for="addConditionChooseInfo2Btn in addConditionChooseInfo2Btns" :key="addConditionChooseInfo2Btn.id">
                    <img :class="{add_condition_btn_back: addConditionChooseInfo2Btn.id == addConditionChooseInfo2BtnId}" src="../assets/img/orderState.png" alt="">
                    <span>{{addConditionChooseInfo2Btn.name}}</span>
                  </div>
                </div>
                <div class="tf_more_alert_l_line tf_more_alert_l_line2 tf_more_alert_l_line3">
                  <div>
                    <span>手数</span>
                    <input v-model="tfMoreAlertUserNum" type="number">
                    <img @click="tfMoreAlertUserNumSubFun" src="../assets/img/sub.png" alt>
                    <img @click="tfMoreAlertUserNumAddFun" src="../assets/img/add.png" alt>
                  </div>
                  <div class="tf_more_alert_l_line5">
                    <span>有效期</span>
                    <select v-model="tfMoreAlertUserDate">
                      <option value="当日有效">当日有效</option>
                      <!-- <option value="永久有效">永久有效</option> -->
                    </select>
                    <!-- <span>价格</span>
                    <select v-model="tfMoreAlertUserPriceName">
                      <option v-for="tfMoreAlertUserPrice in tfMoreAlertUserPrices" :key="tfMoreAlertUserPrice.id">{{tfMoreAlertUserPrice.name}}</option>
                    </select>
                    <p>{{tfMoreAlertUserPriceName}}</p>
                    <img @click="tfMoreAlertUserPriceSubFun" src="../assets/img/sub.png" alt>
                    <img @click="tfMoreAlertUserPriceAddFun" src="../assets/img/add.png" alt> -->
                  </div>
                </div>
                <!-- <div class="tf_more_alert_l_line1">
                  <span>有效期</span>
                  <select v-model="tfMoreAlertUserDate">
                    <option value="当日有效">当日有效</option>
                    <option value="永久有效">永久有效</option>
                  </select>
                </div> -->
              </div>
            </div>
            <div class="tf_btn_more_alert_cont_btm_r" v-if="0">
              <div class="tf_more_alert_r_top">
                <span>合约</span>
                <p v-show="$store.state.isAddConditionChange">{{tfBtmThreeOrderSelect}}</p>
                <select v-model="tfBtmThreeOrderSelect"  v-show="!$store.state.isAddConditionChange" @change="tfChangeSelectFun(tfBtmThreeOrderSelect)">
                  <option v-for="tfBtmThreeOrderOption in tfBtmThreeOrderOptions" :disabled="tfBtmThreeOrderOption.current_price == '--'" :key="tfBtmThreeOrderOption.id">{{tfBtmThreeOrderOption.contract_name}}</option>
                </select>
              </div>
              <p class="tf_btn_more_alert_cont_btm_r_p">止盈/止损设置</p>
              <div class="tf_more_alert_l_cont">
                <div class="tf_more_alert_l_line tf_more_alert_l_line1">
                  <span>有效期</span>
                  <select v-model="tfMoreAlertUserDate">
                    <option value="当日有效">当日有效</option>
                    <option value="永久有效">永久有效</option>
                  </select>
                  <p>参数为“0”则不启用</p>
                </div>
                <div class="tf_more_alert_l_line tf_more_alert_l_line2">
                  <input
                    v-model="addConditionMarketPrice"
                    type="checkbox"
                    id="add_condition_market_price"
                  >
                  <label for="add_condition_market_price" class="mark">市价止盈损</label>
                  <div>
                    <span>N秒后市价</span>
                    <input v-model="addPrepaidSecPrice" type="number">
                    <img @click="addPrepaidSecPriceSubFun" src="../assets/img/sub.png" alt>
                    <img @click="addPrepaidSecPriceAddFun" src="../assets/img/add.png" alt>
                  </div>
                </div>
                <div class="tf_more_alert_l_line tf_more_alert_l_line2 tf_more_alert_l_line3">
                  <div>
                    <span>回撤跳止损</span>
                    <input v-model="addConditionDown" type="number">
                    <img @click="addConditionDownSubFun" src="../assets/img/sub.png" alt>
                    <img @click="addConditionDownAddFun" src="../assets/img/add.png" alt>
                  </div>
                  <span>预回撤：50(HKD)</span>
                </div>
                <div class="tf_more_alert_l_line tf_more_alert_l_line2 tf_more_alert_l_line4" style="display:none">
                  <div>
                    <input
                      v-model="tfMoreAlertLine4Check1"
                      type="checkbox"
                      id="add_condition_down_down"
                    >
                    <label for="add_condition_down_down" class="mark">按跳</label>
                    <span>{{tfMoreAlertLine4Check1?'止损跳':'止损价格'}}</span>
                  </div>
                  <div>
                    <input
                      v-model="tfMoreAlertLine4Check2"
                      type="checkbox"
                      id="add_condition_down_up"
                    >
                    <label for="add_condition_down_up" class="mark">按跳</label>
                    <span>{{tfMoreAlertLine4Check2?'止盈跳':'止盈价格'}}</span>
                  </div>
                </div>
                <div class="tf_more_alert_l_line tf_more_alert_l_line2 tf_more_alert_l_line4" style="display:none">
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
          <!-- 添加条件单 -->
          <div v-show="!$store.state.isAddConditionChange" class="tf_btn7_online_ul_btn">
            <span @click="tfRightBtnMoreAlertCloseFun">取消</span>
            <span @click="addConditionComfireFun(1)">添加确定</span>
          </div>
          <!-- 修改条件单 -->
          <div v-show="$store.state.isAddConditionChange" class="tf_btn7_online_ul_btn">
            <span @click="tfRightBtnMoreAlertCloseFun">取消</span>
            <span @click="addConditionComfireFun(2)">修改确定</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "AddCondition",
  components: {
  },
  data() {
    return {
      tfBtmThreeOrderSelect: "", // 条件单 select 默认选中
      tfBtmThreeOrderOptions: [], // 条件单 option

      addConditionChooseBtns: [ // 按钮列表
        {id: 0, name: "价格"},
        {id: 1, name: "时间"},
        {id: 2, name: "价格+时间"},
        {id: 3, name: "开盘"},
      ],
      addConditionChooseBtnId: 0, // 选择 价格 时间 按钮
      isAddConditionChooseNewPrice: true, // 默认显示价格
      isAddConditionChooseNewTime: false, // 默认时间
      tfMoreAlertLine1Size: ">=", // 最新价
      addConditionTimeHours: "", // 小时
      addConditionTimeMinute: "", // 分钟
      isAddConH: true, // 时间小时
      isAddConM: false, // 时间分钟
      addConditionNew: 0, // 最新价

      addConditionChooseInfo1Btns: [ // 报单信息
        {id: 1, name: "买入"},
        {id: 2, name: "卖出"}
      ],
      addConditionChooseInfo2Btns: [ // 报单信息
        {id: 3, name: "开仓"},
        {id: 4, name: "平仓"}
      ],
      addConditionChooseInfo1BtnId: 1, // 选择 买 卖 按钮
      addConditionChooseInfo2BtnId: 3, // 选择 开仓 平仓 按钮

      tfMoreAlertUserNum: 1, // 账号选择手数
      tfMoreAlertUserPrices: [ // 账号选择价格
        {id: 0, name: "对手价", price: 12},
        {id: 1, name: "最新价", price: 20},
        {id: 2, name: "市价", price: 30},
      ],
      tfMoreAlertUserPriceName: "对手价",
      tfMoreAlertUserDate: "当日有效", // 账号有效期

      addConditionMarketPrice: false, // 市价止盈损
      addPrepaidSecPrice: 0, // N秒后市价
      addConditionDown: 0, // 回撤跳止损
      tfMoreAlertLine4Check1: false, // 按跳 跳止损
      tfMoreAlertLine4Check2: false, // 按跳 止盈跳
      tfMoreAlertLine5Ipt1: 0, // 右侧底部价格
      tfMoreAlertLine5Ipt2: 0, // 右侧底部数量
      getOrderTime: "", // 获取条件单的时间
      getOrderOneInfoFun: "", // 获取选中的合约的信息
      tfOrderSubAddPrice: "", // 获取选中的合约价格加减数
      isAddConditionListinfo: "", // 外盘点击的某一条条件单
    };
  },
  mounted: function() {
    let that = this;
    that.getOrderTime = function() {
      that.addConditionTimeHours = new Date().getHours(); // 获取当前小时
      that.addConditionTimeMinute = new Date().getMinutes(); // 获取当前分钟
      if (that.$store.state.isAddConditionChange) { // true是修改
        that.isAddConditionListinfo = that.$store.state.isAddConditionListinfo; // 修改某一条的信息
        that.tfBtmThreeOrderSelect = that.$store.state.isAddConditionListinfo.contract;
      } else { // false是添加
        that.tfBtmThreeOrderSelect = that.$store.state.codeName;
        // 添加条件单初始化面板信息
        that.addConditionChooseBtnId = 0; // 选择 价格 时间 按钮
        that.isAddConditionChooseNewPrice = true; // 默认显示价格
        that.isAddConditionChooseNewTime = false; // 默认时间
        that.tfMoreAlertLine1Size = ">="; // 最新价
        that.isAddConH = true; // 时间小时
        that.isAddConM = false; // 时间分钟
        that.addConditionNew = 0; // 最新价
        that.addConditionChooseInfo1BtnId = 1; // 选择 买 卖 按钮
        that.addConditionChooseInfo2BtnId = 3; // 选择 开仓 平仓 按钮
        that.tfMoreAlertUserNum = 1; // 账号选择手数
        that.tfMoreAlertUserPriceName = "对手价";
        that.tfMoreAlertUserDate = "当日有效"; // 账号有效期
        that.addConditionMarketPrice = false; // 市价止盈损
        that.addPrepaidSecPrice = 0; // N秒后市价
        that.addConditionDown = 0; // 回撤跳止损
        that.tfMoreAlertLine4Check1 = false; // 按跳 跳止损
        that.tfMoreAlertLine4Check2 = false; // 按跳 止盈跳
        that.tfMoreAlertLine5Ipt1 = 0; // 右侧底部价格
        that.tfMoreAlertLine5Ipt2 = 0; // 右侧底部数量
      }
    }
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
            that.tfMoreAlertUserPrices[0].price = res.data.data.current_info.current_price; // 最新价
            that.tfMoreAlertUserPrices[1].price = res.data.data.current_info.current_price; // 也走最新价
            that.tfMoreAlertUserPrices[2].price = res.data.data.current_info.current_price; // 也走最新价
            that.tfOrderSubAddPrice = res.data.data.current_info.wave_spot; // 加减数
            that.tfMoreAlertUserPriceName = that.tfMoreAlertUserPrices[0].name; //恢复默认对手价
          } else if (res.data.code == 0 || res.data.code == -1) {
            that.$message.error(res.data.msg);
          }
        });
    }
    that.getOrderChangeInfoFun = function() { // 修改条件单条件
      that.tfOrderSubAddPrice = that.isAddConditionListinfo.wave_spot; //加减数
      if (that.isAddConditionListinfo.trigger_type == "价格") {
        that.addConditionChooseBtnId = 0;
        this.isAddConditionChooseNewPrice = true;
        this.isAddConditionChooseNewTime = false;
        // console.log(that.isAddConditionListinfo.trigger_price.slice(2,4));
        // console.log(that.isAddConditionListinfo.trigger_price.slice(4));
        that.tfMoreAlertLine1Size = that.isAddConditionListinfo.trigger_price.slice(2, 4);// >= <=
        that.addConditionNew = Number(that.isAddConditionListinfo.trigger_price.slice(4));// 最新价
      } else if (that.isAddConditionListinfo.trigger_type == "时间") {
        that.addConditionChooseBtnId = 1;
        this.isAddConditionChooseNewPrice = false;
        this.isAddConditionChooseNewTime = true;
        that.addConditionTimeHours = Number(that.isAddConditionListinfo.trigger_time.slice(0, 2));// 小时
        that.addConditionTimeMinute = Number(that.isAddConditionListinfo.trigger_time.slice(3, 5));// 分钟
      } else if (that.isAddConditionListinfo.trigger_type == "价格+时间") {
        that.addConditionChooseBtnId = 2;
        this.isAddConditionChooseNewPrice = true;
        this.isAddConditionChooseNewTime = true;
        that.tfMoreAlertLine1Size = that.isAddConditionListinfo.trigger_price.slice(2, 4);// >= <=
        that.addConditionNew = Number(that.isAddConditionListinfo.trigger_price.slice(4));// 最新价
        that.addConditionTimeHours = Number(that.isAddConditionListinfo.trigger_time.slice(0, 2));// 小时
        that.addConditionTimeMinute = Number(that.isAddConditionListinfo.trigger_time.slice(3, 5));// 分钟
      } else if (that.isAddConditionListinfo.trigger_type == "开盘") {
        that.addConditionChooseBtnId = 3;
        this.isAddConditionChooseNewPrice = false;
        this.isAddConditionChooseNewTime = false;
      }
      if (that.isAddConditionListinfo.direction == "买入") { // 开仓类型
        that.addConditionChooseInfo1BtnId = 1;
      } else {
        that.addConditionChooseInfo1BtnId = 2;
      }
      if (that.isAddConditionListinfo.mold == "开仓") { // 开仓模式
        that.addConditionChooseInfo2BtnId = 3;
      } else {
        that.addConditionChooseInfo2BtnId = 4;
      }
      that.tfMoreAlertUserNum = that.isAddConditionListinfo.number; // 手数
      that.tfMoreAlertUserPrices[0].price = that.isAddConditionListinfo.price; // 最新价
      that.tfMoreAlertUserPrices[1].price = that.isAddConditionListinfo.price; // 也走最新价
      that.tfMoreAlertUserPrices[2].price = that.isAddConditionListinfo.price; // 也走最新价
      if (that.isAddConditionListinfo.classify == 1) { // 价格类型 0:排队价 1：最新价 2：对手价 3：市价 4:快速
        that.tfMoreAlertUserPriceName = "最新价";
      } else if (that.isAddConditionListinfo.classify == 2) {
        that.tfMoreAlertUserPriceName = "对手价";
      } else if (that.isAddConditionListinfo.classify == 3) {
        that.tfMoreAlertUserPriceName = "市价";
      } else if (that.isAddConditionListinfo.classify == -1) {
        that.tfMoreAlertUserPriceName = that.isAddConditionListinfo.price;
      }
      that.tfMoreAlertUserDate = that.isAddConditionListinfo.effective; // 有效期
      
      if (that.isAddConditionListinfo.stop_loss.market_loss == 0) { //市价止盈损
        that.addConditionMarketPrice = false;
      } else {
        that.addConditionMarketPrice = true;
      }
      that.addPrepaidSecPrice = that.isAddConditionListinfo.stop_loss.time_seconds;// N秒后市价
      that.addConditionDown = that.isAddConditionListinfo.stop_loss.back_loss;// 回撤跳止损
      if (that.isAddConditionListinfo.stop_loss.loss_spot_price == 1) {// 止损按跳
        that.tfMoreAlertLine4Check1 = true;
      } else {
        that.tfMoreAlertLine4Check1 = false;
      }
      if (that.isAddConditionListinfo.stop_loss.profit_spot_price == 1) {// 止盈按跳
        that.tfMoreAlertLine4Check2 = true;
      } else {
        that.tfMoreAlertLine4Check2 = false;
      }
      that.tfMoreAlertLine5Ipt1 = that.isAddConditionListinfo.stop_loss.loss; //止损跳/价格
      that.tfMoreAlertLine5Ipt2 = that.isAddConditionListinfo.stop_loss.profit; //止盈跳/价格
    }
    $(function() {
      $(".tf_btn_more_alert").draggable({handle: ".tf_btn_more_alert_top", containment: 'body'});
    });
  },
  methods: {
    tfRightBtnMoreAlertCloseFun() {
      // 下单 云预埋单 添加云预埋单 关闭按钮
      this.$store.commit("isAddConditionFun");
      this.$store.state.isAddConditionChange = false;
    },
    tfMoreAlertUserChoosePriceFun() {
      this.tfMoreAlertUserChooseUl = true;
    },
    addConditionComfireFun(index) {
      // console.log(this.$store.state.codeName);
      let that = this;
      let userToken = that.$store.state.tokenStr; // 获取token
      let time, timeH, timeM, newPrice, mold, direction, classify, price, market_loss, loss_spot_price, profit_spot_price, effective;
      
      if (that.addConditionTimeHours<10) {
        timeH = "0" + String(that.addConditionTimeHours);
      } else {
        timeH = that.addConditionTimeHours;
      }
      if (that.addConditionTimeMinute<10) {
        timeM = "0" + String(that.addConditionTimeMinute);
      } else {
        timeM = that.addConditionTimeMinute;
      }
      time = timeH + ":" + timeM;
      if (that.tfMoreAlertLine1Size == ">=") {
        newPrice = 0;
      } else if (that.tfMoreAlertLine1Size == "<=") {
        newPrice = 1;
      }
      // 开仓类型 0：买涨(买入) 1：买跌(卖出)
      if (that.addConditionChooseInfo1BtnId == 1) {
        direction = 0;
      } else if (that.addConditionChooseInfo1BtnId == 2) {
        direction = 1;
      }
      // 开仓模式 0：开仓 1：平仓
      if (that.addConditionChooseInfo2BtnId == 3) {
        mold = 0;
      } else if (that.addConditionChooseInfo2BtnId == 4) {
        mold = 1;
      }
      // 价格类型 0:排队价 1：最新价 2：对手价 3：市价 4:快速
      if (that.tfMoreAlertUserPriceName == that.tfMoreAlertUserPrices[0].name) {
        classify = 2;
        price = that.tfMoreAlertUserPrices[0].price;
      } else if (that.tfMoreAlertUserPriceName == that.tfMoreAlertUserPrices[1].name) {
        classify = 1;
        price = that.tfMoreAlertUserPrices[1].price;
      } else if (that.tfMoreAlertUserPriceName == that.tfMoreAlertUserPrices[2].name) {
        classify = 3;
        price = that.tfMoreAlertUserPrices[2].price;
      } else {
        // 如果是数字
        classify = -1;
        price = that.tfMoreAlertUserPriceName;
      }
      // 有效期
      if (that.tfMoreAlertUserDate == "当日有效") {
        effective = 0;
      } else if (that.tfMoreAlertUserDate == "永久有效") {
        effective = 1;
      }
      // 市价止盈损
      if (that.addConditionMarketPrice == false) {
        market_loss = 0;
      } else {
        market_loss = 1;
      }
      // 止损按跳 1按跳 ，0：按价格
      if (that.tfMoreAlertLine4Check1 == false) {
        loss_spot_price = 0;
      } else {
        loss_spot_price = 1;
      }
      // 止盈按跳 1按跳 ，0：按价格
      if (that.tfMoreAlertLine4Check2 == false) {
        profit_spot_price = 0;
      } else {
        profit_spot_price = 1;
      }
      if (index == 1) {
        // 添加条件单
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "condition_list",
              token: userToken,
              code: that.$store.state.codeName, // 期货代码
              trigger_type: that.addConditionChooseBtnId, // 0 价格触发 1 时间触发 2 价格+时间触发 3 开盘触发
              trigger_price: that.addConditionNew, // 触发价格
              trigger_time: time, // 触发时间
              trigger_mold: newPrice, // 触发价格模式 0 大于最新价 1 小于最新价
              number: that.tfMoreAlertUserNum, // 委托手数
              mold: mold, // 开仓模式 0：开仓 1：平仓
              direction: direction, // 开仓类型 0：买涨(买入) 1：买跌(卖出)
              classify: classify, // 价格类型 0:排队价 1：最新价 2：对手价 3：市价 4:快速
              price: price, // 委托价格
              effective: effective, // 有效期设置 0 当日有效 1 永久有效
              market_loss: market_loss, // 市价止盈损 0 非校验 1校验
              time_seconds: that.addPrepaidSecPrice, // N秒后市价
              loss_spot_price: loss_spot_price, // 止损按跳 1按跳 ，0：按价格
              profit_spot_price: profit_spot_price, // 止盈按跳 1按跳 ，0：按价格
              back_loss: that.addConditionDown, // 回撤跳止损
              loss: that.tfMoreAlertLine5Ipt1, // 止损跳/价格
              profit: that.tfMoreAlertLine5Ipt2, // 止盈跳/价格
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              that.$message.success(res.data.msg);
              that.$store.commit("isAddConditionFun");
              that.$parent.$refs.out.conditionOrderListsFun(0); // 条件单刷新
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      } else {
        // 修改条件单
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "modify_condition_list",
              token: userToken,
              mark: that.isAddConditionListinfo.mark, // 唯一标识
              trigger_price: that.addConditionNew, // 触发价格
              trigger_time: time, // 触发时间
              trigger_mold: newPrice, // 触发价格模式 0 大于最新价 1 小于最新价
              number: that.tfMoreAlertUserNum, // 委托手数
              mold: mold, // 开仓模式 0：开仓 1：平仓
              direction: direction, // 开仓类型 0：买涨(买入) 1：买跌(卖出)
              classify: classify, // 价格类型 0:排队价 1：最新价 2：对手价 3：市价 4:快速
              price: price, // 委托价格
              effective: effective, // 有效期设置 0 当日有效 1 永久有效
              market_loss: market_loss, // 市价止盈损 0 非校验 1校验
              time_seconds: that.addPrepaidSecPrice, // N秒后市价
              loss_spot_price: loss_spot_price, // 止损按跳 1按跳 ，0：按价格
              profit_spot_price: profit_spot_price, // 止盈按跳 1按跳 ，0：按价格
              back_loss: that.addConditionDown, // 回撤跳止损
              loss: that.tfMoreAlertLine5Ipt1, // 止损跳/价格
              profit: that.tfMoreAlertLine5Ipt2, // 止盈跳/价格
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              that.$message.success(res.data.msg);
              that.$store.commit("isAddConditionFun");
              that.$store.state.isAddConditionChange = false; // 修改条件单状态初始化
              that.$parent.$refs.out.conditionOrderListsFun(0); // 条件单刷新
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      }
    },
    addConditionChooseBtnFun(index) { // 点击头部按钮
      if (this.$store.state.isAddConditionChange == false) {
        this.addConditionChooseBtnId = index;
        if (index == 0) {
          this.isAddConditionChooseNewPrice = true;
          this.isAddConditionChooseNewTime = false;
        } else if (index == 1) {
          this.isAddConditionChooseNewPrice = false;
          this.isAddConditionChooseNewTime = true;
        } else if (index == 2) {
          this.isAddConditionChooseNewPrice = true;
          this.isAddConditionChooseNewTime = true;
        } else if (index == 3) {
          this.isAddConditionChooseNewPrice = false;
          this.isAddConditionChooseNewTime = false;
        }
      }
    },
    addConditionChooseInfo1BtnFun(index) { // 报单信息按钮
      this.addConditionChooseInfo1BtnId = index;
    },
    addConditionChooseInfo2BtnFun(index) { // 报单信息按钮
      this.addConditionChooseInfo2BtnId = index;
    },

    addConditionNewSubFun() {
      // 最新价 减
      if (this.addConditionNew <= 0) {
        this.addConditionNew = 0;
      } else {
        let num;
        if (this.tfOrderSubAddPrice.indexOf(".") == -1) {
          num = 0;
        } else {
          num = Number(this.tfOrderSubAddPrice).toString().split(".")[1].length;
        }
        this.addConditionNew = (Number(this.addConditionNew) - Number(this.tfOrderSubAddPrice)).toFixed(num);
      }
    },
    addConditionNewAddFun() {
      // 最新价 加
      let num;
      if (this.tfOrderSubAddPrice.indexOf(".") == -1) {
        num = 0;
      } else {
        num = Number(this.tfOrderSubAddPrice).toString().split(".")[1].length;
      }
      this.addConditionNew = (Number(this.addConditionNew) + Number(this.tfOrderSubAddPrice)).toFixed(num);
    },

    addConH() {
      this.isAddConH = true;
      this.isAddConM = false;
    },
    addConM() {
      this.isAddConH = false;
      this.isAddConM = true;
    },
    addConditionTimeSubFun() { // 时间减
      if (this.isAddConH) {
        if (this.addConditionTimeHours <= 0) {
          this.addConditionTimeHours = 0;
        } else {
          this.addConditionTimeHours = Math.floor(this.addConditionTimeHours) - 1;
        }
      } else if (this.isAddConM) {
        if (this.addConditionTimeMinute <= 0) {
          this.addConditionTimeMinute = 0;
        } else {
          this.addConditionTimeMinute = Math.floor(this.addConditionTimeMinute) - 1;
        }
      }
    },
    addConditionTimeAddFun() { // 时间加
      if (this.isAddConH) {
        if (this.addConditionTimeHours >= 23) {
          this.addConditionTimeHours = 23;
        } else {
          this.addConditionTimeHours = Math.floor(this.addConditionTimeHours) + 1;
        }
      } else if (this.isAddConM) {
        if (this.addConditionTimeMinute >= 59) {
          this.addConditionTimeMinute = 59;
        } else {
          this.addConditionTimeMinute = Math.floor(this.addConditionTimeMinute) + 1;
        }
      }
    },

    tfMoreAlertUserNumSubFun() {
      // 账号手数 减
      if (this.tfMoreAlertUserNum <= 1) {
        this.tfMoreAlertUserNum = 1;
      } else {
        this.tfMoreAlertUserNum = Number(this.tfMoreAlertUserNum) - 1;
      }
    },
    tfMoreAlertUserNumAddFun() {
      // 账号手数 加
      this.tfMoreAlertUserNum = Number(this.tfMoreAlertUserNum) + 1;
    },
    tfMoreAlertUserPriceSubFun() {
      // 账号价格 减
      if (this.tfMoreAlertUserPriceName == "对手价") {
        this.tfMoreAlertUserPriceName = this.tfMoreAlertUserPrices[0].price;
        // console.log(this.tfMoreAlertUserPriceName);
      } else if (this.tfMoreAlertUserPriceName == "最新价") {
        this.tfMoreAlertUserPriceName = this.tfMoreAlertUserPrices[1].price;
      } else if (this.tfMoreAlertUserPriceName == "市价") {
        this.tfMoreAlertUserPriceName = this.tfMoreAlertUserPrices[2].price;
      }
      if (this.tfMoreAlertUserPriceName <= 0) {
        this.tfMoreAlertUserPriceName = 0;
      } else {
        let num;
        if (this.tfOrderSubAddPrice.indexOf(".") == -1) {
          num = 0;
        } else {
          num = Number(this.tfOrderSubAddPrice).toString().split(".")[1].length;
        }
        this.tfMoreAlertUserPriceName = (Number(this.tfMoreAlertUserPriceName) - Number(this.tfOrderSubAddPrice)).toFixed(num);
      }
    },
    tfMoreAlertUserPriceAddFun() {
      // 账号价格 加
      if (this.tfMoreAlertUserPriceName == "对手价") {
        this.tfMoreAlertUserPriceName = this.tfMoreAlertUserPrices[0].price;
      } else if (this.tfMoreAlertUserPriceName == "最新价") {
        this.tfMoreAlertUserPriceName = this.tfMoreAlertUserPrices[1].price;
      } else if (this.tfMoreAlertUserPriceName == "市价") {
        this.tfMoreAlertUserPriceName = this.tfMoreAlertUserPrices[2].price;
      }
      let num;
      if (this.tfOrderSubAddPrice.indexOf(".") == -1) {
        num = 0;
      } else {
        num = Number(this.tfOrderSubAddPrice).toString().split(".")[1].length;
      }
      this.tfMoreAlertUserPriceName = (Number(this.tfMoreAlertUserPriceName) + Number(this.tfOrderSubAddPrice)).toFixed(num);
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
    addPrepaidSecPriceSubFun() {
      // N秒后市价 减
      if (this.addPrepaidSecPrice <= 0) {
        this.addPrepaidSecPrice = 0;
      } else {
        this.addPrepaidSecPrice = Math.floor(this.addPrepaidSecPrice) - 1;
      }
    },
    addPrepaidSecPriceAddFun() {
      // N秒后市价 加
      this.addPrepaidSecPrice = Math.floor(this.addPrepaidSecPrice) + 1;
    },
    addConditionDownSubFun() {
      //回撤跳止损 减
      if (this.addConditionDown <= 0) {
        this.addConditionDown = 0;
      } else {
        this.addConditionDown = Math.floor(this.addConditionDown) - 1;
      }
    },
    addConditionDownAddFun() {
      //回撤跳止损 加
      this.addConditionDown = Math.floor(this.addConditionDown) + 1;
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
  margin-left: -180px;
  margin-top: -225px;
  z-index: 1500;
  width: 360px;
  height: 450px;
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
  background: white;
  cursor: pointer;
}
.tf_btn_more_alert_top>img:hover {
  background: #999;
}

.tf_btn_more_alert_cont {
  padding: 0 20px;
}

.tf_btn_more_alert_cont_btm {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  margin-top: 20px;
}

/* 开仓止损弹窗左侧 */
.tf_btn_more_alert_cont_btm_l {
  width: 320px;
}
.add_condition_btn {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  width: 100%;
}
.add_condition_btn>div {
  cursor: pointer;
}
.add_condition_btn>div>img {
  width: 14px;
  height: 14px;
  background-color: rgba(170, 170, 170, 1);
}

.add_condition_btn>div>.add_condition_btn_back {
  background: #FA8E53;
}
.add_condition_btn>div>.add_condition_btn_disspan {
  color: rgba(170, 170, 170, 1);
  cursor: no-drop;
}

.add_condition_time {
  width: 130px;
  font-size: 0;
}

.add_condition_time> input {
  width: 36px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  background-color: rgba(221, 221, 221, 1);
  padding-right: 4px;
  border-radius: 4px;
  vertical-align: middle;
  text-align: right;
}
.add_condition_time> span {
  line-height: 30px;
  font-size: 14px;
  vertical-align: middle;
}
.add_condition_time> img {
  width: 17px;
  height: 17px;
  vertical-align: middle;
  margin-left: 10px;
  cursor: pointer;
}
/* 开仓止损弹窗右侧 */
.tf_btn_more_alert_cont_btm_r {
  width: 320px;
}

input {
  vertical-align: middle;
}

label {
  vertical-align: middle;
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  cursor: pointer;
}

input[type="checkbox"] {
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

input[type="checkbox"]:checked+.mark::before {
  content: '\2713';
  color: white;
  background: #FA8E53;
  font-size: 10px;
  line-height: 14px;
  text-align: center;
  margin-right: 5px;
  vertical-align: middle;
}

.tf_btn_more_alert_cont_btm_r_p {
  width: 100%;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: #333;
  font-size: 16px;
  margin-top: 10px;
}

.tf_more_alert_l_cont {
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  -webkit-flex-direction: column;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  align-items: center;
  -webkit-align-items: center;
}

.tf_more_alert_l_line {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  align-items: center;
  -webkit-align-items: center;
}

.tf_more_alert_l_line1 {
  width: 100%;
  height: 30px;
  margin-top: 10px;
}

.tf_more_alert_l_line1>span {
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  line-height: 30px;
}

.tf_more_alert_l_line1>select {
  width: 80px;
  height: 30px;
  line-height: 30px;
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  border: 1px solid rgba(232, 232, 232, 1);
  border-radius: 4px;
}
.tf_more_alert_l_line2>.tf_more_alert_l_line5 {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  align-items: center;
  -webkit-align-items: center; 
  position: relative;
}

.tf_more_alert_l_line2>.tf_more_alert_l_line5>span {
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  line-height: 30px;
}

.tf_more_alert_l_line2>.tf_more_alert_l_line5>p {
  position: absolute;
  z-index: -1;
  font-size: 14px;
  left: 36px;
  width: 80px;
  height: 30px;
  line-height: 30px;
  color: rgba(16, 16, 16, 1);
  padding-left: 4px;
  border: 1px solid rgba(232, 232, 232, 1);
  border-radius: 4px;
}
.tf_more_alert_l_line2>.tf_more_alert_l_line5>select {
  /* position: absolute; */
  width: 80px;
  height: 30px;
  line-height: 30px;
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  border: 1px solid rgba(232, 232, 232, 1);
  border-radius: 4px;
  /* opacity: 0; */
}

.tf_more_alert_l_line2>.tf_more_alert_l_line5>img {
  width: 17px;
  height: 17px;
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
  margin-right: 8px;
}

.tf_more_alert_l_line2>div>input {
  width: 76px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  background-color: rgba(221, 221, 221, 1);
  padding-right: 4px;
  border-radius: 4px;
  vertical-align: middle;
  text-align: right;
}

.tf_more_alert_l_line2>div>img {
  width: 17px;
  height: 17px;
  vertical-align: middle;
  margin-left: 10px;
  cursor: pointer;
}

.tf_more_alert_l_line3>div>input {
  width: 40px;
}

.tf_more_alert_l_line3>span {
  color: rgba(189, 189, 189, 1);
  font-size: 14px;
  line-height: 30px;
  margin-left: 16px;
  vertical-align: middle;
}
.tf_more_alert_l_line4>div {
  width: 50%;
}

.tf_more_alert_l_line4>div>span {
  color: rgba(255, 36, 36, 1);
  font-size: 14px;
  vertical-align: middle;
  line-height: 30px;
  margin-left: 10px;
}

.tf_more_alert_l_line_p_green {
  width: 100%;
  color: rgba(64, 163, 16, 1);
  font-size: 14px;
  line-height: 20px;
}

.tf_more_alert_l_line_p_red {
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 36, 36, 1);
}

.tf_more_alert_r_top>span {
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  vertical-align: middle;
}

.tf_more_alert_r_top>select {
  width: 266px;
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
.tf_more_alert_r_top>p {
  display: inline-block;
  width: 266px;
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

.tf_btn7_online_ul_btn {
  width: 100%;
  margin-top: 30px;
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
