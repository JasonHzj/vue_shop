(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['exports', 'echarts'], factory);
  } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
    // CommonJS
    factory(exports, require('echarts'));
  } else {
    // Browser globals
    factory({}, root.echarts);
  }
}(this, function (exports, echarts) {
  var log = function (msg) {
    if (typeof console !== 'undefined') {
      console && console.error && console.error(msg);
    }
  };
  if (!echarts) {
    log('ECharts is not Loaded');
    return;
  }
  echarts.registerTheme('infographicM', {
    "color": [
      "#c1232b",
      "rgba(193,35,43,0.8)",
      "rgba(193,35,43,0.7)",
      "rgba(193,35,43,0.6)",
      "rgba(193,35,43,0.5)",
      "rgba(193,35,43,0.4)",
      "rgba(193,35,43,0.3)",
      "rgba(193,35,43,0.2)",
      "rgba(39,114,123,0.4)",
      "rgba(39,114,123,0.2)",
      "#fcce10",
      "rgba(252,206,16,0.8)",
      "rgba(252,206,16,0.6)",
      "rgba(252,206,16,0.4)",
      "rgba(252,206,16,0.2)",
      "#e87c25",
      "rgba(232,124,37,0.8)",
      "rgba(232,124,37,0.6)",
      "rgba(232,124,37,0.4)",
      "rgba(232,124,37,0.2)",
      "#b5c334",
      "rgba(181,195,52,0.8)",
      "rgba(181,195,52,0.6)",
      "rgba(181,195,52,0.4)",
      "rgba(181,195,52,0.2)"
    ],
    "backgroundColor": "rgba(0,0,0,0)",
    "textStyle": {},
    "title": {
      "textStyle": {
        "color": "#27727b"
      },
      "subtextStyle": {
        "color": "#aaaaaa"
      }
    },
    "line": {
      "itemStyle": {
        "borderWidth": 1
      },
      "lineStyle": {
        "width": "3"
      },
      "symbolSize": "5",
      "symbol": "emptyCircle",
      "smooth": true
    },
    "radar": {
      "itemStyle": {
        "borderWidth": 1
      },
      "lineStyle": {
        "width": "3"
      },
      "symbolSize": "5",
      "symbol": "emptyCircle",
      "smooth": true
    },
    "bar": {
      "itemStyle": {
        "barBorderWidth": 0,
        "barBorderColor": "#ccc"
      }
    },
    "pie": {
      "itemStyle": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      }
    },
    "scatter": {
      "itemStyle": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      }
    },
    "boxplot": {
      "itemStyle": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      }
    },
    "parallel": {
      "itemStyle": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      }
    },
    "sankey": {
      "itemStyle": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      }
    },
    "funnel": {
      "itemStyle": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      }
    },
    "gauge": {
      "itemStyle": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      }
    },
    "candlestick": {
      "itemStyle": {
        "color": "#c1232b",
        "color0": "#b5c334",
        "borderColor": "#c1232b",
        "borderColor0": "#b5c334",
        "borderWidth": 1
      }
    },
    "graph": {
      "itemStyle": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      },
      "lineStyle": {
        "width": 1,
        "color": "#aaaaaa"
      },
      "symbolSize": "5",
      "symbol": "emptyCircle",
      "smooth": true,
      "color": [
        "#c1232b",
        "rgba(193,35,43,0.8)",
        "rgba(193,35,43,0.7)",
        "rgba(193,35,43,0.6)",
        "rgba(193,35,43,0.5)",
        "rgba(193,35,43,0.4)",
        "rgba(193,35,43,0.3)",
        "rgba(193,35,43,0.2)",
        "rgba(39,114,123,0.4)",
        "rgba(39,114,123,0.2)",
        "#fcce10",
        "rgba(252,206,16,0.8)",
        "rgba(252,206,16,0.6)",
        "rgba(252,206,16,0.4)",
        "rgba(252,206,16,0.2)",
        "#e87c25",
        "rgba(232,124,37,0.8)",
        "rgba(232,124,37,0.6)",
        "rgba(232,124,37,0.4)",
        "rgba(232,124,37,0.2)",
        "#b5c334",
        "rgba(181,195,52,0.8)",
        "rgba(181,195,52,0.6)",
        "rgba(181,195,52,0.4)",
        "rgba(181,195,52,0.2)"
      ],
      "label": {
        "color": "#ffffff"
      }
    },
    "map": {
      "itemStyle": {
        "areaColor": "#dddddd",
        "borderColor": "#eeeeee",
        "borderWidth": 0.5
      },
      "label": {
        "color": "#c1232b"
      },
      "emphasis": {
        "itemStyle": {
          "areaColor": "#fe994e",
          "borderColor": "#444",
          "borderWidth": 1
        },
        "label": {
          "color": "rgb(100,0,0)"
        }
      }
    },
    "geo": {
      "itemStyle": {
        "areaColor": "#dddddd",
        "borderColor": "#eeeeee",
        "borderWidth": 0.5
      },
      "label": {
        "color": "#c1232b"
      },
      "emphasis": {
        "itemStyle": {
          "areaColor": "#fe994e",
          "borderColor": "#444",
          "borderWidth": 1
        },
        "label": {
          "color": "rgb(100,0,0)"
        }
      }
    },
    "categoryAxis": {
      "axisLine": {
        "show": true,
        "lineStyle": {
          "color": "#cccccc"
        }
      },
      "axisTick": {
        "show": true,
        "lineStyle": {
          "color": "#cccccc"
        }
      },
      "axisLabel": {
        "show": true,
        "color": "#999999"
      },
      "splitLine": {
        "show": true,
        "lineStyle": {
          "color": [
            "#ffffff"
          ]
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": [
            "rgba(250,250,250,0.3)",
            "rgba(200,200,200,0.3)"
          ]
        }
      }
    },
    "valueAxis": {
      "axisLine": {
        "show": true,
        "lineStyle": {
          "color": "#cccccc"
        }
      },
      "axisTick": {
        "show": true,
        "lineStyle": {
          "color": "#cccccc"
        }
      },
      "axisLabel": {
        "show": true,
        "color": "#999999"
      },
      "splitLine": {
        "show": true,
        "lineStyle": {
          "color": [
            "#ffffff"
          ]
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": [
            "rgba(250,250,250,0.3)",
            "rgba(200,200,200,0.3)"
          ]
        }
      }
    },
    "logAxis": {
      "axisLine": {
        "show": true,
        "lineStyle": {
          "color": "#cccccc"
        }
      },
      "axisTick": {
        "show": true,
        "lineStyle": {
          "color": "#cccccc"
        }
      },
      "axisLabel": {
        "show": true,
        "color": "#999999"
      },
      "splitLine": {
        "show": true,
        "lineStyle": {
          "color": [
            "#ffffff"
          ]
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": [
            "rgba(250,250,250,0.3)",
            "rgba(200,200,200,0.3)"
          ]
        }
      }
    },
    "timeAxis": {
      "axisLine": {
        "show": true,
        "lineStyle": {
          "color": "#cccccc"
        }
      },
      "axisTick": {
        "show": true,
        "lineStyle": {
          "color": "#cccccc"
        }
      },
      "axisLabel": {
        "show": true,
        "color": "#999999"
      },
      "splitLine": {
        "show": true,
        "lineStyle": {
          "color": [
            "#ffffff"
          ]
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": [
            "rgba(250,250,250,0.3)",
            "rgba(200,200,200,0.3)"
          ]
        }
      }
    },
    "toolbox": {
      "iconStyle": {
        "borderColor": "#999999"
      },
      "emphasis": {
        "iconStyle": {
          "borderColor": "#666666"
        }
      }
    },
    "legend": {
      "textStyle": {
        "color": "#999999"
      }
    },
    "tooltip": {
      "axisPointer": {
        "lineStyle": {
          "color": "#cccccc",
          "width": 1
        },
        "crossStyle": {
          "color": "#cccccc",
          "width": 1
        }
      }
    },
    "timeline": {
      "lineStyle": {
        "color": "#293c55",
        "width": 1
      },
      "itemStyle": {
        "color": "#27727b",
        "borderWidth": 1
      },
      "controlStyle": {
        "color": "#27727b",
        "borderColor": "#27727b",
        "borderWidth": 0.5
      },
      "checkpointStyle": {
        "color": "#c1232b",
        "borderColor": "#c23531"
      },
      "label": {
        "color": "#293c55"
      },
      "emphasis": {
        "itemStyle": {
          "color": "#72d4e0"
        },
        "controlStyle": {
          "color": "#27727b",
          "borderColor": "#27727b",
          "borderWidth": 0.5
        },
        "label": {
          "color": "#293c55"
        }
      }
    },
    "visualMap": {
      "color": [
        "#c1232b",
        "#fcce10"
      ]
    },
    "dataZoom": {
      "backgroundColor": "rgba(0,0,0,0)",
      "dataBackgroundColor": "rgba(181,195,52,0.3)",
      "fillerColor": "rgba(181,195,52,0.2)",
      "handleColor": "#27727b",
      "handleSize": "100%",
      "textStyle": {
        "color": "#999999"
      }
    },
    "markPoint": {
      "label": {
        "color": "#ffffff"
      },
      "emphasis": {
        "label": {
          "color": "#ffffff"
        }
      }
    }
  });
}));
