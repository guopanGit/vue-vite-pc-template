<template>
  <div v-if="!state.user.path.hideMenu" class="men-box" :class=" menuSwitch ? 'max-men-box' : ''">
    <div class="logo-box" @click="toHome">
      <img :class=" menuSwitch ? 'max-men-logo' : 'min-men-logo'" src="/src/assets/logo.png">
    </div>
    <div class="menu-ui" :class="menuSwitch ? 'max-men-ui' : 'min-men-ui' ">
      <div v-for="(menu,key) in data.routerList" :key="key">
        <div class="menu-item" :style="{height: `${menu.num * 42}px` }">
          <div class="menu-li"
               :class="(menu.children.length === 1 && menu.redirect === data.path && !menu.children[0].children) ? 'checked' : ''"
               @click.stop="switchRouter(menu,key,false)"
          >
            <i v-if="menuSwitch" class="iconfont icon " :class="menu.meta.icon"></i>
            <n-popover v-if="!menuSwitch" trigger="hover" placement="right">
              <template #trigger>
                <i class="iconfont icon " :class="menu.meta.icon"></i>
              </template>
              <span class="user-none">{{ menu.meta.title }}</span>
            </n-popover>
            <div v-if="menuSwitch" class="li-item">
              <span class="user-none">{{ menu.meta.title }}</span>
              <i v-if="menu.children[0].children" class="iconfont"
                 :class="menu.showList ? 'icon-xiangshang': 'icon-xiangxia'"></i>
            </div>
          </div>
          <div
              v-if="menu.children[0].children && menuSwitch && menu.showList"
              v-for="(item,key) in menu.children[0].children"
              :key="key"
              @click.stop="switchRouter(item,key,true)"
              class="menu-children " :class="item.meta.path === data.path ? 'checked' : ''">
            <div class="children-item" @click.stop="switchRouter(item,key,true)">{{ item.showList }}
              {{ item.meta.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {reactive, computed, watch, onMounted} from "vue";
import {useRouter, useRoute} from "vue-router";
import {useStore} from "vuex";
import {
  NPopover
} from 'naive-ui'

const router = useRouter();
const route = useRoute();
const allRoutes = useRouter().options.routes;
const state = useStore().state;
const data = reactive({
  routerList: [],
  path: "",
  maxMenu: {
    num: 1,
    index: 0
  }
});
const menuSwitch = computed(() => state.user.menuSwitch);
const switchRouter = (val, x, o) => {
  let {path} = val;
  if (val.redirect) {
    path = val.redirect;
  }
  if (o) {
    path = val.meta.path;
  }
  if (val.children) {
    if (val.children[0].children && val.children[0].children.length > 1) {
      let {routerList} = data;
      routerList[x].showList = !routerList[x].showList;
      if (routerList[x].showList) {
        routerList[x].num = val.children[0].children.length + 1;
      } else {
        routerList[x].num = 1
      }
      return;
    }
  }
  
  router.push({
    path
  });
};

// 返回首页
const toHome = () => {
  router.push({
    path: '/'
  });
}
// 拼接菜单
const showMenu = () => {
  let routerList = [];
  for (let i = 0; i < allRoutes.length; i++) {
    if (allRoutes[i].showPath) {
      allRoutes[i].showList = false;
      allRoutes[i].num = 1;
      if (allRoutes[i].children[0].children) {
        for (let j = 0; j < allRoutes[i].children[0].children.length; j++) {
          if (allRoutes[i].children[0].children[j].meta.path === data.path) {
            allRoutes[i].showList = true;
            allRoutes[i].num = allRoutes[i].children[0].children.length + 1;
          }
        }
      }
      routerList.push(allRoutes[i]);
    }
  }
  data.routerList = routerList;
};

// 跟随页面路由变化，切换菜单选中状态
watch(
    () => route.path,
    () => {
      let path = computed(() => state.user.path);
      data.path = path.value;
      //  showMenu()
    }
);

watch(
    () => state.user.menuSwitch,
    () => {
      let {routerList} = data
      let maxMenu = {
        num: 1,
        index: 0
      }
      console.log(menuSwitch);
      if (menuSwitch.value) {
        data.routerList[data.maxMenu.index].num = data.maxMenu.num
        data.routerList[data.maxMenu.index].showList = true
      } else {
        for (let i = 0; i < routerList.length; i++) {
          if (routerList[i].showList) {
            console.log(routerList[i]);
            maxMenu.num = routerList[i].num
            maxMenu.index = i
            routerList[i].showList = false
            routerList[i].num = 1
          }
        }
      }
      data.routerList = routerList
      data.maxMenu = maxMenu
    }
)


// 刷新页面,刷新当前页面顶级路由名称
onMounted(() => {
  let path = computed(() => state.user.path);
  data.path = path.value;
  showMenu()
});


showMenu();

</script>

<style lang="scss" scoped>
.max-men-box {
  width: 150px;
  padding: 0 10px;
}

.men-box {
  min-width: 60px;
  text-align: left;
  background: #000;
  color: #999;
  
  .logo-box {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .max-men-logo {
      width: 80px;
      height: 80px;
    }
    
    .min-men-logo {
      width: 40px;
      height: 40px;
    }
  }
  
  .min-men-ui {
    .menu-item {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  
  .max-men-ui {
    .checked {
      color: #fff;
      background: #2d8cf0;
      border-radius: 4px;
    }
  }
  
  .menu-ui {
    .menu-item {
      cursor: pointer;
      user-select: none;
      height: 42px;
      transition: height .3s;
      
      .menu-li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 30px;
        padding: 6px 10px;
        
        .icon {
          margin-top: -2px;
        }
        
        .li-item {
          display: flex;
          flex: 1;
          justify-content: space-between;
          padding-left: 10px;
        }
      }
      
      .menu-children {
        
        padding-left: 36px;
        cursor: pointer;
        user-select: none;
        
        .children-item {
          height: 42px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
}

</style>
