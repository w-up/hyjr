import Vue from 'vue'; //引用vue
import Vuex from 'vuex'; //引用vuex
Vue.use(Vuex); //使用vuex

const state = { //
  isFocus: true, // 是否获取焦点
  isWinShow: false, // 窗口显示
  themeStyle: 1, // 主题风格 1灰色2黑色
  showOutTranLogin: false, //控制外盘登录
  noLoginOutTran: true, //未登录状态
  isLoginedOutTran: false, //已登录状态
  isloginDisclaimer: false, // 免责声明
  isLoginSuccess: false, // 登录成功
  isAboutUs: false, // 关于我们
  isDrawOrder: false, // 画线下单
  isAddPrepaid: false, // 添加预埋单
  isAddCondition: false, // 添加条件单
  isAddConditionChange: false, // 修改条件单
  isAddConditionListinfo: "", // 修改条件单信息
  isAddLoss: false, // 止损开仓
  isSubAdd: true, // 加减控制

  isSysOnlineMoney: false, // 在线出入金
  isSysCloseDate: false, // 结算时间
  isSysChangePass: false, // 更改密码
  isSysSet: false, // 设置
  isSysSetDbInput3: false, // 设置 双击委托撤单
  setNumLists: [ // 设置 默认手数
    {
      id: 1,
      name: 1
    },
    {
      id: 2,
      name: 2
    },
    {
      id: 3,
      name: 3
    },
    {
      id: 4,
      name: 4
    },
    {
      id: 5,
      name: 5
    },
    {
      id: 6,
      name: 6
    },
    {
      id: 7,
      name: 10
    },
    {
      id: 8,
      name: 50
    },
    {
      id: 9,
      name: 100
    }
  ],
  setOverLists: "", // 设置 超价设置

  showTface: false, //控制 外盘的显隐
  isShowAlertTface: false, //控制 外盘的弹出
  infoFaceHeight: false, // 控制信息面板的高度
  contractTyle: 0, // 合约类型: 主力合约0 其他合约1
  exchangeId: 0, // 交易所id
  codeName: "", // 中文合约名字
  symbolLists: "", // 合约列表
  symbolName: "", // 英文合约名字
  otherCodeName: "", //新加的合约名字
  allSymbolList: JSON.parse(localStorage.getItem("allSymbolList")) || [], // 存储推送的所有合约
  point: "", // 小数位
  tokenStr: "", // 登录token
  userNumber: "", // 用户账号
  userName: "", // 用户名

  updateSymbol: "", // 推送更新
}

// getters 可以认为是 store 的计算属性
const getters = {
  // count: function (state) {
  //   return state.count += 100;
  // },
  // isShowTf: function (state) {
  //   return state.showTface != state.showTface;
  // }
};

