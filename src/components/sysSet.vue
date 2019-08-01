<template>
  <div class="tf_menu_change_pass_wrap">
    <div class="tf_menu_set">
      <div class="tf_menu_change_pass_top">
        <h4>交易选项设置</h4>
        <img src="../assets/img/closeBgGary.png" @click="tfMenuSetFun" title="关闭">
      </div>
      <div class="tf_menu_set_cont">
        <ul class="tf_menu_set_cont_btns">
          <li
            @click="tfMenuSetBtnsFun(tfMenuSetBtn.id)"
            :class="tfMenuSetBtn.isClicked?'tf_menu_set_cont_bth':''"
            v-for="tfMenuSetBtn in tfMenuSetBtns"
            :key="tfMenuSetBtn.id"
          >{{tfMenuSetBtn.name}}</li>
        </ul>
        <ul class="tf_menu_set_cont_ul">
          <!-- 常规设置 -->
          <li class="tf_menu_set_cont_li1" v-show="tfMenuSetBtns[0].isClicked">
            <div class="tf_menu_set_cont_li1_ipt1">
              <input v-model="tfMenuSetBtn1Ipt1" type="checkbox" id="tf_menu_set_btn1_ipt1">
              <label for="tf_menu_set_btn1_ipt1" class="tf_menu_set_cont_li1_mark">下单确认</label>
              <input v-model="tfMenuSetBtn1Ipt2" type="checkbox" id="tf_menu_set_btn1_ipt2">
              <label for="tf_menu_set_btn1_ipt2" class="tf_menu_set_cont_li1_mark">批量下单确认</label>
            </div>
            <div class="tf_menu_set_cont_li1_ipt2">
              <input v-model="$store.state.isSysSetDbInput3" type="checkbox" id="tf_menu_set_btn1_ipt3">
              <label for="tf_menu_set_btn1_ipt3" class="tf_menu_set_cont_li1_mark">双击委托撤单</label>
              <input v-model="tfMenuSetBtn1Ipt4" type="checkbox" id="tf_menu_set_btn1_ipt4">
              <label for="tf_menu_set_btn1_ipt4" class="tf_menu_set_cont_li1_mark">双击持仓对价平仓</label>
            </div>
            <div class="tf_menu_set_cont_li1_order">
              <p>下单快捷手数</p>
              <div>
                <!-- <input
                  @click="tfMenuSetOrderNumFun(tfMenuSetOrderNum.id)"
                  :class="tfMenuSetOrderNum.isClicked?'tf_menu_set_cont_li1_order_activep':''"
                  v-for="tfMenuSetOrderNum in tfMenuSetOrderNums"
                  :key="tfMenuSetOrderNum.id"
                  v-model="tfMenuSetOrderNum.name"
                /> -->
                <input type="number"
                  v-for="tfMenuSetOrderNum in tfMenuSetOrderNums"
                  :key="tfMenuSetOrderNum.id"
                  v-model="tfMenuSetOrderNum.name"
                >
              </div>
            </div>
            <div class="tf_btn7_online_ul_btn">
              <span @click="tfMenuSetUsuallyCancelFun">取消</span>
              <span @click="tfMenuSetUsuallyConfirmFun">确定</span>
            </div>
          </li>
          <!-- 默认手数 -->
          <li v-show="tfMenuSetBtns[1].isClicked">
            <div class="tf_menu_set_cont_li2">
              <div class="tf_btm_cont_wrap tf_btn8_list1_alert1_wrap">
                <table
                  class="tf_btm_cont_btn tf_btn8_list1_alert1_table tf_menu_set_cont_li_table"
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                >
                  <thead>
                    <tr>
                      <th
                        v-for="tfMenuSetDefaultThead in tfMenuSetDefaultTheads"
                        :key="tfMenuSetDefaultThead.id"
                      >{{tfMenuSetDefaultThead.name}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="sysSetNumList in sysSetNumLists"
                      :key="sysSetNumList.id"
                    >
                      <td>{{sysSetNumList.futures_code}}</td>
                      <td>{{sysSetNumList.futures_name}}</td>
                      <td>
                        <input
                          type="text"
                          v-model="sysSetNumList.defaultNum"
                          @keyup="check_count($event)"
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="tf_btn7_online_ul_btn">
              <span @click="tfMenuSetFun">取消</span>
              <span @click="tfMenuDefaultFun">确定</span>
            </div>
          </li>
          <!-- 超价设置 -->
          <li v-show="tfMenuSetBtns[2].isClicked">
            <div class="tf_menu_set_cont_li3">
              <div class="tf_btm_cont_wrap tf_btn8_list1_alert1_wrap">
                <table
                  class="tf_btm_cont_btn tf_btn8_list1_alert1_table tf_menu_set_cont_li_table tf_menu_set_cont_li_table_three"
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                >
                  <thead>
                    <tr>
                      <th
                        v-for="tfMenuSetSuperPriceThead in tfMenuSetSuperPriceTheads"
                        :key="tfMenuSetSuperPriceThead.id"
                      >{{tfMenuSetSuperPriceThead.name}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="sysSetOverList in sysSetOverLists"
                      :key="sysSetOverList.id"
                    >
                      <td>{{sysSetOverList.futures_code}}</td>
                      <td>{{sysSetOverList.futures_name}}</td>
                      <td>
                        <input type="number" v-model="sysSetOverList.buyPriceNum">
                      </td>
                      <td>
                        <input type="number" v-model="sysSetOverList.sellPriceNum">
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="tf_btn7_online_ul_btn">
              <span @click="tfMenuSetFun">取消</span>
              <span @click="tfMenuSetSuperPriceFun">确定</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SysSet",
  components: {},
  data() {
    return {
      tfMenuSetBtns: [ // 设置按钮
        { id: 1, name: "常规设置", isClicked: true },
        { id: 2, name: "默认手数", isClicked: false },
        { id: 3, name: "超价设置", isClicked: false }
      ],
      tfMenuSetBtn1Ipt1: false, // 下单确认 选择
      tfMenuSetBtn1Ipt2: false, // 批量下单确认 选择
      tfMenuSetBtn1Ipt4: false, // 双击持仓对价平仓 选择
      tfMenuSetOrderNums: [],// 下单快捷手数
      tfMenuSetDefaultTheads: [ // 设置里面 默认手数 头部
        { id: 1, name: "品种" },
        { id: 2, name: "品种名" },
        { id: 3, name: "默认下单手数" }
      ],
      sysSetNumLists: [], // 设置里面 默认手数 内容
      tfMenuSetSuperPriceTheads: [ // 设置里面 超价设置 头部
        { id: 1, name: "品种" },
        { id: 2, name: "品种名" },
        { id: 3, name: "买超价(最小变动价位)" },
        { id: 4, name: "卖超价(最小变动价位)" }
      ],
      sysSetOverLists: [], // 设置里面 超价设置 内容
      tfMenuSetEnterFun: "", // 进来触发的函数
    };
  },
  created: function() {
    let that = this;
  },
  mounted: function() {
    $(function() {
      $(".tf_menu_set").draggable({
        handle: ".tf_menu_change_pass_top",
        containment: "body"
      });
    });
    let that = this;
    if (localStorage.getItem("sysSetInput3") == 'true') { // 双击委托撤单
      that.$store.commit("isSysSetDbInput3Fun", true);
    } else if (localStorage.getItem("sysSetInput3") == 'false') {
      that.$store.commit("isSysSetDbInput3Fun", false);
    }
    if (localStorage.getItem("sysSetOrderNum")) { // 下单快捷手数
      that.tfMenuSetOrderNums = JSON.parse(localStorage.getItem("sysSetOrderNum"));
      that.$store.commit("setNumListsFun", that.tfMenuSetOrderNums);
    } else {
      that.tfMenuSetOrderNums = that.$store.state.setNumLists;
    }
  },
  methods: {
    tfMenuSetFun() {
      this.$store.commit("isSysSetFun"); // 设置
    },
    sysSetDbIpt3() {
      this.$store.commit("isSysSetDbInput3Fun");
    },
    tfMenuSetBtnsFun(index) {
      // 设置里面的三个按钮
      for (let i = 0; i < this.tfMenuSetBtns.length; i++) {
        if (index == this.tfMenuSetBtns[i].id) {
          this.tfMenuSetBtns[i].isClicked = true;
        } else {
          this.tfMenuSetBtns[i].isClicked = false;
        }
      }
      let that = this;
      if (index == 1) { // 常规设置
        
      } else if (index == 2) { // 默认手数
        if (localStorage.getItem("setNumLists")) {
          that.sysSetNumLists = JSON.parse(localStorage.getItem("setNumLists"));
        } else {
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
                for (let i = 0; i < res.data.data.length; i++) {
                  res.data.data[i].defaultNum = 1;
                }
                that.sysSetNumLists = res.data.data;
                // console.log(that.sysSetNumLists);
                window.localStorage.setItem("setNumLists", JSON.stringify(that.sysSetNumLists));
              } else if (res.data.code == 0 || res.data.code == -1) {
                that.$message.error(res.data.msg);
              }
            });
        }
      } else if (index == 3) { // 超价设置
        if (localStorage.getItem("setOverLists")) {
          that.sysSetOverLists = JSON.parse(localStorage.getItem("setOverLists"));
        } else {
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
                for (let i = 0; i < res.data.data.length; i++) {
                  res.data.data[i].buyPriceNum = 1;
                  res.data.data[i].sellPriceNum = -1;
                }
                that.sysSetOverLists = res.data.data;
                window.localStorage.setItem("setOverLists", JSON.stringify(that.sysSetOverLists));
              } else if (res.data.code == 0 || res.data.code == -1) {
                that.$message.error(res.data.msg);
              }
            });
        }
        
      }
    },
    tfMenuSetUsuallyCancelFun() { // 设置里面常规设置 取消按钮
      this.$store.commit("isSysSetFun");
    },
    tfMenuSetUsuallyConfirmFun() { // 设置里面常规设置 确认按钮
      this.$store.commit("isSysSetFun");
      localStorage.setItem("sysSetInput3", this.$store.state.isSysSetDbInput3);
      localStorage.setItem("sysSetOrderNum", JSON.stringify(this.tfMenuSetOrderNums)); // 下单快捷手数
      // console.log(this.tfMenuSetBtn1Ipt1, this.tfMenuSetBtn1Ipt2, this.tfMenuSetBtn1Ipt3, this.tfMenuSetBtn1Ipt4, this.tfMenuSetOrderNum);
    },
    tfMenuDefaultFun() { // 设置里面默认手数 确认按钮
      this.$store.commit("isSysSetFun");
      localStorage.setItem("setNumLists", JSON.stringify(this.sysSetNumLists));
      this.$store.state.setNumLists = JSON.parse(localStorage.getItem("setNumLists")); // 设置 默认手数
    },
    check_count(event) { // 设置里面默认手数只能是正整数
      var value = event.target.value;
      if (!/^\+?[1-9][0-9]*$/.test(value)) {
        event.target.value = value.replace(/[^0-9]/ig,"");
      }
    },
    tfMenuSetSuperPriceFun() { // 设置里面 超价设置 确认按钮
      this.$store.commit("isSysSetFun");
      window.localStorage.setItem("setOverLists", JSON.stringify(this.sysSetOverLists));
      this.$store.state.setOverLists = JSON.parse(localStorage.getItem("setOverLists")); // 设置 超价设置
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tf_menu_change_pass_wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1500;
  background-color: rgba(0, 0, 0, 0.6);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.tf_menu_set {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -277.5px;
  margin-top: -224px;
  z-index: 1500;
  width: 555px;
  height: 448px;
  min-width: 555px;
  border-radius: 21px;
  background: white;
}

.tf_menu_change_pass_top {
  position: relative;
  width: 100%;
  height: 40px;
  border-radius: 21px 21px 0px 0px;
  background-color: rgba(235, 235, 238, 1);
  text-align: center;
}

.tf_menu_change_pass_top>h4 {
  color: rgba(16, 16, 16, 1);
  font-size: 18px;
  line-height: 40px;
  display: inline-block;
}

.tf_menu_change_pass_top>img {
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

.tf_menu_change_pass_top>img:hover {
  background: #999;
}

.tf_btm_cont_btn thead,
.tf_btm_cont_btn tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}

.tf_btm_cont_btn>thead {
  width: 100%;
  height: 30px;
}

.tf_btn8_list1_alert1_table {
  width: 99%;
  display: block;
}

.tf_btn8_list1_alert1_table thead th {
  width: 83px;
  height: 28px;
  line-height: 28px;
  background-color: rgba(230, 230, 232, 1);
  text-align: center;
  border: 1px solid rgba(213, 210, 210, 1);
  color: rgba(153, 153, 153, 1);
  font-size: 14px;
}

.tf_btn8_list1_alert1_table>tbody {
  display: block;
  width: 100%;
  height: 226px;
  overflow-y: auto;
}

.tf_btn8_list1_alert1_table>tbody tr {
  border-bottom: 1px solid #E8E8E8;
}

.tf_btn8_list1_alert1_table>tbody td {
  width: 83px;
  height: 30px;
  text-align: center;
  color: rgba(96, 96, 96, 1);
  font-size: 14px;
}
/* 滚动条整体部分 */
.tf_btm_cont_wrap::-webkit-scrollbar {
  width: 0;
  height: 10px;
  background-color: rgba(230, 230, 232, 1);
  text-align: center;
}

/* 外层轨道 */
.tf_btm_cont_wrap::-webkit-scrollbar-track {
  background-color: rgba(230, 230, 232, 1);
  border-radius: 8px;
  width: 8px;
  padding: 0 4px;
}

/* 滚动条滑块 */
.tf_btm_cont_wrap::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background: rgba(153, 153, 153, 1);
  width: 8px;
}

