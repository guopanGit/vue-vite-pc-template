<template>
  <div class="newly">
    <n-button type="info" @click="newly">
      新增用户
    </n-button>
    <n-drawer v-model:show="show" :width="520">
      <n-drawer-content :title="msg.title" closable>
        <n-form
          ref="formRef"
          :model="msg.user"
          :rules="rules"
          label-placement="left"
          label-width="auto"
          require-mark-placement="right-hanging"
          size="medium"
          :style="{
      maxWidth: '600px'
    }"
        >
          <n-form-item label="账号:" path="title">
            <n-input v-model:value="msg.user.title" placeholder="账号" />
          </n-form-item>
          <n-form-item label="密码:" path="pwd">
            <n-input v-model:value="msg.user.pwd" placeholder="密码" />
          </n-form-item>
          <n-form-item label="账号归属:" path="name">
            <n-select
              v-model:value="msg.user.name"
              placeholder="账号归属"
              :options="name"
            />
          </n-form-item>
          <n-form-item label="权限" path="is">
            <n-select
              v-model:value="msg.user.is"
              placeholder="权限"
              :options="is"
            />
          </n-form-item>
          <div class="btn-box">
            <n-button type="info" :loading="loadingRef" @click="upDate">
              提交
            </n-button>
          </div>
        </n-form>
      </n-drawer-content>
    </n-drawer>
  </div>
  <div class="table-box">
    <n-data-table
      :columns="cols"
      :data="data.list"
      :row-props="rowProps"
      :max-height="700"
      striped />
    <n-dropdown
      placement="bottom-start"
      trigger="manual"
      :x="x"
      :y="y"
      :options="options"
      :show="showDropdown"
      :on-clickoutside="onClickoutside"
      @select="handleSelect"
    />
  </div>
</template>

<script setup>

import { h, ref, nextTick, reactive, watch } from "vue";
import {
  useMessage,
  useDialog,
  NDrawer,
  NDrawerContent,
  NDataTable,
  NDropdown,
  NForm,
  NFormItem,
  NButton,
  NInput,
  NSelect
} from "naive-ui";

const message = useMessage();
const dialog = useDialog();
const msg = reactive({
  row: {},
  user: {},
  title: "新增用户"
});
const data = reactive({
  list: [
    { no: 1, title: "admin", pwd: "132", is: "是", outTime: "2022-4-8 14:30" },
    { no: 2, title: "lisi", pwd: "132", is: "否", outTime: "2022-4-8 14:31" },
    { no: 3, title: "zhangsan", pwd: "132", is: "是", outTime: "2022-4-8 14:32" },
    { no: 4, title: "zhangsanfeng", pwd: "132", is: "是", outTime: "2022-4-8 14:31" },
    { no: 5, title: "wangwu", pwd: "132", is: "否", outTime: "2022-4-8 14:32" },
    { no: 6, title: "zhaoliu", pwd: "132", is: "是", outTime: "2022-4-8 14:33" },
    { no: 7, title: "maqi", pwd: "132", is: "否", outTime: "2022-4-8 14:33" },
    { no: 8, title: "niujiu", pwd: "132", is: "是", outTime: "2022-4-8 14:32" },
    { no: 9, title: "wangermazi", pwd: "132", is: "否", outTime: "2022-4-8 14:33" },
    { no: 10, title: "laoliu", pwd: "132", is: "是", outTime: "2022-4-8 14:31" },
    { no: 11, title: "laoba", pwd: "132", is: "否", outTime: "2022-4-8 14:33" },
    { no: 12, title: "heiqi", pwd: "132", is: "是", outTime: "2022-4-8 14:32" }
  ]
});
const show = ref(false);
const formRef = ref(null);
const loadingRef = ref(false);
const showDropdown = ref(false);
const x = ref(0);
const y = ref(0);

const cols = [
  {
    title: "",
    key: "no"
  },
  {
    title: "账号",
    key: "title"
  },
  {
    title: "密码",
    key: "pwd"
  },
  {
    title: "账号归属",
    key: "pwd1"
  },
  {
    title: "管理员",
    key: "is"
  },
  {
    title: "最后登录",
    key: "outTime"
  }
];

const options = [
  {
    label: "编辑",
    key: "edit"
  },
  {
    label: () => h("span", { style: { color: "red" } }, "删除"),
    key: "delete"
  }
];

const newly = () => {
  show.value = true;
  msg.title = "新增用户";
  msg.row = {};
};
const handleSelect = (e) => {
  if (e === "edit") {
    show.value = true;
    msg.title = "编辑用户信息";
  } else {
    dialog.warning({
      title: "删除账号",
      content: `确定要删除账号: ${msg.row.title} 吗?`,
      positiveText: "删除",
      negativeText: "再想想",
      onPositiveClick: () => {
        message.success(`确定删除账号: ${msg.row.title}`);
        showDropdown.value = false;
      },
      onNegativeClick: () => {
        message.success(`取消删除账号: ${msg.row.title}`);
        showDropdown.value = false;
      }
    });
  }
  
};

const onClickoutside = () => {
  showDropdown.value = false;
};

const rowProps = (row) => {
  return {
    onContextmenu: (e) => {
      e.preventDefault();
      showDropdown.value = false;
      msg.row = row;
      msg.user = {
        title: row.title,
        pwd: row.pwd,
        is: row.is
      };
      nextTick().then(() => {
        showDropdown.value = true;
        x.value = e.clientX;
        y.value = e.clientY;
      });
    }
  };
};

const is = ["管理员", "员工"].map(
  (v) => ({
    label: v,
    value: v
  })
);

let nameList  = ['张三','李四']

const name = nameList.map(
  (v) => ({
    label: v,
    value: v
  })
);

const rules = {
  title: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入 账号"
  },
  pwd: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入 密码"
  },
  name: {
    required: true,
    trigger: ["blur", "input"],
    message: "请选择 归属人"
  },
  is: {
    required: true,
    trigger: ["blur", "change"],
    message: "请选择 权限"
  }
};

const upDate = (e) => {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      let val = {
        title: msg.user.title,
        pwd: msg.user.pwd,
        is: msg.user.is,
        no: data.list.length + 1
      };
      val.is === "员工" ? val.is = "否" : val.is = "是";
      loadingRef.value = true;
      setTimeout(() => {
        data.list.push(val);
        loadingRef.value = false;
        show.value = false;
      }, 2000);
      
    } else {
      message.warning("验证失败");
    }
  });
};

watch(show, (newValue, oldValue) => {
  if (!newValue) {
    msg.user = {};
  }
});

</script>

<style lang="scss" scoped>

.newly {
  text-align: left;
  padding: 20px 0 0 20px;
}

.table-box {
  padding: 20px 20px 0 20px;
}

.btn-box {
  text-align: right;
}

</style>