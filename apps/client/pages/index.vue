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
    cellRenderer: ({ rowData }) => (
      <el-button type="primary" onClick={() => showSource(rowData)}>
        查看
      </el-button>
    ),
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

interface Data {
  url: string;
  lineNumber: number;
  columnNumber: number;
}

const handleFileName = (str: string) => {
  const reg = /\/([^/]+)$/;
  const match = str.match(reg);
  return match ? match[1] : "";
};

// const codes = ref<string[]>([]);

const code = ref<string>("");
const file = ref<string>("");

async function showSource(rowData: Data) {
  const res = await axios.get("http://localhost:3001/error/getMap", {
    params: {
      fileName: handleFileName(rowData.url),
    },
  });
  dialogVisible.value = true;
  const result = await parseSourceMap({
    sourceMap: res.data,
    lineNumber: rowData.lineNumber,
    columnNumber: rowData.columnNumber,
  });
  file.value = result.file;
  code.value = result.code;
}

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

const dialogVisible = ref(false);
</script>

<template>
  <div class="flex flex-col h-screen">
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
    <div ref="tableContainerRef" class="flex-1 h-full">
      <el-table-v2
        :columns="columns"
        :data="data"
        :width="tableWidth"
        :height="tableHeight"
        fixed
      />
    </div>
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
