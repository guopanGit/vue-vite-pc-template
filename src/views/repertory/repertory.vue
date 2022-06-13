<template>
  <div class="box">
    
    <div class="router-box">
      <router-view />
    </div>
  </div>
</template>

<script setup>

import { reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const router = useRouter();
const state = useStore().state;
const path = computed(() => state.user.path);

const data = reactive({
  path: ""
});

// 默认选中
let arr = path.value.split("/");
data.path = arr[arr.length - 1];

const skip = (val) => {
  console.log(val);
  data.path = val;
  router.push({
    name: val
  });
};
//console.log(path);
//console.log("check".indexOf(path));

</script>

<style lang="scss" scoped>
.box {
  position: relative;
  
  .nav-box {
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    box-shadow: 0 0 8px rgba(77, 0, 52, .5);
    
    .nav-item {
      flex: 1;
      height: 60px;
      line-height: 60px;
    }
    
    .selected {
      background: #2d8cf0;
      color: #fff;
    }
  }
  
  .router-box {
    padding-top: 60px;
    height: calc(100vh - 130px);
    overflow: hidden;
  }
}

</style>
