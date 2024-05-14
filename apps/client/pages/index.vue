<script lang="ts" setup>
import axios from "axios";
import { baseUrl } from "../helpers/index";

const { showScreen } = useScreen();

async function getList() {
  const res = await axios.get(`${baseUrl.value}/screen`);
  console.log(res);
}

onMounted(() => {
  baseUrl.value = localStorage.getItem("base_url") || "http://localhost:3001";
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

async function clearData() {
  await axios.delete(`${baseUrl.value}/api`);
  getList();
  ElMessage({
    type: "success",
    message: "删除成功",
  });
}

const dateRange = ref<[number, number]>([Date.now(), Date.now()]);

const handleChange = (value: [Date, Date]) => {
  showScreen(value[0].getTime(), value[1].getTime());
};
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
        <el-date-picker
          class="mr-3"
          v-model="dateRange"
          type="datetimerange"
          @change="handleChange"
        />
        <el-button type="primary" @click="clearData">清空数据</el-button>
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
    <ScreenDialog />
  </div>
</template>
