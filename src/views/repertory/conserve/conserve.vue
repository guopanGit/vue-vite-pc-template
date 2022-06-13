<template>
  <div class="box">
    <div class="box-top">
      <n-button type="info" @click="data.drawer = true">新建入库单</n-button>
      <n-drawer v-model:show="data.drawer" :width="1200">
        <n-drawer-content title="新建入库单" closable>
          <n-form label-placement="left" >
            <n-space justify="space-around" size="large">
              <n-form-item label="入库时间:">
                <n-date-picker v-model:value="data.newDate" disabled type="date" />
              </n-form-item>
              <n-form-item label="经办人:" style="width: 300px">
                <n-input v-model:value="data.name1" type="text" autosize style="min-width: 240px"  placeholder="请输入经办人" />
              </n-form-item>
              <n-form-item label="备 注:" style="width: 450px">
                <n-input v-model:value="data.text" type="text" autosize style="min-width: 380px" placeholder="请输入备注" />
              </n-form-item>
            </n-space>
          </n-form>
          <div class="data-table">
            <div class="table-item table-top">
              <div class="item-name">物料编码</div>
              <div class="item-name">物料名称</div>
              <div class="item-name">规格</div>
              <div class="item-name">数量</div>
              <div class="item-name">单位</div>
            </div>
            <block v-for="(item,index,key) in list" :key="key">
              <div class="table-item" :class="index %2 ===0 ? '': 'table-top'">
                <div class="item-name">
                  <n-input v-model:value="item.code" type="text" style="width: 180px" />
                </div>
                <div class="item-name">
                  <n-input v-model:value="item.name" type="text" style="width: 180px" />
                </div>
                <div class="item-name">
                  <n-input v-model:value="item.name1" type="text" style="width: 180px" />
                </div>
                <div class="item-name">
                  <n-input v-model:value="item.num" type="text" style="width: 180px" />
                </div>
                <div class="item-name">
                  <n-input v-model:value="item.num1" type="text" style="width: 180px" />
                </div>
              </div>
            </block>
          </div>
          <br>
          <n-space justify="end">
            <n-button v-show="list.length > 1" type="info" ghost @click="lessen">减少一列</n-button>
            <n-button type="info" ghost :loading="seekLoading" @click="add">新增一列</n-button>
          </n-space>
          <n-divider />
          <n-space justify="end">
            <n-button type="info" ghost :loading="seekLoading" @click="upData">提交</n-button>
          </n-space>
        </n-drawer-content>
      </n-drawer>
      <div class="seek-box">
        <n-button type="info" ghost @click="data.showModal = true">查询</n-button>
        <n-modal v-model:show="data.showModal">
          <n-card
            style="width: 450px"
            title="查询入库单"
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
          >
            <div class="card-box">
              <n-form label-placement="left">
                <n-form-item label="入库日期:">
                  <n-date-picker
                    type="date"
                    v-model:value="data.seekValue"
                    :default-value="Date.now()"
                    :is-date-disabled="dateDisabled"
                  />
                </n-form-item>
                <n-form-item label="物料编码:">
                  <n-input v-model:value="data.productCode" type="text" placeholder="请输入物料编码" />
                </n-form-item>
                <n-form-item label="经办人:">
                  <n-input v-model:value="data.handle" type="text" placeholder="请输入经办人" />
                </n-form-item>
              </n-form>
              <n-space justify="end">
                <n-button type="info" ghost :loading="seekLoading" @click="beginSeek">搜索</n-button>
              </n-space>
            </div>
          </n-card>
        </n-modal>
      </div>
    </div>
    <div class="table-box">
      <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
        <n-data-table
          ref="table"
          striped
          :columns="columns"
          :data="data.tableData"
          :pagination="pageSize"
          :max-height="620"
          :scroll-x="1800"
        />
      </n-config-provider>
    </div>
  </div>
</template>

<script setup>
import { h, ref, reactive } from "vue";
import {
  useMessage,
  NButton,
  NModal,
  NCard,
  NDatePicker,
  NForm,
  NFormItem,
  NDataTable,
  NInput,
  NSpace,
  NDrawer,
  NDrawerContent,
  NDivider
} from "naive-ui";