//声明一个常量mutations，将所有的mutation放入其中
const mutations = {
  isFocusFun(state, index) { // 获取焦点
    state.isFocus = index;
  },
  symbolListsFun(state, index) { // 合约列表
    state.symbolLists = index;
    // console.log(JSON.parse(JSON.stringify(index)));
  },
  symbolNameFun(state, index) { // 英文合约名字
    state.symbolName = index;
    // console.log(JSON.parse(JSON.stringify(index)));
  },
  changeCodeNameFun(state, name) { // 中文合约名字
    state.codeName = name;
  },
  otherCodeNameFun(state, name) { // 新加的合约名字
    state.otherCodeName = name;
  },
  pointFun(state, index) {
    state.point = index;
  },
  // 窗口 控制函数
  isWinShowFun(state) {
    // console.log(state.isloginDisclaimer);
    if (state.isWinShow) {
      state.isWinShow = false;
    } else {
      state.isWinShow = true;
    }
  },
  // 主题风格 控制函数 1灰色2黑色
  themeStyleFun(state, index) {
    state.themeStyle = index;
  },
  // 免责声明 控制函数
  isloginDisclaimerFun(state) {
    // console.log(state.isloginDisclaimer);
    if (state.isloginDisclaimer) {
      state.isloginDisclaimer = false;
    } else {
      state.isloginDisclaimer = true;
    }
  },
  // 登录成功 控制函数
  isLoginSuccessFun(state) {
    // console.log(state.isloginDisclaimer);
    if (state.isLoginSuccess) {
      state.isLoginSuccess = false;
    } else {
      state.isLoginSuccess = true;
    }
  },
  // 关于我们 控制函数
  isAboutUsFun(state) {
    if (state.isAboutUs) {
      state.isAboutUs = false;
    } else {
      state.isAboutUs = true;
    }
  },
  // 画线下单 控制函数
  isDrawOrderFun(state) {
    if (state.isDrawOrder) {
      state.isDrawOrder = false;
    } else {
      state.isDrawOrder = true;
    }
  },
  // 添加预埋单 控制函数
  isAddPrepaidFun(state) {
    if (state.isAddPrepaid) {
      state.isAddPrepaid = false;
    } else {
      state.isAddPrepaid = true;
    }
  },
  // 添加条件单 控制函数
  isAddConditionFun(state) {
    if (state.isAddCondition) {
      state.isAddCondition = false;
    } else {
      state.isAddCondition = true;
    }
  },
  // 止损开仓 控制函数
  isAddLossFun(state) {
    if (state.isAddLoss) {
      state.isAddLoss = false;
    } else {
      state.isAddLoss = true;
    }
  },
  // 加减 控制函数
  isSubAddFun(state, index) {
    state.isSubAdd = index;
  },
  // 在线出入金 控制函数
  isSysOnlineMoneyFun(state) {
    if (state.isSysOnlineMoney) {
      state.isSysOnlineMoney = false;
    } else {
      state.isSysOnlineMoney = true;
    }
  },
  // 更改密码 控制函数
  isSysChangePassFun(state) {
    if (state.isSysChangePass) {
      state.isSysChangePass = false;
    } else {
      state.isSysChangePass = true;
    }
  },
  // 结算时间 控制函数
  isSysCloseDateFun(state) {
    if (state.isSysCloseDate) {
      state.isSysCloseDate = false;
    } else {
      state.isSysCloseDate = true;
    }
  },
  // 设置 控制函数
  isSysSetFun(state) {
    if (state.isSysSet) {
      state.isSysSet = false;
    } else {
      state.isSysSet = true;
    }
  },
  isSysSetDbInput3Fun(state, index) { // 设置双击撤单
    state.isSysSetDbInput3 = index;
  },
  setNumListsFun(state, index) { // 下单快捷手数
    state.setNumLists = index;
  },
  // 下单菜单的显隐
  loginOutTranFun(state) { // 控制外盘登录显示
    // console.log(state.showOutTranLogin);
    state.showOutTranLogin = true;
  },
  cancelLoginOutTranFun(state) { //取消外盘登录
    state.showOutTranLogin = false;
  },
  // 下单菜单的显隐
  isShowTfFun(state) { // 点击F12控制外盘显示隐藏
    // console.log(state.showTface);
    if (state.showTface) {
      state.showTface = false;
    } else {
      state.showTface = true;
    }
  },
  isShowAlertTfaceFun(state, index) { // 控制外盘弹出
    // console.log(state.isShowAlertTface);
    state.isShowAlertTface = index;
  },
  infoFaceHeightFun(state, index) { // 控制信息的高度
    state.infoFaceHeight = index;
  },
  // 传递 合约类型0/1 与 交易所id
  contractExchangeChange(state, cont) {
    state.contractTyle = cont.i;
    state.exchangeId = cont.n;
  },
  // token的函数
  tokenStrFun(state, name) {
    state.tokenStr = name;
  },
  // 用户名的函数
  userNameFun(state, name) {
    state.userName = name;
  },
  updateSymbolFun(state, index) {
    state.updateSymbol = index;
    if (state.allSymbolList.length != 0) {
      let item = state.allSymbolList.findIndex(item => {
        return item[2] === index[2];
      });
      if (item == -1) {
        state.allSymbolList.push(index);
      } else {
        state.allSymbolList[item] = index;
      }
    } else {
      state.allSymbolList.push(index);
    }
    localStorage.setItem("allSymbolList", JSON.stringify(state.allSymbolList));
  }
}

export default new Vuex.Store({ //暴露Store对象
  state,
  getters,
  mutations
});
