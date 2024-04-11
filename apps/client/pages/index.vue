<script lang="tsx" setup>
import type { Column } from "element-plus";
import axios from "axios";

const columns: Column[] = [
  {
    dataKey: "message",
    title: "报错信息",
    width: 150,
    align: "center",
  },
  {
    dataKey: "url",
    title: "报错页面",
    width: 150,
    align: "center",
  },
  {
    dataKey: "time",
    title: "报错时间",
    width: 150,
    align: "center",
  },
  {
    dataKey: "user",
    title: "用户",
    width: 150,
    align: "center",
  },
  {
    dataKey: "sdkVersion",
    title: "SDK版本",
    width: 150,
    align: "center",
  },
  {
    dataKey: "system",
    title: "操作系统",
    width: 150,
    align: "center",
  },
  {
    dataKey: "source",
    title: "源码",
    width: 150,
    align: "center",
    cellRenderer: ({ rowData }) => <el-button type="primary">查看</el-button>,
  },
  {
    dataKey: "behavior",
    title: "行为",
    width: 150,
    align: "center",
  },
  {
    dataKey: "screen",
    title: "录屏",
    width: 150,
    align: "center",
  },
];
const data = ref<any[]>([]);

const tableWidth = ref(0);
const tableHeight = ref(0);

const tableContainerRef = ref<HTMLElement>();

async function getErrors() {
  const res = await axios.get("http://localhost:3001/error");
  data.value = res.data;
}

async function uploadError() {
  await axios.post("http://localhost:3001/error", {
    message: "test",
  });
  getErrors();
}

onMounted(() => {
  tableWidth.value = tableContainerRef.value!.clientWidth;
  tableHeight.value = tableContainerRef.value!.clientHeight;
  getErrors();
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
</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="flex justify-between p-1">
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
        <el-button type="primary" :loading="loading">上传 sourcemap</el-button>
      </el-upload>
      <div>
        <el-button type="primary" @click="uploadError">上传</el-button>
        <el-button type="primary">导出</el-button>
      </div>
    </div>
    <div ref="tableContainerRef" class="flex-1 h-full">
      <el-table-v2
        :columns="columns"
        :data="data"
        :width="tableWidth"
        :height="tableHeight"
        fixed
      />
    </div>
  </div>
</template>