.tf_btm_cont_btn>tbody::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  background-color: #a1a1a1;
  text-align: center;
  cursor: pointer;
}

/* 外层轨道 */
.tf_btm_cont_btn>tbody::-webkit-scrollbar-track {
  background-color: #a1a1a1;
  border-radius: 8px;
  width: 8px;
  padding: 0 4px;
  cursor: pointer;
}

/* 滚动条滑块 */
.tf_btm_cont_btn>tbody::-webkit-scrollbar-thumb {
  border-radius: 8px;
  border: 1px solid #888;
  background: #807c7c;
  width: 8px;
  cursor: pointer;
}

.tf_menu_set_cont {
  padding: 20px 20px 0;
}

.tf_menu_set_cont_btns {
  font-size: 0;
  border-bottom: 1px solid rgba(223, 223, 223, 1);
}

.tf_menu_set_cont_btns>li {
  display: inline-block;
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  border-radius: 4px;
  color: rgba(0, 0, 0, 1);
  cursor: pointer;
}

.tf_menu_set_cont_btns>li:hover {
  background-color: rgb(238, 157, 30);
  color: white;
}

.tf_menu_set_cont_btns>.tf_menu_set_cont_bth {
  color: rgba(255, 255, 255, 1);
  background-color: rgb(238, 157, 30);
}

