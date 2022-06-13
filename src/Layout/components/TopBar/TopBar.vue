<template>
  <div v-if="!state.user.path.hideTopBar" class="top-box">
    <div class="" @click="menuSwitchClick">
      <i class="iconfont" :class="menuSwitch ? 'icon-shouqi':'icon-dakai'"></i>
    </div>
    <div class="function">
      <n-space justify="space-between">
        <div :title="isFullscreen ? '退出全屏' : '全屏'">
          <i class="iconfont" :class="isFullscreen ? 'icon-quxiaoquanping_o':'icon-quanping'" @click="toggle"></i>
        </div>
        <div class="avatar">
          <n-popover :overlap="overlap" placement="bottom" trigger="click">
            <template #trigger>
              <n-avatar round>{{ name }}</n-avatar>
            </template>
            <div class="user-none">
              <div class="cursor" @click="show = true">修改密码</div>
              <div class="cursor" @click="logOut">退出登录</div>
            </div>
          </n-popover>
          <n-drawer v-model:show="show" :width="502">
            <n-drawer-content title="修改密码" closable>
              <div class="input-box">
                <div class="input-box ">
                  <n-input
                    type="password"
                    @input="newPwd1"
                    show-password-on="mousedown"
                    placeholder="新密码"
                    :maxlength="16"
                  />
                </div>
                <div class="input-box">
                  <n-input
                    type="password"
                    @input="newPwd2"
                    :status="password.status"
                    show-password-on="mousedown"
                    placeholder="再次输入新密码"
                    :maxlength="16"
                  />
                </div>
                <div class="input-box btn-box">
                  <n-button type="info" :loading="loadingRef" @click="update">
                    确定
                  </n-button>
                </div>
              </div>
            </n-drawer-content>
          </n-drawer>
        </div>
      </n-space>
    </div>
  </div>
</template>

<script setup>

import { computed, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useFullscreen } from "@vueuse/core";
import { removeAccount } from "@/router";
import {
  NAvatar,
  NPopover,
  NDrawer,
  NDrawerContent,
  NInput,
  NButton,
  NSpace,
  useMessage,
  useNotification
} from "naive-ui";

const { isFullscreen, toggle } = useFullscreen();
const allRoutes = useRouter().options.routes;
const router = useRouter();
const message = useMessage();
const notification = useNotification();
const menuSwitch = computed(() => state.user.menuSwitch);
const store = useStore();
const overlap = ref(false);
const show = ref(false);
const loadingRef = ref(false);
const state = useStore().state;
const name = computed(() => state.user.info.name);
const password = reactive({
  newPwd1: "",
  newPwd2: "",
  status: "success"
});

const menuSwitchClick = () => {
  store.dispatch("user/menuSwitch", !state.user.menuSwitch);
};

const newPwd1 = (e) => {
  password.newPwd1 = e;
};

const newPwd2 = (e) => {
  password.newPwd2 = e;
  if (e === password.newPwd1) {
    password.status = "success";
  } else {
    password.status = "error";
  }
};

const update = () => {
  
  let params = {
    name: password.newPwd1,
    password: password.newPwd2
  };
  if (password.newPwd1 === "") {
    message.error("请输入新密码");
    return;
  }
  if (password.newPwd2 === password.newPwd1) {
    loadingRef.value = true;
    setTimeout(() => {
      loadingRef.value = false;
      console.log("修改密码");
      message.success("修改密码");
    }, 2000);
    setTimeout(() => {
      show.value = false;
    }, 5000);
  } else {
    message.error("两次输入的密码不一致");
  }
};

// 退出登录
const logOut = () => {
  store.dispatch("user/loginOut")
    .then(() => {
      removeAccount();
    });
};

const getMsg = () => {
  setTimeout(() => {
    notification.info({
      content: "待处理订单提醒",
      meta: "你有一条待处理订单请移步首页查看"
    });
  }, 5000);
};

 // getMsg()
</script>

<style lang="scss" scoped>
.top-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  line-height: 40px;
  padding: 0 40px 0 20px;
  text-align: left;
  box-shadow: 0 1px 8px rgba(0, 21, 41, .5);
  
  .function {
    width: 80px;
    
    .avatar {
      margin-left: 10px;
      user-select: none;
      
    }
  }
}

.input-box {
  margin-top: 20px;
}

.btn-box {
  text-align: right;
}
</style>
