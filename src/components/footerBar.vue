<template>
  <div class="footer_bar" :class="{info_left_black: $store.state.themeStyle == 2}">
    <div class="footer_left">
      <svg t="1565863028296" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6979" width="200" height="200"><path d="M430.08 215.04m-46.08 0a46.08 46.08 0 1 0 92.16 0 46.08 46.08 0 1 0-92.16 0Z" p-id="6980"></path><path d="M593.92 215.04m-46.08 0a46.08 46.08 0 1 0 92.16 0 46.08 46.08 0 1 0-92.16 0Z" p-id="6981"></path><path d="M430.08 363.52m-46.08 0a46.08 46.08 0 1 0 92.16 0 46.08 46.08 0 1 0-92.16 0Z" p-id="6982"></path><path d="M593.92 363.52m-46.08 0a46.08 46.08 0 1 0 92.16 0 46.08 46.08 0 1 0-92.16 0Z" p-id="6983"></path><path d="M430.08 512m-46.08 0a46.08 46.08 0 1 0 92.16 0 46.08 46.08 0 1 0-92.16 0Z" p-id="6984"></path><path d="M593.92 512m-46.08 0a46.08 46.08 0 1 0 92.16 0 46.08 46.08 0 1 0-92.16 0Z" p-id="6985"></path><path d="M430.08 660.48m-46.08 0a46.08 46.08 0 1 0 92.16 0 46.08 46.08 0 1 0-92.16 0Z" p-id="6986"></path><path d="M593.92 660.48m-46.08 0a46.08 46.08 0 1 0 92.16 0 46.08 46.08 0 1 0-92.16 0Z" p-id="6987"></path><path d="M430.08 808.96m-46.08 0a46.08 46.08 0 1 0 92.16 0 46.08 46.08 0 1 0-92.16 0Z" p-id="6988"></path><path d="M593.92 808.96m-46.08 0a46.08 46.08 0 1 0 92.16 0 46.08 46.08 0 1 0-92.16 0Z" p-id="6989"></path></svg>
      <svg t="1565860867257" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1871" width="30" height="30"><path d="M541.9008 122.9824c-6.7072-3.1232-14.72-2.0992-20.48 2.688l-249.1904 209.7152L73.9328 335.3856c-10.5984 0-19.2 8.6016-19.2 19.2l0 329.0624c0 10.5984 8.6016 19.2 19.2 19.2l198.2976 0 249.1904 209.7152c3.5584 2.944 7.936 4.5056 12.3648 4.5056 2.7392 0 5.5296-0.5888 8.0896-1.792 6.784-3.1488 11.1104-9.9328 11.1104-17.408L552.9856 140.3904C553.0112 132.9152 548.6848 126.1312 541.9008 122.9824z" fill="#8a8a8a" p-id="1872"></path><path d="M677.5296 743.808c-5.2736 0-10.5472-2.176-14.336-6.4256-7.0656-7.936-6.3744-20.0448 1.5616-27.1104 54.4768-48.5376 85.7088-118.1952 85.7088-191.1296 0-75.648-33.2032-146.9952-91.0848-195.7888-8.0896-6.8352-9.1392-18.944-2.304-27.0592 6.8352-8.1152 18.944-9.1392 27.0592-2.304 66.56 56.0896 104.7296 138.1632 104.7296 225.152 0 83.84-35.9168 163.968-98.56 219.776C686.6688 742.2208 682.0864 743.808 677.5296 743.808z" fill="#8a8a8a" p-id="1873"></path><path d="M783.3344 834.1504c-6.5536 0-12.928-3.3536-16.5376-9.3696-5.4272-9.1136-2.432-20.8896 6.6816-26.3168 98.048-58.3424 158.976-165.376 158.976-279.296 0-114.5856-61.3888-221.9008-160.2816-280.064-9.1136-5.376-12.1856-17.152-6.8096-26.2912 5.3504-9.1136 17.0752-12.2112 26.2912-6.8096 110.5152 65.0496 179.1744 185.0624 179.1744 313.1648 0 127.4112-68.096 247.0656-177.7152 312.2944C790.0672 833.28 786.6624 834.1504 783.3344 834.1504z" fill="#8a8a8a" p-id="1874"></path></svg>
    </div>
    <div class="footer_center">
      <p>欢迎使用汇盈金融期货交易系统</p>
    </div>
    <div class="footer_right">
      <div>
        <img src="../assets/img/computer.gif">
        <span :class="{black_theme: $store.state.themeStyle == 2}">行情系统</span>
      </div>
      <div>
        <img :src="$store.state.isLoginedOutTran?require('../assets/img/computer.gif'):require('../assets/img/computer2.png')">
        <span :class="{black_theme: $store.state.themeStyle == 2}">交易系统</span>
      </div>
      <p :class="{black_theme: $store.state.themeStyle == 2}">{{time}}-Local</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterBar",
  data() {
    return {
      time: "" //北京时间
    };
  },
  mounted: function() {
    this.getBeiJingTime();
    setInterval(() => {
      this.getBeiJingTime();
    }, 500);
  },
  methods: {
    getBeiJingTime() {
      // var date = new Date().getTime();
      this.time = this.hhmmss(new Date().getTime());
    },
    hhmmss(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate();
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
    }
  },
  beforeDestroy() {
    //在开始销毁实例时调用。此时实例仍然有功能。
  },
  destroyed() {
    //在实例被销毁之后调用。此时所有的绑定和实例的指令已经解绑，注意是解绑不是销毁,所有的子实例也已经被销毁。
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer_bar {
  width: 100%;
  min-width: 900px;
  height: 30px;
  background-color: rgba(244, 244, 244, 1);
  overflow: hidden;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  align-items: center;
  -webkit-align-items: center;
}
/* 黑色主题 */
.info_left_black {
  background-color: rgba(51, 51, 51, 1);
}
.footer_left svg {
  width: 18px;
  height: 18px;
  margin-left: 5px;
}
.footer_center p {
  line-height: 30px;
  margin-right: 10px;
  font-size: 14px;
  color: #ff0f0f;
}
.footer_right {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  align-items: center;
  -webkit-align-items: center;
}
.footer_right > div {
  margin-right: 10px;
}
.footer_right > div img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.footer_right p {
  line-height: 30px;
  margin-right: 10px;
  font-size: 14px;
}
.footer_right .black_theme {
  color: white;
}
</style>