.tf_menu_set_cont_li1>div {
  margin-top: 20px;
}

.tf_menu_set_cont_li1>div input {
  vertical-align: middle;
}

.tf_menu_set_cont_li1>div label {
  vertical-align: middle;
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  cursor: pointer;
}

.tf_menu_set_cont_li1_ipt1 label {
  margin-right: 49px;
}
.tf_menu_set_cont_li1_ipt2 label {
  margin-right: 20px;
}

.tf_menu_set_cont_li1>div input[type="checkbox"] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
  vertical-align: middle;
  cursor: pointer;
}

.tf_menu_set_cont_li1_mark::before {
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

.tf_menu_set_cont_li1>div input[type="checkbox"]:checked+.tf_menu_set_cont_li1_mark::before {
  content: '\2713';
  color: white;
  background: #FA8E53;
  font-size: 10px;
  line-height: 14px;
  text-align: center;
  margin-right: 5px;
  vertical-align: middle;
}

.tf_menu_set_cont_li1_order {
  margin-top: 40px;
  font-size: 0;
}

.tf_menu_set_cont_li1_order>p {
  line-height: 20px;
  color: rgba(172, 172, 172, 1);
  font-size: 14px;
}

.tf_menu_set_cont_li1_order>div>input {
  display: inline-block;
  width: 100px;
  height: 30px;
  line-height: 30px;
  color: rgba(16, 16, 16, 1);
  text-align: center;
  border: 1px solid rgba(223, 223, 223, 1);
  margin: 20px 106px 0 0;
  font-size: 14px;
  border-radius: 4px;
}

.tf_menu_set_cont_li1_order>div>input:nth-child(3n) {
  margin-right: 0;
}

/* 默认手数 */
.tf_menu_set_cont_li2 {
  margin-top: 20px;
}

.tf_menu_set_cont_li_table>tbody {
  height: 230px;
}

.tf_menu_set_cont_li_table>tbody td input {
  width: 100%;
  height: 28px;
  text-align: center;
  font-size: 14px;
  line-height: 100%;
}

/* 超价设置 */
.tf_menu_set_cont_li3 {
  margin-top: 20px;
}

.tf_menu_set_cont_li_table_three>thead th:nth-child(1) {
  width: 15%;
}

.tf_menu_set_cont_li_table_three>thead th:nth-child(2) {
  width: 15%;
}

.tf_menu_set_cont_li_table_three>thead th:nth-child(3) {
  width: 35%;
}

.tf_menu_set_cont_li_table_three>thead th:nth-child(4) {
  width: 35%;
}

.tf_menu_set_cont_li_table_three>tbody td:nth-child(1) {
  width: 15%;
}

.tf_menu_set_cont_li_table_three>tbody td:nth-child(2) {
  width: 15%;
}

.tf_menu_set_cont_li_table_three>tbody td:nth-child(3) {
  width: 35%;
}

.tf_menu_set_cont_li_table_three>tbody td:nth-child(4) {
  width: 35%;
}
.tf_btn7_online_ul_btn {
  margin-top: 25px;
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
