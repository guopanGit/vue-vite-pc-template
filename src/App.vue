<template>
  <AppProvider>
    <div class="app-box">
      <router-view />
    </div>
  </AppProvider>
</template>

<script setup>
import { provide } from "vue";
import { AppProvider } from "@/components/Application";
import * as echarts from "echarts";

provide("ec", echarts);
</script>

<style>
.app-box, html, body {
  height: 100%;
  min-width: 1200px;
}

.user-none {
  user-select: none;
}

.cursor {
  cursor: pointer;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  text-align: center;
  color: #2c3e50;
}

::-webkit-scrollbar { /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
  scrollbar-arrow-color: red;
  
}

::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
  scrollbar-arrow-color: red;
}

::-webkit-scrollbar-track { /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
</style>
