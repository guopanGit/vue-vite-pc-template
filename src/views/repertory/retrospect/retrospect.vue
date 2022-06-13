<template>
  <div class="box">
    <div class="box-top">
      <n-button type="info" @click="data.set = true">
        设置
      </n-button>
      <div>
        <n-button type="info" ghost @click="data.inquireModal = true">
          查询
        </n-button>
        <!-- 查询 -->
        <n-modal v-model:show="data.inquireModal">
          <n-card
            style="width: 450px"
            title="视频回溯"
          >
            <div class="card-box">
              <n-form label-placement="left">
                <n-form-item label="出库日期:">
                  <n-date-picker
                    type="date"
                    v-model:value="inquireVal.date"
                    :default-value="Date.now()"
                    :is-date-disabled="dateDisabled"
                  />
                </n-form-item>
                <n-form-item label="物料号:">
                  <n-input v-model:value="inquireVal.id" type="text" placeholder="请输入物料号" />
                </n-form-item>
                <n-form-item label=" 库 位:">
                  <n-input v-model:value="inquireVal.site" type="text" placeholder="请输入库位号" />
                </n-form-item>
              </n-form>
              <n-space justify="end">
                <n-button type="info" ghost :loading="data.listLoading" @click="getList">搜索</n-button>
              </n-space>
            </div>
          </n-card>
        </n-modal>
      </div>
    </div>
    <div v-if="data.list.length < 1" class="default-box">
      <n-empty size="huge" description="暂无设备"></n-empty>
    </div>
    <block v-else>
      <n-scrollbar style="max-height: 700px">
        <div class="video-box">
          <block v-for="(item,index,key) in data.list" :key="key">
            <div class="green">
              <div class="video">
                <videoPlay
                  v-bind="options"
                  :src="item.src"
                  :control="false"
                ></videoPlay>
              </div>
              <div class="">库位 {{ index + 1 }}</div>
            </div>
          </block>
        </div>
      </n-scrollbar>
    </block>
    <!-- 弹框 -->
    <n-modal
      v-model:show="data.showModal"
      preset="card"
      :closable="true"
      style="width: 50%"
    >
      <template #header>
        <div>库位1</div>
      </template>
      <div class="video-wrap">
        <videoPlay v-bind="options"
                   :src="data.src"
        ></videoPlay>
      </div>
    </n-modal>
    <!-- 设置 -->
    <n-drawer
      v-model:show="data.set"
      placement="left"
      :width="520">
      <n-drawer-content>
        <template #header>
          <span>设置库位摄像头</span>
        </template>
        <template #footer>
          <n-button
            type="info"
            ghost
            @click="set"
          >确定
          </n-button>
        </template>
      </n-drawer-content>
    </n-drawer>
    <!-- 查询结果 -->
    <n-drawer
      v-model:show="data.inquire"
      placement="right"
      :width="920">
      <n-drawer-content>
        <template #header>
          <span>查询结果</span>
        </template>
        <div>
          <n-data-table
            :data="table"
            :columns="columns"
            striped
            :max-height="790"
            :row-props="rowProps"
          />
          <n-dropdown
            :options="dropdown"
            placement="bottom-start"
            trigger="manual"
            :show="data.showDropdown"
            :x="x"
            :y="y"
            :on-clickoutside="outSide"
            @select="handleSelect"
          />
        </div>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup>
import { reactive, ref, nextTick } from "vue";
import { useStore } from "vuex";
import "vue3-video-play/dist/style.css";
import { videoPlay } from "vue3-video-play";
import {
  NForm,
  NFormItem,
  NInput,
  NButton,
  NDatePicker,
  NModal,
  NCard,
  NScrollbar,
  NEmpty,
  NDrawer,
  NDrawerContent,
  NDataTable,
  NDropdown,
  useMessage
} from "naive-ui";

let src = "http://vali-g1.cp31.ott.cibntv.net/youku/67732da2f4d35716c33a12193/03000801006217336C1D21BAC9F45FF71F9A36-98DE-4F98-804D-704AA3FA12BA.mp4?sid=165242223600010003212_00_Be32b6a2db95414b3f36f1db461db9d22&sign=77e2afea4fffaefa0636c293f69b0ad2&ctype=50&si=183&psid=28130d30116e4d4e86f10eec6eda889441346";

const data = reactive({
  src, //视频源
  showModal: false,
  inquireModal: false,
  listLoading: false,
  set: false,
  inquire: false,
  showDropdown: false,
  list: []
});

const inquireVal = ref({
  date: null,
  id: null,
  site: null// 库位
});

const x = ref(0);
const y = ref(0);

const dropdown = [
  {
    label: "查看视频详情",
    key: "edit"
  }
];

const options = {
  width: "100%", //播放器高度
  height: "100%", //播放器高度
  color: "#409eff", //主题色
  muted: false, //静音
  webFullScreen: false,
  speedRate: ["0.5", "1.0", "1.5", "2.0", "2.5", "3.0", "6.0"], //播放倍速
  autoPlay: false, //自动播放
  loop: false, //循环播放
  mirror: false, //镜像画面
  ligthOff: true,  //关灯模式
  volume: 0.3, //默认音量大小
  control: true, //是否显示控制器
  title: "", //视频名称
  poster: "" //封面
  /*  sources: [{
      type: "",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
      src: "http://vali-g1.cp31.ott.cibntv.net/youku/67732da2f4d35716c33a12193/03000801006217336C1D21BAC9F45FF71F9A36-98DE-4F98-804D-704AA3FA12BA.mp4?sid=165242223600010003212_00_Be32b6a2db95414b3f36f1db461db9d22&sign=77e2afea4fffaefa0636c293f69b0ad2&ctype=50&si=183&psid=28130d30116e4d4e86f10eec6eda889441346" //url地址
    }],
    notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
    controlBar: {
      timeDivider: true,
      durationDisplay: true,
      remainingTimeDisplay: false,
      fullscreenToggle: true  //全屏按钮
    }*/
};

const dateDisabled = (ts) => {
  return ts > Date.now();
};

const getList = () => {
  data.listLoading = true;
  setTimeout(() => {
    data.listLoading = false;
    data.inquireModal = false;
    data.inquire = true;
  }, 1000);
  console.log(inquireVal.value);
};

const set = () => {
  data.set = false;
};

const rowProps = (row) => {
  return {
    onContextmenu: (e) => {
      e.preventDefault();
      data.showDropdown = false;
      nextTick().then(() => {
        data.showDropdown = true;
        x.value = e.clientX;
        y.value = e.clientY;
      });
    }
  };
};

const table = [
  { date: "2022-5-17", id: "19874564", site: "库位1" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" },
  { date: "2022-5-17", id: "19874564", site: "库位2" }
];

const columns = [
  { title: "日期", key: "date" },
  { title: "物料号", key: "id" },
  { title: "库位", key: "site" }
];

const outSide = () => {
  data.showDropdown = false;
};

const handleSelect = (e) => {
  data.showDropdown = false;
  data.showModal = true;
};

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
  }
  
  .default-box {
    margin: 50px 0;
  }
  
  .video-box {
    display: flex;
    height: calc(100% - 80px);
    padding-left: 20px;
    flex-wrap: wrap;
    
    .green {
      margin: 10px;
      
      .video {
        height: 300px;
        width: 400px;
        background: #a3a3a3;
      }
    }
  }
}

.inquire-box {
  font-size: 50px;
}
</style>
