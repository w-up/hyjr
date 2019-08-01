<template>
  <!-- :style="{height: infoHeight + 'px'}" -->
  <div class="heightAuto" :class="$store.state.infoFaceHeight?'':'height_all'" ref="infoFaceWrap">
    <div class="info_face">
      <div class="info_left" :class="{info_left_black: $store.state.themeStyle == 2}">
        <div class="info_left_top">
          <div class="info_left_btn">
            <ul>
              <li
                class="info_left_btn_li"
                @click="infoLeftBtnFun(leftBtn.id)"
                v-for="leftBtn in infoLeftBtns"
                :key="leftBtn.id"
                :class="{info_left_btn_li_active: infoLeftBtnId == leftBtn.id, info_left_btn_li_black: $store.state.themeStyle == 2}"
              >
                <router-link
                  :to="leftBtn.router"
                  :class="{info_left_btn_li_a_active: infoLeftBtnId == leftBtn.id, info_left_btn_li_active_black: $store.state.themeStyle == 2}"
                >{{leftBtn.name}}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="info_right" ref="infoface">
        <!-- <keep-alive include="InfoFaceChild3"> -->
          <router-view ref="infoRoute"></router-view>
        <!-- </keep-alive> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Infoface",
  components: {},
  data() {
    return {
      // infoHeight: null, // 拖动动态高度
      // infoChangeHeightFun: "", // 改变高度的函数
      lastX: 0,
      thumbLeft: 0,
      infoBtnShow1: false,
      infoBtnShow2: true,
      infoBtnShow3: false,
      infoBtnShow4: false,
      infoLeftBtns: [
        {
          id: 1,
          name: "自选F1",
          router: "/wrap/infoFace/infoFaceChild1",
          isClicked: false
        },
        {
          id: 2,
          name: "报价F2",
          router: "/wrap/infoFace/infoFaceChild2",
          isClicked: true
        },
        {
          id: 3,
          name: "分时F3",
          router: "/wrap/infoFace/infoFaceChild3",
          isClicked: false
        },
        {
          id: 4,
          name: "K线F4",
          router: "/wrap/infoFace/infoFaceChild4",
          isClicked: false
        },
        // {
        //   id: 5,
        //   name: "下单F6",
        //   router: "/wrap/infoFace/infoFaceChild5",
        //   isClicked: false
        // }
      ],
      infoLeftBtnId: 2, // 默认的按钮id
      infoLeftBtnsActiveFun: "",
      infoLeftBtn3Num: false,  // 第一次进来
    };
  },
  mounted: function() {
    // this.infoChangeHeightFun = function(index) {
    //   // 上下拖拽事件
    //   this.infoHeight = index - 60;
    // };
    this.infoLeftBtnsActiveFun = function(index) {
      //左侧按钮
      for (let i = 0; i < this.infoLeftBtns.length; i++) {
        if (this.infoLeftBtns[i].id == index) {
          this.infoLeftBtnId = index;
        }
      }
    };
    if (this.$route.path == "/wrap/infoFace/infoFaceChild1") {
      this.infoLeftBtnId = 1;
    } else if (this.$route.path == "/wrap/infoFace/infoFaceChild2") {
      this.infoLeftBtnId = 2;
    } else if (this.$route.path == "/wrap/infoFace/infoFaceChild3") {
      this.infoLeftBtnId = 3;
    } else if (this.$route.path == "/wrap/infoFace/infoFaceChild4") {
      this.infoLeftBtnId = 4;
    } else if (this.$route.path == "/wrap/infoFace/infoFaceChild5") {
      this.infoLeftBtnId = 5;
    }
    if (this.$route.path == "/wrap/infoFace/infoFaceChild3") { // 如果刷新时在分时,直接置为true
      this.infoLeftBtn3Num = true;
    }
  },
  methods: {
    infoLeftBtnFun(index) {
      //左侧按钮
      for (let i = 0; i < this.infoLeftBtns.length; i++) {
        if (this.infoLeftBtns[i].id == index) {
          this.infoLeftBtnId = index;
          if (index == "3") {
            if (this.infoLeftBtn3Num) {
              window.myChart.resize(); // 调整分时的宽高
            } else {
              setTimeout(() => {
                this.infoLeftBtn3Num = true;
              }, 1000);
            }
          }
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.heightAuto {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 100%;
  height: -webkit-calc(100% - 383px);
  height: calc(100% - 383px);
  overflow: hidden;
}
/* 全屏 */
.height_all {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  height: -webkit-calc(100% - 60px);
  height: calc(100% - 60px);
}
.info_face {
  width: 100%;
  height: 100%;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  align-items: center;
  -webkit-align-items: center;
}
.info_left {
  width: 30px;
  height: 100%;
  background-color: rgba(244, 244, 244, 1);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
/* 黑色主题 */
.info_left_black {
  background-color: rgba(51, 51, 51, 1);
}
.info_left_btn_li {
  width: 30px;
  height: 80px;
  text-align: center;
  cursor: pointer;
  border-bottom: 1px solid rgba(202, 202, 202, 1);
}
/* 黑色主题 */
.info_left_btn_li_black{
  border-bottom: 1px solid rgba(1, 1, 1, 1);
}
.info_left_btn_li_active {
  width: 30px;
  height: 80px;
  line-height: 20px;
  background-color: rgba(202, 202, 202, 1);
  text-align: center;
}
/* 黑色主题 */
.info_left_btn_li_active_black {
  background-color: rgba(51, 51, 51, 1);
}
.info_left_btn_li > a {
  display: inline-block;
  width: 100%;
  height: 100%;
  padding: 9px 4px;
  line-height: 20px;
  color: rgba(96, 96, 96, 1);
  font-size: 14px;
}
.info_left_btn_li > .info_left_btn_li_a_active {
  color: rgba(255, 255, 255, 1);
}
.info_right {
  position: relative;
  width: -webkit-calc(100% - 30px);
  width: calc(100% - 30px);
  height: 100%;
  background: rgb(0, 0, 0);
  /* -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none; */
}
</style>
