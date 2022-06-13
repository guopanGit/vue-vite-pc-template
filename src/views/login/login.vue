<template>
  <div class="box">
    <div class="img-box" :style="{background:'url('+ data.src +')  no-repeat'}">
      <div class="from-box">
        <n-form
          ref="formRef"
          label-placement="left"
          size="large"
          :model="formInline"
          :rules="rules"
        >
          <div class="from-name">
            <n-form-item path="username">
              <n-input
                v-model:value="formInline.username"
                placeholder="请输入用户名"
              >
                <template #prefix>
                  <n-icon size="18" color="#808695">
                    <PersonOutline />
                  </n-icon>
                </template>
              </n-input>
            </n-form-item>
          </div>
          <div class="from-pwd">
            <n-form-item path="password">
              <n-input
                v-model:value="formInline.password"
                type="password"
                showPasswordOn="click"
                placeholder="请输入密码"
              >
                <template #prefix>
                  <n-icon size="18" color="#808695">
                    <LockClosedOutline />
                  </n-icon>
                </template>
              </n-input>
            </n-form-item>
          </div>
          <div class="login">
            <n-button type="info" :loading="loadingRef" @click="login">
              登录
            </n-button>
          </div>
        </n-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { addRoutes } from "@/router";
import {
  NForm,
  NIcon,
  NInput,
  NButton,
  useMessage
} from "naive-ui";
import one from "@/assets/login/1.png";
import two from "@/assets/login/2.png";
import three from "@/assets/login/3.png";
import four from "@/assets/login/4.png";
import five from "@/assets/login/5.png";
import six from "@/assets/login/6.png";
import seven from "@/assets/login/7.png";

const store = useStore();
const router = useRouter();
const message = useMessage();
const data = reactive({
  src: ""
});
const formRef = ref();
const showLogin = () => {
  // let wk = new Date().getDay();
  let wk = Math.floor(Math.random() * 7);
  switch (wk) {
    case 0:
      data.src = seven;
      break;
    case 1:
      data.src = one;
      break;
    case 2:
      data.src = two;
      break;
    case 3:
      data.src = three;
      break;
    case 4:
      data.src = four;
      break;
    case 5:
      data.src = five;
      break;
    case 6:
      data.src = six;
      break;
    default:
      data.src = six;
      break;
  }
};
const formInline = reactive({
  username: "admin",
  password: "123456",
  isCaptcha: true
});
const loadingRef = ref(false);
const rules = {
  username: { required: true, message: "请输入用户名", trigger: "blur" },
  password: { required: true, message: "请输入密码", trigger: "blur" }
};
const login = () => {
  let messageReactive = null;
  let params = {
    name: formInline.username,
    password: formInline.password
  };
  loadingRef.value = true;
  messageReactive = message.loading("登录中...", {
    duration: 0
  });
  
  store.dispatch("user/login", params).then((res) => {
    if (params.name === "admin") {
      addRoutes();
    }
    loadingRef.value = false;
    messageReactive.destroy();
    messageReactive = null;
    router.push({
      path: "/"
    });
    
  });
};
showLogin();
</script>

<style lang="scss" scoped>
.box {
  min-width: 1200px;
  height: 100%;
  
  .img-box {
    height: 100%;
    margin: auto 0;
    display: flex;
    align-items: center;
    
    .from-box {
      padding: 40px 20px;
      margin-left: 900px;
      max-width: 200px;
      box-shadow: 0 0 8px rgba(6, 0, 77, .2);
      
      .from-name {
        margin-bottom: 20px;
      }
      
      .login {
        margin-top: 20px;
        width: 100px;
        
        button {
          width: 200px;
        }
      }
    }
  }
}
</style>
