<script lang="ts" setup>
import axios from "axios";
import { baseUrl, getColumns } from "../helpers/index";

const data = ref<any[]>([]);

const columns = getColumns();

const { showTime } = useTime();

async function getList() {
  const res = await axios.get(`${baseUrl.value}/api`);
  data.value = res.data;
}

onMounted(() => {
  baseUrl.value = localStorage.getItem("base_url") || "http://localhost:3001";
  getList();
});

const loading = ref(false);

function handleUploadProgress() {
  loading.value = true;
}

function handleUploadSuccess() {
  loading.value = false;
  ElMessage({
    type: "success",
    message: "上传成功",
  });
}
function handleUploadError() {
  loading.value = false;
}

async function exportFile() {
  const res = await axios.get(`${baseUrl.value}/data/export`, {
    responseType: "arraybuffer",
  });
  const content = new Blob([res.data], { type: res.headers["content-type"] });
  const url = URL.createObjectURL(content);
  const link = document.createElement("a");
  link.href = url;
  link.download = "data.zip";
  link.click();
}

function changeBaseUrl() {
  localStorage.setItem("base_url", baseUrl.value);
}
</script>

<template>
  <div class="flex flex-col h-screen p-2">
    <div class="flex justify-between p-1">
      <div class="flex">
        <el-input
          class="mr-3"
          v-model="baseUrl"
          @input="changeBaseUrl"
        ></el-input>
        <el-button type="primary" @click="() => showTime('report')"
          >设置上报时间</el-button
        >
        <el-button type="primary" @click="() => showTime('clear')"
          >设置清空时间</el-button
        >
      </div>
      <div class="flex">
        <el-upload
          :action="`${baseUrl}/data/upload`"
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
    </div>
    <div class="flex-1 shadow-2xl rounded p-5">
      <el-auto-resizer>
        <template #default="{ height, width }">
          <el-table-v2
            :columns="columns"
            :data="data"
            :width="width"
            :height="height"
            fixed
          />
        </template>
      </el-auto-resizer>
    </div>
    <BehaviorDialog />
    <ScreenDialog />
    <TimeDialog />
  </div>
</template>
