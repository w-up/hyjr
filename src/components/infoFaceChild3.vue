<template>
  <div class="infofacechild3">
    <div class="info_face_left" ref="infoFaceC3">
      <div id="main" @click="infoC3CrossLineFun"></div>
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
  </div>
</template>

<script>
import echarts from "echarts";
import { makeTimeLine2 } from "../assets/js/timeLine.js";
export default {
  name: "InfoFaceChild3",
  components: {},
  data() {
    return {
      symbolInfo: "", // 合约信息
      timeKlineFun: "", // 调用分时函数
      infoChangeTimeKlineWHFun: "", // 改变分时宽高的函数
      infoC3GetTimer1: "", // 分时2s
      infoC3GetTimer2: "", // 分时5s
      infoC3GetTimer3: "", // 分时30s
      infoC3GetTimerBoole: true, // 分时计时器暂停
      dataData: "",
      isCrossLine: false, // 分时十字线显隐
      detail: "", // 分时合约详情
      trade_time: "", // 交易时间段
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
  mounted: function() {
    let that = this;
    window.onbeforeunload = function () { // 页面刷新
      sessionStorage.setItem('timeLine', false);
    };
    that.infoC3GetTimerBoole = true;
    that.timeKlineFun = function(symbolName) {
      that
        .$http({
          url: "/",
          method: "post",
          timeout: 10000,
          data: {
            nozzle: "time_sharing",
            code: symbolName
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            // clearInterval(this.infoC3GetTimer);
            that.trade_time = res.data.data.trading_time; // 交易时间段
            that.timeTrendFun(that.$store.state.symbolName); // 第三方分时
            // window.myChart.resize(); // 调整分时的宽高
          } else if (res.data.code == 0 || res.data.code == -1) {
            that.$message.error(res.data.msg);
          }
        });
    };
    that.timeKlineFun(that.$store.state.symbolName);
    that.getStockList(that.$store.state.symbolName);
    that.getStockData(that.$store.state.symbolName);
    // that.infoC3GetTimer1 = setInterval(() => {
    //   that.getStockList(that.$store.state.symbolName);
    // }, 2000);
    // that.infoC3GetTimer2 = setInterval(() => {
    //   that.timeTrendFun(that.$store.state.symbolName); // 第三方分时
    // }, 5000);
    that.infoC3GetTimer3 = setInterval(() => {
      that.getStockData(that.$store.state.symbolName); // 交易明细
    }, 30000);
    $(window).resize(function() {
      window.myChart.resize();
    });
    
  },
  methods: {
    getStockList(symbol) { // 获取第三方行情
      let that = this;
      $.ajax({
        url: "http://dt.cnshuhai.com/stock.php?u=17335495235&symbol=" + symbol + "&type=stock",
        type: "POST",
        dataType: "json",
        cache: true,
        success: function(data) {
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
        success: function(data) {
          if (data.length != 0) {
            var arr = [];
            $.each(data, function(index, item) {
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
    timeTrendFun(symbol) { // 获取分时数据
      let that = this;
      $.ajax({
        url: "http://dt.cnshuhai.com/stock.php?u=17335495235&symbol=" + symbol + "&type=trend",
        type: "POST",
        dataType: "json",
        cache: true,
        success: function(data) {
          sessionStorage.setItem("tfC3PointNum", that.$store.state.point); // 小数位
          let arr = [];
          $.each(data.Data, function(index, item) {
            let date = new Date(item.Date * 1000);
            let hour = date.getHours(); // 获取小时数(0-23)
            let minute = date.getMinutes(); // 获取分钟数(0-59)
            if (hour < 10) {
              hour = "0" + hour;
            }
            if (minute < 10) {
              minute = "0" + minute;
            }
            let time = hour + minute;
            let arrStr = time + " " + item.Trend + " " + item.Volume;
            arr.push(arrStr);
          });
          
          if (arr.length != 0) {
            var lastIndex = that.trade_time.length - 1;
            var endTime = that.trade_time[lastIndex].substring(6, 12); //最后一条时间
            var everyTime = that.getTimes(that.trade_time); // 交易时间段
            makeTimeLine2(arr, that.symbolInfo, everyTime, endTime);
          }
        }
      });
    },
    hhmm(timestamp) {
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
        var m = "0" + date.getMinutes() + "";
      } else {
        var m = date.getMinutes() + "";
      }
      return h + m;
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
    infoC3CrossLineFun() { // 十字线显隐
      this.isCrossLine = !this.isCrossLine;
      if (this.isCrossLine) {
        sessionStorage.setItem('timeLine', true); // 分时十字线显示
      } else {
        sessionStorage.setItem('timeLine', false); // 分时十字线隐藏
      }
      this.timeKlineFun(this.$store.state.symbolName);
    },
    getTimes(range) {
      let that = this;
      var today = new Date(new Date().setHours(0, 0, 0, 0)) / 1000;
      var array = [];
      //0:"06:00-24:00"1:"00:00-05:00"
      $.each(range, function(index, item) {
        item = item.split("-");
        var data = [];
        for (var i = 0; i < item.length; i++) {
          var hour = item[i].substring(0, 2);
          var minute = item[i].substring(3, 5);
          var time_one = today + hour * 3600 + minute * 60;
          data.push(time_one);
        }
        array = that.time_array_new(data[0], data[1], array);
      });
      var arrays = [];
      for (var x = 0; x < array.length; x++) {
        arrays.push(that.time_data(array[x]));
      }
      return arrays;
    },
    time_array_new($start, $end, array) {
      var difference = ($end - $start) / 60;
      for (var i = 0; i < difference; i++) {
        array.push($start + i * 60);
      }
      return array;
    },
    time_data(time) {
      let that = this;
      var amDate = new Date(time * 1000);
      return (
        that.getzf(amDate.getHours()) + ":" + that.getzf(amDate.getMinutes())
      );
    },
    getzf(num) {
      if (parseInt(num) < 10) {
        num = "0" + num;
      }
      return num;
    }
  },
  beforeRouteLeave(to, from, next) {
    //切换路由 离开页面清除计时器
    clearInterval(this.infoC3GetTimer);
    this.infoC3GetTimerBoole = false; // 计时器清除
    
    next();
  },
  beforeDestroy() {
    //在开始销毁实例时调用。此时实例仍然有功能。
    clearInterval(this.infoC3GetTimer1);
    clearInterval(this.infoC3GetTimer2);
    clearInterval(this.infoC3GetTimer3);
    this.infoC3GetTimerBoole = false; // 计时器清除
    sessionStorage.setItem('timeLine', false); // 离开十字线隐藏
    this.isCrossLine = false; // 离开十字线隐藏
    
  },
  // deactivated() {
  //   sessionStorage.setItem('timeLine', false); // 离开十字线隐藏
  //   this.isCrossLine = false; // 离开十字线隐藏
    
  //   this.websocketBoolean = false;
  //   this.websock.close() //离开路由之后断开websocket连接
  //   clearInterval(this.infoC3WebSocketTimer); // 推送计时器
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#main {
  width: 100%;
  height: 100%;
}
.infofacechild3 {
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
  background-color: rgb(0, 0, 0);
  vertical-align: top;
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