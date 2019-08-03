<template>
  <div class="infofacechild4" ref="infoFaceC4">
    <div class="info_face_left" ref="infoFaceLeft">
      <div class="loading" v-show="loading"></div>
      <div v-show="!loading" @click.right.capture="infoC2RightMenuFun()" id="kline_container" ref="klineContainer"></div>
    </div>
    <div class="info_face_right">
      <h4>{{symbolInfo.name}}（{{symbolInfo.code}}）</h4>
      <ul class="info_face_right_sell">
        <li>
          <p class="info_face_right_green">卖出</p>
          <p>{{symbolInfo.SP1}}</p>
          <p>{{symbolInfo.SV1}}</p>
        </li>
      </ul>
      <ul class="info_face_right_buy">
        <li>
          <p class="info_face_right_red">买入</p>
          <p>{{symbolInfo.BP1}}</p>
          <p>{{symbolInfo.BV1}}</p>
        </li>
      </ul>
      <ul class="info_face_right_new">
        <li>
          <p>最新</p>
          <p
            :class="symbolInfo.change_rate<0?'info_face_right_green':'info_face_right_red'"
          >{{symbolInfo.current}}</p>
          <p>涨跌</p>
          <p
            :class="symbolInfo.change_rate<0?'info_face_right_green':'info_face_right_red'"
          >{{symbolInfo.change}}</p>
        </li>
        <li>
          <p>现手</p>
          <p class="info_face_right_orange">{{symbolInfo.now_hand}}</p>
          <p>幅度</p>
          <p
            :class="symbolInfo.change_rate<0?'info_face_right_green':'info_face_right_red'"
          >{{symbolInfo.change_rate}}</p>
        </li>
        <li>
          <p>总手</p>
          <p class="info_face_right_orange">{{symbolInfo.total_hand}}</p>
          <p>开盘</p>
          <p>{{symbolInfo.open}}</p>
        </li>
        <li>
          <p>持仓</p>
          <p class="info_face_right_orange">{{symbolInfo.turnover}}</p>
          <p>最高</p>
          <p
            :class="symbolInfo.change_rate<0?'info_face_right_green':'info_face_right_red'"
          >{{symbolInfo.high}}</p>
        </li>
        <li>
          <p>昨结</p>
          <p>{{symbolInfo.p_clear}}</p>
          <p>最低</p>
          <p
            :class="symbolInfo.change_rate<0?'info_face_right_green':'info_face_right_red'"
          >{{symbolInfo.low}}</p>
        </li>
      </ul>
      <ul class="info_face_right_time">
        <li>
          <p>时间</p>
          <p>价格</p>
          <p>现手</p>
        </li>
        <li v-for="item in detail" :key="item.id">
          <p>{{item.Date}}</p>
          <p>{{item.NewPrice}}</p>
          <p class="info_face_right_orange">{{item.Vol2}}</p>
        </li>
      </ul>
    </div>
    <!-- 鼠标右键 -->
    <div
      id="chart_tabbar"
      v-clickoutside="handleCloseTfC2Menu"
      class="tf_right_menu"
      v-show="isShowTfC2Menu"
      v-bind:style="{ top: activeTopMenu + 'px', left: activeLeftMenu + 'px' }"
    >
    <ul class="tf_right_menu_ul">
      <li
        class="tf_right_menu_li"
        @click="infoC2MenuChooseFun(menuList.id)"
        v-for="menuList in menuLists"
        :key="menuList.id"
        :class="{tf_right_menu_li_active:menuList.isClicked == true}"
      >
        <a :name="menuList.name">{{menuList.zhName}}</a>
      </li>
    </ul>
  </div>
  </div>
