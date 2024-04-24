<script lang="ts" setup>
import axios from "axios";
import { generateCodeColumns } from "~/helpers/code";
import { generateRequestColumns } from "~/helpers/request";
import { generateResourceColumns } from "~/helpers/resource";

const data = ref<any[]>([]);

const codeColumns = generateCodeColumns();
const resourceColumns = generateResourceColumns();
const requestColumns = generateRequestColumns();

const route = useRoute();

async function getErrors(type: ErrorTypes) {
  const res = await axios.get(`http://localhost:3001/error/${type}`, {
    params: {
      startTime: route.query.startTime,
      endTime: route.query.endTime,
    },
  });
  data.value = res.data;
}

onMounted(() => {
  getErrors(ErrorTypes.CODE);
});

const router = useRouter();

function back() {
  router.back();
}

enum ErrorTypes {
  CODE = "code",
  RESOURCE = "resource",
  REQUEST = "request",
}

const activeTab = ref(ErrorTypes.CODE);

watch(activeTab, (val: ErrorTypes) => {
  getErrors(val);
});
</script>

<template>
  <div class="flex flex-col h-screen p-2">
    <div class="flex justify-end p-1">
      <el-button type="primary" @click="back">返回</el-button>
    </div>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="运行错误" :name="ErrorTypes.CODE"></el-tab-pane>
      <el-tab-pane
        label="资源加载错误"
        :name="ErrorTypes.RESOURCE"
      ></el-tab-pane>
      <el-tab-pane label="请求错误" :name="ErrorTypes.REQUEST"></el-tab-pane>
    </el-tabs>
    <div class="flex-1 shadow-2xl rounded p-5">
      <el-auto-resizer>
        <template #default="{ height, width }">
          <el-table-v2
            v-if="activeTab === ErrorTypes.CODE"
            :columns="codeColumns"
            :data="data"
            :width="width"
            :height="height"
            fixed
          />
          <el-table-v2
            v-if="activeTab === ErrorTypes.RESOURCE"
            :columns="resourceColumns"
            :data="data"
            :width="width"
            :height="height"
            fixed
          />
          <el-table-v2
            v-if="activeTab === ErrorTypes.REQUEST"
            :columns="requestColumns"
            :data="data"
            :width="width"
            :height="height"
            fixed
          />
        </template>
      </el-auto-resizer>
    </div>
    <SourceDialog />
  </div>
</template>
