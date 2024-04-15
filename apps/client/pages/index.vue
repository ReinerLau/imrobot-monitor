<script lang="tsx" setup>
import axios from "axios";
import type { CardInstance } from "element-plus";
import { generateCodeColumns } from "~/helpers/code";
import { generateResourceColumns } from "~/helpers/resource";
const { code, file, dialogVisible } = useSource();

const data = ref<any[]>([]);

const tableWidth = ref(0);
const tableHeight = ref(0);

const tableContainerRef = ref<CardInstance>();

const codeColumns = generateCodeColumns();
const resourceColumns = generateResourceColumns();

async function getErrors(type: errorTypes) {
  const res = await axios.get(`http://localhost:3001/error/${type}`);
  data.value = res.data;
}

onMounted(() => {
  tableWidth.value = tableContainerRef.value!.$el.clientWidth;
  tableHeight.value = tableContainerRef.value!.$el.clientHeight;
  getErrors(errorTypes.CODE);
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

async function clearMap() {
  const res = await axios.delete("http://localhost:3001/error/clearMap");
  if (res.status === 200) {
    ElMessage.success({
      message: "清空成功",
    });
  }
}

async function exportFile() {
  const res = await axios.get("http://localhost:3001/error/export", {
    responseType: "arraybuffer",
  });
  const content = new Blob([res.data], { type: res.headers["content-type"] });
  const url = URL.createObjectURL(content);
  const link = document.createElement("a");
  link.href = url;
  link.download = "data.zip";
  link.click();
}

enum errorTypes {
  CODE = "code",
  RESOURCE = "resource",
}

const activeTab = ref(errorTypes.CODE);

watch(activeTab, (val: errorTypes) => {
  getErrors(val);
});
</script>

<template>
  <div class="flex flex-col h-screen p-2">
    <div class="flex justify-between p-1">
      <div class="flex">
        <el-upload
          action="http://localhost:3001/error/uploadSourceMap"
          name="files"
          accept=".map"
          :multiple="true"
          :show-file-list="false"
          @progress="handleUploadProgress"
          @success="handleUploadSuccess"
          @error="handleUploadError"
        >
          <el-button class="mr-2" type="primary" :loading="loading"
            >上传 sourcemap</el-button
          >
        </el-upload>
        <el-button type="primary" @click="clearMap">清空 sourcemap</el-button>
      </div>
      <div>
        <el-button type="primary">上传</el-button>
        <el-button type="primary" @click="exportFile">导出</el-button>
      </div>
    </div>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="运行错误" :name="errorTypes.CODE"></el-tab-pane>
      <el-tab-pane
        label="资源加载错误"
        :name="errorTypes.RESOURCE"
      ></el-tab-pane>
      <el-tab-pane label="请求错误" name="request"></el-tab-pane>
    </el-tabs>
    <el-card ref="tableContainerRef" class="flex-1">
      <el-table-v2
        v-if="activeTab === 'code'"
        :columns="codeColumns"
        :data="data"
        :width="tableWidth"
        :height="tableHeight"
        fixed
      />
      <el-table-v2
        v-if="activeTab === 'resource'"
        :columns="resourceColumns"
        :data="data"
        :width="tableWidth"
        :height="tableHeight"
        fixed
      />
    </el-card>
    <el-dialog v-model="dialogVisible">
      <div class="bg-green-500 mb-2 text-white">{{ file }}</div>
      <div class="bg-slate-900 text-white">
        <span v-html="code"></span>
      </div>
    </el-dialog>
  </div>
</template>

<style>
code.hljs .hljs-deletion {
  background-color: red !important;
}
</style>