</template>
<script>
import echarts from "echarts";
import Kline from "kline";
import "../assets/js/jquery.min.js";
import "../assets/js/jquery.mousewheel.js";
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
  name: "InfoFaceChild4",
  data() {
    return {
      loading: true,
      symbolInfo: "", // 合约信息
      detail: "", // 分时合约详情
      isShowTfC2Menu: false, // 右键菜单默认隐藏
      activeTopMenu: 0, // 初始位置
      activeLeftMenu: 0, // 初始位置
      menuLists: [
        {id: 1, name: "MACD", zhName: "平滑异同移动平均线"},
        {id: 2, name: "KDJ", zhName: "随机指标"},
        {id: 3, name: "StochRSI", zhName: "随机相对强弱指数"},
        {id: 4, name: "RSI", zhName: "相对强弱指数"},
        {id: 5, name: "DMI", zhName: "动向指数"},
        {id: 6, name: "OBV", zhName: "能量潮"},
        {id: 7, name: "BOLL", zhName: "布林线指标"},
        {id: 8, name: "SAR", zhName: "止损点"},
        {id: 9, name: "DMA", zhName: "平均线差"},
        {id: 10, name: "TRIX", zhName: "三重指数平滑平均线"},
        {id: 11, name: "BRAR", zhName: "人气意愿指标"},
        {id: 12, name: "VR", zhName: "VR成交量比率"},
        {id: 13, name: "EMV", zhName: "简易波动指标"},
        {id: 14, name: "WR", zhName: "威廉指标"},
        {id: 15, name: "ROC", zhName: "异同离差变化率指数"},
        {id: 16, name: "MTM", zhName: "MTM动力指标"},
        {id: 17, name: "PSY", zhName: "心理线"},
      ],
      infoC4RightFaceFun: "", // 定义右侧面板的函数
      infoChangeKlineWHFun: "", // 改变K线宽高的函数
      klineWidth: "", // K线宽
      klineHeight: "", // K线高
      infoC4GetTimer1: "", // 计时器
      infoC4GetTimer2: "", // 计时器
      infoC4GetTimerBoole: true, // 计时器暂停
      kline: "",
      time: "day", // 时间
      infoC4GetKlineFun: "",
      symbolZhName: "", // 合约中文名
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
      // console.log(that.$store.state.otherCodeName);
      if (that.$store.state.otherCodeName == val[2]) {
        that.symbolInfo = { // 最新涨跌中间信息
          name: that.symbolZhName, // 名字
          code: that.$store.state.symbolName, // 代码
          BP1: Number(val[6]).toFixed(that.$store.state.point), // 买价
          SP1: Number(val[7]).toFixed(that.$store.state.point), // 卖价
          BV1: val[8] != "----"?Number(val[8]).toFixed(that.$store.state.point):val[8], // 买量
          SV1: val[9] != "----"?Number(val[9]).toFixed(that.$store.state.point):val[9], // 卖量
          current: Number(val[3]).toFixed(that.$store.state.point), // 最新
          change: Number(val[3] - val[14]).toFixed(that.$store.state.point), // 涨跌
          now_hand: Number(val[5]).toFixed(that.$store.state.point), // 现手
          change_rate: Number((val[3] - val[14]) / val[14] * 100).toFixed(2) + "%", // 幅度
          total_hand: "--", // 总手
          open: Number(val[11]).toFixed(that.$store.state.point), // 开盘
          turnover: val[15] != "----"?Number(val[15]).toFixed(that.$store.state.point):val[15], // 持仓
          high: Number(val[12]).toFixed(that.$store.state.point), // 最高
          p_clear: val[16] != "----"?Number(val[16]).toFixed(that.$store.state.point):val[16], // 昨结
          low: Number(val[13]).toFixed(that.$store.state.point), // 最低
          p_close: Number(val[14]).toFixed(that.$store.state.point), //昨收
        };
      }
    }
  },
  mounted() {
    let that = this;
    that.infoC4GetKlineFun = function(symbol, time) {
      // 调用K线
      // console.log(codeName, time);
      clearInterval(that.infoC4GetTimer);
      // that.loading = true;
      sessionStorage.setItem("index", 1);
      sessionStorage.setItem("short", symbol); // 存下合约名画线下单用
      sessionStorage.setItem("drawNumPoint", that.$store.state.point); // 小数位
      let kUrl = {
        symbol: symbol,
        type: "kline",
        line: time,
        num: 1000
      };
      that.klineWidth = $(".info_face_left").width();
      that.klineHeight = $(".info_face_left").height();
      that.kline = new Kline({
        element: "#kline_container",
        width: that.klineWidth,
        height: that.klineHeight,
        theme: "dark", // light/dark
        language: "zh-cn", // zh-cn/en-us/zh-tw
        ranges: ["1w", "1d", "1h", "30m", "15m", "5m", "1m"],
        symbol: "",
        symbolName: "COIN5_COIN4",
        type: "poll", // poll/socket
        url: kUrl,
        limit: 1000,
        intervalTime: 5000,
        debug: false,
        showTrade: false,
        onResize: function(width, height) {}
      });
      that.kline.draw();
    };
    that.infoC4GetKlineFun(that.$store.state.symbolName, that.time); // K线初始化

    that.getPointFun(that.$store.state.symbolName);
    // that.infoC4GetTimer1 = setInterval(() => {
    //   that.getStockList(that.$store.state.symbolName);
    // }, 2000);
    that.infoC4GetTimer2 = setInterval(() => {
      that.getStockData(that.$store.state.symbolName); // 交易明细
    }, 30000);
    that.infoChangeKlineWHFun = function() {
      // K线的宽高适应
      that.$nextTick(() => {
        that.klineWidth = $(".info_face_left").width();
        that.klineHeight = $(".info_face_left").height();
        that.kline.resize(that.klineWidth, that.klineHeight);
      })
    };
    that.infoChangeKlineWHFun();
    window.onresize = function() {
      if (that.$route.path == "/wrap/infoFace/infoFaceChild4") {
        that.klineWidth = $(".info_face_left").width();
        that.klineHeight = $(".info_face_left").height();
        that.kline.resize(that.klineWidth, that.klineHeight);
      }
    };
  },
  directives: { clickoutside }, //自定义指令点击空白右键消失
  methods: {
    getPointFun(index) { // 获取小数位
      let that = this;
      for (let i = 0; i < that.$store.state.symbolLists.length; i++) {
        if (index == that.$store.state.symbolLists[i].contract_short) {
          that.$store.commit("pointFun", that.$store.state.symbolLists[i].future_price); // 小数位
          that.getStockList(that.$store.state.symbolName); // 行情信息
          that.getStockData(that.$store.state.symbolName); // 交易明细
        }
      }
      
    },
    infoC4GetKlin(symbol, time) {//获取K线数据
      let that = this;
      // sessionStorage.setItem("index", 1);
      // sessionStorage.setItem("short", symbol); // 存下合约名画线下单用
      // sessionStorage.setItem("drawNumPoint", that.$store.state.point); // 小数位
      // let kUrl = {
      //   symbol: symbol,
      //   type: "kline",
      //   line: time,
      //   num: 1000
      // };
      // that.klineWidth = $(".info_face_left").width();
      // that.klineHeight = $(".info_face_left").height();
      // that.kline = new Kline({
      //   element: "#kline_container",
      //   width: that.klineWidth,
      //   height: that.klineHeight,
      //   theme: "dark", // light/dark
      //   language: "zh-cn", // zh-cn/en-us/zh-tw
      //   ranges: ["1w", "1d", "1h", "30m", "15m", "5m", "1m"],
      //   symbol: "",
      //   symbolName: "COIN5_COIN4",
      //   type: "poll", // poll/socket
      //   url: kUrl,
      //   limit: 1000,
      //   intervalTime: 5000,
      //   debug: false,
      //   showTrade: false,
      //   onResize: function(width, height) {}
      //   // that.$nextTick(()=>{
      //   //   window._control.Control.switchPeriod("1d");
      //   // });
      // });
      // that.kline.draw();
      // window.ChartSettings._data.charts.period = that.time;
      // window.ChartSettings.save();
    },
    getStockList(symbol) { // 获取第三方行情
      let that = this;
      $.ajax({
        url: "http://dt.cnshuhai.com/stock.php?u=17335495235&symbol=" + symbol + "&type=stock",
        type: "POST",
        dataType: "json",
        cache: true,
        success: function(data) {
          setTimeout(() => {
            that.loading = false;
          }, 50);
          that.symbolZhName = data[0].Name;
          that.symbolInfo = { // 最新涨跌中间信息
            name: data[0].Name, // 名字
            code: symbol, // 代码
            BP1: data[0].BP1, // 买价
            SP1: data[0].SP1, // 卖价
            BV1: data[0].BV1, // 买量
            SV1: data[0].SV1, // 卖量
            current: data[0].NewPrice, // 最新
            change: (parseFloat(data[0].NewPrice) - parseFloat(data[0].LastClose)).toFixed(that.$store.state.point), // 涨跌
            now_hand: data[0].Vol2, // 现手
            change_rate: data[0].PriceChangeRatio.toFixed(2) + "%", // 幅度
            total_hand: data[0].Volume, // 总手
            open: data[0].Open, // 开盘
            turnover: data[0].Open_Int, // 持仓
            high: data[0].High, // 最高
            p_clear: data[0].LastClose, // 昨结
            low: data[0].Low, // 最低
            p_close: data[0].Price3, //昨收
          };
        }
      });
    },
    getStockData(symbol) {//请求合约信息
      let that = this;
      $.ajax({//获取分笔明细
        url: "http://dt.cnshuhai.com/stock.php?u=17335495235&symbol=" + symbol + "&type=detail&num=20",
        type: "POST",
        dataType: "json",
        cache: true,
        success: function(res) {
          if (res.length != 0) {
            var arr = [];
            $.each(res, function(index, item) {
              item.Date = that.hhmmss(item.Date);
              item.NewPrice = parseFloat(item.NewPrice).toFixed(that.$store.state.point);
              arr.push(item);
            });
            that.detail = arr;
          } else {
            that.detail = [];
          }
        }
      });
    },
    hhmmss(timestamp) {
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
      return h + m + s;
    },
    handleCloseTfC2Menu(e) {
      // 点击空白部分关闭右键
      this.isShowTfC2Menu = false;
    },
    infoC2RightMenuFun() {
      // 右键弹出菜单
      this.isShowTfC2Menu = true;
      this.activeLeftMenu = event.pageX; //给left赋值
      this.activeTopMenu = event.pageY; //给top赋值
      // let totalWidth = this.$refs.klineContainer.getBoundingClientRect().right; //总宽度
      // if (totalWidth - event.pageX < 150) {
      //   //边缘检测
      //   this.activeLeftMenu = event.pageX - 150; //给left赋值
      //   this.activeTopMenu = event.pageY; //给top赋值
      // } else {
      //   this.activeLeftMenu = event.pageX + 1; //给left赋值
      //   this.activeTopMenu = event.pageY + 1; //给top赋值
      // }
    },
    infoC2MenuChooseFun(index) { // 右键K线指标
      this.isShowTfC2Menu = false;
      for (let i = 0; i < this.menuLists.length; i++) {
        if (this.menuLists[i].id == index) {
          this.menuLists[i].isClicked = true;
        } else {
          this.menuLists[i].isClicked = false;
        }
      }
    },
  },
  // beforeRouteLeave(to, from, next) {
  //   //切换路由 离开页面清除计时器
  //   clearInterval(this.infoC4GetTimer);
  //   this.infoC4GetTimerBoole = false; // 计时器清除
  //   next();
  // },
  beforeDestroy() {
    //在开始销毁实例时调用。此时实例仍然有功能。
    //清除定时器
    clearInterval(this.infoC4GetTimer1);
    clearInterval(this.infoC4GetTimer2);
    // console.log(window._kline.default.instance.timer)
    window.clearTimeout(window._kline.default.instance.timer);
    // window.clearInterval(window._kline.default.instance.timer);
    this.infoC4GetTimerBoole = false;
  }
};
</script>
<style scoped>
.tf_right_menu {
  position: fixed!important;
  z-index: 2500!important;
  width: 170px!important;
  height: 200px!important;
  background: white;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
}

