<script lang="ts" setup>
import axios from "axios";
import type { CardInstance } from "element-plus";
import { generateCodeColumns } from "~/helpers/code";
import { generateRequestColumns } from "~/helpers/request";
import { generateResourceColumns } from "~/helpers/resource";

const data = ref<any[]>([]);

const tableContainerRef = ref<CardInstance>();

const codeColumns = generateCodeColumns();
const resourceColumns = generateResourceColumns();
const requestColumns = generateRequestColumns();

async function getErrors(type: ErrorTypes) {
  const res = await axios.get(`http://localhost:3001/error/${type}`);
  data.value = res.data;
}

onMounted(() => {
  getErrors(ErrorTypes.CODE);
});

const loading = ref(false);

function handleUploadProgress() {
  loading.value = true;
}

function handleUploadSuccess(res: any) {
  loading.value = false;
}

function handleUploadError(error: Error) {
  loading.value = false;
}

const handleFileName = (str: string) => {
  const reg = /\/([^/]+)$/;
  const match = str.match(reg);
  return match ? match[1] : "";
};

async function exportFile() {
  const res = await axios.get("http://localhost:3001/data/export", {
    responseType: "arraybuffer",
  });
  const content = new Blob([res.data], { type: res.headers["content-type"] });
  const url = URL.createObjectURL(content);
  const link = document.createElement("a");
  link.href = url;
  link.download = "data.zip";
  link.click();
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
      <el-upload
        action="http://localhost:3001/data/upload"
        name="file"
        accept=".map,.json"
        :multiple="true"
        :show-file-list="false"
        @progress="handleUploadProgress"
        @success="handleUploadSuccess"
        @error="handleUploadError"
      >
        <el-button class="mr-2" type="primary" :loading="loading"
          >上传</el-button
        >
      </el-upload>
      <el-button type="primary" @click="exportFile">导出</el-button>
    </div>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="运行错误" :name="ErrorTypes.CODE"></el-tab-pane>
      <el-tab-pane
        label="资源加载错误"
        :name="ErrorTypes.RESOURCE"
      ></el-tab-pane>
      <el-tab-pane label="请求错误" :name="ErrorTypes.REQUEST"></el-tab-pane>
    </el-tabs>
    <div ref="tableContainerRef" class="flex-1 shadow-2xl rounded p-5">
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
    <BehaviorDialog />
    <ScreenDialog />
  </div>
</template>
