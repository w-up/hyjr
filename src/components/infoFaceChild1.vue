<template>
  <div class="infofacechild1" ref="infoC1Wrap" @click.self.right="infoC1RightMenuFun">
    <div @click.self.right="infoC1RightMenuFun">
      <draggable
        class="info_child1_ul"
        @start="moveStart"
        @end="moveEnd"
        @click.right="infoC1RightMenuFun"
        element="ul"
        v-model="infoChild1Lists"
      >
        <li
          class="info_child1_li"
          @click="infoChild1Fun(infoList.contract_short, infoList.contract_symbols)"
          v-for="infoList in infoChild1Lists"
          :key="infoList.id"
        >
          <div class="info_child1_li_top">
            <p
              :class="{info_child1_li_click_top: infoList.contract_short == infoChild1ListName}"
            >{{infoList.contract_name}}</p>
          </div>
          <div @click.right="infoC1RightFun(infoList.contract_short, infoList.contract_symbols)">
            <div class="info_child1_li_cont">
              <div>
                <p>卖出</p>
                <p
                  :class="infoList.up_ratio>=0?'info_child1_up_color':'info_child1_down_color'"
                >{{infoList.ask1_price}}</p>
                <p>{{infoList.ask1_volume}}</p>
              </div>
              <div>
                <p>最新</p>
                <p
                  :class="infoList.up_ratio>=0?'info_child1_up_color':'info_child1_down_color'"
                >{{infoList.current_price}}</p>
                <p>{{infoList.current_number}}</p>
              </div>
              <div>
                <p>买入</p>
                <p
                  :class="infoList.up_ratio>=0?'info_child1_up_color':'info_child1_down_color'"
                >{{infoList.bid1_price}}</p>
                <p>{{infoList.bid1_volume}}</p>
              </div>
              <div>
                <p>涨跌</p>
                <span
                  :class="infoList.up_ratio>=0?'info_child1_up_color':'info_child1_down_color'"
                >{{infoList.up_ratio}}</span>
              </div>
            </div>
          </div>
        </li>
      </draggable>
    </div>
    <!-- 右键空白的触发 -->
    <div
      v-clickoutside="handleCloseMenu"
      class="tf_right_menu"
      v-show="isShowRightMenu"
      v-bind:style="{ top: activeTopMenu + 'px', left: activeLeftMenu + 'px' }"
    >
      <ul class="tf_right_menu_ul">
        <li
          class="tf_right_menu_li"
          @click="infoRightMenuFun(rightMenuBtn.id)"
          v-for="rightMenuBtn in rightMenuBtns"
          :key="rightMenuBtn.id"
        >{{rightMenuBtn.name}}</li>
      </ul>
    </div>
    <!-- 右键具体的触发 -->
    <div
      v-clickoutside="handleClose"
      class="tf_right_menu"
      v-show="isShowRight"
      v-bind:style="{ top: activeTop + 'px', left: activeLeft + 'px' }"
    >
      <ul class="tf_right_menu_ul">
        <li
          class="tf_right_menu_li"
          @click="infoRightFun(rightBtn.id)"
          v-for="rightBtn in rightBtns"
          :key="rightBtn.id"
        >{{rightBtn.name}}</li>
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
import draggable from "vuedraggable";
export default {
  name: "Infofacechild1",
  components: {
    draggable
  },
  data() {
    return {
      isShowRightMenu: false, //右键空白处框默认隐藏
      activeTopMenu: 0, //右键空白处框初始位置
      activeLeftMenu: 0, //右键空白处框初始位置
      rightMenuBtns: [
        { id: 1, name: "移除所有自选" },
        { id: 2, name: "按涨幅 升序" },
        { id: 3, name: "按涨幅 降序" },
        { id: 4, name: "按品种排序" }
      ],
      isShowRight: false, //右键框默认隐藏
      activeTop: 0, //右键框初始位置
      activeLeft: 0, //右键框初始位置
      infoChild1Lists: [], // 自选合约列表
      infoChild1ListName: "", // 选中的合约名字
      rightBtns: [
        // {id: 1, name: "弹出"},
        { id: 2, name: "跳转到K线" },
        { id: 3, name: "跳转到分时" },
        { id: 4, name: "按涨幅 升序" },
        { id: 5, name: "按涨幅 降序" },
        { id: 6, name: "按品种排序" },
        { id: 7, name: "移除自选" },
        { id: 8, name: "此处外移除所有自选" }
      ],
      // infoC1GetAllContractFun: "", // 批量请求合约信息
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
      for (let i = 0; i < that.infoChild1Lists.length; i++) {
        if (that.infoChild1Lists[i].contract_symbols == val[2]) {
          that.infoChild1Lists[i].current_price = Number(val[3]).toFixed(
            that.infoChild1Lists[i].future_price
          ); // 最新价
          that.infoChild1Lists[i].current_number = Number(val[5]).toFixed(
            that.infoChild1Lists[i].future_price
          ); // 现手
          that.infoChild1Lists[i].bid1_price = Number(val[6]).toFixed(
            that.infoChild1Lists[i].future_price
          ); // 买价
          that.infoChild1Lists[i].ask1_price = Number(val[7]).toFixed(
            that.infoChild1Lists[i].future_price
          ); // 卖价
          if (val[8] != "----") {
            that.infoChild1Lists[i].bid1_volume = Number(val[8]).toFixed(
              that.infoChild1Lists[i].future_price
            ); // 买量
          } else {
            that.infoChild1Lists[i].bid1_volume = val[8]; // 买量
          }
          if (val[9] != "----") {
            that.infoChild1Lists[i].ask1_volume = Number(val[9]).toFixed(
              that.infoChild1Lists[i].future_price
            ); // 卖量
          } else {
            that.infoChild1Lists[i].ask1_volume = val[9]; // 卖量
          }
          that.infoChild1Lists[i].up_ratio = Number(
            (val[3] - val[14]) / val[14]
          ).toFixed(that.infoChild1Lists[i].future_price); // 涨幅
        }
      }
    }
  },
  directives: { clickoutside }, //自定义指令点击空白右键消失
  mounted: function() {
    let that = this;
    if (localStorage.getItem("infoFaceC1Lists")) {
      // 先从缓存取出
      that.infoChild1Lists = JSON.parse(
        localStorage.getItem("infoFaceC1Lists")
      );
    }
  },
  methods: {
    infoC1GetAllContractFun() {
      //批量请求合约信息
      let that = this;
      if (localStorage.getItem("infoFaceC1Lists")) {
        // 先从缓存取出
        that.infoChild1Lists = JSON.parse(
          localStorage.getItem("infoFaceC1Lists")
        );
      }
      let allCodeName = ""; // 合约字符串拼接
      for (let i = 0; i < that.infoChild1Lists.length; i++) {
        allCodeName += that.infoChild1Lists[i].contract_short + ",";
      }
      allCodeName = allCodeName.substring(0, allCodeName.length - 1);
      // console.log(allCodeName);
      let infoC1ArrSort = window.localStorage.getItem("infoC1ArrSort");
      if (allCodeName.length == 2) {
        // 删完后按拖拽处理
        infoC1ArrSort = window.localStorage.setItem(
          "infoC1ArrSort",
          "dargSort"
        );
      }
      if (infoC1ArrSort) {
        // console.log(JSON.parse(JSON.stringify(that.infoChild1Lists)));
        // console.log(data);
        for (let i = 0; i < that.infoChild1Lists.length; i++) {
          for (let j = 0; j < data.length; j++) {
            if (that.infoChild1Lists[i].contract_short == data[j].Symbol) {
              that.infoChild1Lists[i].ask1_price = data[j].SP1; // 卖价
              that.infoChild1Lists[i].ask1_volume = data[j].SV1; // 卖量
              that.infoChild1Lists[i].current_price = data[j].NewPrice; // 最新价
              that.infoChild1Lists[i].current_number = data[j].Vol2; // 现手
              that.infoChild1Lists[i].bid1_price = data[j].BP1; // 买价
              that.infoChild1Lists[i].bid1_volume = data[j].BV1; // 买量
              that.infoChild1Lists[i].up_ratio = data[j].PriceChangeRatio; // 涨幅
            }
          }
        }

        if (infoC1ArrSort == "upRatioSort") {
          // 按涨幅升序排序
          function sortBy(field) {
            //数字类型的比较
            return function(a, b) {
              return a[field] - b[field];
            };
          }
          that.infoChild1Lists.sort(sortBy("up_ratio"));
          // console.log("upRatioSort");
          // console.log(that.infoChild1Lists);
        } else if (infoC1ArrSort == "downRatioSort") {
          // 按涨幅降序排序
          function sortBy(field) {
            return function(a, b) {
              return b[field] - a[field];
            };
          }
          that.infoChild1Lists.sort(sortBy("up_ratio"));
          // console.log("downRatioSort");
          // console.log(that.infoChild1Lists);
        } else if (infoC1ArrSort == "codeNameSort") {
          // 按品种排序
          function compare(propertyName) {
            //字符串类型的比较
            return function(object1, object2) {
              var value1 = object1[propertyName];
              var value2 = object2[propertyName];
              if (value1 < value2) {
                return 1;
              } else if (value1 > value2) {
                return -1;
              } else {
                return 0;
              }
            };
          }
          that.infoChild1Lists.sort(compare("contract_name"));
          // console.log("codeNameSort");
          // console.log(that.infoChild1Lists);
        } else if (infoC1ArrSort == "dargSort") {
          // 拖拽后排序
          let arr2 = [];
          for (let i = 0; i < that.infoChild1Lists.length; i++) {
            for (let j = 0; j < data.length; j++) {
              if (that.infoChild1Lists[i].contract_short == data[j].Symbol) {
                arr2.push(that.infoChild1Lists[j]);
              }
            }
          }
          that.infoChild1Lists = arr2;
          // console.log("dargSort");
          // console.log(that.infoChild1Lists);
        }
      }
      let str = "";
      str = JSON.stringify(that.infoChild1Lists);
      window.localStorage.setItem("infoFaceC1Lists", str);
    },
    moveStart() {
      // 拖拽开始
      let that = this;
      let str = "";
      str = JSON.stringify(that.infoChild1Lists);
      window.localStorage.setItem("infoFaceC1Lists", str);
    },
    moveEnd(evt) {
      // 拖拽之后保存拖拽的顺序
      let that = this;
      let str = "";
      str = JSON.stringify(that.infoChild1Lists);
      window.localStorage.setItem("infoFaceC1Lists", str);
      // 如果拖拽了就按照拖拽的排序
      window.localStorage.setItem("infoC1ArrSort", "dargSort");
    },
    handleCloseMenu(e) {
      this.isShowRightMenu = false;
    },
    handleClose(e) {
      this.isShowRight = false;
    },
    infoChild1Fun(index, otherName) {
      //点击某一个卡片
      for (let i = 0; i < this.infoChild1Lists.length; i++) {
        if (this.infoChild1Lists[i].contract_short == index) {
          this.infoChild1ListName = index;
        }
      }
      this.$store.commit("symbolNameFun", index); // 合约名字分时 K线用
      this.$store.commit("otherCodeNameFun", otherName); // 新加的合约名字
      // 通过ref调用其他地方的函数 值等
      if (this.$store.state.showTface == true) {
        // 显示的时候调用
        this.$parent.$parent.$refs.out.getOrderOptionListsFun(); // 调用外盘交易中的函数获取交易所列表
      }
    },
    infoC1RightMenuFun() {
      // 右键空白地方
      this.isShowRight = false;
      this.isShowRightMenu = true;
      let totalWidth = this.$refs.infoC1Wrap.getBoundingClientRect().right; //总宽度
      if (totalWidth - event.pageX < 150) {
        //边缘检测
        this.activeLeftMenu = event.pageX - 150; //给left赋值
        this.activeTopMenu = event.pageY; //给top赋值
      } else {
        this.activeLeftMenu = event.pageX; //给left赋值
        this.activeTopMenu = event.pageY; //给top赋值
      }
    },
    infoRightMenuFun(index) {
      //右键空白处里面的事件
      let that = this;
      for (let i = 0; i < that.rightMenuBtns.length; i++) {
        if (index == that.rightMenuBtns[i].id) {
          // console.log(that.rightMenuBtns[i].name);
          if (that.rightMenuBtns[i].name == "移除所有自选") {
            that.infoChild1Lists = [];
            // 移除所有自选后保存
            window.localStorage.setItem("infoFaceC1Lists", "");
            if (that.infoChild1Lists == "[]") {
              that.websocketBoolean = false;
              clearInterval(that.infoC1WebSocketTimer);
              that.websock.close(); //离开路由之后断开websocket连接
            }
          } else if (that.rightMenuBtns[i].name == "按涨幅 升序") {
            function sortBy(field) {
              //数字类型的比较
              return function(a, b) {
                return a[field] - b[field];
              };
            }
            that.infoChild1Lists.sort(sortBy("up_ratio"));
            // 排序后保存排序的顺序
            let upRatioStr = "";
            upRatioStr = JSON.stringify(that.infoChild1Lists);
            window.localStorage.setItem("infoFaceC1Lists", upRatioStr);
            window.localStorage.setItem("infoC1ArrSort", "upRatioSort"); // 按涨幅升序排序
          } else if (that.rightMenuBtns[i].name == "按涨幅 降序") {
            function sortBy(field) {
              return function(a, b) {
                return b[field] - a[field];
              };
            }
            that.infoChild1Lists.sort(sortBy("up_ratio"));
            // 排序后保存排序的顺序
            let downRatioStr = "";
            downRatioStr = JSON.stringify(that.infoChild1Lists);
            window.localStorage.setItem("infoFaceC1Lists", downRatioStr);
            window.localStorage.setItem("infoC1ArrSort", "downRatioSort"); // 按涨幅降序排序
          } else if (that.rightMenuBtns[i].name == "按品种排序") {
            function compare(propertyName) {
              //字符串类型的比较
              return function(object1, object2) {
                var value1 = object1[propertyName];
                var value2 = object2[propertyName];
                if (value1 < value2) {
                  return 1;
                } else if (value1 > value2) {
                  return -1;
                } else {
                  return 0;
                }
              };
            }
            that.infoChild1Lists.sort(compare("contract_name"));
            // 排序后保存排序的顺序
            let codeStr = "";
            codeStr = JSON.stringify(that.infoChild1Lists);
            window.localStorage.setItem("infoFaceC1Lists", codeStr);
            window.localStorage.setItem("infoC1ArrSort", "codeNameSort"); // 按品种排序
          }
          that.isShowRightMenu = false; // 点击后关闭弹窗
        }
      }
    },
    infoC1RightFun(index, otherName) {
      //右键某个卡片
      for (let i = 0; i < this.infoChild1Lists.length; i++) {
        if (this.infoChild1Lists[i].contract_short == index) {
          this.infoChild1ListName = index;
        }
      }
      this.$store.commit("symbolNameFun", index); // 合约名字分时 K线用
      this.$store.commit("otherCodeNameFun", otherName); // 新加的合约名字
      // 通过ref调用其他地方的函数 值等
      if (this.$store.state.showTface == true) {
        // 显示的时候调用
        this.$parent.$parent.$refs.out.getOrderOptionListsFun(); // 调用外盘交易中的函数获取交易所列表
      }
      this.isShowRight = true;
      this.isShowRightMenu = false;
      let totalWidth = this.$refs.infoC1Wrap.getBoundingClientRect().right; //总宽度
      if (totalWidth - event.pageX < 150) {
        //边缘检测
        this.activeLeft = event.pageX - 150; //给left赋值
        this.activeTop = event.pageY; //给top赋值
      } else {
        this.activeLeft = event.pageX + 1; //给left赋值
        this.activeTop = event.pageY + 1; //给top赋值
      }
    },
    infoRightFun(index) {
      //右键某个卡片里面的事件
      let that = this;
      for (let i = 0; i < that.rightBtns.length; i++) {
        if (index == that.rightBtns[i].id) {
          // console.log(this.rightBtns[i].name);
          if (that.rightBtns[i].name == "弹出") {
            // console.log(that.rightBtns[i].name);
          } else if (that.rightBtns[i].name == "跳转到K线") {
            that.$router.push({
              path: "/wrap/infoFace/infoFaceChild4"
            });
            // 调用infoFace里面的函数改变K线按钮
            that.$parent.infoLeftBtnsActiveFun(4); // 改变K线按钮
          } else if (that.rightBtns[i].name == "跳转到分时") {
            that.$router.push({
              path: "/wrap/infoFace/infoFaceChild3"
            });
            that.$parent.infoLeftBtnsActiveFun(3); // 改变分时按钮
            // 调用infoFace里面的函数改变K线按钮
            // that.$parent.$parent.$refs.route.infoLeftBtnsActiveFun(3);
          } else if (that.rightBtns[i].name == "按涨幅 升序") {
            function sortBy(field) {
              //数字类型的比较
              return function(a, b) {
                return a[field] - b[field];
              };
            }
            that.infoChild1Lists.sort(sortBy("up_ratio"));
            // 排序后保存排序的顺序
            let upRatioStr = "";
            upRatioStr = JSON.stringify(this.infoChild1Lists);
            window.localStorage.setItem("infoFaceC1Lists", upRatioStr);
            window.localStorage.setItem("infoC1ArrSort", "upRatioSort"); // 按涨幅升序排序
          } else if (that.rightBtns[i].name == "按涨幅 降序") {
            function sortBy(field) {
              return function(a, b) {
                return b[field] - a[field];
              };
            }
            that.infoChild1Lists.sort(sortBy("up_ratio"));
            // 排序后保存排序的顺序
            let downRatioStr = "";
            downRatioStr = JSON.stringify(this.infoChild1Lists);
            window.localStorage.setItem("infoFaceC1Lists", downRatioStr);
            window.localStorage.setItem("infoC1ArrSort", "downRatioSort"); // 按涨幅降序排序
          } else if (that.rightBtns[i].name == "按品种排序") {
            function compare(propertyName) {
              //字符串类型的比较
              return function(object1, object2) {
                var value1 = object1[propertyName];
                var value2 = object2[propertyName];
                if (value1 < value2) {
                  return 1;
                } else if (value1 > value2) {
                  return -1;
                } else {
                  return 0;
                }
              };
            }
            that.infoChild1Lists.sort(compare("contract_name"));
            // 排序后保存排序的顺序
            let codeStr = "";
            codeStr = JSON.stringify(this.infoChild1Lists);
            window.localStorage.setItem("infoFaceC1Lists", codeStr);
            window.localStorage.setItem("infoC1ArrSort", "codeNameSort"); // 按品种排序
          } else if (that.rightBtns[i].name == "移除自选") {
            let result = that.infoChild1Lists.findIndex(item => {
              return item.contract_short == that.$store.state.symbolName;
            });
            that.infoChild1Lists.splice(result, 1);
            // 移除自选后保存
            let codeStr = "";
            codeStr = JSON.stringify(this.infoChild1Lists);
            window.localStorage.setItem("infoFaceC1Lists", codeStr);
            if (that.infoChild1Lists == "[]") {
              that.websocketBoolean = false;
              clearInterval(that.infoC1WebSocketTimer);
              that.websock.close(); //离开路由之后断开websocket连接
            }
          } else if (that.rightBtns[i].name == "此处外移除所有自选") {
            let indexArr = that.infoChild1Lists.find(item => {
              return item.contract_short == that.$store.state.symbolName;
            });
            that.infoChild1Lists = [];
            that.infoChild1Lists.push(indexArr);
            // 此处外移除所有自选后保存
            let codeStr = "";
            codeStr = JSON.stringify(this.infoChild1Lists);
            window.localStorage.setItem("infoFaceC1Lists", codeStr);
          }
          that.isShowRight = false; // 点击之后关闭右键菜单
        }
      }
    }
  },
  beforeDestroy() {
    //在开始销毁实例时调用。此时实例仍然有功能。
    //清除定时器
    // console.log("beforeDestroy")
  },
  destroyed() {
    //在实例被销毁之后调用。此时所有的绑定和实例的指令已经解绑，注意是解绑不是销毁,所有的子实例也已经被销毁。
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 右键 */
.tf_right_menu {
  position: fixed;
  z-index: 2500;
  width: 150px;
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

.infofacechild1 {
  width: 100%;
  height: 100%;
}
.info_child1_ul {
  padding: 1px;
}
.info_child1_li {
  display: inline-block;
  width: 230px;
  height: 183px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 1);
  border: 2px solid rgba(31, 40, 51, 1);
  margin: 1px 1px 0 0;
}
.info_child1_li_top {
  width: 100%;
  height: 30px;
  border-bottom: 1px solid #303341;
  padding: 0 7px;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  align-items: center;
  -webkit-align-items: center;
}
.info_child1_li_top > p {
  color: #868a90;
  font-size: 12px;
  line-height: 30px;
  font-weight: 600;
}
.info_child1_li_top > .info_child1_li_click_top {
  color: #c7444a;
}
.info_child1_li_top > img {
  width: 16px;
  height: 16px;
  border-radius: 2px;
  padding: 3px;
}
.info_child1_li_top > img:hover {
  background: rgb(98, 102, 119);
}

.info_child1_li_cont {
  padding: 0 28px;
  width: 100%;
  height: 149px;
}
.info_child1_li_cont > div {
  padding-top: 20px;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  align-items: center;
  -webkit-align-items: center;
}
.info_child1_li_cont > div > p {
  font-size: 12px;
  line-height: 12px;
  color: #e6e8f2;
}
.info_child1_li_cont > div > img {
  width: 18px;
  height: 18px;
  vertical-align: bottom;
}
.info_child1_li_cont > div > p:nth-child(1) {
  width: 66px;
}
.info_child1_li_cont > div > p:nth-child(2) {
  width: 66px;
}
.info_child1_li_cont > div > p:nth-child(3) {
  width: 27px;
}
.info_child1_li_cont > div > span {
  vertical-align: bottom;
  color: white;
  font-size: 12px;
  line-height: 12px;
}
.info_child1_li_cont > div > span {
  display: inline-block;
  width: 97px;
}

.info_child1_li_cont > div .info_child1_down_color {
  color: #0ca50c;
}
.info_child1_li_cont > div .info_child1_up_color {
  color: #c74549;
}
</style>