.tf_right_menu_ul {
  width: 100%;
  height: 200px!important;
  overflow-y: auto;
  padding: 0!important;
}

/* 滚动条整体部分 */
.tf_right_menu_ul::-webkit-scrollbar {
  width: 6px;
  height: 0;
  background-color: rgba(230, 230, 232, 1);
  text-align: center;
}

/* 外层轨道 */
.tf_right_menu_ul::-webkit-scrollbar-track {
  background-color: rgba(230, 230, 232, 1);
  border-radius: 4px;
  width: 8px;
  padding: 0 4px;
}

/* 滚动条滑块 */
.tf_right_menu_ul::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background: rgba(153, 153, 153, 1);
  width: 8px;
}

.tf_right_menu_li {
  width: 100%;
  height: 25px!important;
  font-size: 14px;
  line-height: 25px;
  color: #333;
}

.tf_right_menu_li:hover {
  background-color: rgba(232, 232, 232, 1);
}
.tf_right_menu_li_active {
  background-color: rgba(232, 232, 232, 1);
}
.tf_right_menu_li a {
  display: inline-block;
  width: 100%;
  height: 25px;
  font-size: 14px;
  line-height: 25px;
  color: #333;
  padding: 0 0 0 15px!important;
}

.infofacechild4 {
  width: 100%;
  height: 100%;
  color: white;
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

.info_face_left {
  display: inline-block;
  width: -webkit-calc(100% - 270px);
  width: calc(100% - 270px);
  height: 100%;
  font-size: 14px;
  background: gainsboro;
  vertical-align: top;
}

.loading {
  width: 100%;
  height: 100%;
  background-color: black;
}

a.kxiana {
  text-decoration: none;
}
a.kxiana:hover {
  text-decoration: underline !important;
}
#chart_canvasGroup:after {
  display: block;
  width: 100%;
  height: 100%;
  content: "";
  /* background: url("/statics/img/common/bg_klie.png") 50% 25% no-repeat;
  background-size: auto 22%; */
  position: absolute;
  z-index: 1;
}
.info_face_right {
  display: inline-block;
  width: 270px;
  height: 100%;
  border-left: 1px solid #990e0e;
  background-color: rgba(0, 0, 0, 1);
  font-size: 14px;
  vertical-align: top;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.info_face_right > h4 {
  margin: auto;
  padding: 0;
  border-bottom: 1px solid #990e0e;
  line-height: 29px;
  color: rgba(255, 152, 0, 1);
  font-size: 14px;
  font-weight: 500;
  text-align: center;
}
.info_face_right > ul {
  margin: auto;
  border-bottom: 1px solid #990e0e;
  padding: 4px 0;
}
.info_face_right > .info_face_right_time {
  border: 0 none;
}
.info_face_right > ul > li {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  align-items: center;
  -webkit-align-items: center;
}
.info_face_right > ul > li > p {
  width: 26.3%;
  text-align: center;
  line-height: 20px;
  color: rgba(255, 255, 255, 1);
  font-size: 14px;
}
.info_face_right > .info_face_right_new > li > p {
  width: 25%;
  text-align: center;
}
.info_face_right > .info_face_right_new > li > p:nth-child(2) {
  text-align: right;
}
.info_face_right > .info_face_right_new > li > p:nth-child(4) {
  text-align: right;
  padding-right: 13px;
}
.info_face_right > .info_face_right_sell > li > .info_face_right_green {
  color: #259b24;
}
.info_face_right > .info_face_right_sell > li > p:nth-child(2) {
  color: #e51c23;
}
.info_face_right > .info_face_right_buy > li > p:nth-child(2) {
  color: #e51c23;
}
.info_face_right > .info_face_right_buy > li > .info_face_right_red {
  color: #e51c23;
}
.info_face_right > .info_face_right_sell > li > p:nth-child(3) {
  color: #ff9800;
}
.info_face_right > .info_face_right_buy > li > p:nth-child(3) {
  color: #ff9800;
}

.info_face_right > ul > li > .info_face_right_orange {
  color: #ff9800;
}

.info_face_right > .info_face_right_new > li > .info_face_right_orange {
  color: #ff9800;
}
.info_face_right > .info_face_right_new > li > .info_face_right_red {
  color: #e51c23;
}
.info_face_right > .info_face_right_new > li > .info_face_right_green {
  color: #259b24;
}
</style>