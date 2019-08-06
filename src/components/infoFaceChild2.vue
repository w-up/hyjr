<template>
  <div class="infoface2wrap">
    <div class="infoface2" ref="infoface2">
      <ul class="info_c2_top_ul">
        <li
          class="info_c2_top_li"
          v-for="infoBtn in infoTopBtns"
          :key="infoBtn.id"
          @click="infoTopBtnFun(infoBtn.id, infoBtn.type)"
          :class="{info_c2_top_li_active: infoTopBtnsActiveName == infoBtn.id}"
        >{{infoBtn.short}}</li>
      </ul>
      <div
        class="info_c2_table_wrap"
        v-loading="loading"
        element-loading-text
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <table class="info_c2_table" border="0" cellspacing="0" cellpadding="0">
          <thead>
            <tr>
              <th v-for="infoTop in infoTopLists" :key="infoTop.id">{{infoTop.name}}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              @click.left="infoContsFun(infoCont.contract_short, infoCont.contract_symbols)"
              @dblclick="dbInfoContsKlineFun(infoCont.contract_short, infoCont.contract_symbols)"
              @click.right="infoC2RightMenuFun(infoCont.contract_short, infoCont.contract_symbols)"
              v-for="infoCont in infoConts"
              :key="infoCont.id"
              :class="{info_c2_cont_tr_active: infoContsActiveName == infoCont.contract_short}"
            >
              <!-- 交易所 -->
              <td>{{infoCont.exchange}}</td>
              <!-- 合约 -->
              <td>{{infoCont.contract_short}}</td>
              <!-- 合约名 -->
              <td>{{infoCont.contract_name}}</td>
              <!-- 最新价 -->
              <td
                :class="{green_color:infoCont.up_ratio<0, red_color:infoCont.up_ratio>=0, activeC2Color: infoCont.infoC2ActiveNew}"
              >{{infoCont.current_price}}</td>
              <!-- 现手 -->
              <td>{{infoCont.current_number}}</td>
              <!-- 买价 -->
              <td
                :class="{green_color:infoCont.up_ratio<0, red_color:infoCont.up_ratio>=0, activeC2Color: infoCont.infoC2ActiveBuy}"
              >{{infoCont.bid1_price}}</td>
              <!-- 卖价 -->
              <td
                :class="{green_color:infoCont.up_ratio<0, red_color:infoCont.up_ratio>=0, activeC2Color: infoCont.infoC2ActiveSell}"
              >{{infoCont.ask1_price}}</td>
              <!-- 买量 -->
              <td>{{infoCont.bid1_volume}}</td>
              <!-- 卖量 -->
              <td>{{infoCont.ask1_volume}}</td>
              <!-- 成交量 -->
              <td :class="infoCont.up_ratio<0?'green_color':'red_color'">{{infoCont.volume}}</td>
              <!-- 涨跌 -->
              <td
                :class="{green_color:infoCont.up_ratio<0, red_color:infoCont.up_ratio>=0, activeC2Color: infoCont.infoC2ActiveUpNum}"
              >{{infoCont.up_num}}</td>
              <!-- 涨幅 -->
              <td
                :class="{green_color:infoCont.up_ratio<0, red_color:infoCont.up_ratio>=0, activeC2Color: infoCont.infoC2ActiveUpRatio}"
              >{{infoCont.up_ratio}}</td>
              <!-- 持仓量 -->
              <td>{{infoCont.turnover}}</td>
              <!-- 更新时间 -->
              <td>{{infoCont.dateTime}}</td>
              <!-- 开盘 -->
              <td :class="infoCont.up_ratio<0?'green_color':'red_color'">{{infoCont.open_price}}</td>
              <!-- 最高价 -->
              <td :class="infoCont.up_ratio<0?'green_color':'red_color'">{{infoCont.high_price}}</td>
              <!-- 最低价 -->
              <td>{{infoCont.low_price}}</td>
              <!-- 昨收 -->
              <td>{{infoCont.p_close}}</td>
              <!-- 品种 -->
              <td>{{infoCont.future_code}}</td>
              <!-- 品种名 -->
              <td>{{infoCont.future}}</td>
              <!-- 报价货币 -->
              <td>{{infoCont.future_currency}}</td>
              <!-- 小数位 -->
              <td>{{infoCont.future_price}}</td>
              <!-- 每手乘数 -->
              <td>{{infoCont.future_value}}</td>
              <!-- 最小变化数 -->
              <td>{{infoCont.future_wave_spot}}</td>
              <!-- 报价单位 -->
              <td>{{infoCont.future_unit}}</td>
              <!-- 最后交易日 -->
              <td>{{infoCont.end_time}}</td>
              <!-- 交易所合约 -->
              <td>{{infoCont.exchange}}</td>
              <!-- 系统码 -->
              <!-- <td></td> -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- 鼠标右键 -->
    <div
      v-clickoutside="handleCloseTfC2Menu"
      class="tf_right_menu"
      v-show="isShowTfC2Menu"
      v-bind:style="{ top: activeTopMenu + 'px', left: activeLeftMenu + 'px' }"
    >
      <ul class="tf_right_menu_ul">
        <li
          class="tf_right_menu_li"
          @click="infoC2MenuChooseFun()"
          v-show="infoC2MenuChooseShow"
        >添加到我的自选</li>
        <li
          class="tf_right_menu_li"
          @click="infoC2MenuChooseFun()"
          v-show="!infoC2MenuChooseShow"
        >移除自选</li>
      </ul>
    </div>
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
export default {
  //name: "",
  components: {},
  data() {
    return {
      loading: true,
      isShowTfC2Menu: false, // 右键菜单默认隐藏
      activeTopMenu: 0, // 初始位置
      activeLeftMenu: 0, // 初始位置
      infoTopBtns: [], // 交易所
      infoTopLists: [
        { id: 1, name: "交易所", isclicked: true },
        { id: 2, name: "合约", isclicked: false },
        { id: 3, name: "合约名", isclicked: false },
        { id: 4, name: "最新价", isclicked: false },
        { id: 5, name: "现手", isclicked: false },
        { id: 6, name: "买价", isclicked: false },
        { id: 7, name: "卖价", isclicked: false },
        { id: 8, name: "买量", isclicked: false },
        { id: 9, name: "卖量", isclicked: false },
        { id: 10, name: "成交量", isclicked: false },
        { id: 11, name: "涨跌", isclicked: false },
        { id: 12, name: "涨幅", isclicked: false },
        { id: 13, name: "持仓量", isclicked: false },
        { id: 14, name: "更新时间", isclicked: false },
        { id: 15, name: "开盘", isclicked: false },
        { id: 16, name: "最高价", isclicked: false },
        { id: 17, name: "最低价", isclicked: false },
        { id: 18, name: "昨收", isclicked: false },
        { id: 19, name: "品种", isclicked: false },
        { id: 20, name: "品种名", isclicked: false },
        { id: 21, name: "报价货币", isclicked: false },
        { id: 22, name: "小数位", isclicked: false },
        { id: 23, name: "每手乘数", isclicked: false },
        { id: 24, name: "最小变化数", isclicked: false },
        { id: 25, name: "报价单位", isclicked: false },
        { id: 26, name: "最后交易日", isclicked: false },
        { id: 27, name: "交易所合约", isclicked: false }
        // { id: 28, name: "系统码", isclicked: false }
      ],
      // infoClickTopBtnsFun: "", // 点击交易所按钮 获取合约函数
      infoClickTopBtnsId: 0, //交易所id
      infoClickTopBtnsType: 0, //交易所类型
      infoConts: [], // 合约内容列表
      infoTopBtnsActiveName: "",
      infoContsActiveName: "",
      infoFaceC1Lists: [], // 加入自选
      infoC2MenuChooseShow: true, // 加入自选/移除自选
      infoC2GetCurTimer: "", // 获取合约计时器
      infoC2GetCurTimerBoole: true, // 获取合约计时器暂停
      infoC2ChangeCodeNameFun: "", // 改变C2里面的选中的合约
      websock: null, // 推送
      websocketBoolean: true, // 手动断开
      infoC2WebSocketTimer: "", // 推送计时器

      symbolList: "" // 请求第三方的行情
    };
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
      for (let i = 0; i < that.infoConts.length; i++) {
        if (that.infoConts[i].contract_symbols == val[2]) {
          if (Number(val[3]).toFixed(that.infoConts[i].future_price) != that.infoConts[i].current_price) { // 比较最新价
            that.infoConts[i].infoC2ActiveNew = true;
          } else {
            that.infoConts[i].infoC2ActiveNew = false;
          }
          if (Number(val[6]).toFixed(that.infoConts[i].future_price) != that.infoConts[i].bid1_price) { // 比较买价
            that.infoConts[i].infoC2ActiveBuy = true;
          } else {
            that.infoConts[i].infoC2ActiveBuy = false;
          }
          if (Number(val[7]).toFixed(that.infoConts[i].future_price) != that.infoConts[i].ask1_price) {  // 比较卖价
            that.infoConts[i].infoC2ActiveSell = true;
          } else {
            that.infoConts[i].infoC2ActiveSell = false;
          }
          if (Number(val[3] - val[14]).toFixed(that.infoConts[i].future_price) != that.infoConts[i].up_num) { // 比较涨跌
            that.infoConts[i].infoC2ActiveUpNum = true;
          } else {
            that.infoConts[i].infoC2ActiveUpNum = false;
          }
          if (Number((val[3] - val[14]) / val[14] * 100).toFixed(2) != that.infoConts[i].up_ratio) { // 比较涨幅
            that.infoConts[i].infoC2ActiveUpRatio = true;
          } else {
            that.infoConts[i].infoC2ActiveUpRatio = false;
          }

          that.infoConts[i].current_price = Number(val[3]).toFixed(that.infoConts[i].future_price); // 最新价
          that.infoConts[i].current_number = val[5]; // 现手
          that.infoConts[i].bid1_price = Number(val[6]).toFixed(that.infoConts[i].future_price); // 买价
          that.infoConts[i].ask1_price = Number(val[7]).toFixed(that.infoConts[i].future_price); // 卖价
          that.infoConts[i].bid1_volume = val[8]; // 买量
          that.infoConts[i].ask1_volume = val[9]; // 卖量
          that.infoConts[i].volume = Number(val[10]).toFixed(that.infoConts[i].future_price); // 成交量
          that.infoConts[i].up_num = Number(val[3] - val[14]).toFixed(that.infoConts[i].future_price); // 涨跌
          that.infoConts[i].up_ratio = Number((val[3] - val[14]) / val[14] * 100).toFixed(2); // 涨幅
          if (val[15] != "----") {
            that.infoConts[i].turnover = Number(val[15]).toFixed(that.infoConts[i].future_price); // 持仓量
          } else {
            that.infoConts[i].turnover = val[15]; // 持仓量
          }
          that.infoConts[i].dateTime = that.timesToTime(val[4]); // 更新时间
          that.infoConts[i].open_price = Number(val[11]).toFixed(that.infoConts[i].future_price); // 开盘
          that.infoConts[i].high_price = Number(val[12]).toFixed(that.infoConts[i].future_price); // 最高价
          that.infoConts[i].low_price = Number(val[13]).toFixed(that.infoConts[i].future_price); // 最低价
          that.infoConts[i].p_close = Number(val[14]).toFixed(that.infoConts[i].future_price); // 昨收
        }
      }
      // if (sessionStorage.getItem("conLists")) {
      //   let contractLists = JSON.parse(sessionStorage.getItem("conLists"));
      //   for (let i = 0; i < contractLists.length; i++) {
      //     if (contractLists[i].current_price != that.infoConts[i].current_price) { // 比较最新价
      //       that.infoConts[i].infoC2ActiveNew = true;
      //     } else {
      //       that.infoConts[i].infoC2ActiveNew = false;
      //     }
      //     if (contractLists[i].bid1_price != that.infoConts[i].bid1_price) { // 比较买价
      //       that.infoConts[i].infoC2ActiveBuy = true;
      //     } else {
      //       that.infoConts[i].infoC2ActiveBuy = false;
      //     }
      //     if (contractLists[i].ask1_price != that.infoConts[i].ask1_price) {  // 比较卖价
      //       that.infoConts[i].infoC2ActiveSell = true;
      //     } else {
      //       that.infoConts[i].infoC2ActiveSell = false;
      //     }
      //     if (contractLists[i].up_num != that.infoConts[i].up_num) { // 比较涨跌
      //       that.infoConts[i].infoC2ActiveUpNum = true;
      //     } else {
      //       that.infoConts[i].infoC2ActiveUpNum = false;
      //     }
      //     if (contractLists[i].up_ratio != that.infoConts[i].up_ratio) { // 比较涨幅
      //       that.infoConts[i].infoC2ActiveUpRatio = true;
      //     } else {
      //       that.infoConts[i].infoC2ActiveUpRatio = false;
      //     }
      //   }
      // }
      // if (that.$store.state.isFocus) {
      //   sessionStorage.setItem("conLists", JSON.stringify(that.infoConts));
      // }
    }
  },
  created() {
    // this.initWebSocket();
  },
  mounted: function() {
    let that = this;
    if (that.$store.state.isloginDisclaimer == true) {
      that.loading = false;
    }
    that
      .$http({
        //交易所名字
        url: "/",
        method: "post",
        data: {
          nozzle: "query_exchange"
        }
      })
      .then(res => {
        if (res.data.code == 1) {
          that.infoTopBtns = res.data.data; // 交易所名字
          that.infoTopBtns.unshift({
            id: 0,
            short: "主力合约",
            type: 0
          });
          that.infoTopBtnsActiveName = that.$store.state.exchangeId; // 进入判断选中交易所的id
        } else if (res.data.code == 0 || res.data.code == -1) {
          that.$message.error(res.data.msg);
        }
      });
    sessionStorage.removeItem("conLists");
    // 进入判断交易所的请求列表
    that.infoClickTopBtnsId = that.$store.state.exchangeId; //交易所id
    that.infoClickTopBtnsType = that.$store.state.contractTyle; //交易所类型
    that.infoContsActiveName = that.$store.state.symbolName; // 合约名字

    that.infoClickTopBtnsFun(
      that.infoClickTopBtnsId,
      that.infoClickTopBtnsType
    ); // 交易所信息初始化
    that.infoC2ChangeCodeNameFun = function() {
      // 其他地方调用
      that.infoContsActiveName = that.$store.state.symbolName; // 合约名字
    };
    // that.infoC2GetCurTimer = setInterval(() => {
    //   that.getStockList(that.symbolList);
    // }, 3000000);
    that.getStockList(that.symbolList); //初始化信息
  },
  methods: {
    infoClickTopBtnsFun(id, typeNum) {
      //点击按钮获取交易所合约内容
      let that = this;
      that.loading = true;
      that
        .$http({
          url: "/",
          method: "post",
          timeout: 10000,
          data: {
            nozzle: "query_home",
            type: typeNum,
            exchange_id: id
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            // clearInterval(that.infoC2GetCurTimer);
            that.loading = false;
            that.infoConts = res.data.data.contract; // 合约
            // console.log(that.infoConts);
            that.symbolList = "";
            for (let i = 0; i < that.infoConts.length; i++) {
              that.symbolList += that.infoConts[i].contract_short + ",";
            }
            that.symbolList = that.symbolList.substring(0, that.symbolList.length - 1);
            // http://dt.cnshuhai.com/stock.php?u=17335495235&symbol=BS&type=stock
            // console.log(that.symbolList);
            that.getStockList(that.symbolList);
            if (id != sessionStorage.getItem("infoTopBtnId")) {
              sessionStorage.removeItem("conLists"); // 每次切换交易所删除缓存
            }
            if (!that.$store.state.symbolName) {
              that.$store.commit(
                "symbolNameFun",
                that.infoConts[0].contract_short
              ); // 默认的合约名字
              that.$store.commit(
                "otherCodeNameFun",
                that.infoConts[0].contract_symbols
              ); // 新添加合约名字
              that.infoContsActiveName = that.infoConts[0].contract_short; // 第一次进入默认选中的合约
            }
            if (that.infoC2GetCurTimerBoole) {
              if (that.$store.state.isFocus) {
                // console.log("C2");
                sessionStorage.setItem(
                  "conLists",
                  JSON.stringify(that.infoConts)
                );
                sessionStorage.setItem("infoTopBtnId", id);
              }
            }
            // console.log(that.infoConts);
          } else if (res.data.code == 0 || res.data.code == -1) {
            that.$message.error(res.data.msg);
          }
        });
    },
    timesToTime(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "/";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "/";
      var D = date.getDate() + "/";
      if (date.getHours() < 10) {
        var h = "0" + date.getHours() + ":";
      } else {
        var h = date.getHours() + ":";
      }
      if (date.getMinutes() < 10) {
        var m = "0" + date.getMinutes() + ":";
      } else {
        var m = date.getMinutes() + ":";
      }
      if (date.getSeconds() < 10) {
        var s = "0" + date.getSeconds();
      } else {
        var s = date.getSeconds();
      }
      // var s = date.getSeconds();
      // if (s == 0) {
      //   s = "00";
      // }
      return h + m + s;
    },
    getStockList(symbol) {
      // 获取第三方行情
      let that = this;
      http://47.110.12.144:8181/?symbol=IFML&k=M1&kcount=1000
      $.ajax({
        url:
          "http://dt.cnshuhai.com/stock.php?u=17335495235&symbol=" + symbol + "&type=stock",
        type: "GET",
        dataType: "json",
        cache: true,
        success: function(data) {
          for (let i = 0; i < that.infoConts.length; i++) {
            for (let j = 0; j < data.length; j++) {
              if (that.infoConts[i].contract_short == data[j].Symbol) {
                that.infoConts[i].current_price = data[j].NewPrice; // 最新价
                that.infoConts[i].current_number = data[j].Vol2; // 现手
                that.infoConts[i].bid1_price = data[j].BP1; // 买价
                that.infoConts[i].ask1_price = data[j].SP1; // 卖价
                that.infoConts[i].bid1_volume = data[j].BV1; // 买量
                that.infoConts[i].ask1_volume = data[j].SV1; // 卖量
                that.infoConts[i].volume = data[j].Volume; // 成交量
                that.infoConts[i].up_num = (
                  parseFloat(data[j].NewPrice) - parseFloat(data[j].LastClose)
                ).toFixed(that.infoConts[i].future_price); // 涨跌
                that.infoConts[i].up_ratio = data[j].PriceChangeRatio.toFixed(2); // 涨幅
                that.infoConts[i].turnover = data[j].Open_Int; // 持仓量
                that.infoConts[i].dateTime = that.timesToTime(data[j].Date); // 更新时间
                that.infoConts[i].open_price = data[j].Open; // 开盘
                that.infoConts[i].high_price = data[j].High; // 最高价
                that.infoConts[i].low_price = data[j].Low; // 最低价
                that.infoConts[i].p_close = data[j].LastClose; // 昨收
              }
            }
          }
          // console.log(JSON.parse(JSON.stringify(that.infoConts)));
          if (
            that.infoClickTopBtnsId != sessionStorage.getItem("infoTopBtnId")
          ) {
            sessionStorage.removeItem("conLists"); // 每次切换交易所删除缓存
          }
          if (!that.$store.state.symbolName) {
            that.$store.commit(
              "symbolNameFun",
              that.infoConts[0].contract_short
            ); // 默认的合约名字
            that.$store.commit(
              "otherCodeNameFun",
              that.infoConts[0].contract_symbols
            ); // 新添加合约名字
            that.infoContsActiveName = that.infoConts[0].contract_short; // 第一次进入默认选中的合约
          }
          that.$store.commit("symbolListsFun", that.infoConts);
          // console.log(that.$store.state.symbolLists);
        }
      });
    },
    handleCloseTfC2Menu(e) {
      // 点击空白部分关闭右键
      this.isShowTfC2Menu = false;
    },
    infoC2RightMenuFun(index, otherName) {
      // 右键弹出菜单
      this.isShowTfC2Menu = true;
      let totalWidth = this.$refs.infoface2.getBoundingClientRect().right; //总宽度
      if (totalWidth - event.pageX < 150) {
        //边缘检测
        this.activeLeftMenu = event.pageX - 150; //给left赋值
        this.activeTopMenu = event.pageY; //给top赋值
      } else {
        this.activeLeftMenu = event.pageX + 1; //给left赋值
        this.activeTopMenu = event.pageY + 1; //给top赋值
      }

      for (let i = 0; i < this.infoConts.length; i++) {
        if (this.infoConts[i].contract_short == index) {
          this.infoContsActiveName = index;
          let localStrToArr = [];
          if (localStorage.getItem("infoFaceC1Lists")) {
            //第一次右键还没有
            localStrToArr = JSON.parse(localStorage.getItem("infoFaceC1Lists")); // 先取出来判断
            let result = localStrToArr.findIndex(item => {
              return item.contract_short == this.infoConts[i].contract_short;
            });
            if (result != -1) {
              this.infoC2MenuChooseShow = false;
            } else {
              this.infoC2MenuChooseShow = true;
            }
          }
        }
      }
    },
    infoC2MenuChooseFun() {
      // 右键菜单中 加入自选
      let that = this;
      for (let i = 0; i < that.infoConts.length; i++) {
        if (that.infoConts[i].contract_short == that.infoContsActiveName) {
          if (localStorage.getItem("infoFaceC1Lists")) {
            // 缓存中存在自选
            let localStrToArr = JSON.parse(
              localStorage.getItem("infoFaceC1Lists")
            ); // 先取出来判断
            let result = localStrToArr.findIndex(item => {
              return item.contract_short == that.infoConts[i].contract_short;
            });
            if (result != -1) {
              // 右键菜单中 移除自选
              that.infoFaceC1Lists = JSON.parse(
                localStorage.getItem("infoFaceC1Lists")
              ); // 先从缓存取出
              that.infoFaceC1Lists.splice(result, 1);
              // console.log(that.infoFaceC1Lists);
              let unStr = "";
              unStr = JSON.stringify(that.infoFaceC1Lists);
              window.localStorage.setItem("infoFaceC1Lists", unStr);
              that.$message.success("移除自选成功");
              that.isShowTfC2Menu = false; // 删除后隐藏菜单
            } else {
              if (localStrToArr.length >= 10) {
                that.$message("最多允许十条自选");
                that.isShowTfC2Menu = false; // 存在也隐藏菜单
              } else {
                that.$message.success("加入自选成功");
                that.isShowTfC2Menu = false; // 加入后隐藏菜单
                that.infoFaceC1Lists = JSON.parse(
                  localStorage.getItem("infoFaceC1Lists")
                ); // 先从缓存取出
                that.infoFaceC1Lists.push(that.infoConts[i]);
                // console.log(that.infoFaceC1Lists)
                let str = "";
                str = JSON.stringify(that.infoFaceC1Lists);
                window.localStorage.setItem("infoFaceC1Lists", str);
              }
            }
          } else {
            // 不存在创建
            that.infoFaceC1Lists = [];
            that.$message.success("加入自选成功");
            that.infoFaceC1Lists.push(that.infoConts[i]);
            let str = JSON.stringify(that.infoFaceC1Lists);
            window.localStorage.setItem("infoFaceC1Lists", str);
            that.isShowTfC2Menu = false; // 加入后隐藏菜单
          }
        }
      }
    },
    infoTopBtnFun(index, typeNum) {
      //头部交易所按钮
      let that = this;
      // console.log(index, typeNum);
      for (let i = 0; i < that.infoTopBtns.length; i++) {
        if (that.infoTopBtns[i].id == index) {
          that.infoTopBtnsActiveName = index;
          that.$store.commit({
            // 改变vuex里面的值
            type: "contractExchangeChange",
            i: typeNum,
            n: that.infoTopBtns[i].id
          });
          // 通过ref调用其他地方的函数 值等
          if (this.$store.state.showTface == true) {
            // 显示的时候调用
            that.$parent.$parent.$refs.out.getOrderSelectListsFun(); // 调用外盘交易中的函数获取交易所列表
          }
        }
      }
      that.infoClickTopBtnsId = index; // 交易所id
      that.infoClickTopBtnsType = typeNum; // 交易所类型
      that.infoClickTopBtnsFun(index, typeNum);
    },
    infoContsFun(index, otherName) {
      // 每条合约
      let that = this;
      for (let i = 0; i < that.infoConts.length; i++) {
        if (that.infoConts[i].contract_short == index) {
          if (that.infoConts[i].current_price == "--") {
            that.$message.warning(index + " 合约未开启");
          } else {
            that.infoContsActiveName = index;
            that.$store.commit(
              "changeCodeNameFun",
              that.infoConts[i].contract_name
            ); // 中文合约名字
            that.$store.commit("pointFun", that.infoConts[i].future_price); // 小数位
            that.$store.commit("symbolNameFun", index); // 英文合约名字
            that.$store.commit("otherCodeNameFun", otherName); // 新加的合约名字
            window.sessionStorage.setItem("index", 1);
            // 通过ref调用其他地方的函数 值等
            if (that.$store.state.showTface == true) {
              // 显示的时候调用
              that.$parent.$parent.$refs.out.getOrderOptionListsFun(); // 调用外盘交易中的函数获取交易所列表
              that.$parent.$parent.$refs.out.getOrderAllDepotInfo(index); // 买卖价格
              that.$parent.$parent.$refs.out.websocketonopen(); // 推送
              that.$store.commit("isSubAddFun", true); // 切换合约后重新获取实时价格
            }
          }
        }
      }
    },
    dbInfoContsKlineFun(index, otherName) {
      // 双击合约去K线
      let that = this;
      for (let i = 0; i < that.infoConts.length; i++) {
        if (that.infoConts[i].contract_short == index) {
          if (that.infoConts[i].current_price == "--") {
            that.$message.warning(index + " 合约未开启");
          } else {
            // 双击后调用infoFace里面的函数改变K线F4
            that.$router.push({
              path: "/wrap/infoFace/infoFaceChild4"
            });
            that.$nextTick(() => {
              that.$parent.infoLeftBtnsActiveFun(4); //按钮调为K线
              that.$parent.$refs.infoRoute.infoChangeKlineWHFun(); // 双击调用自适应宽高
            });
            that.infoContsActiveName = index;
            that.$store.commit(
              "changeCodeNameFun",
              that.infoConts[i].contract_name
            ); // 中文合约名字
            that.$store.commit("pointFun", that.infoConts[i].future_price); // 小数位
            that.$store.commit("symbolNameFun", index); // 英文合约名字
            that.$store.commit("otherCodeNameFun", otherName); // 新加的合约名字
            sessionStorage.setItem("index", 1);
          }
        }
      }
    }
  },
  directives: { clickoutside }, //自定义指令点击空白右键消失
  beforeDestroy() {
    //在开始销毁实例时调用。此时实例仍然有功能。
    //清除定时器
    clearInterval(this.infoC2GetCurTimer);
    this.infoC2GetCurTimerBoole = false; // 屏蔽递归计时器
    sessionStorage.removeItem("conLists"); // 每次切换删除缓存
    // console.log("beforeDestroy");

    clearInterval(this.infoC2WebSocketTimer); // 推送计时器
    // this.websocketBoolean = false;
    // this.websock.close() //离开路由之后断开websocket连接
  },
  destroyed() {
    //在实例被销毁之后调用。此时所有的绑定和实例的指令已经解绑，注意是解绑不是销毁,所有的子实例也已经被销毁。
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tf_right_menu {
  position: fixed;
  z-index: 2500;
  width: 150px;
  height: 30px;
  background: white;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
}

.tf_right_menu_ul {
  width: 100%;
  height: 100%;
}

.tf_right_menu_li {
  width: 100%;
  height: 30px;
  cursor: pointer;
  padding-left: 15px;
  font-size: 14px;
  line-height: 30px;
  color: #333;
}

.tf_right_menu_li:hover {
  background-color: rgba(232, 232, 232, 1);
}

.infoface2wrap {
  width: 100%;
  height: -webkit-calc(100% - 30px);
  height: calc(100% - 30px);
  color: white;
}
.infoface2 {
  position: relative;
  width: 100%;
  height: 100%;
}
.info_c2_top_ul {
  background-color: rgba(51, 51, 51, 1);
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  width: 100%;
  height: 30px;
  min-width: 600px;
  padding: 3px;
}
.info_c2_top_li {
  display: inline-block;
  width: 70px;
  height: 24px;
  margin-right: 3px;
  border-radius: 3px;
  border: 1px solid rgb(24, 24, 24);
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  color: rgba(174, 174, 174, 1);
  cursor: pointer;
}
.info_c2_top_li_active {
  color: rgba(92, 181, 246, 1);
  font-size: 14px;
  background: #000;
  line-height: 22px;
}
/* table列表 */
.info_c2_table_wrap {
  overflow-x: auto;
  width: 100%;
  height: 100%;
}
.info_c2_table {
  width: 200%;
  height: 100%;
}

.info_c2_table thead,
.info_c2_table tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}

