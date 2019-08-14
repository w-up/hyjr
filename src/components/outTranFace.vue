<template>
  <div class="transactface_wrap" ref="out_wrap">
    <div class="tfDragUpDown" @mousedown="moveUpDown" :class="$store.state.isShowAlertTface?'tfDragUpDownOut':''"></div>
    <!-- height: tfActiveHeight + 'px' -->
    <div class="transactface" :style="{top: tfActiveTop + 'px', left: tfActiveLeft + 'px'}" :class="$store.state.isShowAlertTface?'click_out_tf':'click_in_tf'" ref="outTranWrap">
      <div v-show="$store.state.isShowAlertTface" class="ui-resizable-handle ui-resizable-e" style="z-index: 90;"></div>
      <div v-show="$store.state.isShowAlertTface" class="ui-resizable-handle ui-resizable-s" style="z-index: 90;"></div>
      <div v-show="$store.state.isShowAlertTface" class="ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se" style="z-index: 90;"></div>
      <div class="tf_top" @click.right="outMenuRightFun">
        <div class="tf_top_l">
          <!-- 账户信息 -->
          <ul class="tf_top_l_ul">
            <li>{{userInfo.name}}</li>
            <li>
              平仓盈亏：
              <span>{{userInfo.close_profit}}</span>
            </li>
            <li>
              持仓盈亏：
              <span>{{userInfo.open_profit}}</span>
            </li>
            <li>保证金：{{userInfo.bond}}</li>
            <!-- <li>静态权益：{{userInfo.static_interest}}</li> -->
            <li>动态权益：{{userInfo.dynamic_interest}}</li>
            <li>可用资金：{{userInfo.use_amount}}</li>
            <li>资金占比：{{userInfo.amount_proportion}}%</li>
          </ul>
        </div>
        <div class="tf_top_r">
          <span class="tf_top_r_out" @click="isClickedOutFaceFun">{{$store.state.isShowAlertTface?'停靠':'弹出'}}</span>
          <span @click="tfTopF12BtnFun" class="tf_top_r_f12">F12</span>
          <div v-clickoutside="clickCloseMenu" class="tf_top_r_menu_wrap">
            <span @click="outMenuFun" class="tf_top_r_menu">菜单</span>
            <!-- 点击菜单弹窗 -->
            <div class="tf_right_menu" v-show="isShowClickTfMenu">
              <ul class="tf_right_menu_ul">
                <li
                  class="tf_right_menu_li"
                  @click="tfRightMenuFun(tfRightMenuBtn.id)"
                  v-for="tfRightMenuBtn in tfRightMenuBtns"
                  :key="tfRightMenuBtn.id"
                >
                  <img src="../assets/img/stateClicked.png" v-show="tfRightMenuBtn.isClicked">
                  <p
                    :class="tfRightMenuBtn.isClicked?'':'tf_right_menu_li_margin'"
                  >{{tfRightMenuBtn.name}}</p>
                </li>
              </ul>
            </div>
            <!-- 点击菜单弹窗 end -->
          </div>
        </div>
      </div>
      <div class="tf_btm_wrap" :class="tfBtmWrapReverse?'tf_btm_wrap_reverse':''">
        <div class="tf_btm_r" :class="tfBtmWrapShow?'':'tf_btm_r_show'">
          <ul class="tf_btm_r_ul">
            <li
              class="tf_btm_r_li"
              @click.left="tfRightBtnFun(tfRBtn.id), websocketonopen()"
              @click.right="tfRightBtnFun(tfRBtn.id)"
              v-for="tfRBtn in tfRightBtns"
              :key="tfRBtn.id"
              :class="tfRBtn.isActive?'tf_btm_r_li_active':''"
            >{{tfRBtn.name}}</li>
            <!-- <li class="tf_btm_r_li" :class="tfRightBtnMoreActive?'tf_btm_r_li_active':''">
              <div @click.stop="tfRightBtnMoreFun" @click.right="tfRightBtnMoreFun">更多...</div>
              <div
                class="tf_btm_more_alert"
                v-clickoutside="handleCloseMore"
                v-show="tfRightBtnMore"
                @click="tfRightBtnMoreAlertFun"
              >止损开仓</div>
            </li> -->
          </ul>
          <!-- :style="{height: tfActiveHeight - 60 + 'px'}" -->
          <ul class="tf_btm_r_cont" ref="tfOrderCont">
            <!-- 持仓 -->
            <li v-show="tfRightBtns[0].isActive">
              <!-- 持仓 -->
              <div class="tf_btm_cont_wrap tf_btm_cont_wrap_two">
                <table
                  class="tf_btm_cont_btn tf_btm_cont_btn1"
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                >
                  <thead>
                    <tr>
                      <th
                        :class="haveCangTopList.color?'tf_btm_cont_btn1_th':''"
                        v-for="haveCangTopList in haveCangTopLists"
                        :key="haveCangTopList.id"
                      >{{haveCangTopList.name}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      @click.right="tfdepotRightFun(depotTopContList.id)"
                      v-for="depotTopContList in depotTopContLists"
                      :key="depotTopContList.id"
                      :class="{tf_btm_cont_loss_order5_tr: depotOrderListMark == depotTopContList.id}"
                      @click.left="tfdepotOrderListsFun(depotTopContList.id)"
                    >
                      <!-- 交易账号 -->
                      <td>{{depotTopContList.trade_name}}</td>
                      <!-- 合约 -->
                      <td>{{depotTopContList.contract}}</td>
                      <!-- 买卖 -->
                      <td>{{depotTopContList.direction}}</td>
                      <!-- 持仓 -->
                      <td>{{depotTopContList.number}}</td>
                      <!-- 今仓 -->
                      <td>{{depotTopContList.day_num}}</td>
                      <!-- 可用 -->
                      <td>{{depotTopContList.surplus}}</td>
                      <!-- 持仓均价 -->
                      <td>{{depotTopContList.average}}</td>
                      <!-- 止损/数量 -->
                      <td @click="depotNumSetFun(1)">{{depotTopContList.min_loss}} / {{depotTopContList.loss_number}}</td>
                      <!-- 止盈/数量 -->
                      <td @click="depotNumSetFun(2)">{{depotTopContList.min_profit}} / {{depotTopContList.profit_number}}</td>
                      <!-- 浮动盈亏 -->
                      <td :class="depotTopContList.profit_loss>=0?'td_color_red':'td_color_green'">{{depotTopContList.profit_loss}}</td>
                      <!-- 市价 -->
                      <td>{{depotTopContList.market_price}}</td>
                      <!-- 总价差 -->
                      <td>{{depotTopContList.market_diff}}</td>
                      <!-- 保证金 -->
                      <td>{{depotTopContList.bond_total}}</td>
                      <!-- 结算货币 -->
                      <td>{{depotTopContList.settle_currency}}</td>
                      <!-- 报价货币 -->
                      <td>{{depotTopContList.offer_currency}}</td>
                      <!-- 结算汇率 -->
                      <td>{{depotTopContList.settle_ratio}}</td>
                      <!-- 合约名 -->
                      <td>{{depotTopContList.contract_name}}</td>
                      <!-- 品种 -->
                      <td>{{depotTopContList.variety}}</td>
                      <!-- 每笔乘数 -->
                      <td>{{depotTopContList.wave_price}}</td>
                      <!-- 交易所 -->
                      <td>{{depotTopContList.exchange}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- 持仓下面委托 -->
              <div class="tf_btm_cont_wrap tf_btm_cont_wrap_two">
                <table
                  class="tf_btm_cont_btn tf_btm_cont_btn1"
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                >
                  <thead>
                    <tr>
                      <th
                        :class="entrustBtmList.color?'tf_btm_cont_btn1_th':''"
                        v-for="entrustBtmList in entrustBtmLists"
                        :key="entrustBtmList.id"
                      >{{entrustBtmList.name}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="entrustBtmContList in entrustBtmContLists"
                      :key="entrustBtmContList.id"
                      :class="{tf_btm_cont_loss_order5_tr : entrustOrderListMark == entrustBtmContList.id}"
                      @click.left="tfEntrustOrderListsFun(entrustBtmContList.id)"
                      @click.right="tfEntrustRightFun(entrustBtmContList.id)"
                      @dblclick="tfEntrustDblclickFun(entrustBtmContList.id)"
                    >
                      <!-- 交易账号 -->
                      <td>{{entrustBtmContList.trade_name}}</td>
                      <!-- 合约 -->
                      <td>{{entrustBtmContList.contract}}</td>
                      <!-- 状态 -->
                      <td>{{entrustBtmContList.status}}</td>
                      <!-- 委托量 -->
                      <td>{{entrustBtmContList.number}}</td>
                      <!-- 委托价 -->
                      <td>{{entrustBtmContList.entrust_price}}</td>
                      <!-- 买卖 -->
                      <td>{{entrustBtmContList.direction}}</td>
                      <!-- 开平 -->
                      <td>{{entrustBtmContList.mold}}</td>
                      <!-- 预止损 -->
                      <td>{{entrustBtmContList.prevent_loss}}</td>
                      <!-- 系统号 -->
                      <td>{{entrustBtmContList.system}}</td>
                      <!-- 委托号 -->
                      <td>{{entrustBtmContList.entrust_order}}</td>
                      <!-- 可撤 -->
                      <td>{{entrustBtmContList.surplus}}</td>
                      <!-- 已成交 -->
                      <td>{{entrustBtmContList.deal}}</td>
                      <!-- 委托时间 -->
                      <td>{{entrustBtmContList.time}}</td>
                      <!-- 受理时间 -->
                      <td></td>
                      <!-- 撤单时间 -->
                      <td>{{entrustBtmContList.cancel_time}}</td>
                      <!-- 详细状态 -->
                      <td>{{entrustBtmContList.detail_status}}</td>
                      <!-- 委托来源 -->
                      <td>{{entrustBtmContList.source}}</td>
                      <!-- 结算币种 -->
                      <td>{{entrustBtmContList.currency}}</td>
                      <!-- 合约小数位 -->
                      <td>{{entrustBtmContList.decimal}}</td>
                      <!-- 下单会话ID -->
                      <td>{{entrustBtmContList.order_id}}</td>
                      <!-- 止损价 -->
                      <td>{{entrustBtmContList.loss_price}}</td>
                      <!-- 回撤跳止损 -->
                      <td>{{entrustBtmContList.back_loss}}</td>
                      <!-- 止盈价 -->
                      <td>{{entrustBtmContList.profit_price}}</td>
                      <!-- 止损方式 -->
                      <td>{{entrustBtmContList.loss_type}}</td>
                      <!-- 有效期 -->
                      <td>{{entrustBtmContList.effective_date}}</td>
                      <!-- 市价止损 -->
                      <td>{{entrustBtmContList.market_price_loss}}</td>
                      <!-- N秒后市价 -->
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
            <!-- 持仓 end -->
            <!-- 委托 -->
            <li v-show="tfRightBtns[1].isActive">
              <div class="tf_btm_cont_wrap">
                <table
                  class="tf_btm_cont_btn tf_btm_cont_btn1 tf_btm_cont_btn2"
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                >
                  <thead>
                    <tr>
                      <th :class="item.color?'tf_btm_cont_btn1_th':''" v-for="item in entrustBtmLists" :key="item.id">{{item.name}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="entrustBtmContList in entrustBtmContLists"
                      :key="entrustBtmContList.id"
                      :class="{tf_btm_cont_loss_order5_tr : entrustOrderListMark == entrustBtmContList.id}"
                      @click.left="tfEntrustOrderListsFun(entrustBtmContList.id)"
                      @click.right="tfEntrustRightFun(entrustBtmContList.id)"
                      @dblclick="tfEntrustDblclickFun(entrustBtmContList.id)"
                    >
                      <!-- 交易账号 -->
                      <td>{{entrustBtmContList.trade_name}}</td>
                      <!-- 合约 -->
                      <td>{{entrustBtmContList.contract}}</td>
                      <!-- 状态 -->
                      <td>{{entrustBtmContList.status}}</td>
                      <!-- 委托量 -->
                      <td>{{entrustBtmContList.number}}</td>
                      <!-- 委托价 -->
                      <td>{{entrustBtmContList.entrust_price}}</td>
                      <!-- 买卖 -->
                      <td>{{entrustBtmContList.direction}}</td>
                      <!-- 开平 -->
                      <td>{{entrustBtmContList.mold}}</td>
                      <!-- 预止损 -->
                      <td>{{entrustBtmContList.prevent_loss}}</td>
                      <!-- 系统号 -->
                      <td>{{entrustBtmContList.system}}</td>
                      <!-- 委托号 -->
                      <td>{{entrustBtmContList.entrust_order}}</td>
                      <!-- 可撤 -->
                      <td>{{entrustBtmContList.surplus}}</td>
                      <!-- 已成交 -->
                      <td>{{entrustBtmContList.deal}}</td>
                      <!-- 委托时间 -->
                      <td>{{entrustBtmContList.time}}</td>
                      <!-- 受理时间 -->
                      <td></td>
                      <!-- 撤单时间 -->
                      <td>{{entrustBtmContList.cancel_time}}</td>
                      <!-- 详细状态 -->
                      <td>{{entrustBtmContList.detail_status}}</td>
                      <!-- 委托来源 -->
                      <td>{{entrustBtmContList.source}}</td>
                      <!-- 结算币种 -->
                      <td>{{entrustBtmContList.currency}}</td>
                      <!-- 合约小数位 -->
                      <td>{{entrustBtmContList.decimal}}</td>
                      <!-- 下单会话ID -->
                      <td>{{entrustBtmContList.order_id}}</td>
                      <!-- 止损价 -->
                      <td>{{entrustBtmContList.loss_price}}</td>
                      <!-- 回撤跳止损 -->
                      <td>{{entrustBtmContList.back_loss}}</td>
                      <!-- 止盈价 -->
                      <td>{{entrustBtmContList.profit_price}}</td>
                      <!-- 止损方式 -->
                      <td>{{entrustBtmContList.loss_type}}</td>
                      <!-- 有效期 -->
                      <td>{{entrustBtmContList.effective_date}}</td>
                      <!-- 市价止损 -->
                      <td>{{entrustBtmContList.market_price_loss}}</td>
                      <!-- N秒后市价 -->
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="tf_btm_cont_btn_btm">
                <div class="tf_btm_cont_btn_btm_l tf_btm_cont_btns_click">
                  <div @click="tfEntrustLeftBtnListsFun(entrustLeftBtnList.id)" v-for="entrustLeftBtnList in entrustLeftBtnLists" :key="entrustLeftBtnList.id">
                    <img src="../assets/img/orderState.png" :class="{state_btm_btn_clicked:entrustLeftBtnList.name == entrustLeftBtnListName}" alt="">
                    <span>{{entrustLeftBtnList.name}}</span>
                  </div>
                </div>
                <div class="tf_btm_cont_btn_btm_r">
                  <button
                    @click="left5ContTopRightBtnsFun(left5ContTopRightBtn.id)"
                    :class="left5ContTopRightBtn.isClicked?'left5_cont_btm_right_top_btns_active':''"
                    v-for="left5ContTopRightBtn in left5ContTopRightBtns"
                    :key="left5ContTopRightBtn.id"
                  >{{left5ContTopRightBtn.name}}</button>
                </div>
              </div>
            </li>
            <!-- 委托 end -->
            <!-- 成交 -->
            <li v-show="tfRightBtns[2].isActive">
              <div class="tf_btm_cont_wrap tf_btm_cont_wrap_none_btn">
                <table
                  class="tf_btm_cont_btn tf_btm_cont_btn3"
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                >
                  <thead>
                    <tr>
                      <th
                        :class="tranList.color?'tf_btm_cont_btn1_th':''"
                        v-for="tranList in tranLists"
                        :key="tranList.id"
                      >{{tranList.name}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="tranContList in tranContLists" :key="tranContList.id">
                      <!-- 交易账号 -->
                      <td>{{tranContList.trade_name}}</td>
                      <!-- 成交编号 -->
                      <td>{{tranContList.order}}</td>
                      <!-- 合约 -->
                      <td>{{tranContList.contract}}</td>
                      <!-- 成交数量 -->
                      <td>{{tranContList.number}}</td>
                      <!-- 成交价格 -->
                      <td>{{tranContList.deal_price}}</td>
                      <!-- 买卖 -->
                      <td>{{tranContList.direction}}</td>
                      <!-- 开平 -->
                      <td>{{tranContList.mold}}</td>
                      <!-- 委托号 -->
                      <td>{{tranContList.entrust_order}}</td>
                      <!-- 委托来源 -->
                      <td>{{tranContList.source}}</td>
                      <!-- 成交时间 -->
                      <td>{{tranContList.time}}</td>
                      <!-- 手续费 -->
                      <td>{{tranContList.fee_total}}</td>
                      <!-- 平仓盈亏 -->
                      <td>{{tranContList.profit_loss}}</td>
                      <!-- 系统号 -->
                      <td>{{tranContList.system}}</td>
                      <!-- 用户字段 -->
                      <td>{{tranContList.user}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
            <!-- 成交 end -->
            <!-- 预埋单 -->
            <li v-show="0">
              <div class="tf_btm_cont_wrap tf_btm_cont_wrap_none_btn">
                <table
                  class="tf_btm_cont_btn tf_btm_cont_btn3"
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                >
                  <thead>
                    <tr>
                      <th
                        :class="prePayList.color?'tf_btm_cont_btn1_th':''"
                        v-for="prePayList in prePayLists"
                        :key="prePayList.id"
                      >{{prePayList.name}}</th>
                    </tr>
                  </thead>
                  <tbody @click.right="tfPrepaidRightFun()">
                    <tr
                      v-for="prepaidOrderList in prepaidOrderLists"
                      :key="prepaidOrderList.id"
                      :class="{tf_btm_cont_loss_order5_tr:prepaidOrderListMark == prepaidOrderList.mark}"
                      @click.left="tfPrepaidOrderListsFun(prepaidOrderList.mark)"
                    >
                      <!-- 创建时间 -->
                      <td>{{prepaidOrderList.time}}</td>
                      <!-- 交易账户 -->
                      <td>{{prepaidOrderList.trade_name}}</td>
                      <!-- 合约 -->
                      <td>{{prepaidOrderList.contract}}</td>
                      <!-- 下单方向 -->
                      <td>{{prepaidOrderList.direction}}</td>
                      <!-- 开平 -->
                      <td>{{prepaidOrderList.mold}}</td>
                      <!-- 手数 -->
                      <td>{{prepaidOrderList.number}}</td>
                      <!-- 下单价格 -->
                      <td>{{prepaidOrderList.price}}</td>
                      <!-- 回撤跳止损 -->
                      <td>{{prepaidOrderList.back_loss}}</td>
                      <!-- 止损 -->
                      <td>{{prepaidOrderList.loss}}</td>
                      <!-- 止盈 -->
                      <td>{{prepaidOrderList.profit}}</td>
                      <!-- 市场止损 -->
                      <td>{{prepaidOrderList.market_loss}}</td>
                      <!-- N秒后市价 -->
                      <td>{{prepaidOrderList.time_seconds}}</td>
                      <!-- 编号 -->
                      <td>{{prepaidOrderList.order}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
            <!-- 预埋单 end -->
            <!-- 条件单 -->
            <li v-show="tfRightBtns[3].isActive">
              <div class="tf_btm_cont_wrap">
                <table
                  class="tf_btm_cont_btn tf_btm_cont_loss_order5 tf_btm_cont_btn2"
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                >
                  <thead>
                    <tr>
                      <th
                        v-for="conditionOrderTopList in conditionOrderTopLists"
                        :key="conditionOrderTopList.id"
                      >{{conditionOrderTopList.name}}</th>
                    </tr>
                  </thead>
                  <tbody @click.right="tfConditionRightFun()">
                    <tr
                      v-for="conditionOrderList in conditionOrderLists"
                      :key="conditionOrderList.id"
                      :class="{tf_btm_cont_loss_order5_tr : conditionOrderList.mark == conditionOrderListMark}"
                      @click.left="tfConditionOrderListsFun(conditionOrderList.mark)"
                    >
                      <!-- 状态 -->
                      <td>{{conditionOrderList.working}}</td>
                      <!-- 交易账户 -->
                      <td>{{conditionOrderList.trade_name}}</td>
                      <!-- 合约 -->
                      <td>{{conditionOrderList.contract}}</td>
                      <!-- 方向 -->
                      <td>{{conditionOrderList.direction}}</td>
                      <!-- 开平 -->
                      <td>{{conditionOrderList.mold}}</td>
                      <!-- 手数 -->
                      <td>{{conditionOrderList.number}}</td>
                      <!-- 下单价格 -->
                      <td>{{conditionOrderList.price}}</td>
                      <!-- 触发类型 -->
                      <td>{{conditionOrderList.trigger_type}}</td>
                      <!-- 时间条件 -->
                      <td>{{conditionOrderList.trigger_time}}</td>
                      <!-- 价格条件 -->
                      <td>{{conditionOrderList.trigger_price}}</td>
                      <!-- 回撤跳止损 -->
                      <td>{{conditionOrderList.back_loss}}</td>
                      <!-- 止损 -->
                      <td>{{conditionOrderList.loss}}</td>
                      <!-- 止盈 -->
                      <td>{{conditionOrderList.profit}}</td>
                      <!-- 市价止损 -->
                      <td>{{conditionOrderList.market_loss}}</td>
                      <!-- N秒后市价 -->
                      <td>{{conditionOrderList.time_seconds}}</td>
                      <!-- 添加时间 -->
                      <td>{{conditionOrderList.time}}</td>
                      <!-- 有效期 -->
                      <td>{{conditionOrderList.effective}}</td>
                      <!-- 完成时间 -->
                      <td>{{conditionOrderList.finish_time}}</td>
                      <!-- 完成原因 -->
                      <td>{{conditionOrderList.finish_type}}</td>
                      <!-- 报单错误 -->
                      <td>{{conditionOrderList.error_info}}</td>
                      <!-- 编号 -->
                      <td>{{conditionOrderList.order}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="tf_btm_cont_btn_btm">
                <div class="tf_btm_cont_btn_btm_l tf_btm_cont_btns_click">
                  <div @click="left5StateConditionBtnsFun(left5StateConditionBtn.id)" v-for="left5StateConditionBtn in left5StateConditionBtns" :key="left5StateConditionBtn.id">
                    <img src="../assets/img/orderState.png" :class="{state_btm_btn_clicked:left5StateConditionBtn.name == left5StateConditionBtnName}" alt="">
                    <span>{{left5StateConditionBtn.name}}</span>
                  </div>
                </div>
                <div class="tf_btm_cont_btn_btm_r">
                  <button
                    @click="left5ContBtmRightTop2RBtnsFun(left5ContBtmRightTop2RBtn.id)"
                    :class="left5ContBtmRightTop2RBtn.isClicked?'left5_cont_btm_right_top_btns_active':''"
                    v-for="left5ContBtmRightTop2RBtn in left5ContBtmRightTop2RBtns"
                    :key="left5ContBtmRightTop2RBtn.id"
                  >{{left5ContBtmRightTop2RBtn.name}}</button>
                </div>
              </div>
            </li>
            <!-- 条件单 end -->
            <!-- 止损单 -->
            <li v-show="0">
              <div class="tf_btm_cont_wrap">
                <table
                  class="tf_btm_cont_btn tf_btm_cont_btn2 tf_btm_cont_loss_order5"
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                >
                  <thead>
                    <tr>
                      <th
                        v-for="lossOrderTopList in lossOrderTopLists"
                        :key="lossOrderTopList.id"
                      >{{lossOrderTopList.name}}</th>
                    </tr>
                  </thead>
                  <tbody @click.right="tfLossRightFun()">
                    <tr
                      v-for="lossOrderList in lossOrderLists"
                      :key="lossOrderList.id"
                      :class="{tf_btm_cont_loss_order5_tr: lossOrderListMark == lossOrderList.mark}"
                      @click.left="tfLossOrderListsFun(lossOrderList.mark)"
                    >
                      <!-- 创建时间 -->
                      <td>{{lossOrderList.time}}</td>
                      <!-- 交易账户 -->
                      <td>{{lossOrderList.trade_name}}</td>
                      <!-- 合约 -->
                      <td>{{lossOrderList.contract}}</td>
                      <!-- 状态 -->
                      <td>{{lossOrderList.status_name}}</td>
                      <!-- 手数 -->
                      <td>{{lossOrderList.number}}</td>
                      <!-- 回撤跳止损 -->
                      <td>{{lossOrderList.back_loss}}</td>
                      <!-- 止损价 -->
                      <td>{{lossOrderList.loss}}</td>
                      <!-- 止盈价 -->
                      <td>{{lossOrderList.profit}}</td>
                      <!-- 持仓方向 -->
                      <td>{{lossOrderList.direction}}</td>
                      <!-- 市价止损 -->
                      <td>{{lossOrderList.market_loss}}</td>
                      <!-- N秒后市价 -->
                      <td>{{lossOrderList.time_seconds}}</td>
                      <!-- 有效期 -->
                      <td>{{lossOrderList.effective}}</td>
                      <!-- 最后修改时间 -->
                      <td>{{lossOrderList.modify_time}}</td>
                      <!-- 完成原因 -->
                      <td>{{lossOrderList.finish_type}}</td>
                      <!-- 完成时间 -->
                      <td>{{lossOrderList.finish_time}}</td>
                      <!-- 编号 -->
                      <td>{{lossOrderList.order}}</td>
                      <!-- 报单错误 -->
                      <td>{{lossOrderList.error_info}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="tf_btm_cont_btn_btm">
                <div class="tf_btm_cont_btn_btm_l tf_btm_cont_btns_click">
                  <div @click="left5StateBtmLossLeftBtnsFun(left5StateBtmLossLeftBtn.id)" v-for="left5StateBtmLossLeftBtn in left5StateBtmLossLeftBtns" :key="left5StateBtmLossLeftBtn.id">
                    <img src="../assets/img/orderState.png" :class="{state_btm_btn_clicked:left5StateBtmLossLeftBtn.name == left5StateBtmLossLeftBtnName}" alt="">
                    <span>{{left5StateBtmLossLeftBtn.name}}</span>
                  </div>
                </div>
                <div class="tf_btm_cont_btn_btm_r">
                  <button
                    @click="left5ContBtmRightTop1RBtnsFun(left5ContBtmRightTop1RBtn.id)"
                    :class="left5ContBtmRightTop1RBtn.isClicked?'left5_cont_btm_right_top_btns_active':''"
                    v-for="left5ContBtmRightTop1RBtn in left5ContBtmRightTop1RBtns"
                    :key="left5ContBtmRightTop1RBtn.id"
                  >{{left5ContBtmRightTop1RBtn.name}}</button>
                </div>
              </div>
            </li>
            <!-- 止损单 end -->
            <!-- 资金 -->
            <li v-show="tfRightBtns[4].isActive">
              <div class="tf_btm_cont_btn7_top">
                <div>
                  <span class="tf_btn7_top_span">选择需要查询的交易账号:</span>
                  <select class="tf_btn7_top_user" v-model="tfBtn7UserName">
                    <option>{{$store.state.userNumber}}</option>
                  </select>
                  <span class="tf_btn7_top_btn" @click="tfBtn7TopFun">请求查询</span>
                  <p class="tf_btn7_top_info">{{isShowTfBtn7?updateLast:'---'}}</p>
                </div>
                <p @click="tfBtn7ShowAlertFun" class="tf_btn7_top_online">出入金</p>
              </div>
              <ul class="tf_btn7_btm_alert" v-show="isShowTfBtn7">
                <li class="tf_btn7_btm_alert_li">
                  <p>---</p>
                  <p>港币</p>
                </li>
                <li class="tf_btn7_btm_alert_li">
                  <span>动态权益</span>
                  <span>{{userInfo.dynamic_interest}}</span>
                </li>
                <li class="tf_btn7_btm_alert_li">
                  <span>平仓盈亏</span>
                  <span>{{userInfo.close_profit}}</span>
                </li>
                <li class="tf_btn7_btm_alert_li">
                  <span>持仓盈亏</span>
                  <span>{{userInfo.open_profit}}</span>
                </li>
                <li class="tf_btn7_btm_alert_li">
                  <span>手续费</span>
                  <span>{{userInfo.fee_total}}</span>
                </li>
                <li class="tf_btn7_btm_alert_li">
                  <span>保证金</span>
                  <span>{{userInfo.bond}}</span>
                </li>
                <!-- <li class="tf_btn7_btm_alert_li">
                  <span>挂单保证金</span>
                  <span>{{userInfo.position_bond}}</span>
                </li>
                <li class="tf_btn7_btm_alert_li">
                  <span>挂单手续费</span>
                  <span>{{userInfo.position_fee}}</span>
                </li> -->
                <li class="tf_btn7_btm_alert_li">
                  <span>可用资金</span>
                  <span>{{userInfo.use_amount}}</span>
                </li>
                <li class="tf_btn7_btm_alert_li">
                  <span>资金占比</span>
                  <span>{{userInfo.amount_proportion}}%</span>
                </li>
                <!-- <li class="tf_btn7_btm_alert_li">
                  <span>昨结算</span>
                  <span>{{userInfo.yesterday}}</span>
                </li>
                <li class="tf_btn7_btm_alert_li">
                  <span>信用金</span>
                  <span>{{userInfo.credit_amount}}</span>
                </li> -->
                <li class="tf_btn7_btm_alert_li">
                  <span>出入金</span>
                  <span>{{userInfo.out_in}}</span>
                </li>
                <!-- <li class="tf_btn7_btm_alert_li">
                  <span>静态权益</span>
                  <span>{{userInfo.static_interest}}</span>
                </li> -->
              </ul>
            </li>
            <!-- 资金 end -->
            <!-- 查询 -->
            <li v-show="tfRightBtns[5].isActive">
              <ul class="tf_btm_cont_btn8_ul">
                <li class="tf_btm_cont_btn8_li" style="display: none">
                  <h4>基础数据查询</h4>
                  <p
                    @click="tfBtn8List1Fun(tfBtn8List1.id)"
                    :class="tfBtn8List1.isClicked?'tf_btm_cont_btn8_p_active':''"
                    v-for="tfBtn8List1 in tfBtmContBtn8List1"
                    :key="tfBtn8List1.id"
                  >{{tfBtn8List1.name}}</p>
                </li>
                <li class="tf_btm_cont_btn8_li">
                  <h4>历史数据查询</h4>
                  <p
                    @click="tfBtn8List2Fun(tfBtn8List2.id)"
                    :class="tfBtn8List2.isClicked?'tf_btm_cont_btn8_p_active':''"
                    v-for="tfBtn8List2 in tfBtmContBtn8List2"
                    :key="tfBtn8List2.id"
                  >{{tfBtn8List2.name}}</p>
                  <span>不包含当日交易数据</span>
                </li>
                <li class="tf_btm_cont_btn8_li">
                  <h4>其他查询记录</h4>
                  <p
                    @click="tfBtn8List3Fun(tfBtn8List3.id)"
                    :class="tfBtn8List3.isClicked?'tf_btm_cont_btn8_p_active':''"
                    v-for="tfBtn8List3 in tfBtmContBtn8List3"
                    :key="tfBtn8List3.id"
                  >{{tfBtn8List3.name}}</p>
                </li>
              </ul>
            </li>
            <!-- 查询 end -->
          </ul>
        </div>
        <div class="tf_btm_l" v-show="tfBtmWrapShow">
          <ul class="tf_btm_l_ul">
            <!-- 三键下单 -->
            <li class="tf_btm_l_li" v-if="tfBtmLThreeOrder">
              <div class="tf_more_alert_r_top">
                <span>合约</span>
                <select v-model="tfBtmThreeOrderSelect" @change="tfBtmThreeOrderSelectFun(tfBtmThreeOrderSelect)">
                  <option v-for="tfBtmThreeOrderOption in tfBtmThreeOrderOptions" :disabled="tfBtmThreeOrderOption.current_price == '--'" :key="tfBtmThreeOrderOption.id">{{tfBtmThreeOrderOption.contract_name}}</option>
                </select>
              </div>
              <div class="tf_more_alert_r_btns">
                <span
                  @click="tfOrderPriceBtnsFun(tfOrderPriceList.id)"
                  :class="tfOrderPriceList.isClicked?'tf_more_alert_r_btns_active':''"
                  v-for="tfOrderPriceList in tfOrderPriceLists"
                  :key="tfOrderPriceList.id"
                >{{tfOrderPriceList.name}}</span>
              </div>
              <div class="tf_more_alert_r_ipts">
                <div>
                  <span>价格</span>
                  <input v-model="tfOrderPriceIpt" type="text">
                  <img @click="tfOrderPriceSubFun" src="../assets/img/sub.png" alt>
                  <img @click="tfOrderPriceAddFun" src="../assets/img/add.png" alt>
                </div>
                <div>
                  <span>手数</span>
                  <input v-model="tfOrderNumberIpt" type="number">
                  <img @click="tfOrderNumberSubFun" src="../assets/img/sub.png" alt>
                  <img @click="tfOrderNumberAddFun" src="../assets/img/add.png" alt>
                </div>
              </div>
              <div class="tf_btm_l_li_three_havenum">
                <span>持多仓：</span>
                <strong>{{tfOrderDepot.multiple_depot}}</strong>
                <span>持空仓：</span>
                <strong>{{tfOrderDepot.empty_depot}}</strong>
              </div>
              <div class="tf_btm_l_li_three_btns">
                <button @click="tfThreeOrderBuySellPingFun(1)" :disabled="disabled">
                  <p>{{tfOrderOneBuyPrice}}</p>
                  <h4>买入</h4>
                </button>
                <button @click="tfThreeOrderBuySellPingFun(2)" :disabled="disabled">
                  <p>{{tfOrderOneSellPrice}}</p>
                  <h4>卖出</h4>
                </button>
                <button @click="tfThreeOrderBuySellPingFun(3)" :disabled="disabled">
                  <span>平仓</span>
                </button>
              </div>
              <div class="tf_btm_l_li_three_btm_span">
                <!-- <span>撤单</span>
                <span>排队跟</span>
                <span>最新跟</span>
                <span>对价跟</span> -->
              </div>
            </li>
            <!-- 三键下单 end -->
            <!-- 六键下单 -->
            <li class="tf_btm_l_li" v-if="tfBtmLSixOrder">
              <div class="tf_more_alert_r_top">
                <span>合约</span>
                <select v-model="tfBtmThreeOrderSelect" @change="tfBtmThreeOrderSelectFun(tfBtmThreeOrderSelect)">
                  <option v-for="tfBtmThreeOrderOption in tfBtmThreeOrderOptions" :disabled="tfBtmThreeOrderOption.current_price == '--'" :key="tfBtmThreeOrderOption.id">{{tfBtmThreeOrderOption.contract_name}}</option>
                </select>
              </div>
              <div class="tf_more_alert_r_btns">
                <span
                  @click="tfOrderPriceBtnsFun(tfOrderPriceList.id)"
                  :class="tfOrderPriceList.isClicked?'tf_more_alert_r_btns_active':''"
                  v-for="tfOrderPriceList in tfOrderPriceLists"
                  :key="tfOrderPriceList.id"
                >{{tfOrderPriceList.name}}</span>
              </div>
              <div class="tf_more_alert_r_ipts">
                <div>
                  <span>价格</span>
                  <input v-model="tfOrderPriceIpt" type="text">
                  <img @click="tfOrderPriceSubFun" src="../assets/img/sub.png" alt>
                  <img @click="tfOrderPriceAddFun" src="../assets/img/add.png" alt>
                </div>
                <div>
                  <span>手数</span>
                  <input v-model="tfOrderNumberIpt" type="number">
                  <img @click="tfOrderNumberSubFun" src="../assets/img/sub.png" alt>
                  <img @click="tfOrderNumberAddFun" src="../assets/img/add.png" alt>
                </div>
              </div>
              <div class="tf_btm_l_li_six_btns">
                <div>
                  <button @click="tfSixOrderBtnsFun(1)" :disabled="disabled">
                    <p>{{tfOrderOneBuyPrice}}</p>
                    <h4>买入</h4>
                  </button>
                  <button @click="tfSixOrderBtnsFun(2)" :disabled="disabled">
                    <span>全撤</span>
                  </button>
                  <button @click="tfSixOrderBtnsFun(3)" :disabled="disabled">
                    <p>{{tfOrderOneSellPrice}}</p>
                    <h4>卖出</h4>
                  </button>
                </div>
                <div>
                  <button @click="tfSixOrderBtnsFun(4)" :disabled="disabled">
                    <p>{{tfOrderOneSellPrice}}</p>
                    <h4>平买</h4>
                  </button>
                  <button @click="tfSixOrderBtnsFun(5)" :disabled="disabled">
                    <p>市价</p>
                    <h4>清仓</h4>
                  </button>
                  <button @click="tfSixOrderBtnsFun(6)" :disabled="disabled">
                    <p>{{tfOrderOneBuyPrice}}</p>
                    <h4>平卖</h4>
                  </button>
                </div>
              </div>
            </li>
            <!-- 六键下单 end -->
            <!-- 传统下单 -->
            <li class="tf_btm_l_li" v-if="tfBtmLTraditionOrder">
              <div class="tf_more_alert_r_top">
                <span>合约</span>
                <select v-model="tfBtmThreeOrderSelect" @change="tfBtmThreeOrderSelectFun(tfBtmThreeOrderSelect)">
                  <option v-for="tfBtmThreeOrderOption in tfBtmThreeOrderOptions" :disabled="tfBtmThreeOrderOption.current_price == '--'" :key="tfBtmThreeOrderOption.id">{{tfBtmThreeOrderOption.contract_name}}</option>
                </select>
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
              <div class="tf_btm_l_li_tradition_price">
                <span
                  @click="tfOrderPriceBtnsFun(tfOrderPriceList.id)"
                  :class="tfOrderPriceList.isClicked?'tf_btm_l_li_tradition_price_active':''"
                  v-for="tfOrderPriceList in tfOrderPriceLists"
                  :key="tfOrderPriceList.id"
                >{{tfOrderPriceList.name}}</span>
              </div>
              <div class="tf_btm_l_li_tradition_info">
                <div @click="tfFourOrderStartFun">{{tfFourOrderBuySell}} {{tfFourOrderOpenPing}}</div>
                <div>
                  <p>美元/盎司 乘数（50）</p>
                  <p>保证金:400USD</p>
                </div>
              </div>
              <div class="tf_more_alert_r_ipts">
                <div>
                  <span>价格</span>
                  <input v-model="tfOrderPriceIpt" type="text">
                  <img @click="tfOrderPriceSubFun" src="../assets/img/sub.png" alt>
                  <img @click="tfOrderPriceAddFun" src="../assets/img/add.png" alt>
                </div>
                <div>
                  <span>手数</span>
                  <input v-model="tfOrderNumberIpt" type="number">
                  <img @click="tfOrderNumberSubFun" src="../assets/img/sub.png" alt>
                  <img @click="tfOrderNumberAddFun" src="../assets/img/add.png" alt>
                </div>
              </div>
            </li>
            <!-- 传统下单 end -->
          </ul>
        </div>
      </div>
    </div>
    <!-- 右键菜单弹窗 -->
    <div
      v-clickoutside="handleCloseMenu"
      class="tf_right_menu"
      :class="isShowClickTfMenu?'tf_right_menu_fixed':''"
      v-show="isShowTfRightMenu"
      v-bind:style="{ top: activeTopMenu + 'px', left: activeLeftMenu + 'px' }"
    >
      <ul class="tf_right_menu_ul">
        <li
          class="tf_right_menu_li"
          @click="tfRightMenuFun(tfRightMenuBtn.id)"
          v-for="tfRightMenuBtn in tfRightMenuBtns"
          :key="tfRightMenuBtn.id"
        >
          <img src="../assets/img/stateClicked.png" v-show="tfRightMenuBtn.isClicked">
          <p :class="tfRightMenuBtn.isClicked?'':'tf_right_menu_li_margin'">{{tfRightMenuBtn.name}}</p>
        </li>
      </ul>
    </div>
    <!-- 右键菜单弹窗 end -->
    <!-- 右键 持仓 弹窗 -->
    <div
      v-clickoutside="handleCloseDepot"
      class="tf_right_fixed"
      v-show="isShowRightDepot"
      v-bind:style="{ top: activeTopDepot + 'px', left: activeLeftDepot + 'px' }"
    >
      <ul class="tf_right_menu_ul">
        <li
          class="tf_right_menu_li"
          @click="rightDepotFun(rightDepotBtn.id)"
          v-for="rightDepotBtn in rightDepotBtns"
          :key="rightDepotBtn.id"
        >
          <p>{{rightDepotBtn.name}}</p>
        </li>
      </ul>
    </div>
    <!-- 右键 持仓 弹窗 end -->
    <!-- 右键 委托 弹窗 -->
    <div
      v-clickoutside="handleCloseEntrust"
      class="tf_right_fixed"
      v-show="isShowRightEntrust"
      v-bind:style="{ top: activeTopEntrust + 'px', left: activeLeftEntrust + 'px' }"
    >
      <ul class="tf_right_menu_ul">
        <li
          class="tf_right_menu_li"
          @click="rightEntrustFun(rightEntrustBtn.id)"
          v-for="rightEntrustBtn in rightEntrustBtns"
          :key="rightEntrustBtn.id"
        >
          <p>{{rightEntrustBtn.name}}</p>
        </li>
      </ul>
    </div>
    <!-- 右键 委托 弹窗 end -->
    <!-- 右键 预埋 弹窗 -->
    <div
      v-clickoutside="handleClosePrepaid"
      class="tf_right_fixed"
      v-show="isShowRightPrepaid"
      v-bind:style="{ top: activeTopPrepaid + 'px', left: activeLeftPrepaid + 'px' }"
    >
      <ul class="tf_right_menu_ul">
        <li
          class="tf_right_menu_li"
          @click="rightPrepaidFun(rightPrepaidBtn.id)"
          v-for="rightPrepaidBtn in rightPrepaidBtns"
          :key="rightPrepaidBtn.id"
        >
          <p>{{rightPrepaidBtn.name}}</p>
        </li>
      </ul>
    </div>
    <!-- 右键 预埋 弹窗 end -->
    <!-- 右键 条件 弹窗 -->
    <div
      v-clickoutside="handleCloseCondition"
      class="tf_right_fixed"
      v-show="isShowRightCondition"
      v-bind:style="{ top: activeTopCondition + 'px', left: activeLeftCondition + 'px' }"
    >
      <ul class="tf_right_menu_ul">
        <li
          class="tf_right_menu_li"
          @click="rightConditionFun(rightConditionBtn.id)"
          v-for="rightConditionBtn in rightConditionBtns"
          :key="rightConditionBtn.id"
        >
          <p>{{rightConditionBtn.name}}</p>
        </li>
      </ul>
    </div>
    <!-- 右键 条件 弹窗 end -->
    <!-- 右键 条件 弹窗 -->
    <div
      v-clickoutside="handleCloseLoss"
      class="tf_right_fixed"
      v-show="isShowRightLoss"
      v-bind:style="{ top: activeTopLoss + 'px', left: activeLeftLoss + 'px' }"
    >
      <ul class="tf_right_menu_ul">
        <li
          class="tf_right_menu_li"
          @click="rightLossFun(rightLossBtn.id)"
          v-for="rightLossBtn in rightLossBtns"
          :key="rightLossBtn.id"
        >
          <p>{{rightLossBtn.name}}</p>
        </li>
      </ul>
    </div>
    <!-- 右键 条件 弹窗 end -->
    <!-- 持仓 持仓右键平仓弹窗 -->
    <depot-num-close :msg="msgDepotClose" @tfChangeDepotCloseStateFun="tfDepotCloseStateFun" :stateShow="isTfDepotClosePriceAlert" v-if="isTfDepotClosePriceAlert"></depot-num-close>
    <!-- 持仓 持仓右键平仓弹窗 end -->
    <!-- 持仓 止盈止损弹窗 -->
    <depot-num-set :msg="msgDepot" @tfChangeDepotStateFun="tfDepotChangeStateFun" :stateShow="isTfDepotPriceAlert" v-if="isTfDepotPriceAlert"></depot-num-set>
    <!-- 持仓 止盈止损弹窗 end -->
    <!-- 委托 改价弹窗 -->
    <info-change-price-alert :msg="msgInfo" @tfChangeStateFun="tfEntrustChangeStateFun" :stateShow="isTfEntrustPriceAlert" v-if="isTfEntrustPriceAlert"></info-change-price-alert>
    <!-- 委托 改价弹窗 end -->
    <!-- 在线出金入金弹窗 -->
    <sys-online-money v-if="$store.state.isSysOnlineMoney"></sys-online-money>
    <!-- 在线出金入金弹窗 end -->
    <!-- 查询 弹窗1 允许交易的合约 -->
    <div class="tf_btn8_alert_wrap" v-show="tfBtmContBtn8List1[0].isShowAlert">
      <div class="tf_btn8_list1_alert1">
        <div class="tf_btn8_list_alert_top">
          <h4>允许交易的合约</h4>
          <img
            src="../assets/img/closeBgGary.png"
            @click="tfBtn8AlertList1CloseFun(tfBtmContBtn8List1[0].id)"
            title="关闭"
          >
        </div>
        <div class="tf_btn8_list_alert_cont">
          <div class="tf_btm_cont_wrap tf_btn8_list1_alert1_wrap">
            <table
              class="tf_btm_cont_btn tf_btn8_list1_alert1_table"
              border="0"
              cellspacing="0"
              cellpadding="0"
            >
              <thead>
                <tr>
                  <th
                    v-for="tfBtn8List1Alert1Thead in tfBtn8List1Alert1Theads"
                    :key="tfBtn8List1Alert1Thead.id"
                  >{{tfBtn8List1Alert1Thead.name}}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="tfBtmContBtn8Cont1List in tfBtmContBtn8Cont1Lists"
                  :key="tfBtmContBtn8Cont1List.id"
                >
                  <!-- 合约代码 -->
                  <td>{{tfBtmContBtn8Cont1List.contract_code}}</td>
                  <!-- 合约名 -->
                  <td>{{tfBtmContBtn8Cont1List.contract_name}}</td>
                  <!-- 报价单位 -->
                  <td>{{tfBtmContBtn8Cont1List.contract_unit}}</td>
                  <!-- 每笔手数 -->
                  <td>{{tfBtmContBtn8Cont1List.future_value}}</td>
                  <!-- 小数位 -->
                  <td>{{tfBtmContBtn8Cont1List.future_price}}</td>
                  <!-- 报价货币 -->
                  <td>{{tfBtmContBtn8Cont1List.currency}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="tf_btn8_list1_alert1_btm">
            <p class="tf_btn8_list1_alert1_p">N: {{tfBtmContBtn8Cont1Num}}</p>
            <button
              @click="tfBtn8AlertList1CloseFun(tfBtmContBtn8List1[0].id)"
              class="tf_btn8_list1_alert1_cancel"
            >取消</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 查询 弹窗1 允许交易的合约 end -->
    <!-- 查询 弹窗2 大单边保证金品种 -->
    <div class="tf_btn8_alert_wrap" v-show="tfBtmContBtn8List1[1].isShowAlert">
      <div class="tf_btn8_list1_alert1">
        <div class="tf_btn8_list_alert_top">
          <h4>大单边保证金品种</h4>
          <img
            src="../assets/img/closeBgGary.png"
            @click="tfBtn8AlertList1CloseFun(tfBtmContBtn8List1[1].id)"
            title="关闭"
          >
        </div>
        <div class="tf_btn8_list_alert_cont">
          <div class="tf_btm_cont_wrap tf_btn8_list1_alert1_wrap">
            <table
              class="tf_btm_cont_btn tf_btn8_list1_alert1_table tf_btn8_list1_alert2_table"
              border="0"
              cellspacing="0"
              cellpadding="0"
            >
              <thead>
                <tr>
                  <th
                    v-for="tfBtn8List1Alert2Thead in tfBtn8List1Alert2Theads"
                    :key="tfBtn8List1Alert2Thead.id"
                  >{{tfBtn8List1Alert2Thead.name}}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="tfBtmContBtn8Cont2List in tfBtmContBtn8Cont2Lists"
                  :key="tfBtmContBtn8Cont2List.id"
                >
                  <td>{{tfBtmContBtn8Cont2List.futures_code}}</td>
                  <td>{{tfBtmContBtn8Cont2List.futures_name}}</td>
                  <td>
                    <img src="../assets/img/stateClicked.png" alt>
                  </td>
                  <td>{{tfBtmContBtn8Cont2List.currency}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="tf_btn8_list1_alert1_btm">
            <p class="tf_btn8_list1_alert1_p">N: {{tfBtmContBtn8Cont2Num}}</p>
            <button
              @click="tfBtn8AlertList1CloseFun(tfBtmContBtn8List1[1].id)"
              class="tf_btn8_list1_alert1_cancel"
            >取消</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 查询 弹窗2 大单边保证金品种 end -->
    <!-- 查询 弹窗3 历史日结算报表 -->
    <div class="tf_btn8_alert_wrap" style="display:none">
      <div class="tf_btn8_list1_alert1">
        <div class="tf_btn8_list_alert_top">
          <h4>结算单查询</h4>
          <!-- <img
            src="../assets/img/closeBgGary.png"
            @click="tfBtn8AlertList2CloseFun(tfBtmContBtn8List2[0].id)"
            title="关闭"
          > -->
        </div>
        <div class="tf_btn8_list_alert_cont">
          <div class="tf_btn8_list_alert_date">
            <div>
              <span>起始交易日</span>
              <div>
                <vue-datepicker-local v-model="tfBtn8Cont3StartTime"></vue-datepicker-local>
              </div>
            </div>
            <div>
              <span>到交易日</span>
              <div>
                <vue-datepicker-local v-model="tfBtn8Cont3EndTime"></vue-datepicker-local>
              </div>
            </div>
            <span @click="tfBtn8HisCont3Fun">查询</span>
          </div>
          <div class="tf_btn8_list2_alert1_btns">
            <span
              @click="tfBtn8List2Alert1rFun"
              :class="tfBtn8List2Alert1r?'tf_btn8_list2_alert1_btns_active':''"
            >表格记录</span>
            <span
              @click="tfBtn8List2Alert1lFun"
              :class="tfBtn8List2Alert1l?'tf_btn8_list2_alert1_btns_active':''"
            >曲线图</span>
          </div>
          <div class="tf_btn8_list2_alert1_btns_rcont" v-show="tfBtn8List2Alert1r">
            <div class="tf_btm_cont_wrap tf_btn8_list1_alert1_wrap">
              <table
                class="tf_btm_cont_btn tf_btn8_list1_alert1_table tf_btn8_list2_alert1_table"
                border="0"
                cellspacing="0"
                cellpadding="0"
              >
                <thead>
                  <tr>
                    <th
                      v-for="tfBtn8List2Alert1Thead in tfBtn8List2Alert1Theads"
                      :key="tfBtn8List2Alert1Thead.id"
                    >{{tfBtn8List2Alert1Thead.name}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="tfBtmContBtn8Cont3List in tfBtmContBtn8Cont3Lists"
                    :key="tfBtmContBtn8Cont3List.id"
                  >
                    <!-- 交易账号 -->
                    <td>{{tfBtmContBtn8Cont3List.trade_name}}</td>
                    <!-- 结算日期 -->
                    <td>{{tfBtmContBtn8Cont3List.time}}</td>
                    <!-- 昨结算 -->
                    <td>{{tfBtmContBtn8Cont3List.yesterday}}</td>
                    <!-- 平仓盈亏 -->
                    <td>{{tfBtmContBtn8Cont3List.profit_total}}</td>
                    <!-- 持仓盈亏 -->
                    <td>{{tfBtmContBtn8Cont3List.depot_total}}</td>
                    <!-- 手续费 -->
                    <td>{{tfBtmContBtn8Cont3List.fee_total}}</td>
                    <!-- 动态权益 -->
                    <td>{{tfBtmContBtn8Cont3List.dynamic_interest}}</td>
                    <!-- 保证金 -->
                    <td>{{tfBtmContBtn8Cont3List.bond}}</td>
                    <!-- 出金 -->
                    <td>{{tfBtmContBtn8Cont3List.withdraw}}</td>
                    <!-- 入金 -->
                    <td>{{tfBtmContBtn8Cont3List.recharge}}</td>
                    <!-- 信用金 -->
                    <td>{{tfBtmContBtn8Cont3List.credit_amount}}</td>
                    <!-- 静态权益 -->
                    <td>{{tfBtmContBtn8Cont3List.static_interest}}</td>
                    <!-- 冻结保证金 -->
                    <td>{{tfBtmContBtn8Cont3List.frozen_bond}}</td>
                    <!-- 冻结手续费 -->
                    <td>{{tfBtmContBtn8Cont3List.frozen_fee}}</td>
                    <!-- 币种 -->
                    <td>{{tfBtmContBtn8Cont3List.currency}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="tf_btn8_list2_alert1_btns_lcont" v-show="tfBtn8List2Alert1l">曲线图</div>

          <div class="tf_btn8_list1_alert1_btm">
            <!-- <button
              @click="tfBtn8AlertList2CloseFun(tfBtmContBtn8List2[0].id)"
              class="tf_btn8_list1_alert1_cancel tf_btn8_list2_alert1_cancel"
            >取消</button> -->
          </div>
        </div>
      </div>
    </div>
    <!-- 查询 弹窗3 历史日结算报表 end -->
    <!-- 查询 弹窗4 历史成交记录 -->
    <div class="tf_btn8_alert_wrap" v-show="tfBtmContBtn8List2[0].isShowAlert">
      <div class="tf_btn8_list1_alert1">
        <div class="tf_btn8_list_alert_top">
          <h4>历史成交记录</h4>
          <img
            src="../assets/img/closeBgGary.png"
            @click="tfBtn8AlertList2CloseFun(tfBtmContBtn8List2[0].id)"
            title="关闭"
          >
        </div>
        <div class="tf_btn8_list_alert_cont">
          <div class="tf_btn8_list_alert_date">
            <div>
              <span>起始交易日</span>
              <div>
                <vue-datepicker-local v-model="tfBtn8Cont4StartTime"></vue-datepicker-local>
              </div>
            </div>
            <div>
              <span>到交易日</span>
              <div>
                <vue-datepicker-local v-model="tfBtn8Cont4EndTime"></vue-datepicker-local>
              </div>
            </div>
            <span @click="tfBtn8HisCont4Fun">查询</span>
          </div>
          <div class="tf_btm_cont_wrap tf_btn8_list_alert_wrap">
            <table
              class="tf_btm_cont_btn tf_btn8_list1_alert1_table tf_btn8_list_alert_table"
              border="0"
              cellspacing="0"
              cellpadding="0"
            >
              <thead>
                <tr>
                  <th
                    v-for="tfBtn8List2Alert2Thead in tfBtn8List2Alert2Theads"
                    :key="tfBtn8List2Alert2Thead.id"
                  >{{tfBtn8List2Alert2Thead.name}}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="tfBtmContBtn8Cont4List in tfBtmContBtn8Cont4Lists"
                  :key="tfBtmContBtn8Cont4List.id"
                >
                  <!-- 成交编号 -->
                  <td>{{tfBtmContBtn8Cont4List.order}}</td>
                  <!-- 交易账号 -->
                  <td>{{tfBtmContBtn8Cont4List.trade_name}}</td>
                  <!-- 合约 -->
                  <td>{{tfBtmContBtn8Cont4List.contract}}</td>
                  <!-- 手数 -->
                  <td>{{tfBtmContBtn8Cont4List.number}}</td>
                  <!-- 价格 -->
                  <td>{{tfBtmContBtn8Cont4List.deal_price}}</td>
                  <!-- 方向 -->
                  <td>{{tfBtmContBtn8Cont4List.direction}}</td>
                  <!-- 开平 -->
                  <td>{{tfBtmContBtn8Cont4List.mold}}</td>
                  <!-- 报单引用 -->
                  <td></td>
                  <!-- 委托号 -->
                  <td>{{tfBtmContBtn8Cont4List.entrust_order}}</td>
                  <!-- 成交时间 -->
                  <td>{{tfBtmContBtn8Cont4List.finish_time}}</td>
                  <!-- 交易日 -->
                  <td>{{tfBtmContBtn8Cont4List.time}}</td>
                  <!-- 委托来源 -->
                  <td>{{tfBtmContBtn8Cont4List.source}}</td>
                  <!-- 手续费 -->
                  <td>{{tfBtmContBtn8Cont4List.fee_total}}</td>
                  <!-- 平仓盈亏 -->
                  <td>{{tfBtmContBtn8Cont4List.profit_loss}}</td>
                  <!-- 币种 -->
                  <td>{{tfBtmContBtn8Cont4List.currency}}</td>
                  <!-- 用户属性 -->
                  <td>{{tfBtmContBtn8Cont4List.user}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="tf_btn8_list1_alert1_btm">
            <button
              @click="tfBtn8AlertList2CloseFun(tfBtmContBtn8List2[0].id)"
              class="tf_btn8_list1_alert1_cancel tf_btn8_list_alert_cancel"
            >取消</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 查询 弹窗4 历史成交记录 end -->
    <!-- 查询 弹窗5 历史委托记录 -->
    <div class="tf_btn8_alert_wrap" v-show="tfBtmContBtn8List2[1].isShowAlert">
      <div class="tf_btn8_list1_alert1">
        <div class="tf_btn8_list_alert_top">
          <h4>历史委托记录</h4>
          <img
            src="../assets/img/closeBgGary.png"
            @click="tfBtn8AlertList2CloseFun(tfBtmContBtn8List2[1].id)"
            title="关闭"
          >
        </div>
        <div class="tf_btn8_list_alert_cont">
          <div class="tf_btn8_list_alert_date">
            <div>
              <span>起始交易日</span>
              <div>
                <vue-datepicker-local v-model="tfBtn8Cont5StartTime"></vue-datepicker-local>
              </div>
            </div>
            <div>
              <span>到交易日</span>
              <div>
                <vue-datepicker-local v-model="tfBtn8Cont5EndTime"></vue-datepicker-local>
              </div>
            </div>
            <span @click="tfBtn8HisCont5Fun">查询</span>
          </div>
          <div class="tf_btm_cont_wrap tf_btn8_list_alert_wrap">
            <table
              class="tf_btm_cont_btn tf_btn8_list1_alert1_table tf_btn8_list_alert_table5"
              border="0"
              cellspacing="0"
              cellpadding="0"
            >
              <thead>
                <tr>
                  <th
                    v-for="tfBtn8List2Alert3Thead in tfBtn8List2Alert3Theads"
                    :key="tfBtn8List2Alert3Thead.id"
                  >{{tfBtn8List2Alert3Thead.name}}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="tfBtmContBtn8Cont5List in tfBtmContBtn8Cont5Lists"
                  :key="tfBtmContBtn8Cont5List.id"
                >
                  <!-- 交易账号 -->
                  <td>{{tfBtmContBtn8Cont5List.trade_name}}</td>
                  <!-- 合约 -->
                  <td>{{tfBtmContBtn8Cont5List.contract}}</td>
                  <!-- 委托量 -->
                  <td>{{tfBtmContBtn8Cont5List.number}}</td>
                  <!-- 委托价 -->
                  <td>{{tfBtmContBtn8Cont5List.entrust_price}}</td>
                  <!-- 买卖 -->
                  <td>{{tfBtmContBtn8Cont5List.direction}}</td>
                  <!-- 开平 -->
                  <td>{{tfBtmContBtn8Cont5List.mold}}</td>
                  <!-- 系统号 -->
                  <td>{{tfBtmContBtn8Cont5List.system}}</td>
                  <!-- 委托号 -->
                  <td>{{tfBtmContBtn8Cont5List.entrust_order}}</td>
                  <!-- 可撤 -->
                  <td>{{tfBtmContBtn8Cont5List.surplus}}</td>
                  <!-- 已成交 -->
                  <td>{{tfBtmContBtn8Cont5List.deal}}</td>
                  <!-- 委托时间 -->
                  <td>{{tfBtmContBtn8Cont5List.time}}</td>
                  <!-- 受理时间 -->
                  <td>{{tfBtmContBtn8Cont5List.acceptance_time}}</td>
                  <!-- 撤单时间 -->
                  <td>{{tfBtmContBtn8Cont5List.cancel_time}}</td>
                  <!-- 状态 -->
                  <td>{{tfBtmContBtn8Cont5List.status}}</td>
                  <!-- 详细状态 -->
                  <td>{{tfBtmContBtn8Cont5List.detail_status}}</td>
                  <!-- 委托来源 -->
                  <td>{{tfBtmContBtn8Cont5List.source}}</td>
                  <!-- 下单会话ID -->
                  <td>{{tfBtmContBtn8Cont5List.order_id}}</td>
                  <!-- 终端信息 -->
                  <!-- <td></td> -->
                  <!-- 币种 -->
                  <td>{{tfBtmContBtn8Cont5List.currency}}</td>
                  <!-- 用户字段 -->
                  <td>{{tfBtmContBtn8Cont5List.user}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="tf_btn8_list1_alert1_btm">
            <button
              @click="tfBtn8AlertList2CloseFun(tfBtmContBtn8List2[1].id)"
              class="tf_btn8_list1_alert1_cancel tf_btn8_list_alert_cancel"
            >取消</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 查询 弹窗5 历史委托记录 end -->
    <!-- 查询 弹窗6 历史出金流水 -->
    <div class="tf_btn8_alert_wrap" v-show="tfBtmContBtn8List3[0].isShowAlert">
      <div class="tf_btn8_list1_alert1">
        <div class="tf_btn8_list_alert_top">
          <h4>历史出金流水</h4>
          <img
            src="../assets/img/closeBgGary.png"
            @click="tfBtn8AlertList3CloseFun(tfBtmContBtn8List3[0].id)"
            title="关闭"
          >
        </div>
        <div class="tf_btn8_list_alert_cont">
          <div class="tf_btn8_list_alert_date">
            <div>
              <span>起始交易日</span>
              <div>
                <vue-datepicker-local v-model="tfBtn8Cont6StartTime"></vue-datepicker-local>
              </div>
            </div>
            <div>
              <span>到交易日</span>
              <div>
                <vue-datepicker-local v-model="tfBtn8Cont6EndTime"></vue-datepicker-local>
              </div>
            </div>
            <span @click="tfBtn8HisCont6Fun">查询</span>
          </div>
          <div class="tf_btm_cont_wrap tf_btn8_list_alert_wrap">
            <table
              class="tf_btm_cont_btn tf_btn8_list1_alert1_table tf_btn8_list_alert_table7"
              border="0"
              cellspacing="0"
              cellpadding="0"
            >
              <thead>
                <tr>
                  <th
                    v-for="tfBtn8List3Alert1Thead in tfBtn8List3Alert1Theads"
                    :key="tfBtn8List3Alert1Thead.id"
                  >{{tfBtn8List3Alert1Thead.name}}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="tfBtmContBtn8Cont6List in tfBtmContBtn8Cont6Lists"
                  :key="tfBtmContBtn8Cont6List.id"
                >
                  <!-- 交易账号 -->
                  <td>{{tfBtmContBtn8Cont6List.username}}</td>
                  <!-- 币种 -->
                  <td>{{tfBtmContBtn8Cont6List.currency}}</td>
                  <!-- 金额 -->
                  <td>{{tfBtmContBtn8Cont6List.number}}</td>
                  <!-- 资金类型 -->
                  <td>{{tfBtmContBtn8Cont6List.type}}</td>
                  <!-- 方向 -->
                  <td>{{tfBtmContBtn8Cont6List.direction}}</td>
                  <!-- 操作时间 -->
                  <td>{{tfBtmContBtn8Cont6List.time}}</td>
                  <!-- 处理进展 -->
                  <td>{{tfBtmContBtn8Cont6List.status}}</td>
                  <!-- 完成时间 -->
                  <td>{{tfBtmContBtn8Cont6List.pay_time}}</td>
                  <!-- 备注 -->
                  <td>{{tfBtmContBtn8Cont6List.remark}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="tf_btn8_list1_alert1_btm">
            <button
              @click="tfBtn8AlertList3CloseFun(tfBtmContBtn8List3[0].id)"
              class="tf_btn8_list1_alert1_cancel tf_btn8_list_alert_cancel"
            >取消</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 查询 弹窗6 历史出金流水 end -->
    <!-- 查询 弹窗7 历史出入金流水 -->
    <div class="tf_btn8_alert_wrap" v-show="tfBtmContBtn8List3[1].isShowAlert">
      <div class="tf_btn8_list1_alert1">
        <div class="tf_btn8_list_alert_top">
          <h4>历史入金流水</h4>
          <img
            src="../assets/img/closeBgGary.png"
            @click="tfBtn8AlertList3CloseFun(tfBtmContBtn8List3[1].id)"
            title="关闭"
          >
        </div>
        <div class="tf_btn8_list_alert_cont">
          <div class="tf_btn8_list_alert_date">
            <div>
              <span>起始交易日</span>
              <div>
                <vue-datepicker-local v-model="tfBtn8Cont7StartTime"></vue-datepicker-local>
              </div>
            </div>
            <div>
              <span>到交易日</span>
              <div>
                <vue-datepicker-local v-model="tfBtn8Cont7EndTime"></vue-datepicker-local>
              </div>
            </div>
            <span @click="tfBtn8HisCont7Fun">查询</span>
          </div>
          <div class="tf_btm_cont_wrap tf_btn8_list_alert_wrap">
            <table
              class="tf_btm_cont_btn tf_btn8_list1_alert1_table tf_btn8_list_alert_table7"
              border="0"
              cellspacing="0"
              cellpadding="0"
            >
              <thead>
                <tr>
                  <th
                    v-for="tfBtn8List3Alert1Thead in tfBtn8List3Alert1Theads"
                    :key="tfBtn8List3Alert1Thead.id"
                  >{{tfBtn8List3Alert1Thead.name}}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="tfBtmContBtn8Cont7List in tfBtmContBtn8Cont7Lists"
                  :key="tfBtmContBtn8Cont7List.id"
                >
                  <!-- 交易账号 -->
                  <td>{{tfBtmContBtn8Cont7List.username}}</td>
                  <!-- 币种 -->
                  <td>{{tfBtmContBtn8Cont7List.currency}}</td>
                  <!-- 金额 -->
                  <td>{{tfBtmContBtn8Cont7List.number}}</td>
                  <!-- 资金类型 -->
                  <td>{{tfBtmContBtn8Cont7List.type}}</td>
                  <!-- 方向 -->
                  <td>{{tfBtmContBtn8Cont7List.direction}}</td>
                  <!-- 操作时间 -->
                  <td>{{tfBtmContBtn8Cont7List.time}}</td>
                  <!-- 处理进展 -->
                  <td>{{tfBtmContBtn8Cont7List.status}}</td>
                  <!-- 完成时间 -->
                  <td>{{tfBtmContBtn8Cont7List.pay_time}}</td>
                  <!-- 备注 -->
                  <td>{{tfBtmContBtn8Cont7List.remark}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="tf_btn8_list1_alert1_btm">
            <button
              @click="tfBtn8AlertList3CloseFun(tfBtmContBtn8List3[1].id)"
              class="tf_btn8_list1_alert1_cancel tf_btn8_list_alert_cancel"
            >取消</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 查询 弹窗7 历史入金流水 end -->
    <!-- 更改密码 -->
    <sys-change-pass v-if="$store.state.isSysChangePass"></sys-change-pass>
    <!-- 更改密码 end -->
    <!-- 查看结算时间 -->
    <sys-close-date v-if="$store.state.isSysCloseDate"></sys-close-date>
    <!-- 查看结算时间 end -->
    <!-- 设置 -->
    <sys-set ref="sysSet" v-if="$store.state.isSysSet"></sys-set>
    <!-- 设置 end -->
  </div>
</template>

<script>
const clickoutside = {
  // 初始化指令
  bind(el, binding, vnode) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener("click", documentHandler);
  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener("click", el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  }
};
import VueDatepickerLocal from 'vue-datepicker-local'; // 选择日期插件
import DepotNumClose from "../components/depotNumClose"; // 持仓右键平仓弹窗
import InfoChangePriceAlert from "../components/infoChangePriceAlert"; // 委托修改价格
import DepotNumSet from "../components/depotNumSet"; // 持仓止盈止损设置
import SysOnlineMoney from "../components/sysOnlineMoney"; // 在线出入金
import SysChangePass from "../components/sysChangePass"; // 更改密码
import SysCloseDate from "../components/sysCloseDate"; // 结算时间
import SysSet from "../components/sysSet"; // 持仓止盈止损设置
export default {
  name: "Transactface",
  components: {
    VueDatepickerLocal,
    'depot-num-close': DepotNumClose,
    'info-change-price-alert': InfoChangePriceAlert,
    'depot-num-set': DepotNumSet,
    'sys-online-money': SysOnlineMoney,
    'sys-change-pass': SysChangePass,
    'sys-close-date': SysCloseDate,
    'sys-set': SysSet,
  },
  data() {
    return {
      userInfo: '', // 登录后的个人信息
      userInfoFun: "", // 登录后的信息函数
      tfActiveTop: null,
      tfActiveLeft: null,
      // tfActiveHeight: 318, // 上下拉动
      tfBtmWrapReverse: false, // 下单板靠左控制
      tfBtmWrapShow: true, // 隐藏下单板
      isShowTfRightMenu: false, // 菜单控制
      isShowClickTfMenu: false, // 点击显示菜单
      activeTopMenu: 0, //右键空白处框初始位置
      activeLeftMenu: 0, //右键空白处框初始位置
      tfRightMenuBtns: [ // 菜单右键
        { id: 1, name: "下单板靠左", isClicked: false },
        { id: 2, name: "隐藏下单板", isClicked: false },
        { id: 3, name: "三键下单板", isClicked: true },
        { id: 4, name: "六键下单板", isClicked: false },
        // { id: 5, name: "传统下单板", isClicked: false },
        { id: 6, name: "出入金", isClicked: false },
        { id: 7, name: "更改密码", isClicked: false },
        { id: 8, name: "查看结算时间", isClicked: false },
        { id: 9, name: "设置", isClicked: false },
        { id: 10, name: "退出交易", isClicked: false }
      ],
      tfRightBtns: [ // 头部按钮
        { id: 1, name: "持仓", isActive: true },
        { id: 2, name: "委托", isActive: false },
        { id: 3, name: "成交", isActive: false },
        // { id: 4, name: "预埋单", isActive: false },
        { id: 5, name: "条件单", isActive: false },
        // { id: 6, name: "止损单", isActive: false },
        { id: 7, name: "资金", isActive: false },
        { id: 8, name: "查询", isActive: false }
      ],
      tfRightBtnMoreActive: false,
      tfRightBtnMore: false, //止损开仓显示初始值
      
      // 持仓右键
      rightDepotBtns: [ // 右键持仓列表
        { id: 4, name: "对价平仓" },
        { id: 5, name: "市价平仓" },
        { id: 6, name: "反手" },
        { id: 1, name: "全清仓" },
        { id: 2, name: "清多仓" },
        { id: 3, name: "清空仓" },
      ],
      activeTopDepot: "", // 右键持仓位置
      activeLeftDepot: "", // 右键持仓位置
      isShowRightDepot: false, // 右键持仓默认隐藏

      // 委托右键
      rightEntrustBtns: [ // 右键委托列表
        { id: 1, name: "改价" },
        { id: 2, name: "止损预备单" },
        { id: 3, name: "排队价跟进" },
        { id: 4, name: "最新价跟进" },
        { id: 5, name: "对手价跟进" },
        { id: 6, name: "撤单" },
        { id: 7, name: "全撤" }
      ],
      activeTopEntrust: "", // 右键委托位置
      activeLeftEntrust: "", // 右键委托位置
      isShowRightEntrust: false, // 右键委托默认隐藏

      // 预埋右键
      rightPrepaidBtns: [ // 右键预埋列表
        { id: 1, name: "添加预埋单" },
        { id: 2, name: "发出" },
        { id: 3, name: "发出所有" },
        { id: 4, name: "删除" },
        { id: 5, name: "删除所有" },
        { id: 6, name: "发出所有-买单" },
        { id: 7, name: "发出所有-卖单" }
      ],
      activeTopPrepaid: "", // 右键预埋位置
      activeLeftPrepaid: "", // 右键预埋位置
      isShowRightPrepaid: false, // 右键预埋默认隐藏

      // 条件右键
      rightConditionBtns: [ // 右键条件列表
        { id: 1, name: "添加条件单" },
        { id: 2, name: "暂停" },
        { id: 3, name: "启动" },
        { id: 4, name: "修改" },
        { id: 5, name: "删除" },
        { id: 6, name: "立即下单" },
        { id: 7, name: "取消" }
      ],
      activeTopCondition: "", // 右键条件位置
      activeLeftCondition: "", // 右键条件位置
      isShowRightCondition: false, // 右键条件默认隐藏

      // 止损右键
      rightLossBtns: [ // 右键止损列表
        { id: 1, name: "暂停" },
        { id: 2, name: "启用" },
        { id: 3, name: "暂停全部" },
        { id: 4, name: "启用全部" },
        { id: 5, name: "删除" },
        { id: 6, name: "删除全部" }
      ],
      activeTopLoss: "", // 右键止损位置
      activeLeftLoss: "", // 右键止损位置
      isShowRightLoss: false, // 右键止损默认隐藏

      haveCangTopLists: [ // 持仓 上面的列表
        { id: 1, name: "交易账号", color: false },
        { id: 2, name: "合约", color: false },
        { id: 3, name: "方向", color: false },
        { id: 4, name: "持仓", color: false },
        { id: 5, name: "今仓", color: false },
        { id: 6, name: "可用", color: false },
        { id: 7, name: "持仓均价", color: false },
        { id: 8, name: "止损/数量", color: true },
        { id: 9, name: "止盈/数量", color: true },
        { id: 10, name: "浮动盈亏", color: false },
        { id: 11, name: "市价", color: false },
        { id: 12, name: "总价差", color: false },
        { id: 13, name: "保证金", color: false },
        { id: 14, name: "结算货币", color: false },
        { id: 15, name: "报价货币", color: false },
        { id: 16, name: "结算汇率", color: false },
        { id: 17, name: "合约名", color: false },
        { id: 18, name: "品种", color: false },
        { id: 19, name: "每笔乘数", color: false },
        { id: 20, name: "交易所", color: false }
      ],
      depotTopContLists: [], // 持仓上面的列表 内容
      depotOrderListMark: "", // 持仓唯一标识控制颜色
      depotTopContListsFun: "", // 持仓上面的列表 内容函数
      isTfDepotClosePriceAlert: false, // 持仓平仓 弹窗初始值
      isTfDepotPriceAlert: false, // 持仓止损数量 弹窗初始值
      msgDepotClose: { // 持仓平仓选中的合约信息
        depotTitle: "", // 标题
        depotHandTitle: "", // 手数
        depotinfo: "", // 合约信息
      },
      msgDepot: { // 持仓止损数量选中的合约信息
        depotinfo: "", // 合约信息
        depotChoose: "" // 判断选择止盈止损
      },
      entrustBtmLists: [ // 委托的列表
        { id: 1, name: "交易账号", color: false },
        { id: 2, name: "合约", color: false },
        { id: 3, name: "状态", color: false },
        { id: 4, name: "委托量", color: false },
        { id: 5, name: "委托价", color: false },
        { id: 6, name: "方向", color: false },
        { id: 7, name: "开平", color: false },
        { id: 8, name: "预止损", color: true },
        { id: 9, name: "系统号", color: false },
        { id: 10, name: "委托号", color: false },
        { id: 11, name: "可撤", color: false },
        { id: 12, name: "已成交", color: false },
        { id: 13, name: "委托时间", color: false },
        { id: 14, name: "受理时间", color: false },
        { id: 15, name: "撤单时间", color: false },
        { id: 16, name: "详细状态", color: false },
        { id: 17, name: "委托来源", color: false },
        { id: 18, name: "结算币种", color: false },
        { id: 19, name: "合约小数位", color: false },
        { id: 20, name: "下单会话ID", color: false },
        { id: 21, name: "止损价", color: false },
        { id: 22, name: "回撤跳止损", color: false },
        { id: 23, name: "止盈价", color: false },
        { id: 24, name: "止损方式", color: false },
        { id: 25, name: "有效期", color: false },
        { id: 26, name: "市价止损", color: false },
        { id: 27, name: "N秒后市价", color: false }
      ],
      entrustBtmContLists: [], // 委托列表 内容
      entrustBtmContListsFun: "", // 委托列表 内容函数
      entrustLeftBtnLists: [ // 委托 全部单 挂单 已成交 已撤单 按钮
        {id: 1, name: "全部单"},
        {id: 2, name: "挂单"},
        {id: 3, name: "已成交"},
        {id: 4, name: "已撤单"},
      ],
      entrustLeftBtnListName: "全部单", // 委托状态 全部单 挂单 已成交 已撤单 判断
      entrustOrderListMark: "", // 委托唯一标识控制颜色
      left5ContTopRightBtns: [// 委托下面的按钮
        { id: 1, name: "改价", isClicked: false },
        { id: 2, name: "撤单", isClicked: false },
        { id: 3, name: "全撤", isClicked: false }
      ],
      isTfEntrustPriceAlert: false, // 委托 改价弹窗初始值
      msgInfo: "", // 委托改价选中的合约信息
      tranLists: [ // 成交的列表
        { id: 1, name: "交易账号", color: false },
        { id: 2, name: "成交编号", color: false },
        { id: 3, name: "合约", color: false },
        { id: 4, name: "成交数量", color: false },
        { id: 5, name: "成交价格", color: false },
        { id: 6, name: "方向", color: false },
        { id: 7, name: "开平", color: false },
        { id: 8, name: "委托号", color: false },
        { id: 9, name: "委托来源", color: false },
        { id: 10, name: "成交时间", color: false },
        { id: 11, name: "手续费", color: false },
        { id: 12, name: "平仓盈亏", color: false },
        { id: 13, name: "系统号", color: false },
        { id: 14, name: "用户字段", color: false }
      ],
      tranContLists: [], // 成交下面的列表 内容
      tranContListsFun: '', // 成交下面的列表 内容函数
      prePayLists: [ // 预埋单 的列表
        { id: 1, name: "创建时间", color: false },
        { id: 2, name: "交易账户", color: false },
        { id: 3, name: "合约", color: false },
        { id: 4, name: "下单方向", color: false },
        { id: 5, name: "开平", color: false },
        { id: 6, name: "手数", color: false },
        { id: 7, name: "下单价格", color: false },
        { id: 8, name: "回撤跳止损", color: false },
        { id: 9, name: "止损", color: false },
        { id: 10, name: "止盈", color: false },
        { id: 11, name: "市场止损", color: false },
        { id: 12, name: "N秒后市价", color: false },
        { id: 13, name: "编号", color: false }
      ],
      prepaidOrderListsFun: '', // 预埋单
      prepaidOrderLists: [], // 预埋单列表
      prepaidOrderListMark: "", // 预埋单唯一标识控制颜色
      conditionOrderTopLists: [ // 条件单 的列表
        { id: 1, name: "状态", color: false },
        { id: 2, name: "交易账户", color: false },
        { id: 3, name: "合约", color: false },
        { id: 4, name: "方向", color: false },
        { id: 5, name: "开平", color: false },
        { id: 6, name: "手数", color: false },
        { id: 7, name: "下单价格", color: false },
        { id: 8, name: "触发类型", color: false },
        { id: 9, name: "时间条件", color: false },
        { id: 10, name: "价格条件", color: false },
        { id: 11, name: "回撤跳止损", color: false },
        { id: 12, name: "止损", color: false },
        { id: 13, name: "止盈", color: false },
        { id: 14, name: "市价止损", color: false },
        { id: 15, name: "N秒后市价", color: false },
        { id: 16, name: "添加时间", color: false },
        { id: 17, name: "有效期", color: false },
        { id: 18, name: "完成时间", color: false },
        { id: 19, name: "完成原因", color: false },
        { id: 20, name: "报单错误", color: false },
        { id: 21, name: "编号", color: false },
      ],
      conditionOrderListsFun: '', // 条件单
      conditionOrderLists: [], // 条件单列表
      left5StateConditionBtns: [ // 条件单 未完成  已触发  已删除按钮
        {id:1, name: "未完成"},
        {id:2, name: "已触发"},
        {id:3, name: "已删除"},
      ],
      left5StateConditionBtnName: "",// 条件单
      conditionOrderListMark: "", // 条件单唯一标识控制颜色
      conditionOrderListinfo: "", // 条件单信息
      left5ContBtmRightTop2RBtns: [ // 条件单下面的按钮
        { id: 1, name: "立即下单", isClicked: false },
        { id: 2, name: "全部暂停", isClicked: false },
        { id: 3, name: "全部启动", isClicked: false },
        { id: 4, name: "全部删除", isClicked: false }
      ],
      lossOrderTopLists: [ // 止损单的列表
        { id: 1, name: "创建时间" },
        { id: 2, name: "交易账户" },
        { id: 3, name: "合约" },
        { id: 4, name: "状态" },
        { id: 5, name: "手数" },
        { id: 6, name: "回撤跳止损" },
        { id: 7, name: "止损价" },
        { id: 8, name: "止盈价" },
        { id: 9, name: "持仓方向" },
        { id: 10, name: "市价止损" },
        { id: 11, name: "N秒后市价" },
        { id: 12, name: "有效期" },
        { id: 13, name: "最后修改时间" },
        { id: 14, name: "完成原因" },
        { id: 15, name: "完成时间" },
        { id: 16, name: "编号" },
        { id: 17, name: "报单错误" },
      ],
      left5StateBtmLossLeftBtns: [ // 止损单 未完成 所有按钮
        {id:1, name: "未完成"},
        {id:2, name: "所有"}
      ],
      left5StateBtmLossLeftBtnName: "所有", // 止损单 未完成 所有 判断
      lossOrderListsFun: '', // 止损单
      lossOrderLists: [], // 止损单列表
      lossOrderListMark: "", // 止损单唯一标识控制颜色
      left5ContBtmRightTop1RBtns: [
        // 云止损单下面的按钮
        { id: 1, name: "暂停", isClicked: false },
        { id: 2, name: "启用", isClicked: false },
        { id: 3, name: "删除", isClicked: false }
      ],
      updateLast: "", //最后更新时间
      tfBtn7UserName: "", // 默认查询账户信息
      isShowTfBtn7: false, //资金请求查询下面信息默认隐藏
      tfBtmContBtn8List1: [ // 查询列表一
        { id: 1, name: "允许交易的合约", isClicked: false, isShowAlert: false },
        { id: 2, name: "大单边保证金品种", isClicked: false, isShowAlert: false }
      ],
      tfBtmContBtn8List2: [ // 查询列表二
        // { id: 3, name: "历史日结算报表", isClicked: false, isShowAlert: false },
        { id: 4, name: "历史成交记录", isClicked: true, isShowAlert: false },
        { id: 5, name: "历史委托记录", isClicked: false, isShowAlert: false }
      ],
      tfBtmContBtn8List3: [ // 查询列表三
        { id: 6, name: "历史出金流水", isClicked: false, isShowAlert: false },
        { id: 7, name: "历史入金流水", isClicked: false, isShowAlert: false }
      ],
      tfBtn8List1Alert1Theads: [ // 查询 弹窗1 允许交易的合约
        { id: 1, name: "合约代码" },
        { id: 2, name: "合约名" },
        { id: 3, name: "报价单位" },
        { id: 4, name: "每笔手数" },
        { id: 5, name: "小数位" },
        { id: 6, name: "报价货币" }
      ],
      tfBtmContBtn8Cont1Lists: [], // 允许交易的合约列表
      tfBtmContBtn8Cont1Num: null, // 允许交易的合约列表条数
      tfBtn8List1Alert2Theads: [ // 查询 弹窗2 大单边保证金
        { id: 1, name: "品种代码" },
        { id: 2, name: "品种名" },
        { id: 3, name: "是否大单边" },
        { id: 4, name: "商品使用币种" }
      ],
      tfBtmContBtn8Cont2Lists: [], // 大单边保证金品种列表
      tfBtmContBtn8Cont2Num: null, // 大单边保证金品种列表条数
      tfBtn8List2Alert1l: false, //历史日结算报表控制
      tfBtn8List2Alert1r: true, //历史日结算报表控制
      tfBtn8List2Alert1Theads: [ //历史日结算报表
        { id: 1, name: "交易账号" },
        { id: 2, name: "结算日期" },
        { id: 3, name: "昨结算" },
        { id: 4, name: "平仓盈亏" },
        { id: 5, name: "持仓盈亏" },
        { id: 6, name: "手续费" },
        { id: 7, name: "动态权益" },
        { id: 8, name: "保证金" },
        { id: 9, name: "出金" },
        { id: 10, name: "入金" },
        { id: 11, name: "信用金" },
        { id: 12, name: "静态权益" },
        { id: 13, name: "冻结保证金" },
        { id: 14, name: "冻结手续费" },
        { id: 15, name: "币种" }
      ],
      tfBtn8List2Alert2Theads: [ //历史成交记录
        { id: 1, name: "成交编号" },
        { id: 2, name: "交易账号" },
        { id: 3, name: "合约" },
        { id: 4, name: "手数" },
        { id: 5, name: "价格" },
        { id: 6, name: "方向" },
        { id: 7, name: "开平" },
        { id: 8, name: "报单引用" },
        { id: 9, name: "委托号" },
        { id: 10, name: "成交时间" },
        { id: 11, name: "交易日" },
        { id: 12, name: "委托来源" },
        { id: 13, name: "手续费" },
        { id: 14, name: "平仓盈亏" },
        { id: 15, name: "币种" },
        { id: 16, name: "用户属性" }
      ],
      tfBtn8Cont3StartTime: new Date(), // 历史日结算报表开始时间
      tfBtn8Cont3EndTime: new Date(), // 历史日结算报表结束时间
      tfBtmContBtn8Cont3Lists: [], // 历史日结算报表列表
      tfBtn8Cont4StartTime: new Date(), // 历史成交记录开始时间
      tfBtn8Cont4EndTime: new Date(), // 历史成交记录结束时间
      tfBtmContBtn8Cont4Lists: [], // 历史成交记录列表
      tfBtn8List2Alert3Theads: [ //历史委托记录
        { id: 1, name: "交易账号" },
        { id: 2, name: "合约" },
        { id: 3, name: "委托量" },
        { id: 4, name: "委托价" },
        { id: 5, name: "方向" },
        { id: 6, name: "开平" },
        { id: 7, name: "系统号" },
        { id: 8, name: "委托号" },
        { id: 9, name: "可撤" },
        { id: 10, name: "已成交" },
        { id: 11, name: "委托时间" },
        { id: 12, name: "受理时间" },
        { id: 13, name: "撤单时间" },
        { id: 14, name: "状态" },
        { id: 15, name: "详细状态" },
        { id: 16, name: "委托来源" },
        { id: 17, name: "下单会话ID" },
        // { id: 18, name: "终端信息" },
        { id: 19, name: "币种" },
        { id: 20, name: "用户字段" }
      ],
      tfBtn8Cont5StartTime: new Date(), // 历史委托记录开始时间
      tfBtn8Cont5EndTime: new Date(), // 历史委托记录结束时间
      tfBtmContBtn8Cont5Lists: [], // 历史委托记录列表
      tfBtn8List3Alert1Theads: [ //历史出入金流水记录
        { id: 1, name: "交易账号" },
        { id: 2, name: "币种" },
        { id: 3, name: "金额" },
        { id: 4, name: "资金类型" },
        { id: 5, name: "方向" },
        { id: 6, name: "操作时间" },
        { id: 7, name: "处理进展" },
        { id: 8, name: "完成时间" },
        { id: 9, name: "备注" }
      ],
      tfBtn8Cont6StartTime: new Date(), // 历史出金流水开始时间
      tfBtn8Cont6EndTime: new Date(), // 历史出金流水结束时间
      tfBtmContBtn8Cont6Lists: [], // 历史出金流水列表
      tfBtn8Cont7StartTime: new Date(), // 历史入金流水开始时间
      tfBtn8Cont7EndTime: new Date(), // 历史入金流水结束时间
      tfBtmContBtn8Cont7Lists: [], // 历史入金流水列表

      tfBtmLThreeOrder: true, // 下单 三键下单
      tfBtmLSixOrder: false, // 下单 六键下单
      tfBtmLTraditionOrder: false, // 下单 传统下单
      disabled: false,
      tfBtmThreeOrderSelect: "", // 三键六键下单 select 默认选中
      tfBtmThreeOrderOptions: [], // 三键六键下单 option
      tfOrderPriceLists: [ // 三键六键按钮
        { id: 1, name: "最新价", isClicked: false},
        { id: 2, name: "对手价", isClicked: true},
      ],
      tfOrderDepot: "", // 三键六键某条合约的持仓
      contractTyle: "", // 合约类型
      exchangeId: "", // 交易所id
      getOrderSelectListsFun: '', // 定义函数获取 三键 六键 传统 列表
      getOrderOptionListsFun: '', // 定义函数获取 三键 六键 传统 列表某个
      tfOrderOneBuyPrice: "", // 买的按钮的价格
      tfOrderOneSellPrice: "", // 卖的按钮的价格
      tfOrderSubAddPrice: "", // 买卖价格加减数
      tfOrderPriceType: null, // 价格类型 0： 限价 1：最新价 2：对手价 3：排队价 4:超价
      tfOrderPriceIpt: null, // 三键 六键 传统 下单价格
      tfOrderNumberIpt: 1, // 三键 六键 传统 下单手数
      tfFourOrderBuy: "买入", // 传统下单 买入按钮 默认
      tfFourOrderSell: "卖出", // 传统下单 卖出按钮 默认
      tfFourOrderOpen: "开仓", // 传统下单 开仓按钮 默认
      tfFourOrderPing: "平仓", // 传统下单 平仓按钮 默认
      tfFourOrderBuySell: "买入", // 传统下单 开始下单 默认
      tfFourOrderOpenPing: "开仓", // 传统下单 开始下单 默认
      isShowMenuInfoTime: false, // 查看结算时间
      tfAllTimer: "", // 三合一计时器
      tfAllTimerBoole: true, // 三合一计时器暂停
      infoClickTopBtnsFun: "", // 点击交易所按钮 获取合约函数
      getOrderAllDepotInfo: "", // 三合一持仓接口
      getOrderAllEntrustInfo: "", // 三合一委托接口
      getOrderAllDealInfo: "", // 三合一成交接口
      websock: null, // 推送
      webBtnId: "1", // 默认持仓推送
      websocketBoolean: true, // 手动断开
      webEntrustId: 0, // 推送委托 全部单 挂单 已成交 已撤单
      webConditionId: 0, // 推送条件单 未完成 已触发 已删除
      infoOutWebSocketTimer: "", // 推送计时器
    };
  },
  created() {
    this.initWebSocket(); // 开启推送
  },
  //利用计算属性
  computed: {
    updateSymbol() {
      return this.$store.state.updateSymbol;
    }
  },
  //监听执行
  watch: {
    updateSymbol(val, oldVal) {
      let that = this;
      // console.log(that.$store.state.otherCodeName);
      if (that.$store.state.otherCodeName == val[2]) {
        // tfOrderOneBuyPrice: "", // 买的按钮的价格
        // tfOrderOneSellPrice: "", // 卖的按钮的价格
        // name: that.$store.state.codeName, // 中文名字
        // code: that.$store.state.symbolName, // 代码
        if (that.$store.state.isSubAdd == true) { // 价格加减后不再赋值
          that.tfOrderOneBuyPrice = Number(val[6]).toFixed(that.$store.state.point); // 买价
          that.tfOrderOneSellPrice = Number(val[7]).toFixed(that.$store.state.point); // 卖价
          that.tfOrderPriceLists[0].price = Number(val[3]).toFixed(that.$store.state.point); // 最新价
          that.tfOrderPriceLists[1].price = Number(val[3]).toFixed(that.$store.state.point); // 也走最新价
          // this.tfOrderPriceIpt = this.tfOrderPriceLists[1].name; //三键 六键 传统下单价格默认对手价
          // this.tfOrderPriceType = this.tfOrderPriceLists[1].name; //三键 六键 传统下单价格类型默认对手价
        }
        // BV1: val[8] != "----"?Number(val[8]).toFixed(that.$store.state.point):val[8], // 买量
        // SV1: val[9] != "----"?Number(val[9]).toFixed(that.$store.state.point):val[9], // 卖量
        // current: Number(val[3]).toFixed(that.$store.state.point), // 最新
        // change: Number(val[3] - val[14]).toFixed(that.$store.state.point), // 涨跌
        // now_hand: Number(val[5]).toFixed(that.$store.state.point), // 现手
        // change_rate: Number((val[3] - val[14]) / val[14] * 100).toFixed(2), // 幅度
        // total_hand: "--", // 总手
        // open: Number(val[11]).toFixed(that.$store.state.point), // 开盘
        // turnover: val[15] != "----"?Number(val[15]).toFixed(that.$store.state.point):val[15], // 持仓
        // high: Number(val[12]).toFixed(that.$store.state.point), // 最高
        // p_clear: val[16] != "----"?Number(val[16]).toFixed(that.$store.state.point):val[16], // 昨结
        // low: Number(val[13]).toFixed(that.$store.state.point), // 最低
        // p_close: Number(val[14]).toFixed(that.$store.state.point), //昨收
      }
    }
  },
  mounted: function() {
    let that = this;
    let userToken = that.$store.state.tokenStr; // 获取token
    that.userInfoFun = function() { //登录后的个人信息
      that
        .$http({
          url: "/",
          method: "post",
          data: {
            nozzle: "account_info",
            token: userToken
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            // console.log(res.data.data);
            that.userInfo = res.data.data; // 账户信息
            that.$store.state.userNumber = res.data.data.number; // 账户编号
            that.$store.commit("userNameFun", res.data.data.name); // 账户名
            that.tfBtn7UserName = res.data.data.number; // 默认查询账户信息
          } else if (res.data.code == 0 || res.data.code == -1) {
            that.$message.error(res.data.msg);
          }
        });
    };
    // that.userInfoFun(); // 个人信息调用

    that.depotTopContListsFun = function() { //持仓 上面的内容 初始化
      that
        .$http({
          url: "/",
          method: "post",
          data: {
            nozzle: "depot_log",
            token: userToken
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            // console.log(res.data.data);
            that.depotTopContLists = res.data.data; // 上面的持仓内容
          } else if (res.data.code == 0 || res.data.code == -1) {
            that.$message.error(res.data.msg);
          }
        });
    };
    // that.depotTopContListsFun(); //持仓 上面的内容 初始化
    that.entrustBtmContListsFun = function(index) { //委托 初始化
      that
        .$http({
          url: "/",
          method: "post",
          data: {
            nozzle: "day_entrust_log",
            token: userToken,
            type: index
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            // console.log(res.data.data);
            that.entrustBtmContLists = res.data.data; // 委托内容
          } else if (res.data.code == 0 || res.data.code == -1) {
            that.$message.error(res.data.msg);
          }
        });
    };
    that.entrustBtmContListsFun(1); //委托 初始化

    that.tranContListsFun = function() { //成交
      that
        .$http({
          url: "/",
          method: "post",
          data: {
            nozzle: "day_deal_log",
            token: userToken
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            // console.log(res.data.data);
            that.tranContLists = res.data.data; // 成交内容
          } else if (res.data.code == 0 || res.data.code == -1) {
            that.$message.error(res.data.msg);
          }
        });
    }
    that.prepaidOrderListsFun = function() { //预埋单
      that
        .$http({
          url: "/",
          method: "post",
          data: {
            nozzle: "prepaid_log",
            token: userToken
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            // console.log(res.data.data);
            that.prepaidOrderLists = res.data.data;
          } else if (res.data.code == 0 || res.data.code == -1) {
            that.$message.error(res.data.msg);
          }
        });
    }
    that.conditionOrderListsFun = function(index) { //条件单
      that
        .$http({
          url: "/",
          method: "post",
          data: {
            nozzle: "condition_log",
            token: userToken,
            type: index
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            // console.log(res.data.data);
            that.conditionOrderLists = res.data.data;
            if (this.conditionOrderListMark) { // 修改之后更改store中选中的条件单
              for (let i = 0; i < this.conditionOrderLists.length; i++) {
                if (this.conditionOrderListMark == this.conditionOrderLists[i].mark) {
                  this.$store.state.isAddConditionListinfo = this.conditionOrderLists[i];
                }
              }
            }
          } else if (res.data.code == 0 || res.data.code == -1) {
            if (that.$store.state.isLoginedOutTran) {
              that.$message.error(res.data.msg);
            }
          }
        });
    }
    that.lossOrderListsFun = function() { //止损单
      that
        .$http({
          url: "/",
          method: "post",
          data: {
            nozzle: "loss_log",
            token: userToken
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            // console.log(res.data.data);
            that.lossOrderLists = res.data.data;
          } else if (res.data.code == 0 || res.data.code == -1) {
            that.$message.error(res.data.msg);
          }
        });
    }
    that.tfOnlineOutInMoneyFun = function() { // 出入金
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
    that.getOrderSelectListsFun = function () { // infoFaceChild2中调用 三键 六键 传统 下单列表 点击按钮获取交易所合约内容
      that.contractTyle = this.$store.state.contractTyle; // 合约类型: 主力合约0 其他合约1
      that.exchangeId = this.$store.state.exchangeId; // 交易所id
      that
        .$http({
          url: "/",
          method: "post",
          data: {
            nozzle: "query_home",
            type: that.contractTyle,
            exchange_id: that.exchangeId
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
    that.getOrderOptionListsFun = function () {
      // infoFaceChild2中调用 选中某条合约
      let codeName = that.$store.state.codeName;
      for (let i = 0; i < that.tfBtmThreeOrderOptions.length; i++) {
        if (codeName == that.tfBtmThreeOrderOptions[i].contract_name) {
          that.tfBtmThreeOrderSelect = codeName;
        }
      }
    };
    that.infoClickTopBtnsFun = function(id, index) { //点击按钮获取交易所合约内容
      that
        .$http({
          url: "/",
          method: "post",
          data: {
            nozzle: "query_home",
            type: 1,
            exchange_id: id
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            that.tfBtmThreeOrderOptions = res.data.data.contract; // 合约列表
            for (let i = 0; i < that.tfBtmThreeOrderOptions.length; i++) {
              if (that.tfBtmThreeOrderOptions[i].contract_name == index) {
                that.tfBtmThreeOrderSelect = index;
                that.$store.commit("changeCodeNameFun", index);
                that.getOrderAllDepotInfo(index);
              }
            }
            that.$store.commit({ // 改变vuex里面的值
              type: 'contractExchangeChange',
              i: 1,
              n: id
            });
            // console.log(that.tfBtmThreeOrderOptions);
          } else if (res.data.code == 0 || res.data.code == -1) {
            that.$message.error(res.data.msg);
          }
        });
    }
    that.getOrderAllDepotInfo = function(index) { //三合一持仓接口
      that
        .$http({
          url: "/",
          method: "post",
          data: {
            nozzle: "depot_log_info",
            token: userToken,
            code: index
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            // console.log(res.data.data);
            clearInterval(that.tfAllTimer);
            // 账户信息资料
            that.userInfo = res.data.data.account; // 账户信息
            that.$store.state.userNumber = res.data.data.account.number; // 账户编号
            that.$store.commit("userNameFun", res.data.data.account.name); // 账户名
            that.tfBtn7UserName = res.data.data.account.number; // 默认查询账户信息
            // 持仓信息
            that.depotTopContLists = res.data.data.depot_log; // 上面的持仓内容
            // 三键六键信息
            // if (that.$store.state.isSubAdd == true) { // 价格加减后不再赋值
            //   that.tfOrderPriceLists[0].price = res.data.data.option_contract.current_info.current_price; // 最新价
            //   that.tfOrderPriceLists[1].price = res.data.data.option_contract.current_info.current_price; // 也走最新价
            //   that.tfOrderOneBuyPrice = res.data.data.option_contract.five_gear.ask[4].price; // 买入的按钮显示价
            //   that.tfOrderOneSellPrice = res.data.data.option_contract.five_gear.bid[0].price; // 卖出的按钮显示价
            //   this.tfOrderPriceIpt = this.tfOrderPriceLists[1].name; //三键 六键 传统下单价格默认对手价
            //   this.tfOrderPriceType = this.tfOrderPriceLists[1].name; //三键 六键 传统下单价格类型默认对手价
            // }
            if (localStorage.getItem("allSymbolList")) {
              var allSymbolList = JSON.parse(localStorage.getItem("allSymbolList"));
              for (let i = 0; i < allSymbolList.length; i++) {
                if (that.$store.state.otherCodeName == allSymbolList[i][2]) {
                  if (that.$store.state.isSubAdd == true) { // 价格加减后不再赋值
                    that.tfOrderOneBuyPrice = Number(allSymbolList[i][6]).toFixed(that.$store.state.point); // 买价
                    that.tfOrderOneSellPrice = Number(allSymbolList[i][7]).toFixed(that.$store.state.point); // 卖价
                    that.tfOrderPriceLists[0].price = Number(allSymbolList[i][3]).toFixed(that.$store.state.point); // 最新价
                    that.tfOrderPriceLists[1].price = Number(allSymbolList[i][3]).toFixed(that.$store.state.point); // 也走最新价
                    that.tfOrderPriceIpt = that.tfOrderPriceLists[1].name; //三键 六键 传统下单价格默认对手价
                    that.tfOrderPriceType = that.tfOrderPriceLists[1].name; //三键 六键 传统下单价格类型默认对手价
                  }
                }
              }
            }
            that.tfOrderDepot = res.data.data.option_contract.depot; // 持仓
            that.tfOrderSubAddPrice = res.data.data.option_contract.current_info.wave_spot; // 加减数
            let num;
            if (this.tfOrderSubAddPrice.indexOf(".") == -1) {
              num = 0;
            } else {
              num = Number(this.tfOrderSubAddPrice).toString().split(".")[1].length;
            }
            window.sessionStorage.setItem("drawNumPoint", num);
            // if (that.tfAllTimerBoole) {
            //   // console.log("持仓")
            //   that.tfAllTimer = setInterval(() => {
            //     that.getOrderAllDepotInfo(index);
            //   }, 5000);
            // }
          } else if (res.data.code == 0 || res.data.code == -1) {
            that.$message.error(res.data.msg);
          }
        });
    }
    that.getOrderAllDepotInfo(that.$store.state.codeName); // 三合一持仓调用
    that.getOrderAllEntrustInfo = function(index, code) { //三合一委托接口
      that
        .$http({
          url: "/",
          method: "post",
          data: {
            nozzle: "entrust_log_info",
            token: userToken,
            type: index,
            code: code
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            // console.log(res.data.data);
            clearInterval(that.tfAllTimer);
            // 账户信息资料
            that.userInfo = res.data.data.account; // 账户信息
            that.$store.state.userNumber = res.data.data.account.number; // 账户编号
            that.$store.commit("userNameFun", res.data.data.account.name); // 账户名
            that.tfBtn7UserName = res.data.data.account.number; // 默认查询账户信息
            // 委托信息
            that.entrustBtmContLists = res.data.data.day_entrust_log; // 委托内容
            // 三键六键信息
            // if (that.$store.state.isSubAdd == true) { // 价格加减后不再赋值
            //   that.tfOrderPriceLists[0].price = res.data.data.option_contract.current_info.current_price; // 最新价
            //   that.tfOrderPriceLists[1].price = res.data.data.option_contract.current_info.current_price; // 也走最新价
            //   that.tfOrderOneBuyPrice = res.data.data.option_contract.five_gear.ask[4].price; // 买入的按钮显示价
            //   that.tfOrderOneSellPrice = res.data.data.option_contract.five_gear.bid[0].price; // 卖出的按钮显示价
            //   this.tfOrderPriceIpt = this.tfOrderPriceLists[1].name; //三键 六键 传统下单价格默认对手价
            //   this.tfOrderPriceType = this.tfOrderPriceLists[1].name; //三键 六键 传统下单价格类型默认对手价
            // }
            var allSymbolList = JSON.parse(localStorage.getItem("allSymbolList"));
            console.log(that.$store.state.otherCodeName);
            for (let i = 0; i < allSymbolList.length; i++) {
              if (that.$store.state.otherCodeName == allSymbolList[i][2]) {
                if (that.$store.state.isSubAdd == true) { // 价格加减后不再赋值
                  that.tfOrderOneBuyPrice = Number(allSymbolList[i][6]).toFixed(that.$store.state.point); // 买价
                  that.tfOrderOneSellPrice = Number(allSymbolList[i][7]).toFixed(that.$store.state.point); // 卖价
                  that.tfOrderPriceLists[0].price = Number(allSymbolList[i][3]).toFixed(that.$store.state.point); // 最新价
                  that.tfOrderPriceLists[1].price = Number(allSymbolList[i][3]).toFixed(that.$store.state.point); // 也走最新价
                  that.tfOrderPriceIpt = that.tfOrderPriceLists[1].name; //三键 六键 传统下单价格默认对手价
                  that.tfOrderPriceType = that.tfOrderPriceLists[1].name; //三键 六键 传统下单价格类型默认对手价
                }
              }
            }
            that.tfOrderDepot = res.data.data.option_contract.depot; // 持仓
            that.tfOrderSubAddPrice = res.data.data.option_contract.current_info.wave_spot; // 加减数
            let num;
            if (this.tfOrderSubAddPrice.indexOf(".") == -1) {
              num = 0;
            } else {
              num = Number(this.tfOrderSubAddPrice).toString().split(".")[1].length;
            }
            window.sessionStorage.setItem("drawNumPoint", num);
            // if (that.tfAllTimerBoole) {
            //   // console.log("委托")
            //   that.tfAllTimer = setInterval(() => {
            //     that.getOrderAllEntrustInfo(index, code);
            //   }, 5000);
            // }
          } else if (res.data.code == 0 || res.data.code == -1) {
            that.$message.error(res.data.msg);
          }
        });
    }
    that.getOrderAllDealInfo = function(code) { //三合一成交接口
      that
        .$http({
          url: "/",
          method: "post",
          data: {
            nozzle: "deal_log_info",
            token: userToken,
            code: code
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            // console.log(res.data.data);
            clearInterval(that.tfAllTimer);
            // 账户信息资料
            that.userInfo = res.data.data.account; // 账户信息
            that.$store.state.userNumber = res.data.data.account.number; // 账户编号
            that.$store.commit("userNameFun", res.data.data.account.name); // 账户名
            that.tfBtn7UserName = res.data.data.account.number; // 默认查询账户信息
            // 成交信息
            that.tranContLists = res.data.data.day_deal_log; // 成交内容
            // 三键六键信息
            var allSymbolList = JSON.parse(localStorage.getItem("allSymbolList"));
            console.log(that.$store.state.otherCodeName);
            for (let i = 0; i < allSymbolList.length; i++) {
              if (that.$store.state.otherCodeName == allSymbolList[i][2]) {
                if (that.$store.state.isSubAdd == true) { // 价格加减后不再赋值
                  that.tfOrderOneBuyPrice = Number(allSymbolList[i][6]).toFixed(that.$store.state.point); // 买价
                  that.tfOrderOneSellPrice = Number(allSymbolList[i][7]).toFixed(that.$store.state.point); // 卖价
                  that.tfOrderPriceLists[0].price = Number(allSymbolList[i][3]).toFixed(that.$store.state.point); // 最新价
                  that.tfOrderPriceLists[1].price = Number(allSymbolList[i][3]).toFixed(that.$store.state.point); // 也走最新价
                  that.tfOrderPriceIpt = that.tfOrderPriceLists[1].name; //三键 六键 传统下单价格默认对手价
                  that.tfOrderPriceType = that.tfOrderPriceLists[1].name; //三键 六键 传统下单价格类型默认对手价
                }
              }
            }
            // if (that.$store.state.isSubAdd == true) { // 价格加减后不再赋值
            //   that.tfOrderPriceLists[0].price = res.data.data.option_contract.current_info.current_price; // 最新价
            //   that.tfOrderPriceLists[1].price = res.data.data.option_contract.current_info.current_price; // 也走最新价
            //   that.tfOrderOneBuyPrice = res.data.data.option_contract.five_gear.ask[4].price; // 买入的按钮显示价
            //   that.tfOrderOneSellPrice = res.data.data.option_contract.five_gear.bid[0].price; // 卖出的按钮显示价
              
            // }
            that.tfOrderDepot = res.data.data.option_contract.depot; // 持仓
            that.tfOrderSubAddPrice = res.data.data.option_contract.current_info.wave_spot; // 加减数
            let num;
            if (this.tfOrderSubAddPrice.indexOf(".") == -1) {
              num = 0;
            } else {
              num = Number(this.tfOrderSubAddPrice).toString().split(".")[1].length;
            }
            window.sessionStorage.setItem("drawNumPoint", num);
            // if (that.tfAllTimerBoole) {
            //   // console.log("成交")
            //   that.tfAllTimer = setInterval(() => {
            //     that.getOrderAllDealInfo(code);
            //   }, 5000);
            // }
          } else if (res.data.code == 0 || res.data.code == -1) {
            that.$message.error(res.data.msg);
          }
        });
    }
    this.tfOrderPriceIpt = this.tfOrderPriceLists[1].name; //三键 六键 传统下单价格默认对手价
    this.tfOrderPriceType = this.tfOrderPriceLists[1].name; //三键 六键 传统下单价格类型默认对手价
    $(function() {
      $(".tf_btn8_list1_alert1").draggable({handle: ".tf_btn8_list_alert_top", containment: 'body'}); // 查询弹窗移动
      $(".datepicker>input").css({height: '30px'}); // 日期插件高
    });
    if (this.$store.state.isShowAlertTface) { // 外盘弹出之后的刷新页面
      $(".transactface").draggable({'disabled': false, containment: 'body', handle: ".tf_top"}); // 弹出后可以移动
      $(".transactface").resizable({ disabled: false });
    }
    // that.tfAllTimer = setInterval(() => {
    //   that.getStockList(that.$store.state.codeName); // 获取选中的合约
    // }, 3000);
    that.initInfoFun(); // 信息初始化
  },
  directives: { clickoutside }, //自定义指令点击空白右键消失
  methods: {
    initInfoFun() { // 信息初始化
      // let that = this;
      // var allSymbolList = JSON.parse(localStorage.getItem("allSymbolList"));
      // for (let i = 0; i < allSymbolList.length; i++) {
      //   if (that.$store.state.otherCodeName == allSymbolList[i][2]) {
      //     if (that.$store.state.isSubAdd == true) { // 价格加减后不再赋值
      //       that.tfOrderOneBuyPrice = Number(allSymbolList[i][6]).toFixed(that.$store.state.point); // 买价
      //       that.tfOrderOneSellPrice = Number(allSymbolList[i][7]).toFixed(that.$store.state.point); // 卖价
      //       that.tfOrderPriceLists[0].price = Number(allSymbolList[i][3]).toFixed(that.$store.state.point); // 最新价
      //       that.tfOrderPriceLists[1].price = Number(allSymbolList[i][3]).toFixed(that.$store.state.point); // 也走最新价
      //       // this.tfOrderPriceIpt = this.tfOrderPriceLists[1].name; //三键 六键 传统下单价格默认对手价
      //       // this.tfOrderPriceType = this.tfOrderPriceLists[1].name; //三键 六键 传统下单价格类型默认对手价
      //     }
      //   }
      // }
    },
    initWebSocket(){ //初始化weosocket
      const wsuri = "ws://47.110.12.144:2346";
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onclose = this.websocketclose;
      this.websock.onerror = this.websocketonerror;
    },
    websocketonopen(){ //连接建立之后执行send方法发送数据
      let that = this;
      let actions = {};
      if (that.webBtnId == "1") { // 持仓
        actions = {
          nozzle: "depot_log_info",
          token: that.$store.state.tokenStr,
          code: that.$store.state.codeName
        };
        this.websocketsend(JSON.stringify(actions));
        clearInterval(that.infoOutWebSocketTimer); // 推送计时器
        that.infoOutWebSocketTimer = setInterval(() => {
          that.websocketsend(JSON.stringify(actions));
        }, 2000);
      } else if (that.webBtnId == "2") { // 委托
        actions = {
          nozzle: "entrust_log_info",
          token: that.$store.state.tokenStr,
          type: that.webEntrustId,
          code: that.$store.state.codeName
        };
        this.websocketsend(JSON.stringify(actions));
        clearInterval(that.infoOutWebSocketTimer); // 推送计时器
        that.infoOutWebSocketTimer = setInterval(() => {
          that.websocketsend(JSON.stringify(actions));
        }, 2000);
      } else if (that.webBtnId == "3") { // 成交id:3
        actions = {
          nozzle: "deal_log_info",
          token: that.$store.state.tokenStr,
          code: that.$store.state.codeName
        };
        this.websocketsend(JSON.stringify(actions));
        clearInterval(that.infoOutWebSocketTimer); // 推送计时器
        that.infoOutWebSocketTimer = setInterval(() => {
          that.websocketsend(JSON.stringify(actions));
        }, 2000);
      } else if (that.webBtnId == "5") { // 条件单id:5
        actions = {
          nozzle: "condition_log_info",
          token: that.$store.state.tokenStr,
          type: that.webConditionId,
          code: that.$store.state.codeName
        };
        this.websocketsend(JSON.stringify(actions));
        clearInterval(that.infoOutWebSocketTimer); // 推送计时器
        that.infoOutWebSocketTimer = setInterval(() => {
          that.websocketsend(JSON.stringify(actions));
        }, 5000);
      }
    },
    websocketonerror(){//连接建立失败重连
      setTimeout(() => {
        this.websock.close() //离开路由之后断开websocket连接
        this.initWebSocket();
        if (navigator.onLine) {
          // console.log("重连 有.... 网");
          this.websocketBoolean = true;
        }else{
          // console.log("重连 没 网");
          this.$message.error("请查看您的网络连接");
          this.websocketBoolean = false;
        };
      }, 20000);
    },
    websocketsend(Data){//数据发送
      this.websock.send(Data);
    },
    websocketonmessage(e){ //数据接收
      let that = this;
      if (e.data.slice(0, 4) != "连接成功") {
        const redata = JSON.parse(e.data);
        if (redata.code == "-1") {
          that.$message.error(redata.msg, 1000);
          that.websocketBoolean = false;
          that.websock.close() //离开路由之后断开websocket连接
          that.tfRightMenuFun(10);
        } else {
          that.userInfo = redata.data.account; // 账户信息
          that.$store.state.userNumber = redata.data.account.number; // 账户编号
          that.$store.commit("userNameFun", redata.data.account.name); // 账户名
          that.tfBtn7UserName = redata.data.account.number; // 默认查询账户信息
          // 三键六键信息
          // if (that.$store.state.isSubAdd == true) { // 价格加减后不再赋值
          //   that.tfOrderPriceLists[0].price = redata.data.option_contract.current_info.current_price; // 最新价
          //   that.tfOrderPriceLists[1].price = redata.data.option_contract.current_info.current_price; // 也走最新价
          //   that.tfOrderOneBuyPrice = redata.data.option_contract.five_gear.ask[4].price; // 买入的按钮显示价
          //   that.tfOrderOneSellPrice = redata.data.option_contract.five_gear.bid[0].price; // 卖出的按钮显示价
          //   // this.tfOrderPriceIpt = this.tfOrderPriceLists[1].name; //三键 六键 传统下单价格默认对手价
          //   // this.tfOrderPriceType = this.tfOrderPriceLists[1].name; //三键 六键 传统下单价格类型默认对手价
          // }
          that.tfOrderDepot = redata.data.option_contract.depot; // 持仓
          that.tfOrderSubAddPrice = redata.data.option_contract.current_info.wave_spot; // 加减数
          let num;
          if (this.tfOrderSubAddPrice.indexOf(".") == -1) {
            num = 0;
          } else {
            num = Number(this.tfOrderSubAddPrice).toString().split(".")[1].length;
          }
          window.sessionStorage.setItem("drawNumPoint", num);
          if (that.webBtnId == "1") {
            // 持仓信息
            that.depotTopContLists = redata.data.depot_log; // 上面的持仓内容
          } else if (that.webBtnId == "2") {
            // 委托信息
            that.entrustBtmContLists = redata.data.day_entrust_log; // 委托内容
          } else if (that.webBtnId == "3") {
            // 成交信息
            that.tranContLists = redata.data.day_deal_log; // 成交内容
          } else if (that.webBtnId == "5") {
            // 条件单信息
            that.conditionOrderLists = redata.data.condition_log.data;
            if (this.conditionOrderListMark) { // 修改之后更改store中选中的条件单
              for (let i = 0; i < this.conditionOrderLists.length; i++) {
                if (this.conditionOrderListMark == this.conditionOrderLists[i].mark) {
                  this.$store.state.isAddConditionListinfo = this.conditionOrderLists[i];
                }
              }
            }
          }
        }
      }
    },
    websocketclose(e){  //关闭
      // console.log('断开连接',e);
      let that = this;
      setTimeout(() => {
        if (that.websocketBoolean) {
          that.initWebSocket();
        }
        if (navigator.onLine) {
          // console.log("断开后有网");
          that.websocketBoolean = true;
        }else{
          // console.log("断开后没网");
          that.websocketBoolean = false;
        };
      }, 2000);
    },

    moveUpDown(e) {
      // 上下拖拽事件
      // let that = this;
      // document.onmousemove = (e)=>{
      //   //鼠标按下并移动的事件
      //   let topY = e.clientY;
      //   console.log(topY);
      //   that.$parent.$refs.route.infoChangeHeightFun(topY);
      //   if (that.$route.path == "/wrap/infoFace/infoFaceChild4") {
      //     that.$parent.$refs.route.$refs.infoRoute.infoChangeKlineWHFun(); // 调用改变K线宽高
      //   }
      //   if (that.$parent.$el.clientHeight - 383 <=that.$parent.$refs.route.infoHeight) {
      //     console.log("666666");
      //     that.tfActiveHeight = that.$parent.$el.clientHeight - that.$parent.$refs.route.infoHeight - 65;
      //   }
      // };
      // document.onmouseup = (e) => {
      //   document.onmousemove = null;
      //   document.onmouseup = null;
      // };
    },
    isClickedOutFaceFun() { // 弹出 停靠
      if (this.$store.state.isShowAlertTface) {
        // 停靠状态 点击按钮后弹出
        this.$store.commit("isShowAlertTfaceFun", false); // 外盘停靠
        this.$store.commit('infoFaceHeightFun', true); // 已登录点击F12按钮高
        if (this.$route.path == "/wrap/infoFace/infoFaceChild3") {
          this.$nextTick(() => {
            window.myChart.resize();
          })
        }
        if (this.$route.path == "/wrap/infoFace/infoFaceChild4") {
          this.$parent.$refs.route.$refs.infoRoute.infoChangeKlineWHFun(); // 调用改变K线宽高
        }
        if (this.$store.state.infoFaceHeight) {
          this.$refs.outTranWrap.style.top = 0;
          this.$refs.outTranWrap.style.left = 0;
          this.$refs.outTranWrap.style.width = '100%'; // 停靠后的宽高
          this.$refs.outTranWrap.style.height = '318px'; // 停靠后的宽高
          this.$refs.outTranWrap.style.margin = 0;
        }
        $(".transactface").draggable('disable'); // 不允许拖动
        $(".transactface").resizable({ disabled: true }); // 不允许缩放
        // 拖动之后点击弹出/停靠改变infoFace的高度
        // this.$parent.$refs.route.infoHeight = this.$parent.$el.clientHeight - 383;
      } else {
        // 弹出后状态 点击按钮后停靠
        if (this.$store.state.infoFaceHeight) {
          this.$refs.outTranWrap.style.top = '50%';
          this.$refs.outTranWrap.style.left = '50%';
          this.$refs.outTranWrap.style.width = $(".transactface_wrap").width() * 0.8 + 'px'; // 弹出时的宽高
          this.$refs.outTranWrap.style.height = '318px'; // 弹出时的宽高
          this.$refs.outTranWrap.style.margin = "-193.5px 0 0 -42.5%";
        }
        // 拖动之后点击弹出/停靠改变infoFace的高度
        // this.$parent.$refs.route.infoHeight = this.$parent.$el.clientHeight - 60;
        this.$store.commit("isShowAlertTfaceFun", true); // 外盘弹出
        this.$store.commit('infoFaceHeightFun', false); // 已登录点击F12按钮低
        if (this.$route.path == "/wrap/infoFace/infoFaceChild3") {
          this.$nextTick(() => {
            window.myChart.resize();
          })
        }
        if (this.$route.path == "/wrap/infoFace/infoFaceChild4") {
          this.$parent.$refs.route.$refs.infoRoute.infoChangeKlineWHFun(); // 调用改变K线宽高
        }
        $(".transactface").draggable({'disabled': false, containment: 'body', handle: ".tf_top"}); // 弹出后可以移动
        $(".transactface").resizable({ disabled: false });
      }
    },
    tfTopF12BtnFun(){
      // F12按钮
      if (this.$store.state.isShowAlertTface) {
        // 已弹出
        if (this.$store.state.isShowTf) {
          this.$store.commit("isShowTfFun", false); // 已登录按F12外盘显隐控制
        } else {
          this.$store.commit("isShowTfFun", true); // 已登录按F12外盘显隐控制
        }
      } else {
        // 未弹出
        if (this.$store.state.isShowTf) {
          this.$store.commit("isShowTfFun", false); // 已登录按F12外盘显隐控制
        } else {
          this.$store.commit("isShowTfFun", true); // 已登录按F12外盘显隐控制
        }
        if (this.$store.state.infoFaceHeight) {
          this.$store.commit("infoFaceHeightFun", false); // 已登录点击F12按钮高低控制
        } else {
          this.$store.commit("infoFaceHeightFun", true); // 已登录点击F12按钮高低控制
        }
        if (this.$route.path == "/wrap/infoFace/infoFaceChild3") {
          this.$nextTick(() => {
            window.myChart.resize();
          })
        }
        if (this.$route.path == "/wrap/infoFace/infoFaceChild4") {
          this.$parent.$refs.route.$refs.infoRoute.infoChangeKlineWHFun(); // 调用改变K线宽高
        }
      }
    },
    outMenuRightFun() {
      // 菜单的鼠标右键事件
      // console.log("菜单右键");
      this.isShowTfRightMenu = true;
      this.isShowClickTfMenu = false; //右键关闭点击菜单
      let totalWidth = this.$refs.outTranWrap.getBoundingClientRect().right; //总宽度
      if (totalWidth - event.pageX < 150) {
        //边缘检测
        this.activeLeftMenu = event.pageX - 150; //给left赋值
        this.activeTopMenu = event.pageY; //给top赋值
      } else {
        this.activeLeftMenu = event.pageX; //给left赋值
        this.activeTopMenu = event.pageY; //给top赋值
      }
    },
    handleCloseMenu(e) { // 点击其他地方关闭菜单
      this.isShowTfRightMenu = false;
    },
    outMenuFun() { //点击菜单
      this.isShowClickTfMenu = true;
    },
    clickCloseMenu() { // 点击其他部分关闭点击出现的菜单
      this.isShowClickTfMenu = false;
    },
    tfRightMenuFun(index) { //右键菜单处里面的事件
      for (let i = 0; i < this.tfRightMenuBtns.length; i++) {
        if (index == this.tfRightMenuBtns[i].id) {
          if (index == 1) {
            console.log(this.$parent.$refs.route.$refs.infoRoute);
            if (this.tfRightMenuBtns[i].isClicked) {
              //判断是否显示选中
              this.tfRightMenuBtns[i].isClicked = false;
              this.tfBtmWrapReverse = false; //下单板靠左
            } else {
              this.tfRightMenuBtns[i].isClicked = true;
              this.tfBtmWrapReverse = true; //下单板靠左
            }
          }
          if (index == 2) {
            if (this.tfRightMenuBtns[i].isClicked) {
              //判断是否显示选中
              this.tfRightMenuBtns[i].isClicked = false;
              this.tfBtmWrapShow = true; // 按钮选中隐藏下单板隐藏
              clearInterval(this.tfAllTimer); // 清除计时
              this.getOrderAllDepotInfo(this.$store.state.codeName); // 三合一持仓调用
            } else {
              this.tfRightMenuBtns[i].isClicked = true;
              this.tfBtmWrapShow = false; // 按钮选中隐藏下单板隐藏
              clearInterval(this.tfAllTimer);
            }
          }
          if (index == 3) {
            if (!this.tfRightMenuBtns[i].isClicked) {
              //判断是否显示选中
              this.tfRightMenuBtns[i].isClicked = true;
            }
            this.tfRightMenuBtns[3].isClicked = false;
            this.tfRightMenuBtns[4].isClicked = false;
            this.tfBtmLThreeOrder = true; // 三键下单
            this.tfBtmLSixOrder = false; // 六键下单
            this.tfBtmLTraditionOrder = false; // 传统下单
          }
          if (index == 4) {
            if (!this.tfRightMenuBtns[i].isClicked) {
              //判断是否显示选中
              this.tfRightMenuBtns[i].isClicked = true;
            }
            this.tfRightMenuBtns[2].isClicked = false;
            this.tfRightMenuBtns[4].isClicked = false;
            this.tfBtmLThreeOrder = false; // 三键下单
            this.tfBtmLSixOrder = true; // 六键下单
            this.tfBtmLTraditionOrder = false; // 传统下单
          }
          if (index == 5) {
            if (!this.tfRightMenuBtns[i].isClicked) {
              //判断是否显示选中
              this.tfRightMenuBtns[i].isClicked = true;
            }
            this.tfRightMenuBtns[2].isClicked = false;
            this.tfRightMenuBtns[3].isClicked = false;
            this.tfBtmLThreeOrder = false; // 三键下单
            this.tfBtmLSixOrder = false; // 六键下单
            this.tfBtmLTraditionOrder = true; // 传统下单
          }
          if (index == 6) {
            this.$store.commit("isSysOnlineMoneyFun");// 在线入金/出金
          }
          if (index == 7) {
            this.$store.commit("isSysChangePassFun"); // 更改密码
          }
          if (index == 8) {
            this.$store.commit("isSysCloseDateFun"); // 查看结算时间
          }
          if (index == 9) {
            this.$store.commit("isSysSetFun");
            // this.$refs.sysSet.tfMenuSetEnterFun();
          }
          if (index == 10) {
            // 退出交易
            this.$store.commit("isShowTfFun", false); // 外盘交易隐藏
            this.$store.commit("isShowAlertTfaceFun", false); // 外盘停靠
            this.$store.commit('infoFaceHeightFun', false); // 退出后高度变高
            this.$store.state.noLoginOutTran = true; //退出登录显示外盘交易未登录按钮
            this.$store.state.isLoginedOutTran = false; //退出登录隐藏外盘交易已登录按钮
            this.websock.close() //离开路由之后断开websocket连接
            this.$store.commit("tokenStrFun", ""); // 退出后清除token
            if (this.$store.state.isLoginSuccess) { // 退出时通知弹窗关闭
              this.$store.commit("isLoginSuccessFun");
            }
            if (this.$route.path == "/wrap/infoFace/infoFaceChild3") {
              this.$nextTick(() => {
                window.myChart.resize();
              })
            }
            if (this.$route.path == "/wrap/infoFace/infoFaceChild4") {
              this.$parent.$refs.route.$refs.infoRoute.infoChangeKlineWHFun(); // 调用改变K线宽高
            }
          }
          this.isShowTfRightMenu = false; // 点击后关闭右键菜单
          this.isShowClickTfMenu = false; // 点击后关闭点击菜单
        }
      }
    },
    tfdepotRightFun(index) { // 持仓右键
      for (let i = 0; i < this.depotTopContLists.length; i++) {
        if (index == this.depotTopContLists[i].id) {
          this.depotOrderListMark = index;
          this.msgDepot.depotinfo = this.depotTopContLists[i]; // 选中的合约信息
          this.msgDepotClose.depotinfo = this.depotTopContLists[i]; // 选中平仓的合约信息
        }
      }
      this.isShowRightDepot = true;
      this.activeLeftDepot = event.pageX; //给left赋值
      this.activeTopDepot = event.pageY; //给top赋值
      let totalWidth = this.$refs.tfOrderCont.getBoundingClientRect().width; //总宽度
      let totalHeight = this.$parent.$refs.wrap.getBoundingClientRect().height; //页面总高度
      if (totalWidth - event.pageX < 150) {
        //边缘检测
        if (totalHeight - event.pageY < 168) {
          this.activeLeftDepot = event.pageX - 150; //给left赋值
          this.activeTopDepot = totalHeight - 168; //给top赋值
        } else {
          this.activeLeftDepot = event.pageX - 150; //给left赋值
          this.activeTopDepot = event.pageY; //给top赋值
        }
      } else {
        if (totalHeight - event.pageY < 168) {
          this.activeLeftDepot = event.pageX; //给left赋值
          this.activeTopDepot = totalHeight - 168; //给top赋值
        } else {
          this.activeLeftDepot = event.pageX; //给left赋值
          this.activeTopDepot = event.pageY; //给top赋值
        }
      }
    },
    handleCloseDepot() { // 点击空白关闭持仓弹窗
      this.isShowRightDepot = false;
    },
    tfdepotOrderListsFun(index) { // 持仓点击某条合约
      for (let i = 0; i < this.depotTopContLists.length; i++) {
        if (index == this.depotTopContLists[i].id) {
          this.depotOrderListMark = index;
          this.msgDepot.depotinfo = this.depotTopContLists[i]; // 选中的合约信息
          this.msgDepotClose.depotinfo = this.depotTopContLists[i]; // 选中平仓的合约信息
          this.$store.commit("changeCodeNameFun", this.depotTopContLists[i].contract_name); // 中文合约名字
          this.$store.commit("symbolNameFun", this.depotTopContLists[i].short); // 英文合约名字
          this.$store.commit("otherCodeNameFun", this.depotTopContLists[i].contract_symbols); // 新加的合约名字
          this.infoClickTopBtnsFun(this.depotTopContLists[i].exchange, this.depotTopContLists[i].contract_name); // 下拉框联动
          if (this.$route.path == "/wrap/infoFace/infoFaceChild2") {
            this.$parent.$refs.route.$refs.infoRoute.infoClickTopBtnsFun(this.depotTopContLists[i].exchange, 1);
            this.$parent.$refs.route.$refs.infoRoute.infoTopBtnFun(this.depotTopContLists[i].exchange, 1);
            setTimeout(() => {
              this.$parent.$refs.route.$refs.infoRoute.infoContsFun(this.depotTopContLists[i].short);
            }, 1000);
          }
          // this.$store.commit("changeCodeNameFun", this.depotTopContLists[i].contract_name); // 存下select选中合约的名字
          if (this.$route.path == "/wrap/infoFace/infoFaceChild3") {
            this.$parent.$refs.route.$refs.infoRoute.timeKlineFun(this.depotTopContLists[i].short); // 调用C3中改变选中的合约名
            this.$parent.$refs.route.$refs.infoRoute.initInfoFun(); // 合约信息初始化
          }
          if (this.$route.path == "/wrap/infoFace/infoFaceChild4") {
            this.$parent.$refs.route.$refs.infoRoute.getPointFun(this.depotTopContLists[i].short);
            this.$parent.$refs.route.$refs.infoRoute.infoC4GetKlineFun(this.$store.state.otherCodeName, "D1"); // 获取K线数据
            this.$parent.$refs.route.$refs.infoRoute.getStockDetail(this.$store.state.otherCodeName); // 分笔明细
            this.$parent.$refs.route.$refs.infoRoute.initInfoFun(); // 合约信息初始化
          }
        }
      }
    },
    depotNumSetFun(index) { // 持仓止损止盈数量
      // console.log(index);
      this.msgDepot.depotChoose = index; //判断选择的是止盈还是止损
      this.isTfDepotPriceAlert = true;
    },
    rightDepotFun(index) { // 右键持仓里面的事件
      let that = this;
      let userToken = that.$store.state.tokenStr; // 获取token
      this.isShowRightDepot = false; // 点击之后关闭弹窗
      if (index == 1) {
        // 全清仓
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "all_close",
              token: userToken
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              that.$message.success(res.data.msg);
              that.depotTopContListsFun(); // 持仓刷新
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      } else if (index == 2) {
        // 清多仓
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "all_buy_close",
              token: userToken
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              that.$message.success(res.data.msg);
              that.depotTopContListsFun(); // 持仓刷新
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      } else if (index == 3) {
        // 清空仓
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "all_sell_close",
              token: userToken
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              that.$message.success(res.data.msg);
              that.depotTopContListsFun(); // 持仓刷新
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      } else if (index == 4) {
        // 对价平仓
        that.isTfDepotClosePriceAlert = true;
        this.msgDepotClose.depotTitle = "对价平仓";
        this.msgDepotClose.depotHandTitle = "对价平仓手数";
      } else if (index == 5) {
        // 市价平仓
        that.isTfDepotClosePriceAlert = true;
        this.msgDepotClose.depotTitle = "市价平仓";
        this.msgDepotClose.depotHandTitle = "市价平仓手数";
      } else if (index == 6) {
        // 反手
        if (that.depotOrderListMark == "") {
          that.$message.warning("请选择一条合约");
        } else {
          that
            .$http({
              url: "/",
              method: "post",
              data: {
                nozzle: "backhand_close",
                token: userToken,
                mark: that.depotOrderListMark
              }
            })
            .then(res => {
              if (res.data.code == 1) {
                that.$message.success(res.data.msg);
                that.depotTopContListsFun(); // 持仓刷新
              } else if (res.data.code == 0 || res.data.code == -1) {
                that.$message.error(res.data.msg);
              }
            });
        }
      }
    },
    tfEntrustDblclickFun(index) { // 委托双击撤单
      let that = this;
      let userToken = that.$store.state.tokenStr; // 获取token
      if (that.$store.state.isSysSetDbInput3) {
        // console.log(index);
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "cancel_order",
              token: userToken,
              mark: index
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              // console.log(res.data.data);
              that.$message.success(res.data.msg);
              that.getOrderAllEntrustInfo(0, that.$store.state.codeName); // 刷新委托
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      }
    },
    tfEntrustRightFun(index) { // 委托右键
      for (let i = 0; i < this.entrustBtmContLists.length; i++) {
        if (index == this.entrustBtmContLists[i].id) {
          this.entrustOrderListMark = index;
          this.msgInfo = this.entrustBtmContLists[i]; // 选中的合约信息
        }
      }
      this.isShowRightEntrust = true;
      let totalWidth = this.$refs.tfOrderCont.getBoundingClientRect().width; //总宽度
      let totalHeight = this.$parent.$refs.wrap.getBoundingClientRect().height; //页面总高度
      if (totalWidth - event.pageX < 150) {
        //边缘检测
        if (totalHeight - event.pageY < 196) {
          this.activeLeftEntrust = event.pageX - 150; //给left赋值
          this.activeTopEntrust = totalHeight - 196; //给top赋值
        } else {
          this.activeLeftEntrust = event.pageX - 150; //给left赋值
          this.activeTopEntrust = event.pageY; //给top赋值
        }
      } else {
        if (totalHeight - event.pageY < 196) {
          this.activeLeftEntrust = event.pageX; //给left赋值
          this.activeTopEntrust = totalHeight - 196; //给top赋值
        } else {
          this.activeLeftEntrust = event.pageX; //给left赋值
          this.activeTopEntrust = event.pageY; //给top赋值
        }
      }
    },
    handleCloseEntrust() { // 点击空白关闭委托弹窗
      this.isShowRightEntrust = false;
    },
    rightEntrustFun(index) { // 右键委托里面的事件
      let that = this;
      let userToken = that.$store.state.tokenStr; // 获取token
      this.isShowRightEntrust = false; // 点击之后关闭弹窗
      if (index == 1) {
        // 改价
        that.isTfEntrustPriceAlert = true; // 更改显示隐藏状态
      } else if (index == 2) {
        // 止损预备单
        that.$message.error("止损预备失败");
      } else if (index == 3) {
        // 排队价跟进
        that.$message.error("排队跟单失败");
      } else if (index == 4) {
        // 最新价跟进
        that.$message.error("最新跟单失败");
      } else if (index == 5) {
        // 对手价跟进
        that.$message.error("对手跟单失败");
      } else if (index == 6) {
        // 撤单
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "cancel_order",
              token: userToken,
              mark: that.entrustOrderListMark
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              // console.log(res.data.data);
              that.$message.success(res.data.msg);
              that.getOrderAllEntrustInfo(0, that.$store.state.codeName); // 刷新委托
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      } else if (index == 7) {
        // 全撤
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "all_cancel_order",
              token: userToken,
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              // console.log(res.data.data);
              that.$message.success(res.data.msg);
              that.getOrderAllEntrustInfo(0, that.$store.state.codeName); // 刷新委托
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      }
    },
    tfPrepaidOrderListsFun(index) { // 预埋单点击条约
      for (let i = 0; i < this.prepaidOrderLists.length; i++) {
        if (index == this.prepaidOrderLists[i].mark) {
          this.prepaidOrderListMark = index; //改变背景颜色
        }
      }
    },
    tfPrepaidRightFun(index) { // 预埋单右键
      this.isShowRightPrepaid = true;
      let totalWidth = this.$refs.tfOrderCont.getBoundingClientRect().width; //总宽度
      let totalHeight = this.$parent.$refs.wrap.getBoundingClientRect().height; //页面总高度
      if (totalWidth - event.pageX < 150) {
        //边缘检测
        if (totalHeight - event.pageY < 196) {
          this.activeLeftPrepaid = event.pageX - 150; //给left赋值
          this.activeTopPrepaid = totalHeight - 196; //给top赋值
        } else {
          this.activeLeftPrepaid = event.pageX - 150; //给left赋值
          this.activeTopPrepaid = event.pageY; //给top赋值
        }
      } else {
        if (totalHeight - event.pageY < 196) {
          this.activeLeftPrepaid = event.pageX; //给left赋值
          this.activeTopPrepaid = totalHeight - 196; //给top赋值
        } else {
          this.activeLeftPrepaid = event.pageX; //给left赋值
          this.activeTopPrepaid = event.pageY; //给top赋值
        }
      }
    },
    handleClosePrepaid() { // 点击空白关闭预埋弹窗
      this.isShowRightPrepaid = false;
    },
    rightPrepaidFun(index) { // 右键预埋里面的事件
      let that = this;
      let userToken = that.$store.state.tokenStr; // 获取token
      this.isShowRightPrepaid = false; // 点击之后关闭弹窗
      if (index == 1) {
        // 添加预埋单
        this.$store.commit("isAddPrepaidFun");
      } else if (index == 2) {
        // 发出
        if (that.prepaidOrderListMark == "") {
          that.$message.warning("请选择一条合约");
        } else {
          that
            .$http({
              url: "/",
              method: "post",
              data: {
                nozzle: "send_prepaid_bill",
                token: userToken,
                mark: that.prepaidOrderListMark
              }
            })
            .then(res => {
              if (res.data.code == 1) {
                // console.log(res.data.data);
                that.$message.success(res.data.msg);
                that.prepaidOrderListMark = "";
                that.prepaidOrderListsFun(); // 刷新预埋
              } else if (res.data.code == 0 || res.data.code == -1) {
                that.$message.error(res.data.msg);
              }
            });
        }
      } else if (index == 3) {
        // 发出所有
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "send_all_prepaid_bill",
              token: userToken,
              type: 0 // 0：发送全部 1 发送买单 2 发送卖单
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              // console.log(res.data.data);
              that.$message.success(res.data.msg);
              that.prepaidOrderListsFun(); // 刷新预埋
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      } else if (index == 4) {
        // 删除
        if (that.prepaidOrderListMark == "") {
          that.$message.warning("请选择一条合约");
        } else {
          that
            .$http({
              url: "/",
              method: "post",
              data: {
                nozzle: "del_prepaid_bill",
                token: userToken,
                mark: that.prepaidOrderListMark
              }
            })
            .then(res => {
              if (res.data.code == 1) {
                // console.log(res.data.data);
                that.$message.success(res.data.msg);
                that.prepaidOrderListMark = "";
                that.prepaidOrderListsFun(); // 刷新预埋
              } else if (res.data.code == 0 || res.data.code == -1) {
                that.$message.error(res.data.msg);
              }
            });
        }
      } else if (index == 5) {
        // 删除所有
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "all_prepaid_bill",
              token: userToken,
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              // console.log(res.data.data);
              that.$message.success(res.data.msg);
              that.prepaidOrderListsFun(); // 刷新预埋
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      } else if (index == 6) {
        // 发出所有-买单
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "send_all_prepaid_bill",
              token: userToken,
              type: 1 // 0：发送全部 1 发送买单 2 发送卖单
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              // console.log(res.data.data);
              that.$message.success(res.data.msg);
              that.prepaidOrderListsFun(); // 刷新预埋
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      } else if (index == 7) {
        // 发出所有-卖单
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "send_all_prepaid_bill",
              token: userToken,
              type: 2 // 0：发送全部 1 发送买单 2 发送卖单
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              // console.log(res.data.data);
              that.$message.success(res.data.msg);
              that.prepaidOrderListsFun(); // 刷新预埋
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      }
    },

    tfConditionOrderListsFun(index) { // 条件单点击条约
      for (let i = 0; i < this.conditionOrderLists.length; i++) {
        if (index == this.conditionOrderLists[i].mark) {
          this.conditionOrderListMark = index; //改变背景颜色
          this.$store.state.isAddConditionListinfo = this.conditionOrderLists[i];
        }
      }
    },
    tfConditionRightFun() { // 条件单右键
      this.isShowRightCondition = true;
      let totalWidth = this.$refs.tfOrderCont.getBoundingClientRect().width; //总宽度
      let totalHeight = this.$parent.$refs.wrap.getBoundingClientRect().height; //页面总高度
      if (totalWidth - event.pageX < 150) {
        //边缘检测
        if (totalHeight - event.pageY < 196) {
          this.activeLeftCondition = event.pageX - 150; //给left赋值
          this.activeTopCondition = totalHeight - 196; //给top赋值
        } else {
          this.activeLeftCondition = event.pageX - 150; //给left赋值
          this.activeTopCondition = event.pageY; //给top赋值
        }
      } else {
        if (totalHeight - event.pageY < 196) {
          this.activeLeftCondition = event.pageX; //给left赋值
          this.activeTopCondition = totalHeight - 196; //给top赋值
        } else {
          this.activeLeftCondition = event.pageX; //给left赋值
          this.activeTopCondition = event.pageY; //给top赋值
        }
      }
    },
    handleCloseCondition() { // 点击空白关闭条件弹窗
      this.isShowRightCondition = false;
    },
    rightConditionFun(index) { // 右键条件里面的事件
      let that = this;
      let userToken = that.$store.state.tokenStr; // 获取token
      that.isShowRightCondition = false; // 点击之后关闭弹窗
      if (index == 1) {
        // 添加条件单
        that.$store.commit("isAddConditionFun");
        that.$nextTick(()=>{
          if (that.$store.state.showTface == true) { // 显示的时候调用
            // that.$parent.$refs.addCondition.getOrderOptionListsFun(); // 调用外盘交易中的函数获取交易所列表
            that.$parent.$refs.addCondition.getOrderOneInfoFun(that.$store.state.codeName); // 获取选中的合约的信息
            that.$parent.$refs.addCondition.getOrderTime();
            that.$parent.$refs.addCondition.getOrderSelectListsFun(); // 调用一下合约列表
          }
        });
      } else if (index == 2) {
        // 暂停
        if (that.conditionOrderListMark == "") {
          that.$message.warning("请选择一条合约");
        } else {
          that
            .$http({
              url: "/",
              method: "post",
              data: {
                nozzle: "working_condition_list",
                token: userToken,
                mark: that.conditionOrderListMark
              }
            })
            .then(res => {
              if (res.data.code == 1) {
                // that.$message.success(res.data.msg);
                that.conditionOrderListsFun(0); // 条件单刷新
              } else if (res.data.code == 0 || res.data.code == -1) {
                that.$message.error(res.data.msg);
              }
            });
        }
      } else if (index == 3) {
        // 启动
        if (that.conditionOrderListMark == "") {
          that.$message.warning("请选择一条合约");
        } else {
          that
            .$http({
              url: "/",
              method: "post",
              data: {
                nozzle: "working_condition_list",
                token: userToken,
                mark: that.conditionOrderListMark
              }
            })
            .then(res => {
              if (res.data.code == 1) {
                // that.$message.success(res.data.msg);
                that.conditionOrderListsFun(0); // 条件单刷新
              } else if (res.data.code == 0 || res.data.code == -1) {
                that.$message.error(res.data.msg);
              }
            });
        }
      } else if (index == 4) {
        // 修改
        if (that.conditionOrderListMark == "") {
          that.$message.warning("请选择一条合约");
        } else {
          that.$store.commit("isAddConditionFun");
          that.$store.state.isAddConditionChange = true;
          that.$nextTick(()=>{
            that.$parent.$refs.addCondition.getOrderTime();
            that.$parent.$refs.addCondition.getOrderChangeInfoFun();
          });
        }
      } else if (index == 5) {
        // 删除
        if (that.conditionOrderListMark == "") {
          that.$message.warning("请选择一条合约");
        } else {
          that
            .$http({
              url: "/",
              method: "post",
              data: {
                nozzle: "del_condition_list",
                token: userToken,
                mark: that.conditionOrderListMark
              }
            })
            .then(res => {
              if (res.data.code == 1) {
                // that.$message.success(res.data.msg);
                that.conditionOrderListMark = "";
                that.conditionOrderListsFun(0); // 条件单刷新
              } else if (res.data.code == 0 || res.data.code == -1) {
                that.$message.error(res.data.msg);
              }
            });
        }
      } else if (index == 6) {
        // 立即下单
        if (that.conditionOrderListMark == "") {
          that.$message.warning("请选择一条合约");
        } else {
          that
            .$http({
              url: "/",
              method: "post",
              data: {
                nozzle: "promptly_order",
                token: userToken,
                mark: that.conditionOrderListMark
              }
            })
            .then(res => {
              if (res.data.code == 1) {
                // console.log(res.data.data);
                that.$message.success(res.data.msg);
                that.conditionOrderListsFun(0); // 条件单
              } else if (res.data.code == 0 || res.data.code == -1) {
                that.$message.error(res.data.msg);
              }
            });
        }
      } else if (index == 7) {
        // 取消
      }
    },
    tfLossOrderListsFun(index) { // 止损单点击条约
      for (let i = 0; i < this.lossOrderLists.length; i++) {
        if (index == this.lossOrderLists[i].mark) {
          this.lossOrderListMark = index; //改变背景颜色
        }
      }
    },
    tfLossRightFun() { // 止损单右键
      this.isShowRightLoss = true;
      let totalWidth = this.$refs.tfOrderCont.getBoundingClientRect().width; //总宽度
      let totalHeight = this.$parent.$refs.wrap.getBoundingClientRect().height; //页面总高度
      if (totalWidth - event.pageX < 150) {
        //边缘检测
        if (totalHeight - event.pageY < 168) {
          this.activeLeftLoss = event.pageX - 150; //给left赋值
          this.activeTopLoss = totalHeight - 168; //给top赋值
        } else {
          this.activeLeftLoss = event.pageX - 150; //给left赋值
          this.activeTopLoss = event.pageY; //给top赋值
        }
      } else {
        if (totalHeight - event.pageY < 168) {
          this.activeLeftLoss = event.pageX; //给left赋值
          this.activeTopLoss = totalHeight - 168; //给top赋值
        } else {
          this.activeLeftLoss = event.pageX; //给left赋值
          this.activeTopLoss = event.pageY; //给top赋值
        }
      }
    },
    handleCloseLoss() { // 点击空白关闭止损弹窗
      this.isShowRightLoss = false;
    },
    rightLossFun(index) { // 右键止损里面的事件
      let that = this;
      let userToken = that.$store.state.tokenStr; // 获取token
      this.isShowRightLoss = false; // 点击之后关闭弹窗
      if (index == 1) {
        // 暂停
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "working_loss",
              token: userToken,
              mark: that.lossOrderListMark
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              // console.log(res.data.data);
              that.lossOrderListsFun(); // 止损单
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      } else if (index == 2) {
        // 启用
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "working_loss",
              token: userToken,
              mark: that.lossOrderListMark
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              // console.log(res.data.data);
              that.lossOrderListsFun(); // 止损单
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      } else if (index == 3) {
        // 暂停全部
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "suspend_all_loss",
              token: userToken,
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              // console.log(res.data.data);
              that.lossOrderListsFun(); // 止损单
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      } else if (index == 4) {
        // 启用全部
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "startup_all_loss",
              token: userToken,
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              // console.log(res.data.data);
              that.lossOrderListsFun(); // 止损单
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      } else if (index == 5) {
        // 删除
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "del_loss",
              token: userToken,
              mark: that.lossOrderListMark
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              // console.log(res.data.data);
              that.lossOrderListsFun(); // 止损单
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      } else if (index == 6) {
        // 删除全部
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "del_all_loss",
              token: userToken,
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              // console.log(res.data.data);
              that.lossOrderListsFun(); // 止损单
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      }
    },

    tfRightBtnFun(index) { // 持仓 委托 成交 条件等按钮
      let that = this;
      let userToken = that.$store.state.tokenStr; // 获取token
      //下单右侧
      for (let i = 0; i < that.tfRightBtns.length; i++) {
        if (that.tfRightBtns[i].id == index) {
          that.tfRightBtns[i].isActive = true;
        } else {
          that.tfRightBtns[i].isActive = false;
        }
      }
      that.webBtnId = index; // 推送判断
      that.tfRightBtnMoreActive = false; //样式改变
      this.tfRightBtnMore = false; // 右键隐藏更多弹窗

      if (index == 1) {
        clearInterval(that.tfAllTimer); // 清除计时
        that.getOrderAllDepotInfo(that.$store.state.codeName); // 三合一持仓调用
        that.entrustBtmContListsFun(1); //持仓中委托的内容
      } else if (index == 2) {
        clearInterval(that.tfAllTimer); // 清除计时
        that.webEntrustId = 0;
        that.getOrderAllEntrustInfo(0, that.$store.state.codeName); // 委托
        that.entrustLeftBtnListName = "全部单";
      } else if (index == 3) {
        clearInterval(that.tfAllTimer); // 清除计时
        that.getOrderAllDealInfo(that.$store.state.codeName); // 成交
      } else if (index == 4) {
        clearInterval(that.tfAllTimer); // 清除计时
        that.prepaidOrderListsFun(); // 预埋单
      } else if (index == 5) {
        clearInterval(that.tfAllTimer); // 清除计时
        that.webConditionId = 0;
        that.conditionOrderListsFun(0); // 条件单
        that.left5StateConditionBtnName = "";
      } else if (index == 6) {
        clearInterval(that.tfAllTimer); // 清除计时
        that.lossOrderListsFun() // 止损单
      }
    },
    tfDepotCloseStateFun() { // 持仓平仓子组件传递过来的触发函数
      this.isTfDepotClosePriceAlert = false; // 更改显示隐藏状态
      this.depotTopContListsFun(); //刷新持仓
    },
    tfDepotChangeStateFun() { // 持仓止盈损子组件传递过来的触发函数
      this.isTfDepotPriceAlert = false; // 更改显示隐藏状态
      this.depotTopContListsFun(); //刷新持仓
    },
    tfEntrustLeftBtnListsFun(index) { // 委托 全部单 挂单 已成交 已撤单 状态
      for (let i = 0; i < this.entrustLeftBtnLists.length; i++) {
        if (index == this.entrustLeftBtnLists[i].id) {
          this.entrustLeftBtnListName = this.entrustLeftBtnLists[i].name;
        }
      }
      let that = this;
      let userToken = that.$store.state.tokenStr; // 获取token
      if (index == 1) {
        // 全部单
        // webEntrustId webConditionId
        that.webEntrustId = 0;
        that.getOrderAllEntrustInfo(0, that.$store.state.codeName); // 刷新委托
      } else if (index == 2) {
        // 挂单
        that.webEntrustId = 1;
        that.getOrderAllEntrustInfo(1, that.$store.state.codeName); // 刷新委托
      } else if (index == 3) {
        // 已成交
        that.webEntrustId = 2;
        that.getOrderAllEntrustInfo(2, that.$store.state.codeName); // 刷新委托
      } else if (index == 4) {
        // 已撤单
        that.webEntrustId = 3;
        that.getOrderAllEntrustInfo(3, that.$store.state.codeName); // 刷新委托
      }
      that.websocketonopen();
    },
    tfEntrustOrderListsFun(index) { // 委托 点击条约
      for (let i = 0; i < this.entrustBtmContLists.length; i++) {
        if (index == this.entrustBtmContLists[i].id) {
          this.entrustOrderListMark = index;
          this.msgInfo = this.entrustBtmContLists[i]; // 选中的合约信息
        }
      }
    },
    tfEntrustChangeStateFun() { // 委托子组件传递过来的触发函数
      this.isTfEntrustPriceAlert = false; // 更改显示隐藏状态
      this.entrustBtmContListsFun(0); // 刷新委托
    },
    left5ContTopRightBtnsFun(index) { // 委托下面 改价 撤单 全撤 按钮
      // console.log(index);
      for (let i = 0; i < this.left5ContTopRightBtns.length; i++) {
        if (index == this.left5ContTopRightBtns[i].id) {
          this.left5ContTopRightBtns[i].isClicked = true;
        } else {
          this.left5ContTopRightBtns[i].isClicked = false;
        }
      }
      let that = this;
      let userToken = that.$store.state.tokenStr; // 获取token
      if (index == 1) {
        // 改价
        if (that.entrustOrderListMark == "") {
          that.$message.warning("请选择一条合约");
        } else {
          that.isTfEntrustPriceAlert = true; // 更改显示隐藏状态
        }
      } else if (index == 2) {
        // 撤单
        if (that.entrustOrderListMark == "") {
          that.$message.warning("请选择一条合约");
        } else {
          that
            .$http({
              url: "/",
              method: "post",
              data: {
                nozzle: "cancel_order",
                token: userToken,
                mark: that.entrustOrderListMark
              }
            })
            .then(res => {
              if (res.data.code == 1) {
                // console.log(res.data.data);
                that.$message.success(res.data.msg);
                that.entrustBtmContListsFun(0); // 刷新委托
              } else if (res.data.code == 0 || res.data.code == -1) {
                that.$message.error(res.data.msg);
              }
            });
        }
      } else if (index == 3) {
        // 全撤
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "all_cancel_order",
              token: userToken,
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              // console.log(res.data.data);
              that.$message.success(res.data.msg);
              that.entrustBtmContListsFun(0); // 刷新委托
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      }
    },
    left5StateConditionBtnsFun(index) { // 条件单下面的 未完成 已触发 已删除 按钮
      for (let i = 0; i < this.left5StateConditionBtns.length; i++) {
        if (index == this.left5StateConditionBtns[i].id) {
          this.left5StateConditionBtnName = this.left5StateConditionBtns[i].name;
        }
      }
      if (index == 1) {
        // 未完成
        this.webConditionId = 1;
        this.conditionOrderListsFun(1); // 条件单
      } else if (index == 2) {
        // 已触发
        this.webConditionId = 2;
        this.conditionOrderListsFun(2); // 条件单
      } else if (index == 3) {
        // 已删除
        this.webConditionId = 3;
        this.conditionOrderListsFun(3); // 条件单
      }
      this.websocketonopen();
    },
    left5ContBtmRightTop2RBtnsFun(index) { // 条件单下面的四个按钮
      for (let i = 0; i < this.left5ContBtmRightTop2RBtns.length; i++) {
        if (index == this.left5ContBtmRightTop2RBtns[i].id) {
          this.left5ContBtmRightTop2RBtns[i].isClicked = true;
        } else {
          this.left5ContBtmRightTop2RBtns[i].isClicked = false;
        }
      }
      let that = this;
      let userToken = that.$store.state.tokenStr; // 获取token
      if (index == 1) {
        // 立即下单
        if (that.conditionOrderListMark == "") {
          that.$message.warning("请选择一条合约");
        } else {
          that
            .$http({
              url: "/",
              method: "post",
              data: {
                nozzle: "promptly_order",
                token: userToken,
                mark: that.conditionOrderListMark
              }
            })
            .then(res => {
              if (res.data.code == 1) {
                // console.log(res.data.data);
                that.$message.success(res.data.msg);
                that.conditionOrderListsFun(0); // 条件单
              } else if (res.data.code == 0 || res.data.code == -1) {
                that.$message.error(res.data.msg);
              }
            });
        }
      } else if (index == 2) {
        // 全部暂停
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "suspend_all_condition",
              token: userToken,
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              // console.log(res.data.data);
              that.conditionOrderListsFun(0); // 条件单
              // that.$message.success(res.data.msg);
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      } else if (index == 3) {
        // 全部启动
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "startup_all_condition",
              token: userToken,
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              that.conditionOrderListsFun(0); // 条件单
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      } else if (index == 4) {
        // 全部删除
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "del_all_condition",
              token: userToken,
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              // console.log(res.data.data);
              that.conditionOrderListsFun(0); // 条件单
              // that.$message.success(res.data.msg);
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      }
    },
    left5StateBtmLossLeftBtnsFun(index) { // 止损单下面的 未完成 所有 按钮
      for (let i = 0; i < this.left5StateBtmLossLeftBtns.length; i++) {
        if (index == this.left5StateBtmLossLeftBtns[i].id) {
          this.left5StateBtmLossLeftBtnName = this.left5StateBtmLossLeftBtns[i].name;
        }
      }
      if (index == 1) {
        // 未完成
        let arr = [];
        for (let i = 0; i < this.lossOrderLists.length; i++) {
          if (this.lossOrderLists[i].is_finish == 0) {
            arr.push(this.lossOrderLists[i]);
          }
        }
        this.lossOrderLists = arr;
      } else if (index == 2) {
        // 所有
        this.lossOrderListsFun(); // 获取所有止损单
      }
    },
    left5ContBtmRightTop1RBtnsFun(index) { // 止损单下面的 暂停 启动 删除按钮
      for (let i = 0; i < this.left5ContBtmRightTop1RBtns.length; i++) {
        if (index == this.left5ContBtmRightTop1RBtns[i].id) {
          this.left5ContBtmRightTop1RBtns[i].isClicked = true;
        } else {
          this.left5ContBtmRightTop1RBtns[i].isClicked = false;
        }
      }
      let that = this;
      let userToken = that.$store.state.tokenStr; // 获取token
      if (that.lossOrderListMark == "") {
        that.$message.warning("请选择一条合约");
      } else {
        if (index == 1) {
          that
            .$http({
              url: "/",
              method: "post",
              data: {
                nozzle: "working_loss",
                token: userToken,
                mark: that.lossOrderListMark
              }
            })
            .then(res => {
              if (res.data.code == 1) {
                // console.log(res.data.data);
                that.lossOrderListsFun(); // 止损单
              } else if (res.data.code == 0 || res.data.code == -1) {
                that.$message.error(res.data.msg);
              }
            });
        } else if (index == 2) {
          that
            .$http({
              url: "/",
              method: "post",
              data: {
                nozzle: "working_loss",
                token: userToken,
                mark: that.lossOrderListMark
              }
            })
            .then(res => {
              if (res.data.code == 1) {
                // console.log(res.data.data);
                that.lossOrderListsFun(); // 止损单
              } else if (res.data.code == 0 || res.data.code == -1) {
                that.$message.error(res.data.msg);
              }
            });
        } else if (index == 3) {
          that
            .$http({
              url: "/",
              method: "post",
              data: {
                nozzle: "del_loss",
                token: userToken,
                mark: that.lossOrderListMark
              }
            })
            .then(res => {
              if (res.data.code == 1) {
                // console.log(res.data.data);
                that.lossOrderListsFun(); // 止损单
              } else if (res.data.code == 0 || res.data.code == -1) {
                that.$message.error(res.data.msg);
              }
            });
        }
      }
    },
    tfRightBtnMoreFun() { // 更多...
      this.tfRightBtnMoreActive = true; //样式改变
      if (this.tfRightBtnMore) {
        this.tfRightBtnMore = false;
      } else {
        this.tfRightBtnMore = true;
      }
      // 点击更多其他关闭
      for (let i = 0; i < this.tfRightBtns.length; i++) {
        this.tfRightBtns[i].isActive = false;
      }
    },
    tfRightBtnMoreAlertFun() { // 更多里面的止损开仓
      this.$store.commit("isAddLossFun");
    },
    handleCloseMore() {
      //点击空白关闭更多止损开仓
      this.tfRightBtnMore = false;
    },
    tfBtn7TopFun() {
      // 资金请求查询下面信息默认隐藏
      this.isShowTfBtn7 = true;
      this.updateLast = `最后刷新时间（本地时间): ${new Date().toLocaleTimeString()}`;
      this.userInfoFun(); // 资金 请求查询
    },
    tfBtn7ShowAlertFun() { // 出入金弹出
      this.$store.commit("isSysOnlineMoneyFun");
    },
    // 查询
    tfBtn8List1Fun(index) { // 查询 列表一
      for (let i = 0; i < this.tfBtmContBtn8List1.length; i++) {
        if (index == this.tfBtmContBtn8List1[i].id) {
          this.tfBtmContBtn8List1[i].isClicked = true;
          this.tfBtmContBtn8List1[i].isShowAlert = true;
        } else {
          this.tfBtmContBtn8List1[i].isClicked = false;
        }
      }
      // 列表二颜色全部false
      for (let i = 0; i < this.tfBtmContBtn8List2.length; i++) {
        this.tfBtmContBtn8List2[i].isClicked = false;
      }
      // 列表三颜色全部false
      for (let i = 0; i < this.tfBtmContBtn8List3.length; i++) {
        this.tfBtmContBtn8List3[i].isClicked = false;
      }
      let that = this;
      if (index == 1) {
        // 允许交易的合约
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "trade_contract"
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              // console.log(res.data.data);
              that.tfBtmContBtn8Cont1Lists = res.data.data;
              that.tfBtmContBtn8Cont1Num = res.data.data.length;
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      } else if (index == 2) {
        // 大单边保证金品种
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "single_futures"
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              // console.log(res.data.data);
              that.tfBtmContBtn8Cont2Lists = res.data.data;
              that.tfBtmContBtn8Cont2Num = res.data.data.length;
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      }
    },
    tfBtn8List2Fun(index) { // 查询 列表二
      for (let i = 0; i < this.tfBtmContBtn8List2.length; i++) {
        if (index == this.tfBtmContBtn8List2[i].id) {
          this.tfBtmContBtn8List2[i].isClicked = true;
          this.tfBtmContBtn8List2[i].isShowAlert = true;
        } else {
          this.tfBtmContBtn8List2[i].isClicked = false;
        }
      }
      // 列表一颜色全部false
      for (let i = 0; i < this.tfBtmContBtn8List1.length; i++) {
        this.tfBtmContBtn8List1[i].isClicked = false;
      }
      // 列表三颜色全部false
      for (let i = 0; i < this.tfBtmContBtn8List3.length; i++) {
        this.tfBtmContBtn8List3[i].isClicked = false;
      }
    },
    tfBtn8List3Fun(index) { // 查询 列表三
      for (let i = 0; i < this.tfBtmContBtn8List3.length; i++) {
        if (index == this.tfBtmContBtn8List3[i].id) {
          this.tfBtmContBtn8List3[i].isClicked = true;
          this.tfBtmContBtn8List3[i].isShowAlert = true;
        } else {
          this.tfBtmContBtn8List3[i].isClicked = false;
        }
      }
      // 列表一颜色全部false
      for (let i = 0; i < this.tfBtmContBtn8List1.length; i++) {
        this.tfBtmContBtn8List1[i].isClicked = false;
      }
      // 列表二颜色全部false
      for (let i = 0; i < this.tfBtmContBtn8List2.length; i++) {
        this.tfBtmContBtn8List2[i].isClicked = false;
      }
    },
    tfBtn8HisCont3Fun() { // 历史日结算报表查询按钮
      let that = this;
      let userToken = that.$store.state.tokenStr; // 获取token
      let startTime = that.tfBtn8Cont3StartTime.toLocaleDateString();
      let endTime = that.tfBtn8Cont3EndTime.toLocaleDateString();
      that
        .$http({
          url: "/",
          method: "post",
          data: {
            nozzle: "settlement",
            token: userToken,
            start: startTime,
            end: endTime
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            // console.log(res.data.data);
            that.tfBtmContBtn8Cont3Lists = res.data.data;
            that.$message.success("查询成功");
          } else if (res.data.code == 0 || res.data.code == -1) {
            that.$message.error(res.data.msg);
          }
        });
    },
    tfBtn8HisCont4Fun() { // 历史成交记录查询按钮
      let that = this;
      let userToken = that.$store.state.tokenStr; // 获取token
      let startTime = that.tfBtn8Cont4StartTime.toLocaleDateString();
      let endTime = that.tfBtn8Cont4EndTime.toLocaleDateString();
      that
        .$http({
          url: "/",
          method: "post",
          data: {
            nozzle: "history_deal_log",
            token: userToken,
            start: startTime,
            end: endTime
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            // console.log(res.data.data);
            that.tfBtmContBtn8Cont4Lists = res.data.data;
            that.$message.success("查询成功");
          } else if (res.data.code == 0 || res.data.code == -1) {
            that.$message.error(res.data.msg);
          }
        });
    },
    tfBtn8HisCont5Fun() {
      // 历史委托记录查询按钮
      let that = this;
      let userToken = that.$store.state.tokenStr; // 获取token
      let startTime = that.tfBtn8Cont5StartTime.toLocaleDateString();
      let endTime = that.tfBtn8Cont5EndTime.toLocaleDateString();
      that
        .$http({
          url: "/",
          method: "post",
          data: {
            nozzle: "history_entrust_log",
            token: userToken,
            start: startTime,
            end: endTime
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            that.tfBtmContBtn8Cont5Lists = res.data.data;
            that.$message.success("查询成功");
          } else if (res.data.code == 0 || res.data.code == -1) {
            that.$message.error(res.data.msg);
          }
        });
    },
    tfBtn8HisCont6Fun() {
      // 历史出金流水查询按钮
      let that = this;
      let userToken = that.$store.state.tokenStr; // 获取token
      let startTime = that.tfBtn8Cont6StartTime.toLocaleDateString();
      let endTime = that.tfBtn8Cont6EndTime.toLocaleDateString();
      that
        .$http({
          url: "/",
          method: "post",
          data: {
            nozzle: "withdraw_log",
            token: userToken,
            start: startTime,
            end: endTime
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            that.tfBtmContBtn8Cont6Lists = res.data.data;
            that.$message.success("查询成功");
          } else if (res.data.code == 0 || res.data.code == -1) {
            that.$message.error(res.data.msg);
          }
        });
    },
    tfBtn8HisCont7Fun() {
      // 历史入金流水查询按钮
      let that = this;
      let userToken = that.$store.state.tokenStr; // 获取token
      let startTime = that.tfBtn8Cont7StartTime.toLocaleDateString();
      let endTime = that.tfBtn8Cont7EndTime.toLocaleDateString();
      that
        .$http({
          url: "/",
          method: "post",
          data: {
            nozzle: "recharge_log",
            token: userToken,
            start: startTime,
            end: endTime
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            that.tfBtmContBtn8Cont7Lists = res.data.data;
            that.$message.success("查询成功");
          } else if (res.data.code == 0 || res.data.code == -1) {
            that.$message.error(res.data.msg);
          }
        });
    },
    tfBtn8AlertList1CloseFun(index) {
      // 查询 列表一 弹窗关闭
      for (let i = 0; i < this.tfBtmContBtn8List1.length; i++) {
        if (index == this.tfBtmContBtn8List1[i].id) {
          this.tfBtmContBtn8List1[i].isShowAlert = false;
        }
      }
    },
    tfBtn8AlertList2CloseFun(index) {
      // 查询 列表二 弹窗关闭
      for (let i = 0; i < this.tfBtmContBtn8List2.length; i++) {
        if (index == this.tfBtmContBtn8List2[i].id) {
          this.tfBtmContBtn8List2[i].isShowAlert = false;
        }
      }
    },
    tfBtn8AlertList3CloseFun(index) {
      // 查询 列表三 弹窗关闭
      for (let i = 0; i < this.tfBtmContBtn8List3.length; i++) {
        if (index == this.tfBtmContBtn8List3[i].id) {
          this.tfBtmContBtn8List3[i].isShowAlert = false;
        }
      }
    },
    tfBtn8List2Alert1lFun() {
      // 查询 历史日结算报表
      this.tfBtn8List2Alert1l = true;
      this.tfBtn8List2Alert1r = false;
    },
    tfBtn8List2Alert1rFun() {
      // 查询 历史日结算报表
      this.tfBtn8List2Alert1l = false;
      this.tfBtn8List2Alert1r = true;
    },
    // 三键 六键 传统 下单
    tfBtmThreeOrderSelectFun(index) { // 改变三键六键传统下单select合约名
      if (this.tfRightBtns[0].isActive) {
        clearInterval(this.tfAllTimer); // 清除计时
        this.getOrderAllDepotInfo(index); // 三合一持仓调用
      } else if (this.tfRightBtns[1].isActive) {
        clearInterval(this.tfAllTimer); // 清除计时
        this.getOrderAllEntrustInfo(0, index); // 委托
      } else if (this.tfRightBtns[2].isActive) {
        clearInterval(this.tfAllTimer); // 清除计时
        this.getOrderAllDealInfo(index); // 成交
      } else {
        clearInterval(this.tfAllTimer); // 清除计时
        this.getOrderAllDepotInfo(index); // 三合一持仓调用
      }
      for (let i = 0; i < this.tfBtmThreeOrderOptions.length; i++) {
        if (this.tfBtmThreeOrderOptions[i].contract_name == index) {
          this.$store.commit("changeCodeNameFun", index); // 中文合约名字
          this.$store.commit("symbolNameFun", this.tfBtmThreeOrderOptions[i].contract_short); // 英文合约名字
          this.$store.commit("otherCodeNameFun", this.tfBtmThreeOrderOptions[i].contract_symbols); // 新加的合约名字
          if (this.$route.path == "/wrap/infoFace/infoFaceChild2") {
            this.$parent.$refs.route.$refs.infoRoute.infoC2ChangeCodeNameFun(); // 调用C2中改变选中的合约名
          }
          if (this.$route.path == "/wrap/infoFace/infoFaceChild3") {
            this.$parent.$refs.route.$refs.infoRoute.timeKlineFun(this.$store.state.symbolName); // 调用C3中改变选中的合约名
          }
          if (this.$route.path == "/wrap/infoFace/infoFaceChild4") {
            this.$parent.$refs.route.$refs.infoRoute.getPointFun(this.$store.state.symbolName);
            this.$parent.$refs.route.$refs.infoRoute.infoC4GetKlineFun(this.$store.state.otherCodeName, "D1"); // 获取K线数据
            this.$parent.$refs.route.$refs.infoRoute.getStockDetail(this.$store.state.otherCodeName); // 分笔明细
            this.$parent.$refs.route.$refs.infoRoute.initInfoFun(); // 合约信息初始化
            // this.$parent.$refs.route.$refs.infoRoute.getStockList(this.$store.state.symbolName); // 获取第三方行情
            // this.$parent.$refs.route.$refs.infoRoute.getStockData(this.$store.state.symbolName); // 获取分笔明细
          }
        }
      }
      this.$store.commit("isSubAddFun", true); // 列表切换后重新获取实时价格
      this.websocketonopen(); // 切换合约后推送重新请求
      
    },
    tfOrderPriceBtnsFun(index) {
      // 更多里面的止损开仓右侧按钮
      for (let i = 0; i < this.tfOrderPriceLists.length; i++) {
        if (index == this.tfOrderPriceLists[i].id) {
          this.tfOrderPriceLists[i].isClicked = true;
          this.tfOrderPriceIpt = this.tfOrderPriceLists[i].name;
          this.tfOrderPriceType = this.tfOrderPriceLists[i].name;
          this.$store.commit("isSubAddFun", true); // 点击价格类型重新获获取实时价格
        } else {
          this.tfOrderPriceLists[i].isClicked = false;
        }
      }
    },
    tfOrderPriceSubFun() {
      // 下单 价格 减
      this.$store.commit("isSubAddFun", false); // 点击加减禁止获取实时价格
      if (isNaN(Math.floor(this.tfOrderPriceIpt))) {
        for (let i = 0; i < this.tfOrderPriceLists.length; i++) {
          if (this.tfOrderPriceLists[i].isClicked == true) {
            this.tfOrderPriceIpt = this.tfOrderPriceLists[i].price;
          }
        }
      }
      if (this.tfOrderPriceIpt <= 0) {
        this.tfOrderPriceIpt = 0;
      } else {
        let num;
        if (this.tfOrderSubAddPrice.indexOf(".") == -1) {
          num = 0;
        } else {
          num = Number(this.tfOrderSubAddPrice).toString().split(".")[1].length;
        }
        this.tfOrderOneBuyPrice = (Number(this.tfOrderPriceIpt) - Number(this.tfOrderSubAddPrice)).toFixed(num); // 买的按钮的价格
        this.tfOrderOneSellPrice = (Number(this.tfOrderPriceIpt) - Number(this.tfOrderSubAddPrice)).toFixed(num); // 卖的按钮的价格
        this.tfOrderPriceIpt = (Number(this.tfOrderPriceIpt) - Number(this.tfOrderSubAddPrice)).toFixed(num);
      }
    },
    tfOrderPriceAddFun() {
      // 下单 价格 加
      this.$store.commit("isSubAddFun", false); // 点击加减禁止获取实时价格
      if (isNaN(Math.floor(this.tfOrderPriceIpt))) {
        for (let i = 0; i < this.tfOrderPriceLists.length; i++) {
          if (this.tfOrderPriceLists[i].isClicked == true) {
            this.tfOrderPriceIpt = this.tfOrderPriceLists[i].price;
          }
        }
      }
      let num;
      if (this.tfOrderSubAddPrice.indexOf(".") == -1) {
        num = 0;
      } else {
        num = Number(this.tfOrderSubAddPrice).toString().split(".")[1].length;
      }
      this.tfOrderOneBuyPrice = (Number(this.tfOrderPriceIpt) + Number(this.tfOrderSubAddPrice)).toFixed(num); // 买的按钮的价格
      this.tfOrderOneSellPrice = (Number(this.tfOrderPriceIpt) + Number(this.tfOrderSubAddPrice)).toFixed(num); // 卖的按钮的价格
      this.tfOrderPriceIpt = (Number(this.tfOrderPriceIpt) + Number(this.tfOrderSubAddPrice)).toFixed(num);
    },
    tfOrderNumberSubFun() {
      // 下单 数量 减
      if (this.tfOrderNumberIpt <= 1) {
        this.tfOrderNumberIpt = 1;
      } else {
        this.tfOrderNumberIpt = Math.floor(this.tfOrderNumberIpt) - 1;
      }
    },
    tfOrderNumberAddFun() {
      // 下单 数量 加
      this.tfOrderNumberIpt = Math.floor(this.tfOrderNumberIpt) + 1;
    },
    tfThreeOrderBuySellPingFun(index) { // 三键下单操作
      let that = this;
      let userToken = that.$store.state.tokenStr; // 获取token
      let classify = ""; // 价格类型
      let tfOrderPrice = ""; // 委托价格数字
      if (that.tfOrderPriceIpt == "最新价") {
        classify = 1;
      } else if (that.tfOrderPriceIpt == "对手价") {
        classify = 2;
      } else if (that.tfOrderPriceIpt == "市价") {
        classify = 3;
      } else if (that.tfOrderPriceIpt == "超价") {
        classify = 4;
      } else {
        classify = -1;
      }
      if (isNaN(that.tfOrderPriceIpt)) {
        // 如果价格不是数字就变成数字
        for (let i = 0; i < this.tfOrderPriceLists.length; i++) {
          if (this.tfOrderPriceLists[i].isClicked == true) {
            tfOrderPrice = this.tfOrderPriceLists[i].price;
          }
        }
      } else {
        tfOrderPrice = that.tfOrderPriceIpt;
      }
      // console.log(that.tfOrderPriceType);
      // console.log(that.tfOrderPriceIpt);
      that.disabled = true;
      if (index == 1) {
        // 三键下单 买入
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "trade_open",
              code: that.tfBtmThreeOrderSelect, //合约名字
              price: tfOrderPrice, // 委托价格
              number: that.tfOrderNumberIpt, // 委托数量
              mold: 0, // 开仓类型 0：买涨(买入) 1：买跌(卖出)
              classify: classify, // 价格类型 0： 限价 1：最新价 2：对手价 3：排队价 4:超价
              token: userToken,
            }
          })
          .then(res => {
            that.disabled = false;
            if (res.data.code == 1) {
              clearInterval(that.tfAllTimer); // 清除计时
              that.getOrderAllDepotInfo(that.$store.state.codeName); // 三合一持仓调用
              if (that.tfRightBtns[0].isActive == true) {
                that.depotTopContListsFun(); //刷新 持仓
                that.entrustBtmContListsFun(1); //刷新 委托
              } else if (that.tfRightBtns[1].isActive == true) {
                that.entrustBtmContListsFun(0); //刷新 委托
              } else if (that.tfRightBtns[2].isActive == true) {
                that.tranContListsFun(); //刷新 成交
              }
              that.$message.success(res.data.msg);
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      } else if (index == 2) {
        // 三键下单 卖出
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "trade_open",
              code: that.tfBtmThreeOrderSelect, //合约名字
              price: tfOrderPrice, // 委托价格
              number: that.tfOrderNumberIpt, // 委托数量
              mold: 1, // 开仓类型 0：买涨(买入) 1：买跌(卖出)
              classify: classify, // 价格类型 0： 限价 1：最新价 2：对手价 3：排队价 4:超价
              token: userToken,
            }
          })
          .then(res => {
            that.disabled = false;
            if (res.data.code == 1) {
              clearInterval(that.tfAllTimer); // 清除计时
              that.getOrderAllDepotInfo(that.$store.state.codeName); // 三合一持仓调用
              if (that.tfRightBtns[0].isActive == true) {
                that.depotTopContListsFun(); //刷新 持仓
                that.entrustBtmContListsFun(1); //刷新 委托
              } else if (that.tfRightBtns[1].isActive == true) {
                that.entrustBtmContListsFun(0); //刷新 委托
              } else if (that.tfRightBtns[2].isActive == true) {
                that.tranContListsFun(); //刷新 成交
              }
              that.$message.success(res.data.msg);
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      } else if (index == 3) {
        // 三键下单 平仓
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "close_contract",
              token: userToken,
              code: that.tfBtmThreeOrderSelect, //合约名字
              price: tfOrderPrice, // 委托价格
              number: that.tfOrderNumberIpt, // 委托数量
              classify: classify, // 价格类型 0： 限价 1：最新价 2：对手价 3：排队价 4:超价
              // id: that.depotOrderListMark, // 合约id
            }
          })
          .then(res => {
            that.disabled = false;
            if (res.data.code == 1) {
              clearInterval(that.tfAllTimer); // 清除计时
              that.getOrderAllDepotInfo(that.$store.state.codeName); // 三合一持仓调用
              if (that.tfRightBtns[0].isActive == true) {
                that.depotTopContListsFun(); //刷新 持仓
                that.entrustBtmContListsFun(1); //刷新 委托
              } else if (that.tfRightBtns[1].isActive == true) {
                that.entrustBtmContListsFun(0); //刷新 委托
              } else if (that.tfRightBtns[2].isActive == true) {
                that.tranContListsFun(); //刷新 成交
              }
              that.$message.success(res.data.msg);
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      }
    },
    tfSixOrderBtnsFun(index) { // 六键下单
      let that = this;
      let userToken = that.$store.state.tokenStr; // 获取token
      let classify = ""; // 价格类型
      let tfOrderPrice = ""; // 委托价格数字
      if (that.tfOrderPriceIpt == "排队价") {
        classify = 0;
      } else if (that.tfOrderPriceIpt == "最新价") {
        classify = 1;
      } else if (that.tfOrderPriceIpt == "对手价") {
        classify = 2;
      } else if (that.tfOrderPriceIpt == "市价") {
        classify = 3;
      } else if (that.tfOrderPriceIpt == "超价") {
        classify = 4;
      } else {
        classify = -1;
      }
      if (isNaN(that.tfOrderPriceIpt)) {
        // 如果价格不是数字就变成数字
        for (let i = 0; i < this.tfOrderPriceLists.length; i++) {
          if (this.tfOrderPriceLists[i].isClicked == true) {
            tfOrderPrice = this.tfOrderPriceLists[i].price;
          }
        }
      } else {
        tfOrderPrice = that.tfOrderPriceIpt;
      }
      that.disabled = true;
      if (index == 1) { // 六键下单 买入
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "trade_open",
              code: that.tfBtmThreeOrderSelect, //合约名字
              price: tfOrderPrice, // 委托价格
              number: that.tfOrderNumberIpt, // 委托数量
              mold: 0, // 开仓类型 0：买涨(买入) 1：买跌(卖出)
              classify: classify, // 价格类型 0： 限价 1：最新价 2：对手价 3：排队价 4:超价
              token: userToken,
            }
          })
          .then(res => {
            that.disabled = false;
            if (res.data.code == 1) {
              clearInterval(that.tfAllTimer); // 清除计时
              that.getOrderAllDepotInfo(that.$store.state.codeName); // 三合一持仓调用
              if (that.tfRightBtns[0].isActive == true) {
                that.depotTopContListsFun(); //刷新 持仓
                that.entrustBtmContListsFun(1); //刷新 委托
              } else if (that.tfRightBtns[1].isActive == true) {
                that.entrustBtmContListsFun(0); //刷新 委托
              } else if (that.tfRightBtns[2].isActive == true) {
                that.tranContListsFun(); //刷新 成交
              }
              that.$message.success(res.data.msg);
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      } else if (index == 2) { // 六键下单 全撤
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "all_cancel_contract",
              token: userToken,
              code: that.tfBtmThreeOrderSelect, //合约名字
            }
          })
          .then(res => {
            that.disabled = false;
            if (res.data.code == 1) {
              clearInterval(that.tfAllTimer); // 清除计时
              that.getOrderAllDepotInfo(that.$store.state.codeName); // 三合一持仓调用
              if (that.tfRightBtns[0].isActive == true) {
                that.depotTopContListsFun(); //刷新 持仓
                that.entrustBtmContListsFun(1); //刷新 委托
              } else if (that.tfRightBtns[1].isActive == true) {
                that.entrustBtmContListsFun(0); //刷新 委托
              } else if (that.tfRightBtns[2].isActive == true) {
                that.tranContListsFun(); //刷新 成交
              }
              that.$message.success(res.data.msg);
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      } else if (index == 3) { // 六键下单 卖出
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "trade_open",
              code: that.tfBtmThreeOrderSelect, //合约名字
              price: tfOrderPrice, // 委托价格
              number: that.tfOrderNumberIpt, // 委托数量
              mold: 1, // 开仓类型 0：买涨(买入) 1：买跌(卖出)
              classify: classify, // 价格类型 0： 限价 1：最新价 2：对手价 3：排队价 4:超价
              token: userToken,
            }
          })
          .then(res => {
            that.disabled = false;
            if (res.data.code == 1) {
              clearInterval(that.tfAllTimer); // 清除计时
              that.getOrderAllDepotInfo(that.$store.state.codeName); // 三合一持仓调用
              if (that.tfRightBtns[0].isActive == true) {
                that.depotTopContListsFun(); //刷新 持仓
                that.entrustBtmContListsFun(1); //刷新 委托
              } else if (that.tfRightBtns[1].isActive == true) {
                that.entrustBtmContListsFun(0); //刷新 委托
              } else if (that.tfRightBtns[2].isActive == true) {
                that.tranContListsFun(); //刷新 成交
              }
              that.$message.success(res.data.msg);
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      } else if (index == 4) { // 六键下单 平买
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "trade_close",
              code: that.tfBtmThreeOrderSelect, //合约名字
              price: tfOrderPrice, // 委托价格
              number: that.tfOrderNumberIpt, // 委托数量
              mold: 0, // 开仓类型 0：买涨(买入) 1：买跌(卖出)
              classify: classify, // 价格类型 0： 限价 1：最新价 2：对手价 3：排队价 4:超价
              token: userToken,
            }
          })
          .then(res => {
            that.disabled = false;
            if (res.data.code == 1) {
              clearInterval(that.tfAllTimer); // 清除计时
              that.getOrderAllDepotInfo(that.$store.state.codeName); // 三合一持仓调用
              if (that.tfRightBtns[0].isActive == true) {
                that.depotTopContListsFun(); //刷新 持仓
                that.entrustBtmContListsFun(1); //刷新 委托
              } else if (that.tfRightBtns[1].isActive == true) {
                that.entrustBtmContListsFun(0); //刷新 委托
              } else if (that.tfRightBtns[2].isActive == true) {
                that.tranContListsFun(); //刷新 成交
              }
              that.$message.success(res.data.msg);
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      } else if (index == 5) { // 六键下单 清仓
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "all_close_contract",
              token: userToken,
              code: that.tfBtmThreeOrderSelect, //合约名字
            }
          })
          .then(res => {
            that.disabled = false;
            if (res.data.code == 1) {
              clearInterval(that.tfAllTimer); // 清除计时
              that.getOrderAllDepotInfo(that.$store.state.codeName); // 三合一持仓调用
              if (that.tfRightBtns[0].isActive == true) {
                that.depotTopContListsFun(); //刷新 持仓
                that.entrustBtmContListsFun(1); //刷新 委托
              } else if (that.tfRightBtns[1].isActive == true) {
                that.entrustBtmContListsFun(0); //刷新 委托
              } else if (that.tfRightBtns[2].isActive == true) {
                that.tranContListsFun(); //刷新 成交
              }
              that.$message.success(res.data.msg);
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      } else if (index == 6) { // 六键下单 平卖
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "trade_close",
              code: that.tfBtmThreeOrderSelect, //合约名字
              price: tfOrderPrice, // 委托价格
              number: that.tfOrderNumberIpt, // 委托数量
              mold: 1, // 开仓类型 0：买涨(买入) 1：买跌(卖出)
              classify: classify, // 价格类型 0： 限价 1：最新价 2：对手价 3：排队价 4:超价
              token: userToken,
            }
          })
          .then(res => {
            that.disabled = false;
            if (res.data.code == 1) {
              clearInterval(that.tfAllTimer); // 清除计时
              that.getOrderAllDepotInfo(that.$store.state.codeName); // 三合一持仓调用
              if (that.tfRightBtns[0].isActive == true) {
                that.depotTopContListsFun(); //刷新 持仓
                that.entrustBtmContListsFun(1); //刷新 委托
              } else if (that.tfRightBtns[1].isActive == true) {
                that.entrustBtmContListsFun(0); //刷新 委托
              } else if (that.tfRightBtns[2].isActive == true) {
                that.tranContListsFun(); //刷新 成交
              }
              that.$message.success(res.data.msg);
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      }
    },
    tfFourOrderBuyFun() {
      // 传统下单 买入按钮
      this.tfFourOrderBuySell = this.tfFourOrderBuy;
    },
    tfFourOrderSellFun() {
      // 传统下单 卖出按钮
      this.tfFourOrderBuySell = this.tfFourOrderSell;
    },
    tfFourOrderOpenFun() {
      // 传统下单 开仓按钮
      this.tfFourOrderOpenPing = this.tfFourOrderOpen;
    },
    tfFourOrderPingFun() {
      // 传统下单 平仓按钮
      this.tfFourOrderOpenPing = this.tfFourOrderPing;
    },
    tfFourOrderStartFun() {
      // 传统下单 开始下单
      let that = this;
      let userToken = that.$store.state.tokenStr; // 获取token
      let classify = ""; // 价格类型
      let tfOrderPrice = ""; // 委托价格数字
      if (that.tfOrderPriceIpt == "排队价") {
        classify = 0;
      } else if (that.tfOrderPriceIpt == "最新价") {
        classify = 1;
      } else if (that.tfOrderPriceIpt == "对手价") {
        classify = 2;
      } else if (that.tfOrderPriceIpt == "市价") {
        classify = 3;
      } else if (that.tfOrderPriceIpt == "超价") {
        classify = 4;
      } else {
        classify = -1;
      }
      if (isNaN(that.tfOrderPriceIpt)) {
        // 如果价格不是数字就变成数字
        for (let i = 0; i < this.tfOrderPriceLists.length; i++) {
          if (this.tfOrderPriceLists[i].isClicked == true) {
            tfOrderPrice = this.tfOrderPriceLists[i].price;
          }
        }
      } else {
        tfOrderPrice = that.tfOrderPriceIpt;
      }
      // console.log(that.tfBtmThreeOrderSelect, tfOrderPrice, that.tfOrderNumberIpt, classify);
      if (that.tfFourOrderBuySell == "买入" && that.tfFourOrderOpenPing == "开仓") {
        that
        .$http({
          url: "/",
          method: "post",
          data: {
            nozzle: "trade_open",
            code: that.tfBtmThreeOrderSelect, //合约名字
            price: tfOrderPrice, // 委托价格
            number: that.tfOrderNumberIpt, // 委托数量
            mold: 0, // 开仓类型 0：买涨(买入) 1：买跌(卖出)
            classify: classify, // 价格类型 0： 限价 1：最新价 2：对手价 3：排队价 4:超价
            token: userToken,
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            clearInterval(that.tfAllTimer); // 清除计时
            that.getOrderAllDepotInfo(that.$store.state.codeName); // 三合一持仓调用
            if (that.tfRightBtns[0].isActive == true) {
              that.depotTopContListsFun(); //刷新 持仓
              that.entrustBtmContListsFun(1); //刷新 委托
            } else if (that.tfRightBtns[1].isActive == true) {
              that.entrustBtmContListsFun(0); //刷新 委托
            } else if (that.tfRightBtns[2].isActive == true) {
              that.tranContListsFun(); //刷新 成交
            }
            that.$message.success(res.data.msg);
          } else if (res.data.code == 0 || res.data.code == -1) {
            that.$message.error(res.data.msg);
          }
        });
      } else if (that.tfFourOrderBuySell == "卖出" && that.tfFourOrderOpenPing == "开仓") {
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "trade_open",
              code: that.tfBtmThreeOrderSelect, //合约名字
              price: tfOrderPrice, // 委托价格
              number: that.tfOrderNumberIpt, // 委托数量
              mold: 1, // 开仓类型 0：买涨(买入) 1：买跌(卖出)
              classify: classify, // 价格类型 0： 限价 1：最新价 2：对手价 3：排队价 4:超价
              token: userToken,
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              clearInterval(that.tfAllTimer); // 清除计时
              that.getOrderAllDepotInfo(that.$store.state.codeName); // 三合一持仓调用
              if (that.tfRightBtns[0].isActive == true) {
                that.depotTopContListsFun(); //刷新 持仓
                that.entrustBtmContListsFun(1); //刷新 委托
              } else if (that.tfRightBtns[1].isActive == true) {
                that.entrustBtmContListsFun(0); //刷新 委托
              } else if (that.tfRightBtns[2].isActive == true) {
                that.tranContListsFun(); //刷新 成交
              }
              that.$message.success(res.data.msg);
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      } else if (that.tfFourOrderBuySell == "买入" && that.tfFourOrderOpenPing == "平仓") {
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "trade_close",
              code: that.tfBtmThreeOrderSelect, //合约名字
              price: tfOrderPrice, // 委托价格
              number: that.tfOrderNumberIpt, // 委托数量
              mold: 0, // 开仓类型 0：买涨(买入) 1：买跌(卖出)
              classify: classify, // 价格类型 0： 限价 1：最新价 2：对手价 3：排队价 4:超价
              token: userToken,
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              clearInterval(that.tfAllTimer); // 清除计时
              that.getOrderAllDepotInfo(that.$store.state.codeName); // 三合一持仓调用
              if (that.tfRightBtns[0].isActive == true) {
                that.depotTopContListsFun(); //刷新 持仓
                that.entrustBtmContListsFun(1); //刷新 委托
              } else if (that.tfRightBtns[1].isActive == true) {
                that.entrustBtmContListsFun(0); //刷新 委托
              } else if (that.tfRightBtns[2].isActive == true) {
                that.tranContListsFun(); //刷新 成交
              }
              that.$message.success(res.data.msg);
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      } else if (that.tfFourOrderBuySell == "卖出" && that.tfFourOrderOpenPing == "平仓") {
        that
          .$http({
            url: "/",
            method: "post",
            data: {
              nozzle: "trade_close",
              code: that.tfBtmThreeOrderSelect, //合约名字
              price: tfOrderPrice, // 委托价格
              number: that.tfOrderNumberIpt, // 委托数量
              mold: 1, // 开仓类型 0：买涨(买入) 1：买跌(卖出)
              classify: classify, // 价格类型 0： 限价 1：最新价 2：对手价 3：排队价 4:超价
              token: userToken,
            }
          })
          .then(res => {
            if (res.data.code == 1) {
              clearInterval(that.tfAllTimer); // 清除计时
              that.getOrderAllDepotInfo(that.$store.state.codeName); // 三合一持仓调用
              if (that.tfRightBtns[0].isActive == true) {
                that.depotTopContListsFun(); //刷新 持仓
                that.entrustBtmContListsFun(1); //刷新 委托
              } else if (that.tfRightBtns[1].isActive == true) {
                that.entrustBtmContListsFun(0); //刷新 委托
              } else if (that.tfRightBtns[2].isActive == true) {
                that.tranContListsFun(); //刷新 成交
              }
              that.$message.success(res.data.msg);
            } else if (res.data.code == 0 || res.data.code == -1) {
              that.$message.error(res.data.msg);
            }
          });
      }
    }
  },
  beforeDestroy() {
    //在开始销毁实例时调用。此时实例仍然有功能。
    //清除定时器
    clearInterval(this.tfAllTimer);
    this.tfAllTimerBoole = false;
    // console.log("beforeDestroy");

    clearInterval(this.infoOutWebSocketTimer); // 推送计时器
    this.websocketBoolean = false;
    this.websock.close() //离开路由之后断开websocket连接
  },
  destroyed() {
    //在实例被销毁之后调用。此时所有的绑定和实例的指令已经解绑，注意是解绑不是销毁,所有的子实例也已经被销毁。
    //清除定时器
    clearInterval(this.tfAllTimer);
    // console.log("destroyed");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("../assets/css/transactface.css");
/* 不显示右下角拖动 */
/* @import url("../../node_modules/jquery-ui/themes/base/resizable.css"); */
/* 显示右下角拖动 */
@import url("../../node_modules/jquery-ui/themes/base/all.css");
</style>
