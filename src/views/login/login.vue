<template>
  <div class="box" @click="login">登录/注册</div>
</template>

<script>
import {defineComponent} from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
  name: "login",
  setup() {
    const store = useStore()
    const login = () => {
      store.dispatch('user/login', '')
          .then((res) => {
            console.log(res);
          })
    }
    return {
      login
    }
  }
})
</script>

<style lang="scss" scoped>

</style>