.info_c2_table > thead {
  width: 100%;
  height: 30px;
}
.info_c2_table > thead th {
  line-height: 23px;
  color: rgba(0, 178, 178, 1);
  font-size: 14px;
  text-align: right;
}
.info_c2_table > thead th:nth-child(1) {
  width: 80px;
  padding-right: 18px;
}
.info_c2_table > thead th:nth-child(2) {
  width: 80px;
  padding-right: 30px;
}
.info_c2_table > thead th:nth-child(3) {
  width: 100px;
  padding-right: 30px;
}
.info_c2_table > thead th:nth-child(4) {
  width: 80px;
  padding-right: 16px;
}
.info_c2_table > thead th:nth-child(5) {
  width: 80px;
  padding-right: 20px;
}
.info_c2_table > thead th:nth-child(6) {
  width: 80px;
  padding-right: 18px;
}
.info_c2_table > thead th:nth-child(7) {
  width: 80px;
  padding-right: 20px;
}
.info_c2_table > thead th:nth-child(8) {
  width: 80px;
  padding-right: 20px;
}
.info_c2_table > thead th:nth-child(9) {
  width: 80px;
  padding-right: 20px;
}
.info_c2_table > thead th:nth-child(10) {
  width: 120px;
  padding-right: 16px;
}
.info_c2_table > thead th:nth-child(11) {
  width: 80px;
  padding-right: 16px;
}
.info_c2_table > thead th:nth-child(12) {
  width: 80px;
  padding-right: 16px;
}
.info_c2_table > thead th:nth-child(13) {
  width: 100px;
  padding-right: 16px;
}
.info_c2_table > thead th:nth-child(14) {
  width: 120px;
  padding-right: 25px;
}
.info_c2_table > thead th:nth-child(15) {
  width: 80px;
  padding-right: 20px;
}
.info_c2_table > thead th:nth-child(16) {
  width: 100px;
  padding-right: 16px;
}
.info_c2_table > thead th:nth-child(17) {
  width: 100px;
  padding-right: 16px;
}
.info_c2_table > thead th:nth-child(18) {
  width: 100px;
  padding-right: 20px;
}
.info_c2_table > thead th:nth-child(19) {
  width: 80px;
  padding-right: 16px;
}
.info_c2_table > thead th:nth-child(20) {
  width: 100px;
  padding-right: 16px;
}
.info_c2_table > thead th:nth-child(21) {
  width: 100px;
  padding-right: 16px;
}
.info_c2_table > thead th:nth-child(22) {
  width: 80px;
  padding-right: 16px;
}
.info_c2_table > thead th:nth-child(23) {
  width: 100px;
  padding-right: 16px;
}
.info_c2_table > thead th:nth-child(24) {
  width: 120px;
  padding-right: 20px;
}
.info_c2_table > thead th:nth-child(25) {
  width: 140px;
  padding-right: 16px;
}
.info_c2_table > thead th:nth-child(26) {
  width: 120px;
  padding-right: 16px;
}
.info_c2_table > thead th:nth-child(27) {
  width: 120px;
  padding-right: 16px;
}