const seekLoading = ref(false);
const message = useMessage();
const data = reactive({
  showModal: false,
  drawer: false,
  seekValue: null,
  productCode: "",
  handle: "",
  text: "",
  name1: "",
  newDate: Date.now(),
  tableData: [],
  createData: () => [
    {
      code: "",
      name: "",
      name1: "",
      num: "",
      num1: "",
      num2: ""
    }
  ]
});

// 搜索相关
const dateDisabled = (ts) => {
  return ts > Date.now();
};
const beginSeek = () => {
  if (data.seekValue === null && data.productCode === "" && data.handle === "") {
    message.error("请至少输入一个查询条件");
    return;
  }
  seekLoading.value = true;
  setTimeout(() => {
    seekLoading.value = false;
    message.success("搜索完成");
    data.showModal = false;
  }, 1000);
};
// 表格相关
const pageSize = {
  pageSize: 20
};
const columns = [
  {
    title: "入库日期",
    key: "date",
    width: 150,
    fixed: "left"
  },
  {
    title: "物料编码",
    key: "code",
    width: 240
  },
  {
    title: "物料名称",
    width: 200,
    key: "name"
  },
  {
    title: "规格",
    width: 200,
    key: "name"
  },
  {
    title: "数量",
    width: 100,
    key: "num"
    
  },
  {
    title: "单位",
    key: "num2",
    width: 100
  },
  {
    title: "单价(元)",
    key: "num1",
    width: 100
  },
  {
    title: "备注",
    key: "text",
    width: 200,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: "经办人",
    key: "name1",
    width: 100,
    fixed: "right"
  }

];
let tableData = [
  {
    no: 1,
    date: "2022-3-1",
    code: "2022030110194894",
    name: "相机",
    num: "10",
    num1: "10000",
    num2: "个",
    text: "",
    name1: "张三"
  },
  {
    no: 2,
    date: "2022-3-1",
    code: "2022030110194894",
    name: "相机",
    num: "10",
    num1: "10000",
    num2: "个",
    name1: "张三"
  },
  { no: 3, date: "2022-3-1", code: "2022030110194894", name: "相机", num: "10", num1: "10000", num2: "个", name1: "张三" },
  { no: 4, date: "2022-3-1", code: "2022030110194894", name: "相机", num: "10", num1: "10000", num2: "个", name1: "张三" },
  { no: 5, date: "2022-3-1", code: "2022030110194894", name: "相机", num: "10", num1: "10000", num2: "个", name1: "张三" },
  { no: 6, date: "2022-3-1", code: "2022030110194894", name: "相机", num: "10", num1: "10000", num2: "个", name1: "张三" },
  { no: 7, date: "2022-3-1", code: "2022030110194894", name: "相机", num: "10", num1: "10000", num2: "个", name1: "张三" },
  { no: 8, date: "2022-3-1", code: "2022030110194894", name: "相机", num: "10", num1: "10000", num2: "个", name1: "张三" },
  { no: 9, date: "2022-3-1", code: "2022030110194894", name: "相机", num: "10", num1: "10000", num2: "个", name1: "张三" },
  { no: 10, date: "2022-3-1", code: "2022030110194894", name: "相机", num: "10", num1: "10000", num2: "个", name1: "张三" },
  { no: 1, date: "2022-3-1", code: "2022030110194894", name: "相机", num: "10", num1: "10000", num2: "个", name1: "张三" },
  { no: 2, date: "2022-3-1", code: "2022030110194894", name: "相机", num: "10", num1: "10000", num2: "个", name1: "张三" },
  { no: 3, date: "2022-3-1", code: "2022030110194894", name: "相机", num: "10", num1: "10000", num2: "个", name1: "张三" },
  { no: 4, date: "2022-3-1", code: "2022030110194894", name: "相机", num: "10", num1: "10000", num2: "个", name1: "张三" },
  { no: 5, date: "2022-3-1", code: "2022030110194894", name: "相机", num: "10", num1: "10000", num2: "个", name1: "张三" },
  { no: 6, date: "2022-3-1", code: "2022030110194894", name: "相机", num: "10", num1: "10000", num2: "个", name1: "张三" },
  { no: 7, date: "2022-3-1", code: "2022030110194894", name: "相机", num: "10", num1: "10000", num2: "个", name1: "张三" },
  { no: 8, date: "2022-3-1", code: "2022030110194894", name: "相机", num: "10", num1: "10000", num2: "个", name1: "张三" },
  { no: 9, date: "2022-3-1", code: "2022030110194894", name: "相机", num: "10", num1: "10000", num2: "个", name1: "张三" },
  { no: 10, date: "2022-3-1", code: "2022030110194894", name: "相机", num: "10", num1: "10000", num2: "个", name1: "张三" },
  { no: 1, date: "2022-3-1", code: "2022030110194894", name: "相机", num: "10", num1: "10000", num2: "个", name1: "张三" },
  { no: 2, date: "2022-3-1", code: "2022030110194894", name: "相机", num: "10", num1: "10000", num2: "个", name1: "张三" },
  { no: 3, date: "2022-3-1", code: "2022030110194894", name: "相机", num: "10", num1: "10000", num2: "个", name1: "张三" },
  { no: 4, date: "2022-3-1", code: "2022030110194894", name: "相机", num: "10", num1: "10000", num2: "个", name1: "张三" },
  { no: 5, date: "2022-3-1", code: "2022030110194894", name: "相机", num: "10", num1: "10000", num2: "个", name1: "张三" },
  { no: 6, date: "2022-3-1", code: "2022030110194894", name: "相机", num: "10", num1: "10000", num2: "个", name1: "张三" },
  { no: 7, date: "2022-3-1", code: "2022030110194894", name: "相机", num: "10", num1: "10000", num2: "个", name1: "张三" },
  { no: 8, date: "2022-3-1", code: "2022030110194894", name: "相机", num: "10", num1: "10000", num2: "个", name1: "张三" },
  { no: 9, date: "2022-3-1", code: "2022030110194894", name: "相机", num: "10", num1: "10000", num2: "个", name1: "张三" },
  { no: 10, date: "2022-3-1", code: "2022030110194894", name: "相机", num: "10", num1: "10000", num2: "个", name1: "张三" }
];
const list = reactive([
  {
    source: "",
    code: "",
    name: "",
    name1: "",
    num: "",
    num1: "",
    num2: ""
  }
]);

