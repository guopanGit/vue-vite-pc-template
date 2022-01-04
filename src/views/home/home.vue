<template>
<div class="box">
  首页
</div>
</template>

<script>
import {defineComponent} from 'vue'
import {useRouter,useRoute} from 'vue-router'

export default defineComponent({
  name: "home",
  setup() {
    const router = useRouter()
    const route = useRoute()
  }
})
</script>

<style lang="scss" scoped>

</style>