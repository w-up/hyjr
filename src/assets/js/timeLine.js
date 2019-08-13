import echarts from "echarts";
function makeTimeLine2(arr, info, time_arr, endTime) {
  var chart = document.getElementById("main");
  let tfC3PointNum = Number(sessionStorage.getItem("tfC3PointNum"));
  if (chart != null) {
    window.myChart = echarts.init(chart);
    var rate_min, rate_max, price_min, price_max;
    var rate_int, price_int;
    let arrHeight = [];
    for (let i = 0; i < arr.length; i++) {
      let numHeight = Number(arr[i].split(" ")[1]);
      arrHeight.push(numHeight);
    }
    var maxHeight = Math.max.apply(null, arrHeight);
    var minHeight = Math.min.apply(null, arrHeight);
    var yesterday = parseFloat(info.p_close);//p_close昨收 info.high最高 info.low最低
    if(yesterday == 0){
      yesterday =parseFloat(info.low);
    }
    var up_amplitude = Math.abs(((maxHeight - yesterday) / yesterday) * 100) * 1.1;
    var down_amplitude = Math.abs(((minHeight - yesterday) / yesterday) * 100) * 1.1;
    
    var data = split_data(arr, yesterday, time_arr);
    // var avg = data.average[data.average.length - 1];
    var max = 0;
    for (var i = 1; i < data["number"].length; i++) {
      var cur = Number(data["number"][i]);
      cur > max ? (max = cur) : 0;
    }
    var up_down = up_amplitude > down_amplitude ? up_amplitude : down_amplitude;
    rate_min = -up_down;
    rate_max = Math.abs(up_down);
    rate_int = up_down / 4;
    price_min = yesterday * (1 + rate_min / 100);
    price_max = yesterday * (1 + rate_max / 100);
    price_int = (yesterday * rate_int) / 100;
    var split_number = 59;

    myChart.setOption({
      backgroundColor: "#000",
      animation: false,
      tooltip: {
        show: true,
        transitionDuration: 0,
        trigger: "axis",
        alwaysShowContent: true,
        axisPointer: {
          type: "cross",
          lineStyle: { type: "solid", color: "#aaa", opacity: 1 }, // 十字线实线
          crossStyle: { type: "solid", color: "#aaa", opacity: 1 }, // 十字线实线
          label: {
            precision: tfC3PointNum // 纵坐标显示小数位
          }
        },
        backgroundColor: "rgba(0, 0, 0, 1)",
        padding: 5,
        textStyle: {
          color: "rgba(245, 245, 245, 1)",
          fontSize: 10
        },
        // position: [80, 0] 隐藏右上角面板
        position: [-80, -100]
      },
      axisPointer: {
        link: {
          xAxisIndex: "all"
        },
        label: {
          backgroundColor: "#777"
        }
      },
      grid: [
        {
          left: "66px",
          right: "76px",
          top: "2%",
          height: "60%"
        },
        {
          left: "66px",
          right: "76px",
          top: "65%",
          height: "31%"
        }
      ],
      axisPointer: {
        link: {
          xAxisIndex: "all"
        },
        label: {
          backgroundColor: "#777"
        }
      },
      grid: [
        {
          left: "66px",
          right: "76px",
          top: "2%",
          height: "60%"
        },
        {
          left: "66px",
          right: "76px",
          top: "65%",
          height: "31%"
        }
      ],
      xAxis: [
        {
          nameLocation: "center",
          nameTextStyle: {
            color: "#FFF"
          },
          type: "category",
          data: data.times,
          boundaryGap: false,
          scale: true,
          min: 0,
          max: data.times.length,
          axisTick: {
            show: false,
            interval: split_number
          },
          axisLabel: {
            show: false,
            interval: split_number
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#B00000",
              width: 2
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#B00000"],
              opacity: 1,
              type: "dotted" // 网格X轴虚线
              // type: "solid"
            }
          },
          splitArea: {
            show: false
          },
          axisPointer: {
            show: true,
            label: {
              show: false
            }
          }
        },
        {
          type: "category",
          data: data.times,
          min: 0,
          max: data.times.length,
          scale: true,
          boundaryGap: false,
          gridIndex: 1,
          axisTick: {
            show: false,
            interval: split_number
          },
          axisLabel: {
            show: true,
            interval: split_number,
            textStyle: {
              color: "#ff3232",
              // color: "yellow",
              fontSize: 13
            },
            formatter: function(value, index) {
              if (index % 120 == 0) {
                return value == undefined ? endTime : value;
              } else {
                return value == undefined ? endTime : "";
              }
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#B00000"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#B00000"],
              opacity: 1,
              type: "dotted"
            }
          },
          splitArea: {
            show: false
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          scale: true,
          gridIndex: 0,
          min: price_min,
          max: price_max,
          interval: price_int,
          position: "left",
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#B00000"],
              opacity: 1,
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: function(value) {
                return axis_label_text_style(value, yesterday);
              }
            }
          },
          axisTick: {
            show: true
          },
          axisLabel: {
            show: true,
            formatter: function(value) {
              return value.toFixed(tfC3PointNum);
            }
          },
          splitArea: {
            show: false
          },
          axisPointer: {
            lable: {
              show: true,
              precision: tfC3PointNum // 纵坐标显示小数位
            }
          }
        },
        {
          //坐标轴2  右轴
          type: "value",
          scale: true,
          boundaryGap: true,
          gridIndex: 1,
          position: "right",
          max: max,
          min: 0,
          interval: max / 4,
          axisLabel: {
            textStyle: {
              color: "#F0F888"
            },
            formatter: function(value) {
              return value == 0 || value == max ? "" : value - (value % 10);
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#B00000"],
              opacity: 1
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#B00000"
            }
          },
          axisTick: {
            show: true
          },
          splitArea: {
            show: false
          },
          axisPointer: {
            show: true
          }
        },
        {
          type: "value",
          scale: true,
          gridIndex: 0,
          min: rate_min,
          max: rate_max,
          maxInterval: rate_int,
          splitLine: {
            show: false,
            lineStyle: {
              color: ["#F2F2F2"],
              opacity: 1
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#B00000"
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: function(value) {
                return axis_label_text_style(value, 0);
              }
            },
            formatter: function(value) {
              return value >= 0
                ? "+" + value.toFixed(2) + "%"
                : "-" + (-value).toFixed(2) + "%";
            }
          },
          splitArea: {
            show: false
          },
          axisPointer: {
            show: true,
            label: {
              show: false
            }
          }
        },
        {
          type: "value",
          scale: true,
          gridIndex: 1,
          splitLine: {
            show: false,
            lineStyle: {
              color: ["#F2F2F2"],
              opacity: 1
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#B00000"
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: function(value) {
                if (value > 0) {
                  return "#ff3232";
                } else if (value == 0) {
                  return "#000";
                } else {
                  return "#17A63A";
                }
              }
            },
            formatter: function(value) {
              console.log(value);
              return value >= 0
                ? value.toFixed(2) + "%"
                : (-value).toFixed(2) + "%";
            }
          },
          splitArea: {
            show: false
          }
        }
      ],
      series: [
        {
          name: "现价",
          type: "line",
          xAxisIndex: 0,
          yAxisIndex: 0,
          data: data.price,
          smooth: true,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1,
              color: "#FAFAFA"
            }
          }
        },
        {
          name: "交易量",
          type: "bar",
          xAxisIndex: 1,
          yAxisIndex: 1,
          barMaxWidth: "1px",
          data: af(data.number, data.price),
          smooth: true,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1,
              color: "#FAFAFA"
            }
          }
        },
        {
          name: "均价",
          type: "line",
          xAxisIndex: 0,
          yAxisIndex: 0,
          data: data.average,
          smooth: true,
          symbol: "none",
          lineStyle: {
            normal: {
              width: 1,
              color: "#fbff5d"
            }
          },
          sampling: "average"
        }
      ]
    });
    if (sessionStorage.getItem('timeLine') == "true") { // 十字线显隐
      myChart.setOption({
        tooltip: {
          axisPointer: {
            type: "cross",
            lineStyle: { type: "solid", color: "#aaa", opacity: 1 }, // 十字线实线
            crossStyle: { type: "solid", color: "#aaa", opacity: 1 }, // 十字线实线
          }
        }
      });
    }
    //   myChart.clear(option, true);
    //   myChart.setOption(option, true);
  }
}

