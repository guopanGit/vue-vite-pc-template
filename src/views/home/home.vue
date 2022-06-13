<template>
  <div class="box">
    <div class="top-box"></div>
    <div class="item-box">
      <div class="item-wrap cursor"
           :class="data.mouseOver === 1 ? 'box-shadow' : ''"
           @mouseover="mouseOver(1)"
           @mouseleave="mouseLeave"
           @click="income">
        <div>
          今日入库订单
        </div>
        <div class="item-num">
          <n-number-animation :from="0" :to="12039" />
        </div>
      </div>
      <div class="item-wrap cursor"
           :class="data.mouseOver === 2 ? 'box-shadow' : ''"
           @mouseover="mouseOver(2)"
           @mouseleave="mouseLeave"
           @click="leave">
        <div>
          今日出库订单
        </div>
        <div class="item-num">
          <n-number-animation :from="0" :to="12039" />
        </div>
      </div>
      <div class="item-wrap cursor"
           :class="data.mouseOver === 3 ? 'box-shadow' : ''"
           @mouseover="mouseOver(3)"
           @mouseleave="mouseLeave">
        <div>
          待分配订单
        </div>
        <div class="item-num">
          <n-number-animation :from="0" :to="12039" />
        </div>
      </div>
      <div class="item-wrap cursor"
           :class="data.mouseOver === 4 ? 'box-shadow' : ''"
           @mouseover="mouseOver(4)"
           @mouseleave="mouseLeave">
        <div>
          待处理订单
        </div>
        <div class="item-num">
          <n-number-animation :from="0" :to="12039" />
        </div>
      </div>
    </div>
    <div class="echarts">
      <div id="income"></div>
      <div id="leave"></div>
    </div>
  </div>
</template>

<script setup>
import { inject, reactive } from "vue";
import { useRouter } from "vue-router";

import {
  NNumberAnimation
} from "naive-ui";

const router = useRouter();
let echarts = inject("ec");
const data = reactive({
  mouseOver: 0
});

const income = () => {
  router.push({
    name: "repertory"
  });
};
const leave = () => {
  router.push({
    name: "export"
  });
};

const mouseOver = (val) => {
  data.mouseOver = val;
};

const mouseLeave = () => {
  data.mouseOver = 0;
};

const getData = () => {
  document.getElementById("income").setAttribute("_echarts_instance_", "");
  document.getElementById("leave").setAttribute("_echarts_instance_", "");
  let income = echarts.init(document.getElementById("income"));
  let leave = echarts.init(document.getElementById("leave"));
  income.showLoading();
  leave.showLoading();
  let option = {
    title: {
      text: "本月出入库订单"
    },
    xAxis: {
      type: "category",
      data: [
        "12-1",
        "12-2",
        "12-3",
        "12-4",
        "12-5",
        "12-6"
      ]
    },
    yAxis: {
      type: "value"
    },
    legend: {
      data: ["出库", "入库"]
    },
    tooltip: {
      trigger: "axis"
    },
    toolbox: {
      show: true,
      feature: {
        magicType: { type: ["line", "bar"], title: { line: "折线图", bar: "柱状图" } },
        restore: {
          show: true,
          title: "还原"
        },
        saveAsImage: {
          show: true,
          title: "保存为图片"
        }
      }
    },
    series: [
      {
        name: "入库",
        data: [820, 932, 901, 934, 890, 930],
        type: "line",
        smooth: true
      },
      {
        name: "出库",
        data: [700, 820, 745, 754, 874, 856],
        type: "line",
        smooth: true
      }
    ]
  };
  income.hideLoading();
  leave.hideLoading();
  option && income.setOption(option);
  let data = ["1", "2", "3", "4", "5"];
  option.title.text = "本年度出入库订单";
  option.xAxis.data = data;
  option && leave.setOption(option);
};

setTimeout(() => {
  getData();
}, 100);

</script>

<style lang="scss" scoped>
.top-box {
  height: 100px;
}

.item-box {
  display: flex;
  justify-content: space-around;
  padding: 0 40px;
  
  .box-shadow {
    box-shadow: 0 5px 6px rgba(0, 0, 0, .3);
  }
  
  .item-wrap {
    padding: 10px 20px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, .1);
    user-select: none;
    
    .item-num {
      font-size: 30px;
    }
  }
  
}

.echarts {
  display: flex;
  padding: 20px;
  margin-top: 40px;
  
  #income {
    flex: 1;
    height: 500px;
    margin-right: 20px;
  }
  
  #leave {
    flex: 1;
    height: 500px;
  }
}
</style>