const add = () => {
  list.push({
    source: "",
    code: "",
    name: "",
    name1: "",
    num: "",
    num1: "",
    num2: ""
  });
};
const lessen = () => {
  if (list.length > 1) {
    list.pop();
  }
};

const upData = () => {
  console.log(list);
  let isOk = false;
  let obj = {
    text: data.text,
    name1: data.name1,
    date: data.newDate
  };
  Object.keys(obj).forEach((x) => {
    if (obj[x] === "") {
      let i;
      switch (x) {
        case "name1":
          i = "经办人";
          break;
        case "text":
          i = "备注";
          break;
        case "code":
          i = "物料编码";
          break;
        case "name":
          i = "物料名称";
          break;
        case "num":
          i = "数量";
          break;
        case "num1":
          i = "单位";
          break;
        case "num2":
          i = "单价";
          break;
        default:
          i = "输入框都";
          break;
      }
      message.error(`${i}为必填项`);
      isOk = true;
    }
  });
  if (isOk === true) {
    return;
  }
  seekLoading.value = true;
  setTimeout(() => {
    console.log(obj);
    seekLoading.value = false;
  }, 2000);
};

data.tableData = tableData;
</script>

<style lang="scss" scoped>
.box {
  height: calc(100%);
  overflow-y: auto;
  margin-bottom: 50px;
  
  .box-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    line-height: 60px;
    padding: 20px 20px 0;
    text-align: left;
    
    .seek-box {
      :deep .n-input-group {
        align-items: center;
      }
    }
  }
  
  .table-box {
    padding: 10px 20px 0;
  }
}

.data-table {
  border: 1px solid rgb(239, 239, 245);
  border-top: none;
  
  .table-top {
    background: rgb(250, 250, 252);
  }
  
  .table-item {
    border-top: 1px solid rgb(239, 239, 245);
    
    .item-name {
      display: inline-block;
      width: 200px;
      height: 60px;
      line-height: 60px;
      padding-left: 20px;
    }
  }
}
</style>