/**
 * 数据处理
 * @param rawData
 * @param yesterday
 * @returns {{data: Array, price: Array, number: Array, times: Array|*, average: Array, average_num: Array, rates: Array, increase: Array}}
 */
function split_data(rawData, yesterday, time_arr) {
  var datas = [],
    number = [],
    price = [],
    times= [],
    average = [],
    average_num = [],
    rates = [],
    increase = [];
  var num = 0,
    arr_up;
    var price_total = 0,
    total = 0,
    num_total = 0;
  for (var i = 0; i < rawData.length; i++) {
    var arr = rawData[i].split(" ");
    number.push(arr[2]); //交易量
    price.push(parseFloat(arr[1])); // 最新价
    datas.push(arr);
    increase.push((arr[1] - yesterday).toFixed(2));
    rates.push((((arr[1] - yesterday) / yesterday) * 100).toFixed(2));
    price_total += parseFloat(arr[1]);
    num_total += parseFloat(arr[2]);
    total += parseFloat(arr[1]) * parseFloat(arr[2]); // 总的价格乘数量
    // average.push(parseFloat((price_total / (i + 1)).toFixed(6))); //均价线
    average.push(parseFloat((total / num_total).toFixed(6))); //均价线
  }
  return {
    data: datas,
    price: price,
    number: number,
    times: time_arr,
    average: average,
    average_num: average_num,
    rates: rates,
    increase: increase
  };
}
function axis_label_text_style(value, num) {
  value = Math.round(value * 100) / 100;
  num = Math.round(num * 100) / 100;
  if (value > num) {
    return "#ff3232";
  } else if (value == num) {
    return "#FFFFFF";
  } else {
    return "#00e600";
  }
}
function timeLine(params) {
  var names = [],
    values = [],
    colors = [],
    time = "";
  $.each(params, function(i, val) {
    names.push(val.seriesName);
    values.push(val.value);
    colors.push(val.color);
    if (i == 0) {
      time = val.axisValue;
    }
  });
  $("#time").html(time);
}

function af(data) {
  var result = [],
    i;
  for (i = 0; i < data.length; i++) {
    var html = "";
    // var x = data[i] - data[i - 1];
    html = {
      value: data[i],
      itemStyle: {
        normal: {
          color: "#ffff00"
        }
      }
    };
    result.push(html);
  }
  return result;
}
export { makeTimeLine2 };