.info_c2_table > tbody {
  display: block;
  width: 100%;
  height: -webkit-calc(100% - 32px);
  height: calc(100% - 32px);
  overflow-y: auto;
}
.info_c2_table tbody tr {
  width: 100%;
  height: 30px;
}
.info_c2_table tbody tr:hover {
  background: #333;
}
.info_c2_table tbody .info_c2_cont_tr_active {
  background: #333;
}
.info_c2_table > tbody td {
  text-align: right;
  height: 23px;
  line-height: 23px;
  color: rgba(255, 255, 0, 1);
  font-size: 14px;
}

.info_c2_table > tbody td:nth-child(1) {
  color: rgba(255, 255, 255, 1);
  width: 80px;
  padding-right: 16px;
}
.info_c2_table > tbody td:nth-child(2) {
  width: 80px;
  padding-right: 16px;
}
.info_c2_table > tbody td:nth-child(3) {
  width: 100px;
  padding-right: 16px;
}
.info_c2_table > tbody td:nth-child(4) {
  width: 80px;
  padding-right: 18px;
}
.info_c2_table > tbody td:nth-child(5) {
  color: rgba(255, 255, 255, 1);
  width: 80px;
  padding-right: 30px;
}
.info_c2_table > tbody td:nth-child(6) {
  width: 80px;
  padding-right: 16px;
}
.info_c2_table > tbody td:nth-child(7) {
  width: 80px;
  padding-right: 16px;
}
.info_c2_table > tbody td:nth-child(8) {
  color: rgba(255, 255, 255, 1);
  width: 80px;
  padding-right: 27px;
}
.info_c2_table > tbody td:nth-child(9) {
  color: rgba(255, 255, 255, 1);
  width: 80px;
  padding-right: 27px;
}
.info_c2_table > tbody td:nth-child(10) {
  width: 120px;
  padding-right: 16px;
}
.info_c2_table > tbody td:nth-child(11) {
  width: 80px;
  padding-right: 16px;
}
.info_c2_table > tbody td:nth-child(12) {
  width: 80px;
  padding-right: 16px;
}
.info_c2_table > tbody td:nth-child(13) {
  width: 100px;
  padding-right: 16px;
}
.info_c2_table > tbody td:nth-child(14) {
  color: rgba(255, 255, 255, 1);
  width: 120px;
  padding-right: 26px;
}
.info_c2_table > tbody td:nth-child(15) {
  width: 80px;
  padding-right: 16px;
}
.info_c2_table > tbody td:nth-child(16) {
  width: 100px;
  padding-right: 16px;
}
.info_c2_table > tbody td:nth-child(17) {
  width: 100px;
  padding-right: 16px;
}
.info_c2_table > tbody td:nth-child(18) {
  color: rgba(255, 255, 255, 1);
  width: 100px;
  padding-right: 16px;
}
.info_c2_table > tbody td:nth-child(19) {
  width: 80px;
  padding-right: 18px;
}
.info_c2_table > tbody td:nth-child(20) {
  width: 100px;
  padding-right: 16px;
}
.info_c2_table > tbody td:nth-child(21) {
  color: rgba(255, 255, 255, 1);
  width: 100px;
  padding-right: 30px;
}
.info_c2_table > tbody td:nth-child(22) {
  width: 80px;
  padding-right: 33px;
}
.info_c2_table > tbody td:nth-child(23) {
  width: 100px;
  padding-right: 26px;
}
.info_c2_table > tbody td:nth-child(24) {
  width: 120px;
  padding-right: 35px;
}
.info_c2_table > tbody td:nth-child(25) {
  width: 140px;
  padding-right: 16px;
}
.info_c2_table > tbody td:nth-child(26) {
  width: 120px;
  padding-right: 16px;
}
.info_c2_table > tbody td:nth-child(27) {
  color: rgba(255, 255, 255, 1);
  width: 120px;
  padding-right: 25px;
}
.info_c2_table > tbody .red_color {
  color: #ff0f0f;
}
.info_c2_table > tbody .green_color {
  color: #0f0;
}
.info_c2_table > tbody .activeC2Color {
  color: white;
}

