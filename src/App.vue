<template>
  <div class="app-box">
    <div v-if="true" class="men-box">
      <div v-for="(menu,key) in allRoutes" :key="key">
        <span v-if="menu.showPath">{{ menu.name }}</span>
      </div>
    </div>
    <div class="center-box">
      <div>头部</div>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import {useRouter} from 'vue-router'

export default defineComponent({
  name: "App",
  setup() {
    const allRoutes = useRouter().options.routes
    console.log(allRoutes);
    return{
      allRoutes
    }
  }
})
</script>


<style lang="scss" scoped>
.app-box {
  height: 100vh;
  display: flex;

  .men-box {

  }

  .center-box {
    flex: 1;
  }
}
</style>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
