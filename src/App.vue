<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import "./assets/css/common.css";
export default {
  name: "App",
  mounted: function() {
    window.document.oncontextmenu = function() {
      //屏蔽右键事件
      return false;
    };
  },
  created() {
    // 此举是防止浏览器刷新造成vuex数据丢失
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });

    this.initWebSocket(); //开启推送
  },
  methods: {
    initWebSocket() {
      //初始化weosocket
      const wsuri = "ws://47.110.12.144:1234";
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onclose = this.websocketclose;
      this.websock.onerror = this.websocketonerror;
    },
    websocketonopen() {
      //连接建立之后执行send方法发送数据
      setInterval(() => {
        this.websocketsend("666");
      }, 30000);
    },
    websocketonerror() {
      //连接建立失败重连
      setTimeout(() => {
        this.initWebSocket();
        if (navigator.onLine) {
          // console.log("重连 有.... 网");
          this.websocketBoolean = true;
        } else {
          // console.log("重连 没 网");
          this.$message.error("请查看您的网络连接");
          this.websocketBoolean = false;
        }
      }, 20000);
    },
    websocketsend(Data) {
      //数据发送
      this.websock.send(Data);
    },
    websocketonmessage(evt) {
      //数据接收
      let that = this;
      var evtjs = evt.data.split("|").join('","');
      evtjs =
        '{"' +
        evtjs
          .split("=")
          .join('":"')
          .replace("\n", "") +
        '"}';
      // console.log(evtjs);
      var data = JSON.parse(evtjs);
      // console.log(data);
      that.$store.commit("updateSymbolFun", data);
    },
    websocketclose(e) {
      //关闭
      // console.log('断开连接',e);
      let that = this;
      setTimeout(() => {
        if (that.websocketBoolean) {
          that.initWebSocket();
        }
        if (navigator.onLine) {
          // console.log("断开后有网");
          that.websocketBoolean = true;
        } else {
          // console.log("断开后没网");
          that.websocketBoolean = false;
        }
      }, 10000);
    }
  }
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