/* .info_c2_table > tbody .activeC2Color {
  animation: buling .5s 1 ease;
}
@keyframes buling {
  0% {
    color: white;
  }
  100% {
    color: white;
  }
} */

/* 滚动条整体部分 */
.info_c2_table_wrap::-webkit-scrollbar {
  width: 0;
  height: 13px;
  background-color: rgba(230, 230, 232, 1);
  text-align: center;
}

/* 外层轨道 */
.info_c2_table_wrap::-webkit-scrollbar-track {
  background-color: rgba(230, 230, 232, 1);
  border-radius: 4px;
  width: 8px;
  padding: 0 4px;
}

/* 滚动条滑块 */
.info_c2_table_wrap::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background: rgba(153, 153, 153, 1);
  width: 8px;
}
/* 滚动条整体部分 tbody */
.info_c2_table > tbody::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  background-color: #a1a1a1;
  text-align: center;
  cursor: pointer;
}

/* 外层轨道 tbody */
.info_c2_table > tbody::-webkit-scrollbar-track {
  background-color: #a1a1a1;
  border-radius: 8px;
  width: 8px;
  padding: 0 4px;
  cursor: pointer;
}

/* 滚动条滑块 tbody */
.info_c2_table > tbody::-webkit-scrollbar-thumb {
  border-radius: 8px;
  border: 1px solid #888;
  background: #807c7c;
  width: 8px;
  cursor: pointer;
}
</style>
