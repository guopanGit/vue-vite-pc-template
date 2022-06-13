<template>
  <div class="app-box">
    <Menu/>
    <div class="center-box">
      <div class="top-box">
        <TopBar/>
      </div>
      <div class="router-box">
        <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
          <router-view />
        </n-config-provider>
      </div>
    </div>
  </div>
</template>

<script setup>

import Menu from '@/Layout/components/Menu/Menu.vue'
import TopBar from '@/Layout/components/TopBar/TopBar.vue'
import { NConfigProvider, zhCN, dateZhCN } from "naive-ui";

</script>


<style lang="scss" scoped>
.app-box {
  width: 100%;
  height: 100vh;
  display: flex;

  .center-box {
    flex: 1;
    height: 100vh;
    overflow: hidden;
    background: rgba(0, 0, 0, .1);

    .top-box {
      background: #fff;
    }
  }

  .router-box {
    height: 100%;
    margin: 10px 0 10px 10px;
    overflow: auto;
    background: #fff;
    box-shadow: 8px 8px 8px 8px rgba(0, 21, 41, .4);
  }
}
</style>